"use client";

import { FaGlobeAmericas } from "react-icons/fa";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/Avatar";

const WebsiteCard = () => {
    return (
        <Card className="cursor-pointer hover:shadow-lg">
            <CardHeader className="flex-row gap-x-2">
                <Avatar>
                    <AvatarImage src={""} />
                    <AvatarFallback>
                        <FaGlobeAmericas className="size-4 text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
                <CardTitle>example.com</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Chart</p>
            </CardContent>
            <CardFooter>
                <p><strong>2</strong> visitors</p>
            </CardFooter>
        </Card>
    );
};

export default WebsiteCard;