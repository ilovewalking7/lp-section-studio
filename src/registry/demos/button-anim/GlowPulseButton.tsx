import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グロウパルスボタン",
  category: "ボタン演出",
  description: "呼吸するように光のグロウが脈打つボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "glow"],
};

export default function GlowPulseButton() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex flex-col items-center gap-6">
      <style>{`
        @keyframes ba-glow-pulse {
          0%, 100% { box-shadow: 0 0 12px 0 rgba(168,85,247,0.55); }
          50% { box-shadow: 0 0 32px 6px rgba(168,85,247,0.85); }
        }
        @keyframes ba-glow-pulse-c {
          0%, 100% { box-shadow: 0 0 12px 0 rgba(34,211,238,0.5); }
          50% { box-shadow: 0 0 30px 5px rgba(34,211,238,0.85); }
        }
      `}</style>

      <button
        className="rounded-full bg-purple-600 px-8 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{ animation: "ba-glow-pulse 2s ease-in-out infinite" }}
      >
        {en ? "Power on" : "パワーオン"}
      </button>

      <button
        className="rounded-lg bg-cyan-500 px-7 py-2.5 text-sm font-semibold text-neutral-950 transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{ animation: "ba-glow-pulse-c 2.4s ease-in-out infinite" }}
      >
        {en ? "Connect" : "接続する"}
      </button>
    </div>
  );
}
