import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Share2, Twitter, Facebook, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "シェア展開",
  category: "ボタン",
  description: "クリックで共有先アイコンが扇状に飛び出すシェアボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const items = [
    { Icon: Twitter, label: en ? "Share on Twitter" : "Twitterで共有", color: "bg-sky-500", offset: "-translate-x-16" },
    { Icon: Facebook, label: en ? "Share on Facebook" : "Facebookで共有", color: "bg-blue-600", offset: "-translate-x-32" },
    { Icon: Link2, label: en ? "Copy link" : "リンクをコピー", color: "bg-slate-600", offset: "-translate-x-48" },
  ];

  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-8">
      <div className="relative">
        {items.map(({ Icon, label, color, offset }, i) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            tabIndex={open ? 0 : -1}
            className={cn(
              "absolute right-0 top-0 grid size-11 place-items-center rounded-full text-white shadow-lg transition-all duration-300",
              color,
              open ? `${offset} opacity-100` : "translate-x-0 opacity-0"
            )}
            style={{ transitionDelay: `${open ? i * 50 : 0}ms` }}
          >
            <Icon className="size-4" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={en ? "Share" : "共有する"}
          aria-expanded={open}
          className="relative grid size-11 place-items-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-700 active:scale-[0.94]"
        >
          <Share2 className={cn("size-5 transition-transform duration-300", open && "rotate-90")} />
        </button>
      </div>
    </div>
  );
}
