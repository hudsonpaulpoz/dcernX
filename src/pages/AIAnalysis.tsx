import { Link } from "react-router-dom";
import { ArrowRight, Brain, Building2, FileSearch, Scale, ShieldCheck, LineChart, AlertTriangle, Newspaper, Cpu, Layers, Target, Globe2, Calculator } from "lucide-react";
import { StackedLogo } from "@/components/StackedLogo";
import { Seo } from "@/components/Seo";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { MarketingThemeToggle } from "@/components/MarketingThemeToggle";

const analyses = [
  {
    icon: Brain,
    title: "Your story & strategy",
    desc: "We pressure-test how clearly your positioning, moat and 18-month plan land — and flag every place an investor will say 'so what?' before they say it out loud.",
  },
  {
    icon: Building2,
    title: "Your competition",
    desc: "We map the competitors you named — and the ones you didn't — with pricing, distribution and traction signals, so you're never caught off guard by 'what about X?'",
  },
  {
    icon: Newspaper,
    title: "Your public footprint",
    desc: "Reputational, legal and adverse-news signals on you, your co-founders and your cap table — surfaced the way an investor's analyst will surface them, so you can get ahead of the conversation.",
  },
  {
    icon: Cpu,
    title: "Your technology & IP",
    desc: "Your tech claims — stack, defensibility, scalability, IP — checked against repos, job posts, patents and architecture signals. We tell you which claims hold up and which need rewording.",
  },
  {
    icon: Scale,
    title: "Your regulatory exposure",
    desc: "Licensing, data protection, KYC/AML, security frameworks — what applies to you by sector and geography, with citations, so you walk in with answers instead of awkward pauses.",
  },
  {
    icon: LineChart,
    title: "Your financials",
    desc: "Revenue model, unit economics, burn and capital efficiency benchmarked against your sector. We expose the assumptions an investor will dig into and give you the numbers to defend them.",
  },
  {
    icon: AlertTriangle,
    title: "Your risk register",
    desc: "A clean, source-backed list of every material risk an investor will raise — market, execution, team, tech, regulatory, financial — each paired with the question you'll be asked and a starting answer.",
  },
  {
    icon: Layers,
    title: "Your macro context",
    desc: "Political, economic, social, technological, environmental and legal forces shaping your opportunity — so when an investor tests your awareness of the wider picture, you're already there.",
  },
  {
    icon: Target,
    title: "Your SWOT, honestly",
    desc: "Strengths, weaknesses, opportunities and threats derived from evidence, not founder optimism — the same SWOT an analyst would write before an IC meeting on your company.",
  },
  {
    icon: ArrowRight,
    title: "Your go-to-market",
    desc: "Channels, ICP, sales motion, pricing and CAC/LTV checked against companies that look like you. We point out where your GTM story is tight and where it needs a sharper number.",
  },
  {
    icon: Globe2,
    title: "Your market sizing",
    desc: "TAM/SAM/SOM, growth rates, comparable rounds and hiring signals from public sources — every market claim in your deck either backed up or rewritten with a defensible number.",
  },
  {
    icon: Calculator,
    title: "Your valuation frame",
    desc: "Comparable transactions, revenue multiples and stage benchmarks — not a number to anchor on, but the frame and ranges you need to negotiate the round you actually deserve.",
  },
];

