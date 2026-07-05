import { useState } from "react";
import { Sparkles, Zap, Users, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ウェルカムモーダル",
  category: "オンボーディング",
  description: "見出し・3つの価値・CTAを備えた初回起動モーダル（フレーム内に表示）。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["onboarding", "welcome", "modal", "first-run"],
  principle:
    "最初に得られる価値を3点に絞って提示することで第一印象を最適化し、CTAへ向かう一貫性/コミットメントを引き出して初回アクティベーションを高める。",
};

const VALUES = [
  {
    icon: Zap,
    title: "数秒で立ち上げ",
    titleEn: "Set up in seconds",
    desc: "テンプレートからすぐ開始できます。",
    descEn: "Get started right away from a template.",
  },
  {
    icon: Users,
    title: "チームで協働",
    titleEn: "Collaborate as a team",
    desc: "メンバーを招いて一緒に進められます。",
    descEn: "Invite members and work together.",
  },
  {
    icon: ShieldCheck,
    title: "安心のセキュリティ",
    titleEn: "Secure by default",
    desc: "データは暗号化して保護されます。",
    descEn: "Your data is encrypted and protected.",
  },
];

export default function WelcomeModal() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(true);

  return (
    <div className="relative min-h-[420px] w-full max-w-md overflow-hidden rounded-2xl border bg-card shadow-sm">
      {/* mock app background */}
      <div className="space-y-3 p-5">
        <div className="h-4 w-1/3 rounded bg-muted" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-16 rounded-lg bg-muted/60" />
          <div className="h-16 rounded-lg bg-muted/60" />
          <div className="h-16 rounded-lg bg-muted/60" />
        </div>
        <div className="h-3 w-2/3 rounded bg-muted/50" />
        <div className="h-3 w-1/2 rounded bg-muted/50" />
      </div>

      {/* trigger when closed */}
      {!open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Button onClick={() => setOpen(true)} variant="secondary">
            {en ? "Open welcome" : "ウェルカムを開く"}
          </Button>
        </div>
      )}

      {/* contained overlay */}
      {open && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
          <div
            className={cn(
              "relative w-full max-w-sm rounded-2xl border bg-popover p-6 shadow-xl",
              "animate-in"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={en ? "Close" : "閉じる"}
              className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
              <Sparkles className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">
              {en ? "Welcome to Acme Studio 👋" : "Acme Studio へようこそ 👋"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {en
                ? "Before you start, here's a quick look at what you can do."
                : "はじめる前に、できることを少しだけご紹介します。"}
            </p>

            <ul className="mt-5 space-y-3">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <li key={v.title} className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">
                        {en ? v.titleEn : v.title}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {en ? v.descEn : v.desc}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-col gap-2">
              <Button onClick={() => setOpen(false)} className="w-full">
                {en ? "Get started" : "はじめる"}
              </Button>
              <Button
                onClick={() => setOpen(false)}
                variant="ghost"
                className="w-full"
              >
                {en ? "Later" : "あとで"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
