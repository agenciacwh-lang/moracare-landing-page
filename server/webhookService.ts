/**
 * webhookService.ts
 * Serviço de disparo HTTP para Google Sheets e BotConversa.
 * Sem dependência de banco de dados — toda persistência é feita via webhooks.
 *
 * Compatível com Vercel Serverless:
 * - Sem AbortSignal.timeout() (não disponível em Node 18 da Vercel)
 * - Timeout manual via Promise.race() com setTimeout
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
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout após ${ms}ms`)), ms)
    ),
  ]);
}

async function postWebhook(url: string, payload: object, label: string): Promise<boolean> {
  console.log(`[${label}] Iniciando disparo para: ${url}`);
  console.log(`[${label}] Payload:`, JSON.stringify(payload));

  try {
    const fetchPromise = fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await withTimeout(fetchPromise, 10_000);

    if (res.ok) {
      console.log(`[${label}] ✅ Sucesso — HTTP ${res.status}`);
    } else {
      const body = await res.text().catch(() => "(sem body)");
      console.warn(`[${label}] ⚠️ HTTP ${res.status} — ${res.statusText} — Body: ${body}`);
    }
    return res.ok;
  } catch (err) {
    console.error(`[${label}] ❌ Falha no disparo:`, err instanceof Error ? err.message : err);
    return false;
  }
}

/**
 * Envia lead para o Google Sheets via Apps Script webhook.
 * O Apps Script usa os campos na raiz do JSON para mapear colunas.
 */
export async function sendToSheets(payload: LeadPayload): Promise<boolean> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) {
    console.warn("[Sheets] ⚠️ GOOGLE_SHEETS_WEBHOOK_URL não configurado — pulando.");
    return false;
  }
  console.log("[Sheets] URL configurada:", url.substring(0, 60) + "...");
  return postWebhook(url, payload, "Sheets");
}

/**
 * Envia lead para o BotConversa.
 * Payload flat (campos na raiz), sem objetos aninhados, conforme exigido pela plataforma.
 */
export async function sendToBotConversa(payload: LeadPayload): Promise<boolean> {
  const url = process.env.BOTCONVERSA_WEBHOOK_URL;
  if (!url) {
    console.warn("[BotConversa] ⚠️ BOTCONVERSA_WEBHOOK_URL não configurado — pulando.");
    return false;
  }
  console.log("[BotConversa] URL configurada:", url.substring(0, 60) + "...");

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
 * Dispara para ambos os destinos em paralelo e aguarda os dois.
 * Retorna { sheets, botconversa } com o resultado de cada disparo.
 *
 * IMPORTANTE: Promise.allSettled garante que ambos os disparos são
 * aguardados antes de retornar — crítico em ambientes serverless
 * onde a função é encerrada assim que a resposta é enviada.
 */
export async function sendLeadToAll(
  payload: LeadPayload
): Promise<{ sheets: boolean; botconversa: boolean }> {
  console.log(`[sendLeadToAll] Disparando para Sheets e BotConversa — sessionId: ${payload.sessionId}`);

  const [sheetsResult, botconversaResult] = await Promise.allSettled([
    sendToSheets(payload),
    sendToBotConversa(payload),
  ]);

  const sheets = sheetsResult.status === "fulfilled" && sheetsResult.value;
  const botconversa = botconversaResult.status === "fulfilled" && botconversaResult.value;

  console.log(`[sendLeadToAll] Resultado — Sheets: ${sheets ? "✅" : "❌"} | BotConversa: ${botconversa ? "✅" : "❌"}`);

  return { sheets, botconversa };
}
