import * as React from 'react';

/**
 * Progresso pelo Funil de Valor da Arateko. Por padrão exibe as 5 fases
 * (Enquadrar · Expandir · Ranquear · Convergir · Operar) e marca os 4 gates humanos
 * (GATE 1 em Enquadrar, 2 em Ranquear, 3 em Convergir, 4 em Operar). `current` é o índice
 * da fase ativa (0-based).
 *
 * @startingPoint section="Produto" subtitle="Stepper do Funil de Valor (5 fases + gates)" viewport="700x130"
 */
export interface PhaseStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Nomes das fases. Padrão: as 5 fases Arateko. */
  phases?: string[];
  /** Índice da fase atual (0-based). */
  current?: number;
  /** Exibe os marcadores de gate. */
  showGates?: boolean;
  /** Exibe a numeração (01, 02…). */
  showNumbers?: boolean;
}

export function PhaseStepper(props: PhaseStepperProps): JSX.Element;
