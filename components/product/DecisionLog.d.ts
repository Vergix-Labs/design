import * as React from 'react';

/**
 * O decision log da Arateko — a trilha auditável que é o moat do produto (memória de decisões +
 * auditoria). Cada linha registra um gate: o que foi decidido, as opções consideradas, quem
 * decidiu e se a pessoa **confirmou** ou **sobrescreveu** a recomendação da IA.
 *
 * @startingPoint section="Produto" subtitle="Trilha de decisão auditável" viewport="700x220"
 */
export interface DecisionLogEntry {
  gate: number;
  decision: string;
  options?: string;
  who: string;
  action?: 'confirmou' | 'sobrescreveu';
}
export interface DecisionLogProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Linhas da trilha, uma por gate. */
  entries?: DecisionLogEntry[];
}

export function DecisionLog(props: DecisionLogProps): JSX.Element;
