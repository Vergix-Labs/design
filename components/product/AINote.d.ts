import * as React from 'react';

/**
 * A "Zona de IA" da Arateko — uma nota que marca onde os agentes ampliam/sugerem (sempre um
 * rascunho que o humano confirma ou sobrescreve). Cor slate (fria), em contraste com o âmbar
 * quente dos gates. Coloque ações de agente em `actions`.
 */
export interface AINoteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rótulo do selo (padrão "IA"). */
  label?: React.ReactNode;
  /** Variante discreta (fundo transparente, borda tracejada). */
  quiet?: boolean;
  /** Linha de ações de agente. */
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function AINote(props: AINoteProps): JSX.Element;