export default function AIAnalysis() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="DcernX for Startups — Run Investor DD on Your Own Pitch Before You Take the Meeting"
        description="Fundraising founders: investor intros are expensive. Upload your pitch, financials and marketing material and DcernX returns one robust Investor DD report on your own company — so every meeting builds conviction and trust, and you walk in with the answers."
        path="/ai-analysis"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "DcernX for Startups",
            serviceType: "AI Investor-Readiness Report for Founders",
            provider: { "@type": "Organization", name: "P101 Limited" },
            audience: {
              "@type": "Audience",
              audienceType: "Fundraising founders, pre-seed to growth-stage startups preparing for investor meetings",
            },
            description: "A robust Investor DD report on your own pitch, financials and marketing — so every investor meeting builds conviction and trust.",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "For Startups", item: "/ai-analysis" },
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
            <Link to="/ai-analysis" className="hidden sm:inline-flex h-8 px-3 items-center text-[13px] text-foreground hover:text-foreground transition-colors">
              For Startups
            </Link>
            <Link to="/for-investors" className="hidden sm:inline-flex h-8 px-3 items-center text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              For Investors
            </Link>
            <MarketingThemeToggle />
            <Link to="/ai-analysis/try">
              <button className="text-[13px] h-8 px-3 border border-foreground/40 text-foreground hover:bg-foreground hover:text-background transition-colors">
                Try DcernX
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-5">
            For fundraising founders
          </p>
          <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-[500] tracking-[-0.04em] leading-[1.05] text-foreground max-w-[900px]">
            Make every investor meeting count.
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground max-w-[720px]">
            Investor intros are expensive — in time, in money, in goodwill. Every meeting has to build conviction and trust. Upload your pitch deck, financials and marketing material and DcernX returns a single, robust Investor DD report on your own company: every claim stress-tested, every gap surfaced, every hard question answered before it's asked. Walk in with the answers, leave with the next meeting.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/ai-analysis/try">
              <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Get my Investor DD report
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <Link to="/for-investors" className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              I'm an investor →
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* The twelve analyses */}
      <CursorSpotlight className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
            What's in your report
          </p>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-[500] tracking-[-0.03em] text-foreground max-w-[760px] leading-[1.15]">
            Twelve angles on your company — written the way an investor would write them.
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground max-w-[640px] leading-[1.7]">
            One report, twelve sections. Each one shows you what's strong, what's thin, and the exact question to expect across the table — with the answer waiting underneath.
          </p>


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
              How it works for you
            </p>
            <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-[500] tracking-[-0.03em] text-foreground leading-[1.15]">
              Built to make you sharper, not to grade you.
            </h2>
            <p className="mt-5 text-[15px] text-muted-foreground leading-[1.7]">
              Investors and their analysts run the same playbook on every company they meet. We run that playbook on you first — privately, with no judgement — so the work you do next is the work that actually moves the round.
            </p>
          </div>
          <ol className="space-y-6">
            {[
              {
                step: "01",
                title: "Upload what you'd send to an investor",
                body: "Pitch deck, financials, sales or product collateral, customer notes — whatever's in your fundraising folder. No data room polish required.",
              },
              {
                step: "02",
                title: "We run the same DD they will",
                body: "Twelve parallel investigations across your story, market, tech, financials, team and risk — benchmarked against companies investors have already funded in your space.",
              },
              {
                step: "03",
                title: "You get one robust report — within 90 minutes",
                body: "A founder-facing Investor DD report: what's strong, what's thin, the exact questions you'll be asked, and the data and framing to answer each one. Then go book the meeting.",
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
        <div className="mx-auto max-w-[760px]">
          <FileSearch className="h-6 w-6 mx-auto text-foreground/70" strokeWidth={1.5} />
          <h2 className="mt-6 text-[clamp(1.8rem,3vw,2.5rem)] font-[500] tracking-[-0.035em] text-foreground leading-[1.1]">
            Don't waste a single investor meeting.
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground">
            Every intro you get cost someone time, money and credibility. Upload your pitch, get your report, walk into the meeting with the answers — and turn the next conversation into the next term sheet.
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/ai-analysis/try">
              <button className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-[15px] font-medium border border-foreground/40 text-foreground hover:bg-foreground hover:text-background transition-colors">
                Get my Investor DD report
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
            <Link to="/ai-analysis" className="text-[12px] text-muted-foreground hover:text-foreground">For Startups</Link>
            <Link to="/for-investors" className="text-[12px] text-muted-foreground hover:text-foreground">For Investors</Link>
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
