/**
 * ステップ2: 質問フォーム。
 * 長い1列を「基本情報 / 紹介文 / 特徴 / 料金プラン / お客様の声 / 写真 /
 * 連絡先とCTA / 表示するセクション」のグループに分け、必須項目の充足率を上部に出す。
 * 未入力があっても先へは進める（ブロックしない）。
 */
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldGroup, LabeledInput, LabeledTextarea, Note } from "./fields";
import PhotoUploader from "./PhotoUploader";
import SectionToggles from "./SectionToggles";
import type {
  Feature,
  IndustryTemplate,
  LpAnswers,
  LpPhoto,
  PricePlan,
  Testimonial,
} from "../types";

/** 回答を書き換える操作一式（LpBuilder が状態を持ち、ここは呼ぶだけ） */
export interface AnswerEditor {
  update: <K extends keyof LpAnswers>(key: K, value: LpAnswers[K]) => void;
  updateFeature: (index: 0 | 1 | 2, patch: Partial<Feature>) => void;
  updatePlan: (index: 0 | 1 | 2, patch: Partial<PricePlan>) => void;
  updateTestimonial: (index: 0 | 1 | 2, patch: Partial<Testimonial>) => void;
  /**
   * 写真だけは圧縮（await）をまたぐ非同期処理から更新されるため、値ではなく
   * 関数更新形で受ける（update("photos", …) だと開始時点の配列で上書きしてしまう）。
   */
  updatePhotos: (update: (prev: LpPhoto[]) => LpPhoto[]) => void;
}

/** 進み具合バーの対象になる必須項目 */
function requiredFields(a: LpAnswers): { label: string; value: string }[] {
  return [
    { label: "店名・屋号", value: a.shopName },
    { label: "地域", value: a.area },
    { label: "キャッチコピー", value: a.tagline },
    { label: "紹介文", value: a.intro },
    { label: "電話番号", value: a.phone },
    { label: "CTAボタンの文言", value: a.ctaLabel },
    { label: "CTAボタンのリンク先", value: a.ctaHref },
  ];
}

