"use client";

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  LogOut,
  StarIcon,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  ShoppingBag
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { NavbarProps } from "@/lib/types/types";
import { useUserMenuAction } from "../_actions/handleUserMenuAction";
import { NavGroup } from "@/lib/types/navbar-types";
import { sidebarMenuItems } from "@/app/(dashboardGroup)/_config/customerSideBarItems";

const footerProfileItems = [
  { title: "Upgrade to Pro", url: "/upgrade-pro", icon: StarIcon, newLine: true },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Notifications", url: "/notification", icon: Bell, newLine: true },
];

export function AppSidebar({ user }: NavbarProps) {
  const { handleUserMenuAction } = useUserMenuAction();

  let navGroups: NavGroup[] = [];

  switch (user?.data?.role) {
    case "ADMIN":
      navGroups=sidebarMenuItems.ADMIN;
      break;
    case "PROVIDER":
      navGroups=sidebarMenuItems.PROVIDER;
      break;
    case "CUSTOMER":
      navGroups=sidebarMenuItems.CUSTOMER;
      break;
    default:
      navGroups=[];
      break
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={"/"}>
          <div className="flex items-center gap-2 px-2 py-1 font-semibold">
              <div className="h-6 w-6 rounded bg-primary" />
              <span>GearUp App</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.groupLabel}>
            <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const ItemIcon = item.icon;

                  // Render collapsible dropdown for items with children (e.g., Gears)
                  if (item.children) {
                    return (
                      <Collapsible key={item.title} asChild className="group/collapsible">
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={item.title}>
                              <ItemIcon />
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children.map((subItem) => {
                                const SubIcon = subItem.icon;
                                return (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                      <Link href={subItem.url}>
                                        <SubIcon className="h-4 w-4" />
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  }

                  // Standard top-level navigation link
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <Link href={item.url ?? "#"}>
                          <ItemIcon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div className="flex items-center gap-3 w-full">
                    <User className="h-8 w-8 rounded-full border p-1" />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.data?.name ?? "User Name"}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user?.data?.email ?? "user@example.com"}
                      </span>
                    </div>
                    <ChevronsUpDown />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="top"
                align="end"
                sideOffset={4}
              >
                <div className="flex items-center gap-3 p-2">
                  <User className="h-8 w-8 rounded-full border p-1" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.data?.name ?? "User Name"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.data?.email ?? "user@example.com"}
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {footerProfileItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <React.Fragment key={item.title}>
                      <DropdownMenuItem asChild>
                        <Link href={item.url} className="flex items-center gap-2 w-full cursor-pointer">
                          <IconComponent className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </DropdownMenuItem>
                      {item.newLine && <DropdownMenuSeparator />}
                    </React.Fragment>
                  );
                })}
                <DropdownMenuItem
                  onClick={() => handleUserMenuAction("logout")}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}