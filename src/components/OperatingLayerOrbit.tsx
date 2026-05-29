import { useState } from "react";
import { Inbox, Layers, FolderSearch, Brain, ClipboardCheck, LineChart } from "lucide-react";
import { StackedLogo } from "@/components/StackedLogo";

const NODES = [
  {
    icon: Inbox,
    step: "01",
    label: "Intake",
    title: "Intake",
    bullets: ["Structured startup profiles", "Founder data & documents", "Qualification & source tracking"],
  },
  {
    icon: Layers,
    step: "02",
    label: "Deal flow",
    title: "Deal flow management",
    bullets: ["Pipeline stages & ownership", "Scoring, tags & sector filters", "Stage-movement disciplines"],
  },
  {
    icon: FolderSearch,
    step: "03",
    label: "DD workspace",
    title: "Due diligence workspace",
    bullets: ["Startup, IC & partner portals", "Data rooms & evidence requests", "Reviewer assignments & expert feedback"],
  },
  {
    icon: Brain,
    step: "04",
    label: "AI synthesis",
    title: "AI-assisted synthesis",
    bullets: ["Call, email & document summaries", "12 primary analyses + PESTEL & benchmarks", "System of record for full auditability"],
  },
  {
    icon: ClipboardCheck,
    step: "05",
    label: "Decision records",
    title: "Decision records",
    bullets: ["Evaluation reviews & open questions", "Recommendations & decision rationale", "Conviction score & follow-ups"],
  },
  {
    icon: LineChart,
    step: "06",
    label: "Post-decision",
    title: "Post-decision tracking",
    bullets: ["Cohort progress & milestones", "Founder updates & mentor engagement", "Portfolio monitoring & impact reporting"],
  },
];

// 6 nodes around a center hub. SVG viewBox 800x520.
const CENTER = { x: 400, y: 260 };
const RADIUS_X = 320;
const RADIUS_Y = 200;

const positions = NODES.map((_, i) => {
  const angle = (Math.PI * 2 * i) / NODES.length - Math.PI / 2;
  return {
    x: CENTER.x + RADIUS_X * Math.cos(angle),
    y: CENTER.y + RADIUS_Y * Math.sin(angle),
  };
});

export const OperatingLayerOrbit = () => {
  const [active, setActive] = useState<number | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const activeNode = active !== null ? NODES[active] : null;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="border border-border bg-background">
      {/* Graphic */}
      <div
        className="relative w-full overflow-hidden"
        onMouseMove={handleMove}
        onMouseLeave={() => {
          setActive(null);
          setCursor(null);
        }}
      >

        <svg
          viewBox="0 0 800 520"
          className="w-full h-auto block"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <pattern id="orbitGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" className="stroke-border" strokeWidth="0.5" opacity="0.4" />
            </pattern>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" className="[stop-color:hsl(var(--foreground))]" stopOpacity="0.18" />
              <stop offset="100%" className="[stop-color:hsl(var(--foreground))]" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="520" fill="url(#orbitGrid)" />

          <circle cx={CENTER.x} cy={CENTER.y} r="140" fill="url(#hubGlow)" />

          {/* Spokes */}
          {positions.map((p, i) => (
            <g key={`line-${i}`}>
              <line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={p.x}
                y2={p.y}
                className="stroke-border"
                strokeWidth="1"
              />
              <line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={p.x}
                y2={p.y}
                className="stroke-foreground transition-opacity duration-300"
                strokeWidth={active === i ? 1.75 : 1.25}
                strokeDasharray="3 10"
                opacity={active === null ? 0.55 : active === i ? 0.95 : 0.2}
                style={{ animation: `orbitFlow 4s linear ${i * 0.4}s infinite` }}
              />
            </g>
          ))}

          {/* Ring connecting adjacent nodes */}
          {positions.map((p, i) => {
            const next = positions[(i + 1) % positions.length];
            return (
              <line
                key={`ring-${i}`}
                x1={p.x}
                y1={p.y}
                x2={next.x}
                y2={next.y}
                className="stroke-border"
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.6"
              />
            );
          })}

          {/* Traveling dots */}
          {positions.map((p, i) => (
            <circle key={`dot-${i}`} r="3" className="fill-foreground" opacity="0.85">
              <animateMotion
                dur="4s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
                path={`M ${CENTER.x} ${CENTER.y} L ${p.x} ${p.y}`}
              />
            </circle>
          ))}

          {/* Node rings */}
          {positions.map((p, i) => (
            <g key={`node-${i}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r="44"
                className={`transition-colors duration-200 stroke-border ${active === i ? "fill-foreground/[0.06]" : "fill-background"}`}
                strokeWidth="1"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="44"
                className="fill-none stroke-foreground"
                strokeWidth="1"
                opacity={active === i ? 0.7 : 0.3}
                style={{
                  animation: `orbitPulse 3s ease-in-out ${i * 0.3}s infinite`,
                  transformOrigin: `${p.x}px ${p.y}px`,
                }}
              />
            </g>
          ))}

          {/* Central hub */}
          <circle cx={CENTER.x} cy={CENTER.y} r="60" className="fill-background stroke-foreground" strokeWidth="1.25" />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="60"
            className="fill-none stroke-foreground"
            strokeWidth="1"
            opacity="0.4"
            style={{ animation: `orbitPulse 2.4s ease-in-out infinite`, transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
          />
        </svg>

        {/* Overlay: icons, labels, hit areas */}
        <div className="absolute inset-0">
          {/* Hub */}
          <div
            className="absolute flex flex-col items-center gap-1 pointer-events-none"
            style={{
              left: `${(CENTER.x / 800) * 100}%`,
              top: `${(CENTER.y / 520) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <StackedLogo size={28} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">DcernX</span>
          </div>

          {/* Nodes — each has a hover hit area */}
          {NODES.map((n, i) => {
            const p = positions[i];
            const Icon = n.icon;
            const isActive = active === i;
            return (
              <button
                type="button"
                key={n.title}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                aria-label={n.title}
                className="absolute flex flex-col items-center justify-center rounded-full focus:outline-none"
                style={{
                  left: `${(p.x / 800) * 100}%`,
                  top: `${(p.y / 520) * 100}%`,
                  width: "88px",
                  height: "88px",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Icon
                  className={`h-4 w-4 transition-colors ${isActive ? "text-foreground" : "text-foreground/80"}`}
                  strokeWidth={1.5}
                />
                <span
                  className={`mt-2 text-[10.5px] uppercase tracking-[0.14em] whitespace-nowrap transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {n.label}
                </span>
              </button>
            );
          })}
        </div>

        <style>{`
          @keyframes orbitFlow { to { stroke-dashoffset: -52; } }
          @keyframes orbitPulse {
            0%, 100% { opacity: 0.15; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.08); }
          }
        `}</style>
      </div>

      {/* Detail panel — swaps on hover */}
      <div className="border-t border-border p-7 min-h-[148px] relative">
        {activeNode ? (
          <div key={activeNode.title} className="animate-fade-in grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-8 gap-y-3 items-start">
            <div className="flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{activeNode.step}</span>
              <h3 className="text-[16px] font-medium text-foreground">{activeNode.title}</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-1.5 text-[13px] leading-[1.6] text-muted-foreground">
              {activeNode.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-foreground/30 shrink-0">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-[13px] text-muted-foreground">
            Hover any stage to see what lives inside it — every artefact stays attached to the deal record.
          </p>
        )}
      </div>
    </div>
  );
};
