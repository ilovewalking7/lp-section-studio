import {
  Boxes,
  Cloud,
  Code2,
  Database,
  Figma,
  GitBranch,
  Github,
  Globe,
  Mail,
  MessageCircle,
  Slack,
  Terminal,
} from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アイコンマーキー",
  category: "マーキー",
  description: "連携サービスのアイコンが一列に流れる。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "icons"],
};

const ICONS = [
  { Icon: Github, name: "GitHub" },
  { Icon: Slack, name: "Slack" },
  { Icon: Figma, name: "Figma" },
  { Icon: Database, name: "Postgres" },
  { Icon: Cloud, name: "Cloud" },
  { Icon: GitBranch, name: "Git" },
  { Icon: Terminal, name: "CLI" },
  { Icon: Code2, name: "SDK" },
  { Icon: Mail, name: "Mail" },
  { Icon: Globe, name: "Web" },
  { Icon: MessageCircle, name: "Chat" },
  { Icon: Boxes, name: "Containers" },
];

export default function IconMarquee() {
  return (
    <div className="w-full py-8">
      <style>{`
        @keyframes iconMarqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .icon-track { animation: iconMarqueeScroll 26s linear infinite; }
        .icon-mask:hover .icon-track { animation-play-state: paused; }
      `}</style>
      <div
        className="icon-mask group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="icon-track flex w-max items-center gap-4 pr-4">
          {[...ICONS, ...ICONS].map(({ Icon, name }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex size-16 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-primary"
              title={name}
            >
              <Icon className="size-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
