# Endpoint Health Checker

A free Node.js 18+ tool that creates a public gateway-reachability report for the PayanAgent catalog. It performs only `HEAD` requests, falling back to `OPTIONS` where appropriate. It never sends payment headers, credentials, wallets, request bodies, or paid API calls.

Run it with:

```powershell
node .\check-offers.mjs > report.json
```

The report distinguishes a public payment challenge (`402`) or a reachable gateway from an error. It does **not** prove an underlying seller endpoint is healthy, legitimate, or suitable to buy from.

For an on-demand, hosted version with a bounded result set, use the paid HustleOS API:

`POST https://hustleos-x402-feed.coolbladez05.workers.dev/v1/catalog/gateway-health`

Price: $0.01 USDC over x402 on Base.

## License

MIT. Copyright 2026 HustleOS.
