import Link from "next/link"
import { auth } from "@/auth"
import { signOutUser } from "@/lib/actions/user.actions"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Bookmark, BookOpenText, ShoppingCart, User, UserIcon, History } from "lucide-react"


const UserButton = async () => {
    const session = await auth()

    if (!session) {
        return (
            <Button asChild>
                <Link href="/sign-in">
                    <UserIcon /> Sign In
                </Link>
            </Button>
        )
    }

    const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "🙃";

    return (
        <div className="flex gap-2 item-center">
            <div className="flex gap-2 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-primary/10 text-primary"
                            >
                                {firstInitial}
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <div className="text-sm font-medium leading-none">{session.user?.name}</div>
                                <div className="text-xs text-muted-foreground leading-none">{session?.user?.email}</div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <Link href="/my-collection" className="w-full flex items-center">
                                <BookOpenText className="mr-2 h-4 w-4" />
                                My Collection
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href="/bookmarks" className="w-full flex items-center">
                                <Bookmark className="mr-2 h-4 w-4" />
                                Bookmarked Comics
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href="/reading-history" className="w-full flex items-center">
                                <History className="mr-2 h-4 w-4" />
                                Reading History
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href="/user/orders" className="w-full flex items-center">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Heroes Orders
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href="/user/profile" className="w-full flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                Profile Settings
                            </Link>
                        </DropdownMenuItem>

                        {session.user?.role === "admin" && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/admin/overview" className="w-full">
                                        Admin Dashboard
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        )}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-0">
                            <form action={signOutUser} className="w-full">
                                <Button className="w-full py-2 px-2 h-9 justify-start font-normal" variant="ghost">
                                    Sign Out
                                </Button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default UserButton