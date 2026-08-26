# Pasta de fotos

Salve as fotos aqui com **exatamente** estes nomes. Assim que o arquivo existir,
ele entra sozinho no lugar do desenho de linha — não precisa mexer no HTML.
Se o arquivo não existir, a página continua funcionando com o placeholder.

| Arquivo | Onde aparece | Formato ideal |
|---|---|---|
| `hero-01.jpg` · `hero-02.jpg` · `hero-03.jpg` | cluster de artes do topo | vertical 3:4 |
| `portfolio-01.jpg` … `portfolio-09.jpg` | grade do portfólio (9 fotos) | vertical 4:5 |
| `traco-recem-feita.jpg` | lado esquerdo do comparador | horizontal 16:10 |
| `traco-cicatrizada.jpg` | lado direito do comparador (mesma tattoo, cicatrizada) | horizontal 16:10 |
| `sobre.jpg` | retrato do Wilker tatuando | vertical 4:5 |
| `estudio-01.jpg` | foto ampla do estúdio | horizontal 16:9 |
| `estudio-02.jpg` · `estudio-03.jpg` | bancada e recepção | horizontal 4:3 |

Dicas rápidas:

- JPG de até ~400 KB cada (largura de 1200 px a 1600 px já basta).
- A ordem do portfólio segue os filtros: 01/05/08 = minimalista, 02/06/09 = fineline,
  03 = escrita, 04/07 = ornamental. Se trocar a ordem, ajuste o `data-cat` no HTML.
- Para trocar o texto de cada foto (nome da peça, local e duração), edite o
  `<figcaption>` correspondente no `index.html`.
