import WebsiteForm from "@/features/websites/components/WebsiteForm";
import InstallScriptCard from "@/features/websites/components/InstallScriptCard";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";

interface NewWebsitePageProps {
    searchParams: {
        step?: "site" | "script";
        websiteId?: string;
        domain?: string;
    };
}

const NewWebsitePage = ({
    searchParams: {
        step,
        websiteId = "",
        domain = ""
    }
}: NewWebsitePageProps) => {
    return (
        <Card className="mt-5">
            <CardHeader className="border-b">
                <CardTitle className="font-bold tracking-normal">
                    {step === "script"
                        ? "Install the Metrik script"
                        : "Add a new website"
                    }
                </CardTitle>
                {step === "script" && (
                    <CardDescription>
                        {"Paste this snippet in the <head> of your website."}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="py-6">
                {step === "script"
                    ? <InstallScriptCard
                        websiteId={websiteId}
                        domain={domain}
                    /> : <WebsiteForm />
                }
            </CardContent>
        </Card>
    );
};

export default NewWebsitePage;