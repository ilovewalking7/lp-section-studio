import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "洗練ニュースレター",
  category: "洋風",
  description: "洗練されたニュースレター登録。メール入力・送信・成功状態を備える。",
  align: "center",
  isNew: true,
  tags: ["洋風", "newsletter", "subscribe", "elegant"],
  principle: "限定誌への招待という体裁と成功時の余韻が、登録を『特権』として感じさせる。",
};

export default function RefinedNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <div className="w-full max-w-md bg-[#f8f5ef] p-6 text-stone-800">
      <div className="border border-stone-300 bg-[#f3ede1] px-8 py-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-amber-700">
          Le Journal
        </p>
        <h3 className="mt-3 font-display text-3xl italic text-stone-900">
          {en ? "A Letter for Members" : "会員のための便り"}
        </h3>

        <div className="mx-auto my-6 flex w-28 items-center gap-3 text-stone-400">
          <span className="h-px flex-1 bg-stone-300" />
          <span className="text-xs text-amber-700">✦</span>
          <span className="h-px flex-1 bg-stone-300" />
        </div>

        {sent ? (
          <div className="flex flex-col items-center py-2">
            <span className="flex size-12 items-center justify-center rounded-full border border-[#5b6650] text-[#5b6650]">
              <Check className="size-6" />
            </span>
            <p className="mt-4 font-display text-xl italic text-stone-900">
              {en ? "Welcome to the Maison" : "ようこそ、Maison へ"}
            </p>
            <p className="mt-1 text-sm text-stone-500">
              {en
                ? `We'll deliver the next letter to ${email}.`
                : `次号の便りを ${email} にお届けします。`}
            </p>
          </div>
        ) : (
          <>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-stone-600">
              {en
                ? "We bring you new collections and invitations to exclusive events, a step ahead of everyone else."
                : "新作コレクションと、限定の催しのご案内を、ひと足先にお届けいたします。"}
            </p>
            <form onSubmit={handleSubmit} className="mt-7 space-y-3">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="h-11 rounded-none border-stone-400 bg-transparent text-center text-sm focus-visible:ring-amber-600"
              />
              <Button
                type="submit"
                className="h-11 w-full rounded-none bg-stone-900 text-[11px] uppercase tracking-[0.25em] text-[#f8f5ef] hover:bg-stone-800"
              >
                {en ? "Subscribe" : "購読する"}
              </Button>
            </form>
            <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-stone-400">
              {en ? "Unsubscribe at any time" : "いつでも解除いただけます"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
