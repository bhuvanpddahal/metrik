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
    searchParams: Promise<{
        step?: "site" | "script";
    }>;
}

const NewWebsitePage = async ({ searchParams }: NewWebsitePageProps) => {
    const { step } = await searchParams;

    return (
        <Card className="mt-5">
            <CardHeader className="border-b">
                <CardTitle className="tracking-normal">
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
                    ? <InstallScriptCard />
                    : <WebsiteForm />
                }
            </CardContent>
        </Card>
    );
};

export default NewWebsitePage;