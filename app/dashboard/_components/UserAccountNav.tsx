"use client";

import Link from "next/link";
import { IoLogOut } from "react-icons/io5";
import { signOut } from "@hono/auth-js/react";
import { IoMdSettings } from "react-icons/io";
import { FaMoneyBills } from "react-icons/fa6";
import { ArrowUpRightIcon } from "lucide-react";

import UserAvatar from "./UserAvatar";
import UserAccountNavLoader from "./skeletons/UserAccountNavLoader";
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

    if (!isLoggedIn) return <UserAccountNavLoader />

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <UserAvatar />
                    <span className="text-sm font-medium">
                        {user.name ?? user.email.split("@")[0]}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[13rem]">
                <DropdownMenuLabel className="bg-primary/10 flex flex-col items-center gap-y-2 py-2 rounded">
                    <UserAvatar className="h-10 w-10" />
                    <p className="truncate">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="flex items-center gap-x-2">
                        <IoMdSettings className="size-3" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/billing" className="flex items-center gap-x-2">
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
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="justify-between cursor-pointer"
                    onClick={() => signOut()}
                >
                    Log out
                    <IoLogOut className="size-3" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAccountNav;