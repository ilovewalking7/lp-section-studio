import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スタッガーワード",
  category: "Awwwards",
  description: "スクロールで画面に入ると語が順番にフェードアップする見出し（IntersectionObserver）。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

const WORDS = "WE BUILD QUIET BUT POWERFUL EXPERIENCES".split(" ");

export default function StaggerWords() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="aww-sw flex min-h-[60vh] w-full items-center bg-neutral-50 px-6 py-28 text-neutral-950 sm:px-16"
      data-shown={shown}
    >
      <h2
        className="max-w-[16ch] font-black uppercase leading-[0.92] tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.25rem, 9vw, 8rem)" }}
      >
        {WORDS.map((w, i) => (
          <span
            key={i}
            className="aww-sw-word mr-[0.25em] inline-block"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            {w}
          </span>
        ))}
      </h2>
      <style>{`
        .aww-sw-word {
          opacity: 0;
          transform: translateY(0.5em);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .aww-sw[data-shown="true"] .aww-sw-word { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .aww-sw-word { transition: none; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
