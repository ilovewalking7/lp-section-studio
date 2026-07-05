import { useState } from "react";
import { Bluetooth, Moon, Volume2, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフト設定トグル",
  category: "ニューモーフィズム",
  description: "柔らかなスイッチとセグメントコントロールを備えた設定リスト。",
  align: "center",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "settings", "toggle"],
};

const RAISED = "shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]";
const INSET = "shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff]";

const items = [
  { icon: Wifi, label: "Wi-Fi", labelEn: "Wi-Fi", desc: "Home-5G に接続済み", descEn: "Connected to Home-5G" },
  { icon: Bluetooth, label: "Bluetooth", labelEn: "Bluetooth", desc: "オフ", descEn: "Off" },
  { icon: Moon, label: "おやすみモード", labelEn: "Do Not Disturb", desc: "22:00〜7:00", descEn: "22:00–7:00" },
  { icon: Volume2, label: "サウンド", labelEn: "Sound", desc: "通知音を有効化", descEn: "Notification sounds on" },
];

export default function SoftToggleSettings() {
  const [states, setStates] = useState([true, false, true, false]);
  const [theme, setTheme] = useState(0);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const themes = [
    { ja: "ライト", en: "Light" },
    { ja: "ダーク", en: "Dark" },
    { ja: "自動", en: "Auto" },
  ];

  return (
    <div className={cn("w-full max-w-sm rounded-3xl bg-[#e0e5ec] p-6 text-slate-600", RAISED)}>
      <h3 className="text-lg font-semibold text-slate-700">{en ? "Settings" : "設定"}</h3>

      <div className="mt-5 space-y-4">
        {items.map((it, i) => (
          <div key={it.labelEn} className="flex items-center gap-4">
            <span className={cn("grid size-11 shrink-0 place-items-center rounded-2xl bg-[#e0e5ec]", states[i] ? "text-indigo-500" : "text-slate-400", RAISED)}>
              <it.icon className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-700">{en ? it.labelEn : it.label}</p>
              <p className="truncate text-xs text-slate-500">{en ? it.descEn : it.desc}</p>
            </div>
            <button
              role="switch"
              aria-checked={states[i]}
              aria-label={en ? it.labelEn : it.label}
              onClick={() => setStates((s) => s.map((v, j) => (j === i ? !v : v)))}
              className={cn("relative h-8 w-14 shrink-0 rounded-full bg-[#e0e5ec] transition", INSET)}
            >
              <span
                className={cn(
                  "absolute top-1 size-6 rounded-full bg-[#e0e5ec] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff] transition-all",
                  states[i] ? "left-7 bg-indigo-500" : "left-1",
                )}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-7">
        <p className="mb-2 text-xs font-medium text-slate-500">{en ? "Appearance" : "外観"}</p>
        <div className={cn("flex gap-1 rounded-2xl bg-[#e0e5ec] p-1.5", INSET)}>
          {themes.map((t, i) => (
            <button
              key={t.en}
              onClick={() => setTheme(i)}
              aria-pressed={theme === i}
              className={cn(
                "flex-1 rounded-xl py-2 text-sm font-medium transition",
                theme === i
                  ? "bg-[#e0e5ec] text-indigo-600 shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]"
                  : "text-slate-500",
              )}
            >
              {en ? t.en : t.ja}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
