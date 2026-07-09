# Satified tutor: owner setup

The tutor is a Cloudflare Pages Function at `functions/api/tutor.js` plus a browser panel at `study/tutor.js`. Both deploy automatically with the repo: Cloudflare Pages detects the `functions` folder on the next push, no extra build step. At normal traffic it costs nothing: every provider below has a free tier and the function runs inside the Pages free plan.

## 1. Create the API keys

You need at least one. The function tries them in order and fails over automatically: Gemini first, then Groq, then Cerebras.

* GEMINI_API_KEY: Google AI Studio, https://aistudio.google.com. Sign in, open Get API key, create a key. This is the primary provider.
* GROQ_API_KEY: https://console.groq.com. Create an account, open API Keys, create a key. First fallback.
* CEREBRAS_API_KEY: https://cloud.cerebras.ai. Create an account, open API Keys, create a key. Second fallback.

The model names live at the top of `functions/api/tutor.js` (GEMINI_MODEL, GROQ_MODEL, CEREBRAS_MODEL) if you ever want to swap them.

## 2. Put the keys into Cloudflare

1. Cloudflare dashboard, Workers and Pages, open the satified project.
2. Settings, Environment variables.
3. Add each key under Production, type Secret: GEMINI_API_KEY, GROQ_API_KEY, CEREBRAS_API_KEY.
4. Redeploy the site (Deployments, Retry deployment, or push any commit). Functions only see variables that existed when the deployment was built.

## 3. Optional hardening

The Turnstile bot check below is off by default, and the code skips it cleanly when it is not configured.

### Turnstile, a bot check

1. Cloudflare dashboard, Turnstile, Add widget. Domain: satified.org. Widget mode: Invisible.
2. Copy the Site Key into `study/index.html`: fill the empty content of the `<meta name="turnstile-sitekey" content="">` tag.
3. Copy the Secret Key into a new environment variable named TURNSTILE_SECRET, same place as step 2 above.
4. Redeploy. Once the secret is set, the function rejects any request without a valid token.

### No rate limit, and why

The tutor has no app level rate limit on purpose. A per IP limit would treat a whole school or library, which shares one public IP, as a single user and block the class at once. Instead, abuse is bounded by the free model tiers' own daily caps: when they are spent, the tutor shows the friendly resting message and recovers on its own. There is nothing to configure here, and KV is not used.

## 4. Free tier limits at a glance

* Cloudflare Pages Functions: 100,000 requests per day on the free plan. Each student message is one request.
* Gemini free tier: daily request caps on the flash models (a few hundred requests per day, plus a per minute cap). Check the current numbers in Google AI Studio under rate limits.
* Groq free tier: roughly 1,000 requests per day for the llama 3.3 70b model. Used only when Gemini declines or errors.
* Cerebras free tier: a generous daily allowance for llama 3.3 70b. Used only when both others fail.
* No rate limit and no KV: usage is bounded only by the model tiers above, which keeps schools on a shared IP from being blocked.

If every provider is exhausted or erroring, students see a friendly message: The tutor is resting. Try again in a minute.

## 5. Local development

Nothing breaks without keys. `npm run dev` serves the site as usual; the panel opens, and a send simply shows the friendly failure message because the Vite dev server does not run Pages Functions.

To exercise the real function locally:

1. `npm run build`
2. `npx wrangler pages dev dist`

Give the local run keys with a `.dev.vars` file at the repo root, one KEY=value per line. With no keys at all the endpoint answers 503 with the same friendly resting message, so the page always degrades gracefully.
