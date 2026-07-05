import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブラケットホバー",
  category: "ボタン",
  description: "ホバーで [ と ] が左右からスライドインする、コード風ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function BracketHover() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0a0a0a] p-8">
      <button
        type="button"
        className="group inline-flex items-center font-mono text-sm font-semibold text-lime-300 transition-colors duration-300 hover:text-lime-200 focus-visible:outline-none"
      >
        <span className="inline-block translate-x-2 text-lime-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          [
        </span>
        <span className="px-2 tracking-wide">run build</span>
        <span className="inline-block -translate-x-2 text-lime-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          ]
        </span>
      </button>
    </div>
  );
}
