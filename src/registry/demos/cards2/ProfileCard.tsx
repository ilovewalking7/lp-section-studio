import { useRef, type CSSProperties } from "react";
import { Github, Globe, Twitter } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プロフィールカード",
  category: "カード演出",
  description: "チルトと光沢で立体的に動くプロフィールカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function ProfileCard() {
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
    el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div className="w-full max-w-xs" style={{ perspective: "1000px" }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1f3a] to-[#0b0d17] p-7 text-center shadow-2xl shadow-black/50 transition-transform duration-200 ease-out"
        style={
          {
            transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
            "--rx": "0deg",
            "--ry": "0deg",
            "--gx": "50%",
            "--gy": "50%",
          } as CSSProperties
        }
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(160px circle at var(--gx) var(--gy), rgba(255,255,255,0.1), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-2xl font-bold text-white shadow-lg shadow-violet-900/40">
            AY
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white">
            {en ? "Yui Ayase" : "綾瀬 ゆい"}
          </h3>
          <p className="text-sm text-slate-400">
            {en ? "Frontend Engineer" : "フロントエンドエンジニア"}
          </p>
          <div className="mt-5 flex justify-center gap-3">
            {[Github, Twitter, Globe].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex size-9 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
