"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const STORAGE_KEY = "install-preference";

export const InstallSnippet = () => {
  const pathname = usePathname();
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("pnpm");
  // Track hover state for each tooltip
  const [openTooltips, setOpenTooltips] = useState<Record<string, boolean>>({});

  const componentName = useMemo(() => {
    const parts = pathname.split("/");
    return parts[parts.length - 1] || "component";
  }, [pathname]);

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/r/${componentName}.json`;

  const snippets = [
    { filename: "pnpm", code: `pnpm dlx shadcn@latest add ${url}` },
    { filename: "npm", code: `npx shadcn@latest add ${url}` },
    { filename: "yarn", code: `yarn dlx shadcn@latest add ${url}` },
    { filename: "bun", code: `bunx shadcn@latest add ${url}` },
  ];

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
    // Force tooltip open
    setOpenTooltips((prev) => ({ ...prev, [key]: true }));

    setTimeout(() => {
      setCopied(null);
      // Allow tooltip to close after delay
      setOpenTooltips((prev) => ({ ...prev, [key]: false }));
    }, 2000);
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

        {snippets.map((snippet) => {
          const isCopied = copied === snippet.filename;

          return (
            <TabsContent
              key={snippet.filename}
              value={snippet.filename}
              className="relative border overflow-hidden bg-muted rounded-md p-0.5"
            >
              <div className="absolute inset-0 rounded-md bg-[linear-gradient(90deg,var(--color-primary),#f43f5e,#10b981,var(--color-primary))] bg-size-[200%_100%] animate-[gradientMove_2s_linear_infinite]" />

              <div className="relative flex items-center justify-between bg-muted rounded-md px-3 py-2">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {snippet.code}
                </pre>

                <Tooltip
                  open={isCopied || openTooltips[snippet.filename] || false}
                  onOpenChange={(open) => {
                    // Only allow hover to control open state when not copied
                    if (!isCopied) {
                      setOpenTooltips((prev) => ({
                        ...prev,
                        [snippet.filename]: open,
                      }));
                    }
                  }}
                >
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size={"icon"}
                      className="cursor-pointer"
                      aria-label={`Copy ${activeTab} command`}
                      onClick={() => handleCopy(snippet.code, snippet.filename)}
                    >
                      {isCopied ? (
                        <Check className="text-green-500" />
                      ) : (
                        <Copy />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isCopied ? "Copied!" : `Copy ${activeTab} command`}
                  </TooltipContent>
                </Tooltip>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
