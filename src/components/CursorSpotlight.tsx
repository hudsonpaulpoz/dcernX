import { useRef, useState, useCallback, type ReactNode } from "react";

/**
 * Soft halo that follows the cursor inside the wrapped section.
 * Pointer-events stay on children; halo is purely decorative.
 */
export function CursorSpotlight({
  children,
  className = "",
  size = 520,
  intensity = 0.08,
}: {
  children: ReactNode;
  className?: string;
  size?: number;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setPos(null)}
      className={`relative ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: pos ? 1 : 0,
          background: pos
            ? `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, hsl(var(--foreground) / ${intensity}), transparent 70%)`
            : undefined,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
