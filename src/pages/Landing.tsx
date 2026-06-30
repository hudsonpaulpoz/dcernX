import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Seo } from "@/components/Seo";
import { MarketingNav, MarketingFooter, WAITLIST_URL } from "@/components/MarketingNav";
import { InvestorCalculator } from "@/components/InvestorCalculator";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { SEGMENTS } from "@/data/segments";

const FAQS = [
  {
    q: "Who is DcernX for?",
    a: "Private investment teams: venture capital, accelerators, venture studios, angel syndicates, family offices, private equity and startup programs — anyone evaluating private opportunities and accountable for the decisions.",
  },
  {
    q: "How is this different from a CRM?",
    a: "A CRM stores contacts. DcernX is an operating layer: structured intake, agentic primary research, IC-ready memos and audit-grade decision records — purpose-built for private capital, not retrofitted from a sales tool.",
  },
  {
    q: "What does the agentic due diligence actually cover?",
    a: "Twelve research tracks per opportunity, including strategy, market, competition, team, financial assumptions, regulatory, negative media and risk. Every claim is sourced and timestamped.",
  },
  {
    q: "How fast is a report?",
    a: "DcernX produces an initial evidenced brief in roughly 12 minutes from a deck upload — work that typically takes an analyst around 18 hours. Deeper investigations run in parallel as you specify them.",
  },
  {
    q: "Is our data safe?",
    a: "DcernX is operated by P101 Limited (UK, company no. 17063831), GDPR-compliant by design. We act as a data processor on customer data, never sell it, and do not train third-party models on it.",
  },
  {
    q: "Can we run it on our own deal flow?",
    a: "Yes. Demos run on real deals from your pipeline so you see exactly how DcernX behaves on your team's work — not a generic sandbox.",
  },
];

