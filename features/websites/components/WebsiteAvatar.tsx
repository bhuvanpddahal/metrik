import { FaGlobeAmericas } from "react-icons/fa";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/Avatar";

interface WebsiteAvatarProps {
    domain: string;
    className?: string;
}

const WebsiteAvatar = (
    { domain, className = "" }: WebsiteAvatarProps
) => {
    return (
        <Avatar className={className}>
            <AvatarImage src={`https://icons.duckduckgo.com/ip3/${domain}.ico`} />
            <AvatarFallback className="p-1">
                <FaGlobeAmericas className="size-full text-muted-foreground" />
            </AvatarFallback>
        </Avatar>
    );
};

export default WebsiteAvatar;