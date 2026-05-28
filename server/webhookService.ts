/**
 * webhookService.ts
 * Serviço de disparo HTTP para Google Sheets e BotConversa.
 * Não há dependência de banco de dados — toda persistência é feita via webhooks.
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

async function postWebhook(url: string, payload: object, label: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) {
      console.warn(`[${label}] HTTP ${res.status} — ${res.statusText}`);
    }
    return res.ok;
  } catch (err) {
    console.error(`[${label}] Falha no disparo:`, err);
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
    console.warn("[Sheets] GOOGLE_SHEETS_WEBHOOK_URL não configurado — pulando.");
    return false;
  }
  return postWebhook(url, payload, "Sheets");
}

/**
 * Envia lead para o BotConversa.
 * Payload flat (campos na raiz), sem objetos aninhados, conforme exigido pela plataforma.
 */
export async function sendToBotConversa(payload: LeadPayload): Promise<boolean> {
  const url = process.env.BOTCONVERSA_WEBHOOK_URL;
  if (!url) {
    console.warn("[BotConversa] BOTCONVERSA_WEBHOOK_URL não configurado — pulando.");
    return false;
  }
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
 * Dispara para ambos os destinos em paralelo.
 * Retorna { sheets, botconversa } com o resultado de cada disparo.
 */
export async function sendLeadToAll(payload: LeadPayload): Promise<{ sheets: boolean; botconversa: boolean }> {
  const [sheets, botconversa] = await Promise.allSettled([
    sendToSheets(payload),
    sendToBotConversa(payload),
  ]);
  return {
    sheets: sheets.status === "fulfilled" && sheets.value,
    botconversa: botconversa.status === "fulfilled" && botconversa.value,
  };
}
