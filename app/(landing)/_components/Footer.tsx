import Link from "next/link";

import Logo from "@/components/Logo";
import { footerLinks, socialLinks } from "../constants";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-zinc-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Logo />
                        <p className="text-muted-foreground text-base">
                            Making web analytics simple and powerful for businesses of all sizes.
                        </p>
                        <div className="flex space-x-6">
                            {socialLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
                                    Solutions
                                </h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {footerLinks.slice(0, 3).map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
                                    Support
                                </h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {footerLinks.slice(3).map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t dark:border-zinc-700 pt-8 xl:text-center">
                    <p className="text-base text-gray-400 dark:text-gray-300">
                        © {new Date().getFullYear()} Metrik, Inc. All rights reserved.
                    </p>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Please blame{" "}
                        <Link
                            href="https://bhu-1-der.vercel.app"
                            className="hover:text-gray-900 dark:hover:text-gray-300"
                        >
                            Bhuvan Dahal
                        </Link>
                        {" "}for any bugs 🕷️
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;