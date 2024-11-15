import Navbar from "./_components/Navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
};

export default DashboardLayout;