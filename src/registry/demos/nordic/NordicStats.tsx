import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧スタッツ",
  category: "北欧",
  description: "控えめなトーンの統計ロウ。",
  align: "full",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "大きな数字と細い区切りで、誇張なく実績の信頼感を伝える。",
};

const stats = [
  { id: "years", value: "24", valueEn: "24", unit: "年", unitEn: "yrs", ja: "受け継がれる工房", en: "Workshop legacy", tint: "#c08457" },
  { id: "satisfaction", value: "98", valueEn: "98", unit: "%", unitEn: "%", ja: "お客さまの満足", en: "Customer satisfaction", tint: "#8a9a7b" },
  { id: "delivered", value: "12", valueEn: "120", unit: "万", unitEn: "k", ja: "暮らしに届けた品", en: "Pieces delivered", tint: "#7d92a3" },
  { id: "natural", value: "100", valueEn: "100", unit: "%", unitEn: "%", ja: "自然由来の素材", en: "Natural materials", tint: "#c08457" },
];

export default function NordicStats() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#faf8f3] font-sans text-[#3a3a38]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.id}
              className={
                "px-2 sm:px-6 " +
                (i !== 0 ? "lg:border-l lg:border-[#3a3a38]/10" : "")
              }
            >
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-light tracking-tight tabular-nums md:text-6xl">
                  {en ? s.valueEn : s.value}
                </span>
                <span className="text-xl font-light" style={{ color: s.tint }}>
                  {en ? s.unitEn : s.unit}
                </span>
              </div>
              <div
                className="mt-3 h-px w-10 rounded-full"
                style={{ backgroundColor: s.tint }}
              />
              <p className="mt-3 text-sm text-[#3a3a38]/60">{en ? s.en : s.ja}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
