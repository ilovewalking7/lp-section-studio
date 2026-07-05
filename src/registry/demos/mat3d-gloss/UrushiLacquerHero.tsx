import type { DemoMeta } from "@/registry";
import { Sparkles } from "lucide-react";

export const meta: DemoMeta = {
  name: "漆 ラッカーヒーロー",
  category: "3Dアニメ",
  description:
    "深い漆黒の漆面に金箔のアクセント。白いスペキュラ帯がゆっくり横切る和の高級ヒーロー。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "gloss", "materials", "animation"],
  principle:
    "鏡面のツヤと金の艶めきは“手間をかけた本物＝高級”を一瞬で伝え、価格を正当化する。",
};

export default function UrushiLacquerHero() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <section
      className="relative w-full overflow-hidden rounded-[28px] px-8 py-20 sm:px-14 sm:py-28"
      style={{
        background:
          "radial-gradient(140% 120% at 22% 0%, #25140f 0%, #120705 46%, #050202 100%)",
      }}
    >
      <style>{`
        @keyframes urushi-sweep {
          0%   { transform: translateX(-60%) rotate(14deg); opacity: 0; }
          12%  { opacity: 0.9; }
          50%  { opacity: 0.9; }
          88%  { opacity: 0; }
          100% { transform: translateX(160%) rotate(14deg); opacity: 0; }
        }
        @keyframes urushi-gold {
          0%,100% { opacity: 0.55; }
          50%     { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .urushi-sweep { animation: none !important; opacity: 0.5 !important; transform: translateX(48%) rotate(14deg) !important; }
          .urushi-gold  { animation: none !important; opacity: 0.9 !important; }
        }
      `}</style>

      {/* lacquer depth sheen */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 70% 110%, rgba(120,30,18,0.45) 0%, rgba(0,0,0,0) 60%)",
        }}
      />

      {/* gold-leaf flecks */}
      <div className="pointer-events-none absolute inset-0">
        {GOLD_FLECKS.map((f, i) => (
          <span
            key={`fleck-${i}`}
            className="urushi-gold absolute rounded-[2px]"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.s,
              height: f.s * 0.7,
              transform: `rotate(${f.r}deg)`,
              background:
                "linear-gradient(135deg, #fff3c4 0%, #e8b84b 45%, #b3801f 100%)",
              boxShadow: "0 0 6px rgba(232,184,75,0.6)",
              animation: `urushi-gold ${f.d}s ease-in-out ${f.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* moving white specular band */}
      <div
        className="urushi-sweep pointer-events-none absolute -inset-y-10 left-0 w-2/5"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.16) 38%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.16) 62%, rgba(255,255,255,0) 100%)",
          mixBlendMode: "screen",
          filter: "blur(2px)",
          animation: "urushi-sweep 7s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <span
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-200/90"
          style={{ textShadow: "0 1px 8px rgba(232,184,75,0.4)" }}
        >
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />
          {en ? "Maki-e Edition" : "蒔絵 限定"}
        </span>

        <h1
          className="text-4xl font-black leading-[1.05] tracking-tight text-amber-50 sm:text-6xl"
          style={{
            textShadow:
              "0 1px 0 rgba(255,255,255,0.18), 0 18px 40px rgba(0,0,0,0.6)",
          }}
        >
          {en ? (
            <>
              The depth of{" "}
              <span
                style={{
                  background:
                    "linear-gradient(100deg, #ffe7a6 0%, #e8b84b 40%, #fff3c4 70%, #c8902a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                black lacquer
              </span>
            </>
          ) : (
            <>
              漆黒に宿る
              <span
                style={{
                  background:
                    "linear-gradient(100deg, #ffe7a6 0%, #e8b84b 40%, #fff3c4 70%, #c8902a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                黄金の艶
              </span>
            </>
          )}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-amber-100/55 sm:text-lg">
          {en
            ? "Hand-burnished over many coats, the surface holds light like still water — a luster only time and craft can give."
            : "幾度も塗り重ね、丹念に磨き上げた面は、静かな水のように光を湛える。時と技だけが生む、本物の艶。"}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <span
            className="rounded-full px-7 py-3 text-sm font-bold text-[#1a0d06]"
            style={{
              background:
                "linear-gradient(135deg, #fff3c4 0%, #e8b84b 50%, #c8902a 100%)",
              boxShadow:
                "0 10px 30px rgba(200,144,42,0.4), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            {en ? "Discover the craft" : "技を知る"}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-amber-200/45">
            {en ? "Kyoto · Since 1789" : "京都 · 寛政元年創業"}
          </span>
        </div>
      </div>
    </section>
  );
}

const GOLD_FLECKS: {
  x: number;
  y: number;
  s: number;
  r: number;
  d: number;
  delay: number;
}[] = [
  { x: 10, y: 22, s: 7, r: 18, d: 3.2, delay: 0 },
  { x: 26, y: 70, s: 5, r: -32, d: 4.1, delay: 0.6 },
  { x: 78, y: 30, s: 9, r: 44, d: 3.6, delay: 1.1 },
  { x: 88, y: 64, s: 6, r: -12, d: 4.4, delay: 0.3 },
  { x: 62, y: 14, s: 4, r: 70, d: 2.9, delay: 1.4 },
  { x: 44, y: 84, s: 8, r: -50, d: 3.9, delay: 0.9 },
  { x: 70, y: 88, s: 5, r: 24, d: 4.2, delay: 1.7 },
  { x: 16, y: 50, s: 6, r: -8, d: 3.4, delay: 2.0 },
];
