---
name: vcw-validate
description: >-
  VCW Fase 3 (Analyze / Assess) — selecione e ordene tanto as ideias quanto os critérios/filtros, e
  pondere os filtros com os Key Decision Makers (KDMs). Use isto para priorizar opções, montar uma
  matriz de decisão ponderada, pontuar e fazer a shortlist das ideias, avaliar risco e transformar
  critérios brutos em um funil ordenado. Acione quando o usuário disser "priorizar", "ordenar/ranquear",
  "ponderar os critérios", "avaliar/pontuar as opções", "decision matrix", "shortlist", "avaliar risco",
  ou estiver na fase de Validar / Analisar / Avaliar (Assess) de uma Value Creation Wheel. Combina com
  vcw-facilitator e as demais skills de fase vcw-*.
---

# vcw-validate — Fase 3: Analisar / Avaliar (Validar o Valor)

Este é o estágio **Analisar** (TIAGO) / passo **Avaliar** (DIANA) da Value Creation Wheel. Duas listas
longas chegam de `vcw-create`: **soluções** candidatas e **filtros** candidatos. Seu trabalho é tornar
ambas reais e ordenáveis. Pergunta-guia: **"Quais ideias são reais, e quais filtros realmente
importam?"** Você faz isso através dos três Is — **Interpretation** (agrupar e selecionar as ideias),
**Insight** (selecionar e *ponderar* os filtros) e **Integration** (combinar ambos em uma única
estrutura de pontuação).

O movimento inegociável aqui é que **os filtros devem ser ponderados pelos Key Decision Makers (KDMs)**,
não pelo facilitador e nem pela IA. O conjunto de filtros ponderado e ordenado é o **funil** pelo qual a
Fase 4 (`vcw-capture` / Aterrissar) faz as soluções passarem — então quem define os pesos efetivamente
escolhe o resultado. Essa autoridade pertence aos KDMs; se eles não estiverem na sala, pare e os
convoque. A IA e o time podem propor pesos, calcular trade-offs e sinalizar riscos, mas o julgamento de
valor é humano. (Consulte o cânone para as definições de fase, os 15Is, os 4Ms e os papéis — não os
redefina aqui.)

## Entrada → Saída

| Entrada (de `vcw-create`) | Saída (entrega para `vcw-capture`) |
|---|---|
| Uma **lista ampla de soluções** (ideias candidatas) | Uma **shortlist** de soluções (as sobreviventes que valem ser pontuadas) |
| Uma **lista ampla de filtros** (critérios candidatos) | Um **conjunto de filtros ponderado e ordenado** — de propriedade dos KDMs; essa ordenação *é* o funil |
| DNA do desafio + KPIs (de `vcw-discover`) | Uma **estrutura de pontuação integrada** (matriz de decisão) + um **registro de riscos** |

## Passos de facilitação — pelos três Is

**Interpretation — torne as ideias reais (seleção e agrupamento de ideias).**
- Remova duplicatas e mescle soluções quase idênticas; agrupe o pool em um punhado de temas coerentes para
  que a sala julgue opções, não ruído. Deixe a IA propor os clusters; o time os confirma.
- Elimine os não-iniciantes óbvios e reescreva as sobreviventes como **SMART objectives** para que cada
  ideia seja concreta o suficiente para ser pontuada. Use **Portfolio analysis** para plotar ideias (ex.:
  impacto × esforço / viabilidade) e fazer emergir as candidatas à shortlist.
- *Por quê:* você não consegue ponderar ideias que significam coisas diferentes para pessoas diferentes.
  Agrupar primeiro evita um concurso de popularidade e mantém a matriz pequena o bastante para realmente
  ser preenchida.

**Insight — torne os filtros relevantes (seleção e ponderação de filtros — os KDMs decidem).**
- Com os **KDMs**, selecione os filtros que de fato fazem o controle de passagem deste desafio (rastreie
  cada um de volta aos KPIs da Fase 1) e descarte critérios de vaidade. Filtros menos numerosos e mais
  afiados batem uma checklist longa.
- **Os KDMs atribuem um peso a cada filtro sobrevivente** e uma justificativa curta. Faça emergir vieses
  e trade-offs ocultos com **Six Thinking Hats**; teste sob pressão cada filtro e cada ideia de topo com
  **Risk analysis** antes de travar os pesos.
- *Por quê:* os pesos são o coração do funil e a única coisa que uma solução precisa satisfazer para
  sobreviver ao aval dos KDMs. É aqui que a Fase 3 prova seu valor — erre aqui e a Fase 4 afunila rumo à
  resposta errada com plena confiança.

**Integration — combine tudo em uma única estrutura de pontuação.**
- Combine a shortlist (linhas) e os filtros ponderados (colunas) em uma única **matriz de decisão
  ponderada**. Pontue cada ideia contra cada filtro; os totais ponderados ordenam a shortlist.
- Faça uma checagem de sanidade da ordenação contra o valor com **Cost/Benefit analysis** e um **Balanced
  Scorecard** para que uma dimensão (geralmente custo) não domine silenciosamente. Confirme que a ordem
  sobrevive a uma segunda leitura.
- *Por quê:* Interpretation e Insight são inúteis separados — a entrega é uma única estrutura onde ideias
  ordenadas encontram filtros ordenados, prontas para serem despejadas pelo funil.

## Ferramentas para esta fase

Escolha as **menos ferramentas que resolvem o desafio** (disciplina de Sprint). **Negrito = pontos de
partida padrão.** O passo a passo compacto de cada ferramenta está em `references/analyze-tools.md`.

