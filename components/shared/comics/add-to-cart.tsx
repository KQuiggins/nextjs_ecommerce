'use client'

import { CartItem } from "@/types"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { AddItemToCart } from "@/lib/actions/cart.actions"



const AddToCart = ({ item }: { item: CartItem }) => {

  const router = useRouter()

  const handleAddToCart = async () => {
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
  }

  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={handleAddToCart}
    >
      <Plus />Add to Cart
    </Button>
  )
}

export default AddToCart