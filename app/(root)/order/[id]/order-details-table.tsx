'use client'

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TableCell } from '@/components/ui/table';
import { toast } from "sonner"
import { formatCurrency, formatDateTime, shortenUUID } from '@/lib/utils';
import { Order } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { createPayPalOrder, approvePayPalOrder, updateOrderToPaidCOD, updateOrderToDelivered } from '@/lib/actions/order.actions';



const OrderDetailsTable = ({ order, paypalClientId, isAdmin }: { order: Order, paypalClientId: string, isAdmin: boolean }) => {

  const {
    id,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
  } = order

  const PrintLoadingState = () => {
    const [{ isPending, isRejected}] = usePayPalScriptReducer();
    let status = '';

    if (isPending) {
      status = 'Loading PayPal...';
    } else if (isRejected) {
      status = 'PayPal failed to load';
    }
    return status;

  }

  const handleCreateOrder = async () => {
    const orderData = await createPayPalOrder(order.id);

    if (!orderData.success) {
      toast.error(orderData.message, {
        className: 'rounded-lg border-2 border-red-200 bg-red-200 text-red-800 shadow-lg',
        description: 'Please try again',
        duration: 3000,
      });
    }
    return orderData.data;
  }

  const handleApprovePayPalOrder = async (data: {orderID: string; }) => {
    const orderData = await approvePayPalOrder(order.id, data);

    if (!orderData.success) {
      toast.error(orderData.message, {
        className: 'rounded-lg border-2 border-red-200 bg-red-200 text-red-800 shadow-lg',
        description: 'Please try again',
        duration: 3000,
      });
    } else {
      toast.success('Order Paid', {
        className: 'rounded-lg border-2 border-green-200 bg-green-200 text-green-800 shadow-lg',
        description: 'Thank you for your order',
        duration: 3000,
      });
    }
  }

  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCOD(order.id);
            if (res.success) {
              toast.success('Order marked as paid', {
                className: 'rounded-lg border-2 border-green-200 bg-green-200 text-green-800 shadow-lg',
                description: 'Thank you for your order',
                duration: 3000,
              });
            } else {
              toast.error(res.message, {
                className: 'rounded-lg border-2 border-red-200 bg-red-200 text-red-800 shadow-lg',
                description: 'Please try again',
                duration: 3000,
              });
            }
          })
        }
      >
        {isPending ? 'processing...' : 'Mark As Paid'}
      </Button>
    );
  };

  // Button to mark order as delivered
  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToDelivered(order.id);
            if (res.success) {
              toast.success('Order marked as delivered', {
                className: 'rounded-lg border-2 border-green-200 bg-green-200 text-green-800 shadow-lg',
                description: 'Order has been delivered',
                duration: 3000,
              });
            } else {
              toast.error(res.message, {
                className: 'rounded-lg border-2 border-red-200 bg-red-200 text-red-800 shadow-lg',
                description: 'Please try again',
                duration: 3000,
              });
            }
          })
        }
      >
        {isPending ? 'processing...' : 'Mark As Delivered'}
      </Button>
    );
  };

  return (
    <>
      <h1 className='py-4 text-2xl'>Order {shortenUUID(id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-4-y overflow-x-auto">
          <Card>
            <CardContent>
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p>{paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary" >
                  Paid At: {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive" >
                  Not Paid
                </Badge>
              )}
            </CardContent>
          </Card>
          <Card className='my-2'>
            <CardContent>
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p>{shippingAddress.address}, {shippingAddress.city}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge variant="secondary" >
                  Delivered At: {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive" >
                  Not Paid
                </Badge>
              )}
            </CardContent>
          </Card>
          <Card className='my-2'>
            <CardContent>
              <h2 className="text-xl pb-4">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.orderitems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/comic/{item.slug}`}
                          className='flex items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className='px-2'>{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className='px-2'>{item.qty}</span>
                      </TableCell>
                      <TableCell className='text-right'>
                        ${item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className='p-4 gap-4 space-y-4'>
              <div className='flex justify-between'>
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
                  { /* PayPal Payment */}
                  { !isPaid && paymentMethod === 'PayPal' && (
                    <div>
                      <PayPalScriptProvider options={{clientId: paypalClientId}}>
                        <PrintLoadingState />
                        <PayPalButtons
                          createOrder={handleCreateOrder}
                          onApprove={handleApprovePayPalOrder}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}
                  { /* COD Payment */}
                  {
                    isAdmin && !isPaid && paymentMethod === 'CashOnDelivery' && (
                      <MarkAsPaidButton />
                    )
                  }
                  {
                    isAdmin && isPaid && !isDelivered && (
                      <MarkAsDeliveredButton />
                    )
                  }
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default OrderDetailsTable



