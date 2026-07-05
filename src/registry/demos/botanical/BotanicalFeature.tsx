import { Droplets, Recycle, ShieldCheck, Sprout } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボタニカル・フィーチャー",
  category: "ボタニカル",
  description: "植物のラインアートを背景にした特徴・ベネフィット紹介セクション。",
  align: "full",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

function BranchLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 120" fill="none" className={className} aria-hidden>
      <path
        d="M0 60 C80 60 120 40 200 40 C280 40 320 80 400 80"
        stroke="#86a06d"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      {[60, 140, 220, 300].map((x, i) => (
        <g key={x} stroke="#86a06d" strokeWidth="1.2" strokeOpacity="0.5">
          <path d={`M${x} ${48 - i * 2} l-10 -14`} />
          <path d={`M${x} ${48 - i * 2} l10 -14`} />
        </g>
      ))}
    </svg>
  );
}

const features = [
  {
    icon: Sprout,
    titleJa: "畑から処方へ",
    titleEn: "From field to formula",
    descJa: "契約農家で育てた植物を、収穫から72時間以内に抽出。鮮度の高い有効成分を届けます。",
    descEn: "Plants grown on partner farms are extracted within 72 hours of harvest, delivering fresh, active ingredients.",
  },
  {
    icon: Droplets,
    titleJa: "やさしい保湿",
    titleEn: "Gentle hydration",
    descJa: "肌のうるおいバリアを守る植物オイルブレンド。敏感肌の方にも穏やかに寄り添います。",
    descEn: "A plant-oil blend that protects the skin's moisture barrier — gentle even for sensitive skin.",
  },
  {
    icon: ShieldCheck,
    titleJa: "確かな安全性",
    titleEn: "Proven safety",
    descJa: "全成分を開示し、第三者機関でパッチテスト済み。安心して毎日使える処方です。",
    descEn: "Every ingredient is disclosed and third-party patch-tested — a formula you can trust to use daily.",
  },
  {
    icon: Recycle,
    titleJa: "地球への配慮",
    titleEn: "Kind to the planet",
    descJa: "容器は100%リサイクル素材。詰め替えプログラムで廃棄物を最小限に抑えます。",
    descEn: "Packaging is 100% recycled material, and our refill program keeps waste to a minimum.",
  },
];

export default function BotanicalFeature() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#f3f1e7] px-6 py-20 text-[#3f4a35]">
      <BranchLine className="pointer-events-none absolute left-0 top-10 h-28 w-full opacity-60" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-4xl font-medium tracking-tight">
            {en ? "Botanical wisdom for everyday care" : "植物の知恵を、毎日のケアに"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5e6b4f]">
            {en
              ? "Our commitment, born from the harmony of nature and science."
              : "自然と科学の調和から生まれる、わたしたちのこだわり。"}
          </p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {features.map(({ icon: Icon, titleJa, titleEn, descJa, descEn }) => (
            <div key={titleEn} className="flex gap-5">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#5e6b4f]/12 text-[#5e6b4f]">
                <Icon className="size-6" />
              </span>
              <div>
                <h3 className="font-serif text-xl font-medium">
                  {en ? titleEn : titleJa}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5e6b4f]">
                  {en ? descEn : descJa}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
