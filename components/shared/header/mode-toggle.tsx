'use client';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

const ModeToggle = () => {
    const { theme, setTheme } = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">

                </Button>
            </DropdownMenuTrigger>
        </DropdownMenu>
    )
};

export default ModeToggle;