import { FolderOpen, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "空の状態",
  category: "アプリUI",
  description: "ソフトな円のアイコン・見出し・説明・主要/副次アクションを備えた空状態。",
  align: "center",
};

export default function EmptyState() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex w-full max-w-md flex-col items-center rounded-xl border border-dashed bg-card px-8 py-12 text-center">
      <div className="relative mb-5">
        <div className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-xl" />
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-muted to-muted/40 ring-1 ring-border">
          <FolderOpen className="h-7 w-7 text-muted-foreground" />
        </div>
      </div>

      <h3 className="text-base font-semibold text-foreground">
        {en ? "No projects yet" : "プロジェクトがありません"}
      </h3>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
        {en
          ? "Create your first project to start working with your team. You can also import from a template."
          : "最初のプロジェクトを作成して、チームでの作業を始めましょう。テンプレートからのインポートも可能です。"}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        <Button>
          <Plus className="h-4 w-4" />
          {en ? "Create project" : "プロジェクトを作成"}
        </Button>
        <Button variant="outline">
          <Upload className="h-4 w-4" />
          {en ? "Import" : "インポート"}
        </Button>
      </div>
    </div>
  );
}
