import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ファインダイニングメニュー",
  category: "洋風",
  description: "高級レストランのコースメニュー。点線リーダーと ¥ 価格で気品を演出。",
  align: "full",
  isNew: true,
  tags: ["洋風", "menu", "fine-dining", "luxury"],
  principle: "点線リーダーとセリフ書体が『正餐』の儀式性を喚起し、価格への抵抗を和らげる。",
};

type Dish = {
  id: string;
  name: string;
  nameEn: string;
  fr: string;
  desc: string;
  descEn: string;
  price: string;
};

const courses: {
  id: string;
  section: string;
  sectionEn: string;
  items: Dish[];
}[] = [
  {
    id: "entrees",
    section: "Entrées · 前菜",
    sectionEn: "Entrées · Starters",
    items: [
      {
        id: "bisque",
        name: "オマール海老のビスク",
        nameEn: "Lobster Bisque",
        fr: "Bisque de Homard",
        desc: "コニャックの香り、生クリームと共に",
        descEn: "Scented with cognac, finished with fresh cream",
        price: "¥2,800",
      },
      {
        id: "foiegras",
        name: "フォアグラのテリーヌ",
        nameEn: "Foie Gras Terrine",
        fr: "Terrine de Foie Gras",
        desc: "無花果のコンフィチュール添え",
        descEn: "Served with fig confiture",
        price: "¥3,400",
      },
    ],
  },
  {
    id: "plats",
    section: "Plats · 主菜",
    sectionEn: "Plats · Mains",
    items: [
      {
        id: "canard",
        name: "鴨胸肉のロースト",
        nameEn: "Roast Duck Breast",
        fr: "Magret de Canard",
        desc: "オレンジソース、季節の根菜",
        descEn: "Orange sauce, seasonal root vegetables",
        price: "¥4,600",
      },
      {
        id: "sole",
        name: "舌平目のムニエル",
        nameEn: "Sole Meunière",
        fr: "Sole Meunière",
        desc: "ブールノワゼット、ケッパー",
        descEn: "Beurre noisette, capers",
        price: "¥5,200",
      },
    ],
  },
  {
    id: "desserts",
    section: "Desserts · 甘味",
    sectionEn: "Desserts · Sweets",
    items: [
      {
        id: "souffle",
        name: "スフレ・オ・ショコラ",
        nameEn: "Chocolate Soufflé",
        fr: "Soufflé au Chocolat",
        desc: "バニラのアングレーズ",
        descEn: "Vanilla crème anglaise",
        price: "¥1,800",
      },
    ],
  },
];

export default function FineDiningMenu() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#f8f5ef] px-6 py-16 text-stone-800">
      <div className="mx-auto max-w-2xl border border-stone-300 bg-[#f3ede1] px-8 py-12 sm:px-12">
        <div className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-amber-700">
            Le Restaurant
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-stone-900">
            Menu Dégustation
          </h2>
          <div className="mx-auto mt-4 flex w-40 items-center gap-3 text-stone-400">
            <span className="h-px flex-1 bg-stone-300" />
            <span className="text-xs">✦</span>
            <span className="h-px flex-1 bg-stone-300" />
          </div>
        </div>

        <div className="space-y-10">
          {courses.map((course) => (
            <div key={course.id}>
              <h3 className="mb-5 text-center text-[11px] uppercase tracking-[0.35em] text-[#7b2d3a]">
                {en ? course.sectionEn : course.section}
              </h3>
              <ul className="space-y-5">
                {course.items.map((dish) => (
                  <li key={dish.id}>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-lg text-stone-900">
                        {en ? dish.nameEn : dish.name}
                      </span>
                      <span className="flex-1 translate-y-[-3px] border-b border-dotted border-stone-400" />
                      <span className="font-display text-lg text-stone-900">
                        {dish.price}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs italic text-stone-500">
                      {dish.fr} — {en ? dish.descEn : dish.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-stone-400">
          {en
            ? "Service compris · Tax & service charge included"
            : "Service compris · 税・サービス料込"}
        </p>
      </div>
    </section>
  );
}
