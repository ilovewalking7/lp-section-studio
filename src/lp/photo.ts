/**
 * 写真の取り込み（リサイズ＋圧縮）。
 *
 * 書き出しHTMLは1枚で完結させる方針のため、写真は data URI として本文に埋め込む。
 * スマホの写真をそのまま入れるとHTMLが数MBになり実用に耐えないので、取り込み時に
 * 長辺を縮小し、JPEG品質を段階的に落として上限バイト数に収める。
 */

/** 縮小後の長辺（px）。LPの全幅表示に足り、かつ容量を抑えられる値 */
const MAX_EDGE = 1600;

/** data URI 1枚あたりのおおよその上限（文字数）。3枚でも localStorage に収まる範囲に */
export const MAX_PHOTO_DATA_URL_LENGTH = 900_000;

/** 試行するJPEG品質（先頭から順に試し、上限に収まった時点で採用） */
const QUALITY_STEPS = [0.82, 0.72, 0.62, 0.5, 0.4];

/** 受け付ける画像MIMEタイプ */
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export class PhotoImportError extends Error {}

/** File を <img> として読み込む（object URL は必ず解放する） */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new PhotoImportError("画像を読み込めませんでした。"));
    };
    img.src = url;
  });
}

/** 長辺が MAX_EDGE に収まる描画サイズを求める（拡大はしない） */
function fitSize(w: number, h: number): { width: number; height: number } {
  const longest = Math.max(w, h);
  if (longest <= MAX_EDGE) return { width: w, height: h };
  const scale = MAX_EDGE / longest;
  return { width: Math.round(w * scale), height: Math.round(h * scale) };
}

/**
 * 画像ファイルを、LPに埋め込める圧縮済み data URI（JPEG）に変換する。
 * 上限に収まらない場合は PhotoImportError を投げる（呼び出し側で利用者に提示する）。
 */
export async function fileToCompressedDataUrl(file: File): Promise<string> {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new PhotoImportError(
      "JPEG / PNG / WebP / GIF の画像ファイルを選んでください。"
    );
  }

  const img = await loadImage(file);
  const { width, height } = fitSize(img.naturalWidth, img.naturalHeight);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new PhotoImportError("この環境では画像を処理できませんでした。");
  }
  // 透過PNGをJPEGにすると背景が黒く落ちるため、白で下地を塗ってから描画する
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  for (const quality of QUALITY_STEPS) {
    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    if (dataUrl.length <= MAX_PHOTO_DATA_URL_LENGTH) return dataUrl;
  }
  throw new PhotoImportError(
    "画像の容量が大きすぎます。もう少し小さい写真を選んでください。"
  );
}
