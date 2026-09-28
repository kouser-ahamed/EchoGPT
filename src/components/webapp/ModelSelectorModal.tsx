import React from 'react';
import { AI_MODELS } from '../../data/models';
import { useApp } from '../../context/AppContext';
import { AIModel } from '../../@types';
import { X, Check, Zap, Cpu } from 'lucide-react';

interface ModelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelSelectorModal: React.FC<ModelSelectorModalProps> = ({ isOpen, onClose }) => {
  const { selectedModelId, setSelectedModelId, showToast } = useApp();

  if (!isOpen) return null;

  const handleSelect = (model: AIModel) => {
    setSelectedModelId(model.id);
    showToast(`Switched active model to ${model.name}`, 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5 max-h-[85vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="model-selector-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 id="model-selector-title" className="text-base font-bold text-white">
                Select Intelligence Engine
              </h3>
              <p className="text-xs text-slate-400">Choose frontier model for current conversation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Model Cards List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 overflow-y-auto p-1">
          {AI_MODELS.map((model) => {
            const isSelected = selectedModelId === model.id;

            return (
              <button
                key={model.id}
                onClick={() => handleSelect(model)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between group ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-md ring-1 ring-indigo-500/50'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{model.avatar}</span>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>{model.name}</span>
                          {isSelected && (
                            <span className="p-0.5 rounded-full bg-indigo-500 text-white">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-slate-400">{model.provider}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${model.borderColor} ${model.bgLight}`}>
                      {model.badge}
                    </span>
                  </div>

                  <p className="mt-2.5 text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {model.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-400">{model.contextWindow}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {model.speed.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>You can switch models mid-conversation at any time.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
