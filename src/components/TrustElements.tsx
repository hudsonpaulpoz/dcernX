import { useEffect, useState } from "react";
import { ArrowRight, Shield, FileCheck, Lock, ScrollText, X, Linkedin } from "lucide-react";

export const RUN_DEAL_URL = "https://app.dcernx.com/forms/survey/nn714s7d45cqdn9qw0m6jx042s89mgym";
export const DEMO_URL = "https://app.dcernx.com/forms/survey/nn7e5a797kjqh6exhrgdp69e3x88egz8";

export const HeroTrustLine = () => (
  <p className="mt-6 text-[11px] text-foreground/50 leading-relaxed max-w-2xl">
    Operated by P101 Limited (UK) · GDPR-compliant by design · Your data is processed by an open-source private AI model — never used to train third-party models · ~1,500 evidence checkpoints per deal.
  </p>
);

const CHIPS = [
  "Capital Kinetics",
  "MedTech Makers Labs",
  "Sentinel Asset Management",
  "Arthaverse",
];

export const ProofBar = () => (
  <section className="border-t border-border/40">
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-4">
        Trusted by investment teams across Europe, US, India & Singapore
      </div>
      <div className="flex flex-wrap gap-2">
        {CHIPS.map((c) => (
          <span
            key={c}
            className="text-[11px] px-3 py-1.5 border border-foreground/15 text-foreground/65 tabular-nums"
          >
            {c}
          </span>
        ))}
      </div>
      <p className="mt-4 text-[10px] text-foreground/40 max-w-2xl">
        Early design partners and reference customers.
      </p>
    </div>
  </section>
);

const TRUST_TILES = [
  {
    icon: Shield,
    title: "Operated by P101 Limited",
    body: "UK company no. 17063831. Single named entity. Single point of contact.",
  },
  {
    icon: Lock,
    title: "Open-source private AI",
    body: "Inference runs on an open-source model in a private, controlled environment. Your data is never used to train third-party models.",
  },
  {
    icon: FileCheck,
    title: "GDPR-compliant by design",
    body: "Minimum data collection, encryption in transit and at rest, deletion on request.",
  },
  {
    icon: ScrollText,
    title: "Full audit trail",
    body: "Every claim cited, every source timestamped, every output reviewable line-by-line.",
  },
];

export const SecurityTiles = ({ compact = false }: { compact?: boolean }) => (
  <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 ${compact ? "" : ""}`}>
    {TRUST_TILES.map((t) => (
      <div key={t.title} className="bg-background p-5">
        <t.icon className="h-4 w-4 text-foreground/60 mb-3" />
        <div className="text-sm font-medium mb-1">{t.title}</div>
        <p className="text-xs text-foreground/60 leading-relaxed">{t.body}</p>
      </div>
    ))}
  </div>
);

export const SecuritySection = () => (
  <section className="border-t border-border/40">
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-3">Security & trust</div>
      <h2 className="text-3xl md:text-4xl font-light tracking-tight max-w-3xl mb-10">
        Built for the firms that can't afford to get this wrong.
      </h2>
      <SecurityTiles />
    </div>
  </section>
);

const METHOD = [
  { t: "Evidence loops", d: "Every claim verified against multiple independent sources before it lands in a memo." },
  { t: "Open-source private AI", d: "Inference runs on an open-source model in a private environment. No third-party model training. No black box." },
  { t: "Human-reviewable", d: "Your team can audit, edit and override every line before IC." },
];

export const MethodologyStrip = () => (
  <section className="border-t border-border/40">
    <div className="max-w-5xl mx-auto px-6 py-14">
      <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-6">
        Why investors trust the output
      </div>
      <div className="grid md:grid-cols-3 gap-px bg-border/40">
        {METHOD.map((m) => (
          <div key={m.t} className="bg-background p-5">
            <div className="text-sm font-medium mb-1">{m.t}</div>
            <p className="text-xs text-foreground/60 leading-relaxed">{m.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TestimonialStrip = ({
  items,
}: {
  items: { quote: string; author: string; role: string }[];
}) => (
  <section className="border-t border-border/40">
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-3">From the desk of investors using DcernX</div>
      <h2 className="text-3xl md:text-4xl font-light tracking-tight max-w-3xl mb-12">
        What changes in the first 30 days.
      </h2>
      <div className="grid md:grid-cols-3 gap-px bg-border/40">
        {items.map((t) => (
          <figure key={t.author} className="bg-background p-6 flex flex-col">
            <blockquote className="text-sm text-foreground/80 leading-relaxed flex-1">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-4 text-[11px] text-foreground/50">
              — {t.author}, {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 text-[10px] text-foreground/40">
        Quotes anonymized at customer request. Firm types and outcomes are real.
      </p>
    </div>
  </section>
);

const FOUNDERS = [
  {
    initial: "H",
    name: "Hudson Paul",
    role: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/hudsonpaul1/",
  },
  {
    initial: "L",
    name: "Luke Anglin",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/lukeanglin/",
  },
  {
    initial: "C",
    name: "Christian Kumar",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/christiankumar/",
  },
];

export const FounderCard = () => (
  <div className="border border-border/40 bg-background p-6 md:p-8 max-w-3xl mx-auto text-left">
    <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-2">The team</div>
    <h3 className="text-lg font-medium">Built by operators, not vendors.</h3>
    <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
      We built DcernX because we'd watched too many private-capital decisions get made on conviction alone.
      If you're evaluating us for your team, write to us directly — we read every message.
    </p>
    <div className="mt-6 grid sm:grid-cols-3 gap-px bg-border/40">
      {FOUNDERS.map((f) => (
        <div key={f.name} className="bg-background p-4 flex items-start gap-3">
          <div className="h-10 w-10 shrink-0 border border-foreground/20 flex items-center justify-center text-sm font-light tracking-wider">
            {f.initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{f.name}</div>
            <div className="text-[11px] text-foreground/50">{f.role}</div>
            <a
              href={f.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-foreground/60 hover:text-foreground"
              aria-label={`${f.name} on LinkedIn`}
            >
              <Linkedin className="h-3 w-3" /> LinkedIn
            </a>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 flex flex-wrap gap-4">
      <a
        href="mailto:hudson@p101limited.com"
        className="text-xs inline-flex items-center gap-1 border-b border-foreground/30 hover:border-foreground pb-0.5"
      >
        hudson@p101limited.com <ArrowRight className="h-3 w-3" />
      </a>
      <a
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs inline-flex items-center gap-1 border-b border-foreground/30 hover:border-foreground pb-0.5"
      >
        Book 30 min with the team <ArrowRight className="h-3 w-3" />
      </a>
    </div>
    <div className="mt-4 text-[10px] text-foreground/40">P101 Limited · London (UK company no. 17063831)</div>
  </div>
);

export const StickyCtaBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("dcernx-sticky-dismissed") === "1") {
      setDismissed(true);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 border border-border/60 bg-background/95 backdrop-blur px-4 py-3 shadow-lg">
        <span className="text-xs text-foreground/70">Ready when you are —</span>
        <a
          href={RUN_DEAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 px-3 inline-flex items-center text-xs border border-foreground/20 hover:border-foreground/60 transition-colors"
        >
          Run a deal — free
        </a>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 px-3 inline-flex items-center gap-1.5 bg-foreground text-background text-xs hover:opacity-90"
        >
          Book a demo <ArrowRight className="h-3 w-3" />
        </a>
        <button
          onClick={() => {
            sessionStorage.setItem("dcernx-sticky-dismissed", "1");
            setDismissed(true);
          }}
          className="ml-1 text-foreground/40 hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
