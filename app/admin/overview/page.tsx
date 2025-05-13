import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOrderSummary } from '@/lib/actions/order.actions';
import { formatCurrency, formatDateTime, formatNumber } from '@/lib/utils';
import { BadgeDollarSign, BookOpen, CreditCard, Users } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import Charts from './charts';
import { requireAdmin } from '@/lib/auth-guard';

export const metadata: Metadata = {
  title: "Admin Overview",
  description: "Admin Overview Page",
}

const AdminOverviewPage = async () => {
  await requireAdmin();

  const summary = await getOrderSummary()

  return (
    <div className='space-y-6'>
      <h1 className='text-4xl font-bold tracking-tight'
        style={{ fontFamily: '"Bangers", cursive, sans-serif', textShadow: '2px 2px #000' }}>
        HERO DASHBOARD
      </h1>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gradient-to-br from-red-100 to-red-200'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black'>
            <CardTitle className='text-sm font-bold' style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>Total Revenue</CardTitle>
            <BadgeDollarSign className="text-green-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className='text-3xl font-bold text-green-700'>
              {formatCurrency(
                summary.totalSales._sum.totalPrice?.toString() || 0
              )}
            </div>
          </CardContent>
        </Card>

        <Card className='border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black'>
            <CardTitle className='text-sm font-bold' style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>Sales</CardTitle>
            <CreditCard className="text-blue-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className='text-3xl font-bold text-blue-700'>
              {formatNumber(summary.ordersCount)}
            </div>
          </CardContent>
        </Card>

        <Card className='border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black'>
            <CardTitle className='text-sm font-bold' style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>Customers</CardTitle>
            <Users className="text-purple-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className='text-3xl font-bold text-purple-700'>
              {formatNumber(summary.userCount)}
            </div>
          </CardContent>
        </Card>

        <Card className='border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gradient-to-br from-yellow-100 to-yellow-200'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black'>
            <CardTitle className='text-sm font-bold' style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>Comics</CardTitle>
            <BookOpen className="text-yellow-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className='text-3xl font-bold text-yellow-700'>
              {formatNumber(summary.comicCount)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4 border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
          <CardHeader className='border-b-2 border-black bg-blue-100'>
            <CardTitle style={{ fontFamily: '"Bangers", cursive, sans-serif' }}>SALES OVERVIEW</CardTitle>
          </CardHeader>
          <CardContent className="p-4 bg-white">
            <Charts
              data={{
                salesData: summary.salesData,
              }}
            />
          </CardContent>
        </Card>

        <Card className='col-span-3 border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
          <CardHeader className='border-b-2 border-black bg-red-100'>
            <CardTitle style={{ fontFamily: '"Bangers", cursive, sans-serif' }}>RECENT SALES</CardTitle>
          </CardHeader>
          <CardContent className="p-0 bg-white">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="font-bold">BUYER</TableHead>
                  <TableHead className="font-bold">DATE</TableHead>
                  <TableHead className="font-bold">TOTAL</TableHead>
                  <TableHead className="font-bold">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.latestSales.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell>
                      {order?.user?.name ? order.user.name : 'Deleted User'}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(order.createdAt).dateOnly}
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">{formatCurrency(order.totalPrice)}</TableCell>
                    <TableCell>
                      <Link href={`/order/${order.id}`} className="text-blue-500 hover:text-blue-700 font-medium underline">
                        View Order
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminOverviewPage