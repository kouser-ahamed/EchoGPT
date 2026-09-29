import React, { useState } from 'react';
import { AI_MODELS } from '../../../data/models';
import { useApp } from '../../../context/AppContext';
import { MarkdownRenderer } from '../../common/MarkdownRenderer';
import { generateRealisticAIResponse } from '../../../services/aiService';
import {
  Columns2,
  Play,
  Check,
  Copy,
  Loader2,
  Eye,
  Zap,
  Brain
} from 'lucide-react';

interface CompareViewProps {
  initialMode?: 'compare' | 'focus';
}

export const CompareView: React.FC<CompareViewProps> = ({ initialMode = 'compare' }) => {
  const { showToast } = useApp();
  
  const [activeMode, setActiveMode] = useState<'compare' | 'focus'>(initialMode);
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([
    'claude-3-5-sonnet',
    'nemotron-3-ultra',
    'deepseek-v4-pro'
  ]);
  const [focusedModelId, setFocusedModelId] = useState<string>('claude-3-5-sonnet');
  const [promptText, setPromptText] = useState<string>(
    'Compare the trade-offs of microservices vs monolithic architecture for an early-stage AI agent platform.'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Model responses map with formatted markdown (tables, bold, lists, blockquotes)
  const [responses, setResponses] = useState<Record<string, string>>({
    'claude-3-5-sonnet': `### Claude 3.5 Sonnet Architectural Breakdown

Evaluating the structural trade-offs for an early-stage AI agent platform:

| Evaluation Metric | Modular Monolith | Distributed Microservices |
| :--- | :--- | :--- |
| **Development Velocity** | **Highest** (single repository, zero contract sync lag) | Lower (inter-service API versioning overhead) |
| **Observability Overhead** | **Low** (single trace context, unified logs) | High (requires distributed OpenTelemetry & Jaeger) |
| **Operational Spend** | **Minimal** (single container/VPS deployment) | High (Kubernetes cluster, service mesh, VPCs) |
| **Failure Isolation** | Shared memory space (requires defensive coding) | **Isolated** (crashed worker won't sink gateway) |

> **Strategic Directive**: Early-stage AI startups should start with a **Modular Monolith**. Split compute-intensive model inference into async worker queues only when GPU saturation or team size demands it.`,

    'nemotron-3-ultra': `### Nemotron 3 Ultra Enterprise Evaluation

NVIDIA frontier architecture assessment:

- **Token Streaming Bottleneck**: High-frequency streaming creates distinct network I/O spikes that can exhaust thread pools in standard monolithic frameworks.
- **Recommended Hybrid Topology**:
  1. **Monolithic Core**: Authentication, state sessions, workspace routing, and billing.
  2. **Event-Driven Workers**: Dedicated GPU inference nodes communicating over Redis Streams or gRPC.
- **Latency Benchmark**: Sub-38ms time-to-first-token with zero inter-service hop latency.

> **Key Takeaway**: A hybrid gateway isolates volatile LLM provider latencies from core business logic without microservice fragmentation.`,

    'deepseek-v4-pro': `### DeepSeek V4 Pro Verdict

Analysis for rapid iteration velocity & formal architectural verification:

1. **Monolith First**: Pre-product-market fit teams must avoid premature network partitioning. Single deployment artifact accelerates feature turnaround by **4x**.
2. **Agentic Boundary**: Isolate only compute-intensive GPU inference or long-running tool execution behind background queues.
3. **Database Architecture**: Start with a unified PostgreSQL database using schemas for domain isolation; avoid multi-database distributed transactions early on.

| Dimension | Early Stage (0-10k MAU) | Growth Stage (100k+ MAU) |
| :--- | :--- | :--- |
| **Recommended Architecture** | Modular Monolith | Hybrid Gateway + Workers |
| **Deployment Complexity** | Low (Single Docker Compose) | Medium (EKS / GKE) |
| **Verification Overhead** | Minimal unit/integration suites | Distributed contract testing |

> **Recommendation**: Build strict domain modules inside a single service. Extract microservices only when independent team ownership requires it.`,

    'deepseek-v4-flash': `### DeepSeek V4 Flash Verdict

Analysis for rapid iteration velocity:

1. **Monolith First**: Pre-product-market fit teams must avoid premature network partitioning. Single deployment artifact accelerates feature turnaround by **4x**.
2. **Agentic Boundary**: Isolate only compute-intensive GPU inference or long-running tool execution behind background queues.
3. **Database Architecture**: Start with a unified PostgreSQL database using schemas for domain isolation; avoid multi-database distributed transactions early on.

| Dimension | Early Stage (0-10k MAU) | Growth Stage (100k+ MAU) |
| :--- | :--- | :--- |
| **Recommended Architecture** | Modular Monolith | Hybrid Gateway + Workers |
| **Deployment Complexity** | Low (Single Docker Compose) | Medium (EKS / GKE) |`
  });

  const comparePresets = [
    {
      title: 'Monolith vs Microservices',
      prompt: 'Compare the trade-offs of microservices vs monolithic architecture for an early-stage AI agent platform.'
    },
    {
      title: 'PostgreSQL vs Vector DB',
      prompt: 'Compare PostgreSQL pgvector against dedicated Vector Databases (Pinecone/Qdrant) for 500k embedding vectors.'
    },
    {
      title: 'CSR vs SSR Streaming',
      prompt: 'Compare Client-Side Rendering vs Server-Side Rendering for high-frequency token streaming dashboards.'
    }
  ];

  const toggleModelSelection = (id: string) => {
    if (selectedModelIds.includes(id)) {
      if (selectedModelIds.length > 1) {
        const next = selectedModelIds.filter(m => m !== id);
        setSelectedModelIds(next);
        if (focusedModelId === id) setFocusedModelId(next[0]);
      } else {
        showToast('At least one model must remain selected', 'warning');
      }
    } else {
      if (selectedModelIds.length < 3) {
        const next = [...selectedModelIds, id];
        setSelectedModelIds(next);
      } else {
        showToast('Maximum 3 parallel models in comparative view', 'info');
      }
    }
  };

  const handleRunCompare = async () => {
    if (!promptText.trim() || isGenerating) return;
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 850));

    // Update responses for all selected models with dynamic realistic responses
    const updated: Record<string, string> = {};
    selectedModelIds.forEach((id) => {
      const model = AI_MODELS.find(m => m.id === id) || AI_MODELS[0];
      updated[id] = generateRealisticAIResponse({
        model,
        userPrompt: promptText,
      });
    });

    setResponses(updated);
    setIsGenerating(false);
    showToast('Parallel comparison generated across all engines!', 'success');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied model response to clipboard', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* Top Controls Bar */}
      <div className="p-4 sm:p-5 bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 space-y-4 backdrop-blur-xl">
        {/* Mode Switch & Tag Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Compare vs Focus Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs self-start shadow-inner">
            <button
              onClick={() => setActiveMode('compare')}
              className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                activeMode === 'compare'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Multi-Compare</span>
            </button>
            <button
              onClick={() => setActiveMode('focus')}
              className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                activeMode === 'focus'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Focus Mode</span>
            </button>
          </div>

          {/* Model Tag Pills Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar momentum-scroll">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 shrink-0 mr-1">
              Active Models ({selectedModelIds.length}/3):
            </span>
            {AI_MODELS.map((model) => {
              const isSelected = selectedModelIds.includes(model.id);

              return (
                <button
                  key={model.id}
                  onClick={() => toggleModelSelection(model.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-50 dark:bg-slate-800 text-amber-900 dark:text-white border-amber-300 dark:border-amber-500/50 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-300'
                  }`}
                >
                  <span>{model.avatar}</span>
                  <span>{model.shortName}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Prompt Input & Preset Chips Bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRunCompare();
              }}
              placeholder="Enter prompt to evaluate across selected models simultaneously..."
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />

            <button
              onClick={handleRunCompare}
              disabled={!promptText.trim() || isGenerating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 transition-all shrink-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Compare Models</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Preset Prompts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar momentum-scroll pt-0.5">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap mr-1 font-medium">Quick Prompts:</span>
            {comparePresets.map((preset, pIdx) => (
              <button
                key={pIdx}
                onClick={() => setPromptText(preset.prompt)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white text-xs whitespace-nowrap border border-slate-200 dark:border-slate-700/60 transition-colors shadow-sm"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Focus Mode Model Tab Switcher (When in Focus Mode) */}
      {activeMode === 'focus' && (
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2">Focus Target:</span>
          {selectedModelIds.map((id) => {
            const m = AI_MODELS.find(model => model.id === id) || AI_MODELS[0];
            const isTarget = focusedModelId === id;

            return (
              <button
                key={id}
                onClick={() => setFocusedModelId(id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isTarget
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <span>{m.avatar}</span>
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Output Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
        {activeMode === 'focus' ? (
          /* FOCUS MODE (Single-Column Expansive View) */
          <div className="max-w-4xl mx-auto w-full">
            {(() => {
              const model = AI_MODELS.find(m => m.id === focusedModelId) || AI_MODELS[0];
              const output = responses[focusedModelId];

              return (
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-sm dark:shadow-2xl space-y-6 backdrop-blur-xl">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                        {model.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{model.name}</h3>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                            Focused Engine
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{model.provider} • {model.category}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(focusedModelId, output || '')}
                      className="text-xs text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 shadow-sm"
                      title="Copy response"
                    >
                      {copiedId === focusedModelId ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Rendered Markdown Output */}
                  <div className="min-h-[220px]">
                    {isGenerating ? (
                      <div className="space-y-3.5 py-8">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-3/4" />
                        <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-full" />
                        <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-5/6" />
                        <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-2/3" />
                      </div>
                    ) : (
                      <MarkdownRenderer content={output || 'No response recorded. Click Compare above to generate.'} />
                    )}
                  </div>

                  {/* Footer Metrics Pills */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                        <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                        <span>Speed: <strong className="text-slate-900 dark:text-white">{model.speed.split(' ')[0]}</strong></span>
                      </span>

                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                        <Brain className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>Reasoning: <strong className="text-emerald-600 dark:text-emerald-400">{model.reasoningScore}</strong></span>
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500">
                      Context: {model.contextWindow} • Coding: {model.codeScore}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          /* MULTI-COMPARE GRID VIEW */
          <div className={`grid gap-6 ${
            selectedModelIds.length === 1
              ? 'grid-cols-1 max-w-4xl mx-auto'
              : selectedModelIds.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {selectedModelIds.map((modelId) => {
              const model = AI_MODELS.find(m => m.id === modelId) || AI_MODELS[0];
              const output = responses[modelId];

              return (
                <div
                  key={modelId}
                  className="rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 p-5 flex flex-col justify-between shadow-sm dark:shadow-xl space-y-4 transition-all duration-200 backdrop-blur-xl"
                >
                  <div className="space-y-3 flex-1 flex flex-col">
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-xl shrink-0 p-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                          {model.avatar}
                        </span>
                        <div className="truncate">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{model.name}</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{model.provider}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopy(modelId, output || '')}
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 shrink-0 border border-slate-200 dark:border-slate-700/50"
                        title="Copy response"
                      >
                        {copiedId === modelId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Clean Rendered Markdown Output */}
                    <div className="flex-1 py-1">
                      {isGenerating ? (
                        <div className="space-y-3 py-6">
                          <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-3/4" />
                          <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-full" />
                          <div className="h-4 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse w-5/6" />
                        </div>
                      ) : (
                        <MarkdownRenderer content={output || 'No response recorded. Click Compare above to generate.'} />
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Metrics Pills */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[11px]">
                      <Zap className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                      <span>Speed: <strong className="text-slate-900 dark:text-slate-200">{model.speed.split(' ')[0]}</strong></span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[11px]">
                      <Brain className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      <span>Reasoning: <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{model.reasoningScore}</strong></span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
