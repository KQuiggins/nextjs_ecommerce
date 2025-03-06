'use server'

import { cookies } from "next/headers"
import { CartItem } from "@/types"
import { auth } from "@/auth"
import { prisma } from "@/db/prisma"
import { toJavaScriptObject } from "../utils"
import { cartItemSchema } from "../validators"

export async function AddItemToCart(data: CartItem) {

    try {
        // Check for the cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value
        if (!sessionCartId) throw new Error('No session cart id found')

        // Get the user id & session
        const session = await auth()
        const userId = session?.user?.id ? (session.user.id as string) : undefined

        // Get cart
        const cart = await getMyCart();

        // Parse and validate item
        const item = cartItemSchema.parse(data);

        // find product in database 
        const comic = await prisma.comic.findUnique({
            where: { id: item.comicId }
        })


        // Testing 
        console.log({
            'sessionCartId': sessionCartId,
            'userId': userId,
            'item requested': item,
            'comic': comic
        });


        return {
            success: true,
            message: 'Item added to cart'

        }
    } catch (error) {
        return {
            success: false,
            message: 'Item not added to cart'
        }

    }

}

export async function getMyCart() {
    // Check for the cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('No session cart id found')

    // Get the user id & session
    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined

    // Get user cart from the database
    const cart = await prisma.cart.findFirst({
        where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
    })

    if (!cart) return undefined

    return toJavaScriptObject({
        ...cart,
        items: cart.items as CartItem[],
        itemsPrice: cart.itemsPrice.toString(),
        totalPrice: cart.totalPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
        taxPrice: cart.taxPrice.toString(),

    })
}