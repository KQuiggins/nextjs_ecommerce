import { z } from "zod";
import { insertComicSchema, cartItemSchema, insertCartSchema } from "../lib/validators";

export type Comic = z.infer<typeof insertComicSchema> & {
    id: string;
    rating: string;
    createdAt: Date;

}

export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof insertCartSchema>

