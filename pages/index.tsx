import Hero from "@/components/home-page/hero";
import React from "react";

const HomePage: React.FC = () => {
    return (
        <>
            <Hero
                title="Search Your Favorite Movie Now"
                subtitle="You could search for your favorite movie and bookmark it for later"
                ctaText="Seach"
                ctaLink="/"
            >
                Home
            </Hero>
        </>
    );
};

export default HomePage;
