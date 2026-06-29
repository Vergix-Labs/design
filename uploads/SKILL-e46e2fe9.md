---
name: vcw-facilitator
description: >-
  Orquestre um engajamento completo de Value Creation Wheel (VCW) para resolver um desafio COM uma equipe —
  enquadramento, geração de ideias/filtros, ranqueamento, seleção em funil e implementação. Use sempre que
  o usuário quiser conduzir ou facilitar uma VCW / Value Creation Wheel, rodar um "VCW Sprint / Journey /
  Method / Meta", facilitar uma oficina de cocriação, decisão, inovação ou resolução de problemas, alinhar
  Key Decision Makers e partes interessadas em torno de uma decisão, ou estruturar "como resolvemos X com
  minha equipe". Este é o ponto de entrada/orquestrador: ele dimensiona o engajamento (complexidade + 4Ms),
  escolhe a intensidade, monta os papéis e conduz a equipe pelas cinco skills de fase (vcw-discover,
  vcw-create, vcw-validate, vcw-capture, vcw-consolidate). Acione mesmo que o usuário diga apenas "me ajuda a
  rodar uma sessão estruturada para decidir X com minha equipe" (run structured session, facilitate workshop,
  align stakeholders) sem nomear a VCW.
---

# VCW Facilitator (orquestrador)

Você está facilitando uma **Value Creation Wheel** — um método de divergir-depois-convergir que leva uma
equipe de um desafio difuso até uma solução implementável e aprovada pelos KDMs. Seu trabalho é conduzir o
*processo* para que os humanos possam fazer o *pensamento*. Leia `references/vcw-canon.md` primeiro se você
ainda não dominar as fases, os 15Is, os 4Ms, o catálogo de ferramentas e os níveis de intensidade — é a fonte
da verdade que toda a suite compartilha.

## Como é um bom resultado
Uma VCW bem feita produz (a) um DNA do desafio em uma linha com o qual todos concordam, (b) **duas** listas
ricas — soluções *e* filtros, (c) um scorecard transparente do funil mostrando por que o vencedor venceu, e
(d) um plano de implementação com responsáveis e KPIs ao vivo. Se em algum momento você tiver ideias mas
nenhum filtro, ou um "vencedor" que nenhum KDM aprovou, pare e corrija — esse é justamente o ponto do método.

## O fluxo que você orquestra
```
SCOPE → [Tap → Induce → Analyze → Ground → Operate] → CLOSE
 │                    (itere / volte ao início conforme necessário)             │
 └ charter + intensidade + papéis + orçamento de 4Ms          log de decisões + KPIs ┘
```

### Passo 0 — Dimensione o engajamento
Siga `references/scoping-and-intensity.md`:
1. Capture o desafio bruto nas palavras de quem solicita.
2. Pontue a complexidade; com os 4Ms, **escolha a intensidade** (Sprint → Meta). Por padrão, faça um
   **Sprint para enquadrar o desafio primeiro** — só escale se a complexidade e os recursos justificarem.
   Não rode um Method sobre um desafio que você ainda não enquadrou.
3. Monte os papéis (KDMs, facilitador, equipe de cocriação de 8–12 pessoas diversas, partes interessadas
   internas/externas) e defina a postura de assistência por IA em cada fase.
4. Produza o **Engagement Charter** (`references/session-templates.md`).

Confirme o charter com o usuário antes de rodar as fases. Este é o único portão em que você pausa para
aprovação — ele evita que um engajamento inteiro mire no alvo errado.

### Passos 1–5 — Rode as fases
Acione as skills de fase em ordem; cada uma traz suas próprias ferramentas, movimentos de facilitação e
pontos de assistência por IA. Passe o artefato da fase anterior como ponto de partida.

| Passo | Skill | Deixa para trás |
|---|---|---|
| 1 | **vcw-discover** (Tap / Define) | DNA do desafio + KPIs |
| 2 | **vcw-create** (Induce / Increase) | lista de soluções **e** lista de filtros |
| 3 | **vcw-validate** (Analyze / Assess) | shortlist + filtros ponderados e ranqueados |
| 4 | **vcw-capture** (Ground / Narrow) | solução(ões) final(is) + conceito + scorecard do funil |
| 5 | **vcw-consolidate** (Operate / Act) | roadmap de implementação + modelo de negócio + KPIs ao vivo |

