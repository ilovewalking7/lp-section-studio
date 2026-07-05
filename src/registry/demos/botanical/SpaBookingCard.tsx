import * as React from "react";
import { Clock, Flower2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スパ予約カード",
  category: "ボタニカル",
  description: "時間枠を選べるスパ・トリートメント予約カード。",
  align: "center",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

const slots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

export default function SpaBookingCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = React.useState<string | null>("13:00");

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-[#5e6b4f]/20 bg-[#f3f1e7] text-[#3f4a35] shadow-[0_12px_40px_-20px_rgba(63,74,53,0.5)]">
      <div className="bg-gradient-to-br from-[#5e6b4f] to-[#3f4a35] px-7 py-6 text-[#f3f1e7]">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] tracking-widest">
          <Flower2 className="size-3" /> SIGNATURE
        </span>
        <h3 className="mt-3 font-serif text-2xl font-medium">
          {en
            ? "Herbal Aroma Full-Body Treatment"
            : "ハーバルアロマ全身トリートメント"}
        </h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#f3f1e7]/80">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {en ? "90 min" : "90分"}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" />{" "}
            {en ? "Omotesando Studio" : "表参道スタジオ"}
          </span>
        </div>
      </div>

      <div className="p-7">
        <p className="text-xs font-medium tracking-wide text-[#5e6b4f]">
          {en ? "Available today" : "本日空いている時間"}
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {slots.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={cn(
                "rounded-xl border py-2.5 text-sm transition-colors",
                active === s
                  ? "border-[#5e6b4f] bg-[#5e6b4f] text-[#f3f1e7]"
                  : "border-[#5e6b4f]/25 bg-white/40 text-[#3f4a35] hover:border-[#5e6b4f]/50"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-xs text-[#5e6b4f]/70">{en ? "Price" : "料金"}</p>
            <p className="font-serif text-2xl font-medium">¥12,000</p>
          </div>
          <Button
            disabled={!active}
            className="h-11 rounded-full bg-[#5e6b4f] px-6 text-sm tracking-wide text-[#f3f1e7] hover:bg-[#4b563f]"
          >
            {active
              ? en
                ? `Book ${active}`
                : `${active} で予約`
              : en
                ? "Select a time"
                : "時間を選択"}
          </Button>
        </div>
      </div>
    </div>
  );
}
