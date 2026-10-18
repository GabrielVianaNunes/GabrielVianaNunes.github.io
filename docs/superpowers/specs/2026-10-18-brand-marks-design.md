# Marcas de ferro, luz do dia e divisores com estrela — design

## Goal

Aprofundar a linguagem western do site com detalhes autorais, sem pixel art, ilustração ou humor.

## Elements

### Marcas de ferro (brand marks)
- Cada projeto ganha uma marca no estilo das marcas de gado: uma letra em Rye com modificadores
  tradicionais, montada só com CSS (sem imagens). O nome da marca aparece em fonte mono embaixo.
  - Case do SENAI (metrologia): **Rocking M** (letra com arco embaixo)
  - Ultralino: **Lazy U** (letra deitada)
  - Developer Black Box: **Bar B** (barra em cima)
  - Logo do topo e do rodapé: a logo GVN "Lasso Dial V" (ver seção Logo), que queima assim que a página
    abre (topo) e ao chegar no rodapé
- Os nomes das marcas são jargão de rancho e ficam sem tradução; o elemento é `aria-hidden`.
- Ao entrar na tela a marca é "marcada a fogo" (GSAP): o ferro é pressionado (escala 1,5 para 1 em 0,17 s),
  a marca nasce branca-incandescente com brilho de brasa, esfria para laranja e depois para o latão em cerca de
  2 s, deixa uma chamuscada no card e solta brasas que sobem e somem. Passar o mouse sobre a marca repete a
  marcação. Com `prefers-reduced-motion` a marca aparece parada, sem efeito.
- Nos cards, a marca flutua à direita e o texto a contorna.

### Luz do dia (`assets/js/daylight.js`)
- Camada fixa atrás do conteúdo com um brilho radial que acompanha a rolagem: amanhecer no topo (claro,
  à esquerda e baixo), meio-dia no meio (alto) e entardecer no fim (ferrugem, à direita e baixo).
- Intensidade menor no tema claro. Sem `prefers-reduced-motion`, atualiza com rolagem e redimensionamento;
  com ele, fica parada na posição atual.

### Divisores com estrela
- Entre seções, um fio fino com uma estrela pequena (★) no centro, só CSS (`.section + .section`).

## Constraints

- Sem novas chaves de tradução; conteúdo e idiomas inalterados.
- Contraste AA mantido; nada de brilho forte que atrapalhe a leitura.
- Funciona nos dois temas e em 375px sem rolagem horizontal.

## Files

`index.html` (4 marcas, rodapé reestruturado, script novo), `assets/css/styles.css`,
`assets/js/scroll-effects.js` (queima da marca), `assets/js/daylight.js` (novo).

### Logo GVN: "Lasso Dial V"
- Símbolo único em latão (`assets/img/logo.svg`), desenhado como uma corda só com o nó da honda:
  a haste esquerda e a diagonal formam o **N**; a diagonal e o braço "lançado" formam o **V**; o laço grande é
  o **G**, o mostrador de instrumento e o laço de vaqueiro ao mesmo tempo.
- Segundo significado: a diagonal e o braço formam um sinal de raiz (√) e lembram o símbolo de acabamento de
  superfície dos desenhos de usinagem (referência à metrologia); o entalhe entre o braço e a barra é um V
  de verdade, como o de um bloco em V ou de uma mira.
- Fraqueza conhecida: o N é a letra mais fraca (pode ser lido como "NV" ou "IV" fora de contexto) e em 16px
  o conjunto vira um símbolo compacto.
- Favicon: `assets/img/favicon.svg` e `favicon.png` (símbolo sobre quadrado escuro); `og-image.png` usa o símbolo.
- Cabeçalho e rodapé usam o SVG inline com `currentColor`, para que a marcação a fogo (cor) funcione.
- O registro como marca depende de busca de anterioridade no INPI, que não foi feita.
