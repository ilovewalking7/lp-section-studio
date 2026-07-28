import { useState } from "react";
import { Bell, Globe, Moon, Save, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "設定パネル",
  category: "フォーム",
  description: "スイッチ・セグメントコントロール・保存バーを備えたアカウント設定。",
  align: "center",
};

const THEMES = [
  { id: "light", ja: "ライト", en: "Light" },
  { id: "dark", ja: "ダーク", en: "Dark" },
  { id: "system", ja: "システム", en: "System" },
] as const;
type Theme = (typeof THEMES)[number]["id"];

function Row({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-muted-foreground">{icon}</div>
        <div className="space-y-0.5">
          <p className="text-sm font-medium leading-none">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPanel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [theme, setTheme] = useState<Theme>("system");
  const [dirty, setDirty] = useState(false);

  const touch = () => setDirty(true);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{en ? "Account settings" : "アカウント設定"}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <section>
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {en ? "Notifications" : "通知"}
          </h3>
          <div className="divide-y">
            <Row
              icon={<Bell className="size-4" />}
              title={en ? "Email notifications" : "メール通知"}
              description={
                en
                  ? "Get important updates by email"
                  : "重要な更新をメールで受け取る"
              }
            >
              <Switch
                checked={emailNotif}
                onCheckedChange={(v) => {
                  setEmailNotif(v);
                  touch();
                }}
                aria-label={en ? "Email notifications" : "メール通知"}
              />
            </Row>
            <Row
              icon={<Bell className="size-4" />}
              title={en ? "Push notifications" : "プッシュ通知"}
              description={
                en
                  ? "Enable browser push notifications"
                  : "ブラウザのプッシュ通知を有効化"
              }
            >
              <Switch
                checked={pushNotif}
                onCheckedChange={(v) => {
                  setPushNotif(v);
                  touch();
                }}
                aria-label={en ? "Push notifications" : "プッシュ通知"}
              />
            </Row>
          </div>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {en ? "Security" : "セキュリティ"}
          </h3>
          <div className="divide-y">
            <Row
              icon={<Shield className="size-4" />}
              title={en ? "Two-factor authentication" : "二段階認証"}
              description={
                en
                  ? "Require a verification code at login"
                  : "ログイン時に確認コードを要求"
              }
            >
              <Switch
                checked={twoFactor}
                onCheckedChange={(v) => {
                  setTwoFactor(v);
                  touch();
                }}
                aria-label={en ? "Two-factor authentication" : "二段階認証"}
              />
            </Row>
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {en ? "Appearance" : "外観"}
          </h3>
          <div className="flex items-center gap-3">
            <Globe className="size-4 text-muted-foreground" />
            <div
              role="radiogroup"
              aria-label={en ? "Theme" : "テーマ"}
              className="inline-flex flex-1 rounded-lg border bg-muted/50 p-1"
            >
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={theme === t.id}
                  onClick={() => {
                    setTheme(t.id);
                    touch();
                  }}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    theme === t.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.id === "dark" && <Moon className="size-3.5" />}
                  {en ? t.en : t.ja}
                </button>
              ))}
            </div>
          </div>
        </section>
      </CardContent>

      {/* 保存バー */}
      <div className="flex items-center justify-between gap-4 border-t bg-muted/40 px-6 py-4">
        <p className="text-xs text-muted-foreground">
          {dirty
            ? en
              ? "You have unsaved changes"
              : "未保存の変更があります"
            : en
            ? "All changes saved"
            : "すべての変更を保存済み"}
        </p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={!dirty}
            onClick={() => setDirty(false)}
          >
            {en ? "Discard" : "破棄"}
          </Button>
          <Button size="sm" disabled={!dirty} onClick={() => setDirty(false)}>
            <Save className="size-4" />
            {en ? "Save" : "保存"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
