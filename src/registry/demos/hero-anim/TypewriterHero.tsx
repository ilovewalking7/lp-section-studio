import { useEffect, useState } from "react";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "タイプライター・ヒーロー",
  category: "ヒーロー・LP",
  description: "見出しの一部が複数の価値訴求をタイプライターで切り替えて表示。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "typewriter"],
};

const WORDS_JA = ["デザイナー", "開発者", "起業家", "チーム"];
const WORDS_EN = ["designers", "developers", "founders", "teams"];

export default function TypewriterHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const WORDS = en ? WORDS_EN : WORDS_JA;
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = WORDS[wordIdx];
    let delay = deleting ? 55 : 95;
    if (!deleting && text === full) delay = 1400;
    if (deleting && text === "") delay = 350;

    const t = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % WORDS.length);
      } else {
        setText(
          deleting
            ? full.slice(0, text.length - 1)
            : full.slice(0, text.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, WORDS]);

  return (
    <section className="relative w-full overflow-hidden bg-[#06070d] py-32 text-white">
      <style>{`
        @keyframes tw-caret { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (prefers-reduced-motion: reduce){ .tw-caret{animation:none !important} }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 45%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 45%, #000 35%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[10%] h-[40vh] w-[50vw] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.5), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          <Terminal className="size-3.5 text-emerald-300" />
          {en ? "A tool for everyone" : "すべての人のためのツール"}
        </span>
        <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? (
            <>
              <span className="bg-gradient-to-b from-white to-white/55 bg-clip-text text-transparent">
                Products for
              </span>
              <br className="sm:hidden" />{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
                {text}
              </span>
              <span
                className="tw-caret ml-0.5 inline-block w-[3px] translate-y-1 self-stretch bg-emerald-300 align-middle"
                style={{
                  height: "0.95em",
                  animation: "tw-caret 1s step-end infinite",
                }}
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              <span className="bg-gradient-to-b from-white to-white/55 bg-clip-text text-transparent">
                すべての
              </span>
              <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
                {text}
              </span>
              <span
                className="tw-caret ml-0.5 inline-block w-[3px] translate-y-1 self-stretch bg-emerald-300 align-middle"
                style={{
                  height: "0.95em",
                  animation: "tw-caret 1s step-end infinite",
                }}
                aria-hidden="true"
              />
              <br />
              <span className="bg-gradient-to-b from-white to-white/55 bg-clip-text text-transparent">
                のためのプロダクト
              </span>
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          {en
            ? "From idea to shipped in one workspace — designed to work for every role."
            : "一つのワークスペースで、アイデアから出荷まで。役割を問わず使える設計。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
          >
            {en ? "Start for free" : "無料で始める"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "See case studies" : "事例を見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
