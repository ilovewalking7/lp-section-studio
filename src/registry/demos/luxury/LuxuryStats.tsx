import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ラグジュアリー・スタッツ",
  category: "ラグジュアリー",
  description: "金で彩られた大きな数字で実績を語る統計セクション。",
  align: "full",
  isNew: true,
  tags: ["luxury", "premium", "gold", "stats"],
  principle: "金のセリフ数字を大きく見せ、控えめなラベルと対比させて実績の重みを際立たせる。",
};

const stats = [
  { value: "100", suffix: "年", suffixEn: "yrs", label: "受け継がれる伝統", labelEn: "Years of heritage" },
  { value: "32", suffix: "", suffixEn: "", label: "世界の旗艦ブティック", labelEn: "Flagship boutiques worldwide" },
  { value: "1,200", suffix: "+", suffixEn: "+", label: "熟練の職人", labelEn: "Master artisans" },
  { value: "99.8", suffix: "%", suffixEn: "%", label: "顧客満足度", labelEn: "Client satisfaction" },
];

export default function LuxuryStats() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#0a0a0a] px-6 py-24 text-stone-100">
      <div className="mx-auto max-w-5xl">
        <div className="grid divide-y divide-stone-800 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.labelEn}
              className={[
                "px-6 py-10 text-center",
                i !== 0 ? "lg:border-l lg:border-stone-800" : "",
                i % 2 !== 0 ? "sm:border-l sm:border-stone-800" : "",
              ].join(" ")}
            >
              <p className="flex items-baseline justify-center gap-1">
                <span className="bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-500 bg-clip-text font-display text-5xl font-light text-transparent sm:text-6xl">
                  {s.value}
                </span>
                <span className="font-display text-2xl text-amber-300/80">
                  {en ? s.suffixEn : s.suffix}
                </span>
              </p>
              <div className="mx-auto mt-5 h-px w-8 bg-amber-400/30" />
              <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-stone-400">
                {en ? s.labelEn : s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
