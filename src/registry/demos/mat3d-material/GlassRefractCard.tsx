import { useRef, useState } from "react";
import { Droplets, ShieldCheck } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Button } from "@/components/ui/button";

export const meta: DemoMeta = {
  name: "ガラス屈折カード",
  category: "3Dアニメ",
  description:
    "backdrop-blur と異なる translateZ の半透明レイヤーが、ポインターで微妙にパララックスして屈折感を出すフロストガラス。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "material", "card", "animation"],
  principle:
    "層がわずかにズレて重なる視差は、人の脳に『厚みのある透明体』を読み取らせ、奥行きと上質さを生む。",
};

type P = { x: number; y: number; active: boolean };
const REST: P = { x: 0, y: 0, active: false };

export default function GlassRefractCard() {
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

  const shift = (depth: number) => ({
    transform: `translate3d(${p.x * depth}px, ${p.y * depth}px, 0)`,
    transition: p.active
      ? "transform 90ms ease-out"
      : "transform 600ms cubic-bezier(0.22,1,0.36,1)",
  });

  return (
    <div
      className="flex w-full items-center justify-center px-4 py-12"
      style={{ perspective: "1000px" }}
    >
      {/* colorful backdrop so the blur/refraction is visible */}
      <div className="relative h-[360px] w-[330px]">
        <div className="absolute -left-10 top-4 h-40 w-40 rounded-full bg-fuchsia-500/70 blur-2xl" />
        <div className="absolute -right-8 bottom-6 h-44 w-44 rounded-full bg-sky-400/70 blur-2xl" />
        <div className="absolute left-16 top-24 h-36 w-36 rounded-full bg-amber-300/60 blur-2xl" />

        <div
          ref={ref}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="absolute inset-0 select-none rounded-[28px]"
          style={{
            transform: `rotateX(${p.y * -8}deg) rotateY(${p.x * 8}deg)`,
            transformStyle: "preserve-3d",
            transition: p.active
              ? "transform 90ms ease-out"
              : "transform 600ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* far glass pane */}
          <div
            className="absolute inset-0 rounded-[28px] border border-white/30 bg-white/10 backdrop-blur-xl"
            style={{
              boxShadow:
                "inset 0 1px 0 0 rgba(255,255,255,0.6), 0 30px 60px -25px rgba(0,0,0,0.5)",
              ...shift(8),
            }}
            aria-hidden="true"
          />
          {/* refraction tint layer (parallax more) */}
          <div
            className="absolute inset-3 rounded-[22px] border border-white/20 bg-gradient-to-br from-white/25 via-white/5 to-transparent backdrop-blur-md"
            style={shift(-14)}
            aria-hidden="true"
          />
          {/* specular streak */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 30%)",
              opacity: p.active ? 0.9 : 0.5,
              ...shift(20),
            }}
            aria-hidden="true"
          />

          {/* content (closest layer) */}
          <div
            className="absolute inset-0 flex flex-col justify-between p-7 text-white"
            style={shift(-26)}
          >
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 ring-1 ring-white/40 backdrop-blur">
                <Droplets className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium tracking-wide text-white/90">
                {en ? "Frosted Glass" : "フロストガラス"}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold drop-shadow-sm">
                {en ? "Refraction UI" : "屈折するUI"}
              </h3>
              <p className="mt-2 text-sm text-white/80">
                {en
                  ? "Layered panes parallax to fake real glass depth."
                  : "レイヤーが視差で動き、本物のガラスの奥行きを演出。"}
              </p>
              <Button
                size="sm"
                className="mt-5 border border-white/40 bg-white/20 text-white backdrop-blur hover:bg-white/30"
              >
                <ShieldCheck className="mr-1 h-4 w-4" />
                {en ? "Explore" : "詳しく見る"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
