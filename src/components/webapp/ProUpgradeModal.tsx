import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Check,
  ShieldCheck,
  Crown,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BillingInterval {
  id: string;
  name: string;
  price: string;
  billed: string;
  discount: string | null;
}

export const ProUpgradeModal: React.FC<ProUpgradeModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [selectedInterval, setSelectedInterval] = useState<string>('monthly');

  if (!isOpen) return null;

  const intervals: BillingInterval[] = [
    { id: 'monthly', name: 'Monthly', price: '$9.99', billed: 'Billed monthly', discount: null },
    { id: 'quarterly', name: 'Quarterly', price: '$8.99', billed: 'Billed $26.97 every 3 months', discount: 'Save 10%' },
    { id: 'semiannual', name: 'Semi-Annual', price: '$7.99', billed: 'Billed $47.94 every 6 months', discount: 'Save 20%' },
    { id: 'annual', name: 'Annual', price: '$6.99', billed: 'Billed $83.88 yearly', discount: 'Save 30%' }
  ];

  const currentPlan = intervals.find((i) => i.id === selectedInterval) || intervals[0];

  const handleCheckout = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    showToast(`Upgraded to EchoGPT Pro (${currentPlan.name})! Welcome aboard.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-pro-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          aria-label="Close upgrade modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT PANEL: Premium Feature Checklist */}
        <div className="md:w-5/12 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/60 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Pro Membership
                </span>
                <h3 id="upgrade-pro-title" className="text-xl font-extrabold text-white mt-0.5">
                  Unlock Unlimited AI
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Supercharge your entire workspace. Get frontier access to DeepSeek V4 Pro, Nemotron 3 Ultra, Claude 3.5, and image/video studios.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Frontier AI Chat</strong>: Uncapped messages & zero rate-limit throttle</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Multi-Model Compare</strong>: Parallel side-by-side prompt benchmarking</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Image & Video Studio</strong>: 4K rendering with Flux Pro & Veo 3.1</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>MCP Connectors</strong>: Unlimited custom HTTPS servers & DB tools</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Full AI Tasks Suite</strong>: SOP builder, job analyzer & social studio</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Chrome Extension Sync</strong>: Full sidebar capabilities on every webpage</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>30-day money back guarantee • Cancel anytime</span>
          </div>
        </div>

        {/* RIGHT PANEL: Intervals & Pricing Checkout */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Choose Billing Cycle
              </h4>
              <p className="text-xs text-slate-400">Select an interval to maximize your savings</p>
            </div>

            {/* Interval Tabs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {intervals.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedInterval(item.id)}
                  className={`p-3 rounded-2xl border text-center transition-all duration-200 relative flex flex-col justify-between ${
                    selectedInterval === item.id
                      ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-md ring-1 ring-indigo-500/50'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {item.discount && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950 text-[9px] font-extrabold whitespace-nowrap">
                      {item.discount}
                    </span>
                  )}
                  <p className="text-xs font-bold">{item.name}</p>
                  <p className="text-base font-extrabold text-white mt-1">{item.price}</p>
                  <span className="text-[10px] text-slate-500">/ mo</span>
                </button>
              ))}
            </div>

            {/* Selected Plan Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-white">{currentPlan.price}</span>
                  <span className="text-xs text-slate-400 ml-1">USD / month</span>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {currentPlan.discount || 'Standard Rate'}
                </span>
              </div>
              <p className="text-xs text-slate-400">{currentPlan.billed}</p>
            </div>

            {/* Model Perks List */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Included Model Tiers:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center gap-2">
                  <span>⚡</span>
                  <span className="font-semibold text-slate-200">DeepSeek V4 Pro</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center gap-2">
                  <span>🟢</span>
                  <span className="font-semibold text-slate-200">Nemotron 3 Ultra</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center gap-2">
                  <span>🟠</span>
                  <span className="font-semibold text-slate-200">Claude 3.5 Sonnet</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center gap-2">
                  <span>🔵</span>
                  <span className="font-semibold text-slate-200">Gemini 1.5 Pro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Action CTA */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Upgrade to Pro Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-500 text-center">
              Secured with 256-bit SSL encryption. Instant activation upon confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
