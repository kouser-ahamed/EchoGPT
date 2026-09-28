import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Target,
  Sparkles,
  Loader2,
  Copy
} from 'lucide-react';

interface AnalysisResult {
  matchScore: string;
  atsRating: string;
  keyStrengths: string[];
  suggestedImprovements: string[];
  tailoredSummary: string;
  recommendedInterviewPrep: string[];
}

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
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const cards = [
    { id: 'analyze', title: 'Analyze Job Description', desc: 'Identify core technical requirements, unspoken expectations, and scoring criteria.' },
    { id: 'tailor', title: 'Tailor Your Resume', desc: 'Reword experience bullets to match high-frequency ATS keywords.' },
    { id: 'interview', title: 'Prepare for Interviews', desc: 'Generate 5 rigorous behavioral and system architecture questions.' },
    { id: 'gap', title: 'Skill Gap Analysis', desc: 'Pinpoint missing competencies and draft a 14-day study plan.' }
  ];

  const handleRunAnalysis = async (_mode: string = 'full') => {
    if (!jobDescription.trim() || !resumeSnippet.trim()) {
      showToast('Please provide both the job description and your resume context.', 'warning');
      return;
    }

    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 950));

    setAnalysisResult({
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
      tailoredSummary: `Senior Frontend & Product Engineer with proven expertise orchestrating modern React 19 web applications and Chrome Manifest V3 sidepanel workflows. Demonstrated ability to decrease runtime latency by 42% while architecting intuitive multi-model AI interfaces at scale.`,
      recommendedInterviewPrep: [
        'How do you manage client-side state when streaming token responses from multiple LLMs simultaneously?',
        'Walk through your design of a Chrome Extension sidebar using Manifest V3 Side Panel API.',
        'How would you migrate an existing SPA to React 19 Server Actions while ensuring optimistic UX?'
      ]
    });

    setIsAnalyzing(false);
    showToast('Job Analysis & Resume Alignment Complete!', 'success');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-4 sm:p-8 space-y-8">
      {/* Top Banner */}
      <div className="max-w-5xl mx-auto w-full space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career & ATS Optimization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            AI Job Analysis & Resume Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Analyze job descriptions, optimize ATS keyword matching, and craft tailored application materials in seconds.
          </p>
        </div>

        {/* 4 Interactive Prompt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((c) => (
            <button
              key={c.id}
              onClick={() => handleRunAnalysis(c.id)}
              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all text-left group shadow-md flex flex-col justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {c.title}
                </h4>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                  {c.desc}
                </p>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold mt-3 flex items-center gap-1">
                <span>Run Check</span> →
              </span>
            </button>
          ))}
        </div>

        {/* Input Form Panel */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Target Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Target Company / Team</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Paste Job Description</label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste key qualifications and responsibilities..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Paste Current Resume / Profile</label>
              <textarea
                rows={4}
                value={resumeSnippet}
                onChange={(e) => setResumeSnippet(e.target.value)}
                placeholder="Paste your existing experience bullets or achievements..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              onClick={() => handleRunAnalysis('full')}
              disabled={isAnalyzing}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Cross-Referencing ATS Criteria...</span>
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
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 space-y-6 shadow-2xl animate-in fade-in">
            {/* Top Metrics Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Overall Alignment Score</span>
                  <span className="text-2xl font-extrabold text-white">{analysisResult.matchScore}</span>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 mr-2">ATS Readability:</span>
                <span className="font-bold text-emerald-400">{analysisResult.atsRating}</span>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Key Match Strengths</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {analysisResult.keyStrengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Recommended Enhancements</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {analysisResult.suggestedImprovements.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tailored Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Tailored Professional Headline & Summary
                </h4>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(analysisResult.tailoredSummary);
                    showToast('Copied tailored summary to clipboard', 'success');
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                {analysisResult.tailoredSummary}
              </div>
            </div>

            {/* Recommended Interview Questions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Top Architectural Interview Questions for this Role
              </h4>
              <div className="space-y-2">
                {analysisResult.recommendedInterviewPrep.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0">
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
    </div>
  );
};
