import { Quote, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・推薦文",
  category: "ブルータリスト",
  description: "極太ボーダーのブロックに収めた引用とレビュー。",
  align: "center",
  isNew: true,
  tags: ["brutalist", "bold", "testimonial"],
};

export default function BrutalTestimonial() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="bg-fuchsia-400 p-8 font-sans text-black">
      <figure className="w-96 max-w-full border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-12 w-12 items-center justify-center border-4 border-black bg-yellow-300">
            <Quote className="h-6 w-6" fill="black" strokeWidth={0} />
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5" fill="black" strokeWidth={0} />
            ))}
          </div>
        </div>

        <blockquote className="mt-5 text-xl font-black leading-snug">
          {en
            ? "“Shipped to production in five minutes. I've never used such a decisive UI kit.”"
            : "「導入5分で本番に出せた。こんなに迷いのないUIキットは初めてだ。」"}
        </blockquote>

        <figcaption className="mt-6 flex items-center gap-3 border-t-2 border-black pt-4">
          <span className="flex h-11 w-11 items-center justify-center border-2 border-black bg-cyan-300 font-black">
            {en ? "Y" : "田"}
          </span>
          <div>
            <div className="font-black uppercase">
              {en ? "Yui Tanaka" : "田中 結衣"}
            </div>
            <div className="font-mono text-xs font-bold">CTO, Tofu Inc.</div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
