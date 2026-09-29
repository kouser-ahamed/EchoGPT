import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { CORE_FEATURES } from '../../data/features';
import {
  Layers,
  Columns2,
  Brain,
  Cpu,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { ChromeIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const FeaturesSection: React.FC = () => {
  const { navigateTo } = useApp();

  const iconMap: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-6 h-6" />,
    Chrome: <ChromeIcon className="w-6 h-6" />,
    Columns2: <Columns2 className="w-6 h-6" />,
    Brain: <Brain className="w-6 h-6" />,
    Cpu: <Cpu className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />
  };

  return (
    <section id="features" className="py-20 bg-slate-50/50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            Enterprise Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for Modern{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400">
              AI Productivity
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Everything you need to orchestrate frontier language models, summarize live webpages, and eliminate fragmented tool fatigue.
          </p>
        </div>

        {/* Features Grid with Stagger & High-Fidelity Hover Physics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {CORE_FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-white/90 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/80 hover:border-indigo-400/60 dark:hover:border-slate-700/80 shadow-sm shadow-slate-200/50 dark:shadow-lg transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
            >
              {/* Subtle card top glow */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                {/* Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-tr ${feature.gradient} text-white shadow-md group-hover:scale-105 transition-transform`}>
                    {iconMap[feature.icon]}
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {feature.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Bottom Spec Badge */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  {feature.stats}
                </span>

                <button
                  onClick={() => {
                    if (feature.id === 'chrome-sidebar') navigateTo('extension');
                    else navigateTo('webapp');
                  }}
                  className="text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
