import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { ModelsSection } from '../components/landing/ModelsSection';
import { InteractiveComparisonPlayground } from '../components/landing/InteractiveComparisonPlayground';
import { ExtensionSpotlightSection } from '../components/landing/ExtensionSpotlightSection';
import { WhyEchoGPTSection } from '../components/landing/WhyEchoGPTSection';
import { PricingSection } from '../components/landing/PricingSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { FAQSection } from '../components/landing/FAQSection';
import { CTASection } from '../components/landing/CTASection';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const LandingPage: React.FC = () => {
  return (
    <div className="relative flex flex-col w-full max-w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden">
      {/* 1. Ambient Background Glow Motion (Continuous subtle soft floating loops) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.1, 0.95, 1]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-cyan-500/10 blur-[130px] dark:from-indigo-600/20 dark:via-purple-600/15 dark:to-cyan-500/15"
        />

        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.05, 1]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-cyan-400/15 via-blue-500/10 to-indigo-500/15 blur-[120px] dark:from-cyan-500/15 dark:via-blue-600/10 dark:to-indigo-600/15"
        />

        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -30, 30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-2/3 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 blur-[120px] dark:from-purple-600/15 dark:via-indigo-600/15 dark:to-cyan-500/10"
        />
      </div>

      {/* 1. Hero Section (Immediate smooth entrance above the fold) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <HeroSection />
      </motion.div>

      {/* 2. Features Grid (Scroll reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={sectionVariants}
      >
        <FeaturesSection />
      </motion.div>

      {/* 3. AI Models Frontier Showcase (Scroll reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={sectionVariants}
      >
        <ModelsSection />
      </motion.div>

      {/* 4. Interactive Comparison Playground (Scroll reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={sectionVariants}
      >
        <InteractiveComparisonPlayground />
      </motion.div>

      {/* 5. Extension Spotlight Section (Scroll reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={sectionVariants}
      >
        <ExtensionSpotlightSection />
      </motion.div>

      {/* 6. Why EchoGPT Differentiators & Matrix (Scroll reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={sectionVariants}
      >
        <WhyEchoGPTSection />
      </motion.div>

      {/* 7. Pricing & Plans Section (Scroll reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={sectionVariants}
      >
        <PricingSection />
      </motion.div>

      {/* 8. Testimonials & Social Proof (Scroll reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={sectionVariants}
      >
        <TestimonialsSection />
      </motion.div>

      {/* 9. FAQ Accordion Section (Scroll reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={sectionVariants}
      >
        <FAQSection />
      </motion.div>

      {/* 10. Final Call-to-Action Banner (Scroll reveal) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={sectionVariants}
      >
        <CTASection />
      </motion.div>
    </div>
  );
};
