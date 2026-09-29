import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ShieldCheck, Heart, Bot, ArrowUpRight } from 'lucide-react';
import { ChromeIcon, GithubIcon, DiscordIcon, TwitterIcon } from './Icons';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="w-full bg-slate-100/70 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Echo<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">GPT</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 dark:bg-gradient-to-r dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-500/30">
                PRO
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              The unified multi-AI workspace and Chrome extension sidebar by <strong>AppifyDevs</strong>. Chat with GPT-4o, Claude 3.5 Sonnet, DeepSeek V4, and Gemini in one frictionless workflow.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/60 border border-emerald-500/20 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All AI Model Clusters Operational (99.98% Uptime)</span>
            </div>

            {/* Privacy Promise */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
              <span>Enterprise Zero-Retention: Prompts never used for model training.</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">Product</p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('webapp')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 group text-left"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Launch Workspace</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('extension')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 group text-left"
                >
                  <ChromeIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Chrome Extension Simulator</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('landing');
                    setTimeout(() => {
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                >
                  Features & Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('landing');
                    setTimeout(() => {
                      document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                >
                  AI Models Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('landing');
                    setTimeout(() => {
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                >
                  Pricing & Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">Community</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://discord.gg/echogpt"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  <DiscordIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span>Discord Community</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/appifydevs/echogpt"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/echogpt_ai"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  <TwitterIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Twitter / X (@echogpt_ai)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  <ChromeIcon className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span>Chrome Web Store</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* AppifyDevs & Legal */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">AppifyDevs</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://echogpt.live/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Official echogpt.live</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://appifydevs.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>AppifyDevs Agency</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                  Privacy Policy & GDPR
                </span>
              </li>
              <li>
                <span className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                  Security Disclosures
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} EchoGPT by AppifyDevs. All rights reserved. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Frontend Engineering Excellence.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Back to Top
            </button>
            <button
              onClick={() => navigateTo('webapp')}
              className="hover:text-indigo-600 dark:hover:text-white transition-colors text-indigo-600 dark:text-indigo-400 font-medium"
            >
              Open Web App
            </button>
            <button
              onClick={() => navigateTo('extension')}
              className="hover:text-cyan-600 dark:hover:text-white transition-colors text-cyan-600 dark:text-cyan-400 font-medium"
            >
              Chrome Extension Concept
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
