/**
 * ミセテLP ウィザードUI（4ステップ）。
 * ① 業種選択 → ② 質問フォーム → ③ プレビュー → ④ 書き出し/共有。
 * ビルダーUI・生成LPはともに日本語固定。document.documentElement.lang を
 * マウント中 "ja" に固定し、アンマウントで復元する（LangToggle の影響を受けないため）。
 */
import { Component, useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  FolderOpen,
  Leaf,
  Loader2,
  Lock,
  Monitor,
  Save,
  Share2,
  Smartphone,
  Sparkles,
  Stethoscope,
  Tablet,
  Trash2,
  Waves,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isPro, type PlanId } from "@/lib/plan";
import { LP_TEMPLATES } from "./templates";
import { buildLpDocument, downloadHtml } from "./export";
import {
  FREE_MONTHLY_EXPORT_LIMIT,
  LP_PLANS,
  SITE_URL,
  getMonthExports,
  getStripeLink,
  incMonthExports,
  useLpPlan,
} from "./lpPlan";
import {
  decodeShare,
  deleteProject,
  encodeShare,
  listProjects,
  saveProject,
  type SavedProject,
  type ShareState,
} from "./share";
import type { Feature, IndustryTemplate, LpAnswers, PricePlan } from "./types";
import LpPreview from "./LpPreview";

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS: Record<Step, string> = {
  1: "業種選択",
  2: "内容入力",
  3: "プレビュー",
  4: "書き出し",
};

/** 業種テンプレの雰囲気を伝えるアイコン・配色チップ（テーマ系のため明示色でOK） */
const TEMPLATE_STYLE: Record<
  string,
  { icon: typeof Waves; chips: string[] }
> = {
  ryokan: {
    icon: Waves,
    chips: ["bg-stone-800", "bg-amber-700", "bg-red-900"],
  },
  salon: {
    icon: Leaf,
    chips: ["bg-emerald-600", "bg-lime-200", "bg-stone-100"],
  },
  clinic: {
    icon: Stethoscope,
    chips: ["bg-slate-900", "bg-white", "bg-slate-300"],
  },
};

type Viewport = "mobile" | "tablet" | "desktop";

const VIEWPORTS: Record<
  Viewport,
  { label: string; width: string; icon: typeof Monitor }
> = {
  mobile: { label: "モバイル", width: "375px", icon: Smartphone },
  tablet: { label: "タブレット", width: "768px", icon: Tablet },
  desktop: { label: "PC", width: "100%", icon: Monitor },
};

/** タプル型（features/plans）の1要素だけを安全に更新するヘルパー */
function updateTuple3<T>(
  tuple: [T, T, T],
  index: 0 | 1 | 2,
  patch: Partial<T>
): [T, T, T] {
  const next = [...tuple] as [T, T, T];
  next[index] = { ...next[index], ...patch };
  return next;
}

/** 共有ハッシュ（#c=...）をパースする。無い・壊れている場合は null。 */
function readShareHash(): ShareState | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  if (!hash.startsWith("#c=")) return null;
  return decodeShare(hash.slice(3));
}

/** 起動時の初期状態を1回だけ解決する（共有URLがあれば復元してプレビューへ）。 */
function resolveInitialState(): {
  templateId: string;
  answers: LpAnswers;
  step: Step;
} {
  const shared = readShareHash();
  if (shared) {
    const found = LP_TEMPLATES.find((t) => t.id === shared.t);
    if (found) {
      return { templateId: found.id, answers: shared.a, step: 3 };
    }
  }
  return {
    templateId: LP_TEMPLATES[0].id,
    answers: LP_TEMPLATES[0].defaults,
    step: 1,
  };
}

interface LpBuilderProps {
  onHome: () => void;
  onPricing?: () => void;
}

