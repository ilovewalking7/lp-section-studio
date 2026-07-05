import { useRef, type CSSProperties } from "react";
import { Aperture } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スポットライト追従",
  category: "カード演出",
  description: "カーソルを追うスポットライトが内容を照らすカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function FollowCursorSpotlight() {
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
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d17] p-7 shadow-2xl shadow-black/40"
        style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(300px circle at var(--x) var(--y), rgba(120,140,255,0.14), transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
            <Aperture className="size-6" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">
            {en ? "Spotlight" : "スポットライト"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {en
              ? "Move your cursor and a soft glow follows it, lifting the content out of the dark surface."
              : "カーソルを動かすと柔らかな光が追従し、暗い面の中で内容を浮かび上がらせます。"}
          </p>
        </div>
      </div>
    </div>
  );
}
