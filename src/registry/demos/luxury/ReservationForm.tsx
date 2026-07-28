import { useId, useState } from "react";
import { Check } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リザベーション・フォーム",
  category: "ラグジュアリー",
  description: "限定体験のための、上質な予約・問い合わせフォーム。",
  align: "center",
  isNew: true,
  tags: ["luxury", "premium", "gold", "form"],
  principle: "下線のみの入力欄と広い余白が、記入を儀式のように感じさせ特別感を高める。",
};

export default function ReservationForm() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [sent, setSent] = useState(false);

  return (
    <div className="w-full max-w-md bg-[#0a0a0a] p-8 text-stone-100">
      <div className="border border-amber-400/20 p-8">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-amber-300/80">
            Private Appointment
          </p>
          <h3 className="mt-4 font-display text-3xl font-light tracking-tight">
            {en ? "Reserve" : "ご予約"}
          </h3>
          <div className="mx-auto mt-5 h-px w-12 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        </div>

        {sent ? (
          <div className="mt-10 flex flex-col items-center py-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 text-amber-300">
              <Check className="h-6 w-6" />
            </span>
            <p className="mt-6 font-display text-xl tracking-tight">
              {en ? "Request received" : "承りました"}
            </p>
            <p className="mt-3 text-sm text-stone-400">
              {en
                ? "A member of our team will be in touch within 48 hours."
                : "担当者より48時間以内にご連絡いたします。"}
            </p>
          </div>
        ) : (
          <form
            className="mt-9 space-y-7"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <Field
              label={en ? "Name" : "お名前"}
              type="text"
              placeholder={en ? "Jane Doe" : "山田 花子"}
            />
            <Field
              label={en ? "Email" : "メールアドレス"}
              type="email"
              placeholder="you@example.com"
            />
            <Field label={en ? "Preferred date" : "ご希望日"} type="date" />

            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500">
                {en ? "Request" : "ご要望"}
              </label>
              <textarea
                rows={2}
                placeholder={en ? "Tell us how we can assist you" : "ご相談内容をご記入ください"}
                className="mt-2 w-full resize-none border-b border-stone-700 bg-transparent pb-2 text-sm text-stone-100 outline-none transition-colors placeholder:text-stone-600 focus:border-amber-400/60"
              />
            </div>

            <button
              type="submit"
              className="group relative w-full overflow-hidden border border-amber-400/40 py-3.5 text-[11px] uppercase tracking-[0.3em] text-amber-200 transition-colors hover:text-[#0a0a0a]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">{en ? "Request Appointment" : "予約を申し込む"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder?: string;
}) {
  // label と input が id で結ばれていないと、読み上げでは
  // 「編集テキスト」としか案内されず、何の欄か分からない
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[10px] uppercase tracking-[0.3em] text-stone-500"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full border-b border-stone-700 bg-transparent pb-2 text-sm text-stone-100 outline-none transition-colors placeholder:text-stone-600 focus:border-amber-400/60 [color-scheme:dark]"
      />
    </div>
  );
}
