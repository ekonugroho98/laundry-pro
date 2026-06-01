"use client";

import { SwissStatCard } from "@/components/ui/stat-card";
import { SwissTable } from "@/components/ui/table";
import { SwissCard, SwissCardTitle } from "@/components/ui/card";
import { format } from "date-fns";

type OrderRow = {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  customerName: string;
};

type DashboardClientProps = {
  orderCount: number;
  customerCount: number;
  totalRevenue: number;
  recentOrders: OrderRow[];
};

export function DashboardClient({
  orderCount,
  customerCount,
  totalRevenue,
  recentOrders,
}: DashboardClientProps) {
  const stats = [
    {
      label: "Total Orders",
      value: orderCount.toString(),
      delta: "12%",
      trend: "up" as const,
    },
    {
      label: "Total Customers",
      value: customerCount.toString(),
      delta: "5%",
      trend: "up" as const,
    },
    {
      label: "Revenue",
      value: `Rp ${(totalRevenue / 1000).toFixed(0)}k`,
      delta: "8%",
      trend: "up" as const,
    },
    {
      label: "Active Services",
      value: "4",
      trend: "flat" as const,
    },
  ];

  const columns = [
    {
      key: "orderNumber",
      header: "Order #",
      cell: (row: OrderRow) => <span className="swiss-mono font-bold">{row.orderNumber}</span>,
    },
    {
      key: "customerName",
      header: "Customer",
    },
    {
      key: "status",
      header: "Status",
      cell: (row: OrderRow) => (
        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-swiss-rule-strong">
          {row.status}
        </span>
      ),
    },
    {
      key: "totalAmount",
      header: "Total",
      align: "right" as const,
      cell: (row: OrderRow) => `Rp ${row.totalAmount.toLocaleString()}`,
    },
    {
      key: "createdAt",
      header: "Date",
      align: "right" as const,
      cell: (row: OrderRow) => format(new Date(row.createdAt), "MMM d, HH:mm"),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="swiss-heading text-4xl">Dashboard</h1>
        <p className="swiss-label mt-1 text-base">Overview of your laundry business operations.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <SwissStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <SwissCard eyebrow="Recent Activity">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <SwissCardTitle>Recent Orders</SwissCardTitle>
            <button className="text-xs font-bold uppercase tracking-widest text-swiss-accent hover:underline">
              View All
            </button>
          </div>
          <SwissTable
            data={recentOrders}
            columns={columns}
            rowKey={(row) => row.id}
          />
        </div>
      </SwissCard>
    </div>
  );
}
