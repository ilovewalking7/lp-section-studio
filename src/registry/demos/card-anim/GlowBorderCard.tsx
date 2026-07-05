import { useRef, type CSSProperties } from "react";
import { ShieldCheck } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グロウボーダーカード",
  category: "カード演出",
  description: "枠が発光し、カーソル位置に追従する光が縁を走るカード。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "border", "glow"],
};

export default function GlowBorderCard() {
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
      className="group relative w-full max-w-sm rounded-2xl bg-[#0b0d17] p-[1.5px] shadow-2xl shadow-black/40"
      style={{ "--x": "50%", "--y": "0%" } as CSSProperties}
    >
      {/* glowing border layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--x) var(--y), rgba(56,189,248,0.9), rgba(56,189,248,0) 60%)",
        }}
      />
      <div className="relative rounded-2xl border border-white/10 bg-[#0b0d17] p-7 text-slate-200">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <ShieldCheck className="size-5 text-sky-300" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-white">
          {en ? "Glow border" : "発光ボーダー"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {en
            ? "The edge brightens only near the cursor. Light travels along the border to guide focus."
            : "カーソルの近くだけ縁が明るく光ります。境界に沿って光が移動し、フォーカスを誘導します。"}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-mono text-xs text-slate-500">secure</span>
          <span className="text-sm font-medium text-sky-300">
            {en ? "Enable →" : "有効化 →"}
          </span>
        </div>
      </div>
    </div>
  );
}
