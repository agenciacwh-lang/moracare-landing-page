/**
 * webhookService.ts
 * Serviço de disparo HTTP para Google Sheets e BotConversa.
 * Sem dependência de banco de dados — toda persistência é feita via webhooks.
 *
 * CRÍTICO para Vercel Serverless:
 * - TODOS os fetches são AGUARDADOS (await bloqueante) antes de retornar
 * - Sem disparos fire-and-forget (.catch solto) — a função serverless morreria antes
 * - Timeout manual via Promise.race() (AbortSignal.timeout() não disponível no Node 18)
 * - Logs detalhados para debug no painel da Vercel
 */

export interface LeadPayload {
  sessionId: string;
  nome: string;
  email: string;
  telefone: string;
  tipoPlano: "Individual" | "Familiar" | "PJ" | "MEI";
  status: "Lead Incompleto" | "Lead Concluiu";
  origem: string;
  timestamp: string;
  fonte: string;
}

/**
 * Timeout manual compatível com Node 18 (Vercel default).
 * AbortSignal.timeout() só está disponível a partir do Node 20.
 */
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`[${label}] Timeout após ${ms}ms`)), ms)
    ),
  ]);
}

/**
 * Dispara um POST para um webhook e AGUARDA a resposta completa.
 * BLOQUEANTE — não retorna até que o fetch termine ou o timeout expire.
 * Crítico em ambientes serverless onde a função morre ao retornar.
 */
async function postWebhook(url: string, payload: object, label: string): Promise<boolean> {
  const startMs = Date.now();
  console.log(`[${label}] ▶ Iniciando disparo — URL: ${url.substring(0, 80)}...`);
  console.log(`[${label}] Payload: ${JSON.stringify(payload)}`);

  try {
    const fetchPromise = fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Aguarda o fetch com timeout de 12s (Vercel tem timeout de 30s por padrão)
    const res = await withTimeout(fetchPromise, 12_000, label);
    const elapsed = Date.now() - startMs;

    if (res.ok) {
      const body = await res.text().catch(() => "(sem body)");
      console.log(`[${label}] ✅ Sucesso — HTTP ${res.status} — ${elapsed}ms — Body: ${body.substring(0, 200)}`);
      return true;
    } else {
      const body = await res.text().catch(() => "(sem body)");
      console.warn(`[${label}] ⚠️ HTTP ${res.status} ${res.statusText} — ${elapsed}ms — Body: ${body.substring(0, 200)}`);
      return false;
    }
  } catch (err) {
    const elapsed = Date.now() - startMs;
    console.error(`[${label}] ❌ Falha no disparo após ${elapsed}ms:`, err instanceof Error ? err.message : String(err));
    return false;
  }
}

/**
 * Envia lead para o Google Sheets via Apps Script webhook.
 * AGUARDA o fetch terminar antes de retornar (crítico no serverless).
 */
export async function sendToSheets(payload: LeadPayload): Promise<boolean> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) {
    console.warn("[Sheets] ⚠️ GOOGLE_SHEETS_WEBHOOK_URL não configurado — pulando.");
    return false;
  }
  console.log(`[Sheets] URL configurada: ${url.substring(0, 60)}...`);
  return postWebhook(url, payload, "Sheets");
}

/**
 * Envia lead para o BotConversa.
 * Payload flat (campos na raiz), sem objetos aninhados, conforme exigido pela plataforma.
 * AGUARDA o fetch terminar antes de retornar (crítico no serverless).
 */
export async function sendToBotConversa(payload: LeadPayload): Promise<boolean> {
  const url = process.env.BOTCONVERSA_WEBHOOK_URL;
  if (!url) {
    console.warn("[BotConversa] ⚠️ BOTCONVERSA_WEBHOOK_URL não configurado — pulando.");
    return false;
  }
  console.log(`[BotConversa] URL configurada: ${url.substring(0, 60)}...`);

  // Payload flat — BotConversa não aceita objetos aninhados
  const flatPayload = {
    sessionId: payload.sessionId,
    nome: payload.nome,
    email: payload.email,
    telefone: payload.telefone,
    tipoPlano: payload.tipoPlano,
    status: payload.status,
    origem: payload.origem,
    timestamp: payload.timestamp,
    fonte: payload.fonte,
  };
  return postWebhook(url, flatPayload, "BotConversa");
}

/**
 * Dispara para ambos os destinos em paralelo e AGUARDA OS DOIS completarem.
 * Promise.allSettled garante que nenhum disparo é abandonado antes de retornar.
 *
 * CRÍTICO: Em ambientes serverless (Vercel), a função é encerrada imediatamente
 * após o return. Qualquer fetch não-aguardado será cancelado pelo runtime.
 * Esta função garante que ambos os awaits terminam ANTES do return { success: true }.
 */
export async function sendLeadToAll(
  payload: LeadPayload
): Promise<{ sheets: boolean; botconversa: boolean }> {
  const startMs = Date.now();
  console.log(`[sendLeadToAll] ▶ Iniciando disparos — sessionId: ${payload.sessionId} | status: ${payload.status}`);

  // Promise.allSettled: aguarda AMBOS terminarem, mesmo que um falhe
  const [sheetsResult, botconversaResult] = await Promise.allSettled([
    sendToSheets(payload),
    sendToBotConversa(payload),
  ]);

  const sheets = sheetsResult.status === "fulfilled" && sheetsResult.value === true;
  const botconversa = botconversaResult.status === "fulfilled" && botconversaResult.value === true;
  const elapsed = Date.now() - startMs;

  console.log(`[sendLeadToAll] ◀ Concluído em ${elapsed}ms — Sheets: ${sheets ? "✅" : "❌"} | BotConversa: ${botconversa ? "✅" : "❌"}`);

  if (sheetsResult.status === "rejected") {
    console.error("[sendLeadToAll] Sheets rejeitou:", sheetsResult.reason);
  }
  if (botconversaResult.status === "rejected") {
    console.error("[sendLeadToAll] BotConversa rejeitou:", botconversaResult.reason);
  }

  // return { success: true } no router DEVE ser chamado APÓS este await
  return { sheets, botconversa };
}
