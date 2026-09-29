import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AI_MODELS } from '../../data/models';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import {
  Columns2,
  Play,
  Sparkles,
  Check,
  Copy,
  Loader2
} from 'lucide-react';

export const SplitCompareView: React.FC = () => {
  const {
    selectedModelId,
    setSelectedModelId,
    compareModelId,
    setCompareModelId,
    compareResults,
    sendComparePrompt,
    isGenerating,
    showToast
  } = useApp();

  const [promptInput, setPromptInput] = useState<string>('');
  const [copiedSide, setCopiedSide] = useState<'a' | 'b' | null>(null);

  const modelA = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];
  const modelB = AI_MODELS.find((m) => m.id === compareModelId) || AI_MODELS[1];

  const handleRun = () => {
    if (!promptInput.trim() || isGenerating) return;
    sendComparePrompt(promptInput);
  };

  const handlePreset = (text: string) => {
    setPromptInput(text);
    sendComparePrompt(text);
  };

  const handleCopy = (side: 'a' | 'b', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSide(side);
    showToast('Copied output to clipboard', 'success');
    setTimeout(() => setCopiedSide(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Banner explaining Split-View */}
      <div className="px-4 py-2.5 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold">
          <Columns2 className="w-4 h-4" />
          <span>Real-time Dual Model Evaluation Active</span>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
          Comparing outputs from {modelA.name} and {modelB.name}
        </span>
      </div>

      {/* Parallel Column Headers */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
        {/* Model A Selector Header */}
        <div className="p-3 sm:px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{modelA.avatar}</span>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Stream A</label>
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="bg-transparent text-sm font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                {AI_MODELS.map((m) => (
                  <option key={m.id} value={m.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
            {modelA.speed.split(' ')[0]}
          </span>
        </div>

        {/* Model B Selector Header */}
        <div className="p-3 sm:px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{modelB.avatar}</span>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Stream B</label>
              <select
                value={compareModelId}
                onChange={(e) => setCompareModelId(e.target.value)}
                className="bg-transparent text-sm font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                {AI_MODELS.map((m) => (
                  <option key={m.id} value={m.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-500/20">
            {modelB.speed.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Split Output Columns Stream */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 p-4 sm:p-6 gap-6 md:gap-0">
        {/* Output Column A */}
        <div className="md:pr-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{modelA.name} Output Stream</span>
              </span>

              {compareResults?.modelA?.response && (
                <button
                  onClick={() => handleCopy('a', compareResults.modelA.response)}
                  className="text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  {copiedSide === 'a' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSide === 'a' ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            <div className="pt-3 min-h-[140px]">
              {isGenerating ? (
                <div className="space-y-3 py-6">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-5/6" />
                </div>
              ) : compareResults ? (
                <MarkdownRenderer content={compareResults.modelA.response} />
              ) : (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 space-y-2">
                  <Sparkles className="w-8 h-8 mx-auto text-slate-400 dark:text-slate-600 opacity-60" />
                  <p className="text-xs">Send a query below to test {modelA.name}</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Context: {modelA.contextWindow}</span>
            <span>Reasoning: {modelA.reasoningScore}</span>
          </div>
        </div>

        {/* Output Column B */}
        <div className="md:pl-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span>{modelB.name} Output Stream</span>
              </span>

              {compareResults?.modelB?.response && (
                <button
                  onClick={() => handleCopy('b', compareResults.modelB.response)}
                  className="text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  {copiedSide === 'b' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSide === 'b' ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            <div className="pt-3 min-h-[140px]">
              {isGenerating ? (
                <div className="space-y-3 py-6">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-4/5" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-2/3" />
                </div>
              ) : compareResults ? (
                <MarkdownRenderer content={compareResults.modelB.response} />
              ) : (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 space-y-2">
                  <Sparkles className="w-8 h-8 mx-auto text-slate-400 dark:text-slate-600 opacity-60" />
                  <p className="text-xs">Send a query below to test {modelB.name}</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Context: {modelB.contextWindow}</span>
            <span>Reasoning: {modelB.reasoningScore}</span>
          </div>
        </div>
      </div>

      {/* Compare Prompt Input Composer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto space-y-2">
          {/* Quick presets */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 shrink-0">Presets:</span>
            <button
              onClick={() => handlePreset('Explain React 19 Actions vs traditional React Hook Form handling.')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white whitespace-nowrap transition-colors border border-slate-200 dark:border-transparent"
            >
              React 19 Actions
            </button>
            <button
              onClick={() => handlePreset('Write an algorithm to detect cycle in a directed graph using DFS.')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white whitespace-nowrap transition-colors border border-slate-200 dark:border-transparent"
            >
              Graph Cycle DFS
            </button>
            <button
              onClick={() => handlePreset('Draft a 3-bullet cold email to prospective enterprise clients for AI tooling.')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white whitespace-nowrap transition-colors border border-slate-200 dark:border-transparent"
            >
              Enterprise Pitch
            </button>
          </div>

          {/* Input Bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRun();
              }}
              placeholder={`Send single prompt to both ${modelA.name} and ${modelB.name}...`}
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
            />
            <button
              onClick={handleRun}
              disabled={!promptInput.trim() || isGenerating}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
              <span>Compare</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
