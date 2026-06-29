import React from 'react';

/* Arateko · Button — injeta seu CSS uma vez, usando os tokens do design system. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-btn{
    display:inline-flex;align-items:center;justify-content:center;gap:.5em;
    font-family:var(--font-sans);font-weight:var(--fw-semibold);
    border:1px solid transparent;border-radius:var(--radius-sm);
    cursor:pointer;white-space:nowrap;text-decoration:none;
    transition:background var(--dur-fast) var(--ease-out),
               border-color var(--dur-fast) var(--ease-out),
               color var(--dur-fast) var(--ease-out),
               box-shadow var(--dur-fast) var(--ease-out);
  }
  .ar-btn:focus-visible{outline:none;box-shadow:var(--ring)}
  .ar-btn[disabled]{opacity:.45;cursor:not-allowed;box-shadow:none}
  /* sizes */
  .ar-btn--sm{height:var(--field-h-sm);padding:0 .75rem;font-size:var(--fs-xs)}
  .ar-btn--md{height:var(--field-h);padding:0 1.1rem;font-size:var(--fs-sm)}
  .ar-btn--lg{height:var(--field-h-lg);padding:0 1.5rem;font-size:var(--fs-md)}
  .ar-btn--full{width:100%}
  /* primary — ink sólido */
  .ar-btn--primary{background:var(--ink-800);color:var(--text-inverse);border-color:var(--ink-800)}
  .ar-btn--primary:hover:not([disabled]){background:var(--ink-900);border-color:var(--ink-900)}
  .ar-btn--primary:active:not([disabled]){background:var(--ink-950)}
  /* accent — o farol âmbar (aprovações de valor) */
  .ar-btn--accent{background:var(--amber-400);color:#fff;border-color:var(--amber-400)}
  .ar-btn--accent:hover:not([disabled]){background:var(--amber-500);border-color:var(--amber-500)}
  .ar-btn--accent:active:not([disabled]){background:var(--amber-600)}
  /* secondary — papel com borda */
  .ar-btn--secondary{background:var(--white);color:var(--text-strong);border-color:var(--border-strong)}
  .ar-btn--secondary:hover:not([disabled]){background:var(--surface-sunken);border-color:var(--ink-400)}
  /* ghost */
  .ar-btn--ghost{background:transparent;color:var(--text-muted);border-color:transparent}
  .ar-btn--ghost:hover:not([disabled]){background:var(--surface-sunken);color:var(--text-strong)}
  /* ai — ação de agente */
  .ar-btn--ai{background:var(--ai-bg);color:var(--ai-text);border-color:var(--ai-border)}
  .ar-btn--ai:hover:not([disabled]){background:var(--slate-200)}
  /* danger */
  .ar-btn--danger{background:transparent;color:var(--negative);border-color:color-mix(in srgb,var(--negative) 40%,transparent)}
  .ar-btn--danger:hover:not([disabled]){background:var(--negative-bg)}
  .ar-btn svg{width:1.15em;height:1.15em;flex:0 0 auto}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'button');
  el.textContent = css;
  document.head.appendChild(el);
}

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon = null,
  rightIcon = null,
  fullWidth = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const cls = [
    'ar-btn',
    `ar-btn--${variant}`,
    `ar-btn--${size}`,
    fullWidth ? 'ar-btn--full' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} {...rest}>
      {leftIcon}
      {children != null && <span>{children}</span>}
      {rightIcon}
    </button>
  );
}
