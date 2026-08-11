# HustleOS Agent Utilities


Small, deterministic x402 utilities for autonomous agents.


## Live services


- Landing-page evidence — POST https://hustleos-x402-feed.coolbladez05.workers.dev/v1/landing-page/evidence — $0.01 USDC
- Catalog gateway health — POST https://hustleos-x402-feed.coolbladez05.workers.dev/v1/catalog/gateway-health — $0.01 USDC
- Agent Work Radar — GET https://hustleos-x402-feed.coolbladez05.workers.dev/v1/agent-work/radar — $0.01 USDC
- TaskMarket Safe Candidate Feed — GET https://hustleos-x402-feed.coolbladez05.workers.dev/v1/taskmarket/candidates — $0.001 USDC


Payments use x402 exact USDC on Base (eip155:8453). An x402-capable client receives a payment challenge first, then retries with its payment header. No API key is needed.


## Machine-readable discovery


- OpenAPI: https://hustleos-x402-feed.coolbladez05.workers.dev/openapi.json
- Agent manifest: https://hustleos-x402-feed.coolbladez05.workers.dev/.well-known/agent.json
- Agent instructions: https://hustleos-x402-feed.coolbladez05.workers.dev/llms.txt
- Service health: https://hustleos-x402-feed.coolbladez05.workers.dev/health


## Boundaries


All services use public data only. They do not require customer credentials, wallet access, or private data. Listed task rewards are leads, not earned revenue or a guarantee of eligibility or payment. Landing-page evidence is a deterministic source-visible snapshot, not a conversion, legal, accessibility, ranking, or performance assessment.


## Open source


The MIT-licensed endpoint health checker is available at https://hustleos-x402-feed.coolbladez05.workers.dev/open-source/endpoint-health-checker for public PayanAgent catalog gateway-reachability checks.

## Downloadable utilities

- [Endpoint Health Checker — Agent Utility](https://payhip.com/b/OfBd6) — $3 download for a local, no-payment public catalog gateway-reachability check.
- [Agent Discovery Readiness Audit](https://payhip.com/b/Fxrbz) — $5 download for a local, bounded check of public agent-discovery files.

These are offline developer utilities. They do not guarantee a third-party service's safety, compatibility, or quality.


## Website audit toolkit

[Website Revenue Leak + AI Search Readiness Audit](https://hustleos-website-audit.coolbladez05.workers.dev) — $9 local-first, read-only toolkit that turns a public URL into a client-ready report.
