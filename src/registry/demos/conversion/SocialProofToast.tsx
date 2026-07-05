import { useEffect, useState } from "react";
import { Check, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソーシャルプルーフ通知",
  category: "コンバージョン",
  description:
    "「○○さんが3分前に購入」をsetIntervalで巡回表示するフローティング通知。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["social-proof", "fomo", "toast"],
  principle:
    "他者のリアルな購入行動を可視化する社会的証明で「みんな買っている」というバンドワゴン効果を生み、未購入者のFOMOと不安を下げて後押しする。",
};

type Entry = {
  name: string;
  productJa: string;
  productEn: string;
  cityJa: string;
  cityEn: string;
  agoJa: string;
  agoEn: string;
  hue: string;
};

const ENTRIES: Entry[] = [
  { name: "佐藤 健太", productJa: "Pro 年間プラン", productEn: "Pro Annual Plan", cityJa: "東京", cityEn: "Tokyo", agoJa: "たった今", agoEn: "just now", hue: "from-sky-500 to-indigo-500" },
  { name: "Emily R.", productJa: "スターターキット", productEn: "Starter Kit", cityJa: "大阪", cityEn: "Osaka", agoJa: "3分前", agoEn: "3 min ago", hue: "from-emerald-500 to-teal-500" },
  { name: "田中 美咲", productJa: "Team シート ×5", productEn: "Team Seats ×5", cityJa: "福岡", cityEn: "Fukuoka", agoJa: "6分前", agoEn: "6 min ago", hue: "from-rose-500 to-pink-500" },
  { name: "Marcus L.", productJa: "Lifetime ライセンス", productEn: "Lifetime License", cityJa: "名古屋", cityEn: "Nagoya", agoJa: "9分前", agoEn: "9 min ago", hue: "from-amber-500 to-orange-500" },
  { name: "山本 翔", productJa: "Pro 月額プラン", productEn: "Pro Monthly Plan", cityJa: "札幌", cityEn: "Sapporo", agoJa: "12分前", agoEn: "12 min ago", hue: "from-violet-500 to-fuchsia-500" },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export default function SocialProofToast() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ENTRIES.length);
        setVisible(true);
      }, 350);
    }, 3200);
    return () => clearInterval(cycle);
  }, [dismissed]);

  const e = ENTRIES[index];

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 p-6">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {en ? "Live purchase feed" : "ライブ購入フィード"}
      </p>

      <div className="relative h-[88px] w-full">
        {dismissed ? (
          <button
            onClick={() => {
              setDismissed(false);
              setVisible(true);
            }}
            className="absolute inset-0 flex items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground transition-colors hover:bg-muted/50"
          >
            {en ? "Show notifications again" : "通知をもう一度表示"}
          </button>
        ) : (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-2xl border bg-card/95 p-3 pr-9 shadow-xl shadow-black/20 backdrop-blur transition-all duration-300",
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            )}
          >
            <div
              className={cn(
                "relative grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-sm font-semibold text-white",
                e.hue
              )}
            >
              {initials(e.name)}
              <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full border-2 border-card bg-emerald-500 text-white">
                <ShoppingBag className="size-2.5" />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {en ? (
                  <>
                    <span className="font-semibold">{e.name}</span> made a
                    purchase
                  </>
                ) : (
                  <>
                    <span className="font-semibold">{e.name}</span> さんが購入
                  </>
                )}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {en ? e.productEn : e.productJa} ・{" "}
                {en ? e.cityEn : e.cityJa}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-emerald-500">
                <Check className="size-3" />{" "}
                {en ? "Verified" : "認証済み"} ・ {en ? e.agoEn : e.agoJa}
              </p>
            </div>

            <button
              aria-label={en ? "Close" : "閉じる"}
              onClick={() => setDismissed(true)}
              className="absolute right-2 top-2 grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted"
            >
              <X className="size-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {ENTRIES.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              i === index && !dismissed
                ? "w-5 bg-primary"
                : "w-1.5 bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
