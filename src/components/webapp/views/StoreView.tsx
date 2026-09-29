import React, { useState, useRef } from 'react';
import { STORE_MODELS } from '../../../data/models';
import { useApp } from '../../../context/AppContext';
import { AIModel } from '../../../@types';
import {
  Store,
  Search,
  Bot,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

interface StoreViewProps {
  onSelectModel?: (model: AIModel) => void;
}

export const StoreView: React.FC<StoreViewProps> = ({ onSelectModel }) => {
  const { setSelectedModelId, setActiveView, showToast } = useApp();
  const [search, setSearch] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const gridTopRef = useRef<HTMLDivElement>(null);

  const tags: string[] = [
    'All',
    'Default / Free',
    'Limited / Advanced',
    'Pro Tier',
    'Deep Reasoning',
    'Code & Nuance',
    'General & Vision',
    'Massive Context',
    'Enterprise & Tools',
    'Open Benchmark',
    'Multilingual'
  ];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  // Real-time search filter matching model name, description, provider, category, and tagline
  const filtered = STORE_MODELS.filter((m) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      m.name.toLowerCase().includes(query) ||
      m.provider.toLowerCase().includes(query) ||
      m.description.toLowerCase().includes(query) ||
      (m.tagline && m.tagline.toLowerCase().includes(query)) ||
      (m.badge && m.badge.toLowerCase().includes(query));

    const matchesTag =
      selectedTag === 'All' ||
      m.tier === selectedTag ||
      m.category.toLowerCase() === selectedTag.toLowerCase() ||
      m.badge.toLowerCase().includes(selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  // Calculate pagination bounds
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedModels = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTryModel = (model: AIModel) => {
    setSelectedModelId(model.id);
    setActiveView('chat');
    showToast(`Switched active workspace model to ${model.name}`, 'success');
    if (onSelectModel) onSelectModel(model);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 sm:p-6 lg:p-8 space-y-8 custom-scrollbar">
      {/* Main Container matching ImageStudio width */}
      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>AI Model Store & Directory</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse ml-1" />
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{STORE_MODELS.length} Models Indexed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              EchoGPT Store & Model Registry
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Discover, evaluate, and launch 36+ frontier models, open-weights architectures, and specialized reasoning engines.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-mono bg-white dark:bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              Showing <strong className="text-slate-900 dark:text-white">{filtered.length}</strong> available engines
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-sm dark:shadow-xl backdrop-blur-xl">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by model name, provider (e.g. OpenAI, DeepSeek, Google, Anthropic), or capability..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
            />
          </div>

          {/* Filter Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => handleTagChange(t)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedTag === t
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-500/50 shadow-md shadow-cyan-600/20'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll anchor for pagination */}
        <div ref={gridTopRef} />

        {/* Desktop 4-Column Grid (Mobile: 1, Tablet: 2, Laptop: 3, Desktop: 4) */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 space-y-3 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500 shadow-sm">
              <Bot className="w-6 h-6" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">No models match your search</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any engines matching "{search}". Try searching for another lab or clear your filter.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedTag('All');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700/60"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {paginatedModels.map((model) => (
              <div
                key={model.id}
                className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-200 shadow-sm dark:shadow-xl group flex flex-col justify-between space-y-4 backdrop-blur-xl hover:-translate-y-0.5"
              >
                <div className="space-y-3 flex-1 flex flex-col">
                  {/* Top card header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-2xl p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                        {model.avatar || '🤖'}
                      </span>
                      <div className="truncate">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors truncate">
                          {model.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">{model.provider}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {model.tier && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20">
                        {model.tier.replace(' / ', '/')}
                      </span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-slate-800">
                      {model.badge}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50">
                      {model.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 flex-1">
                    {model.description}
                  </p>

                  {/* Model telemetry specs */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 shadow-inner">
                    <span className="truncate">
                      Context: <strong className="text-slate-900 dark:text-slate-200 font-mono">{model.contextWindow}</strong>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold shrink-0 ml-1.5 font-mono text-[10px]">
                      <Zap className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                      {model.speed?.split(' ')[0] || 'Fast'}
                    </span>
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    onClick={() => handleTryModel(model)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 text-slate-800 hover:text-white dark:bg-slate-800/90 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm border border-slate-200 dark:border-slate-700/50 group-hover:shadow-md group-hover:shadow-cyan-500/20 active:scale-95"
                  >
                    <Bot className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:text-white transition-colors" />
                    <span>Launch in Chat</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Bar (12 Cards Per Page) */}
        {filtered.length > itemsPerPage && (
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-xl backdrop-blur-xl">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Showing <strong className="text-slate-900 dark:text-white font-mono">{startIndex + 1}</strong>–<strong className="text-slate-900 dark:text-white font-mono">{Math.min(startIndex + itemsPerPage, filtered.length)}</strong> of <strong className="text-slate-900 dark:text-white font-mono">{filtered.length}</strong> models
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
