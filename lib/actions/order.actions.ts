'use server'

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { formatErrors, toJavaScriptObject } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItem, PaymentResult, ShippingAddress } from "@/types";
import { paypal } from "../paypal";
import { revalidatePath } from "next/cache";

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
            return { success: false, message: "No shipping address", redirectTo: "/heroes-address" };
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

export async function getOrderById(orderId: string) {
    try {
        const order = await prisma.order.findFirst({
            where: { id: orderId },
            include: {
                orderitems: true,
                user: { select: { name: true, email: true } },
            },
        });
        if (!order) throw new Error('Order not found');
        return toJavaScriptObject(order);
    } catch (error) {
        throw error;
    }
}

export async function createPayPalOrder(orderId: string) {
    try {
        // Get order from database
        const order = await prisma.order.findFirst({
            where: { id: orderId },
        });
        if (order) {
            // Create new PayPal order
            const paypalOrder = await paypal.createOrder(Number(order.totalPrice));

            // Update order with paypal id
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    paymentResult: {
                        id: paypalOrder.id,
                        status: "",
                        email_address: "",
                        pricePaid: 0
                    }
                },
            })
            return {
                success: true,
                message: "PayPal order created",
                data: paypalOrder.id
            }
        } else {
            throw new Error('Order not found');
        }
    } catch (error) {
        return { success: false, message: formatErrors(error) };
    }
}

// Approve PayPal order
export async function approvePayPalOrder(orderId: string, data: {orderID: string}) {
    try {
        // Get order from database
        const order = await prisma.order.findFirst({
            where: { id: orderId },
        });
        if (!order) throw new Error('Order not found');

        const captureData = await paypal.capturePayment(data.orderID);

    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResult)?.id ||
      captureData.status !== 'COMPLETED'
    ) {
      throw new Error('Error in PayPal payment');
    }

    // Update order to paid
    await updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
        pricePaid:
          captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
      },
    });

    revalidatePath(`/order/${orderId}`);

    return {
      success: true,
      message: 'Your order has been paid',
    };

    } catch (error) {
        return { success: false, message: formatErrors(error) };
    }
}

// Update order to paid
async function updateOrderToPaid({
    orderId,
    paymentResult,
  }: {
    orderId: string;
    paymentResult?: PaymentResult;
  }) {
    // Get order from database
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        orderitems: true,
      },
    });

    if (!order) throw new Error('Order not found');

    if (order.isPaid) throw new Error('Order is already paid');

    // Transaction to update order and account for product stock
    await prisma.$transaction(async (tx) => {
      // Iterate over products and update stock
      for (const item of order.orderitems) {
        await tx.comic.update({
          where: { id: item.comicId },
          data: { stock: { increment: -item.qty } },
        });
      }

      // Set the order to paid
      await tx.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          paidAt: new Date(),
          paymentResult,
        },
      });
    });

    // Get updated order after transaction
    const updatedOrder = await prisma.order.findFirst({
      where: { id: orderId },
      include: {
        orderitems: true,
        user: { select: { name: true, email: true } },
      },
    });

    if (!updatedOrder) throw new Error('Order not found');

    // sendPurchaseReceipt({
    //   order: {
    //     ...updatedOrder,
    //     shippingAddress: updatedOrder.shippingAddress as ShippingAddress,
    //     paymentResult: updatedOrder.paymentResult as PaymentResult,
    //   },
    // });
  }