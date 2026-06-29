import React from 'react';

/* Arateko · ScoreTable — a matriz MCDA. A IA pontua; os Decisores são donos dos pesos. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-mcda{width:100%;border-collapse:collapse;font-family:var(--font-mono);font-size:var(--fs-xs);color:var(--text)}
  .ar-mcda th,.ar-mcda td{border:1px solid var(--border);padding:.5rem .65rem;text-align:center}
  .ar-mcda thead th{background:var(--surface-sub);color:var(--text-muted);font-weight:600;font-size:var(--fs-2xs)}
  .ar-mcda__opt{text-align:left;font-family:var(--font-sans);font-weight:600;color:var(--text-strong);white-space:nowrap}
  .ar-mcda__crit{font-weight:600}
  .ar-mcda__w{display:block;font-size:9px;color:var(--gate-text);font-weight:600;margin-top:.1rem}
  .ar-mcda__score{font-weight:600;color:var(--text-strong);background:var(--surface-sub)}
  .ar-mcda__rank{font-family:var(--font-sans);font-size:9px;color:var(--text-hint);font-weight:600;text-transform:uppercase;letter-spacing:.04em;display:block}
  .ar-mcda tr.is-winner td{background:color-mix(in srgb,var(--positive-bg) 70%,white)}
  .ar-mcda tr.is-winner .ar-mcda__opt{color:var(--positive)}
  .ar-mcda__win{font-family:var(--font-sans);font-size:9px;font-weight:700;color:var(--positive);text-transform:uppercase;letter-spacing:.06em}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'mcda');
  el.textContent = css;
  document.head.appendChild(el);
}

function weighted(scores, criteria) {
  let sum = 0, wsum = 0;
  scores.forEach((s, i) => {
    const w = (criteria[i] && criteria[i].weight) || 0;
    sum += s * w; wsum += w;
  });
  return wsum ? sum / wsum : 0;
}

export function ScoreTable({
  criteria = [],          // [{label, weight, rank?}]
  options = [],           // [{name, scores:[]}]
  showScore = true,
  highlightWinner = true,
  className = '',
  ...rest
}) {
  ensureStyles();
  const scored = options.map((o) => ({ ...o, _score: weighted(o.scores || [], criteria) }));
  const max = Math.max(...scored.map((o) => o._score), 0);
  return (
    <table className={['ar-mcda', className].filter(Boolean).join(' ')} {...rest}>
      <thead>
        <tr>
          <th className="ar-mcda__opt">Opção \ Critério</th>
          {criteria.map((c, i) => (
            <th key={i} className="ar-mcda__crit">
              {c.rank && <span className="ar-mcda__rank">{c.rank}</span>}
              {c.label}
              <span className="ar-mcda__w">{c.weight}%</span>
            </th>
          ))}
          {showScore && <th>Score</th>}
        </tr>
      </thead>
      <tbody>
        {scored.map((o, ri) => {
          const isWin = highlightWinner && showScore && o._score === max && max > 0;
          return (
            <tr key={ri} className={isWin ? 'is-winner' : ''}>
              <td className="ar-mcda__opt">{o.name}{isWin && <> · <span className="ar-mcda__win">vencedora</span></>}</td>
              {(o.scores || []).map((s, ci) => <td key={ci}>{s.toFixed(1)}</td>)}
              {showScore && <td className="ar-mcda__score">{o._score.toFixed(2)}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
