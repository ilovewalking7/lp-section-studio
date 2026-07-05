import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "パリ風カフェカード",
  category: "洋風",
  description: "パリ風カフェ／ベーカリーの案内カード。営業時間と所在地を上品に提示。",
  align: "center",
  isNew: true,
  tags: ["洋風", "cafe", "paris", "bakery"],
  principle: "手描き風アイコンとセリフ屋号で『街角の老舗』らしい親密さを醸す。",
};

export default function ParisCafeCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm bg-[#f8f5ef] p-5 text-stone-800">
      <div className="border border-stone-300 bg-[#f3ede1] p-7 text-center">
        <Croissant className="mx-auto h-14 text-amber-700" />

        <p className="mt-5 text-[10px] uppercase tracking-[0.35em] text-stone-400">
          Boulangerie · Café
        </p>
        <h3 className="mt-2 font-display text-3xl italic text-stone-900">
          Le Petit Coin
        </h3>

        <div className="mx-auto my-5 flex w-32 items-center gap-3 text-stone-400">
          <span className="h-px flex-1 bg-stone-300" />
          <span className="text-xs text-amber-700">✦</span>
          <span className="h-px flex-1 bg-stone-300" />
        </div>

        <p className="text-sm leading-relaxed text-stone-600">
          {en
            ? "Freshly baked croissants and carefully brewed café au lait — in a small corner of Paris where the morning light streams in."
            : "焼きたてのクロワッサンと、丁寧に淹れたカフェ・オ・レを。朝の光が差し込む、小さなパリの片隅で。"}
        </p>

        <div className="mt-6 space-y-2 text-sm text-stone-700">
          <p className="flex items-center justify-center gap-2">
            <Clock className="size-4 text-amber-700" />
            {en ? "7:00 – 19:00 · Closed Tuesdays" : "7:00 – 19:00 · 火曜定休"}
          </p>
          <p className="flex items-center justify-center gap-2">
            <MapPin className="size-4 text-amber-700" />
            12 Rue des Lilas, Paris
          </p>
        </div>

        <Button className="mt-7 h-11 w-full rounded-none bg-stone-900 text-[11px] uppercase tracking-[0.25em] text-[#f8f5ef] hover:bg-stone-800">
          {en ? "Reserve a table" : "席を予約する"}
        </Button>
      </div>
    </div>
  );
}

function Croissant({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" fill="none" className={className} aria-hidden>
      <path
        d="M6 40c8-26 44-26 52 0M6 40c0-6 6-10 14-9M58 40c0-6-6-10-14-9M20 31c2-7 22-7 24 0M32 28c0-5-2-9-6-11M32 28c0-5 2-9 6-11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
