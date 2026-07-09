# Estado atual do projeto — Portfólio Gabriel Nunes

> **Mapa do projeto:** existe um grafo de conhecimento gerado com `graphify` em
> `graphify-out/`. Antes de vasculhar o código manualmente, rode
> `graphify query "<pergunta>"`, `graphify path "<A>" "<B>"` ou
> `graphify explain "<conceito>"`. `graphify-out/GRAPH_REPORT.md` tem os "God
> Nodes" e as comunidades detectadas. Regenerar com `graphify . --update`
> depois de mudanças grandes.

> Última atualização: 2026-07-09 (favicon e og-image gerados — monograma
> "GN" e card de preview de link, ambos estavam vazios/0 bytes)

## Próximos passos

- [x] ~~Ajustar a duração/visibilidade da transição de círculo no toggle de
      tema~~ — testado 0.5s vs 0.8s ao vivo com o usuário; confirmado que
      0.5s (valor original) já era visível, o problema era cache de
      navegador/CDN do GitHub Pages, não o código.
- [x] ~~`assets/img/favicon.png` estava vazio (0 bytes)~~ — gerado um
      monograma "GN" (fundo azul `--primary`, quadrado arredondado 128×128)
      via script Python/Pillow, salvo no mesmo caminho.
- [x] ~~`assets/img/og-image.png` estava vazio (0 bytes)~~ — gerada uma
      imagem 1200×630px (fundo escuro, glow azul sutil, monograma GN,
      badge "Ex-intern at ZEISS · Germany", nome, cargo, localização, URL)
      via script Python/Pillow, mesma identidade visual do site.
- [ ] Trocar `assets/img/profile.jpg` por uma foto mais profissional (a atual
      é uma selfie casual) — layout já preparado para receber o arquivo no
      mesmo caminho, sem precisar mexer em código.
- [ ] Revisar o card do **Ultralino** na seção Projects conforme o robô
      evoluir (ainda em desenvolvimento no SENAI) — descrição/tags em
      `assets/js/i18n.js` (`projects.ultralino.*`).
- [ ] Confirmar se a previsão de conclusão do curso (final de 2026) na seção
      Experience ainda está correta perto da formatura.
- [x] ~~Dar `git push` quando aprovar o resultado~~ — feito em 2026-07-07.
- [x] ~~Renomear o repositório para ficar com URL limpa~~ — repositório
      renomeado para `GabrielVianaNunes.github.io` (público), URL final:
      `https://gabrielviananunes.github.io/`.
- [ ] Ativar o GitHub Pages nas configurações do repositório (Settings →
      Pages → Branch `main` → pasta `/ (root)`) para o site ficar no ar.
- [ ] Depois do próximo deploy, testar a prévia real do link no
      WhatsApp/LinkedIn/Twitter (ferramentas como o Facebook Sharing
      Debugger ajudam a forçar o recache do `og:image` nessas plataformas,
      já que costumam cachear a prévia antiga por um tempo).
- [x] ~~Mesclar a branch `mobile-effects` para `main`~~ — feito em 2026-07-09
      (fast-forward), worktree e branch removidos.

---

## Status atual (resumo)

