import { useState } from "react";
import { CreditCard, Calendar, Lock, ShieldCheck } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・チェックアウト",
  category: "フォーム",
  description: "ガラス質感のカード決済フォーム。番号を4桁ごとに整形。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

export default function CheckoutGlass() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [holder, setHolder] = useState("");

  const formatNumber = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-7 shadow-xl">
      <style>{`@keyframes cg-sheen{0%{transform:translateX(-120%)}100%{transform:translateX(220%)}}`}</style>

      <div className="relative mb-6 overflow-hidden rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ animation: "cg-sheen 4s ease-in-out infinite" }} />
        <div className="mb-6 flex items-center justify-between">
          <div className="h-7 w-10 rounded bg-gradient-to-br from-amber-300 to-yellow-500" />
          <CreditCard className="h-6 w-6 text-white/70" />
        </div>
        <p className="font-mono text-lg tracking-widest text-white">{number || "•••• •••• •••• ••••"}</p>
        <div className="mt-4 flex justify-between text-xs text-white/70">
          <span className="uppercase">{holder || "CARD HOLDER"}</span>
          <span>{expiry || "MM/YY"}</span>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-white/70">{en ? "Card number" : "カード番号"}</span>
          <div className="relative">
            <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input value={number} onChange={(e) => setNumber(formatNumber(e.target.value))} inputMode="numeric" placeholder="4242 4242 4242 4242"
              className="w-full rounded-lg border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30" />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-white/70">{en ? "Cardholder name" : "カード名義"}</span>
          <input value={holder} onChange={(e) => setHolder(e.target.value)} placeholder={en ? "JOHN SMITH" : "TARO YAMADA"}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm uppercase text-white placeholder:text-white/30 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30" />
        </label>

        <div className="flex gap-3">
          <label className="block flex-1">
            <span className="mb-1 block text-xs font-medium text-white/70">{en ? "Expiry" : "有効期限"}</span>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} inputMode="numeric" placeholder="MM/YY"
                className="w-full rounded-lg border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30" />
            </div>
          </label>
          <label className="block w-28">
            <span className="mb-1 block text-xs font-medium text-white/70">CVC</span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" placeholder="123"
                className="w-full rounded-lg border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30" />
            </div>
          </label>
        </div>

        <button type="submit"
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:scale-[1.02] active:scale-95">
          <ShieldCheck className="h-4 w-4" /> {en ? "Pay ¥4,980" : "¥4,980 を支払う"}
        </button>
      </form>
    </div>
  );
}
