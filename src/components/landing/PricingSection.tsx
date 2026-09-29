import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, ChevronDown, ChevronUp, Zap, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface LandingPricingPlan {
  id: string;
  name: string;
  price: string;
  amount: string;
  period: string;
  badge?: string;
  isRecommended?: boolean;
  description: string;
  features: string[];
}

const LANDING_PLANS: LandingPricingPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: '$9.99',
    amount: '9.99',
    period: '/ month',
    description: 'Experience full Pro benefits with unlimited chats for one month.',
    features: [
      '2,000 Advance Credits / month',
      'Unlimited Basic Model chats',
      'Side-by-Side Dual AI Compare',
      'Chrome Extension Sidebar',
      'Full MCP Tool Integration',
      'Zero-Retention Privacy'
    ]
  },
  {
    id: 'quarterly',
    name: 'Quarterly Plan',
    price: '$29.99',
    amount: '29.99',
    period: '/ 3 months',
    badge: 'Recommended',
    isRecommended: true,
    description: 'Unlock 3 months of Pro features and save with quarterly billing.',
    features: [
      '2,000 Advance Credits / month',
      'Unlimited Basic Model chats',
      'Side-by-Side Dual AI Compare',
      'Chrome Extension Sidebar',
      'Full MCP Tool Integration',
      'Priority routing & 99.9% uptime'
    ]
  },
  {
    id: 'half-yearly',
    name: 'Half-Yearly Plan',
    price: '$59.99',
    amount: '59.99',
    period: '/ 6 months',
    description: 'Enjoy six months of Pro features at a discounted biannual rate.',
    features: [
      '2,000 Advance Credits / month',
      'Unlimited Basic Model chats',
      'Side-by-Side Dual AI Compare',
      'Chrome Extension Sidebar',
      'Full MCP Tool Integration',
      'Priority customer engineering'
    ]
  },
  {
    id: 'annual',
    name: 'Annual Plan',
    price: '$99.99',
    amount: '99.99',
    period: '/ 12 months',
    badge: 'Best Value',
    description: 'Access all Pro features for a full year with significant savings (~17% off).',
    features: [
      '2,000 Advance Credits / month',
      'Unlimited Basic Model chats',
      'Side-by-Side Dual AI Compare',
      'Chrome Extension Sidebar',
      'Full MCP Tool Integration',
      'Early access to new frontier models'
    ]
  }
];

const BASIC_MODELS: string[] = [
  'EchoGPT',
  'Nemotron 3 Ultra',
  'LongCat 2.0',
  'Ling 3.0 Flash Sante',
  'Ling 3.0 Flash Fin',
  'Dots3-Note Preview',
  'LFM2.5-2.6B',
  'Nemotron 3.5 Lightning',
  'Laguna XS 2.1',
  'North Mini Code',
  'Nemotron 3.5 Content Safety',
  'Nemotron 3 Nano Omni',
  'Gemma 4 26B A4B',
  'Gemma 4 31B',
  'Nemotron 3 Super'
];

const ADVANCED_MODELS: string[] = [
  'DeepSeek V4 Pro',
  'GPT-5.6 Sol',
  'Claude Opus 5.5',
  'GPT-5.4',
  'GLM-5.2',
  'Tencent Hy3',
  'Qwen 3.8 27B',
  'DeepSeek V4 Flash',
  'Kimi K2.7 Code',
  'MiniMax M3',
  'GLM-5.3 Flash',
  'Gemini 3.8 Flash',
  'Qwen 3.7 Max',
  'Grok 4.5',
  'Grok 4.6',
  'Claude Sonnet 4.5',
  'DeepSeek-R1 CoT',
  'o3 Pro',
  'Gemini 2.5 Pro',
  'Command A+'
];

export const PricingSection: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [showBasicModels, setShowBasicModels] = useState<boolean>(false);
  const [showAdvancedModels, setShowAdvancedModels] = useState<boolean>(false);

  const handleSelectPlan = (plan: LandingPricingPlan) => {
    showToast(`Selected ${plan.name} (${plan.price}). Opening checkout...`, 'success');
    navigateTo('webapp', 'billing');
  };

  return (
    <section id="pricing" className="py-20 bg-slate-950/80 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Flexible Subscription Plans
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Predictable Plans for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Every Workflow
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            One subscription for all leading AI models. Cancel anytime with a 14-day money-back guarantee.
          </p>
        </div>

        {/* 4-Card Compact Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-14">
          {LANDING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                plan.isRecommended
                  ? 'bg-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/15 ring-1 ring-indigo-500/50 scale-100 lg:-translate-y-2'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700 shadow-xl'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md ${
                    plan.isRecommended
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-indigo-500/30'
                      : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                </div>

                <p className="mt-2 text-xs text-slate-400 leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {plan.period}
                  </span>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md ${
                    plan.isRecommended
                      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:brightness-110 text-white shadow-indigo-600/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>Select Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Features List */}
                <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Included with plan:
                  </p>
                  <ul className="space-y-2 text-xs">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="mt-6 pt-3 border-t border-slate-800/60 text-[10px] text-slate-500 text-center">
                14-Day Money-Back Guarantee
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Model Lists */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Full Model Access Breakdown</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              All plans include unlimited basic foundation models + 2,000 monthly advance credits for frontier engines.
            </p>
          </div>

          {/* Accordion 1: Basic Models */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            <button
              onClick={() => setShowBasicModels(!showBasicModels)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>15 Basic Foundation Models</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Unlimited Free
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Zero token caps. Included with every plan and starter tier.
                  </p>
                </div>
              </div>

              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
                {showBasicModels ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showBasicModels && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 animate-in fade-in duration-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-2">
                  {BASIC_MODELS.map((model, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{model}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: Advanced Models */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            <button
              onClick={() => setShowAdvancedModels(!showAdvancedModels)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>100+ Advanced Frontier Models</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      2,000 Credits / mo
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Flagship models: DeepSeek V4 Pro, GPT-5.6 Sol, Claude Opus 5.5, Gemini 3.8 Flash, Grok 4.5.
                  </p>
                </div>
              </div>

              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
                {showAdvancedModels ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showAdvancedModels && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 animate-in fade-in duration-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2">
                  {ADVANCED_MODELS.map((model, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{model}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-slate-400 italic text-center">
                  + Over 80 additional specialized coding, medical, vision, and reasoning models available in Store.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
