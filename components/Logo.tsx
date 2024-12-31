import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

const Logo = ({ className = "" }: LogoProps) => (
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
            src="/logo-light.svg"
            alt="Metrik Logo"
            width={101}
            height={24}
            className={cn("h-8 w-auto hidden sm:inline-block dark:hidden", className)}
            priority
        />
        <Image
            src="/logo-dark.svg"
            alt="Metrik Logo"
            width={101}
            height={24}
            className={cn("h-8 w-auto hidden dark:sm:inline-block", className)}
            priority
        />
    </>
);

export default Logo;