import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ThemeToggle } from './ThemeToggle';
import { AppView } from '../../@types';
import {
  Sparkles,
  ArrowUpRight,
  Menu,
  X,
  Bot
} from 'lucide-react';
import { ChromeIcon } from './Icons';

interface NavbarProps {
  onOpenSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { currentView, navigateTo } = useApp();
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

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled
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
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
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

            {/* Launch Web App Button */}
            <button
              onClick={() => handleNavClick('webapp')}
              className="relative group inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-xl shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              <span>Launch Web App</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-1">
            <button
              onClick={() => handleNavClick('webapp')}
              className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 ${currentView === 'webapp' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Web App</span>
            </button>
            <button
              onClick={() => handleNavClick('extension')}
              className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 ${currentView === 'extension' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
            >
              <ChromeIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Extension</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('landing', 'features')}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
            >
              Features & Capabilities
            </button>
            <button
              onClick={() => handleNavClick('landing', 'models')}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
            >
              Supported AI Models
            </button>
            <button
              onClick={() => handleNavClick('landing', 'compare')}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
            >
              Dual Model Comparison
            </button>
            <button
              onClick={() => handleNavClick('landing', 'pricing')}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
            >
              Pricing & Plans
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60">
            <button
              onClick={() => handleNavClick('webapp')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 flex items-center justify-center gap-2 shadow-md shadow-indigo-600/25"
            >
              <span>Launch Web App</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800/60">
            <span className="text-xs text-slate-500 dark:text-slate-400">Color Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};
