'use client'

import { Cart, CartItem } from '@/types';
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransition } from "react"
import { AddItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { ArrowRight, Loader, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

function AddButton({ item }: { item: CartItem }) {

  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant='outline'
      type='button'
      onClick={() =>
        startTransition(async () => {
          const res = await AddItemToCart(item);

          if (!res.success) {
            toast.error(res.message, {
              className: 'rounded-lg border-2 border-red-200 bg-red-200 text-red-800 shadow-lg',
              description: 'Please try again',
              duration: 3000,
            });
          }
        })
      }
    >
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Plus className='w-4 h-4' />
      )}
    </Button>
  );
}

function RemoveButton({ item }: { item: CartItem }) {

  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant='outline'
      type='button'
      onClick={() =>
        startTransition(async () => {
          const res = await removeItemFromCart(item.comicId);

          if (!res.success) {
            toast.error(res.message, {
              className: 'rounded-lg border-2 border-red-200 bg-red-200 text-red-800 shadow-lg',
              description: 'Please try again',
              duration: 3000,
            });
          }
        })
      }
    >
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Minus className='w-4 h-4' />
      )}
    </Button>
  );
}

const CartTable = ({ cart }: { cart?: Cart }) => {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
      <h1 className='py-4 h2-bold'>Cosmic Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>No Comics in your cart. <Link href='/'>Journey Home</Link></div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className='text-center'>Quantity</TableHead>
                  <TableHead className='text-right'>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/comic/${item.slug}`}
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
                    <TableCell className='flex-center gap-2'>
                      <RemoveButton item={item} />
                      <span>{item.qty}</span>
                      <AddButton item={item} />
                    </TableCell>
                    <TableCell className='text-right'>${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className='p-4 gap-4'>
              <div className='pb-3 text-xl'>
                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):
                <span className='font-bold'>
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>
              <Button
                className='w-full'
                disabled={isPending}
                onClick={() =>
                  startTransition(() => router.push('/shipping-address'))
                }
              >
                {isPending ? (
                  <Loader className='w-4 h-4 animate-spin' />
                ) : (
                  <ArrowRight className='w-4 h-4' />
                )}{' '}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default CartTable