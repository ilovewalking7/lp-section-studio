import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブティック商品カード",
  category: "洋風",
  description: "ブティックの商品カード。CSS/SVG の品物、上品な価格と『カートに追加』。",
  align: "center",
  isNew: true,
  tags: ["洋風", "boutique", "product", "luxury"],
  principle: "余白・細罫・セリフ価格で『丁寧に扱われる商品』という質感を演出する。",
};

export default function BoutiqueProduct() {
  const [added, setAdded] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full max-w-sm bg-[#f8f5ef] p-5 text-stone-800">
      <div className="border border-stone-300 bg-[#f3ede1]">
        <div className="relative flex aspect-square items-center justify-center bg-gradient-to-b from-[#efe7d6] to-[#e6dcc6]">
          <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.3em] text-amber-700">
            Nouveau
          </span>
          <Perfume className="h-44 text-stone-700" />
        </div>

        <div className="space-y-4 p-6">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400">
              Eau de Parfum
            </p>
            <h3 className="mt-2 font-display text-2xl italic tracking-tight text-stone-900">
              Fleur de Nuit
            </h3>
          </div>

          <div className="flex items-center justify-center gap-3 text-amber-700">
            <span className="h-px w-8 bg-amber-600/60" />
            <span className="text-xs">50 ml</span>
            <span className="h-px w-8 bg-amber-600/60" />
          </div>

          <p className="text-center text-sm leading-relaxed text-stone-600">
            {en
              ? "Jasmine and sandalwood interwoven — a scent that wears the quiet of the night."
              : "ジャスミンとサンダルウッドが織りなす、夜の静けさを纏う香り。"}
          </p>

          <div className="flex items-baseline justify-center gap-1 pt-1">
            <span className="font-display text-3xl text-stone-900">¥18,000</span>
            <span className="text-xs text-stone-400 line-through">¥22,000</span>
          </div>

          <Button
            onClick={() => setAdded(true)}
            className={cn(
              "h-11 w-full rounded-none text-[11px] uppercase tracking-[0.25em] transition-colors",
              added
                ? "bg-[#5b6650] text-[#f8f5ef] hover:bg-[#5b6650]"
                : "bg-stone-900 text-[#f8f5ef] hover:bg-stone-800"
            )}
          >
            {added ? (
              <>
                <Check /> {en ? "Added" : "追加しました"}
              </>
            ) : (
              <>
                <ShoppingBag /> {en ? "Add to cart" : "カートに追加"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Perfume({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 120" fill="none" className={className} aria-hidden>
      <rect x="32" y="6" width="16" height="14" stroke="currentColor" strokeWidth="1.5" />
      <rect x="34" y="20" width="12" height="8" fill="currentColor" opacity="0.15" />
      <rect x="36" y="20" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M22 40c0-6 5-12 18-12s18 6 18 12v58c0 8-6 14-18 14s-18-6-18-14V40z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line x1="22" y1="70" x2="58" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <text
        x="40"
        y="86"
        textAnchor="middle"
        fontSize="9"
        fontStyle="italic"
        fill="currentColor"
        opacity="0.6"
      >
        F·N
      </text>
    </svg>
  );
}
