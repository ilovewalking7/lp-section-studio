import { useMemo, useState } from "react";
import { ArrowUpRight, FileText, Hash, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフト検索",
  category: "ニューモーフィズム",
  description: "押し込み式の検索バーと結果リストを備えた、柔らかな検索UI。",
  align: "center",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "search"],
};

const INSET = "shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff]";

const data = [
  { icon: FileText, title: "デザインシステム入門", titleEn: "Intro to Design Systems", meta: "ドキュメント", metaEn: "Document" },
  { icon: User, title: "あおい・さん", titleEn: "Aoi", meta: "メンバー", metaEn: "Member" },
  { icon: Hash, title: "neumorphism", titleEn: "neumorphism", meta: "タグ・48件", metaEn: "Tag · 48 items" },
  { icon: FileText, title: "ソフトUI ガイドライン", titleEn: "Soft UI Guidelines", meta: "ドキュメント", metaEn: "Document" },
];

export default function SoftSearch() {
  const [q, setQ] = useState("");
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const results = useMemo(
    () =>
      q
        ? data.filter(
            (d) =>
              d.title.toLowerCase().includes(q.toLowerCase()) ||
              d.titleEn.toLowerCase().includes(q.toLowerCase()),
          )
        : data,
    [q],
  );

  return (
    <div className="w-full max-w-md rounded-3xl bg-[#e0e5ec] p-6 text-slate-600 shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]">
      <div className={cn("flex items-center gap-3 rounded-2xl bg-[#e0e5ec] px-4", INSET)}>
        <Search className="size-4 shrink-0 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={en ? "Search…" : "検索…"}
          className="w-full bg-transparent py-3.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label={en ? "Clear" : "クリア"} className="shrink-0 text-xs text-slate-400 hover:text-slate-600">
            ✕
          </button>
        )}
      </div>

      <div className={cn("mt-4 rounded-2xl bg-[#e0e5ec] p-2", INSET)}>
        {results.length === 0 ? (
          <p className="px-3 py-6 text-center text-sm text-slate-500">{en ? "No matching results" : "該当する結果がありません"}</p>
        ) : (
          <ul className="space-y-1">
            {results.map((r) => (
              <li key={r.titleEn}>
                <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-[#e0e5ec] hover:shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#e0e5ec] text-indigo-500 shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]">
                    <r.icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-slate-700">{en ? r.titleEn : r.title}</span>
                    <span className="block text-xs text-slate-500">{en ? r.metaEn : r.meta}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-slate-400 opacity-0 transition group-hover:opacity-100" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
