import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "CTAバナー",
  category: "マーケティング",
  description: "見出し・メール入力・送信ボタンを備えた行動喚起バンド。",
  align: "full",
};

export default function CTABanner() {
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
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-card px-6 py-14 sm:px-12">
        {/* radial accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-sky-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {en
              ? "Make your next sprint lighter, starting today."
              : "次のスプリントを、今日から軽く。"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "Sign up with your email and we'll send a setup guide and a 14-day trial. No credit card required."
              : "メールを登録すると、セットアップガイドと14日間のトライアルをお送りします。クレジットカードは不要です。"}
          </p>

          {sent ? (
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-500">
              <Check className="size-4" />
              {en
                ? "Thanks for signing up. Please check your inbox."
                : "ご登録ありがとうございます。受信箱をご確認ください。"}
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-11 flex-1"
                aria-label={en ? "Email address" : "メールアドレス"}
              />
              <Button type="submit" size="lg" className="group h-11 shrink-0">
                {en ? "Get started" : "始める"}
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            {en
              ? "Cancel anytime. We never send spam."
              : "いつでも解約可能。スパムは送りません。"}
          </p>
        </div>
      </div>
    </section>
  );
}
