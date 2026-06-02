"use client";

import { useState, use } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { SwissButton } from "@/components/ui/button";
import { SwissBadge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function OrderDetailPage({
  params,
}: PageProps) {
  const router = useRouter();
  const orderId = params.id;

  // Mock order data
  const order = {
    id: orderId,
    customer: "Customer " + orderId,
    items: [
      { name: "Premium Wash & Fold", price: 150000, quantity: 3 },
      { name: "Dry Cleaning", price: 50000, quantity: 2 },
    ],
    total: 650000,
    status: "processing",
    createdAt: "2024-01-15T10:30:00Z",
    notes: "Express service requested",
  };

  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSelectedStatus(newStatus);
    setIsUpdating(false);
  };

  const statuses = [
    { value: "pending", label: "Pending", color: "swiss-muted" },
    { value: "processing", label: "Processing", color: "swiss-info" },
    { value: "ready", label: "Ready", color: "swiss-warning" },
    { value: "delivered", label: "Delivered", color: "swiss-accent" },
  ];

  const getStatusColor = (status: string) => {
    const map: Record<string, "outline" | "ink" | "mono" | "accent"> = {
      pending: "outline",
      processing: "accent",
      ready: "ink",
      delivered: "mono",
    };
    return map[status] ?? "outline";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <div className="max-w-3xl mx-auto px-8 py-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="swiss-eyebrow mb-2">Detail / 01</p>
              <h1 className="swiss-display text-4xl uppercase">
                Order #{orderId}
              </h1>
            </div>
            <SwissButton variant="outline" onClick={() => router.back()}>
              ← Back
            </SwissButton>
          </div>

          <div className="space-y-6">
            {/* Order Header */}
            <div className="border border-[rgb(var(--swiss-rule))] p-6 rounded-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="swiss-eyebrow mb-1">Customer</p>
                  <p className="text-lg font-medium">{order.customer}</p>
                </div>
                <SwissBadge tone={getStatusColor(selectedStatus)}>
                  {statuses.find(s => s.value === selectedStatus)?.label || selectedStatus}
                </SwissBadge>
              </div>
              <p className="swiss-eyebrow mb-1">Order Date</p>
              <p className="text-sm text-[rgb(var(--swiss-muted))]">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Status Update */}
            <div className="border border-[rgb(var(--swiss-rule))] p-6 rounded-md">
              <p className="swiss-eyebrow mb-3">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => handleStatusChange(status.value)}
                    disabled={isUpdating}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      selectedStatus === status.value
                        ? "bg-[rgb(var(--swiss-surface))] border-[rgb(var(--swiss-ink))]"
                        : "border-[rgb(var(--swiss-rule))] hover:border-[rgb(var(--swiss-rule-strong))]"
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
              {isUpdating && (
                <p className="text-sm text-[rgb(var(--swiss-accent))] mt-2">
                  Updating...
                </p>
              )}
            </div>

            {/* Order Items */}
            <div className="border border-[rgb(var(--swiss-rule))] p-6 rounded-md">
              <p className="swiss-eyebrow mb-4">Order Items</p>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-[rgb(var(--swiss-muted))]">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[rgb(var(--swiss-rule))] pt-3 mt-4 flex justify-between">
                <p className="font-bold">Total</p>
                <p className="swiss-display text-xl">{formatPrice(order.total)}</p>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="border border-[rgb(var(--swiss-rule))] p-6 rounded-md">
                <p className="swiss-eyebrow mb-2">Special Notes</p>
                <p className="text-sm text-[rgb(var(--swiss-muted))]">{order.notes}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
