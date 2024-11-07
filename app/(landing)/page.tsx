import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import ClientsListSection from "./_components/ClientsListSection";
import DescriptionSection from "./_components/DescriptionSection";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <ClientsListSection />
            <DescriptionSection />
            <Footer />
        </>
    );
};

export default HomePage;