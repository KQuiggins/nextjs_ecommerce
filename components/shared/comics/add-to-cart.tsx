'use client'

import { Cart, CartItem } from "@/types"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus, Minus, Loader } from "lucide-react"
import { toast } from "sonner"
import { AddItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions"
import { useTransition } from "react"



const AddToCart = ({ cart, item }: { cart?: Cart, item: CartItem }) => {

  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await AddItemToCart(item)
      if (!res.success) {
        toast.error(res.message, {
          className: 'rounded-lg border-2 border-red-200 bg-red-200 text-red-800 shadow-lg',
          description: 'Please try again',
          duration: 3000,
        })
        return;
      }

      toast.success(res.message, {
        className: 'rounded-lg border-2 border-emerald-200 bg-emerald-50 text-emerald-800 shadow-lg',
        duration: 3000,
        action: {
          label: 'Go to Cart',
          onClick: () => router.push('/cart')
        },
      });
    });
  }

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.comicId);

      if (!res.success) {
        toast.error(res.message, {
          className: 'rounded-lg border-2 border-red-200 bg-red-200 text-red-800 shadow-lg',
          description: 'Please try again',
          duration: 3000,
        });
        return;
      }

      toast.success(res.message, {
        className: 'rounded-lg border-2 border-emerald-200 bg-emerald-50 text-emerald-800 shadow-lg',
        duration: 3000,
      });
    });
  };

  // Check if the item is already in the cart
  const itemExist = cart && cart.items.find(i => i.comicId === item.comicId)

  return itemExist ? (
    <div>
      <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Minus className='w-4 h-4' />
        )}
      </Button>
      <span className='px-2'>{itemExist.qty}</span>
      <Button type='button' variant='outline' onClick={handleAddToCart}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Plus className='w-4 h-4' />
        )}
      </Button>
    </div>
  ) : (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Plus className='w-4 h-4' />
      )}{' '}
      Add To Cart
    </Button>
  );
}

export default AddToCart