/**
 * leads.ts — Router tRPC para captura de leads da Mora Care
 *
 * Arquitetura: sem banco de dados SQL, sem estado em memória.
 * Toda persistência é feita via webhooks para Google Sheets e BotConversa.
 *
 * Fluxo de Tiro Imediato (stateless — compatível com Vercel Serverless):
 *   Passo 1 (submitInitial): ao clicar no CTA → dispara status "Lead Incompleto"
 *   Passo 2 (complete): ao finalizar → recebe todos os dados do cliente e dispara
 *     status "Lead Concluiu". Não depende de cache em memória.
 *
 * O sessionId é gerado no cliente e enviado em ambas as chamadas para que o
 * Google Sheets possa correlacionar as duas linhas da mesma sessão.
 */

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { sendLeadToAll } from "../webhookService";
import { notifyOwner } from "../_core/notification";
import type { LeadPayload } from "../webhookService";

const tipoPlanoEnum = z.enum(["Individual", "Familiar", "PJ", "MEI"]);

const leadBaseSchema = z.object({
  sessionId: z.string().min(1),
  nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(8, "Telefone inválido"),
  tipoPlano: tipoPlanoEnum,
  origem: z.string().optional().default("landing_page"),
});

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
    .input(leadBaseSchema)
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
   * PASSO 2 — CONCLUSÃO (stateless)
   * Disparado quando o usuário finaliza o preenchimento.
   * Recebe todos os dados do lead diretamente do cliente (sem cache em memória),
   * garantindo compatibilidade com ambientes serverless como a Vercel.
   */
  complete: publicProcedure
    .input(leadBaseSchema)
    .mutation(async ({ input }) => {
      const payload: LeadPayload = {
        sessionId: input.sessionId,
        nome: input.nome,
        email: input.email,
        telefone: input.telefone,
        tipoPlano: input.tipoPlano,
        status: "Lead Concluiu",
        origem: input.origem,
        timestamp: new Date().toISOString(),
        fonte: "Mora Care Landing Page",
      };

      // Dispara para Sheets e BotConversa em paralelo
      const results = await sendLeadToAll(payload);

      // Notifica o proprietário
      await notifyOwner({
        title: "✅ Lead CONCLUÍDO — Mora Care",
        content: `**Nome:** ${input.nome}\n**Telefone:** ${input.telefone}\n**E-mail:** ${input.email}\n**Tipo de Plano:** ${input.tipoPlano}\n**Status:** Lead Concluiu\n**Data:** ${nowBR()}\n\n_Sheets: ${results.sheets ? "✅" : "❌"} | BotConversa: ${results.botconversa ? "✅" : "❌"}_`,
      });

      return { success: true, dispatched: results };
    }),
});
