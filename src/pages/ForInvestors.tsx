import { Link } from "react-router-dom";
import {
  ArrowRight,
  Inbox,
  Users,
  Sparkles,
  ClipboardCheck,
  LayoutGrid,
  PhoneCall,
  Mail,
  MessageSquare,
  Building2,
  Briefcase,
  Landmark,
  ShieldCheck,
  ScanSearch,
  Workflow,
} from "lucide-react";
import { StackedLogo } from "@/components/StackedLogo";
import { Seo } from "@/components/Seo";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { MarketingThemeToggle } from "@/components/MarketingThemeToggle";

const capabilities = [
  {
    icon: ScanSearch,
    title: "Analyse hundreds of applications, instantly",
    desc: "Every application — no matter how it arrives — is parsed, structured and run through the same agentic DD. No more triage by gut; every founder gets a fair, evidence-led read.",
  },
  {
    icon: ClipboardCheck,
    title: "Scored against your internal metrics",
    desc: "Map your IC's investment thesis, scoring rubric and red-flag rules once. Every incoming deal is quantified the same way — comparable, sortable, defensible.",
  },
  {
    icon: Sparkles,
    title: "20 pre-qualified leads to start",
    desc: "Onboard with a curated pipeline of 20 vetted opportunities matched to your stage, sector and geography focus — so the system delivers value from day one.",
  },
  {
    icon: LayoutGrid,
    title: "Integrated CRM & project management",
    desc: "Pipeline, stages, tasks, reminders, owners, notes, follow-ups — the operational layer of investing, built in. No more bouncing between Notion, Airtable and email threads.",
  },
  {
    icon: Workflow,
    title: "End-to-end investment workflows",
    desc: "Sourcing, screening, DD, IC, term sheets, closing, portfolio support, reporting — every stage of the lifecycle stays inside one auditable system.",
  },
  {
    icon: Inbox,
    title: "Email, calls & chat — built in",
    desc: "Send and receive email, log calls, run threaded chat with founders and co-investors — every conversation attached to the deal record, never lost in a personal inbox.",
  },
];

const portals = [
  {
    icon: Building2,
    title: "Startup portal",
    desc: "Founders submit applications, share updates, respond to diligence questions and access feedback — without you ever leaving the platform.",
  },
  {
    icon: Briefcase,
    title: "IC portal",
    desc: "Investment committee members review memos, vote, comment and sign off on decisions with full context, full audit trail and zero email back-and-forth.",
  },
  {
    icon: Landmark,
    title: "LP portal",
    desc: "Limited partners get a transparent, controlled view into pipeline activity, portfolio performance and capital deployment — on your terms.",
  },
];

