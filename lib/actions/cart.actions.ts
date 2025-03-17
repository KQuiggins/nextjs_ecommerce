'use server'

import { cookies } from "next/headers"
import { CartItem } from "@/types"
import { auth } from "@/auth"
import { prisma } from "@/db/prisma"
import { formatErrors, roundTwoDecimalPlaces, toJavaScriptObject } from "../utils"
import { cartItemSchema, insertCartSchema } from "../validators"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

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
        // console.log('User ID:', userId);
        // console.log('Session:', session);



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
            // Check if item already exists in the cart
            const existingItem = (cart.items as CartItem[]).find(i => i.comicId === item.comicId)

            if (existingItem) {
                // Check the stock
                if (comic.stock < existingItem.qty + 1) {
                    throw new Error('Not enough stock')
                }

                // Increase the quantity
                (cart.items as CartItem[]).find(i => i.comicId === item.comicId)!.qty = existingItem.qty + 1
            } else {
                // If item does not exist in the cart
                // Check the stock
                if (comic.stock < 1) {
                    throw new Error('Not enough stock')
                }

                // Add item to the cart
                cart.items.push(item)
            }
            // Save cart to the database
            await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    items: cart.items as Prisma.CartUpdateitemsInput[],
                    ...calculateCartPrices(cart.items as CartItem[])

                }
            })

            // Revalidate the page 
            revalidatePath(`/comic/${comic.slug}`)

            return {
                success: true,
                message: `${comic.name} ${existingItem ? 'updated in' : 'added to'} cart`

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

export async function removeItemFromCart(comicId: string) {
    try {
        // Get the user id & session
        const sessionCartId = (await cookies()).get('sessionCartId')?.value
        if (!sessionCartId) throw new Error('No session cart id found')

        // Get Comic
        const comic = await prisma.comic.findUnique({
            where: { id: comicId }
        })
        if (!comic) throw new Error('Comic not found')

        // Get cart
        const cart = await getMyCart()
        if (!cart) throw new Error('Cart not found')

        // Check for the item 
        const itemExist = (cart.items as CartItem[]).find(i => i.comicId === comicId)
        if (!itemExist) throw new Error('Item not found')

        // Check the quantity
        if (itemExist.qty === 1) {
            // Remove the item from the cart
            cart.items = (cart.items as CartItem[]).filter(i => i.comicId !== itemExist.comicId)
        } else {
            // Decrease the quantity
            (cart.items as CartItem[]).find(i => i.comicId === comicId)!.qty = itemExist.qty - 1
        }

        // Save cart to the database
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                items: cart.items as Prisma.CartUpdateitemsInput[],
                ...calculateCartPrices(cart.items as CartItem[])
            }
        })

        // Revalidate the page
        revalidatePath(`/comic/${comic.slug}`)





        return {
            success: true,
            message: `${comic.name} removed from cart`
        }

    } catch (error) {
        return {
            success: false,
            message: formatErrors(error)
        }
    }
}