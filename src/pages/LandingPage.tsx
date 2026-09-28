import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { ModelsSection } from '../components/landing/ModelsSection';
import { InteractiveComparisonPlayground } from '../components/landing/InteractiveComparisonPlayground';
import { ExtensionSpotlightSection } from '../components/landing/ExtensionSpotlightSection';
import { WhyEchoGPTSection } from '../components/landing/WhyEchoGPTSection';
import { PricingSection } from '../components/landing/PricingSection';
import { FAQSection } from '../components/landing/FAQSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { CTASection } from '../components/landing/CTASection';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <HeroSection />
      <FeaturesSection />
      <ModelsSection />
      <InteractiveComparisonPlayground />
      <ExtensionSpotlightSection />
      <WhyEchoGPTSection />
      <PricingSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};
