import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AppView,
  WebAppSubView,
  Conversation,
  ChatMessage,
  MessageAttachment,
  ToastMessage,
  AIModel
} from '../@types';
import { AI_MODELS, DEFAULT_MODEL_ID } from '../data/models';
import { INITIAL_CONVERSATIONS } from '../data/conversations';
import { generateRealisticAIResponse, splitIntoStreamChunks } from '../services/aiService';

export interface CompareResultModel {
  model: AIModel;
  response: string;
}

export interface CompareResultData {
  prompt: string;
  loading: boolean;
  modelA: CompareResultModel;
  modelB: CompareResultModel;
}

export interface AppContextType {
  currentView: AppView;
  navigateTo: (view: AppView, subView?: WebAppSubView | null) => void;
  activeView: WebAppSubView;
  setActiveView: (view: WebAppSubView) => void;
  isProModalOpen: boolean;
  setIsProModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  activeConversation: Conversation | undefined;
  selectedModelId: string;
  setSelectedModelId: (id: string) => void;
  compareModelId: string;
  setCompareModelId: (id: string) => void;
  appMode: 'chat' | 'compare';
  setAppMode: (mode: 'chat' | 'compare') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isGenerating: boolean;
  sendMessage: (userText: string, attachment?: MessageAttachment | null) => Promise<void>;
  createNewConversation: (initialTitle?: string, modelId?: string) => string;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  togglePinConversation: (id: string) => void;
  clearCurrentMessages: () => void;
  compareResults: CompareResultData | null;
  sendComparePrompt: (promptText: string) => Promise<void>;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error', duration?: number) => void;
  removeToast: (id: string) => void;
  pendingPrompt: string | null;
  setPendingPrompt: (prompt: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Navigation: 'landing' | 'webapp' | 'extension'
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('app')) return 'webapp';
      if (hash.includes('extension')) return 'extension';
    }
    return 'landing';
  });

  // Sub-view inside Web App suite:
  const [activeView, setActiveViewState] = useState<WebAppSubView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const match = hash.match(/\/app\/([a-z0-9-]+)/);
      if (match && match[1]) {
        return match[1] as WebAppSubView;
      }
    }
    return 'chat';
  });

  // Pro Upgrade Modal state
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const setActiveView = (view: WebAppSubView) => {
    setActiveViewState(view);
    if (currentView !== 'webapp') {
      setCurrentView('webapp');
    }
    if (typeof window !== 'undefined') {
      window.location.hash = `/app/${view}`;
    }
  };

  // Keep window hash synced
  const navigateTo = (view: AppView, subView: WebAppSubView | null = null) => {
    setCurrentView(view);
    if (subView) {
      setActiveViewState(subView);
    }
    if (typeof window !== 'undefined') {
      if (view === 'webapp') {
        window.location.hash = subView ? `/app/${subView}` : '/app';
      } else if (view === 'extension') {
        window.location.hash = '/extension';
      } else {
        window.location.hash = '/';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('app')) {
        setCurrentView('webapp');
        const match = hash.match(/\/app\/([a-z0-9-]+)/);
        if (match && match[1]) {
          setActiveViewState(match[1] as WebAppSubView);
        }
      } else if (hash.includes('extension')) {
        setCurrentView('extension');
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Conversations list
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('echogpt-conversations');
      if (saved) {
        try {
          return JSON.parse(saved) as Conversation[];
        } catch (e) {
          console.error('Failed to parse saved conversations', e);
        }
      }
    }
    return INITIAL_CONVERSATIONS;
  });

  const [activeConversationId, setActiveConversationId] = useState<string>(
    conversations[0]?.id || 'conv-1'
  );

  // Active models
  const [selectedModelId, setSelectedModelId] = useState<string>(DEFAULT_MODEL_ID);
  const [compareModelId, setCompareModelId] = useState<string>('claude-3-5-sonnet');

  // Web app mode: 'chat' | 'compare'
  const [appMode, setAppMode] = useState<'chat' | 'compare'>('chat');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Loading state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Toast feedback notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
    duration: number = 3000
  ) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync conversations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('echogpt-conversations', JSON.stringify(conversations));
    } catch (e) {
      console.error('Failed to save conversations to localStorage', e);
    }
  }, [conversations]);

  // Current active conversation object
  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  ) || conversations[0];

  // Helper: Create new conversation
  const createNewConversation = (
    initialTitle: string = 'New Conversation',
    modelId: string = selectedModelId
  ): string => {
    const newId = 'conv-' + Date.now();
    const newConv: Conversation = {
      id: newId,
      title: initialTitle,
      category: 'General',
      dateGroup: 'Today',
      timestamp: 'Just now',
      pinned: false,
      modelId: modelId,
      messages: []
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
    showToast('Created new conversation', 'success');
    return newId;
  };

  // Helper: Delete conversation
  const deleteConversation = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (activeConversationId === id && filtered.length > 0) {
        setActiveConversationId(filtered[0].id);
      }
      return filtered;
    });
    showToast('Conversation deleted', 'info');
  };

  // Helper: Rename conversation
  const renameConversation = (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle.trim() } : c))
    );
    showToast('Conversation renamed', 'success');
  };

  // Helper: Pin/Favorite toggle
  const togglePinConversation = (id: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, pinned: !c.pinned } : c
      )
    );
    showToast('Pinned status updated', 'info');
  };

  // Helper: Clear current conversation messages
  const clearCurrentMessages = () => {
    if (!activeConversation) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId ? { ...c, messages: [] } : c
      )
    );
    showToast('Cleared conversation history', 'info');
  };

  // Helper: Send a user message and simulate realistic AI streaming response
  const sendMessage = async (userText: string, attachment: MessageAttachment | null = null) => {
    if (!userText.trim() && !attachment) return;

    const userMsg: ChatMessage = {
      id: 'msg-u-' + Date.now(),
      role: 'user',
      content: userText,
      attachment: attachment,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const targetModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

    // Auto-update conversation title if it's default
    let updatedTitle = activeConversation?.title;
    if (activeConversation?.messages.length === 0 || activeConversation?.title === 'New Conversation') {
      updatedTitle = userText.slice(0, 38) + (userText.length > 38 ? '...' : '');
    }

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversationId) {
          return {
            ...c,
            title: updatedTitle || c.title,
            messages: [...c.messages, userMsg]
          };
        }
        return c;
      })
    );

    setIsGenerating(true);

    const assistantId = 'msg-a-' + Date.now();
    const targetConversation = conversations.find((c) => c.id === activeConversationId);

    // Generate dynamic context-aware response based on intent and model
    const generatedResponse = generateRealisticAIResponse({
      model: targetModel,
      userPrompt: userText,
      conversationHistory: targetConversation ? [...targetConversation.messages, userMsg] : [userMsg]
    });

    // Realistic TTFT (Time to First Token) pause
    await new Promise((resolve) => setTimeout(resolve, 380));

    // Append initial assistant message
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      modelId: targetModel.id,
      modelName: targetModel.name,
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversationId) {
          return {
            ...c,
            messages: [...c.messages, assistantMsg]
          };
        }
        return c;
      })
    );

    // Realistic streaming token simulation
    const chunks = splitIntoStreamChunks(generatedResponse);
    const chunkDelay = Math.max(12, Math.min(28, Math.floor(950 / chunks.length)));
    let currentContent = '';

    for (let i = 0; i < chunks.length; i++) {
      currentContent += chunks[i];
      const updatedText = currentContent;

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConversationId) {
            return {
              ...c,
              messages: c.messages.map((m) =>
                m.id === assistantId ? { ...m, content: updatedText } : m
              )
            };
          }
          return c;
        })
      );

      // Natural conversational cadence with slight pauses at punctuation
      const hasPauseChar = /[.!?:\n]/.test(chunks[i]);
      await new Promise((resolve) => setTimeout(resolve, hasPauseChar ? chunkDelay + 14 : chunkDelay));
    }

    setIsGenerating(false);
  };

  // Compare mode message sender
  const [compareResults, setCompareResults] = useState<CompareResultData | null>(null);

  const sendComparePrompt = async (promptText: string) => {
    if (!promptText.trim()) return;
    setIsGenerating(true);
    const modelA = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];
    const modelB = AI_MODELS.find((m) => m.id === compareModelId) || AI_MODELS[1];

    setCompareResults({
      prompt: promptText,
      loading: true,
      modelA: { model: modelA, response: '' },
      modelB: { model: modelB, response: '' },
    });

    await new Promise((resolve) => setTimeout(resolve, 550));

    const responseA = generateRealisticAIResponse({
      model: modelA,
      userPrompt: promptText,
    });

    const responseB = generateRealisticAIResponse({
      model: modelB,
      userPrompt: promptText,
    });

    setCompareResults({
      prompt: promptText,
      loading: false,
      modelA: {
        model: modelA,
        response: responseA
      },
      modelB: {
        model: modelB,
        response: responseB
      }
    });

    setIsGenerating(false);
    showToast('Dual model comparison complete!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        navigateTo,
        activeView,
        setActiveView,
        isProModalOpen,
        setIsProModalOpen,
        conversations,
        setConversations,
        activeConversationId,
        setActiveConversationId,
        activeConversation,
        selectedModelId,
        setSelectedModelId,
        compareModelId,
        setCompareModelId,
        appMode,
        setAppMode,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isGenerating,
        sendMessage,
        createNewConversation,
        deleteConversation,
        renameConversation,
        togglePinConversation,
        clearCurrentMessages,
        compareResults,
        sendComparePrompt,
        toasts,
        showToast,
        removeToast,
        pendingPrompt,
        setPendingPrompt
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
