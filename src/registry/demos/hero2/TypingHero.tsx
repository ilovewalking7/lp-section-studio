import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "タイピング・ヒーロー",
  category: "ヒーロー・LP",
  description: "見出しの一語をタイプ＆消去でローテーションする動的ヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

const WORDS = [
  { ja: "デザイナー", en: "designers" },
  { ja: "開発者", en: "developers" },
  { ja: "起業家", en: "founders" },
  { ja: "クリエイター", en: "creators" },
];

export default function TypingHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const words = WORDS.map((w) => (en ? w.en : w.ja));
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(words[0]);
      return;
    }
    const full = words[wi];
    const speed = del ? 60 : 120;
    const t = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDel(true), 1100);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setWi((p) => (p + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, wi]);

  return (
    <section className="relative w-full overflow-hidden bg-[#070710] py-32 text-white">
      <style>{`
        @keyframes ty-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @media (prefers-reduced-motion: reduce){.ty-cur{animation:none!important}}
      `}</style>
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60vw] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          ⚡ {en ? "For everyone" : "すべての人に"}
        </span>
        <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Tools for all " : "すべての"}
          <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            {text}
          </span>
          <span className="ty-cur ml-0.5 inline-block h-[1em] w-[3px] translate-y-1 bg-fuchsia-300 align-middle" style={{ animation: "ty-blink 1s step-end infinite" }} />
          <br />
          {en ? "." : "のための道具。"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          {en
            ? "A flexible, extensible platform where everyone can do their best work, whatever their role."
            : "職種を問わず、誰もが力を発揮できる。柔軟で拡張可能なプラットフォーム。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group bg-white text-black hover:bg-white/90">
            {en ? "Start free" : "無料で始める"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            {en ? "Case studies" : "導入事例"}
          </Button>
        </div>
      </div>
    </section>
  );
}
