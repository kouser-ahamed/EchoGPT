import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  LifeBuoy,
  Mail,
  Send,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface SocialItem {
  name: string;
  link: string;
  desc: string;
  badge: string;
}

export const SupportView: React.FC = () => {
  const { showToast } = useApp();
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      showToast('Please fill in both the subject and message.', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Support ticket dispatched to AppifyDevs engineering!', 'success');
  };

  const socials: SocialItem[] = [
    { name: 'Discord Community', link: 'https://discord.gg', desc: 'Chat live with core developers and other AI creators.', badge: 'Active' },
    { name: 'LinkedIn', link: 'https://linkedin.com/company/appifydevs', desc: 'Enterprise updates, case studies, and engineering hires.', badge: 'Official' },
    { name: 'Instagram', link: 'https://instagram.com', desc: 'Visual UI tips, feature highlights, and video shorts.', badge: 'Creative' },
    { name: 'Facebook', link: 'https://facebook.com', desc: 'Product announcements and regional community discussions.', badge: 'Community' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto w-full space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Help & Community</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Support & Community Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Need assistance with model keys, extension sidepanel setup, or MCP connectors? Our engineering team is here to help.
          </p>
        </div>

        {/* Content Grid: Left Contact Form + Right Social Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Email Support Form */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <Mail className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-base font-bold text-white">Email Us Directly</h3>
                <p className="text-xs text-slate-400">Direct escalation to AppifyDevs product engineers</p>
              </div>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Ticket Submitted Successfully!</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  We have logged your ticket. A technical representative will respond to your registered email address within 2-4 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSubject('');
                    setMessage('');
                  }}
                  className="mt-2 text-xs text-indigo-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 block">Subject / Issue Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Model routing latency or Extension question"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 block">Message Details</label>
                  <textarea
                    rows={5}
                    placeholder="Please describe your question or issue in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Ticket to Engineering</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Social & Community Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Community Channels
            </h3>

            <div className="space-y-3">
              {socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 block transition-all group shadow-md"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {s.name}
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {s.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </a>
              ))}
            </div>

            {/* Documentation Quick Links */}
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2 text-xs">
              <span className="font-bold text-white block">Official Resources:</span>
              <div className="space-y-1 text-slate-400">
                <a href="https://echogpt.live/" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-white py-1">
                  <span>Official echogpt.live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-white py-1">
                  <span>Chrome Extension Store Listing</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
