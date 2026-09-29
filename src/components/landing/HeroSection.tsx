import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { AI_MODELS } from '../../data/models';
import {
  Sparkles,
  ArrowRight,
  Bot,
  Star,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { ChromeIcon } from '../common/Icons';

const SAMPLE_PROMPTS = [
  {
    title: 'React 19 Server Actions',
    prompt: 'Write a React 19 Server Action with optimistic UI update and error boundary fallback.',
    response: `\`\`\`tsx
'use server';
import { revalidatePath } from 'next/cache';

export async function submitEchoPrompt(prevState: any, formData: FormData) {
  const query = formData.get('query') as string;
  if (!query) return { error: 'Prompt cannot be empty' };
  
  await db.prompts.save({ query, timestamp: Date.now() });
  revalidatePath('/workspace');
  return { success: true };
}
\`\`\``
  },
  {
    title: 'Webpage Summarization',
    prompt: 'Summarize the active Chrome tab article into 3 actionable bullets with key metrics.',
    response: `• **Performance**: Multi-model routing reduced average latency by 42% (down to 180ms).
• **Cost Efficiency**: Consolidated subscriptions generated an average savings of $576/year per seat.
• **Browser Integration**: Chrome Side Panel API integration eliminated context switching across 89% of user sessions.`
  },
  {
    title: 'Deep Logic Proof',
    prompt: 'Prove step-by-step why the square root of 2 is irrational.',
    response: `Assume $\\sqrt{2} = \\frac{a}{b}$ where $\\gcd(a, b) = 1$.
1. $2 = \\frac{a^2}{b^2} \\implies a^2 = 2b^2$, so $a^2$ is even $\\implies a = 2k$.
2. Substituting gives $4k^2 = 2b^2 \\implies b^2 = 2k^2$, so $b$ is also even.
3. This contradicts $\\gcd(a, b) = 1$. Hence, $\\sqrt{2}$ is irrational. $\\blacksquare$`
  }
];

export const HeroSection: React.FC = () => {
  const { navigateTo, setSelectedModelId } = useApp();
  const [activePreviewModel, setActivePreviewModel] = useState<string>('gpt-4o');
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [displayedResponse, setDisplayedResponse] = useState<string>(SAMPLE_PROMPTS[0].response);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [tokensCount, setTokensCount] = useState<number>(Math.round(SAMPLE_PROMPTS[0].response.length / 4));

  const currentModelData = AI_MODELS.find((m) => m.id === activePreviewModel) || AI_MODELS[0];

  // Real-time token generation stream effect
  React.useEffect(() => {
    const fullText = SAMPLE_PROMPTS[activePromptIndex].response;
    let currentIdx = 0;
    const chunkSize = 14;

    const timeout = setTimeout(() => {
      setIsStreaming(true);
      setDisplayedResponse('');
      setTokensCount(0);
    }, 0);

    const interval = setInterval(() => {
      currentIdx += chunkSize;
      if (currentIdx >= fullText.length) {
        setDisplayedResponse(fullText);
        setTokensCount(Math.round(fullText.length / 4));
        setIsStreaming(false);
        clearInterval(interval);
      } else {
        setDisplayedResponse(fullText.slice(0, currentIdx));
        setTokensCount(Math.round(currentIdx / 4));
      }
    }, 25);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [activePromptIndex, activePreviewModel]);

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLE_PROMPTS[activePromptIndex].response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-cyan-500/10 dark:from-indigo-600/20 dark:via-purple-600/15 dark:to-cyan-500/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges & Announcement with Snappy Spring Reveal */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-indigo-500/30 shadow-sm shadow-slate-200/50 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              EchoGPT 2.4 Ecosystem Redesign
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
              Web + Chrome Extension
            </span>
          </div>

          {/* Main Headline with Spring Dynamics */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.08 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1]"
          >
            One Unified Workspace.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400">
              Every Frontier AI.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.16 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed"
          >
            Stop juggling $60/month across disconnected tabs. Chat with <strong>GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro</strong>, and <strong>DeepSeek</strong> in one unified web app and Chrome sidebar.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.22 }}
            className="pt-2 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => navigateTo('webapp')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:brightness-110 shadow-lg shadow-indigo-500/25 active:scale-95 transition-all duration-200"
            >
              <Bot className="w-4 h-4" />
              <span>Launch EchoGPT Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('extension')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm backdrop-blur-md active:scale-95 transition-all duration-200"
            >
              <ChromeIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Try Chrome Extension Simulator</span>
            </button>
          </motion.div>

          {/* Social Proof & Metrics */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">5.0 / 5.0 Rating</span>
              <span>on Chrome Web Store</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">45,000+</span>
              <span>Daily Active AI Queries</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">AppifyDevs</span>
              <span>Verified Engineering</span>
            </div>
          </div>
        </motion.div>

        {/* Live Interactive Product Preview Card with Perspective Entrance Physics */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-0 min-w-0"
        >
          <div className="relative w-full min-w-0 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/80 shadow-2xl backdrop-blur-xl overflow-hidden ring-1 ring-slate-200/60 dark:ring-white/10">
            {/* Window Top Bar */}
            <div className="flex items-center gap-2 justify-between px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/60">
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                  echogpt-workspace // active-session
                </span>
              </div>

              {/* Model Switcher Tabs in Mock */}
              <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto no-scrollbar momentum-scroll p-0.5 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs">
                {AI_MODELS.slice(0, 4).map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setActivePreviewModel(model.id);
                      setSelectedModelId(model.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 whitespace-nowrap ${
                      activePreviewModel === model.id
                        ? `${model.bgLight} font-semibold shadow-sm border ${model.borderColor}`
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <span className="mr-1.5">{model.avatar}</span>
                    <span>{model.shortName}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 hidden md:inline-block">
                  {currentModelData.speed}
                </span>
              </div>
            </div>

            {/* Prompt Selector Pills */}
            <div className="px-4 sm:px-6 pt-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar momentum-scroll bg-slate-50/50 dark:bg-slate-900/20">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">Sample Tasks:</span>
              {SAMPLE_PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePromptIndex(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    activePromptIndex === idx
                      ? 'bg-indigo-600/10 text-indigo-700 border border-indigo-500/30 dark:bg-indigo-600/30 dark:text-indigo-300 dark:border-indigo-500/40 font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-slate-200 dark:border-slate-800'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Simulated Chat Dialogue */}
            <div className="p-4 sm:p-6 space-y-4 max-h-[380px] overflow-y-auto overflow-x-hidden momentum-scroll">
              {/* User Message */}
              <div className="flex items-start justify-end gap-3">
                <div className="max-w-[85%] sm:max-w-lg p-3.5 rounded-2xl rounded-tr-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-medium shadow-md break-words">
                  {SAMPLE_PROMPTS[activePromptIndex].prompt}
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  U
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-sm border ${currentModelData.borderColor} shrink-0 shadow-sm`}>
                  {currentModelData.avatar}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentModelData.name}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 shrink-0">{currentModelData.provider}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                        {currentModelData.contextWindow}
                      </span>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-800 transition-colors shrink-0"
                      title="Copy response snippet"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="relative p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-mono whitespace-pre-wrap wrap-anywhere overflow-x-auto">
                    {displayedResponse}
                    {isStreaming && (
                      <span className="inline-block w-2 h-4 ml-1 bg-cyan-500 dark:bg-cyan-400 animate-pulse align-middle" />
                    )}
                    <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                      <span className="flex items-center gap-1.5 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isStreaming ? 'bg-cyan-500 animate-ping' : 'bg-emerald-500'}`} />
                        <span className="truncate">{isStreaming ? 'Real-Time Token Streaming...' : 'Generation Complete'}</span>
                      </span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-300 shrink-0">
                        {tokensCount} tokens • {currentModelData.speed.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Live Input Bar */}
            <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-3">
              <div className="flex-1 min-w-0 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <span className="truncate">Type a prompt or test multi-model split view...</span>
              </div>
              <button
                onClick={() => navigateTo('webapp')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
              >
                <span>Try Live</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
