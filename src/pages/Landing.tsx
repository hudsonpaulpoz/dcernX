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
            Walk into every investor meeting with higher conviction.
          </h1>
          <p className="mt-6 text-[16px] leading-[1.65] text-muted-foreground max-w-[540px]">
            Investor intros are expensive. DcernX runs an Investor-grade DD on your own pitch, financials and marketing — so every meeting builds trust, answers the hard questions before they're asked, and tilts the odds toward a successful outcome.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "One robust report on your own company, in under 90 minutes",
              "Every claim in your deck stress-tested against public evidence",
              "The exact questions investors will ask — with answers ready",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-[14px] text-foreground/85">
                <CheckCircle2 className="h-4 w-4 mt-[3px] text-foreground/60 shrink-0" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/ai-analysis/try">
              <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Get my Investor DD report
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <Link to="/ai-analysis" className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              See what's in the report →
            </Link>
          </div>
        </div>

        <CubeVisual bgHex={bgHex} lineHex={lineHex} />
      </div>
    </section>

    {/* What's in the report */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          What's in your report
        </p>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[720px] leading-[1.18]">
          The same diligence an investor would run on you — delivered to you first.
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {[
            { t: "Pitch & Narrative", d: "Story arc, positioning, proof points and the gaps a partner will press on." },
            { t: "Financial Stress-test", d: "Unit economics, model assumptions and the numbers that don't yet hold up." },
            { t: "Market & Competition", d: "TAM logic, competitor depth and the framing that survives scrutiny." },
            { t: "Traction & Evidence", d: "Every claim cross-checked against public signals and third-party data." },
            { t: "Founder & Team", d: "Operating history, gaps in the cap table and the questions partners will raise." },
            { t: "Investor Q&A Pack", d: "The 30 questions you'll be asked — with sourced, defensible answers." },
          ].map(({ t, d }) => (
            <div key={t} className="bg-background p-6">
              <div className="text-[13px] font-[500] text-foreground">{t}</div>
              <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">{d}</p>
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
          From deck upload to investor-ready, in under 90 minutes.
        </h2>
        <ol className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { n: "01", t: "Upload your pitch", d: "Deck, model and any supporting materials. Nothing leaves your workspace." },
            { n: "02", t: "Agentic DD runs", d: "DcernX evaluates pitch, financials, market and team — at investor depth." },
            { n: "03", t: "Get your report", d: "A robust DD report plus an investor Q&A pack you can rehearse against." },
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
            Stop walking into investor meetings cold.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground max-w-[560px]">
            One report. Every weak point surfaced. Every answer prepared.
          </p>
        </div>
        <Link to="/ai-analysis/try">
          <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
            Get my Investor DD report
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
            Find the businesses solving the right problem, in the right space, with the right approach.
          </h1>
          <p className="mt-6 text-[16px] leading-[1.65] text-muted-foreground max-w-[560px]">
            Run high-volume due diligence on every intake using DcernX's agentic infrastructure — so no application is throttled by capacity and every founder gets a fair, evidence-led read. Then manage the entire lifecycle, from first intake to post-deal tracking, inside one operating system.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              { icon: ScanSearch, line: "Agentic DD at volume — hundreds of applications scored consistently" },
              { icon: ShieldCheck, line: "Capacity augmented, never throttled — every intake reviewed" },
              { icon: CheckCircle2, line: "End-to-end lifecycle: intake → deal flow → operations → post-deal" },
            ].map(({ icon: Icon, line }) => (
              <li key={line} className="flex items-start gap-3 text-[14px] text-foreground/85">
                <Icon className="h-4 w-4 mt-[3px] text-foreground/60 shrink-0" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/ai-analysis/try">
              <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Try DcernX
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

    {/* Capabilities */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Built for investment teams
        </p>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[720px] leading-[1.18]">
          Augment your partners. Never throttle your funnel.
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {[
            { t: "Agentic intake", d: "Every application normalised, scored and triaged — within minutes of submission." },
            { t: "Diligence at volume", d: "Hundreds of DDs run in parallel against a consistent investor-grade rubric." },
            { t: "Evidence-led scoring", d: "Every score backed by sourced evidence — auditable, not a black box." },
            { t: "Deal flow management", d: "Pipeline stages, IC packs and partner notes on one auditable record per deal." },
            { t: "Post-deal tracking", d: "KPIs, board updates and portfolio health monitored after the wire clears." },
            { t: "Team workspace", d: "Roles, comments and assignments — built for how investment teams actually work." },
          ].map(({ t, d }) => (
            <div key={t} className="bg-background p-6">
              <div className="text-[13px] font-[500] text-foreground">{t}</div>
              <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Lifecycle infographic band */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          The full lifecycle, in one system
        </p>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[720px] leading-[1.18]">
          Intake. Deal flow. Operations. Post-deal. One auditable record per deal.
        </h2>
        <div className="mt-10">
          <OperatingLayerOrbit />
        </div>
      </div>
    </section>

    {/* Closing CTA */}
    <section className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[640px] leading-[1.15]">
            Review every intake. Back the right ones.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground max-w-[560px]">
            See how DcernX runs DD across your full funnel and keeps the lifecycle in one place.
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
