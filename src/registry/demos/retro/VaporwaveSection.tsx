import { Cloud, Disc3, Palette } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ヴェイパーウェイヴ",
  category: "レトロ・Y2K",
  description:
    "パステルピンクとシアン、ローマ彫像のSVGで構成したヴェイパーウェイヴ・セクション。",
  align: "full",
  isNew: true,
  tags: ["retro", "y2k", "vaporwave", "pastel"],
};

const features = [
  {
    icon: Disc3,
    title: "A E S T H E T I C",
    body: "80年代の質感を、現代のピクセルで再構築。",
    bodyEn: "'80s textures, rebuilt in modern pixels.",
  },
  {
    icon: Cloud,
    title: "D R E A M Y",
    body: "やわらかなパステルが包む、夢のようなUI。",
    bodyEn: "A dreamlike UI wrapped in soft pastels.",
  },
  {
    icon: Palette,
    title: "P A S T E L",
    body: "ピンクとシアンの調和が生む、静かな高揚感。",
    bodyEn: "Pink and cyan in harmony — a quiet euphoria.",
  },
];

export default function VaporwaveSection() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#ffd6f5] via-[#c4b5fd] to-[#a5f3fc] px-6 py-20">
      {/* grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
          {/* Roman bust SVG */}
          <div className="shrink-0">
            <svg width="200" height="220" viewBox="0 0 200 220" aria-hidden>
              <defs>
                <linearGradient id="vw-bust" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#fbcfe8" />
                  <stop offset="100%" stopColor="#a5b4fc" />
                </linearGradient>
              </defs>
              {/* pedestal */}
              <rect x="55" y="195" width="90" height="18" rx="3" fill="url(#vw-bust)" opacity="0.9" />
              <rect x="68" y="170" width="64" height="30" fill="url(#vw-bust)" />
              {/* neck + head */}
              <path
                d="M75 175 Q72 140 80 120 Q70 110 72 85 Q74 45 100 42 Q126 45 128 85 Q130 110 120 120 Q128 140 125 175 Z"
                fill="url(#vw-bust)"
              />
              {/* hair */}
              <path
                d="M72 85 Q70 38 100 36 Q130 38 128 85 Q120 60 100 58 Q80 60 72 85 Z"
                fill="#e9d5ff"
              />
              {/* face details */}
              <ellipse cx="88" cy="92" rx="3.5" ry="2.5" fill="#a5b4fc" opacity="0.7" />
              <ellipse cx="112" cy="92" rx="3.5" ry="2.5" fill="#a5b4fc" opacity="0.7" />
              <path d="M100 95 L100 108 L96 110" stroke="#c4b5fd" strokeWidth="2" fill="none" />
              <path d="M92 120 Q100 125 108 120" stroke="#c4b5fd" strokeWidth="2" fill="none" />
            </svg>
          </div>

          <div className="text-center md:text-left">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#db2777]">
              {en ? "virtual aesthetic" : "バーチャル美学"}
            </p>
            <h2
              className="mt-3 text-4xl font-black uppercase tracking-wide text-white sm:text-5xl"
              style={{ textShadow: "3px 3px 0 #f472b6, 6px 6px 0 #67e8f9" }}
            >
              {en ? "New nostalgia" : "新しい郷愁"}
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base text-[#6d28d9]">
              {en
                ? "Where past and future melt together. Feel the digital calm inside a pastel haze."
                : "過去と未来が溶け合う場所。パステルの霞の中で、デジタルな静けさを体験してください。"}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, body, bodyEn }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/60 bg-white/40 p-6 backdrop-blur-sm"
              style={{ boxShadow: "0 8px 24px rgba(167,139,250,0.3)" }}
            >
              <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-[#f472b6] to-[#67e8f9] text-white shadow-[0_0_16px_rgba(244,114,182,0.5)]">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 font-mono text-sm font-bold tracking-wide text-[#7c3aed]">
                {title}
              </h3>
              <p className="mt-2 text-sm text-[#6d28d9]/80">{en ? bodyEn : body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
