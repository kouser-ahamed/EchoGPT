import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { AI_MODELS } from '../../data/models';
import { useApp } from '../../context/AppContext';
import {
  Zap,
  Bot,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  Gauge
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

export const ModelsSection: React.FC = () => {
  const { navigateTo, setSelectedModelId } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Code & Nuance', 'General & Vision', 'Massive Context', 'Deep Reasoning'];

  const filteredModels = selectedCategory === 'All'
    ? AI_MODELS
    : AI_MODELS.filter((m) =>
        m.category === selectedCategory ||
        m.strengths.some((s) => s.toLowerCase().includes(selectedCategory.toLowerCase()))
      );

  // Limit grid display to strictly 6 models
  const displayedModels = filteredModels.slice(0, 6);

  const handleLaunchModel = (modelId: string) => {
    setSelectedModelId(modelId);
    navigateTo('webapp', 'chat');
  };

  const handleExploreStore = () => {
    navigateTo('webapp', 'store');
  };

  return (
    <section id="models" className="py-20 bg-slate-50/50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Frontier AI Aggregation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Supported Frontier{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400">
              AI Models
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Access the optimal intelligence engine for every task. Never compromise between coding precision, long-context recall, or blazing generation speed.
          </p>
        </div>

        {/* Filter Tabs — swipeable strip on mobile, centered row from sm up.
            justify-start on mobile avoids the centered-overflow trap where the
            leading pills become unreachable by scrolling. */}
        <div className="flex items-center justify-start sm:justify-center gap-2 mb-12 mt-2 w-full -mx-1 px-1 py-2 overflow-x-auto no-scrollbar momentum-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Models Grid (Strictly 6 Cards with Stagger & Hover Physics) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full"
        >
          {displayedModels.map((model) => (
            <motion.div
              key={model.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.98 }}
              className={`relative rounded-2xl bg-white/95 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-400/60 dark:hover:border-slate-700 transition-all duration-300 shadow-sm shadow-slate-200/50 dark:shadow-xl group backdrop-blur-sm`}
            >
              <div>
                {/* Header: Avatar, Name, Provider, Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-2xl border border-slate-200 dark:border-slate-800 shadow-inner group-hover:scale-105 transition-transform duration-200">
                      {model.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors flex items-center gap-2">
                        <span>{model.name}</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{model.provider}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${model.borderColor} ${model.bgLight}`}>
                    {model.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed min-h-[44px]">
                  {model.description}
                </p>

                {/* Benchmark Metrics Bar */}
                <div className="mt-5 grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-0.5">
                      <Layers className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                      Context Window
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono text-xs">{model.contextWindow}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-0.5">
                      <Gauge className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                      Speed Rating
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-xs flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {model.speed.split(' ')[0]}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-0.5">
                      <Cpu className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                      Reasoning Benchmark
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-300 font-mono text-xs">{model.reasoningScore}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-0.5">
                      <Cpu className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      Coding Benchmark
                    </span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-300 font-mono text-xs">{model.codeScore}</span>
                  </div>
                </div>

                {/* Key Strengths Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {model.strengths.slice(0, 3).map((str, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 flex items-center gap-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                      <span>{str}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                <button
                  onClick={() => handleLaunchModel(model.id)}
                  className="w-full flex-1 min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 group/btn"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-200 group-hover/btn:scale-110 transition-transform" />
                  <span className="truncate">Start Chatting with {model.shortName}</span>
                </button>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* View All Models Hub Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleExploreStore}
            className="group relative inline-flex w-full sm:w-auto min-h-[44px] items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-indigo-950/80 dark:to-slate-900 border border-slate-300 dark:border-indigo-500/40 hover:border-indigo-400 text-slate-900 dark:text-white font-bold text-sm sm:text-base shadow-lg shadow-slate-200/50 dark:shadow-xl dark:shadow-indigo-950/60 hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-98 transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform" />
            <span>Explore All 100+ Models in Store &amp; Models Hub</span>
            <ArrowRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
