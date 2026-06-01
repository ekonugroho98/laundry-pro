import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/layout/sidebar";
import { SwissButton } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { SwissInput } from "@/components/ui/input";
import { SwissTable, TableColumn } from "@/components/ui/table";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    include: { _count: { select: { orders: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <header className="flex justify-between items-end mb-12">
            <div>
              <p className="swiss-eyebrow mb-2">Registry / 03</p>
              <h1 className="swiss-display text-4xl">Customers</h1>
            </div>
            <SwissButton size="lg" className="h-14 px-8">
              <Plus className="mr-2 h-5 w-5" /> Add Customer
            </SwissButton>
          </header>

          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--swiss-muted))]" />
            <SwissInput placeholder="Search customers by name or phone..." className="pl-12 h-14 bg-[rgb(var(--swiss-paper-2))] border-[rgb(var(--swiss-rule))]" />
          </div>

          <table className="w-full border-collapse bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule))]">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 swiss-eyebrow border-b border-[rgb(var(--swiss-rule))]">Name</th>
                <th className="text-left py-4 px-6 swiss-eyebrow border-b border-[rgb(var(--swiss-rule))]">Phone</th>
                <th className="text-left py-4 px-6 swiss-eyebrow border-b border-[rgb(var(--swiss-rule))]">Address</th>
                <th className="text-right py-4 px-6 swiss-eyebrow border-b border-[rgb(var(--swiss-rule))]">Total Orders</th>
                <th className="text-right py-4 px-6 swiss-eyebrow border-b border-[rgb(var(--swiss-rule))]">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--swiss-rule))] text-sm">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-[rgb(var(--swiss-paper-2))] transition-colors">
                  <td className="py-4 px-6 font-medium">{c.name}</td>
                  <td className="py-4 px-6 swiss-mono">{c.phone}</td>
                  <td className="py-4 px-6 text-[rgb(var(--swiss-muted))]">{c.address || "—"}</td>
                  <td className="py-4 px-6 text-right swiss-mono">{c._count.orders}</td>
                  <td className="py-4 px-6 text-right swiss-eyebrow">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
