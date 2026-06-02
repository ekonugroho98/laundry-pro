import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/layout/sidebar";
import { SwissButton } from "@/components/ui/button";
import { SwissInput } from "@/components/ui/input";
import { Plus } from "lucide-react";

export default async function NewOrderPage() {
  const services = await prisma.service.findMany({ where: { isActive: true } });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <div className="max-w-3xl mx-auto px-8 py-8">
          <header className="mb-8">
            <p className="swiss-eyebrow mb-2">Orders / 01</p>
            <h1 className="swiss-display text-4xl">Create New Order</h1>
          </header>

          <form action="/orders/new/action" method="POST" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="swiss-eyebrow">Customer Name</label>
                <SwissInput name="customerName" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <label className="swiss-eyebrow">Phone</label>
                <SwissInput name="customerPhone" placeholder="08123456789" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="swiss-eyebrow">Service</label>
              <select
                name="serviceId"
                className="block w-full border border-[rgb(var(--swiss-rule))] bg-[rgb(var(--swiss-paper))] text-[rgb(var(--swiss-ink))] p-2"
                required
              >
                {services.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.name} – Rp {svc.price.toLocaleString()}/{svc.unit}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="swiss-eyebrow">Quantity (kg/pcs)</label>
                <SwissInput name="quantity" type="number" step="0.1" min="0.1" placeholder="3.5" required />
              </div>
              <div className="space-y-2">
                <label className="swiss-eyebrow">Notes (optional)</label>
                <SwissInput name="notes" placeholder="Layanan khusus…" />
              </div>
            </div>

          <SwissButton variant="primary" className="w-full md:w-auto px-12">
              <Plus className="mr-2 h-5 w-5" />
              Submit Order
            </SwissButton>
          </form>
        </div>
      </main>
    </div>
  );
}
