import React from 'react';
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
    <section id="features" className="py-20 bg-slate-950/60 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            Enterprise Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Modern{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              AI Productivity
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Everything you need to orchestrate frontier language models, summarize live webpages, and eliminate fragmented tool fatigue.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CORE_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="group relative p-6 sm:p-8 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              {/* Subtle card top glow */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                {/* Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-tr ${feature.gradient} text-white shadow-md group-hover:scale-105 transition-transform`}>
                    {iconMap[feature.icon]}
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {feature.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Bottom Spec Badge */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {feature.stats}
                </span>

                <button
                  onClick={() => {
                    if (feature.id === 'chrome-sidebar') navigateTo('extension');
                    else navigateTo('webapp');
                  }}
                  className="text-indigo-400 group-hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
