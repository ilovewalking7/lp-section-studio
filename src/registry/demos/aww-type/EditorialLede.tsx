import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "エディトリアル・リード",
  category: "Awwwards",
  description: "ドロップキャップ付きの大きなリード文と欄外メモで魅せる雑誌的レイアウト。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

export default function EditorialLede() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#f7f5f0] px-6 py-28 text-neutral-950 sm:px-12">
      <div
        ref={ref}
        className="aww-el mx-auto grid max-w-[1200px] gap-10 sm:grid-cols-[1fr_3fr]"
        data-shown={shown}
      >
        <aside className="aww-el-meta space-y-2 text-[11px] uppercase tracking-[0.35em] text-neutral-500">
          <p>Issue 12</p>
          <p>Essay</p>
          <p className="text-neutral-400">2026 / 06</p>
        </aside>
        <div>
          <p
            className="aww-el-lede text-balance font-serif leading-[1.15] tracking-tight"
            style={{ fontSize: "clamp(1.6rem, 4.2vw, 3.4rem)" }}
          >
            <span
              className="float-left mr-4 mt-1 font-black leading-[0.72]"
              style={{ fontSize: "clamp(4rem, 11vw, 8rem)" }}
            >
              {en ? "W" : "余"}
            </span>
            {en
              ? "hitespace is the sentence that was never written. Designers speak not by what they add, but by what they remove. Where scale meets silence, the reader's imagination takes hold."
              : "白は、書かれなかった文章だ。設計者は何を足すかではなく、何を引くかで語る。スケールと静けさが交差する場所に、読む人の想像が宿る。"}
          </p>
          <div className="mt-12 h-px w-24 bg-neutral-950" />
        </div>
      </div>
      <style>{`
        .aww-el-meta, .aww-el-lede {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .aww-el-lede { transition-delay: 0.12s; }
        .aww-el[data-shown="true"] .aww-el-meta,
        .aww-el[data-shown="true"] .aww-el-lede { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .aww-el-meta, .aww-el-lede { transition: none; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
