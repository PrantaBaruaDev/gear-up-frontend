"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboardIcon, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserMenuAction } from "../_actions/handleUserMenuAction";

// Navigation items configuration
const navItems = [
  { label: "Home", href: "/" },
  { label: "Gear", href: "/gear" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

// User menu items configuration
const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboardIcon, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];

type IUser = {
    success : boolean,
    message : string,
    data : {
            id : string,
            name : string,
            email : string,
            status : string,
            role : string,
            created_at : string,
            updated_at : string,
            profiles : {
                id : string,
                profilePhoto : string,
                bio : string | null,
                userId : string,
                address : string,
                phone : string,
                createdAt : string,
                updatedAt : string
            }
        }
}

type NavbarProps = {
    user : IUser
}

export function Navbar({user} : NavbarProps) {
  const { handleUserMenuAction } = useUserMenuAction();

  return (
    <nav className="border-b border-border w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            <Link href="/" className="shrink-0">
            <span className="text-2xl font-bold text-primary">
              GearUp
            </span>
          </Link>
          </div>
          <div className="flex items-center gap-6">
            {/* Nav Links */}
            <div className="">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors text-sm font-medium p-4"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* User Dropdown */}
            <div>
              {
              user.success ? (
                  <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">
                      {user.data?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.data?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={() => handleUserMenuAction(item.action, user.data)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => {
                  await handleUserMenuAction("logout");
                }}>
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              ) : (<>
              <Link href={"/login"} >
                    <Button className="cursor-pointer px-8">
                          Login
                    </Button>
              </Link>
              <Link href={"/register"} >
                    <Button className="cursor-pointer px-8">
                          Register
                    </Button>
              </Link>
              </>)
            }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
