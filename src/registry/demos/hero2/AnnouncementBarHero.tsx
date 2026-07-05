import { ArrowRight, Megaphone, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アナウンスバー・ヒーロー",
  category: "ヒーロー・LP",
  description: "上部に流れる告知バー付き。閉じるボタンとシャインアニメ付き。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function AnnouncementBarHero() {
  const [open, setOpen] = useState(true);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#08080c] text-white">
      <style>{`
        @keyframes ab-shine{0%{transform:translateX(-150%)}100%{transform:translateX(250%)}}
        @media (prefers-reduced-motion: reduce){.ab-shine{animation:none!important;opacity:0}}
      `}</style>
      {open && (
        <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-indigo-600/30 via-fuchsia-600/30 to-indigo-600/30">
          <div
            className="ab-shine pointer-events-none absolute inset-y-0 w-1/3 bg-white/10 blur-md"
            style={{ animation: "ab-shine 4s linear infinite" }}
          />
          <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-3 px-6 py-2.5 text-sm">
            <Megaphone className="size-4 text-fuchsia-300" />
            <span className="text-white/80">
              {en ? (
                <>New feature launch — annual plans<strong className="text-white"> 40% OFF</strong></>
              ) : (
                <>新機能リリース記念 — 年額プラン<strong className="text-white"> 40%OFF</strong></>
              )}
            </span>
            <a href="#" className="inline-flex items-center gap-1 font-medium text-fuchsia-300 hover:underline">
              {en ? "Learn more" : "詳しく"} <ArrowRight className="size-3" />
            </a>
            <button
              onClick={() => setOpen(false)}
              aria-label={en ? "Close announcement" : "告知を閉じる"}
              className="absolute right-4 text-white/40 transition-colors hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "From announcement to action, in one line." : "告知から、行動まで一直線。"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          {en
            ? "A landing design that spotlights key messages and drives conversions."
            : "重要なメッセージを目立たせて、コンバージョンに繋げるランディング設計。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group bg-white text-black hover:bg-white/90">
            {en ? "Apply now" : "今すぐ申し込む"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            {en ? "All features" : "機能一覧"}
          </Button>
        </div>
      </div>
    </section>
  );
}
