import { useRef, type CSSProperties } from "react";
import { Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "3Dチルト",
  category: "カード演出",
  description: "カーソル位置に応じてカードが立体的に傾く3Dチルト。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function Tilt3D() {
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
    el.style.setProperty("--rx", `${-py * 14}deg`);
    el.style.setProperty("--ry", `${px * 14}deg`);
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div className="w-full max-w-sm" style={{ perspective: "1000px" }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#161a2b] to-[#0b0d17] p-7 shadow-2xl shadow-black/50 transition-transform duration-200 ease-out"
        style={
          {
            transform:
              "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
            transformStyle: "preserve-3d",
            "--rx": "0deg",
            "--ry": "0deg",
          } as CSSProperties
        }
      >
        <div
          className="flex size-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300"
          style={{ transform: "translateZ(40px)" }}
        >
          <Sparkles className="size-6" />
        </div>
        <h3
          className="mt-5 text-lg font-semibold text-white"
          style={{ transform: "translateZ(28px)" }}
        >
          {en ? "3D Tilt Card" : "3D チルトカード"}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed text-slate-400"
          style={{ transform: "translateZ(18px)" }}
        >
          {en
            ? "Move your mouse and the card tilts with depth, lifting elements through parallax."
            : "マウスを動かすとカードが奥行きを持って傾きます。視差で要素が浮かびます。"}
        </p>
      </div>
    </div>
  );
}