const PIPELINE = [
  { n: "01", t: "Intake", d: "Decks, links, founder forms, partner referrals — one structured profile." },
  { n: "02", t: "Agent dispatch", d: "16 specialised research agents allocated to the opportunity." },
  { n: "03", t: "Swarm research", d: "Parallel investigation across web, filings, news and proprietary sources." },
  { n: "04", t: "Claim challenge", d: "Every claim in the deck tested against external evidence." },
  { n: "05", t: "Source loops", d: "Findings cross-checked against multiple independent sources." },
  { n: "06", t: "Ingestion", d: "Evidence pulled into structured fields, scored and tagged." },
  { n: "07", t: "Cleaning", d: "Duplicates removed, conflicts flagged, citations normalised." },
  { n: "08", t: "Report", d: "IC-ready brief published to the deal workspace with full audit trail." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="DcernX — The Operating Layer for Private Investment Teams"
        description="Agentic due diligence and deal flow for VCs, accelerators, venture studios, angels, family offices, PE funds and startup programs. 18 hours of analyst work in 12 minutes — with audit-grade evidence."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <MarketingNav />

      {/* HERO — Attention + Problem */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-6">
          For private investment teams
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.02] max-w-4xl">
          Private capital runs on memory.<br />
          <span className="text-foreground/55">Make it run on evidence.</span>
        </h1>
        <p className="mt-8 text-base md:text-lg text-foreground/70 max-w-2xl leading-relaxed">
          DcernX is the operating layer for VCs, accelerators, studios, angels, family offices, PE funds and startup programs.
          Structured intake, agentic due diligence, IC-ready memos — and a defensible record of every decision your team has ever made.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-6 inline-flex items-center gap-2 bg-foreground text-background text-sm hover:opacity-90 transition-opacity"
          >
            Book a demo <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="#how"
            className="h-11 px-6 inline-flex items-center text-sm border border-foreground/20 hover:border-foreground/60 transition-colors"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* AGITATE — softened stats */}
      <section className="border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-px bg-border/40">
          <Stat headline="~20 hr" body="Estimated effort per initial review at a typical fund. Industry estimate; varies by stage and depth." />
          <Stat headline="Majority" body="Of private-market deals lack a defensible audit trail of the diligence behind the decision. Industry estimate." />
          <Stat headline="12 min" body="DcernX's demonstrated time from deck upload to the first evidenced, IC-ready brief." />
        </div>
      </section>

      {/* INTEREST — segment selector */}
      <section id="segments" className="border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-3">Built for</div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight max-w-3xl mb-10">
            One operating layer. Seven kinds of investor.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40">
            {SEGMENTS.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to={`/segments/${s.slug}`}
                  className="group bg-background p-6 hover:bg-foreground/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="h-4 w-4 text-foreground/60" />
                    <span className="text-xs text-foreground/60">{s.buyer}</span>
                  </div>
                  <div className="text-base font-medium mb-2">{s.name}</div>
                  <p className="text-xs text-foreground/65 leading-relaxed mb-4">{s.hubPain}</p>
                  <div className="text-xs text-foreground/80 leading-relaxed">{s.hubOutcome}</div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs text-foreground/50 group-hover:text-foreground transition-colors">
                    Read more <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLVE — how it works pipeline */}
      <CursorSpotlight>
        <section id="how" className="border-t border-border/40">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-3">How DcernX works</div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight max-w-3xl mb-10">
              Eight steps from raw opportunity to IC-ready brief.
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
              {PIPELINE.map((s) => (
                <div key={s.n} className="bg-background p-5">
                  <div className="text-[10px] text-foreground/40 tabular-nums mb-2">{s.n}</div>
                  <div className="text-sm font-medium mb-1">{s.t}</div>
                  <div className="text-xs text-foreground/60 leading-relaxed">{s.d}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-foreground/50">
              16 specialised agents running in parallel. Every claim cited; every output reviewable.
            </p>
          </div>
        </section>
      </CursorSpotlight>

      {/* DESIRE — sample report mockup */}
      <section className="border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-3">What lands in your workspace</div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight max-w-3xl mb-10">
            Every deal becomes a defensible record.
          </h2>
          <ReportMockup />
        </div>
      </section>

      {/* ROI */}
      <section className="border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-3">Run the numbers</div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight max-w-3xl mb-10">
            What your team gets back.
          </h2>
          <InvestorCalculator />
        </div>
      </section>

      {/* COMPARISON */}
      <section className="border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-3">Compared with the status quo</div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight max-w-3xl mb-10">
            Spreadsheets, inboxes and memory vs. an operating layer.
          </h2>
          <div className="border border-border/40">
            <div className="grid grid-cols-3 text-xs uppercase tracking-wider text-foreground/50 border-b border-border/40">
              <div className="p-4">Capability</div>
              <div className="p-4 border-l border-border/40">Status quo</div>
              <div className="p-4 border-l border-border/40">DcernX</div>
            </div>
            {[
              ["Deal intake", "Email, forms, DMs", "Unified structured intake"],
              ["Primary research", "Hours per deal, by hand", "Minutes, agentic, sourced"],
              ["Memo writing", "Manual, night-before", "Generated from evidence"],
              ["Audit trail", "Reconstructed if asked", "Always on, timestamped"],
              ["Portfolio memory", "Lives in partner heads", "Searchable across years"],
              ["LP / sponsor reporting", "Quarterly scramble", "One click, anytime"],
            ].map(([cap, sq, dc]) => (
              <div key={cap} className="grid grid-cols-3 border-b border-border/40 last:border-b-0 text-sm">
                <div className="p-4 text-foreground/80">{cap}</div>
                <div className="p-4 border-l border-border/40 text-foreground/55 flex items-center gap-2">
                  <Minus className="h-3.5 w-3.5" /> {sq}
                </div>
                <div className="p-4 border-l border-border/40 flex items-center gap-2">
                  <Check className="h-3.5 w-3.5" /> {dc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/40">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-3">FAQ</div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-10">Questions investors ask us.</h2>
          <div className="divide-y divide-border/40">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none flex justify-between items-center text-sm font-medium">
                  {f.q}
                  <span className="text-foreground/40 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ACTION */}
      <section className="border-t border-border/40">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Make every decision defensible.
          </h2>
          <p className="mt-4 text-sm text-foreground/65">
            See DcernX run on your own deal flow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-6 inline-flex items-center gap-2 bg-foreground text-background text-sm hover:opacity-90 transition-opacity"
            >
              Book a demo <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:hudson@p101limited.com"
              className="h-11 px-6 inline-flex items-center text-sm border border-foreground/20 hover:border-foreground/60 transition-colors"
            >
              Email Hudson
            </a>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

const Stat = ({ headline, body }: { headline: string; body: string }) => (
  <div className="bg-background p-6">
    <div className="text-3xl md:text-4xl font-light tracking-tight">{headline}</div>
    <p className="mt-2 text-xs text-foreground/60 leading-relaxed">{body}</p>
  </div>
);

const ReportMockup = () => (
  <div className="border border-border/40 bg-background overflow-hidden">
    <div className="border-b border-border/40 p-4 flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 text-foreground/50">
        <span className="h-2 w-2 rounded-full bg-foreground/40" />
        <span>DcernX · Deal workspace</span>
      </div>
      <span className="text-foreground/40 tabular-nums">v1 · 12 min ago</span>
    </div>
    <div className="grid md:grid-cols-3 gap-px bg-border/40">
      <div className="bg-background p-5 md:col-span-1">
        <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">Subject</div>
        <div className="text-base font-medium">Northwind Robotics</div>
        <div className="text-xs text-foreground/55 mt-1">Series A · Industrial automation · DE</div>
        <div className="mt-6 text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">Conviction</div>
        <div className="text-3xl font-light tabular-nums">72<span className="text-base text-foreground/40">/100</span></div>
        <div className="text-xs text-foreground/55 mt-1">3 strong signals · 2 flags</div>
      </div>
      <div className="bg-background p-5 md:col-span-2">
        <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-3">Findings</div>
        <ul className="space-y-3 text-sm">
          {[
            ["Market", "TAM claim of €18bn validated against 4 independent sources.", 4],
            ["Competition", "2 undisclosed competitors identified in adjacent verticals.", 7],
            ["Team", "Founder track record corroborated; one prior exit verified.", 5],
            ["Regulatory", "CE Machinery Directive applies; pathway clear.", 3],
            ["Risk", "Customer concentration: top 2 customers = 61% of pipeline.", 6],
          ].map(([k, v, n]) => (
            <li key={k as string} className="flex items-start gap-3 border-b border-border/30 pb-3 last:border-b-0">
              <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 w-20 shrink-0 pt-1">{k}</span>
              <span className="flex-1 text-foreground/80">{v}</span>
              <span className="text-[10px] text-foreground/40 tabular-nums">{n} src</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Landing;
