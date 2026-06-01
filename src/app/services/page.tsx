import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/layout/sidebar";
import { SwissBadge } from "@/components/ui/badge";
import { SwissButton } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    include: { _count: { select: { orderItems: true } } },
    orderBy: { price: "asc" },
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <header className="flex justify-between items-end mb-12">
            <div>
              <p className="swiss-eyebrow mb-2">Configuration / 04</p>
              <h1 className="swiss-display text-4xl">Services</h1>
            </div>
            <SwissButton size="lg" className="h-14 px-8">
              <Plus className="mr-2 h-5 w-5" /> Add Service
            </SwissButton>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule))] p-6 hover:border-[rgb(var(--swiss-rule-strong))] transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="swiss-headline text-lg">{service.name}</h3>
                  <SwissBadge tone={service.isActive ? "accent" : "outline"}>
                    {service.isActive ? "Active" : "Inactive"}
                  </SwissBadge>
                </div>
                
                {service.description && (
                  <p className="text-sm text-[rgb(var(--swiss-muted))] mb-4">{service.description}</p>
                )}
                
                <div className="border-t border-[rgb(var(--swiss-rule))] pt-4 mt-4 flex justify-between items-baseline">
                  <div>
                    <p className="swiss-eyebrow mb-1">Price / {service.unit}</p>
                    <p className="swiss-display text-3xl">Rp {service.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="swiss-eyebrow mb-1">Usage</p>
                    <p className="swiss-mono text-sm">{service._count.orderItems} orders</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
