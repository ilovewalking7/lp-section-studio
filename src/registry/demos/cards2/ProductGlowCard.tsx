import { useRef, type CSSProperties } from "react";
import { Headphones, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プロダクトグロウ",
  category: "カード演出",
  description: "カーソル追従の光と疑似画像で映える商品カード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function ProductGlowCard() {
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
    <div className="w-full max-w-xs">
      <div
        ref={ref}
        onMouseMove={onMove}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d17] p-5 shadow-2xl shadow-black/40"
        style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(250px circle at var(--x) var(--y), rgba(56,189,248,0.16), transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 80% at 50% 20%, #1e3a8a 0%, #0b0d17 70%)",
              }}
            />
            <Headphones className="relative size-20 text-sky-300 transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="mt-4">
            <h3 className="text-base font-semibold text-white">{en ? "Aura Wireless" : "Aura ワイヤレス"}</h3>
            <p className="mt-1 text-sm text-slate-400">{en ? "Noise cancelling" : "ノイズキャンセリング"}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-white">¥24,800</span>
              <Button size="sm" className="gap-1.5">
                <ShoppingCart className="size-4" /> {en ? "Add" : "追加"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
