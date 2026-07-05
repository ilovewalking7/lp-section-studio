import { Landmark } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "千本鳥居の回廊3D",
  category: "3Dアニメ",
  description:
    "朱色の鳥居がCSSパースで奥へと連なり、霧の中をゆっくり前進する伏見稲荷風の回廊。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "wafu", "japanese", "animation"],
  principle:
    "反復と一点透視の奥行きが、神聖さと没入感、揺るぎない信頼の印象を生む。",
};

function ToriiGate({ i }: { i: number }) {
  // gates recede: 0 (near) .. N (far)
  const z = -i * 220;
  const fade = Math.max(0, 1 - i * 0.085);
  return (
    <div
      className="utc-anim absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `translate(-50%, -50%) translateZ(${z}px)`,
        opacity: fade,
      }}
    >
      <svg
        width="300"
        height="340"
        viewBox="0 0 300 340"
        aria-hidden="true"
        style={{ filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.35))" }}
      >
        {/* top beam (kasagi) with upward curve */}
        <path
          d="M18 44 C 90 24 210 24 282 44 L282 70 C 210 50 90 50 18 70 Z"
          fill="#c83a26"
        />
        {/* second beam (shimaki) */}
        <rect x="34" y="86" width="232" height="20" fill="#d8462f" />
        {/* center tablet */}
        <rect x="132" y="50" width="36" height="40" fill="#1f1c1a" />
        <rect x="137" y="55" width="26" height="30" fill="#caa24a" />
        {/* left pillar */}
        <rect x="56" y="106" width="26" height="230" fill="#d8462f" />
        <rect x="56" y="106" width="8" height="230" fill="#e8643f" />
        {/* right pillar */}
        <rect x="218" y="106" width="26" height="230" fill="#c83a26" />
        <rect x="218" y="106" width="8" height="230" fill="#d8462f" />
        {/* tie beam (nuki) */}
        <rect x="48" y="138" width="204" height="16" fill="#b53321" />
      </svg>
    </div>
  );
}

export default function ToriiCorridor3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const gates = Array.from({ length: 9 }, (_, i) => i);

  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-[#1a0f0c] text-[#f3ead7]">
      <style>{`
        @keyframes utc-forward { 0%{transform:translateZ(0)} 100%{transform:translateZ(220px)} }
        @keyframes utc-fog { 0%,100%{opacity:0.4} 50%{opacity:0.62} }
        @media (prefers-reduced-motion: reduce){ .utc-anim,.utc-stage{animation:none!important} }
      `}</style>

      {/* depth gradient: warm far light to dark near */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,#5b2a1c_0%,#2c150f_55%,#160c09_100%)]" />

      {/* ground path */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(60,30,18,0.6)), repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 60px)",
        }}
      />

      {/* 3D stage */}
      <div className="absolute inset-0 [perspective:760px]">
        <div
          className="utc-stage absolute inset-0 [transform-style:preserve-3d]"
          style={{ animation: "utc-forward 9s linear infinite" }}
        >
          {gates.map((i) => (
            <ToriiGate key={`g${i}`} i={i} />
          ))}
        </div>
      </div>

      {/* distant glow at vanishing point */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3d28a]/30 blur-3xl" />

      {/* soft fog overlays */}
      <div
        className="utc-anim pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_55%,rgba(243,234,215,0.12),transparent_60%)]"
        style={{ animation: "utc-fog 8s ease-in-out infinite" }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#160c09] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#160c09] to-transparent" />

      {/* copy */}
      <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-end px-6 pb-16 text-center">
        <Badge
          variant="outline"
          className="mb-6 border-[#f3ead7]/25 bg-[#1a0f0c]/40 text-[#f3ead7]/85 backdrop-blur-sm"
        >
          <Landmark className="mr-1.5 h-3.5 w-3.5" />
          {en ? "Thousand Torii" : "千本鳥居"}
        </Badge>
        <h1 className="text-balance text-5xl font-semibold leading-[1.06] tracking-tight sm:text-7xl">
          {en ? (
            <>
              Walk the
              <br />
              <span className="text-[#e8643f]">vermilion path.</span>
            </>
          ) : (
            <>
              朱の回廊を、
              <br />
              <span className="text-[#e8643f]">奥へ。</span>
            </>
          )}
        </h1>
        <p className="mt-5 max-w-md text-pretty text-base text-[#f3ead7]/65 sm:text-lg">
          {en
            ? "Endless torii gates recede into fog and forward drift — pure CSS perspective, no images."
            : "朱の鳥居が霧の奥へ連なり、ゆっくり前進する。純粋なCSSパース、画像なし。"}
        </p>
      </div>
    </section>
  );
}
