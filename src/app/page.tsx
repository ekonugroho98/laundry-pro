import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/layout/sidebar";
import { SwissStatCard } from "@/components/ui/stat-card";
import { SwissButton } from "@/components/ui/button";
import { ShoppingBag, Users, Clock, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table";

export default async function DashboardPage() {
  const stats = [
    { label: "Total Revenue", value: "Rp 1.250.000", icon: TrendingUp, trend: "+12%" },
    { label: "Active Orders", value: "18", icon: ShoppingBag, trend: "4 pending" },
    { label: "New Customers", value: "12", icon: Users, trend: "+2 today" },
    { label: "Avg. Process Time", value: "24h", icon: Clock, trend: "-2h from last week" },
  ];

  const recentOrders = await prisma.order.findMany({
    take: 5,
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });

  // Convert to serializable format for client component
  const serializableOrders = recentOrders.map(o => ({
    ...o,
    createdAt: o.createdAt.toISOString()
  }));

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <header className="flex justify-between items-end mb-12">
            <div>
              <p className="swiss-eyebrow mb-2">Overview / 01</p>
              <h1 className="swiss-display text-4xl">Dashboard</h1>
            </div>
            <Link href="/orders/new">
              <SwissButton size="lg" className="h-14 px-8">
                <Plus className="mr-2 h-5 w-5" />
                New Order
              </SwissButton>
            </Link>
          </header>

          <section className="swiss-grid mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="col-span-12 md:col-span-6 lg:col-span-3">
                <SwissStatCard
                  label={stat.label}
                  value={stat.value}
                  delta={stat.trend}
                  trend={stat.trend.includes("+") ? "up" : stat.trend.includes("-") ? "down" : "flat"}
                />
              </div>
            ))}
          </section>

          <section className="border-t border-[rgb(var(--swiss-rule))] pt-12">
            <div className="flex justify-between items-baseline mb-6">
              <h2 className="swiss-headline text-2xl uppercase tracking-tight">Recent Activity</h2>
              <Link href="/orders" className="swiss-eyebrow hover:text-[rgb(var(--swiss-ink))] transition-colors border-b border-[rgb(var(--swiss-rule))]">
                View all orders
              </Link>
            </div>

            <RecentOrdersTable orders={serializableOrders} />
          </section>
        </div>
      </main>
    </div>
  );
}
