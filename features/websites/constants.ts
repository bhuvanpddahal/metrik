import { env } from "@/constants/env/client";

export const timezones = {
    "Etc/GMT+12": "(GMT-12:00) Etc/GMT+12",
    "Asia/Qostanay": "(GMT+06:00) Asia/Qostanay"
};

export const scriptSrc = `${env.NEXT_PUBLIC_APP_URL}/js/script.js`;