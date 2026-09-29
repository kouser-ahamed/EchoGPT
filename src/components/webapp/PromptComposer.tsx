import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { QUICK_ACTIONS, QuickAction } from '../../data/quickActions';
import { AI_MODELS } from '../../data/models';
import {
  Send,
  Paperclip,
  Mic,
  Sparkles,
  Globe,
  FileCode,
  X,
  FileText,
  Loader2
} from 'lucide-react';

interface PromptComposerProps {
  onOpenModelSelector?: () => void;
}

export const PromptComposer: React.FC<PromptComposerProps> = () => {
  const { sendMessage, isGenerating, selectedModelId, showToast } = useApp();
  const [inputText, setInputText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [webSearchActive, setWebSearchActive] = useState<boolean>(false);
  const [codeContextActive, setCodeContextActive] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 180) + 'px';
    }
  }, [inputText]);

  const handleSend = () => {
    if ((!inputText.trim() && !attachedFile) || isGenerating) return;

    let finalPrompt = inputText;
    if (webSearchActive) finalPrompt = `[Web Search Active] ${finalPrompt}`;
    if (codeContextActive) finalPrompt = `[Code Context Injected] ${finalPrompt}`;

    sendMessage(finalPrompt, attachedFile || undefined);
    setInputText('');
    setAttachedFile(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    setInputText(action.promptTemplate + ' ');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSimulateAttachment = () => {
    const mockFiles = [
      { name: 'architecture-spec-v2.pdf', size: '2.4 MB', type: 'document' },
      { name: 'benchmark-metrics.csv', size: '410 KB', type: 'data' },
      { name: 'ReactServerComponents.tsx', size: '14 KB', type: 'code' }
    ];
    const picked = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    setAttachedFile(picked);
    showToast(`Attached ${picked.name}`, 'info');
  };

  const handleToggleVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      showToast('Listening... Speak your prompt now', 'info');
      // Simulate speech recognition after 2 seconds
      setTimeout(() => {
        setInputText('Summarize the top three performance bottlenecks in client-side React 19 apps.');
        setIsRecording(false);
        showToast('Voice converted to text!', 'success');
      }, 2200);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="p-3 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-4xl mx-auto space-y-2.5">
        {/* Quick Action Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
            <span>Actions:</span>
          </span>
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-800 whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>{action.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Attachment preview chip if selected */}
        {attachedFile && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-xs text-indigo-700 dark:text-indigo-300 animate-in fade-in">
            <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold">{attachedFile.name}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">({attachedFile.size})</span>
            <button
              onClick={() => setAttachedFile(null)}
              className="ml-1 p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Main Composer Box */}
        <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all shadow-sm dark:shadow-lg overflow-hidden">
          {/* Text Area */}
          <textarea
            ref={textareaRef}
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${currentModel.name} anything, paste code, or request a summary...`}
            className="w-full bg-transparent px-4 pt-3.5 pb-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none resize-none leading-relaxed"
          />

          {/* Bottom Composer Controls Toolbar */}
          <div className="px-3 pb-2.5 pt-1 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/40">
            {/* Left Context Toggles */}
            <div className="flex items-center gap-1.5">
              {/* Attachment Button */}
              <button
                type="button"
                onClick={handleSimulateAttachment}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Attach Document / Code"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              {/* Web Search Context Toggle */}
              <button
                type="button"
                onClick={() => {
                  setWebSearchActive(!webSearchActive);
                  showToast(webSearchActive ? 'Web search disabled' : 'Web search enabled', 'info');
                }}
                className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs ${
                  webSearchActive
                    ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Search Live Web"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Search</span>
              </button>

              {/* Code Interpreter Toggle */}
              <button
                type="button"
                onClick={() => {
                  setCodeContextActive(!codeContextActive);
                  showToast(codeContextActive ? 'Code sandbox disabled' : 'Code sandbox enabled', 'info');
                }}
                className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs ${
                  codeContextActive
                    ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Code Sandbox Mode"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Code</span>
              </button>

              {/* Voice Input Button */}
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`p-1.5 rounded-lg transition-colors ${
                  isRecording
                    ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 animate-pulse border border-rose-200 dark:border-rose-500/30'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Voice Input (Dictation)"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Character count + Send button */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono hidden sm:inline-block">
                {inputText.length} chars
              </span>

              <button
                type="button"
                onClick={handleSend}
                disabled={(!inputText.trim() && !attachedFile) || isGenerating}
                className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-indigo-600/25 active:scale-95 transition-all flex items-center gap-1.5"
                title="Send Message (Enter)"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footnote tips */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
          <span>Engine: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{currentModel.name}</strong> • Context: {currentModel.contextWindow}</span>
          <span className="hidden sm:inline">Use <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]">Shift + Enter</kbd> for new line</span>
        </div>
      </div>
    </div>
  );
};
