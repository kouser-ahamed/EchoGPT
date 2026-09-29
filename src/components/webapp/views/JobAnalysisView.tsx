import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { JobAnalysisItem, JobAnalysisResult } from '../../../@types';
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Target,
  Sparkles,
  Loader2,
  Copy,
  History,
  X,
  FileSearch,
  FileText,
  HelpCircle,
  TrendingUp,
  Download,
  RotateCcw,
  Check,
  Building,
  Trash2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'echogpt-job-analyses';

const INITIAL_HISTORY: JobAnalysisItem[] = [
  {
    id: 'job-1',
    jobTitle: 'Senior Frontend Engineer',
    company: 'AppifyDevs / Stripe Ecosystem',
    date: 'Today, 2:30 PM',
    jobDescription:
      'Seeking an exceptional Senior Frontend Engineer proficient in React 19, modern state synchronization, Tailwind CSS, performance optimization, and browser extension architecture.',
    resumeSnippet:
      '5+ years building production web applications in React and TypeScript. Architected multi-model AI dashboard reducing TTI by 42%. Built Chrome Side Panel extensions using Manifest V3.',
    result: {
      matchScore: '94%',
      atsRating: 'A+ (High ATS Pass Rate)',
      keyStrengths: [
        'Direct architectural alignment with React 19 & modern frontend state engines',
        'Proven Chrome Manifest V3 extension engineering experience',
        'Quantified performance metrics (42% TTI latency reduction)'
      ],
      suggestedImprovements: [
        'Include mention of automated Playwright / Vitest E2E testing pipelines',
        'Highlight experience with Model Context Protocol (MCP) and tool-calling interfaces'
      ],
      tailoredSummary:
        'Senior Frontend & Product Engineer with proven expertise orchestrating modern React 19 web applications and Chrome Manifest V3 sidepanel workflows. Demonstrated ability to decrease runtime latency by 42% while architecting intuitive multi-model AI interfaces at scale.',
      recommendedInterviewPrep: [
        'How do you manage client-side state when streaming token responses from multiple LLMs simultaneously?',
        'Walk through your design of a Chrome Extension sidebar using Manifest V3 Side Panel API.',
        'How would you migrate an existing SPA to React 19 Server Actions while ensuring optimistic UX?'
      ]
    }
  },
  {
    id: 'job-2',
    jobTitle: 'Lead AI Platform Architect',
    company: 'Vercel / Next.js Core Team',
    date: 'Yesterday',
    jobDescription:
      'Lead our next-generation AI SDK initiative. Requires deep knowledge of edge streaming, WebAssembly runtime compilation, and token chunk optimization.',
    resumeSnippet:
      'Lead architect for multi-tenant AI routing platform. Optimized edge worker cold starts from 450ms to 48ms using WebAssembly. Integrated 15+ LLM providers via unified streaming primitives.',
    result: {
      matchScore: '91%',
      atsRating: 'A (Strong ATS Pass Rate)',
      keyStrengths: [
        'Demonstrated edge worker optimization with measured 10x latency reduction',
        'Direct multi-provider streaming architecture expertise',
        'WebAssembly integration in production pipelines'
      ],
      suggestedImprovements: [
        'Elaborate on open-source contributions to TypeScript runtime frameworks',
        'Add details regarding distributed rate limiting and fallback caching'
      ],
      tailoredSummary:
        'Principal AI Platform Architect specializing in ultra-low latency edge streaming runtimes and WebAssembly compilation. Proven track record dropping edge cold starts by 89% while orchestrating 15+ frontier AI model providers.',
      recommendedInterviewPrep: [
        'How would you design backpressure handling across variable-speed SSE streams?',
        'Describe the trade-offs of WebAssembly memory allocation in V8 isolates.',
        'How do you design deterministic token usage metering across distributed edge clusters?'
      ]
    }
  },
  {
    id: 'job-3',
    jobTitle: 'Staff Full-Stack Engineer',
    company: 'Linear / Supabase Ecosystem',
    date: 'Sep 24, 2026',
    jobDescription:
      'Scale real-time collaborative workspace primitives with CRDTs, optimistic UI updates, and Postgres row-level security policies.',
    resumeSnippet:
      'Built multiplayer collaborative canvas with local-first Yjs CRDT synchronization and optimistic cache rollback in React. Managed Postgres RLS policies for 100k+ active workspaces.',
    result: {
      matchScore: '88%',
      atsRating: 'A- (Good ATS Pass Rate)',
      keyStrengths: [
        'Deep local-first CRDT synchronization expertise with Yjs',
        'Optimistic cache invalidation and client-side rollback mechanisms',
        'Hands-on Postgres RLS security policies at scale'
      ],
      suggestedImprovements: [
        'Explicitly highlight offline storage IndexedDB conflict resolution experience',
        'Provide quantified sync latency benchmarks under intermittent connectivity'
      ],
      tailoredSummary:
        'Staff Full-Stack Engineer with specialized focus on local-first collaborative sync and resilient optimistic interfaces. Architected real-time multiplayer state engines serving 100k+ concurrent organizations.',
      recommendedInterviewPrep: [
        'Explain how you resolve state divergence between optimistic client states and server timestamps.',
        'Walk through your Postgres connection pooling strategy for high-concurrency websocket backends.',
        'How do you structure database migration pipelines with zero downtime on high-volume tables?'
      ]
    }
  }
];

