import React, { useState, useRef, useEffect } from 'react';
import { AI_MODELS } from '../../data/models';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Send,
  MessageSquare,
  History,
  Zap,
  Sliders,
  X,
  Copy,
  Check,
  Trash2,
  Search,
  Shield,
  ArrowRight,
  Pin,
  Maximize2,
  Paperclip,
  Globe,
  FileText,
  Code,
  Mail,
  CheckSquare,
  Clock,
  RotateCcw
} from 'lucide-react';

export interface ExtensionUIProps {
  mode?: 'sidepanel' | 'popup';
  onClose?: () => void;
  mockArticleText?: string;
}

export interface ExtensionMessage {
  id: string;
  role: 'user' | 'assistant';
  modelId?: string;
  modelName?: string;
  content: string;
  timestamp: string;
}

export interface ExtensionHistoryItem {
  id: string;
  title: string;
  modelId: string;
  time: string;
  group: 'Today' | 'Yesterday' | 'Previous 7 Days';
  snippet: string;
}

export const ExtensionUI: React.FC<ExtensionUIProps> = ({
  mode = 'sidepanel',
  onClose,
  mockArticleText = ''
}) => {
  const { showToast, navigateTo } = useApp();

  // Navigation & Model State
  const [activeTab, setActiveTab] = useState<'chat' | 'actions' | 'history' | 'settings'>('chat');
  const [selectedModelId, setSelectedModelId] = useState<string>('deepseek-v4-pro');
  const [isPinned, setIsPinned] = useState<boolean>(true);

  // Input & Generation State
  const [inputText, setInputText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isWebSearchActive, setIsWebSearchActive] = useState<boolean>(false);
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // History Tab State
  const [historySearch, setHistorySearch] = useState<string>('');

  // Settings State
  const [temperature, setTemperature] = useState<number>(0.7);
  const [shortcutKey, setShortcutKey] = useState<string>('Alt+E');
  const [autoReadContext, setAutoReadContext] = useState<boolean>(true);
  const [streamTokens, setStreamTokens] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial messages
  const [messages, setMessages] = useState<ExtensionMessage[]>([
    {
      id: 'ext-msg-1',
      role: 'assistant',
      modelId: 'deepseek-v4-pro',
      modelName: 'DeepSeek V4 Pro',
      content:
        '👋 **EchoGPT Chrome Sidebar Active**\n\nI can summarize the active webpage, explain selected code snippets, draft email replies, or extract key action items. How can I assist you right now?',
      timestamp: 'Just now'
    }
  ]);

  // History items with date grouping
  const [historyItems, setHistoryItems] = useState<ExtensionHistoryItem[]>([
    {
      id: 'h-1',
      title: 'Summarize TechCrunch Agentic AI Article',
      modelId: 'deepseek-v4-pro',
      time: '12m ago',
      group: 'Today',
      snippet: 'Key takeaways on browser sidepanel integrations and context switching.'
    },
    {
      id: 'h-2',
      title: 'Explain React 19 Server Actions Code',
      modelId: 'claude-3-5-sonnet',
      time: '2h ago',
      group: 'Today',
      snippet: 'Optimistic UI update patterns and error boundary fallbacks.'
    },
    {
      id: 'h-3',
      title: 'Draft Client Scope Proposal Email',
      modelId: 'gpt-4o',
      time: '5h ago',
      group: 'Today',
      snippet: 'Proposed milestones and deliverables for enterprise AI deployment.'
    },
    {
      id: 'h-4',
      title: 'Debug Next.js 15 Streaming SSR Issue',
      modelId: 'deepseek-v4-pro',
      time: 'Yesterday',
      group: 'Yesterday',
      snippet: 'Suspense boundary resolution and edge runtime compatibility.'
    },
    {
      id: 'h-5',
      title: 'Analyze Competitor Pricing Tiers',
      modelId: 'glm-5',
      time: '3d ago',
      group: 'Previous 7 Days',
      snippet: 'Matrix breakdown of token costs across OpenAI, Anthropic, and Google.'
    }
  ]);

  const currentModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

  const frontierPills = [
    { id: 'deepseek-v4-pro', name: 'DeepSeek V4', speed: '12ms' },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', speed: '18ms' },
    { id: 'gpt-4o', name: 'GPT-4o', speed: '15ms' }
  ];

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSend = (overrideText?: string) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() && !attachedFileName) return;

    const userMessage: ExtensionMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!overrideText) setInputText('');
    setAttachedFileName(null);
    setIsGenerating(true);

    // Dynamic simulated response based on user input / context
    setTimeout(() => {
      finishSimulatedResponse(textToSend);
    }, 1200);
  };

  const finishSimulatedResponse = (textToSend: string) => {
    let responseContent = '';
    const lower = textToSend.toLowerCase();

    if (lower.includes('summarize')) {
      responseContent = `### 📑 Executive Webpage Summary (${currentModel.name})\n\n• **Core Thesis**: Native browser sidepanels reduce context switching by 74% compared to external chat tabs.\n• **Architecture Advantage**: Direct tab context ingestion eliminates manual copy-pasting.\n• **Verified Metric**: Average response generation latency clocked at **${currentModel.speed}** with zero data retention.`;
    } else if (lower.includes('explain') || lower.includes('code')) {
      responseContent = `### 💻 Code Logic Explanation (${currentModel.name})\n\n\`\`\`typescript\n// Optimistic UI state update with revalidation\nexport async function updateSessionState(sessionId: string) {\n  const res = await api.sync({ sessionId, timestamp: Date.now() });\n  return res.data;\n}\n\`\`\`\n\n1. **State Isolation**: Guarantees asynchronous updates don't block the browser thread.\n2. **Error Boundary**: Automatic retry with exponential backoff.\n3. **Complexity**: O(1) memory footprint.`;
    } else if (lower.includes('email') || lower.includes('draft')) {
      responseContent = `### ✉️ Draft Email Response (${currentModel.name})\n\n**Subject**: Re: Project Architecture & Multi-Model AI Integration\n\nHi Alex,\n\nThanks for reaching out! We've benchmarked the new multi-model routing setup in EchoGPT. By combining Claude 3.5 Sonnet for nuanced reasoning and DeepSeek V4 for code verification, our development throughput improved significantly.\n\nLet's schedule a 15-minute sync this Thursday to walk through the implementation.\n\nBest regards,\nEchoGPT Team`;
    } else if (lower.includes('action') || lower.includes('extract')) {
      responseContent = `### ✅ Extracted Action Items (${currentModel.name})\n\n1. [ ] **Alex / Engineering**: Finalize MCP database connector endpoints by EOD Wednesday.\n2. [ ] **Elena / Frontend**: Deploy Chrome sidepanel hotkey settings to production.\n3. [ ] **Marcus / Research**: Verify token benchmark reports across 100+ models.`;
    } else {
      responseContent = `**EchoGPT (${currentModel.name})**:\n\nI processed your query: *"${textToSend}"*.\n\n${
        isWebSearchActive ? '🌐 *Web Search verified latest live sources.* \n\n' : ''
      }I'm ready to elaborate further, generate code implementations, or summarize any part of this webpage.`;
    }

    const assistantMessage: ExtensionMessage = {
      id: 'msg-' + (Date.now() + 1),
      role: 'assistant',
      modelId: currentModel.id,
      modelName: currentModel.name,
      content: responseContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsGenerating(false);
  };

  const handleCopy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    showToast('Copied to clipboard', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleTriggerPreset = (presetKey: string) => {
    setActiveTab('chat');
    if (presetKey === 'summarize') {
      const pageRef = mockArticleText ? ` for (${mockArticleText})` : '';
      handleSend(`Summarize the active webpage content${pageRef} into 3 key takeaways and verified metrics.`);
    } else if (presetKey === 'code') {
      handleSend('Explain the code selection on this page, highlighting time complexity and optimization tips:');
    } else if (presetKey === 'email') {
      handleSend('Draft a professional email reply acknowledging the feedback and setting up next steps:');
    } else if (presetKey === 'actions') {
      handleSend('Extract all actionable items, owners, and deadlines from this page:');
    }
  };

  const handleResumeHistory = (item: ExtensionHistoryItem) => {
    setSelectedModelId(item.modelId);
    setActiveTab('chat');
    showToast(`Resumed "${item.title}"`, 'info');
  };

  const handleDeleteHistory = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Session removed from history', 'info');
  };

  const handleAttachFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFileName(file.name);
      showToast(`Attached ${file.name}`, 'info');
    }
  };

  const estimatedTokens = Math.max(1, Math.round(inputText.length / 4));

  return (
    <div
      className={`flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden font-sans select-none ring-1 ring-slate-200/80 dark:ring-white/10 ${
        mode === 'popup'
          ? 'w-[380px] max-w-full h-[580px] rounded-2xl'
          : 'w-full max-w-[420px] h-full rounded-2xl'
      }`}
    >
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload document or screenshot"
      />

      {/* Top Drag-Bar Container */}
      <div className="pt-2 pb-1 bg-slate-50 dark:bg-slate-950 flex justify-center items-center cursor-grab active:cursor-grabbing border-b border-slate-200 dark:border-slate-900/60">
        <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700/80 hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors" />
      </div>

      {/* Main Extension Header */}
      <div className="px-3.5 py-2.5 bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
        {/* Brand & Version */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 shadow-sm shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-slate-900 dark:text-white tracking-tight">EchoGPT</span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                v2.4
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono leading-none mt-0.5">
              Sidepanel Active
            </p>
          </div>
        </div>

        {/* Action Controls: Pin, Expand, Close */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setIsPinned(!isPinned);
              showToast(isPinned ? 'Unpinned from tab' : 'Pinned to active tab', 'info');
            }}
            title={isPinned ? 'Pinned to active tab' : 'Pin to browser'}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              isPinned
                ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-cyan-400 border border-indigo-200 dark:border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Pin className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              showToast('Opening full EchoGPT workspace...', 'info');
              navigateTo('webapp');
            }}
            title="Expand to Full Workspace"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              title="Close Extension"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Model Quick-Switch Pills Bar */}
      <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-1 overflow-x-auto">
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none">
          {frontierPills.map((m) => {
            const isSelected = selectedModelId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedModelId(m.id)}
                className={`px-2 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400/50'
                    : 'bg-white hover:bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>{m.name}</span>
                <span className="text-[9px] opacity-75 font-mono">({m.speed})</span>
              </button>
            );
          })}
        </div>

        {/* Model Dropdown Trigger */}
        <select
          value={selectedModelId}
          onChange={(e) => setSelectedModelId(e.target.value)}
          aria-label="Select AI Model"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-[10px] text-slate-700 dark:text-slate-300 px-1 py-1 font-mono focus:outline-none shrink-0"
        >
          {AI_MODELS.map((model) => (
            <option key={model.id} value={model.id}>
              {model.shortName}
            </option>
          ))}
        </select>
      </div>

      {/* Top Navigation Tabs: Chat, Quick Actions, History, Settings */}
      <div className="px-2 pt-1.5 pb-1.5 bg-slate-100/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-around text-xs shrink-0">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors text-xs ${
            activeTab === 'chat'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat</span>
        </button>

        <button
          onClick={() => setActiveTab('actions')}
          className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors text-xs ${
            activeTab === 'actions'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          <span>Quick Actions</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors text-xs ${
            activeTab === 'history'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>History</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors text-xs ${
            activeTab === 'settings'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-hidden flex flex-col justify-between">
        
        {/* TAB 1: CHAT */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Quick 1-Click Preset Pills Hub */}
            <div className="p-2 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <button
                onClick={() => handleTriggerPreset('summarize')}
                disabled={isGenerating}
                className="py-1 px-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold flex items-center gap-1 whitespace-nowrap transition-colors shrink-0 shadow-xs"
              >
                <FileText className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                <span>Summarize Page</span>
              </button>

              <button
                onClick={() => handleTriggerPreset('code')}
                disabled={isGenerating}
                className="py-1 px-2.5 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold flex items-center gap-1 whitespace-nowrap transition-colors shrink-0 shadow-xs"
              >
                <Code className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Explain Code</span>
              </button>

              <button
                onClick={() => handleTriggerPreset('email')}
                disabled={isGenerating}
                className="py-1 px-2.5 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold flex items-center gap-1 whitespace-nowrap transition-colors shrink-0 shadow-xs"
              >
                <Mail className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span>Draft Reply</span>
              </button>

              <button
                onClick={() => handleTriggerPreset('actions')}
                disabled={isGenerating}
                className="py-1 px-2.5 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold flex items-center gap-1 whitespace-nowrap transition-colors shrink-0 shadow-xs"
              >
                <CheckSquare className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                <span>Extract Actions</span>
              </button>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs bg-slate-50/50 dark:bg-transparent">
              {messages.map((m, idx) => {
                const isUser = m.role === 'user';
                return (
                  <div
                    key={m.id || idx}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[92%] rounded-xl p-3 leading-relaxed shadow-xs ${
                        isUser
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none shadow-sm'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {!isUser && (
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 dark:border-slate-800/80 text-[10px] text-slate-500 dark:text-slate-400">
                          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                            <span>{m.modelName || currentModel.name}</span>
                          </span>
                          <button
                            onClick={() => handleCopy(idx, m.content)}
                            className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-[10px] transition-colors"
                            title="Copy response"
                          >
                            {copiedIndex === idx ? (
                              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      )}
                      <div className="whitespace-pre-wrap font-sans text-xs leading-relaxed">{m.content}</div>
                    </div>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 px-1">{m.timestamp}</span>
                  </div>
                );
              })}

              {isGenerating && (
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs flex items-center gap-2.5 animate-pulse shadow-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
                  <span className="font-mono text-[11px]">
                    {currentModel.name} is streaming tokens...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Input Experience: Expanding Textarea, File Attach, Web Search, Hotkey Hints */}
            <div className="p-2.5 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 space-y-1.5">
              {/* Attached file chip */}
              {attachedFileName && (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 text-[10px]">
                  <Paperclip className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  <span className="truncate max-w-[200px]">{attachedFileName}</span>
                  <button
                    onClick={() => setAttachedFileName(null)}
                    className="hover:text-rose-600 dark:hover:text-rose-400"
                    title="Remove file"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Textarea container */}
              <div className="relative rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all p-2 shadow-xs">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  placeholder={`Ask ${currentModel.shortName} about this page or prompt...`}
                  className="w-full bg-transparent resize-none text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none max-h-[120px] leading-relaxed"
                />

                {/* Input Toolbar: File attach, Web search toggle, Token counter, Send */}
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/80 dark:border-slate-800/60 mt-1">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleAttachFileClick}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                      title="Attach file or screenshot"
                    >
                      <Paperclip className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsWebSearchActive(!isWebSearchActive);
                        showToast(
                          !isWebSearchActive ? 'Web Search Enabled' : 'Web Search Disabled',
                          'info'
                        );
                      }}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 transition-colors ${
                        isWebSearchActive
                          ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/40'
                          : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                      }`}
                      title="Toggle live web search synthesis"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Web</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 dark:text-slate-500 font-mono">
                      ~{estimatedTokens} tok
                    </span>

                    <button
                      onClick={() => handleSend()}
                      disabled={!inputText.trim() || isGenerating}
                      className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white shrink-0 transition-colors shadow-sm"
                      title="Send prompt (Enter)"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Hotkey hint line */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 font-mono">
                <span>Enter ↵ send • Shift+Enter newline</span>
                <span className="text-indigo-600 dark:text-indigo-400">Alt+E sidebar</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUICK ACTIONS HUB */}
        {activeTab === 'actions' && (
          <div className="p-3.5 space-y-3 overflow-y-auto bg-slate-50/50 dark:bg-transparent">
            <div className="pb-1 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                1-Click Preset Actions
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Trigger context-aware automation on your active browser tab.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => handleTriggerPreset('summarize')}
                className="w-full p-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900/90 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/40 flex items-start gap-3 text-left transition-all group shadow-xs"
              >
                <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                      Summarize Page Content
                    </p>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Extracts 3 concise bullets and verified metrics from the current tab.
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleTriggerPreset('code')}
                className="w-full p-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900/90 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500/40 flex items-start gap-3 text-left transition-all group shadow-xs"
              >
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 shrink-0 group-hover:scale-105 transition-transform">
                  <Code className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                      Explain Code Selection
                    </p>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Decodes syntax, analyzes time complexity, and flags potential edge cases.
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleTriggerPreset('email')}
                className="w-full p-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900/90 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/40 flex items-start gap-3 text-left transition-all group shadow-xs"
              >
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      Draft Email Reply
                    </p>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Composes a refined professional response tailored to the active message thread.
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleTriggerPreset('actions')}
                className="w-full p-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900/90 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500/40 flex items-start gap-3 text-left transition-all group shadow-xs"
              >
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 shrink-0 group-hover:scale-105 transition-transform">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      Extract Action Items
                    </p>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Parses meeting notes, PR descriptions, and tickets into actionable task checklists.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: CONVERSATION HISTORY */}
        {activeTab === 'history' && (
          <div className="p-3.5 space-y-3 overflow-y-auto bg-slate-50/50 dark:bg-transparent">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search past sidebar conversations..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 shadow-xs"
              />
            </div>

            {/* Date Grouped Sessions */}
            {(['Today', 'Yesterday', 'Previous 7 Days'] as const).map((groupName) => {
              const items = historyItems.filter(
                (item) =>
                  item.group === groupName &&
                  (item.title.toLowerCase().includes(historySearch.toLowerCase()) ||
                    item.snippet.toLowerCase().includes(historySearch.toLowerCase()))
              );

              if (items.length === 0) return null;

              return (
                <div key={groupName} className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                    <Clock className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                    <span>{groupName}</span>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-xs flex flex-col justify-between gap-1 group shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[240px]">
                          {item.title}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleResumeHistory(item)}
                            className="px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold flex items-center gap-1 transition-colors border border-indigo-200 dark:border-indigo-500/30"
                            title="Resume session in chat"
                          >
                            <RotateCcw className="w-2.5 h-2.5" />
                            <span>Resume</span>
                          </button>
                          <button
                            onClick={() => handleDeleteHistory(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                            title="Delete session"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{item.snippet}</p>
                      <div className="flex items-center justify-between text-[9px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800/40">
                        <span>{item.modelId}</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: SETTINGS & SHORTCUTS PANEL */}
        {activeTab === 'settings' && (
          <div className="p-3.5 space-y-4 text-xs overflow-y-auto bg-slate-50/50 dark:bg-transparent">
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-xs">Extension Preferences</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Configure keybindings, models, and privacy.</p>
            </div>

            {/* Keybindings Config */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">Keyboard Shortcuts</span>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 dark:text-slate-400">Toggle Sidebar</span>
                <button
                  type="button"
                  onClick={() => {
                    const nextKey =
                      shortcutKey === 'Alt+E'
                        ? 'Ctrl+Shift+E'
                        : shortcutKey === 'Ctrl+Shift+E'
                        ? '⌘+Shift+E'
                        : 'Alt+E';
                    setShortcutKey(nextKey);
                    showToast(`Shortcut set to ${nextKey}`, 'info');
                  }}
                  className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                  title="Click to cycle shortcut"
                >
                  <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-mono text-cyan-700 dark:text-cyan-300 text-[10px] cursor-pointer shadow-xs">
                    {shortcutKey}
                  </kbd>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">(Click to switch)</span>
                </button>
              </div>
            </div>

            {/* Default Model Selector */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">Default Model Engine</span>
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                {AI_MODELS.slice(0, 10).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>

            {/* Temperature Slider */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">Creativity (Temperature)</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-300 text-[11px] font-semibold">{temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                <span>0.0 (Precise / Code)</span>
                <span>1.0 (Creative)</span>
              </div>
            </div>

            {/* Privacy & Automation Toggles */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-xs">Read Active Tab Context</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Allows instant summarization & explain</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoReadContext}
                  onChange={(e) => setAutoReadContext(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
                />
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-xs">Real-Time Token Streaming</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Stream words as generated</p>
                </div>
                <input
                  type="checkbox"
                  checked={streamTokens}
                  onChange={(e) => setStreamTokens(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
                />
              </div>
            </div>

            {/* Enterprise Zero-Retention Card */}
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-[11px] text-slate-700 dark:text-slate-300 space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Zero-Retention Policy</span>
              </div>
              <p>Prompts are processed on commercial endpoints and never retained for public model training.</p>
            </div>
          </div>
        )}

      </div>

      {/* Extension Footer status */}
      <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-slate-600 dark:text-slate-400">Connected to EchoGPT Engine</span>
        </span>
        <span className="font-mono text-slate-500">Manifest V3 • Alt+E</span>
      </div>
    </div>
  );
};

// Re-export alias for simulator/view naming compatibility
export const ExtensionSimulator = ExtensionUI;
export const ExtensionView = ExtensionUI;
export default ExtensionUI;
