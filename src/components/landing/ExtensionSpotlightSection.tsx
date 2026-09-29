import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileSearch,
  Highlighter,
  Zap,
  ExternalLink
} from 'lucide-react';
import { ChromeIcon } from '../common/Icons';

export const ExtensionSpotlightSection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section id="extension" className="py-20 bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-950 dark:to-slate-900 border-t border-slate-200 dark:border-slate-900 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <ChromeIcon className="w-3.5 h-3.5" />
              <span>Chrome Manifest V3 Sidepanel</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Bring Frontier AI into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
                Every Chrome Tab
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Never copy-paste an article into a new tab again. EchoGPT docks securely on the side of your active browser window. Summarize 30-page documents, decipher dense research papers, and draft email replies in context.
            </p>

            {/* Core Capability Checklist */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Instant Global Hotkey</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-cyan-700 dark:text-cyan-300 font-mono">Ctrl+Shift+E</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-cyan-700 dark:text-cyan-300 font-mono">⌘+Shift+E</kbd> to reveal the assistant anywhere.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                  <FileSearch className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">One-Click Webpage Summarization</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Automatically parses DOM content, stripping ads and cookie banners, delivering an executive breakdown in 2 seconds.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                  <Highlighter className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Highlight & Explain Selection</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Select any word, code block, or formula on any site to trigger instant contextual explanations.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigateTo('extension')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:brightness-110 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
              >
                <ChromeIcon className="w-4 h-4" />
                <span>Launch Extension Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs"
              >
                <span>Chrome Web Store Listing</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              </a>
            </div>
          </div>

          {/* Right Visual: Mock Browser Window with Docked Sidebar */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-none overflow-hidden ring-1 ring-black/5 dark:ring-white/10">

              {/* Chrome Browser Frame Bar */}
              <div className="p-3 bg-slate-100 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex-1 max-w-xs mx-auto px-3 py-1 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-mono truncate text-center">
                  🔒 https://techcrunch.com/article/ai-frontier
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="p-1 rounded bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Browser Body with Split: Left web page + Right EchoGPT Sidepanel */}
              <div className="grid grid-cols-12 min-h-[380px]">

                {/* Left: Web Content (Article) */}
                <div className="col-span-7 p-4 sm:p-5 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    TechCrunch Tech Analysis
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                    Why Unified AI Ecosystems Are Replacing Single Model Silos
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    By 2026, enterprise developers report interacting with at least three distinct AI foundation models daily. As model strengths diverge, the browser sidepanel has emerged as the highest leverage workflow surface...
                  </p>

                  <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-200/80 text-[11px] text-indigo-900 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300">
                    ✨ <strong>Highlighted Selection</strong>: "Browser sidepanels reduce context switching by 74% compared to separate browser tabs."
                  </div>
                </div>

                {/* Right: EchoGPT Sidepanel Docked */}
                <div className="col-span-5 p-3.5 bg-slate-50 dark:bg-slate-900 flex flex-col justify-between space-y-3">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">EchoGPT</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        Sidepanel Active
                      </span>
                    </div>

                    {/* Quick Summarize Action */}
                    <button
                      onClick={() => navigateTo('extension')}
                      className="w-full py-1.5 px-2 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 dark:bg-indigo-600/30 dark:hover:bg-indigo-600/50 border border-indigo-500/30 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Zap className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                      <span>Summarize Webpage</span>
                    </button>

                    {/* Response Card */}
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 space-y-1.5 shadow-xs">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-700 dark:text-cyan-300">
                        <span>Claude 3.5 Sonnet</span>
                      </div>
                      <p className="leading-relaxed">
                        • Single-model fragmentation causes high fatigue.<br />
                        • Multi-model sidepanels offer zero-latency aggregation.
                      </p>
                    </div>
                  </div>

                  {/* Quick Bottom Bar */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 text-center font-mono">
                    Press <span className="text-cyan-600 dark:text-cyan-400 font-bold">Ctrl+Shift+E</span> to close
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
