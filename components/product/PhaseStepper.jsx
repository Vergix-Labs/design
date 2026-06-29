import React from 'react';

/* Arateko · PhaseStepper — progresso pelo Funil de Valor (5 fases + marcadores de gate). */
const PHASES = ['Enquadrar', 'Expandir', 'Ranquear', 'Convergir', 'Operar'];
const GATE_AT = { 0: 1, 2: 2, 3: 3, 4: 4 }; // fase index → nº do gate humano

let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-stepper{display:flex;align-items:flex-start;gap:0;font-family:var(--font-sans);width:100%}
  .ar-step{flex:1;display:flex;flex-direction:column;align-items:center;gap:.55rem;position:relative;min-width:0}
  .ar-step__track{position:relative;width:100%;display:flex;align-items:center;justify-content:center;height:14px}
  .ar-step__line{position:absolute;top:50%;height:2px;background:var(--border);transform:translateY(-50%)}
  .ar-step__line--l{left:0;right:50%}
  .ar-step__line--r{left:50%;right:0}
  .ar-step__line--done{background:var(--amber-300)}
  .ar-step__dot{
    width:14px;height:14px;border-radius:50%;background:var(--white);
    border:2px solid var(--border-strong);position:relative;z-index:1;
    transition:all var(--dur-base) var(--ease-out);
  }
  .ar-step--done .ar-step__dot{background:var(--amber-400);border-color:var(--amber-400)}
  .ar-step--current .ar-step__dot{
    background:var(--amber-400);border-color:var(--amber-400);
    box-shadow:0 0 0 4px color-mix(in srgb,var(--amber-400) 22%,transparent);
  }
  .ar-step__label{font-size:var(--fs-xs);font-weight:var(--fw-semibold);color:var(--text-hint);text-align:center;line-height:1.2}
  .ar-step--done .ar-step__label,.ar-step--current .ar-step__label{color:var(--text-strong)}
  .ar-step__num{font-family:var(--font-mono);font-size:var(--fs-3xs);color:var(--text-hint);letter-spacing:.02em}
  .ar-step__gate{
    margin-top:.1rem;font-family:var(--font-mono);font-size:9px;font-weight:600;letter-spacing:.04em;
    color:var(--gate-text);background:var(--gate-bg);border:1px solid var(--gate-border);
    border-radius:var(--radius-pill);padding:.05rem .4rem;
  }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'stepper');
  el.textContent = css;
  document.head.appendChild(el);
}

export function PhaseStepper({
  phases = PHASES,
  current = 0,
  showGates = true,
  showNumbers = true,
  className = '',
  ...rest
}) {
  ensureStyles();
  return (
    <div className={['ar-stepper', className].filter(Boolean).join(' ')} {...rest}>
      {phases.map((p, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo';
        const gate = showGates ? GATE_AT[i] : null;
        return (
          <div key={p} className={`ar-step ar-step--${state}`}>
            <div className="ar-step__track">
              {i > 0 && <span className={`ar-step__line ar-step__line--l ${i <= current ? 'ar-step__line--done' : ''}`} />}
              {i < phases.length - 1 && <span className={`ar-step__line ar-step__line--r ${i < current ? 'ar-step__line--done' : ''}`} />}
              <span className="ar-step__dot" />
            </div>
            {showNumbers && <span className="ar-step__num">{`0${i + 1}`}</span>}
            <span className="ar-step__label">{p}</span>
            {gate && <span className="ar-step__gate">GATE {gate}</span>}
          </div>
        );
      })}
    </div>
  );
}
