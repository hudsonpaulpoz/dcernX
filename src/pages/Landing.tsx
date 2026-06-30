import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Seo } from "@/components/Seo";
import { MarketingNav, MarketingFooter, WAITLIST_URL } from "@/components/MarketingNav";
import { InvestorCalculator } from "@/components/InvestorCalculator";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { SEGMENTS } from "@/data/segments";

const FAQS = [
  {
    q: "Who uses DcernX?",
    a: "Investment teams that move private capital: VCs, accelerators, venture studios, angel syndicates, family offices, PE funds and startup programs. If you're accountable for the decision, this is built for you.",
  },
  {
    q: "How is this different from a deal flow CRM?",
    a: "A CRM stores contacts. DcernX is the operating layer underneath it: structured intake, agentic AI due diligence, IC-ready memos and an audit trail on every decision — purpose-built for private markets, not a retrofitted sales tool.",
  },
  {
    q: "What does the AI due diligence cover?",
    a: "Twelve research tracks per deal: strategy, market, competition, team, financials, regulatory, negative media, ESG and risk. Every claim is sourced, timestamped and reviewable.",
  },
  {
    q: "How fast is a report?",
    a: "About 12 minutes from deck upload to an IC-ready brief — work that costs an analyst roughly 20 hours. Deeper investigations run in parallel on demand.",
  },
  {
    q: "Is our data safe?",
    a: "DcernX is operated by P101 Limited (UK, no. 17063831). GDPR-compliant by design. We process your data, never sell it, and never train third-party models on it.",
  },
  {
    q: "Can we trial it on our own pipeline?",
    a: "Yes. Demos run on live deals from your inbox so you see exactly how DcernX behaves on your team's work — not a sandbox.",
  },
];

const FLOW_DEAL = [
  {
    n: "01",
    t: "Drop the deck",
    d: "Deck, data room, founder form or notes. One structured deal profile in seconds.",
  },
  {
    n: "02",
    t: "Agents go to work",
    d: "16 specialist AI agents run in parallel across strategy, market, competition, team, financials and risk.",
  },
  {
    n: "03",
    t: "Claims get challenged",
    d: "Every assertion cross-checked against web, filings, news and proprietary sources — in evidence loops.",
  },
  {
    n: "04",
    t: "Brief lands in your inbox",
    d: "An IC-ready report in ~12 minutes. Every finding cited. Every source timestamped.",
  },
];

const FLOW_ORG = [
  {
    n: "01",
    t: "Working session",
    d: "We map your pipeline, team and decision rituals — and shape the rollout around them.",
  },
  {
    n: "02",
    t: "Right-sized plan",
    d: "Seats, agents and storage scaled to a solo angel, a 20-person fund or a PE platform.",
  },
  {
    n: "03",
    t: "Your workflows, configured",
    d: "Intake forms, scoring rubrics, IC templates and stage gates tuned to how your team actually decides.",
  },
  {
    n: "04",
    t: "Connected to your stack",
    d: "Plug into your existing CRM or run DcernX as the system of record. Portfolio memory becomes searchable.",
  },
  {
    n: "05",
    t: "Evidence by default",
    d: "Every deal, decision and update captured, sourced and auditable — from first look to LP report.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="DcernX — AI Due Diligence & Deal Flow for Investors"
        description="The operating layer for private capital. AI due diligence, deal flow management and IC-ready memos for VCs, family offices, PE, accelerators and angels — 20 analyst hours in 12 minutes, fully evidenced."
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
          AI due diligence · Deal flow · IC memos
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.02] max-w-4xl">
          Private capital runs on memory.<br />
          <span className="text-foreground/55">Run it on evidence instead.</span>
        </h1>
        <p className="mt-8 text-base md:text-lg text-foreground/70 max-w-2xl leading-relaxed">
          DcernX is the AI operating layer for VCs, family offices, PE funds, accelerators, studios, angels and startup programs.
          Structured intake, agentic due diligence, IC-ready memos — and a defensible record of every decision your team ever makes.
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
          <Stat headline="~20 hr" body="Typical analyst time per initial review at a private capital firm. Industry estimate; varies by stage and depth." />
          <Stat headline="Most" body="Private-market deals lack a defensible audit trail behind the decision. Industry estimate." />
          <Stat headline="12 min" body="From deck upload to the first IC-ready, evidence-backed brief in DcernX." />
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
                    Read about DcernX for {s.name} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLVE — two ways to use DcernX */}
      <CursorSpotlight>
        <section id="how" className="border-t border-border/40">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-3">How DcernX works</div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight max-w-3xl mb-4">
              Two ways in. One operating layer.
            </h2>
            <p className="text-sm text-foreground/65 max-w-2xl mb-12">
              Pressure-test a single live deal in minutes — or roll DcernX out as the system of record for every opportunity, decision and update your team touches.
            </p>

            {/* Flow 1 — instant deal analysis */}
            <div className="mb-14">
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-2">Path 1 · Run a deal now</div>
                  <h3 className="text-xl md:text-2xl font-light tracking-tight">From deck to IC-ready brief in ~12 minutes.</h3>
                </div>
                <a
                  href={WAITLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-foreground/70 hover:text-foreground inline-flex items-center gap-1 border-b border-foreground/20 hover:border-foreground pb-0.5"
                >
                  Run my first deal <ArrowRight className="h-3 w-3" />
                </a>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
                {FLOW_DEAL.map((s) => (
                  <div key={s.n} className="bg-background p-5">
                    <div className="text-[10px] text-foreground/40 tabular-nums mb-2">{s.n}</div>
                    <div className="text-sm font-medium mb-1">{s.t}</div>
                    <div className="text-xs text-foreground/60 leading-relaxed">{s.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flow 2 — adopt across the org */}
            <div>
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-2">Path 2 · DcernX for your team</div>
                  <h3 className="text-xl md:text-2xl font-light tracking-tight">Make evidence the default for every deal you ever see.</h3>
                </div>
                <a
                  href="mailto:hudson@p101limited.com"
                  className="text-xs text-foreground/70 hover:text-foreground inline-flex items-center gap-1 border-b border-foreground/20 hover:border-foreground pb-0.5"
                >
                  Talk to Hudson <ArrowRight className="h-3 w-3" />
                </a>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border/40">
                {FLOW_ORG.map((s) => (
                  <div key={s.n} className="bg-background p-5">
                    <div className="text-[10px] text-foreground/40 tabular-nums mb-2">{s.n}</div>
                    <div className="text-sm font-medium mb-1">{s.t}</div>
                    <div className="text-xs text-foreground/60 leading-relaxed">{s.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 text-xs text-foreground/50">
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
