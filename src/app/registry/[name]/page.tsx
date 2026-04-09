import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import { getRegistryItem } from "@/lib/registry";
import type { Component } from "@/lib/registry";
import { InstallSnippet } from "@registry/install-snippet";
import { V0Button } from "@/layouts/registry/v0-button";

// Utility to dynamically import a component by its name
function getDynamicComponent(name: string) {
  return dynamic(() => import(`@registry/examples/${name}`), {
    ssr: true, // or false if the component should only render client-side
    loading: () => <div className="h-32 animate-pulse bg-muted rounded-md" />,
  });
}

// Page
export default async function RegistryItemPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  let registryItem: Component;
  try {
    registryItem = getRegistryItem(name);
  } catch {
    notFound();
  }

  // Dynamically import component
  const ComponentToRender = getDynamicComponent(name);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="font-bold text-3xl tracking-tight">
          {registryItem.title}
        </h1>
        {registryItem.description && (
          <p className="text-muted-foreground">{registryItem.description}</p>
        )}
      </div>

      <InstallSnippet />

      <div className="relative flex flex-col items-end gap-6 rounded-md border p-6">
        <div className="absolute inset-0 z-0 bg-background bg-[radial-gradient(circle,var(--muted-foreground)_1.5px,transparent_1.5px)] bg-size-[20px_20px] bg-position-[0_0] dark:opacity-20 opacity-30" />
        <V0Button className="relative w-fit" />
        <div className="relative w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <ComponentToRender />
        </div>
      </div>
    </div>
  );
}
