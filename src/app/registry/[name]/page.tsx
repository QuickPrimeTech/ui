// app/registry/[name]/page.tsx
import { notFound } from "next/navigation";
import { getRegistryItem, getRegistryItems } from "@/lib/registry";
import type { Component } from "@/lib/registry";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { InstallSnippet } from "@/components/registry/install-snippet";
import { V0Button } from "@/layouts/registry/v0-button";

// ✅ Lazy component imports
const componentModules = {
  skeleton: () => import("@/components/registry/examples/skeleton"),
} as const;

// ✅ Create dynamic components once (module scope)
const componentMap = Object.fromEntries(
  Object.entries(componentModules).map(([name, importFn]) => [
    name,
    dynamic(importFn, {
      ssr: true,
      loading: () => <div className="h-32 animate-pulse bg-muted rounded-md" />,
    }),
  ]),
) as Record<string, React.ComponentType>;

// ✅ Static params
export function generateStaticParams(): { name: string }[] {
  const components = getRegistryItems();
  return components.map((component) => ({
    name: component.name,
  }));
}

// ✅ Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;

  try {
    const component = getRegistryItem(name);
    return {
      title: `${component.title} Component`,
      description: component.description,
    };
  } catch {
    return {
      title: "Component Not Found",
    };
  }
}

// ✅ Page
export default async function RegistryItemPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  let registryItem: Component;
  try {
    registryItem = getRegistryItem(name);
    console.log("component name -------->", name);
  } catch {
    notFound();
  }

  const ComponentToRender = componentMap[name];

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
      <div className="flex flex-col items-end rounded-md border p-6">
        <V0Button className="w-fit" />
        <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {ComponentToRender && <ComponentToRender />}
        </div>
      </div>
    </div>
  );
}
