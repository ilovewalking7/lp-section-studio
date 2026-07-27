/**
 * ミセテLP ウィザード（4ステップ）のオーケストレータ。
 * ① 業種選択 → ② 質問フォーム → ③ プレビュー → ④ 書き出し/共有。
 *
 * このファイルが持つのは「状態」と「ステップ遷移」だけで、各ステップの見た目は
 * ./steps/* に分割してある。ビルダーUI・生成LPはともに日本語固定のため、
 * document.documentElement.lang をマウント中 "ja" に固定し、アンマウントで復元する
 * （LangToggle の影響を受けないため）。
 */
import { useEffect, useState } from "react";
import { isPro } from "@/lib/plan";
import { LP_TEMPLATES } from "./templates";
import { buildLpDocument, downloadHtml } from "./export";
import {
  FREE_MONTHLY_EXPORT_LIMIT,
  SITE_URL,
  getMonthExports,
  incMonthExports,
  useLpPlan,
} from "./lpPlan";
import {
  clearDraft,
  decodeShare,
  deleteProject,
  encodeShare,
  listProjects,
  loadDraft,
  saveDraft,
  saveProject,
  type DraftSaveResult,
  type SavedProject,
  type ShareState,
} from "./share";
import type {
  Feature,
  IndustryTemplate,
  LpAnswers,
  PricePlan,
  Testimonial,
} from "./types";
import BuilderHeader, { type Step } from "./steps/BuilderHeader";
import IndustryStep from "./steps/IndustryStep";
import FormStep, { type AnswerEditor } from "./steps/FormStep";
import PreviewStep, { type Viewport } from "./steps/PreviewStep";
import ExportStep from "./steps/ExportStep";

// 不正な共有URLでプレビューが落ちてもアプリ全体を巻き込まないための境界。
// 実体は ./steps/PreviewStep（利用者は LpBuilder から取得できるよう再輸出する）。
export { PreviewErrorBoundary } from "./steps/PreviewStep";

/** 自動保存のデバウンス時間（ms）。入力のたびに書かず、手が止まってから保存する。 */
const DRAFT_DEBOUNCE_MS = 1500;

/** 自動保存の結果を、利用者向けの控えめな一文にする */
const DRAFT_MESSAGES: Record<DraftSaveResult, string> = {
  saved: "自動保存しました",
  "saved-without-photos": "写真は自動保存されません（容量のため）",
  failed: "自動保存できませんでした",
};

/** 完了・成功メッセージの表示時間（ms） */
const NOTICE_MS = 4000;

