import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, Bot } from 'lucide-react';
import { ChromeIcon } from '../common/Icons';

export const CTASection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-600/25 via-purple-600/20 to-cyan-500/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl backdrop-blur-xl text-center space-y-6">
          
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Supercharge Your Workflow with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              EchoGPT Today
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Consolidate your intelligence tools into one high-performance workspace and Chrome extension sidebar. No setup required.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('webapp')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:brightness-110 shadow-xl shadow-indigo-600/30 active:scale-95 transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>Launch EchoGPT Web App</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('extension')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all active:scale-95"
            >
              <ChromeIcon className="w-4 h-4 text-cyan-400" />
              <span>Explore Chrome Extension</span>
            </button>
          </div>

          <div className="pt-4 text-xs text-slate-500">
            Free forever starter plan • Instant access • End-to-end encrypted
          </div>

        </div>
      </div>
    </section>
  );
};
