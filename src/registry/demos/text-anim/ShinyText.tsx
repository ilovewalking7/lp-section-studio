import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "シャイニーテキスト",
  category: "テキストアニメ",
  description: "マスクグラデーションで光沢が横切る控えめなシャイン効果。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "shine"],
};

export default function ShinyText() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-6 rounded-2xl bg-neutral-950 px-8 py-14 text-center">
      <h2 className="bg-[linear-gradient(110deg,#71717a_0%,#71717a_40%,#ffffff_50%,#71717a_60%,#71717a_100%)] bg-[length:200%_100%] bg-clip-text text-4xl font-bold tracking-tight text-transparent [animation:shiny-sweep_3s_linear_infinite] sm:text-6xl">
        {en ? "Refined sheen" : "洗練された光沢"}
      </h2>
      <p className="bg-[linear-gradient(110deg,#52525b_0%,#52525b_42%,#e4e4e7_50%,#52525b_58%,#52525b_100%)] bg-[length:200%_100%] bg-clip-text text-base font-medium text-transparent [animation:shiny-sweep_4.5s_linear_infinite]">
        A subtle sheen sweeps across the words.
      </p>
      <style>{`
        @keyframes shiny-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
