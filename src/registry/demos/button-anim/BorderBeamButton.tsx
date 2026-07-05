import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボーダービームボタン",
  category: "ボタン演出",
  description: "ボタンの縁を光のビームが一周し続けるボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "border", "beam"],
};

export default function BorderBeamButton() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex flex-col items-center gap-6">
      <style>{`
        @keyframes ba-beam-spin {
          to { transform: translate(-50%, -50%) rotate(1turn); }
        }
      `}</style>

      <button className="group relative overflow-hidden rounded-xl bg-neutral-900 p-[1.5px] transition-transform duration-200 hover:scale-[1.03] active:scale-95">
        <span
          className="absolute left-1/2 top-1/2 aspect-square w-[180%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 75%, #38bdf8 88%, #818cf8 96%, transparent 100%)",
            animation: "ba-beam-spin 3s linear infinite",
          }}
        />
        <span className="relative z-10 flex items-center justify-center rounded-[10px] bg-neutral-900 px-8 py-3 text-sm font-medium text-white">
          {en ? "See the beam" : "ビームを見る"}
        </span>
      </button>

      <button className="group relative overflow-hidden rounded-full bg-neutral-900 p-[1.5px] transition-transform duration-200 hover:scale-[1.03] active:scale-95">
        <span
          className="absolute left-1/2 top-1/2 aspect-square w-[200%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 80%, #f472b6 90%, #fb923c 97%, transparent 100%)",
            animation: "ba-beam-spin 2.4s linear infinite",
          }}
        />
        <span className="relative z-10 flex items-center justify-center rounded-full bg-neutral-900 px-7 py-2.5 text-sm font-medium text-pink-100">
          {en ? "Grab attention" : "注目させる"}
        </span>
      </button>
    </div>
  );
}