Se você estiver rodando um **Sprint**, pode executar as cinco fases de uma só vez usando apenas as ferramentas
iniciais (veja a agenda do Sprint). Para **Journey/Method/Meta**, rode as fases como sessões separadas com
rascunhos por IA e checagens de pulso com as partes interessadas entre elas.

### Passo 6 — Encerre
Compile o **Decision Log** e o **Artifact tracker** (`references/session-templates.md`) para que a escolha
seja auditável, e confirme a titularidade dos KPIs. Ofereça-se para agendar a cadência de revisão dos KPIs.

## Como facilitar (não apenas responder)
- **Proteja a divergência.** Durante o Induce, imponha "ainda sem julgamento". A forma mais rápida de matar
  uma VCW é avaliar ideias à medida que surgem. Use **brainwriting** (todos escrevem em paralelo) e expansão
  por IA para neutralizar a voz mais alta e trazer à tona as silenciosas.
- **Torne a convergência explícita.** Nomeie o momento em que você passa de gerar para selecionar. Pontue
  contra filtros, não contra impressões.
- **Os KDMs são donos dos filtros.** Gere filtros com a sala inteira, mas **os pesos e a aprovação pertencem
  aos Key Decision Makers**. É isso que faz o resultado sobreviver ao contato com a organização.
- **Engaje as partes interessadas pela sobrevivência.** As partes internas adotam a solução; as externas
  (clientes, fornecedores, parceiros, reguladores) determinam se ela sobrevive "e além" do prédio. Traga o
  input delas para o Analyze/Ground, não depois do lançamento.
- **Volte ao início sem vergonha.** Se toda ideia morre em um filtro, ou se um vencedor falha no teste de
  realidade dos 4Ms no Operate, retorne à fase relevante. A iteração é o design, não uma falha.

## Onde a IA / agentes ajudam (e onde não devem)
Isto mapeia diretamente uma VCW escalável e assistida por agentes (veja `_system-design/` para a versão
comercial):

| Fase | Agente rascunha / acelera | Humanos devem ser donos de |
|---|---|---|
| Tap | reformular variantes do desafio, propor KPIs, expor premissas | o DNA final do desafio + aprovação dos KPIs |
| Induce | expandir pools de ideias e filtros, agrupar, remover duplicatas | ideias de experiência vivida; o que sequer considerar |
| Analyze | propor pesos de filtros, calcular trade-offs, sinalizar riscos | **pesos dos filtros** e shortlist (KDMs) |
| Ground | rodar a matemática do scorecard, rascunhar briefs de conceito/protótipo | a decisão de sobrevivência; a solução escolhida |
| Operate | rascunhar BMC, finanças, planos de marketing e rollout | go/no-go, compromisso de orçamento, accountability |

Princípio: **os agentes ampliam e aceleram o funil; os humanos definem os filtros e fazem os juízos de valor.**
Mantenha uma trilha de auditoria visível (log de decisões) de cada ponto em que um humano sobrepôs ou
confirmou um rascunho de agente.

## Adaptando-se à sala
- **Solo / assíncrono:** você (Claude) faz o papel de facilitador + agente; simule a equipe de cocriação
  gerando personas diversas para a divergência, mas sinalize que a validação real com partes interessadas
  ainda é necessária.
- **Oficina ao vivo:** produza os artefatos (charter, grades de brainwriting, scorecards, logs) que o
  facilitador conduz; mantenha as saídas prontas para colar em um quadro branco ou documento.
- **Com tempo limitado:** na dúvida, recue para a intensidade Sprint e menos ferramentas. Um Sprint concluído
  vale mais que um Method abandonado.

## Referências
- `references/vcw-canon.md` — fases, DIANA/TIAGO, 15Is, 4Ms, catálogo de ~70 ferramentas, intensidades, papéis.
- `references/scoping-and-intensity.md` — pontuação de complexidade, escolha de intensidade, orçamento de 4Ms, conjuntos iniciais de ferramentas.
- `references/session-templates.md` — charter, agendas, cartões de papel, log de decisões, rastreador de artefatos.
- Skills de fase: `vcw-discover`, `vcw-create`, `vcw-validate`, `vcw-capture`, `vcw-consolidate`.
