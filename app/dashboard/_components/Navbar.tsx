import Link from "next/link";

import Logo from "@/components/Logo";
import UserAccountNav from "./UserAccountNav";

const Navbar = () => {
    return (
        <header>
            <nav className="container py-4 flex justify-between items-center">
                <Link href="/dashboard">
                    <Logo className="h-6" />
                </Link>
                <UserAccountNav />
            </nav>
        </header>
    );
};

export default Navbar;