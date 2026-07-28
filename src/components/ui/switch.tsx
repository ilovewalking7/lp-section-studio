import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  /**
   * スイッチは中身が空の <button> なので、名前は外から与えるしかない。
   * 隣に見出しテキストがあるなら aria-labelledby でその id を指すのが最良。
   * 無ければ aria-label に用途を書く。どちらも無いとスクリーンリーダーでは
   * 「スイッチ、オン」としか読まれず、何のスイッチか分からない。
   */
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/** 依存ゼロの軽量トグルスイッチ（controlled / uncontrolled 両対応） */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      className,
      id,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
    },
    ref
  ) => {
    const isControlled = checked !== undefined;
    const [internal, setInternal] = React.useState(defaultChecked ?? false);
    const on = isControlled ? checked : internal;

    const toggle = () => {
      if (disabled) return;
      if (!isControlled) setInternal((v) => !v);
      onCheckedChange?.(!on);
    };

    return (
      <button
        ref={ref}
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          on ? "bg-primary" : "bg-input",
          className
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
            on ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
