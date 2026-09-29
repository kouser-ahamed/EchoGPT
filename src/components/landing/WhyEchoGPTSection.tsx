import React from 'react';
import { motion } from 'framer-motion';
import { COMPARISON_MATRIX } from '../../data/features';
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  Layers,
  TrendingDown,
  ShieldCheck,
  PanelRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhyEchoGPTSection: React.FC = () => {
  const { navigateTo } = useApp();

  const differentiators = [
    {
      title: 'Zero Tab Juggling',
      subtitle: 'One Unified Window',
      description:
        'Consolidate OpenAI, Anthropic, DeepSeek, and Google into a single active workspace. Never lose prompt context across 10 disjointed browser tabs again.',
      icon: <Layers className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      accent: 'border-indigo-500/20 bg-indigo-500/10'
    },
    {
      title: 'API Cost Optimization',
      subtitle: 'Save $500+/Year Per Seat',
      description:
        'Drop three separate $20/month accounts. EchoGPT provides all frontier models under a single predictable plan starting at $9.99/month with zero token markup.',
      icon: <TrendingDown className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
      accent: 'border-emerald-500/20 bg-emerald-500/10'
    },
    {
      title: 'Privacy-First Architecture',
      subtitle: 'Zero Data Retention',
      description:
        'Your code, confidential documents, and proprietary engineering prompts are never used to train public AI models. Full GDPR and SOC2 compliance ready.',
      icon: <ShieldCheck className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
      accent: 'border-purple-500/20 bg-purple-500/10'
    },
    {
      title: 'Instant Sidepanel Access',
      subtitle: 'Chrome Manifest V3',
      description:
        'Press Alt+E anywhere on the web to slide out your multi-model AI assistant. Summarize documentation, explain code snippets, and draft emails in real-time.',
      icon: <PanelRight className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />,
      accent: 'border-cyan-500/20 bg-cyan-500/10'
    }
  ];

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            Value Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Teams Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 dark:from-purple-400 dark:via-indigo-400 dark:to-cyan-400">
              EchoGPT
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Compare the unified EchoGPT ecosystem against juggling multiple siloed AI subscriptions.
          </p>
        </div>

        {/* 4 Differentiator Blocks with Hover and Tap Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {differentiators.map((diff, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.98 }}
              className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 shadow-sm shadow-slate-200/50 dark:shadow-lg flex flex-col justify-between group transition-colors"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${diff.accent} mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                  {diff.icon}
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  {diff.subtitle}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                  {diff.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {diff.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/80">
                  <th className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white w-2/5">Capability / Matrix</th>
                  <th className="p-4 sm:p-5 font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-500/10 border-x border-indigo-200/60 dark:border-indigo-500/20 text-center w-1/5">
                    <div className="flex items-center justify-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                      <span>EchoGPT</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 font-medium text-slate-600 dark:text-slate-400 text-center w-1/5">
                    ChatGPT Plus
                  </th>
                  <th className="p-4 sm:p-5 font-medium text-slate-600 dark:text-slate-400 text-center w-1/5">
                    Claude Pro
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                {COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-slate-800 dark:text-slate-200">
                      {row.feature}
                    </td>

                    {/* EchoGPT (Highlighted Column) */}
                    <td className="p-4 sm:p-5 bg-indigo-50/40 dark:bg-indigo-500/5 border-x border-indigo-200/60 dark:border-indigo-500/20 text-center font-bold text-slate-900 dark:text-white">
                      {typeof row.echoGpt === 'boolean' ? (
                        row.echoGpt ? (
                          <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <div className="p-1 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          </div>
                        ) : (
                          <X className="w-4 h-4 text-slate-400 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{row.echoGpt}</span>
                      )}
                    </td>

                    {/* ChatGPT Plus */}
                    <td className="p-4 sm:p-5 text-center text-slate-600 dark:text-slate-400">
                      {typeof row.chatGptPlus === 'boolean' ? (
                        row.chatGptPlus ? (
                          <Check className="w-4 h-4 text-slate-500 dark:text-slate-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-400 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span>{row.chatGptPlus}</span>
                      )}
                    </td>

                    {/* Claude Pro */}
                    <td className="p-4 sm:p-5 text-center text-slate-600 dark:text-slate-400">
                      {typeof row.claudePro === 'boolean' ? (
                        row.claudePro ? (
                          <Check className="w-4 h-4 text-slate-500 dark:text-slate-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-400 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span>{row.claudePro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Card Banner */}
          <div className="p-6 bg-slate-100/70 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Save up to $576 per year per seat
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Get all leading frontier models in one bill with zero markup.
              </p>
            </div>

            <button
              onClick={() => navigateTo('webapp')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
