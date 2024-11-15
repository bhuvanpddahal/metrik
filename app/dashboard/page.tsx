import Link from "next/link";
import { PlusIcon } from "lucide-react";

import WebsiteCard from "@/features/websites/components/WebsiteCard";
import { buttonVariants } from "@/components/ui/Button";

const DashboardPage = () => {
    return (
        <div className="container py-4">
            <div className="flex items-center justify-between">
                <h1>
                    You got <strong>2</strong> visitors in the last 24 hours.
                </h1>
                <Link
                    href="/dashboard/new"
                    className={buttonVariants({ variant: "outline" })}
                >
                    <PlusIcon className="size-3" />
                    Website
                </Link>
            </div>
            <ul className="grid grid-cols-3 gap-6 mt-6">
                {Array.from({ length: 5 }, (_, index) => (
                    <WebsiteCard key={index} />
                ))}
            </ul>
        </div>
    );
};

export default DashboardPage;