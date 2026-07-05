import { useRef, useState } from "react";
import { Waves } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "浮世絵・波パララックス",
  category: "3Dアニメ",
  description:
    "神奈川沖浪裏に着想した、藍と朱の波を多層SVGで描き、マウスで奥行きごとに視差する全幅ヒーロー。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "wafu", "japanese", "animation"],
  principle:
    "余白と奥行き、伝統色の抑制が、画面に静かな格式と信頼感を宿す。",
};

type Pt = { x: number; y: number };

export default function UkiyoeWaveParallax() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const sectionRef = useRef<HTMLElement>(null);
  const [p, setP] = useState<Pt>({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setP({ x: nx, y: ny });
  };

  const layer = (depth: number, z = 0) => ({
    transform: `translate3d(${p.x * depth}px, ${p.y * depth}px, ${z}px)`,
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
      className="relative h-[600px] w-full overflow-hidden bg-[#0c1d33] text-[#f3ead7] [perspective:1200px]"
    >
      <style>{`
        @keyframes uwp-swell { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes uwp-foam { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-12px)} }
        @media (prefers-reduced-motion: reduce){ .uwp-anim{animation:none!important} }
      `}</style>

      {/* sky wash: indigo to cream horizon */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,#16365c_0%,#0c1d33_45%,#091627_100%)]" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(80%_60%_at_70%_18%,rgba(243,234,215,0.16),transparent_60%)]" />

      {/* paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 20% 30%, #fff 0 1px, transparent 1px 3px),repeating-radial-gradient(circle at 80% 70%, #000 0 1px, transparent 1px 4px)",
          backgroundSize: "7px 7px, 9px 9px",
        }}
      />

      <div
        className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${-p.y * 4}deg) rotateY(${p.x * 4}deg)` }}
      >
        {/* far moon */}
        <div
          className="uwp-anim absolute left-[64%] top-[16%] h-28 w-28 rounded-full bg-[#f3ead7]/85 shadow-[0_0_60px_rgba(243,234,215,0.35)] transition-transform duration-200 ease-out"
          style={{ ...layer(-10, -140), animation: "uwp-swell 11s ease-in-out infinite" }}
        />

        {/* back wave */}
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full transition-transform duration-200 ease-out"
          style={{ ...layer(16, -90) }}
          aria-hidden="true"
        >
          <path
            d="M0 460 C 220 360 360 520 560 470 C 760 420 880 300 1040 360 C 1140 398 1180 470 1200 500 L1200 600 L0 600 Z"
            fill="#1d4a7a"
          />
        </svg>

        {/* mid wave with foam crest */}
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMax slice"
          className="uwp-anim absolute inset-0 h-full w-full transition-transform duration-200 ease-out"
          style={{ ...layer(30, -30), animation: "uwp-swell 8s ease-in-out infinite" }}
          aria-hidden="true"
        >
          <path
            d="M0 520 C 180 440 300 560 470 500 C 620 446 700 360 840 410 C 960 452 1010 360 1130 396 C 1170 408 1190 470 1200 510 L1200 600 L0 600 Z"
            fill="#27619c"
          />
          <path
            d="M0 520 C 180 440 300 560 470 500 C 620 446 700 360 840 410"
            fill="none"
            stroke="#eef4f7"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* foam flecks */}
          {[
            [220, 470],
            [470, 500],
            [640, 452],
            [820, 412],
          ].map(([cx, cy], i) => (
            <circle key={`f${i}`} cx={cx} cy={cy} r={7 - (i % 3)} fill="#eef4f7" opacity="0.8" />
          ))}
        </svg>

        {/* front breaking wave + claws */}
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMax slice"
          className="uwp-anim absolute inset-0 h-full w-full transition-transform duration-200 ease-out"
          style={{ ...layer(52, 40), animation: "uwp-foam 9s ease-in-out infinite" }}
          aria-hidden="true"
        >
          <path
            d="M0 600 L0 540 C 160 500 240 600 380 560 C 470 532 470 430 560 460 C 470 480 510 540 600 560 C 760 600 760 480 920 520 C 1060 556 1100 600 1200 580 L1200 600 Z"
            fill="#13355c"
          />
          <path
            d="M540 470 C 600 430 660 420 720 440 C 690 444 670 458 660 476 C 700 470 730 472 752 488 C 716 484 690 496 678 516"
            fill="none"
            stroke="#f3ead7"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* 朱 accent foam */}
          <circle cx="700" cy="450" r="10" fill="#c5402e" opacity="0.85" />
          <circle cx="372" cy="556" r="8" fill="#c5402e" opacity="0.7" />
        </svg>
      </div>

      {/* foreground copy */}
      <div
        className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-start justify-center px-8 transition-transform duration-200 ease-out"
        style={layer(6, 0)}
      >
        <Badge
          variant="outline"
          className="mb-7 border-[#f3ead7]/25 bg-[#0c1d33]/40 text-[#f3ead7]/85 backdrop-blur-sm"
        >
          <Waves className="mr-1.5 h-3.5 w-3.5" />
          {en ? "The Great Wave" : "神奈川沖浪裏"}
        </Badge>
        <h1 className="text-balance text-5xl font-semibold leading-[1.06] tracking-tight sm:text-7xl">
          {en ? (
            <>
              Ride the
              <br />
              <span className="text-[#c5402e]">great wave.</span>
            </>
          ) : (
            <>
              藍の波濤、
              <br />
              <span className="text-[#c5402e]">沖に立つ。</span>
            </>
          )}
        </h1>
        <p className="mt-6 max-w-md text-pretty text-base text-[#f3ead7]/65 sm:text-lg">
          {en
            ? "Layered indigo swells drift in depth as you move — a stylized woodblock sea, pure CSS and SVG."
            : "動かすほど藍の波が奥行きで揺れる。木版を思わせる海を、CSSとSVGだけで。"}
        </p>
      </div>
    </section>
  );
}
