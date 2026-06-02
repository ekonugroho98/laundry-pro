"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createOrder(formData: FormData) {
  const customerName = formData.get("customerName") as string;
  const customerPhone = formData.get("customerPhone") as string;
  const serviceId = formData.get("serviceId") as string;
  const quantity = parseFloat(formData.get("quantity") as string);
  const notes = formData.get("notes") as string | null;

  // 1. Find or create customer
  let customer = await prisma.customer.findFirst({ where: { phone: customerPhone } });
  if (!customer) {
    customer = await prisma.customer.create({
      data: { name: customerName, phone: customerPhone },
    });
  }

  // 2. Get service price
  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) throw new Error("Service not found");

  const subtotal = quantity * service.price;

  // 3. Create order
  const orderNumber = `ORD-${Date.now()}`;
  await prisma.order.create({
    data: {
      orderNumber,
      customerId: customer.id,
      status: "PENDING",
      paymentStatus: "UNPAID",
      totalAmount: subtotal,
      items: {
        create: [
          {
            serviceId: service.id,
            quantity,
            subtotal,
          },
        ],
      },
    },
  });

  // 4. Redirect to orders list
  redirect("/orders");
}
