import Image from "next/image";

const Logo = () => {
    return (
        <Image
            src="/logo.svg"
            alt="Metrik Logo"
            width={50}
            height={12}
            className="h-8 w-auto"
            priority
        />
    );
};

export default Logo;