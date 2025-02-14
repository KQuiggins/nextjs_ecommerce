import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert Prisma Object to JavaScript Object
export function toJavaScriptObject<T>(value: T) {
  return JSON.parse(JSON.stringify(value))
}
