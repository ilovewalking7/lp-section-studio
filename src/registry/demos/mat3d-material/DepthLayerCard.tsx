import { useRef, useState } from "react";
import { Mountain, Play } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "デプスレイヤーカード",
  category: "3Dアニメ",
  description:
    "前景・中景・背景がポインターで別々の速度で translate3d し、本物の奥行きを生む2.5Dカード。影もチルトに追従。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "material", "card", "animation"],
  principle:
    "層ごとに動く速度を変えるモーションパララックスは、人が距離を測る実際の手がかりで、強い立体感を生む。",
};

type P = { x: number; y: number; active: boolean };
const REST: P = { x: 0, y: 0, active: false };

export default function DepthLayerCard() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState<P>(REST);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setP({ x, y, active: true });
  };

  const onPointerLeave = () => setP(REST);

  const layer = (depth: number) => ({
    transform: `translate3d(${p.x * depth}px, ${p.y * depth}px, 0)`,
    transition: p.active
      ? "transform 80ms ease-out"
      : "transform 650ms cubic-bezier(0.22,1,0.36,1)",
  });

  return (
    <div className="flex w-full items-center justify-center px-4 py-12">
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative h-[400px] w-[320px] select-none overflow-hidden rounded-[28px] bg-[#0d1117] ring-1 ring-white/10"
        style={{
          boxShadow: `${p.x * -28}px ${
            22 + p.y * -18
          }px 48px -18px rgba(0,0,0,0.65)`,
          transition: p.active
            ? "box-shadow 80ms ease-out"
            : "box-shadow 650ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* background layer (slowest) */}
        <div className="absolute inset-0" style={layer(-10)} aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#1e3a8a_0%,#0d1117_60%)]" />
          <div className="absolute left-8 top-10 h-24 w-24 rounded-full bg-indigo-400/30 blur-2xl" />
          <div className="absolute right-6 top-24 h-16 w-16 rounded-full bg-cyan-300/30 blur-xl" />
        </div>

        {/* mid layer — mountains/material ridges */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={layer(18)}
          aria-hidden="true"
        >
          <div className="absolute bottom-0 left-[-10%] h-40 w-3/4 rounded-t-[100%] bg-gradient-to-t from-indigo-700 to-indigo-500 blur-[1px]" />
          <div className="absolute bottom-0 right-[-10%] h-52 w-3/4 rounded-t-[100%] bg-gradient-to-t from-violet-800 to-violet-600" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d1117] to-transparent" />
        </div>

        {/* sheen */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.16) 0%, transparent 38%)",
            ...layer(6),
          }}
          aria-hidden="true"
        />

        {/* foreground content (fastest) */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-7 text-white"
          style={layer(34)}
        >
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
              <Mountain className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium tracking-wide text-white/85">
              {en ? "Depth Pass" : "デプス・パス"}
            </span>
          </div>

          <div>
            <h3 className="text-3xl font-semibold leading-tight drop-shadow-lg">
              {en ? "Layers in motion" : "動く奥行き"}
            </h3>
            <p className="mt-2 max-w-[16rem] text-sm text-white/80">
              {en
                ? "Move your pointer — each plane drifts at its own depth."
                : "ポインターを動かすと、各面が固有の奥行きで漂います。"}
            </p>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0d1117] shadow-lg transition-transform hover:scale-[1.03]"
            >
              <Play className="h-4 w-4" />
              {en ? "Enter scene" : "シーンへ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
