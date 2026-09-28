import React, { useState } from 'react';
import { PRICING_TIERS } from '../../data/pricing';
import { Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PricingTier } from '../../@types';

export const PricingSection: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const handleSelectPlan = (tier: PricingTier) => {
    showToast(`Selected ${tier.name} Plan (${isAnnual ? 'Annual' : 'Monthly'})`, 'success');
    navigateTo('webapp');
  };

  return (
    <section id="pricing" className="py-20 bg-slate-950/80 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Clear, Transparent Pricing
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

          {/* Billing Switcher Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs sm:text-sm font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-slate-700 bg-slate-800 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle annual billing discount"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-indigo-500 shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? 'translate-x-7 bg-cyan-400' : 'translate-x-1'
                }`}
              />
            </button>

            <div className="flex items-center gap-1.5">
              <span className={`text-xs sm:text-sm font-semibold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
                Annual Billing
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier) => {
            const price = isAnnual ? tier.yearlyPrice : tier.monthlyPrice;

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  tier.isPopular
                    ? 'bg-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/15 ring-1 ring-indigo-500/50 scale-100 lg:-translate-y-2'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700 shadow-xl'
                }`}
              >
                {/* Popular Pill */}
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Top info */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {tier.badge}
                    </span>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed min-h-[40px]">
                    {tier.description}
                  </p>

                  {/* Price display */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400 font-medium">
                      / month {isAnnual && tier.monthlyPrice > 0 ? '(billed annually)' : ''}
                    </span>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => handleSelectPlan(tier)}
                    className={`mt-6 w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
                      tier.isPopular
                        ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:brightness-110 text-white shadow-indigo-600/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Feature Checklist */}
                  <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Included with {tier.name}:
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Subtle reassurance footer */}
                <div className="mt-8 pt-4 border-t border-slate-800/60 text-[11px] text-slate-400 text-center">
                  14-Day Free Trial • No Credit Card Required
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
