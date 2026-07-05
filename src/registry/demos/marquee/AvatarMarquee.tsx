import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アバターマーキー",
  category: "マーキー",
  description: "イニシャルアバターが流れる「N 人に信頼されています」帯。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "avatar"],
};

const USERS = [
  { initials: "MS", color: "bg-rose-500" },
  { initials: "LC", color: "bg-sky-500" },
  { initials: "TK", color: "bg-violet-500" },
  { initials: "AN", color: "bg-amber-500" },
  { initials: "YA", color: "bg-emerald-500" },
  { initials: "JD", color: "bg-indigo-500" },
  { initials: "RB", color: "bg-fuchsia-500" },
  { initials: "KS", color: "bg-teal-500" },
  { initials: "EL", color: "bg-orange-500" },
  { initials: "PW", color: "bg-cyan-500" },
];

export default function AvatarMarquee() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full py-8">
      <style>{`
        @keyframes avatarMarqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .avatar-track { animation: avatarMarqueeScroll 24s linear infinite; }
        .avatar-mask:hover .avatar-track { animation-play-state: paused; }
      `}</style>
      <p className="mb-5 text-center text-sm font-medium text-muted-foreground">
        <span className="font-bold text-foreground">28,000+</span>{" "}
        {en ? "users trust us" : "人のユーザーに信頼されています"}
      </p>
      <div
        className="avatar-mask group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="avatar-track flex w-max items-center gap-3 pr-3">
          {[...USERS, ...USERS].map((u, i) => (
            <span
              key={`${u.initials}-${i}`}
              className={`flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-background ${u.color}`}
            >
              {u.initials}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
