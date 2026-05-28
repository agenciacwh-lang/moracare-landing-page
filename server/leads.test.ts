/**
 * leads.test.ts
 * Testes unitários para as procedures de leads da Mora Care.
 * Arquitetura: sem banco de dados — webhooks para Sheets e BotConversa.
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("./webhookService", () => ({
  sendLeadToAll: vi.fn().mockResolvedValue({ sheets: true, botconversa: true }),
  sendToSheets: vi.fn().mockResolvedValue(true),
  sendToBotConversa: vi.fn().mockResolvedValue(true),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

const validLead = {
  sessionId: "mc_test_12345_abc",
  nome: "João Silva",
  email: "joao@teste.com",
  telefone: "(41) 99999-9999",
  tipoPlano: "Familiar" as const,
};

// ── Testes: submitInitial ─────────────────────────────────────────────────────

describe("leads.submitInitial", () => {
  beforeEach(() => vi.clearAllMocks());

  it("deve retornar sucesso e dispatched ao enviar lead válido", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.leads.submitInitial(validLead);

    expect(result.success).toBe(true);
    expect(result.dispatched).toEqual({ sheets: true, botconversa: true });
  });

  it("deve rejeitar e-mail inválido", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.leads.submitInitial({ ...validLead, email: "nao-e-email" })
    ).rejects.toThrow();
  });

  it("deve rejeitar nome com menos de 2 caracteres", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.leads.submitInitial({ ...validLead, nome: "J" })
    ).rejects.toThrow();
  });

  it("deve rejeitar sessionId vazio", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.leads.submitInitial({ ...validLead, sessionId: "" })
    ).rejects.toThrow();
  });

  it("deve aceitar todos os tipos de plano válidos", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const tipos = ["Individual", "Familiar", "PJ", "MEI"] as const;

    for (const tipoPlano of tipos) {
      const result = await caller.leads.submitInitial({
        ...validLead,
        sessionId: `mc_${tipoPlano}_session`,
        tipoPlano,
      });
      expect(result.success).toBe(true);
    }
  });

  it("deve usar origem padrão 'landing_page' quando não informada", async () => {
    const { sendLeadToAll } = await import("./webhookService");
    const caller = appRouter.createCaller(createPublicContext());

    await caller.leads.submitInitial(validLead);

    expect(sendLeadToAll).toHaveBeenCalledWith(
      expect.objectContaining({ origem: "landing_page" })
    );
  });

  it("deve enviar status 'Lead Incompleto' no Passo 1", async () => {
    const { sendLeadToAll } = await import("./webhookService");
    const caller = appRouter.createCaller(createPublicContext());

    await caller.leads.submitInitial(validLead);

    expect(sendLeadToAll).toHaveBeenCalledWith(
      expect.objectContaining({ status: "Lead Incompleto" })
    );
  });
});

// ── Testes: complete ──────────────────────────────────────────────────────────

describe("leads.complete", () => {
  beforeEach(() => vi.clearAllMocks());

  it("deve retornar sucesso ao completar sessão existente", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    // Passo 1: registra no cache
    await caller.leads.submitInitial(validLead);

    // Passo 2: conclui
    const result = await caller.leads.complete({ sessionId: validLead.sessionId });
    expect(result.success).toBe(true);
  });

  it("deve retornar sucesso mesmo com sessionId desconhecido (sessão expirada)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.leads.complete({ sessionId: "mc_sessao_inexistente" });
    expect(result.success).toBe(true);
  });

  it("deve rejeitar sessionId vazio", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.leads.complete({ sessionId: "" })
    ).rejects.toThrow();
  });

  it("deve enviar status 'Lead Concluiu' no Passo 2", async () => {
    const { sendLeadToAll } = await import("./webhookService");
    const caller = appRouter.createCaller(createPublicContext());

    // Passo 1
    await caller.leads.submitInitial(validLead);
    vi.clearAllMocks();

    // Passo 2
    await caller.leads.complete({ sessionId: validLead.sessionId });

    expect(sendLeadToAll).toHaveBeenCalledWith(
      expect.objectContaining({ status: "Lead Concluiu" })
    );
  });
});

// ── Testes: webhookService ────────────────────────────────────────────────────

describe("webhookService — validação de URLs", () => {
  it("GOOGLE_SHEETS_WEBHOOK_URL deve estar configurado", () => {
    expect(process.env.GOOGLE_SHEETS_WEBHOOK_URL).toBeTruthy();
    expect(process.env.GOOGLE_SHEETS_WEBHOOK_URL).toContain("script.google.com");
  });

  it("BOTCONVERSA_WEBHOOK_URL deve estar configurado", () => {
    expect(process.env.BOTCONVERSA_WEBHOOK_URL).toBeTruthy();
    expect(process.env.BOTCONVERSA_WEBHOOK_URL).toContain("botconversa.com.br");
  });
});
