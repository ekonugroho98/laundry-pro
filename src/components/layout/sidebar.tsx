"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, ShoppingBag, Tag, Settings, LogOut } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Services", href: "/services", icon: Tag },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 border-r border-[rgb(var(--swiss-rule))] bg-[rgb(var(--swiss-paper-2))] min-h-screen">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-[rgb(var(--swiss-rule))]">
        <span className="swiss-headline text-lg tracking-tight font-medium text-[rgb(var(--swiss-ink))]">LaundryPro</span>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="flex-1 space-y-1 px-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))] font-medium"
                    : "text-[rgb(var(--swiss-muted))] hover:bg-[rgb(var(--swiss-rule))] hover:text-[rgb(var(--swiss-ink))]",
                  "group flex items-center px-3 py-2 text-sm transition-colors rounded-none"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-[rgb(var(--swiss-paper))]" : "text-[rgb(var(--swiss-muted))] group-hover:text-[rgb(var(--swiss-ink))]",
                    "mr-3 flex-shrink-0 h-4 w-4"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-shrink-0 border-t border-[rgb(var(--swiss-rule))] p-4">
        <button className="group flex w-full items-center px-3 py-2 text-sm text-[rgb(var(--swiss-muted))] hover:bg-[rgb(var(--swiss-rule))] hover:text-[rgb(var(--swiss-ink))] transition-colors">
          <LogOut className="mr-3 h-4 w-4 text-[rgb(var(--swiss-muted))] group-hover:text-[rgb(var(--swiss-ink))]" />
          Logout
        </button>
      </div>
    </div>
  );
}