| Área | Status | Detalhe |
|---|---|---|
| Estrutura base do site | ✅ Pronto | HTML/CSS/JS puro, sem build tools, GitHub Pages |
| Tema claro/escuro | ✅ Pronto | Toggle manual, persistido, sem flash (FOUC guard) |
| i18n (PT/EN/DE/ES) | ✅ Pronto | Dicionário completo em `assets/js/i18n.js`, detecção de idioma do navegador |
| Nav responsivo | ✅ Pronto | Menu hambúrguer mobile, scroll-reveal, destaque de link ativo |
| Seções de conteúdo | ✅ Pronto | Hero, Sobre, Experience (novo), Skills (reorganizado), Projects (case studies), Contato |
| Ícones das competências | ✅ Pronto | Todos os itens de Skills têm ícone (devicon ou SVG próprio) |
| Dados de contato reais | ✅ Pronto | E-mail, LinkedIn, GitHub, CV — todos conferidos byte a byte |
| Push para o GitHub | ✅ Feito | Repositório renomeado para `GabrielVianaNunes.github.io` (público), URL final `https://gabrielviananunes.github.io/` |
| GitHub Pages ativo | ✅ Feito | Site no ar em `https://gabrielviananunes.github.io/` |
| Scroll storytelling / motion (GSAP) | ✅ Pronto e mesclado | 8/8 tarefas, auditoria aprovada, mesclado para `main` em 2026-07-09 (fast-forward) — ver "Sessão scroll storytelling" abaixo. |
| Efeitos interativos (botões magnéticos, transição de tema, terminal) | ✅ Pronto e mesclado | 5/5 tarefas, auditoria aprovada, mesclado para `main` em 2026-07-09 (fast-forward) — ver "Sessão efeitos interativos" abaixo. O tilt 3D nos cards implementado nessa sessão foi removido depois, ver "Sessão efeitos mobile". |
| Efeitos mobile (menu animado, tap feedback, parallax mobile) | ✅ Pronto e mesclado | 6/6 tarefas, auditoria aprovada, mesclado para `main` em 2026-07-09 (fast-forward) — ver "Sessão efeitos mobile" abaixo. O tilt por giroscópio implementado nessa sessão foi removido depois a pedido do usuário (não gostou do efeito). |

## Sessão de reforma completa (2026-07-06 / 2026-07-07)

Resumo cronológico completo em `git log`. Pontos principais:

### Redesign via plano de 11 tarefas (subagent-driven-development)

Fluxo completo: brainstorming → spec → plano de implementação → execução
tarefa por tarefa com implementador + revisor dedicados, terminando em
revisão final de branch e merge para `main` (worktree em
`.worktrees/portfolio-redesign`, removido após o merge).

1. **Fundação** — consolidação de tokens de CSS duplicados, fonte
   JetBrains Mono, asset do CV, servidor de preview local.
2. **Tema claro/escuro** — `assets/js/theme.js`, toggle manual com
   persistência em `localStorage`, guarda contra flash (FOUC). Bug
   encontrado e corrigido na revisão: `.tags li` ainda respondia à media
   query `prefers-color-scheme` em vez do atributo `data-theme` — corrigido
   para seguir o mesmo mecanismo do resto do site.
3. **Motor de i18n** — `assets/js/i18n.js`, dicionário completo (~75 chaves
   × 4 idiomas), dropdown de idioma acessível por teclado, detecção do
   idioma do navegador com fallback em inglês.
4. **Nav responsivo** — `assets/js/main.js`, menu hambúrguer, scroll-reveal,
   destaque do link ativo conforme scroll.
5–10. **Reescrita de conteúdo** — Hero (badge ZEISS + localização + CV),
   Sobre (narrativa mais pessoal), Experience (nova seção — timeline SENAI
   FATESG + estágio ZEISS), Skills (categorizado), Projects (case studies),
   Contato/rodapé (dados reais).
11. **Auditoria final** — checagem cross-viewport, matriz tema×idioma (8
    combinações), navegação por teclado, rede/console. Bug encontrado e
    corrigido: os itens do dropdown de idioma não tinham `tabindex`/
    `:focus-visible`/handler de teclado — corrigido com navegação por
    setas e seleção por Enter/Espaço.

Revisão final de branch (12 commits): **aprovada para merge**, sem
problemas críticos. Merge feito via fast-forward para `main`.

### Ajustes pós-implantação (mesma sessão, direto na `main`)

- Projects simplificado: removidos os 3 projetos secundários antigos
  (Library System, Contacts Agenda, Vehicle Rental) e o badge "Case em
  destaque" do SENAI (não fazia mais sentido sem outros cases ao lado).
  Adicionado o card do **Ultralino** (robô Python + Playwright que
  automatiza cadastro no UltraLIMS do SENAI — projeto irmão deste, ver
  `senai_cadastro/README.md`), marcado como "Em andamento".
- Bandeira de "Español" no card de Idiomas trocada de Argentina para
  Espanha, alinhando com o dropdown de seleção de idioma.
- 12 ícones ilustrativos novos (SVG próprio, estilo consistente com os já
  existentes) para competências que não tinham nenhuma imagem (APIs REST,
  Autenticação, H2 Database, Interfaces responsivas, Modelagem de dados,
  SQL, Power BI, Desenvolvimento Full Stack, Automação de processos,
  Integração de sistemas, Arquitetura de software, Design patterns) + ícone
  oficial da devicon para PrimeNG.
