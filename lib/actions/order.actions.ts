'use server'

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { formatErrors } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";

export async function createOrderAction() {
    try {
        const session = await auth();
        if (!session) throw new Error("User is not authorized");

        const cart = await getMyCart();
        const userId = session?.user?.id;

        if (!userId) throw new Error("User not found");

        const user = await getUserById(userId);

        if (!cart || cart.items.length === 0) {
            return { success: false, message: "Cart is empty", redirectTo: "/cart" };
        }
        if (!user.address) {
            return { success: false, message: "No shipping adress", redirectTo: "/heroes-address" };
        }
        if (!user.paymentMethod) {
            return { success: false, message: "No payment method", redirectTo: "/payment-method" };
        }

        const order = insertOrderSchema.parse({
            userId: user.id,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            paymentMethod: user.paymentMethod,
            shippingAddress: user.address,
        });

        // Create a transaction to create order and order items in database
        const insertedOrderId = await prisma.$transaction(async (tx) => {
            // Create order
            const insertedOrder = await tx.order.create({ data: order });
            // Create order items from the cart items
            for (const item of cart.items as CartItem[]) {
                await tx.orderItem.create({
                    data: {
                        ...item,
                        price: item.price,
                        orderId: insertedOrder.id,
                    },
                });
            }
            // Clear cart
            await tx.cart.update({
                where: { id: cart.id },
                data: {
                    items: [],
                    totalPrice: 0,
                    taxPrice: 0,
                    shippingPrice: 0,
                    itemsPrice: 0,
                },
            });

            return insertedOrder.id;
        });

        if (!insertedOrderId) throw new Error('Order not created');

        return {
            success: true,
            message: 'Order created',
            redirectTo: `/order/${insertedOrderId}`,
        };
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return { success: false, message: formatErrors(error) };

    }
}