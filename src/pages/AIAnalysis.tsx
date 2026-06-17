import { Link } from "react-router-dom";
import { ArrowRight, Brain, Building2, FileSearch, Scale, ShieldCheck, LineChart, AlertTriangle, Newspaper, Cpu, Layers, Target, Globe2, Calculator } from "lucide-react";
import { StackedLogo } from "@/components/StackedLogo";
import { Seo } from "@/components/Seo";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { MarketingThemeToggle } from "@/components/MarketingThemeToggle";

const analyses = [
  {
    icon: Brain,
    title: "Strategy",
    desc: "Every strategic claim in the pitch — positioning, moat, GTM motion, 18-month priorities — challenged against public evidence and either validated or flagged, with the sources behind each verdict.",
  },
  {
    icon: Building2,
    title: "Competition",
    desc: "The competitor set the founders name (and the ones they don't) tested against the live landscape — pricing, positioning, distribution and traction — with attributable sources for every comparison.",
  },
  {
    icon: Newspaper,
    title: "Negative media",
    desc: "Reputational, legal, ethical and adverse-news signals on the company, founders and key backers — surfaced from open sources with links, dates and jurisdictions so your team can verify in one click.",
  },
  {
    icon: Cpu,
    title: "Technology",
    desc: "Technical claims about the stack, IP, defensibility and scalability stress-tested against repos, job posts, patents and public architecture signals — with sources behind every confirmation or doubt.",
  },
  {
    icon: Scale,
    title: "Regulatory & compliance",
    desc: "Applicable regimes by sector and geography — licensing, reporting, data protection, KYC/AML, security frameworks — cross-checked against regulator guidance with citations and effective dates.",
  },
  {
    icon: LineChart,
    title: "Financial",
    desc: "Revenue model, unit economics, burn and capital efficiency claims pressure-tested against sector benchmarks and filings — assumptions made explicit, ranges sourced, gaps flagged for the founder.",
  },
  {
    icon: AlertTriangle,
    title: "Risk",
    desc: "A consolidated, source-backed risk register across market, execution, team, technology, regulatory, financial and reputational categories — each rated and paired with a diligence question.",
  },
  {
    icon: Layers,
    title: "PESTEL",
    desc: "Political, economic, social, technological, environmental and legal forces shaping the opportunity — each factor evidenced with current public data and tied back to the company's exposure.",
  },
  {
    icon: Target,
    title: "SWOT",
    desc: "Strengths, weaknesses, opportunities and threats — derived from validated claims rather than founder narrative, with every entry linked to the source that supports it.",
  },
  {
    icon: ArrowRight,
    title: "GTM",
    desc: "Channels, ICP, sales motion, pricing and CAC/LTV assumptions checked against comparable companies and observable distribution — with cited examples of what works in this segment.",
  },
  {
    icon: Globe2,
    title: "External intelligence & benchmarking",
    desc: "Market size, growth, comparable rounds, hiring signals and product-velocity benchmarks pulled from public sources — so every comparison the deck makes has a verifiable counterpart.",
  },
  {
    icon: Calculator,
    title: "Valuation",
    desc: "An evidence-led valuation view: comparable transactions, revenue multiples and stage benchmarks, with the assumptions and ranges sourced — not a number to anchor on, a frame to negotiate from.",
  },
];

