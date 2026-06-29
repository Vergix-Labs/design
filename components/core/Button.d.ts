import * as React from 'react';

/**
 * Botão da Arateko. Use `primary` (ink) para a ação principal, `accent` (âmbar) para
 * aprovações de valor / gates ("Aprovar charter"), `ai` para ações de agente (ampliar pool),
 * `secondary`/`ghost` para ações de apoio e `danger` para ações destrutivas.
 *
 * @startingPoint section="Núcleo" subtitle="Botões em todas as variantes e tamanhos" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual / intenção. */
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'ai' | 'danger';
  /** Altura do controle. */
  size?: 'sm' | 'md' | 'lg';
  /** Ícone à esquerda (ex.: um SVG Lucide). */
  leftIcon?: React.ReactNode;
  /** Ícone à direita. */
  rightIcon?: React.ReactNode;
  /** Ocupa 100% da largura do contêiner. */
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
