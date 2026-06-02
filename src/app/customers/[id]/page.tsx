"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { SwissButton } from "@/components/ui/button";
import { SwissTextarea } from "@/components/ui/textarea";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function CustomerDetailPage(props: PageProps) {
  const router = useRouter();
  const params = use(props.params);
  const searchParams = use(props.searchParams);
  
  const query = typeof searchParams.q === "string" ? searchParams.q : "";
  const customerId = params.id;

  // Mock data - replace with Prisma fetch later
  const [mockCustomer] = useState(() => ({
    id: customerId,
    name: "Customer " + customerId,
    email: "customer" + customerId + "@example.com",
    phone: "+62 812 " + (1000 + parseInt(customerId)),
    ordersCount: parseInt(customerId) % 15, // deterministic mock count
  }));

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
            <SwissButton variant="outline" onClick={() => router.back()}>
              ← Back
            </SwissButton>
          </div>

          <div className="space-y-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[rgb(var(--swiss-rule))] p-6 rounded-md">
                <p className="swiss-eyebrow mb-1">Basic Info</p>
                <p className="text-lg font-medium">{mockCustomer.name}</p>
                <p className="swiss-eyebrow mt-1">Email</p>
                <p className="text-sm text-[rgb(var(--swiss-muted))]">{mockCustomer.email}</p>
                <p className="swiss-eyebrow mt-2">Phone</p>
                <p className="text-sm text-[rgb(var(--swiss-muted))]">{mockCustomer.phone}</p>
              </div>

              <div className="border border-[rgb(var(--swiss-rule))] p-6 rounded-md">
                <p className="swiss-eyebrow mb-1">Orders</p>
                <p className="text-sm text-[rgb(var(--swiss-muted))]">
                  {mockCustomer.ordersCount} active order(s)
                </p>
              </div>
            </div>

            <div className="border border-[rgb(var(--swiss-rule))] p-6 rounded-md">
              <p className="swiss-eyebrow mb-2">Search Orders</p>
              <SwissTextarea
                placeholder="Filter orders by status, date, etc."
                value={query}
                onChange={(e) => {
                  const newQuery = e.target.value;
                  if (newQuery.trim() === "") {
                    router.push(`/customers/${customerId}`);
                  } else {
                    router.push(`/customers/${customerId}?q=${encodeURIComponent(newQuery)}`);
                  }
                }}
              />
            </div>

            {query && (
              <div className="border-t border-[rgb(var(--swiss-rule))] pt-4 mt-4">
                <p className="swiss-display text-lg uppercase mb-4">
                  Results for &quot;{query}&quot;
                </p>
                <p className="text-[rgb(var(--swiss-muted))]">
                  (Mock search - show order history filtered by query)
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}