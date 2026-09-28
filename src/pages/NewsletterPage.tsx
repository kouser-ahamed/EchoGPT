import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  TrendingUp,
  Terminal,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FeatureHighlight {
  title: string;
  desc: string;
  badge: string;
  icon: React.ReactNode;
  iconContainerClass: string;
}

export const NewsletterPage: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please provide a valid work email address.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);

      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // graceful fallback if canvas-confetti unavailable
      }

      showToast('Subscribed successfully! Check your inbox for the latest dispatch.', 'success');
    }, 600);
  };

  const featureHighlights: FeatureHighlight[] = [
    {
      title: 'Frontier Industry Trends',
      badge: 'Macro & Benchmarks',
      desc: 'Weekly executive analysis of foundation model benchmark shifts, multimodal breakthroughs, and open weights vs closed API economics.',
      icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
      iconContainerClass: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'Power Usage Workflows',
      badge: 'Tactical Playbooks',
      desc: 'Advanced prompt blueprints, MCP tool chain setups, and browser extension automation recipes to save 10+ hours weekly.',
      icon: <Terminal className="w-5 h-5 text-indigo-400" />,
      iconContainerClass: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Early Model Alpha Access',
      badge: 'Exclusive Invites',
      desc: 'Exclusive beta invites to test preview intelligence checkpoints before general availability in the EchoGPT store.',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      iconContainerClass: 'bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 custom-scrollbar">
      {/* 1. Unified Container Width matching ImageStudio.tsx (max-w-6xl mx-auto w-full px-4 sm:px-6 py-6) */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6 sm:space-y-8">
        
        {/* 2. Elevated Hero Card ("Elevate Your AI Strategy") */}
        <div className="w-full rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-indigo-950/90 via-slate-900 to-purple-950/80 border border-slate-800/80 shadow-2xl relative overflow-hidden space-y-6">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider relative z-10">
            <Mail className="w-3.5 h-3.5" />
            <span>WEEKLY EXECUTIVE DISPATCH</span>
          </div>

          {/* Title & Subtext */}
          <div className="space-y-3 relative z-10 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Elevate Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
                AI Strategy
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Join 34,000+ software engineers, researchers, and technical founders receiving our distilled analysis on frontier models, tool protocols, and browser automation.
            </p>
          </div>

          {/* Email Subscription Form */}
          <div className="relative z-10 pt-1">
            {subscribed ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-300 text-sm max-w-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="font-medium">
                    You are subscribed! Look out for our upcoming dispatch this Thursday.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubscribed(false);
                    setEmail('');
                  }}
                  className="text-xs text-emerald-400 hover:text-emerald-200 underline font-semibold self-start sm:self-auto shrink-0"
                >
                  Change email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl w-full">
                {/* Modern Glassmorphism Input Container */}
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/80 shadow-inner backdrop-blur-sm transition-all"
                  />
                </div>

                {/* Vivid Gradient Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 shrink-0 active:scale-95 transition-all duration-200 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <span>Subscribe Free -&gt;</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Trust Indicator Below */}
          <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 relative z-10">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Zero spam. Never shared with third parties. Unsubscribe with 1 click anytime.</span>
            <Lock className="w-3 h-3 text-slate-500 ml-1 hidden sm:inline-block" />
          </div>
        </div>

        {/* 3. Feature Highlights 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {featureHighlights.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/60 border border-slate-800 space-y-3.5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-950/20 group"
            >
              {/* Accent Pill Container */}
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${feature.iconContainerClass} w-fit group-hover:scale-105 transition-transform`}>
                  {feature.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {feature.badge}
                </span>
              </div>

              {/* Title & Crisp Description */}
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AIStrategyNewsletter = NewsletterPage;

export default NewsletterPage;
