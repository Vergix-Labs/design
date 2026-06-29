/* Arateko UI kit — telas finais: Operar (GATE 4) · Decision log. */
(function () {
  const NS = window.AratekoLabsDesignSystem_0b81f3;
  const { Card, Pill, Badge, Button, AINote, GateBanner, DecisionLog } = NS;
  const Icon = window.ArIcon;
  window.ArScreens = window.ArScreens || {};

  const Grid = ({ cols = 2, gap = 16, children, style }) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...style }}>{children}</div>
  );

  /* ── Operar — plano & KPIs (GATE 4) ──────────────────────── */
  function PlanTile({ icon, title, lines }) {
    return (
      <Card elevation="raised" radius="md">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ color: 'var(--accent-strong)' }}><Icon name={icon} size={18} /></span>
          <span style={{ font: '600 var(--fs-sm) var(--font-sans)', color: 'var(--text-strong)' }}>{title}</span>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {lines.map((l, i) => (
            <li key={i} style={{ display: 'flex', gap: 7, font: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--accent)', marginTop: 1 }}><Icon name="check" size={13} /></span>{l}
            </li>
          ))}
        </ul>
      </Card>
    );
  }
  window.ArScreens.operate = function Operate({ session, approveGate }) {
    const approved = !!session.gates[4];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Grid cols={3}>
          <PlanTile icon="file-text" title="5W2H — ações + donos" lines={['Definir telas de ativação · MR', 'Integrar eventos · JS', 'Piloto com 8 contas · TP']} />
          <PlanTile icon="layers" title="Modelo de negócio" lines={['Proposta: time-to-value', 'Canais: PLG + CS', 'Receita: expansão NRR']} />
          <PlanTile icon="gauge" title="KPIs vivos" lines={['Retenção D30 · baseline 41%', 'Meta: +8pp em 2 trim.', 'Cadência: semanal']} />
        </Grid>
        <Card sunken>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Icon name="clock" size={18} style={{ color: 'var(--accent-strong)' }} />
            <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>
              Revalidação dos 4Ms (teste de realidade):
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <Pill accent>Manpower ✓</Pill><Pill accent>Minutes ✓</Pill><Pill accent>Money ✓</Pill><Pill>Motivation ?</Pill>
            </div>
          </div>
        </Card>
        <AINote quiet>
          Se os 4Ms reprovarem aqui, o fluxo faz <b>loop-back</b> à fase anterior — a IA sinaliza; o humano decide voltar.
        </AINote>
        <GateBanner gate={4} title="Go / no-go + orçamento"
          description={<>O go/no-go e o orçamento ficam humanos. Este é o último gate antes da execução.</>}
          actions={approved
            ? <Badge tone="positive"><Icon name="check" size={12} /> Aprovado para execução</Badge>
            : <>
              <Button variant="accent" size="sm" leftIcon={<Icon name="flag" size={15} />} onClick={() => approveGate(4)}>Dar o go</Button>
              <Button variant="danger" size="sm">No-go</Button>
            </>} />
      </div>
    );
  };

  /* ── Decision log ────────────────────────────────────────── */
  window.ArScreens.log = function DecisionLogScreen({ session }) {
    const g = session.gates || {};
    const entries = [
      { gate: 1, decision: 'DNA + KPIs', options: '—', who: 'Decisor', action: g[1] ? 'confirmou' : undefined },
      { gate: 2, decision: 'Pesos dos critérios', options: '4 critérios', who: 'Decisores', action: g[2] ? 'sobrescreveu' : undefined },
      { gate: 3, decision: 'Vencedora', options: '3 soluções', who: 'Facilitador', action: g[3] ? 'confirmou' : undefined },
      { gate: 4, decision: 'Go / no-go', options: '—', who: 'Decisor', action: g[4] ? 'confirmou' : undefined },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Card title="Trilha auditável" meta="o que · opções · quem · IA">
          <DecisionLog entries={entries} />
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="secondary" size="sm" leftIcon={<Icon name="download" size={15} />}>Exportar PDF</Button>
            <span style={{ font: 'var(--text-meta)', color: 'var(--text-hint)' }}>
              O moat: memória de decisões + auditoria — melhora a cada rodada.
            </span>
          </div>
        </Card>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px',
          borderRadius: 'var(--radius-lg)', background: 'var(--brand-bg)', color: 'var(--brand-text)',
        }}>
          <img src="../../assets/arateko-mark.png" alt="" style={{ height: 46, opacity: .95 }} />
          <div>
            <div style={{ font: '500 var(--fs-lg) var(--font-serif)', color: 'var(--lav-100)' }}>Decisão capturada.</div>
            <div style={{ font: 'var(--text-meta)', color: 'var(--brand-muted)' }}>Da ambiguidade à decisão — assistida por agentes, decidida por humanos.</div>
          </div>
        </div>
      </div>
    );
  };
})();
