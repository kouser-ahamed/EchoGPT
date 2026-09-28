import React, { useState } from 'react';
import { INITIAL_CONNECTORS } from '../../../data/connectorsData';
import { useApp } from '../../../context/AppContext';
import { MCPConnector } from '../../../@types';
import {
  Link2,
  Plus,
  Server,
  Crown,
  Trash2,
  X,
  AlertCircle,
  GitBranch,
  Database,
  Globe,
  MessageSquare
} from 'lucide-react';

interface ConnectorsViewProps {
  onOpenUpgradeModal?: () => void;
}

export const ConnectorsView: React.FC<ConnectorsViewProps> = ({ onOpenUpgradeModal }) => {
  const { showToast, setIsProModalOpen } = useApp();
  const [connectors, setConnectors] = useState<MCPConnector[]>(INITIAL_CONNECTORS);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New Connector form states
  const [name, setName] = useState<string>('');
  const [endpoint, setEndpoint] = useState<string>('');
  const [authHeader, setAuthHeader] = useState<string>('');

  const connectedCount = connectors.filter((c) => c.enabled).length;

  const handleToggleConnector = (id: string) => {
    const target = connectors.find(c => c.id === id);
    if (!target) return;

    if (!target.enabled && connectedCount >= 1) {
      showToast('Free plan limit: 1 active MCP connector. Upgrade for unlimited.', 'warning');
      if (onOpenUpgradeModal) onOpenUpgradeModal();
      else setIsProModalOpen(true);
      return;
    }

    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
    showToast(target.enabled ? 'Connector disconnected' : 'Connector connected to EchoGPT runtime', 'info');
  };

  const handleAddConnector = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !endpoint.trim()) {
      showToast('Name and HTTPS server address are required', 'warning');
      return;
    }

    if (!endpoint.startsWith('https://')) {
      showToast('MCP server address must use secure HTTPS protocol', 'error');
      return;
    }

    const newConnector: MCPConnector = {
      id: 'mcp-custom-' + Date.now(),
      name: name.trim(),
      endpoint: endpoint.trim(),
      description: 'Custom self-hosted Model Context Protocol server',
      authHeader: authHeader ? 'Bearer ' + authHeader.slice(0, 8) + '...' : 'None',
      enabled: false,
      icon: 'Server',
      category: 'Custom MCP'
    };

    setConnectors((prev) => [newConnector, ...prev]);
    setName('');
    setEndpoint('');
    setAuthHeader('');
    setIsAddModalOpen(false);
    showToast(`Added custom connector "${newConnector.name}"`, 'success');
  };

  const handleDeleteConnector = (id: string) => {
    setConnectors((prev) => prev.filter((c) => c.id !== id));
    showToast('Connector removed', 'info');
  };

  const getConnectorIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-indigo-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-amber-400" />;
      default:
        return <Server className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-3 sm:p-6 lg:p-8 space-y-8 custom-scrollbar">
      {/* Main Container Aligned with Image Studio (max-w-6xl mx-auto w-full) */}
      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Link2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>MODEL CONTEXT PROTOCOL (MCP)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
              <span className="text-[10px] text-emerald-400 font-bold">Standard v1.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Connectors & Tool Servers
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Integrate enterprise databases, GitHub repositories, and private APIs into your EchoGPT model prompts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all active:scale-95 self-start sm:self-auto shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Custom Connector</span>
            </button>
          </div>
        </div>

        {/* Status Capacity / Active Limit Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${connectedCount > 0 ? 'bg-emerald-400 animate-pulse shadow-md shadow-emerald-400/50' : 'bg-slate-600'}`} />
            <span className="text-slate-300 font-medium">
              <strong className="text-white font-bold">{connectedCount} of 1 connected</strong> — Free Tier limit
            </span>
          </div>

          <button
            onClick={() => {
              if (onOpenUpgradeModal) onOpenUpgradeModal();
              else setIsProModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 shadow-sm"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Upgrade for unlimited MCP connectors</span>
          </button>
        </div>

        {/* 2-Column MCP Server Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {connectors.map((c) => (
            <div
              key={c.id}
              className={`rounded-2xl p-5 sm:p-6 border transition-all duration-200 flex flex-col justify-between shadow-xl backdrop-blur-xl ${
                c.enabled
                  ? 'bg-slate-900/95 border-indigo-500/60 shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/90'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className={`p-3 rounded-2xl border shadow-inner ${
                      c.enabled
                        ? 'bg-indigo-500/20 border-indigo-500/40 shadow-indigo-500/20'
                        : 'bg-slate-950 border-slate-800'
                    }`}>
                      {getConnectorIcon(c.icon)}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">{c.name}</h4>
                      <span className="text-[11px] text-slate-400 font-medium">{c.category}</span>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={c.enabled}
                      onChange={() => handleToggleConnector(c.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                  </label>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[38px]">
                  {c.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between gap-2 overflow-hidden shadow-inner">
                  <div className="truncate">
                    <span className="text-slate-500 select-none">Endpoint: </span>
                    <span className="text-indigo-300 font-semibold">{c.endpoint}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 shrink-0">
                    HTTPS
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${c.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span className={c.enabled ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                    {c.enabled ? 'Connected & Routing' : 'Standby / Disconnected'}
                  </span>
                </span>

                <button
                  onClick={() => handleDeleteConnector(c.id)}
                  className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors p-1.5 rounded-lg"
                  title="Remove connector"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Connector Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Server className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Add Custom MCP Server</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddConnector} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">Connector Name</label>
                <input
                  type="text"
                  placeholder="e.g. Production Postgres MCP"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">Server HTTPS Endpoint</label>
                <input
                  type="url"
                  placeholder="https://mcp.example.com/mcp"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">Optional Authorization Header</label>
                <input
                  type="password"
                  placeholder="Bearer token or secret..."
                  value={authHeader}
                  onChange={(e) => setAuthHeader(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono shadow-inner"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 leading-relaxed text-[11px] flex items-start gap-2 shadow-inner">
                <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>EchoGPT uses JSON-RPC 2.0 over HTTPS to dynamically query available tool schemas.</span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/20 active:scale-95"
                >
                  Save Connector
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
