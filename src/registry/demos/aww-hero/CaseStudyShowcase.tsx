import type { DemoMeta } from "@/registry";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "ケーススタディ・ショーケース",
  category: "Awwwards",
  description:
    "IntersectionObserverでスクロール連動に立ち上がる、受賞作のようなケーススタディ一覧。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

const CASES = [
  { id: "C-01", t: "Lumen Bank", c: "Fintech / Rebrand", bg: "linear-gradient(135deg,#1e3a8a,#3b82f6)", y: "2026" },
  { id: "C-02", t: "Verdant", c: "Sustainability / Site", bg: "linear-gradient(135deg,#065f46,#34d399)", y: "2025" },
  { id: "C-03", t: "Pulse", c: "Health / App", bg: "linear-gradient(135deg,#9d174d,#f472b6)", y: "2025" },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Row({ data, i }: { data: (typeof CASES)[number]; i: number }) {
  const { ref, shown } = useReveal<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      href="#"
      onClick={(e) => e.preventDefault()}
      className="group grid items-center gap-6 border-t border-white/10 py-8 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:grid-cols-[auto_1fr_auto] sm:py-10"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${i * 0.08}s`,
      }}
    >
      <div
        className="h-28 w-full overflow-hidden rounded-xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.03] sm:w-44"
        style={{ background: data.bg }}
      />
      <div>
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40">
          <span>{data.id}</span>
          <span>{data.y}</span>
        </div>
        <h3
          className="mt-2 font-black tracking-[-0.02em]"
          style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
        >
          {data.t}
        </h3>
        <p className="mt-1 text-sm text-white/50">{data.c}</p>
      </div>
      <span className="flex size-12 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:bg-white group-hover:text-black">
        <ArrowUpRight />
      </span>
    </a>
  );
}

export default function CaseStudyShowcase() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-cse w-full bg-[#08080c] px-5 py-20 text-white sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2
            className="font-black leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.2rem,7vw,5.5rem)" }}
          >
            Selected
            <br />
            <span className="text-white/35">Case Studies</span>
          </h2>
          <p className="max-w-xs text-sm text-white/50">
            {en
              ? "Rows rise from below as you scroll — staged like an award-winning portfolio."
              : "スクロールに合わせて行が下から立ち上がります。受賞作品集のような演出。"}
          </p>
        </div>
        <div>
          {CASES.map((c, i) => (
            <Row key={c.id} data={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
