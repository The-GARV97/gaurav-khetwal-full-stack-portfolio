import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Fixed background layer: aurora blobs, radial bloom, grid, grain and a
 * cursor-following gradient glow. Purely decorative and pointer-transparent.
 */
export function Atmosphere() {
  const reduced = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 320}px, ${y - 320}px, 0)`;
      }
      raf = window.requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = window.requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden grain"
    >
      {/* base deep-space wash */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(90rem 60rem at 12% -10%, color-mix(in oklab, var(--grad-violet) 26%, transparent), transparent 60%), radial-gradient(70rem 50rem at 95% 8%, color-mix(in oklab, var(--grad-cyan) 20%, transparent), transparent 62%), radial-gradient(80rem 60rem at 50% 115%, color-mix(in oklab, var(--grad-magenta) 20%, transparent), transparent 60%)",
        }}
      />

      {/* liquid blobs */}
      <div
        className="absolute -top-32 -left-24 size-[38rem] rounded-full blur-[110px] opacity-45"
        style={{
          background:
            "conic-gradient(from 120deg, var(--grad-violet), var(--grad-blue), var(--grad-cyan), var(--grad-violet))",
          animation: reduced ? undefined : "blob-drift 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-40 top-1/4 size-[34rem] rounded-full blur-[120px] opacity-35"
        style={{
          background:
            "conic-gradient(from 0deg, var(--grad-magenta), var(--grad-purple), var(--grad-blue), var(--grad-magenta))",
          animation: reduced ? undefined : "blob-drift 34s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-14rem] left-1/3 size-[32rem] rounded-full blur-[130px] opacity-30"
        style={{
          background:
            "conic-gradient(from 220deg, var(--grad-aqua), var(--grad-cyan), var(--grad-violet), var(--grad-aqua))",
          animation: reduced ? undefined : "blob-drift 30s ease-in-out infinite",
        }}
      />

      {/* faint engineering grid */}
      <div className="absolute inset-0 grid-canvas opacity-[0.35]" />

      {/* cursor bloom */}
      {reduced ? null : (
        <div
          ref={glowRef}
          className="absolute top-0 left-0 size-[40rem] rounded-full blur-[120px] opacity-20 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--grad-cyan) 70%, transparent), transparent 65%)",
          }}
        />
      )}
    </div>
  );
}
