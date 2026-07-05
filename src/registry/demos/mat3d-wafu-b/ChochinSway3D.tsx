import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "提灯スウェイ",
  category: "3Dアニメ",
  description:
    "和紙の提灯が内側から灯り、3Dの振り子でゆっくり揺れる。奥行きと朱の文字帯。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "wafu", "japanese", "materials", "animation"],
  principle:
    "和紙を透ける暖色の灯りと揺らぎは祭りの郷愁を呼び、唯一無二の温もりを演出する。",
};

type Lantern = {
  text: string;
  textEn: string;
  z: number;
  x: number;
  scale: number;
  delay: number;
  dur: number;
};

const LANTERNS: Lantern[] = [
  { text: "祭", textEn: "FEST", z: -120, x: -150, scale: 0.78, delay: 0.0, dur: 4.6 },
  { text: "灯", textEn: "LITE", z: -40, x: 150, scale: 0.86, delay: 0.7, dur: 5.2 },
  { text: "和", textEn: "WA", z: 60, x: 0, scale: 1, delay: 0.3, dur: 4.9 },
];

export default function ChochinSway3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <div className="relative flex w-full items-start justify-center overflow-hidden rounded-3xl bg-[radial-gradient(120%_120%_at_50%_-10%,#1a0c08_0%,#070403_70%)] pb-16 pt-10">
      <style>{`
        @keyframes chs-sway {
          0%,100% { transform: rotateZ(var(--chs-a)) rotateX(4deg); }
          50%     { transform: rotateZ(calc(var(--chs-a) * -1)) rotateX(-2deg); }
        }
        @keyframes chs-flicker {
          0%,100% { opacity: 0.92; }
          45%     { opacity: 1; }
          70%     { opacity: 0.86; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chs-arm { animation: none !important; }
          .chs-core { animation: none !important; opacity: .95 !important; }
        }
      `}</style>

      <div
        className="relative h-[340px] w-full max-w-xl"
        style={{ perspective: "1100px" }}
        role="img"
        aria-label={en ? "Swaying paper lanterns" : "揺れる和紙の提灯"}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {LANTERNS.map((l, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-0"
              style={{
                transform: `translateX(calc(-50% + ${l.x}px)) translateZ(${l.z}px) scale(${l.scale})`,
                transformStyle: "preserve-3d",
                zIndex: Math.round(l.z) + 200,
              }}
            >
              {/* hanging cord */}
              <div
                className="absolute left-1/2 top-0 h-12 w-[2px] -translate-x-1/2"
                style={{ background: "rgba(120,70,30,0.7)" }}
              />
              {/* swinging arm (pendulum origin at top) */}
              <div
                className="chs-arm relative origin-top"
                style={
                  {
                    marginTop: 12,
                    transformStyle: "preserve-3d",
                    ["--chs-a"]: `${5 + (i % 2) * 2}deg`,
                    animation: `chs-sway ${l.dur}s ease-in-out ${l.delay}s infinite`,
                  } as React.CSSProperties
                }
              >
                {/* top cap */}
                <div
                  className="mx-auto h-3 w-10 rounded-t-sm"
                  style={{
                    background:
                      "linear-gradient(180deg,#3a2008,#1d1004)",
                    boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.5)",
                  }}
                />
                {/* lantern body — washi glowing from within */}
                <div
                  className="relative mx-auto h-32 w-24 overflow-hidden"
                  style={{
                    borderRadius: "44% 44% 44% 44% / 30% 30% 30% 30%",
                    background:
                      "radial-gradient(60% 55% at 50% 45%, #ffe9b0 0%, #ffba5c 38%, #f0863a 72%, #c85b22 100%)",
                    boxShadow:
                      "0 0 34px rgba(255,150,60,0.55), inset 0 0 26px rgba(255,120,40,0.4), inset 0 0 0 1.5px rgba(120,60,20,0.5)",
                  }}
                >
                  {/* inner glow core flicker */}
                  <div
                    className="chs-core pointer-events-none absolute left-1/2 top-1/2 h-16 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,245,200,0.95) 0%, rgba(255,180,90,0.4) 60%, rgba(255,180,90,0) 100%)",
                      animation: `chs-flicker ${2.4 + (i % 3) * 0.5}s ease-in-out ${l.delay}s infinite`,
                    }}
                  />
                  {/* washi ribs (bamboo frame) */}
                  <div className="pointer-events-none absolute inset-0">
                    {[18, 38, 58, 78, 98].map((t) => (
                      <div
                        key={t}
                        className="absolute inset-x-0"
                        style={{
                          top: t,
                          height: 1.5,
                          background: "rgba(150,80,30,0.4)",
                          boxShadow: "0 1px 0 rgba(255,230,180,0.25)",
                        }}
                      />
                    ))}
                  </div>
                  {/* 朱 text band */}
                  <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center">
                    <span
                      className="text-2xl font-black"
                      style={{
                        color: "#8a1409",
                        textShadow: "0 1px 1px rgba(255,220,170,0.6)",
                      }}
                    >
                      {en ? l.textEn : l.text}
                    </span>
                  </div>
                </div>
                {/* bottom cap */}
                <div
                  className="mx-auto h-3 w-10 rounded-b-sm"
                  style={{
                    background: "linear-gradient(180deg,#1d1004,#3a2008)",
                  }}
                />
                {/* tassel */}
                <div
                  className="mx-auto mt-0.5 h-5 w-[3px]"
                  style={{
                    background:
                      "linear-gradient(180deg,#b5400f,rgba(181,64,15,0))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.34em] text-amber-200/75">
          {en ? "Washi Paper Lanterns" : "和紙提灯 · 夜祭"}
        </p>
      </div>
    </div>
  );
}
