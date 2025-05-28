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
  const summary = await getOrderSummary();

  return (
    <div className="space-y-6 relative">
      {/* Main Title with enhanced comic styling */}
      <div className="text-center mb-8">
        <h1
          className="text-6xl font-bold tracking-tight mb-2"
          style={{
            fontFamily: '"Bangers", cursive, sans-serif',
            textShadow: '4px 4px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
            background: 'linear-gradient(45deg, #ff6b35, #f7931e, #ffcd3c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          ⚡ HERO DASHBOARD ⚡
        </h1>
        <div
          className="text-lg font-bold text-gray-600"
          style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
        >
          💥 COMMAND CENTER FOR COMIC EMPIRE 💥
        </div>
      </div>

      {/* Stats Cards with enhanced styling */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue Card */}
        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gradient-to-br from-red-100 to-red-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-3 border-black bg-gradient-to-r from-red-200 to-red-300">
            <CardTitle
              className="text-sm font-bold"
              style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
            >
              💰 TOTAL REVENUE
            </CardTitle>
            <BadgeDollarSign className="text-green-600 w-6 h-6" />
          </CardHeader>
          <CardContent className="pt-4">
            <div
              className="text-4xl font-bold text-green-700"
              style={{ fontFamily: '"Bangers", cursive, sans-serif' }}
            >
              {formatCurrency(summary.totalSales._sum.totalPrice?.toString() || 0)}
            </div>
            <p className="text-xs text-green-600 font-bold mt-1">💸 HEROIC EARNINGS!</p>
          </CardContent>
        </Card>

        {/* Sales Card */}
        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-3 border-black bg-gradient-to-r from-blue-200 to-blue-300">
            <CardTitle
              className="text-sm font-bold"
              style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
            >
              📊 SALES MISSIONS
            </CardTitle>
            <CreditCard className="text-blue-600 w-6 h-6" />
          </CardHeader>
          <CardContent className="pt-4">
            <div
              className="text-4xl font-bold text-blue-700"
              style={{ fontFamily: '"Bangers", cursive, sans-serif' }}
            >
              {formatNumber(summary.ordersCount)}
            </div>
            <p className="text-xs text-blue-600 font-bold mt-1">🎯 COMPLETED ORDERS!</p>
          </CardContent>
        </Card>

        {/* Customers Card */}
        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-3 border-black bg-gradient-to-r from-purple-200 to-purple-300">
            <CardTitle
              className="text-sm font-bold"
              style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
            >
              👥 HERO CUSTOMERS
            </CardTitle>
            <Users className="text-purple-600 w-6 h-6" />
          </CardHeader>
          <CardContent className="pt-4">
            <div
              className="text-4xl font-bold text-purple-700"
              style={{ fontFamily: '"Bangers", cursive, sans-serif' }}
            >
              {formatNumber(summary.userCount)}
            </div>
            <p className="text-xs text-purple-600 font-bold mt-1">🦸‍♂️ LOYAL HEROES!</p>
          </CardContent>
        </Card>

        {/* Comics Card */}
        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gradient-to-br from-yellow-100 to-yellow-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-3 border-black bg-gradient-to-r from-yellow-200 to-yellow-300">
            <CardTitle
              className="text-sm font-bold"
              style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
            >
              📚 COMIC ARSENAL
            </CardTitle>
            <BookOpen className="text-yellow-600 w-6 h-6" />
          </CardHeader>
          <CardContent className="pt-4">
            <div
              className="text-4xl font-bold text-yellow-700"
              style={{ fontFamily: '"Bangers", cursive, sans-serif' }}
            >
              {formatNumber(summary.comicCount)}
            </div>
            <p className="text-xs text-yellow-600 font-bold mt-1">📖 EPIC COLLECTION!</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Sales Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Sales Chart */}
        <Card className="col-span-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <CardHeader className="border-b-3 border-black bg-gradient-to-r from-blue-100 to-purple-100">
            <CardTitle
              className="text-xl"
              style={{ fontFamily: '"Bangers", cursive, sans-serif' }}
            >
              📈 SALES OVERVIEW COMMAND CENTER
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <Charts data={{ salesData: summary.salesData }} />
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="col-span-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <CardHeader className="border-b-3 border-black bg-gradient-to-r from-red-100 to-orange-100">
            <CardTitle
              className="text-xl"
              style={{ fontFamily: '"Bangers", cursive, sans-serif' }}
            >
              🔥 RECENT HERO PURCHASES
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-100 to-gray-200 border-b-2 border-black">
                  <TableHead
                    className="font-bold border-r border-gray-300"
                    style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                  >
                    🦸 HERO
                  </TableHead>
                  <TableHead
                    className="font-bold border-r border-gray-300"
                    style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                  >
                    📅 DATE
                  </TableHead>
                  <TableHead
                    className="font-bold border-r border-gray-300"
                    style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                  >
                    💰 TOTAL
                  </TableHead>
                  <TableHead
                    className="font-bold"
                    style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                  >
                    ⚡ ACTION
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.latestSales.map((order, index) => (
                  <TableRow
                    key={order.id}
                    className={`
                      hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50
                      transition-all duration-200 border-b border-gray-200
                      ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    `}
                  >
                    <TableCell className="border-r border-gray-200">
                      <span className="font-bold text-blue-600">
                        {order?.user?.name ? order.user.name : '🔒 Secret Hero'}
                      </span>
                    </TableCell>
                    <TableCell className="border-r border-gray-200 text-sm">
                      {formatDateTime(order.createdAt).dateOnly}
                    </TableCell>
                    <TableCell className="font-bold text-green-600 border-r border-gray-200">
                      {formatCurrency(order.totalPrice)}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/order/${order.id}`}
                        className="
                          inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600
                          text-white text-xs font-bold rounded border-2 border-black
                          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                          hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
                          hover:translate-x-[1px] hover:translate-y-[1px]
                          transition-all duration-150
                        "
                        style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                      >
                        🔍 VIEW
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Decorative comic elements */}
      <div className="fixed top-20 right-10 text-8xl opacity-10 pointer-events-none animate-pulse">
        ⚡
      </div>
      <div className="fixed bottom-20 left-10 text-8xl opacity-10 pointer-events-none animate-bounce">
        💥
      </div>
      <div className="fixed top-1/2 left-5 text-6xl opacity-5 pointer-events-none">
        🦸‍♂️
      </div>
      <div className="fixed top-1/3 right-5 text-6xl opacity-5 pointer-events-none">
        🚀
      </div>
    </div>
  );
};

export default AdminOverviewPage;