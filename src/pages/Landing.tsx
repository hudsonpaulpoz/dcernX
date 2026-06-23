import { Link } from "react-router-dom";
import {
  ArrowRight,
  Moon,
  Sun,
  Compass,
  Radar,
  Shield,
  Swords,
  Gavel,
  TrendingUp,
  Target,
  Gauge,
  ChevronDown,
  Check,
  Minus,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { Seo } from "@/components/Seo";
import { StackedLogo } from "@/components/StackedLogo";
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
        title="AI Due Diligence in Minutes — DcernX"
        description="Agentic investor due diligence for founders raising capital and early-stage investors backing pre-revenue startups. 18 hours of analyst work in 12 minutes. From $50 per report."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "DcernX",
              url: "/",
              publisher: { "@type": "Organization", name: "P101 Limited" },
            },
            {
              "@type": "Product",
              name: "DcernX Due Diligence Report",
              description:
                "Agentic, investor-grade due diligence report covering opportunity, landscape, market signals, risks, competition, regulatory and trends. 200+ sources per report.",
              brand: { "@type": "Brand", name: "DcernX" },
              offers: {
                "@type": "Offer",
                price: "50",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: "/ai-analysis/try",
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full bg-background border-b border-border px-6">
        <div className="mx-auto flex h-[56px] max-w-[1200px] items-center justify-between">
          <Link to="/" className="flex items-center -ml-0.5" aria-label="DcernX home">
            <StackedLogo size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <a href="#pricing" className="hidden sm:inline-flex h-8 px-3 items-center text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#how" className="hidden sm:inline-flex h-8 px-3 items-center text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#faq" className="hidden sm:inline-flex h-8 px-3 items-center text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              FAQ
            </a>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="h-8 w-8 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
              title="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
            <a href="#calculator">
              <button className="text-[13px] h-8 px-3 bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Free score
              </button>
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-[56px]">
        {/* Audience toggle bar */}
        <div className="border-b border-border">
          <div className="mx-auto max-w-[1200px] px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[13px] text-foreground/80">
              {audience === "startups" ? "I am raising capital" : "I am backing founders"}
            </p>
            <div
              role="tablist"
              aria-label="Choose your view"
              className="relative inline-flex p-1 bg-foreground/[0.06] dark:bg-foreground/[0.08] border border-border rounded-full select-none"
            >
              <span
                aria-hidden
                className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-foreground transition-transform duration-300 ease-out"
                style={{ transform: audience === "investors" ? "translateX(100%)" : "translateX(0)" }}
              />
              {(["startups", "investors"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={audience === key}
                  onClick={() => setAudience(key)}
                  className={`relative z-10 px-5 sm:px-6 h-9 text-[13px] font-[500] rounded-full transition-colors ${
                    audience === key ? "text-background" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {key === "startups" ? "Founders" : "Investors"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {audience === "startups" ? (
          <StartupsScreen bgHex={bgHex} lineHex={lineHex} />
        ) : (
          <InvestorsScreen bgHex={bgHex} lineHex={lineHex} />
        )}

        {/* Shared sections: stats, calculator, comparison, pricing, FAQ, email capture, final CTA */}
        <StatsStrip />
        <CalculatorSection audience={audience} />
        <HowItWorks />
        <ComparisonBlock />
        <PricingSection />
        <FaqSection />
        <EmailCapture audience={audience} />
        <FinalCTA audience={audience} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-10 grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="DcernX home" className="-ml-0.5 inline-block">
              <StackedLogo size={22} />
            </Link>
            <p className="mt-3 text-[12.5px] leading-[1.55] text-muted-foreground max-w-[280px]">
              Agentic due diligence for founders raising capital and early-stage investors. Built by P101 Limited — UK company no. 17063831.
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/60 mb-3">Product</div>
            <ul className="space-y-2 text-[12.5px]">
              <li><Link to="/ai-analysis" className="text-muted-foreground hover:text-foreground transition-colors">For Startups</Link></li>
              <li><Link to="/for-investors" className="text-muted-foreground hover:text-foreground transition-colors">For Investors</Link></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><Link to="/ai-analysis/try" className="text-muted-foreground hover:text-foreground transition-colors">Sample report</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/60 mb-3">Resources</div>
            <ul className="space-y-2 text-[12.5px]">
              <li><a href="#how" className="text-muted-foreground hover:text-foreground transition-colors">How it works</a></li>
              <li><a href="#calculator" className="text-muted-foreground hover:text-foreground transition-colors">Readiness score</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/60 mb-3">Legal</div>
            <ul className="space-y-2 text-[12.5px]">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link to="/fair-use" className="text-muted-foreground hover:text-foreground transition-colors">Fair Use</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-[1200px] px-6 py-4 text-[11.5px] text-muted-foreground flex flex-wrap justify-between gap-2">
            <span>© {new Date().getFullYear()} P101 Limited. All rights reserved.</span>
            <span>GDPR-compliant · Customer data never trains third-party models</span>
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

const DIMENSIONS = [
  { icon: Target, t: "The Opportunity",
    investor: "Whether the problem is big enough, urgent enough, and growing fast enough to back today.",
    startup: "Whether the problem you've picked is one investors are actively writing cheques against.",
    score: 82, signal: "Strong", sources: 28 },
  { icon: Compass, t: "The Landscape",
    investor: "Where the market is heading next, and whether this founder is moving with the shift or against it.",
    startup: "How your category will be framed in an IC memo — and where your story slots in.",
    score: 71, signal: "Mixed", sources: 31 },
  { icon: Radar, t: "Market Signals",
    investor: "Real-time demand, hiring, search and capital signals that confirm — or quietly contradict — the pitch.",
    startup: "The live signals an investor will pull up next to your deck. We show them to you first.",
    score: 78, signal: "Strong", sources: 42 },
  { icon: Shield, t: "Risks & Entry Barriers",
    investor: "The execution, capital and timing risks that derail this kind of company at this stage.",
    startup: "Every concern an investor will privately note — surfaced so you can address them out loud.",
    score: 58, signal: "Watch", sources: 22 },
  { icon: Swords, t: "Competition",
    investor: "Who else is moving in this space, where the moats actually sit, and what the wedge needs to be.",
    startup: "How your competitive framing holds up under pressure — and the gap that's genuinely yours.",
    score: 64, signal: "Mixed", sources: 33 },
  { icon: Gavel, t: "Regulatory",
    investor: "Jurisdictional load, policy direction and the compliance debt that could slow growth post-investment.",
    startup: "The regulatory questions that come up in IC — and the answers that keep the cheque on the table.",
    score: 80, signal: "Strong", sources: 18 },
  { icon: TrendingUp, t: "Trends",
    investor: "The behavioural and technology trends that make this bet timely — separated from category noise.",
    startup: "The tailwinds investors believe in right now, mapped to how you should be telling your story.",
    score: 84, signal: "Strong", sources: 26 },
];

const SIGNAL_STYLES: Record<string, string> = {
  Strong: "border-foreground/40 text-foreground",
  Mixed: "border-foreground/25 text-foreground/70",
  Watch: "border-foreground/25 text-foreground/70",
};

const ReportPreview = ({ audience }: { audience: "startups" | "investors" }) => {
  const overall = 74;
  const isInvestor = audience === "investors";
  const subjectValue = isInvestor ? "Lumen Health Inc." : "Your Company";
  const stage = isInvestor ? "Pre-Seed · Pre-Revenue" : "Pre-Seed · Raising $1.2M";
  const docTitle = isInvestor ? "Applicant Due Diligence Brief" : "Pre-Investor DD Report";

  return (
    <div className="mt-10 border border-border bg-background shadow-[0_1px_0_rgba(0,0,0,0.02),0_24px_60px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-foreground/20" />
            <span className="h-2 w-2 rounded-full bg-foreground/20" />
            <span className="h-2 w-2 rounded-full bg-foreground/20" />
          </div>
          <span className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
            DcernX · {docTitle}
          </span>
        </div>
        <span className="hidden sm:inline text-[11px] text-muted-foreground tabular-nums">
          Generated 23 Jun 2026 · 12 min 04 sec
        </span>
      </div>

      <div className="grid sm:grid-cols-[1fr_auto] gap-6 px-6 sm:px-8 py-7 border-b border-border">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Subject</div>
          <div className="mt-1 text-[20px] font-[500] text-foreground tracking-[-0.01em]">{subjectValue}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="border border-border px-2 py-[3px] text-foreground/70">{stage}</span>
            <span className="border border-border px-2 py-[3px] text-foreground/70">7 dimensions</span>
            <span className="border border-border px-2 py-[3px] text-foreground/70">200 sources</span>
          </div>
        </div>
        <div className="sm:min-w-[220px]">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-2">
            <span>Conviction Score</span>
            <span className="text-foreground tabular-nums">{overall}/100</span>
          </div>
          <div className="h-[6px] w-full bg-border">
            <div className="h-full bg-foreground" style={{ width: `${overall}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {isInvestor ? "Worth a partner meeting. Two flags to probe." : "Two areas to tighten before your next intro."}
          </p>
        </div>
      </div>

      <ol className="divide-y divide-border">
        {DIMENSIONS.map((row, i) => (
          <li key={row.t} className="grid grid-cols-[28px_1fr_auto] items-start gap-4 px-6 sm:px-8 py-4">
            <div className="text-[11px] tabular-nums text-muted-foreground pt-[3px]">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <row.icon className="h-3.5 w-3.5 text-foreground/60" strokeWidth={1.5} />
                <span className="text-[13px] font-[500] text-foreground">{row.t}</span>
              </div>
              <p className="mt-1 text-[12.5px] leading-[1.55] text-muted-foreground max-w-[560px]">
                {isInvestor ? row.investor : row.startup}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5 pt-[2px]">
              <span className={`text-[10px] uppercase tracking-[0.14em] border px-2 py-[2px] ${SIGNAL_STYLES[row.signal]}`}>
                {row.signal} · {row.score}
              </span>
              <span className="text-[10.5px] text-muted-foreground tabular-nums">{row.sources} sources</span>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 sm:px-8 py-4 bg-foreground/[0.02]">
        <span className="text-[11px] text-muted-foreground">
          Every claim source-cited · Exportable to PDF, Notion, IC memo
        </span>
        <span className="text-[11px] text-foreground/70">
          {isInvestor ? "Partner-ready in minutes" : "Investor-ready before your next intro"}
        </span>
      </div>
    </div>
  );
};

/* ----------------- STARTUPS HERO ----------------- */
const StartupsScreen = ({ bgHex, lineHex }: VisualProps) => (
  <>
    <section className="px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-5">
            AI due diligence for founders raising capital
          </p>
          <h1 className="text-[clamp(2.2rem,4.2vw,3.6rem)] font-[500] leading-[1.04] tracking-[-0.04em] text-foreground">
            Pass investor due diligence before your first pitch meeting.
          </h1>
          <p className="mt-6 text-[16px] leading-[1.65] text-muted-foreground max-w-[560px]">
            DcernX runs the same agentic due diligence a pre-seed, seed or Series A investor would — on your opportunity, market signals, competition, risks, regulatory load and traction. Founders see exactly what the IC will see, fix what doesn't hold up, and walk into every pitch with a conviction score that compounds across meetings.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#calculator">
              <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Get my free readiness score
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </a>
            <a href="#report" className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              See a sample report →
            </a>
          </div>
        </div>
        <CubeVisual bgHex={bgHex} lineHex={lineHex} />
      </div>
    </section>

    <section id="report" className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          The report you'll get back
        </p>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[780px] leading-[1.18]">
          A full investor-grade DD on your own startup — so you know what they'll say before they say it.
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground max-w-[640px]">
          One document. Seven dimensions investors actually score on. Every weak spot called out, every claim cited — ready to rehearse against before your next intro.
        </p>
        <ReportPreview audience="startups" />
      </div>
    </section>
  </>
);

/* ----------------- INVESTORS HERO ----------------- */
const InvestorsScreen = ({ bgHex, lineHex }: VisualProps) => (
  <>
    <section className="px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-5">
            AI due diligence for early-stage investors
          </p>
          <h1 className="text-[clamp(2.2rem,4.2vw,3.6rem)] font-[500] leading-[1.04] tracking-[-0.04em] text-foreground">
            Deep due diligence on every early-stage and pre-revenue startup — in minutes.
          </h1>
          <p className="mt-6 text-[16px] leading-[1.65] text-muted-foreground max-w-[560px]">
            DcernX runs agentic due diligence calibrated to applicant stage — pre-seed, seed, Series A — across the product, opportunity, market signals, competition, risks, entry barriers and regulatory load. Your investment team starts every founder conversation with research-backed evidence, not a blank page or a rushed first read.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#calculator">
              <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Calculate my DD savings
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </a>
            <a href="#report" className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              See a sample brief →
            </a>
          </div>
        </div>
        <CubeVisual bgHex={bgHex} lineHex={lineHex} />
      </div>
    </section>

    <section id="report" className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          The brief your partners will read
        </p>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[780px] leading-[1.18]">
          One partner-ready brief per applicant — so you know within minutes which founders deserve a meeting.
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground max-w-[640px]">
          Calibrated to stage. Every claim sourced. Every signal weighted. Your team stops drowning in cold decks and starts spending time on the founders worth backing.
        </p>
        <ReportPreview audience="investors" />
      </div>
    </section>
  </>
);

/* ----------------- STATS STRIP ----------------- */
const STATS = [
  { v: "18 hrs", l: "of analyst work, compressed" },
  { v: "12 min", l: "to a sourced, scored report" },
  { v: "200+", l: "sources cited per report" },
  { v: "7", l: "investor-grade dimensions" },
  { v: "16", l: "agents working in parallel" },
  { v: "$50", l: "per report — flat" },
];

const StatsStrip = () => (
  <section className="border-t border-border bg-foreground/[0.02] px-6 py-12 lg:py-14">
    <div className="mx-auto max-w-[1200px]">
      <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-6">
        What you get per report
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
        {STATS.map((s) => (
          <div key={s.l}>
            <div className="text-[clamp(1.6rem,2.4vw,2rem)] font-[500] text-foreground tabular-nums tracking-[-0.02em]">
              {s.v}
            </div>
            <p className="mt-1.5 text-[12px] leading-[1.45] text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ----------------- CALCULATORS ----------------- */
const FOUNDER_QS = [
  { id: "problem", q: "How clearly can you size the problem in dollars?", opts: ["Guess", "Directional", "Bottom-up model"] },
  { id: "traction", q: "What's your strongest traction signal?", opts: ["Idea only", "Pilots / LOIs", "Paying customers / revenue"] },
  { id: "competition", q: "How well do you know your top 3 competitors?", opts: ["Vaguely", "Named, not analysed", "Mapped + wedge defined"] },
  { id: "moat", q: "How defensible is your wedge?", opts: ["Unclear", "Some advantage", "Hard-to-copy advantage"] },
  { id: "team", q: "Why is this team the right team?", opts: ["Generalist", "Domain-adjacent", "Earned secret in the space"] },
  { id: "ask", q: "How tight is your ask + use of funds?", opts: ["Round figure", "Milestones, no plan", "18-month plan, milestones, runway"] },
  { id: "regulatory", q: "Have you scoped regulatory load?", opts: ["No", "High-level", "Mapped + counsel"] },
];

const FounderCalculator = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    const total = FOUNDER_QS.length * 2;
    const got = Object.values(answers).reduce((a, b) => a + b, 0);
    if (Object.keys(answers).length === 0) return 0;
    return Math.round((got / total) * 100);
  }, [answers]);

  const completed = Object.keys(answers).length;
  const allAnswered = completed === FOUNDER_QS.length;

  const gaps = FOUNDER_QS.filter((q) => (answers[q.id] ?? 0) <= 1).slice(0, 3);

  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
      <div className="border border-border p-6 sm:p-8">
        <div className="flex items-center justify-between mb-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Fundraise Readiness · {completed}/{FOUNDER_QS.length}
          </div>
          <div className="text-[11px] text-muted-foreground tabular-nums">~90 sec</div>
        </div>
        <ol className="space-y-5">
          {FOUNDER_QS.map((q, i) => (
            <li key={q.id}>
              <div className="text-[13px] font-[500] text-foreground mb-2">
                <span className="text-muted-foreground tabular-nums mr-2">{String(i + 1).padStart(2, "0")}</span>
                {q.q}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {q.opts.map((opt, idx) => {
                  const active = answers[q.id] === idx;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                      className={`text-[12px] leading-[1.3] px-3 py-2 border transition-colors text-left ${
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-foreground/70 hover:border-foreground/50 hover:text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="border border-border p-6 sm:p-8 flex flex-col">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Your readiness score</div>
        <div className="flex items-baseline gap-2">
          <span className="text-[56px] font-[500] tabular-nums text-foreground leading-none">{score}</span>
          <span className="text-[14px] text-muted-foreground">/ 100</span>
        </div>
        <div className="mt-4 h-[8px] w-full bg-border">
          <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${score}%` }} />
        </div>
        <p className="mt-4 text-[13px] leading-[1.55] text-muted-foreground">
          {allAnswered
            ? score >= 75
              ? "Investor-ready. Run the full DD to lock conviction across all 7 dimensions."
              : score >= 45
              ? "Halfway there. A full DD will surface what to tighten before your next intro."
              : "Real gaps to close. The full DD report shows exactly what investors will probe."
            : "Answer all 7 questions to see your score and top gaps."}
        </p>

        {allAnswered && gaps.length > 0 && (
          <div className="mt-5">
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-2">Top gaps to close</div>
            <ul className="space-y-1.5">
              {gaps.map((g) => (
                <li key={g.id} className="text-[12.5px] text-foreground/80 flex gap-2">
                  <span className="text-foreground/40">·</span>{g.q}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 border-t border-border pt-5">
          {submitted ? (
            <div className="flex items-start gap-2 text-[13px] text-foreground">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-foreground" strokeWidth={1.5} />
              <span>Check your inbox — sample report on the way.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="space-y-2"
            >
              <label className="text-[12px] text-muted-foreground">Email me the full sample report</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@startup.com"
                  className="flex-1 text-[13px] px-3 py-2 bg-background border border-border focus:border-foreground/60 focus:outline-none"
                />
                <button type="submit" className="text-[13px] px-4 py-2 bg-foreground text-background hover:bg-foreground/90 transition-colors">
                  Send
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground">No spam. One email. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const InvestorCalculator = () => {
  const [apps, setApps] = useState(80);
  const [hrs, setHrs] = useState(6);
  const [rate, setRate] = useState(120);

  const hoursSaved = useMemo(() => Math.round(apps * (hrs - 0.2)), [apps, hrs]);
  const dollars = useMemo(() => hoursSaved * rate, [hoursSaved, rate]);
  const cost = apps * 50;
  const net = dollars - cost;

  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
      <div className="border border-border p-6 sm:p-8 space-y-6">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          DD time & cost saved · per month
        </div>
        {[
          { label: "Applicants per month", value: apps, set: setApps, min: 10, max: 500, step: 10, suffix: "" },
          { label: "Analyst hours per first-pass DD", value: hrs, set: setHrs, min: 1, max: 24, step: 1, suffix: " hrs" },
          { label: "Blended analyst cost", value: rate, set: setRate, min: 40, max: 400, step: 10, suffix: " $/hr" },
        ].map((s) => (
          <div key={s.label}>
            <div className="flex items-baseline justify-between mb-2">
              <label className="text-[13px] text-foreground">{s.label}</label>
              <span className="text-[14px] font-[500] tabular-nums text-foreground">{s.value}{s.suffix}</span>
            </div>
            <input
              type="range"
              min={s.min} max={s.max} step={s.step}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full accent-foreground"
            />
          </div>
        ))}
      </div>

      <div className="border border-border p-6 sm:p-8 flex flex-col">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Monthly impact</div>
        <div>
          <div className="text-[clamp(2.4rem,4vw,3.4rem)] font-[500] tabular-nums text-foreground leading-none tracking-[-0.02em]">
            ${net.toLocaleString()}
          </div>
          <p className="mt-2 text-[13px] text-muted-foreground">net savings after DcernX cost</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
          <div>
            <div className="text-[20px] font-[500] tabular-nums text-foreground">{hoursSaved.toLocaleString()}</div>
            <p className="text-[12px] text-muted-foreground">analyst hours back</p>
          </div>
          <div>
            <div className="text-[20px] font-[500] tabular-nums text-foreground">{apps}</div>
            <p className="text-[12px] text-muted-foreground">applicants reviewed in full</p>
          </div>
          <div>
            <div className="text-[20px] font-[500] tabular-nums text-foreground">${dollars.toLocaleString()}</div>
            <p className="text-[12px] text-muted-foreground">gross time value recovered</p>
          </div>
          <div>
            <div className="text-[20px] font-[500] tabular-nums text-foreground">${cost.toLocaleString()}</div>
            <p className="text-[12px] text-muted-foreground">DcernX cost at $50/report</p>
          </div>
        </div>
        <Link to="/for-investors" className="mt-6">
          <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
            See how partners use DcernX <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};

const CalculatorSection = ({ audience }: { audience: "startups" | "investors" }) => (
  <section id="calculator" className="border-t border-border px-6 py-16 lg:py-20">
    <div className="mx-auto max-w-[1200px]">
      <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
        {audience === "startups" ? "Free · 90 seconds" : "Free calculator"}
      </p>
      <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[780px] leading-[1.15]">
        {audience === "startups"
          ? "How investor-ready are you, really?"
          : "How much will agentic DD save your fund?"}
      </h2>
      <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground max-w-[640px]">
        {audience === "startups"
          ? "Seven questions. A score, the gaps to close, and a sample DD report in your inbox."
          : "Plug in your funnel. See hours, dollars and analyst time you get back every month."}
      </p>
      <div className="mt-8">
        {audience === "startups" ? <FounderCalculator /> : <InvestorCalculator />}
      </div>
    </div>
  </section>
);

/* ----------------- HOW IT WORKS (8-step pipeline) ----------------- */
const PIPELINE = [
  { n: "01", t: "Intake", d: "Deck, model, stage and target investor profile parsed and staged." },
  { n: "02", t: "16 parallel agents", d: "A specialist agent per dimension, sub-dimension and source class — spun up at once." },
  { n: "03", t: "Swarm activated", d: "Agents coordinate, hand off and challenge each other in a live working memory." },
  { n: "04", t: "Internal + external research", d: "Your documents plus public market, capital, hiring, regulatory and signal sources." },
  { n: "05", t: "Self-prompting loops", d: "Agents re-question their own conclusions until evidence and confidence converge." },
  { n: "06", t: "Data ingestion", d: "Sources normalised, dated, and weighted by reliability — never blindly trusted." },
  { n: "07", t: "Processing, cleaning, drafting", d: "Conflicts resolved, hallucinations stripped, claims tied to citations." },
  { n: "08", t: "Report published", d: "A scored, sourced, partner-ready brief — in your workspace and inbox." },
];

const HowItWorks = () => (
  <section id="how" className="border-t border-border px-6 py-16 lg:py-20">
    <div className="mx-auto max-w-[1200px]">
      <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">How it works</p>
      <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[720px] leading-[1.18]">
        Intake to investor-grade brief — in eight steps, run in minutes.
      </h2>
      <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PIPELINE.map(({ n, t, d }) => (
          <li key={n} className="border border-border p-5">
            <div className="text-[11px] tracking-[0.18em] text-muted-foreground">{n}</div>
            <div className="mt-2.5 text-[14px] font-[500] text-foreground">{t}</div>
            <p className="mt-1.5 text-[12.5px] leading-[1.55] text-muted-foreground">{d}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* ----------------- COMPARISON BLOCK ----------------- */
const COMPARE_ROWS: Array<{ row: string; founder: string | true; investor: string | true }> = [
  { row: "Opportunity sized & evidenced", founder: true, investor: true },
  { row: "Market signals (hiring, capital, search, demand)", founder: true, investor: true },
  { row: "Competition mapped, moats identified", founder: true, investor: true },
  { row: "Risks & entry barriers surfaced", founder: true, investor: true },
  { row: "Regulatory load by jurisdiction", founder: true, investor: true },
  { row: "Conviction score 0–100", founder: true, investor: true },
  { row: "Gaps to close before next pitch", founder: true, investor: false as unknown as string },
  { row: "Question bank investors will ask", founder: true, investor: false as unknown as string },
  { row: "Applicant ranking across funnel", founder: false as unknown as string, investor: true },
  { row: "IC-ready partner brief, exportable", founder: false as unknown as string, investor: true },
];

const ComparisonBlock = () => (
  <section className="border-t border-border px-6 py-16 lg:py-20 bg-foreground/[0.02]">
    <div className="mx-auto max-w-[1200px]">
      <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Both sides of the table</p>
      <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[780px] leading-[1.18]">
        Same engine. Two outcomes — depending on which side of the deal you sit on.
      </h2>
      <div className="mt-8 border border-border bg-background overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-border text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <div className="px-5 py-3">What's in the report</div>
          <div className="px-5 py-3 border-l border-border text-foreground">Founders</div>
          <div className="px-5 py-3 border-l border-border text-foreground">Investors</div>
        </div>
        {COMPARE_ROWS.map((r, i) => (
          <div key={i} className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-border last:border-b-0 text-[13px]">
            <div className="px-5 py-3 text-foreground/80">{r.row}</div>
            <div className="px-5 py-3 border-l border-border">
              {r.founder === true ? <Check className="h-4 w-4 text-foreground" strokeWidth={1.75} /> : <Minus className="h-4 w-4 text-foreground/30" strokeWidth={1.75} />}
            </div>
            <div className="px-5 py-3 border-l border-border">
              {r.investor === true ? <Check className="h-4 w-4 text-foreground" strokeWidth={1.75} /> : <Minus className="h-4 w-4 text-foreground/30" strokeWidth={1.75} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ----------------- PRICING ----------------- */
const PricingSection = () => (
  <section id="pricing" className="border-t border-border px-6 py-16 lg:py-20">
    <div className="mx-auto max-w-[1200px]">
      <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Pricing</p>
      <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[720px] leading-[1.18]">
        One price. Both sides of the table.
      </h2>
      <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground max-w-[600px]">
        Flat per-report pricing. No seats, no minimums. Volume rates for funds and accelerators on request.
      </p>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {[
          {
            tag: "Founders",
            who: "Raising pre-seed, seed or Series A",
            price: "$50",
            unit: "per report",
            features: [
              "Full investor-grade DD on your startup",
              "Conviction score with gap analysis",
              "Question bank investors will ask",
              "Re-run after revisions — see your score climb",
              "Export to PDF, Notion, Google Docs",
            ],
            cta: "Run my pre-investor DD",
            href: "/ai-analysis/try",
          },
          {
            tag: "Investors",
            who: "Funds, syndicates, accelerators, venture studios",
            price: "$50",
            unit: "per applicant",
            features: [
              "Partner-ready brief, calibrated to stage",
              "200+ sources cited & weighted",
              "Applicant ranking across the funnel",
              "Workspace for analysts, partners and IC",
              "Volume pricing on request",
            ],
            cta: "Run DD on an applicant",
            href: "/for-investors",
          },
        ].map((p) => (
          <div key={p.tag} className="border border-border p-7 flex flex-col">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{p.tag}</div>
            <p className="mt-1 text-[13px] text-foreground/70">{p.who}</p>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-[44px] font-[500] tabular-nums text-foreground leading-none">{p.price}</span>
              <span className="text-[13px] text-muted-foreground">{p.unit}</span>
            </div>
            <ul className="mt-6 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-foreground/85">
                  <Check className="h-4 w-4 mt-0.5 text-foreground/70 shrink-0" strokeWidth={1.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link to={p.href} className="mt-7">
              <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                {p.cta} <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ----------------- FAQ ----------------- */
const FAQS = [
  {
    q: "What does DcernX actually do?",
    a: "DcernX runs agentic due diligence — the same kind of opportunity, market, signal, competition, risk and regulatory research an early-stage investor would do — on any startup, in about 12 minutes, with 200+ cited sources per report.",
  },
  {
    q: "Who is DcernX for?",
    a: "Founders raising pre-seed, seed or Series A capital who want to pass investor DD before their first meeting. And early-stage investors — funds, accelerators, angel syndicates, venture studios, family offices and corporate venture teams — backing pre-revenue startups.",
  },
  {
    q: "How is this different from a generic LLM?",
    a: "DcernX runs 16 specialist agents in parallel inside a coordinated swarm, with self-prompting loops, source weighting and a structured investor-grade rubric. Generic LLMs guess. DcernX cites — every claim is tied back to a dated, weighted source.",
  },
  {
    q: "How much does a report cost?",
    a: "$50 per report — flat. Same price whether you're a founder running DD on your own startup or an investor running DD on an applicant. Volume pricing on request for funds and accelerators.",
  },
  {
    q: "How long does it take?",
    a: "About 12 minutes from intake to a sourced, scored, partner-ready brief — work that traditionally takes an analyst 18+ hours.",
  },
  {
    q: "What stages do you cover?",
    a: "Pre-seed, seed and Series A are the sweet spot — including pre-revenue and pre-product startups. Depth and rubric are calibrated to the applicant's stage.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. DcernX is operated by P101 Limited (UK, company no. 17063831) and is GDPR-compliant. We don't sell data and customer data is never used to train third-party AI models.",
  },
  {
    q: "Can I see a sample report before I pay?",
    a: "Yes — run the free fundraise readiness score above and we'll email you a full sample DD report. No credit card required.",
  },
  {
    q: "Can I export the report?",
    a: "Yes — PDF, Notion and IC-memo formats, with every citation preserved.",
  },
  {
    q: "Do you offer team accounts?",
    a: "Yes. Funds, accelerators and syndicates get a shared workspace for analysts, partners and IC, with applicant ranking across the funnel. Pricing on request.",
  },
];

const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-border px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-[0.9fr_1.4fr] gap-10">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">FAQ</p>
          <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-[500] tracking-[-0.02em] text-foreground leading-[1.15]">
            Questions founders and investors actually ask.
          </h2>
          <p className="mt-4 text-[14px] text-muted-foreground max-w-[360px]">
            Still curious? Email{" "}
            <a href="mailto:hudson@p101limited.com" className="text-foreground underline underline-offset-2">hudson@p101limited.com</a>.
          </p>
        </div>
        <div className="border-t border-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] font-[500] text-foreground">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 text-foreground/60 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <p className="pb-5 text-[13.5px] leading-[1.65] text-muted-foreground max-w-[640px]">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ----------------- EMAIL CAPTURE ----------------- */
const EmailCapture = ({ audience }: { audience: "startups" | "investors" }) => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="border-t border-border bg-foreground/[0.02] px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            <Mail className="h-3.5 w-3.5" /> Sample report
          </div>
          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-[500] tracking-[-0.02em] text-foreground leading-[1.18] max-w-[560px]">
            {audience === "startups"
              ? "Get a full sample DD report. See exactly what investors will read."
              : "Get a partner-ready sample brief. See how applicants are scored."}
          </h2>
          <p className="mt-3 text-[14px] text-muted-foreground max-w-[520px]">
            One email. No spam. Unsubscribe in a click.
          </p>
        </div>
        <div className="border border-border bg-background p-6">
          {done ? (
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              <div>
                <div className="text-[14px] font-[500] text-foreground">On its way.</div>
                <p className="mt-1 text-[12.5px] text-muted-foreground">Check your inbox in a minute or two.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}>
              <label className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground">Work email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={audience === "startups" ? "you@startup.com" : "you@fund.vc"}
                className="mt-2 w-full text-[14px] px-3 py-2.5 bg-background border border-border focus:border-foreground/60 focus:outline-none"
              />
              <button type="submit" className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Send me the sample <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

/* ----------------- FINAL CTA ----------------- */
const FinalCTA = ({ audience }: { audience: "startups" | "investors" }) => (
  <section className="border-t border-border px-6 py-16 lg:py-20">
    <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
      <div>
        <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-[500] tracking-[-0.02em] text-foreground max-w-[640px] leading-[1.15]">
          {audience === "startups"
            ? "Raise your confidence score before you raise capital."
            : "Give every applicant a serious read. Without the headcount."}
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground max-w-[560px]">
          {audience === "startups"
            ? "Run the DD that's coming for you anyway — agentic, in minutes."
            : "Agentic DD on the full funnel. Sourced, scored, and ready for the partner meeting."}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <a href="#calculator">
          <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
            {audience === "startups" ? "Get my free readiness score" : "Calculate my DD savings"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </a>
        <a href="#pricing" className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
          See pricing →
        </a>
      </div>
    </div>
  </section>
);

export default Landing;
