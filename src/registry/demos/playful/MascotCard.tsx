import { Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マスコットカード",
  category: "プレイフル",
  description: "SVGで描いたかわいいマスコット入りカード。",
  align: "center",
  isNew: true,
  tags: ["playful", "rounded", "mascot"],
};

function Mascot() {
  return (
    <svg viewBox="0 0 160 160" className="size-40" aria-hidden role="img">
      {/* body */}
      <ellipse cx="80" cy="92" rx="52" ry="50" fill="#4cc9f0" />
      <ellipse cx="80" cy="100" rx="36" ry="34" fill="#bff0ff" />
      {/* ears */}
      <circle cx="44" cy="48" r="16" fill="#4cc9f0" />
      <circle cx="116" cy="48" r="16" fill="#4cc9f0" />
      <circle cx="44" cy="48" r="8" fill="#ff8fab" />
      <circle cx="116" cy="48" r="8" fill="#ff8fab" />
      {/* cheeks */}
      <circle cx="52" cy="100" r="9" fill="#ff8fab" opacity="0.6" />
      <circle cx="108" cy="100" r="9" fill="#ff8fab" opacity="0.6" />
      {/* eyes */}
      <circle cx="64" cy="84" r="7" fill="#2a3340" />
      <circle cx="96" cy="84" r="7" fill="#2a3340" />
      <circle cx="66" cy="82" r="2.5" fill="#fff" />
      <circle cx="98" cy="82" r="2.5" fill="#fff" />
      {/* smile */}
      <path
        d="M68 98 Q80 110 92 98"
        fill="none"
        stroke="#2a3340"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* sparkle */}
      <path
        d="M128 78l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"
        fill="#ffd166"
      />
    </svg>
  );
}

export default function MascotCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="font-rounded w-full max-w-sm overflow-hidden rounded-3xl border-2 border-slate-100 bg-white shadow-[0_12px_0_#eef1f4]">
      <div
        className="flex justify-center pt-8"
        style={{ background: "linear-gradient(180deg,#f0fbff 0%,#ffffff 100%)" }}
      >
        <div className="animate-bounce" style={{ animationDuration: "2.4s" }}>
          <Mascot />
        </div>
      </div>
      <div className="p-7 pt-4 text-center">
        <h3 className="text-xl font-extrabold text-slate-800">{en ? "Hi, I'm Piyo!" : "こんにちは、ぴよすけ！"}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {en
            ? "Your trusty sidekick for getting things done. Give me a shout anytime you're stuck."
            : "あなたの作業をサポートする相棒です。困ったらいつでも声をかけてね。"}
        </p>
        <button
          className="mt-5 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 active:translate-y-1"
          style={{ backgroundColor: "#4cc9f0", boxShadow: "0 6px 0 #37a8cc" }}
        >
          <Sparkles className="size-4" /> {en ? "Say hi" : "なかよくなる"}
        </button>
      </div>
    </div>
  );
}
