# AGENTS.md - Vergix design

## MANDATORY pre-read

Before any work in this repo, read the canonical Aravox session-start manifest:

- Local: `/Users/usegall/aravox-labs/guardrails/AGENTS.md`
- GitHub: [https://github.com/aravox-labs/guardrails/blob/main/AGENTS.md](https://github.com/aravox-labs/guardrails/blob/main/AGENTS.md)

It loads the Atomicity Protocol, scheduled-task preamble, AI Agent Instructions, Defensive Programming, SDLC/governance suite, latest ADRs, project memory, sprint context, and validation gate.

Source of truth lives in `aravox-labs/guardrails`; this file is only a thin repo pointer plus local context. Do not duplicate governance rules here.

## Current canon highlights

- `SPEC` now originates in Notion per ADR-0035; any repo `.md` is a derived mirror unless the canonical guardrails say otherwise.
- The S-3 structured Notion check is ratified by DEC-58 but is not a blocking gate until ARV-2059 proves deterministic queries.
- `ADR`, `POLICY`, `RUNBOOK`, `CONTRACT`, and `GUARDRAIL` remain GitHub-first engineering decisions.
- Sprint, ticket, status, and execution state remain Linear-canonical.

## Repo-specific context

- Stack detected: unknown.
- Start with this repo's `README.md` and local tests before editing.

## Validation

Use the commands documented in this repo. If none are documented, inspect package/build files and run the narrowest relevant local check before committing.

<!-- harness-ref:begin (gerado por propagate-harness-refs.sh — não editar à mão; regenere após canon bump) -->
## 🔁 Harness — contrato multi-runtime (leitura obrigatória para agentes)

Todo agente (Claude, OpenAI/Codex, opencode/Ollama) operando neste repo segue o contrato do Loop Engineering:

- **Claude:** invoque as skills `agent-worker` / `agent-orchestrator` / `agent-approval-companion` / `daily-sprint-programming` / `session-closeout` (fonte canônica: `~/aravox-labs/guardrails/skills/`).
- **Outros runtimes:** leia `~/aravox-labs/guardrails/portable/HARNESS-CORE.md` + o adapter do seu runtime em `~/aravox-labs/guardrails/portable/adapters/` ANTES de qualquer file-op. Agentes opencode prontos (symlink, sempre a versão vigente): `~/.config/opencode/agents/` — instale/atualize com `bash ~/aravox-labs/guardrails/portable/scripts/install-portable.sh`.
- **Invariantes que nenhum runtime relaxa:** merge = founder, exceto classe auto-merge ratificada (DEC-242) · deploy/Cat A = founder · writer ≠ verifier ≠ merger · um worktree por ticket · evidência por comando · sinais exatos do vocabulário · DoD ⊆ ENTREGA.
- **Versão vigente:** canon `2026-10-11b` · manifest `~/aravox-labs/guardrails/skills/dist/MANIFEST.json`.
<!-- harness-ref:end -->
