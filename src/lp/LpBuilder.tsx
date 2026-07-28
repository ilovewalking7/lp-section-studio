/**
 * ミセテLP ウィザード（4ステップ）のオーケストレータ。
 * ① 業種選択 → ② 質問フォーム → ③ プレビュー → ④ 書き出し/共有。
 *
 * このファイルが持つのは「状態」と「ステップ遷移」だけで、各ステップの見た目は
 * ./steps/* に分割してある。ビルダーUI・生成LPはともに日本語固定のため、
 * document.documentElement.lang をマウント中 "ja" に固定し、アンマウントで復元する
 * （LangToggle の影響を受けないため）。
 */
import { useEffect, useRef, useState } from "react";
import { LP_TEMPLATES } from "./templates";
import { buildLpDocument, downloadHtml } from "./export";
import {
  FREE_MONTHLY_EXPORT_LIMIT,
  SITE_URL,
  getMonthExports,
  incMonthExports,
  isLpPro,
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
  type DraftScope,
  type SavedProject,
  type ShareState,
} from "./share";
import type {
  Feature,
  IndustryTemplate,
  LpAnswers,
  LpPhoto,
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
}

export default function LpBuilder({ onHome }: LpBuilderProps) {
  // プラン状態はミセテLP専用の useLpPlan()（src/lp/lpPlan.ts, localStorage "lp:plan"）を
  // 内部で直接使う。Studio 側の usePlan()（src/lib/plan.ts, "cs:plan"）とはキーが独立した
  // 別サービスの状態のため混線しない。
  const { plan, setPlan } = useLpPlan();
  const pro = isLpPro(plan);

  const [initial] = useState(resolveInitialState);
  const [step, setStep] = useState<Step>(initial.step);
  const mainRef = useRef<HTMLElement>(null);
  const [templateId, setTemplateId] = useState<string>(initial.templateId);
  const [answers, setAnswers] = useState<LpAnswers>(initial.answers);
  // 別の業種テンプレへの切り替え待ち（入力済みのときだけ確認を挟むための保留先）
  const [pendingTemplate, setPendingTemplate] =
    useState<IndustryTemplate | null>(null);
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

  /*
   * 共有URL（#c=…）から開いたセッションの自動保存先を分ける理由:
   * 共有された内容は「他人の作業」であり、自分のドラフトと同じキーに書くと
   * 開いて1文字触っただけで自分の続きが復元不能に失われる。
   * 対処の候補は「初回編集時に上書き可否を確認する」もあったが、
   *  - 確認を出す時点で利用者は編集の途中であり、判断材料（消える内容）が手元にない
   *  - どちらを選んでも片方は失われる／操作が1つ増える
   * のに対し、キーを分ければ両方とも無傷で残り、確認そのものが不要になるため
   * 「保存先を分ける」方式を採った。共有セッションの編集内容も misete:draft:shared に
   * 残るので、閉じても捨てられない。
   */
  const draftScope: DraftScope = initial.fromShare ? "shared" : "own";

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

  /*
   * ステップが変わったらページ先頭へ戻し、その画面の見出しへフォーカスを移す。
   * プレビューは縦に数千pxあり、下端で「書き出しへ」を押すとスクロール位置が
   * 保持されたまま書き出し画面の最下部に着地して、主役の「HTMLをダウンロード」が
   * 画面外に隠れてしまう。App の window.scrollTo はルート変更時にしか発火せず、
   * ステップ変更（同一ルート内）では効かないため、ここで面倒を見る。
   * 見出しへのフォーカス移動は、キーボード・スクリーンリーダー利用者へ
   * 「画面が切り替わった」ことを伝える役割も兼ねる（各見出しは tabIndex={-1}）。
   * 初回マウントだけは対象外にする。利用者の操作なしにフォーカスを奪う挙動になり、
   * かつ先頭へのスクロールはルート遷移時に App 側が済ませているため。
   */
  const stepChanged = useRef(false);
  useEffect(() => {
    if (!stepChanged.current) {
      stepChanged.current = true;
      return;
    }
    window.scrollTo(0, 0);
    mainRef.current?.querySelector("h1")?.focus();
  }, [step]);

  useEffect(() => {
    if (!dirty) return;
    const timer = setTimeout(() => {
      setDraftStatus(saveDraft({ t: templateId, a: answers }, draftScope));
    }, DRAFT_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [dirty, templateId, answers, draftScope]);

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

  /**
   * 失われる入力があるか。テンプレ適用時は t.defaults の参照をそのまま state に入れる
   * ため、参照が別物であれば「利用者が編集した」「ドラフト・共有URL・保存済みプロジェクト
   * を読み込んだ」のいずれかで、切り替えると消える中身があることを意味する。
   */
  const hasUserContent = answers !== template.defaults;

  /** 業種テンプレを実際に適用する。写真は業種に依存しない資産なので引き継ぐ。 */
  const applyTemplate = (t: IndustryTemplate) => {
    setTemplateId(t.id);
    setAnswers(
      answers.photos.length > 0
        ? { ...t.defaults, photos: answers.photos }
        : t.defaults
    );
    setPendingTemplate(null);
    setDirty(true);
    setStep(2);
  };

  /**
   * 業種カードが押されたときの分岐。
   * ヘッダーから①に戻って押し直すのは「入力の続き」か「業種の変更」のどちらかで、
   * 前者で入力を消してはいけない（30分の入力が確認なく消える事故になる）。
   * - 同じ業種を選び直しただけ → 何も捨てずステップ2へ進むだけ
   * - 別の業種へ切り替え & 入力済み → 確認を挟む（既定値のままなら黙って切り替える）
   */
  const selectTemplate = (t: IndustryTemplate) => {
    if (t.id === templateId) {
      setPendingTemplate(null);
      setStep(2);
      return;
    }
    if (hasUserContent) {
      setPendingTemplate(t);
      return;
    }
    applyTemplate(t);
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
    // 写真の取り込みは圧縮（await）をまたぐため、呼び出し側から渡された更新関数を
    // そのまま setAnswers の中で適用する（開始時点の配列で上書きしない）。
    updatePhotos: (update: (prev: LpPhoto[]) => LpPhoto[]) => {
      setAnswers((prev) => ({ ...prev, photos: update(prev.photos) }));
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

  // HTMLのコピーはダウンロードと同一の成果物を渡す操作のため、ダウンロードと
  // まったく同じ上限判定・回数消費を通す（片方だけ素通しでは唯一の収益ゲートが無効になる）。
  const handleCopyHtml = async () => {
    if (exportBlocked || copyingHtml) return;
    setExportError(null);
    setCopyingHtml(true);
    try {
      const html = await buildLpDocument(template, answers, { pro });
      await navigator.clipboard.writeText(html);
      if (!pro) incMonthExports();
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
    setPendingTemplate(null);
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
    setPendingTemplate(null);
    setStep(2);
  };

  /** ドラフトを捨てて新規に始める */
  const handleDiscardDraft = () => {
    clearDraft(draftScope);
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

      <main ref={mainRef} className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {step === 1 && (
          <IndustryStep
            draft={pendingDraft}
            onResumeDraft={handleResumeDraft}
            onDiscardDraft={handleDiscardDraft}
            projects={projects}
            onLoadProject={handleLoadProject}
            onSelect={selectTemplate}
            pendingTemplate={pendingTemplate}
            onConfirmTemplate={() => {
              if (pendingTemplate) applyTemplate(pendingTemplate);
            }}
            onCancelTemplate={() => setPendingTemplate(null)}
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
              onBack: () => setStep(3),
            }}
          />
        )}
      </main>
    </div>
  );
}
