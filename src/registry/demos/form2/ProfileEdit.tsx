import { useState } from "react";
import { Camera, User, AtSign, FileText, Save } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プロフィール編集",
  category: "フォーム",
  description: "アバター＋自己紹介の編集フォーム。文字数カウンター付き。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

export default function ProfileEdit() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [name, setName] = useState(en ? "Taro Yamada" : "山田 太郎");
  const [handle, setHandle] = useState("taro_yamada");
  const [bio, setBio] = useState(en ? "Product builder who loves design and coffee." : "デザインとコーヒーが好きなプロダクト開発者です。");
  const MAX = 160;

  const initials = name.trim().slice(0, 1) || "?";

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">{en ? "Edit profile" : "プロフィールを編集"}</h2>

      <div className="mb-6 flex items-center gap-4">
        <div className="group relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-2xl font-semibold text-white">
            {initials}
          </div>
          <button type="button" aria-label={en ? "Change photo" : "写真を変更"}
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white transition-transform hover:scale-110 dark:border-slate-900 dark:bg-white dark:text-slate-900">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{name || (en ? "Name" : "名前")}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">@{handle || "handle"}</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "Display name" : "表示名"}</span>
          <div className="group relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25 dark:border-slate-700 dark:text-white" />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "Username" : "ユーザー名"}</span>
          <div className="group relative">
            <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
            <input value={handle} onChange={(e) => setHandle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25 dark:border-slate-700 dark:text-white" />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> {en ? "Bio" : "自己紹介"}</span>
            <span className={bio.length > MAX ? "text-red-500" : "text-slate-400"}>{bio.length}/{MAX}</span>
          </span>
          <textarea value={bio} maxLength={MAX} rows={3} onChange={(e) => setBio(e.target.value)}
            className="w-full resize-none rounded-lg border border-slate-300 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25 dark:border-slate-700 dark:text-white" />
        </label>
      </div>

      <button type="button"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 active:scale-95">
        <Save className="h-4 w-4" /> {en ? "Save changes" : "変更を保存"}
      </button>
    </div>
  );
}
