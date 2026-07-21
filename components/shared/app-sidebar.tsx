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
} from "@/components/ui/sidebar";
import { HomeIcon, User, LogOut, StarIcon, Bell} from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";
import { NavbarProps } from "@/types/types";
import { useUserMenuAction } from "../_actions/handleUserMenuAction";


const menuItems = [
  { title: "Home", url: "/dashboard", icon: HomeIcon },
  { title: "Auth Dashboard", url: "/author-dashboard", icon: HomeIcon },
  { title: "Admin Dashboard", url: "/admin-dashboard", icon: HomeIcon },
]

const footerProfileItems = [
    { title: "Upgrade to Pro", url: "/upgrade-pro", icon: StarIcon, newLine: true  },
    { title: "Profile", url: "/profile", icon: User },
    { title: "Notifications", url: "/notification", icon: Bell, newLine: true },
]



export function AppSidebar({user} : NavbarProps) {
    const { handleUserMenuAction } = useUserMenuAction();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1 font-semibold">
          <div className="h-6 w-6 rounded bg-primary" />
          <span>GearUp App</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Rental</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
                {menuItems.map((item) => {
                    const IconComponent = item.icon
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    <IconComponent />
                                    {item.title}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="py-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                    <div className="flex items-center gap-2 px-2 py-1">
                        <User className="h-8 w-8 rounded" />
                        <div className="ml-4">
                            <p className="font-semibold">{user ? user.data?.name : "User Name Not Found"}</p>
                            <p>{user ? user.data?.email : "User Email Not Found"}</p>
                        </div>
                    </div>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                    <div className="flex items-center gap-2 px-2 py-1">
                        <User className="h-8 w-8 rounded" />
                        <div className="ml-4">
                            <p className="font-semibold">{user ? user.data?.name : "User Name Not Found"}</p>
                            <p>{user ? user.data?.email : "User Email Not Found"}</p>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    {footerProfileItems.map((item) => {
                        const IconComponent = item.icon
                        return(
                            <React.Fragment key={item.title}>
                                <DropdownMenuItem>
                                    <Link href={item.url} className="flex items-center gap-2 w-full">
                                        <IconComponent className="h-4 w-4 rounded" />
                                        <div className="ml-1">
                                            <span>{item.title}</span>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>

                                {item.newLine && <DropdownMenuSeparator />}
                            </React.Fragment>
                        )
                    })}

                    <DropdownMenuItem onClick={() => handleUserMenuAction("logout")}>
                        <div className="flex items-center gap-2 w-full">
                            <LogOut />
                            <div className="ml-1">
                                <span>Logout</span>
                            </div>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
