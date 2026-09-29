import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { AI_MODELS } from '../../data/models';
import {
  X,
  Settings,
  Moon,
  Sun,
  Key,
  Shield,
  Keyboard,
  Cpu,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Sliders
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = 'general' | 'appearance' | 'models' | 'shortcuts' | 'privacy';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { isDark, setTheme } = useTheme();
  const {
    conversations,
    setConversations,
    selectedModelId,
    setSelectedModelId,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  // Form states
  const [temperature, setTemperature] = useState<number>(0.7);
  const [systemPrompt, setSystemPrompt] = useState<string>(
    'You are EchoGPT, an elite AI assistant engineered for rapid technical execution, clear reasoning, and clean markdown presentation.'
  );
  const [openAiKey, setOpenAiKey] = useState<string>('');
  const [anthropicKey, setAnthropicKey] = useState<string>('');
  const [showKeys, setShowKeys] = useState<boolean>(false);
  const [sendOnEnter, setSendOnEnter] = useState<boolean>(true);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(conversations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `echogpt-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported chat history as JSON', 'success');
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to permanently delete all conversations? This cannot be undone.')) {
      setConversations([]);
      localStorage.removeItem('echogpt_conversations');
      showToast('All conversation records cleared', 'info');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-900 dark:text-slate-100"
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h2 id="settings-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                  Workspace Settings
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Configure AI model defaults, appearance, and privacy</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close settings modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Layout: Sidebar tabs + Content area */}
          <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
            {/* Tabs Navigation */}
            <nav className="sm:w-48 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 p-2 sm:p-3 flex sm:flex-col gap-1 bg-slate-50/70 dark:bg-slate-950/30 overflow-x-auto">
              <button
                onClick={() => setActiveTab('general')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors shrink-0 sm:shrink ${
                  activeTab === 'general'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>General</span>
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors shrink-0 sm:shrink ${
                  activeTab === 'appearance'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Appearance</span>
              </button>
              <button
                onClick={() => setActiveTab('models')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors shrink-0 sm:shrink ${
                  activeTab === 'models'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>AI Preferences</span>
              </button>
              <button
                onClick={() => setActiveTab('shortcuts')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors shrink-0 sm:shrink ${
                  activeTab === 'shortcuts'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Keyboard className="w-4 h-4" />
                <span>Shortcuts</span>
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors shrink-0 sm:shrink ${
                  activeTab === 'privacy'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Privacy & Data</span>
              </button>
            </nav>

            {/* Tab Content Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* GENERAL TAB */}
              {activeTab === 'general' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">General Interaction</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Manage input behavior and message display</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Send on Enter</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Pressing Enter sends the message; Shift+Enter creates a new line</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sendOnEnter}
                          onChange={(e) => setSendOnEnter(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Auto-Scroll Stream</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Automatically scroll to bottom as new tokens arrive</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoScroll}
                          onChange={(e) => setAutoScroll(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                      <label className="text-sm font-medium text-slate-800 dark:text-slate-200 block">Workspace Language</label>
                      <select className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="en">English (US) — Default</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ja">日本語</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* APPEARANCE TAB */}
              {activeTab === 'appearance' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Theme & Visuals</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Customize the UI theme and color palette</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                        isDark
                          ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-500/10 text-slate-900 dark:text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 text-indigo-400 shadow-xs">
                        <Moon className="w-4 h-4" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold">Dark Mode</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Default for high contrast</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                        !isDark
                          ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-500/10 text-slate-900 dark:text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200 text-amber-500 shadow-xs">
                        <Sun className="w-4 h-4" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold">Light Mode</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Clean paper white aesthetic</p>
                      </div>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Accent Aura</p>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ring-2 ring-indigo-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 cursor-pointer" />
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-110 transition-transform cursor-pointer" />
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-110 transition-transform cursor-pointer" />
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-110 transition-transform cursor-pointer" />
                    </div>
                  </div>
                </div>
              )}

              {/* AI PREFERENCES TAB */}
              {activeTab === 'models' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Default Model & Parameters</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Configure default routing and custom system prompts</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                        Default Startup Model
                      </label>
                      <select
                        value={selectedModelId}
                        onChange={(e) => setSelectedModelId(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {AI_MODELS.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name} — {model.provider} ({model.tagline})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          Creativity / Temperature: {temperature}
                        </label>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {temperature < 0.4 ? 'Strict & Precise' : temperature > 0.8 ? 'Creative & Expressive' : 'Balanced'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1.2"
                        step="0.05"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                        System Instructions Persona
                      </label>
                      <textarea
                        rows={3}
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-mono resize-none"
                      />
                    </div>

                    {/* BYOK Mock Keys */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Key className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                            Bring-Your-Own API Keys (Optional)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowKeys(!showKeys)}
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center gap-1 font-semibold"
                        >
                          {showKeys ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{showKeys ? 'Hide' : 'Reveal'}</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        <input
                          type={showKeys ? 'text' : 'password'}
                          placeholder="OpenAI API Key (sk-...)"
                          value={openAiKey}
                          onChange={(e) => setOpenAiKey(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                        />
                        <input
                          type={showKeys ? 'text' : 'password'}
                          placeholder="Anthropic API Key (sk-ant-...)"
                          value={anthropicKey}
                          onChange={(e) => setAnthropicKey(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* KEYBOARD SHORTCUTS TAB */}
              {activeTab === 'shortcuts' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Productivity Keyboard Shortcuts</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Navigate EchoGPT without touching your mouse</p>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 text-xs">
                    <div className="flex items-center justify-between p-3">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Open Chrome Extension Sidebar</span>
                      <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono shadow-xs">
                        Ctrl + Shift + E
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Start New Conversation</span>
                      <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono shadow-xs">
                        ⌘ + N / Ctrl + N
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Search Conversation Archive</span>
                      <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono shadow-xs">
                        ⌘ + K / Ctrl + K
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Toggle Split Compare View</span>
                      <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono shadow-xs">
                        ⌘ + D
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Open Workspace Settings</span>
                      <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono shadow-xs">
                        ⌘ + /
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Close Open Modal / Overlay</span>
                      <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono shadow-xs">
                        Esc
                      </kbd>
                    </div>
                  </div>
                </div>
              )}

              {/* PRIVACY & DATA TAB */}
              {activeTab === 'privacy' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Privacy Controls & Data Ownership</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">All data stored locally in your browser session by default</p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <Shield className="w-4 h-4" />
                      <span>Zero-Retention Policy</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      EchoGPT never sells your prompts or contributes conversations to third-party public LLM fine-tuning datasets. Your conversations stay strictly in your browser.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Data Actions</p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleExportJSON}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
                      >
                        <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Export All Chats (JSON)</span>
                      </button>

                      <button
                        onClick={handleClearAllHistory}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-200 dark:border-rose-500/30 transition-colors shadow-xs"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete All History</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
            <button
              onClick={() => {
                showToast('Settings saved successfully', 'success');
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
