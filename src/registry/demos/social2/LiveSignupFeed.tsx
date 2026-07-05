import { useEffect, useState } from "react";
import { UserPlus, Circle } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ライブ登録フィード",
  category: "マーケティング",
  description: "新規登録が上から流れ込み、既存行が下へ送られるライブ風アクティビティフィード。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const POOL = [
  { name: "佐藤 美咲", nameEn: "Misaki Sato", city: "東京", cityEn: "Tokyo", color: "bg-rose-500" },
  { name: "Liam Carter", nameEn: "Liam Carter", city: "London", cityEn: "London", color: "bg-sky-500" },
  { name: "田中 健", nameEn: "Ken Tanaka", city: "大阪", cityEn: "Osaka", color: "bg-violet-500" },
  { name: "Aria Novak", nameEn: "Aria Novak", city: "Berlin", cityEn: "Berlin", color: "bg-amber-500" },
  { name: "鈴木 葵", nameEn: "Aoi Suzuki", city: "名古屋", cityEn: "Nagoya", color: "bg-emerald-500" },
  { name: "Noah Kim", nameEn: "Noah Kim", city: "Seoul", cityEn: "Seoul", color: "bg-indigo-500" },
  { name: "山本 蓮", nameEn: "Ren Yamamoto", city: "福岡", cityEn: "Fukuoka", color: "bg-orange-500" },
  { name: "Mia Chen", nameEn: "Mia Chen", city: "Taipei", cityEn: "Taipei", color: "bg-teal-500" },
];

function initials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("");
}

type Row = (typeof POOL)[number] & { key: number; ago: number };

function agoLabel(mins: number, en: boolean) {
  if (mins === 0) return en ? "just now" : "たった今";
  return en ? `${mins}m ago` : `${mins}分前`;
}

export default function LiveSignupFeed() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [rows, setRows] = useState<Row[]>(() =>
    POOL.slice(0, 4).map((p, i) => ({ ...p, key: i, ago: (i + 1) * 2 }))
  );

  useEffect(() => {
    let n = 100;
    const t = setInterval(() => {
      setRows((prev) => {
        const pick = POOL[Math.floor(Math.random() * POOL.length)];
        const next: Row = { ...pick, key: n++, ago: 0 };
        const aged = prev.map((r, i) => ({ ...r, ago: i === 0 ? 1 : r.ago }));
        return [next, ...aged].slice(0, 4);
      });
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="w-full px-6 py-12">
      <style>{`
        @keyframes social2FeedIn { from{ opacity:0; transform: translateY(-12px) scale(.98) } to{ opacity:1; transform:none } }
        .feed-row { animation: social2FeedIn .45s ease both }
        @media (prefers-reduced-motion: reduce){ .feed-row{ animation:none } }
      `}</style>
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <Circle className="size-2.5 fill-emerald-500 text-emerald-500" />
          </span>
          {en ? "Live sign-ups" : "ライブ・新規登録"}
        </div>
        <ul className="space-y-2.5">
          {rows.map((r) => (
            <li
              key={r.key}
              className="feed-row flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm"
            >
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${r.color}`}>
                {initials(en ? r.nameEn : r.name)}
              </span>
              <span className="flex-1 leading-tight">
                <span className="block text-sm text-foreground">
                  {en ? (
                    <><span className="font-semibold">{r.nameEn}</span> just signed up</>
                  ) : (
                    <><span className="font-semibold">{r.name}</span> さんが登録しました</>
                  )}
                </span>
                <span className="block text-xs text-muted-foreground">{en ? r.cityEn : r.city}</span>
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap text-xs text-muted-foreground">
                <UserPlus className="size-3.5 text-emerald-500" />
                {agoLabel(r.ago, en)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
