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
   * PASSO 1 — TIRO IMEDIATO (SEM WEBHOOK)
   * Disparado ao clicar no botão CTA.
   * NÃO envia para Sheets nem BotConversa — evita duplicidade.
   * Os webhooks são disparados SOMENTE em complete (Passo 2).
   */
  submitInitial: publicProcedure
    .input(leadBaseSchema)
    .mutation(async ({ input }) => {
      console.log(`[leads.submitInitial] ▶ sessionId=${input.sessionId} nome=${input.nome} — sem webhook (evitar duplicidade)`);

      // Notifica o proprietário (não-crítico — falha silenciosa)
      try {
        await notifyOwner({
          title: "🔔 Novo lead iniciado — Mora Care",
          content: `**Nome:** ${input.nome}\n**Telefone:** ${input.telefone}\n**E-mail:** ${input.email}\n**Tipo de Plano:** ${input.tipoPlano}\n**Status:** Iniciando preenchimento\n**Data:** ${nowBR()}\n\n_Aguardando confirmação em /complete..._`,
        });
      } catch (notifyErr) {
        console.warn("[leads.submitInitial] Notificação ao owner falhou:", notifyErr instanceof Error ? notifyErr.message : String(notifyErr));
      }

      return { success: true };
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
      console.log(`[leads.complete] ▶ sessionId=${input.sessionId} nome=${input.nome}`);

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

      let results = { sheets: false, botconversa: false };

      try {
        // BLOQUEANTE: aguarda ambos os webhooks antes de retornar
        results = await sendLeadToAll(payload);
        console.log(`[leads.complete] ✅ Webhooks concluídos — Sheets: ${results.sheets} | BotConversa: ${results.botconversa}`);
      } catch (webhookErr) {
        // Webhook falhou mas NÃO quebramos a rota — apenas logamos
        console.error("[leads.complete] ❌ Erro nos webhooks:", webhookErr instanceof Error ? webhookErr.message : String(webhookErr));
      }

      // Notifica o proprietário (não-crítico — falha silenciosa)
      try {
        await notifyOwner({
          title: "✅ Lead CONCLUÍDO — Mora Care",
          content: `**Nome:** ${input.nome}\n**Telefone:** ${input.telefone}\n**E-mail:** ${input.email}\n**Tipo de Plano:** ${input.tipoPlano}\n**Status:** Lead Concluiu\n**Data:** ${nowBR()}\n\n_Sheets: ${results.sheets ? "✅" : "❌"} | BotConversa: ${results.botconversa ? "✅" : "❌"}_`,
        });
      } catch (notifyErr) {
        console.warn("[leads.complete] Notificação ao owner falhou:", notifyErr instanceof Error ? notifyErr.message : String(notifyErr));
      }

      // return APÓS todos os awaits — crítico no serverless
      return { success: true, dispatched: results };
    }),
});
