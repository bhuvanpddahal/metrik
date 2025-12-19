import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import SeasonalSnowfall from "@/app/_components/SeasonalSnowfall";

interface LandingLayoutProps {
    children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
    return (
        <>
            <main>
                <Navbar />
                {children}
                <Footer />
            </main>
            <SeasonalSnowfall />
        </>
    );
};

export default LandingLayout;