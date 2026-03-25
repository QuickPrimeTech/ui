"use client";
import {
  Blocks,
  ChevronDown,
  Component,
  Home,
  Menu,
  Search,
  ToyBrick,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getBlocks, getComponents, getUIPrimitives } from "@/lib/registry";
import { ModeToggle } from "@/components/mode-toggle";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Logo from "@/components/logo";

const uiItems = getUIPrimitives();
const componentItems = getComponents();
const blockItems = getBlocks();

export const gettingStartedItems = [
  { title: "Home", path: "/" },
  { title: "Design Tokens", path: "/tokens" },
];

type RegistryItem = { title?: string; name: string };

function match(item: RegistryItem, q: string) {
  return (item.title ?? item.name).toLowerCase().includes(q);
}

export function MobileSidebarTrigger() {
  const { setOpenMobile } = useSidebar();
  return (
    <div className="absolute top-8 right-4 md:hidden">
      <Button aria-label="Open menu" onClick={() => setOpenMobile(true)}>
        <Menu className="size-5" />
      </Button>
    </div>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");

  const q = searchTerm.toLowerCase();

  const navSections = [
    {
      label: "Getting Started",
      icon: Home,
      items: gettingStartedItems
        .filter((i) => !q || i.title.toLowerCase().includes(q))
        .map((i) => ({ name: i.path, title: i.title, href: i.path })),
    },
    {
      label: "Blocks",
      icon: Blocks,
      items: blockItems
        .filter((i) => !q || match(i, q))
        .map((i) => ({
          name: i.name,
          title: i.title ?? i.name,
          href: `/registry/${i.name}`,
        })),
    },
    {
      label: "Components",
      icon: Component,
      items: componentItems
        .filter((i) => !q || match(i, q))
        .map((i) => ({
          name: i.name,
          title: i.title ?? i.name,
          href: `/registry/${i.name}`,
        })),
    },
    {
      label: "UI Primitives",
      icon: ToyBrick,
      items: uiItems
        .filter((i) => !q || match(i, q))
        .map((i) => ({
          name: i.name,
          title: i.title ?? i.name,
          href: `/registry/${i.name}`,
        })),
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 12px 12px",
            borderBottom: "1px solid hsl(var(--sidebar-border, 240 5.9% 90%))",
          }}
        >
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <Logo />
            <p className="text-xl font-bold">Prime UI</p>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden group-data-[collapsible=icon]:hidden"
            onClick={() => setOpenMobile(false)}
          >
            <X className="size-4" />
          </Button>
        </div>

        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full w-full pr-2">
          {navSections.map(({ label, icon: Icon, items }) => (
            <Collapsible key={label} defaultOpen className="group/collapsible">
              <SidebarGroup>
                <CollapsibleTrigger className="w-full">
                  <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                    <div className="flex min-w-0 items-center">
                      <Icon className="size-4 shrink-0" />
                      <span className="ml-2 transition-all duration-200 group-data-[collapsible=icon]:hidden">
                        {label}
                      </span>
                    </div>
                    <ChevronDown className="size-4 shrink-0 transition-all duration-200 group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:hidden" />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map((item) => (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === item.href}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setOpenMobile(false)}
                            >
                              {item.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex justify-end px-2 py-1">
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
