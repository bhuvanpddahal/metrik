"use server";

import { JSDOM } from "jsdom";

import { scriptSrc } from "./constants";

export const hasInstalledScript = async (
    websiteId: string,
    domain: string
) => {
    try {
        const response = await fetch(`https://${domain}`);
        const text = await response.text();

        const dom = new JSDOM(text);
        const document = dom.window.document;

        const selector = `script[defer][data-website-id='${websiteId}'][data-domain='${domain}'][src='${scriptSrc}']`;
        const scriptTag = document.head.querySelector(selector);
        if (!scriptTag) return false;

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};