| Ferramenta | Quando usar | Nota de apoio da IA |
|---|---|---|
| Morphological analysis | Recombine parâmetros de ideias em opções estruturadas | A IA enumera o grid de parâmetros |
| Leadership styles | Combine a shortlist com quem deve championá-la | A IA mapeia opções ao ajuste de estilo |
| Reverse thinking | "Como faríamos isto falhar?" — teste sob pressão as ideias | A IA gera os modos de falha |
| **Portfolio analysis** | Plote ideias em impacto × esforço para a shortlist | A IA pontua e posiciona os itens |
| Causal mapping | Rastreie por que um filtro ou ideia move o KPI | A IA rascunha o grafo causa→efeito |
| **SMART objectives** | Reescreva cada ideia como algo pontuável | A IA reescreve ideias na forma SMART |
| **Six Thinking Hats** | Reduza vieses no debate de ponderação entre KDMs | A IA encarna cada chapéu para ampliar visões |
| Six Sigma | Quantifique defeitos/variação em ideias de processo | A IA calcula as métricas de baseline |
| **Risk analysis** | Pontue probabilidade × impacto por ideia e filtro | A IA propõe riscos + pontuações |
| Blue Ocean Strategy Canvas | Compare opções em fatores concorrentes | A IA rascunha a curva de valor |
| **Balanced Scorecard** | Mantenha filtros em 4 perspectivas, não só custo | A IA mapeia filtros às perspectivas |
| **Cost/Benefit analysis** | Atribua um valor a cada opção da shortlist | A IA contabiliza custos/benefícios |
| Ansoff Product/Market Matrix | Classifique ideias por novidade de mercado/produto | A IA aloca ideias nos quadrantes |
| WIGs (Wildly Important Goals) | Force a ordenação às poucas metas que importam | A IA agrupa rumo aos poucos vitais |
| Strategy map | Ligue filtros a objetivos estratégicos | A IA rascunha o diagrama de ligação |

## IA / agentes vs humanos

| IA / agentes **propõem e calculam** | Humanos **detêm e decidem** |
|---|---|
| Agrupar e desduplicar o pool de ideias | KDMs selecionam quais filtros realmente fazem o controle de passagem |
| Sugerir pesos candidatos de filtros + justificativa | **KDMs definem e travam os pesos dos filtros** |
| Calcular trade-offs, custo/benefício, totais ponderados | KDMs aprovam a **shortlist** final |
| Sinalizar e pontuar riscos; encarnar os Six Hats | O facilitador conduz o processo e mantém a ponderação honesta |
| Reescrever ideias para SMART, montar o esqueleto da matriz | O time confirma que clusters e pontuações refletem a realidade |

Mantenha os humanos nos **julgamentos de valor** (pesos, shortlist, sobrevivência). A IA acelera tudo ao
redor deles, mas nunca deve definir os pesos.

## Modelos prontos para colar

**Matriz de decisão por critérios ponderados** (soluções = linhas, filtros ponderados = colunas; células
= pontuação bruta 1–5, depois × peso):

```
Filtro (peso) →       | F1: ____ (p=__) | F2: ____ (p=__) | F3: ____ (p=__) | F4: ____ (p=__) | TOTAL PONDERADO | RANK
----------------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----
Solução A: __________ |        _        |        _        |        _        |        _        |       __        |  __
Solução B: __________ |        _        |        _        |        _        |        _        |       __        |  __
Solução C: __________ |        _        |        _        |        _        |        _        |       __        |  __
----------------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----
(Total ponderado = Σ pontuação × peso. Ordene em ordem decrescente → shortlist = sobreviventes de topo.)
```

**Planilha de ponderação de filtros** (os KDMs preenchem — uma linha por filtro; os pesos devem somar
100):

```
Filtro (critério)  | Peso (%)   | Justificativa (por que faz o controle) | Dono KDM  | Rastreia ao KPI
-------------------|------------|----------------------------------------|-----------|----------------
_________________  |    __      | ______________________________________ | ________  | ______________
_________________  |    __      | ______________________________________ | ________  | ______________
_________________  |    __      | ______________________________________ | ________  | ______________
                   |  Σ = 100   |                                        |           |
```

**Linha do registro de riscos** (uma linha por risco material em uma ideia de topo ou em um filtro):

```
ID Risco| Ideia/Filtro| Descrição do risco| Probab. (1–5)    | Impacto (1–5)| Pontuação (P×I)| Mitigação / dono
--------|-------------|-------------------|------------------|--------------|----------------|------------------
R-__    | __________  | _________________ |        _         |      _       |      __        | ________________
```

## Gatilhos de retorno (loop-back)

- **Nenhuma ideia passa da barra** (o melhor total ponderado ainda é baixo demais, ou toda opção da
  shortlist morre em um filtro) → volte para **Induzir** (`vcw-create`) para divergir mais soluções.
- **Filtros conflitam ou os pesos não são acordados** → de volta aos **KDMs**; não deixe o facilitador ou
  a IA desempatar. Rode novamente o Six Thinking Hats e reancore nos KPIs da Fase 1.
- **Um filtro não tem KPI por trás** → é um critério de vaidade; descarte-o ou devolva-o para ser
  rejustificado.
- **A matriz precisa de critérios que nunca foram gerados** → volte para Induzir para gerar esses filtros.
- **A Risk analysis faz emergir um risco fatal e não mitigável** no front-runner → rebaixe-o e reordene.

## Referências

- `references/analyze-tools.md` — passo a passo compacto de cada ferramenta da Fase 3 (Propósito / Passos
  / Dica de facilitação / Apoio da IA).
- `../vcw-facilitator/references/vcw-canon.md` — fonte única de verdade para fases, os 15Is, os 4Ms, o
  catálogo de ferramentas, níveis de intensidade e papéis. Defira a ele; não o repita aqui.
