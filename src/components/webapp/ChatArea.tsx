import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AI_MODELS } from '../../data/models';
import { STARTER_PROMPTS, StarterPrompt } from '../../data/quickActions';
import {
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  VolumeX,
  Sparkles,
  FileText,
  Code2
} from 'lucide-react';

interface ChatAreaProps {
  onOpenModelSelector?: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = () => {
  const {
    activeConversation,
    sendMessage,
    isGenerating,
    selectedModelId,
    setSelectedModelId,
    showToast
  } = useApp();

  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'like' | 'dislike' | null>>({});
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isGenerating]);

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    showToast('Copied to clipboard', 'success');
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleFeedback = (id: string, type: 'like' | 'dislike') => {
    setFeedback((prev) => ({
      ...prev,
      [id]: prev[id] === type ? null : type
    }));
    showToast(type === 'like' ? 'Thank you for your feedback!' : 'Feedback noted for model tuning', 'info');
  };

  const handleToggleSpeak = (id: string) => {
    if (speakingMsgId === id) {
      setSpeakingMsgId(null);
      showToast('Speech playback paused', 'info');
    } else {
      setSpeakingMsgId(id);
      showToast('Reading aloud with neural voice...', 'info');
      setTimeout(() => setSpeakingMsgId(null), 5000);
    }
  };

  const handleRegenerate = () => {
    if (activeConversation?.messages && activeConversation.messages.length > 0) {
      const lastUserMsg = [...activeConversation.messages].reverse().find((m) => m.role === 'user');
      if (lastUserMsg) {
        sendMessage(lastUserMsg.content);
        showToast('Regenerating response with ' + currentModel.name, 'info');
      }
    }
  };

  const handleStarterPrompt = (item: StarterPrompt) => {
    if (item.modelId) setSelectedModelId(item.modelId);
    sendMessage(item.prompt);
  };

  // Helper to render markdown-like content cleanly with code block syntax styling
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        // Extract language and code
        const firstLineEnd = part.indexOf('\n');
        const lang = part.slice(3, firstLineEnd).trim() || 'code';
        const code = part.slice(firstLineEnd + 1, -3);

        return (
          <div key={index} className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-md">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400">
              <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                {lang}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  showToast('Code copied to clipboard', 'success');
                }}
                className="hover:text-white flex items-center gap-1 text-[11px] transition-colors"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Format basic markdown elements (bold, tables, blockquotes, lists)
      const lines = part.split('\n');
      return (
        <div key={index} className="space-y-2">
          {lines.map((line, lIdx) => {
            if (line.startsWith('### ')) {
              return <h3 key={lIdx} className="text-base font-bold text-white mt-3 mb-1">{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('#### ')) {
              return <h4 key={lIdx} className="text-sm font-bold text-indigo-300 mt-2 mb-1">{line.replace('#### ', '')}</h4>;
            }
            if (line.startsWith('> ')) {
              return (
                <div key={lIdx} className="p-3 my-2 rounded-lg bg-indigo-500/10 border-l-4 border-indigo-500 text-indigo-200 text-xs sm:text-sm">
                  {line.replace('> ', '')}
                </div>
              );
            }
            if (line.startsWith('• ') || line.startsWith('- ')) {
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-2 text-slate-200">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>{line.replace(/^[•-]\s*/, '')}</span>
                </div>
              );
            }
            if (line.trim() === '') {
              return <div key={lIdx} className="h-1" />;
            }
            return <p key={lIdx} className="leading-relaxed">{line}</p>;
          })}
        </div>
      );
    });
  };

  const messages = activeConversation?.messages || [];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Welcome Empty State if no messages */}
        {messages.length === 0 ? (
          <div className="py-12 sm:py-20 text-center space-y-6 animate-in fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 shadow-xl shadow-indigo-500/25">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                How can EchoGPT assist you today?
              </h2>
              <p className="text-sm text-slate-400">
                You are currently chatting with <strong className="text-white">{currentModel.name}</strong>. Choose a template or ask any question.
              </p>
            </div>

            {/* Starter Prompt Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto pt-4 text-left">
              {STARTER_PROMPTS.map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStarterPrompt(starter)}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-left group shadow-md"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    <span className="text-indigo-400">{starter.category}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white flex items-center gap-1">
                      <span>Send</span> →
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {starter.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {starter.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Message Stream */
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            const msgModel = AI_MODELS.find((m) => m.id === msg.modelId) || currentModel;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant Avatar */}
                {!isUser && (
                  <div className={`w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-sm border ${msgModel.borderColor} shrink-0 shadow-sm mt-1`}>
                    {msgModel.avatar}
                  </div>
                )}

                {/* Message Body */}
                <div
                  className={`max-w-2xl sm:max-w-3xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-md ${
                    isUser
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-sm ml-8'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm w-full'
                  }`}
                >
                  {/* Top Model Badge for Assistant */}
                  {!isUser && (
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{msg.modelName || msgModel.name}</span>
                        <span className="text-[10px] text-slate-400">{msgModel.provider}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>
                  )}

                  {/* Attachment if sent by user */}
                  {isUser && msg.attachment && (
                    <div className="mb-2 p-2 rounded-lg bg-black/20 border border-white/10 flex items-center gap-2 text-xs">
                      <FileText className="w-3.5 h-3.5" />
                      <span className="font-semibold">{msg.attachment.name}</span>
                    </div>
                  )}

                  {/* Render content */}
                  <div>
                    {isUser ? <p className="whitespace-pre-wrap">{msg.content}</p> : renderMessageContent(msg.content)}
                  </div>

                  {/* Assistant Action Bar */}
                  {!isUser && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        {/* Copy */}
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="p-1 rounded hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
                          title="Copy response"
                        >
                          {copiedMsgId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[11px] hidden sm:inline">{copiedMsgId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>

                        {/* Regenerate */}
                        <button
                          onClick={handleRegenerate}
                          className="p-1 rounded hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
                          title="Regenerate with active model"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span className="text-[11px] hidden sm:inline">Retry</span>
                        </button>

                        {/* Read Aloud Simulation */}
                        <button
                          onClick={() => handleToggleSpeak(msg.id)}
                          className={`p-1 rounded transition-colors flex items-center gap-1 ${
                            speakingMsgId === msg.id ? 'text-cyan-400 animate-pulse' : 'hover:text-white hover:bg-slate-800'
                          }`}
                          title="Read aloud"
                        >
                          {speakingMsgId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          <span className="text-[11px] hidden sm:inline">Speak</span>
                        </button>
                      </div>

                      {/* Feedback buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleFeedback(msg.id, 'like')}
                          className={`p-1.5 rounded transition-colors ${
                            feedback[msg.id] === 'like' ? 'text-emerald-400 bg-emerald-500/10' : 'hover:text-white hover:bg-slate-800'
                          }`}
                          title="Helpful response"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleFeedback(msg.id, 'dislike')}
                          className={`p-1.5 rounded transition-colors ${
                            feedback[msg.id] === 'dislike' ? 'text-rose-400 bg-rose-500/10' : 'hover:text-white hover:bg-slate-800'
                          }`}
                          title="Unhelpful response"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-xs text-white shrink-0 mt-1 shadow-sm">
                    U
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Real-time Streaming Generation Indicator */}
        {isGenerating && (
          <div className="flex items-start gap-3 sm:gap-4 animate-in fade-in">
            <div className={`w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-sm border ${currentModel.borderColor} shrink-0 shadow-sm mt-1 animate-pulse`}>
              {currentModel.avatar}
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="font-medium text-slate-400">
                EchoGPT is reasoning with <strong className="text-white">{currentModel.name}</strong>...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
