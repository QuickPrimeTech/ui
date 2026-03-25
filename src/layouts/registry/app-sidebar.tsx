"use client";
import {
  Blocks,
  ChevronRight,
  Component,
  Home,
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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
  { title: "Home", path: "/", icon: Home },
  { title: "Design Tokens", path: "/tokens", icon: Home },
];

type RegistryItem = { title?: string; name: string };

function match(item: RegistryItem, q: string) {
  return (item.title ?? item.name).toLowerCase().includes(q);
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpenMobile, state } = useSidebar();
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
        <div className="flex items-center gap-2 px-2 py-4 group-data-[collapsible=icon]:justify-center">
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <Logo />
            <span className="text-xl font-bold truncate group-data-[collapsible=icon]:hidden">
              Prime UI
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden"
            onClick={() => setOpenMobile(false)}
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="px-2 group-data-[collapsible=icon]:hidden">
          <InputGroup>
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full">
          <SidebarMenu>
            {navSections.map(({ label, icon: Icon, items }) => (
              <Collapsible
                key={label}
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={label}>
                      <Icon className="size-4" />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {label}
                      </span>
                      <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="group-data-[collapsible=icon]:hidden">
                      {items.map((item) => (
                        <SidebarMenuSubItem key={item.name}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === item.href}
                          >
                            <Link href={item.href}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-2">
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
