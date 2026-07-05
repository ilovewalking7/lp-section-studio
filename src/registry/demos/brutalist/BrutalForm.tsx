import { useState } from "react";
import { Send } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・フォーム",
  category: "ブルータリスト",
  description: "極太ボーダーの入力欄とオフセットシャドウの送信ボタン。",
  align: "center",
  isNew: true,
  tags: ["brutalist", "bold", "form"],
};

const fieldBase =
  "w-full border-4 border-black bg-white px-4 py-3 font-bold text-black placeholder:font-medium placeholder:text-black/50 focus:outline-none focus:shadow-[4px_4px_0_0_#000] focus:-translate-x-0 transition-shadow";

export default function BrutalForm() {
  const [sent, setSent] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="bg-yellow-300 p-8 font-sans text-black">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="w-96 max-w-full border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]"
      >
        <h3 className="text-2xl font-black uppercase">
          {en ? "Get in touch" : "連絡する"}
        </h3>
        <p className="mt-1 font-mono text-xs font-bold">
          {en ? "Reply within 24 hours." : "24時間以内に返信。"}
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block font-black uppercase">
              {en ? "Name" : "名前"}
            </label>
            <input
              className={fieldBase}
              placeholder={en ? "Jane Doe" : "山田 太郎"}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block font-black uppercase">
              {en ? "Email" : "メール"}
            </label>
            <input
              type="email"
              className={fieldBase}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block font-black uppercase">
              {en ? "Message" : "本文"}
            </label>
            <textarea
              rows={3}
              className={fieldBase + " resize-none"}
              placeholder={en ? "Anything at all…" : "何でもどうぞ…"}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 border-4 border-black bg-fuchsia-400 px-5 py-3 font-black uppercase shadow-[6px_6px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
        >
          {sent ? (en ? "Sent!" : "送信済み！") : en ? "Send" : "送信する"}
          <Send className="h-4 w-4" strokeWidth={3} />
        </button>
      </form>
    </div>
  );
}
