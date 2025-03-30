'use erver'

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { formatErrors } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";

export async function createOrderAction() {
    try {
        const session = await auth();
        if (!session) throw new Error("User is not authorized");

        const cart = await getMyCart();
        const userId = session?.user?.id;

        if (!userId) throw new Error("User not found");
        
        const user = await getUserById(userId);
        if (!user) throw new Error("User not found");
        if (!cart || cart.items.length === 0){
            return { success: false, message: "Cart is empty" };

        }
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return { success: false, message: formatErrors(error) };
        
    }
}