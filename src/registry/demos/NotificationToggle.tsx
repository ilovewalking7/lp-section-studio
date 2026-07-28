import { useState } from "react";
import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "通知トグル",
  category: "設定",
  description: "スイッチで ON/OFF できる通知設定パネル。",
};

export default function NotificationToggle() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-2 font-medium">
          <Bell className="size-4 text-primary" />
          {en ? "Notification settings" : "通知設定"}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">
              {en ? "Push notifications" : "プッシュ通知"}
            </div>
            <div className="text-xs text-muted-foreground">
              {en
                ? "Get alerts from the app"
                : "アプリからのお知らせを受け取る"}
            </div>
          </div>
          <Switch
              checked={push}
              onCheckedChange={setPush}
              aria-label={en ? "Push notifications" : "プッシュ通知"}
            />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">
              {en ? "Email notifications" : "メール通知"}
            </div>
            <div className="text-xs text-muted-foreground">
              {en
                ? "Receive a weekly digest by email"
                : "週次のまとめをメールで受け取る"}
            </div>
          </div>
          <Switch
              checked={email}
              onCheckedChange={setEmail}
              aria-label={en ? "Email digest" : "メールのまとめ"}
            />
        </div>
      </CardContent>
    </Card>
  );
}
