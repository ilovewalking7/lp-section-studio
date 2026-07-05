import { ArrowUpRight, Check } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ラベル・バッジ集",
  category: "ミニマル",
  description: "ミニマルなラベル・タグ・バッジの一式。",
  align: "center",
  isNew: true,
  tags: ["minimal", "swiss", "badge"],
  principle: "形状を最小化し、種別差を罫線と無彩色の濃淡だけで表現する。",
};

export default function LabelBadgeSet() {
  return (
    <div className="w-full max-w-md space-y-10 bg-white font-sans text-neutral-900">
      <section>
        <div className="mb-4 text-[11px] uppercase tracking-[0.25em] text-neutral-400">
          Labels
        </div>
        <div className="flex flex-wrap gap-2">
          {["Design", "Type", "Grid", "Color", "Motion"].map((l) => (
            <span
              key={l}
              className="border border-neutral-200 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-neutral-600"
            >
              {l}
            </span>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 text-[11px] uppercase tracking-[0.25em] text-neutral-400">
          Status
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-neutral-900 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-50">
            <Check className="size-3" />
            Stable
          </span>
          <span className="inline-flex items-center gap-1.5 border border-neutral-300 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-700">
            Beta
          </span>
          <span className="inline-flex items-center gap-1.5 px-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[#e5341a]">
            <span className="size-1.5 rounded-full bg-[#e5341a]" />
            New
          </span>
        </div>
      </section>

      <section>
        <div className="mb-4 text-[11px] uppercase tracking-[0.25em] text-neutral-400">
          Counters
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { k: "Issues", v: "012" },
            { k: "PRs", v: "07" },
            { k: "Stars", v: "248" },
          ].map((c) => (
            <span
              key={c.k}
              className="inline-flex items-center gap-2 border border-neutral-200 py-1 pl-3 pr-1 text-[11px] uppercase tracking-[0.15em] text-neutral-600"
            >
              {c.k}
              <span className="bg-neutral-100 px-2 py-0.5 tabular-nums text-neutral-900">
                {c.v}
              </span>
            </span>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 text-[11px] uppercase tracking-[0.25em] text-neutral-400">
          Tags
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {["minimal", "swiss", "monochrome", "grid"].map((t) => (
            <a
              key={t}
              href="#"
              className="group inline-flex items-center gap-0.5 text-sm text-neutral-700 hover:text-neutral-900"
            >
              <span className="text-neutral-400">#</span>
              {t}
              <ArrowUpRight className="size-3 text-neutral-300 transition-colors group-hover:text-neutral-900" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