export default function FormStep({
  template,
  answers,
  editor,
  onBack,
  onNext,
}: {
  template: IndustryTemplate;
  answers: LpAnswers;
  editor: AnswerEditor;
  onBack: () => void;
  onNext: () => void;
}) {
  const fields = requiredFields(answers);
  const missing = fields.filter((f) => f.value.trim() === "");
  const filled = fields.length - missing.length;
  const percent = Math.round((filled / fields.length) * 100);

  // テンプレのデモが実際に表示できる件数だけ「お客様の声」の入力欄を出す
  const slots = Math.min(Math.max(template.testimonialSlots, 0), 3);
  const testimonialIndexes = Array.from(
    { length: slots },
    (_, i) => i as 0 | 1 | 2
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          LPの内容を入力してください
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          あらかじめ業種にあわせたサンプル文言が入っています。そのまま使っても、書き換えてもOKです。
        </p>
      </div>

      {/* 入力の進み具合 */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm font-medium">入力の進み具合</p>
          <p className="text-sm tabular-nums text-muted-foreground">
            {filled} / {fields.length} 項目
          </p>
        </div>
        <div
          role="progressbar"
          aria-label="必須項目の充足率"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="mt-2 h-2 overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        {/* 入力のたびに読み上げが割り込むのを避けるため live region にはしない。
            常時表示のうえ、状態は上の progressbar が持つ。 */}
        <p className="mt-2 text-xs text-muted-foreground">
          {missing.length > 0
            ? `未入力の項目があります：${missing
                .map((m) => m.label)
                .join("・")}（未入力のままでも次へ進めます）`
            : "必須項目はすべて入力できています。"}
        </p>
      </div>

      <FieldGroup
        title="基本情報"
        description="LPの見出しまわりに使われます。"
        contentClassName="grid gap-4 sm:grid-cols-2"
      >
        <LabeledInput
          label="店名・屋号"
          value={answers.shopName}
          onChange={(v) => editor.update("shopName", v)}
          hint="LP全体とブラウザのタブ名に使われます。"
        />
        <LabeledInput
          label="地域"
          value={answers.area}
          onChange={(v) => editor.update("area", v)}
          placeholder="例: 箱根・強羅"
          hint="「地域名＋業種」で検索されたときに見つかりやすくなります。"
        />
        <div className="sm:col-span-2">
          <LabeledInput
            label="キャッチコピー"
            value={answers.tagline}
            onChange={(v) => editor.update("tagline", v)}
            guideLength={30}
            hint="一番大きく表示される一文です。お店の魅力をひとことで。"
          />
        </div>
      </FieldGroup>

      <FieldGroup
        title="紹介文"
        description="お店の雰囲気やこだわりを2〜3文で伝えます。"
      >
        <LabeledTextarea
          label="紹介文"
          value={answers.intro}
          onChange={(v) => editor.update("intro", v)}
          rows={4}
          guideLength={120}
          hint="長すぎると読まれません。読み手が知りたいことを先に書きます。"
        />
      </FieldGroup>

      <FieldGroup
        title="特徴（3つ）"
        description="選ばれる理由を3つに絞って書きます。"
        contentClassName="grid gap-4 sm:grid-cols-3"
      >
        {answers.features.map((f, i) => (
          <fieldset key={i} className="space-y-3 rounded-md border p-3">
            <legend className="px-1 text-xs font-medium text-muted-foreground">
              特徴 {i + 1}
            </legend>
            <LabeledInput
              label="タイトル"
              value={f.title}
              onChange={(v) => editor.updateFeature(i as 0 | 1 | 2, { title: v })}
              guideLength={14}
            />
            <LabeledInput
              label="説明"
              value={f.desc}
              onChange={(v) => editor.updateFeature(i as 0 | 1 | 2, { desc: v })}
              guideLength={40}
            />
          </fieldset>
        ))}
      </FieldGroup>

      <FieldGroup
        title="料金プラン（3つ）"
        description="価格が分かるだけで、問い合わせのハードルは大きく下がります。"
        contentClassName="grid gap-4 sm:grid-cols-3"
      >
        {answers.plans.map((p, i) => (
          <fieldset key={i} className="space-y-3 rounded-md border p-3">
            <legend className="px-1 text-xs font-medium text-muted-foreground">
              プラン {i + 1}
            </legend>
            <LabeledInput
              label="プラン名"
              value={p.name}
              onChange={(v) => editor.updatePlan(i as 0 | 1 | 2, { name: v })}
            />
            <LabeledInput
              label="価格"
              value={p.price}
              onChange={(v) => editor.updatePlan(i as 0 | 1 | 2, { price: v })}
              placeholder="例: ¥18,000〜"
            />
            <LabeledInput
              label="説明"
              value={p.desc}
              onChange={(v) => editor.updatePlan(i as 0 | 1 | 2, { desc: v })}
            />
          </fieldset>
        ))}
      </FieldGroup>

      <FieldGroup
        title="お客様の声"
        description={`このテンプレートでは${slots}件まで掲載できます。`}
      >
        <Note className="text-amber-600 dark:text-amber-400">
          サンプルの声が入っています。実際にいただいた声に差し替えてから公開してください。
        </Note>
        {testimonialIndexes.map((i) => {
          const t = answers.testimonials[i];
          return (
            <fieldset key={i} className="space-y-3 rounded-md border p-3">
              <legend className="px-1 text-xs font-medium text-muted-foreground">
                お客様の声 {i + 1}
              </legend>
              <LabeledInput
                label="見出し"
                value={t.headline}
                onChange={(v) => editor.updateTestimonial(i, { headline: v })}
                guideLength={20}
              />
              <LabeledTextarea
                label="本文"
                value={t.body}
                onChange={(v) => editor.updateTestimonial(i, { body: v })}
                rows={3}
                guideLength={100}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <LabeledInput
                  label="お名前"
                  value={t.name}
                  onChange={(v) => editor.updateTestimonial(i, { name: v })}
                  placeholder="例: T・K 様"
                />
                <LabeledInput
                  label="補足（地域・利用シーンなど）"
                  value={t.meta}
                  onChange={(v) => editor.updateTestimonial(i, { meta: v })}
                  placeholder="例: 東京都 ・ 連泊にてご利用"
                />
              </div>
            </fieldset>
          );
        })}
      </FieldGroup>

      <FieldGroup
        title="写真"
        description="お店の実物が伝わる写真を最大3枚まで載せられます。"
      >
        <PhotoUploader
          photos={answers.photos}
          onChange={editor.updatePhotos}
        />
        <Note>
          写真はLPに直接埋め込まれます（外部サーバー不要）。
          共有URLには写真は含まれません（URLが長くなりすぎるため）。受け取った相手には写真なしのLPが表示されます。
        </Note>
      </FieldGroup>

      <FieldGroup
        title="連絡先とCTA"
        description="問い合わせ先と、一番押してほしいボタンの設定です。"
        contentClassName="grid gap-4 sm:grid-cols-2"
      >
        <LabeledInput
          label="電話番号"
          value={answers.phone}
          onChange={(v) => editor.update("phone", v)}
          placeholder="0460-00-0000"
        />
        <LabeledInput
          label="営業時間"
          value={answers.hours}
          onChange={(v) => editor.update("hours", v)}
          placeholder="例: 10:00〜19:00（水曜定休）"
        />
        <div className="sm:col-span-2">
          <LabeledInput
            label="住所"
            value={answers.address}
            onChange={(v) => editor.update("address", v)}
          />
        </div>
        <LabeledInput
          label="CTAボタンの文言"
          value={answers.ctaLabel}
          onChange={(v) => editor.update("ctaLabel", v)}
          guideLength={12}
          placeholder="例: ご予約はこちら"
        />
        <div className="sm:col-span-2">
          <LabeledInput
            label="CTAボタンのリンク先"
            value={answers.ctaHref}
            onChange={(v) => editor.update("ctaHref", v)}
            placeholder="tel:0460-00-0000"
            hint="電話は tel: 、メールは mailto: 、LINE や予約サイトは https: ではじめます。"
          />
        </div>
      </FieldGroup>

      <FieldGroup
        title="表示するセクション"
        description="不要なセクションはここで消せます（骨格となるナビ・ヒーロー・フッターは常に表示されます）。"
      >
        <SectionToggles
          template={template}
          hiddenSections={answers.hiddenSections}
          photoCount={answers.photos.length}
          onChange={(hidden) => editor.update("hiddenSections", hidden)}
        />
      </FieldGroup>

      <div className="flex flex-wrap justify-between gap-2">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-1.5 size-4" aria-hidden /> 業種選択に戻る
        </Button>
        <Button onClick={onNext}>
          プレビューへ <ArrowRight className="ml-1.5 size-4" aria-hidden />
        </Button>
      </div>
    </section>
  );
}
