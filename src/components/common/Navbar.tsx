import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { AppView } from '../../@types';
import {
  Sparkles,
  ArrowUpRight,
  Menu,
  X,
  Bot,
  Columns2,
  CreditCard
} from 'lucide-react';
import { ChromeIcon } from './Icons';

interface NavbarProps {
  onOpenSettings?: () => void;
}

interface MobileNavLink {
  label: string;
  view: AppView;
  sectionId: string | null;
  icon: React.ElementType;
}

const MOBILE_NAV_LINKS: MobileNavLink[] = [
  { label: 'Features', view: 'landing', sectionId: 'features', icon: Sparkles },
  { label: 'AI Models', view: 'landing', sectionId: 'models', icon: Bot },
  { label: 'Comparison', view: 'landing', sectionId: 'compare', icon: Columns2 },
  { label: 'Pricing & Subscriptions', view: 'landing', sectionId: 'pricing', icon: CreditCard },
  { label: 'Chrome Extension Simulator', view: 'extension', sectionId: null, icon: ChromeIcon }
];

export const Navbar: React.FC<NavbarProps> = () => {
  const { currentView, navigateTo } = useApp();
  const { isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: AppView, sectionId: string | null = null) => {
    navigateTo(view);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Close the drawer on Escape and lock body scroll while it is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  // Auto-close the drawer whenever the route changes (adjust state during render,
  // avoiding a cascading setState inside an effect)
  const [lastView, setLastView] = useState<AppView>(currentView);
  if (currentView !== lastView) {
    setLastView(currentView);
    setMobileMenuOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full max-w-full overflow-x-hidden pt-safe transition-all duration-300 ${scrolled
        ? 'bg-white/85 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/80 shadow-sm shadow-slate-200/50 dark:shadow-black/20'
        : 'bg-white/60 dark:bg-slate-950/70 backdrop-blur-sm border-b border-slate-200/40 dark:border-slate-800/40'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo (Clean: Icon + EchoGPT + PRO badge, no subtitle) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
              aria-label="EchoGPT Home"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-white dark:border-slate-950 animate-ping opacity-75" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                  Echo<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400">GPT</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-500/30">
                  PRO
                </span>
              </div>
            </button>

            {/* Primary View Switcher Pills: Web App & Chrome Extension (No Overview) */}
            <div className="hidden lg:flex items-center p-1 ml-6 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => handleNavClick('webapp')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${currentView === 'webapp'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
                  }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Web App</span>
              </button>
              <button
                onClick={() => handleNavClick('extension')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${currentView === 'extension'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
                  }`}
              >
                <ChromeIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Chrome Extension</span>
              </button>
            </div>
          </div>

          {/* Center Navigation Links: Features, AI Models, Comparison, Pricing (No FAQ) */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {currentView === 'landing' ? (
              <>
                <button
                  onClick={() => handleNavClick('landing', 'features')}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => handleNavClick('landing', 'models')}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  AI Models
                </button>
                <button
                  onClick={() => handleNavClick('landing', 'compare')}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  Comparison
                </button>
                <button
                  onClick={() => handleNavClick('landing', 'pricing')}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-indigo-700 dark:text-indigo-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Ecosystem Mode Active
                </span>
              </div>
            )}
          </nav>

          {/* Right Action Controls: ThemeToggle + Launch Web App ↗ (Standalone Extension button removed) */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Launch Web App Button (hidden on the narrowest phones — available in the drawer) */}
            <button
              onClick={() => handleNavClick('webapp')}
              className="relative group hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-xl shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:brightness-110 active:scale-95 transition-all duration-200 whitespace-nowrap"
            >
              <span>Launch Web App</span>
              <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile / Tablet Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:outline-none shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Slide-In Drawer with Backdrop.
          Rendered through a portal: the <header> uses backdrop-blur, and a
          backdrop-filter ancestor becomes the containing block for position:fixed
          children — which would collapse this sheet to the header's height. */}
      {createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                key="navbar-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                aria-hidden="true"
              />
              <motion.div
                key="navbar-drawer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
                className="lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-white dark:bg-[#0E131F] border-l border-slate-200 dark:border-slate-800 z-50 flex flex-col justify-between shadow-2xl pt-safe"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
              >
                {/* Top Bar: Brand, Theme Indicator & Close */}
                <div className="flex items-center justify-between gap-2 p-4 border-b border-slate-200 dark:border-slate-800/80 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
                        EchoGPT <span className="text-indigo-600 dark:text-indigo-300">PRO</span>
                      </span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        {isDark ? 'Dark theme' : 'Light theme'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 shrink-0"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Middle: Scrollable list of all navigation routes */}
                <nav
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain momentum-scroll px-4 py-4"
                  aria-label="Mobile Navigation Links"
                >
                  <p className="px-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Navigate
                  </p>

                  <div className="space-y-1">
                    {MOBILE_NAV_LINKS.map((link) => {
                      const Icon = link.icon;
                      return (
                        <button
                          key={link.label}
                          onClick={() => handleNavClick(link.view, link.sectionId)}
                          className="block w-full py-3 px-4 rounded-xl text-base font-medium text-left text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 active:bg-slate-200 dark:active:bg-slate-800 transition-colors flex items-center gap-3"
                        >
                          <Icon className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" />
                          <span className="truncate">{link.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="px-1 pt-5 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Appearance
                  </p>
                  <div className="flex items-center justify-between gap-3 py-3 px-4 rounded-xl text-base font-medium text-slate-800 dark:text-slate-200">
                    <span>Color Theme</span>
                    <ThemeToggle />
                  </div>
                </nav>

                {/* Bottom: Primary dashboard CTA + secondary action + version tag */}
                <div className="shrink-0 p-4 border-t border-slate-200 dark:border-slate-800/80 pb-safe">
                  <button
                    onClick={() => handleNavClick('webapp')}
                    className="w-full py-3 mt-0 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-center shadow-lg shadow-violet-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Launch Workspace / Dashboard</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </button>

                  <button
                    onClick={() => handleNavClick('extension')}
                    className="w-full mt-2.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <ChromeIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Try Chrome Extension Simulator</span>
                  </button>

                  <p className="mt-3 text-center text-[10px] text-slate-400 dark:text-slate-500">
                    &copy; 2026 EchoGPT &middot; All rights reserved
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
};
