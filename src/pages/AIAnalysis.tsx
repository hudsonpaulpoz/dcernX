import { Link } from "react-router-dom";
import { ArrowRight, Brain, Building2, FileSearch, Scale, ShieldCheck, LineChart, AlertTriangle, Newspaper } from "lucide-react";
import { StackedLogo } from "@/components/StackedLogo";

const analyses = [
  {
    icon: Brain,
    title: "Strategy analysis",
    desc: "Positioning, value proposition, target market, GTM motion, defensibility and the 18-month strategic priorities — with the three risks and opportunities that matter most.",
  },
  {
    icon: Building2,
    title: "Competition analysis",
    desc: "A mapped landscape of direct and adjacent competitors with positioning, pricing posture and distribution — including where the target wins, loses and is structurally exposed.",
  },
  {
    icon: Newspaper,
    title: "Negative media analysis",
    desc: "A research scaffold across reputational, legal, ethical and adverse-news risk vectors — categories, search queries and jurisdictions for your team to pursue.",
  },
  {
    icon: Scale,
    title: "Regulatory analysis",
    desc: "The regulatory regimes most likely to apply by sector and geography — licensing, reporting and approvals, plus emerging regulation that could reshape the model in 24 months.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance analysis",
    desc: "The compliance posture required at scale — data protection, security frameworks, KYC/AML, employment, IP and third-party risk — with the evidence to request from the founder.",
  },
  {
    icon: LineChart,
    title: "Financial analysis",
    desc: "Likely revenue model, unit economics, gross-margin profile, burn dynamics and capital efficiency — with the KPIs and benchmark ranges an investor should request.",
  },
  {
    icon: AlertTriangle,
    title: "Risk report",
    desc: "A consolidated risk register across market, execution, team, technology, regulatory, financial and reputational categories — each rated and paired with a diligence question.",
  },
];

export default function AIAnalysis() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full bg-background border-b border-border px-6">
        <div className="mx-auto flex h-[56px] max-w-[1200px] items-center justify-between">
          <Link to="/" className="flex items-center gap-2 -ml-0.5">
            <StackedLogo size={16} />
            <span className="text-[14px] font-bold text-foreground tracking-[0.08em] uppercase">DcernX</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="hidden sm:inline-flex h-8 px-3 items-center text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              Home
            </Link>
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
            AI-assisted primary analysis
          </p>
          <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-[500] tracking-[-0.04em] leading-[1.05] text-foreground max-w-[820px]">
            Seven structured analyses. One brief. Before your team spends an hour.
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground max-w-[640px]">
            DcernX's primary analysis agents read every prospective deal across seven dimensions — surfacing the questions worth asking, the evidence worth requesting, and the risks worth pricing in. The output is a decision-useful brief your partners can act on immediately.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/ai-analysis/try">
              <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Try a live analysis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <Link to="/auth" className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              Request access →
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* The seven analyses */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
            What the agents produce
          </p>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-[500] tracking-[-0.03em] text-foreground max-w-[640px] leading-[1.15]">
            A complete primary brief — assembled in minutes, structured for review.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border">
            {analyses.map((a, i) => {
              const Icon = a.icon;
              const isRightEdge = (i + 1) % 3 === 0;
              const isBottomRow = i >= analyses.length - (analyses.length % 3 || 3);
              return (
                <div
                  key={a.title}
                  className={`p-8 ${!isRightEdge ? "lg:border-r" : ""} ${i % 2 === 0 ? "md:border-r lg:border-r" : ""} ${!isBottomRow ? "border-b" : "border-b md:border-b"} border-border`}
                >
                  <div className="h-9 w-9 border border-border flex items-center justify-center mb-5">
                    <Icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-medium text-foreground mb-2">{a.title}</h3>
                  <p className="text-[13.5px] leading-[1.65] text-muted-foreground">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div>
            <p className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
              How it works
            </p>
            <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-[500] tracking-[-0.03em] text-foreground leading-[1.15]">
              Built to enrich judgement, not replace it.
            </h2>
            <p className="mt-5 text-[15px] text-muted-foreground leading-[1.7]">
              The agents pull from a curated reasoning stack and your workspace context — decks, founder updates, call notes, data-room documents. Every claim is structured, every assumption disclosed, every output reviewable.
            </p>
          </div>
          <ol className="space-y-6">
            {[
              {
                step: "01",
                title: "Provide the target",
                body: "Drop in a company name, a website, and any context your team has captured so far. The agents take it from there.",
              },
              {
                step: "02",
                title: "Seven parallel briefs",
                body: "Strategy, competition, negative media, regulatory, compliance, financial and risk — each produced as a structured section with consistent depth.",
              },
              {
                step: "03",
                title: "Reviewable in your workspace",
                body: "Outputs land in the deal's record, ready to annotate, score, route to experts, and incorporate into the conviction memo.",
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
            See it on a deal you're looking at today.
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground">
            Run a free, live primary analysis on any prospective company. No account required.
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
          <div className="flex items-center gap-2 -ml-0.5">
            <StackedLogo size={16} />
            <span className="text-[12px] font-bold text-foreground uppercase tracking-[0.08em]">DcernX</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-[12px] text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="text-[12px] text-muted-foreground hover:text-foreground">Terms</Link>
            <span className="text-[12px] text-muted-foreground">© {new Date().getFullYear()} P101 Limited</span>
          </div>
        </div>
      </div>
    </div>
  );
}
