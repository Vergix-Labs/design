import * as React from 'react';

/**
 * Chip/tag da Arateko — para listar e selecionar itens (Manpower, Decisores, internos,
 * stakeholders). `selected` pinta sólido (ink); `accent` usa o âmbar de marca; `onRemove`
 * adiciona um × removível; `onClick` torna o chip interativo.
 */
export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Estado selecionado (preenchimento ink). */
  selected?: boolean;
  /** Realce âmbar (quando não selecionado). */
  accent?: boolean;
  /** Ícone opcional. */
  icon?: React.ReactNode;
  /** Callback do × de remoção (mostra o × quando definido). */
  onRemove?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export function Pill(props: PillProps): JSX.Element;
