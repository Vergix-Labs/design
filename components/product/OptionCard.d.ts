import * as React from 'react';

/**
 * Cartão de opção ou critério no board de Expandir. Marca a origem (`ia` = rascunho do agente,
 * `humano` = trazido pela pessoa), aceita tags e um rank, e suporta seleção. A disciplina
 * Arateko é gerar opções **e** critérios em paralelo — use o mesmo cartão nas duas colunas.
 */
export interface OptionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Título da opção/critério. */
  title: React.ReactNode;
  /** Descrição curta. */
  body?: React.ReactNode;
  /** Origem do item. */
  source?: 'ia' | 'humano';
  /** Rótulo de rank (ex.: "rank 1"). */
  rank?: React.ReactNode;
  /** Tags/clusters. */
  tags?: string[];
  /** Estado selecionado (contorno âmbar). */
  selected?: boolean;
}

export function OptionCard(props: OptionCardProps): JSX.Element;
