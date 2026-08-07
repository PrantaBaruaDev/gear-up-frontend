"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserMenuAction } from "../_actions/handleUserMenuAction";
import { UsersResponse } from "@/lib/types/users-type";
import { navItems, userMenuItems } from "@/config/routes";

export function Navbar({ user }: { user: UsersResponse }) {
  const { handleUserMenuAction } = useUserMenuAction();
  const navItemsToShow = user.success
    ? [...navItems, { label: "Dashboard", href: "/dashboard" }]
    : navItems;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            GearUp
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {navItemsToShow.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {user.success ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary/20">
                    <User className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{user.data?.name}</p>
                      <p className="text-xs text-muted-foreground">{user.data?.email}</p>
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
                  <DropdownMenuItem onClick={async () => await handleUserMenuAction("logout")}>
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button size="sm" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted/70">
                  <Menu className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navItemsToShow.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                {user.success ? (
                  <>
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
                    <DropdownMenuItem onClick={async () => await handleUserMenuAction("logout")}> 
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/register">Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
