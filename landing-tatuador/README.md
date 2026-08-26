# Landing page — Wilker Tatuador

Página estática de conversão (HTML + CSS + JS, arquivo único, sem build).
Abra `index.html` no navegador ou publique a pasta em qualquer host estático
(Vercel, Netlify, Hostinger, GitHub Pages).

## O que trocar antes de publicar

| Onde | O quê |
|---|---|
| `<script>` no fim do arquivo — `CONFIG` | número do WhatsApp (`DDI+DDD+número`) e a mensagem pré-preenchida |
| `.topbar` | aviso de agenda/vagas do mês |
| Hero (`#topo`) | cidade, headline e os 4 números de prova social (tattoos, anos, nota, material) |
| `#portfolio` | trocar cada `<figure class="tile">` pela foto real (`<img src="fotos/…" alt="…">` no lugar do `<svg class="art">`) |
| `#cobertura` | fotos reais de antes/depois nos dois lados do comparador |
| `#sobre`, `#estudio` | foto do Wilker tatuando e fotos do estúdio (blocos com ícone de câmera) |
| `#depoimentos` | depoimentos reais (nome, peça e texto) |
| `#estudio` / rodapé | endereço, horário, telefone e formas de pagamento |
| `<head>` | `<title>`, description e favicon |

As artes de linha em SVG são **placeholders autorais** — servem para o layout
respirar enquanto as fotos reais não entram, e podem ser removidas depois.

## Estrutura da página (ordem de conversão)

1. Barra de escassez + menu fixo com CTA
2. Hero: promessa + CTA WhatsApp + provas numéricas
3. Faixa de garantias (biossegurança, tintas, retoque, parcelamento)
4. Estilos que ele tatua
5. Portfólio com filtros por estilo
6. Cobertura: comparador antes/depois arrastável
7. Sobre o tatuador + credenciais de biossegurança
8. Como funciona em 4 passos
9. Depoimentos 5 estrelas
10. Estúdio (fotos, endereço, horário, pagamento)
11. FAQ (quebra de objeções: preço, dor, sinal, cuidados)
12. CTA final com escassez + rodapé
13. Botão flutuante de WhatsApp + barra fixa de CTA no mobile

## Observações

- Dark mode nativo, responsivo de 360px a 1440px+.
- Respeita `prefers-reduced-motion`.
- Sem dependências externas além do Google Fonts (Bebas Neue, Inter, Cormorant Garamond).
