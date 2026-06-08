'use server';

import { redirect } from 'next/navigation';

interface OrderUpdateData {
  status: string;
}

interface OrderData {
  id: string;
  status: string;
  items: Array<{
    id: string;
    quantity: number;
    subtotal: number;
  }>;
  customerId: string;
  customer: {
    name: string;
    phone: string;
  };
}

// Mock database - replace with actual Prisma/Neon calls
const mockDatabase: Record<string, OrderData> = {
  'cmq4p3vaf0001l104fo0ni7yh': {
    id: 'cmq4p3vaf0001l104fo0ni7yh',
    status: 'PENDING',
    items: [
      { id: 'cmq4p3vag0003l104loc74by2', quantity: 3, subtotal: 45000 }
    ],
    customerId: 'cmpxipdk50000l6042x0zrzmv',
    customer: { name: 'test', phone: '087877344766' }
  },
  'cmq4o9srn0005l404trhkv2jk': {
    id: 'cmq4o9srn0005l404trhkv2jk',
    status: 'PENDING',
    items: [
      { id: 'cmq4o9srn0007l4041gjk2auw', quantity: 3, subtotal: 12000 }
    ],
    customerId: 'cmpxipdk50000l6042x0zrzmv',
    customer: { name: 'test', phone: '087877344766' }
  }
};

export async function updateOrderAction(data: OrderUpdateData, orderId: string) {
  try {
    // In real implementation, use Prisma:
    // await prisma.order.update({
    //   where: { id: orderId },
    //   data: { status: data.status }
    // });
    
    console.log(`Updating order ${orderId} to status: ${data.status}`);
    
    // Mock update
    if (mockDatabase[orderId]) {
      mockDatabase[orderId].status = data.status;
    }
    
    return { success: true, message: 'Order updated successfully' };
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, message: 'Failed to update order' };
  }
}

export async function deleteOrderAction(orderId: string) {
  try {
    // In real implementation, use Prisma:
    // await prisma.order.delete({
    //   where: { id: orderId }
    // });
    
    console.log(`Deleting order ${orderId}`);
    
    // Mock delete
    delete mockDatabase[orderId];
    
    return { success: true, message: 'Order deleted successfully' };
  } catch (error) {
    console.error('Error deleting order:', error);
    return { success: false, message: 'Failed to delete order' };
  }
}