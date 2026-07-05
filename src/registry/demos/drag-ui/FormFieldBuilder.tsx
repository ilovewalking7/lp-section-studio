import { useRef, useState } from "react";
import { Type, Mail, Hash, CheckSquare, GripVertical } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "フォームビルダー",
  category: "ドラッグ操作",
  description: "入力フィールドをドラッグして並べ替えるフォーム編集UI。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type Field = {
  id: string;
  label: string;
  labelEn: string;
  icon: LucideIcon;
  kind: string;
  kindEn: string;
};

const INITIAL: Field[] = [
  { id: "fb1", label: "氏名", labelEn: "Full name", icon: Type, kind: "テキスト", kindEn: "Text" },
  { id: "fb2", label: "メール", labelEn: "Email", icon: Mail, kind: "メール", kindEn: "Email" },
  { id: "fb3", label: "年齢", labelEn: "Age", icon: Hash, kind: "数値", kindEn: "Number" },
  { id: "fb4", label: "規約に同意", labelEn: "Accept terms", icon: CheckSquare, kind: "チェック", kindEn: "Checkbox" },
];

export default function FormFieldBuilder() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [fields, setFields] = useState<Field[]>(INITIAL);
  const [dragId, setDragId] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent, id: string) {
    if (dragId !== id) return;
    const form = formRef.current;
    if (!form) return;
    const rows = Array.from(form.querySelectorAll<HTMLElement>("[data-fb]"));
    let target = fields.findIndex((f) => f.id === id);
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i].getBoundingClientRect();
      if (e.clientY < r.top + r.height / 2) {
        target = i;
        break;
      }
      target = i;
    }
    const from = fields.findIndex((f) => f.id === id);
    if (from === target) return;
    setFields((prev) => {
      const next = prev.slice();
      const [m] = next.splice(from, 1);
      next.splice(target, 0, m);
      return next;
    });
  }

  return (
    <div
      ref={formRef}
      className="w-full max-w-sm space-y-2 rounded-xl border bg-card p-4"
    >
      <h3 className="mb-1 text-sm font-semibold text-foreground">
        {en ? "Form layout" : "フォーム構成"}
      </h3>
      {fields.map((f) => {
        const Icon = f.icon;
        return (
          <div
            key={f.id}
            data-fb
            onPointerMove={(e) => onMove(e, f.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg border bg-background p-2.5 transition",
              dragId === f.id && "shadow-lg ring-2 ring-primary/40"
            )}
          >
            <button
              type="button"
              aria-label={en ? "Move field" : "フィールドを移動"}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                setDragId(f.id);
              }}
              onPointerUp={() => setDragId(null)}
              className="cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <Icon className="h-4 w-4 text-primary" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">
                {en ? f.labelEn : f.label}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {en ? f.kindEn : f.kind}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
