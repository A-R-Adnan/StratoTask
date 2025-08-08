import React from "react";
import HeroContent from "../components/HeroContent";
import HowItWorks from "../components/HowItWorks";
import Workflows from '../components/Workflows';
import SeeWork from '../components/SeeWork';
import PowerfulWays from '../components/PowerfulWays';
import PriceSection from '../components/PriceSection';
import SearchSection from "../components/SearchSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <HeroContent />
      <HowItWorks />
      <Workflows />
      <SeeWork />
      <PowerfulWays />
      <PriceSection />
      <SearchSection />
      <Footer />
    </>
  );
};

export default HomePage;
