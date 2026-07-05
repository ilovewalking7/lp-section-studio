import { useRef, type CSSProperties } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スポットライトカード",
  category: "カード演出",
  description: "カーソルに追従する放射状スポットライトが暗いカードを照らす。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "spotlight"],
};

export default function SpotlightCard() {
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
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d17] p-7 text-slate-200 shadow-2xl shadow-black/40"
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--x) var(--y), rgba(99,102,241,0.18), transparent 60%)",
        }}
      />
      <div className="relative">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Sparkles className="size-5 text-indigo-300" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-white">
          {en ? "Spotlight effect" : "スポットライト効果"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {en
            ? "On hover, a soft glow spreads from the cursor position to make the content stand out."
            : "マウスを乗せると、カーソルの位置を中心に柔らかな光が広がり、コンテンツを際立たせます。"}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-mono text-xs text-slate-500">interactive</span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-300">
            {en ? "Learn more" : "詳しく"} <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
