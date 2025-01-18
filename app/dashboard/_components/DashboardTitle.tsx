import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button";

interface DashboardTitleProps {
    visitorsCount: number;
}

const DashboardTitle = ({
    visitorsCount
}: DashboardTitleProps) => {
    return (
        <div className="flex flex-row-reverse items-center justify-between">
            <Link
                href="/dashboard/new"
                className={buttonVariants({
                    variant: "outline",
                    className: "pl-2.5"
                })}
            >
                <PlusIcon className="size-3 stroke-[0.8]" />
                Website
            </Link>
            {visitorsCount > 0 && (
                <h1>
                    You got <strong>{visitorsCount}</strong> {visitorsCount === 1 ? "visitor" : "visitors"} in the last 24 hours.
                </h1>
            )}
        </div>
    );
};

export default DashboardTitle;