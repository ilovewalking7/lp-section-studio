import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  ArrowUp,
  Blocks,
  Boxes,
  Check,
  ClipboardCopy,
  Code2,
  Gauge,
  Github,
  Heart,
  Lightbulb,
  MousePointerClick,
  Package,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  TrendingUp,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LangToggle } from "@/components/LangToggle";
import { Phrased } from "@/components/Phrased";
import { cn } from "@/lib/utils";
import { getPlans } from "@/lib/plan";
// 数字だけ要るので、ID 一覧を巻き込まないよう生成物から直接読む（LP の初期チャンク対策）
import { FREE_EDITION_COUNT } from "@/registry/freeCount";
import type { Lang } from "@/lib/i18n";

// --- Dogfooding: 実在の本物の3Dコンポーネントをそのまま読み込んで埋め込む ---
import OrbitingSpheres from "@/registry/demos/mat3d-object/OrbitingSpheres.tsx";
import AnchorPricing3D from "@/registry/demos/mat3d-psy-c/AnchorPricing3D.tsx";
import InteractiveProduct3D from "@/registry/demos/mat3d-psy-b/InteractiveProduct3D.tsx";
import GradientHeadlineHuge from "@/registry/demos/aww-type/GradientHeadlineHuge.tsx";
import EvervaultEncrypt from "@/registry/demos/cards2/EvervaultEncrypt.tsx";
import UrushiBowlTurn3D from "@/registry/demos/mat3d-wafu-b/UrushiBowlTurn3D.tsx";
import ReviewCarousel3D from "@/registry/demos/mat3d-psy-c/ReviewCarousel3D.tsx";

/* ------------------------------------------------------------------ *
 * 小さなユーティリティ（依存追加なし・自己完結）
 * ------------------------------------------------------------------ */

/** prefers-reduced-motion を購読する（SSR/jsdom セーフ）。 */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    // 旧 Safari 互換のため両 API を試す
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);
  return reduced;
}

/**
 * スクロール・リビール。IntersectionObserver で入域時にフェード／スライドイン。
 * IO が無い・発火しない環境でも必ず可視になる（マウント時フォールバック）。
 */
function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (shown) return;

    // フォールバック: IO 非対応なら即可視
    if (typeof IntersectionObserver === "undefined" || !node) {
      setShown(true);
      return;
    }

    let fallback: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);

    // 保険: IO が発火しない環境でも置いてけぼりにしない
    fallback = setTimeout(() => setShown(true), 1200);

    return () => {
      observer.disconnect();
      if (fallback) clearTimeout(fallback);
    };
  }, [shown]);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
        shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[2px]",
        className
      )}
    >
      {children}
    </Comp>
  );
}

