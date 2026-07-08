# PERPLEXITY DEEP RESEARCH PROMPT — copy everything below the line into Perplexity (Deep Research + "Computer" mode, Fable 5)

---

You are the SEO research engine for **Satified** (https://satified.org) — a free SAT **Math** practice platform. Your output will be handed directly to a developer/AI to build pages, so every deliverable must be concrete, structured, and copy-paste ready. No filler, no generic advice, no "it depends." Cite sources for any volume/ranking claims and clearly mark estimates as estimates.

## THE PRODUCT (ground truth — do not contradict this)

- 1,483 procedurally generated SAT Math questions. Every question is a **generator**: it regenerates with fresh numbers/setups each time, so students can drill the same College Board pattern repeatedly without memorizing answers.
- Coverage mirrors the **digital SAT Math taxonomy** — 4 domains, 19 skills, 3 difficulty tiers (Easy/Medium/Hard):
  - **Algebra:** Linear Equations in One Variable · Linear Equations in Two Variables · Linear Functions · Linear Inequalities in One or Two Variables · Systems of Two Linear Equations in Two Variables
  - **Advanced Math:** Equivalent Expressions · Nonlinear Equations in One Variable and Systems of Equations in Two Variables · Nonlinear Functions
  - **Problem-Solving and Data Analysis:** Ratios, Rates, Proportional Relationships, and Units · Percentages · One-Variable Data: Distributions and Measures of Center and Spread · Two-Variable Data: Models and Scatterplots · Probability and Conditional Probability · Inference from Sample Statistics and Margin of Error · Evaluating Statistical Claims: Observational Studies and Experiments
  - **Geometry and Trigonometry:** Area and Volume · Lines, Angles, and Triangles · Right Triangles and Trigonometry · Circles
- Features: full adaptive practice tests (2 modules × 22 questions, 35 min each, adaptive routing like Bluebook, 200–800 scoring), built-in Desmos calculator, worked explanations for every question, filter by domain/skill/difficulty, instant grading incl. fill-in answers, MathJax rendering, graphs/figures.
- Free. No account required. Built by one person (a student). NOT a general math-learning site (Khan Academy's job) — it is targeted practice at real SAT difficulty, especially medium/hard.
- Site today: a landing page (single-page, horizontally scrolling, media-heavy) + the practice app at `/study/`. Hosted on Cloudflare Pages. Audience: US high-school students, plus parents and tutors. National/global — **NOT local SEO** (skip GBP/citations/NAP-type local tactics entirely).

## YOUR MISSION

Produce the complete research layer for this site's SEO so the remaining pages can be built directly from your output. Work through the modules below **in order**. Label each module's output with its letter. Use tables wherever specified.

### MODULE A — Keyword universe
1. Build the full keyword map for the SAT math practice niche. Categories: core service ("sat math practice", "free sat math questions", "sat math practice test"), domain-level ("sat algebra practice"), skill-level (one row per each of the 19 skills above — find the phrasing students actually search, e.g. "sat circle problems", "sat systems of equations practice"), difficulty ("hard sat math problems"), question/informational ("how to get an 800 on sat math", "is sat math hard", "what is on the sat math section"), comparison ("khan academy vs uworld sat", "best free sat prep"), score-target ("sat math score calculator", "750 sat math"), seasonal (SAT test dates Aug/Oct/Nov/Dec/Mar/May/Jun, PSAT October, back-to-school, junior-year spring).
2. Output one table: keyword | category | monthly US volume (source or estimate) | difficulty (low/med/high + why) | intent (informational/transactional) | target page (map to Module C's page map) | priority (P1/P2/P3).
3. Flag every keyword-cannibalization risk in the map (two pages that could compete for the same term) and state which page wins.

### MODULE B — Competitor teardown
Analyze what currently ranks for the P1 keywords: Khan Academy Digital SAT, College Board/Bluebook, UWorld, 1600.io, PrepScholar (blog + product), CrackSAT, OnePrep, SAT Question Bank sites, Preply/tutor blogs, r/Sat recommendations, and any strong newcomers you find.
1. Table: competitor | ranking pages/URL patterns | site structure (how they organize domain/skill pages) | content depth per page | schema they use | their weakness we can exploit.
2. Answer specifically: what does the #1 result for "sat math practice" do that others don't? What content GAPS exist at the skill level (e.g., is anyone ranking a dedicated "Probability and Conditional Probability SAT practice" page)? Where does a free-with-unlimited-regeneration angle beat them?

### MODULE C — Full page map / information architecture
Design the complete URL + page architecture for satified.org. Constraints: clean lowercase URLs, no query strings for indexable content, every page reachable ≤3 clicks from home, hub-and-spoke.
1. Table: URL | page type (home/domain hub/skill page/test page/guide/blog/comparison/utility) | primary keyword | secondary keywords | H1 | one-line content brief | internal links IN (from where) | internal links OUT (to where) | schema types.
2. Must include: home, /study/ (the app), 4 domain hubs, 19 skill pages, practice-test page, score guides ("how to get 800..."), comparison pages, FAQ, about, blog hub + categories. Recommend URL pattern for skill pages (e.g. /sat-math/algebra/linear-functions/ vs /practice/linear-functions/) and justify.
3. State the anchor-text convention for internal links between hubs/skills/blog.

### MODULE D — Content strategy & calendar
1. 6-month blog calendar (2–4 posts/month): title | target keyword | funnel stage | which skill/domain pages it links to | word-count target | format (guide/listicle/data study/comparison).
2. Identify 5 "linkable asset" ideas that could earn organic backlinks (e.g., free full-length adaptive test, score calculator, difficulty-rated question of the day, data studies from generator stats).
3. For the 19 skill pages: a reusable content template (sections, FAQ block, worked-example placement, CTA placement) that avoids doorway-page thinness — what UNIQUE elements must each skill page have?

### MODULE E — FAQ & PAA mining
Collect the actual People-Also-Ask / Reddit / Quora questions for: SAT math generally, each of the 4 domains, scoring/adaptive module routing, calculator policy (Desmos), test dates, and "is X free". Output: question | best current answer source | which satified.org page should own it | 2–3 sentence suggested answer. Minimum 40 questions. These feed FAQPage schema.

### MODULE F — Schema plan
For each page type in Module C: exact JSON-LD types and required properties (Organization, WebSite + SearchAction?, WebApplication for /study/, FAQPage, Quiz/LearningResource — research whether Google currently supports Quiz/practice-problems rich results in education and the eligibility rules), BreadcrumbList, Article for blog. Note Google's current policies on education rich results and any that require specific markup patterns.

### MODULE G — Technical SEO specifics for THIS stack
Site is Vite-built static files on Cloudflare Pages; landing is a horizontal-scroll, WebGL + scroll-scrubbed-video page; the app at /study/ is a client-rendered SPA (question content is generated at runtime — inherently non-indexable).
1. Recommendations: keeping a media-heavy horizontal-scroll landing within Core Web Vitals (LCP/INP/CLS) — concrete techniques; whether/how to prerender or SSG lightweight indexable shells around the SPA; canonical strategy between skill pages and /study/ filtered states; sitemap segmentation; what NOT to index.
2. Cloudflare-specific: _headers caching, early hints, image/video delivery.

### MODULE H — Off-site strategy (national edu niche)
Skip all local-SEO tactics. Instead: which directories/listing sites matter for free edu tools; scholarship/.edu link tactics and their current risk profile; teacher/tutor blog + newsletter outreach targets (name 15 real ones with why); Reddit r/Sat and Discord norms for non-spammy sharing; HARO/Connectively-style opportunities in education; YouTube/TikTok SAT creator collab targets (name 10 real channels with audience size).

### MODULE I — Measurement setup
Shortlist of exactly 50 keywords to rank-track (from Module A, balanced across categories); GSC + GA4 event plan for this site (what conversions to track when there's no purchase — e.g., study-session started, practice-test completed, return visits); a monthly reporting template.

### MODULE J — Prioritized execution order
Merge everything into a build order: what to ship in weeks 1–2, month 1, months 2–3, months 4–6, with the reasoning. Assume one builder using AI assistance, a few hours/week.

## OUTPUT RULES
- Markdown. Tables as specified. Every module labeled.
- Real data over platitudes; if a number is an estimate, write "(est.)".
- Where you name competitors' URLs, use their real current URLs.
- Do not explain what SEO is. Do not repeat the brief back. Start directly with Module A.
