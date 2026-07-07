# Estado atual do projeto — Portfólio Gabriel Nunes

> **Mapa do projeto:** existe um grafo de conhecimento gerado com `graphify` em
> `graphify-out/`. Antes de vasculhar o código manualmente, rode
> `graphify query "<pergunta>"`, `graphify path "<A>" "<B>"` ou
> `graphify explain "<conceito>"`. `graphify-out/GRAPH_REPORT.md` tem os "God
> Nodes" e as comunidades detectadas. Regenerar com `graphify . --update`
> depois de mudanças grandes.

> Última atualização: 2026-07-07 (sessão de reforma completa do site: i18n,
> tema, novas seções, ajustes de conteúdo pós-implantação, mapeamento via
> graphify e timeline de Experience completada com FIEG + SENAI ZEISS
> Metrologia)

## Próximos passos

- [ ] **`assets/img/favicon.png` e `assets/img/og-image.png` estão vazios (0
      bytes)** — encontrado ao rodar o graphify (extração de imagem falhou
      por não haver conteúdo). O favicon não aparece na aba do navegador e a
      prévia do link em redes sociais (WhatsApp/LinkedIn/Twitter) fica
      quebrada. Precisa gerar/colocar os arquivos reais nesses caminhos.
- [ ] Trocar `assets/img/profile.jpg` por uma foto mais profissional (a atual
      é uma selfie casual) — layout já preparado para receber o arquivo no
      mesmo caminho, sem precisar mexer em código.
- [ ] Revisar o card do **Ultralino** na seção Projects conforme o robô
      evoluir (ainda em desenvolvimento no SENAI) — descrição/tags em
      `assets/js/i18n.js` (`projects.ultralino.*`).
- [ ] Confirmar se a previsão de conclusão do curso (final de 2026) na seção
      Experience ainda está correta perto da formatura.
- [ ] Quando aprovar o resultado, dar `git push` (nada foi enviado ao GitHub
      ainda — 20+ commits locais aguardando aprovação).
- [ ] Depois do primeiro deploy real no GitHub Pages, conferir se a URL
      `https://gabrielviananunes.github.io/gabrielviananunes/` está
      respondendo e se `assets/img/og-image.png` renderiza bem em previews
      de link (WhatsApp/LinkedIn/Twitter).

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
| Deploy no GitHub | ⏳ Pendente | Aguardando aprovação final do usuário para `git push` |

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

## Bugs encontrados e corrigidos (registro rápido)

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
