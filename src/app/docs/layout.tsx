import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{
        // 1. Collapses the sidebar folders by default
        defaultOpenLevel: 1,

        // 2. Adds your custom attribution and shout-out
        footer: (
          <div className="flex flex-col gap-2 p-3 text-sm text-muted-foreground border-t">
            <p className="text-[10px] uppercase tracking-wider opacity-70">
              Shout out to{" "}
              <a
                href="https://fumadocs.dev"
                className="underline hover:text-foreground"
              >
                Fumadocs
              </a>{" "}
              🚀
            </p>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
