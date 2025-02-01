import { ShoppingCart, UserIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { APP_NAME } from "@/lib/constants"
import Link from "next/link"
import ModeToggle from "./mode-toggle"

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 py-4">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start ml-4">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              width={50}
              height={50}
              priority={true}
            />
            <span className="hidden lg:block text-2xl font-bold ml-3">{APP_NAME}</span>
          </Link>
        </div>
        <div className="space-x-2">
          <ModeToggle />
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart /> Cart
            </Link>
          </Button>
          <Button asChild>
            <Link href="/sign-in">
              <UserIcon /> Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
