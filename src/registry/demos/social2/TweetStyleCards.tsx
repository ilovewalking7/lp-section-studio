import { Heart, Repeat2, MessageCircle, BadgeCheck } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ツイート風カード",
  category: "マーケティング",
  description: "SNS投稿風の推薦カードグリッド。ホバーで浮き上がり、いいねがほんのり拍動。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const TWEETS = [
  { name: "佐藤 美咲", nameEn: "Misaki Sato", handle: "@misaki_pm", color: "bg-rose-500", verified: true, likes: 482, text: "このツール導入してから、チームの数字が素直に伸びてる。ほんと買ってよかった。", textEn: "Since we adopted this tool our team's numbers just keep climbing. So glad we bought it." },
  { name: "Liam Carter", nameEn: "Liam Carter", handle: "@liamcodes", color: "bg-sky-500", verified: true, likes: 1203, text: "API めちゃくちゃ素直。30分で本番に繋がった。神。", textEn: "The API is incredibly clean. Got it into production in 30 minutes. Amazing." },
  { name: "田中 健", nameEn: "Ken Tanaka", handle: "@ken_design", color: "bg-violet-500", verified: false, likes: 318, text: "細部のUIが本当に綺麗で、触ってて気持ちいい。デザイン好きにはたまらない。", textEn: "The UI details are genuinely beautiful and a joy to use. A treat for design lovers." },
  { name: "Aria Novak", nameEn: "Aria Novak", handle: "@aria_builds", color: "bg-amber-500", verified: true, likes: 765, text: "正直、もっと早く知りたかった。ROIが明確すぎる。", textEn: "Honestly, I wish I'd found this sooner. The ROI is crystal clear." },
  { name: "鈴木 葵", nameEn: "Aoi Suzuki", handle: "@aoi_mktg", color: "bg-emerald-500", verified: false, likes: 254, text: "計測→改善のループが一気に回るようになった。マーケの強い味方。", textEn: "The measure-and-improve loop now spins fast. A powerful ally for marketing." },
  { name: "Noah Kim", nameEn: "Noah Kim", handle: "@noah_cto", color: "bg-indigo-500", verified: true, likes: 991, text: "運用コスト半減。エンジニアが本質的な仕事に集中できてる。", textEn: "Ops costs halved. Our engineers can finally focus on work that matters." },
];

function initials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("");
}

export default function TweetStyleCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-12">
      <style>{`
        @keyframes social2HeartBeat { 0%,100%{ transform:scale(1) } 40%{ transform:scale(1.25) } }
        .tweet-card:hover .tweet-heart { animation: social2HeartBeat .6s ease }
        @media (prefers-reduced-motion: reduce){ .tweet-card:hover .tweet-heart{ animation:none } }
      `}</style>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight">{en ? "What people are posting" : "みんなの投稿"}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TWEETS.map((t) => (
            <article key={t.handle} className="tweet-card rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
              <header className="flex items-center gap-3">
                <span className={`flex size-10 items-center justify-center rounded-full text-sm font-bold text-white ${t.color}`}>
                  {initials(en ? t.nameEn : t.name)}
                </span>
                <span className="leading-tight">
                  <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    {en ? t.nameEn : t.name}
                    {t.verified && <BadgeCheck className="size-4 fill-sky-500 text-card" />}
                  </span>
                  <span className="block text-xs text-muted-foreground">{t.handle}</span>
                </span>
              </header>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{en ? t.textEn : t.text}</p>
              <footer className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><MessageCircle className="size-4" /> 24</span>
                <span className="flex items-center gap-1.5"><Repeat2 className="size-4" /> 58</span>
                <span className="flex items-center gap-1.5"><Heart className="tweet-heart size-4 fill-rose-500 text-rose-500" /> {t.likes}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
