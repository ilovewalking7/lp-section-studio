import * as React from "react";
import { Check, Leaf, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スキンケア・プロダクト",
  category: "ボタニカル",
  description: "SVGボトル入りのスキンケア商品カード。価格とカート追加付き。",
  align: "center",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

function Bottle() {
  return (
    <svg viewBox="0 0 120 180" fill="none" className="h-44 w-auto" aria-hidden>
      <rect x="50" y="6" width="20" height="16" rx="3" fill="#3f4a35" />
      <rect x="44" y="20" width="32" height="12" rx="3" fill="#5e6b4f" />
      <path
        d="M40 38 C40 34 44 32 48 32 H72 C76 32 80 34 80 38 V160 C80 168 74 174 66 174 H54 C46 174 40 168 40 160 Z"
        fill="#e7e2cf"
        stroke="#5e6b4f"
        strokeWidth="1.5"
      />
      <rect x="48" y="74" width="24" height="64" rx="6" fill="#f3f1e7" />
      <g stroke="#86a06d" strokeWidth="1.4" fill="none">
        <path d="M60 122 C60 112 60 104 60 96" />
        <path d="M60 110 C54 106 50 108 49 113 C55 115 58 113 60 110Z" fill="#86a06d" />
        <path d="M60 102 C66 98 70 100 71 105 C65 107 62 105 60 102Z" fill="#86a06d" />
      </g>
    </svg>
  );
}

export default function SkincareProduct() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [added, setAdded] = React.useState(false);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-[#5e6b4f]/20 bg-[#f3f1e7] text-[#3f4a35] shadow-[0_12px_40px_-18px_rgba(63,74,53,0.5)]">
      <div className="relative flex h-56 items-center justify-center bg-gradient-to-b from-[#dfe3cf] to-[#cdd4b6]">
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#5e6b4f]">
          <Leaf className="size-3" /> {en ? "Best Seller" : "ベストセラー"}
        </span>
        <Bottle />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 text-[#b3753f]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
          <span className="ml-1 text-xs text-[#5e6b4f]/70">(248)</span>
        </div>
        <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight">
          {en ? "Botanical Beauty Oil" : "ボタニカル美容オイル"}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#5e6b4f]">
          {en
            ? "Blended with jojoba, chamomile, and rosehip to nourish and soften dry skin."
            : "ホホバ・カモミール・ローズヒップを配合。乾いた肌をしっとり整えます。"}
        </p>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="font-serif text-3xl font-medium">¥4,800</span>
            <span className="ml-1 text-xs text-[#5e6b4f]/60">/ 30ml</span>
          </div>
          <Button
            onClick={() => setAdded(true)}
            className={cn(
              "h-11 rounded-full px-5 text-sm tracking-wide transition-colors",
              added
                ? "bg-[#86a06d] text-white hover:bg-[#86a06d]"
                : "bg-[#5e6b4f] text-[#f3f1e7] hover:bg-[#4b563f]"
            )}
          >
            {added ? (
              <>
                <Check className="size-4" /> {en ? "Added" : "追加済み"}
              </>
            ) : (
              <>
                <Plus className="size-4" /> {en ? "Add to cart" : "カートへ"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
