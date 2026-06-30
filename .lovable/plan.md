
# Investor-only rebuild — PAS + AIDA

## Strategy

**Frameworks applied to every page:**
- **PAS** (Problem → Agitate → Solve) drives the top of each page: name the operational pain, sharpen it with concrete consequences, then introduce DcernX as the resolution.
- **AIDA** (Attention → Interest → Desire → Action) drives section flow: bold hero hook → capability proof → outcome visualization (sample report, calculator) → single CTA (book demo / try DcernX).

**Positioning:** Generic "DcernX platform" — no Distill/Ace/Folio names, no $402/$670/$1,420 pricing. Outcome and capability language only.

**Stats:** Soften and qualify. Replace "75% of deals die in the dark" with "Industry estimates suggest the majority of private-market deals lack auditable review trails." Use ranges, attribute to "industry estimates," and lead with DcernX's own demonstrated outcomes (hours saved, reports per analyst, sources per report).

## Rollback

Delete entirely:
- `src/pages/AIAnalysis.tsx`
- `src/pages/AIAnalysisTry.tsx`
- `src/pages/Landing.tsx` (current founder-leaning version)
- `src/pages/ForInvestors.tsx` (replaced by new hub)
- Routes in `src/App.tsx`: `/ai-analysis`, `/ai-analysis/try`, `/for-startups`
- Founder copy in `index.html` meta + `public/sitemap.xml` + `public/llms.txt`

`Index.tsx` becomes the new investor hub (route `/`).

## Site map

| Route | Purpose |
|---|---|
| `/` | Investor hub — PAS/AIDA master page, segment selector, sample report, calculator, FAQ, CTA |
| `/segments/accelerators` | Accelerator programs — cohort intake, scoring, alumni tracking |
| `/segments/venture-studios` | Studios — internal idea vetting, co-founder matching, portfolio ops |
| `/segments/vcs` | Venture capital — deal flow triage, IC memos, LP reporting |
| `/segments/angels` | Angel syndicates — lightweight diligence, syndicate coordination |
| `/segments/family-offices` | Family offices — governance, multi-asset visibility, fiduciary audit trail |
| `/segments/pe-funds` | PE — diligence at scale, value-creation tracking, exit prep |
| `/segments/startup-programs` | Corporate / government / university programs — intake fairness, reporting to sponsors |

Each segment page shares the same template, parameterized by segment data.

## Hub page (`/`) structure

```text
┌─ NAV ──────────────────────────────────────────────────┐
├─ HERO (Attention + Problem) ───────────────────────────┤
│  H1: "Private capital runs on memory. Make it run on   │
│       evidence."                                       │
│  Sub: 1-line PAS hook + dual CTA (Try / Book demo)     │
├─ AGITATE STRIP ────────────────────────────────────────┤
│  3 stat tiles, softened + qualified                    │
│  (e.g., "~20hr per initial decision — industry est.")  │
├─ SEGMENT SELECTOR (Interest) ──────────────────────────┤
│  7 cards → linked to /segments/[name]                  │
│  Each card: icon + segment + 1-line pain + outcome     │
├─ SOLVE: How DcernX works ──────────────────────────────┤
│  8-step pipeline (intake → 16 agents → swarm → ...     │
│  → published report). Kept from prior version.         │
├─ DESIRE: Sample report visualization ──────────────────┤
│  Embedded preview of the uploaded VC report styled in  │
│  DcernX dark theme. "This is what every deal looks     │
│  like in DcernX." + email-gate to download full sample │
├─ ROI calculator ───────────────────────────────────────┤
│  Investor calc: monthly applications × analyst rate    │
│  → hours + $ saved. (Kept, refined.)                   │
├─ COMPARISON TABLE ─────────────────────────────────────┤
│  Status quo (email, spreadsheets, memory) vs DcernX    │
│  (intake, agents, audit trail, IC-ready)               │
├─ FAQ (FAQPage JSON-LD) ────────────────────────────────┤
├─ FINAL CTA ────────────────────────────────────────────┤
└─ FOOTER (links to all 7 segment pages) ────────────────┘
```

## Segment page template

Same skeleton, segment-specific copy + icons:

1. **Hero** — segment-named (e.g., "Built for Venture Capital"), 1-line PAS hook tailored to that buyer (Partner, GP, Program Director, CIO).
2. **Pain block** — 3 cards specific to that segment's day-to-day (e.g., VCs: "Cold inbound buried in personal inboxes" / "IC memos written the night before" / "LP updates rebuilt every quarter").
3. **Outcomes** — 3 metric-driven outcome statements ("X reports per analyst per week", "Audit-ready in one click").
4. **Capabilities relevant to segment** — 4-6 features filtered for relevance (e.g., LP portal highlighted for VCs/PE, alumni tracking for accelerators).
5. **Mini ROI** — segment-specific defaults pre-loaded into the calculator.
6. **Testimonial slot** — placeholder quote in the segment's voice (clearly placeholder until real ones land).
7. **CTA** — "Book a demo for {Segment}".

Implementation: one shared `<SegmentPage segment={...}>` component + a `segments.ts` config file with all 7 segment objects (slug, name, hero, pains, outcomes, etc.). Keeps copy in one place, layout in one place.

## SEO

- Per-route `<Seo>` with PAS-style titles and high-intent keywords per segment (e.g., "AI deal flow software for venture capital", "Accelerator application screening platform", "Family office investment governance").
- `sitemap.xml` regenerated to include 1 hub + 7 segment pages, founder URLs removed.
- `index.html` site-wide title/description refocused to investors.
- FAQ schema on hub; `Service` schema on each segment page with `audienceType` set per segment.
- Internal linking: hub ↔ all 7 segments, footer on every page lists all 7.
- `llms.txt` and `robots.txt` updated.

## What gets reused

- `StackedLogo`, `MarketingThemeToggle`, `CursorSpotlight`, `Seo` components — unchanged.
- Investor calculator logic — moved into a reusable component and re-skinned with segment-specific defaults.
- Pipeline visualization (8 steps, 16 parallel agents) — kept.
- Comparison table — kept, copy rewritten investor-only.
- FAQ structure — kept, copy refreshed.
- Hero, founder calculator, founder-side comparison rows, "two products pick yours" UI — all removed.

## Build order

1. Delete founder pages + routes; clean nav, sitemap, llms.txt, index.html meta.
2. Create `src/data/segments.ts` (7 segment configs).
3. Build shared `SegmentPage` component + `/segments/:slug` route.
4. Rebuild hub at `/` using PAS/AIDA structure above.
5. Regenerate sitemap (`scripts/generate-sitemap.ts`).
6. SEO audit pass — verify titles/descriptions/canonicals per route.

## Out of scope (call out for next pass)

- Real testimonials / case studies (placeholders for now).
- Live email capture backend (form posts to a stub until you confirm destination — Resend, HubSpot, etc.).
- Actually embedding the uploaded HTML report — for v1 I'll style a faithful visual mock of it inline; wiring the real artifact as a downloadable PDF can come next.
- Per-segment OG images (one shared OG image for v1).