- Bug encontrado e corrigido: a própria devicon define o ícone do Angular
  como branco (`#fff`), ficando invisível no tema claro — corrigido para a
  cor real da marca (`#dd0031`).
- Bug de layout corrigido: o CSS Grid esticava cada item de "Outras
  competências" até a altura do item mais alto da linha ("Design
  patterns"), centralizando o ícone dos itens curtos no meio da caixa
  esticada — trocado para `align-items: start`, alinhamento uniforme.
- Texto de "Design patterns" encurtado, removendo a lista de exemplos entre
  parênteses (ficava poluído/quebrava em várias linhas).
- Corrigida a URL canônica/`og:url` no `<head>`, que apontava para um
  domínio incorreto (`gabrielnunes.github.io`) — agora aponta para a URL
  real do GitHub Pages deste repositório.
- README.md, PROJECT_STATUS.md e mapeamento do projeto via `graphify`
  (57 nós, 52 arestas, 15 comunidades) adicionados — ver `graphify-out/`.

### Timeline de Experience completada (a partir do CV real)

A timeline tinha só 2 marcos (SENAI FATESG + ZEISS Alemanha), mas o CV
completo do usuário mostra uma progressão de 4 etapas até a Alemanha.
Adicionados os 2 estágios que faltavam, na ordem cronológica correta:

- **FIEG** (Federação das Indústrias do Estado de Goiás) — Estagiário de
  Engenharia de Software, jun/2024 – dez/2024 (7 meses). Etapa do processo
  seletivo do SENAI para o intercâmbio internacional na ZEISS.
- **SENAI ZEISS Centro de Excelência em Metrologia** — Estagiário de
  Desenvolvimento Web e Metrologia, jan/2025 – set/2025 (9 meses), Goiânia.
  Desenvolvimento web + operação de equipamentos de metrologia de precisão
  (Duramax, O-Inspect, Prismo, Bosello Max) — o estágio imediatamente
  anterior à ida para a Alemanha.

Timeline final: SENAI FATESG (educação, em andamento) → FIEG → SENAI ZEISS
Metrologia → ZEISS Alemanha (destaque).

## Sessão scroll storytelling (2026-07-08)

- Explicado ao usuário o problema do favicon/og-image vazios e o que é uma
  foto de perfil "mais profissional" (enquadramento, iluminação, roupa) —
  nenhuma mudança de código, só orientação; os itens continuam pendentes em
  "Próximos passos".
- Brainstorm + spec + plano para a próxima grande feature: efeitos de
  scroll (GSAP/ScrollTrigger) evoluindo o visual minimalista atual com mais
  movimento, sem mudar cores/tipografia/layout. Decisões chave do usuário:
  manter a base minimalista (não redesenhar visualmente), usar GSAP via CDN
  (não 100% vanilla), focar só em "scroll storytelling avançado" (cascata +
  parallax + timeline se desenhando) — ficaram de fora dessa rodada:
  botões magnéticos, tilt 3D nos cards, transição animada do tema, elemento
  tipo terminal.
- Spec: `docs/superpowers/specs/2026-07-08-scroll-storytelling-design.md`.
  Plano: `docs/superpowers/plans/2026-07-08-scroll-storytelling.md` (8
  tarefas, execução via subagent-driven-development, worktree
  `.worktrees/scroll-storytelling`).
- Task 1 (fundação: GSAP/ScrollTrigger via CDN, barra de progresso,
  remoção do sistema antigo de fade-in `data-reveal`) concluída e revisada
  — aprovada sem pendências. Commits `66da870..3af6b5d` na branch
  `scroll-storytelling`.

## Sessão scroll storytelling — feature completa + auditoria final (2026-07-09)

Retomada e conclusão das 8 tarefas do plano
(`docs/superpowers/plans/2026-07-08-scroll-storytelling.md`), todas via
`subagent-driven-development`, cada uma implementada e revisada
individualmente antes da próxima:

