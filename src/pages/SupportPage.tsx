import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LifeBuoy,
  Mail,
  Send,
  ExternalLink,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface SocialItem {
  name: string;
  link: string;
  desc: string;
  badge: string;
  badgeColor: string;
}

export const SupportPage: React.FC = () => {
  const { showToast } = useApp();
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      showToast('Please fill in both the subject and message.', 'warning');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Support ticket dispatched to AppifyDevs engineering!', 'success');
    }, 600);
  };

  const socials: SocialItem[] = [
    {
      name: 'Discord Community',
      link: 'https://discord.gg',
      desc: 'Chat live with core developers and other AI creators.',
      badge: 'ACTIVE',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
    },
    {
      name: 'LinkedIn',
      link: 'https://linkedin.com/company/appifydevs',
      desc: 'Enterprise updates, case studies, and engineering hires.',
      badge: 'OFFICIAL',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/30'
    },
    {
      name: 'Instagram',
      link: 'https://instagram.com',
      desc: 'Visual UI tips, feature highlights, and video shorts.',
      badge: 'CREATIVE',
      badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/30'
    },
    {
      name: 'Facebook',
      link: 'https://facebook.com',
      desc: 'Product announcements and regional community discussions.',
      badge: 'COMMUNITY',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F8FAFC] dark:bg-slate-950 custom-scrollbar">
      {/* 1. Outer Container & Padding matching ImageStudio.tsx (max-w-6xl mx-auto w-full px-4 sm:px-6 py-6) */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        
        {/* Top Header cleanly aligned with the left edge of this container */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>HELP & COMMUNITY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Support & Community Hub
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Need assistance with model keys, extension sidepanel setup, or MCP connectors? Our engineering team is here to help.
          </p>
        </div>

        {/* 2. Full-Width 2-Column Grid spanning the full container width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
          
          {/* Left Column (Direct Support Ticket): col-span-7 */}
          <div className="lg:col-span-7 rounded-2xl bg-white/90 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 space-y-5 shadow-sm shadow-slate-200/50 dark:shadow-xl hover:border-slate-300 dark:hover:border-slate-700/80 transition-all">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Email Us Directly</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Direct escalation to AppifyDevs product engineers</p>
              </div>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Ticket Submitted Successfully!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  We have logged your ticket. A technical representative will respond to your registered email address within 2-4 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSubject('');
                    setMessage('');
                  }}
                  className="mt-2 text-xs text-violet-600 dark:text-indigo-400 hover:underline font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Subject / Issue Category
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Model routing latency or Extension question"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Message Details
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Please describe your question or issue in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-600 resize-none leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Ticket...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Ticket to Engineering</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column (Community Channels & Links): col-span-5 */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
              COMMUNITY CHANNELS
            </h3>

            {/* Clickable Status Cards with Badges */}
            <div className="space-y-3">
              {socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 block transition-all group shadow-sm shadow-slate-200/50 dark:shadow-md"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-cyan-300 transition-colors">
                      {s.name}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.badgeColor}`}
                      >
                        {s.badge}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 dark:group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </a>
              ))}
            </div>

            {/* Bottom "Official Resources" box with external links */}
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 space-y-2 text-xs shadow-sm shadow-slate-200/50">
              <span className="font-bold text-slate-900 dark:text-white block">Official Resources:</span>
              <div className="space-y-1 text-slate-600 dark:text-slate-400">
                <a
                  href="https://echogpt.live/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between hover:text-slate-900 dark:hover:text-white py-1 transition-colors group"
                >
                  <span>Official echogpt.live</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between hover:text-slate-900 dark:hover:text-white py-1 transition-colors group"
                >
                  <span>Chrome Extension Store Listing</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Support = SupportPage;

export default SupportPage;
