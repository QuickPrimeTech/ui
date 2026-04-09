"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, useMemo } from "react";
import { SiV0 } from "react-icons/si";

export function V0Button({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const pathname = usePathname();
  const componentName = useMemo(() => {
    const parts = pathname.split("/");
    return parts[parts.length - 1] || "component";
  }, [pathname]);

  const url = `https://ui.quickprimetech.com/r/${componentName}.json`;
  return (
    <Button
      variant={"secondary"}
      className={cn(
        "bg-foreground text-background hover:bg-foreground/90 no-underline",
        className,
      )}
      {...props}
      asChild
    >
      <Link
        href={`https://v0.dev/chat/api/open?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in
        <SiV0 className="size-6" />
      </Link>
    </Button>
  );
}
