import { MapPin, Settings, UserPlus } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・プロフィール",
  category: "グラスモーフィズム",
  description: "ネオン調の背景に映える、フロステッドガラスのプロフィールカード。",
  align: "center",
  isNew: true,
  tags: ["glass", "frosted", "profile"],
};

const stats = [
  { id: "posts", labelJa: "投稿", labelEn: "Posts", value: "1,284" },
  { id: "followers", labelJa: "フォロワー", labelEn: "Followers", value: "48.2K" },
  { id: "following", labelJa: "フォロー中", labelEn: "Following", value: "312" },
];

export default function GlassProfile() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative isolate flex w-full max-w-xl items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-14 -top-12 size-72 rounded-full bg-violet-400/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-10 size-80 rounded-full bg-amber-300/40 blur-3xl"
      />

      <div className="relative w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-7 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full border-2 border-white/40 bg-gradient-to-br from-pink-400 to-violet-500 text-3xl font-bold text-white shadow-lg">
          {en ? "H" : "綾"}
        </div>

        <h3 className="mt-4 text-xl font-semibold text-white">
          {en ? "Hikari Ayase" : "綾瀬 ひかり"}
        </h3>
        <p className="text-sm text-white/75">@hikari_design</p>
        <p className="mt-1 inline-flex items-center gap-1 text-xs text-white/70">
          <MapPin className="size-3.5" />
          {en ? "Tokyo, Japan" : "東京, 日本"}
        </p>

        <div className="mt-6 flex justify-center divide-x divide-white/15 rounded-xl border border-white/15 bg-white/5 py-3 backdrop-blur">
          {stats.map((s) => (
            <div key={s.id} className="flex-1 px-2">
              <div className="text-base font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/65">{en ? s.labelEn : s.labelJa}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-purple-700 shadow transition hover:bg-white/90">
            <UserPlus className="size-4" />
            {en ? "Follow" : "フォロー"}
          </button>
          <button
            aria-label={en ? "Settings" : "設定"}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <Settings className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
