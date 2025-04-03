import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string';

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

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2,
});

// Format currency using the formatter above
export function formatCurrency(amount: number | string | null) {
  if (typeof amount === 'number') {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return 'NaN';
  }
}

// Shorten UUID
export function shortenUUID(uuid: string) {
  return `...${uuid.substring(uuid.length - 6)}`;
}

// Format date and time
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

// Form the pagination links
export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const query = qs.parse(params);

  query[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query,
    },
    {
      skipNull: true,
    }
  );
}

