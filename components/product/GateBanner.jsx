import React from 'react';

/* Arateko · GateBanner — o momento de decisão humana. O âmbar é o farol. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-gate{
    display:flex;align-items:flex-start;gap:var(--space-3);
    background:var(--gate-bg);border:1px solid var(--gate-border);
    border-radius:var(--radius-md);padding:var(--space-4);font-family:var(--font-sans);
  }
  .ar-gate__beacon{
    flex:0 0 auto;width:34px;height:34px;border-radius:50%;
    background:radial-gradient(circle at 50% 38%,var(--beacon-core),var(--amber-400) 70%);
    box-shadow:0 0 0 4px color-mix(in srgb,var(--amber-400) 18%,transparent);
    display:flex;align-items:center;justify-content:center;
    font-family:var(--font-mono);font-weight:600;font-size:var(--fs-xs);color:#5c3c16;
  }
  .ar-gate__main{flex:1;min-width:0}
  .ar-gate__id{
    font-family:var(--font-mono);font-size:var(--fs-3xs);font-weight:600;letter-spacing:.06em;
    text-transform:uppercase;color:var(--gate-text);
  }
  .ar-gate__title{font:var(--text-subheading);color:var(--text-strong);margin:.15rem 0 .25rem}
  .ar-gate__desc{font-size:var(--fs-sm);line-height:var(--lh-normal);color:var(--amber-800);margin:0}
  .ar-gate__desc b{color:var(--text-strong)}
  .ar-gate__actions{display:flex;gap:var(--space-2);margin-top:var(--space-3);flex-wrap:wrap;align-items:center}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'gate');
  el.textContent = css;
  document.head.appendChild(el);
}

export function GateBanner({
  gate = 1,
  title = 'Decisão humana',
  description = null,
  actions = null,
  children,
  className = '',
  ...rest
}) {
  ensureStyles();
  return (
    <div className={['ar-gate', className].filter(Boolean).join(' ')} {...rest}>
      <div className="ar-gate__beacon">{gate}</div>
      <div className="ar-gate__main">
        <div className="ar-gate__id">GATE {gate} · aval humano</div>
        <div className="ar-gate__title">{title}</div>
        {description && <p className="ar-gate__desc">{description}</p>}
        {children}
        {actions && <div className="ar-gate__actions">{actions}</div>}
      </div>
    </div>
  );
}
