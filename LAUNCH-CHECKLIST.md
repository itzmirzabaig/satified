# Satified: Launch and SEO Checklist

Work top to bottom. Nothing below Step 1 matters until satified.org actually serves the new site.

---

## 0. Push the site live

```
rm -f public/sat-score-calculator/.fuse_hidden*
git add -A
git commit -m "AI tutor SEO layer, blog cluster, creator page, lighter acorn video, fixes"
git push
```

The `.fuse_hidden*` file is a junk temp file from the file mount, not real content, so remove it before staging.

After the push, Cloudflare Pages rebuilds and deploys automatically. Verify it:

1. Cloudflare dashboard, Workers and Pages, open your project, Deployments tab. The newest deployment should read "Success."
2. If satified.org still shows the OLD site after a successful build, or the build fails, the deploy pipeline is misconfigured. Check Settings, Builds and deployments:
   - Production branch must be `main`.
   - Build command should be `npm run build` and the build output directory should be `dist` (this is a Vite project, and Vite copies everything in `public/` into `dist/` at build time, which is how the new pages get served).
   - Open the build log and read the error if it failed. A failed build silently keeps the last good deployment live, which is exactly the "old site" symptom.

This deploy pipeline has been the single blocker. Fix it first.

---

## 1. Google Search Console (do this first, about 5 minutes)

This is how Google finds and indexes your pages, and where you watch search performance.

1. Go to search.google.com/search-console and sign in.
2. Add property. Two options:
   - Domain property (recommended): enter `satified.org`. Google gives you a TXT record. In Cloudflare, go to your domain, DNS, Records, Add record: Type TXT, Name `@`, Content = the value Google gave you. Save, then click Verify in GSC.
   - URL prefix property: enter `https://satified.org` and verify with the HTML tag method. Google gives a `<meta name="google-site-verification" ...>` tag. Send it to me and I will paste it into index.html for you.
3. Once verified: left menu, Sitemaps, enter `sitemap.xml`, Submit. (Full URL is https://satified.org/sitemap.xml.) Google will crawl all of your URLs.
4. Use URL Inspection on your most important pages (/, /sat-math-practice/, /ai-sat-math-tutor/, /study/) and click Request indexing to speed up crawling.
5. Check back in a few days. The Pages report shows what is indexed; Performance shows impressions and clicks.

---

## 2. Bing Webmaster Tools (about 5 minutes)

Bing powers Bing search and a chunk of AI answers, so it is worth the few minutes.

1. Go to bing.com/webmasters and sign in.
2. Easiest path: choose Import from Google Search Console. One click pulls in your verified site and sitemap.
3. If not importing: Add site `https://satified.org`, verify (DNS TXT, XML file, or meta tag), then Sitemaps, Submit `https://satified.org/sitemap.xml`.

---

## 3. Analytics with event tracking (GA4)

Universal Analytics is retired; Google Analytics 4 is current.

1. Go to analytics.google.com, Admin, Create, Property. Name it Satified.
2. Create a Web data stream for `https://satified.org`. It gives you a Measurement ID that looks like `G-XXXXXXXXXX` and a gtag.js snippet.
3. Put the snippet in the `<head>` of every page. Your pages do not share one template, so the clean move is to add it to index.html, study/index.html, and the pages.css template pages. Give me the Measurement ID and I will add the snippet across every page for you.
4. Tutor event tracking (from your research). The tutor lives in study/tutor.js and study/app.ts. Fire a GA4 event at each of these moments:
   - `tutor_opened` when the tutor panel opens. Params: question_id, skill, domain.
   - `tutor_question_asked` when a prompt is submitted. Params: question_id, skill, prompt_type.
   - `tutor_answer_rendered` when a reply finishes. Params: model_route, latency_ms, fallback_used.
   - `tutor_answer_helpful` and `tutor_answer_unhelpful` on thumbs up or down (you would add those two buttons to the tutor reply).
   - `tutor_switched_to_practice` when the student closes the tutor and attempts another question.
   - `tutor_cta_clicked` when someone clicks from a SEO page into /study/.
   Each is a single line, for example `gtag('event','tutor_opened',{question_id, skill, domain});`. I can wire all of these into the tutor code for you once GA4 is on the site. The helpful/unhelpful signal is the most valuable one, because it tells you which explanations actually work.

---

## 4. Off-site (after the site is live and indexed)

These build authority and referral traffic. Spread them over a few weeks; do not blast them all at once.

- Product Hunt (producthunt.com): make a maker account, prepare the launch (tagline, a few gallery images or a GIF of the tutor and practice, and a first comment that it is free, no account, built by a student). Launch early morning Pacific on a weekday. Ask a handful of friends to upvote and comment honestly.
- AlternativeTo (alternativeto.net): add Satified as a free alternative to Khan Academy SAT, UWorld, Acely, and Photomath. Evergreen referrals and a backlink.
- Common Sense Education (commonsense.org/education): submit Satified for a review as a free learning tool. Slow, but high trust in the education niche.
- OER Commons (oercommons.org): create an account and add Satified as a free open educational resource for SAT Math.
- SAT and tutoring blogs (the list from your research, including PrepScholar, SuperKnowva, PrepGraph, Magoosh, and similar): email each a short, honest, personalized pitch. Something like: "I am a student who built a free, no account SAT Math practice tool with an AI tutor. Would it fit your free resources roundup?" Never mass blast. The exact list is in satified_seo_research.md; ask me to pull it into this file if you want it here.
- r/SAT (reddit.com/r/SAT): participate genuinely first by answering questions and being useful, before you ever link. When you do share, disclose that you built it, and only where it is actually relevant. Reddit punishes self promotion, so lead with usefulness. One honest "I built this free tool, feedback welcome" post can do well once the community recognizes you.

---

## Priority order

1. Fix the Cloudflare deploy so satified.org serves the new site.
2. GSC verify and submit sitemap.
3. Bing import.
4. GA4 plus tutor events.
5. AlternativeTo, OER Commons, Common Sense (evergreen, low effort).
6. Product Hunt launch, once the site is polished and live.
7. Blog outreach and r/SAT, ongoing.

## What I can do for you in code, just say the word

- Add the Google verification meta tag to index.html.
- Add the GA4 gtag snippet across all pages (give me the Measurement ID).
- Wire the six tutor events into study/tutor.js and study/app.ts, and add the thumbs up / thumbs down buttons.
- Pull the exact blog outreach list out of satified_seo_research.md into this checklist.