/** 0 → target へ rAF でカウントアップ（reduced-motion 時は即値・アンマウントで停止）。 */
function useCountUp(target: number, reduced: boolean, durationMs = 1400): number {
  const [value, setValue] = useState(reduced ? target : 0);
  useEffect(() => {
    if (reduced || typeof requestAnimationFrame === "undefined") {
      setValue(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced, durationMs]);
  return value;
}

/* ------------------------------------------------------------------ *
 * ヒーローの見た目バリエーション（オーロラ / ダークテック / ミニマル）
 * ------------------------------------------------------------------ */

type HeroTheme = "aurora" | "darktech" | "minimal";

interface HeroThemeDef {
  id: HeroTheme;
  /** ヒーロー全体のラッパ背景 */
  shell: string;
  /** 見出しグラデーション */
  headline: string;
  /** アクセント（バッジ・微細パーツ） */
  accentText: string;
  /** カーソルグロウの色 */
  glow: string;
  /** プライマリ CTA */
  primaryCta: string;
  /** stat タイルの罫線色 */
  statShell: string;
  dark: boolean;
}

const HERO_THEMES: HeroThemeDef[] = [
  {
    id: "aurora",
    shell: "bg-background text-foreground",
    headline:
      "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent",
    accentText: "text-violet-500",
    glow: "rgba(139,92,246,0.28)",
    primaryCta:
      "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90",
    statShell: "bg-border",
    dark: false,
  },
  {
    id: "darktech",
    shell: "bg-[#070a16] text-slate-100",
    headline:
      "bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent",
    accentText: "text-cyan-300",
    glow: "rgba(34,211,238,0.30)",
    primaryCta:
      "bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 hover:opacity-90",
    statShell: "bg-white/10",
    dark: true,
  },
  {
    id: "minimal",
    shell: "bg-background text-foreground",
    headline: "text-foreground",
    accentText: "text-foreground",
    glow: "rgba(120,120,120,0.18)",
    primaryCta: "bg-foreground text-background hover:opacity-90",
    statShell: "bg-border",
    dark: false,
  },
];

/* ------------------------------------------------------------------ *
 * 二言語コピー辞書（ja / en は同一キー）
 * ------------------------------------------------------------------ */

const COPY = {
  ja: {
    brand: "LP Section Studio",
    // 狭いヘッダー用の短縮ブランド名
    brandShort: "LP Studio",
    navFeatures: "機能",
    navPricing: "料金",
    navStudio: "スタジオ",
    navOpenStudio: "スタジオを開く",
    ctaTryFree: "無料で使ってみる",
    // 狭いヘッダー用の短いラベル
    ctaTryFreeShort: "無料で試す",
    ctaSeePricing: "料金を見る",
    backToTop: "上に戻る",

    themeLabelAurora: "オーロラ",
    themeLabelDarktech: "ダークテック",
    themeLabelMinimal: "ミニマル",
    themeSwitchGroupLabel: "ヒーローの見た目を切り替え",
    themeSwitchPrefix: "見た目:",

    heroBadge: "完全自己完結・追加依存ゼロ",
    heroFocalCaption: "ライブ・プレビュー：これも一覧から1クリック",
    heroTitleLead: "ランディング|ページは、",
    heroTitleHighlight: "“組み立てる”|時代へ。",
    heroSub:
      "コピペできる本物の|LPセクションと、|動く3Dパーツ。|検索して、選んで、貼るだけ。|LPを完成させる部品が、|ぜんぶここにある。",

    statSections: "セクション",
    statStyles: "スタイル",
    statCategories: "カテゴリ",
    statFreeLabel: "無料で使える数",

    trustNote: "完全自己完結・追加依存ゼロ",
    trustTested: "全{n}件テスト済み（エラーゼロ）",
    marquee: [
      "コピペ",
      "npx shadcn add",
      "バニラHTML",
      "React / TypeScript",
      "ダーク / ライト",
      "3Dアニメ",
      "商用OK",
      "エラーゼロ品質",
      "CSSで動く＝SEOに強い3D",
    ],

    howBadge: "使い方",
    howHeading: "3ステップで、|貼るだけ。",
    howSub: "迷う余地をなくしました。|選んで、取り込んで、貼る。|それだけ。",
    how: [
      {
        title: "一覧から選ぶ",
        body: "カテゴリ・スタイル・タグで検索。ライブプレビューで動きを確かめてから決められる。",
      },
      {
        title: "取り込む",
        body: "コピペ、`npx shadcn add`、バニラHTML書き出しの3経路。スタックを問わない。",
      },
      {
        title: "貼るだけ",
        body: "自己完結なので外部依存も画像URLもなし。貼った瞬間から、もう動いている。",
      },
    ],
    howStepTags: ["コピペ", "npx shadcn add", "バニラHTML"],

    dogfoodBadge: "ライブ・プレビュー",
    dogfoodHeading: "動く。|本物の3D。|ぜんぶ一覧から。",
    dogfoodBodyA: "下に並んでいるのは、|すべてライブラリ内の",
    dogfoodBodyStrong: "本物の3Dコンポーネント。",
    dogfoodBodyB: "このLP自体が、|この一覧でできています。",
    dogfoodCaption: "ライブ・プレビュー：これも一覧から1クリックで使えます",

    dogfood: {
      orbit: { title: "オービット スフィア 3D", cat: "3Dオブジェクト" },
      anchor: { title: "アンカリング価格3D", cat: "価格・オファー" },
      product: { title: "インタラクティブ製品3D", cat: "コマース" },
      future: { title: "フューチャー見出し", cat: "テキストアニメ" },
      encrypt: { title: "暗号化カード演出", cat: "カード演出" },
      urushi: { title: "漆椀ターン3D（和風）", cat: "和風3D" },
      review: { title: "レビュー・カルーセル3D", cat: "社会的証明" },
    },

    perfBadge: "パフォーマンス",
    perfHeading: "速い。軽い。|SEOに強い。",
    perfSub:
      "CSS中心の設計だから、|フレームワーク無しでも動く。|中身はHTMLにあるので、|そのままクローラブル。",
    perfCards: [
      {
        title: "フレームワーク不要で軽い",
        body: "ランタイム同梱なし。バニラHTMLに書き出せば1ファイルで完結。初期JSを増やさない。",
      },
      {
        title: "中身がHTML＝SEOに強い",
        body: "見出しも本文も最初からマークアップに存在。クローラがJS実行なしで読める。",
      },
      {
        title: "ビルド不要でどこでも",
        body: "React / Astro / WordPress / 素のHTML、どこにでも貼れる。依存ゼロでCore Web Vitalsにも優しい。",
      },
    ],
    perfHeavyLabel: "重いWebGL / モーションSPA",
    perfHeavyPoints: [
      "初期JSが大きい",
      "フレームワーク＋モーションライブラリ前提",
      "内容がJS生成でSEO不利",
      "LCPが遅れがち",
    ],
    perfOursLabel: "CSS-firstのうち",
    perfOursPoints: [
      "初期JSはほぼゼロ",
      "依存ゼロ・バニラHTMLで書き出せる",
      "内容がHTMLでクローラブル",
      "LCP・CLS・INPに有利",
    ],
    perfNote:
      "※ 動く3DはCSSアニメ中心。canvas等のJS必須パーツも中身はHTMLにあるので“プログレッシブ・エンハンス”。動的バニラ（React再現）は別用途です。",

    featuresBadge: "選ばれる理由",
    featuresHeading: "なぜ、|これを選ぶのか。",
    featuresSub:
      "速さと品質を両立し、|人の「決め手」に|寄り添うように作られています。",
    features: [
      {
        title: "時間を買う",
        body: "ゼロから組むはずだった数時間を、検索して貼るだけの数分に。失う時間を、もう失わない。",
      },
      {
        title: "迷わない",
        body: "FAQ・導入事例・比較表・統計まで、役割ごとに整理済み。選択のコストを最小化。",
      },
      {
        title: "売上に効く",
        body: "心理学・マーケで設計したCTA・価格表・社会的証明で、公開初日から成果を狙える。",
      },
      {
        title: "唯一無二の和テーマ",
        body: "漆・和紙・水引——日本独特の世界観の3D。他にはない差別化が、ここにある。",
      },
      {
        title: "触って選べる",
        body: "静止画ではなくライブで動く。手で触れて確かめた部品は、もう自分のものに思える。",
      },
      {
        title: "依存ゼロで安心",
        body: "新規npm依存も外部画像URLもなし。全{n}件テスト済み。壊れない安心を、最初から。",
      },
    ],

    stylesBadge: "スタイル＆3D",
    stylesHeading: "13の世界観＋|動く3D。",
    stylesSub:
      "同じセクションでも、|テーマを変えれば|ブランドの空気がまるごと変わる。",
    styleNames: [
      "和風",
      "洋風",
      "ミニマル",
      "ブルータリスト",
      "グラスモーフィズム",
      "レトロ・Y2K",
      "ラグジュアリー",
      "プレイフル",
      "ニューモーフィズム",
      "メンフィス",
      "ダークテック",
      "北欧",
      "ボタニカル",
    ],
    style3dName: "3Dアニメ",

    testimonialsBadge: "評価",
    testimonialsHeading: "AIも、|その品質を認めた。",
    testimonials: [
      {
        quote:
          "デザインそのものより、カテゴリ選定がうまい。FAQ・導入事例・比較表・レビュー・統計まで、ちゃんと『LPを完成させる部品』を集めてる。趣味のコンポーネント集ではなく、すでに商品として成立しているレベル。",
      },
      {
        quote:
          "日本のUIコンポーネントサイトとしてトップクラスの量とクオリティ。日本語 × ネオン・レトロ・ポップの需要は日本独特で、競合が少ない。",
      },
    ],

    pricingBadge: "料金",
    pricingHeading: "¥0からはじめて、|必要なときに。",
    pricingSub:
      "個人の試用から、|チームの制作現場まで。|無料版と買い切り版の|2つだけです。",
    pricingRecommended: "おすすめ",
    pricingChoose: "選ぶ",
    pricingSeeDetails: "料金の詳細を見る",

    faqBadge: "FAQ",
    faqHeading: "よくある質問",
    faqs: [
      {
        q: "ライセンスはどうなっていますか？",
        a: "Free プランは個人・非商用での利用が対象です。Pro 以上にアップグレードすると、生成したコードを自分のプロジェクトで自由に使える商用利用ライセンスが付与されます。",
      },
      {
        q: "商用プロジェクトで使えますか？",
        a: "はい。Pro（1名）または Studio（チーム5席）の商用利用ライセンスで、クライアントワークや自社プロダクトにそのまま組み込めます。",
      },
      {
        q: "他のリポジトリではどう使いますか？",
        a: "shadcn 互換のレジストリを配信しているので、`npx shadcn add <url>` で別プロジェクトにセクションを直接取り込めます。コピペが面倒な場合に便利です。",
      },
      {
        q: "React を使っていなくても利用できますか？",
        a: "できます。バニラ HTML エクスポートに対応しているため、素の HTML/CSS として書き出して、どんなスタックにも貼り付けられます。",
      },
      {
        q: "3D は本当に依存ゼロですか？",
        a: "はい。3Dパーツは WebGL ライブラリ等を使わず、CSS 3D transform と Canvas だけで実装しています。新規npm依存も外部画像もゼロ。そのままコピペで動きます。",
      },
      {
        q: "解約はいつでもできますか？",
        a: "いつでも解約できます。解約後も次の請求日まではご利用いただけ、それ以降は自動的に Free プランへ切り替わります。",
      },
    ],

    finalBadge: "登録不要・今すぐ",
    finalHeading: "次の LP、|今日のうちに|公開しよう。",
    finalSubA: "登録不要で、すぐに ",
    finalSubB: " のセクションと3Dを|ライブプレビュー。",

    footerTaglineLead: "LP を完成させる、",
    footerTaglineTail: " のコピペ可能なセクションと3Dパーツ。",
    footerFeatures: "機能",
    footerPricing: "料金",
    footerStudio: "スタジオ",
    footerGithub: "GitHub",
    footerDocs: "ドキュメント",
    footerRegistry: "レジストリ",
    footerCopyright: "© 2026 LP Section Studio",
    footerNote: "すべてのセクションは自己完結・追加依存ゼロで設計されています。",
  },
  en: {
    brand: "LP Section Studio",
    brandShort: "LP Studio",
    navFeatures: "Features",
    navPricing: "Pricing",
    navStudio: "Studio",
    navOpenStudio: "Open Studio",
    ctaTryFree: "Try it free",
    ctaTryFreeShort: "Try free",
    ctaSeePricing: "See pricing",
    backToTop: "Back to top",

    themeLabelAurora: "Aurora",
    themeLabelDarktech: "Dark Tech",
    themeLabelMinimal: "Minimal",
    themeSwitchGroupLabel: "Switch the hero look",
    themeSwitchPrefix: "Look:",

    heroBadge: "Fully self-contained · zero dependencies",
    heroFocalCaption: "Live preview: one click away from the catalog",
    heroTitleLead: "Landing pages are entering",
    heroTitleHighlight: "the “assemble it” era.",
    heroSub:
      "Real copy-paste landing-page sections and animated 3D parts. Search, pick, paste. Every part you need to finish a landing page lives right here.",

    statSections: "sections",
    statStyles: "styles",
    statCategories: "categories",
    statFreeLabel: "free to use",

    trustNote: "Fully self-contained · zero extra deps",
    trustTested: "All {n} tested (zero errors)",
    marquee: [
      "Copy-paste",
      "npx shadcn add",
      "Vanilla HTML",
      "React / TypeScript",
      "Dark / Light",
      "3D animation",
      "Commercial OK",
      "Zero-error quality",
      "CSS-driven 3D = SEO-friendly",
    ],

    howBadge: "How it works",
    howHeading: "Three steps. Just paste.",
    howSub: "No room to get lost. Pick it, pull it in, paste it. That's it.",
    how: [
      {
        title: "Pick from the catalog",
        body: "Search by category, style or tag. Confirm the motion in a live preview before you decide.",
      },
      {
        title: "Pull it in",
        body: "Three paths: copy-paste, `npx shadcn add`, or vanilla HTML export. Any stack works.",
      },
      {
        title: "Just paste",
        body: "Self-contained — no external deps, no image URLs. The moment you paste it, it's already moving.",
      },
    ],
    howStepTags: ["Copy-paste", "npx shadcn add", "Vanilla HTML"],

    dogfoodBadge: "Live preview",
    dogfoodHeading: "Live. Real 3D. All from one catalog.",
    dogfoodBodyA: "Everything below is a ",
    dogfoodBodyStrong: "real 3D component",
    dogfoodBodyB:
      " from the library. This very landing page is built from this catalog.",
    dogfoodCaption: "Live preview: this too is one click away from the catalog",

    dogfood: {
      orbit: { title: "Orbiting Spheres 3D", cat: "3D Object" },
      anchor: { title: "Anchored Pricing 3D", cat: "Pricing / Offers" },
      product: { title: "Interactive Product 3D", cat: "Commerce" },
      future: { title: "Future Headline", cat: "Text FX" },
      encrypt: { title: "Encrypt Card", cat: "Card FX" },
      urushi: { title: "Urushi Bowl Turn 3D (Wafu)", cat: "Japanese 3D" },
      review: { title: "Review Carousel 3D", cat: "Social proof" },
    },

    perfBadge: "Performance",
    perfHeading: "Fast. Light. SEO-friendly.",
    perfSub:
      "CSS-first by design — it runs without a framework, and the content lives in the HTML, so it's crawlable as-is.",
    perfCards: [
      {
        title: "Light — no framework runtime",
        body: "Nothing bundled. Export to vanilla HTML and ship a single file — no extra initial JS.",
      },
      {
        title: "Content in HTML = SEO-ready",
        body: "Headings and copy live in the markup from the start — crawlers read them without running JS.",
      },
      {
        title: "No build, anywhere",
        body: "Drop into React / Astro / WordPress / plain HTML. Zero dependencies — gentle on Core Web Vitals.",
      },
    ],
    perfHeavyLabel: "Heavy WebGL / motion SPA",
    perfHeavyPoints: [
      "Large initial JS",
      "Needs a framework + motion library",
      "JS-rendered content hurts SEO",
      "LCP tends to lag",
    ],
    perfOursLabel: "This (CSS-first)",
    perfOursPoints: [
      "Near-zero initial JS",
      "Zero deps — exports to vanilla HTML",
      "HTML content is crawlable",
      "Better LCP/CLS/INP",
    ],
    perfNote:
      "Note: motion is mostly CSS. JS-driven parts (canvas, etc.) progressively enhance — the content stays in HTML. (The dynamic vanilla export is a separate option.)",

    featuresBadge: "Why people pick it",
    featuresHeading: "Why choose this one.",
    featuresSub:
      "Built to deliver both speed and quality — and to meet the human reasons people decide.",
    features: [
      {
        title: "Buy back time",
        body: "Hours you'd have spent from scratch become minutes of search-and-paste. Stop losing the time you'd lose.",
      },
      {
        title: "Never get stuck",
        body: "FAQ, case studies, comparison tables, stats — organized by role. The cost of choosing, minimized.",
      },
      {
        title: "Drives revenue",
        body: "CTAs, pricing tables and social proof designed with psychology and marketing — results from day one.",
      },
      {
        title: "One-of-a-kind Wafu",
        body: "Urushi, washi, mizuhiki — uniquely Japanese 3D worlds. Differentiation you won't find elsewhere.",
      },
      {
        title: "Touch to choose",
        body: "Live, not static. A part you've reached out and felt already feels like it's yours.",
      },
      {
        title: "Zero-dep peace of mind",
        body: "No new npm deps, no external images. All {n} tested. Reliability built in from the start.",
      },
    ],

    stylesBadge: "Styles & 3D",
    stylesHeading: "13 worlds plus living 3D.",
    stylesSub:
      "Same section, different theme — and the whole brand atmosphere changes.",
    styleNames: [
      "Wafu (Japanese)",
      "Yofu (Western)",
      "Minimal",
      "Brutalist",
      "Glassmorphism",
      "Retro / Y2K",
      "Luxury",
      "Playful",
      "Neumorphism",
      "Memphis",
      "Dark Tech",
      "Nordic",
      "Botanical",
    ],
    style3dName: "3D Animation",

    testimonialsBadge: "Reviews",
    testimonialsHeading: "Even the AIs admit the quality.",
    testimonials: [
      {
        quote:
          "More than the design itself, the category curation is sharp. FAQ, case studies, comparison tables, reviews, stats — it really gathers the parts that complete a landing page. This isn't a hobby component collection; it already holds together as a product.",
      },
      {
        quote:
          "Top-tier in both volume and quality among Japanese UI component sites. Demand for Japanese × neon-retro-pop is uniquely Japanese, with little competition.",
      },
    ],

    pricingBadge: "Pricing",
    pricingHeading: "Start free, upgrade when you need to.",
    pricingSub:
      "From solo trials to a team's production floor — just two: free and pay-once.",
    pricingRecommended: "Recommended",
    pricingChoose: "Choose",
    pricingSeeDetails: "See full pricing",

    faqBadge: "FAQ",
    faqHeading: "Frequently asked questions",
    faqs: [
      {
        q: "How does licensing work?",
        a: "The Free plan is for personal, non-commercial use. Upgrading to Pro or above grants a commercial license to freely use the generated code in your own projects.",
      },
      {
        q: "Can I use it on commercial projects?",
        a: "Yes. With a commercial license on Pro (1 user) or Studio (team, 5 seats), you can drop it straight into client work or your own products.",
      },
      {
        q: "How do I use it in other repositories?",
        a: "We ship a shadcn-compatible registry, so you can pull sections directly into another project with `npx shadcn add <url>`. Handy when copy-paste is a hassle.",
      },
      {
        q: "Can I use it without React?",
        a: "Yes. Vanilla HTML export is supported, so you can write it out as plain HTML/CSS and paste it into any stack.",
      },
      {
        q: "Is the 3D really dependency-free?",
        a: "Yes. The 3D parts use no WebGL library — just CSS 3D transforms and Canvas. No new npm deps, no external images. Copy-paste and it just runs.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Anytime. After canceling you keep access until the next billing date, then switch automatically to the Free plan.",
      },
    ],

    finalBadge: "No signup · right now",
    finalHeading: "Publish your next LP today.",
    finalSubA: "No signup — live-preview ",
    finalSubB: " sections and 3D right now.",

    footerTaglineLead: "Everything to finish your LP: ",
    footerTaglineTail: " copy-paste sections and 3D parts.",
    footerFeatures: "Features",
    footerPricing: "Pricing",
    footerStudio: "Studio",
    footerGithub: "GitHub",
    footerDocs: "Docs",
    footerRegistry: "Registry",
    footerCopyright: "© 2026 LP Section Studio",
    footerNote:
      "Every section is self-contained and designed with zero extra dependencies.",
  },
} as const;

/* ------------------------------------------------------------------ */

export default function Landing({
  stats,
  lang = "ja",
  setLang,
  onOpenStudio,
  onOpenPricing,
}: {
  stats: { components: number; styles: number; categories: number };
  lang?: Lang;
  /** 渡されたときだけヘッダーに言語切替を出す（テスト等の簡易利用では省略可） */
  setLang?: (l: Lang) => void;
  onOpenStudio: () => void;
  onOpenPricing: () => void;
}) {
  const t = COPY[lang];
  const reduced = usePrefersReducedMotion();

  /* ----- スクロール状態: nav シュリンク & back-to-top ----- */
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setShowTop(y > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  /* ----- ヒーローの見た目バリエーション切替 ----- */
  const [heroTheme, setHeroTheme] = useState<HeroTheme>("aurora");
  const theme = HERO_THEMES.find((th) => th.id === heroTheme) ?? HERO_THEMES[0];

  /* ----- カーソル追従グロウ（ヒーロー内に限定） ----- */
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [glow, setGlow] = useState<{ x: number; y: number; on: boolean }>({
    x: 50,
    y: 30,
    on: false,
  });
  const onHeroMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      setGlow({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
        on: true,
      });
    },
    [reduced]
  );

  /* ----- カウントアップ stat ----- */
  const cComponents = useCountUp(stats.components, reduced);
  const cStyles = useCountUp(stats.styles, reduced);
  const cCategories = useCountUp(stats.categories, reduced);
  const cFree = useCountUp(FREE_EDITION_COUNT, reduced);

  const themeLabel = (id: HeroTheme): string =>
    id === "aurora"
      ? t.themeLabelAurora
      : id === "darktech"
        ? t.themeLabelDarktech
        : t.themeLabelMinimal;

  const statItems: { value: string; label: string; key: string }[] = [
    { key: "components", value: `${cComponents}+`, label: t.statSections },
    { key: "styles", value: `${cStyles}`, label: t.statStyles },
    { key: "categories", value: `${cCategories}`, label: t.statCategories },
    { key: "free", value: `${cFree}`, label: t.statFreeLabel },
  ];

  /* ----- データ ----- */
  const marqueeItems = t.marquee;
  const withN = (s: string) => s.replace("{n}", String(stats.components));

  // 本物の3Dコンポーネントの埋め込み（full/center で配置を交互に）
  const dogfood: {
    key: string;
    title: string;
    cat: string;
    layout: "full" | "center";
    node: ReactNode;
  }[] = [
    {
      key: "orbiting-spheres-3d",
      title: t.dogfood.orbit.title,
      cat: t.dogfood.orbit.cat,
      layout: "center",
      node: <OrbitingSpheres />,
    },
    {
      key: "anchor-pricing-3d",
      title: t.dogfood.anchor.title,
      cat: t.dogfood.anchor.cat,
      layout: "full",
      node: <AnchorPricing3D />,
    },
    {
      key: "interactive-product-3d",
      title: t.dogfood.product.title,
      cat: t.dogfood.product.cat,
      layout: "center",
      node: <InteractiveProduct3D />,
    },
    {
      key: "gradient-headline-huge",
      title: t.dogfood.future.title,
      cat: t.dogfood.future.cat,
      layout: "full",
      node: <GradientHeadlineHuge />,
    },
    {
      key: "evervault-encrypt",
      title: t.dogfood.encrypt.title,
      cat: t.dogfood.encrypt.cat,
      layout: "center",
      node: <EvervaultEncrypt />,
    },
    {
      key: "urushi-bowl-3d",
      title: t.dogfood.urushi.title,
      cat: t.dogfood.urushi.cat,
      layout: "center",
      node: <UrushiBowlTurn3D />,
    },
    {
      key: "review-carousel-3d",
      title: t.dogfood.review.title,
      cat: t.dogfood.review.cat,
      layout: "full",
      node: <ReviewCarousel3D />,
    },
  ];

  const howIcons: (typeof Search)[] = [Search, Terminal, MousePointerClick];
  const howSteps = t.how.map((s, i) => ({
    icon: howIcons[i],
    tag: t.howStepTags[i],
    title: s.title,
    body: s.body,
  }));

  const featureIcons: (typeof ClipboardCopy)[] = [
    Zap,
    Lightbulb,
    TrendingUp,
    Wand2,
    Heart,
    ShieldCheck,
  ];
  const features: { icon: typeof ClipboardCopy; title: string; body: string }[] =
    t.features.map((f, i) => ({
      icon: featureIcons[i],
      title: f.title,
      body: withN(f.body),
    }));

  const perfIcons: (typeof Zap)[] = [Zap, Search, Blocks];
  const perfCards: { icon: typeof Zap; title: string; body: string }[] =
    t.perfCards.map((c, i) => ({
      icon: perfIcons[i],
      title: c.title,
      body: c.body,
    }));

  const styleVisuals: { emoji: string; gradient: string }[] = [
    { emoji: "🎴", gradient: "from-rose-200 to-red-300" },
    { emoji: "🏛️", gradient: "from-amber-100 to-stone-300" },
    { emoji: "⬜", gradient: "from-zinc-100 to-zinc-300" },
    { emoji: "🧱", gradient: "from-yellow-200 to-neutral-400" },
    { emoji: "🧊", gradient: "from-sky-200 to-indigo-300" },
    { emoji: "📼", gradient: "from-fuchsia-300 to-cyan-300" },
    { emoji: "👑", gradient: "from-amber-200 to-yellow-500" },
    { emoji: "🎈", gradient: "from-pink-300 to-orange-300" },
    { emoji: "🫧", gradient: "from-slate-200 to-slate-400" },
    { emoji: "🔺", gradient: "from-teal-300 to-violet-400" },
    { emoji: "🛰️", gradient: "from-indigo-500 to-slate-800" },
    { emoji: "🌲", gradient: "from-emerald-100 to-blue-200" },
    { emoji: "🌿", gradient: "from-lime-200 to-green-400" },
  ];
  const styleThemes: { name: string; emoji: string; gradient: string; is3d: boolean }[] =
    [
      ...t.styleNames.map((name, i) => ({
        name,
        emoji: styleVisuals[i].emoji,
        gradient: styleVisuals[i].gradient,
        is3d: false,
      })),
      {
        name: t.style3dName,
        emoji: "🧿",
        gradient: "from-violet-400 to-cyan-400",
        is3d: true,
      },
    ];

  const testimonialMeta: { author: string; handle: string; accent: string }[] = [
    { author: "ChatGPT", handle: "OpenAI", accent: "from-emerald-500 to-teal-600" },
    { author: "Grok", handle: "xAI", accent: "from-violet-500 to-indigo-600" },
  ];
  const testimonials: {
    author: string;
    handle: string;
    accent: string;
    quote: string;
  }[] = t.testimonials.map((ts, i) => ({
    author: testimonialMeta[i].author,
    handle: testimonialMeta[i].handle,
    accent: testimonialMeta[i].accent,
    quote: ts.quote,
  }));

  const faqs: { q: string; a: string }[] = t.faqs.map((f) => ({
    q: f.q,
    a: f.a,
  }));

  const plans = getPlans(lang);

  /** 買い切りなので「/月」は付けない。0 円は無料表記。 */
  const priceLabel = (price: number) =>
    price === 0
      ? lang === "ja"
        ? "¥0"
        : "Free"
      : `¥${price.toLocaleString("ja-JP")}`;

  /** 価格の横に添える但し書き（無料 / 買い切り） */
  const priceSuffix = (price: number) =>
    price === 0
      ? lang === "ja"
        ? "登録不要"
        : "no sign-up"
      : lang === "ja"
        ? "買い切り"
        : "one time";

  const heroGlowStyle: CSSProperties = {
    background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, ${theme.glow}, transparent 70%)`,
    opacity: glow.on && !reduced ? 1 : 0,
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* キーフレーム定義（インライン・依存追加なし） */}
      <style>{`
        @keyframes lp-aurora-a {
          0%   { transform: translate3d(-8%, -6%, 0) scale(1); }
          50%  { transform: translate3d(10%, 8%, 0) scale(1.15); }
          100% { transform: translate3d(-8%, -6%, 0) scale(1); }
        }
        @keyframes lp-aurora-b {
          0%   { transform: translate3d(6%, 4%, 0) scale(1.1); }
          50%  { transform: translate3d(-10%, -8%, 0) scale(1); }
          100% { transform: translate3d(6%, 4%, 0) scale(1.1); }
        }
        @keyframes lp-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes lp-shimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .lp-aurora-a { animation: lp-aurora-a 18s ease-in-out infinite; }
        .lp-aurora-b { animation: lp-aurora-b 22s ease-in-out infinite; }
        .lp-marquee-track { animation: lp-marquee 26s linear infinite; }
        .lp-marquee:hover .lp-marquee-track { animation-play-state: paused; }
        .lp-shimmer {
          background-size: 200% auto;
          animation: lp-shimmer 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .lp-aurora-a, .lp-aurora-b, .lp-marquee-track, .lp-shimmer {
            animation: none !important;
          }
        }
      `}</style>

      {/* 1. Sticky nav */}
      <header
        className={cn(
          "sticky top-0 z-50 backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/60",
          scrolled
            ? "border-b bg-background/85 shadow-sm"
            : "border-b border-transparent bg-background/40"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6",
            scrolled ? "h-14" : "h-16"
          )}
        >
          <a
            href="#top"
            className="group flex min-w-0 items-center gap-2 font-bold tracking-tight"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white transition-transform duration-300 group-hover:rotate-6 motion-reduce:transition-none motion-reduce:group-hover:rotate-0">
              <Boxes className="h-4 w-4" />
            </span>
            {/* 狭い画面では短縮名。フル名と CTA と言語切替を1行に収めるため */}
            <span className="truncate text-base sm:hidden">
              {t.brandShort}
            </span>
            <span className="hidden truncate sm:inline sm:text-lg">
              {t.brand}
            </span>
          </a>
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <a
              href="#features"
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
            >
              {t.navFeatures}
            </a>
            <button
              type="button"
              onClick={onOpenPricing}
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
            >
              {t.navPricing}
            </button>
            <a
              href="#showcase"
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-block"
            >
              {t.navStudio}
            </a>
            {/* 言語切替はヘッダー内に置く（固定配置だと CTA に重なる） */}
            {setLang && <LangToggle lang={lang} setLang={setLang} />}
            <Button onClick={onOpenStudio} className="gap-2 px-3 sm:px-4">
              <span className="sm:hidden">{t.ctaTryFreeShort}</span>
              <span className="hidden sm:inline">{t.ctaTryFree}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* 2. Hero — 中央寄せ・見た目バリエーション切替（オーロラ / ダークテック / ミニマル） */}
        <section
          ref={heroRef}
          onMouseMove={onHeroMove}
          onMouseLeave={() => setGlow((g) => ({ ...g, on: false }))}
          className={cn(
            "relative overflow-hidden transition-colors duration-500",
            theme.shell
          )}
        >
          {/* アニメ・オーロラ背景（テーマで切替） */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {theme.id === "aurora" && (
              <>
                <div className="lp-aurora-a absolute left-1/2 top-[-12rem] h-[34rem] w-[52rem] max-w-[95vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-500/35 via-fuchsia-500/25 to-indigo-500/10 blur-3xl" />
                <div className="lp-aurora-b absolute right-[-10rem] top-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
                <div className="lp-aurora-b absolute left-[-8rem] top-48 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
              </>
            )}
            {theme.id === "darktech" && (
              <>
                <div
                  className="absolute inset-0 opacity-[0.4]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(56,189,248,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.10) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                    maskImage:
                      "radial-gradient(60% 60% at 50% 35%, black, transparent)",
                    WebkitMaskImage:
                      "radial-gradient(60% 60% at 50% 35%, black, transparent)",
                  }}
                />
                <div className="lp-aurora-a absolute left-1/2 top-[-10rem] h-[30rem] w-[48rem] max-w-[95vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/25 to-emerald-500/10 blur-3xl" />
              </>
            )}
            {theme.id === "minimal" && (
              <div className="absolute left-1/2 top-[-8rem] h-72 w-[40rem] max-w-[95vw] -translate-x-1/2 rounded-full bg-muted-foreground/[0.06] blur-3xl" />
            )}
          </div>

          {/* カーソル追従グロウ（ヒーロー内に限定） */}
          <div
            aria-hidden
            style={heroGlowStyle}
            className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
          />

          {/* 狭い画面では上余白を詰め、ファーストビューに見出しとCTAを収める */}
          <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 text-center sm:px-6 sm:pb-24 sm:pt-20 lg:pt-28">
            <Badge
              variant="secondary"
              className={cn(
                "mb-5 gap-1.5 px-3 py-1 text-xs",
                theme.dark && "border-white/15 bg-white/10 text-slate-100"
              )}
            >
              <Sparkles className={cn("h-3.5 w-3.5", theme.accentText)} />
              {t.heroBadge}
            </Badge>

            {/* 見出しは文節単位（Phrased）で折り返す。単語途中で切れないよう
                max-w も1行が収まる幅にしてある。 */}
            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-6xl sm:leading-[1.08] lg:text-7xl">
              <Phrased text={t.heroTitleLead} />
              <br />
              <Phrased
                text={t.heroTitleHighlight}
                className={cn("lp-shimmer", theme.headline)}
              />
            </h1>

            <p
              className={cn(
                "mx-auto mt-5 max-w-2xl text-balance text-base sm:mt-6 sm:text-xl",
                theme.dark ? "text-slate-300" : "text-muted-foreground"
              )}
            >
              {stats.components}+ / <Phrased text={t.heroSub} />
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={onOpenStudio}
                className={cn("w-full gap-2 text-base sm:w-auto", theme.primaryCta)}
              >
                {t.ctaTryFree}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onOpenPricing}
                className={cn(
                  "w-full text-base sm:w-auto",
                  theme.dark &&
                    "border-white/25 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white"
                )}
              >
                {t.ctaSeePricing}
              </Button>
            </div>

            {/* ヒーロー・バリエーション切替（オーロラ / ダークテック / ミニマル） */}
            <div
              className={cn(
                "mt-8 inline-flex items-center gap-1 rounded-full border p-1 text-xs backdrop-blur",
                theme.dark ? "border-white/15" : "border-border"
              )}
              role="group"
              aria-label={t.themeSwitchGroupLabel}
            >
              <span className={cn("px-2", theme.dark ? "text-slate-400" : "text-muted-foreground")}>
                {t.themeSwitchPrefix}
              </span>
              {HERO_THEMES.map((th) => {
                const active = th.id === heroTheme;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setHeroTheme(th.id)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full px-3 py-1.5 font-medium transition-all duration-300",
                      active
                        ? theme.dark
                          ? "bg-white text-slate-900 shadow"
                          : "bg-foreground text-background shadow"
                        : theme.dark
                          ? "text-slate-300 hover:bg-white/10"
                          : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {themeLabel(th.id)}
                  </button>
                );
              })}
            </div>

            {/* stats（カウントアップ・4スタット中央バンド） */}
            <dl
              className={cn(
                "mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border sm:grid-cols-4",
                theme.statShell,
                theme.dark ? "border-white/10" : ""
              )}
            >
              {statItems.map((s) => (
                <div
                  key={s.key}
                  className={cn(
                    "px-4 py-6 transition-colors",
                    theme.dark ? "bg-[#0b1022]" : "bg-card"
                  )}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                    {s.value}
                  </dd>
                  <p
                    className={cn(
                      "mt-1 text-sm",
                      theme.dark ? "text-slate-400" : "text-muted-foreground"
                    )}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 3. Trust strip */}
        <section className="border-y bg-muted/40">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-center sm:gap-6 sm:px-6">
            <span className="inline-flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              {t.trustNote}
            </span>
            <span className="inline-flex items-center justify-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-violet-500" />
              {withN(t.trustTested)}
            </span>
          </div>
        </section>

        {/* 3b. Trust marquee */}
        <section className="lp-marquee relative overflow-hidden border-b bg-background py-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent"
          />
          <div className="lp-marquee-track flex w-max items-center gap-4 will-change-transform">
            {[0, 1].map((dup) => (
              <ul
                key={dup}
                className="flex shrink-0 items-center gap-4"
                aria-hidden={dup === 1}
              >
                {marqueeItems.map((m) => (
                  <li
                    key={`${dup}-${m}`}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                    {m}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        {/* 4. How it works */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              {t.howBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              <Phrased text={t.howHeading} />
            </h2>
            <p className="mt-4 text-muted-foreground">
              <Phrased text={t.howSub} />
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {howSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal as="li" key={step.title} delay={i * 100}>
                  <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10 text-violet-600 ring-1 ring-inset ring-violet-600/15 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-5xl font-bold tabular-nums text-muted-foreground/15">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <CardTitle className="mt-3 text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                      <Badge variant="secondary" className="mt-4 font-mono text-[11px]">
                        {step.tag}
                      </Badge>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </ol>
        </section>

        {/* 5. Live 3D showcase */}
        <section id="showcase" className="border-y bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                {t.dogfoodBadge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                <Phrased text={t.dogfoodHeading} />
              </h2>
              <p className="mt-4 text-muted-foreground">
                <Phrased text={t.dogfoodBodyA} />
                <strong className="inline-block">{t.dogfoodBodyStrong}</strong>
                <Phrased text={t.dogfoodBodyB} />
              </p>
            </Reveal>

            <div className="mt-14 space-y-8">
              {dogfood.map((d, i) => (
                <Reveal
                  key={d.key}
                  delay={(i % 2) * 80}
                  className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div
                    className={cn(
                      "flex items-center justify-between gap-3 border-b bg-muted/40 px-4 py-2.5 text-xs",
                      i % 2 === 1 && "flex-row-reverse"
                    )}
                  >
                    <span className="inline-flex items-center gap-2 font-medium">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-violet-600 to-indigo-600 text-[10px] font-bold text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {d.title}
                      <Badge variant="secondary" className="font-normal">
                        {d.cat}
                      </Badge>
                    </span>
                    <span className="hidden items-center gap-1.5 text-muted-foreground sm:inline-flex">
                      <MousePointerClick className="h-3.5 w-3.5" />
                      {t.dogfoodCaption}
                    </span>
                  </div>
                  {/* 本物の3Dセクションをそのまま埋め込み */}
                  <div
                    className={cn(
                      "relative isolate overflow-hidden",
                      d.layout === "center" && "flex justify-center bg-muted/20 p-4 sm:p-8"
                    )}
                  >
                    {d.node}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5b. Performance / SEO */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-violet-500" />
              {t.perfBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              <Phrased text={t.perfHeading} />
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              <Phrased text={t.perfSub} />
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perfCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={(i % 3) * 90}>
                  <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <CardHeader>
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10 text-violet-600 ring-1 ring-inset ring-violet-600/15 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{c.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {c.body}
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>

          {/* 比較: 重いWebGL/SPA vs CSS-first */}
          <Reveal className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border bg-card p-5 sm:p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <X className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {t.perfHeavyLabel}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {t.perfHeavyPoints.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <X
                        className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70"
                        aria-hidden
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative rounded-2xl border border-violet-500/50 bg-card p-5 shadow-sm ring-1 ring-violet-500/20 sm:p-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
                />
                <div className="flex items-center gap-2 text-sm font-semibold text-violet-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {t.perfOursLabel}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {t.perfOursPoints.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-violet-600"
                        aria-hidden
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
              {t.perfNote}
            </p>
          </Reveal>
        </section>

        {/* 6. Why people pick it */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              {t.featuresBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              <Phrased text={t.featuresHeading} />
            </h2>
            <p className="mt-4 text-muted-foreground">
              <Phrased text={t.featuresSub} />
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={(i % 3) * 90}>
                  <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <CardHeader>
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10 text-violet-600 ring-1 ring-inset ring-violet-600/15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{f.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {f.body}
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* 7. Style + 3D range */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                {t.stylesBadge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                <Phrased text={t.stylesHeading} />
              </h2>
              <p className="mt-4 text-muted-foreground">
                <Phrased text={t.stylesSub} />
              </p>
            </Reveal>

            <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {styleThemes.map((th, i) => (
                <Reveal as="li" key={th.name} delay={(i % 4) * 70}>
                  <div
                    className={cn(
                      "group relative flex items-center gap-3 overflow-hidden rounded-xl border bg-card p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                      th.is3d && "border-violet-500/50 ring-1 ring-violet-500/20"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-0 -z-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10",
                        th.gradient
                      )}
                    />
                    <span
                      className={cn(
                        "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-xl shadow-inner transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                        th.gradient
                      )}
                      aria-hidden
                    >
                      {th.emoji}
                    </span>
                    <span className="relative truncate text-sm font-semibold">
                      {th.name}
                    </span>
                    {th.is3d && (
                      <Sparkles
                        className="relative ml-auto h-4 w-4 shrink-0 text-violet-500"
                        aria-hidden
                      />
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 8. Testimonials */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              {t.testimonialsBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              <Phrased text={t.testimonialsHeading} />
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {testimonials.map((ts, i) => (
              <Reveal key={ts.author} delay={i * 100}>
                <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <CardContent className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
                    <div className="flex gap-0.5 text-amber-400" aria-label="5 / 5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-current" aria-hidden />
                      ))}
                    </div>
                    <blockquote className="flex-1 text-base leading-relaxed text-foreground sm:text-lg">
                      {lang === "ja" ? `「${ts.quote}」` : `“${ts.quote}”`}
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white",
                          ts.accent
                        )}
                        aria-hidden
                      >
                        {ts.author.charAt(0)}
                      </span>
                      <span className="text-sm">
                        <span className="block font-semibold">{ts.author}</span>
                        <span className="block text-muted-foreground">{ts.handle}</span>
                      </span>
                    </figcaption>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 9. Pricing teaser */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                {t.pricingBadge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                <Phrased text={t.pricingHeading} />
              </h2>
              <p className="mt-4 text-muted-foreground">
                <Phrased text={t.pricingSub} />
              </p>
            </Reveal>

            <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <Reveal key={plan.id} delay={i * 90} className="h-full">
                  <Card
                    className={cn(
                      "relative flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                      plan.highlight &&
                        "border-violet-500/60 shadow-lg ring-1 ring-violet-500/30"
                    )}
                  >
                    {plan.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="gap-1 bg-gradient-to-r from-violet-600 to-indigo-600">
                          <Sparkles className="h-3 w-3" />
                          {t.pricingRecommended}
                        </Badge>
                      </span>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-4xl font-bold tracking-tight">
                          {priceLabel(plan.price)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {priceSuffix(plan.price)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                      <ul className="space-y-3 text-sm">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                            <span className="text-muted-foreground">{feat}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        onClick={onOpenPricing}
                        variant={plan.highlight ? "default" : "outline"}
                        className={cn(
                          "mt-7 w-full",
                          plan.highlight &&
                            "bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90"
                        )}
                      >
                        {plan.price === 0 ? plan.cta : t.pricingChoose}
                      </Button>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button
                variant="ghost"
                onClick={onOpenPricing}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                {t.pricingSeeDetails}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              {t.faqBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              {t.faqHeading}
            </h2>
          </Reveal>

          <Reveal className="mt-12 divide-y rounded-2xl border bg-card">
            {faqs.map((item) => (
              <details key={item.q} className="group px-5 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90 motion-reduce:transition-none" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            ))}
          </Reveal>
        </section>

        {/* 11. Final CTA band */}
        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 px-6 py-16 text-center text-white sm:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
              <div className="lp-aurora-a absolute left-10 top-8 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
              <div className="lp-aurora-b absolute bottom-0 right-12 h-48 w-48 rounded-full bg-fuchsia-300/40 blur-3xl" />
            </div>
            <div className="relative">
              <Badge className="mb-5 gap-1.5 border-white/20 bg-white/15 text-white hover:bg-white/20">
                <Rocket className="h-3.5 w-3.5" />
                {t.finalBadge}
              </Badge>
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
                <Phrased text={t.finalHeading} />
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                {t.finalSubA}
                {stats.components}+
                <Phrased text={t.finalSubB} />
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={onOpenStudio}
                  className="w-full gap-2 bg-white text-base text-violet-700 hover:bg-white/90 sm:w-auto"
                >
                  {t.navOpenStudio}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onOpenPricing}
                  className="w-full border-white/40 bg-transparent text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  {t.ctaSeePricing}
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 font-bold tracking-tight">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                  <Boxes className="h-4 w-4" />
                </span>
                {t.brand}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {t.footerTaglineLead}
                {stats.components}+
                {t.footerTaglineTail}
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
              <a
                href="#features"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.footerFeatures}
              </a>
              <button
                type="button"
                onClick={onOpenPricing}
                className="text-left text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.footerPricing}
              </button>
              <button
                type="button"
                onClick={onOpenStudio}
                className="text-left text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.footerStudio}
              </button>
              <a
                href="https://github.com/ilovewalking7/app-035"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" />
                {t.footerGithub}
              </a>
              <a
                href="https://github.com/ilovewalking7/app-035"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Code2 className="h-4 w-4" />
                {t.footerDocs}
              </a>
              <a
                href="https://github.com/ilovewalking7/app-035"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Package className="h-4 w-4" />
                {t.footerRegistry}
              </a>
            </nav>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>{t.footerCopyright}</p>
            <p className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              {t.footerNote}
            </p>
          </div>
        </div>
      </footer>

      {/* back-to-top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={t.backToTop}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border bg-background/90 text-foreground shadow-lg backdrop-blur transition-all duration-300 hover:bg-muted motion-reduce:transition-none",
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