1. **Fundação (Task 1)** — GSAP + ScrollTrigger via CDN (`gsap@3.12.5`),
   barra de progresso de leitura (`.scroll-progress`), remoção completa do
   sistema antigo de fade-in por atributo `data-reveal`.
2. **Parallax por seção (Task 2)** — blob de fundo sutil (`.section-parallax`)
   em cada seção principal, movendo-se com `scrub` conforme o scroll.
   Desativado em mobile (`max-width: 768px`) e com `prefers-reduced-motion`.
3–5. **Cascata de revelação (Tasks 3–5)** — helper reutilizável
   `revealGroup(container, itemSelector, staggerAmount)` em
   `assets/js/scroll-effects.js`, aplicado em Hero, Sobre, Contato e Skills
   (categorias técnicas, soft skills, idiomas).
6. **Cards de Projects (Task 6)** — timeline aninhada por card: o card
   revela primeiro, as tags do card em cascata logo em seguida.
7. **Timeline de Experience (Task 7)** — cada item revela individualmente
   ao entrar na viewport; a linha vertical da timeline (`.timeline-line`)
   se desenha progressivamente (`height: 0% → 100%`) conforme o scroll,
   com `scrub`.
8. **Auditoria final (Task 8, esta sessão)** — three-pass completo, sem
   bugs encontrados (nenhum fix de código foi necessário):
   - **Reduced-motion:** revisão de código de todas as funções adicionadas
     nas Tasks 2–7 (`initParallax`, `revealGroup`, `initProjectCards`,
     `initTimeline`) — todas têm guarda `if (prefersReduced) {...; return;}`
     antes de qualquer `gsap.set`/`gsap.to`, todas deixam o estado final
     visível (`opacity: 1`, linha da timeline em `height: '100%'`), sem
     transform/offset preso a meio caminho.
   - **Mobile (375×812):** sem scroll horizontal em nenhuma posição de
     scroll; blobs de parallax presentes no DOM mas com `transform: none`
     durante todo o scroll (desativados conforme o spec); cascata,
     barra de progresso e linha da timeline continuam animando
     normalmente. Screenshots de Hero/Skills/Experience conferidos.
   - **Regressão completa (desktop):** toggle de tema (blobs de parallax
     acompanham `var(--primary)`/`var(--border)` corretamente, sem
     glitch visual); dropdown de idioma testado em `de`/`es`/`en`/`pt` —
     texto atualiza certo e nenhuma animação já concluída "pisca" de
     volta para invisível ao trocar idioma; menu hambúrguer mobile abre e
     fecha normalmente; nav ativo por scroll (`initActiveNav`, em
     `main.js`, não alterado por este plano) testado ponta a ponta;
     requisições de rede conferidas (GSAP e ScrollTrigger CDN retornam
     `200`, nenhum `404` em lugar nenhum); console sem erros em todas as
     combinações de viewport/tema/idioma testadas.
   - **Observação (não é bug deste plano):** o destaque de nav ativo por
     scroll (`initActiveNav`, `IntersectionObserver` com
     `rootMargin: '-40% 0px -50% 0px'`) nunca marca "Contato" como ativo
     quando a página está no scroll máximo, porque a seção Contato é curta
     demais para cruzar a faixa de interseção antes do fim do documento.
     Comportamento idêntico já existia antes da Task 1 (lógica
     byte-a-byte igual em `main.js`) — não é uma regressão deste plano,
     por isso não foi alterado aqui (fora do escopo desta auditoria).
   - Nenhum fix de código foi necessário nesta tarefa — a única mudança é
     esta atualização do `PROJECT_STATUS.md`.
- **Não-objetivos explícitos do spec** (combinados com o usuário no
  brainstorm, ver spec) — no momento desta sessão (2026-07-08), ainda **não
  implementados**: botões magnéticos, tilt 3D nos cards, transição animada
  no toggle de tema, elemento tipo terminal/código digitando.
  **[SUPERADO em 2026-07-09]** os quatro itens foram implementados na
  "Sessão efeitos interativos (2026-07-09)" abaixo — ver essa seção para o
  estado atual; esta nota é apenas histórica e não deve mais ser lida como
  pendência.
- **Status:** as 8 tarefas do plano foram completadas, revisadas e
  mescladas para `main` (fast-forward) em 2026-07-09. Worktree e branch
  `scroll-storytelling` removidos após o merge.

