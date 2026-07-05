import type { DemoMeta } from "@/registry";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "メンフィス・価格表",
  category: "メンフィス",
  description: "幾何学シェイプで遊ぶプレイフルな価格カード3種。",
  align: "full",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

type Plan = {
  name: string;
  nameEn: string;
  price: string;
  desc: string;
  descEn: string;
  features: string[];
  featuresEn: string[];
  color: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "スターター",
    nameEn: "Starter",
    price: "¥0",
    desc: "個人プロジェクト向け。",
    descEn: "For personal projects.",
    features: ["3 プロジェクト", "コミュニティ", "基本シェイプ"],
    featuresEn: ["3 projects", "Community", "Basic shapes"],
    color: "#1fb6c1",
  },
  {
    name: "プロ",
    nameEn: "Pro",
    price: "¥1,800",
    desc: "本気のクリエイター向け。",
    descEn: "For serious creators.",
    features: ["無制限プロジェクト", "全シェイプセット", "優先サポート", "チーム共有"],
    featuresEn: ["Unlimited projects", "All shape sets", "Priority support", "Team sharing"],
    color: "#ff5c8a",
    featured: true,
  },
  {
    name: "チーム",
    nameEn: "Team",
    price: "¥4,800",
    desc: "拡大するチーム向け。",
    descEn: "For growing teams.",
    features: ["プロの全機能", "SSO ログイン", "監査ログ", "専任マネージャー"],
    featuresEn: ["Everything in Pro", "SSO login", "Audit logs", "Dedicated manager"],
    color: "#7b5cff",
  },
];

export default function MemphisPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#fdf6e3] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute left-[5%] top-[8%] h-10 w-10 rotate-12 border-[4px] border-black bg-[#ffd23f]" />
        <div className="absolute right-[7%] top-[12%] h-12 w-12 rounded-full border-[4px] border-black bg-[#ff8c42]" />
        <svg viewBox="0 0 120 30" className="absolute bottom-[6%] left-[14%] w-28" fill="none" aria-hidden>
          <path d="M2 24L22 6l20 18L62 6l20 18L102 6l16 14" stroke="#7b5cff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <h2 className="text-center text-4xl font-black tracking-tight text-black sm:text-5xl">
          {en ? (
            <>
              Simple
              <span className="ml-2 inline-block -rotate-2 bg-[#ffd23f] px-2 text-black">pricing</span>
            </>
          ) : (
            <>
              シンプルな
              <span className="ml-2 inline-block -rotate-2 bg-[#ffd23f] px-2 text-black">料金</span>
            </>
          )}
        </h2>
        <p className="mt-3 text-center text-lg font-semibold text-black/60">
          {en ? "Change or cancel anytime." : "いつでも変更・キャンセルOK。"}
        </p>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.nameEn}
              className={cn(
                "relative rounded-2xl border-[3px] border-black bg-white p-7 transition-transform hover:-translate-y-1",
                p.featured
                  ? "shadow-[8px_8px_0_0_#000] md:-translate-y-3"
                  : "shadow-[5px_5px_0_0_#000]"
              )}
            >
              {p.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-3 rounded-full border-[3px] border-black bg-[#ffd23f] px-4 py-1 text-xs font-black uppercase tracking-wide">
                  {en ? "Popular" : "人気"}
                </span>
              )}
              <div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-black"
                style={{ backgroundColor: p.color }}
              >
                <span className="text-lg font-black text-white">{(en ? p.nameEn : p.name)[0]}</span>
              </div>
              <h3 className="text-xl font-black text-black">{en ? p.nameEn : p.name}</h3>
              <p className="mt-1 text-sm font-semibold text-black/55">{en ? p.descEn : p.desc}</p>
              <div className="mt-5 flex items-end gap-1">
                <span className="text-4xl font-black text-black">{p.price}</span>
                <span className="mb-1 text-sm font-bold text-black/50">{en ? "/mo" : "/月"}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {(en ? p.featuresEn : p.features).map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm font-semibold text-black/80">
                    <span
                      className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-black"
                      style={{ backgroundColor: p.color }}
                    >
                      <Check className="size-3 text-white" strokeWidth={3.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={cn(
                  "mt-7 w-full rounded-xl border-[3px] border-black py-3 text-sm font-extrabold transition-transform hover:-translate-y-0.5 active:translate-y-0.5",
                  p.featured
                    ? "bg-black text-white shadow-[4px_4px_0_0_#ff5c8a]"
                    : "bg-white text-black shadow-[4px_4px_0_0_#000]"
                )}
              >
                {en ? "Choose" : "選ぶ"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
