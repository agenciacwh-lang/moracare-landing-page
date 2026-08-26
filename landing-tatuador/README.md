# Landing page — Wilker Tatuador

Página estática de conversão (HTML + CSS + JS, arquivo único, sem build).
Abra `index.html` no navegador ou publique a pasta em qualquer host estático
(Vercel, Netlify, Hostinger, GitHub Pages).

## Fotos reais — como colocar

A página já tem os "encaixes" prontos. Basta salvar as fotos na pasta `fotos/`
com os nomes exatos da tabela em [`fotos/LEIA-ME.md`](fotos/LEIA-ME.md):
a foto aparece sozinha por cima do desenho de linha, sem mexer no HTML.
Se o arquivo não existir, o desenho de linha continua no lugar — a página
nunca fica com um buraco.

Resumo dos nomes: `hero-01..03`, `portfolio-01..09`, `traco-recem-feita`,
`traco-cicatrizada`, `sobre`, `estudio-01..03` (todos `.jpg`).

## Feed do Instagram (posts reais, sem baixar nada)

A seção "Direto do Instagram" carrega publicações reais no navegador de quem
visita, usando o embed oficial. No fim do `index.html`, edite:

```js
const INSTAGRAM_POSTS = ["CfnD7xSM9N5"];
```

Cole o código de cada post — o trecho depois de `/p/` no link
(`instagram.com/p/CfnD7xSM9N5/` → `"CfnD7xSM9N5"`). Lista vazia faz a seção
sumir da página. Post apagado ou código errado aparece como bloco em branco,
então confira os links depois de colar.

## O que trocar antes de publicar

| Onde | O quê |
|---|---|
| `<script>` no fim do arquivo — `CONFIG` | número do WhatsApp (`DDI+DDD+número`) e a mensagem pré-preenchida |
| `INSTAGRAM_POSTS` | códigos dos posts que devem aparecer no feed |
| `.topbar` | aviso de agenda/vagas do mês |
| Hero (`#topo`) | headline, cidade e os 4 números de prova social (tattoos, anos, nota, material) |
| `#portfolio` | nome, local e duração de cada peça no `<figcaption>` |
| `#depoimentos` | depoimentos reais (nome, peça e texto) |
| `#estudio` / rodapé | endereço, horário, telefone e formas de pagamento |
| `<head>` | `<title>`, description e favicon |

> Os números (+1.200 tattoos, 9 anos, 5,0 no Google, 180+ avaliações), os
> depoimentos, o endereço e o telefone são **exemplos** — troque pelos dados
> reais antes de subir a página.

## Estrutura da página (ordem de conversão)

1. Barra de escassez + menu fixo com CTA
2. Hero: promessa + CTA WhatsApp + provas numéricas
3. Faixa de garantias (biossegurança, tintas, retoque, parcelamento)
4. Estilos: minimalista, fineline, escrita e ornamental delicado
5. Portfólio com filtros por estilo
6. Feed real do Instagram (embed oficial)
7. Durabilidade: comparador arrastável "recém-feita x 1 ano depois"
8. Sobre o tatuador + credenciais de biossegurança
9. Como funciona em 4 passos
10. Depoimentos 5 estrelas
11. Estúdio (fotos, endereço, horário, pagamento)
12. FAQ (quebra de objeções: preço, dor, sinal, traço fino, cuidados)
13. CTA final com escassez + rodapé
14. Botão flutuante de WhatsApp + barra fixa de CTA no mobile

## Observações

- Dark mode nativo, responsivo de 360px a 1440px+.
- Respeita `prefers-reduced-motion`.
- Sem dependências externas além do Google Fonts (Bebas Neue, Inter, Cormorant
  Garamond) e do embed do Instagram.
