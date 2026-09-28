import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { AI_MODELS } from '../../../data/models';
import { Conversation } from '../../../@types';
import {
  History,
  Search,
  Trash2,
  Download,
  MessageSquare,
  Pin,
  ArrowRight
} from 'lucide-react';

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
  const [filterType, setFilterType] = useState<string>('All');

  const filtered = conversations.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === 'All' || c.category === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleOpenChat = (id: string) => {
    setActiveConversationId(id);
    setActiveView('chat');
    if (onSelectConversation) onSelectConversation(id);
    showToast('Loaded conversation session', 'info');
  };

  const handleExportOne = (conv: Conversation) => {
    const text = `# ${conv.title}\nDate: ${conv.timestamp}\nCategory: ${conv.category}\n\n` +
      conv.messages.map(m => `### ${m.role === 'user' ? 'User' : 'EchoGPT'} (${m.timestamp})\n\n${m.content}\n`).join('\n---\n\n');
    
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${conv.title.replace(/\s+/g, '_')}.md`;
    a.click();
    showToast('Exported conversation as Markdown', 'success');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <History className="w-3.5 h-3.5" />
              <span>Workspace Archives</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Chat History & Session Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Browse, search, export, and manage your past AI queries and project conversations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Total: {conversations.length} records
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations by title or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['All', 'Engineering', 'Research', 'Finance', 'Writing'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterType === f
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Conversations Table / Cards */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="py-16 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No matching conversations found</p>
              <p className="text-xs text-slate-500">Try adjusting your search terms or filter</p>
            </div>
          ) : (
            filtered.map((c) => {
              const model = AI_MODELS.find(m => m.id === c.modelId) || AI_MODELS[0];

              return (
                <div
                  key={c.id}
                  onClick={() => handleOpenChat(c.id)}
                  className="p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group shadow-md"
                >
                  <div className="flex items-start gap-3 truncate">
                    <span className="text-xl p-2 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                      {model.avatar}
                    </span>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                          {c.title}
                        </h4>
                        {c.pinned && (
                          <span className="p-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold px-1.5 border border-amber-400/30">
                            Pinned
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{model.name}</span>
                        <span>•</span>
                        <span>{c.category}</span>
                        <span>•</span>
                        <span>{c.messages.length} messages</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[11px] text-slate-500 font-mono mr-2 hidden md:inline">
                      {c.timestamp}
                    </span>

                    <button
                      onClick={() => togglePinConversation(c.id)}
                      className={`p-2 rounded-xl border border-slate-800 hover:bg-slate-800 transition-colors ${
                        c.pinned ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400 hover:text-white'
                      }`}
                      title={c.pinned ? 'Unpin' : 'Pin to top'}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleExportOne(c)}
                      className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Export Markdown"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => deleteConversation(c.id)}
                      className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleOpenChat(c.id)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
