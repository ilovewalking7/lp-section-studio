import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ステップフォーム",
  category: "フォーム",
  description: "進捗インジケーターと前後ナビ・確認画面付きの3ステップウィザード。",
  align: "center",
};

const STEPS = [
  { ja: "アカウント", en: "Account" },
  { ja: "プロフィール", en: "Profile" },
  { ja: "確認", en: "Review" },
] as const;

type FormState = {
  email: string;
  password: string;
  name: string;
  company: string;
};

function FieldRow({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
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

export default function MultiStepForm() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    name: "",
    company: "",
  });

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const isLast = step === STEPS.length - 1;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-4">
        <CardTitle>{en ? "Sign up" : "新規登録"}</CardTitle>
        {/* 進捗インジケーター */}
        <div className="flex items-center">
          {STEPS.map((stepItem, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div
                key={stepItem.en}
                className="flex flex-1 items-center last:flex-none"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "grid size-8 place-items-center rounded-full border-2 text-xs font-semibold transition-colors",
                      done && "border-primary bg-primary text-primary-foreground",
                      active && "border-primary text-primary",
                      !done && !active && "border-muted text-muted-foreground"
                    )}
                  >
                    {done ? <Check className="size-4" /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      "absolute mt-10 whitespace-nowrap text-[11px]",
                      active ? "font-medium text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {en ? stepItem.en : stepItem.ja}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "mx-2 h-0.5 flex-1 rounded-full transition-colors",
                      i < step ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-2">
        {step === 0 && (
          <div className="space-y-4">
            <FieldRow
              label={en ? "Email address" : "メールアドレス"}
              htmlFor="ms-email"
            >
              <Input
                id="ms-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
              />
            </FieldRow>
            <FieldRow
              label={en ? "Password" : "パスワード"}
              htmlFor="ms-pass"
            >
              <Input
                id="ms-pass"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
              />
            </FieldRow>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <FieldRow
              label={en ? "Full name" : "お名前"}
              htmlFor="ms-name"
            >
              <Input
                id="ms-name"
                placeholder={en ? "John Smith" : "山田 太郎"}
                value={form.name}
                onChange={set("name")}
              />
            </FieldRow>
            <FieldRow
              label={en ? "Company (optional)" : "会社名（任意）"}
              htmlFor="ms-company"
            >
              <Input
                id="ms-company"
                placeholder={en ? "Acme Inc." : "株式会社サンプル"}
                value={form.company}
                onChange={set("company")}
              />
            </FieldRow>
          </div>
        )}

        {step === 2 && (
          <dl className="divide-y rounded-lg border text-sm">
            <ReviewRow
              label={en ? "Email" : "メール"}
              value={form.email || "—"}
            />
            <ReviewRow
              label={en ? "Password" : "パスワード"}
              value={form.password ? "••••••••" : "—"}
            />
            <ReviewRow
              label={en ? "Name" : "お名前"}
              value={form.name || "—"}
            />
            <ReviewRow
              label={en ? "Company" : "会社名"}
              value={form.company || "—"}
            />
          </dl>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            <ArrowLeft className="size-4" />
            {en ? "Back" : "戻る"}
          </Button>
          {isLast ? (
            <Button className="flex-1" onClick={() => setStep(0)}>
              <Check className="size-4" />
              {en ? "Sign up" : "登録する"}
            </Button>
          ) : (
            <Button
              className="flex-1"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            >
              {en ? "Next" : "次へ"}
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
