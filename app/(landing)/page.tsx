import FAQs from "./_components/FAQs";
import HeroSection from "./_components/Hero";
import Features from "./_components/Features";
import GetStarted from "./_components/GetStarted";
import CallToAction from "./_components/CallToAction";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Features />
            <GetStarted />
            <FAQs />
            <CallToAction />
        </>
    );
};

export default HomePage;