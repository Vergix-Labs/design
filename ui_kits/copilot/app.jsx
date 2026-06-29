/* Arateko UI kit — shell do Copilot de sessão + navegação. */
const NS = window.AratekoLabsDesignSystem_0b81f3;
const { PhaseStepper, Pill, Button } = NS;
const Icon = window.ArIcon;

const AR_STEPS = [
  { key: 'onboarding', phase: -1, kicker: 'entrada',         title: 'Onboarding do desafio' },
  { key: 'scope',      phase: -1, kicker: 'escopo',          title: 'Escopo & Intensidade' },
  { key: 'charter',    phase: 0,  kicker: 'fase 1 · enquadrar', title: 'Charter', gate: 1 },
  { key: 'expand',     phase: 1,  kicker: 'fase 2 · expandir',  title: 'Opções & Critérios' },
  { key: 'rank',       phase: 2,  kicker: 'fase 3 · ranquear',  title: 'Matriz MCDA', gate: 2 },
  { key: 'converge',   phase: 3,  kicker: 'fase 4 · convergir', title: 'Scorecard do Funil', gate: 3 },
  { key: 'operate',    phase: 4,  kicker: 'fase 5 · operar',    title: 'Plano & KPIs', gate: 4 },
  { key: 'log',        phase: 5,  kicker: 'saída',            title: 'Decision log' },
];

function ArAvatar({ initials = 'MR' }) {
  return (
    <span style={{
      width: 30, height: 30, borderRadius: '50%', flex: '0 0 auto',
      background: 'var(--ink-800)', color: 'var(--text-inverse)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      font: '600 12px var(--font-sans)', letterSpacing: '.02em',
    }}>{initials}</span>
  );
}

function ArTopBar({ session }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20, background: 'var(--white)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1040, margin: '0 auto', padding: '12px 24px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <img src="../../assets/arateko-mark-ink.png" alt="" style={{ height: 26, width: 'auto' }} />
        <span style={{ font: '600 19px var(--font-serif)', color: 'var(--text-strong)', letterSpacing: '.01em' }}>Arateko</span>
        <span style={{ width: 1, height: 22, background: 'var(--border)', margin: '0 4px' }} />
        <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>{session.name}</span>
        <Pill accent style={{ marginLeft: 2 }}>Sprint</Pill>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="ar-label" style={{ fontSize: 10 }}>Decisor</span>
          <ArAvatar initials="MR" />
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border-soft)', background: 'var(--paper-2)' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '14px 24px 16px' }}>
          <PhaseStepper current={session.phase} />
        </div>
      </div>
    </header>
  );
}

function ArFooter({ step, idx, onBack, onNext, nextLabel, nextVariant, canBack }) {
  return (
    <footer style={{
      position: 'sticky', bottom: 0, background: 'color-mix(in srgb, var(--paper) 86%, transparent)',
      backdropFilter: 'blur(6px)', borderTop: '1px solid var(--border)', marginTop: 8,
    }}>
      <div style={{
        maxWidth: 1040, margin: '0 auto', padding: '12px 24px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <Button variant="ghost" onClick={onBack} disabled={!canBack}
          leftIcon={<Icon name="arrow-left" size={16} />}>Voltar</Button>
        <span style={{ marginLeft: 'auto', font: 'var(--text-meta)', color: 'var(--text-hint)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="git-fork" size={13} /> loop-back disponível se um critério eliminar todas as opções
        </span>
        {onNext && (
          <Button variant={nextVariant || 'primary'} onClick={onNext}
            rightIcon={<Icon name="arrow-right" size={16} />}>{nextLabel || 'Continuar'}</Button>
        )}
      </div>
    </footer>
  );
}

function ArApp() {
  const [idx, setIdx] = React.useState(0);
  const [session, setSession] = React.useState({
    name: 'Priorização do roadmap Q3',
    phase: -1,
    challenge: '',
    intensity: 'Sprint',
    gates: {},
  });

  const step = AR_STEPS[idx];

  React.useEffect(() => {
    setSession((s) => ({ ...s, phase: step.phase }));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [idx]);

  const go = (n) => setIdx(Math.max(0, Math.min(AR_STEPS.length - 1, n)));
  const next = () => go(idx + 1);
  const back = () => go(idx - 1);
  const approveGate = (n) => setSession((s) => ({ ...s, gates: { ...s.gates, [n]: true } }));

  const Screen = window.ArScreens[step.key];
  const ctx = { session, setSession, next, back, goTo: go, idx, step, approveGate };

  // gates exigem aprovação antes de avançar
  const gateBlocked = step.gate && !session.gates[step.gate];
  const nextLabel = idx === AR_STEPS.length - 1 ? null
    : step.gate ? (gateBlocked ? 'Aprove o gate para seguir' : 'Continuar')
    : 'Continuar';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <ArTopBar session={session} />
      <main style={{ flex: 1, width: '100%' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '30px 24px 12px' }}>
          <div style={{ marginBottom: 22 }}>
            <div className="ar-label">{step.kicker}</div>
            <h1 style={{ font: 'var(--text-title)', color: 'var(--text-strong)', margin: '6px 0 0' }}>{step.title}</h1>
          </div>
          {Screen ? <Screen {...ctx} /> : <p>Tela em construção.</p>}
        </div>
      </main>
      <ArFooter
        step={step} idx={idx} canBack={idx > 0}
        onBack={back}
        onNext={idx === AR_STEPS.length - 1 ? null : next}
        nextLabel={nextLabel}
        nextVariant={step.gate && !gateBlocked ? 'primary' : 'primary'}
      />
    </div>
  );
}

window.ArApp = ArApp;
