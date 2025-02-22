"use client";

import Confetti from "react-confetti";
import { useEffect, useState } from "react";

import WebsiteDetailsData from "./WebsiteDetailsData";
import WebsiteDetailsHeader from "./WebsiteDetailsHeader";

interface WebsiteDetailsContentProps {
    domain: string;
}

const WebsiteDetailsContent = ({ domain }: WebsiteDetailsContentProps) => {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const firstView = localStorage.getItem(`first-view-${domain}`);
        if (firstView) {
            localStorage.removeItem(`first-view-${domain}`);
            setShowConfetti(true);
        }
    }, []);

    return (
        <>
            {showConfetti && (
                <Confetti
                    width={document.documentElement.clientWidth}
                    height={document.documentElement.clientHeight}
                    numberOfPieces={300}
                    recycle={false}
                    onConfettiComplete={() => setShowConfetti(false)}
                />
            )}
            <div className="container pt-6 pb-12 overflow-x-hidden">
                <WebsiteDetailsHeader domain={domain} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <WebsiteDetailsData domain={domain} />
                </div>
            </div>
        </>
    );
};

export default WebsiteDetailsContent;