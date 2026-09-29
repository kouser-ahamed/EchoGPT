import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/webapp/Sidebar';
import { WorkspaceHeader } from '../components/webapp/WorkspaceHeader';
import { ModelSelectorModal } from '../components/webapp/ModelSelectorModal';
import { ShareModal } from '../components/webapp/ShareModal';
import { SettingsModal } from '../components/common/SettingsModal';
import { UpgradePlanModal } from '../components/webapp/UpgradePlanModal';

// Dedicated Views
import { ChatWorkspaceView } from '../components/webapp/views/ChatWorkspaceView';
import { ImageStudioView } from '../components/webapp/views/ImageStudioView';
import { VideoStudioView } from '../components/webapp/views/VideoStudioView';
import { CompareView } from '../components/webapp/views/CompareView';
import { ConnectorsView } from '../components/webapp/views/ConnectorsView';
import { TasksView } from '../components/webapp/views/TasksView';
import { JobAnalysisView } from '../components/webapp/views/JobAnalysisView';
import { SOPBuilderView } from '../components/webapp/views/SOPBuilderView';
import { StoreView } from '../components/webapp/views/StoreView';
import { HistoryView } from '../components/webapp/views/HistoryView';
import { SupportView } from '../components/webapp/views/SupportView';
import { NewsletterView } from '../components/webapp/views/NewsletterView';
import { BillingView } from '../components/webapp/views/BillingView';

export const WebAppPage: React.FC = () => {
  const {
    activeView,
    isProModalOpen,
    setIsProModalOpen,
    isUpgradeModalOpen,
    setIsUpgradeModalOpen
  } = useApp();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [modelSelectorOpen, setModelSelectorOpen] = useState<boolean>(false);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);

  // Render the active view matching the sidebar selection
  const renderCurrentView = () => {
    switch (activeView) {
      case 'chat':
        return (
          <ChatWorkspaceView
            onOpenModelSelector={() => setModelSelectorOpen(true)}
            onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
          />
        );
      case 'image-studio':
        return <ImageStudioView />;
      case 'video-studio':
        return <VideoStudioView />;
      case 'compare':
        return <CompareView />;
      case 'connectors':
        return <ConnectorsView />;
      case 'tasks':
        return <TasksView />;
      case 'job-analysis':
        return <JobAnalysisView />;
      case 'sop-builder':
        return <SOPBuilderView />;
      case 'store':
        return <StoreView />;
      case 'history':
        return <HistoryView />;
      case 'support':
        return <SupportView />;
      case 'newsletter':
        return <NewsletterView />;
      case 'billing':
        return <BillingView />;
      default:
        return (
          <ChatWorkspaceView
            onOpenModelSelector={() => setModelSelectorOpen(true)}
            onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-white">
      
      {/* Collapsible Left Navigation Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenSettings={() => setSettingsModalOpen(true)}
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Workspace Column */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <WorkspaceHeader
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenModelSelector={() => setModelSelectorOpen(true)}
          onOpenSettings={() => setSettingsModalOpen(true)}
        />

        {/* Dynamic Content View Container */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative bg-[#F8FAFC] dark:bg-slate-950">
          {renderCurrentView()}
        </div>
      </main>

      {/* Shared Modals */}
      <ModelSelectorModal
        isOpen={modelSelectorOpen}
        onClose={() => setModelSelectorOpen(false)}
      />

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />

      <UpgradePlanModal
        isOpen={isUpgradeModalOpen || isProModalOpen}
        onClose={() => {
          setIsUpgradeModalOpen(false);
          setIsProModalOpen(false);
        }}
      />

    </div>
  );
};
