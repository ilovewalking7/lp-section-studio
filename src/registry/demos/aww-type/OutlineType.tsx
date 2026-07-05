import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アウトライン中抜き文字",
  category: "Awwwards",
  description: "中抜きの輪郭文字がホバーで塗りつぶされる重ねレイヤー見出し。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

const LINES = ["OUT", "LINE"];

export default function OutlineType() {
  return (
    <section className="aww-ot relative flex min-h-[55vh] w-full flex-col items-center justify-center gap-2 bg-neutral-100 px-6 py-28 text-neutral-950">
      {LINES.map((line, i) => (
        <h2
          key={i}
          className="aww-ot-line group relative cursor-default select-none font-black uppercase leading-[0.85] tracking-[-0.03em]"
          style={{ fontSize: "clamp(3.5rem, 18vw, 16rem)" }}
        >
          <span
            className="block text-transparent transition-colors duration-300 group-hover:text-neutral-950"
            style={{ WebkitTextStroke: "2px #0a0a0a" }}
          >
            {line}
          </span>
        </h2>
      ))}
      <p className="mt-10 text-xs uppercase tracking-[0.4em] text-neutral-500">
        Hover to fill
      </p>
      <style>{`
        .aww-ot-line { opacity: 0; animation: aww-ot-in 0.8s ease-out both; }
        .aww-ot-line:nth-child(2) { animation-delay: 0.12s; }
        @keyframes aww-ot-in {
          0% { opacity: 0; transform: translateX(-6%); letter-spacing: 0.1em; }
          100% { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aww-ot-line { animation: none; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
