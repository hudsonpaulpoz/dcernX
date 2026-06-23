import { Link } from "react-router-dom";
import { ArrowRight, Moon, Sun, Compass, Radar, Shield, Swords, Gavel, TrendingUp, Layers, Target, Gauge } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Seo } from "@/components/Seo";
import { StackedLogo } from "@/components/StackedLogo";
import { OperatingLayerOrbit } from "@/components/OperatingLayerOrbit";
import { Logo3D } from "@/components/Logo3D";

const SLATE_HSL = "215 16% 47%";
const SLATE_DARK = "215 14% 55%";

const LOGO_VARIANT = 1;

const Landing = () => {
  const { theme, setTheme } = useTheme();
  const [audience, setAudience] = useState<"startups" | "investors">("startups");
  const isDark = theme === "dark";

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", isDark ? SLATE_DARK : SLATE_HSL);
    root.style.setProperty("--ring", isDark ? SLATE_DARK : SLATE_HSL);
    root.style.setProperty("--sidebar-primary", isDark ? SLATE_DARK : SLATE_HSL);
    root.style.setProperty("--sidebar-ring", isDark ? SLATE_DARK : SLATE_HSL);
  }, [isDark]);

  const bgHex = isDark ? "#0e0e10" : "#ffffff";
  const lineHex = isDark ? "#58585e" : "#c0c0c8";

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo
        title="DcernX — AI for Fundraising Founders & Private Investment Teams"
        description="Two products, one operating system. DcernX for Startups gives founders an Investor DD report on their own pitch so every meeting builds conviction. DcernX for Investors runs high-volume agentic DD and manages the full lifecycle from intake to post-deal tracking."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "DcernX",
          url: "/",
          publisher: { "@type": "Organization", name: "P101 Limited" },
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full bg-background border-b border-border px-6">
        <div className="mx-auto flex h-[56px] max-w-[1200px] items-center justify-between">
          <Link to="/" className="flex items-center -ml-0.5" aria-label="DcernX home">
            <StackedLogo size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/ai-analysis" className="hidden sm:inline-flex h-8 px-3 items-center text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              For Startups
            </Link>
            <Link to="/for-investors" className="hidden sm:inline-flex h-8 px-3 items-center text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              For Investors
            </Link>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="h-8 w-8 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
              title="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
            <Link to="/ai-analysis/try">
              <button className="text-[13px] h-8 px-3 border border-foreground/40 text-foreground hover:bg-foreground hover:text-background transition-colors">
                Try DcernX
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-[56px]">
        {/* Audience toggle bar */}
        <div className="border-b border-border">
          <div className="mx-auto max-w-[1200px] px-6 py-5 flex items-center justify-between gap-4">
            <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
              Two products. Pick yours.
            </p>
            <div className="inline-flex border border-border" role="tablist" aria-label="Choose your audience">
              <button
                type="button"
                role="tab"
                aria-selected={audience === "startups"}
                onClick={() => setAudience("startups")}
                className={`px-5 h-9 text-[12px] uppercase tracking-[0.14em] transition-colors ${audience === "startups" ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"}`}
              >
                For Startups
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={audience === "investors"}
                onClick={() => setAudience("investors")}
                className={`px-5 h-9 text-[12px] uppercase tracking-[0.14em] border-l border-border transition-colors ${audience === "investors" ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"}`}
              >
                For Investors
              </button>
            </div>
          </div>
        </div>

        {audience === "startups" ? (
          <StartupsScreen bgHex={bgHex} lineHex={lineHex} />
        ) : (
          <InvestorsScreen bgHex={bgHex} lineHex={lineHex} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" aria-label="DcernX home" className="-ml-0.5">
            <StackedLogo size={20} />
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/ai-analysis" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">For Startups</Link>
            <Link to="/for-investors" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">For Investors</Link>
            <Link to="/privacy" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link to="/fair-use" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Fair Use</Link>
            <span className="text-[12px] text-muted-foreground">© {new Date().getFullYear()} P101 Limited</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

type VisualProps = { bgHex: string; lineHex: string };

const CubeVisual = ({ bgHex, lineHex }: VisualProps) => (
  <div className="relative h-[360px] md:h-[460px] lg:h-[520px] w-full pointer-events-none select-none">
    <div className="absolute inset-0 flex items-center justify-center">
      <Logo3D variant={LOGO_VARIANT} size={520} zoom={320} bgHex={bgHex} lineHex={lineHex} />
    </div>
  </div>
);

/* Seven research dimensions — shared vocabulary across both audiences */
const DIMENSIONS = [
  { icon: Target, t: "The Opportunity", d: "Problem worth solving, demand depth, customer pain quantified from primary and secondary signals." },
  { icon: Compass, t: "The Landscape", d: "Where the market sits today, where it's heading, and the structural shifts moving it." },
  { icon: Radar, t: "Market Signals", d: "Demand indicators, search trends, hiring patterns and capital flow — read in minutes, not weeks." },
  { icon: Shield, t: "Risks & Entry Barriers", d: "Execution, technology, capital and timing risks — surfaced before they bite." },
  { icon: Swords, t: "Competition", d: "Direct and adjacent players, moats, gaps and the wedge that actually wins." },
  { icon: Gavel, t: "Regulatory", d: "Jurisdictional requirements, compliance load and policy direction across target markets." },
  { icon: TrendingUp, t: "Trends", d: "Technology, behaviour and category trends — separated from noise, weighted for relevance." },
];

const DimensionsGrid = () => (
  <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
    {DIMENSIONS.map(({ icon: Icon, t, d }) => (
      <div key={t} className="bg-background p-6">
        <Icon className="h-4 w-4 text-foreground/60 mb-3" strokeWidth={1.5} />
        <div className="text-[13px] font-[500] text-foreground">{t}</div>
        <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">{d}</p>
      </div>
    ))}
    <div className="bg-background p-6 flex items-center">
      <p className="text-[13px] leading-[1.6] text-foreground/80">
        Seven dimensions. One agentic pass. Evidence-led, source-cited, defensible.
      </p>
    </div>
  </div>
);

/* ----------------- STARTUPS SCREEN ----------------- */
const StartupsScreen = ({ bgHex, lineHex }: VisualProps) => (
  <>
    <section className="px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-5">
            DcernX for Startups
          </p>
          <h1 className="text-[clamp(2.2rem,4.2vw,3.6rem)] font-[500] leading-[1.04] tracking-[-0.04em] text-foreground">
            Pass investor DD before you ever meet one.
          </h1>
          <p className="mt-6 text-[16px] leading-[1.65] text-muted-foreground max-w-[560px]">
            DcernX runs the same agentic due diligence an investor would — on your opportunity, landscape, market signals, risks, regulatory exposure, trends and competition. You see exactly what they'll see, fix what doesn't hold up, and walk in with a confidence score that compounds with every meeting.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/ai-analysis/try">
              <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Run my pre-investor DD
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <Link to="/ai-analysis" className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              See how it works →
            </Link>
          </div>
        </div>

        <CubeVisual bgHex={bgHex} lineHex={lineHex} />
      </div>
    </section>

    {/* Dimensions tested */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          What we test, the way investors test it
        </p>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[760px] leading-[1.18]">
          Your business, stress-tested against the seven dimensions every investor will probe.
        </h2>
        <DimensionsGrid />
      </div>
    </section>

    {/* Outcome — confidence score */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            The outcome
          </p>
          <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-[500] tracking-[-0.02em] text-foreground leading-[1.18]">
            A confidence score that climbs with every investor conversation.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.65] text-muted-foreground max-w-[520px]">
            Each DD pass tightens your messaging, hardens your evidence and aligns your narrative to what the next investor cares about. Better answers. Sharper positioning. Higher conversion.
          </p>
        </div>
        <div className="border border-border p-8">
          <div className="flex items-center justify-between">
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">Confidence Score</div>
            <Gauge className="h-4 w-4 text-foreground/60" strokeWidth={1.5} />
          </div>
          <div className="mt-6 space-y-4">
            {[
              { label: "Before DcernX", v: 32 },
              { label: "After first pass", v: 64 },
              { label: "After investor-aligned revisions", v: 88 },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-[12px] mb-1.5">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="text-foreground/80 tabular-nums">{row.v}</span>
                </div>
                <div className="h-[6px] w-full bg-border">
                  <div className="h-full bg-foreground" style={{ width: `${row.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          How it works
        </p>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[720px] leading-[1.18]">
          Upload. Agentic DD runs. Walk in investor-ready.
        </h2>
        <ol className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { n: "01", t: "Share your business", d: "Deck, model, stage and target investor profile. Nothing leaves your workspace." },
            { n: "02", t: "Agents go deep", d: "Seven research dimensions evaluated in parallel against an investor-grade rubric." },
            { n: "03", t: "Rehearse and refine", d: "A scored report, the questions you'll be asked, and the evidence to answer them." },
          ].map(({ n, t, d }) => (
            <li key={n} className="border border-border p-6">
              <div className="text-[12px] tracking-[0.18em] text-muted-foreground">{n}</div>
              <div className="mt-3 text-[15px] font-[500] text-foreground">{t}</div>
              <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Closing CTA */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[640px] leading-[1.15]">
            Raise your confidence score before you raise capital.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground max-w-[560px]">
            Run the DD that's coming for you anyway — agentic, in minutes.
          </p>
        </div>
        <Link to="/ai-analysis/try">
          <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
            Run my pre-investor DD
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </Link>
      </div>
    </section>
  </>
);

/* ----------------- INVESTORS SCREEN ----------------- */
const InvestorsScreen = ({ bgHex, lineHex }: VisualProps) => (
  <>
    <section className="px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-5">
            DcernX for Investors
          </p>
          <h1 className="text-[clamp(2.2rem,4.2vw,3.6rem)] font-[500] leading-[1.04] tracking-[-0.04em] text-foreground">
            Deep market research, on every applicant, in minutes.
          </h1>
          <p className="mt-6 text-[16px] leading-[1.65] text-muted-foreground max-w-[560px]">
            DcernX runs agentic due diligence calibrated to applicant stage — the product, the opportunity, the landscape, market signals, risks, entry barriers, competition and regulatory load. Your team starts every conversation with research-backed evidence, not a blank page.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/ai-analysis/try">
              <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Run DD on an applicant
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <Link to="/for-investors" className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              See the platform →
            </Link>
          </div>
        </div>

        <CubeVisual bgHex={bgHex} lineHex={lineHex} />
      </div>
    </section>

    {/* Dimensions evaluated */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          What every DD covers
        </p>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[760px] leading-[1.18]">
          Seven dimensions. Calibrated to stage. Source-cited, audit-ready.
        </h2>
        <DimensionsGrid />
      </div>
    </section>

    {/* Outcome — better starting point */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            The outcome
          </p>
          <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-[500] tracking-[-0.02em] text-foreground leading-[1.18]">
            Start every deal with research-backed conviction.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.65] text-muted-foreground max-w-[520px]">
            Partners stop spending hours on first-pass research and start spending them on judgement. Better starting point. Faster cycle times. Higher hit rate on the ones you back.
          </p>
        </div>
        <div className="border border-border p-8 grid grid-cols-3 gap-6">
          {[
            { k: "minutes", v: "8", l: "Avg time to first-pass DD" },
            { k: "x", v: "12", l: "Applicant capacity per analyst" },
            { k: "%", v: "100", l: "Intake reviewed, never throttled" },
          ].map((s) => (
            <div key={s.l}>
              <div className="flex items-baseline gap-1">
                <span className="text-[clamp(1.8rem,3vw,2.4rem)] font-[500] text-foreground tabular-nums">{s.v}</span>
                <span className="text-[12px] text-muted-foreground">{s.k}</span>
              </div>
              <p className="mt-2 text-[12px] leading-[1.5] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          How it works
        </p>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[720px] leading-[1.18]">
          From applicant in, to investment-grade brief out.
        </h2>
        <ol className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { n: "01", t: "Intake, normalised", d: "Every applicant parsed and staged — pre-seed to growth — so DD depth matches reality." },
            { n: "02", t: "Agents research in parallel", d: "Opportunity, landscape, signals, risks, competition, regulatory and trends — all at once." },
            { n: "03", t: "Brief lands with sources", d: "An evidence-led, partner-ready brief with every claim cited and weighted." },
          ].map(({ n, t, d }) => (
            <li key={n} className="border border-border p-6">
              <div className="text-[12px] tracking-[0.18em] text-muted-foreground">{n}</div>
              <div className="mt-3 text-[15px] font-[500] text-foreground">{t}</div>
              <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Closing CTA */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[640px] leading-[1.15]">
            Give every applicant a serious read. Without the headcount.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground max-w-[560px]">
            Agentic DD on the full funnel. Sourced, scored, and ready for the partner meeting.
          </p>
        </div>
        <Link to="/for-investors">
          <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
            See the platform
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </Link>
      </div>
    </section>
  </>
);


export default Landing;
