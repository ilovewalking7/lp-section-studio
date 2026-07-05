import { useState } from "react";
import { ArrowRight, CheckCircle2, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リード獲得ニュースレター",
  category: "マーケティング",
  description:
    "無料ガイドを餌にメールを集めるリード獲得バンド。成功状態と購読者数の社会的証明つき。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["marketing", "lead-gen", "newsletter"],
  principle:
    "具体的なインセンティブ（無料ガイド）と『X,000人が購読中』の社会的証明を併置し、登録の心理的コストを下げる。",
};

const AVATAR_TONES = [
  "from-violet-500 to-indigo-500",
  "from-sky-500 to-cyan-500",
  "from-rose-500 to-orange-500",
  "from-emerald-500 to-teal-500",
];

export default function LeadCaptureNewsletter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <section className="w-full px-6 py-12">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-card">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-sky-500/10 blur-3xl"
        />

        <div className="relative grid gap-10 px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full px-3 py-1"
            >
              <Gift className="size-3.5 text-primary" />
              {en ? "Free guide inside" : "無料ガイド進呈"}
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {en ? (
                <>
                  Growth tactics that work,
                  <br className="hidden sm:block" />
                  delivered weekly.
                </>
              ) : (
                <>
                  成果が出るグロース施策、
                  <br className="hidden sm:block" />
                  週1でお届け。
                </>
              )}
            </h2>
            <p className="mt-3 max-w-md text-pretty text-muted-foreground">
              {en
                ? "Sign up and we'll send you the ‘27 Plays to Double Your Conversion’ PDF right away — example-driven and ready to use tomorrow."
                : "登録するとすぐに『コンバージョンを2倍にする27の型』PDFをお送りします。実例ベースで、明日から使えます。"}
            </p>

            <ul className="mt-5 space-y-2 text-sm">
              {(en
                ? [
                    "Case studies with real data",
                    "5-minute key takeaways",
                    "Unsubscribe anytime in one click",
                  ]
                : [
                    "実データ付きの事例分析",
                    "5分で読める要点まとめ",
                    "いつでも1クリックで解約",
                  ]
              ).map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="rounded-2xl border bg-background/60 p-6 shadow-sm backdrop-blur">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <CheckCircle2 className="size-6" />
                </div>
                <p className="font-medium">
                  {en ? "You're all set" : "受け取り完了しました"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {en ? (
                    <>We sent a download link to {email}.</>
                  ) : (
                    <>{email} 宛にガイドのダウンロードリンクを送りました。</>
                  )}
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <label
                  htmlFor="lead-email"
                  className="flex items-center gap-1.5 text-sm font-medium"
                >
                  <Sparkles className="size-3.5 text-primary" />
                  {en ? "Get the free guide" : "無料ガイドを受け取る"}
                </label>
                <Input
                  id="lead-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-11"
                />
                <Button type="submit" size="lg" className="group h-11 w-full">
                  {en ? "Download the guide free" : "ガイドを無料でダウンロード"}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {en ? "No credit card · No spam" : "クレジットカード不要・スパムなし"}
                </p>
              </form>
            )}

            <div className="mt-5 flex items-center justify-center gap-3 border-t pt-4">
              <div className="flex -space-x-2">
                {AVATAR_TONES.map((tone, i) => (
                  <div
                    key={tone}
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white ring-2 ring-background",
                      tone
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {en ? (
                  <>
                    <span className="font-semibold text-foreground">
                      12,000
                    </span>{" "}
                    subscribers
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-foreground">
                      12,000人
                    </span>{" "}
                    が購読中
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
