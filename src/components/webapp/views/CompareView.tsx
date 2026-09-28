import React, { useState } from 'react';
import { AI_MODELS } from '../../../data/models';
import { useApp } from '../../../context/AppContext';
import {
  Columns2,
  Play,
  Check,
  Copy,
  Loader2,
  Eye
} from 'lucide-react';

export const CompareView: React.FC = () => {
  const { showToast } = useApp();
  
  const [activeMode, setActiveMode] = useState<'compare' | 'focus'>('compare');
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([
    'deepseek-v4-flash',
    'claude-3-5-sonnet',
    'nemotron-3-ultra'
  ]);
  const [promptText, setPromptText] = useState<string>(
    'Compare the trade-offs of microservices vs monolithic architecture for an early-stage AI agent platform.'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Model responses map
  const [responses, setResponses] = useState<Record<string, string>>({
    'deepseek-v4-flash': `### DeepSeek V4 Flash Verdict

1. **Monolith First**: Pre-product-market fit teams must avoid premature network partitioning. Single deploy artifact accelerates iterations by 4x.
2. **Agentic Boundary**: Isolate only compute-intensive GPU inference or long-running worker tasks behind async message queues.
3. **Recommendation**: Modular Monolith with strictly separated domain contexts.`,
    
    'claude-3-5-sonnet': `### Claude 3.5 Sonnet Architectural Breakdown

| Metric | Monolith (Modular) | Microservices |
| :--- | :--- | :--- |
| **Development Velocity** | Highest (single PR / CI) | Lower (API contract governance) |
| **Observability Overhead** | Low (single trace context) | High (Distributed OpenTelemetry) |
| **Operational Cost** | Minimal (single container/VPS)| Higher (Kubernetes / Mesh) |

> **Strategic Guidance**: Adopt a Modular Monolith with strict boundary interfaces until domain boundaries and organizational teams exceed 25 engineers.`,
    
    'nemotron-3-ultra': `### Nemotron 3 Ultra Enterprise Evaluation

NVIDIA architecture perspective:
- Model routing and token streaming create distinct network I/O spikes.
- A **hybrid gateway pattern** works best: monolithic authentication and billing fronting isolated event-driven micro-workers for model inference execution.
- Ensures zero single-point-of-failure for GPU workloads.`
  });

  const toggleModelSelection = (id: string) => {
    if (selectedModelIds.includes(id)) {
      if (selectedModelIds.length > 1) {
        setSelectedModelIds(selectedModelIds.filter(m => m !== id));
      } else {
        showToast('At least one model must remain selected', 'warning');
      }
    } else {
      if (selectedModelIds.length < 3) {
        setSelectedModelIds([...selectedModelIds, id]);
      } else {
        showToast('Maximum 3 parallel models in free layout', 'info');
      }
    }
  };

  const handleRunCompare = async () => {
    if (!promptText.trim() || isGenerating) return;
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    // Update responses for all selected models
    const updated: Record<string, string> = {};
    selectedModelIds.forEach((id) => {
      const model = AI_MODELS.find(m => m.id === id) || AI_MODELS[0];
      updated[id] = `### Analysis from ${model.name}\n\nEvaluating: "${promptText}"\n\n1. **Core Recommendation**: ${model.strengths[0]} applied directly to the query domain.\n2. **Synthesis**: Focuses on high-leverage execution, minimizing cognitive friction.\n3. **Benchmark Rating**: Reasoning accuracy evaluated at ${model.reasoningScore}.`;
    });

    setResponses(updated);
    setIsGenerating(false);
    showToast('Parallel comparison generated!', 'success');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
      {/* Top Controls & Multi-Model Tag Bar */}
      <div className="p-4 bg-slate-900/80 border-b border-slate-800 space-y-3">
        {/* Mode Switch & Tag Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Compare vs Focus Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs self-start">
            <button
              onClick={() => setActiveMode('compare')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                activeMode === 'compare'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Multi-Compare</span>
            </button>
            <button
              onClick={() => setActiveMode('focus')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                activeMode === 'focus'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Focus Mode</span>
            </button>
          </div>

          {/* Model Tag Pills Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0 mr-1">
              Active Models:
            </span>
            {AI_MODELS.map((model) => {
              const isSelected = selectedModelIds.includes(model.id);

              return (
                <button
                  key={model.id}
                  onClick={() => toggleModelSelection(model.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-800 text-white border-amber-500/50 shadow-sm'
                      : 'bg-slate-950/60 text-slate-500 border-slate-800 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <span>{model.avatar}</span>
                  <span>{model.shortName}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Prompt Input Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRunCompare();
            }}
            placeholder="Enter prompt to evaluate across all selected models simultaneously..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button
            onClick={handleRunCompare}
            disabled={!promptText.trim() || isGenerating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all shrink-0"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
            <span>Compare</span>
          </button>
        </div>
      </div>

      {/* Parallel Grid Stream */}
      <div className={`flex-1 overflow-y-auto p-4 sm:p-6 grid gap-6 ${
        activeMode === 'focus'
          ? 'grid-cols-1 max-w-3xl mx-auto w-full'
          : selectedModelIds.length === 1
          ? 'grid-cols-1'
          : selectedModelIds.length === 2
          ? 'grid-cols-1 md:grid-cols-2'
          : 'grid-cols-1 md:grid-cols-3'
      }`}>
        {selectedModelIds.map((modelId) => {
          const model = AI_MODELS.find(m => m.id === modelId) || AI_MODELS[0];
          const output = responses[modelId];

          return (
            <div
              key={modelId}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between shadow-xl space-y-4"
            >
              <div className="space-y-3">
                {/* Column Model Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-xl">{model.avatar}</span>
                    <div className="truncate">
                      <h4 className="text-sm font-bold text-white truncate">{model.name}</h4>
                      <p className="text-[11px] text-slate-400">{model.provider}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(modelId, output || '')}
                    className="text-xs text-slate-400 hover:text-white p-1 rounded bg-slate-800/60 transition-colors flex items-center gap-1 shrink-0"
                    title="Copy stream output"
                  >
                    {copiedId === modelId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === modelId ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Output Text */}
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {isGenerating ? (
                    <div className="space-y-3 py-6">
                      <div className="h-4 bg-slate-800/80 rounded animate-pulse w-3/4" />
                      <div className="h-4 bg-slate-800/80 rounded animate-pulse w-full" />
                      <div className="h-4 bg-slate-800/80 rounded animate-pulse w-5/6" />
                    </div>
                  ) : (
                    output || 'No response recorded. Click Compare above to generate.'
                  )}
                </div>
              </div>

              {/* Column Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>Speed: {model.speed.split(' ')[0]}</span>
                <span className="text-emerald-400 font-mono">Reasoning: {model.reasoningScore}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
