import { useState } from "react";
import { MapPin, MessageCircle, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフトプロフィール",
  category: "ニューモーフィズム",
  description: "押し出し円のアバターを中心にした、柔らかなプロフィールカード。",
  align: "center",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "profile"],
};

const RAISED = "shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]";
const INSET = "shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff]";

const stats = [
  { label: "投稿", labelEn: "Posts", value: "248" },
  { label: "フォロワー", labelEn: "Followers", value: "12.4k" },
  { label: "フォロー中", labelEn: "Following", value: "320" },
];

export default function SoftProfile() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [following, setFollowing] = useState(false);
  return (
    <div className={cn("w-full max-w-sm rounded-3xl bg-[#e0e5ec] p-7 text-center text-slate-600", RAISED)}>
      <div className={cn("mx-auto grid size-24 place-items-center rounded-full bg-[#e0e5ec] text-3xl font-bold text-indigo-500", RAISED)}>
        AO
      </div>

      <h3 className="mt-4 text-xl font-semibold text-slate-700">{en ? "Aoi" : "あおい"}</h3>
      <p className="inline-flex items-center gap-1 text-sm text-slate-500">
        <MapPin className="size-3.5" />
        {en ? "Tokyo, Japan" : "東京・日本"}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">
        {en
          ? "Product designer. I love soft UI and generous whitespace."
          : "プロダクトデザイナー。柔らかなUIと余白が好きです。"}
      </p>

      <div className={cn("mt-6 flex items-center justify-around rounded-2xl bg-[#e0e5ec] py-4", INSET)}>
        {stats.map((s) => (
          <div key={s.labelEn}>
            <p className="text-lg font-bold text-slate-700">{s.value}</p>
            <p className="text-xs text-slate-500">{en ? s.labelEn : s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setFollowing((v) => !v)}
          aria-pressed={following}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#e0e5ec] py-3 text-sm font-semibold transition active:scale-[0.98]",
            following ? cn(INSET, "text-slate-500") : cn(RAISED, "text-indigo-600"),
          )}
        >
          <UserPlus className="size-4" />
          {following
            ? en
              ? "Following"
              : "フォロー中"
            : en
              ? "Follow"
              : "フォロー"}
        </button>
        <button
          aria-label={en ? "Message" : "メッセージ"}
          className={cn("grid size-12 shrink-0 place-items-center rounded-2xl bg-[#e0e5ec] text-slate-500 transition active:scale-95", RAISED)}
        >
          <MessageCircle className="size-5" />
        </button>
      </div>
    </div>
  );
}
