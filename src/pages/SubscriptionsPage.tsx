import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HelpCircle,
  Mail,
  ShieldCheck,
  Lock,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PricingCardData {
  id: string;
  name: string;
  price: string;
  cycle: string;
  benefit: string;
  isRecommended?: boolean;
}

interface FaqItem {
  question: string;
  answer: string;
}

// 15 Basic Models (Exact Reference List)
const BASIC_MODELS: string[] = [
  'EchoGPT',
  'Nemotron 3 Ultra',
  'LongCat 2.0',
  'Ling 3.0 Flash Sante (free)',
  'Ling 3.0 Flash Fin (free)',
  'Dots3-Note Preview (free)',
  'LFM2.5-2.6B (free)',
  'Nemotron 3.5 Lightning (free)',
  'Laguna XS 2.1 (free)',
  'North Mini Code (free)',
  'Nemotron 3.5 Content Safety (free)',
  'Nemotron 3 Nano Omni (free)',
  'Gemma 4 26B A4B (free)',
  'Gemma 4 31B (free)',
  'Nemotron 3 Super (free)'
];

// All Advanced Foundation Models (Exact Reference List)
const ADVANCED_MODELS: string[] = [
  'DeepSeek V4 Pro',
  'GPT-5.4',
  'GPT-5.5',
  'GPT-5.6 Sol',
  'GLM-5.2',
  'Tencent Hy3',
  'Qwen 3.8 27B',
  'DeepSeek V4 Flash',
  'Kimi K2.7 Code',
  'MiniMax M3',
  'GLM-5.3 Flash',
  'Gemini 3.8 Flash',
  'Qwen 3.7 Max',
  'Qwen 3.7 Plus',
  'Qwen 3.6 Plus',
  'MiMo V2.5',
  'GPT-5.6 Luna',
  'Qwen 3.8 Max',
  'MiMo V2.5 Pro',
  'Qwen 3.8 Max 0902',
  'Tencent Hy4 Preview',
  'Qwen 3.8 Flash',
  'DeepSeek V4 Flash Vision',
  'DeepSeek V4 Flash Fast',
  'GLM-5.3',
  'Muse Spark 1.3',
  'Muse Spark 1.3 Contributor',
  'Muse Spark 1.2',
  'Kimi K3',
  'Kimi K2.7 Code HighSpeed',
  'Grok 4.5',
  'Grok 4.6',
  'Gemini 3.7 Flash',
  'GLM-5.2 Fast',
  'Inkling',
  'Inkling Small',
  'Step 3.7 Flash',
  'Step 3.5 Flash',
  'Jev Router',
  'Perceptron Mk1.5',
  'Ember-1',
  'GLM 5.3 Prime',
  'Qwen3.8 Max Prime',
  'Space Bunny Alpha',
  'Aion 3.5 Mini',
  'Aion 3.5',
  'Solar Mini 4',
  'Command A+',
  'GPT-6 Luna Pro',
  'GPT-6 Luna',
  'GPT-6 Sol Pro',
  'GPT-6 Sol',
  'Claude Opus 5.5',
  'MiMo-V2.6-Pro-UltraSpeed',
  'MiMo-V2.6-Flash',
  'MiMo-V2.6-Pro',
  'Grok 4.7',
  'Qwen3.8 Omni Flash',
  'Ternary Bonsai 2 27B',
  'GLM 5.3 FlashX',
  'Pareto',
  'DeepSeek Pro Latest',
  'DeepSeek Flash Latest',
  'Schematron V2 Turbo',
  'Schematron V2 Small',
  'GPT Astra Latest',
  'GPT Sol Latest',
  'GPT Terra Latest',
  'GPT Luna Latest',
  'Fugu Ultra v2',
  'Fugu Max',
  'Ling 3.0 Flash VL',
  'DeepSeek V4.1 Flash',
  'Mercury 2.5',
  'GPT-6 Astra',
  'GPT-6 Astra Pro',
  'Granite 4.2 8B',
  'Ling 3.0 Flash Fin',
  'GLM Flash Latest',
  'Hy-MT2-1.8B',
  'Hy-MT2-30B-A3B',
  'GLM Latest',
  'Hy-MT2-7B',
  'Seed 2.1 Turbo',
  'Qwen3.8 2.4T A95B',
  'Seed-2.0-Code',
  'DeepSeek V4 Pro 0813',
  'Nemotron 3.5 Lightning',
  'Sakana Namazu',
  'Solar Pro 4',
  'Muse Glimmer 30B',
  'DeepSeek V4 Flash 0731',
  'Ling 3.0 Flash',
  'KAT-Coder-Pro V2.5',
  'GPT-5.6 Luna Pro',
  'GPT-5.6 Terra Pro',
  'GPT-5.6 Sol Pro',
  'Grok Latest',
  'Aion-3.0-Mini',
  'Aion-3.0',
  'Laguna XS 2.1',
  'Fusion',
  'Claude Fable Latest',
  'Nemotron 3.5 Content Safety',
  'Grok Build 0.1',
  'Perceptron Mk1',
  'GPT Chat Latest',
  'Mistral Medium 3.5',
  'Claude Haiku Latest',
  'GPT Mini Latest',
  'Kimi Latest',
  'Gemini Flash Latest',
  'Claude Sonnet Latest',
  'Qwen3.5 Plus 2026-04-20',
  'Qwen3.6 Flash',
  'Qwen3.6 35B A3B',
  'Qwen3.6 27B',
  'GPT-5.5 Pro',
  'Claude Opus Latest',
  'Pareto Code Router',
  'Gemma 4 26B A4B',
  'Gemma 4 31B',
  'GLM 5V Turbo',
  'Trinity Large Thinking',
  'Grok 4.20 Multi-Agent',
  'Grok 4.20',
  'Reka Edge',
  'GPT-5.4 Nano',
  'Mistral Small 4',
  'GLM 5 Turbo',
  'Nemotron 3 Super',
  'Seed-2.0-Lite',
  'Qwen3.5-9B',
  'GPT-5.4 Pro',
  'Mercury 2',
  'Seed-2.0-Mini',
  'Qwen3.5-35B-A3B',
  'Qwen3.5-27B',
  'Qwen3.5-122B-A10B',
  'Qwen3.5-Flash',
  'Gemini 3.1 Pro Preview Custom Tools',
  'Aion-2.0',
  'Gemini 3.1 Pro Preview',
  'Qwen3.5 Plus 2026-02-15',
  'Qwen3.5 397B A17B',
  'Qwen3 Max Thinking',
  'Claude Opus 4.6',
  'Qwen3 Coder Next',
  'Free Models Router',
  'Solar Pro 3',
  'MiniMax M2-her',
  'Palmyra X5',
  'GLM 4.7 Flash',
  'GPT-5.2-Codex',
  'Seed 1.6 Flash',
  'Seed 1.6',
  'MiniMax M2.1',
  'GLM 4.7',
  'Gemini 3 Flash Preview',
  'Nemotron 3 Nano 30B A3B',
  'GPT-5.2 Chat',
  'GPT-5.2 Pro',
  'GPT-5.2',
  'Devstral 2 2512',
  'Relace Search',
  'GLM 4.6V',
  'Body Builder (beta)',
  'GPT-5.1-Codex-Max',
  'Nova 2 Lite',
  'Ministral 3 14B 2512',
  'Ministral 3 8B 2512',
  'Ministral 3 3B 2512',
  'Mistral Large 3 2512',
  'DeepSeek V3.2',
  'Claude Opus 4.5',
  'GPT-5.1',
  'GPT-5.1-Codex',
  'GPT-5.1-Codex-Mini',
  'Kimi K2 Thinking',
  'Nova Premier 1.0',
  'Sonar Pro Search',
  'Voxtral Small 24B 2507',
  'gpt-oss-safeguard-20b',
  'MiniMax M2',
  'Qwen3 VL 32B Instruct',
  'Granite 4.0 Micro',
  'Qwen3 VL 8B Thinking',
  'Qwen3 VL 8B Instruct',
  'Qwen3 VL 30B A3B Thinking',
  'Qwen3 VL 30B A3B Instruct',
  'GLM 4.6',
  'Claude Sonnet 4.5',
  'DeepSeek V3.2 Exp',
  'Cydonia 24B V4.1',
  'Relace Apply 3',
  'Qwen3 VL 235B A22B Thinking',
  'Qwen3 VL 235B A22B Instruct',
  'Qwen3 Max',
  'Qwen3 Coder Plus',
  'DeepSeek V3.1 Terminus',
  'Qwen3 Coder Flash',
  'Qwen3 Next 80B A3B Thinking',
  'Qwen3 Next 80B A3B Instruct',
  'Qwen Plus 0728',
  'Kimi K2 0905',
  'Qwen3 30B A3B Thinking 2507',
  'Hermes 4 405B',
  'DeepSeek V3.1',
  'Mistral Medium 3.1',
  'GLM 4.5V',
  'GPT-5 Nano',
  'gpt-oss-120b',
  'gpt-oss-20b',
  'Claude Opus 4.1',
  'Codestral 2508',
  'Qwen3 Coder 30B A3B Instruct',
  'Qwen3 30B A3B Instruct 2507',
  'GLM 4.5',
  'GLM 4.5 Air',
  'Qwen3 235B A22B Thinking 2507',
  'Qwen3 Coder 480B A35B',
  'UI-TARS 7B',
  'Gemini 2.5 Flash Lite',
  'Qwen3 235B A22B Instruct 2507',
  'Kimi K2 0711',
  'Uncensored',
  'Hunyuan A13B Instruct',
  'Morph V3 Large',
  'Morph V3 Fast',
  'ERNIE 4.5 VL 424B A47B',
  'Mistral Small 3.2 24B',
  'MiniMax M1',
  'Gemini 2.5 Pro',
  'o3 Pro',
  'Gemini 2.5 Pro Preview 06-05',
  'R1 0528',
  'Claude Sonnet 4',
  'Mistral Medium 3',
  'Llama Guard 4 12B',
  'Qwen3 30B A3B',
  'Qwen3 8B',
  'Qwen3 14B',
  'Qwen3 32B',
  'Qwen3 235B A22B',
  'o4 Mini High',
  'o3',
  'o4 Mini',
  'GPT-4.1',
  'GPT-4.1 Mini',
  'GPT-4.1 Nano',
  'Llama 4 Maverick',
  'Llama 4 Scout',
  'DeepSeek V3 0324',
  'o1-pro',
  'Mistral Small 3.1 24B',
  'Gemma 3 4B',
  'Gemma 3 12B',
  'Command A',
  'Reka Flash 3',
  'Gemma 3 27B',
  'Skyfall 36B V2',
  'Sonar Reasoning Pro',
  'Sonar Pro',
  'Sonar Deep Research',
  'Saba',
  'o3 Mini High',
  'Aion-RP 1.0 (8B)',
  'Qwen2.5 VL 72B Instruct',
  'Qwen-Plus',
  'o3 Mini',
  'Mistral Small 3',
  'Sonar',
  'R1 Distill Llama 70B',
  'R1',
  'MiniMax-01',
  'Phi 4',
  'Llama 3.3 Euryale 70B',
  'Command R7B (12-2024)',
  'Llama 3.3 70B Instruct',
  'Nova Lite 1.0',
  'Nova Micro 1.0',
  'Nova Pro 1.0',
  'Mistral Large 2407',
  'Qwen2.5 Coder 32B Instruct',
  'UnslopNemo 12B',
  'Magnum v4 72B',
  'Qwen2.5 7B Instruct',
  'Llama 3.2 1B Instruct',
  'Llama 3.2 3B Instruct',
  'Qwen2.5 72B Instruct',
  'Command R (08-2024)',
  'Command R+ (08-2024)',
  'Llama 3.1 Euryale 70B v2.2',
  'Hermes 3 70B Instruct',
  'Hermes 3 405B Instruct',
  'Llama 3 8B Lunaris',
  'Llama 3.1 70B Instruct',
  'Llama 3.1 8B Instruct',
  'Mistral Nemo',
  'Gemma 2 27B',
  'Mixtral 8x22B Instruct',
  'WizardLM-2 8x22B',
  'GPT-3.5 Turbo (older v0613)',
  'GPT-3.5 Turbo Instruct',
  'GPT-3.5 Turbo 16k',
  'Weaver (alpha)',
  'ReMM SLERP 13B',
  'MythoMax 13B'
];

