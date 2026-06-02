"use client";

import { SwissTable, TableColumn } from "@/components/ui/table";
import { SwissBadge } from "@/components/ui/badge";
import Link from "next/link";

type Order = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: string;
  customer: { name: string };
  items: { service: { name: string } }[];
};

export function OrdersTable({ orders }: { orders: Order[] }) {
  const columns: TableColumn<Order>[] = [
    { 
      key: "orderNumber", 
      header: "Order ID", 
      cell: (row) => (
        <Link href={`/orders/${row.id}`} className="swiss-mono text-[rgb(var(--swiss-ink))] hover:underline">
          {row.orderNumber}
        </Link>
      )
    },
    { key: "customer", header: "Customer", cell: (row) => <span className="font-medium">{row.customer.name}</span> },
    { 
      key: "items", 
      header: "Services", 
      cell: (row) => (
        <span className="text-sm text-[rgb(var(--swiss-muted))] truncate max-w-[200px] block">
          {row.items.map(i => i.service.name).join(", ")}
        </span>
      )
    },
    { 
      key: "status", 
      header: "Status", 
      cell: (row) => {
        const tone = row.status === "DELIVERED" || row.status === "READY" ? "accent" : 
                     row.status === "PROCESSING" ? "ink" : "outline";
        return <SwissBadge tone={tone}>{row.status}</SwissBadge>;
      }
    },
    { 
      key: "paymentStatus", 
      header: "Payment", 
      cell: (row) => (
        <SwissBadge tone={row.paymentStatus === "PAID" ? "accent" : "outline"}>
          {row.paymentStatus}
        </SwissBadge>
      )
    },
    { 
      key: "totalAmount", 
      header: "Total", 
      align: "right",
      cell: (row) => <span className="swiss-mono font-medium">Rp {row.totalAmount.toLocaleString()}</span> 
    },
    { 
      key: "createdAt", 
      header: "Date", 
      align: "right",
      cell: (row) => <span className="swiss-eyebrow">{new Date(row.createdAt).toLocaleDateString()}</span> 
    },
  ];

  return <SwissTable columns={columns} data={orders} rowKey={(row) => row.id} />;
}