export default function AIAnalysis() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Agentic Due Diligence for VCs, Accelerators, Angel Syndicates & Venture Studios — Claim-by-Claim, Source-Backed Validation | DcernX"
        description="DcernX's agentic DD challenges every claim in the pitch and supporting documents — validating or invalidating each with attributable, source-backed research across 12 analysis tracks. Built for VCs, accelerators, angel syndicates, venture studios and startup funds."
        path="/ai-analysis"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "DcernX Agentic Due Diligence",
            serviceType: "AI Due Diligence",
            provider: { "@type": "Organization", name: "P101 Limited" },
            audience: {
              "@type": "Audience",
              audienceType: "Venture capital firms, accelerators, angel syndicates, venture studios, startup funds, family offices, corporate venture",
            },
            description: "Twelve structured agentic analyses that challenge every claim in the pitch and startup documents and either validate or invalidate them with attributable, source-backed research.",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Agentic DD", item: "/ai-analysis" },
            ],
          },
        ]}
      />
      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full bg-background border-b border-border px-6">
        <div className="mx-auto flex h-[56px] max-w-[1200px] items-center justify-between">
          <Link to="/" className="flex items-center -ml-0.5" aria-label="DcernX home">
            <StackedLogo size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="hidden sm:inline-flex h-8 px-3 items-center text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              Home
            </Link>
            <MarketingThemeToggle />
            <Link to="/ai-analysis/try">
              <button className="text-[13px] h-8 px-3 border border-foreground/40 text-foreground hover:bg-foreground hover:text-background transition-colors">
                Try for free
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-5">
            Agentic due diligence
          </p>
          <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-[500] tracking-[-0.04em] leading-[1.05] text-foreground max-w-[860px]">
            Every claim challenged. Every verdict sourced. Conviction you can defend.
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground max-w-[680px]">
            DcernX's agents read the pitch and supporting documents the way a sceptical partner would — interrogating each claim about market, traction, technology, team and economics, and either validating or invalidating it with attributable, source-backed research. The output is a brief your IC can stand behind.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/ai-analysis/try">
              <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Try a live analysis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <a href="https://wms.xylor.ai/forms/survey/nn787mfqd1abpvq69e9te4vx598744gp" target="_blank" rel="noopener noreferrer" className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              Request access →
            </a>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* The twelve analyses */}
      <CursorSpotlight className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
            What the agents produce
          </p>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-[500] tracking-[-0.03em] text-foreground max-w-[720px] leading-[1.15]">
            Twelve tracks. One brief. Every claim either validated or invalidated — with sources.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border">
            {analyses.map((a, i) => {
              const Icon = a.icon;
              const isRightEdge = (i + 1) % 3 === 0;
              const isBottomRow = i >= analyses.length - (analyses.length % 3 || 3);
              return (
                <div
                  key={a.title}
                  className={`group/card relative p-8 transition-colors duration-200 hover:bg-foreground/[0.04] ${!isRightEdge ? "lg:border-r" : ""} ${i % 2 === 0 ? "md:border-r lg:border-r" : ""} ${!isBottomRow ? "border-b" : "border-b md:border-b"} border-border`}
                >
                  <div className="h-9 w-9 border border-border flex items-center justify-center mb-5 transition-colors group-hover/card:border-foreground/60 group-hover/card:bg-foreground/[0.06]">
                    <Icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-medium text-foreground mb-2">{a.title}</h3>
                  <p className="text-[13.5px] leading-[1.65] text-muted-foreground">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </CursorSpotlight>

      <div className="border-t border-border" />

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div>
            <p className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
              How it works
            </p>
            <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-[500] tracking-[-0.03em] text-foreground leading-[1.15]">
              Built to challenge claims, not echo them.
            </h2>
            <p className="mt-5 text-[15px] text-muted-foreground leading-[1.7]">
              The agents extract every material assertion from the deck, memo, data-room and founder updates, then triangulate each one against public sources — filings, regulators, repos, hiring data, comparable transactions and credible media. Every verdict is attributed; every gap is named.
            </p>
          </div>
          <ol className="space-y-6">
            {[
              {
                step: "01",
                title: "Drop in the deal",
                body: "Company name, website, deck and any documents your team has collected. The agents parse the claims and queue them for challenge.",
              },
              {
                step: "02",
                title: "Twelve parallel investigations",
                body: "Strategy, competition, negative media, technology, regulatory & compliance, financial, risk, PESTEL, SWOT, GTM, external intelligence & benchmarking, and valuation — each producing validated or invalidated findings with citations.",
              },
              {
                step: "03",
                title: "A defensible brief in your workspace",
                body: "Outputs land in the deal record with every source linked — ready to annotate, score, route to experts and fold into the IC memo with confidence.",
              },
            ].map((s) => (
              <li key={s.step} className="flex gap-5 border-t border-border pt-6 first:border-t-0 first:pt-0">
                <span className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground shrink-0 w-10 pt-1">
                  {s.step}
                </span>
                <div>
                  <h3 className="text-[15px] font-medium text-foreground">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-[720px]">
          <FileSearch className="h-6 w-6 mx-auto text-foreground/70" strokeWidth={1.5} />
          <h2 className="mt-6 text-[clamp(1.8rem,3vw,2.5rem)] font-[500] tracking-[-0.035em] text-foreground leading-[1.1]">
            Put it on a deal you're looking at today.
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground">
            Run a free, live agentic DD on any prospective company. Every claim challenged, every verdict sourced. No account required.
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/ai-analysis/try">
              <button className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-[15px] font-medium border border-foreground/40 text-foreground hover:bg-foreground hover:text-background transition-colors">
                Try for free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" aria-label="DcernX home" className="-ml-0.5">
            <StackedLogo size={20} />
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-[12px] text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="text-[12px] text-muted-foreground hover:text-foreground">Terms</Link>
            <Link to="/fair-use" className="text-[12px] text-muted-foreground hover:text-foreground">Fair Use</Link>
            <span className="text-[12px] text-muted-foreground">© {new Date().getFullYear()} P101 Limited</span>
          </div>
        </div>
      </div>
    </div>
  );
}
