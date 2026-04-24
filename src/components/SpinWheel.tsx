import { useEffect, useImperativeHandle, useRef, forwardRef, useState } from "react";

const SEGMENT_VARS = [
  "--wheel-1", "--wheel-2", "--wheel-3", "--wheel-4",
  "--wheel-5", "--wheel-6", "--wheel-7", "--wheel-8",
];

const hslVar = (v: string) => {
  const root = getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  return `hsl(${root})`;
};

export type SpinWheelHandle = {
  spin: () => void;
};

type Props = {
  entries: string[];
  onResult: (winner: string) => void;
  spinning: boolean;
  setSpinning: (v: boolean) => void;
  size?: number;
};

const SpinWheel = forwardRef<SpinWheelHandle, Props>(
  ({ entries, onResult, spinning, setSpinning, size = 460 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rotationRef = useRef(0);
    const [render, setRender] = useState(0); // re-trigger draw on resize/theme

    const draw = (rotation: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const cssSize = size;
      canvas.width = cssSize * dpr;
      canvas.height = cssSize * dpr;
      canvas.style.width = `${cssSize}px`;
      canvas.style.height = `${cssSize}px`;
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssSize, cssSize);

      const cx = cssSize / 2;
      const cy = cssSize / 2;
      const radius = cssSize / 2 - 10;

      const n = Math.max(entries.length, 1);
      const slice = (Math.PI * 2) / n;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      for (let i = 0; i < n; i++) {
        const start = i * slice;
        const end = start + slice;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, start, end);
        ctx.closePath();
        ctx.fillStyle = hslVar(SEGMENT_VARS[i % SEGMENT_VARS.length]);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.lineWidth = 3;
        ctx.stroke();

        // text
        ctx.save();
        ctx.rotate(start + slice / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        const fontSize = Math.max(12, Math.min(20, (radius * 0.9) / Math.max(6, n) + 10));
        ctx.font = `700 ${fontSize}px Nunito, system-ui, sans-serif`;
        ctx.shadowColor = "rgba(0,0,0,0.25)";
        ctx.shadowBlur = 4;
        const label = entries[i] || "—";
        const maxLen = Math.max(8, Math.floor(28 - n * 0.6));
        const trimmed = label.length > maxLen ? label.slice(0, maxLen - 1) + "…" : label;
        ctx.fillText(trimmed, radius - 16, 6);
        ctx.restore();
      }
      ctx.restore();

      // outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
      ctx.lineWidth = 8;
      ctx.strokeStyle = hslVar("--primary");
      ctx.stroke();

      // hub
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = hslVar("--primary");
      ctx.stroke();
    };

    useEffect(() => {
      draw(rotationRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entries, size, render]);

    useEffect(() => {
      const onResize = () => setRender((v) => v + 1);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    const spin = () => {
      if (spinning || entries.length === 0) return;
      setSpinning(true);
      const n = entries.length;
      const slice = (Math.PI * 2) / n;
      const winnerIdx = Math.floor(Math.random() * n);
      // pointer is at top (-PI/2). We want the middle of winner slice to land at -PI/2.
      // Final rotation angle R such that ((winnerIdx + 0.5) * slice + R) mod 2π === -π/2 mod 2π
      const target = -Math.PI / 2 - (winnerIdx + 0.5) * slice;
      const turns = 6 + Math.random() * 2;
      const current = rotationRef.current;
      const normalizedTarget = target - (((target - current) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const finalRotation = normalizedTarget + turns * Math.PI * 2 + Math.PI * 2;
      const duration = 5200;
      const start = performance.now();
      const startRot = current;
      const delta = finalRotation - startRot;

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = easeOut(t);
        rotationRef.current = startRot + delta * eased;
        draw(rotationRef.current);
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          setSpinning(false);
          onResult(entries[winnerIdx]);
        }
      };
      requestAnimationFrame(tick);
    };

    useImperativeHandle(ref, () => ({ spin }), [entries, spinning]);

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <canvas ref={canvasRef} className="rounded-full shadow-pop" />
        {/* pointer */}
        <div className="absolute left-1/2 -top-2 -translate-x-1/2 z-10">
          <div
            className="w-0 h-0 drop-shadow-lg"
            style={{
              borderLeft: "18px solid transparent",
              borderRight: "18px solid transparent",
              borderTop: `30px solid hsl(var(--primary))`,
            }}
          />
        </div>
        {/* center spin button */}
        <button
          onClick={spin}
          disabled={spinning || entries.length === 0}
          aria-label="Spin the wheel"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-20 w-20 rounded-full bg-gradient-brand text-primary-foreground font-display font-bold text-lg shadow-pop hover:scale-110 active:scale-95 transition-transform disabled:opacity-70 disabled:cursor-not-allowed animate-pulse-glow"
        >
          {spinning ? "..." : "SPIN"}
        </button>
      </div>
    );
  }
);

SpinWheel.displayName = "SpinWheel";
export default SpinWheel;
