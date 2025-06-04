import { auth } from "@/auth"
import PaginationPage from "@/components/shared/pagination"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { getAllOrders } from "@/lib/actions/order.actions"
import { shortenUUID, formatDateTime, formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: 'Admin Orders | Comic Store',
  description: 'Manage orders in the admin area of Comic Store',
}

const AdminOrdersPage = async (props: {
  searchParams: Promise<{
    page: string;
  }>
}) => {

  const { page = '1' } = await props.searchParams;
  const session = await auth();

  if (session?.user?.role !== 'admin') throw new Error("Unauthorized access to admin orders page");

  const orders = await getAllOrders({
    page: Number(page),
    limit: 2
  });

  console.log("Orders:", orders);

  return (
    <div className='space-y-6'>
      <h1
        className="text-4xl font-bold tracking-tight text-center mb-8"
        style={{
          fontFamily: '"Bangers", cursive, sans-serif',
          textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
          background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        ⚡ HEROES ORDER CONTROL CENTER ⚡
      </h1>

      <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-b-4 border-black p-4">
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: '"Bangers", cursive, sans-serif' }}
          >
            📋 ORDER MISSIONS LOG
          </h2>
        </div>

        <div className="overflow-x-auto bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-yellow-100 to-orange-100 border-b-2 border-black">
                <TableHead
                  className="font-bold text-black border-r-2 border-black"
                  style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                >
                  🆔 MISSION ID
                </TableHead>
                <TableHead
                  className="font-bold text-black border-r-2 border-black"
                  style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                >
                  📅 DATE LAUNCHED
                </TableHead>
                <TableHead
                  className="font-bold text-black border-r-2 border-black"
                  style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                >
                  💰 TOTAL VALUE
                </TableHead>
                <TableHead
                  className="font-bold text-black border-r-2 border-black"
                  style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                >
                  💳 PAYMENT STATUS
                </TableHead>
                <TableHead
                  className="font-bold text-black border-r-2 border-black"
                  style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                >
                  🚚 DELIVERY STATUS
                </TableHead>
                <TableHead
                  className="font-bold text-black"
                  style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                >
                  ⚡ ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.data.map((order, index) => (
                <TableRow
                  key={order.id}
                  className={`
                    hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50
                    transition-all duration-200 border-b-2 border-gray-200
                    ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  `}
                >
                  <TableCell className='font-bold font-mono text-blue-600 border-r border-gray-200'>
                    {shortenUUID(order.id)}
                  </TableCell>
                  <TableCell className='border-r border-gray-200'>
                    {formatDateTime(order.createdAt).dateTime}
                  </TableCell>
                  <TableCell className='font-bold text-green-600 border-r border-gray-200'>
                    {formatCurrency(order.totalPrice)}
                  </TableCell>
                  <TableCell className='border-r border-gray-200'>
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-bold border-2
                      ${order.isPaid && order.paidAt
                        ? 'bg-green-100 text-green-800 border-green-400'
                        : 'bg-red-100 text-red-800 border-red-400'
                      }
                    `}>
                      {order.isPaid && order.paidAt ? '✅ PAID' : '❌ UNPAID'}
                    </span>
                  </TableCell>
                  <TableCell className='border-r border-gray-200'>
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-bold border-2
                      ${order.isDelivered && order.deliveredAt
                        ? 'bg-blue-100 text-blue-800 border-blue-400'
                        : 'bg-orange-100 text-orange-800 border-orange-400'
                      }
                    `}>
                      {order.isDelivered && order.deliveredAt ? '🚚 DELIVERED' : '📦 PENDING'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button>
                      <Link
                        href={`/order/${order.id}`}
                        className="
                        inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600
                        text-white font-bold rounded border-2 border-black
                        shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                        hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
                        hover:translate-x-[2px] hover:translate-y-[2px]
                        transition-all duration-150
                      "
                        style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                      >
                        🔍 VIEW MISSION
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {orders.totalPages > 1 && (
          <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 border-t-4 border-black">
            <PaginationPage page={Number(page || 1)} totalPages={orders?.totalPages} />
          </div>
        )}
      </div>

      {/* Comic book style decorative elements */}
      <div className="fixed top-20 right-10 text-6xl opacity-10 pointer-events-none">
        ⚡
      </div>
      <div className="fixed bottom-20 left-10 text-6xl opacity-10 pointer-events-none">
        💥
      </div>
    </div>
  )
}

export default AdminOrdersPage