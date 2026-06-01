import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@laundrypro.com' },
    update: {},
    create: {
      email: 'admin@laundrypro.com',
      name: 'Admin',
      role: 'ADMIN',
    },
  })

  // Create Services
  const services = [
    { name: 'Cuci Komplit (Reguler)', price: 6000, unit: 'kg' },
    { name: 'Cuci Komplit (Kilat 1 Hari)', price: 10000, unit: 'kg' },
    { name: 'Cuci Komplit (Express 6 Jam)', price: 15000, unit: 'kg' },
    { name: 'Cuci Kering', price: 4000, unit: 'kg' },
    { name: 'Setrika Saja', price: 4000, unit: 'kg' },
    { name: 'Bed Cover (Besar)', price: 25000, unit: 'piece' },
    { name: 'Bed Cover (Kecil)', price: 15000, unit: 'piece' },
    { name: 'Jas / Safari', price: 20000, unit: 'piece' },
  ]

  for (const s of services) {
    await prisma.service.create({ data: s })
  }

  // Create Customers
  const cust1 = await prisma.customer.create({
    data: { name: 'Budi Santoso', phone: '081234567890', address: 'Jl. Merdeka 1' }
  })
  const cust2 = await prisma.customer.create({
    data: { name: 'Siti Aminah', phone: '089876543210', address: 'Jl. Sudirman 10' }
  })

  // Create Sample Order
  const svc = await prisma.service.findFirst({ where: { name: 'Cuci Komplit (Reguler)' } })
  if (svc) {
    await prisma.order.create({
      data: {
        orderNumber: 'ORD-20260601-001',
        customerId: cust1.id,
        status: 'PROCESSING',
        paymentStatus: 'UNPAID',
        totalAmount: 3 * svc.price,
        items: {
          create: [{ serviceId: svc.id, quantity: 3, subtotal: 3 * svc.price }]
        }
      }
    })
  }
  
  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
