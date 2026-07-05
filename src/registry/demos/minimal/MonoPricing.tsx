import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "モノ・プライシング",
  category: "ミニマル",
  description: "ヘアラインで仕切られた、極限まで削いだ料金表。",
  align: "full",
  isNew: true,
  tags: ["minimal", "swiss", "monochrome"],
  principle: "余計な装飾を排し、価格と差分だけを比較しやすく提示する。",
};

const plans = [
  {
    no: "01",
    name: "Solo",
    price: "0",
    noteJa: "個人の習作向け",
    noteEn: "For solo practice",
    featuresJa: ["12 コンポーネント", "ライブプレビュー", "コードコピー"],
    featuresEn: ["12 components", "Live preview", "Copy code"],
    accent: false,
  },
  {
    no: "02",
    name: "Studio",
    price: "1,800",
    noteJa: "プロのチーム向け",
    noteEn: "For pro teams",
    featuresJa: ["無制限の構成要素", "ダーク反転対応", "優先サポート", "Figma 連携"],
    featuresEn: ["Unlimited components", "Dark inversion", "Priority support", "Figma sync"],
    accent: true,
  },
  {
    no: "03",
    name: "Atelier",
    price: "4,800",
    noteJa: "組織・代理店向け",
    noteEn: "For orgs & agencies",
    featuresJa: ["SSO / 監査ログ", "専用ワークスペース", "SLA 99.9%"],
    featuresEn: ["SSO / audit logs", "Dedicated workspace", "99.9% SLA"],
    accent: false,
  },
];

export default function MonoPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-white font-sans text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <header className="mb-16 flex items-baseline justify-between border-b border-neutral-200 pb-6">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            {en ? "Pricing" : "料金"}
          </h2>
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            Monthly / JPY
          </span>
        </header>

        <div className="grid grid-cols-1 divide-y divide-neutral-200 border-t border-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {plans.map((p) => (
            <div
              key={p.no}
              className={cn(
                "flex flex-col px-0 py-10 md:px-8",
                p.accent && "bg-neutral-50/40"
              )}
            >
              <div className="mb-8 flex items-baseline justify-between">
                <span className="text-sm font-medium tracking-tight">
                  {p.name}
                </span>
                <span className="text-[11px] tabular-nums tracking-[0.2em] text-neutral-400">
                  {p.no}
                </span>
              </div>

              <div className="mb-1 flex items-baseline gap-1">
                <span className="text-sm text-neutral-500">¥</span>
                <span className="text-5xl font-medium tabular-nums tracking-tight">
                  {p.price}
                </span>
              </div>
              <p className="mb-8 text-sm text-neutral-500">
                {en ? p.noteEn : p.noteJa}
              </p>

              <ul className="mb-10 flex-1 space-y-3 text-sm text-neutral-700">
                {(en ? p.featuresEn : p.featuresJa).map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-px w-3 shrink-0",
                        p.accent ? "bg-[#e5341a]" : "bg-neutral-900"
                      )}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={cn(
                  "inline-flex h-10 items-center justify-center border text-sm font-medium transition-colors",
                  p.accent
                    ? "border-neutral-900 bg-neutral-900 text-neutral-50 hover:bg-neutral-800"
                    : "border-neutral-300 text-neutral-900 hover:border-neutral-900"
                )}
              >
                {en ? "Choose" : "選択する"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
