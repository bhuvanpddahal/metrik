import Image from "next/image";
import type { Metadata } from "next";

import NotFoundBackButton from "../components/common/NotFoundBackButton";

export const metadata: Metadata = {
    title: "Page not found"
};

const NotFound = () => {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8">
            <Image
                src="/images/not-found.svg"
                alt="Not Found"
                width={525}
                height={418}
                className="h-28 sm:h-36 w-auto"
            />
            <p className="text-sm text-destructive font-medium mt-8">
                There is no such page that exists
            </p>
            <NotFoundBackButton />
        </main>
    );
};

export default NotFound;