"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Copy,
  Palette,
  Box,
  Type,
  Layout,
  BarChart3,
  PanelLeft,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Map every single utility class so Tailwind v4 can "see" them during static analysis
const colorLookup: Record<
  string,
  { bg: string; text: string; shades: string[] }
> = {
  background: {
    bg: "bg-background",
    text: "text-foreground",
    shades: [
      "bg-background/10",
      "bg-background/20",
      "bg-background/30",
      "bg-background/40",
      "bg-background/50",
      "bg-background/60",
      "bg-background/70",
      "bg-background/80",
      "bg-background/90",
      "bg-background/100",
    ],
  },
  foreground: {
    bg: "bg-foreground",
    text: "text-background",
    shades: [
      "bg-foreground/10",
      "bg-foreground/20",
      "bg-foreground/30",
      "bg-foreground/40",
      "bg-foreground/50",
      "bg-foreground/60",
      "bg-foreground/70",
      "bg-foreground/80",
      "bg-foreground/90",
      "bg-foreground/100",
    ],
  },
  card: {
    bg: "bg-card",
    text: "text-card-foreground",
    shades: [
      "bg-card/10",
      "bg-card/20",
      "bg-card/30",
      "bg-card/40",
      "bg-card/50",
      "bg-card/60",
      "bg-card/70",
      "bg-card/80",
      "bg-card/90",
      "bg-card/100",
    ],
  },
  popover: {
    bg: "bg-popover",
    text: "text-popover-foreground",
    shades: [
      "bg-popover/10",
      "bg-popover/20",
      "bg-popover/30",
      "bg-popover/40",
      "bg-popover/50",
      "bg-popover/60",
      "bg-popover/70",
      "bg-popover/80",
      "bg-popover/90",
      "bg-popover/100",
    ],
  },
  primary: {
    bg: "bg-primary",
    text: "text-primary-foreground",
    shades: [
      "bg-primary/10",
      "bg-primary/20",
      "bg-primary/30",
      "bg-primary/40",
      "bg-primary/50",
      "bg-primary/60",
      "bg-primary/70",
      "bg-primary/80",
      "bg-primary/90",
      "bg-primary/100",
    ],
  },
  secondary: {
    bg: "bg-secondary",
    text: "text-secondary-foreground",
    shades: [
      "bg-secondary/10",
      "bg-secondary/20",
      "bg-secondary/30",
      "bg-secondary/40",
      "bg-secondary/50",
      "bg-secondary/60",
      "bg-secondary/70",
      "bg-secondary/80",
      "bg-secondary/90",
      "bg-secondary/100",
    ],
  },
  muted: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    shades: [
      "bg-muted/10",
      "bg-muted/20",
      "bg-muted/30",
      "bg-muted/40",
      "bg-muted/50",
      "bg-muted/60",
      "bg-muted/70",
      "bg-muted/80",
      "bg-muted/90",
      "bg-muted/100",
    ],
  },
  accent: {
    bg: "bg-accent",
    text: "text-accent-foreground",
    shades: [
      "bg-accent/10",
      "bg-accent/20",
      "bg-accent/30",
      "bg-accent/40",
      "bg-accent/50",
      "bg-accent/60",
      "bg-accent/70",
      "bg-accent/80",
      "bg-accent/90",
      "bg-accent/100",
    ],
  },
  destructive: {
    bg: "bg-destructive",
    text: "text-destructive-foreground",
    shades: [
      "bg-destructive/10",
      "bg-destructive/20",
      "bg-destructive/30",
      "bg-destructive/40",
      "bg-destructive/50",
      "bg-destructive/60",
      "bg-destructive/70",
      "bg-destructive/80",
      "bg-destructive/90",
      "bg-destructive/100",
    ],
  },
  border: {
    bg: "bg-border",
    text: "text-foreground",
    shades: [
      "bg-border/10",
      "bg-border/20",
      "bg-border/30",
      "bg-border/40",
      "bg-border/50",
      "bg-border/60",
      "bg-border/70",
      "bg-border/80",
      "bg-border/90",
      "bg-border/100",
    ],
  },
  input: {
    bg: "bg-input",
    text: "text-foreground",
    shades: [
      "bg-input/10",
      "bg-input/20",
      "bg-input/30",
      "bg-input/40",
      "bg-input/50",
      "bg-input/60",
      "bg-input/70",
      "bg-input/80",
      "bg-input/90",
      "bg-input/100",
    ],
  },
  ring: {
    bg: "bg-ring",
    text: "text-foreground",
    shades: [
      "bg-ring/10",
      "bg-ring/20",
      "bg-ring/30",
      "bg-ring/40",
      "bg-ring/50",
      "bg-ring/60",
      "bg-ring/70",
      "bg-ring/80",
      "bg-ring/90",
      "bg-ring/100",
    ],
  },
  sidebar: {
    bg: "bg-sidebar",
    text: "text-sidebar-foreground",
    shades: [
      "bg-sidebar/10",
      "bg-sidebar/20",
      "bg-sidebar/30",
      "bg-sidebar/40",
      "bg-sidebar/50",
      "bg-sidebar/60",
      "bg-sidebar/70",
      "bg-sidebar/80",
      "bg-sidebar/90",
      "bg-sidebar/100",
    ],
  },
  "sidebar-primary": {
    bg: "bg-sidebar-primary",
    text: "text-sidebar-primary-foreground",
    shades: [
      "bg-sidebar-primary/10",
      "bg-sidebar-primary/20",
      "bg-sidebar-primary/30",
      "bg-sidebar-primary/40",
      "bg-sidebar-primary/50",
      "bg-sidebar-primary/60",
      "bg-sidebar-primary/70",
      "bg-sidebar-primary/80",
      "bg-sidebar-primary/90",
      "bg-sidebar-primary/100",
    ],
  },
  "sidebar-accent": {
    bg: "bg-sidebar-accent",
    text: "text-sidebar-accent-foreground",
    shades: [
      "bg-sidebar-accent/10",
      "bg-sidebar-accent/20",
      "bg-sidebar-accent/30",
      "bg-sidebar-accent/40",
      "bg-sidebar-accent/50",
      "bg-sidebar-accent/60",
      "bg-sidebar-accent/70",
      "bg-sidebar-accent/80",
      "bg-sidebar-accent/90",
      "bg-sidebar-accent/100",
    ],
  },
  "chart-1": {
    bg: "bg-chart-1",
    text: "text-white",
    shades: [
      "bg-chart-1/10",
      "bg-chart-1/20",
      "bg-chart-1/30",
      "bg-chart-1/40",
      "bg-chart-1/50",
      "bg-chart-1/60",
      "bg-chart-1/70",
      "bg-chart-1/80",
      "bg-chart-1/90",
      "bg-chart-1/100",
    ],
  },
  "chart-2": {
    bg: "bg-chart-2",
    text: "text-white",
    shades: [
      "bg-chart-2/10",
      "bg-chart-2/20",
      "bg-chart-2/30",
      "bg-chart-2/40",
      "bg-chart-2/50",
      "bg-chart-2/60",
      "bg-chart-2/70",
      "bg-chart-2/80",
      "bg-chart-2/90",
      "bg-chart-2/100",
    ],
  },
  "chart-3": {
    bg: "bg-chart-3",
    text: "text-white",
    shades: [
      "bg-chart-3/10",
      "bg-chart-3/20",
      "bg-chart-3/30",
      "bg-chart-3/40",
      "bg-chart-3/50",
      "bg-chart-3/60",
      "bg-chart-3/70",
      "bg-chart-3/80",
      "bg-chart-3/90",
      "bg-chart-3/100",
    ],
  },
  "chart-4": {
    bg: "bg-chart-4",
    text: "text-white",
    shades: [
      "bg-chart-4/10",
      "bg-chart-4/20",
      "bg-chart-4/30",
      "bg-chart-4/40",
      "bg-chart-4/50",
      "bg-chart-4/60",
      "bg-chart-4/70",
      "bg-chart-4/80",
      "bg-chart-4/90",
      "bg-chart-4/100",
    ],
  },
  "chart-5": {
    bg: "bg-chart-5",
    text: "text-white",
    shades: [
      "bg-chart-5/10",
      "bg-chart-5/20",
      "bg-chart-5/30",
      "bg-chart-5/40",
      "bg-chart-5/50",
      "bg-chart-5/60",
      "bg-chart-5/70",
      "bg-chart-5/80",
      "bg-chart-5/90",
      "bg-chart-5/100",
    ],
  },
};

