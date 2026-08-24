import { useEffect } from "react";

const ICON_SIZE = 64;
const STATIC_ICON = "/favicon.svg";

type Palette = {
  accent: string;
  base: string;
  edge: string;
  ink: string;
  shadow: string;
  track: string;
};

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

export function InteractiveFavicon() {
  useEffect(() => {
    const iconLink =
      document.querySelector<HTMLLinkElement>('link[rel~="icon"]') ??
      document.head.appendChild(Object.assign(document.createElement("link"), { rel: "icon" }));
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = ICON_SIZE;
    canvas.height = ICON_SIZE;

    const darkPreference = window.matchMedia("(prefers-color-scheme: dark)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let interactionStartedAt = Number.NEGATIVE_INFINITY;
    let lastFrameAt = 0;

    const isDark = () => {
      const root = document.documentElement;
      if (root.classList.contains("dark")) return true;
      if (root.classList.contains("light") || root.style.colorScheme === "light") return false;
      if (root.style.colorScheme === "dark") return true;
      return darkPreference.matches;
    };

    const palette = (): Palette =>
      isDark()
        ? {
            accent: "#9b8cff",
            base: "#181b21",
            edge: "#343942",
            ink: "#f7f8fb",
            shadow: "#07080b",
            track: "#555c68",
          }
        : {
            accent: "#6d5dfc",
            base: "#e8edf3",
            edge: "#ffffff",
            ink: "#20242c",
            shadow: "#a9b3bf",
            track: "#aeb7c2",
          };

    const paint = (time: number) => {
      const colors = palette();
      const interactionAge = Math.max(0, time - interactionStartedAt);
      const active = interactionAge < 700;
      const pulse = active ? Math.sin((interactionAge / 700) * Math.PI) : 0;
      const angle = reducedMotion.matches ? -Math.PI / 2 : time / (active ? 210 : 780);
      const dotX = 32 + Math.cos(angle) * 24;
      const dotY = 32 + Math.sin(angle) * 24;

      context.clearRect(0, 0, ICON_SIZE, ICON_SIZE);
      context.save();
      context.shadowColor = colors.shadow;
      context.shadowBlur = 5;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 3;
      roundedRect(context, 6, 6, 52, 52, 16);
      context.fillStyle = colors.base;
      context.fill();
      context.restore();

      roundedRect(context, 6, 6, 52, 52, 16);
      context.strokeStyle = colors.edge;
      context.lineWidth = 2;
      context.stroke();

      context.beginPath();
      context.arc(32, 32, 24, 0, Math.PI * 2);
      context.strokeStyle = colors.track;
      context.lineWidth = 1;
      context.setLineDash([3, 5]);
      context.stroke();
      context.setLineDash([]);

      if (active) {
        context.beginPath();
        context.arc(dotX, dotY, 7 + pulse * 4, 0, Math.PI * 2);
        context.fillStyle = `${colors.accent}2e`;
        context.fill();
      }

      context.beginPath();
      context.arc(dotX, dotY, 3.5 + pulse, 0, Math.PI * 2);
      context.fillStyle = colors.accent;
      context.fill();

      context.fillStyle = colors.ink;
      context.font = "800 22px system-ui, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("GK", 31, 32);

      context.beginPath();
      context.moveTo(20, 47);
      context.lineTo(44, 47);
      context.strokeStyle = colors.accent;
      context.lineCap = "round";
      context.lineWidth = 2.5;
      context.stroke();

      iconLink.type = "image/png";
      iconLink.href = canvas.toDataURL("image/png");
    };

    const tick = (time: number) => {
      if (document.visibilityState === "visible" && time - lastFrameAt >= 80) {
        paint(time);
        lastFrameAt = time;
      }
      animationFrame = window.requestAnimationFrame(tick);
    };

    const repaint = () => paint(performance.now());
    const updateMotion = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      repaint();
      if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(tick);
    };
    const reactToInteraction = () => {
      interactionStartedAt = performance.now();
      repaint();
    };

    window.addEventListener("pointerdown", reactToInteraction, { passive: true });
    darkPreference.addEventListener("change", repaint);
    reducedMotion.addEventListener("change", updateMotion);

    const themeObserver = new MutationObserver(repaint);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    repaint();
    if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointerdown", reactToInteraction);
      darkPreference.removeEventListener("change", repaint);
      reducedMotion.removeEventListener("change", updateMotion);
      themeObserver.disconnect();
      iconLink.type = "image/svg+xml";
      iconLink.href = STATIC_ICON;
    };
  }, []);

  return null;
}
