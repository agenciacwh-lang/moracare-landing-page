# Mora Care Landing Page — TODO

## Fase 1: Backend e Schema
- [x] Atualizar tabela `leads` com campos: tipoPlano, status (Incompleto/Concluido), sessionId
- [x] Executar migração SQL da tabela leads atualizada
- [x] Criar/atualizar helper `insertLead` e `updateLeadStatus` em server/db.ts
- [x] Criar procedure tRPC `leads.submitInitial` — Tiro Imediato (status=Incompleto)
- [x] Criar procedure tRPC `leads.complete` — Conclusão do funil (status=Concluido)
- [x] Configurar envio de webhook com payload flat (campos na raiz, sem objetos aninhados)
- [x] Configurar notificação ao proprietário a cada novo lead

## Fase 2: Design System Premium
- [x] Paleta sofisticada: fundo escuro profundo + dourado premium + branco puro
- [x] Tipografia: Playfair Display (títulos) + Inter (corpo)
- [x] Atualizar index.css com variáveis CSS, tokens visuais e utilitários
- [x] Atualizar index.html com meta tags, lang=pt-BR e Google Fonts
- [x] Tema dark como padrão no App.tsx

## Fase 3: Hero Section + Tiro Imediato
- [x] Navbar com logo Mora Care + CTA âncora
- [x] Hero: título exato "Blinde a Saúde da Sua Família ou Empresa..."
- [x] Hero: subtítulo exato sobre consultoria gratuita
- [x] Formulário: Nome, Telefone, E-mail, Tipo de Plano (Individual/Familiar/PJ/MEI)
- [x] Botão CTA: "✓ SOLICITAR COTAÇÃO AGORA"
- [x] Lógica Tiro Imediato: envio em background ao clicar (antes de avançar)
- [x] Estados: loading, sucesso e erro no formulário

## Fase 4: Demais Seções e Footer
- [x] Seção Operadoras: carrossel/grid com Hapvida, Unimed, Amil, SulAmérica, Bradesco Saúde
- [x] Seção Hospitais de Referência na Região (Curitiba/RM)
- [x] Seção Autoridade: título e texto exatos sobre consultores independentes
- [x] Footer: Moracare Saúde e Benefícios, CNPJ, endereço, horário, contato

## Fase 5: Integrações, Testes e Entrega
- [x] Configurar WEBHOOK_URL via variável de ambiente (aguardando URL do cliente)
- [x] Testar fluxo completo: formulário → DB → webhook → notificação
- [x] Escrever testes Vitest para procedures de leads (7/7 passando)
- [x] Verificar responsividade mobile/tablet/desktop
- [x] Salvar checkpoint final

## Refatoração: Arquitetura Sem Banco de Dados (Google Sheets + BotConversa)
- [x] Configurar variáveis de ambiente: BOTCONVERSA_WEBHOOK_URL, GOOGLE_SHEETS_WEBHOOK_URL, FB_PIXEL_ID, FB_CAPI_TOKEN, SITE_URL
- [x] Remover dependência de DATABASE_URL e ORM do servidor
- [x] Criar service `webhookService.ts` com funções sendToSheets() e sendToBotConversa()
- [x] Refatorar procedure `leads.submitInitial` para disparar apenas webhooks (sem DB)
- [x] Refatorar procedure `leads.complete` para disparar apenas webhooks (sem DB)
- [x] Garantir payload flat no BotConversa (campos na raiz, sem objetos aninhados)
- [x] Garantir sessionId para rastreamento entre Passo 1 e Passo 2
- [x] Atualizar testes Vitest para nova arquitetura sem DB (14/14 passando)
- [x] Verificar fluxo completo: formulário → Sheets → BotConversa → notificação
