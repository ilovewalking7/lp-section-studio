import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "特大マーキー見出し",
  category: "Awwwards",
  description: "超特大の文字が無限に横へ流れる多段マーキーの見出し。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

const ROW = "EDITORIAL — TYPOGRAPHY — KINETIC — ";

function Row({
  reverse,
  outline,
}: {
  reverse?: boolean;
  outline?: boolean;
}) {
  return (
    <div className="flex w-max">
      {[0, 1].map((k) => (
        <span
          key={k}
          className="aww-mq-track flex shrink-0 whitespace-nowrap font-black uppercase leading-none tracking-[-0.02em]"
          style={{
            fontSize: "clamp(3rem, 11vw, 10rem)",
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          <span
            className={outline ? "text-transparent" : undefined}
            style={
              outline
                ? { WebkitTextStroke: "1.5px currentColor" }
                : undefined
            }
          >
            {ROW.repeat(4)}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function MarqueeHeadline() {
  return (
    <section className="aww-mq w-full overflow-hidden bg-neutral-950 py-24 text-neutral-50">
      <div className="flex flex-col gap-2">
        <Row />
        <Row reverse outline />
        <Row />
      </div>
      <style>{`
        .aww-mq-track { animation: aww-mq-slide 22s linear infinite; }
        @keyframes aww-mq-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aww-mq-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
