import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "お問い合わせフォーム",
  category: "フォーム",
  description: "インライン検証と送信後の成功表示を備えたお問い合わせフォーム。",
  align: "center",
};

type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!name.trim())
      e.name = en ? "Please enter your name." : "お名前を入力してください。";
    if (!EMAIL_RE.test(email))
      e.email = en
        ? "Please enter a valid email address."
        : "有効なメールアドレスを入力してください。";
    if (message.trim().length < 10)
      e.message = en
        ? "Please enter at least 10 characters."
        : "10文字以上で入力してください。";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="grid size-14 place-items-center rounded-full bg-emerald-500/15">
            <CheckCircle2 className="size-8 text-emerald-500" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              {en ? "Message sent" : "送信しました"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {en ? (
                <>
                  Thank you, {name || "there"}.<br />
                  We will get back to you within 2 business days.
                </>
              ) : (
                <>
                  {name || "お客様"} さん、ありがとうございます。<br />
                  2営業日以内にご返信いたします。
                </>
              )}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSent(false);
              setName("");
              setEmail("");
              setMessage("");
              setErrors({});
            }}
          >
            {en ? "Send another message" : "別のメッセージを送る"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{en ? "Contact us" : "お問い合わせ"}</CardTitle>
        <CardDescription>
          {en
            ? "Feel free to reach out with any questions or requests."
            : "ご質問・ご要望をお気軽にお寄せください。"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1.5">
            <label htmlFor="cf-name" className="text-xs font-medium">
              {en ? "Name" : "お名前"}
            </label>
            <Input
              id="cf-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={en ? "John Smith" : "山田 太郎"}
              aria-invalid={!!errors.name}
              className={cn(errors.name && "border-rose-500 focus-visible:ring-rose-500")}
            />
            {errors.name && (
              <p className="text-xs text-rose-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="cf-email" className="text-xs font-medium">
              {en ? "Email" : "メールアドレス"}
            </label>
            <Input
              id="cf-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              className={cn(errors.email && "border-rose-500 focus-visible:ring-rose-500")}
            />
            {errors.email && (
              <p className="text-xs text-rose-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="cf-message" className="text-xs font-medium">
              {en ? "Message" : "メッセージ"}
            </label>
            <textarea
              id="cf-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={en ? "How can we help?…" : "ご用件をご記入ください…"}
              rows={4}
              aria-invalid={!!errors.message}
              className={cn(
                "flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                errors.message && "border-rose-500 focus-visible:ring-rose-500"
              )}
            />
            {errors.message && (
              <p className="text-xs text-rose-500">{errors.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            <Send className="size-4" />
            送信する
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