export const SubscriptionsPage: React.FC = () => {
  const { showToast } = useApp();
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);
  const [checkoutModalPlan, setCheckoutModalPlan] = useState<PricingCardData | null>(null);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState<boolean>(false);

  const plans: PricingCardData[] = [
    {
      id: 'monthly',
      name: '✦ Monthly Plan',
      price: 'USD $9.99',
      cycle: 'USD $9.99/month',
      isRecommended: false,
      benefit:
        'Experience the benefits of Pro membership with unlimited chats for one month. 2000 Advance Credits / month. EchoGPT Membership Benefits. Multi-Code Membership Benefits.'
    },
    {
      id: 'quarterly',
      name: '✦ Quarterly Plan',
      price: 'USD $29.99',
      cycle: 'USD $29.99/3 month',
      isRecommended: true,
      benefit:
        'Unlock three months of Pro features and save with quarterly billing. 2000 Advance Credits / month. EchoGPT Membership Benefits. Multi-Code Membership Benefits.'
    },
    {
      id: 'half-yearly',
      name: '✦ Half-Yearly Plan',
      price: 'USD $59.99',
      cycle: 'USD $59.99/6 month',
      isRecommended: false,
      benefit:
        'Enjoy six months of Pro features at a discounted rate, paid biannually. 2000 Advance Credits / month. EchoGPT Membership Benefits. Multi-Code Membership Benefits.'
    },
    {
      id: 'annual',
      name: '✦ Annual Plan',
      price: 'USD $99.99',
      cycle: 'USD $99.99/12 month',
      isRecommended: false,
      benefit:
        'Access all Pro member features for a full year, with significant savings. 2000 Advance Credits / month. EchoGPT Membership Benefits. Multi-Code Membership Benefits.'
    }
  ];

  const faqs: FaqItem[] = [
    {
      question: 'What platforms is EchoGPT available on?',
      answer:
        'Currently, EchoGPT is available as a web app. We are actively working on expanding our reach to Android, iOS and developing EchoGPT as a plug-in as well.'
    },
    {
      question: 'Is my personal data safe and secure when using EchoGPT?',
      answer:
        'Yes, we prioritise your data security with robust organisational and technical measures. For more details, refer to our Privacy Policy.'
    },
    {
      question: 'Who do I contact if I have questions or need support?',
      answer:
        'For support, email us at appifydevs@gmail.com. We aim to respond within 48 hours.'
    },
    {
      question: 'How can I cancel my subscription?',
      answer:
        'If you subscribe to EchoGPT there is no refund if you cancel subscription.'
    },
    {
      question: 'How can I report a bug to the developer?',
      answer:
        'In the app, navigate to Dashboard > Support, and email us with detailed information about the bug, including your device model.'
    },
    {
      question: 'What can I use EchoGPT for?',
      answer:
        'EchoGPT helps with tasks like generating text, summarising articles, brainstorming ideas, and much more, leveraging the power of GPT-4.'
    },
    {
      question: 'What are the different subscription plans available?',
      answer:
        'Monthly: $ 1195.86/month, 24/7 support, early access to new features. Yearly: $ 5999/year, additional savings and exclusive features.'
    },
    {
      question: 'Can I use EchoGPT on multiple devices simultaneously?',
      answer: 'Yes, you can use your account across multiple devices.'
    },
    {
      question: 'What is the difference between basic and advanced models?',
      answer:
        'Basic models provide general responses, while advanced models like GPT-4 offer more accurate and detailed answers.'
    },
    {
      question: 'Can I share my account with others?',
      answer:
        'No, EchoGPT accounts are for individual use only. Account sharing or simultaneous credential usage is strictly prohibited under our Terms of Service to safeguard your personal workspace and API quota.'
    }
  ];

  const handleOpenSubscribeModal = (plan: PricingCardData) => {
    setCheckoutModalPlan(plan);
  };

  const handleConfirmCheckout = () => {
    if (!checkoutModalPlan) return;
    setIsProcessingCheckout(true);
    setTimeout(() => {
      setIsProcessingCheckout(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
      showToast(`Subscribed to ${checkoutModalPlan.name}! Welcome aboard.`, 'success');
      setCheckoutModalPlan(null);
    }, 700);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderModelItem = (modelName: string, defaultTag = 'Pro') => {
    const isFree = modelName.includes('(free)');
    const cleanName = modelName.replace('(free)', '').trim();
    const tag = isFree ? 'Free' : defaultTag;

    return (
      <div className="flex items-center justify-between gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-800/60 transition-colors">
        <div className="flex items-center gap-2 min-w-0">
          <Check className="w-3.5 h-3.5 text-violet-400 shrink-0" />
          <span className="text-xs text-slate-300 truncate">{cleanName}</span>
        </div>
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 border ${
            isFree
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-violet-500/10 text-violet-300 border-violet-500/20'
          }`}
        >
          {tag}
        </span>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#0B0F19] text-slate-100 custom-scrollbar selection:bg-violet-500/30 selection:text-white">
      {/* Layout & Container Width matching ImageStudio.tsx (max-w-7xl mx-auto px-4 sm:px-6 py-8) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-10">
        
        {/* 1. Header Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <span>Pricing</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Affordable plans for every need
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Want to get more out of EchoGPT Plus? Subscribe to one of our professional plans.
          </p>
        </div>

        {/* 2. The 4 Accurate Plan Cards (grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border bg-slate-900/60 p-6 backdrop-blur-md shadow-xl transition-all duration-300 flex flex-col justify-between relative group ${
                plan.isRecommended
                  ? 'border-violet-500/60 shadow-violet-950/20 ring-1 ring-violet-500/30'
                  : 'border-slate-800/80 hover:border-violet-500/40'
              }`}
            >
              {/* Top Card Content */}
              <div className="space-y-4">
                
                {/* 2. Card Header: Natural flex layout preventing badge/title overlap */}
                <div className="flex items-center justify-between gap-2 min-h-[32px]">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                    {plan.name}
                  </h3>

                  {/* Keep RECOMMENDED badge strictly on the Quarterly Plan */}
                  {plan.isRecommended && (
                    <span className="text-[11px] font-semibold tracking-wider px-2.5 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30 shrink-0 shadow-sm">
                      RECOMMENDED
                    </span>
                  )}
                </div>

                {/* 3. Pricing Display */}
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {plan.price}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">
                    {plan.cycle}
                  </div>
                </div>

                {/* 3. Subscribe Now Button with vivid purple gradient */}
                <button
                  type="button"
                  onClick={() => handleOpenSubscribeModal(plan)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium py-2.5 shadow-lg shadow-violet-600/20 transition-all active:scale-[0.98] cursor-pointer text-center text-sm"
                >
                  Subscribe Now
                </button>

                {/* Benefit note */}
                <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                  {plan.benefit}
                </p>

                {/* 4. Model Lists Inside Cards UI/UX */}
                <div className="space-y-4 pt-1">
                  
                  {/* A. "Access to basic models" */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                      <span>Access to basic models</span>
                    </div>

                    <div className="max-h-56 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar rounded-xl bg-slate-950/70 p-2 border border-slate-800/80">
                      {BASIC_MODELS.map((model, idx) => (
                        <React.Fragment key={idx}>
                          {renderModelItem(model, 'Free')}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* B. "Access to advanced models" */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                      <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
                      <span>Access to advanced models</span>
                    </div>

                    <div className="max-h-56 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar rounded-xl bg-slate-950/70 p-2 border border-slate-800/80">
                      {ADVANCED_MODELS.map((model, idx) => (
                        <React.Fragment key={idx}>
                          {renderModelItem(model, 'Pro')}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5. Frequently Asked Questions (Matching Dark Cards) */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
          {/* FAQ Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Cannot find the answer you are looking for? Reach out to our customer support team
              </p>
            </div>
            <a
              href="mailto:appifydevs@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support</span>
            </a>
          </div>

          {/* 10 FAQ Question and Answer Pairs */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800/60 bg-slate-900/50 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-white hover:text-violet-300 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5 min-w-0 pr-2">
                      <HelpCircle className="w-4 h-4 text-violet-400 shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <span className="ml-3 shrink-0 text-slate-400 transition-transform duration-200">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-violet-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Security & Guarantee Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted Stripe checkout · 2000 monthly advance credits · Instant activation</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit TLS bank-grade encryption</span>
          </div>
        </div>

      </div>

      {/* Simulated Checkout Modal */}
      {checkoutModalPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-5 text-slate-100">
            {/* Modal Close */}
            <button
              onClick={() => setCheckoutModalPlan(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              aria-label="Close checkout modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30">
                Checkout Confirmation
              </span>
              <h3 className="text-xl font-extrabold text-white pt-1">
                {checkoutModalPlan.name}
              </h3>
              <p className="text-xs text-slate-400">
                Unlock 70+ frontier models, 2,000 monthly Advance Credits, and unlimited basic queries.
              </p>
            </div>

            {/* Plan Summary Box */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Due Today:</span>
                <span className="text-lg font-bold text-white">{checkoutModalPlan.price}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Billing Interval:</span>
                <span className="font-medium text-slate-300">{checkoutModalPlan.cycle}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Monthly Credits:</span>
                <span className="font-semibold text-emerald-400">2,000 Advance Credits</span>
              </div>
            </div>

            {/* Confirm CTA */}
            <div className="space-y-2">
              <button
                type="button"
                disabled={isProcessingCheckout}
                onClick={handleConfirmCheckout}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
              >
                {isProcessingCheckout ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Subscription...</span>
                  </>
                ) : (
                  <span>Confirm &amp; Subscribe Now</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setCheckoutModalPlan(null)}
                className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                Cancel and return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Pricing = SubscriptionsPage;
export const Billing = SubscriptionsPage;

export default SubscriptionsPage;
