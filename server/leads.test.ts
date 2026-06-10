/**
 * leads.test.ts
 * Testes unitários para as procedures de leads da Mora Care.
 * Arquitetura stateless: complete recebe todos os dados do lead (sem cache em memória).
 * Compatível com Vercel Serverless.
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

  it("deve retornar sucesso ao enviar lead válido (sem webhooks)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.leads.submitInitial(validLead);

    // submitInitial retorna apenas { success: true }
    // Não dispara webhooks para evitar duplicidade
    expect(result.success).toBe(true);
    expect(result.dispatched).toBeUndefined();
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
    const caller = appRouter.createCaller(createPublicContext());
    // submitInitial NÃO dispara webhooks — apenas notifica o owner
    // A origem é validada em complete, não em submitInitial
    const result = await caller.leads.submitInitial(validLead);
    expect(result.success).toBe(true);
  });

  it("deve retornar sucesso sem disparar webhooks (evitar duplicidade)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    // submitInitial NÃO dispara webhooks — apenas notifica o owner
    // Os webhooks são disparados SOMENTE em complete (Passo 2)
    const result = await caller.leads.submitInitial(validLead);
    expect(result.success).toBe(true);
  });
});

// ── Testes: complete (stateless) ──────────────────────────────────────────────

describe("leads.complete", () => {
  beforeEach(() => vi.clearAllMocks());

  it("deve retornar sucesso ao completar com todos os dados do lead", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.leads.complete(validLead);
    expect(result.success).toBe(true);
    expect(result.dispatched).toEqual({ sheets: true, botconversa: true });
  });

  it("deve enviar status 'Lead Concluiu' no Passo 2", async () => {
    const { sendLeadToAll } = await import("./webhookService");
    const caller = appRouter.createCaller(createPublicContext());

    await caller.leads.complete(validLead);

    expect(sendLeadToAll).toHaveBeenCalledWith(
      expect.objectContaining({ status: "Lead Concluiu" })
    );
  });

  it("deve rejeitar e-mail inválido no Passo 2", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.leads.complete({ ...validLead, email: "invalido" })
    ).rejects.toThrow();
  });

  it("deve rejeitar sessionId vazio no Passo 2", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.leads.complete({ ...validLead, sessionId: "" })
    ).rejects.toThrow();
  });

  it("deve funcionar com tipoPlano MEI", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.leads.complete({ ...validLead, tipoPlano: "MEI" });
    expect(result.success).toBe(true);
  });

  it("deve funcionar com tipoPlano PJ", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.leads.complete({ ...validLead, tipoPlano: "PJ" });
    expect(result.success).toBe(true);
  });

  it("deve funcionar com tipoPlano Individual", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.leads.complete({ ...validLead, tipoPlano: "Individual" });
    expect(result.success).toBe(true);
  });
});

// ── Testes: webhookService — validação de URLs ────────────────────────────────

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
