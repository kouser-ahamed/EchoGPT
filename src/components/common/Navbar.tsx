import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ThemeToggle } from './ThemeToggle';
import { AppView } from '../../@types';
import {
  Sparkles,
  ArrowRight,
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
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
          : 'bg-slate-950/60 dark:bg-slate-950/70 backdrop-blur-sm border-b border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
              aria-label="EchoGPT Home"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-slate-950 animate-ping opacity-75" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                    Echo<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">GPT</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Pro
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline-block">
                  Multi-AI Workspace & Extension
                </span>
              </div>
            </button>

            {/* Primary View Switcher Pills (Desktop) */}
            <div className="hidden lg:flex items-center p-1 ml-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <button
                onClick={() => handleNavClick('landing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  currentView === 'landing'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => handleNavClick('webapp')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                  currentView === 'webapp'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                Web App
              </button>
              <button
                onClick={() => handleNavClick('extension')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                  currentView === 'extension'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <ChromeIcon className="w-3.5 h-3.5 text-cyan-400" />
                Chrome Extension
              </button>
            </div>
          </div>

          {/* Center Navigation Links (When in Landing view) */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {currentView === 'landing' ? (
              <>
                <button
                  onClick={() => handleNavClick('landing', 'features')}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => handleNavClick('landing', 'models')}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  AI Models
                </button>
                <button
                  onClick={() => handleNavClick('landing', 'compare')}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Comparison
                </button>
                <button
                  onClick={() => handleNavClick('landing', 'pricing')}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={() => handleNavClick('landing', 'faq')}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-indigo-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Ecosystem Mode Active
                </span>
              </div>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Quick Extension Demo Link */}
            <button
              onClick={() => handleNavClick('extension')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
              title="Interactive Chrome Extension Simulator"
            >
              <ChromeIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Extension</span>
            </button>

            {/* Launch Web App Button */}
            <button
              onClick={() => handleNavClick('webapp')}
              className="relative group inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 rounded-xl shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              <span>{currentView === 'webapp' ? 'Open Full Workspace' : 'Launch Web App'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-3 gap-1">
            <button
              onClick={() => handleNavClick('landing')}
              className={`py-2 text-xs font-semibold rounded-lg ${
                currentView === 'landing' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleNavClick('webapp')}
              className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 ${
                currentView === 'webapp' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              Web App
            </button>
            <button
              onClick={() => handleNavClick('extension')}
              className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 ${
                currentView === 'extension' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              <ChromeIcon className="w-3.5 h-3.5 text-cyan-400" />
              Extension
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800/60 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('landing', 'features')}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Features & Capabilities
            </button>
            <button
              onClick={() => handleNavClick('landing', 'models')}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Supported AI Models
            </button>
            <button
              onClick={() => handleNavClick('landing', 'compare')}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Dual Model Comparison
            </button>
            <button
              onClick={() => handleNavClick('landing', 'pricing')}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Pricing & Plans
            </button>
            <button
              onClick={() => handleNavClick('landing', 'faq')}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
            <span className="text-xs text-slate-400">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};
