import { FaMoon, FaSun } from "react-icons/fa";
import { MdDesktopWindows } from "react-icons/md";
import { LogOutIcon, Trash2Icon } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const ThemeSwitcher = () => {
    return (
        <div className="max-w-[31.25rem] w-full">
            <Card className="w-full">
                <CardHeader className="border-b">
                    <CardTitle>Theme</CardTitle>
                </CardHeader>
                <CardContent className="pt-5">
                    <Select>
                        <SelectTrigger className="w-full shadow-none">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">
                                <div className="flex items-center gap-x-1">
                                    <FaSun className="size-3" />
                                    Light
                                </div>
                            </SelectItem>
                            <SelectItem value="dark">
                                <div className="flex items-center gap-x-1">
                                    <FaMoon className="size-3" />
                                    Dark
                                </div>
                            </SelectItem>
                            <SelectItem value="system">
                                <div className="flex items-center gap-x-1">
                                    <MdDesktopWindows className="size-3" />
                                    System
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>
            <div className="text-right space-x-2 mt-4">
                <Button variant="destructive">
                    <LogOutIcon className="size-4" />
                    Logout
                </Button>
                <Button variant="destructive">
                    <Trash2Icon className="size-4" />
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default ThemeSwitcher;