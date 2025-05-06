import {z} from "zod";
import { formatDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";

const currency = z.string().refine((value) => /^\d+(\.\d{2})?$/.test(formatDecimal(Number(value))), 'Price have exactly 2 decimal places')

// Inserting Comics Schema
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

// Schema for signing in
export const signInFormSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Schema for signing up
export const signUpFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters long")

  }).refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  // Cart Schemas
  export const cartItemSchema = z.object({
    comicId: z.string().min(1, "Comic ID must be at least 1 characters long"),
    name: z.string().min(1, "Name must be at least 1 characters long"),
    slug: z.string().min(1, "Slug must be at least 1 characters long"),
    qty: z.number().int().nonnegative("Quantity must be a positive integer"),
    image: z.string().min(1, "Image must be at least 1 characters long"),
    price: currency,

  });

  export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1, "Session Cart ID must be at least 1 characters long"),
    userId: z.string().optional().nullable(),
});

// Shipping Address Schema
export const shippingAddressSchema = z.object({
    fullName: z.string().min(3, "Full Name must be at least 3 characters long"),
    address: z.string().min(3, "Address must be at least 3 characters long"),
    city: z.string().min(3, "City must be at least 3 characters long"),
    postalCode: z.string().min(3, "Postal Code must be at least 3 characters long"),
    country: z.string().min(3, "Country must be at least 3 characters long"),
    lat: z.number().optional(),
    lng: z.number().optional(),
})

// Payment Method Schema
export const paymentMethodSchema = z.object({
    type: z.string().min(1, "Payment Method is required"),
}).refine((val) => PAYMENT_METHODS.includes(val.type), {
    path: ["type"],
    message: "Invalid payment method",
})

// Schema for inserting an order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'User is required'),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: 'Invalid payment method',
  }),
  shippingAddress: shippingAddressSchema,
});

// Schema for inserting an order item
export const insertOrderItemSchema = z.object({
  comicId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

// Payment results schema
export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

// Update user profile schema
export const updateUserProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().min(3, "Email must be at least 3 characters long"),
})
