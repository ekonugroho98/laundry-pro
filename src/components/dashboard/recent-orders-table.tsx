"use client";

import { SwissTable, TableColumn } from "@/components/ui/table";
import { SwissBadge } from "@/components/ui/badge";

type Order = {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  customer: { name: string };
};

export function RecentOrdersTable({ orders }: { orders: Order[] }) {
  const columns: TableColumn<Order>[] = [
    { key: "orderNumber", header: "Order ID", cell: (row) => <span className="swiss-mono">{row.orderNumber}</span> },
    { key: "customer", header: "Customer", cell: (row) => <span className="font-medium">{row.customer.name}</span> },
    { 
      key: "status", 
      header: "Status", 
      cell: (row) => (
        <SwissBadge tone={row.status === "READY" ? "accent" : "outline"} className="rounded-none">
          {row.status}
        </SwissBadge>
      ) 
    },
    { key: "totalAmount", header: "Total", cell: (row) => <span>Rp {row.totalAmount.toLocaleString()}</span> },
    { 
      key: "createdAt", 
      header: "Date", 
      align: "right",
      cell: (row) => <span className="swiss-eyebrow">{new Date(row.createdAt).toLocaleDateString()}</span> 
    },
  ];

  return (
    <SwissTable
      columns={columns}
      data={orders}
      rowKey={(row) => row.id}
    />
  );
}
