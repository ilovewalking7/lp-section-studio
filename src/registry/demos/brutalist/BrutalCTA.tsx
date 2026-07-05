import { ArrowRight, Zap } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・CTA",
  category: "ブルータリスト",
  description: "黒地に飽和色を効かせた高インパクトなCTAバンド。",
  align: "full",
  isNew: true,
  tags: ["brutalist", "bold", "cta"],
};

export default function BrutalCTA() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-lime-300 px-5 py-12 font-sans text-black sm:px-10 sm:py-16">
      <div className="mx-auto max-w-5xl border-4 border-black bg-black p-8 shadow-[10px_10px_0_0_#000] sm:p-12">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 border-2 border-white bg-fuchsia-400 px-3 py-1 font-mono text-xs font-black uppercase">
              <Zap className="h-4 w-4" fill="black" strokeWidth={0} />
              {en ? "Free now" : "いま無料"}
            </div>
            <h2 className="text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl">
              {en ? (
                <>
                  Stop stalling.
                  <br />
                  <span className="bg-yellow-300 px-2 text-black">Ship it.</span>
                </>
              ) : (
                <>
                  迷うな。
                  <br />
                  <span className="bg-yellow-300 px-2 text-black">出荷しろ。</span>
                </>
              )}
            </h2>
            <p className="mt-4 max-w-md font-bold text-white">
              {en
                ? "No credit card. Your first component in production in 30 seconds."
                : "クレカ不要。30秒で最初のコンポーネントを本番へ。"}
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <button className="group inline-flex items-center justify-center gap-2 border-4 border-white bg-cyan-300 px-7 py-4 text-lg font-black uppercase shadow-[6px_6px_0_0_#fff] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#fff]">
              {en ? "Start free" : "無料で始める"}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
            </button>
            <button className="border-4 border-white bg-transparent px-7 py-4 text-lg font-black uppercase text-white transition-all hover:bg-white hover:text-black">
              {en ? "Get the docs" : "資料請求"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
