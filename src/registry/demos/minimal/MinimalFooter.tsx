import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ミニマル・フッター",
  category: "ミニマル",
  description: "グリッド列と繊細なタイポで構成した、静かなフッター。",
  align: "full",
  isNew: true,
  tags: ["minimal", "swiss", "footer"],
  principle: "整列した列と細い書体が、情報量を保ちつつ静けさを与える。",
};

const columns = [
  { head: "Studio", links: ["Work", "About", "Journal", "Contact"] },
  { head: "Resources", links: ["Docs", "Components", "Changelog", "Status"] },
  { head: "Legal", links: ["Privacy", "Terms", "License"] },
];

export default function MinimalFooter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <footer className="w-full bg-white font-sans text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 border-t border-neutral-900 pt-12">
          <div className="col-span-12 md:col-span-5">
            <div className="text-sm font-medium uppercase tracking-[0.3em]">
              Atelier<span className="text-[#e5341a]">.</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              {en
                ? "A component studio for disciplined grids and precise typography."
                : "規律あるグリッドと精密なタイポグラフィのためのコンポーネントスタジオ。"}
            </p>
          </div>

          {columns.map((col) => (
            <nav
              key={col.head}
              className="col-span-6 md:col-span-2 lg:col-span-2"
            >
              <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                {col.head}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-neutral-200 pt-6 text-[11px] uppercase tracking-[0.2em] text-neutral-400 sm:flex-row sm:items-center">
          <span className="tabular-nums">© 2026 Atelier Studio</span>
          <span>International Typographic Style</span>
        </div>
      </div>
    </footer>
  );
}
