import { useRef, type CSSProperties } from "react";
import { CreditCard } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グレアカード",
  category: "カード演出",
  description: "カーソルを追従する光沢ハイライトが走る光沢カード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function GlareCard() {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <div className="w-full max-w-sm" style={{ perspective: "900px" }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        className="group relative aspect-[1.6/1] overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-violet-600 via-indigo-700 to-slate-900 p-6 shadow-2xl shadow-indigo-900/40"
        style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.45), transparent 45%)",
            mixBlendMode: "overlay",
          }}
        />
        <div className="relative flex h-full flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <CreditCard className="size-7" />
            <span className="text-xs font-medium tracking-widest opacity-80">
              PREMIUM
            </span>
          </div>
          <div>
            <p className="font-mono text-lg tracking-[0.2em]">
              4921 •••• •••• 7788
            </p>
            <p className="mt-2 text-xs uppercase tracking-wider opacity-70">
              Holder Name
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
