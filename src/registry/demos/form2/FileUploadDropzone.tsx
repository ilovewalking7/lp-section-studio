import { useRef, useState } from "react";
import { UploadCloud, File as FileIcon, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ファイルドロップゾーン",
  category: "フォーム",
  description: "ドラッグ&ドロップ対応のアップロード。枠が点滅して受け入れる。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

type Item = { id: number; name: string; size: string };

export default function FileUploadDropzone() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState<Item[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const idRef = useRef(0);

  const add = (list: FileList | null) => {
    if (!list) return;
    const items = Array.from(list).map((f) => ({
      id: idRef.current++,
      name: f.name,
      size: `${(f.size / 1024).toFixed(0)} KB`,
    }));
    setFiles((prev) => [...prev, ...items]);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <style>{`@keyframes fd-in{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}@keyframes fd-pulse{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">{en ? "Upload files" : "ファイルをアップロード"}</h2>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center outline-none transition-all",
          drag
            ? "scale-[1.02] border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
            : "border-slate-300 hover:border-indigo-400 dark:border-slate-700"
        )}
      >
        <UploadCloud
          className={cn("h-9 w-9 transition-colors", drag ? "text-indigo-500" : "text-slate-400")}
          style={drag ? { animation: "fd-pulse 1s ease-in-out infinite" } : undefined}
        />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {drag ? (en ? "Drop here" : "ここにドロップ") : (en ? "Click or drag & drop" : "クリック または ドラッグ＆ドロップ")}
        </p>
        <p className="text-xs text-slate-400">{en ? "PNG, JPG, PDF (max 10MB)" : "PNG, JPG, PDF（最大10MB）"}</p>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </div>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((f) => (
            <li key={f.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-800/50" style={{ animation: "fd-in .25s ease-out" }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                <FileIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{f.name}</p>
                <p className="text-xs text-slate-400">{f.size}</p>
              </div>
              <Check className="h-4 w-4 text-emerald-500" />
              <button type="button" aria-label={en ? "Remove" : "削除"} onClick={() => setFiles((p) => p.filter((x) => x.id !== f.id))}
                className="text-slate-400 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
