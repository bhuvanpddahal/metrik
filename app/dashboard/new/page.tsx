import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import WebsiteForm from "@/features/websites/components/WebsiteForm";
import InstallScript from "@/features/websites/components/InstallScript";

const NewWebsitePage = () => {
    return (
        <Card className="mt-5">
            <CardHeader className="border-b">
                <CardTitle className="font-bold tracking-normal">
                    {/* Add a new website */}
                    Install the Metrik script
                </CardTitle>
                <CardDescription>
                    {"Paste this snippet in the <head> of your website."}
                </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
                <WebsiteForm />
                {/* <InstallScript /> */}
            </CardContent>
        </Card>
    );
};

export default NewWebsitePage;