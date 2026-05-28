/**
 * leads.ts — Router tRPC para captura de leads da Mora Care
 *
 * Arquitetura: sem banco de dados SQL.
 * Toda persistência é feita via webhooks para Google Sheets e BotConversa.
 *
 * Fluxo de Tiro Imediato:
 *   Passo 1 (submitInitial): ao clicar no CTA → dispara status "Lead Incompleto"
 *   Passo 2 (complete): ao finalizar → dispara status "Lead Concluiu"
 */

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { sendLeadToAll } from "../webhookService";
import { notifyOwner } from "../_core/notification";
import type { LeadPayload } from "../webhookService";

const tipoPlanoEnum = z.enum(["Individual", "Familiar", "PJ", "MEI"]);

// Cache em memória para associar sessionId → dados do lead (TTL: 30 min)
// Permite que o Passo 2 reutilize os dados do Passo 1 sem banco de dados
const sessionCache = new Map<string, { payload: LeadPayload; expiresAt: number }>();

const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutos

function cacheSet(sessionId: string, payload: LeadPayload): void {
  sessionCache.set(sessionId, { payload, expiresAt: Date.now() + SESSION_TTL_MS });
}

function cacheGet(sessionId: string): LeadPayload | undefined {
  const entry = sessionCache.get(sessionId);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) { sessionCache.delete(sessionId); return undefined; }
  return entry.payload;
}

function nowBR(): string {
  return new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

export const leadsRouter = router({
  /**
   * PASSO 1 — TIRO IMEDIATO
   * Disparado em background ao clicar no botão CTA.
   * Envia status "Lead Incompleto" para Sheets e BotConversa.
   */
  submitInitial: publicProcedure
    .input(
      z.object({
        sessionId: z.string().min(1),
        nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
        email: z.string().email("E-mail inválido"),
        telefone: z.string().min(8, "Telefone inválido"),
        tipoPlano: tipoPlanoEnum,
        origem: z.string().optional().default("landing_page"),
      })
    )
    .mutation(async ({ input }) => {
      const payload: LeadPayload = {
        sessionId: input.sessionId,
        nome: input.nome,
        email: input.email,
        telefone: input.telefone,
        tipoPlano: input.tipoPlano,
        status: "Lead Incompleto",
        origem: input.origem,
        timestamp: new Date().toISOString(),
        fonte: "Mora Care Landing Page",
      };

      // Armazena em cache para o Passo 2
      cacheSet(input.sessionId, payload);

      // Dispara para Sheets e BotConversa em paralelo
      const results = await sendLeadToAll(payload);

      // Notifica o proprietário
      await notifyOwner({
        title: "🔔 Novo lead (Incompleto) — Mora Care",
        content: `**Nome:** ${input.nome}\n**Telefone:** ${input.telefone}\n**E-mail:** ${input.email}\n**Tipo de Plano:** ${input.tipoPlano}\n**Status:** Lead Incompleto\n**Data:** ${nowBR()}\n\n_Sheets: ${results.sheets ? "✅" : "❌"} | BotConversa: ${results.botconversa ? "✅" : "❌"}_`,
      });

      return { success: true, dispatched: results };
    }),

  /**
   * PASSO 2 — CONCLUSÃO
   * Disparado quando o usuário finaliza o preenchimento.
   * Envia status "Lead Concluiu" para Sheets e BotConversa.
   */
  complete: publicProcedure
    .input(
      z.object({
        sessionId: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      // Recupera dados do cache (preenchidos no Passo 1)
      const cached = cacheGet(input.sessionId);

      if (!cached) {
        // Sessão expirada ou não encontrada — apenas registra e retorna sucesso
        console.warn(`[leads.complete] sessionId não encontrado no cache: ${input.sessionId}`);
        return { success: true, dispatched: { sheets: false, botconversa: false } };
      }

      const payload: LeadPayload = {
        ...cached,
        status: "Lead Concluiu",
        timestamp: new Date().toISOString(),
      };

      // Dispara para Sheets e BotConversa em paralelo
      const results = await sendLeadToAll(payload);

      // Notifica o proprietário
      await notifyOwner({
        title: "✅ Lead CONCLUÍDO — Mora Care",
        content: `**Nome:** ${cached.nome}\n**Telefone:** ${cached.telefone}\n**E-mail:** ${cached.email}\n**Tipo de Plano:** ${cached.tipoPlano}\n**Status:** Lead Concluiu\n**Data:** ${nowBR()}\n\n_Sheets: ${results.sheets ? "✅" : "❌"} | BotConversa: ${results.botconversa ? "✅" : "❌"}_`,
      });

      // Limpa o cache após conclusão
      sessionCache.delete(input.sessionId);

      return { success: true, dispatched: results };
    }),
});
