import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Share2, Copy, Check, Download } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { activeConversation, showToast } = useApp();
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedMd, setCopiedMd] = useState<boolean>(false);

  if (!isOpen || !activeConversation) return null;

  const shareUrl = `https://echogpt.live/share/${activeConversation.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    showToast('Shareable link copied to clipboard', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportMarkdown = () => {
    const md = `# ${activeConversation.title}\n*EchoGPT Session • Model: ${activeConversation.modelId}*\n\n` +
      activeConversation.messages.map((m) => `### ${m.role === 'user' ? 'User' : 'EchoGPT (' + (m.modelName || 'Assistant') + ')'} (${m.timestamp})\n\n${m.content}\n\n---\n`).join('\n');
    
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    showToast('Conversation copied as Markdown', 'success');
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Share Conversation</h3>
              <p className="text-xs text-slate-400">Create a public snapshot link</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Conversation Title</span>
            <p className="text-sm font-bold text-white truncate">{activeConversation.title}</p>
            <span className="text-xs text-indigo-400">{activeConversation.messages.length} messages in history</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Public Share Link</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono truncate">
                {shareUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleExportMarkdown}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-indigo-400" />}
              <span>{copiedMd ? 'Copied Markdown' : 'Copy Conversation as Markdown'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
