import { z } from "zod";
import {
    insertComicSchema,
    cartItemSchema,
    insertCartSchema,
    shippingAddressSchema,
    insertOrderItemSchema,
    insertOrderSchema,
    paymentResultSchema
} from "../lib/validators";

export type Comic = z.infer<typeof insertComicSchema> & {
    id: string;
    rating: string;
    createdAt: Date;

}

export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof insertCartSchema>
export type ShippingAddress = z.infer<typeof shippingAddressSchema>
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderitems: OrderItem[];
  user: { name: string; email: string };

};
export type PaymentResult = z.infer<typeof paymentResultSchema>;