const colorGroups = {
  Base: ["background", "foreground", "card", "popover"],
  Brand: ["primary", "secondary", "accent", "muted"],
  Sidebar: ["sidebar", "sidebar-primary", "sidebar-accent"],
  Status: ["destructive", "border", "input", "ring"],
  Charts: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
};

function TokenCard({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const data = colorLookup[slug];

  const copy = () => {
    navigator.clipboard.writeText(`var(--${slug})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="group overflow-hidden border-border/50">
      <CardHeader className="p-4 pb-2 flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-sm font-bold capitalize">
            {slug.replace("-", " ")}
          </CardTitle>
          <CardDescription className="font-mono text-[10px]">
            --{slug}
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copy}>
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 opacity-40 group-hover:opacity-100" />
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        {/* The solid block */}
        <div
          className={`h-16 w-full rounded-md border shadow-inner ${data.bg}`}
        />

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground/50">
            <span>Opacity Scale</span>
            <span>10 - 100</span>
          </div>
          {/* Checkered background shows transparency properly */}
          <div className="flex h-10 w-full rounded border overflow-hidden">
            <TooltipProvider>
              {data.shades.map((shadeClass) => (
                <Tooltip key={shadeClass}>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex-1 ${shadeClass} cursor-help transition-all hover:scale-110 hover:z-10`}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="font-mono text-[10px]">
                    {shadeClass}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TokensPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const groupIcons: any = {
    Base: Layout,
    Brand: Palette,
    Sidebar: PanelLeft,
    Status: ShieldAlert,
    Charts: BarChart3,
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 selection:bg-primary/20">
      <div className="w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            <span className="text-xl font-black tracking-tighter uppercase">
              Prime Design
            </span>
          </div>
          <Badge
            variant="outline"
            className="border-primary/20 text-primary uppercase font-bold text-[10px]"
          >
            Static Build Safe
          </Badge>
        </div>
      </div>

      <main className="container max-w-7xl mx-auto px-4 py-16 space-y-24">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-6xl font-black tracking-tighter">
            Theme <span className="text-primary">Tokens</span>
          </h1>
          <p className="text-muted-foreground text-lg font-medium leading-tight">
            Comprehensive reference for Tailwind v4 core variables. Every class
            is statically analyzed for production safety.
          </p>
        </div>

        {Object.entries(colorGroups).map(([group, slugs]) => {
          const Icon = groupIcons[group];
          return (
            <section key={group} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-black tracking-tight">{group}</h2>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slugs.map((slug) => (
                  <TokenCard key={slug} slug={slug} />
                ))}
              </div>
            </section>
          );
        })}

        <div className="grid grid-cols-1 gap-12 pt-12 border-t">
          <div className="space-y-6">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <Box className="text-primary" /> Geometry
            </h3>
            <div className="flex flex-wrap gap-2 p-10 rounded-3xl bg-muted/30 border-2 border-dashed">
              {[
                "rounded-sm",
                "rounded-md",
                "rounded-lg",
                "rounded-xl",
                "rounded-2xl",
                "rounded-3xl",
                "rounded-4xl",
                "rounded-full",
              ].map((r) => (
                <div key={r} className="flex flex-col items-center gap-2">
                  <div className={`size-28 bg-primary shadow-lg ${r}`} />
                  <span className="text-[10px] font-mono">{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <Type className="text-primary" /> Typography
            </h3>
            <div className="p-8 rounded-3xl bg-card border space-y-4 shadow-xl">
              <p className="font-sans text-3xl font-bold tracking-tight">
                Sans Interface
              </p>
              <Separator />
              <p className="font-mono text-xl text-primary">Monospace_Text</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
