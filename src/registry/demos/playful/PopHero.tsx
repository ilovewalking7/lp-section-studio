import { ArrowRight, Sparkles, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ポップ・ヒーロー",
  category: "プレイフル",
  description: "ブロブ装飾と弾むCTAを備えたカラフルで丸いヒーロー。",
  align: "full",
  isNew: true,
  tags: ["playful", "rounded", "fun", "hero"],
};

function Blob({ className, fill }: { className?: string; fill: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("absolute -z-0", className)}
      aria-hidden
    >
      <path
        fill={fill}
        d="M48.8,-58.6C61.3,-48.2,68.4,-31.6,71.2,-14.4C74,2.8,72.5,20.6,64,34.4C55.5,48.2,40,58,23.1,64.2C6.1,70.4,-12.3,73,-28.9,67.4C-45.5,61.8,-60.3,48,-67.1,31.3C-73.9,14.6,-72.7,-5,-65.6,-21.6C-58.5,-38.2,-45.5,-51.8,-30.7,-61.5C-15.9,-71.2,0.7,-77,16.7,-73.6C32.7,-70.2,48.1,-57.6,48.8,-58.6Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export default function PopHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section
      className="font-rounded relative w-full overflow-hidden rounded-3xl px-6 py-16 sm:px-12 sm:py-24"
      style={{ background: "linear-gradient(135deg,#fff7fb 0%,#f0fbff 100%)" }}
    >
      <Blob className="left-[-60px] top-[-40px] h-72 w-72 opacity-60" fill="#ffd166" />
      <Blob className="right-[-50px] top-10 h-64 w-64 opacity-50" fill="#4cc9f0" />
      <Blob className="bottom-[-70px] left-1/3 h-72 w-72 opacity-40" fill="#b388ff" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <span
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-white shadow-[0_6px_0_rgba(0,0,0,0.08)]"
          style={{ backgroundColor: "#ff8fab" }}
        >
          <Sparkles className="size-4" />
          {en ? "Our new builder is live" : "あたらしいビルダー、公開中"}
        </span>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-800 sm:text-6xl">
          {en ? (
            <>
              Building is{" "}
              <span style={{ color: "#06d6a0" }}>fun</span>.
            </>
          ) : (
            <>
              つくるって、
              <span style={{ color: "#06d6a0" }}>たのしい</span>
              。
            </>
          )}
        </h1>

        <p className="mt-5 max-w-xl text-base text-slate-500 sm:text-lg">
          {en
            ? "Just drag, arrange, and share. Start building products your whole team will love, today."
            : "ドラッグして、ならべて、シェアするだけ。チームみんなで、ワクワクするプロダクトを今日からはじめよう。"}
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <button
            className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold text-white shadow-[0_8px_0_#e26d8c] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_0_#e26d8c] active:translate-y-1 active:shadow-[0_3px_0_#e26d8c]"
            style={{ backgroundColor: "#ff8fab" }}
          >
            {en ? "Start for free" : "無料ではじめる"}
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-7 py-3.5 text-base font-bold text-slate-700 shadow-[0_8px_0_#e8eef2] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_3px_0_#e8eef2]">
            <Play className="size-5" style={{ color: "#4cc9f0" }} />
            {en ? "Watch demo" : "デモを見る"}
          </button>
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm font-semibold text-slate-400">
          <div className="flex -space-x-2">
            {["#ffd166", "#06d6a0", "#4cc9f0", "#b388ff"].map((c) => (
              <span
                key={c}
                className="size-8 rounded-full border-2 border-white"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          {en ? "12,000 people building together" : "12,000人がワイワイ利用中"}
        </div>
      </div>
    </section>
  );
}
