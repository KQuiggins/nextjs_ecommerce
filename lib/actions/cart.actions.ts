'use server'

import { cookies } from "next/headers"
import { CartItem } from "@/types"
import { auth } from "@/auth"
import { prisma } from "@/db/prisma"
import { formatErrors, roundTwoDecimalPlaces, toJavaScriptObject } from "../utils"
import { cartItemSchema, insertCartSchema } from "../validators"
import { revalidatePath } from "next/cache"
import { log } from "console"

// Calculate Cart Prices
const calculateCartPrices = (items: CartItem[]) => {
    const itemsPrice = roundTwoDecimalPlaces(items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)),
        shippingPrice = roundTwoDecimalPlaces(itemsPrice > 100 ? 0 : 10),
        taxPrice = roundTwoDecimalPlaces(itemsPrice * 0.15),
        totalPrice = roundTwoDecimalPlaces(itemsPrice + shippingPrice + taxPrice)

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2)
    }

}

export async function AddItemToCart(data: CartItem) {

    try {
        // Check for the cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value
        if (!sessionCartId) throw new Error('No session cart id found')

        // Get the user id & session
        const session = await auth()
        const userId = session?.user?.id ? (session.user.id as string) : undefined
        console.log('User ID:', userId);
        console.log('Session:', session);
        
        

        // Get cart
        const cart = await getMyCart();

        // Parse and validate item
        const item = cartItemSchema.parse(data);

        // find product in database 
        const comic = await prisma.comic.findUnique({
            where: { id: item.comicId }
        })

        if (!comic) throw new Error('Comic not found')

        if (!cart) {
            // Create new cart
            const newCart = insertCartSchema.parse({
                userId: userId,
                items: [item],
                sessionCartId: sessionCartId,
                ...calculateCartPrices([item])
            })

            // Testing 
            console.log('Cart:', newCart);

            // Save cart to the database
            await prisma.cart.create({
                data: newCart
            })

            // Revalidate the page 
            revalidatePath(`/comic/${comic.slug}`)

            return {
                success: true,
                message: `${comic.name} added to cart`

            }


        } else {
            // Update existing cart
            const updatedCart = {
                ...cart,
                items: [...cart.items, item],
                ...calculateCartPrices([...cart.items, item])
            }

            // Testing 
            console.log('Cart:', updatedCart);

            // Save cart to the database
            await prisma.cart.update({
                where: { id: cart.id },
                data: updatedCart
            })

            // Revalidate the page 
            revalidatePath(`/comic/${comic.slug}`)

            return {
                success: true,
                message: 'Item added to cart'

            }
        }

    } catch (error) {
        return {
            success: false,
            message: formatErrors(error)
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