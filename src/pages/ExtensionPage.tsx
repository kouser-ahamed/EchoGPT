import React, { useState } from 'react';
import { ExtensionUI } from '../components/extension/ExtensionUI';
import { useApp } from '../context/AppContext';
import {
  Layout,
  Maximize2,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Globe,
  Star,
  ExternalLink,
  ShieldCheck,
  Highlighter,
  Sparkles
} from 'lucide-react';
import { ChromeIcon } from '../components/common/Icons';

export const ExtensionPage: React.FC = () => {
  const { showToast } = useApp();
  const [extensionMode, setExtensionMode] = useState<'sidepanel' | 'popup'>('sidepanel');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);
  const [highlighted, setHighlighted] = useState<boolean>(false);

  const mockArticleUrl = 'https://techcrunch.com/2026/09/future-of-agentic-ecosystems';

  const handleSimulateHighlight = () => {
    setHighlighted(true);
    showToast('Text highlighted on page! EchoGPT detected selection.', 'info');
  };

  const handleClearHighlight = () => {
    setHighlighted(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Banner & Mode Control */}
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ChromeIcon className="w-3.5 h-3.5" />
              <span>Interactive Chrome Extension Simulator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              EchoGPT — Multi-AI Chat Sidebar Concept
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Experience how EchoGPT integrates directly into Google Chrome via Manifest V3 Sidepanel API.
            </p>
          </div>

          {/* Interactive Mode & Demo Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1 text-xs">
              <button
                onClick={() => setExtensionMode('sidepanel')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  extensionMode === 'sidepanel'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span>Side Panel Mode</span>
              </button>

              <button
                onClick={() => {
                  setExtensionMode('popup');
                  setIsPopupOpen(true);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  extensionMode === 'popup'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Popup Window Mode</span>
              </button>
            </div>

            <button
              onClick={handleSimulateHighlight}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 shadow-xs transition-colors"
            >
              <Highlighter className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Simulate Highlight</span>
            </button>
          </div>
        </div>
      </div>

      {/* Realistic Chrome Browser Window Frame */}
      <div className="max-w-6xl mx-auto rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl overflow-hidden ring-1 ring-slate-200/80 dark:ring-white/10">
        
        {/* Chrome Tab Bar */}
        <div className="bg-slate-100 dark:bg-slate-900 px-3 pt-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Window dots */}
            <div className="flex items-center gap-1.5 px-1 mr-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Active Chrome Tab */}
            <div className="px-4 py-2 rounded-t-xl bg-white dark:bg-slate-950 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2 border-t border-x border-slate-200 dark:border-slate-800 shadow-xs">
              <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="truncate max-w-[200px]">TechCrunch: Agentic AI Systems</span>
              <span className="text-slate-400 hover:text-slate-700 dark:hover:text-white ml-2 text-xs">×</span>
            </div>

            {/* New Tab + */}
            <div className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs cursor-pointer">
              +
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            Chrome 128 (Manifest V3)
          </div>
        </div>

        {/* Chrome Navigation / Omnibox Bar */}
        <div className="p-2.5 bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Address Bar */}
          <div className="flex-1 max-w-xl mx-auto px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2 truncate">
              <span className="text-emerald-500">🔒</span>
              <span className="truncate">{mockArticleUrl}</span>
            </div>
            <Star className="w-3.5 h-3.5 text-slate-400 hover:text-amber-500 cursor-pointer shrink-0" />
          </div>

          {/* Extension Icons in Toolbar */}
          <div className="flex items-center gap-2 relative">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden lg:inline mr-1">
              Hotkey: <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300">Ctrl+Shift+E</kbd>
            </span>

            {/* EchoGPT Extension Action Icon */}
            <button
              onClick={() => {
                if (extensionMode === 'popup') setIsPopupOpen(!isPopupOpen);
              }}
              className="relative p-1.5 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md hover:scale-105 active:scale-95 transition-all"
              title="EchoGPT - Multi-AI Chat Sidebar"
            >
              <Sparkles className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
          </div>
        </div>

        {/* Browser Content Area */}
        <div className="relative flex flex-col lg:flex-row min-h-[580px] bg-white dark:bg-slate-950">
          
          {/* Main Web Page Content (Simulated Article) */}
          <div className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-6">
            <div className="max-w-2xl space-y-4">
              
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                <span>Featured Tech Analysis</span>
                <span>•</span>
                <span>September 2026</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                The Shift to Multi-Model Unified Workspaces in Enterprise Engineering
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 py-2 border-y border-slate-200 dark:border-slate-800">
                <span>By Sarah Lin, Principal Tech Strategist</span>
                <span>•</span>
                <span>8 min read</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified Technical Review</span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                As artificial intelligence foundational models mature, the industry has reached a clear inflection point: <strong>no single model wins across all modalities</strong>.
              </p>

              {/* Interactive Highlight Section */}
              <div
                className={`p-4 rounded-xl transition-all duration-300 ${
                  highlighted
                    ? 'bg-amber-500/15 border-2 border-amber-500/60 shadow-lg text-slate-900 dark:text-white'
                    : 'bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                    {highlighted ? '✨ Selected Text Active' : 'Key Insight Section'}
                  </span>
                  {highlighted && (
                    <button
                      onClick={handleClearHighlight}
                      className="text-[11px] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <p className="text-sm leading-relaxed">
                  "Developer telemetry demonstrates that switching browser tabs to consult standalone ChatGPT or Claude instances causes an average state-recovery penalty of 4.5 minutes. Integrating multi-model intelligence directly into the browser sidebar preserves context and improves daily engineering throughput by 32%."
                </p>

                {highlighted && (
                  <div className="mt-3 pt-3 border-t border-amber-500/30 flex items-center gap-2">
                    <span className="text-xs text-amber-700 dark:text-amber-200 font-medium">
                      EchoGPT Tooltip:
                    </span>
                    <button
                      onClick={() => showToast('Injected highlight into EchoGPT prompt', 'success')}
                      className="px-2.5 py-1 rounded bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-xs"
                    >
                      Explain with EchoGPT
                    </button>
                  </div>
                )}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Furthermore, financial audits indicate that paying $20/month per seat across three or four separate providers (OpenAI, Anthropic, Google, DeepSeek) creates budget sprawl of over $700 per employee annually. Unified ecosystems like <strong>EchoGPT</strong> consolidate access into a unified interface, lowering cost while elevating capabilities.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">Key Quantitative Findings:</span>
                <ul className="list-disc list-inside space-y-1">
                  <li>Context switching reduced by 74% using Chrome Side Panel API.</li>
                  <li>Side-by-side prompt benchmarking identified the optimal model 2.4x faster.</li>
                  <li>Zero-retention architecture ensures zero enterprise IP leakage.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* DOCKED SIDEPANEL MODE (400px fixed width on right) */}
          {extensionMode === 'sidepanel' && (
            <div className="w-full lg:w-[420px] border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col shrink-0 animate-in slide-in-from-right duration-300">
              <ExtensionUI mode="sidepanel" mockArticleText={mockArticleUrl} />
            </div>
          )}

          {/* FLOATING POPUP MODE (Anchored top right) */}
          {extensionMode === 'popup' && isPopupOpen && (
            <div className="absolute top-2 right-4 z-30 animate-in fade-in zoom-in-95 duration-200">
              <ExtensionUI
                mode="popup"
                onClose={() => setIsPopupOpen(false)}
                mockArticleText={mockArticleUrl}
              />
            </div>
          )}

        </div>

      </div>

      {/* Architecture & Extension Technical Specifications */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none space-y-2">
          <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 w-fit">
            <Layout className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Manifest V3 Sidepanel API</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Docks permanently alongside any active Chrome tab. Does not obstruct webpage content and retains persistent conversational state between navigation events.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none space-y-2">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">DOM Content Scripts</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Securely extracts article titles, body copy, and user selection on demand. Strips unwanted advertising noise and trackers prior to AI synthesis.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none space-y-2">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Zero Background Tracking</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Only triggered when explicitly invoked by user shortcut or button click. Conforms with Google Chrome Web Store enterprise security guidelines.
          </p>
        </div>
      </div>

      {/* Bottom CTA to Web Store */}
      <div className="max-w-6xl mx-auto p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Official EchoGPT Chrome Extension
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Published by AppifyDevs on Google Chrome Web Store.
          </p>
        </div>

        <a
          href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-sm"
        >
          <ChromeIcon className="w-4 h-4" />
          <span>View on Chrome Web Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
