import type { DemoMeta } from "@/registry";
import { Github } from "lucide-react";

export const meta: DemoMeta = {
  name: "GitHubで続行",
  category: "ボタン",
  description: "ダークなGitHubブランドカラーのソーシャルログインボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function SocialGitHub() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-8">
      <button
        type="button"
        className="inline-flex w-64 items-center justify-center gap-3 rounded-xl bg-[#24292f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-200 hover:bg-[#32383f] active:scale-[0.98]"
      >
        <Github className="size-5" />
        {en ? "Continue with GitHub" : "GitHubで続行"}
      </button>
    </div>
  );
}
