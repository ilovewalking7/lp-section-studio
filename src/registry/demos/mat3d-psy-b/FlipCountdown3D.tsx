import { useEffect, useRef, useState } from "react";
import { Clock, Flame } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "フリップ・カウントダウン 3D",
  category: "3Dアニメ",
  description:
    "preserve-3dでカードがrotateXめくれる3Dフリップ時計。HH:MM:SSで締切までを刻む。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "希少性・締切 — 残り時間が刻一刻と減る可視化は「今すぐ」の行動を強く後押しする。",
};

const START_SECONDS = 5 * 3600 + 42 * 60 + 18; // 05:42:18

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function FlipCountdown3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [remaining, setRemaining] = useState(START_SECONDS);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = prefersReduced();
    const id = setInterval(() => {
      setRemaining((s) => (s <= 0 ? START_SECONDS : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const hh = Math.floor(remaining / 3600);
  const mm = Math.floor((remaining % 3600) / 60);
  const ss = remaining % 60;

  const groups: { value: number; label: string; labelEn: string }[] = [
    { value: hh, label: "時", labelEn: "HRS" },
    { value: mm, label: "分", labelEn: "MIN" },
    { value: ss, label: "秒", labelEn: "SEC" },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-7 rounded-3xl bg-[radial-gradient(120%_120%_at_50%_0%,#1c0d0d_0%,#0a0606_72%)] py-16 text-white">
      <style>{`
        @keyframes fc3d-flip {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-180deg); }
        }
      `}</style>

      <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-rose-200">
        <Flame className="h-3.5 w-3.5" />
        {en ? "Offer ends soon" : "オファー間もなく終了"}
      </span>

      <p className="inline-flex items-center gap-2 text-sm text-white/55">
        <Clock className="h-4 w-4" />
        {en ? "Limited-time price" : "期間限定プライス"}
      </p>

      <div className="flex items-end gap-3 sm:gap-5">
        {groups.map((g, i) => (
          <div key={g.labelEn} className="flex items-end gap-3 sm:gap-5">
            <FlipUnit
              value={g.value}
              label={en ? g.labelEn : g.label}
              reducedRef={reducedRef}
            />
            {i < groups.length - 1 && (
              <span
                className="mb-7 text-4xl font-black text-rose-300/70"
                aria-hidden="true"
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_-8px_rgba(244,63,94,0.7)] transition hover:bg-rose-400"
      >
        {en ? "Claim the deal now" : "今すぐ受け取る"}
      </button>
    </div>
  );
}

function FlipUnit({
  value,
  label,
  reducedRef,
}: {
  value: number;
  label: string;
  reducedRef: React.MutableRefObject<boolean>;
}) {
  const text = String(value).padStart(2, "0");
  const prevRef = useRef(text);
  const [flipping, setFlipping] = useState(false);
  const prev = prevRef.current;

  useEffect(() => {
    if (prevRef.current === text) return;
    if (reducedRef.current) {
      // reduced motion: just update, no flip animation
      prevRef.current = text;
      return;
    }
    setFlipping(true);
    const t = setTimeout(() => {
      prevRef.current = text;
      setFlipping(false);
    }, 600);
    return () => clearTimeout(t);
  }, [text, reducedRef]);

  // when not flipping, show current value statically
  const top = flipping ? prev : text;
  const bottom = flipping ? prev : text;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative h-[92px] w-[72px] sm:h-[104px] sm:w-[82px]"
        style={{ perspective: "320px" }}
      >
        {/* static bottom half showing the NEW value (revealed under the flip) */}
        <Half kind="bottom" text={text} />
        {/* static top half showing the OLD value */}
        <Half kind="top" text={top} />

        {flipping && (
          <>
            {/* flipping top: old value rotating down */}
            <div
              className="absolute left-0 top-0 h-1/2 w-full"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "bottom",
                backfaceVisibility: "hidden",
                animation: "fc3d-flip 0.6s cubic-bezier(.36,.66,.4,1) forwards",
                zIndex: 3,
              }}
            >
              <HalfFace kind="top" text={prev} />
            </div>
            {/* the lower static is the new bottom already rendered above */}
            <span className="sr-only">{bottom}</span>
          </>
        )}

        {/* divider line */}
        <div className="absolute left-0 top-1/2 z-10 h-px w-full -translate-y-1/2 bg-black/60" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
        {label}
      </span>
    </div>
  );
}

function Half({ kind, text }: { kind: "top" | "bottom"; text: string }) {
  return (
    <div
      className={`absolute left-0 h-1/2 w-full overflow-hidden ${
        kind === "top" ? "top-0 rounded-t-xl" : "bottom-0 rounded-b-xl"
      }`}
    >
      <HalfFace kind={kind} text={text} />
    </div>
  );
}

function HalfFace({ kind, text }: { kind: "top" | "bottom"; text: string }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        kind === "top" ? "rounded-t-xl" : "rounded-b-xl"
      }`}
      style={{
        background:
          kind === "top"
            ? "linear-gradient(180deg,#2a1416 0%,#1a0d0e 100%)"
            : "linear-gradient(180deg,#150a0b 0%,#0e0607 100%)",
        boxShadow:
          kind === "top"
            ? "inset 0 1px 0 rgba(255,255,255,0.08)"
            : "inset 0 -1px 0 rgba(0,0,0,0.6)",
      }}
    >
      <span
        className="absolute left-0 flex w-full items-center justify-center text-5xl font-black tabular-nums text-rose-50 sm:text-6xl"
        style={{
          height: "200%",
          top: kind === "top" ? 0 : "-100%",
          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        {text}
      </span>
    </div>
  );
}
