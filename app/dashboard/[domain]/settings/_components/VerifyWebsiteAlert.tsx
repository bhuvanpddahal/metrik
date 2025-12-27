import { useRouter } from "nextjs-toploader/app";
import { MessageCircleWarningIcon } from "lucide-react";

import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

interface VerifyWebsiteAlertProps {
    websiteId: string;
    domain: string;
    timezone: string;
}

const VerifyWebsiteAlert = ({
    websiteId,
    domain,
    timezone
}: VerifyWebsiteAlertProps) => {
    const router = useRouter();

    return (
        <Alert variant="warning">
            <MessageCircleWarningIcon className="size-6" />
            <AlertTitle>Verify Your Website!</AlertTitle>
            <AlertDescription>
                Please verify your website to start tracking user activity and gain valuable insights.
            </AlertDescription>
            <Button
                variant="link"
                size="sm"
                className="h-fit mt-3 leading-none underline-offset-1"
                onClick={() => router.push(`/dashboard/new?step=script&websiteId=${websiteId}&domain=${domain}&timezone=${timezone}`)}
            >
                Verify Now
            </Button>
        </Alert>
    );
};

export default VerifyWebsiteAlert;