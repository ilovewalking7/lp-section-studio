import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "チェックアウトフォーム",
  category: "コマース",
  description: "連絡先・カード入力と注文概要を並べた2カラムの会計フォーム。",
  align: "full",
};

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium text-muted-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const items = [
  { name: "Aurora ヘッドホン", nameEn: "Aurora Headphones", qty: 1, price: "¥14,900" },
  { name: "Pebble スピーカー", nameEn: "Pebble Speaker", qty: 2, price: "¥17,800" },
];

export default function CheckoutForm() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="grid gap-px md:grid-cols-[1.4fr_1fr]">
        {/* フォーム側 */}
        <form
          className="space-y-6 p-6 md:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {en ? "Contact" : "連絡先"}
            </h3>
            <Field label={en ? "Email" : "メールアドレス"} htmlFor="co-email">
              <Input id="co-email" type="email" placeholder="you@example.com" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={en ? "Last name" : "姓"} htmlFor="co-last">
                <Input id="co-last" placeholder={en ? "Smith" : "山田"} />
              </Field>
              <Field label={en ? "First name" : "名"} htmlFor="co-first">
                <Input id="co-first" placeholder={en ? "John" : "太郎"} />
              </Field>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {en ? "Payment" : "支払い"}
            </h3>
            <Field label={en ? "Card number" : "カード番号"} htmlFor="co-card">
              <div className="relative">
                <CreditCard className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="co-card"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  className="pl-9"
                />
              </div>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={en ? "Expiry" : "有効期限"} htmlFor="co-exp">
                <Input id="co-exp" placeholder="MM / YY" />
              </Field>
              <Field label={en ? "Security code" : "セキュリティコード"} htmlFor="co-cvc">
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="co-cvc" placeholder="CVC" className="pl-9" />
                </div>
              </Field>
            </div>
          </section>

          <Button type="submit" size="lg" className="w-full">
            {en ? "Pay ¥35,580" : "¥35,580 を支払う"}
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-emerald-500" />
            {en
              ? "Secure payment encrypted with 256-bit SSL"
              : "256bit SSL で暗号化された安全な決済"}
          </p>
        </form>

        {/* 注文概要 */}
        <aside className="space-y-5 border-t bg-muted/40 p-6 md:border-l md:border-t-0 md:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {en ? "Order summary" : "注文概要"}
          </h3>
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.name} className="flex items-center gap-3 text-sm">
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-gradient-to-br from-slate-500 to-slate-700 text-xs font-bold text-white/90">
                  {(en ? it.nameEn : it.name).charAt(0)}
                </span>
                <span className="min-w-0 flex-1 truncate">
                  {en ? it.nameEn : it.name}
                </span>
                <span className="text-xs text-muted-foreground">×{it.qty}</span>
                <span className="font-medium tabular-nums">{it.price}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>{en ? "Subtotal" : "小計"}</span>
              <span className="tabular-nums text-foreground">¥32,700</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>{en ? "Shipping" : "送料"}</span>
              <span className="tabular-nums text-foreground">¥800</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>{en ? "Tax" : "消費税"}</span>
              <span className="tabular-nums text-foreground">¥2,080</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between border-t pt-4">
            <span className="font-semibold">{en ? "Total" : "合計"}</span>
            <span className="text-lg font-bold text-emerald-500 tabular-nums">
              ¥35,580
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
