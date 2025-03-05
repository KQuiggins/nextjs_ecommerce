'use server'

import { CartItem } from "@/types"

export async function AddItemToCart(data: CartItem) {


    return {
        success: true,
        message: 'Item not added to cart'

    }
}