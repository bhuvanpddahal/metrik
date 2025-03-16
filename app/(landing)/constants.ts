import {
    BarChart3Icon,
    FacebookIcon,
    GlobeIcon,
    InstagramIcon,
    LinkedinIcon,
    TwitterIcon,
    ZapIcon
} from "lucide-react";

export const users = [
    { name: "User 1", avatar: "/images/user.jpg" },
    { name: "User 2", avatar: "/images/user.jpg" },
    { name: "User 3", avatar: "/images/user.jpg" },
    { name: "User 4", avatar: "/images/user.jpg" }
];

export const features = [
    {
        name: "Real-time Analytics",
        description: "Get instant insights with our real-time data processing.",
        icon: BarChart3Icon
    },
    {
        name: "Lightning Fast",
        description: "Experience blazing fast performance with our optimized platform.",
        icon: ZapIcon
    },
    {
        name: "Global Coverage",
        description: "Track visitors from around the world with our global data centers.",
        icon: GlobeIcon
    }
];

export const steps = [
    {
        title: "Add our script to your website",
        description: "Simply copy and paste our tracking script into your website's HTML. It's just a few lines of code!",
        imageSrc: "/images/script.png",
        imageAlt: "Metrik script"
    },
    {
        title: "View insights on your dashboard",
        description:
            "Access your personalized dashboard to see real-time data and make informed decisions to improve your website's performance.",
        imageSrc: "/images/insights.png",
        imageAlt: "Metrik insights"
    }
];

export const questions = [
    {
        question: "What is Metrik?",
        answer: "We are a platform that helps you analyze and understand your website's traffic."
    },
    {
        question: "How does Metrik work?",
        answer: "Metrik collects data from your website and presents it in easy-to-understand reports and dashboards."
    },
    {
        question: "What are the benefits of using Metrik?",
        answer:
            `1. Increased efficiency,
            2. Improved productivity,
            3. Reduced costs,
            4. Enhanced security.`
    },
    {
        question: "Is there a free trial available?",
        answer: "Yes, we offer a free trial so you can experience Metrik's features."
    },
    {
        question: "How do I contact support?",
        answer: "You can contact our support team via email at support@metrik.com."
    },
    {
        question: "Is my data secure with Metrik?",
        answer: "We take data security very seriously. We use industry-standard encryption and security measures to protect your data."
    }
];

export const socialLinks = [
    { name: "Facebook", icon: FacebookIcon, href: "#" },
    { name: "Twitter", icon: TwitterIcon, href: "#" },
    { name: "Instagram", icon: InstagramIcon, href: "#" },
    { name: "LinkedIn", icon: LinkedinIcon, href: "#" }
];

export const footerLinks = [
    { name: "About", href: "#" },
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Contact", href: "#" }
];