import { useRef, type CSSProperties } from "react";
import { Zap } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グロウボーダー",
  category: "カード演出",
  description: "カーソル付近のボーダーだけが発光して追従するカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function GlowBorder() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <div className="w-full max-w-sm">
      <div
        ref={ref}
        onMouseMove={onMove}
        className="group relative rounded-2xl bg-white/[0.04] p-px shadow-2xl shadow-black/40"
        style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(220px circle at var(--x) var(--y), rgba(99,102,241,0.9), transparent 70%)",
          }}
        />
        <div className="relative rounded-2xl border border-white/10 bg-[#0b0d17] p-7">
          <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
            <Zap className="size-6" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">
            {en ? "Glow Border" : "グロウボーダー"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {en
              ? "The edge nearest your cursor lights up, with a soft glow that follows along the border."
              : "カーソルに最も近い縁が光ります。境界に沿って柔らかな発光が追従します。"}
          </p>
        </div>
      </div>
    </div>
  );
}
