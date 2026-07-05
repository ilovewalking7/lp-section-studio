import { useRef, useState } from "react";
import { Mountain } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "浮世絵・富士レイヤー",
  category: "3Dアニメ",
  description:
    "富士山・雲帯・日輪を木版調のフラットSVGで層に重ね、奥行きで視差させる全幅ヒーロー。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "wafu", "japanese", "animation"],
  principle:
    "象徴を平面の層に分け、奥行きで動かすことで、静謐さと高級感を同時に立ち上げる。",
};

type Pt = { x: number; y: number };

export default function UkiyoeMtFujiLayers() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const sectionRef = useRef<HTMLElement>(null);
  const [p, setP] = useState<Pt>({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    setP({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const layer = (depth: number, z = 0) => ({
    transform: `translate3d(${p.x * depth}px, ${p.y * depth}px, ${z}px)`,
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
      className="relative h-[600px] w-full overflow-hidden bg-[#f0e3c8] text-[#2a1d14] [perspective:1200px]"
    >
      <style>{`
        @keyframes umf-drift { 0%{transform:translateX(0)} 100%{transform:translateX(40px)} }
        @keyframes umf-drift2 { 0%{transform:translateX(0)} 100%{transform:translateX(-36px)} }
        @media (prefers-reduced-motion: reduce){ .umf-anim{animation:none!important} }
      `}</style>

      {/* sky gradient: dawn cream to apricot */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f5ecd6_0%,#f3dfb6_45%,#ecc58f_78%,#e0a874_100%)]" />

      {/* halftone grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(#7a5a3a 0.8px, transparent 0.9px)",
          backgroundSize: "6px 6px",
        }}
      />

      <div
        className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${-p.y * 3}deg) rotateY(${p.x * 4}deg)` }}
      >
        {/* sun disc 日輪 */}
        <div
          className="absolute left-[20%] top-[18%] h-40 w-40 rounded-full bg-[#d6452f] shadow-[0_0_50px_rgba(214,69,47,0.4)] transition-transform duration-200 ease-out"
          style={{ ...layer(-8, -150) }}
        />

        {/* far cloud band */}
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="umf-anim absolute left-0 top-[26%] h-24 w-full transition-transform duration-200 ease-out"
          style={{ ...layer(-4, -110), animation: "umf-drift 22s linear infinite alternate" }}
          aria-hidden="true"
        >
          <path
            d="M0 120 C 200 80 260 140 420 110 C 560 84 640 140 820 112 C 980 88 1060 140 1200 116 L1200 200 L0 200 Z"
            fill="#f6ecd6"
            opacity="0.78"
          />
        </svg>

        {/* Mt Fuji */}
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMax meet"
          className="absolute inset-0 h-full w-full transition-transform duration-200 ease-out"
          style={{ ...layer(20, -40) }}
          aria-hidden="true"
        >
          {/* base mountain 群青 */}
          <path
            d="M250 560 L560 250 C 585 226 615 226 640 250 L950 560 Z"
            fill="#33567f"
          />
          {/* shaded right slope */}
          <path d="M600 238 L950 560 L600 560 Z" fill="#2b486b" />
          {/* snow cap 生成り */}
          <path
            d="M520 290 C 545 320 560 304 580 320 C 596 308 610 326 626 312 C 642 326 658 308 680 322 L640 250 C 615 226 585 226 560 250 Z"
            fill="#f6ecd6"
          />
        </svg>

        {/* near cloud band */}
        <svg
          viewBox="0 0 1200 220"
          preserveAspectRatio="none"
          className="umf-anim absolute left-0 bottom-[20%] h-28 w-full transition-transform duration-200 ease-out"
          style={{ ...layer(36, 30), animation: "umf-drift2 18s linear infinite alternate" }}
          aria-hidden="true"
        >
          <path
            d="M0 140 C 180 96 280 156 460 124 C 620 96 720 158 900 126 C 1040 100 1120 152 1200 130 L1200 220 L0 220 Z"
            fill="#eadcbe"
          />
          <path
            d="M0 140 C 180 96 280 156 460 124 C 620 96 720 158 900 126"
            fill="none"
            stroke="#c9a878"
            strokeWidth="3"
            opacity="0.6"
          />
        </svg>

        {/* foreground hill 墨 */}
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full transition-transform duration-200 ease-out"
          style={{ ...layer(54, 70) }}
          aria-hidden="true"
        >
          <path
            d="M0 600 L0 540 C 200 500 360 560 600 540 C 840 520 1000 560 1200 530 L1200 600 Z"
            fill="#2a3b30"
          />
        </svg>
      </div>

      {/* copy */}
      <div
        className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-start justify-end px-8 pb-24 transition-transform duration-200 ease-out"
        style={layer(6, 0)}
      >
        <Badge
          variant="outline"
          className="mb-6 border-[#2a1d14]/20 bg-[#f5ecd6]/50 text-[#2a1d14]/80 backdrop-blur-sm"
        >
          <Mountain className="mr-1.5 h-3.5 w-3.5" />
          {en ? "Thirty-six Views" : "富嶽三十六景"}
        </Badge>
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-[#1f3552] sm:text-7xl">
          {en ? (
            <>
              A still
              <br />
              <span className="text-[#d6452f]">summit at dawn.</span>
            </>
          ) : (
            <>
              暁の富士、
              <br />
              <span className="text-[#d6452f]">静かに立つ。</span>
            </>
          )}
        </h1>
        <p className="mt-5 max-w-md text-pretty text-base text-[#3a2c1e]/75 sm:text-lg">
          {en
            ? "Woodblock layers of mountain, cloud and sun drift apart in depth — flat shapes, paper grain, no images."
            : "山・雲・日輪の木版レイヤーが奥行きで離れて動く。平面と紙の質感だけで、画像なし。"}
        </p>
      </div>
    </section>
  );
}
