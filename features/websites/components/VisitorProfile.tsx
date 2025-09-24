import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

import Hint from "@/components/Hint";
import type { Visitor } from "../types";
import { copyToClipboard } from "@/lib/utils";

interface VisitorProfileProps {
    visitor: Visitor;
}

const VisitorProfile = ({ visitor }: VisitorProfileProps) => {
    return (
        <div className="sticky top-0 md:w-56 lg:w-80 bg-card flex flex-col items-center md:items-start px-5 pb-5 md:px-0 md:pb-0 z-10 shadow-md dark:shadow-black/50 md:shadow-none">
            <Image
                src="/images/user.jpg"
                alt="User"
                width={640}
                height={640}
                className="size-24 border rounded-full"
            />
            <div className="mt-4">
                <Hint side="right" message="Click to copy">
                    <h3
                        className="w-fit text-lg font-bold px-1 rounded-sm cursor-pointer hover:bg-muted"
                        onClick={() => copyToClipboard(visitor.name)}
                    >
                        {visitor.name}
                    </h3>
                </Hint>
                {/* <Hint side="right" message="Click to copy">
                    <p
                        className="w-fit text-muted-foreground px-1 rounded-sm cursor-pointer hover:bg-muted"
                        onClick={() => copyToClipboard("user@mail.com")}
                    >
                        user@mail.com
                    </p>
                </Hint> */}
            </div>
            <ul className="mt-8 space-y-2">
                <li className="flex items-center gap-x-2">
                    <ReactCountryFlag
                        countryCode={visitor.countryCode}
                        aria-label={visitor.country}
                        className="size-5"
                        svg
                    />
                    <span className="text-muted-foreground">
                        {visitor.country}, {visitor.city}
                    </span>
                </li>
                <li className="flex items-center gap-x-2">
                    <Image
                        src={`/images/devices/${visitor.device}.svg`}
                        alt={visitor.device}
                        width={60}
                        height={60}
                        className="size-5"
                    />
                    <span className="text-muted-foreground capitalize">
                        {visitor.device}
                        <small className="ml-1 lowercase">({visitor.screenResolution})</small>
                    </span>
                </li>
                <li className="flex items-center gap-x-2">
                    <Image
                        src={`/images/os/${visitor.operatingSystem.toLowerCase()}.svg`}
                        alt={visitor.operatingSystem}
                        width={60}
                        height={60}
                        className="size-5"
                    />
                    <span className="text-muted-foreground">
                        {visitor.operatingSystem}
                    </span>
                </li>
                <li className="flex items-center gap-x-2">
                    <Image
                        src={`https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.1.0/${visitor.browser.toLowerCase()}/${visitor.browser.toLowerCase()}_64x64.png`}
                        alt={visitor.browser}
                        width={60}
                        height={60}
                        className="size-5"
                    />
                    <span className="text-muted-foreground">
                        {visitor.browser}
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default VisitorProfile;