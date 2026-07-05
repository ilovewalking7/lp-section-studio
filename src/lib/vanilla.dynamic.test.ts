import { describe, it, expect } from "vitest";
import { generateDynamicVanillaHtml } from "./vanilla";

const sample = `import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";
export const meta: DemoMeta = { name: "x", category: "基本", description: "d" };
export default function MyDemo() {
  const [n, setN] = useState(0);
  return <Button onClick={() => setN(n + 1)} className={cn("x")}>{n} <ArrowRight /></Button>;
}`;

describe("dynamic vanilla generator", () => {
  it("produces a self-contained runnable HTML", () => {
    const html = generateDynamicVanillaHtml(sample);
    expect(html).toContain('type="importmap"');
    expect(html).toContain("@babel/standalone");
    expect(html).toContain('data-presets="typescript,react"');
    expect(html).toContain("React.createElement(MyDemo)");
    expect(html).toContain("createRoot");
    expect(html).toContain("ArrowRight");
    expect(html).toContain('from "lucide-react"');
    expect(html).toMatch(/(const|function) Button/);
    expect(html).toMatch(/function cn/);
    expect(html).toContain('from "react"');
    expect(html).not.toContain("@/components/ui");
    expect(html).not.toContain("@/lib/utils");
    expect(html).not.toContain("export const meta");
    expect(html).not.toContain("export default");
  });
});
