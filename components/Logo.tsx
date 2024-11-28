import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
    return (
        <Image
            src="/logo.svg"
            alt="Metrik Logo"
            width={108}
            height={24}
            className={cn("h-8 w-auto", className)}
            priority
        />
    );
};

export default Logo;