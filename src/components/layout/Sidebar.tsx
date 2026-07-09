"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Scale,
  Wallet,
  Plane,
  FileText,
  Calendar,
  Settings,
  HelpCircle,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Packing", href: "/packing", icon: Package },
  { name: "Shopping", href: "/shopping", icon: ShoppingCart },
  { name: "Weight Calculator", href: "/weight", icon: Scale },
  { name: "Budget", href: "/budget", icon: Wallet },
  { name: "Travel Planner", href: "/travel", icon: Plane },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Timeline", href: "/timeline", icon: Calendar },
];

const BOTTOM_NAV_ITEMS = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "About", href: "/about", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-col border-r border-border/50 bg-background/50 backdrop-blur-xl hidden md:flex h-screen sticky top-0 left-0 z-40">
      <div className="h-14 flex items-center px-6 border-b border-border/50">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <div className="size-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
            <Plane className="size-4" />
          </div>
          PackWise AI
        </div>
      </div>
      
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-border/50">
        <nav className="grid gap-1">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
