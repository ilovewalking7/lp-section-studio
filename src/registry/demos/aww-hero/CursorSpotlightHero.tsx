import type { DemoMeta } from "@/registry";
import { useRef, useState } from "react";

export const meta: DemoMeta = {
  name: "カーソルスポットライトヒーロー",
  category: "Awwwards",
  description:
    "マウスに追従するスポットライトが闇を照らす、onMouseMove連動のインタラクティブヒーロー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

export default function CursorSpotlightHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 40 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="aww-cs relative w-full overflow-hidden bg-[#050507] px-5 py-28 text-white sm:px-10 sm:py-40"
    >
      <style>{`
        @keyframes aww-cs-up { from{opacity:0;transform:translateY(26px);} to{opacity:1;transform:translateY(0);} }
        .aww-cs-up{ animation: aww-cs-up 1s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce){ .aww-cs-up{animation:none!important;} }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-100"
        style={{
          background: `radial-gradient(560px circle at ${pos.x}% ${pos.y}%, rgba(99,102,241,0.28), transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, black, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, black, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-[1300px] text-center">
        <p className="aww-cs-up mb-8 text-[11px] font-semibold uppercase tracking-[0.5em] text-white/40">
          Move your cursor
        </p>
        <h1
          className="aww-cs-up font-black leading-[0.86] tracking-[-0.04em]"
          style={{ fontSize: "clamp(2.8rem,11vw,10rem)", animationDelay: ".08s" }}
        >
          {en ? (
            <>
              Light up
              <br />
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                the dark.
              </span>
            </>
          ) : (
            <>
              闇を、
              <br />
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                照らしてみて。
              </span>
            </>
          )}
        </h1>
        <p
          className="aww-cs-up mx-auto mt-8 max-w-md text-base leading-relaxed text-white/55"
          style={{ animationDelay: ".18s" }}
        >
          {en
            ? "A spotlight and grid appear wherever your cursor goes — information design that reveals itself only through motion."
            : "カーソルの位置にスポットライトとグリッドが現れます。動きでしか見えない情報設計。"}
        </p>
      </div>
    </section>
  );
}
