/**
 * セクションのON/OFF。
 * テンプレの任意セクション（SectionSlot.optional）と写真セクションを切り替え、
 * 非表示にしたIDを answers.hiddenSections に持たせる（プレビュー・書き出し共通）。
 */
import { useId } from "react";
import { Switch } from "@/components/ui/switch";
import type { IndustryTemplate } from "../types";

interface ToggleItem {
  id: string;
  label: string;
  disabled: boolean;
  note?: string;
}

export default function SectionToggles({
  template,
  hiddenSections,
  photoCount,
  onChange,
}: {
  template: IndustryTemplate;
  hiddenSections: string[];
  photoCount: number;
  onChange: (hiddenSections: string[]) => void;
}) {
  const uid = useId();
  const noPhotos = photoCount === 0;

  const items: ToggleItem[] = [
    ...template.sections
      .filter((s) => s.optional)
      .map((s) => ({ id: s.id, label: s.label, disabled: false })),
    {
      id: template.photoSection.id,
      label: template.photoSection.label,
      disabled: noPhotos,
      note: noPhotos ? "写真を追加すると表示できます" : undefined,
    },
  ];

  const setVisible = (id: string, visible: boolean) => {
    onChange(
      visible
        ? hiddenSections.filter((s) => s !== id)
        : hiddenSections.includes(id)
          ? hiddenSections
          : [...hiddenSections, id]
    );
  };

  return (
    <ul className="divide-y rounded-md border">
      {items.map((item) => {
        const id = `${uid}-${item.id}`;
        return (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 px-3 py-2.5"
          >
            <span className="min-w-0">
              <label
                htmlFor={id}
                className="block cursor-pointer text-sm font-medium text-foreground"
              >
                {item.label}
              </label>
              {item.note && (
                <span className="block text-xs text-muted-foreground">
                  {item.note}
                </span>
              )}
            </span>
            <Switch
              id={id}
              checked={!hiddenSections.includes(item.id)}
              disabled={item.disabled}
              onCheckedChange={(v) => setVisible(item.id, v)}
            />
          </li>
        );
      })}
    </ul>
  );
}
