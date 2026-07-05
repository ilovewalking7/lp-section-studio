import { useState } from "react";
import { Check, Copy, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "回答フィードバック",
  category: "AI / チャット",
  description: "高評価・低評価・コピー・再生成のアクションバー。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

type Vote = "up" | "down" | null;

export default function FeedbackThumbs() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [vote, setVote] = useState<Vote>(null);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-[480px] rounded-2xl border bg-card p-5 shadow-sm">
      <p className="text-sm leading-relaxed text-foreground">
        {en
          ? "Lazy loading defers loading a component until it's actually needed. The initial bundle gets lighter and the page renders faster."
          : "遅延読み込みは、必要になるまでコンポーネントの読み込みを遅らせる手法です。初期バンドルが軽くなり、表示が速くなります。"}
      </p>

      <div className="mt-4 flex items-center gap-1 border-t pt-3">
        <IconButton
          active={vote === "up"}
          activeClass="bg-emerald-500/10 text-emerald-500"
          onClick={() => setVote((v) => (v === "up" ? null : "up"))}
          label={en ? "Helpful" : "役に立った"}
        >
          <ThumbsUp className="size-4" />
        </IconButton>
        <IconButton
          active={vote === "down"}
          activeClass="bg-rose-500/10 text-rose-500"
          onClick={() => setVote((v) => (v === "down" ? null : "down"))}
          label={en ? "Not helpful" : "役に立たなかった"}
        >
          <ThumbsDown className="size-4" />
        </IconButton>

        <div className="mx-1 h-5 w-px bg-border" />

        <IconButton
          active={copied}
          activeClass="bg-violet-500/10 text-violet-500"
          onClick={copy}
          label={en ? (copied ? "Copied" : "Copy") : copied ? "コピー済み" : "コピー"}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </IconButton>
        <IconButton active={false} activeClass="" onClick={() => {}} label={en ? "Regenerate" : "再生成"}>
          <RotateCcw className="size-4" />
        </IconButton>

        {vote && (
          <span className="ml-auto text-xs text-muted-foreground">
            {en ? "Feedback sent" : "フィードバックを送信しました"}
          </span>
        )}
      </div>
    </div>
  );
}

function IconButton({
  active,
  activeClass,
  onClick,
  label,
  children,
}: {
  active: boolean;
  activeClass: string;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-all active:scale-90",
        active ? activeClass : "hover:bg-accent hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
