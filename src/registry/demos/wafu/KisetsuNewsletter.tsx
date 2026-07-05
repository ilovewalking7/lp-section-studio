import * as React from "react";
import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "季節の便り登録",
  category: "和風",
  description: "季節の便りニュースレター登録。メール入力・送信・成功状態を備える。",
  align: "center",
  isNew: true,
  tags: ["和風", "japanese", "newsletter", "kisetsu"],
  principle: "「便り」という言葉で売り込み感を和らげ、季節の写しを贈る約束で登録の心理障壁を下げる。",
};

function Tsubaki() {
  return (
    <svg viewBox="0 0 48 48" className="size-10" aria-hidden>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="24"
          cy="14"
          rx="7"
          ry="11"
          fill="#b7410e"
          opacity="0.85"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="5" fill="#e3b341" />
    </svg>
  );
}

export default function KisetsuNewsletter() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <div className="w-full max-w-md rounded-sm border border-stone-300 bg-[#f5f1e8] p-9 text-center text-stone-800 shadow-md">
      <div className="flex justify-center">
        <Tsubaki />
      </div>
      <p className="mt-4 font-mincho text-xs tracking-[0.4em] text-[#6b7a3a]">
        {en ? "SEASONAL LETTER" : "季節の便り"}
      </p>
      <h3 className="mt-2 font-mincho text-2xl font-medium tracking-wide text-stone-900">
        {en ? "Tidings of the four seasons" : "四季のたよりをお手元に"}
      </h3>
      <p className="mx-auto mt-3 max-w-xs font-mincho text-sm leading-relaxed text-stone-600">
        {en
          ? "Seasonal menus, news of events, and small letters from the inn — delivered with each turning of the season."
          : "旬の献立や催しのご案内、宿からの小さな写しを季節ごとにお届けします。"}
      </p>

      {sent ? (
        <div className="mt-7 flex flex-col items-center gap-3 rounded-sm border border-[#6b7a3a]/40 bg-[#6b7a3a]/10 px-5 py-6">
          <span className="flex size-10 items-center justify-center rounded-full bg-[#6b7a3a] text-[#f5f1e8]">
            <Check className="size-5" />
          </span>
          <p className="font-mincho text-base text-stone-900">
            {en ? "Thank you for subscribing." : "ご登録、ありがとうございます。"}
          </p>
          <p className="text-xs text-stone-500">
            {en
              ? "We look forward to sending you our next letter."
              : "次の便りをお楽しみにお待ちください。"}
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-7 space-y-3 text-left">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={en ? "Email address" : "メールアドレス"}
              className="h-11 rounded-sm border-stone-300 bg-white/70 pl-9 font-mincho text-stone-800 placeholder:text-stone-400 focus-visible:ring-[#b7410e]/40"
            />
          </div>
          <Button
            type="submit"
            className="h-11 w-full rounded-sm bg-[#b7410e] font-mincho tracking-[0.2em] text-[#f5f1e8] shadow-none hover:bg-[#9c360b]"
          >
            {en ? "Receive the letter" : "便りを受け取る"}
          </Button>
          <p className="text-center text-[11px] text-stone-400">
            {en ? "You can unsubscribe at any time" : "いつでも配信を停止できます"}
          </p>
        </form>
      )}
    </div>
  );
}
