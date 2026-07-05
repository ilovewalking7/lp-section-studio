import { Droplets, Leaf, Recycle, Trees } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボタニカル・スタッツ",
  category: "ボタニカル",
  description: "葉のモチーフを添えたサステナビリティのインパクト指標。",
  align: "full",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

const stats = [
  {
    icon: Trees,
    value: "128,000",
    label: "植樹した本数",
    labelEn: "Trees planted",
    suffix: "本",
    suffixEn: "",
  },
  {
    icon: Recycle,
    value: "100",
    label: "リサイクル容器",
    labelEn: "Recycled packaging",
    suffix: "%",
    suffixEn: "%",
  },
  {
    icon: Droplets,
    value: "2.4M",
    label: "節水したリットル",
    labelEn: "Liters of water saved",
    suffix: "L",
    suffixEn: "L",
  },
  {
    icon: Leaf,
    value: "94",
    label: "自然由来成分",
    labelEn: "Natural ingredients",
    suffix: "%",
    suffixEn: "%",
  },
];

export default function BotanicalStats() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#5e6b4f] px-6 py-16 text-[#f3f1e7]">
      <svg
        viewBox="0 0 600 120"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 w-full opacity-20"
        aria-hidden
      >
        <path
          d="M0 60 C100 60 150 30 300 30 C450 30 500 90 600 90"
          stroke="#cdd4b6"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-lg text-center">
          <span className="text-xs tracking-[0.3em] text-[#cdd4b6]">
            OUR IMPACT · 2025
          </span>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight">
            {en
              ? "Where beauty meets responsibility to the planet"
              : "美しさと、地球への責任を両立する"}
          </h2>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map(({ icon: Icon, value, label, labelEn, suffix, suffixEn }) => (
            <div key={labelEn} className="text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#f3f1e7]/12 text-[#cdd4b6]">
                <Icon className="size-6" />
              </span>
              <dd className="mt-4 font-serif text-4xl font-medium leading-none">
                {value}
                <span className="text-xl text-[#cdd4b6]">{en ? suffixEn : suffix}</span>
              </dd>
              <dt className="mt-2 text-xs tracking-wide text-[#f3f1e7]/80">
                {en ? labelEn : label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
