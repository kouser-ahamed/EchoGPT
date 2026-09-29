import React, { useState, useMemo } from 'react';
import { AI_MODELS } from '../../data/models';
import { useApp } from '../../context/AppContext';
import { AIModel } from '../../@types';
import { X, Check, Zap, Cpu, Search, Sparkles } from 'lucide-react';

interface ModelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIER_TABS = ['All', 'Default / Free', 'Limited / Advanced', 'Pro Tier'] as const;
type TierTab = typeof TIER_TABS[number];

export const ModelSelectorModal: React.FC<ModelSelectorModalProps> = ({ isOpen, onClose }) => {
  const { selectedModelId, setSelectedModelId, showToast } = useApp();
  const [search, setSearch] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<TierTab>('All');

  const filteredModels = useMemo(() => {
    return AI_MODELS.filter((model) => {
      const matchesTier = selectedTier === 'All' || model.tier === selectedTier;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        model.name.toLowerCase().includes(query) ||
        model.provider.toLowerCase().includes(query) ||
        model.description.toLowerCase().includes(query) ||
        (model.tagline && model.tagline.toLowerCase().includes(query)) ||
        (model.badge && model.badge.toLowerCase().includes(query));

      return matchesTier && matchesSearch;
    });
  }, [search, selectedTier]);

  if (!isOpen) return null;

  const handleSelect = (model: AIModel) => {
    setSelectedModelId(model.id);
    showToast(`Switched active model to ${model.name}`, 'info');
    onClose();
  };

  const getTierBadgeStyle = (tier?: string) => {
    switch (tier) {
      case 'Pro Tier':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30';
      case 'Limited / Advanced':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30';
      case 'Default / Free':
      default:
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-4 sm:p-6 space-y-4 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="model-selector-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="model-selector-title" className="text-base font-bold text-slate-900 dark:text-white">
                  Select Intelligence Engine
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 font-mono">
                  {AI_MODELS.length} Models
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Choose frontier model for current conversation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by model name, provider, or capability..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            />
          </div>

          {/* Tier Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {TIER_TABS.map((tier) => {
              const count =
                tier === 'All'
                  ? AI_MODELS.length
                  : AI_MODELS.filter((m) => m.tier === tier).length;
              const isSelected = selectedTier === tier;

              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{tier}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Model Cards List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto p-1 custom-scrollbar flex-1 min-h-[300px]">
          {filteredModels.length === 0 ? (
            <div className="col-span-full py-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-2">
              <Sparkles className="w-6 h-6 text-slate-400 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No models found</p>
              <p className="text-xs text-slate-500">Try tweaking your search term or switch tiers</p>
            </div>
          ) : (
            filteredModels.map((model) => {
              const isSelected = selectedModelId === model.id;

              return (
                <button
                  key={model.id}
                  onClick={() => handleSelect(model)}
                  className={`p-3.5 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between group ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-500/10 shadow-md ring-1 ring-indigo-500/50'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0">{model.avatar}</span>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 truncate">
                            <span className="truncate">{model.name}</span>
                            {isSelected && (
                              <span className="p-0.5 rounded-full bg-indigo-500 text-white shrink-0">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{model.provider}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        {model.tier && (
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${getTierBadgeStyle(
                              model.tier
                            )}`}
                          >
                            {model.tier.replace(' / ', '/')}
                          </span>
                        )}
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${model.borderColor} ${model.bgLight}`}
                        >
                          {model.badge}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {model.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-500 dark:text-slate-400">{model.contextWindow}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {model.speed.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{filteredModels.length} models matching current filter.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
