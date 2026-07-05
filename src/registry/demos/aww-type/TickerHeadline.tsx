import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ティッカー見出し",
  category: "Awwwards",
  description: "上下を流れるティッカー帯に挟まれた、停止した特大見出しのコンポジション。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

const ITEMS = [
  "NEW DROP",
  "SOLD OUT",
  "RESTOCK SOON",
  "MEMBERS ONLY",
  "WORLDWIDE",
];

function Ticker({ reverse, dark }: { reverse?: boolean; dark?: boolean }) {
  return (
    <div
      className={
        "flex w-full overflow-hidden border-y py-3 " +
        (dark
          ? "border-neutral-800 bg-neutral-950 text-neutral-50"
          : "border-neutral-200 bg-neutral-50 text-neutral-950")
      }
    >
      <div className="flex w-max">
        {[0, 1].map((k) => (
          <div
            key={k}
            className="aww-tk-track flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 text-sm font-bold uppercase tracking-[0.25em]"
            style={{ animationDirection: reverse ? "reverse" : "normal" }}
          >
            {Array.from({ length: 3 }).flatMap((_, r) =>
              ITEMS.map((it, i) => (
                <span key={`${r}-${i}`} className="flex items-center gap-8">
                  {it}
                  <span className="text-neutral-400">✦</span>
                </span>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TickerHeadline() {
  return (
    <section className="w-full bg-neutral-50">
      <Ticker dark />
      <div className="flex min-h-[45vh] items-center justify-center px-6 py-24">
        <h2
          className="text-center font-black uppercase leading-[0.85] tracking-[-0.04em] text-neutral-950"
          style={{ fontSize: "clamp(3rem, 16vw, 14rem)" }}
        >
          DROP 06
        </h2>
      </div>
      <Ticker reverse />
      <style>{`
        .aww-tk-track { animation: aww-tk-run 18s linear infinite; }
        @keyframes aww-tk-run {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aww-tk-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
