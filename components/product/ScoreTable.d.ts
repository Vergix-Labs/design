import * as React from 'react';

/**
 * A matriz MCDA da Arateko (fase Ranquear / GATE 2). Os agentes pontuam cada opção em cada
 * critério; os Decisores são donos dos pesos. Calcula o score ponderado automaticamente e
 * destaca a vencedora. Pesos em pontos percentuais (ex.: 30 = 30%).
 *
 * @startingPoint section="Produto" subtitle="Matriz MCDA com score ponderado" viewport="700x220"
 */
export interface MCDACriterion { label: string; weight: number; rank?: string; }
export interface MCDAOption { name: string; scores: number[]; }
export interface ScoreTableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Critérios ranqueados, com peso (% ) — os Decisores são donos destes. */
  criteria?: MCDACriterion[];
  /** Opções com a pontuação por critério (mesma ordem). */
  options?: MCDAOption[];
  /** Exibe a coluna de score ponderado. */
  showScore?: boolean;
  /** Destaca a opção de maior score como vencedora. */
  highlightWinner?: boolean;
}

export function ScoreTable(props: ScoreTableProps): JSX.Element;
