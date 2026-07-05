import { Wand2, Palette, Rocket, Users, Shield, Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ポップ機能グリッド",
  category: "プレイフル",
  description: "カラフルなバブルにlucideアイコンを入れた機能グリッド。",
  align: "full",
  isNew: true,
  tags: ["playful", "rounded", "features"],
};

const features = [
  { icon: Wand2, color: "#ff8fab", title: "かんたん作成", titleEn: "Easy to build", desc: "ドラッグするだけ。コード知識はいりません。", descEn: "Just drag and drop. No code required." },
  { icon: Palette, color: "#4cc9f0", title: "カラフルテーマ", titleEn: "Colorful themes", desc: "気分でガラッと着せ替えできます。", descEn: "Restyle the whole thing on a whim." },
  { icon: Rocket, color: "#06d6a0", title: "サクッと公開", titleEn: "Ship in a snap", desc: "ワンクリックで世界に届けよう。", descEn: "Go live with a single click." },
  { icon: Users, color: "#ffd166", title: "みんなで編集", titleEn: "Edit together", desc: "チームでリアルタイムにワイワイ。", descEn: "Real-time fun with your whole team." },
  { icon: Shield, color: "#b388ff", title: "安心セキュリティ", titleEn: "Safe & secure", desc: "大事なデータをしっかり守ります。", descEn: "Your important data stays protected." },
  { icon: Sparkles, color: "#ff8fab", title: "AIのおてつだい", titleEn: "AI helper", desc: "アイデア出しもおまかせください。", descEn: "Stuck for ideas? Leave it to us." },
];

export default function EmojiFeatureGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="font-rounded w-full rounded-3xl bg-[#f7fcff] px-5 py-14 sm:px-8">
      <div className="mb-10 text-center">
        <span
          className="mb-3 inline-block rounded-full px-4 py-1 text-sm font-extrabold text-white"
          style={{ backgroundColor: "#06d6a0" }}
        >
          {en ? "What you can do" : "できること"}
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
          {en ? "Everything fun, all in one" : "わくわくが、ぜんぶ揃う"}
        </h2>
      </div>

      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.titleEn}
              className="group rounded-3xl border-2 border-slate-100 bg-white p-6 shadow-[0_8px_0_#eef1f4] transition-all duration-200 hover:-translate-y-1.5"
            >
              <div
                className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl text-white transition-transform duration-200 group-hover:rotate-6 group-hover:scale-105"
                style={{ backgroundColor: f.color }}
              >
                <Icon className="size-7" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-800">{en ? f.titleEn : f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{en ? f.descEn : f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
