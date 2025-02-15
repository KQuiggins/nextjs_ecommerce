import {z} from "zod";
import { formatDecimal } from "./utils";

const currency = z.string().refine((value) => /^\d+(\.\d{2})?$/.test(formatDecimal(Number(value))), 'Price have exactly 2 decimal places')

// Insering Comics Schema
export const insertComicSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    category: z.string().min(3, "Category must be at least 3 characters long"),
    brand: z.string().min(3, "Brand must be at least 3 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long"),
    stock: z.coerce.number(),
    images: z.array(z.string().min(1, "1 Comic image is required")),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
    
});