import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import WhatSentinelDoes from '@/components/landing/WhatSentinelDoes';
import CertificationPipelineSection from '@/components/landing/CertificationPipelineSection';
import MarketplacePreview from '@/components/landing/MarketplacePreview';
import PricingSection from '@/components/landing/PricingSection';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080B12]">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <WhatSentinelDoes />
      <CertificationPipelineSection />
      <MarketplacePreview />
      <PricingSection />
      <Footer />
    </main>
  );
}
