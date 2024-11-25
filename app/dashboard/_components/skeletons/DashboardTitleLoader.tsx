import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

const DashboardTitleLoader = () => {
    return (
        <div className="flex justify-end">
            <Button variant="outline" disabled>
                <PlusIcon className="size-3" />
                Website
            </Button>
        </div>
    );
};

export default DashboardTitleLoader;