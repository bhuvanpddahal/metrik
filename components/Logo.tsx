import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
    return (
        <>
            <Image
                src="/icon.svg"
                alt="Metrik Logo"
                width={24}
                height={24}
                className={cn("h-8 w-auto sm:hidden", className)}
                priority
            />
            <Image
                src="/logo.svg"
                alt="Metrik Logo"
                width={108}
                height={24}
                className={cn("h-8 w-auto hidden sm:inline-block", className)}
                priority
            />
        </>
    );
};

export default Logo;