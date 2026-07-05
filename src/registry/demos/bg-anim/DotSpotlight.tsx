import { useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ドットスポットライト背景",
  category: "背景アニメ",
  description: "ドットグリッドがカーソルに追従して光るインタラクティブ背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "dots", "cursor"],
};

export default function DotSpotlight() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="relative w-full overflow-hidden bg-[#05060f] py-28 text-white"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.35) 1.2px, transparent 1.2px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(56,189,248,0.9) 1.2px, transparent 1.2px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(220px circle at var(--mx) var(--my), #000 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(220px circle at var(--mx) var(--my), #000 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx) var(--my), rgba(56,189,248,0.15), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
          Dot Spotlight
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en
            ? "A field of dots lit by your cursor"
            : "カーソルが照らすドットの夜"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          {en
            ? "Move your mouse and only the dots around it light up."
            : "マウスを動かすと、その周囲のドットだけが浮かび上がります。"}
        </p>
      </div>
    </section>
  );
}
