import React from 'react';

/* Arateko · AINote — a "Zona de IA". A IA amplia; o humano decide. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-ainote{
    display:flex;align-items:flex-start;gap:var(--space-3);
    background:var(--ai-bg);border:1px solid var(--ai-border);
    border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);font-family:var(--font-sans);
  }
  .ar-ainote--quiet{background:transparent;border-style:dashed}
  .ar-ainote__tag{
    flex:0 0 auto;display:inline-flex;align-items:center;gap:.35em;
    font-size:var(--fs-3xs);font-weight:var(--fw-semibold);letter-spacing:var(--ls-wide);
    color:var(--ai-text);background:var(--white);border:1px solid var(--ai-border);
    border-radius:var(--radius-pill);padding:.22em .6em;margin-top:.05rem;
  }
  .ar-ainote__tag::before{content:"";width:.45em;height:.45em;border-radius:50%;background:var(--ai-text)}
  .ar-ainote__body{flex:1;min-width:0;font-size:var(--fs-sm);line-height:var(--lh-normal);color:var(--slate-700)}
  .ar-ainote__body b{color:var(--text-strong)}
  .ar-ainote__actions{display:flex;gap:var(--space-2);margin-top:var(--space-2);flex-wrap:wrap}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'ainote');
  el.textContent = css;
  document.head.appendChild(el);
}

export function AINote({
  label = 'IA',
  quiet = false,
  actions = null,
  children,
  className = '',
  ...rest
}) {
  ensureStyles();
  const cls = ['ar-ainote', quiet ? 'ar-ainote--quiet' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      <span className="ar-ainote__tag">{label}</span>
      <div className="ar-ainote__body">
        {children}
        {actions && <div className="ar-ainote__actions">{actions}</div>}
      </div>
    </div>
  );
}
