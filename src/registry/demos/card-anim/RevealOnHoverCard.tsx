import { Layers, Check } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ホバーリビールカード",
  category: "カード演出",
  description: "ホバーで詳細コンテンツがスライド＆フェードインして現れる。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "reveal"],
};

const FEATURES = [
  { ja: "無制限プロジェクト", en: "Unlimited projects" },
  { ja: "優先サポート", en: "Priority support" },
  { ja: "高度な分析", en: "Advanced analytics" },
];

export default function RevealOnHoverCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d17] p-7 text-slate-200 shadow-2xl shadow-black/40">
      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
        <Layers className="size-5 text-emerald-300" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-white">{en ? "Pro Plan" : "プロプラン"}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {en
          ? "Hover to slide the included perks up into view."
          : "ホバーすると含まれる特典が下から滑り込んで表示されます。"}
      </p>

      {/* hidden detail revealed on hover */}
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <ul className="mt-5 space-y-2.5 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {FEATURES.map((f) => (
              <li key={f.en} className="flex items-center gap-2.5 text-sm text-slate-300">
                <Check className="size-4 shrink-0 text-emerald-400" />
                {en ? f.en : f.ja}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-base font-semibold text-white">
          ¥1,980<span className="text-xs font-normal text-slate-500">{en ? "/mo" : "/月"}</span>
        </span>
        <span className="text-sm font-medium text-emerald-300">{en ? "Select →" : "選択 →"}</span>
      </div>
    </div>
  );
}