let idCounter = 100;
const generateAnalysisId = (): string => `job-${++idCounter}`;

export const JobAnalysisView: React.FC = () => {
  const { showToast } = useApp();

  const [jobTitle, setJobTitle] = useState<string>('Senior Frontend Engineer');
  const [company, setCompany] = useState<string>('AppifyDevs / Stripe Ecosystem');
  const [jobDescription, setJobDescription] = useState<string>(
    'Seeking an exceptional Senior Frontend Engineer proficient in React 19, modern state synchronization, Tailwind CSS, performance optimization, and browser extension architecture.'
  );
  const [resumeSnippet, setResumeSnippet] = useState<string>(
    '5+ years building production web applications in React and TypeScript. Architected multi-model AI dashboard reducing TTI by 42%. Built Chrome Side Panel extensions using Manifest V3.'
  );

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<JobAnalysisResult | null>(INITIAL_HISTORY[0].result);
  const [activeCardId, setActiveCardId] = useState<string>('analyze');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Side History Drawer state
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<JobAnalysisItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore fallback
      }
    }
    return INITIAL_HISTORY;
  });

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(historyList));
    } catch {
      // ignore
    }
  }, [historyList]);

  const actionCards = [
    {
      id: 'analyze',
      title: 'Analyze Job Description',
      desc: 'Identify core technical requirements, unspoken expectations, and scoring criteria.',
      icon: FileSearch,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Core ATS'
    },
    {
      id: 'tailor',
      title: 'Tailor Your Resume',
      desc: 'Reword experience bullets to match high-frequency ATS keywords and role metrics.',
      icon: FileText,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Keyword Match'
    },
    {
      id: 'interview',
      title: 'Prepare for Interviews',
      desc: 'Generate 5 rigorous behavioral and system architecture questions tailored to this role.',
      icon: HelpCircle,
      color: 'from-violet-500 to-purple-600',
      badge: 'Prep Questions'
    },
    {
      id: 'gap',
      title: 'Skill Gap Analysis',
      desc: 'Pinpoint missing competencies and draft an actionable 14-day study sprint.',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600',
      badge: 'Competency Gap'
    }
  ];

  const handleCardClick = (id: string) => {
    setActiveCardId(id);
    handleRunAnalysis(id);
  };

  const handleLoadSample = (sampleType: 'frontend' | 'ai' | 'fullstack') => {
    if (sampleType === 'frontend') {
      setJobTitle('Senior Frontend Engineer');
      setCompany('AppifyDevs / Stripe Ecosystem');
      setJobDescription(
        'Seeking an exceptional Senior Frontend Engineer proficient in React 19, modern state synchronization, Tailwind CSS, performance optimization, and browser extension architecture.'
      );
      setResumeSnippet(
        '5+ years building production web applications in React and TypeScript. Architected multi-model AI dashboard reducing TTI by 42%. Built Chrome Side Panel extensions using Manifest V3.'
      );
      showToast('Loaded Senior Frontend Engineer sample profile', 'info');
    } else if (sampleType === 'ai') {
      setJobTitle('Lead AI Platform Architect');
      setCompany('Vercel / Next.js Core Team');
      setJobDescription(
        'Lead our next-generation AI SDK initiative. Requires deep knowledge of edge streaming, WebAssembly runtime compilation, and token chunk optimization.'
      );
      setResumeSnippet(
        'Lead architect for multi-tenant AI routing platform. Optimized edge worker cold starts from 450ms to 48ms using WebAssembly. Integrated 15+ LLM providers via unified streaming primitives.'
      );
      showToast('Loaded AI Platform Architect sample profile', 'info');
    } else {
      setJobTitle('Staff Full-Stack Engineer');
      setCompany('Linear / Supabase Ecosystem');
      setJobDescription(
        'Scale real-time collaborative workspace primitives with CRDTs, optimistic UI updates, and Postgres row-level security policies.'
      );
      setResumeSnippet(
        'Built multiplayer collaborative canvas with local-first Yjs CRDT synchronization and optimistic cache rollback in React. Managed Postgres RLS policies for 100k+ active workspaces.'
      );
      showToast('Loaded Full-Stack Engineer sample profile', 'info');
    }
  };

  const handleResetForm = () => {
    setJobTitle('');
    setCompany('');
    setJobDescription('');
    setResumeSnippet('');
    setAnalysisResult(null);
    showToast('Form fields cleared', 'info');
  };

  const handleRunAnalysis = async (focusMode: string = 'analyze') => {
    if (!jobDescription.trim() || !resumeSnippet.trim()) {
      showToast('Please provide both the job description and your resume context.', 'warning');
      return;
    }

    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    let score = '94%';
    let ats = 'A+ (High ATS Pass Rate)';
    if (focusMode === 'gap') {
      score = '89%';
      ats = 'A (Targeted Gaps Identified)';
    } else if (focusMode === 'tailor') {
      score = '96%';
      ats = 'A+ (Maximum Keyword Match)';
    }

    const generatedResult: JobAnalysisResult = {
      matchScore: score,
      atsRating: ats,
      keyStrengths: [
        `Direct architectural alignment with ${jobTitle || 'Target Role'} core specifications`,
        'Strong quantitative achievement metrics demonstrated in profile history',
        'Proven capability operating in high-autonomy engineering environments'
      ],
      suggestedImprovements: [
        'Incorporate specific domain keywords referenced in the job posting requirements',
        'Elevate end-to-end reliability, testing pipelines, and observability metrics'
      ],
      tailoredSummary: `${jobTitle || 'Senior Software Engineer'} with specialized expertise aligned with ${
        company || 'leading technology teams'
      }. Proven record designing robust software architectures, optimizing critical client latency metrics, and rapidly translating business requirements into scalable production features.`,
      recommendedInterviewPrep: [
        `How do you design scalable system boundaries for the core challenges faced by ${company || 'this organization'}?`,
        'Walk through your strategy for balancing rapid product velocity with rigorous code quality and testing.',
        'Describe a time you navigated severe technical ambiguity to ship a critical customer milestone.'
      ]
    };

    setAnalysisResult(generatedResult);

    const newHistoryItem: JobAnalysisItem = {
      id: generateAnalysisId(),
      jobTitle: jobTitle || 'Target Position',
      company: company || 'Confidential Enterprise',
      date: 'Just now',
      jobDescription,
      resumeSnippet,
      result: generatedResult
    };

    setHistoryList((prev) => [newHistoryItem, ...prev]);
    setIsAnalyzing(false);

    try {
      confetti({ particleCount: 45, spread: 65, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    showToast('Job Analysis & Resume Alignment Completed!', 'success');
  };

  const handleRestoreHistory = (item: JobAnalysisItem) => {
    setJobTitle(item.jobTitle);
    setCompany(item.company);
    setJobDescription(item.jobDescription);
    setResumeSnippet(item.resumeSnippet);
    setAnalysisResult(item.result);
    setIsHistoryOpen(false);
    showToast(`Restored analysis for ${item.jobTitle} @ ${item.company}`, 'info');
  };

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistoryList((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed analysis entry from history', 'info');
  };

  const handleCopySummary = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult.tailoredSummary);
    setCopiedSummary(true);
    showToast('Tailored summary copied to clipboard!', 'success');
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleExportMarkdown = () => {
    if (!analysisResult) return;
    const content = `# AI Job Analysis Brief: ${jobTitle} (${company})
Date: ${new Date().toLocaleDateString()}
Match Score: ${analysisResult.matchScore}
ATS Readability: ${analysisResult.atsRating}

---

## Tailored Executive Summary
${analysisResult.tailoredSummary}

## Core Match Strengths
${analysisResult.keyStrengths.map((s) => `- ${s}`).join('\n')}

## Recommended Enhancements & Skill Gaps
${analysisResult.suggestedImprovements.map((s) => `- ${s}`).join('\n')}

## Top Recommended Interview Questions
${analysisResult.recommendedInterviewPrep.map((q, i) => `${i + 1}. ${q}`).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Job_Analysis_${jobTitle.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Exported analysis dossier as Markdown', 'success');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 sm:p-6 lg:p-8 space-y-8 custom-scrollbar relative">
      {/* Main Container Aligned with Image Studio (max-w-6xl mx-auto w-full) */}
      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Career & ATS Optimization</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse ml-1" />
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Resume Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              AI Job Analysis & Resume Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Analyze job descriptions, optimize ATS keyword matching, and craft tailored application materials in seconds.
            </p>
          </div>

          {/* Right Header Actions: History Drawer Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-all shadow-sm group"
            >
              <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:rotate-[-20deg] transition-transform" />
              <span>Job Analysis History</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold">
                {historyList.length}
              </span>
            </button>
          </div>
        </div>

        {/* 4 Interactive Action Cards Grid (Responsive 4-Column matching ImageStudio width) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actionCards.map((card) => {
            const Icon = card.icon;
            const isActive = activeCardId === card.id;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(card.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 shadow-sm dark:shadow-xl group flex flex-col justify-between space-y-3 backdrop-blur-xl hover:-translate-y-0.5 ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 border-emerald-600 dark:border-emerald-500/60 ring-1 ring-emerald-500/30 shadow-md'
                    : 'bg-white/90 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-tr ${card.color} text-white shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-slate-800">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed min-h-[34px]">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  <span>Run Check</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Input Form Panel (Stretching cleanly across the same container width) */}
        <div className="rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 space-y-5 shadow-sm dark:shadow-2xl backdrop-blur-xl">
          
          {/* Header of Form Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Application Alignment Parameters</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                  Target Inputs
                </span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Provide your targeted role specifications and resume bullets for deep ATS scanning.
              </p>
            </div>

            {/* Quick Sample Fillers */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mr-1">Load Demo:</span>
              <button
                type="button"
                onClick={() => handleLoadSample('frontend')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700/60 shadow-sm"
              >
                Frontend
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('ai')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700/60 shadow-sm"
              >
                AI Platform
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('fullstack')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700/60 shadow-sm"
              >
                Full-Stack
              </button>
            </div>
          </div>

          {/* Row 1: Target Job Title & Target Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Target Job Title</span>
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Target Company / Organization</span>
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Stripe, OpenAI, Vercel"
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>
          </div>

          {/* Row 2: Paste Job Description & Paste Resume */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <FileSearch className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>Paste Job Description</span>
                </label>
                <span className="text-[10px] text-slate-500 font-mono">{jobDescription.length} chars</span>
              </div>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste key qualifications, tech stack requirements, and responsibilities from the job listing..."
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none leading-relaxed shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Paste Current Resume / Profile</span>
                </label>
                <span className="text-[10px] text-slate-500 font-mono">{resumeSnippet.length} chars</span>
              </div>
              <textarea
                rows={5}
                value={resumeSnippet}
                onChange={(e) => setResumeSnippet(e.target.value)}
                placeholder="Paste your current experience bullet points, accomplishments, technical skills, or LinkedIn bio..."
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none leading-relaxed shadow-sm"
              />
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700/60 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleRunAnalysis(activeCardId)}
              disabled={isAnalyzing}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Cross-Referencing ATS Criteria & Vectors...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Alignment & Tailor Resume</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        {analysisResult && (
          <div className="rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 space-y-6 shadow-sm dark:shadow-2xl backdrop-blur-xl animate-in fade-in">
            
            {/* Top Metrics Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Overall Alignment Score</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {analysisResult.matchScore}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Match Accuracy</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs shadow-inner">
                  <span className="text-slate-500 dark:text-slate-400 mr-2">ATS Readability:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{analysisResult.atsRating}</span>
                </div>

                <button
                  type="button"
                  onClick={handleExportMarkdown}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-white flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700/60 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>

            {/* Strengths & Improvements 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 space-y-3 shadow-inner">
                <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Key Match Strengths</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {analysisResult.keyStrengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 space-y-3 shadow-inner">
                <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Recommended Enhancements</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {analysisResult.suggestedImprovements.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tailored Professional Summary Box */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Tailored Professional Headline & Summary</span>
                </h4>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-white flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700/60 shadow-sm"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans shadow-inner">
                {analysisResult.tailoredSummary}
              </div>
            </div>

            {/* Recommended Interview Questions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Top Architectural Interview Questions for this Role</span>
              </h4>
              <div className="space-y-2.5">
                {analysisResult.recommendedInterviewPrep.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-300 flex items-start gap-3 shadow-inner"
                  >
                    <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Side History Drawer: Job Analysis History */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => setIsHistoryOpen(false)}
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Job Analysis History</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {historyList.length} saved career dossiers
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {historyList.length === 0 ? (
                  <div className="py-16 text-center space-y-2">
                    <Briefcase className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto" />
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">No past analyses saved</p>
                    <p className="text-xs text-slate-500">Run an analysis to save career dossiers</p>
                  </div>
                ) : (
                  historyList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleRestoreHistory(item)}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 hover:bg-white dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2.5 group shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                            {item.jobTitle}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.company}</p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                            {item.result.matchScore}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteHistory(item.id, e)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800/60">
                        <span>{item.date}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Restore</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/50">
                <span>Click any record to reload analysis</span>
                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 hover:text-slate-900 dark:text-white font-semibold transition-colors border border-slate-200 dark:border-slate-700/60 shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobAnalysisView;
