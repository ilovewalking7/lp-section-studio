import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "会席品書き",
  category: "和風",
  description: "会席コースの品書きを罫線で区切り、価格を税込で控えめに添えた和食メニュー。",
  align: "full",
  isNew: true,
  tags: ["和風", "japanese", "kaiseki", "menu"],
  principle: "縦の余白と細い罫線で一品ずつを丁寧に立てる。価格は小さく、料理名を主役にする。",
};

type Course = {
  id: string;
  kind: string;
  name: string;
  note: string;
  kindEn: string;
  nameEn: string;
  noteEn: string;
};

const courses: Course[] = [
  {
    id: "sakizuke",
    kind: "先付",
    name: "胡麻豆腐 山葵添え",
    note: "なめらかな口当たりを冷やして",
    kindEn: "Starter",
    nameEn: "Sesame tofu with wasabi",
    noteEn: "Served chilled for a silken texture",
  },
  {
    id: "wanmono",
    kind: "椀物",
    name: "蛤と若布の清汁仕立て",
    note: "出汁の香りを一椀に",
    kindEn: "Soup",
    nameEn: "Clear broth with clam and wakame",
    noteEn: "The fragrance of dashi in a single bowl",
  },
  {
    id: "mukouzuke",
    kind: "向付",
    name: "本日の鮮魚 三種盛り",
    note: "近海の旬を吟味して",
    kindEn: "Sashimi",
    nameEn: "Three kinds of today's fresh fish",
    noteEn: "Selected from the day's coastal catch",
  },
  {
    id: "yakimono",
    kind: "焼物",
    name: "鰆の西京焼き",
    note: "ほのかな甘みと焦がしの香",
    kindEn: "Grilled",
    nameEn: "Saikyo-grilled Spanish mackerel",
    noteEn: "A gentle sweetness and a hint of char",
  },
  {
    id: "shiizakana",
    kind: "強肴",
    name: "信州牛の陶板焼き",
    note: "山葵醤油でさっぱりと",
    kindEn: "Main",
    nameEn: "Shinshu beef on a hot stone plate",
    noteEn: "Light and clean with wasabi soy",
  },
  {
    id: "shokuji",
    kind: "食事",
    name: "土鍋炊き 新米ごはん",
    note: "香の物・赤出汁とともに",
    kindEn: "Rice",
    nameEn: "New-crop rice cooked in a clay pot",
    noteEn: "With pickles and red miso soup",
  },
  {
    id: "mizugashi",
    kind: "水菓子",
    name: "季節の果実と抹茶アイス",
    note: "甘味でしめくくりを",
    kindEn: "Dessert",
    nameEn: "Seasonal fruit and matcha ice cream",
    noteEn: "A sweet note to close the meal",
  },
];

export default function KaisekiMenu() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#efe9da] px-6 py-20 text-stone-800">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="font-mincho text-sm tracking-[0.4em] text-[#b7410e]">
            {en ? "MENU" : "お品書き"}
          </p>
          <h2 className="mt-3 font-mincho text-3xl font-medium tracking-[0.2em] text-stone-900">
            {en ? "Seasonal Kaiseki" : "旬彩 会席"}
          </h2>
          <p className="mt-3 text-sm text-stone-500">
            {en ? "June menu · Seven courses" : "水無月の献立 ・ 全七品"}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          {courses.map((c, i) => (
            <div
              key={c.id}
              className={`flex items-baseline gap-5 py-5 ${
                i !== 0 ? "border-t border-dashed border-stone-400/60" : ""
              }`}
            >
              <span className="w-12 shrink-0 font-mincho text-base tracking-widest text-[#1f3a5f]">
                {en ? c.kindEn : c.kind}
              </span>
              <div className="flex-1">
                <p className="font-mincho text-lg text-stone-900">
                  {en ? c.nameEn : c.name}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  {en ? c.noteEn : c.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-xl items-center justify-between border-t-2 border-[#1f3a5f]/40 pt-6">
          <span className="font-mincho text-base tracking-widest text-stone-700">
            {en ? "Course, per person" : "会席一名様"}
          </span>
          <span className="font-mincho text-2xl text-stone-900">
            ￥12,800
            <span className="ml-2 text-xs text-stone-500">
              {en ? "(tax incl.)" : "（税込）"}
            </span>
          </span>
        </div>
        <p className="mt-4 text-center text-[11px] text-stone-400">
          {en
            ? "The menu may change in part depending on the day's ingredients"
            : "仕入れにより献立は一部変更となる場合がございます"}
        </p>
      </div>
    </section>
  );
}
