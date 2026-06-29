import * as React from 'react';

/**
 * Selo de status semântico da Arateko. Os tons carregam o significado do produto:
 * `ai` (a IA amplia), `gate` (aval humano), `artifact` (o que a fase produz),
 * `positive` (passa / sobrevive), `negative` (elimina / fora). Sem `children`, o tom
 * preenche um rótulo padrão (IA, GATE, artefato, passa, elimina).
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Significado/cor do selo. */
  tone?: 'ai' | 'gate' | 'artifact' | 'positive' | 'negative' | 'neutral' | 'accent';
  /** Rótulo. Omitido → usa o padrão do tom. */
  children?: React.ReactNode;
  /** Ícone opcional antes do rótulo. */
  icon?: React.ReactNode;
  /** Mostra um ponto de status antes do rótulo. */
  dot?: boolean;
}

export function Badge(props: BadgeProps): JSX.Element;
