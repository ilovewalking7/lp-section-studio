import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "推薦コメントマーキー",
  category: "マーキー",
  description: "アバターと引用付きの推薦カードが横スクロール。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "testimonial"],
};

const ITEMS = [
  { name: "佐藤 美咲", nameEn: "Misaki Sato", role: "PdM", color: "bg-rose-500", quote: "導入初日でチームの生産性が跳ね上がりました。手放せません。", quoteEn: "Our team's productivity jumped on day one. We can't go back." },
  { name: "Liam Carter", nameEn: "Liam Carter", role: "Engineer", color: "bg-sky-500", quote: "API が驚くほど素直。ドキュメントも丁寧で実装が速い。", quoteEn: "The API is remarkably clean. Great docs make implementation fast." },
  { name: "田中 健", nameEn: "Ken Tanaka", role: "Designer", color: "bg-violet-500", quote: "細部の作り込みが本当に美しい。見ていて楽しいプロダクト。", quoteEn: "The attention to detail is genuinely beautiful. A joy to use." },
  { name: "Aria Novak", nameEn: "Aria Novak", role: "Founder", color: "bg-amber-500", quote: "投資対効果が明確。経営判断として迷いはありませんでした。", quoteEn: "The ROI is clear. It was an easy call to make as a leader." },
  { name: "鈴木 葵", nameEn: "Aoi Suzuki", role: "Marketer", color: "bg-emerald-500", quote: "計測から改善までが一気通貫。数字が素直に伸びました。", quoteEn: "Measure to improve, end to end. The numbers grew steadily." },
];

function initials(name: string) {
  return name.replace(/\s+/g, " ").trim().split(" ").map((p) => p[0]).slice(0, 2).join("");
}

export default function TestimonialMarquee() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="w-full py-8">
      <style>{`
        @keyframes testimonialScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .testimonial-track { animation: testimonialScroll 40s linear infinite; }
        .testimonial-mask:hover .testimonial-track { animation-play-state: paused; }
      `}</style>
      <div
        className="testimonial-mask group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="testimonial-track flex w-max items-stretch gap-5 pr-5">
          {[...ITEMS, ...ITEMS].map((t, i) => (
            <figure
              key={`${t.nameEn}-${i}`}
              className="flex w-80 shrink-0 flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <blockquote className="text-sm leading-relaxed text-foreground">
                “{en ? t.quoteEn : t.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span
                  className={`flex size-9 items-center justify-center rounded-full text-xs font-bold text-white ${t.color}`}
                >
                  {initials(t.nameEn)}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-foreground">{en ? t.nameEn : t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
