import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Button } from "@/components/ui/button";

export const meta: DemoMeta = {
  name: "スポットライトCTA 3D",
  category: "3Dアニメ",
  description:
    "暗いステージで漂う3Dスポットライトが視線を、わずかに傾いた発光CTAへ誘導する。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "注意誘導 — 動く光と単一の明るい焦点が視線を一点に集め、迷わせず行動（クリック）へ導く。",
};

export default function SpotlightCTA3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  // 0..1 のドリフト位相。レイアウトは読まず、純粋な時間ベースで光を動かす。
  const [t, setT] = useState(0.5);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    let start = 0;
    const loop = (now: number) => {
      if (!start) start = now;
      const sec = (now - start) / 1000;
      // ゆっくり左右に振れて最後はCTA(右下寄り)に寄る、を繰り返す
      setT((Math.sin(sec * 0.6) + 1) / 2);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // 光源は左上(25%,30%)からCTA付近(68%,66%)の間を往復
  const lx = 25 + t * 43;
  const ly = 30 + t * 36;
  const orbX = `${lx}%`;
  const orbY = `${ly}%`;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#050509] py-24 text-white"
      style={{ perspective: "1100px" }}
    >
      {/* base darkness + subtle floor */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(140%_110%_at_50%_120%,rgba(40,30,90,0.28),transparent_60%)]" />

      {/* the moving spotlight cone projected onto the scene */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-100 ease-linear"
        style={{
          background: `radial-gradient(420px 420px at ${orbX} ${orbY}, rgba(168,150,255,0.22), rgba(120,100,240,0.08) 38%, transparent 66%)`,
        }}
      />

      {/* the physical spotlight orb (3D bloom) */}
      <div
        className="pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[left,top] duration-100 ease-linear"
        style={{
          left: orbX,
          top: orbY,
          background:
            "radial-gradient(circle at 38% 34%, #ffffff 0%, #d9d2ff 28%, #8b7bff 60%, rgba(99,80,255,0) 72%)",
          boxShadow:
            "0 0 60px 20px rgba(139,123,255,0.45), 0 0 120px 40px rgba(99,80,255,0.25)",
          filter: "blur(0.5px)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.34em] text-indigo-200/60">
          {en ? "One clear next step" : "次の一歩は、ひとつだけ"}
        </p>
        <h2 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-white/95 sm:text-6xl">
          {en ? (
            <>
              Don&rsquo;t make
              <br />
              them think.
            </>
          ) : (
            <>
              迷わせない、
              <br />
              ただ進ませる。
            </>
          )}
        </h2>
        <p className="mt-6 max-w-lg text-pretty text-base text-white/45 sm:text-lg">
          {en
            ? "The light leads the eye. One button, glowing, waiting — the only thing left to do."
            : "光が視線を導く。輝く一つのボタン。あなたに残された動作は、たった一つ。"}
        </p>

        {/* the CTA on a slight 3D tilt, brightest object on the stage */}
        <div
          className="mt-12"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            style={{
              transform: "rotateX(14deg) rotateZ(-2deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <Button
              size="lg"
              className="relative h-12 rounded-xl border border-white/30 bg-gradient-to-b from-indigo-300 to-indigo-500 px-8 text-base font-semibold text-indigo-950 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_22px_50px_-12px_rgba(129,109,255,0.9)] hover:from-indigo-200 hover:to-indigo-400"
            >
              {en ? "Start free now" : "今すぐ無料で始める"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          {/* contact shadow under the tilted button */}
          <div
            className="mx-auto mt-2 h-3 w-40 rounded-full bg-indigo-500/40 blur-md"
            aria-hidden
          />
        </div>

        <p className="mt-6 text-xs text-white/35">
          {en ? "No card required · 2-minute setup" : "カード不要・2分で開始"}
        </p>
      </div>
    </section>
  );
}