/** タプル型（features/plans/testimonials）の1要素だけを安全に更新するヘルパー */
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
  fromShare: boolean;
} {
  const shared = readShareHash();
  if (shared) {
    const found = LP_TEMPLATES.find((t) => t.id === shared.t);
    if (found) {
      return {
        templateId: found.id,
        answers: shared.a,
        step: 3,
        fromShare: true,
      };
    }
  }
  return {
    templateId: LP_TEMPLATES[0].id,
    answers: LP_TEMPLATES[0].defaults,
    step: 1,
    fromShare: false,
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
  const [projects, setProjects] = useState<SavedProject[]>(() => listProjects());
  const [downloading, setDownloading] = useState(false);
  const [copyingHtml, setCopyingHtml] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // 自動保存: 回答が変わってから DRAFT_DEBOUNCE_MS 後に1回だけ書き込む。
  // 起動直後（利用者が何も触っていない状態）では保存しない。
  const [dirty, setDirty] = useState(false);
  const [draftStatus, setDraftStatus] = useState<DraftSaveResult | null>(null);
  // 共有URLから開いたときは、保存ドラフトの再開を提示しない（見に来た内容を優先する）。
  const [pendingDraft, setPendingDraft] = useState<ShareState | null>(() =>
    initial.fromShare ? null : loadDraft()
  );

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

  useEffect(() => {
    if (!dirty) return;
    const timer = setTimeout(() => {
      setDraftStatus(saveDraft({ t: templateId, a: answers }));
    }, DRAFT_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [dirty, templateId, answers]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), NOTICE_MS);
    return () => clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!copiedShare) return;
    const timer = setTimeout(() => setCopiedShare(false), 2000);
    return () => clearTimeout(timer);
  }, [copiedShare]);

  const remainingExports = Math.max(
    0,
    FREE_MONTHLY_EXPORT_LIMIT - getMonthExports()
  );
  const exportBlocked = !pro && remainingExports <= 0;

  const selectTemplate = (t: IndustryTemplate) => {
    setTemplateId(t.id);
    setAnswers(t.defaults);
    setDirty(true);
    setStep(2);
  };

  /** 各ステップから呼ばれる回答の更新操作（変更のたびに自動保存の対象になる） */
  const editor: AnswerEditor = {
    update: (key, value) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
      setDirty(true);
    },
    updateFeature: (index: 0 | 1 | 2, patch: Partial<Feature>) => {
      setAnswers((prev) => ({
        ...prev,
        features: updateTuple3(prev.features, index, patch),
      }));
      setDirty(true);
    },
    updatePlan: (index: 0 | 1 | 2, patch: Partial<PricePlan>) => {
      setAnswers((prev) => ({
        ...prev,
        plans: updateTuple3(prev.plans, index, patch),
      }));
      setDirty(true);
    },
    updateTestimonial: (index: 0 | 1 | 2, patch: Partial<Testimonial>) => {
      setAnswers((prev) => ({
        ...prev,
        testimonials: updateTuple3(prev.testimonials, index, patch),
      }));
      setDirty(true);
    },
  };

  const handleDownload = async () => {
    if (exportBlocked || downloading) return;
    setExportError(null);
    setDownloading(true);
    try {
      const html = await buildLpDocument(template, answers, { pro });
      downloadHtml(`${answers.shopName || "lp"}-lp.html`, html);
      if (!pro) incMonthExports();
      setNotice("HTMLをダウンロードしました");
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
      setNotice("HTMLをコピーしました");
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
      setNotice("共有URLをコピーしました");
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
    setNotice("プロジェクトを保存しました");
  };

  const handleLoadProject = (p: SavedProject) => {
    const found = LP_TEMPLATES.find((t) => t.id === p.state.t);
    if (!found) return;
    setTemplateId(found.id);
    setAnswers(p.state.a);
    setProjectName(p.name);
    setPendingDraft(null);
    setStep(3);
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id);
    setProjects(listProjects());
  };

  /** 自動保存されたドラフトから再開する（利用者が明示的に選んだときだけ） */
  const handleResumeDraft = () => {
    if (!pendingDraft) return;
    const found = LP_TEMPLATES.find((t) => t.id === pendingDraft.t);
    if (!found) {
      setPendingDraft(null);
      return;
    }
    setTemplateId(found.id);
    setAnswers(pendingDraft.a);
    setPendingDraft(null);
    setStep(2);
  };

  /** ドラフトを捨てて新規に始める */
  const handleDiscardDraft = () => {
    clearDraft();
    setPendingDraft(null);
    setDraftStatus(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BuilderHeader
        step={step}
        onGoTo={setStep}
        onHome={onHome}
        title={projectName || answers.shopName}
        draftMessage={draftStatus ? DRAFT_MESSAGES[draftStatus] : ""}
      />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {step === 1 && (
          <IndustryStep
            draft={pendingDraft}
            onResumeDraft={handleResumeDraft}
            onDiscardDraft={handleDiscardDraft}
            projects={projects}
            onLoadProject={handleLoadProject}
            onSelect={selectTemplate}
          />
        )}
        {step === 2 && (
          <FormStep
            template={template}
            answers={answers}
            editor={editor}
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
            template={template}
            answers={answers}
            status={{
              plan,
              pro,
              remainingExports,
              exportBlocked,
              downloading,
              copyingHtml,
              copiedShare,
              notice,
              error: exportError,
            }}
            projectPanel={{ projects, projectName, saveError }}
            actions={{
              onProjectNameChange: setProjectName,
              onDownload: () => {
                void handleDownload();
              },
              onCopyHtml: () => {
                void handleCopyHtml();
              },
              onCopyShareUrl: () => {
                void handleCopyShareUrl();
              },
              onSaveProject: handleSaveProject,
              onLoadProject: handleLoadProject,
              onDeleteProject: handleDeleteProject,
              onSetPlan: setPlan,
              onPricing,
              onBack: () => setStep(3),
            }}
          />
        )}
      </main>
    </div>
  );
}
