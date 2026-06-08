import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/layout/sidebar";
import { SwissButton } from "@/components/ui/button";
import { SwissTextarea } from "@/components/ui/textarea";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CustomerDetailPage(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const query = typeof searchParams.q === "string" ? searchParams.q : "";
  const customerId = params.id;

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      orders: {
        where: query ? {
          OR: [
            { orderNumber: { contains: query, mode: "insensitive" } },
            { status: { contains: query, mode: "insensitive" } }
          ]
        } : undefined,
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!customer) {
    notFound();
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <div className="max-w-3xl mx-auto px-8 py-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="swiss-eyebrow mb-2">Detail / 05</p>
              <h1 className="swiss-display text-4xl uppercase">
                Customer Detail
              </h1>
            </div>
            <Link href="/customers">
              <SwissButton variant="outline">
                ← Back
              </SwissButton>
            </Link>
          </div>

          <div className="space-y-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[rgb(var(--swiss-rule))] p-6 rounded-md">
                <p className="swiss-eyebrow mb-1">Basic Info</p>
                <p className="text-lg font-medium">{customer.name}</p>
                <p className="swiss-eyebrow mt-1">Email</p>
                <p className="text-sm text-[rgb(var(--swiss-muted))]">{customer.email || "-"}</p>
                <p className="swiss-eyebrow mt-2">Phone</p>
                <p className="text-sm text-[rgb(var(--swiss-muted))]">{customer.phone}</p>
              </div>

              <div className="border border-[rgb(var(--swiss-rule))] p-6 rounded-md">
                <p className="swiss-eyebrow mb-1">Orders</p>
                <p className="text-sm text-[rgb(var(--swiss-muted))]">
                  {customer.orders.length} order(s)
                </p>
              </div>
            </div>

            <div className="border border-[rgb(var(--swiss-rule))] p-6 rounded-md">
              <p className="swiss-eyebrow mb-2">Search Orders</p>
              {/* Form is needed for server-side search without client JS in this file */}
              <form method="GET" action={`/customers/${customerId}`}>
                <div className="flex gap-2">
                  <SwissTextarea
                    name="q"
                    placeholder="Filter orders by status, order number..."
                    defaultValue={query}
                    className="h-10 min-h-0"
                  />
                  <SwissButton type="submit" variant="default" className="h-10">Search</SwissButton>
                </div>
              </form>
            </div>

            {query && (
              <div className="border-t border-[rgb(var(--swiss-rule))] pt-4 mt-4">
                <p className="swiss-display text-lg uppercase mb-4">
                  Results for &quot;{query}&quot;
                </p>
              </div>
            )}

            {customer.orders.length > 0 ? (
              <div className="border border-[rgb(var(--swiss-rule))] overflow-hidden rounded-md">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[rgb(var(--swiss-muted))] text-[rgb(var(--swiss-paper))]">
                    <tr>
                      <th className="px-4 py-3 font-medium uppercase tracking-wider text-xs">Order ID</th>
                      <th className="px-4 py-3 font-medium uppercase tracking-wider text-xs">Date</th>
                      <th className="px-4 py-3 font-medium uppercase tracking-wider text-xs">Status</th>
                      <th className="px-4 py-3 font-medium uppercase tracking-wider text-xs text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgb(var(--swiss-rule))]">
                    {customer.orders.map((order) => (
                      <tr key={order.id} className="hover:bg-[rgb(var(--swiss-rule))]/5 transition-colors">
                        <td className="px-4 py-3">
                          <Link href={`/orders/${order.id}`} className="hover:underline">
                            {order.orderNumber}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-[rgb(var(--swiss-muted))]">
                          {order.createdAt.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            order.status === "DELIVERED" ? "bg-green-100 text-green-800" :
                            order.status === "READY" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {formatPrice(order.totalAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-[rgb(var(--swiss-muted))] border border-[rgb(var(--swiss-rule))] rounded-md">
                No orders found.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}