import React, { useState } from 'react';
import { AI_MODELS } from '../../data/models';
import { useApp } from '../../context/AppContext';
import {
  Play,
  Bot,
  ArrowRight,
  Check,
  Copy
} from 'lucide-react';
import { MarkdownRenderer } from '../common/MarkdownRenderer';

export const InteractiveComparisonPlayground: React.FC = () => {
  const { navigateTo, setSelectedModelId, setCompareModelId, setAppMode } = useApp();

  const [modelAId, setModelAId] = useState<string>('gpt-4o');
  const [modelBId, setModelBId] = useState<string>('claude-3-5-sonnet');
  const [customPrompt, setCustomPrompt] = useState<string>(
    'Compare the performance trade-offs of Client-Side Rendering (CSR) vs Server-Side Rendering (SSR) for real-time AI dashboards.'
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [, setHasRun] = useState<boolean>(false);
  const [copiedCol, setCopiedCol] = useState<'a' | 'b' | null>(null);

  const presetPrompts = [
    {
      title: 'CSR vs SSR for AI Dashboards',
      text: 'Compare the performance trade-offs of Client-Side Rendering (CSR) vs Server-Side Rendering (SSR) for real-time AI dashboards.'
    },
    {
      title: 'Debounce with Immediate Trigger',
      text: 'Write a TypeScript debounce function that supports an immediate leading-edge trigger.'
    },
    {
      title: 'Market Viability of Browser AI Sidebars',
      text: 'Give a 3-bullet analysis on why browser native sidepanels are winning against standalone chat tabs.'
    }
  ];

  const modelA = AI_MODELS.find((m) => m.id === modelAId) || AI_MODELS[0];
  const modelB = AI_MODELS.find((m) => m.id === modelBId) || AI_MODELS[1];

  const handleRunComparison = async () => {
    setIsRunning(true);
    setHasRun(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsRunning(false);
  };

  const handleOpenInApp = () => {
    setSelectedModelId(modelAId);
    setCompareModelId(modelBId);
    setAppMode('compare');
    navigateTo('webapp');
  };

  const copyResponse = (col: 'a' | 'b', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCol(col);
    setTimeout(() => setCopiedCol(null), 2000);
  };

  const responseA = `### ${modelA.name} Analysis

When architecting real-time AI dashboards:

1. **First Contentful Paint (FCP)**: **SSR wins**. Server generates raw HTML shell instantly, preventing empty loading screens.
2. **WebSocket / Token Streaming**: **CSR wins**. Once hydrated, browser client handles high-frequency socket updates (40+ tokens/sec) without server round-trips.
3. **Verdict**: **Hybrid Architecture**. SSR the navigation, metrics scaffolding, and initial conversation state; hydrate client components for reactive streaming and WebGL charts.`;

  const responseB = `### ${modelB.name} Architectural Breakdown

Comparing **CSR vs. SSR** through latency and developer ergonomical lenses:

| Metric | Client-Side (CSR) | Server-Side (SSR) |
| :--- | :--- | :--- |
| **Initial TTFB** | Fastest (Static CDN) | Server compute latency |
| **Time-to-Interactive** | Higher bundle parsing | Rapid initial render |
| **Streaming Overhead** | Low (Direct client fetch) | Requires HTTP chunked encoding |

> **Nuanced Insight**: For multi-model aggregators like EchoGPT, client-side streaming direct to worker threads isolates LLM variance from your primary backend rendering cycle.`;

  return (
    <section id="compare" className="py-20 bg-white dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
            Signature Feature
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dual-Model Split Comparison{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 dark:from-amber-400 dark:via-orange-400 dark:to-rose-400">
              Playground
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Never guess which AI is best. Send one prompt to two different models simultaneously and benchmark reasoning, code quality, and speed side-by-side.
          </p>
        </div>

        {/* Playground Container */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-2xl overflow-hidden backdrop-blur-xl">

          {/* Controls Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/60 space-y-4">

            {/* Model Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                  Model A (Left Stream)
                </label>
                <select
                  value={modelAId}
                  onChange={(e) => setModelAId(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {AI_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.provider})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                  Model B (Right Stream)
                </label>
                <select
                  value={modelBId}
                  onChange={(e) => setModelBId(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {AI_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.provider})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Prompt Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">Preset:</span>
              {presetPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setCustomPrompt(p.text)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap transition-colors border border-slate-200 dark:border-slate-700/60 shadow-xs"
                >
                  {p.title}
                </button>
              ))}
            </div>

            {/* Prompt Input & Trigger */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter prompt to evaluate across both models..."
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={handleRunComparison}
                disabled={isRunning}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all shrink-0 disabled:opacity-50"
              >
                {isRunning ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Evaluating...</span>
                  </span>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Run Comparison</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Dual Stream Split View */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 bg-slate-50/40 dark:bg-slate-950/40 min-h-[300px]">

            {/* Column A */}
            <div className="p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{modelA.avatar}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{modelA.name}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{modelA.provider}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => copyResponse('a', responseA)}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 p-1 rounded bg-slate-100 dark:bg-slate-800/60"
                  >
                    {copiedCol === 'a' ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCol === 'a' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="pt-3 min-h-[140px]">
                  {isRunning ? (
                    <div className="space-y-2 py-4">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-3/4" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-full" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-5/6" />
                    </div>
                  ) : (
                    <MarkdownRenderer content={responseA} />
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Speed: {modelA.speed.split(' ')[0]}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">Completed in 380ms</span>
              </div>
            </div>

            {/* Column B */}
            <div className="p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{modelB.avatar}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{modelB.name}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{modelB.provider}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => copyResponse('b', responseB)}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 p-1 rounded bg-slate-100 dark:bg-slate-800/60"
                  >
                    {copiedCol === 'b' ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCol === 'b' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="pt-3 min-h-[140px]">
                  {isRunning ? (
                    <div className="space-y-2 py-4">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-4/5" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-full" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-2/3" />
                    </div>
                  ) : (
                    <MarkdownRenderer content={responseB} />
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Speed: {modelB.speed.split(' ')[0]}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">Completed in 410ms</span>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Action to Launch in Full App */}
          <div className="p-4 bg-slate-100/70 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
              Want to compare code generation or upload PDF files to both models?
            </span>
            <button
              onClick={handleOpenInApp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Open Split-View in Web App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
