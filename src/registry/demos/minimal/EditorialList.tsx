import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "エディトリアル・インデックス",
  category: "ミニマル",
  description: "罫線で区切った番号付き目次。書籍のような構成。",
  align: "full",
  isNew: true,
  tags: ["minimal", "swiss", "editorial"],
  principle: "通し番号と罫線が走査を助け、一覧の階層を明確にする。",
};

const items = [
  { no: "01", ja: "グリッドの規律", en: "Grid discipline", meta: "Foundations", page: "012" },
  { no: "02", ja: "タイポグラフィの階層", en: "Type hierarchy", meta: "Type", page: "028" },
  { no: "03", ja: "余白とリズム", en: "Whitespace & rhythm", meta: "Space", page: "046" },
  { no: "04", ja: "モノクロームの色設計", en: "Monochrome color", meta: "Color", page: "061" },
  { no: "05", ja: "ヘアラインと境界", en: "Hairlines & borders", meta: "Detail", page: "079" },
  { no: "06", ja: "反転とコントラスト", en: "Inversion & contrast", meta: "Inversion", page: "094" },
];

export default function EditorialList() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-white font-sans text-neutral-900">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <header className="mb-12 flex items-baseline justify-between border-b border-neutral-900 pb-4">
          <h2 className="text-2xl font-medium tracking-tight">{en ? "Contents" : "目次"}</h2>
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            Contents — 06
          </span>
        </header>

        <ol className="border-t border-neutral-200">
          {items.map((it) => (
            <li key={it.no}>
              <a
                href="#"
                className="group grid grid-cols-12 items-baseline gap-4 border-b border-neutral-200 py-6 transition-colors hover:bg-neutral-50"
              >
                <span className="col-span-2 text-sm tabular-nums tracking-[0.2em] text-neutral-400 md:col-span-1">
                  {it.no}
                </span>
                <span className="col-span-7 text-lg font-medium tracking-tight md:col-span-7">
                  {en ? it.en : it.ja}
                </span>
                <span className="col-span-3 hidden text-[11px] uppercase tracking-[0.2em] text-neutral-500 md:block">
                  {it.meta}
                </span>
                <span className="col-span-3 text-right text-sm tabular-nums text-neutral-400 md:col-span-1">
                  {it.page}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
