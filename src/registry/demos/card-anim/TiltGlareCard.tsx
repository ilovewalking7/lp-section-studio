import { useRef, type CSSProperties } from "react";
import { Cpu } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "3Dチルト・グレアカード",
  category: "カード演出",
  description: "ホバーで3D傾斜し、光沢（グレア）がカーソルに追従して動く。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "tilt", "3d"],
};

export default function TiltGlareCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 14}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 14}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div className="[perspective:1000px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#141627] to-[#0b0d17] p-7 text-slate-200 shadow-2xl shadow-black/50 transition-transform duration-200 ease-out [transform:rotateX(var(--rx))_rotateY(var(--ry))] [transform-style:preserve-3d]"
        style={{ "--rx": "0deg", "--ry": "0deg", "--gx": "50%", "--gy": "50%" } as CSSProperties}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(300px circle at var(--gx) var(--gy), rgba(255,255,255,0.25), transparent 55%)",
          }}
        />
        <div className="relative [transform:translateZ(40px)]">
          <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <Cpu className="size-5 text-cyan-300" />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-white">
            {en ? "Parallax tilt" : "パララックス・チルト"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {en
              ? "The card tilts in 3D with the cursor while a glare glides across its surface, adding depth."
              : "カードがカーソルに合わせて立体的に傾き、表面を光沢が滑ります。奥行きのある質感を演出。"}
          </p>
          <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="font-mono text-xs text-slate-500">3D · glare</span>
            <span className="text-sm font-medium text-cyan-300">
              {en ? "Try it →" : "体験する →"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
