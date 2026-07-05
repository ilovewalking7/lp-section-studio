import { useState } from "react";
import { ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ヒーロー（ウェイトリスト）",
  category: "ヒーロー・LP",
  description:
    "アーリーアクセス登録用ヒーロー。見出し・メール入力・参加ボタンと登録済み人数のアバター列。",
  align: "full",
  isNew: true,
  tags: ["hero", "landing", "waitlist"],
  principle:
    "社会的証明（登録済み人数とアバター）で参加への安心感を醸成。入力欄を単一の焦点にして離脱を防ぐ。",
};

const AVATAR_GRADIENTS = [
  "from-indigo-400 to-sky-400",
  "from-fuchsia-400 to-pink-400",
  "from-emerald-400 to-teal-400",
  "from-amber-400 to-orange-400",
  "from-violet-400 to-purple-400",
];

export default function HeroWaitlist() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  };

  return (
    <section className="relative w-full overflow-hidden bg-background px-6 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,theme(colors.indigo.500/0.25),transparent_65%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          {en ? "Early access open" : "アーリーアクセス受付中"}
        </span>

        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {en ? (
            <>
              Be the very first
              <br className="hidden sm:block" />
              to get your hands on it.
            </>
          ) : (
            <>
              いちばん最初に、
              <br className="hidden sm:block" />
              手にする人になろう。
            </>
          )}
        </h1>

        <p className="mx-auto mt-5 max-w-md text-pretty text-muted-foreground">
          {en
            ? "Sign up with your email before launch and we'll send you a priority invite on release day."
            : "公開前にメールを登録すると、リリース当日に優先招待をお送りします。"}
        </p>

        {joined ? (
          <div className="mx-auto mt-9 flex max-w-md items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3.5 text-sm font-medium text-emerald-500">
            <Check className="size-4" />
            {en
              ? "You're in. Watch for your invite."
              : "登録完了。招待をお待ちください。"}
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 flex-1"
            />
            <Button type="submit" size="lg" className="group h-11">
              {en ? "Join" : "登録する"}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </form>
        )}

        {/* social proof */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <div className="flex -space-x-2.5">
            {AVATAR_GRADIENTS.map((g, i) => (
              <span
                key={i}
                className={`inline-block size-8 rounded-full border-2 border-background bg-gradient-to-br ${g}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {en ? (
              <>
                <span className="font-semibold text-foreground">2,481</span>{" "}
                already joined
              </>
            ) : (
              <>
                <span className="font-semibold text-foreground">2,481人</span>{" "}
                が登録済み
              </>
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
