import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="テーマ切り替え"
      onClick={() => setDark((v) => !v)}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
