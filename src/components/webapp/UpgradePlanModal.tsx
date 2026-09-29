import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BillingTab = 'monthly' | 'quarterly' | 'semiannual' | 'annual';

interface PlanDetail {
  id: BillingTab;
  tabLabel: string;
  planName: string;
  price: string;
  billingPeriod: string;
  durationText: string;
  badge?: string;
}

const PLANS: PlanDetail[] = [
  {
    id: 'monthly',
    tabLabel: 'Monthly',
    planName: '✦ Monthly Plan',
    price: 'USD $9.99',
    billingPeriod: 'per month',
    durationText: 'for one month',
    badge: 'Popular'
  },
  {
    id: 'quarterly',
    tabLabel: 'Quarterly',
    planName: '✦ Quarterly Plan',
    price: 'USD $29.99',
    billingPeriod: 'per 3 months',
    durationText: 'for three months',
    badge: 'Save 10%'
  },
  {
    id: 'semiannual',
    tabLabel: 'Semi-Annual',
    planName: '✦ Semi-Annual Plan',
    price: 'USD $59.99',
    billingPeriod: 'per 6 months',
    durationText: 'for six months',
    badge: 'Save 20%'
  },
  {
    id: 'annual',
    tabLabel: 'Annual',
    planName: '✦ Annual Plan',
    price: 'USD $99.99',
    billingPeriod: 'per year',
    durationText: 'for one year',
    badge: 'Best Value'
  }
];

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
  comingSoon?: boolean;
}

const CHAT_FEATURES: FeatureItem[] = [
  { icon: '🤖', title: 'AI Chat', desc: 'Chat with AI-powered models' },
  { icon: '👤', title: 'AI Characters', desc: 'Talk to famous personas' },
  { icon: '✅', title: 'AI Tasks', desc: 'Quick tips and suggestions' },
  { icon: '💡', title: 'Brainstorming', desc: 'Generate creative ideas' }
];

const CONTENT_FEATURES: FeatureItem[] = [
  { icon: '📄', title: 'ChatDoc', desc: 'Interact with your documents' },
  { icon: '📚', title: 'Content Summary', desc: 'Get quick summaries' },
  { icon: '✏️', title: 'Content Editing', desc: 'Proofread and refine text' },
  { icon: '🌐', title: 'Language Translator', desc: 'Translate languages instantly' },
  { icon: '💻', title: 'Code Generation', desc: 'Write and debug code' },
  { icon: '🔍', title: 'Web Search', desc: 'Coming Soon! Fetch info from the web', comingSoon: true }
];

const IMAGE_FEATURES: FeatureItem[] = [
  { icon: '🖼️', title: 'Text to Image', desc: 'Coming Soon! Create images from text', comingSoon: true },
  { icon: '❓', title: 'Ask Image', desc: 'Coming Soon! Ask questions about images', comingSoon: true }
];

interface IncludedModel {
  name: string;
  icon: string;
  provider: string;
}

const INCLUDED_MODELS: IncludedModel[] = [
  { name: 'DeepSeek V4 Pro', icon: '⚡', provider: 'DeepSeek' },
  { name: 'GPT-5.4', icon: '🧠', provider: 'OpenAI' },
  { name: 'GLM-5.2', icon: '🌏', provider: 'Zhipu AI' },
  { name: 'Tencent Hy3', icon: '🐧', provider: 'Tencent' },
  { name: 'Qwen 3.8 27B', icon: '🟣', provider: 'Alibaba' },
  { name: 'Kimi K2.7 Code', icon: '🌙', provider: 'Moonshot' },
  { name: 'MiniMax M3', icon: '🧊', provider: 'MiniMax' },
  { name: 'Qwen 3.7 Plus', icon: '🟣', provider: 'Alibaba' },
  { name: 'Qwen 3.6 Plus', icon: '🟣', provider: 'Alibaba' }
];

