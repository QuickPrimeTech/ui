"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

type NavItem = {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
  badge?: string;
};

type AppHeaderProps = {
  className?: string;
};

const navigation: NavItem[] = [
  {
    title: "Tokens",
    href: "/tokens",
    description: "Design tokens reference",
    badge: "New",
  },
  { title: "Examples", href: "/examples", description: "Real-world examples" },
];

const resources: NavItem[] = [
  {
    title: "GitHub",
    href: "https://github.com/QuickPrimeTech/ui",
    external: true,
  },
];

export function AppHeader({ className }: AppHeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 rounded-b-xl",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b"
          : "bg-transparent",
        className,
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-3 items-center">
            <SidebarTrigger />
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5 group">
                <Logo />
                <span className="hidden sm:inline-block font-semibold text-lg tracking-tight">
                  Prime UI
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {navigation.map((item) => (
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    key={item.href}
                    asChild
                  >
                    <Link href={item.href}>
                      <span className="flex items-center gap-1.5">
                        {item.title}
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="h-4 px-1 text-[10px]"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </span>
                      {isActive(item.href) && (
                        <span className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-primary to-transparent" />
                      )}
                    </Link>
                  </Button>
                ))}
              </nav>
            </div>
          </div>
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ModeToggle />

            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-1.5 items-center justify-between cursor-pointer"
              >
                {resource.title}
                <ExternalLink className="h-3 w-3 opacity-50" />
              </Link>
            ))}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="px-4 rounded-l-xl w-full sm:w-80"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Logo className="size-8" />
                    Prime UI
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-1 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                        isActive(item.href)
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-[10px]">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}

                  <div className="my-4 border-t" />

                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Resources
                  </div>
                  {resources.map((resource) => (
                    <Link
                      key={resource.title}
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>{resource.title}</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
