/**
 * 写真アップロード（最大 MAX_PHOTOS 枚）。
 *
 * 取り込んだ画像は fileToCompressedDataUrl で縮小・圧縮した data URI として保持し、
 * 書き出しHTMLへそのまま埋め込む（外部サーバー不要）。ドラッグ&ドロップと
 * ファイル選択ボタンの両方を用意し、後者は視覚的に隠した <input type="file"> を
 * <label for> で操作する（キーボードでも input にフォーカスして開ける）。
 */
import { useId, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fileToCompressedDataUrl, PhotoImportError } from "../photo";
import {
  photoAspectClass,
  photoAspectLabel,
} from "../sections/PhotoShowcase";
import { MAX_PHOTOS, type LpPhoto } from "../types";

export default function PhotoUploader({
  photos,
  onChange,
}: {
  photos: LpPhoto[];
  /**
   * 写真リストの更新。圧縮（await）をまたぐ非同期処理から呼ばれるため、必ず
   * 「直前の値から次の値を作る」関数更新形で渡す。配列そのものを渡す形にすると
   * 圧縮開始時点の photos がクロージャに焼き付き、圧縮中に行われた編集・削除を
   * 完了時に巻き戻してしまう。
   */
  onChange: (update: (prev: LpPhoto[]) => LpPhoto[]) => void;
}) {
  const inputId = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const remaining = MAX_PHOTOS - photos.length;
  const full = remaining <= 0;

  /** 選択・ドロップされたファイルを順に圧縮して追加する */
  const importFiles = async (files: FileList | File[]) => {
    const list = Array.from(files);
    if (list.length === 0) return;
    setError(null);
    if (full) {
      setError(`写真は最大${MAX_PHOTOS}枚までです。`);
      return;
    }
    const target = list.slice(0, remaining);
    const added: LpPhoto[] = [];
    let failure: string | null =
      list.length > target.length
        ? `写真は最大${MAX_PHOTOS}枚までのため、はじめの${target.length}枚だけ取り込みました。`
        : null;

    setBusy(true);
    try {
      for (const file of target) {
        const dataUrl = await fileToCompressedDataUrl(file);
        added.push({ dataUrl, alt: "" });
      }
    } catch (e) {
      failure =
        e instanceof PhotoImportError
          ? e.message
          : "写真を取り込めませんでした。別の画像でお試しください。";
    } finally {
      setBusy(false);
    }

    // 圧縮中に行われた編集・削除を巻き戻さないよう、開始時点の photos ではなく
    // 「そのときの最新の値」に対して追記する。
    if (added.length > 0) {
      onChange((prev) => [...prev, ...added].slice(0, MAX_PHOTOS));
    }
    setError(failure);
  };

  const updateAlt = (index: number, alt: string) => {
    onChange((prev) => prev.map((p, i) => (i === index ? { ...p, alt } : p)));
  };

  const removePhoto = (index: number) => {
    onChange((prev) => prev.filter((_, i) => i !== index));
  };

  /** 表示順の入れ替え（ドラッグ不要。上げ下げボタンだけで完結させる） */
  const movePhoto = (index: number, direction: -1 | 1) => {
    onChange((prev) => {
      const to = index + direction;
      if (to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(index, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          // 圧縮中の多重投入は取りこぼしの元になるため受け付けない
          if (busy) return;
          void importFiles(e.dataTransfer.files);
        }}
        className={cn(
          "rounded-lg border border-dashed p-6 text-center transition-colors",
          dragging ? "border-primary bg-primary/5" : "border-border bg-muted/20"
        )}
      >
        <ImagePlus className="mx-auto size-6 text-muted-foreground" aria-hidden />
        <p className="mt-2 text-sm text-muted-foreground">
          ここに写真をドラッグ&amp;ドロップ
        </p>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple
          disabled={busy || full}
          className="peer sr-only"
          onChange={(e) => {
            const files = e.target.files;
            if (files) void importFiles(files);
            // 同じファイルを選び直せるように値をリセットする
            e.target.value = "";
          }}
        />
        <label
          htmlFor={inputId}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "mt-3 cursor-pointer peer-disabled:pointer-events-none peer-disabled:opacity-50 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background"
          )}
        >
          写真を選ぶ
        </label>
        <p className="mt-2 text-xs text-muted-foreground">
          {full
            ? `写真は最大${MAX_PHOTOS}枚までです。`
            : `あと${remaining}枚（最大${MAX_PHOTOS}枚）／JPEG・PNG・WebP・GIF`}
        </p>
      </div>

      <p
        aria-live="polite"
        className="flex min-h-4 items-center gap-1.5 text-xs text-muted-foreground"
      >
        {busy && <Loader2 className="size-3.5 animate-spin" aria-hidden />}
        {busy ? "圧縮しています…" : ""}
      </p>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      {photos.length > 0 && (
        <>
          {/* 切り抜き比率は枚数で変わる。サムネイルと同じ比率になることを明示して、
              「フォームで見た構図」と「LPの構図」が食い違って見えないようにする。 */}
          <p className="text-xs text-muted-foreground">
            LPでは {photoAspectLabel(photos.length)}{" "}
            で切り抜かれます（枚数によって変わります）。下のサムネイルは実際の切り抜きと同じ比率です。
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, i) => (
              <li key={i} className="space-y-2 rounded-lg border bg-card p-3">
                <img
                  src={photo.dataUrl}
                  alt={photo.alt || "説明が未入力の写真"}
                  className={cn(
                    "w-full rounded-md border object-cover",
                    photoAspectClass(photos.length)
                  )}
                />
                {/* 圧縮中は一覧側の操作を止める。取り込み完了で並びが変わるため、
                    途中で編集・削除・並べ替えをすると利用者の意図とずれた結果になる。 */}
                <PhotoAltField
                  index={i}
                  value={photo.alt}
                  disabled={busy}
                  onChange={(v) => updateAlt(i, v)}
                />
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8"
                    aria-label={`${i + 1}枚目の写真を前へ移動`}
                    disabled={busy || i === 0}
                    onClick={() => movePhoto(i, -1)}
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8"
                    aria-label={`${i + 1}枚目の写真を後ろへ移動`}
                    disabled={busy || i === photos.length - 1}
                    onClick={() => movePhoto(i, 1)}
                  >
                    <ArrowDown />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="ml-auto size-8 text-destructive hover:text-destructive"
                    aria-label={`${i + 1}枚目の写真を削除`}
                    disabled={busy}
                    onClick={() => removePhoto(i)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/** 写真1枚ぶんの説明（alt）入力。未入力なら入力を促す（装飾画像として扱わない）。 */
function PhotoAltField({
  index,
  value,
  disabled,
  onChange,
}: {
  index: number;
  value: string;
  /** 圧縮中は編集させない（取り込み完了で並びが変わるため） */
  disabled: boolean;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-xs font-medium text-foreground">
        {index + 1}枚目の写真の説明（例: 露天風呂）
      </label>
      <Input
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder="露天風呂"
        className="h-8 text-xs"
      />
      {value.trim() === "" && (
        <p className="text-[11px] text-amber-700 dark:text-amber-400">
          目の見えない方や検索エンジンにも伝わるよう、説明を入力してください。
        </p>
      )}
    </div>
  );
}
