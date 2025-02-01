'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { SunIcon, MoonIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ModeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    {theme === "system" ? (
                        <SunMoonIcon size={24} />
                    ) : theme === "dark" ? (
                        <MoonIcon size={24} />
                    ) : (
                        <SunIcon size={24} />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Mode</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Button
                    variant="ghost"
                    onClick={() => setTheme("system")}
                    className="w-full"
                >
                    <SunMoonIcon size={24} />
                    System
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setTheme("light")}
                    className="w-full"
                >
                    <SunIcon size={24} />
                    Light
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setTheme("dark")}
                    className="w-full"
                >
                    <MoonIcon size={24} />
                    Dark
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default ModeToggle;