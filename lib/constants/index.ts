export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Comic Store";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Your favorite place to buy comics!";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_COMICS_LIMIT = Number(process.env.LATEST_COMICS_LIMIT) || 4;

export const signInDefaultValues = {
    email: "",
    password: ""
};

export const signUpDefaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
};

export const shippingAddressDefaultValues = {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHOD ? process.env.PAYMENT_METHOD.split(", ") : ["PayPal", "Stripe", "CashOnDelivery"];
export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || "PayPal";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 2;