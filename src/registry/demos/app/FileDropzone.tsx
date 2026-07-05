import { useState } from "react";
import { FileText, ImageIcon, Trash2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ファイルドロップゾーン",
  category: "アプリUI",
  description: "破線枠のドラッグ&ドロップ領域。ドラッグ中のハイライトと、選択ファイル一覧の表示。",
  align: "center",
};

type DemoFile = {
  id: number;
  name: string;
  nameEn: string;
  size: number;
  kind: "image" | "doc";
};

const INITIAL: DemoFile[] = [
  { id: 1, name: "デザイン仕様.pdf", nameEn: "design-spec.pdf", size: 2_412_544, kind: "doc" },
  { id: 2, name: "hero-banner.png", nameEn: "hero-banner.png", size: 845_233, kind: "image" },
];

const SAMPLE_NAMES = [
  { ja: "スクリーンショット.png", en: "screenshot.png" },
  { ja: "請求書_2026.pdf", en: "invoice_2026.pdf" },
  { ja: "アバター.jpg", en: "avatar.jpg" },
  { ja: "議事録.docx", en: "meeting-notes.docx" },
];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileDropzone() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<DemoFile[]>(INITIAL);
  const [seq, setSeq] = useState(3);

  const addFakeFile = () => {
    const sample = SAMPLE_NAMES[seq % SAMPLE_NAMES.length];
    const isImage = /\.(png|jpg|jpeg|gif)$/i.test(sample.en);
    setFiles((prev) => [
      ...prev,
      {
        id: seq,
        name: sample.ja,
        nameEn: sample.en,
        size: Math.floor(200_000 + Math.random() * 3_000_000),
        kind: isImage ? "image" : "doc",
      },
    ]);
    setSeq((s) => s + 1);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div
        role="button"
        tabIndex={0}
        onClick={addFakeFile}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            addFakeFile();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFakeFile();
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/30 hover:border-muted-foreground/40 hover:bg-muted/50"
        )}
      >
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-colors",
            dragging ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
          )}
        >
          <UploadCloud className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium text-foreground">
          {dragging
            ? en
              ? "Drop here"
              : "ここにドロップ"
            : en
              ? "Drag & drop files"
              : "ファイルをドラッグ＆ドロップ"}
        </p>
        <p className="text-xs text-muted-foreground">
          {en
            ? "or click to browse (PNG, JPG, PDF, up to 10MB)"
            : "またはクリックして参照（PNG・JPG・PDF、最大 10MB）"}
        </p>
      </div>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((f) => {
            const Icon = f.kind === "image" ? ImageIcon : FileText;
            return (
              <li
                key={f.id}
                className="flex items-center gap-3 rounded-lg border bg-card p-2.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {en ? f.nameEn : f.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatSize(f.size)}</p>
                </div>
                <button
                  onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                  aria-label={en ? `Delete ${f.nameEn}` : `${f.name} を削除`}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-rose-500/10 hover:text-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
