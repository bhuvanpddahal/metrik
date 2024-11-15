import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import AddSiteProgress from "@/features/websites/components/AddSiteProgress";
import { buttonVariants } from "@/components/ui/Button";

interface NewWebsiteLayoutProps {
    children: React.ReactNode;
}

const NewWebsiteLayout = (
    { children }: NewWebsiteLayoutProps
) => {
    return (
        <div className="max-w-lg w-full mx-auto py-6">
            <Link
                href="/dashboard"
                className={buttonVariants({ variant: "outline" })}
            >
                <ArrowLeftIcon className="size-3" />
                Dashboard
            </Link>
            <AddSiteProgress />
            {children}
        </div>
    );
};

export default NewWebsiteLayout;