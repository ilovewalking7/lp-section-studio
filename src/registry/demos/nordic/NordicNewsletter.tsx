import { useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧ニュースレター",
  category: "北欧",
  description: "ぬくもりのあるメール登録フォーム（成功状態つき）。",
  align: "center",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "低圧な誘い文と即時フィードバックで、購読の心理的ハードルを下げる。",
};

export default function NordicNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full max-w-md overflow-hidden rounded-[1.75rem] bg-[#faf8f3] p-9 font-sans text-[#3a3a38] shadow-[0_30px_70px_-48px_rgba(58,58,56,0.4)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8a9a7b]/15 text-[#8a9a7b]">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      </div>

      {sent ? (
        <div className="mt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c08457]/15 text-[#c08457]">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </div>
          <h3 className="mt-5 text-xl font-medium">
            {en ? "Welcome — pour yourself a coffee." : "ようこそ、コーヒーを一杯どうぞ。"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#3a3a38]/65">
            {en ? (
              <>A confirmation email is on its way to {email}. We look forward to sending you seasonal notes.</>
            ) : (
              <>{email} 宛に確認メールをお送りしました。季節の便りを楽しみにお待ちください。</>
            )}
          </p>
          <button
            onClick={() => {
              setSent(false);
              setEmail("");
            }}
            className="mt-6 text-sm font-medium text-[#3a3a38]/60 underline-offset-4 hover:text-[#3a3a38] hover:underline"
          >
            {en ? "Use a different address" : "別のアドレスで登録する"}
          </button>
        </div>
      ) : (
        <>
          <h3 className="mt-6 text-xl font-medium">
            {en ? "Seasonal notes, once a month." : "季節の便りを、月に一度。"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#3a3a38]/65">
            {en
              ? "New arrivals, living tips, and little recipes — quiet reading delivered to you."
              : "新作の入荷、暮らしのヒント、小さなレシピ。静かな読みものをお届けします。"}
          </p>

          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) setSent(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 flex-1 rounded-full border border-[#3a3a38]/12 bg-[#f4f1ea] px-5 text-sm text-[#3a3a38] outline-none transition-colors placeholder:text-[#3a3a38]/40 focus:border-[#8a9a7b] focus:ring-2 focus:ring-[#8a9a7b]/20"
            />
            <button
              type="submit"
              disabled={!valid}
              className="h-12 rounded-full bg-[#3a3a38] px-6 text-sm font-medium text-[#f4f1ea] transition-colors hover:bg-[#3a3a38]/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {en ? "Subscribe" : "登録する"}
            </button>
          </form>
          <p className="mt-3 text-xs text-[#3a3a38]/45">
            {en ? "Unsubscribe anytime. No spam, ever." : "いつでも解除できます。スパムは送りません。"}
          </p>
        </>
      )}
    </div>
  );
}
