
# Trust & sales upgrade — Landing + Segment pages

Reviewed the site as a founder selling to investors. The copy and structure are strong (PAS/AIDA in place), but several **trust signals and sales-conversion elements** that buyers look for before booking a demo are missing or under-weighted. Here's a focused plan to add them — all frontend/presentation, no backend changes.

## What's missing today
1. No visible **proof bar** (logos, "as seen in", recognizable backers/partners) above the fold.
2. Security/compliance posture is buried in one FAQ line — buyers (esp. family offices, PE) scan for this.
3. No **founder/team face** — Hudson is a named contact but invisible. Investors buy from people.
4. Testimonials live only on segment pages, not on the homepage.
5. No **risk-reversal** language (e.g. "no credit card", "free first deal", "your data never trains models").
6. CTAs all do the same thing; there's no **low-friction try** alongside the demo ask.
7. No "**how we're different**" anchored claim beyond the comparison table — no methodology, no defensibility story.
8. No press / recognition / "**backed by**" strip.
9. Segment pages end abruptly — no recap CTA block with trust cues.

## Changes

### `src/pages/Landing.tsx`
1. **Hero trust line** — under the hero CTAs, add a single-line micro-proof: "Operated by P101 Limited · GDPR-compliant · Your data never trains third-party models · Sourced from ~1,500 checkpoints per deal."
2. **Proof bar** below hero — a quiet horizontal strip: "Trusted by investment teams across Europe, US, India & Singapore" + 5–6 anonymized firm-type chips (e.g. "Tier-1 European VC", "Singapore family office", "US accelerator", "EU venture studio", "India angel syndicate"). Honest stand-in until real logos arrive.
3. **Homepage testimonial carousel** — pull 3 strongest quotes from `SEGMENTS` (anonymized) into a dedicated section between "How it works" and the report mockup.
4. **Security & trust section** (new, before FAQ) — 4-tile grid:
   - **Operated by P101 Limited** (UK company no. 17063831)
   - **GDPR-compliant by design**
   - **Your data, never trained on** (no third-party model training)
   - **Full audit trail** (every claim cited, timestamped, reviewable)
5. **Founder card** in the final ACTION section — small photo placeholder + "Hudson · Founder, DcernX" + one-line note + direct email/Calendly-style CTA. Makes "Talk to Hudson" feel human, not a mailto void. (Use initials avatar if no photo provided.)
6. **Risk-reversal microcopy** — under "Run my first deal" CTA: "Free. No credit card. Your deal stays yours." Under "Book a demo": "30 min · Run on your live pipeline · No sandbox."
7. **Methodology / "Why trust the output" strip** — short 3-point band: "Evidence loops · Cited sources · Human-reviewable" between sample report and ROI calculator.
8. **Sticky bottom-of-page mini-CTA bar** (desktop only, dismissable) — appears after scrolling past hero with "Run your first deal — free" + "Book a demo". Standard SaaS conversion pattern.

### `src/pages/SegmentPage.tsx`
9. Add a **closing trust block** above the bottom CTA: the same 4 trust tiles (compact version) + segment-specific testimonial reinforced + risk-reversal line.
10. Add a **"Talk to Hudson" founder card** mirroring the homepage one.

### `src/components/MarketingNav.tsx`
11. Add a small **"Run a deal — free"** secondary link next to "Book a demo" so the low-friction path is always visible.

## Technical notes
- All new elements use existing design tokens (`text-foreground/XX`, `border-border/40`, `bg-background`) — no new colors, fonts, or shadcn primitives.
- Founder photo: I'll wire in an `<img>` slot with a generated placeholder initials avatar; user can drop a real photo into `src/assets/hudson.jpg` later.
- Anonymized firm-type chips are clearly labeled as types, not impersonated logos — keeps copy honest.
- No new routes, no backend, no data model changes.

## Out of scope (flagging for later)
- Real logo wall (needs user-supplied logos + permission)
- Case studies / customer story pages
- Live chat widget
- Pricing page (intentionally absent today; can revisit)

## Questions before building
- Do you have a **photo of Hudson** + a preferred 1-line bio you'd like used? (If not, I'll use a clean initials avatar with "Founder, DcernX · ex-[blank]" until you send copy.)
- Any **real firm logos / press mentions** you'd like used in the proof bar now, or should I ship the anonymized chip version and swap later?
