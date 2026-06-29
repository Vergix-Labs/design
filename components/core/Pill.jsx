import React from 'react';

/* Arateko · Pill — chip/tag de seleção e listagem (Manpower, Decisores, internos…). */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-pill{
    display:inline-flex;align-items:center;gap:.4em;
    font-family:var(--font-sans);font-size:var(--fs-xs);font-weight:var(--fw-medium);
    color:var(--text-muted);background:var(--white);
    border:1px solid var(--border);border-radius:var(--radius-pill);
    padding:.28em .85em;line-height:1.4;cursor:default;
    transition:background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out);
  }
  .ar-pill--clickable{cursor:pointer}
  .ar-pill--clickable:hover{border-color:var(--border-strong);color:var(--text-strong)}
  .ar-pill--selected{background:var(--ink-800);color:var(--text-inverse);border-color:var(--ink-800)}
  .ar-pill--accent{background:var(--accent-soft);color:var(--accent-strong);border-color:var(--gate-border)}
  .ar-pill svg{width:1.05em;height:1.05em}
  .ar-pill__x{margin-left:.1em;opacity:.6;cursor:pointer}
  .ar-pill__x:hover{opacity:1}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'pill');
  el.textContent = css;
  document.head.appendChild(el);
}

export function Pill({
  selected = false,
  accent = false,
  icon = null,
  onRemove = null,
  onClick = null,
  children,
  className = '',
  ...rest
}) {
  ensureStyles();
  const cls = [
    'ar-pill',
    onClick ? 'ar-pill--clickable' : '',
    selected ? 'ar-pill--selected' : '',
    accent && !selected ? 'ar-pill--accent' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={cls} onClick={onClick} {...rest}>
      {icon}
      {children}
      {onRemove && (
        <span className="ar-pill__x" onClick={(e) => { e.stopPropagation(); onRemove(e); }}>×</span>
      )}
    </span>
  );
}
