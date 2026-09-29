import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { SettingsModal } from './components/common/SettingsModal';
import { LandingPage } from './pages/LandingPage';
import { WebAppPage } from './pages/WebAppPage';
import { ExtensionPage } from './pages/ExtensionPage';

const AppContent: React.FC = () => {
  const { currentView } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  return (
    <div className="w-full max-w-full min-h-screen overflow-x-hidden flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Top Universal Navbar (Only on Landing and Extension views) */}
      {currentView !== 'webapp' && <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />}

      {/* Main View Router */}
      <div className="flex-1 flex flex-col min-h-0">
        {currentView === 'webapp' && <WebAppPage />}
        {currentView === 'extension' && <ExtensionPage />}
        {currentView === 'landing' && <LandingPage />}
      </div>

      {/* Footer on Landing & Extension Views */}
      {currentView !== 'webapp' && <Footer />}

      {/* Global Modals & Toast Alerts */}
      <ToastContainer />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}
