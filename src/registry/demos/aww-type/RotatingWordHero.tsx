import { useEffect, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "回転ワードヒーロー",
  category: "Awwwards",
  description: "固定見出しの一語だけが縦スロットで次々と入れ替わるヒーロー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

const WORDS = ["FASTER", "BOLDER", "SHARPER", "SMARTER"];

export default function RotatingWordHero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % WORDS.length),
      2000
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-neutral-950 px-6 py-28 text-neutral-50">
      <h1
        className="text-center font-black uppercase leading-[0.95] tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.5rem, 11vw, 9rem)" }}
      >
        <span className="block">SHIP IT</span>
        <span
          className="relative mt-2 inline-flex overflow-hidden align-bottom"
          style={{ height: "1em" }}
        >
          {WORDS.map((w, idx) => (
            <span
              key={w}
              aria-hidden={idx !== i}
              className="aww-rwh-word inline-flex items-center justify-center bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text px-[0.15em] text-transparent"
              style={{
                transform: `translateY(${(idx - i) * 100}%)`,
              }}
            >
              {w}
            </span>
          ))}
        </span>
      </h1>
      <style>{`
        .aww-rwh-word {
          position: absolute;
          left: 0; right: 0;
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        @media (prefers-reduced-motion: reduce) {
          .aww-rwh-word { transition: none; }
        }
      `}</style>
    </section>
  );
}
