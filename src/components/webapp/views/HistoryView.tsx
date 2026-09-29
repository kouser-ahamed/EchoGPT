import React, { useState, useRef } from 'react';
import { useApp } from '../../../context/AppContext';
import { AI_MODELS, STORE_MODELS } from '../../../data/models';
import { Conversation } from '../../../@types';
import {
  History,
  Search,
  Trash2,
  Download,
  MessageSquare,
  Pin,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Bot,
  Filter
} from 'lucide-react';

const HISTORY_FILTER_MODELS = [
  'All',
  ...AI_MODELS.map((m) => m.name)
];

interface HistoryViewProps {
  onSelectConversation?: (id: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onSelectConversation }) => {
  const {
    conversations,
    deleteConversation,
    togglePinConversation,
    setActiveConversationId,
    setActiveView,
    showToast
  } = useApp();

  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedModelFilter, setSelectedModelFilter] = useState<string>('All');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState<boolean>(false);

  // Pagination state: strictly 10 history items per page
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const listTopRef = useRef<HTMLDivElement>(null);

  // Event handlers to reset page 1 whenever user searches or changes filters
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleModelFilterChange = (model: string) => {
    setSelectedModelFilter(model);
    setIsModelDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedModelFilter('All');
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    listTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to extract display metadata for any model identifier
  const getModelInfo = (modelId: string) => {
    const found = AI_MODELS.find(m => m.id === modelId);
    if (found) return { name: found.name, avatar: found.avatar, provider: found.provider };

    const storeFound = STORE_MODELS.find(m => m.id === modelId);
    if (storeFound) return { name: storeFound.name, avatar: storeFound.avatar || '🤖', provider: storeFound.provider || 'AI Provider' };

    const lower = modelId.toLowerCase();
    if (lower.includes('nemotron')) return { name: 'Nemotron 3 Ultra', avatar: '🟢', provider: 'NVIDIA AI' };
    if (lower.includes('deepseek-v4-pro') || lower.includes('deepseek-pro')) return { name: 'DeepSeek V4 Pro', avatar: '🔷', provider: 'DeepSeek AI' };
    if (lower.includes('deepseek')) return { name: 'DeepSeek V4 Flash', avatar: '⚡', provider: 'DeepSeek AI' };
    if (lower.includes('claude')) return { name: 'Claude 3.5 Sonnet', avatar: '🟠', provider: 'Anthropic' };
    if (lower.includes('gemini-3') || lower.includes('gemini-flash')) return { name: 'Gemini 3.8 Flash', avatar: '✨', provider: 'Google DeepMind' };
    if (lower.includes('gemini')) return { name: 'Gemini 1.5 Pro', avatar: '🔵', provider: 'Google DeepMind' };
    if (lower.includes('gpt-5.6') || lower.includes('gpt-5-6')) return { name: 'GPT-5.6 Sol', avatar: '☀️', provider: 'OpenAI Frontier' };
    if (lower.includes('gpt-5.5') || lower.includes('gpt-5-5')) return { name: 'GPT-5.5', avatar: '🌌', provider: 'OpenAI Frontier' };
    if (lower.includes('gpt-5.4') || lower.includes('gpt-5-4')) return { name: 'GPT-5.4', avatar: '🧠', provider: 'OpenAI' };
    if (lower.includes('gpt-4o')) return { name: 'GPT-4o Omnimodal', avatar: '🧠', provider: 'OpenAI' };
    if (lower.includes('qwen-3.8') || lower.includes('qwen-3-8')) return { name: 'Qwen 3.8 27B', avatar: '🟣', provider: 'Alibaba Cloud' };
    if (lower.includes('qwen')) return { name: 'Qwen 3.7 Plus', avatar: '🟣', provider: 'Alibaba Cloud' };
    if (lower.includes('mimo')) return { name: 'MiMo V2.5 Pro', avatar: '📱', provider: 'Xiaomi AI' };
    if (lower.includes('glm')) return { name: 'GLM-5.2', avatar: '🌏', provider: 'Zhipu AI' };
    if (lower.includes('kimi')) return { name: 'Kimi K2.7 Code', avatar: '🌙', provider: 'Moonshot AI' };
    if (lower.includes('minimax')) return { name: 'MiniMax M3', avatar: '🧊', provider: 'MiniMax AI' };
    if (lower.includes('hy3') || lower.includes('tencent')) return { name: 'Tencent Hy3', avatar: '🐧', provider: 'Tencent Hunyuan' };
    if (lower.includes('echo')) return { name: 'EchoGPT Multi-Engine', avatar: '🌐', provider: 'EchoGPT Core' };

    return { name: modelId, avatar: '🤖', provider: 'Frontier AI' };
  };

  const filtered = conversations.filter((c) => {
    // Search query matching
    const query = search.trim().toLowerCase();
    const modelInfo = getModelInfo(c.modelId);
    const matchesSearch =
      !query ||
      c.title.toLowerCase().includes(query) ||
      modelInfo.name.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query) ||
      c.messages.some((m) => m.content.toLowerCase().includes(query));

    // Category filter
    const matchesCategory =
      selectedCategory === 'All' || c.category.toLowerCase() === selectedCategory.toLowerCase();

    // Model filter
    let matchesModel = true;
    if (selectedModelFilter !== 'All') {
      const target = selectedModelFilter.toLowerCase().replace(/[^a-z0-9]/g, '');
      const idNorm = c.modelId.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nameNorm = modelInfo.name.toLowerCase().replace(/[^a-z0-9]/g, '');

      matchesModel =
        idNorm.includes(target) ||
        target.includes(idNorm) ||
        nameNorm.includes(target) ||
        target.includes(nameNorm) ||
        (selectedModelFilter === 'EchoGPT' &&
          (idNorm.includes('echo') || c.messages.some((m) => m.role === 'assistant')));
    }

    return matchesSearch && matchesCategory && matchesModel;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginatedConversations = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenChat = (id: string) => {
    setActiveConversationId(id);
    setActiveView('chat');
    if (onSelectConversation) onSelectConversation(id);
    showToast('Loaded conversation session', 'info');
  };

  const handleDeleteConversation = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    deleteConversation(id);
    const remainingCount = filtered.length - 1;
    const newTotal = Math.max(1, Math.ceil(remainingCount / itemsPerPage));
    if (currentPage > newTotal) {
      setCurrentPage(newTotal);
    }
  };

  const handleExportOne = (conv: Conversation) => {
    const text =
      `# ${conv.title}\nDate: ${conv.timestamp}\nCategory: ${conv.category}\nModel: ${conv.modelId}\n\n` +
      conv.messages
        .map((m) => `### ${m.role === 'user' ? 'User' : 'EchoGPT'} (${m.timestamp})\n\n${m.content}\n`)
        .join('\n---\n\n');

    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${conv.title.replace(/\s+/g, '_')}.md`;
    a.click();
    showToast('Exported conversation as Markdown', 'success');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-3 sm:p-6 lg:p-8 space-y-8 custom-scrollbar">
      {/* Main Container Aligned with Image Studio (max-w-6xl mx-auto w-full) */}
      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <History className="w-3.5 h-3.5 text-indigo-400" />
              <span>Workspace Archives</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
              <span className="text-[10px] text-emerald-400 font-bold">{conversations.length} Sessions Saved</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Chat History & Session Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Browse, search, export, and manage your past AI queries, multi-model outputs, and project transcripts.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            <span className="text-xs text-slate-400 font-mono bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800 shadow-sm">
              Showing <strong className="text-white">{filtered.length}</strong> of <strong className="text-white">{conversations.length}</strong> records
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="relative z-30 p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-xl backdrop-blur-xl overflow-visible">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations by title, prompt keywords, or category..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            />
          </div>

          {/* Model Filter Dropdown & Category Chips */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 overflow-visible">
            {/* Model Filter Dropdown with smooth scrolling (max-h-64 overflow-y-auto) */}
            <div className="relative z-50 min-w-[200px] flex-1 sm:flex-none">
              <button
                type="button"
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 hover:border-slate-600 text-xs text-white font-semibold flex items-center justify-between gap-2 transition-all shadow-inner group"
              >
                <div className="flex items-center gap-2 truncate">
                  <Bot className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="text-slate-400 font-normal">Model:</span>
                  <span className="truncate font-bold text-white">{selectedModelFilter}</span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform shrink-0 ${
                    isModelDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isModelDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[998]"
                    onClick={() => setIsModelDropdownOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 w-full sm:w-64 max-h-64 overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700/60 shadow-2xl p-1.5 z-[999] custom-scrollbar animate-in fade-in">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-800/80 mb-1 flex items-center justify-between">
                      <span>All Platform Models</span>
                      <Filter className="w-3 h-3 text-indigo-400" />
                    </div>
                    {HISTORY_FILTER_MODELS.map((modelName) => {
                      const isSelected = selectedModelFilter === modelName;
                      return (
                        <button
                          key={modelName}
                          type="button"
                          onClick={() => handleModelFilterChange(modelName)}
                          className={`w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between text-left transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white font-bold shadow-sm'
                              : 'text-slate-300 hover:text-white hover:bg-slate-800/70 font-medium'
                          }`}
                        >
                          <span className="truncate">{modelName}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1.5" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Category Selector Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {['All', 'Engineering', 'Research', 'Finance', 'Writing'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* History Item Cards List */}
        <div ref={listTopRef} className="space-y-3.5 scroll-mt-6">
          {filtered.length === 0 ? (
            <div className="py-20 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 space-y-3 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-200">No matching conversations found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No sessions match model <span className="text-indigo-400 font-semibold">"{selectedModelFilter}"</span> or current search terms. Try clearing filters or selecting another model.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            paginatedConversations.map((c) => {
              const modelInfo = getModelInfo(c.modelId);

              return (
                <div
                  key={c.id}
                  onClick={() => handleOpenChat(c.id)}
                  className="w-full p-4 sm:p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group shadow-xl backdrop-blur-xl"
                >
                  {/* Left: Icon, Title, and Tags */}
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <span className="text-2xl p-2.5 rounded-2xl bg-slate-950 border border-slate-800 shrink-0 shadow-inner group-hover:border-slate-700 transition-colors">
                      {modelInfo.avatar}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                          {c.title}
                        </h4>
                        {c.pinned && (
                          <span className="p-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 border border-amber-400/30 flex items-center gap-1">
                            <Pin className="w-2.5 h-2.5" />
                            <span>Pinned</span>
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-slate-300">{modelInfo.name}</span>
                        <span className="text-slate-600">•</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                          {c.category}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500 font-mono text-[11px]">
                          {c.messages.length} message{c.messages.length === 1 ? '' : 's'}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {c.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div
                    className="flex items-center gap-2 self-end sm:self-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80 w-full sm:w-auto justify-end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => togglePinConversation(c.id)}
                      className={`p-2 rounded-xl border border-slate-800 hover:bg-slate-800 transition-colors ${
                        c.pinned ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400 hover:text-white'
                      }`}
                      title={c.pinned ? 'Unpin' : 'Pin to top'}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleExportOne(c)}
                      className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Export Markdown"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteConversation(c.id, e)}
                      className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenChat(c.id)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 active:scale-95"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {/* History Pagination Bar (Strictly 10 items per page) */}
          {filtered.length > itemsPerPage && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="text-slate-400">
                Showing <span className="font-semibold text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-semibold text-white">
                  {Math.min(currentPage * itemsPerPage, filtered.length)}
                </span>{' '}
                of <span className="font-semibold text-white">{filtered.length}</span> conversations
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1 px-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-500'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <span className="text-slate-400 px-1 font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
