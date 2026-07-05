import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "二重枠",
  category: "ボタン",
  description: "外枠と内枠の二重ラインで格を上げる、クラシックなボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function DoubleBorder() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0f0e0b] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center justify-center rounded-md border border-amber-300/80 p-1 transition-colors duration-300 hover:border-amber-200 focus-visible:outline-none"
      >
        <span className="rounded-sm border border-amber-300/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-200 transition-colors duration-300 group-hover:border-amber-200 group-hover:text-amber-100">
          Premium
        </span>
      </button>
    </div>
  );
}
