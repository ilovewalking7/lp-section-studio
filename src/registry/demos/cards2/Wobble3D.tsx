import { useRef, type CSSProperties } from "react";
import { Rocket } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ウォブル3D",
  category: "カード演出",
  description: "ホバーで弾むように傾き、内部が逆方向へ揺れる立体カード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function Wobble3D() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${-py * 10}deg`);
    el.style.setProperty("--ry", `${px * 10}deg`);
    el.style.setProperty("--tx", `${px * 16}px`);
    el.style.setProperty("--ty", `${py * 16}px`);
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  }

  return (
    <div className="w-full max-w-sm" style={{ perspective: "1000px" }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600 to-fuchsia-700 p-8 shadow-2xl shadow-fuchsia-900/40 transition-transform duration-300 ease-out"
        style={
          {
            transform:
              "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
            transformStyle: "preserve-3d",
            "--rx": "0deg",
            "--ry": "0deg",
            "--tx": "0px",
            "--ty": "0px",
          } as CSSProperties
        }
      >
        <div
          className="transition-transform duration-300 ease-out"
          style={{ transform: "translate(var(--tx,0), var(--ty,0))" }}
        >
          <Rocket className="size-8 text-white" />
          <h3 className="mt-5 text-xl font-bold text-white">
            {en ? "Wobble Effect" : "ウォブルエフェクト"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            {en
              ? "As the card tilts, its contents sway the opposite way for a jelly-like bounce."
              : "カードが傾くと中身が逆方向に揺れ、ゼリーのような弾みを演出します。"}
          </p>
        </div>
      </div>
    </div>
  );
}
