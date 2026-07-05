import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "重なり積層ヒーロー",
  category: "Awwwards",
  description:
    "カードとタイポを大胆に重ね合わせ、Z軸の奥行きを演出するオーバーラップ構成のヒーロー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

export default function OverlapStackHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-ov relative w-full overflow-hidden bg-[#0d0b14] px-5 py-24 text-white sm:px-10 sm:py-32">
      <style>{`
        @keyframes aww-ov-in { from{opacity:0;transform:translateY(40px) scale(.96);} to{opacity:1;transform:translateY(0) scale(1);} }
        @keyframes aww-ov-tilt { 0%,100%{transform:rotate(-5deg) translateY(0);} 50%{transform:rotate(-5deg) translateY(-12px);} }
        .aww-ov-in{ animation: aww-ov-in 1s cubic-bezier(.16,1,.3,1) both; }
        .aww-ov-tilt{ animation: aww-ov-tilt 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .aww-ov-in,.aww-ov-tilt{animation:none!important;} }
      `}</style>

      <div className="relative mx-auto max-w-[1300px]">
        <h1
          className="aww-ov-in relative z-30 text-center font-black uppercase leading-[0.82] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem,14vw,12rem)" }}
        >
          <span className="block">Layered</span>
          <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Depth
          </span>
        </h1>

        {/* overlapping cards */}
        <div className="pointer-events-none relative mx-auto -mt-[18vw] h-[40vw] max-h-[420px] w-full max-w-3xl sm:-mt-[14vw]">
          <div
            className="aww-ov-in absolute left-0 top-6 z-10 h-40 w-56 rounded-2xl bg-[linear-gradient(135deg,#1e1b4b,#3730a3)] ring-1 ring-white/10 sm:h-56 sm:w-72"
            style={{ animationDelay: ".1s", transform: "rotate(-8deg)" }}
          />
          <div
            className="aww-ov-tilt absolute right-2 top-0 z-20 h-44 w-60 rounded-2xl bg-[linear-gradient(135deg,#0891b2,#22d3ee)] ring-1 ring-white/20 sm:h-60 sm:w-80"
          />
          <div
            className="aww-ov-in absolute left-1/2 top-16 z-40 flex h-36 w-52 -translate-x-1/2 items-center justify-center rounded-2xl bg-white/95 text-black ring-1 ring-black/10 backdrop-blur sm:h-44 sm:w-64"
            style={{ animationDelay: ".25s", transform: "translateX(-50%) rotate(3deg)" }}
          >
            <span className="text-center text-lg font-black leading-tight tracking-tight">
              {en ? (
                <>
                  Overlap
                  <br />
                  creates depth
                </>
              ) : (
                <>
                  重なりが
                  <br />
                  奥行きを生む
                </>
              )}
            </span>
          </div>
        </div>

        <p className="aww-ov-in relative z-30 mx-auto mt-10 max-w-md text-center text-base leading-relaxed text-white/55" style={{ animationDelay: ".35s" }}>
          {en
            ? "Deliberately overlapping elements brings a sense of physical layers to the flat web."
            : "要素を意図的に重ねることで、平面のWebに物理的なレイヤーの感覚を持ち込む。"}
        </p>
      </div>
    </section>
  );
}
