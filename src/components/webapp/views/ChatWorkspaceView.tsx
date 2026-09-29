import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { AI_MODELS } from '../../../data/models';
import { MarkdownRenderer } from '../../common/MarkdownRenderer';
import {
  Send,
  Paperclip,
  Mic,
  Clock,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  VolumeX,
  Globe,
  FileCode,
  X,
  FileText,
  Loader2,
  ChevronDown,
  Zap,
  Trash2,
  AlertTriangle
} from 'lucide-react';

interface ChatWorkspaceViewProps {
  onOpenModelSelector?: () => void;
  onOpenUpgradeModal?: () => void;
}

interface StarterCard {
  title: string;
  subtitle: string;
  prompt: string;
  icon: string;
}

export const ChatWorkspaceView: React.FC<ChatWorkspaceViewProps> = ({
  onOpenModelSelector,
  onOpenUpgradeModal
}) => {
  const {
    activeConversation,
    sendMessage,
    isGenerating,
    selectedModelId,
    showToast,
    pendingPrompt,
    setPendingPrompt,
    clearCurrentMessages
  } = useApp();

  const [inputText, setInputText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [webSearchActive, setWebSearchActive] = useState<boolean>(false);
  const [codeContextActive, setCodeContextActive] = useState<boolean>(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'like' | 'dislike' | null>>({});
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isGenerating]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 180) + 'px';
    }
  }, [inputText]);

  // Pre-fill input when redirected from AI Tasks or blueprints
  useEffect(() => {
    if (pendingPrompt) {
      const promptToSet = pendingPrompt;
      setPendingPrompt(null);
      const timer = setTimeout(() => {
        setInputText(promptToSet);
        textareaRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pendingPrompt, setPendingPrompt]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const starterCards: StarterCard[] = [
    {
      title: 'Unlock Your Creative Flow',
      subtitle: 'Brainstorm novel concepts, marketing angles, or creative writing hooks.',
      prompt: 'Help me unlock creative ideas for an innovative, frictionless developer tool workflow.',
      icon: '🎨'
    },
    {
      title: 'Build a Resume That Shines',
      subtitle: 'Transform bullet points into quantified senior-level achievements.',
      prompt: 'Review my frontend engineering bullet points and rewrite them to highlight high-impact metrics (e.g. latency, ARR, adoption).',
      icon: '📄'
    },
    {
      title: 'Set a Challenge That Transforms You',
      subtitle: 'Design a personalized 30-day mastery plan for modern fullstack AI.',
      prompt: 'Create a structured 30-day engineering challenge to master React 19, Server Actions, and MCP Agent protocols.',
      icon: '🏆'
    },
    {
      title: 'Write Irresistible Social Content',
      subtitle: 'Craft viral X threads and LinkedIn thought leadership posts.',
      prompt: 'Draft an authentic, high-retention 5-tweet thread explaining why multi-model AI sidebars eliminate context switching.',
      icon: '✨'
    }
  ];

  const handleSend = () => {
    if ((!inputText.trim() && !attachedFile) || isGenerating) return;

    let finalPrompt = inputText;
    if (webSearchActive) finalPrompt = `[Web Search Active] ${finalPrompt}`;
    if (codeContextActive) finalPrompt = `[Code Sandbox Mode] ${finalPrompt}`;

    sendMessage(finalPrompt, attachedFile || undefined);
    setInputText('');
    setAttachedFile(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleStarterClick = (starter: StarterCard) => {
    setInputText(starter.prompt);
    sendMessage(starter.prompt);
  };

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
    showToast(type === 'like' ? 'Thank you for your feedback!' : 'Feedback noted', 'info');
  };

  const handleRetry = (msgIndex: number) => {
    if (isGenerating) return;
    const priorUserMsg = messages
      .slice(0, msgIndex)
      .reverse()
      .find((m) => m.role === 'user');

    if (priorUserMsg) {
      sendMessage(priorUserMsg.content, priorUserMsg.attachment);
      showToast('Regenerating response...', 'info');
    } else {
      sendMessage('Please provide a more detailed breakdown.');
    }
  };

  const handleToggleSpeak = (id: string, text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (speakingMsgId === id) {
        window.speechSynthesis.cancel();
        setSpeakingMsgId(null);
        showToast('Speech playback paused', 'info');
        return;
      }

      window.speechSynthesis.cancel();
      setSpeakingMsgId(id);
      showToast('Reading aloud with neural voice...', 'info');

      // Strip markdown syntax for natural voice synthesis
      const cleanText = text
        .replace(/```[\s\S]*?```/g, 'Code block omitted.')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[#*_~>[\]]/g, '')
        .replace(/\(http[^)]+\)/g, '')
        .replace(/\n+/g, ' ');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.onend = () => setSpeakingMsgId(null);
      utterance.onerror = () => setSpeakingMsgId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      if (speakingMsgId === id) {
        setSpeakingMsgId(null);
        showToast('Speech playback paused', 'info');
      } else {
        setSpeakingMsgId(id);
        showToast('Reading aloud with neural voice...', 'info');
        setTimeout(() => setSpeakingMsgId(null), 4000);
      }
    }
  };

  const handleSimulateAttachment = () => {
    const mockFiles = [
      { name: 'technical-spec-v3.pdf', size: '1.8 MB' },
      { name: 'dataset-metrics.csv', size: '320 KB' },
      { name: 'AppArchitecture.tsx', size: '18 KB' }
    ];
    const picked = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    setAttachedFile(picked);
    showToast(`Attached ${picked.name}`, 'info');
  };

  const handleToggleVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      showToast('Listening... Speak your prompt now', 'info');
      setTimeout(() => {
        setInputText('Explain how Model Context Protocol (MCP) servers interact with client hosts.');
        setIsRecording(false);
        showToast('Voice transcribed!', 'success');
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };


  const messages = activeConversation?.messages || [];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 relative">
      {/* Top Workspace Header Bar: Selected Model Pill, Token Speed Counter, Live Status, Clear Chat */}
      <div className="px-4 py-2.5 sm:px-6 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md flex items-center justify-between gap-2 text-xs shrink-0 z-10 overflow-x-auto no-scrollbar momentum-scroll">
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={onOpenModelSelector}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 text-slate-900 dark:text-white font-medium transition-all group shadow-sm"
            title="Switch Model"
          >
            <span className="text-sm">{currentModel.avatar}</span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">{currentModel.name}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-bold hidden sm:inline">
              {currentModel.badge}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
          </button>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs shadow-none">
            <Zap className="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0" />
            <span className="text-slate-500 dark:text-slate-400 font-medium">Speed:</span>
            <span className="text-slate-900 dark:text-slate-200 font-mono font-semibold">{currentModel.speed}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-medium">Live AI Online</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={clearCurrentMessages}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20 transition-all text-xs"
              title="Clear current conversation messages"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages / Welcome Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 space-y-6 momentum-scroll overscroll-contain">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Screen when conversation has 0 messages */}
          {messages.length === 0 ? (
            <div className="py-8 sm:py-14 text-center space-y-6 animate-in fade-in">
              {/* Central Model Header */}
              <div className="space-y-2 max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                  <span>{currentModel.avatar}</span>
                  <span>{currentModel.name}</span>
                  <span className="text-slate-400 dark:text-slate-500">•</span>
                  <span className="text-slate-700 dark:text-slate-300">{currentModel.badge}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {currentModel.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {currentModel.description}
                </p>
              </div>

              {/* 4 Starter Prompt Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-3xl mx-auto pt-2 text-left">
                {starterCards.map((starter, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStarterClick(starter)}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-violet-500/50 hover:shadow-md transition-all dark:bg-slate-900/60 dark:border-slate-800/80 dark:hover:border-violet-500/40 dark:shadow-none text-left group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">{starter.icon}</span>
                        <span className="text-[11px] font-mono font-medium text-violet-600 dark:text-violet-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          <span>Prompt</span> →
                        </span>
                      </div>
                      <h4 className="text-slate-900 dark:text-slate-100 font-semibold text-sm">
                        {starter.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-1">
                        {starter.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Token & Reset Timer Info Bar */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                  <span>
                    <strong className="text-slate-800 dark:text-slate-200">5 of 5 messages</strong> left this 5-hour window. Reset at 18:00.
                  </span>
                  <button
                    onClick={onOpenUpgradeModal}
                    className="text-violet-600 dark:text-indigo-400 hover:text-violet-700 dark:hover:text-indigo-300 font-bold ml-1 hover:underline"
                  >
                    Upgrade for unlimited →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Conversational Stream */
            messages.map((msg, idx) => {
              const isUser = msg.role === 'user';
              const msgModel = AI_MODELS.find((m) => m.id === msg.modelId) || currentModel;
              const isStreamingThisMsg = isGenerating && !isUser && idx === messages.length - 1;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className={`w-8 h-8 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-sm border border-slate-200 dark:border-slate-800 ${msgModel.borderColor} shrink-0 shadow-sm mt-1`}>
                      {msgModel.avatar}
                    </div>
                  )}

                  <div
                    className={`max-w-[92%] sm:max-w-2xl lg:max-w-3xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-sm ml-8 shadow-md shadow-indigo-600/20'
                        : 'bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm w-full shadow-sm shadow-slate-200/50 dark:shadow-md'
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-xs">{msg.modelName || msgModel.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{msgModel.provider}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{msg.timestamp}</span>
                      </div>
                    )}

                    {isUser && msg.attachment && (
                      <div className="mb-2 p-2 rounded-lg bg-black/20 border border-white/10 flex items-center gap-2 text-xs">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="font-semibold">{msg.attachment.name}</span>
                      </div>
                    )}

                    <div>
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div className="relative">
                          {msg.content ? (
                            <>
                              <MarkdownRenderer content={msg.content} />
                              {isStreamingThisMsg && (
                                <span className="inline-block w-2 h-4 ml-1 align-middle bg-cyan-400 animate-pulse rounded-sm" />
                              )}
                            </>
                          ) : (
                            /* Streaming placeholder while awaiting tokens */
                            <div className="flex items-center gap-2.5 py-1 text-slate-500 dark:text-slate-400 text-xs">
                              <div className="flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                              </div>
                              <span className="italic text-slate-500 dark:text-slate-400">{msg.modelName || currentModel.name} is formulating real AI response...</span>
                            </div>
                          )}

                          {/* Error Badge - only shown if explicitly triggered and empty */}
                          {msg.error && (!msg.content || msg.content.trim() === '') && (
                            <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between gap-3 animate-in fade-in">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
                                <span>Please enter a prompt to begin.</span>
                              </div>
                              <button
                                onClick={() => handleRetry(idx)}
                                className="px-3 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 dark:bg-rose-500/20 dark:hover:bg-rose-500/30 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-500/30 font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Retry</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {!isUser && !isStreamingThisMsg && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="p-1 rounded hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                            title="Copy response"
                          >
                            {copiedMsgId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            <span className="text-[11px] hidden sm:inline">{copiedMsgId === msg.id ? 'Copied' : 'Copy'}</span>
                          </button>

                          <button
                            onClick={() => handleRetry(idx)}
                            className="p-1 rounded hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                            title="Regenerate response"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span className="text-[11px] hidden sm:inline">Retry</span>
                          </button>

                          <button
                            onClick={() => handleToggleSpeak(msg.id, msg.content)}
                            className={`p-1 rounded transition-colors flex items-center gap-1 ${
                              speakingMsgId === msg.id ? 'text-violet-600 dark:text-cyan-400 animate-pulse' : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                            title="Read aloud"
                          >
                            {speakingMsgId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            <span className="text-[11px] hidden sm:inline">Speak</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleFeedback(msg.id, 'like')}
                            className={`p-1.5 rounded transition-colors ${
                              feedback[msg.id] === 'like' ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, 'dislike')}
                            className={`p-1.5 rounded transition-colors ${
                              feedback[msg.id] === 'dislike' ? 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10' : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 dark:bg-slate-800 dark:text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1 shadow-sm border border-violet-200 dark:border-transparent">
                      U
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Generating Indicator (shown while waiting for first token) */}
          {isGenerating && (!messages.length || messages[messages.length - 1].role === 'user') && (
            <div className="flex items-start gap-3 sm:gap-4 animate-in fade-in">
              <div className={`w-8 h-8 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-sm border border-slate-200 dark:border-slate-800 ${currentModel.borderColor} shrink-0 shadow-sm mt-1 animate-pulse`}>
                {currentModel.avatar}
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-center gap-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  {currentModel.name} is streaming response...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Prompt Composer Bar */}
      <div className="p-3 sm:p-5 pb-3 sm:pb-5 pb-safe border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shrink-0">
        <div className="max-w-4xl mx-auto space-y-2.5 w-full min-w-0">
          {/* Attachment Preview Chip */}
          {attachedFile && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-700 dark:text-indigo-300">
              <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-semibold">{attachedFile.name}</span>
              <button onClick={() => setAttachedFile(null)} className="ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Composer Input Box */}
          <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 focus-within:border-violet-600 focus-within:ring-2 focus-within:ring-violet-500/20 shadow-md dark:shadow-xl overflow-hidden transition-all">
            <textarea
              ref={textareaRef}
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Ask ${currentModel.name} anything, request analysis, or paste code...`}
              className="w-full bg-transparent px-4 pt-3.5 pb-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none resize-none leading-relaxed"
            />

            {/* Bottom Controls Bar */}
            <div className="px-3 pb-2.5 pt-1 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/40">
              <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-x-auto no-scrollbar momentum-scroll overscroll-x-contain py-0.5">
                {/* Model Selector Pill */}
                <button
                  type="button"
                  onClick={onOpenModelSelector}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <span>{currentModel.avatar}</span>
                  <span className="text-[11px]">{currentModel.shortName}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {/* Attachment */}
                <button
                  type="button"
                  onClick={handleSimulateAttachment}
                  className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Attach Document / Code"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                {/* Web Search */}
                <button
                  type="button"
                  onClick={() => setWebSearchActive(!webSearchActive)}
                  className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs ${
                    webSearchActive
                      ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Search Live Web"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Search</span>
                </button>

                {/* Code Sandbox */}
                <button
                  type="button"
                  onClick={() => setCodeContextActive(!codeContextActive)}
                  className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs ${
                    codeContextActive
                      ? 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Code Sandbox Mode"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Code</span>
                </button>

                {/* Voice */}
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isRecording
                      ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 animate-pulse border border-rose-500/30'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Voice Input"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>

              {/* Character count & Send */}
              <div className="flex items-center gap-3 shrink-0 pl-2">
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  {inputText.length} chars
                </span>

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={(!inputText.trim() && !attachedFile) || isGenerating}
                  className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-indigo-600/25 active:scale-95 transition-all"
                  title="Send Message (Enter)"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400 px-1 min-w-0">
            <span className="truncate min-w-0">Model: <strong className="text-slate-700 dark:text-slate-300">{currentModel.name}</strong> ({currentModel.speed})</span>
            <span className="hidden sm:inline shrink-0">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">Enter</kbd> to send</span>
          </div>
        </div>
      </div>
    </div>
  );
};