export default function ForInvestors() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="DcernX for Investors — AI Deal Flow, Agentic DD, CRM & Portals for VCs, Accelerators, Angels & PE"
        description="DcernX for Investors lets private investment teams analyse hundreds of applications instantly, score every deal against internal metrics, and run end-to-end investment operations — with integrated CRM, email, calling, chat, and dedicated startup, IC and LP portals."
        path="/for-investors"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "DcernX for Investors",
          serviceType: "Investment Operations Platform",
          provider: { "@type": "Organization", name: "P101 Limited" },
          audience: {
            "@type": "Audience",
            audienceType:
              "Venture capital firms, accelerators, venture studios, angel syndicates, private equity, family offices",
          },
        }}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full bg-background border-b border-border px-6">
        <div className="mx-auto flex h-[56px] max-w-[1200px] items-center justify-between">
          <Link to="/" className="flex items-center -ml-0.5" aria-label="DcernX home">
            <StackedLogo size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/ai-analysis" className="hidden sm:inline-flex h-8 px-3 items-center text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              For Startups
            </Link>
            <Link to="/for-investors" className="hidden sm:inline-flex h-8 px-3 items-center text-[13px] text-foreground hover:text-foreground transition-colors">
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
            DcernX for Investors
          </p>
          <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-[500] tracking-[-0.04em] leading-[1.05] text-foreground max-w-[900px]">
            Every application reviewed. Every deal scored. Every workflow in one system.
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground max-w-[720px]">
            Accelerators, studios, VCs, angel networks and PE firms run on capacity they don't have. DcernX gives every incoming application a fair, AI-led review — scored against your internal metrics — and surrounds it with the CRM, communications and portals you need to operate end to end.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/ai-analysis/try">
              <button className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Try DcernX
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <Link to="/ai-analysis" className="text-[13px] text-foreground/70 hover:text-foreground transition-colors">
              See the 12-track DD engine →
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Capabilities */}
      <CursorSpotlight className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
            Built for private investment teams
          </p>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-[500] tracking-[-0.03em] text-foreground max-w-[720px] leading-[1.15]">
            From first application to closed round — without losing context.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              const isRightEdge = (i + 1) % 3 === 0;
              const isBottomRow = i >= capabilities.length - (capabilities.length % 3 || 3);
              return (
                <div
                  key={c.title}
                  className={`group/card relative p-8 transition-colors duration-200 hover:bg-foreground/[0.04] ${!isRightEdge ? "lg:border-r" : ""} ${i % 2 === 0 ? "md:border-r lg:border-r" : ""} ${!isBottomRow ? "border-b" : "border-b md:border-b"} border-border`}
                >
                  <div className="h-9 w-9 border border-border flex items-center justify-center mb-5 transition-colors group-hover/card:border-foreground/60 group-hover/card:bg-foreground/[0.06]">
                    <Icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-medium text-foreground mb-2">{c.title}</h3>
                  <p className="text-[13.5px] leading-[1.65] text-muted-foreground">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </CursorSpotlight>

      <div className="border-t border-border" />

      {/* Portals */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
            Stakeholder portals
          </p>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-[500] tracking-[-0.03em] text-foreground max-w-[720px] leading-[1.15]">
            One platform. Three audiences. Zero side-channels.
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground max-w-[640px] leading-[1.7]">
            Engage founders, your IC and your LPs from the same system — each with the right level of access and the right view of the deal.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 border border-border">
            {portals.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`p-8 ${i < 2 ? "md:border-r" : ""} ${i > 0 ? "border-t md:border-t-0" : ""} border-border`}
                >
                  <div className="h-9 w-9 border border-border flex items-center justify-center mb-5">
                    <Icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-medium text-foreground mb-2">{p.title}</h3>
                  <p className="text-[13.5px] leading-[1.65] text-muted-foreground">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Comms strip */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1200px] flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-[520px]">
            <h3 className="text-[20px] font-medium text-foreground tracking-[-0.02em]">
              Email. Calls. Chat. All attached to the deal.
            </h3>
            <p className="mt-3 text-[14px] text-muted-foreground leading-[1.65]">
              Integrated communications mean conversations never get lost in a personal inbox. Every interaction lives in the deal record — searchable, attributable, ready for the next reviewer.
            </p>
          </div>
          <div className="flex gap-3">
            {[Mail, PhoneCall, MessageSquare].map((Icon, i) => (
              <div key={i} className="h-12 w-12 border border-border flex items-center justify-center">
                <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-[720px]">
          <ShieldCheck className="h-6 w-6 mx-auto text-foreground/70" strokeWidth={1.5} />
          <h2 className="mt-6 text-[clamp(1.8rem,3vw,2.5rem)] font-[500] tracking-[-0.035em] text-foreground leading-[1.1]">
            Stop being throttled by capacity. Start operating at scale.
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground">
            Give every application the fair review it deserves — and give your team the operating system they've been improvising around.
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/ai-analysis/try">
              <button className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-[15px] font-medium border border-foreground/40 text-foreground hover:bg-foreground hover:text-background transition-colors">
                Try DcernX
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
