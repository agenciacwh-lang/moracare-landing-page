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

## Identidade Visual Definitiva — Paleta Mora Care
- [x] Reescrever index.css com tokens da paleta definitiva (#4a87b9, #83d6d3, #abba3b, #ffffff)
- [x] Atualizar tema para light (fundo branco) e ajustar variáveis semânticas
- [x] Refatorar Navbar: azul primário no fundo/logo, CTA verde
- [x] Refatorar HeroSection: fundo gradiente azul, títulos brancos, CTA verde
- [x] Refatorar formulário de captura: inputs limpos, botão CTA verde
- [x] Refatorar OperatorsSection: cards brancos, ícones teal, bordas azul claro
- [x] Refatorar AuthoritySection: fundo azul gradiente, texto branco, ícones teal, stats verdes
- [x] Refatorar Footer: fundo azul escuro, texto branco, links teal

## Correções de Contraste e Legibilidade
- [x] Adicionar cor grafite #1e293b como variável CSS padrão para textos sobre fundo claro
- [x] Atualizar .btn-cta: texto grafite #1e293b (bold) sobre verde #abba3b
- [x] Garantir que texto branco só apareça sobre azul profundo (#1e4f7a / #2d6a9f / #4a87b9)
- [x] Nunca usar texto branco sobre teal #83d6d3 — usar grafite nesses casos
- [x] Corrigir parágrafos e descrições sobre fundo branco/cinza claro para grafite
- [x] Corrigir títulos: font-weight bold/extrabold, cor azul ou grafite sobre fundos claros
- [x] Revisar HeroSection: subtítulo, trust items e micro-prova social
- [x] Revisar formulário: labels, placeholders e textos de apoio
- [x] Revisar OperatorsSection: nomes de operadoras, especialidades de hospitais
- [x] Revisar BenefitsSection: títulos e descrições dos cards
- [x] Revisar AuthoritySection: textos sobre fundo azul (manter branco + #e2f0fb para melhor contraste)
- [x] Revisar Footer: garantir legibilidade dos links e informações de contato

## Galeria de Hospitais com Fotos Reais
- [x] Upload das 5 imagens reais dos hospitais para o storage do projeto
- [x] Substituir lista de ícones por grid fotográfico premium (1 col mobile / 2 tablet / 3 desktop)
- [x] Cantos arredondados (rounded-2xl) e sombra elegante (shadow)
- [x] Efeito hover: zoom suave na imagem (scale-105, transition 500ms ease-out)
- [x] Legenda sobreposta na parte inferior com gradiente escuro para leitura perfeita
- [x] Nome do hospital em branco + especialidade em teal sobre o gradiente

## Adaptação para Deploy na Vercel (Serverless)
- [x] Analisar entrypoint atual do Express (server/_core/index.ts)
- [x] Criar vercel.json com builds e rewrites (frontend estático + API serverless)
- [x] Criar api/index.ts exportando o app Express sem listen() em produção
- [x] Garantir que o build do Vite gera os estáticos em dist/public (confirmado)
- [x] Adicionar script build:vercel ao package.json (apenas vite build, sem esbuild)
- [x] Fazer push para GitHub com as adaptações Vercel (commit f04f516)

## Refatoração Vercel Serverless Estrita
- [x] Reescrever api/index.ts: Express puro, sem listen(), contexto tRPC correto (já estava correto)
- [x] Reescrever vercel.json exato: @vercel/node + @vercel/static-build
- [x] Ajustar package.json: build = "vite build" gerando estáticos no diretório correto
- [x] Remover Vite middleware do entrypoint de produção (não estava no api/index.ts)
- [x] Testar build local (dist/public gerado) e rodar testes (17/17 passando)
- [x] Push para GitHub com arquitetura serverless estrita (commit b76fb2b)

## Correções Pós-Deploy (v2)
- [x] Corrigir webhookService.ts: garantir await correto nas chamadas fetch (bug crítico)
- [x] Adicionar logs console.log de sucesso/erro nos disparos de webhook
- [x] Corrigir imagens dos hospitais: re-upload via manus-upload-file --webdev
- [x] Criar página de Obrigado (/confirmado) com mensagem de sucesso e CTA WhatsApp
- [x] Redirecionar formulário para /confirmado após sucesso
- [x] Substituir '2h' / '2 horas' por '5 min' / '5 minutos' em toda a landing page
- [x] Tornar todos os telefones links clicáveis para WhatsApp
- [x] Atualizar link Instagram para https://www.instagram.com/moracare.saude/
- [x] Atualizar link Facebook para https://www.facebook.com/KPLEMCorretora
- [x] Testar build Vite sem erros
- [x] Push para GitHub e checkpoint

## Atualização de Fotos dos Hospitais (v3)
- [x] Upload das 5 novas fotos dos hospitais enviadas pelo cliente
- [x] Atualizar URLs das imagens em OperatorsSection.tsx com os novos paths do storage
