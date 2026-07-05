import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "Appleで続行",
  category: "ボタン",
  description: "黒地にAppleロゴを置いたソーシャルサインインボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function SocialApple() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-8">
      <button
        type="button"
        className="inline-flex w-64 items-center justify-center gap-3 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/25 transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98]"
      >
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.37 1.43c.09 1.02-.32 2.02-.95 2.74-.66.76-1.74 1.34-2.8 1.26-.11-1 .38-2.03 1-2.69.69-.75 1.86-1.31 2.75-1.31ZM19.6 17.2c-.53 1.18-.79 1.71-1.47 2.76-.95 1.46-2.29 3.28-3.95 3.29-1.47.02-1.85-.96-3.85-.95-2 .01-2.42.97-3.89.95-1.66-.01-2.93-1.65-3.88-3.11-2.65-4.08-2.93-8.87-1.29-11.42 1.16-1.81 3-2.87 4.73-2.87 1.76 0 2.87.97 4.33.97 1.41 0 2.27-.97 4.31-.97 1.54 0 3.18.84 4.34 2.29-3.82 2.09-3.2 7.55.62 9.06Z" />
        </svg>
        {en ? "Continue with Apple" : "Appleで続行"}
      </button>
    </div>
  );
}
