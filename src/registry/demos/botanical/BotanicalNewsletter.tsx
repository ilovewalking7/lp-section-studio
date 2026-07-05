import * as React from "react";
import { Check, Leaf, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボタニカル・ニュースレター",
  category: "ボタニカル",
  description: "メール登録と成功表示を備えたエコなニュースレター。",
  align: "center",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

export default function BotanicalNewsletter() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#5e6b4f]/20 bg-[#f3f1e7] p-8 text-center text-[#3f4a35] shadow-[0_12px_40px_-20px_rgba(63,74,53,0.5)]">
      <svg
        viewBox="0 0 200 60"
        className="pointer-events-none absolute -bottom-2 left-0 h-16 w-full opacity-40"
        aria-hidden
      >
        <path
          d="M0 40 C50 40 70 20 100 20 C130 20 150 50 200 50"
          stroke="#86a06d"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#5e6b4f]/15 text-[#5e6b4f]">
        <Leaf className="size-6" />
      </span>
      <h3 className="mt-5 font-serif text-2xl font-medium tracking-tight">
        {en ? "Subscribe to the seasonal journal" : "季節のジャーナルを購読"}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#5e6b4f]">
        {en
          ? "Botanical recipes, self-care tips, and member-only offers — delivered once a month."
          : "植物のレシピ、セルフケアのヒント、会員限定オファーを月に一度お届けします。"}
      </p>

      {sent ? (
        <div className="mt-7 flex items-center justify-center gap-2 rounded-2xl bg-[#86a06d]/15 px-4 py-4 text-sm font-medium text-[#5e6b4f]">
          <Check className="size-5" />
          {en ? "Thank you for subscribing." : "ご登録ありがとうございます。"}
        </div>
      ) : (
        <form onSubmit={submit} className="relative mt-7">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-12 rounded-full border-[#5e6b4f]/25 bg-white/60 pl-5 pr-32 text-sm text-[#3f4a35] placeholder:text-[#5e6b4f]/50 focus-visible:ring-[#86a06d]"
          />
          <Button
            type="submit"
            className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 rounded-full bg-[#5e6b4f] px-4 text-xs tracking-wide text-[#f3f1e7] hover:bg-[#4b563f]"
          >
            <Send className="size-3.5" />
            {en ? "Join" : "登録"}
          </Button>
        </form>
      )}
      <p className="mt-4 text-[10px] tracking-wide text-[#5e6b4f]/60">
        {en
          ? "Unsubscribe anytime. No spam, ever."
          : "いつでも配信停止できます。スパムは送りません。"}
      </p>
    </div>
  );
}