## Sessão efeitos interativos (2026-07-09)

Brainstorm + spec + plano para os quatro itens deixados de fora da rodada de
scroll storytelling (2026-07-08): botões magnéticos, tilt 3D nos cards,
transição animada do tema, terminal digitando. Spec:
`docs/superpowers/specs/2026-07-09-interactive-effects-design.md`. Plano:
`docs/superpowers/plans/2026-07-09-interactive-effects.md` (5 tarefas,
execução via `subagent-driven-development`, worktree
`.worktrees/interactive-effects`), cada tarefa implementada e revisada
individualmente antes da próxima:

1. **Botões magnéticos (Task 1)** — `assets/js/interactive-effects.js`
   (módulo novo), `initMagneticButtons()`: todo `.btn` (CTAs do Hero e do
   rodapé/Contato) é puxado sutilmente na direção do cursor via
   `gsap.quickTo` conforme o mouse se aproxima, e volta à posição original
   no `mouseleave`.
2. **Tilt 3D nos cards de Projects (Task 2)** — `initCardTilt()` no mesmo
   módulo: os cards `#projetos .case-study`/`.card` (SENAI, Ultralino)
   inclinam em 3D (`rotationX`/`rotationY` via `gsap.quickTo`) seguindo a
   posição do cursor, com `transformPerspective`/`transformStyle` para o
   efeito de profundidade.
3. **Transição de círculo no toggle de tema (Task 3)** — `assets/js/theme.js`
   passa a usar a View Transitions API nativa
   (`document.startViewTransition`) no clique do `.theme-toggle`: um círculo
   se expande a partir do ponto clicado revelando o novo tema, com fallback
   direto para `toggleTheme()` quando a API não existe no navegador ou
   `prefers-reduced-motion` está ativo. CSS novo em `assets/css/styles.css`
   (`::view-transition-old/new(root)`, `@keyframes theme-circle-reveal`).
4. **Terminal digitando no Hero (Task 4)** — bloco `.hero-terminal`
   decorativo (`aria-hidden`) logo abaixo do CTA do Hero, com efeito de
   máquina de escrever (`initTerminal()`, `setInterval` caractere a
   caractere) rodando três comandos (`whoami`, `cat stack.txt`,
   `./status.sh`) com saída i18n'd nos 4 idiomas
   (`hero.terminal.whoami/stack/status` em `assets/js/i18n.js`). Funciona
   igual em touch (não depende de `canHover`), só desativado por
   `prefers-reduced-motion` (mostra o texto final direto, sem digitação).
5. **Auditoria final (Task 5, esta sessão)** — three-pass completo, sem
   bugs encontrados (nenhum fix de código foi necessário):
   - **Reduced-motion:** revisão de código de `initMagneticButtons`,
     `initCardTilt` e `initTerminal` (`interactive-effects.js`) e do
     handler de clique do `.theme-toggle` (`theme.js`) — todas retornam
     antes de qualquer `gsap`/listener/`startViewTransition` quando
     `prefersReduced` é `true`; o handler de tema lê `prefers-reduced-motion`
     de forma fresca a cada clique (não uma constante de módulo), cobrindo o
     caso do usuário mudar a preferência do SO entre carregamentos.
   - **Touch/coarse-pointer:** confirmado por inspeção de código que
     `initMagneticButtons`/`initCardTilt` checam `canHover` (calculado uma
     vez via `matchMedia('(hover: hover) and (pointer: fine)')`) e que
     `initTerminal` **não** checa `canHover`, rodando igual em touch.
   - **Regressão completa (desktop, via Preview tool):** toggle de tema
     testado ida e volta (`data-theme` flipando corretamente, botões/
     terminal/cards recolorindo, sem erros de console); dropdown de idioma
     testado em `de`/`es`/`en`/`pt` — as três linhas de saída do terminal
     atualizam certo em cada idioma, sem reiniciar a digitação nem
     re-esconder linhas já reveladas; botões magnéticos (`transform`
     muda no `mousemove`, volta a `matrix(1,0,0,1,0,0)` no `mouseleave`) e
     tilt dos cards (`matrix3d` no `mousemove`, volta ao estado de repouso
     no `mouseleave`) re-testados com as quatro tarefas já mescladas —
     confirmado que `.btn` dentro de `.cta`/rodapé e `.case-study`/`.card`
     de Projects continuam conjuntos disjuntos (nenhum `.btn` dentro de um
     card), sem interferência entre os dois efeitos; menu hambúrguer mobile
     e destaque de nav ativo por scroll (`initActiveNav`, não tocado por
     este plano) testados e funcionando.
   - **Mobile (375×812):** sem scroll horizontal
     (`scrollWidth <= clientWidth`); terminal renderiza legível e completa a
     sequência de digitação normalmente (só os efeitos de hover são
     desktop-only, o terminal roda igual).
   - **Rede/console:** todas as requisições da sessão retornaram `200`/`304`
     (GSAP, ScrollTrigger, fontes, ícones, flags, todos os assets locais) —
     nenhum `404`; console sem erros em nenhuma combinação de
     tema/idioma/viewport testada.
   - Nenhum fix de código foi necessário nesta tarefa — a única mudança é
     esta atualização do `PROJECT_STATUS.md`.
