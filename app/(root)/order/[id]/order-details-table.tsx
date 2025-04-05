'use client'

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card'
import { formatDateTime, shortenUUID } from '@/lib/utils'
import { Order } from '@/types'


const OrderDetailsTable = ({ order }: { order: Order }) => {

  const { 
    id,
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
   } = order
  

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
        </div>
      </div>
    </>
  )
}

export default OrderDetailsTable