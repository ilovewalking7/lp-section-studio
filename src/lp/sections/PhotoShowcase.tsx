/**
 * 写真ギャラリーセクション。
 *
 * 既存デモ（registry）は「外部画像なし」の規約でSVG装飾のみのため、利用者が撮った
 * 実物の写真を載せる場所が無い。このセクションだけはミセテLP独自のコンポーネントとして
 * 用意し、プレビュー（LpPreview）と書き出し（export.ts の renderToStaticMarkup）の
 * 両方から同じ実体を描画する。
 *
 * 写真は data URI（圧縮済みJPEG）なので、書き出しHTMLは外部リソース無しで完結する。
 * 配色・書体は PhotoTheme でテンプレの世界観に合わせる（クラス文字列はテンプレ側
 * templates.ts に literal で書かれ、npm run lp:css の --content 対象に含める）。
 */
import { cn } from "@/lib/utils";
import type { LpPhoto, PhotoTheme } from "../types";

/** 枚数に応じた写真の縦横比。1枚=主役、2枚=横並び、3枚=縦長3連 */
function aspectFor(count: number): string {
  if (count <= 1) return "aspect-[16/10]";
  if (count === 2) return "aspect-[4/3]";
  return "aspect-[4/5]";
}

/** 枚数に応じたグリッド列数 */
function gridFor(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1 sm:grid-cols-3";
}

export default function PhotoShowcase({
  photos,
  theme,
  eyebrow,
  heading,
}: {
  photos: LpPhoto[];
  theme: PhotoTheme;
  eyebrow: string;
  heading: string;
}) {
  if (photos.length === 0) return null;
  const count = photos.length;

  return (
    <section className={cn("w-full px-6 py-16 sm:py-24", theme.bg)}>
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.3em]",
              theme.accent,
              theme.font
            )}
          >
            {eyebrow}
          </p>
          <h2
            className={cn(
              "mt-3 text-3xl font-medium tracking-wide sm:text-4xl",
              theme.text,
              theme.font
            )}
          >
            {heading}
          </h2>
          <span
            className={cn(
              "mx-auto mt-6 block h-px w-16 border-t",
              theme.border
            )}
          />
        </header>

        <div className={cn("grid gap-5 sm:gap-6", gridFor(count))}>
          {photos.map((photo, i) => (
            <figure key={i} className="group">
              <div
                className={cn(
                  "overflow-hidden rounded-sm border",
                  theme.border,
                  aspectFor(count)
                )}
              >
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt -- alt は利用者入力 */}
                <img
                  src={photo.dataUrl}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.03]"
                />
              </div>
              {photo.alt ? (
                <figcaption
                  className={cn(
                    "mt-3 text-center text-sm leading-relaxed",
                    theme.muted,
                    theme.font
                  )}
                >
                  {photo.alt}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
