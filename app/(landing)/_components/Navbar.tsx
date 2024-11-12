import Link from "next/link";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/Button";

const Navbar = () => {
    return (
        <header className="bg-gradient-to-b from-transparent to-blue-50">
            <nav className="container py-4 flex justify-between items-center">
                <Link href="/">
                    <Logo />
                </Link>
                <div className="flex items-center space-x-4">
                    <Link
                        href="/pricing"
                        className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        Pricing
                    </Link>
                    <Button
                        asChild
                    >
                        <Link href="/sign-up">Sign Up</Link>
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;