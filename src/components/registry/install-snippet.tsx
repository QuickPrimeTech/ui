"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "install-preference";

export const InstallSnippet = () => {
  const pathname = usePathname(); // /registry/skeleton
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("pnpm");

  // Extract component name (skeleton)
  const componentName = useMemo(() => {
    const parts = pathname.split("/");
    return parts[parts.length - 1] || "component";
  }, [pathname]);

  // Build base URL
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/r/${componentName}.json`;

  // Generate snippets dynamically
  const snippets = [
    {
      filename: "pnpm",
      code: `pnpm dlx shadcn@latest add ${url}`,
    },
    {
      filename: "npm",
      code: `npx shadcn@latest add ${url}`,
    },
    {
      filename: "yarn",
      code: `yarn dlx shadcn@latest add ${url}`,
    },
    {
      filename: "bun",
      code: `bunx shadcn@latest add ${url}`,
    },
  ];

  // Load preference
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && snippets.some((s) => s.filename === stored)) {
      setActiveTab(stored);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem(STORAGE_KEY, value);
  };

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <h2 className="mb-2">Installation</h2>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-2">
          {snippets.map((snippet) => (
            <TabsTrigger key={snippet.filename} value={snippet.filename}>
              {snippet.filename}
            </TabsTrigger>
          ))}
        </TabsList>

        {snippets.map((snippet) => (
          <TabsContent
            key={snippet.filename}
            value={snippet.filename}
            className="relative border overflow-hidden bg-muted rounded-md p-0.5"
          >
            {/* Neon border */}
            <div className="absolute inset-0 rounded-md bg-[linear-gradient(90deg,var(--color-primary),#f43f5e,#10b981,var(--color-primary))] bg-size-[200%_100%] animate-[gradientMove_2s_linear_infinite]" />

            <div className="relative flex items-center justify-between bg-muted rounded-md px-3 py-2">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {snippet.code}
              </pre>

              <Button
                variant="ghost"
                onClick={() => handleCopy(snippet.code, snippet.filename)}
              >
                {copied === snippet.filename ? <Check /> : <Copy />}
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
