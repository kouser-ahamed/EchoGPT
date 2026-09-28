import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ShieldCheck, Heart, Bot, ArrowUpRight } from 'lucide-react';
import { ChromeIcon } from './Icons';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Echo<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">GPT</span>
              </span>
            </div>
            // Description

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The unified multi-AI workspace and Chrome extension sidebar by <strong>AppifyDevs</strong>. Chat with GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and DeepSeek in one frictionless workflow.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 6 AI Model Clusters Operational (99.98% Uptime)</span>
            </div>

            {/* Privacy Promise */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Enterprise Zero-Retention: Prompts never used for model training.</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Product</p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('webapp')}
                  className="hover:text-white transition-colors flex items-center gap-1 group text-left"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Web App Workspace</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('extension')}
                  className="hover:text-white transition-colors flex items-center gap-1 group text-left"
                >
                  <ChromeIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Chrome Extension Sidebar</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('landing');
                    setTimeout(() => {
                      document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Side-by-Side Model Compare
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
                  className="hover:text-white transition-colors text-left"
                >
                  AI Model Benchmarks
                </button>
              </li>
              <li>
                <a
                  href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-left"
                >
                  <span>Chrome Web Store Listing</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Supported Models */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Supported AI</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>OpenAI GPT-4o</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Claude 3.5 Sonnet</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Gemini 1.5 Pro (2M)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>DeepSeek-R1 CoT</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Meta Llama 3.3 70B</span>
              </li>
            </ul>
          </div>

          {/* Company & Devs */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">AppifyDevs</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://echogpt.live/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Official echogpt.live</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://appifydevs.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>AppifyDevs Agency</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Privacy Policy & GDPR
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Security Disclosures
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} EchoGPT by AppifyDevs. Redesigned with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Frontend Engineering Excellence.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('landing')}
              className="hover:text-white transition-colors"
            >
              Back to Top
            </button>
            <button
              onClick={() => navigateTo('webapp')}
              className="hover:text-white transition-colors text-indigo-400"
            >
              Open Web App
            </button>
            <button
              onClick={() => navigateTo('extension')}
              className="hover:text-white transition-colors text-cyan-400"
            >
              Chrome Extension Concept
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
