import React, { useState } from 'react';
import { AI_MODELS } from '../../data/models';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sparkles,
  Send,
  MessageSquare,
  History,
  Zap,
  Settings,
  X,
  Copy,
  Check,
  Trash2,
  Search,
  Shield,
  ArrowRight
} from 'lucide-react';

interface ExtensionUIProps {
  mode?: 'sidepanel' | 'popup';
  onClose?: () => void;
  mockArticleText?: string;
}

interface ExtensionMessage {
  id: string;
  role: 'user' | 'assistant';
  modelId?: string;
  content: string;
  timestamp: string;
}

interface ExtensionChatHistoryItem {
  id: string;
  title: string;
  time: string;
}

export const ExtensionUI: React.FC<ExtensionUIProps> = ({
  mode = 'sidepanel',
  onClose,
  mockArticleText = ''
}) => {
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'chat' | 'actions' | 'history' | 'settings'>('chat');
  const [selectedModelId, setSelectedModelId] = useState<string>('gpt-4o');
  const [inputText, setInputText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [historySearch, setHistorySearch] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Extension specific conversational messages
  const [messages, setMessages] = useState<ExtensionMessage[]>([
    {
      id: 'ext-msg-1',
      role: 'assistant',
      modelId: 'gpt-4o',
      content: 'Hello! I am your EchoGPT browser assistant. You can ask me anything, click **Summarize Page** above, or highlight any text on this page to explain it.',
      timestamp: 'Just now'
    }
  ]);

  const [recentExtensionChats, setRecentExtensionChats] = useState<ExtensionChatHistoryItem[]>([
    { id: 'ec-1', title: 'TechCrunch Article Summary', time: '10m ago' },
    { id: 'ec-2', title: 'React 19 Hooks Migration', time: '2h ago' },
    { id: 'ec-3', title: 'Stripe API Invoicing Questions', time: 'Yesterday' }
  ]);

  const currentModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

  const handleSend = async (customPrompt: string | null = null) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isGenerating) return;

    const userMsg: ExtensionMessage = {
      id: 'ext-u-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 450));

    let reply = '';
    const lower = textToSend.toLowerCase();

    if (lower.includes('summarize')) {
      reply = `### Page Summary (${currentModel.name})\n\n• **Core Thesis**: The article describes how browser sidepanel architecture streamlines engineering workflows by eliminating tab fragmentation.\n• **Key Metric**: Users report a 74% reduction in context switching.\n• **Strategic Takeaway**: Native extension integration provides real-time contextual awareness without manual copy-pasting.`;
    } else if (lower.includes('explain') || lower.includes('highlight')) {
      reply = `### Highlighted Text Analysis\n\nThe selected text explores cognitive load in multitasking: when developers leave an active tab, recovering state takes an average of 4.5 minutes. EchoGPT prevents this by maintaining state in the browser sidebar.`;
    } else {
      reply = `**EchoGPT (${currentModel.name})**: I have processed your request: "${textToSend}". Let me know if you would like me to rewrite this, extract code, or translate it!`;
    }

    const aiMsg: ExtensionMessage = {
      id: 'ext-a-' + Date.now(),
      role: 'assistant',
      modelId: currentModel.id,
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsGenerating(false);
  };

  const handleSummarizePage = () => {
    const target = mockArticleText ? ` (${mockArticleText})` : '';
    handleSend(`Summarize the active webpage article${target} into 3 key takeaways and actionable metrics.`);
  };

  const handleCopy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    showToast('Copied to clipboard', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div
      className={`flex flex-col bg-slate-950 text-slate-100 border border-slate-800 shadow-2xl overflow-hidden font-sans select-none ${
        mode === 'popup'
          ? 'w-[380px] h-[560px] rounded-2xl ring-1 ring-white/10'
          : 'w-full h-full'
      }`}
    >
      {/* Extension Header */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 shadow-sm shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-white">EchoGPT</span>
              <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                Sidebar
              </span>
            </div>
          </div>
        </div>

        {/* Model Switcher Pill */}
        <div className="flex items-center gap-1">
          <select
            value={selectedModelId}
            onChange={(e) => setSelectedModelId(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-200 font-medium focus:outline-none"
          >
            {AI_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.shortName}
              </option>
            ))}
          </select>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Close Extension"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="px-2 pt-1 pb-1 bg-slate-900/60 border-b border-slate-800 flex items-center justify-around text-xs shrink-0">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === 'chat'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat</span>
        </button>

        <button
          onClick={() => setActiveTab('actions')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === 'actions'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Actions</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === 'history'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>History</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === 'settings'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>
      </div>

      {/* Body Area */}
      <div className="flex-1 overflow-y-auto flex flex-col justify-between">
        
        {/* CHAT TAB */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            
            {/* Quick Context Action Bar */}
            <div className="p-2 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between gap-2">
              <button
                onClick={handleSummarizePage}
                disabled={isGenerating}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Summarize Page</span>
              </button>

              <button
                onClick={() => handleSend('Explain the highlighted text and its practical implications.')}
                disabled={isGenerating}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Explain Highlight</span>
              </button>
            </div>

            {/* Messages list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
              {messages.map((m, idx) => {
                const isUser = m.role === 'user';
                return (
                  <div
                    key={m.id || idx}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-xl p-3 leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {!isUser && (
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800/80 text-[10px] text-slate-400">
                          <span className="font-bold text-white">{currentModel.shortName}</span>
                          <button
                            onClick={() => handleCopy(idx, m.content)}
                            className="hover:text-white flex items-center gap-1"
                          >
                            {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{m.content}</div>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
                  </div>
                );
              })}

              {isGenerating && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>{currentModel.shortName} is generating response...</span>
                </div>
              )}
            </div>

            {/* Compact Composer */}
            <div className="p-2.5 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Ask about this page or general query..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim() || isGenerating}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white shrink-0 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* ACTIONS TAB */}
        {activeTab === 'actions' && (
          <div className="p-4 space-y-3 overflow-y-auto">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Page & Selection Actions
            </p>

            <button
              onClick={() => {
                setActiveTab('chat');
                handleSummarizePage();
              }}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-left transition-colors group"
            >
              <div>
                <p className="text-xs font-bold text-white">Summarize Active Webpage</p>
                <p className="text-[11px] text-slate-400">Extracts 3 concise bullets and key takeaways</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => {
                setActiveTab('chat');
                handleSend('Analyze this text line by line and explain the underlying reasoning in simple terms:');
              }}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-left transition-colors group"
            >
              <div>
                <p className="text-xs font-bold text-white">Explain Highlighted Text</p>
                <p className="text-[11px] text-slate-400">Breaks down complex vocabulary and concepts</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => {
                setActiveTab('chat');
                handleSend('Rewrite this text to make it professional, engaging, and ready for publication:');
              }}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-left transition-colors group"
            >
              <div>
                <p className="text-xs font-bold text-white">Improve Prose & Polish</p>
                <p className="text-[11px] text-slate-400">Fixes grammar, flow, and tone instantly</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => {
                setActiveTab('chat');
                handleSend('Translate this text into fluent Spanish preserving formatting:');
              }}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-left transition-colors group"
            >
              <div>
                <p className="text-xs font-bold text-white">Translate Selection</p>
                <p className="text-[11px] text-slate-400">Multi-language high accuracy translation</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </button>
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="p-3 space-y-3 overflow-y-auto">
            <div className="relative">
              <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search history..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              {recentExtensionChats
                .filter((c) => c.title.toLowerCase().includes(historySearch.toLowerCase()))
                .map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => {
                      setActiveTab('chat');
                      showToast(`Loaded ${chat.title}`, 'info');
                    }}
                    className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 flex items-center justify-between cursor-pointer transition-colors text-xs"
                  >
                    <div className="truncate pr-2">
                      <p className="font-semibold text-white truncate">{chat.title}</p>
                      <p className="text-[10px] text-slate-500">{chat.time}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRecentExtensionChats((prev) => prev.filter((item) => item.id !== chat.id));
                        showToast('Removed from history', 'info');
                      }}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="p-4 space-y-4 text-xs overflow-y-auto">
            <div>
              <p className="font-bold text-white">Extension Preferences</p>
              <p className="text-[11px] text-slate-400">Tune your browser sidebar behavior</p>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span>Color Theme</span>
                <button
                  onClick={toggleTheme}
                  className="px-2 py-1 rounded bg-slate-800 text-xs text-white font-medium"
                >
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-300 block">Default Shortcut</span>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400">Toggle Sidebar</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-cyan-300">
                    Ctrl + Shift + E
                  </kbd>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-[11px] text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Privacy Safe</span>
                </div>
                <p>Webpage content is only read when you trigger an action. No background scraping.</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Extension Footer status */}
      <div className="p-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 shrink-0">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Connected to EchoGPT Engine</span>
        </span>
        <span>v2.4 (Manifest V3)</span>
      </div>
    </div>
  );
};
