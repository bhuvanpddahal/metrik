import Navbar from "./_components/Navbar";

interface LandingLayoutProps {
    children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
};

export default LandingLayout;