export default function LpBuilder({ onHome, onPricing }: LpBuilderProps) {
  // プラン状態はミセテLP専用の useLpPlan()（src/lp/lpPlan.ts, localStorage "lp:plan"）を
  // 内部で直接使う。Studio 側の usePlan()（src/lib/plan.ts, "cs:plan"）とはキーが独立した
  // 別サービスの状態のため混線しない。
  const { plan, setPlan } = useLpPlan();
  const pro = isPro(plan);

  const [initial] = useState(resolveInitialState);
  const [step, setStep] = useState<Step>(initial.step);
  const [templateId, setTemplateId] = useState<string>(initial.templateId);
  const [answers, setAnswers] = useState<LpAnswers>(initial.answers);
  const [projectName, setProjectName] = useState("");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [projects, setProjects] = useState<SavedProject[]>(() =>
    listProjects()
  );
  const [downloading, setDownloading] = useState(false);
  const [copyingHtml, setCopyingHtml] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const template: IndustryTemplate =
    LP_TEMPLATES.find((t) => t.id === templateId) ?? LP_TEMPLATES[0];

  // ビルダーUI・生成LPは日本語固定。マウント中 lang="ja" を固定し、離脱時に復元する。
  useEffect(() => {
    const prevLang = document.documentElement.lang;
    document.documentElement.lang = "ja";
    return () => {
      document.documentElement.lang = prevLang;
    };
  }, []);

  const remainingExports = Math.max(
    0,
    FREE_MONTHLY_EXPORT_LIMIT - getMonthExports()
  );
  const exportBlocked = !pro && remainingExports <= 0;

  const selectTemplate = (t: IndustryTemplate) => {
    setTemplateId(t.id);
    setAnswers(t.defaults);
    setStep(2);
  };

  const updateAnswer = <K extends keyof LpAnswers>(
    key: K,
    value: LpAnswers[K]
  ) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };
  const updateFeature = (index: 0 | 1 | 2, patch: Partial<Feature>) => {
    setAnswers((prev) => ({
      ...prev,
      features: updateTuple3(prev.features, index, patch),
    }));
  };
  const updatePlan = (index: 0 | 1 | 2, patch: Partial<PricePlan>) => {
    setAnswers((prev) => ({
      ...prev,
      plans: updateTuple3(prev.plans, index, patch),
    }));
  };

  const handleDownload = async () => {
    if (exportBlocked || downloading) return;
    setExportError(null);
    setDownloading(true);
    try {
      const html = await buildLpDocument(template, answers, { pro });
      downloadHtml(`${answers.shopName || "lp"}-lp.html`, html);
      if (!pro) incMonthExports();
    } catch (e) {
      setExportError(e instanceof Error ? e.message : "書き出しに失敗しました");
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyHtml = async () => {
    setExportError(null);
    setCopyingHtml(true);
    try {
      const html = await buildLpDocument(template, answers, { pro });
      await navigator.clipboard.writeText(html);
    } catch (e) {
      setExportError(e instanceof Error ? e.message : "コピーに失敗しました");
    } finally {
      setCopyingHtml(false);
    }
  };

  const handleCopyShareUrl = async () => {
    const encoded = encodeShare({ t: template.id, a: answers });
    const origin =
      typeof window !== "undefined" ? window.location.origin : SITE_URL;
    const url = `${origin}/lp#c=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedShare(true);
      window.setTimeout(() => setCopiedShare(false), 2000);
    } catch {
      /* クリップボード不可の環境では無視 */
    }
  };

  const handleSaveProject = () => {
    const name = projectName.trim() || answers.shopName || "無題のLP";
    const ok = saveProject(name, { t: template.id, a: answers });
    if (!ok) {
      setSaveError("プロジェクトの保存に失敗しました");
      return;
    }
    setSaveError(null);
    setProjects(listProjects());
    setProjectName(name);
  };

  const handleLoadProject = (p: SavedProject) => {
    const found = LP_TEMPLATES.find((t) => t.id === p.state.t);
    if (!found) return;
    setTemplateId(found.id);
    setAnswers(p.state.a);
    setProjectName(p.name);
    setStep(3);
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id);
    setProjects(listProjects());
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onHome}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1.5 size-4" />
            戻る
          </Button>

          <ol className="flex items-center gap-1.5 text-xs sm:text-sm">
            {([1, 2, 3, 4] as Step[]).map((s) => (
              <li
                key={s}
                className="flex items-center gap-1.5"
                aria-current={s === step ? "step" : undefined}
              >
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full border text-xs font-medium",
                    s === step
                      ? "border-primary bg-primary text-primary-foreground"
                      : s < step
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border text-muted-foreground"
                  )}
                >
                  {s < step ? <Check className="size-3.5" /> : s}
                </span>
                <span
                  className={cn(
                    "hidden sm:inline",
                    s === step
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {STEP_LABELS[s]}
                </span>
                {s < 4 && (
                  <span
                    className="mx-1 h-px w-3 bg-border sm:w-6"
                    aria-hidden
                  />
                )}
              </li>
            ))}
          </ol>

          <div
            className="max-w-[9rem] truncate text-right text-sm font-medium text-muted-foreground sm:max-w-xs"
            title={projectName || answers.shopName}
          >
            {projectName || answers.shopName || "ミセテLP"}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {step === 1 && <IndustryStep onSelect={selectTemplate} />}
        {step === 2 && (
          <FormStep
            answers={answers}
            onUpdateAnswer={updateAnswer}
            onUpdateFeature={updateFeature}
            onUpdatePlan={updatePlan}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <PreviewStep
            template={template}
            answers={answers}
            viewport={viewport}
            onViewport={setViewport}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <ExportStep
            plan={plan}
            pro={pro}
            template={template}
            answers={answers}
            remainingExports={remainingExports}
            exportBlocked={exportBlocked}
            downloading={downloading}
            copyingHtml={copyingHtml}
            copiedShare={copiedShare}
            exportError={exportError}
            saveError={saveError}
            projects={projects}
            projectName={projectName}
            onProjectNameChange={setProjectName}
            onDownload={handleDownload}
            onCopyHtml={handleCopyHtml}
            onCopyShareUrl={handleCopyShareUrl}
            onSaveProject={handleSaveProject}
            onLoadProject={handleLoadProject}
            onDeleteProject={handleDeleteProject}
            onSetPlan={setPlan}
            onPricing={onPricing}
            onBack={() => setStep(3)}
          />
        )}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ステップ1: 業種選択                                                  */
/* ------------------------------------------------------------------ */

function IndustryStep({
  onSelect,
}: {
  onSelect: (t: IndustryTemplate) => void;
}) {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          業種を選んでください
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          業種に合わせたデザインテンプレートで、質の高いLPをすぐに作成できます。
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {LP_TEMPLATES.map((t) => {
          const style = TEMPLATE_STYLE[t.id];
          const Icon = style?.icon ?? Sparkles;
          return (
            <Card
              key={t.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(t)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(t);
                }
              }}
              className="cursor-pointer transition-shadow hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex gap-1" aria-hidden>
                    {(style?.chips ?? []).map((c, i) => (
                      <span
                        key={i}
                        className={cn(
                          "size-3.5 rounded-full border border-black/10",
                          c
                        )}
                      />
                    ))}
                  </div>
                </div>
                <CardTitle>{t.name}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ステップ2: 質問フォーム                                              */
/* ------------------------------------------------------------------ */

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
    </label>
  );
}

function FormStep({
  answers,
  onUpdateAnswer,
  onUpdateFeature,
  onUpdatePlan,
  onBack,
  onNext,
}: {
  answers: LpAnswers;
  onUpdateAnswer: <K extends keyof LpAnswers>(
    key: K,
    value: LpAnswers[K]
  ) => void;
  onUpdateFeature: (index: 0 | 1 | 2, patch: Partial<Feature>) => void;
  onUpdatePlan: (index: 0 | 1 | 2, patch: Partial<PricePlan>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          LPの内容を入力してください
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          あらかじめ業種にあわせたサンプル文言が入っています。そのまま使っても、書き換えてもOKです。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">基本情報</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <LabeledInput
            label="店名・屋号"
            value={answers.shopName}
            onChange={(v) => onUpdateAnswer("shopName", v)}
          />
          <LabeledInput
            label="地域"
            value={answers.area}
            onChange={(v) => onUpdateAnswer("area", v)}
            placeholder="例: 箱根・強羅"
          />
          <div className="sm:col-span-2">
            <LabeledInput
              label="キャッチコピー"
              value={answers.tagline}
              onChange={(v) => onUpdateAnswer("tagline", v)}
            />
          </div>
          <div className="sm:col-span-2">
            <LabeledTextarea
              label="紹介文"
              value={answers.intro}
              onChange={(v) => onUpdateAnswer("intro", v)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">特徴（3つ）</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          {answers.features.map((f, i) => (
            <div key={i} className="space-y-3 rounded-md border p-3">
              <p className="text-xs font-medium text-muted-foreground">
                特徴 {i + 1}
              </p>
              <LabeledInput
                label="タイトル"
                value={f.title}
                onChange={(v) =>
                  onUpdateFeature(i as 0 | 1 | 2, { title: v })
                }
              />
              <LabeledInput
                label="説明"
                value={f.desc}
                onChange={(v) => onUpdateFeature(i as 0 | 1 | 2, { desc: v })}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">料金プラン（3つ）</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          {answers.plans.map((p, i) => (
            <div key={i} className="space-y-3 rounded-md border p-3">
              <p className="text-xs font-medium text-muted-foreground">
                プラン {i + 1}
              </p>
              <LabeledInput
                label="プラン名"
                value={p.name}
                onChange={(v) => onUpdatePlan(i as 0 | 1 | 2, { name: v })}
              />
              <LabeledInput
                label="価格"
                value={p.price}
                onChange={(v) => onUpdatePlan(i as 0 | 1 | 2, { price: v })}
              />
              <LabeledInput
                label="説明"
                value={p.desc}
                onChange={(v) => onUpdatePlan(i as 0 | 1 | 2, { desc: v })}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">連絡先・予約導線</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <LabeledInput
            label="電話番号"
            value={answers.phone}
            onChange={(v) => onUpdateAnswer("phone", v)}
          />
          <LabeledInput
            label="住所"
            value={answers.address}
            onChange={(v) => onUpdateAnswer("address", v)}
          />
          <LabeledInput
            label="営業時間"
            value={answers.hours}
            onChange={(v) => onUpdateAnswer("hours", v)}
          />
          <LabeledInput
            label="CTAボタンの文言"
            value={answers.ctaLabel}
            onChange={(v) => onUpdateAnswer("ctaLabel", v)}
          />
          <div className="sm:col-span-2">
            <LabeledInput
              label="CTAボタンのリンク先"
              value={answers.ctaHref}
              onChange={(v) => onUpdateAnswer("ctaHref", v)}
              placeholder="tel:0460-00-0000"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-1.5 size-4" /> 業種選択に戻る
        </Button>
        <Button onClick={onNext}>
          プレビューへ <ArrowRight className="ml-1.5 size-4" />
        </Button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ステップ3: プレビュー                                                */
/* ------------------------------------------------------------------ */

interface PreviewErrorBoundaryProps {
  onReset: () => void;
  children: ReactNode;
}
interface PreviewErrorBoundaryState {
  hasError: boolean;
}

/**
 * プレビュー描画（LpPreview）専用の保険。共有URL・保存済みプロジェクトはいずれも
 * localStorage/URLという「アプリの外」から来るデータのため、decodeShare の深い形状
 * 検証をすり抜けたり保存後にスキーマが変わったりした場合、プレビュー配下が予期せぬ
 * 例外を投げる可能性がある。componentDidCatch で捕まえてアプリ全体を巻き込まず、
 * 「入力に戻る」導線だけを提示するフォールバックに留める。
 */
export class PreviewErrorBoundary extends Component<
  PreviewErrorBoundaryProps,
  PreviewErrorBoundaryState
> {
  state: PreviewErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): PreviewErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    console.error("プレビューの描画に失敗しました:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="space-y-4 rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-center">
          <p className="text-sm text-destructive">
            プレビューの表示に失敗しました。入力に戻ってやり直してください。
          </p>
          <Button variant="outline" onClick={this.props.onReset}>
            入力に戻る
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

function PreviewStep({
  template,
  answers,
  viewport,
  onViewport,
  onBack,
  onNext,
}: {
  template: IndustryTemplate;
  answers: LpAnswers;
  viewport: Viewport;
  onViewport: (v: Viewport) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">プレビュー</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {template.name}
            テンプレートで、入力内容を反映した見た目を確認できます。
          </p>
        </div>
        <div className="flex rounded-md border p-0.5">
          {(Object.keys(VIEWPORTS) as Viewport[]).map((v) => {
            const Icon = VIEWPORTS[v].icon;
            return (
              <Button
                key={v}
                size="icon"
                variant={viewport === v ? "secondary" : "ghost"}
                className="size-8"
                aria-label={VIEWPORTS[v].label}
                onClick={() => onViewport(v)}
              >
                <Icon />
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center overflow-x-auto rounded-lg border bg-muted/30 p-4">
        <div
          className="w-full transition-[max-width] duration-300"
          style={{ maxWidth: VIEWPORTS[viewport].width }}
        >
          <div className="overflow-hidden rounded-md border bg-background shadow-sm">
            <PreviewErrorBoundary onReset={onBack}>
              <LpPreview template={template} answers={answers} />
            </PreviewErrorBoundary>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-1.5 size-4" /> 内容を編集
        </Button>
        <Button onClick={onNext}>
          書き出し・共有へ <ArrowRight className="ml-1.5 size-4" />
        </Button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ステップ4: 書き出し・共有                                            */
/* ------------------------------------------------------------------ */

function ExportStep({
  plan,
  pro,
  template,
  answers,
  remainingExports,
  exportBlocked,
  downloading,
  copyingHtml,
  copiedShare,
  exportError,
  saveError,
  projects,
  projectName,
  onProjectNameChange,
  onDownload,
  onCopyHtml,
  onCopyShareUrl,
  onSaveProject,
  onLoadProject,
  onDeleteProject,
  onSetPlan,
  onPricing,
  onBack,
}: {
  plan: PlanId;
  pro: boolean;
  template: IndustryTemplate;
  answers: LpAnswers;
  remainingExports: number;
  exportBlocked: boolean;
  downloading: boolean;
  copyingHtml: boolean;
  copiedShare: boolean;
  exportError: string | null;
  saveError: string | null;
  projects: SavedProject[];
  projectName: string;
  onProjectNameChange: (v: string) => void;
  onDownload: () => void;
  onCopyHtml: () => void;
  onCopyShareUrl: () => void;
  onSaveProject: () => void;
  onLoadProject: (p: SavedProject) => void;
  onDeleteProject: (id: string) => void;
  onSetPlan: (p: PlanId) => void;
  onPricing?: () => void;
  onBack: () => void;
}) {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">書き出し・共有</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          完成したLPをHTMLとして持ち帰るか、共有URLで誰にでも見せられます。
        </p>
      </div>

      <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
        書き出し対象:{" "}
        <span className="font-medium text-foreground">{template.name}</span>{" "}
        ／ {answers.shopName}
      </div>

      {exportError && (
        <p className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          {exportError}
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">HTML書き出し</CardTitle>
          <CardDescription>
            {pro
              ? "Pro/Studio プランは書き出し無制限・バッジなし・OGP付きです。"
              : "Freeプランでは書き出しHTMLにMade withバッジが入ります。"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!pro && (
            <div
              className={cn(
                "flex flex-wrap items-center gap-2 rounded-md border p-2.5 text-xs",
                exportBlocked
                  ? "border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-400"
                  : "border-border bg-muted/30 text-muted-foreground"
              )}
            >
              <Lock className="size-3.5 shrink-0" />
              {exportBlocked ? (
                <span>
                  今月の書き出し上限（{FREE_MONTHLY_EXPORT_LIMIT}回）に達しました。
                </span>
              ) : (
                <span>
                  Freeプラン：今月の書き出しは残り <b>{remainingExports}</b> /{" "}
                  {FREE_MONTHLY_EXPORT_LIMIT} 回
                </span>
              )}
              {exportBlocked && onPricing && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-auto h-7 gap-1 text-amber-600 hover:text-amber-700 dark:text-amber-400"
                  onClick={onPricing}
                >
                  <Sparkles className="size-3.5" /> Proにアップグレード
                </Button>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <Button onClick={onDownload} disabled={exportBlocked || downloading}>
              {downloading ? (
                <Loader2 className="mr-1.5 size-4 animate-spin" />
              ) : (
                <Download className="mr-1.5 size-4" />
              )}
              HTMLをダウンロード
            </Button>
            <Button variant="outline" onClick={onCopyHtml} disabled={copyingHtml}>
              {copyingHtml ? (
                <Loader2 className="mr-1.5 size-4 animate-spin" />
              ) : (
                <Copy className="mr-1.5 size-4" />
              )}
              HTMLをコピー
            </Button>
            <Button variant="outline" onClick={onCopyShareUrl}>
              {copiedShare ? (
                <CheckCircle2 className="mr-1.5 size-4 text-emerald-500" />
              ) : (
                <Share2 className="mr-1.5 size-4" />
              )}
              {copiedShare ? "コピーしました" : "共有URLをコピー"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            共有URLは無料・無制限です。書き出し回数にはカウントされません。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">プロジェクト保存</CardTitle>
          <CardDescription>
            複数のLPを保存して、あとで読み込んで編集し直せます。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {saveError && (
            <p className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
              {saveError}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <Input
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              placeholder="プロジェクト名"
              className="max-w-xs"
            />
            <Button variant="outline" onClick={onSaveProject}>
              <Save className="mr-1.5 size-4" /> 保存
            </Button>
          </div>
          {projects.length > 0 && (
            <ul className="divide-y rounded-md border">
              {projects.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-2 px-3 py-2 text-sm"
                >
                  <span className="truncate">{p.name}</span>
                  <span className="flex shrink-0 gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onLoadProject(p)}
                    >
                      <FolderOpen className="mr-1 size-3.5" /> 読込
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDeleteProject(p.id)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">料金プラン</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {LP_PLANS.map((tier) => {
              const isCurrent = plan === tier.id;
              const link = tier.id === "free" ? null : getStripeLink(tier.id);
              return (
                <Card
                  key={tier.id}
                  className={cn(
                    "flex flex-col",
                    isCurrent && "border-primary ring-1 ring-primary"
                  )}
                >
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <p className="text-2xl font-bold text-foreground">
                      {tier.priceLabel}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-1.5 text-sm">
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-1.5 text-muted-foreground"
                        >
                          <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex-col items-stretch gap-1.5">
                    {isCurrent ? (
                      <Button disabled variant="secondary" className="w-full">
                        現在のプラン
                      </Button>
                    ) : link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({}), "w-full")}
                      >
                        <ExternalLink className="mr-1.5 size-4" /> アップグレード
                      </a>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => onSetPlan(tier.id)}
                        >
                          デモモードで{tier.name}を試す
                        </Button>
                        <p className="text-center text-[11px] text-muted-foreground">
                          ※ 現在は決済未接続のデモです。
                        </p>
                      </>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </section>

      <div className="flex justify-start">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-1.5 size-4" /> プレビューに戻る
        </Button>
      </div>
    </section>
  );
}
