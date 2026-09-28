import React, { useState } from 'react';
import { AI_MODELS } from '../../data/models';
import { useApp } from '../../context/AppContext';
import {
  Zap,
  Bot
} from 'lucide-react';

export const ModelsSection: React.FC = () => {
  const { navigateTo, setSelectedModelId } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Code & Nuance', 'General & Vision', 'Massive Context', 'Deep Reasoning'];

  const filteredModels = selectedCategory === 'All'
    ? AI_MODELS
    : AI_MODELS.filter((m) => m.category === selectedCategory || m.strengths.some(s => s.toLowerCase().includes(selectedCategory.toLowerCase())));

  const handleLaunchModel = (modelId: string) => {
    setSelectedModelId(modelId);
    navigateTo('webapp');
  };

  return (
    <section id="models" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Frontier AI Aggregation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Supported Frontier{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
              AI Models
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Access the optimal intelligence engine for every task. Never compromise between coding precision, long-context recall, or blazing generation speed.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className={`relative rounded-2xl bg-slate-900/70 border ${model.borderColor} p-6 flex flex-col justify-between hover:bg-slate-900 transition-all duration-300 shadow-xl group`}
            >
              <div>
                {/* Header: Avatar, Name, Provider, Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-2xl border border-slate-800 shadow-inner group-hover:scale-105 transition-transform">
                      {model.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>{model.name}</span>
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">{model.provider}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${model.borderColor} ${model.bgLight}`}>
                    {model.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[44px]">
                  {model.description}
                </p>

                {/* Benchmark Metrics Bar */}
                <div className="mt-5 grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Context Window</span>
                    <span className="font-bold text-white font-mono">{model.contextWindow}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Speed Rating</span>
                    <span className="font-bold text-emerald-400 font-mono flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {model.speed.split(' ')[0]}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Reasoning Benchmark</span>
                    <span className="font-bold text-indigo-300 font-mono">{model.reasoningScore}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Coding Benchmark</span>
                    <span className="font-bold text-cyan-300 font-mono">{model.codeScore}</span>
                  </div>
                </div>

                {/* Key Strengths Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {model.strengths.map((str, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/60 flex items-center gap-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-indigo-400" />
                      <span>{str}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <button
                  onClick={() => handleLaunchModel(model.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Start Chatting with {model.shortName}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
