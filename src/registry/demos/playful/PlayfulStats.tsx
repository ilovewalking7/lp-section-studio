import { Users, Star, Download, Smile } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ポップ統計バブル",
  category: "プレイフル",
  description: "丸くて楽しい統計バブルの並び。",
  align: "full",
  isNew: true,
  tags: ["playful", "rounded", "stats"],
};

const stats = [
  { icon: Users, value: "12K+", label: "うれしいユーザー", labelEn: "Happy users", color: "#ff8fab", shadow: "#e26d8c" },
  { icon: Download, value: "340万", label: "ダウンロード", labelEn: "Downloads", color: "#4cc9f0", shadow: "#37a8cc" },
  { icon: Star, value: "4.9", label: "平均レビュー", labelEn: "Average rating", color: "#ffd166", shadow: "#e0b94a" },
  { icon: Smile, value: "98%", label: "満足度", labelEn: "Satisfaction", color: "#06d6a0", shadow: "#05ab80" },
];

export default function PlayfulStats() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="font-rounded w-full rounded-3xl bg-[#fffdf7] px-5 py-14 sm:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
          {en ? "Loved by everyone" : "みんなに愛されてます"}
        </h2>
        <p className="mt-3 text-slate-500">{en ? "Where we are right now, in numbers." : "数字でみる、わたしたちのいま。"}</p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-5 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.labelEn}
              className="flex flex-col items-center rounded-3xl bg-white p-7 text-center shadow-[0_10px_0_#eef1f4] transition-transform duration-200 hover:-translate-y-1.5"
            >
              <div
                className="mb-4 inline-flex size-16 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: s.color, boxShadow: `0 6px 0 ${s.shadow}` }}
              >
                <Icon className="size-8" />
              </div>
              <div className="text-3xl font-extrabold text-slate-800">{s.value}</div>
              <div className="mt-1 text-sm font-semibold text-slate-400">{en ? s.labelEn : s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
