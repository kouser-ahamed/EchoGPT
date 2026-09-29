import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AI_MODELS } from '../../data/models';
import {
  Menu,
  ChevronDown,
  Crown,
  Bell,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface WorkspaceHeaderProps {
  onOpenMobileSidebar: () => void;
  onOpenModelSelector: () => void;
  onOpenSettings: () => void;
}

interface NotificationItem {
  id: number;
  title: string;
  time: string;
  unread: boolean;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  onOpenMobileSidebar,
  onOpenModelSelector,
  onOpenSettings
}) => {
  const {
    activeView,
    setActiveView,
    activeConversation,
    selectedModelId,
    setIsUpgradeModalOpen,
    showToast
  } = useApp();

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const currentModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

  const viewTitles: Record<string, { title: string; subtitle: string }> = {
    chat: { title: 'Chat Workspace', subtitle: activeConversation?.title || 'DeepSeek V4 Flash' },
    'image-studio': { title: 'Image Studio', subtitle: 'State of the art generative image studio' },
    'video-studio': { title: 'Video Studio', subtitle: 'Ultra-fast cinematic AI video generation' },
    compare: { title: 'Compare Mode', subtitle: 'Side-by-side multi-model benchmarking' },
    connectors: { title: 'Connectors (MCP)', subtitle: 'Model Context Protocol integrations' },
    history: { title: 'Chat History', subtitle: 'Searchable conversational logs' },
    store: { title: 'EchoGPT Store', subtitle: 'Directory of 30+ leading AI foundation models' },
    tasks: { title: 'AI Tasks', subtitle: 'Curated prompts for work, ideas, and online content' },
    'job-analysis': { title: 'AI Job Analysis', subtitle: 'Job description & ATS resume analyzer' },
    'sop-builder': { title: 'AI SOP Builder', subtitle: 'Destination-aware statement of purpose generator' },
    support: { title: 'Support & Help', subtitle: 'Contact options, community & FAQs' },
    newsletter: { title: 'AI Strategy Newsletter', subtitle: 'Weekly tactical AI insights & benchmarks' },
    billing: { title: 'Billing & Plans', subtitle: 'Manage your EchoGPT Pro subscription' }
  };

  const currentInfo = viewTitles[activeView] || viewTitles.chat;

  const mockNotifications: NotificationItem[] = [
    { id: 1, title: 'DeepSeek V4 Pro unlocked', time: '10m ago', unread: true },
    { id: 2, title: 'MCP GitHub Server connected', time: '1h ago', unread: false },
    { id: 3, title: 'Welcome to EchoGPT Pro Trial', time: '1d ago', unread: false }
  ];

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between gap-3 shrink-0 z-20 relative">
      {/* Left: Mobile Drawer Trigger + Active View / Breadcrumb */}
      <div className="flex items-center gap-3 truncate">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="truncate">
          <div className="flex items-center gap-2 truncate">
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
              {currentInfo.title}
            </h1>
            {activeView === 'chat' ? (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-500/30 hidden sm:inline-block">
                DeepSeek V4 Flash
              </span>
            ) : (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hidden sm:inline-block">
                {currentInfo.subtitle}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate hidden sm:block">
            {activeView === 'chat' ? (
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Clock className="w-3 h-3" />
                <span>5 of 5 messages left this window • Resets in 4h 12m</span>
              </span>
            ) : (
              currentInfo.subtitle
            )}
          </p>
        </div>
      </div>

      {/* Right Controls: Model Switcher, Upgrade to Pro, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Model Selector Pill (Mainly for chat & compare) */}
        <button
          onClick={onOpenModelSelector}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all shadow-sm group"
          title="Switch Active AI Engine"
        >
          <span className="text-sm">{currentModel.avatar}</span>
          <span className="hidden md:inline truncate max-w-[120px]">{currentModel.name}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-transform" />
        </button>

        {/* Upgrade to Pro Button */}
        <button
          onClick={() => setIsUpgradeModalOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow-md shadow-purple-600/25 active:scale-95 transition-all"
        >
          <Crown className="w-3.5 h-3.5 text-amber-300" />
          <span>Upgrade to Pro</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors relative shadow-sm"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 text-left animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Notifications</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="space-y-2">
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{n.title}</p>
                      {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-1 shrink-0" />}
                    </div>
                    <span className="text-[10px] text-slate-500">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1.5 p-1 sm:px-2 sm:py-1 rounded-xl bg-white dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">
              AD
            </div>
            <ChevronDown className="w-3 h-3 text-slate-500 dark:text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-2.5 border-b border-slate-200 dark:border-slate-800 mb-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white">AppifyDevs Candidate</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">frontend.engineer@appifydevs.com</p>
                <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Pro Plan Active</span>
                </div>
              </div>

              <div className="space-y-0.5 text-xs">
                <button
                  onClick={() => {
                    setActiveView('billing');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Manage Subscription
                </button>
                <button
                  onClick={() => {
                    onOpenSettings();
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Workspace Settings
                </button>
                <button
                  onClick={() => {
                    showToast('Logged out of demo session', 'info');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
