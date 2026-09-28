import React, { useState } from 'react';
import { STORE_MODELS } from '../../../data/models';
import { useApp } from '../../../context/AppContext';
import { AIModel } from '../../../@types';
import {
  Store,
  Search,
  Bot,
  ArrowRight
} from 'lucide-react';

interface StoreViewProps {
  onSelectModel?: (model: AIModel) => void;
}

export const StoreView: React.FC<StoreViewProps> = ({ onSelectModel }) => {
  const { setSelectedModelId, setActiveView, showToast } = useApp();
  const [search, setSearch] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags: string[] = ['All', 'Deep Reasoning', 'Code & Nuance', 'General & Vision', 'Massive Context', 'Enterprise & Tools', 'Open Benchmark'];

  const filtered = STORE_MODELS.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.provider.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === 'All' || m.category === selectedTag || m.badge?.toLowerCase().includes(selectedTag.toLowerCase());
    return matchesSearch && matchesTag;
  });

  const handleTryModel = (model: AIModel) => {
    setSelectedModelId(model.id);
    setActiveView('chat');
    showToast(`Switched active workspace model to ${model.name}`, 'success');
    if (onSelectModel) onSelectModel(model);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Store className="w-3.5 h-3.5" />
              <span>EchoGPT Model Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Model Store & Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Discover and launch specialized foundation models, open weights, and fine-tunes from global AI research labs.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, provider, or capability..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === t
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {filtered.map((model) => (
            <div
              key={model.id}
              className="p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-lg group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform">
                      {model.avatar || '🤖'}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {model.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">{model.provider}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {model.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {model.description}
                </p>

                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Context: <strong className="text-slate-300 font-mono">{model.contextWindow}</strong></span>
                  <span className="text-cyan-400 font-semibold">{model.tagline?.slice(0, 24)}...</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleTryModel(model)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-cyan-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Try App</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
