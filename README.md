# Arateko Labs — Design System

> **Arateko** (Tupi-Guarani: *ara* = mundo / tempo + *teko* = modo, caminho de ser → "o jeito de
> criar e decidir no mundo" — literalmente *um método*. Pronúncia: **a-ra-TÉ-ko**).
> Produto da **Arateko Labs** (família **Aravox Labs**).
> Categoria: **Innovation Intelligence & Strategy** — uma plataforma de decisão assistida por
> agentes de IA.

Este design system codifica a marca e as superfícies de produto da Arateko para que agentes de
design produzam interfaces, decks e ativos coerentes com a marca. Entrega fundamentos de marca
(cor, tipografia, espaçamento, elevação, movimento), componentes de UI reutilizáveis e um UI kit de
alta fidelidade que recria o **Copilot de sessão** da Arateko.

---

## 1 · Contexto de produto

**One-liner.** A Arateko transforma desafios ambíguos em **decisões implementáveis e auditáveis** —
os agentes ampliam as opções, os humanos decidem nos pontos certos.

**Propósito (tom).** É um produto digital voltado a **inovação, estratégia e negócios** — para
pessoas individuais e times de colaboração. O objetivo é **apoiar as pessoas a materializar seus
pensamentos**: assistidas pela IA, mas **não comandadas** por ela — para **estender, aumentar e
amplificar a capacidade humana**. Criar e então construir; sonhar e então tangibilizar; imaginar e
então sentir.

**Taglines (candidatas).** "O caminho da decisão." · "Da ambiguidade à decisão." · "Decisões que
sobrevivem."

**O que faz.** Conduz um time de um desafio difuso a uma decisão executável por um **Funil de Valor**
de cinco fases, com **agentes** ampliando o volume e **gates humanos** guardando os julgamentos de
valor — deixando uma **trilha de decisão auditável** e uma **memória** que melhora a cada rodada.

**Princípio-assinatura.** Separar **opções** de **critérios**, **ranquear os critérios** (quem decide
é dono dos pesos) e **afunilar** até o vencedor sobreviver ao mundo real. *A IA acelera; os humanos
decidem.*

### O Funil de Valor — 5 fases
| # | Fase | Produz |
|---|---|---|
| 1 | **Enquadrar** | enunciado do desafio + objetivo + restrições + KPIs |
| 2 | **Expandir** | opções **e** critérios, em paralelo |
| 3 | **Ranquear** | shortlist + critérios ponderados (MCDA) |
| 4 | **Convergir** | funil dos critérios → solução final + scorecard |
| 5 | **Operar** | roadmap com donos + modelo + KPIs vivos |

### Os 4 gates humanos
Nada avança sem um veredito humano em quatro pontos: **GATE 1** DNA + KPIs · **GATE 2** pesos dos
critérios (donos: Decisores) · **GATE 3** call de sobrevivência (a vencedora sobrevive à realidade?)
· **GATE 4** go/no-go + orçamento. Se o orçamento de recursos reprova em Operar, o fluxo faz
**loop-back**.

### Vocabulário de produto (use estes — nunca os termos acadêmicos do VCW)
- **Decisores** — quem decide e é dono dos pesos dos critérios (era: KDMs)
- **Contribuidores** — o time de cocriação
- **Critérios** — os filtros ranqueados (era: Filtros)
- **Orçamento de recursos** — pontuado pelos **4Ms** (Manpower · Minutes · Money · Motivation), que
  define a **intensidade** da sessão (Sprint · Journey · Method · Meta)
- **Decision log** — a trilha auditável; a **memória de decisões** da organização é o moat
- Nunca exibir: VCW / Value Creation Wheel, DIANA, TIAGO, 15Is, KDMs, "Filtros", "4Ms" como termo de
  marca. A metodologia é um **engine proprietário sob o capô**.

**Movimento comercial.** Entrar com um **Copilot self-serve** de baixo atrito (a "sessão" do MVP);
expandir para **governança de decisões** (trilha auditável, papéis, SSO) e **execução de estratégia**
(KPIs vivos, portfólio).

---

## 2 · Fontes usadas para construir este sistema

Os artefatos vieram do material fornecido pelo usuário. O leitor pode não ter acesso; registrado aqui
caso tenha:

- **GitHub:** `Arateko-Labs/wireframe` — o repo anexado (estava **vazio / sem commits** na
  construção; nada pôde ser importado dele). Explore-o depois de populado:
  <https://github.com/Arateko-Labs/wireframe>
- **Brief de marca:** `Arateko — Marca e Posicionamento.md` (origem do nome, posicionamento,
  categoria, mapa de vocabulário, as 5 fases).
- **Wireframe:** `index.html` — wireframe low-fi, grayscale, do Copilot de sessão (Onboarding →
  Escopo/4Ms → Charter/GATE 1 → Expandir → Ranquear/GATE 2 → Convergir/GATE 3 → Operar/GATE 4 →
  Decision log). Fonte do fluxo + da lógica semântica de cor IA / GATE / artefato.
- **Marca (símbolo):** `Firefly_Arateko Labs 831715.png` — o logo (farol quente sobre luz radiante
  que converge). Copiado + processado em `assets/`.
- **Skills de metodologia:** arquivos `vcw-*` (o engine proprietário: facilitação por fase, o
  scorecard do funil, a divisão agentes-vs-humanos). Informam o comportamento do produto; o
  vocabulário acadêmico **não** é exibido na marca.

Ecossistema relacionado (não usado diretamente, registrado para contexto): a família **Aravox Labs**
(`aravox-labs/portal`, plugins de áudio etc.).

---

## 3 · Fundamentos de conteúdo

**Idioma.** UI de produto e exemplos em **pt-BR** (mercado do produto). Toda a copy entregue é em
português.

**Voz.** Calma, deliberada, governada. O produto é um *método*, não um brinquedo de brainstorm — a
copy reflete rigor e rastreabilidade sem ser fria. Confiante, nunca hypada. Nomeia a **disciplina**
explicitamente ("separar opções de critérios", "donos dos pesos", "sobrevive ao funil"). Empodera o
humano: a IA **amplia**; quem decide é a pessoa.

**Pessoa.** Fala **com** o facilitador/decisor na segunda pessoa quando instrui ("Qual é o
desafio?") e descreve o sistema na terceira pessoa ("a IA amplia; o humano decide"). Evite "eu".

**Caixa.** Sentence case para títulos e corpo. **Micro-rótulos em CAIXA ALTA espaçada**, com
tracking positivo, são um motivo-assinatura (`COMPLEXIDADE`, `ORÇAMENTO DE RECURSOS`, `GATE 1`).
Nomes de fase em Title Case ("Enquadrar"). IDs de gate em caixa alta + número ("GATE 2").

**Números & dados.** Scores, pesos (`30%`), números de gate, ranks de critérios e o decision log em
**monoespaçada** — dado é tratado como evidência. Pesos como porcentagem; ranks como `rank 1`.

**Disciplina de termos.** Sempre o vocabulário Arateko acima. A IA é "**agentes**" / "**a IA**"; sua
saída é sempre um **rascunho** que o humano confirma ou sobrescreve.

**Exemplos de tom (verbatim da fonte):**
- "a IA amplia; o humano decide nos 4 gates."
- "Disciplina-assinatura: gerar **opções E critérios em paralelo**."
- "Os Decisores são donos dos pesos. A ordenação dos critérios **é** o funil."
- "Humano confirma que a vencedora sobrevive ao mundo real."
- "o moat: memória de decisões + auditoria."

**Emoji.** Não faz parte da voz da marca. O wireframe usou ✅ pontualmente no scorecard como glifo de
status; prefira os componentes de Badge/status. Sem emoji decorativo.

---

## 4 · Fundamentos visuais

**O símbolo.** Um **farol âmbar** quente (um orbe que brilha) acima de um leque de linhas finas que
irradiam para fora e então **convergem para um ponto** — o Funil de Valor tornado visível: expansão
de opções, convergência à decisão, iluminada por um único julgamento que guia. Geometria art-déco,
silenciosa e premium.

**Cor.** Três forças, tiradas do símbolo:
- **Ink** — fundo de carvão frio (`--ink-950` fundo de marca, `--ink-800` texto no claro).
- **Âmbar / farol** — o acento quente da marca **e** a cor do **GATE** humano. O julgamento humano
  *é* o farol (`--amber-400` acento, `--amber-700` texto de gate, `--amber-100` superfície de gate).
- **Slate (azul frio)** — a zona dos **agentes / IA**: ampliando, acelerando (`--slate-600` texto,
  `--slate-100` superfície). Máquina fria vs. humano quente é o contraste semântico central.
- **Lavanda** — a luz pálida das opções que irradiam (`--lav-100/200`), em superfícies escuras.
- Funcionais: **positivo** verde dessaturado (sobrevive / passa / go), **negativo** terracota
  dessaturado (eliminado / fora / no-go). Ambos calmos sobre o papel.
- Modelo de duas superfícies: uma **superfície de marca escura** (hero, splash, login —
  `--brand-bg`) e uma **superfície de produto clara em papel** (`--paper` canvas, `--white` cards).
  No máximo uma ou duas cores de fundo por artefato.

**Tipografia.** Três vozes — serifa para gravidade, sans para o trabalho, mono para dados:
- **Spectral** (serifa) — display, títulos, momentos de marca; a voz do "método/decisão".
- **Hanken Grotesk** (sans) — workhorse de UI: rótulos, corpo, controles.
- **Spline Sans Mono** — scores, pesos, IDs de gate, o decision log.
- ⚠️ **Substituição de fonte:** nenhum arquivo de fonte de marca foi fornecido; estas são Google
  Fonts escolhidas como um stack próximo e deliberado. **Troque por fontes licenciadas quando
  disponíveis.**

**Espaçamento.** Ritmo base de 4px (`--space-*`). Largura de conteúdo limita em `--container`
(1080px) como o wireframe; controles têm 40px de altura (alvo mínimo de toque de 44px).

**Fundos.** Majoritariamente chapados: papel quente no produto, ink profundo na marca. Sem gradientes
agitados nas telas de trabalho. O único "gradiente" é o **brilho do farol** (uma auréola radial âmbar
suave) reservado ao orbe/símbolo em superfícies escuras. Sem fotografia de banco no produto; o
símbolo e o motivo de raios de luz carregam a imagética. Calor sutil do papel, sem textura pesada.

**Bordas & cards.** Bordas de fio de cabelo (`--border`, 1px) definem o grid calmo. Cards são brancos
com borda 1px + sombra baixa e quente (`--shadow-sm`/`--shadow-md`) e cantos `--radius-lg` (14px);
contêineres maiores usam `--radius-xl` (20px). Evite o clichê do "card arredondado com borda colorida
só à esquerda" — os cards Arateko usam borda de fio de cabelo completa. Inputs/botões usam
`--radius-sm`/`md`.

**Elevação.** Sombras de baixo espalhamento, com tom quente (nunca cinza-azulado). Poços usam
`--shadow-inset`. Em superfícies escuras/de marca, o **brilho do farol** (`--glow-beacon`) substitui
a sombra projetada do acento.

**Raios.** Controles 8–10px · cards 14px · painéis grandes 20px · pílulas/badges totais
(`--radius-pill`).

**Movimento.** Deliberado e silencioso — `--ease-out` nas entradas, 120–360ms. Fades e subidas
curtas; **sem bounce, sem spring**. Respeite `prefers-reduced-motion`. O farol pode pulsar bem
lentamente só em splash/superfícies de marca.

**Estados de interação.**
- *Hover:* superfícies primárias (ink/âmbar) escurecem um passo; ghost/secundário ganham preenchimento
  leve (`--surface-sunken`). Links deslocam para `--accent-strong`.
- *Press:* leve escurecimento; sem escala em botões (chips/cards podem comprimir 1px translateY).
  Mantenha sutil.
- *Foco:* anel de foco quente de 3px (`--ring`, âmbar a ~55%). Sempre visível para teclado.
- *Disabled:* opacidade 45%, sem sombra, `cursor: not-allowed`.

**Transparência & blur.** Usados com parcimônia — scrims de diálogo (ink a ~45%) e um blur suave
opcional no backdrop de overlays. Nunca cromo de vidro fosco em superfícies de trabalho.

**Vibe da imagética.** Quente, discreta, premium. O símbolo lê claro-sobre-escuro; em superfícies
claras use a variante **inked**. Imagética geométrica/linear, não fotográfica.

---

## 5 · Iconografia

- **Nenhuma fonte de ícones ou set de SVG de marca foi fornecido.** O wireframe é só texto, com dois
  glifos unicode funcionais: a seta de fluxo **→** (`farr`) e o loop-back **↩**.
- **Substituição (sinalizada):** use **[Lucide](https://lucide.dev)** via CDN como sistema de
  ícones — traço limpo de 1,5–2px, junções arredondadas, que combina com a estética calma de fios de
  cabelo. Tamanhos pareados com o texto (16/20/24px), `stroke-width: 1.75`, `currentColor`. Troque
  por um set sob medida se a marca encomendar um.
- **Glifos de status:** prefira os componentes semânticos de **Badge / status** (IA · GATE · artefato
  · passa · elimina) a emoji. Onde for preciso um check em dados (scorecard "sobrevive"), um `check`
  do Lucide em `--positive` é preferível a ✅.
- **O símbolo** é o único ativo de arte proprietário. **Não** o redesenhe; use os arquivos em
  `assets/`.
- Unicode `→` e `↩` seguem aceitáveis inline em diagramas de fluxo, como na fonte.

---

## 6 · Índice / manifesto

> Estado atual: **12 componentes** · **16 cards** de especímen · **162 tokens** · 1 UI kit (Copilot,
> 8 telas). As fontes vêm via `@import` do Google Fonts (não listadas no manifesto de fontes —
> substituir por binários licenciados).

**Raiz**
- `styles.css` — ponto de entrada global (consumidores linkam este). Só manifesto de `@import`.
- `tokens/` — `colors.css` · `typography.css` · `spacing.css` · `elevation.css` · `fonts.css`.
- `assets/` — variantes do símbolo de marca (abaixo).
- `README.md` — este arquivo. · `SKILL.md` — entrada compatível com Agent Skills.

**Assets**
- `assets/arateko-mark-dark.png` — símbolo completo no fundo escuro original (use em superfícies
  escuras).
- `assets/arateko-mark.png` — símbolo com fundo transparente (pálido, para superfícies médias/escuras).
- `assets/arateko-mark-ink.png` — símbolo inked para superfícies **claras**.

**Fundamentos (cards da aba Design System)** — grupos Tipografia · Cores · Espaçamento · Marca.

**Componentes** — ver `components/`. **Núcleo:** `Button` · `Badge` · `Pill` · `Card`.
**Formulários:** `Field` · `Select`. **Produto (o método):** `PhaseStepper` · `GateBanner` ·
`AINote` · `OptionCard` · `ScoreTable` · `DecisionLog`. Cada um tem `.jsx` + `.d.ts` + `.prompt.md`
e um card de diretório.

**UI kit** — `ui_kits/copilot/` — recriação interativa e de alta fidelidade do Copilot de sessão
Arateko (Onboarding → Escopo → Charter/GATE 1 → Expandir → Ranquear → Convergir → Operar → Decision
log).

> Explore os repos de origem para fazer um trabalho ainda melhor:
> <https://github.com/Arateko-Labs/wireframe> (e a org Aravox Labs) quando populados.
