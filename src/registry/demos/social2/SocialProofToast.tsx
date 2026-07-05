import { useEffect, useState } from "react";
import { CheckCircle2, ShoppingBag, UserPlus, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソーシャルプルーフトースト",
  category: "マーケティング",
  description: "「〇〇さんが登録しました」風の通知が左下から順番にスライドインして消える。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const EVENTS = [
  { icon: UserPlus, color: "bg-sky-500", name: { ja: "佐藤 美咲さん", en: "Misaki S." }, action: { ja: "が無料登録しました", en: " signed up free" }, city: { ja: "東京", en: "Tokyo" }, ago: { ja: "たった今", en: "just now" } },
  { icon: ShoppingBag, color: "bg-emerald-500", name: { ja: "Liam さん", en: "Liam" }, action: { ja: "がProプランを購入", en: " bought the Pro plan" }, city: { ja: "London", en: "London" }, ago: { ja: "1分前", en: "1 min ago" } },
  { icon: Star, color: "bg-amber-500", name: { ja: "田中 健さん", en: "Ken T." }, action: { ja: "が星5レビューを投稿", en: " posted a 5-star review" }, city: { ja: "大阪", en: "Osaka" }, ago: { ja: "3分前", en: "3 min ago" } },
  { icon: UserPlus, color: "bg-violet-500", name: { ja: "Aria さん", en: "Aria" }, action: { ja: "がチームを招待しました", en: " invited their team" }, city: { ja: "Berlin", en: "Berlin" }, ago: { ja: "5分前", en: "5 min ago" } },
];

export default function SocialProofToast() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let alive = true;
    const cycle = () => {
      if (!alive) return;
      setShow(true);
      const hide = setTimeout(() => alive && setShow(false), 3500);
      const next = setTimeout(() => {
        if (!alive) return;
        setIdx((i) => (i + 1) % EVENTS.length);
        cycle();
      }, 4800);
      return () => {
        clearTimeout(hide);
        clearTimeout(next);
      };
    };
    const cleanup = cycle();
    return () => {
      alive = false;
      cleanup?.();
    };
  }, []);

  const e = EVENTS[idx];

  return (
    <section className="relative w-full overflow-hidden px-6 py-12">
      <div className="mx-auto flex min-h-[14rem] max-w-3xl flex-col items-center justify-center rounded-3xl border border-border bg-muted/40 p-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{en ? "People are joining right now" : "いま、続々と参加しています"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{en ? "Real-time activity notifications." : "リアルタイムのアクティビティ通知。"}</p>

        <div
          aria-live="polite"
          className={`pointer-events-none absolute bottom-6 left-6 flex max-w-[20rem] items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-5 shadow-lg transition-all duration-500 ${
            show ? "translate-x-0 opacity-100" : "-translate-x-[120%] opacity-0"
          }`}
        >
          <span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-white ${e.color}`}>
            <e.icon className="size-5" />
          </span>
          <span className="text-left leading-tight">
            <span className="block text-sm text-foreground">
              <span className="font-semibold">{en ? e.name.en : e.name.ja}</span>
              {en ? e.action.en : e.action.ja}
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3 text-emerald-500" />
              {en ? `${e.city.en} · ${e.ago.en}` : `${e.city.ja}・${e.ago.ja}`}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
