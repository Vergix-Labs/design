/* Arateko UI kit — telas iniciais: Onboarding · Escopo · Charter (GATE 1). */
(function () {
  const NS = window.AratekoLabsDesignSystem_0b81f3;
  const { Card, Field, Select, Pill, Badge, Button, AINote, GateBanner } = NS;
  const Icon = window.ArIcon;
  window.ArScreens = window.ArScreens || {};

  const Grid = ({ cols = 2, gap = 16, children, style }) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...style }}>{children}</div>
  );
  const Lbl = ({ children }) => <div className="ar-label" style={{ marginBottom: 8 }}>{children}</div>;

  function Tile({ icon, title, sub }) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 6, padding: '16px',
        border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-md)',
        background: 'var(--surface-sub)', color: 'var(--text-muted)', cursor: 'pointer',
      }}>
        <span style={{ color: 'var(--accent-strong)' }}><Icon name={icon} size={20} /></span>
        <span style={{ font: '600 var(--fs-sm)/1.3 var(--font-sans)', color: 'var(--text-strong)' }}>{title}</span>
        <span style={{ font: 'var(--text-meta)' }}>{sub}</span>
      </div>
    );
  }

  /* ── Onboarding ──────────────────────────────────────────── */
  window.ArScreens.onboarding = function Onboarding({ session, setSession }) {
    const sugg = ['Como priorizar onde investir o próximo trimestre de produto?',
      'Que apostas de produto maximizam retenção em 2 trimestres?'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Card elevation="raised">
          <Field label="Qual é o desafio?" multiline rows={3}
            placeholder="Ex.: Como priorizar onde investir o próximo trimestre de produto?"
            value={session.challenge}
            onChange={(e) => setSession((s) => ({ ...s, challenge: e.target.value }))} />
          <div style={{ marginTop: 16 }}>
            <Grid cols={3}>
              <Tile icon="paperclip" title="Anexar contexto" sub="doc, planilha, link" />
              <Tile icon="layers" title="Exemplos de desafio" sub="templates prontos" />
              <Tile icon="file-text" title="Importar de um doc" sub="cole um brief existente" />
            </Grid>
          </div>
        </Card>
        <AINote actions={sugg.map((q, i) => (
          <Button key={i} variant="ai" size="sm"
            onClick={() => setSession((s) => ({ ...s, challenge: q }))}>{`Usar sugestão ${i + 1} ↗`}</Button>
        ))}>
          <b>Zona de IA:</b> os agentes sugerem reformulações do desafio e exemplos. Você escolhe — nenhuma decisão de valor aqui.
        </AINote>
      </div>
    );
  };

  /* ── Escopo & Intensidade (4Ms) ──────────────────────────── */
  function Meter({ label, value }) {
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ font: 'var(--text-body-sm)', color: 'var(--text)' }}>{label}</span>
          <span style={{ font: 'var(--text-mono)', color: 'var(--text-muted)' }}>{value}/5</span>
        </div>
        <div style={{ height: 7, borderRadius: 4, background: 'var(--surface-sunken)', overflow: 'hidden' }}>
          <div style={{ width: `${value / 5 * 100}%`, height: '100%', background: 'var(--amber-300)', borderRadius: 4 }} />
        </div>
      </div>
    );
  }
  window.ArScreens.scope = function Scope({ session, setSession }) {
    const dims = [['Ambiguidade', 4], ['Nº de opções', 3], ['Stakeholders', 4], ['Risco', 3], ['Horizonte', 2]];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Grid cols={2} style={{ alignItems: 'start' }}>
          <Card title="Complexidade" meta="5 dimensões">
            {dims.map(([l, v]) => <Meter key={l} label={l} value={v} />)}
          </Card>
          <Card title="Orçamento de recursos" meta="4Ms">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {['Manpower', 'Minutes', 'Money', 'Motivation'].map((m) => <Pill key={m}>{m}</Pill>)}
            </div>
            <Select label="Intensidade da sessão (gear)"
              options={['Sprint', 'Journey', 'Method', 'Meta']}
              value={session.intensity}
              onChange={(e) => setSession((s) => ({ ...s, intensity: e.target.value }))} />
            <div style={{
              marginTop: 14, padding: '12px 14px', borderRadius: 'var(--radius-md)',
              background: 'var(--accent-soft)', border: '1px solid var(--gate-border)',
              font: 'var(--text-body-sm)', color: 'var(--amber-800)',
            }}>
              Recomendação dos agentes: <b style={{ color: 'var(--text-strong)' }}>Sprint</b> — alta ambiguidade, orçamento enxuto.
            </div>
          </Card>
        </Grid>
        <AINote>
          A IA pontua a complexidade e recomenda a intensidade; o <b>facilitador confirma o gear</b>.
        </AINote>
      </div>
    );
  };

  /* ── Charter — Enquadrar (GATE 1) ────────────────────────── */
  window.ArScreens.charter = function Charter({ session, approveGate }) {
    const approved = !!session.gates[1];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Grid cols={2} style={{ alignItems: 'start' }}>
          <Card title="DNA do desafio" meta="artefato">
            <Lbl>Desafio</Lbl>
            <p style={{ font: 'var(--text-body)', margin: '0 0 14px', color: 'var(--text)' }}>
              {session.challenge || 'Como priorizar onde investir o próximo trimestre de produto?'}
            </p>
            <Grid cols={2} gap={14}>
              <div><Lbl>Objetivo</Lbl><p style={{ font: 'var(--text-body-sm)', margin: 0, color: 'var(--text-muted)' }}>Dobrar a retenção em 2 trimestres.</p></div>
              <div><Lbl>Restrições</Lbl><p style={{ font: 'var(--text-body-sm)', margin: 0, color: 'var(--text-muted)' }}>Sem novo headcount; 1 sprint.</p></div>
            </Grid>
            <div style={{ marginTop: 14 }}><Lbl>KPIs (curto / longo)</Lbl>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Pill accent>Retenção D30 +8pp</Pill><Pill accent>NRR 115%</Pill>
              </div>
            </div>
          </Card>
          <Card title="Stakeholders" meta="influência × interesse">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              <Pill icon={<Icon name="users" size={13} />} selected>Decisores</Pill>
              <Pill>Produto</Pill><Pill>Growth</Pill><Pill>Vendas</Pill><Pill>Clientes-chave</Pill>
            </div>
            <div style={{
              height: 150, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
              background: 'repeating-linear-gradient(0deg,transparent,transparent 29px,var(--border-soft) 29px,var(--border-soft) 30px),repeating-linear-gradient(90deg,transparent,transparent 29px,var(--border-soft) 29px,var(--border-soft) 30px)',
              position: 'relative',
            }}>
              {[['Decisores', '70%', '22%'], ['Produto', '40%', '55%'], ['Clientes', '78%', '60%']].map(([n, x, y]) => (
                <span key={n} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', font: '600 11px var(--font-sans)', color: 'var(--text-strong)', background: 'var(--white)', border: '1px solid var(--border-strong)', borderRadius: 999, padding: '2px 8px' }}>{n}</span>
              ))}
            </div>
          </Card>
        </Grid>
        <GateBanner gate={1} title="Aprove o DNA do desafio e os KPIs"
          description={<>Nada avança sem o DNA do desafio e os KPIs aprovados. Este é o <b>primeiro julgamento de valor</b>.</>}
          actions={approved
            ? <Badge tone="positive"><Icon name="check" size={12} /> Charter aprovado</Badge>
            : <>
              <Button variant="accent" size="sm" leftIcon={<Icon name="shield-check" size={15} />} onClick={() => approveGate(1)}>Aprovar charter</Button>
              <Button variant="ghost" size="sm">Editar</Button>
            </>} />
      </div>
    );
  };
})();
