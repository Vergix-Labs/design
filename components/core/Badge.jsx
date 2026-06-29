import React from 'react';

/* Arateko · Badge — status semântico (IA / GATE / artefato / passa / elimina). */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-badge{
    display:inline-flex;align-items:center;gap:.4em;
    font-family:var(--font-sans);font-weight:var(--fw-semibold);
    font-size:var(--fs-3xs);letter-spacing:var(--ls-wide);
    line-height:1;padding:.32em .7em;border-radius:var(--radius-pill);
    border:1px solid transparent;white-space:nowrap;
  }
  .ar-badge--solid{border-radius:var(--radius-sm)}
  .ar-badge svg{width:1.1em;height:1.1em}
  .ar-badge--ai{background:var(--ai-bg);color:var(--ai-text);border-color:var(--ai-border)}
  .ar-badge--gate{background:var(--gate-bg);color:var(--gate-text);border-color:var(--gate-border)}
  .ar-badge--artifact{background:var(--artifact-bg);color:var(--artifact-text);border-color:var(--border-soft)}
  .ar-badge--positive{background:var(--positive-bg);color:var(--positive);border-color:color-mix(in srgb,var(--positive) 25%,transparent)}
  .ar-badge--negative{background:var(--negative-bg);color:var(--negative);border-color:color-mix(in srgb,var(--negative) 25%,transparent)}
  .ar-badge--neutral{background:var(--surface-sunken);color:var(--text-muted);border-color:var(--border-soft)}
  .ar-badge--accent{background:var(--accent-soft);color:var(--accent-strong);border-color:var(--gate-border)}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'badge');
  el.textContent = css;
  document.head.appendChild(el);
}

const LABELS = {
  ai: 'IA',
  gate: 'GATE',
  artifact: 'artefato',
  positive: 'passa',
  negative: 'elimina',
};

export function Badge({ tone = 'neutral', children, icon = null, dot = false, className = '', ...rest }) {
  ensureStyles();
  const cls = ['ar-badge', `ar-badge--${tone}`, className].filter(Boolean).join(' ');
  const content = children != null ? children : (LABELS[tone] || '');
  return (
    <span className={cls} {...rest}>
      {dot && <span style={{ width: '.45em', height: '.45em', borderRadius: '50%', background: 'currentColor' }} />}
      {icon}
      {content}
    </span>
  );
}