export const UpgradePlanModal: React.FC<UpgradePlanModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [selectedTab, setSelectedTab] = useState<BillingTab>('monthly');

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPlan = PLANS.find((p) => p.id === selectedTab) || PLANS[0];

  const handleUpgradeNow = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    showToast(`Subscribed to EchoGPT ${currentPlan.planName.replace('✦ ', '')}! Enjoy unlimited chats.`, 'success');
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-plan-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-5 sm:p-7 md:p-8 space-y-6 max-h-[92vh] flex flex-col my-auto custom-scrollbar"
        >
          {/* Top Right Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="space-y-1.5 pr-8">
            <h2
              id="upgrade-plan-title"
              className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent tracking-tight"
            >
              Upgrade your plan
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
              Want to get more out of EchoGPT? Subscribe to one of our professional plans.
            </p>
          </div>

          {/* 2-Column Content Grid: Left Box & Right Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch flex-1 overflow-y-auto pr-0.5 custom-scrollbar">
            {/* Left Box: Unlock all premium features */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-950/60 dark:bg-slate-950/80 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800/80">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-bold text-slate-100 tracking-wide">
                    Unlock all premium features
                  </h3>
                </div>

                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1.5 custom-scrollbar text-xs">
                  {/* Chat Category */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400/90 font-mono">
                      Chat
                    </span>
                    <div className="space-y-2 pl-0.5">
                      {CHAT_FEATURES.map((item) => (
                        <div key={item.title} className="flex items-start gap-2.5">
                          <span className="text-base select-none shrink-0 leading-none">{item.icon}</span>
                          <div className="min-w-0">
                            <span className="font-bold text-slate-200 block text-xs">{item.title}</span>
                            <span className="text-slate-400 text-[11px] leading-tight block">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Category */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400/90 font-mono">
                      Content
                    </span>
                    <div className="space-y-2 pl-0.5">
                      {CONTENT_FEATURES.map((item) => (
                        <div key={item.title} className="flex items-start gap-2.5">
                          <span className="text-base select-none shrink-0 leading-none">{item.icon}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-slate-200 text-xs">{item.title}</span>
                              {item.comingSoon && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                            <span className="text-slate-400 text-[11px] leading-tight block">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image Category */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400/90 font-mono">
                      Image
                    </span>
                    <div className="space-y-2 pl-0.5">
                      {IMAGE_FEATURES.map((item) => (
                        <div key={item.title} className="flex items-start gap-2.5">
                          <span className="text-base select-none shrink-0 leading-none">{item.icon}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-slate-200 text-xs">{item.title}</span>
                              {item.comingSoon && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                            <span className="text-slate-400 text-[11px] leading-tight block">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
                <span>Zero rate limits • Priority server bandwidth</span>
              </div>
            </div>

            {/* Right Box: Plan Switcher & Pricing Details */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-950/60 dark:bg-slate-950/80 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                {/* Top Tabs: Monthly, Quarterly, Semi-Annual, Annual */}
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedTab(plan.id)}
                      className={`py-2 px-1 rounded-lg font-bold text-xs transition-all text-center relative ${
                        selectedTab === plan.id
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <span>{plan.tabLabel}</span>
                    </button>
                  ))}
                </div>

                {/* Model List Inside Selected Plan with Provider Icons */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">Included AI Models</span>
                    <span className="text-[11px] font-mono text-purple-400 font-bold">9 Frontier Engines</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {INCLUDED_MODELS.map((model) => (
                      <div
                        key={model.name}
                        className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-1.5 overflow-hidden shadow-sm"
                        title={`${model.name} (${model.provider})`}
                      >
                        <span className="text-xs select-none shrink-0">{model.icon}</span>
                        <div className="min-w-0 flex-1 truncate">
                          <span className="text-[10px] font-semibold text-slate-200 block truncate">
                            {model.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtext description */}
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/60">
                  Experience the benefits of Pro membership with unlimited chats {currentPlan.durationText}.
                </p>

                {/* Plan Highlight & Price Card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-900 border border-purple-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">
                      {currentPlan.planName}
                    </span>
                    {currentPlan.badge && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {currentPlan.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {currentPlan.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/{currentPlan.billingPeriod}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button: Full-width vibrant purple "Upgrade Now" */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleUpgradeNow}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:brightness-110 active:scale-95 text-white font-extrabold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Upgrade Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-slate-500 text-center">
                  Instant activation • 30-day money-back guarantee • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UpgradePlanModal;
