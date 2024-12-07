import Image from "next/image";
import { RefreshCcwIcon } from "lucide-react";

import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

interface ErrorProps {
    message?: string;
    className?: string;
}

const Error = ({
    message = "Something went wrong",
    className = ""
}: ErrorProps) => {
    return (
        <div className={cn("flex flex-col items-center px-5 py-20", className)}>
            <Image
                src="/error.svg"
                alt="Error"
                width={50}
                height={40}
                className="h-28 sm:h-36 w-auto"
                priority
            />
            <h3 className="text-destructive text-xl font-semibold mt-8">
                ERROR
            </h3>
            <p className="max-w-96 text-center text-sm font-medium mt-1">
                {message}
            </p>
            <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
            >
                <RefreshCcwIcon className="size-4" />
                Reload
            </Button>
        </div>
    );
};

export default Error;