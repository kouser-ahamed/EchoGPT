import React from 'react';
import { useApp } from '../../context/AppContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { DiscordIcon } from '../common/Icons';
import { WebAppSubView } from '../../@types';
import {
  Sparkles,
  Plus,
  Image,
  Video,
  Columns2,
  Cpu,
  History,
  Store,
  Zap,
  Briefcase,
  GraduationCap,
  HelpCircle,
  Mail,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutGrid,
  Settings,
  X,
  ExternalLink,
  Crown,
  MessageSquare
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenSettings: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: WebAppSubView;
  label: string;
  icon: React.ElementType;
  badge: string | null;
  badgeColor?: string;
  desc?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  onOpenSettings,
  isMobileOpen,
  onCloseMobile
}) => {
  const {
    activeView,
    setActiveView,
    navigateTo,
    createNewConversation,
    setIsProModalOpen
  } = useApp();

  const handleNavClick = (viewId: WebAppSubView) => {
    setActiveView(viewId);
    if (isMobileOpen) onCloseMobile();
  };

  const handleNewChat = () => {
    createNewConversation();
    setActiveView('chat');
    if (isMobileOpen) onCloseMobile();
  };

  const engagementItems: NavItem[] = [
    {
      id: 'chat',
      label: 'Chat Workspace',
      icon: MessageSquare,
      badge: null,
      desc: 'DeepSeek V4 Flash'
    },
    {
      id: 'image-studio',
      label: 'Image Studio',
      icon: Image,
      badge: 'PRO',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm'
    },
    {
      id: 'video-studio',
      label: 'Video Studio',
      icon: Video,
      badge: 'PRO',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm'
    },
    {
      id: 'compare',
      label: 'Compare',
      icon: Columns2,
      badge: 'Dual AI',
      badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
    },
    {
      id: 'connectors',
      label: 'Connectors',
      icon: Cpu,
      badge: 'MCP',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
    },
    {
      id: 'history',
      label: 'History',
      icon: History,
      badge: null
    },
    {
      id: 'store',
      label: 'Store',
      icon: Store,
      badge: '30+ Models',
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
    },
    {
      id: 'tasks',
      label: 'AI Tasks',
      icon: Zap,
      badge: null
    },
    {
      id: 'job-analysis',
      label: 'AI Job Analysis',
      icon: Briefcase,
      badge: 'New',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
    },
    {
      id: 'sop-builder',
      label: 'AI SOP Builder',
      icon: GraduationCap,
      badge: 'Wizard',
      badgeColor: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    }
  ];

  const helpItems: NavItem[] = [
    {
      id: 'support',
      label: 'Support & FAQs',
      icon: HelpCircle,
      badge: null
    },
    {
      id: 'newsletter',
      label: 'AI Strategy Newsletter',
      icon: Mail,
      badge: 'Weekly',
      badgeColor: 'bg-slate-800 text-slate-300'
    },
    {
      id: 'billing',
      label: 'Subscriptions / Billing',
      icon: CreditCard,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-950 border-r border-slate-800/80 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-72 sm:w-80'
        } ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800/80 flex items-center justify-between gap-2">
          {!isCollapsed ? (
            <div
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-2.5 truncate cursor-pointer group"
              title="Go to EchoGPT Home"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 shadow-md shadow-indigo-500/20 shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                    EchoGPT
                  </span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Pro
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">Unified AI Ecosystem</p>
              </div>
            </div>
          ) : (
            <div
              onClick={() => navigateTo('landing')}
              className="mx-auto flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 shadow-md shadow-indigo-500/20 cursor-pointer hover:scale-105 transition-transform"
              title="EchoGPT Home"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Action: + New Chat */}
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className={`w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 active:scale-98 transition-all group ${
              isCollapsed ? 'px-0' : ''
            }`}
            title="Start New Chat Workspace"
          >
            <Plus className="w-4 h-4 stroke-[3] group-hover:rotate-90 transition-transform duration-200" />
            {!isCollapsed && <span>+ New Chat</span>}
          </button>
        </div>

        {/* Navigation Menus (Scrollable Body) */}
        <div className="flex-1 overflow-y-auto px-2.5 py-1 space-y-5 custom-scrollbar">
          {/* Section: ENGAGEMENT */}
          <div>
            {!isCollapsed ? (
              <div className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Engagement
              </div>
            ) : (
              <div className="w-6 h-px bg-slate-800 mx-auto my-2" />
            )}

            <div className="space-y-0.5">
              {engagementItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border border-indigo-500/40 shadow-sm font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />

                    {!isCollapsed && (
                      <>
                        <span className="truncate flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0 ${
                              item.badgeColor || 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Collapsed Active Indicator Dot */}
                    {isCollapsed && isActive && (
                      <span className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: HELP & SUPPORT */}
          <div>
            {!isCollapsed ? (
              <div className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Help & Support
              </div>
            ) : (
              <div className="w-6 h-px bg-slate-800 mx-auto my-2" />
            )}

            <div className="space-y-0.5">
              {helpItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border border-indigo-500/40 shadow-sm font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />

                    {!isCollapsed && (
                      <>
                        <span className="truncate flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0 ${
                              item.badgeColor || 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {isCollapsed && isActive && (
                      <span className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
                    )}
                  </button>
                );
              })}

              {/* Discord External Trigger */}
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-indigo-300 hover:bg-slate-900 transition-colors ${
                  isCollapsed ? 'justify-center px-0' : ''
                }`}
                title="Discord Community"
              >
                <DiscordIcon className="w-4 h-4 shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="truncate flex-1 text-left">Discord Community</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </>
                )}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Area: Upgrade to Pro Card + Bottom Icon Bar */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/70 space-y-2.5">
          {/* Upgrade to Pro Card */}
          {!isCollapsed ? (
            <div className="p-3 rounded-2xl bg-gradient-to-b from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 shadow-inner">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-sm">
                  <Crown className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Unlock Pro Features</h4>
                  <p className="text-[10px] text-indigo-300/80 font-medium">5 of 5 messages remaining</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 mb-2.5 line-clamp-2">
                Get unlimited access to DeepSeek V4 Pro, Image & Video Studios, and custom MCP connectors.
              </p>
              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30 active:scale-95 transition-all"
              >
                <Crown className="w-3 h-3 text-amber-300" />
                <span>Upgrade to Pro — $9.99</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsProModalOpen(true)}
              className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
              title="Upgrade to Pro"
            >
              <Crown className="w-4 h-4 text-amber-300" />
            </button>
          )}

          {/* Bottom Icon Bar: Home, Store Grid, Settings, Theme Toggle */}
          <div className="flex items-center justify-between pt-1 text-slate-400">
            <button
              onClick={() => navigateTo('landing')}
              className="p-2 rounded-xl hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Landing Page"
            >
              <Home className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNavClick('store')}
              className={`p-2 rounded-xl hover:text-white hover:bg-slate-800/80 transition-colors ${
                activeView === 'store' ? 'text-indigo-400 bg-slate-800/60' : ''
              }`}
              title="AI Model Store"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Workspace Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
};
