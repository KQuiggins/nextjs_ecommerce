import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert Prisma Object to JavaScript Object
export function toJavaScriptObject<T>(value: T) {
  return JSON.parse(JSON.stringify(value))
}

// Format Decimals to 2 Decimal Places
export function formatDecimal(value: number): string {
  const [integer, decimal] = value.toString().split(".");
  return decimal ? `${integer}.${decimal.padEnd(2, "0")}` : `${integer}.00`;
}

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatErrors(error: any) {
  if (error.name === 'ZodError') {
    // Handle Zod Errors
    const fieldErrors = Object.keys(error.errors).map((field) => error.errors[field].message)


    return fieldErrors.join('. ')
  } else if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
    // Handle Prisma Errors
    const field = error.meta?.target.join ? error.meta.target[0] : 'Field';
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === 'string' ? error.message : JSON.stringify(error.message);
  }
}

// Round number to 2 decimal places 
export function roundTwoDecimalPlaces(value: number | string) {
  if (typeof value === 'number') {
   return Math.round((value + Number.EPSILON) * 100) / 100
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100
  } else {
    throw new Error('Invalid value')
  }
  
}
