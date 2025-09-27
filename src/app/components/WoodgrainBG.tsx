"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Knot = {
  id: number;
  growing: boolean;
  x: number; // 0..1 (viewport normalized)
  y: number; // 0..1
  r: number; // visual radius in px
  s: number; // influence sigma in px (falloff)
  k: number; // strength (positive pulls, negative pushes)
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/**
 * Displacement field:
 * For each sample point (px, py), compute displacement due to all knots.
 * We bend the "flow" mostly in the x-direction (like long vertical grain)
 * but add a small y-component to create a natural wrap-around effect.
 */
function displacement(px: number, py: number, knots: Knot[]) {
  let dx = 0;
  let dy = 0;
  for (const kn of knots) {
    const cx = kn.x;
    const cy = kn.y;
    const dxp = px - cx;
    const dyp = py - cy;
    const d2 = dxp * dxp + dyp * dyp;
    const s2 = kn.s * kn.s;
    const falloff = Math.exp(-d2 / (2 * s2)); // Gaussian falloff
    const d = Math.sqrt(d2) + 0.0001;

    // Tangential-like deflection around the knot:
    // Rotate vector (dxp, dyp) by 90° to give a swirl component.
    const tx = -dyp / d;
    const ty = dxp / d;

    // Radial component to “wrap” lines tighter near the knot’s edge.
    const rx = dxp / d;
    const ry = dyp / d;

    const strength = kn.k * falloff;
    dx += strength * (1.4 * tx + 0.4 * rx);
    dy += strength * (0.2 * ty + 0.15 * ry);
  }
  return { dx, dy };
}

export default function WoodgrainBG() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [size, setSize] = useState({ w: 1200, h: 800 });
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  // Initial knots (normalized positions). You can add/remove as desired.
  const [knots, setKnots] = useState<Knot[]>([
    { id: 1, growing: true, x: 0.25, y: 0.35, r: 90, s: 180, k: 18 },
    { id: 2, growing: true, x: 0.7, y: 0.6, r: 110, s: 220, k: 22 },
    { id: 3, growing: true, x: 0.8, y: 0.2, r: 180, s: 130, k: 33 },
  ]);

  // Resize observer to keep SVG resolution crisp
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setSize({ w, h });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Hover/touch = grow/shrink nearest knot a bit
  useEffect(() => {
    const act = (x: number, y: number) => {
      setCursor({ x, y });
      setKnots((prev) => {
        if (!prev.length) return prev;
        // Find nearest knot in pixel space
        let best = 0;
        let bestD = Infinity;
        for (let i = 0; i < prev.length; i++) {
          const k = prev[i];
          const kx = k.x * size.w;
          const ky = k.y * size.h;
          const d = Math.hypot(x - kx, y - ky);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }

        return prev.map((k, i) => {
          if (k.s >= 300) k.growing = false;
          if (k.s <= 140) k.growing = true;
          return i === best
            ? k.growing
              ? {
                  ...k,
                  r: clamp(k.r + 6, 60, 180),
                  s: clamp(k.s + 10, 140, 300),
                  k: clamp(k.k + 0.8, 8, 30),
                }
              : {
                  ...k,
                  r: clamp(k.r - 4, 60, 180),
                  s: clamp(k.s - 6, 140, 300),
                  k: clamp(k.k - 0.6, 8, 30),
                }
            : k;
        });
      });
    };
    const grow = (x: number, y: number) => {
      setCursor({ x, y });
      setKnots((prev) => {
        if (!prev.length) return prev;
        // Find nearest knot in pixel space
        let best = 0;
        let bestD = Infinity;
        for (let i = 0; i < prev.length; i++) {
          const k = prev[i];
          const kx = k.x * size.w;
          const ky = k.y * size.h;
          const d = Math.hypot(x - kx, y - ky);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        return prev.map((k, i) =>
          i === best
            ? {
                ...k,
                r: clamp(k.r + 6, 60, 180),
                s: clamp(k.s + 10, 140, 300),
                k: clamp(k.k + 0.8, 8, 30),
              }
            : k
        );
      });
    };

    const shrink = () => {
      setCursor(null);
      setKnots((prev) =>
        prev.map((k) => ({
          ...k,
          r: clamp(k.r - 4, 60, 180),
          s: clamp(k.s - 6, 140, 300),
          k: clamp(k.k - 0.6, 8, 30),
        }))
      );
    };

    const onMove = (e: MouseEvent) => act(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) grow(t.clientX, t.clientY);
    };

    const onLeave = () => shrink();

    window.addEventListener("mousedown", onLeave, { passive: true });

    window.addEventListener("mouseup", onLeave);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    // window.addEventListener("mouseleave", onLeave);
    // window.addEventListener("touchend", onLeave);
    return () => {
      window.removeEventListener("mousedown", onLeave);

      window.removeEventListener("mouseup", onLeave);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      // window.removeEventListener("mouseleave", onLeave);
      // window.removeEventListener("touchend", onLeave);
    };
  }, [size.w, size.h]);

  // Convert knots to pixel space for the field
  const pxKnots = useMemo<Knot[]>(
    () =>
      knots.map((k) => ({
        ...k,
        x: k.x * size.w,
        y: k.y * size.h,
      })),
    [knots, size.w, size.h]
  );

  // Build grain paths
  const paths = useMemo(() => {
    const w = size.w;
    const h = size.h;

    const rows = 30; // number of long grain lines
    const samples = 180; // points per line
    const margin = 0;

    const lines: string[] = [];

    for (let r = 0; r < rows; r++) {
      // Evenly distribute base y across screen height
      const baseY = margin + ((h - margin * 2) * r) / (rows - 1);

      let d = "";
      for (let i = 0; i < samples; i++) {
        const t = i / (samples - 1);
        const x = margin + (w - margin * 2) * t;
        const y = baseY;

        const { dx, dy } = displacement(x, y, pxKnots);
        const px = x + dx;
        const py = y + dy;

        d += (i === 0 ? "M" : "L") + px.toFixed(1) + "," + py.toFixed(1) + " ";
      }
      lines.push(d);
    }
    return lines;
  }, [size.w, size.h, pxKnots]);

  return (
    <svg
      ref={svgRef}
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background: "#2a1c15", // walnut base
      }}
      aria-hidden
    >
      {/* subtle warm vignette */}
      <defs>
        <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,210,160,0.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={size.w} height={size.h} fill="url(#sheen)" />

      {/* knots (optional visual hint — faint rings) */}
      <g>
        {pxKnots.map((k) => (
          <circle
            key={k.id}
            cx={k.x}
            cy={k.y}
            r={k.r}
            fill="none"
            stroke="rgba(0,0,0,0.35)"
            strokeWidth={1}
            opacity={0.25}
          />
        ))}
      </g>

      {/* grain lines */}
      <g
        stroke="rgba(0,0,0,0.65)"
        strokeWidth={2.5}
        fill="none"
        style={{ mixBlendMode: "multiply" }}
      >
        {paths.map((d, idx) => (
          <path key={idx} d={d} />
        ))}
      </g>

      {/* small vertical striation layer for depth */}
      <g
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1.5}
        style={{ mixBlendMode: "multiply" }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const x = (size.w * (i + 1)) / 13;
          return <line key={i} x1={x} y1={0} x2={x} y2={size.h} />;
        })}
      </g>
    </svg>
  );
}
