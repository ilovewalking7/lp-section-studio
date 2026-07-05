import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ログインフォーム",
  category: "フォーム",
  description: "メール・パスワード入力を備えた認証フォーム。",
};

export default function LoginForm() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{en ? "Sign in" : "ログイン"}</CardTitle>
        <CardDescription>
          {en
            ? "Enter your email and password"
            : "メールアドレスとパスワードを入力してください"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              {en ? "Email" : "メールアドレス"}
            </label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                {en ? "Password" : "パスワード"}
              </label>
              <a
                href="#"
                className="text-xs text-primary underline-offset-4 hover:underline"
              >
                {en ? "Forgot?" : "お忘れですか？"}
              </a>
            </div>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full">
            {en ? "Sign in" : "ログイン"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
