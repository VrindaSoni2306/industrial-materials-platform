import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import IndustriesSection from '../components/home/IndustriesSection';
import CompanyIntro from '../components/home/CompanyIntro';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <IndustriesSection />
      <CompanyIntro />
    </main>
  );
}
