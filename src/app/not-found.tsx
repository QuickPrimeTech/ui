// app/components/not-found.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

export default function ComponentsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Icon */}
      <div className="bg-muted rounded-full p-6 mb-6">
        <Construction className="w-12 h-12 text-primary" />
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
        Page in Progress 🚧
      </h1>

      {/* Message */}
      <p className="text-muted-foreground max-w-lg mb-8">
        The component you&apos;re trying to view hasn&apos;t been built yet.
        We&apos;re actively working on it — check back soon!
      </p>

      {/* Actions */}
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/components">Browse Components</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
