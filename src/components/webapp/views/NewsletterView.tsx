import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Mail,
  TrendingUp,
  Cpu,
  Key,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BenefitItem {
  title: string;
  desc: string;
  icon: 'TrendingUp' | 'Cpu' | 'Key';
}

export const NewsletterView: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please provide a valid email address.', 'warning');
      return;
    }

    setSubscribed(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    showToast('Subscribed to EchoGPT AI Strategy Newsletter!', 'success');
  };

  const benefits: BenefitItem[] = [
    {
      title: 'Frontier Industry Trends',
      desc: 'Weekly executive analysis of foundation model benchmark shifts, multimodal breakthroughs, and open weights vs closed API economics.',
      icon: 'TrendingUp'
    },
    {
      title: 'Power Usage Workflows',
      desc: 'Advanced prompt blueprints, MCP tool-chain setups, and browser extension automation recipes to save 10+ hours weekly.',
      icon: 'Cpu'
    },
    {
      title: 'Early Model Alpha Access',
      desc: 'Exclusive beta invites to test preview intelligence checkpoints before general availability in the EchoGPT store.',
      icon: 'Key'
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-4 sm:p-8 space-y-8">
      {/* Top Container */}
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Banner Card */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-indigo-950/90 via-slate-900 to-purple-950/70 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Weekly Executive Dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Elevate Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              AI Strategy
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            Join 34,000+ software engineers, researchers, and technical founders receiving our distilled analysis on frontier models, tool protocols, and browser automation.
          </p>

          {/* Form */}
          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex items-center gap-3 text-emerald-300 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>You are subscribed! Look out for our upcoming dispatch this Thursday.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-lg">
              <input
                type="email"
                placeholder="Enter your work email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:flex-1 bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
              />
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 shrink-0 active:scale-95 transition-all"
              >
                <span>Subscribe Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Zero spam. Never shared with third parties. Unsubscribe with 1 click anytime.</span>
          </div>
        </div>

        {/* 3 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits.map((b, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 shadow-md">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 w-fit">
                {idx === 0 ? <TrendingUp className="w-5 h-5" /> : idx === 1 ? <Cpu className="w-5 h-5" /> : <Key className="w-5 h-5" />}
              </div>
              <h3 className="text-sm font-bold text-white">{b.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
