import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マーチングアント",
  category: "ボタン",
  description: "破線が縁を流れ続ける、選択範囲のような「蟻の行進」ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function MarchingAnts() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0d10] p-8">
      <style>{`
        @keyframes ants-move { to { background-position: 16px 0, -16px 100%, 0 -16px, 100% 16px; } }
      `}</style>
      <button
        type="button"
        className="group inline-flex items-center justify-center rounded-md bg-transparent px-7 py-3.5 text-sm font-semibold text-zinc-100 transition-colors duration-300 hover:text-white focus-visible:outline-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg,#a1a1aa 0 8px,transparent 8px 16px),repeating-linear-gradient(90deg,#a1a1aa 0 8px,transparent 8px 16px),repeating-linear-gradient(0deg,#a1a1aa 0 8px,transparent 8px 16px),repeating-linear-gradient(0deg,#a1a1aa 0 8px,transparent 8px 16px)",
          backgroundSize: "16px 1px, 16px 1px, 1px 16px, 1px 16px",
          backgroundPosition: "0 0, 0 100%, 0 0, 100% 0",
          backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
          animation: "ants-move 0.6s linear infinite",
        }}
      >
        {en ? "Select area" : "範囲を選択"}
      </button>
    </div>
  );
}
