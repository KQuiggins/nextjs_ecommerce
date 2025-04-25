import { Metadata } from 'next'
import { getOrdersForUser } from '@/lib/actions/order.actions'
import { formatCurrency, formatDateTime, shortenUUID } from '@/lib/utils'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const metadata: Metadata = {
  title: 'My Orders',
  description: 'View and manage your orders',
}

const OrdersPage = async (props: {
  searchParams: Promise<{
    page: string}>
}) => {

  const { page } = await props.searchParams

  const orders = await getOrdersForUser({
    page: Number(page) || 1,

  })

  

  return (
    <div className='space-y-2'>
      <h2 className="h2-bold">
        HEROES ORDERS
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell className='font-medium'>{shortenUUID(order.id)}</TableCell>
                <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>{order.isPaid && order.paidAt ? formatDateTime(order.paidAt).dateTime : 'Not Paid'}</TableCell>
                <TableCell>{order.isDelivered && order.deliveredAt ? formatDateTime(order.deliveredAt).dateTime : 'Not Delivered'}</TableCell>
                <TableCell>
                  <Link href={`/user/orders/${order.id}`} className="text-blue-500 hover:text-blue-700">
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default OrdersPage