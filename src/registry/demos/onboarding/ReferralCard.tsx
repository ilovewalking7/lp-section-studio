import { useState } from "react";
import { Gift, Copy, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リファラル招待カード",
  category: "オンボーディング",
  description: "紹介コードとコピー、特典までの進捗を備えた招待カード。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["onboarding", "referral", "invite", "reward"],
  principle:
    "招待で双方が得をする互恵性の原理と、すでに参加した友人の人数を示す社会的証明が、紹介行動と継続利用の両方を強く動機づける。",
};

const CODE = "WALK-2026";
const GOAL = 5;

export default function ReferralCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [copied, setCopied] = useState(false);
  const [invited, setInvited] = useState(3);

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(CODE);
    } catch {
      /* clipboard 利用不可でもUIは進める */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const pct = Math.min(100, Math.round((invited / GOAL) * 100));
  const reached = invited >= GOAL;
  const left = Math.max(0, GOAL - invited);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="relative bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-transparent p-6">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow">
          <Gift className="size-6" />
        </div>
        <h3 className="mt-4 text-base font-semibold">
          {en ? "Invite friends and earn rewards" : "友達を招待して特典をゲット"}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {en ? (
            <>
              You and your friend each get
              <span className="font-semibold text-foreground"> ¥1,000 </span>
              in credit.
            </>
          ) : (
            <>
              紹介された方も、あなたも
              <span className="font-semibold text-foreground"> 1,000円分 </span>
              のクレジット。
            </>
          )}
        </p>
      </div>

      <div className="space-y-5 p-6 pt-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            {en ? "Your referral code" : "あなたの紹介コード"}
          </label>
          <div className="flex gap-2">
            <Input
              readOnly
              value={CODE}
              className="font-mono font-semibold tracking-wider"
              aria-label={en ? "Referral code" : "紹介コード"}
            />
            <Button
              variant={copied ? "secondary" : "default"}
              onClick={copy}
              className="shrink-0"
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  {en ? "Copied" : "コピー済み"}
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  {en ? "Copy" : "コピー"}
                </>
              )}
            </Button>
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="size-3.5" />
              {en ? "Friends invited" : "招待した友達"}
            </span>
            <span className="font-semibold tabular-nums">
              {invited}/{GOAL}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-out",
                reached
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                  : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
              )}
              style={{ width: `${Math.max(pct, 4)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {reached
              ? en
                ? "🎉 Goal reached! Your bonus reward is unlocked."
                : "🎉 目標達成！ボーナス特典が解除されました。"
              : en
                ? `Invite ${left} more to unlock a special bonus`
                : `あと ${left} 人の招待で特別ボーナスを解除`}
          </p>
        </div>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setInvited((n) => Math.min(GOAL, n + 1))}
          disabled={reached}
        >
          {reached
            ? en
              ? "Completed"
              : "達成済み"
            : en
              ? "Send invite (demo)"
              : "招待を送る（デモ）"}
        </Button>
      </div>
    </div>
  );
}
