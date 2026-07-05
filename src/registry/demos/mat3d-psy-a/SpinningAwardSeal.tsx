import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "回転アワード・シール",
  category: "3Dアニメ",
  description:
    "金属のアワード・メダルがrotateYで回転し鏡面スウィープと円形テキストで権威を演出。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "権威 — 第三者による受賞バッジは専門家の保証を借り、信頼の近道として購買判断を後押しする。",
};

export default function SpinningAwardSeal() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  const ringText = en
    ? "★ EDITORS CHOICE ★ BEST OF THE YEAR ★ "
    : "★ 年間ベスト受賞 ★ 編集部が選ぶ第一位 ★ ";

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-3xl bg-[radial-gradient(120%_120%_at_50%_30%,#161109_0%,#08060c_72%)] py-16">
      <style>{`
        @keyframes seal-spin { to { transform: rotateY(360deg); } }
        @keyframes seal-ring { to { transform: rotate(-360deg); } }
        @keyframes seal-sweep {
          0% { transform: translateX(-130%) skewX(-18deg); }
          55%,100% { transform: translateX(160%) skewX(-18deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .seal-spin, .seal-ring, .seal-sweep { animation: none !important; }
        }
      `}</style>

      <div
        className="relative"
        style={{ perspective: "900px", width: 240, height: 240 }}
        role="img"
        aria-label={en ? "Spinning award medal" : "回転するアワード・メダル"}
      >
        <div
          className="seal-spin absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            animation: "seal-spin 7s linear infinite",
            willChange: "transform",
          }}
        >
          {/* metallic disc */}
          <div
            className="absolute inset-0 overflow-hidden rounded-full"
            style={{
              background:
                "conic-gradient(from 210deg, #fff7e0, #e8b658, #b8841f, #fde9a6, #a9701a, #f7d680, #fff7e0)",
              boxShadow:
                "inset 0 2px 6px rgba(255,255,255,0.7), inset 0 -8px 18px rgba(90,55,5,0.7), 0 18px 50px -12px rgba(214,158,46,0.55)",
            }}
          >
            {/* inner bevel ring */}
            <div
              className="absolute inset-[12px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 38% 30%, #fff3cf 0%, #e3ad4d 42%, #9a6c16 100%)",
                boxShadow:
                  "inset 0 0 0 2px rgba(255,255,255,0.35), inset 0 6px 14px rgba(90,55,5,0.45)",
              }}
            />
            {/* center emblem */}
            <div className="absolute inset-[42px] flex flex-col items-center justify-center rounded-full bg-[radial-gradient(circle_at_40%_32%,#3a2a08,#1c1405)] text-center">
              <div className="text-3xl font-black leading-none text-amber-200 drop-shadow">
                #1
              </div>
              <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-100/80">
                {en ? "2026" : "2026年"}
              </div>
            </div>

            {/* moving specular sweep */}
            <div
              className="seal-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
                animation: "seal-sweep 4.5s ease-in-out infinite",
                willChange: "transform",
              }}
            />
          </div>

          {/* rotating circular text */}
          <div
            className="seal-ring absolute inset-0"
            style={{ animation: "seal-ring 16s linear infinite", willChange: "transform" }}
          >
            <svg viewBox="0 0 240 240" className="h-full w-full">
              <defs>
                <path
                  id="seal-textpath"
                  d="M120,120 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0"
                  fill="none"
                />
              </defs>
              <text
                fill="#4a3408"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "2px",
                }}
              >
                <textPath href="#seal-textpath" xlinkHref="#seal-textpath">
                  {ringText + ringText}
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-md px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-200/70">
          {en ? "Awarded & verified" : "受賞・第三者認定"}
        </p>
        <p className="mt-3 text-pretty text-sm text-amber-50/70">
          {en
            ? "Independently reviewed and ranked first by industry editors — recognition you can rely on."
            : "業界編集部による独立審査で第一位。第三者が認めた、頼れる実績です。"}
        </p>
      </div>
    </div>
  );
}
