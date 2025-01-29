import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

interface LandingLayoutProps {
    children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
    return (
        <main>
            <Navbar />
            {children}
            <Footer />
        </main>
    );
};

export default LandingLayout;