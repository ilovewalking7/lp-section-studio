import { useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ミニマル・フォーム",
  category: "ミニマル",
  description: "下線入力だけで構成した、清潔な問い合わせフォーム。",
  align: "center",
  isNew: true,
  tags: ["minimal", "swiss", "form"],
  principle: "枠を下線一本に削ぎ、入力そのものに視線と集中を保たせる。",
};

type Field = {
  id: string;
  labelJa: string;
  labelEn: string;
  type: string;
  placeholderJa: string;
  placeholderEn: string;
};

const fields: Field[] = [
  { id: "name", labelJa: "氏名", labelEn: "Name", type: "text", placeholderJa: "山田 太郎", placeholderEn: "Jane Doe" },
  { id: "email", labelJa: "メール", labelEn: "Email", type: "email", placeholderJa: "you@studio.jp", placeholderEn: "you@studio.com" },
  { id: "topic", labelJa: "件名", labelEn: "Subject", type: "text", placeholderJa: "プロジェクトの相談", placeholderEn: "Project inquiry" },
];

export default function MinimalForm() {
  const [sent, setSent] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="w-full max-w-md bg-white font-sans text-neutral-900"
    >
      <header className="mb-12">
        <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          Contact
        </span>
        <h2 className="mt-3 text-3xl font-medium tracking-tight">
          {en ? "Get in touch" : "お問い合わせ"}
        </h2>
      </header>

      <div className="space-y-9">
        {fields.map((f) => (
          <div key={f.id} className="group">
            <label
              htmlFor={f.id}
              className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-neutral-500"
            >
              {en ? f.labelEn : f.labelJa}
            </label>
            <input
              id={f.id}
              type={f.type}
              required
              placeholder={en ? f.placeholderEn : f.placeholderJa}
              className="w-full border-0 border-b border-neutral-300 bg-transparent pb-2 text-sm text-neutral-900 placeholder:text-neutral-300 focus:border-neutral-900 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="mt-12 inline-flex h-11 w-full items-center justify-center border border-neutral-900 bg-neutral-900 text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-800"
      >
        {sent
          ? en
            ? "Sent ✓"
            : "送信しました ✓"
          : en
            ? "Send"
            : "送信する"}
      </button>

      <p className="mt-4 text-center text-[11px] tracking-wide text-neutral-400">
        {en
          ? "We usually reply within one business day."
          : "通常 1 営業日以内にご返信します。"}
      </p>
    </form>
  );
}
