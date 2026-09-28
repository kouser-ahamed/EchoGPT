import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  CreditCard,
  Crown,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';

interface BillingViewProps {
  onOpenUpgradeModal?: () => void;
}

export const BillingView: React.FC<BillingViewProps> = ({ onOpenUpgradeModal }) => {
  const { setIsProModalOpen } = useApp();

  const handleUpgrade = () => {
    if (onOpenUpgradeModal) onOpenUpgradeModal();
    else setIsProModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto w-full space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Plan & Resource Usage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Subscription & Usage Meter
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage your EchoGPT membership tier, inspect compute quotas, and view billing history.
          </p>
        </div>

        {/* Current Plan Overview Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Active Plan:</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Free Starter Tier
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Standard access to DeepSeek V4 Flash, Llama 3.3, and single model chat. Upgrade to Pro for unlimited messages, Image Studio 4K, and MCP tools.
            </p>
          </div>

          <button
            onClick={handleUpgrade}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 shrink-0 active:scale-95 transition-all"
          >
            <Crown className="w-4 h-4" />
            <span>Upgrade to Pro ($9.99/mo)</span>
          </button>
        </div>

        {/* Quota Meters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Messages Left (5-Hr Window)</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-white">5 of 5</span>
                <span className="text-xs text-emerald-400 font-medium">100% remaining</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-full" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500">Resets automatically every 5 hours</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Active MCP Connectors</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-white">0 of 1</span>
                <span className="text-xs text-slate-400">Free cap: 1</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full w-0" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500">Pro tier unlocks unlimited tool servers</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Image & Video Studio Credits</span>
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-white">10 Credits</span>
                <span className="text-xs text-cyan-400 font-medium">Active</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full w-4/5" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500">Flux Pro and Veo 3.1 fast access</p>
          </div>
        </div>

        {/* Feature Comparison Mini-Table */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Compare Tier Capabilities
          </h3>

          <div className="divide-y divide-slate-800/80 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-300">Frontier Multi-Model Access (DeepSeek Pro, Claude 3.5, Gemini 1.5)</span>
              <span className="font-semibold text-emerald-400">Included in Pro ($9.99/mo)</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-300">Parallel Dual-Model Comparison (Split View)</span>
              <span className="font-semibold text-emerald-400">Full Access in Pro</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-300">Model Context Protocol (MCP) Custom Servers</span>
              <span className="font-semibold text-emerald-400">Unlimited in Pro (1 on Free)</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-300">Chrome Extension Sidebar Context Ingestion</span>
              <span className="font-semibold text-emerald-400">Included in All Tiers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
