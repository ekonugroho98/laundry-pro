"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { SwissButton } from "@/components/ui/button";
import { SwissBadge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { updateOrderAction, deleteOrderAction } from "./action";

interface OrderItem {
  id: string;
  serviceId: string;
  quantity: number;
  subtotal: number;
  service: {
    name: string;
    price: number;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
  };
  items: OrderItem[];
}

export default function OrderDetailPage() {
  const router = useRouter();
  const { id: orderIdParam } = useParams<{ id: string }>();
  const orderId = orderIdParam ?? "";

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedStatus, setEditedStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  const statuses = [
    { value: "PENDING", label: "Pending" },
    { value: "PROCESSING", label: "Processing" },
    { value: "READY", label: "Ready" },
    { value: "DELIVERED", label: "Delivered" },
  ];

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    if (!orderId) {
      setError("Order ID not provided");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      const data = await res.json();
      setOrder(data);
      setEditedStatus(data.status);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): "outline" | "ink" | "accent" | "mono" => {
    const map: Record<string, "outline" | "ink" | "accent" | "mono"> = {
      PENDING: "outline",
      PROCESSING: "accent",
      READY: "ink",
      DELIVERED: "mono",
    };
    return map[status] ?? "outline";
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;
    setIsUpdating(true);
    try {
      const result = await updateOrderAction({ status: newStatus }, orderId);
      if (result.success) {
        setOrder({ ...order, status: newStatus });
        setEditedStatus(newStatus);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!order) return;
    if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return;
    }
    setIsDeleting(true);
    try {
      const result = await deleteOrderAction(orderId);
      if (result.success) {
        router.push("/orders");
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveEdits = async () => {
    if (!order) return;
    setIsUpdating(true);
    try {
      const result = await updateOrderAction({ status: editedStatus }, orderId);
      if (result.success) {
        setOrder({ ...order, status: editedStatus });
        setEditMode(false);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
          <div className="max-w-4xl mx-auto px-8 py-12">
            <p>Loading order details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
          <div className="max-w-4xl mx-auto px-8 py-12">
            <p className="text-red-500">Error: {error || "Order not found"}</p>
            <SwissButton onClick={() => router.push("/orders")} className="mt-4">
              Back to Orders
            </SwissButton>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="swiss-eyebrow mb-2">Operations / 01</p>
              <h1 className="swiss-display text-4xl">Order #{order.orderNumber}</h1>
            </div>
            <div className="flex gap-3">
              <SwissButton variant="outline" onClick={() => setEditMode(!editMode)}>
                {editMode ? "Cancel Edit" : "Edit Order"}
              </SwissButton>
              <SwissButton 
                variant="destructive" 
                onClick={handleDelete} 
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Order"}
              </SwissButton>
              <SwissButton variant="outline" onClick={() => router.push("/orders")}>
                ← Back to Orders
              </SwissButton>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 border border-[rgb(var(--swiss-accent))] bg-[rgb(var(--swiss-accent)/10)] text-[rgb(var(--swiss-accent))]">
              {error}
              <button onClick={() => setError(null)} className="ml-4 underline">Dismiss</button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Info */}
              <div className="border border-[rgb(var(--swiss-rule))] p-6">
                <p className="swiss-eyebrow mb-3">Customer Information</p>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {order.customer.name}</p>
                  <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
                  <p><span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</p>
                </div>
              </div>

              {/* Order Status */}
              <div className="border border-[rgb(var(--swiss-rule))] p-6">
                <p className="swiss-eyebrow mb-3">Order Status</p>
                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Update Status:</p>
                      <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                          <button
                            key={status.value}
                            onClick={() => setEditedStatus(status.value)}
                            disabled={isUpdating}
                            className={`px-4 py-2 border text-sm transition-colors ${
                              editedStatus === status.value
                                ? "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))]"
                                : "border-[rgb(var(--swiss-rule))] hover:border-[rgb(var(--swiss-rule-strong))]"
                            }`}
                          >
                            {status.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <SwissButton onClick={handleSaveEdits} disabled={isUpdating}>
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </SwissButton>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <SwissBadge tone={getStatusColor(order.status)}>
                      {order.status}
                    </SwissBadge>
                    <span className="text-sm text-[rgb(var(--swiss-muted))]">
                      Payment: <span className="font-medium">{order.paymentStatus}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="border border-[rgb(var(--swiss-rule))] p-6">
                <p className="swiss-eyebrow mb-4">Order Items</p>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-3 border-b border-[rgb(var(--swiss-rule))]">
                      <div>
                        <p className="font-medium">{item.service.name}</p>
                        <p className="text-sm text-[rgb(var(--swiss-muted))]">
                          {item.quantity} x {formatPrice(item.service.price)}/kg
                        </p>
                      </div>
                      <p className="font-medium">{formatPrice(item.subtotal)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-[rgb(var(--swiss-rule))] flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <p className="swiss-display text-2xl">{formatPrice(order.totalAmount)}</p>
                </div>
              </div>
            </div>

            {/* Actions Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="border border-[rgb(var(--swiss-rule))] p-6">
                <p className="swiss-eyebrow mb-4">Quick Actions</p>
                <div className="space-y-3">
                  <SwissButton 
                    className="w-full" 
                    onClick={() => handleStatusChange("PROCESSING")}
                    disabled={order.status === "PROCESSING" || isUpdating}
                  >
                    Mark as Processing
                  </SwissButton>
                  <SwissButton 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleStatusChange("READY")}
                    disabled={order.status === "READY" || isUpdating}
                  >
                    Mark as Ready
                  </SwissButton>
                  <SwissButton 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleStatusChange("DELIVERED")}
                    disabled={order.status === "DELIVERED" || isUpdating}
                  >
                    Mark as Delivered
                  </SwissButton>
                </div>
              </div>

              {/* Payment Status */}
              <div className="border border-[rgb(var(--swiss-rule))] p-6">
                <p className="swiss-eyebrow mb-4">Payment Status</p>
                <SwissBadge tone={order.paymentStatus === "PAID" ? "accent" : "outline"}>
                  {order.paymentStatus}
                </SwissBadge>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}