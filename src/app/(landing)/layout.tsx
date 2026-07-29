import Hero from "./_components/Hero";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import SeasonalSnowfall from "@/components/common/SeasonalSnowfall";

interface LandingLayoutProps {
    children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
    return (
        <main>
            <div className="relative">
                <Navbar />
                <Hero />
                <SeasonalSnowfall />
            </div>
            {children}
            <Footer />
        </main>
    );
};

export default LandingLayout;