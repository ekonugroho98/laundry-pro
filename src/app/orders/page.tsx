import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/layout/sidebar";
import { SwissButton } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { OrdersTable } from "@/components/orders/orders-table";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: { customer: true, items: { include: { service: true } } },
    orderBy: { createdAt: "desc" },
  });

  const serializableOrders = orders.map(o => ({
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
              <p className="swiss-eyebrow mb-2">Operations / 02</p>
              <h1 className="swiss-display text-4xl">Orders</h1>
            </div>
            <Link href="/orders/new">
              <SwissButton size="lg" className="h-14 px-8">
                <Plus className="mr-2 h-5 w-5" />
                New Order
              </SwissButton>
            </Link>
          </header>

          <section>
            <OrdersTable orders={serializableOrders} />
          </section>
        </div>
      </main>
    </div>
  );
}
