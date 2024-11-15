"use client";

import Link from "next/link";
import { IoMdSettings } from "react-icons/io";
import { FaMoneyBills } from "react-icons/fa6";
import { ArrowUpRightIcon } from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/Avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const UserAccountNav = () => {
    const { user, isLoggedIn } = useAuth();

    if (!isLoggedIn) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Avatar>
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>
                            {user.name?.charAt(0) ?? user.email.charAt(0) ?? "U"}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                        {user.name ?? user.email}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[13rem]">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-x-2">
                        <IoMdSettings className="size-3" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/billing" className="flex items-center gap-x-2">
                        <FaMoneyBills className="size-3" />
                        Billing
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/feedback" className="flex items-center justify-between">
                        Feedback
                        <ArrowUpRightIcon className="size-3" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/support" className="flex items-center justify-between">
                        Support
                        <ArrowUpRightIcon className="size-3" />
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAccountNav;