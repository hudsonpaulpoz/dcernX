import { Inbox, Layers, FolderSearch, Brain, ClipboardCheck, LineChart } from "lucide-react";
import { StackedLogo } from "@/components/StackedLogo";

const NODES = [
  { icon: Inbox, label: "Intake" },
  { icon: Layers, label: "Deal flow" },
  { icon: FolderSearch, label: "DD workspace" },
  { icon: Brain, label: "AI synthesis" },
  { icon: ClipboardCheck, label: "Decision records" },
  { icon: LineChart, label: "Post-decision" },
];

// 6 nodes around a center hub. SVG viewBox 800x520.
const CENTER = { x: 400, y: 260 };
const RADIUS_X = 320;
const RADIUS_Y = 200;

const positions = NODES.map((_, i) => {
  // Distribute around an ellipse starting at top
  const angle = (Math.PI * 2 * i) / NODES.length - Math.PI / 2;
  return {
    x: CENTER.x + RADIUS_X * Math.cos(angle),
    y: CENTER.y + RADIUS_Y * Math.sin(angle),
  };
});

export const OperatingLayerOrbit = () => {
  return (
    <div className="relative w-full border border-border bg-background overflow-hidden">
      <svg
        viewBox="0 0 800 520"
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* Faint grid */}
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

        {/* Hub glow */}
        <circle cx={CENTER.x} cy={CENTER.y} r="140" fill="url(#hubGlow)" />

        {/* Connecting lines: hub <-> nodes (animated flow) */}
        {positions.map((p, i) => (
          <g key={`line-${i}`}>
            {/* Static base line */}
            <line
              x1={CENTER.x}
              y1={CENTER.y}
              x2={p.x}
              y2={p.y}
              className="stroke-border"
              strokeWidth="1"
            />
            {/* Animated dash flow outward */}
            <line
              x1={CENTER.x}
              y1={CENTER.y}
              x2={p.x}
              y2={p.y}
              className="stroke-foreground"
              strokeWidth="1.25"
              strokeDasharray="3 10"
              opacity="0.55"
              style={{
                animation: `orbitFlow 4s linear ${i * 0.4}s infinite`,
              }}
            />
          </g>
        ))}

        {/* Ring connecting adjacent nodes (the closed loop) */}
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

        {/* Pulsing dots traveling along each spoke */}
        {positions.map((p, i) => (
          <circle
            key={`dot-${i}`}
            r="3"
            className="fill-foreground"
            opacity="0.85"
          >
            <animateMotion
              dur="4s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
              path={`M ${CENTER.x} ${CENTER.y} L ${p.x} ${p.y}`}
            />
          </circle>
        ))}

        {/* Node circles */}
        {positions.map((p, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r="44"
              className="fill-background stroke-border"
              strokeWidth="1"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="44"
              className="fill-none stroke-foreground"
              strokeWidth="1"
              opacity="0.35"
              style={{
                animation: `orbitPulse 3s ease-in-out ${i * 0.3}s infinite`,
                transformOrigin: `${p.x}px ${p.y}px`,
              }}
            />
          </g>
        ))}

        {/* Central hub */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="60"
          className="fill-background stroke-foreground"
          strokeWidth="1.25"
        />
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="60"
          className="fill-none stroke-foreground"
          strokeWidth="1"
          opacity="0.4"
          style={{ animation: `orbitPulse 2.4s ease-in-out infinite` }}
          transform-origin={`${CENTER.x} ${CENTER.y}`}
        />
      </svg>

      {/* Overlay icons + labels positioned absolutely so we get crisp typography */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center hub label */}
        <div
          className="absolute flex flex-col items-center gap-1"
          style={{
            left: `${(CENTER.x / 800) * 100}%`,
            top: `${(CENTER.y / 520) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <StackedLogo size={28} />
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">DcernX</span>
        </div>

        {/* Node icons + labels */}
        {NODES.map((n, i) => {
          const p = positions[i];
          const Icon = n.icon;
          return (
            <div
              key={n.label}
              className="absolute flex flex-col items-center"
              style={{
                left: `${(p.x / 800) * 100}%`,
                top: `${(p.y / 520) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
              <span className="mt-2 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground whitespace-nowrap">
                {n.label}
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes orbitFlow {
          to { stroke-dashoffset: -52; }
        }
        @keyframes orbitPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};
