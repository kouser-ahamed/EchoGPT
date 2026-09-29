import React from 'react';
import { COMPARISON_MATRIX } from '../../data/features';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhyEchoGPTSection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            Value Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Teams Switch to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
              EchoGPT
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Compare the unified EchoGPT ecosystem against juggling multiple siloed AI subscriptions.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="p-4 sm:p-5 font-bold text-white w-2/5">Capability / Matrix</th>
                  <th className="p-4 sm:p-5 font-bold text-indigo-400 bg-indigo-500/10 border-x border-indigo-500/20 text-center w-1/5">
                    <div className="flex items-center justify-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>EchoGPT</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 font-medium text-slate-400 text-center w-1/5">
                    ChatGPT Plus
                  </th>
                  <th className="p-4 sm:p-5 font-medium text-slate-400 text-center w-1/5">
                    Claude Pro
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-slate-200">
                      {row.feature}
                    </td>

                    {/* EchoGPT (Highlighted Column) */}
                    <td className="p-4 sm:p-5 bg-indigo-500/5 border-x border-indigo-500/20 text-center font-bold text-white">
                      {typeof row.echoGpt === 'boolean' ? (
                        row.echoGpt ? (
                          <div className="flex items-center justify-center text-emerald-400">
                            <div className="p-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          </div>
                        ) : (
                          <X className="w-4 h-4 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-emerald-400 font-extrabold">{row.echoGpt}</span>
                      )}
                    </td>

                    {/* ChatGPT Plus */}
                    <td className="p-4 sm:p-5 text-center text-slate-400">
                      {typeof row.chatGptPlus === 'boolean' ? (
                        row.chatGptPlus ? (
                          <Check className="w-4 h-4 text-slate-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span>{row.chatGptPlus}</span>
                      )}
                    </td>

                    {/* Claude Pro */}
                    <td className="p-4 sm:p-5 text-center text-slate-400">
                      {typeof row.claudePro === 'boolean' ? (
                        row.claudePro ? (
                          <Check className="w-4 h-4 text-slate-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-600 mx-auto" />
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
          <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">
                Save up to $576 per year per seat
              </p>
              <p className="text-xs text-slate-400">
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
