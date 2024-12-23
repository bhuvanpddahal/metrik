import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function copyToClipboard(
    text: string,
    copySuccessMessage: string = "Copied to clipboard",
    copyErrorMessage: string = "Failed to copy"
) {
    navigator.clipboard.writeText(text)
        .then(() => toast.success(copySuccessMessage))
        .catch(() => toast.error(copyErrorMessage));
}