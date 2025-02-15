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
