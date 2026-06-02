"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ServiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  unit: z.string().min(1, "Unit is required"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export async function createService(formData: FormData) {
  const validated = ServiceSchema.parse({
    name: formData.get("name"),
    price: formData.get("price"),
    unit: formData.get("unit"),
    description: formData.get("description"),
    isActive: formData.get("isActive") === "true",
  });

  await prisma.service.create({
    data: validated,
  });

  revalidatePath("/services");
}

export async function updateService(id: string, formData: FormData) {
  const validated = ServiceSchema.parse({
    name: formData.get("name"),
    price: formData.get("price"),
    unit: formData.get("unit"),
    description: formData.get("description"),
    isActive: formData.get("isActive") === "true",
  });

  await prisma.service.update({
    where: { id },
    data: validated,
  });

  revalidatePath("/services");
}

export async function deleteService(id: string) {
  await prisma.service.delete({
    where: { id },
  });

  revalidatePath("/services");
}

export async function toggleServiceStatus(id: string, status: boolean) {
  await prisma.service.update({
    where: { id },
    data: { isActive: status },
  });

  revalidatePath("/services");
}
