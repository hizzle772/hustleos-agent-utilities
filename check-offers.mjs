#!/usr/bin/env node
/**
 * Endpoint Health Checker — public, no-payment catalog gateway probe.
 * Node 18+. This probes only public PayanAgent gateway URLs using HEAD/OPTIONS.
 */
const endpoint = "https://payanagent.com/api/v1/offers?sort=top&limit=100";
const timeoutMs = 10_000;

function urlOf(offer) {
  const value = offer?.buyUrl || offer?.endpoint || offer?.url || null;
  return typeof value === "string" && value.startsWith("/") ? "https://payanagent.com" + value : value;
}

async function probe(offer) {
  const url = urlOf(offer);
  if (!url || !/^https:\/\//i.test(url)) return { offerId: offer?._id || offer?.id || null, title: offer?.title || null, endpoint: url, status: "invalid_url" };
  const attempt = async method => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const started = Date.now();
    try {
      const response = await fetch(url, { method, redirect: "manual", signal: controller.signal });
      return { method, httpCode: response.status, latencyMs: Date.now() - started, allow: response.headers.get("allow") || "" };
    } finally { clearTimeout(timer); }
  };
  try {
    let result = await attempt("HEAD");
    if (result.httpCode === 405 || result.httpCode === 501) result = await attempt("OPTIONS");
    const alive = result.httpCode === 402 || (result.httpCode >= 200 && result.httpCode < 400) || (result.httpCode === 405 && result.allow.toUpperCase().includes("POST"));
    return { offerId: offer?._id || offer?.id || null, title: offer?.title || null, endpoint: url, status: alive ? "reachable" : "http_error", httpCode: result.httpCode, latencyMs: result.latencyMs, method: result.method };
  } catch (error) {
    return { offerId: offer?._id || offer?.id || null, title: offer?.title || null, endpoint: url, status: error?.name === "AbortError" ? "timeout" : "error", error: String(error?.message || error) };
  }
}

const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
if (!response.ok) throw new Error("Catalog request failed: HTTP " + response.status);
const catalog = await response.json();
const offers = Array.isArray(catalog.offers) ? catalog.offers.slice(0, 100) : [];
const probes = [];
for (let index = 0; index < offers.length; index += 8) probes.push(...await Promise.all(offers.slice(index, index + 8).map(probe)));
console.log(JSON.stringify({ checked_at: new Date().toISOString(), source: "PayanAgent public catalog", probe_method: "HEAD with OPTIONS fallback", count: probes.length, probes, limitations: ["This tests public gateway reachability only.", "It does not invoke paid tools or establish downstream seller health, quality, or legitimacy."] }, null, 2));
