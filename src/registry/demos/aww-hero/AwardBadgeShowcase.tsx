import type { DemoMeta } from "@/registry";
import { Award, Star } from "lucide-react";

export const meta: DemoMeta = {
  name: "受賞バッジショーケース",
  category: "Awwwards",
  description:
    "回転する受賞バッジと実績指標を主役にした、アワード受賞風のフルブリードショーケース。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

const BADGES = [
  { label: "Site of the Day", y: "FEB 2026", ac: "#fbbf24" },
  { label: "Developer Award", y: "JAN 2026", ac: "#34d399" },
  { label: "Honorable Mention", y: "DEC 2025", ac: "#f472b6" },
];

function SpinBadge({ color }: { color: string }) {
  const text = "★ AWARD WINNING · CRAFTED WITH CARE · ";
  return (
    <div className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-40">
      <svg viewBox="0 0 200 200" className="aww-ab-spin h-full w-full">
        <defs>
          <path id="aww-ab-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text fontSize="13" fontWeight="700" letterSpacing="1.5" fill={color}>
          <textPath href="#aww-ab-circle">{text + text}</textPath>
        </text>
      </svg>
      <span
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-20 sm:w-20"
        style={{ background: color, color: "#0a0a0a" }}
      >
        <Award className="size-8 sm:size-9" />
      </span>
    </div>
  );
}

export default function AwardBadgeShowcase() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-ab relative w-full overflow-hidden bg-[#0a0a0a] px-5 py-20 text-white sm:px-10 sm:py-28">
      <style>{`
        @keyframes aww-ab-rot { from{transform:rotate(0);} to{transform:rotate(360deg);} }
        @keyframes aww-ab-up { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        .aww-ab-spin{ animation: aww-ab-rot 18s linear infinite; transform-origin:center; }
        .aww-ab-up{ animation: aww-ab-up .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce){ .aww-ab-spin,.aww-ab-up{ animation:none!important; } }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1300px]">
        <div className="aww-ab-up mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300">
            <Star className="size-3.5" /> Recognition
          </span>
          <h1
            className="mt-7 font-black leading-[0.86] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.6rem,9vw,8rem)" }}
          >
            {en ? (
              <>
                An obsession
                <br />
                with detail.
              </>
            ) : (
              <>
                称賛される、
                <br />
                細部への執着。
              </>
            )}
          </h1>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {BADGES.map((b, i) => (
            <div
              key={b.label}
              className="aww-ab-up flex flex-col items-center gap-5 rounded-[1.5rem] bg-white/[0.04] p-8 text-center ring-1 ring-white/10"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <SpinBadge color={b.ac} />
              <div>
                <div className="text-lg font-bold tracking-tight">{b.label}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40">
                  {b.y}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