- **Não-objetivos do spec de 2026-07-08** (botões magnéticos, tilt 3D nos
  cards, transição animada do tema, terminal digitando) — **todos
  implementados agora**, não ficam mais pendentes.
- **Status:** as 5 tarefas do plano foram completadas, revisadas e
  mescladas para `main` (fast-forward) em 2026-07-09. Worktree e branch
  `interactive-effects` removidos após o merge.

## Sessão efeitos mobile (2026-07-09)

Brainstorm + spec + plano para trazer os efeitos de interação para toque/
mobile-nativo, já que as rodadas anteriores (scroll storytelling, efeitos
interativos) eram desktop-first (`hover`/`mousemove`). Spec:
`docs/superpowers/specs/2026-07-09-mobile-effects-design.md`. Plano:
`docs/superpowers/plans/2026-07-09-mobile-effects.md` (6 tarefas, execução
via `subagent-driven-development`, worktree `.worktrees/mobile-effects`),
cada tarefa implementada e revisada individualmente antes da próxima:

**Observação importante:** antes desse plano começar, o tilt 3D nos cards de
Projects (`initCardTilt`, implementado na "Sessão efeitos interativos"
acima) foi **removido** (commit `b4b5a69`, "Remove efeito de tilt 3D dos
cards de Projects") — decisão do usuário, fora do escopo deste plano. O tilt
por giroscópio da Task 5 abaixo é um efeito novo e independente para
dispositivos touch (`deviceorientation`), **não é uma reintrodução** do tilt
3D antigo baseado em `mousemove` — os dois nunca coexistiram no código.

1. **Morph do ícone hambúrguer (Task 1)** — CSS puro em
   `assets/css/styles.css`: `.nav-toggle-bar` ganhou `transition` e três
   regras `.nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(n)`
   que giram as barras 1/3 em ±45° e escondem a barra do meio, formando um
   X. Não depende de JS novo — só lê o `aria-expanded` que `initMobileNav`
   já definia.
2. **Cascata de revelação dos itens do menu (Task 2)** — primeira mudança em
   `assets/js/main.js` nas três rodadas de efeitos: `initMobileNav` agora
   dispara `gsap.to(menuItems, {opacity, y, stagger: 0.05, ...})` ao abrir o
   menu (`if (isOpen && window.gsap && !prefersReduced)`), com os itens
   entrando em cascata em vez de aparecerem todos de uma vez.
3. **Tap feedback em botões e cards (Task 3)** — `.btn:active` e
   `.case-study:active`/`.card:active` em `assets/css/styles.css` (escala
   sutil ao toque, sem guarda de `canHover` — `:active` funciona
   universalmente e é inerte em dispositivos sem toque). Um workaround de
   uma linha (`initTouchActiveWorkaround`, `touchstart` passivo) foi
   adicionado em `interactive-effects.js` para o Safari iOS reconhecer
   `:active` (bug conhecido do WebKit).
4. **Parallax reativado no mobile (Task 4)** — `initParallax` em
   `assets/js/scroll-effects.js` ganhou um `offsetFactor` (`isMobile ? 0.1
   : 0.2`), reativando o efeito em telas ≤768px na metade da intensidade do
   desktop (estava totalmente desativado em mobile desde a rodada de scroll
   storytelling).
5. **Tilt por giroscópio nos cards de Projects (Task 5)** — `initGyroTilt()`
   novo em `interactive-effects.js`: em dispositivos touch (`canHover ===
   false`), os cards `#projetos .case-study`/`.card` inclinam em 3D
   (`rotationX`/`rotationY` via `gsap.quickTo`) seguindo o `deviceorientation`
   do aparelho, com calibração por baseline (primeiro evento define a
   posição neutra, eventos seguintes calculam delta em relação a ela,
   limitado a ±45° e mapeado para ±2° de rotação). Inclui o fluxo de
   permissão do iOS (`DeviceOrientationEvent.requestPermission`): um botão
   `.gyro-permission-btn` (markup em `index.html`, i18n em `i18n.js`) só
   aparece em navegadores que exigem a permissão explícita, chamando
   `attach()` apenas se o usuário conceder. **Bug encontrado e corrigido
   nessa tarefa:** `.gyro-permission-btn[hidden] { display: none; }` — a
   regra base do botão tinha a mesma especificidade CSS que a regra
   `[hidden]` do UA stylesheet do navegador, e por ordem de origem a regra
   do autor vencia, deixando o botão visível mesmo com `hidden="true"`.
6. **Auditoria final (Task 6, esta sessão)** — three-pass completo:
   - **Reduced-motion (inspeção de código):** confirmado que a cascata do
     menu só roda dentro de `if (isOpen && window.gsap && !prefersReduced)`;
     `initGyroTilt` retorna antes de qualquer listener quando
     `prefersReduced` é `true` (`if (!window.gsap || canHover ||
     prefersReduced) return;`); `initParallax` continua com o guard
     `if (prefersReduced) return;` intacto após a edição da Task 4; a regra
     global `@media (prefers-reduced-motion: reduce) { * {
     transition-duration: 0.001ms !important; ... } }` em
     `assets/css/styles.css` segue intacta e não foi tocada por nenhuma das
     5 tarefas — cobre o morph do ícone e o tap feedback, que são só CSS
     `transition`.
   - **Guards de touch/hover (inspeção de código):** confirmado que
     `initGyroTilt` usa `canHover ||` (polaridade invertida de
     `initMagneticButtons`, que usa `!canHover`) — nunca roda com mouse
     conectado; confirmado que `initTouchActiveWorkaround` e as regras CSS
     `:active` não têm guarda nenhuma, corretamente (tap feedback deve
     funcionar em qualquer dispositivo que gere toque).
   - **Regressão completa (via Preview tool, desktop 1280×800 e mobile
     375×812):** toggle de tema (ida e volta, `data-theme` correto); dropdown
     de idioma nos 4 idiomas (pt/en/de/es, `<h1>` e `lang` do `<html>`
     atualizando certo); terminal do Hero (digitação completa sem erros);
     botões magnéticos (transform muda no `mousemove`, desktop-only,
     confirmado com `canHover: true`); barra de progresso (`width` do
     `.scroll-progress` acompanha o scroll); cascatas de revelação (Hero,
     timeline) com opacidade final `1`; timeline de Experience (itens e
     linha vertical desenhando corretamente) — nenhuma regressão das 5
     tarefas deste plano nos efeitos das rodadas anteriores. Menu mobile
     aberto/fechado 3× seguidas: ícone morfa e cascata replica em toda
     abertura; link clicado fecha o menu e navega para a seção certa
     (confirmado via `el.click()` programático — o clique via coordenadas
     da ferramenta de preview mostrou um resultado inconsistente nessa
     sessão, tratado como limitação da ferramenta, não bug do código, já
     que o clique programático no mesmo elemento sempre fechou o menu e
     navegou corretamente). Parallax comparado matematicamente nos dois
     viewports usando o `progress`/`sectionHeight` do próprio ScrollTrigger:
     desktop `y = sectionHeight × 0.2 × progress` e mobile `y =
     sectionHeight × 0.1 × progress`, ambos batendo exatamente com o valor
     real aplicado — confirma a metade de intensidade da Task 4. Tilt por
     giroscópio: caminho Android/não-iOS (sem gate de permissão) testado
     disparando eventos `deviceorientation` sintéticos contra uma réplica
     inline da lógica de `initGyroTilt` (mesma limitação de ambiente já
     registrada na Task 5 — o Preview aqui é Chromium e reporta `canHover:
     true` mesmo em viewport mobile, então o guard real nunca deixa passar
     nesse navegador) — delta `beta:20/gamma:15` produziu
     `rotationX:-0.889`/`rotationY:0.667`, batendo exatamente com a fórmula
     `±(delta/45)×2`. Botão de permissão do iOS confirmado `hidden`/
     `display:none` neste navegador (sem `requestPermission`, path direto
     `attach()`). Rede: todas as requisições da sessão (GSAP, ScrollTrigger,
     fontes, ícones, flags, assets locais) retornaram `200`/`304`, nenhum
     `404`. Console: sem erros em nenhuma combinação de
     tema/idioma/viewport/interação testada.
   - Nenhum fix de código foi necessário nesta tarefa — a única mudança é
     esta atualização do `PROJECT_STATUS.md`.
- **Status:** as 6 tarefas do plano foram completadas, auditadas e
  mescladas para `main` (fast-forward) em 2026-07-09. Worktree e branch
  `mobile-effects` removidos após o merge.

## Ajustes pós-merge dos efeitos mobile (2026-07-09, direto na `main`)

- **Ícone hambúrguer reposicionado:** no mobile, `.nav` usa
  `justify-content: space-between`, então com o menu fechado (`.menu` some
  via `display:none`) sobravam só 3 itens visíveis (logo, hambúrguer,
  controles de idioma/tema) — o `space-between` distribuía o hambúrguer
  visualmente no centro do header em vez de perto do logo. Corrigido com
  `justify-content: flex-start` no `.nav` (mobile) + `margin-left: auto` em
  `.nav-controls` para empurrar idioma/tema pra direita, e um pequeno
  `margin-left` no `.nav-toggle` pra dar espaço do logo.
- **Tilt por giroscópio removido:** o usuário testou no celular e não
  gostou do efeito. Removido por completo: `initGyroTilt()` (e o helper
  `typeText`/demais funções não tocadas) de `assets/js/interactive-effects.js`,
  o botão de permissão do iOS (`index.html`, `assets/css/styles.css`), e a
  chave `projects.gyroPermission` dos 4 idiomas em `assets/js/i18n.js`. A
  seção Projects volta a não ter nenhum efeito de tilt (nem mouse, nem
  giroscópio) — apenas o parallax de fundo, a cascata de revelação e o
  feedback de toque continuam ativos ali.

## Bugs encontrados e corrigidos (registro rápido)

- `.gyro-permission-btn[hidden]` não escondia o botão: a regra base
  (`display: inline-block`) empatava em especificidade com o `[hidden]` do
  UA stylesheet do navegador e vencia por ordem de origem — corrigido com
  `.gyro-permission-btn[hidden] { display: none; }` explícito.
- `.tags li` preso em `prefers-color-scheme` em vez de `data-theme`
  (tema manual não afetava os selos das tags de projeto).
- Itens do dropdown de idioma sem suporte a teclado (`tabindex`,
  `:focus-visible`, Enter/Espaço/setas).
- Ícone do Angular invisível no tema claro (cor branca definida pela própria
  devicon).
- Grid de "Outras competências" esticando/desalinhando ícones por causa do
  item mais alto da linha.
- URL canônica/`og:url` apontando para domínio errado.

## Decisões de conteúdo (para não repetir perguntas)

- Idioma padrão: detecta o do navegador (pt/de/es), com fallback em inglês;
  escolha manual do usuário persiste e tem prioridade.
- Case do SENAI (Sistema de Gestão para Laboratório de Metrologia): sem
  link de repositório (não existe repo público) — conteúdo genérico o
  suficiente para não expor detalhes internos do SENAI/ZEISS.
- E-mail de contato usa `mailto:` padrão (não um link de webmail) — decisão
  consciente do usuário, mesmo sabendo que só funciona se o visitante tiver
  um app de e-mail configurado no sistema.
