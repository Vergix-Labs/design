/* Arateko UI kit — telas centrais: Expandir · Ranquear (GATE 2) · Convergir (GATE 3). */
(function () {
  const NS = window.AratekoLabsDesignSystem_0b81f3;
  const { Card, Pill, Badge, Button, AINote, GateBanner, OptionCard, ScoreTable } = NS;
  const Icon = window.ArIcon;
  window.ArScreens = window.ArScreens || {};

  const Grid = ({ cols = 2, gap = 16, children, style }) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...style }}>{children}</div>
  );

  /* ── Expandir — opções E critérios em paralelo ───────────── */
  window.ArScreens.expand = function Expand() {
    const opcoes = [
      { source: 'humano', title: 'Onboarding assistido por IA', body: 'Reduzir o tempo até o primeiro valor.', tags: ['ativação'] },
      { source: 'ia', title: 'Programa de indicações', body: 'Usuários ativos trazem times.', tags: ['crescimento', 'baixo custo'] },
      { source: 'ia', title: 'Planos por uso (usage-based)', body: 'Alinhar preço a valor entregue.', tags: ['receita'] },
    ];
    const criterios = [
      { source: 'humano', title: 'Impacto na retenção', rank: 'rank 1' },
      { source: 'humano', title: 'Esforço de engenharia', rank: 'rank 2' },
      { source: 'ia', title: 'Risco de execução', rank: 'rank 3' },
      { source: 'ia', title: 'Fit com a estratégia', rank: 'rank 4' },
    ];
    const Col = ({ title, items, addLabel }) => (
      <Card title={title} meta={`${items.length} cartões`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it, i) => <OptionCard key={i} {...it} />)}
          <Button variant="ai" size="sm" fullWidth leftIcon={<Icon name="plus" size={15} />}>{addLabel}</Button>
        </div>
      </Card>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <AINote actions={<>
          <Button variant="ai" size="sm" leftIcon={<Icon name="sparkles" size={14} />}>IA: ampliar pool</Button>
          <Button variant="ai" size="sm" leftIcon={<Icon name="layers" size={14} />}>IA: de-duplicar / clusterizar</Button>
        </>}>
          <b>Disciplina-assinatura:</b> gerar <b>opções E critérios em paralelo</b>. A IA amplia e agrupa; os humanos trazem o que importa.
        </AINote>
        <Grid cols={2} style={{ alignItems: 'start' }}>
          <Col title="Opções / soluções" items={opcoes} addLabel="IA: gerar mais opções ↗" />
          <Col title="Critérios / filtros" items={criterios} addLabel="IA: propor critérios ↗" />
        </Grid>
      </div>
    );
  };

  /* ── Ranquear — matriz MCDA (GATE 2) ─────────────────────── */
  window.ArScreens.rank = function Rank({ session, approveGate }) {
    const approved = !!session.gates[2];
    const criteria = [
      { label: 'Impacto', weight: 30, rank: 'rank 1' },
      { label: 'Esforço', weight: 25, rank: 'rank 2' },
      { label: 'Risco', weight: 25, rank: 'rank 3' },
      { label: 'Fit', weight: 20, rank: 'rank 4' },
    ];
    const options = [
      { name: 'Onboarding assistido', scores: [4.4, 3.6, 4.2, 4.1] },
      { name: 'Indicações', scores: [3.2, 4.1, 3.0, 3.4] },
      { name: 'Usage-based', scores: [3.8, 2.9, 2.8, 4.5] },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Card title="Matriz de decisão (MCDA)" meta="IA pontua · Decisores pesam">
          <ScoreTable criteria={criteria} options={options} />
          <div style={{
            marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
            padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-sub)',
            border: '1px solid var(--border-soft)',
          }}>
            <Icon name="scale" size={16} style={{ color: 'var(--accent-strong)' }} />
            <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>
              Worksheet de pesos — cada peso tem um <b style={{ color: 'var(--text-strong)' }}>dono (Decisor)</b>.
            </span>
            <span style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              <Pill>Impacto · MR</Pill><Pill>Esforço · JS</Pill>
            </span>
          </div>
        </Card>
        <GateBanner gate={2} title="Os Decisores são donos dos pesos"
          description={<>A ordenação dos critérios <b>é</b> o funil. A IA propõe pesos e trade-offs; os humanos decidem.</>}
          actions={approved
            ? <Badge tone="positive"><Icon name="check" size={12} /> Pesos confirmados</Badge>
            : <>
              <Button variant="accent" size="sm" leftIcon={<Icon name="shield-check" size={15} />} onClick={() => approveGate(2)}>Confirmar pesos</Button>
              <Button variant="ghost" size="sm">Repesar</Button>
            </>} />
      </div>
    );
  };

  /* ── Convergir — Scorecard do Funil (GATE 3) ─────────────── */
  function FunnelTable() {
    const rows = [
      ['Onboarding assistido', ['passa', 'passa', 'passa'], 'vencedora'],
      ['Indicações', ['passa', 'elimina', '—'], 'fora'],
      ['Usage-based', ['elimina', '—', '—'], 'fora'],
    ];
    const cell = (v) => {
      if (v === 'passa') return <Badge tone="positive" />;
      if (v === 'elimina') return <Badge tone="negative" />;
      return <span style={{ color: 'var(--text-hint)' }}>—</span>;
    };
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', font: 'var(--text-body-sm)' }}>
        <thead>
          <tr>{['Opção', 'filtro 1', 'filtro 2', 'filtro 3', 'sobrevive?'].map((h) => (
            <th key={h} style={{ border: '1px solid var(--border)', padding: '8px 10px', textAlign: 'left', background: 'var(--surface-sub)', font: '600 var(--fs-2xs)/1 var(--font-sans)', textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--text-muted)' }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map(([name, cells, res]) => (
            <tr key={name} style={res === 'vencedora' ? { background: 'color-mix(in srgb,var(--positive-bg) 60%,white)' } : null}>
              <td style={{ border: '1px solid var(--border)', padding: '8px 10px', fontWeight: 600, color: 'var(--text-strong)' }}>{name}</td>
              {cells.map((c, i) => <td key={i} style={{ border: '1px solid var(--border)', padding: '8px 10px' }}>{cell(c)}</td>)}
              <td style={{ border: '1px solid var(--border)', padding: '8px 10px', font: '700 var(--fs-2xs) var(--font-sans)', textTransform: 'uppercase', letterSpacing: '.05em', color: res === 'vencedora' ? 'var(--positive)' : 'var(--text-hint)' }}>{res}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  window.ArScreens.converge = function Converge({ session, approveGate }) {
    const approved = !!session.gates[3];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Card title="Scorecard do Funil" meta="filtros aplicados em ordem de rank">
          <FunnelTable />
        </Card>
        <Grid cols={2} style={{ alignItems: 'start' }}>
          <Card title="Proposta de valor" meta="artefato">
            <p style={{ font: 'var(--text-body)', margin: 0, color: 'var(--text)' }}>
              Para <b>times de produto que perdem usuários na 1ª semana</b>, o <b>Onboarding assistido por IA</b>
              {' '}é um copiloto de ativação que <b>encurta o tempo até o primeiro valor</b> — diferente de tours genéricos,
              ele se adapta ao objetivo de cada conta.
            </p>
          </Card>
          <Card title="Conceito / protótipo" meta="rápido">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px', borderRadius: 'var(--radius-md)', background: 'var(--surface-sub)', border: '1px dashed var(--border-strong)', color: 'var(--text-muted)' }}>
              <Icon name="target" size={22} style={{ color: 'var(--accent-strong)' }} />
              <div>
                <div style={{ font: '600 var(--fs-sm) var(--font-sans)', color: 'var(--text-strong)' }}>Protótipo clicável</div>
                <div style={{ font: 'var(--text-meta)' }}>hipótese · construir · testar com n=8</div>
              </div>
            </div>
          </Card>
        </Grid>
        <GateBanner gate={3} title="A vencedora sobrevive ao mundo real?"
          description={<>O humano confirma que a vencedora sobrevive — não basta vencer a matemática do funil.</>}
          actions={approved
            ? <Badge tone="positive"><Icon name="check" size={12} /> Sobrevivência confirmada</Badge>
            : <>
              <Button variant="accent" size="sm" leftIcon={<Icon name="shield-check" size={15} />} onClick={() => approveGate(3)}>Confirmar sobrevivência</Button>
              <Button variant="ghost" size="sm">Refunilar</Button>
            </>} />
      </div>
    );
  };
})();
