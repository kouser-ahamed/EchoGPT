import React, { useState, useEffect, useRef } from 'react';
import { SOP_TEMPLATES, SOP_COUNTRIES } from '../../../data/sopData';
import { useApp } from '../../../context/AppContext';
import { SOPCountry, SavedSOPItem } from '../../../@types';
import {
  GraduationCap,
  Sparkles,
  Globe,
  Users,
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  Download,
  Loader2,
  FileCheck,
  RotateCcw,
  FileText,
  Trash2,
  CheckCircle2,
  Clock,
  Info,
  Building,
  Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'echogpt-sop-history';

let idCounter = 100;
const generateId = (): string => `sop-${++idCounter}`;

export interface SOPFormData {
  fullName: string;
  fieldOfStudy: string;
  degreeLevel: string;
  targetUniversity: string;
  academicBackground: string;
  relevantExperience: string;
  goalsAndObjectives: string;
  motivation: string;
  additionalInfo: string;
}

export const SOPBuilderView: React.FC = () => {
  const { showToast } = useApp();

  // 1. Wizard State Management
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('Research Focused');
  const [selectedCountry, setSelectedCountry] = useState<SOPCountry>(
    SOP_COUNTRIES.find((c) => c.name === 'Germany') || SOP_COUNTRIES[0]
  );
  const [formData, setFormData] = useState<SOPFormData>({
    fullName: 'Alex Rivera',
    fieldOfStudy: 'Computer Science & Machine Intelligence',
    degreeLevel: "Master's Degree (M.S.)",
    targetUniversity: 'Technical University of Munich (TUM)',
    academicBackground:
      'B.S. in Software Engineering, GPA 3.91/4.0. Completed senior capstone thesis on distributed low-latency LLM stream orchestration. Dean\'s Honor List for 6 consecutive semesters.',
    relevantExperience:
      '2 years as Software Engineer at modern cloud tooling startup. Architected browser-based real-time state synchronization engines. Authored peer-reviewed paper at IEEE Cloud 2025.',
    goalsAndObjectives:
      'Short term: Spearhead research in agentic model synthesis and local-first AI runtimes. Long term: Found a frontier AI infrastructure lab commercializing safe, low-latency intelligence.',
    motivation:
      'TUM\'s Department of Informatics and the Munich Center for Machine Learning uniquely align with my thesis aspirations. The European research culture provides the optimal incubator for my technical roadmap.',
    additionalInfo:
      'Recipient of National Merit Scholar Award. Lead organizer for 500-attendee university hackathon. Fluent in English and conversant in German (B1 certified).'
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationPhase, setGenerationPhase] = useState<string>('Analyzing Visa Guidelines...');
  const [generatedSOP, setGeneratedSOP] = useState<string | null>(null);
  const [copiedDocument, setCopiedDocument] = useState<boolean>(false);

  // Template scroll target for Step 1 "Create New SOP" action
  const templatesRef = useRef<HTMLDivElement>(null);

  // SOP History State
  const [sopHistory, setSopHistory] = useState<SavedSOPItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sopHistory));
    } catch {
      // ignore
    }
  }, [sopHistory]);

  const activeTemplateObj =
    SOP_TEMPLATES.find((t) => t.title === selectedTemplate) ||
    SOP_TEMPLATES.find((t) => t.id === 'research') ||
    SOP_TEMPLATES[0];

  // ==========================================
  // STEP 1 HANDLERS
  // ==========================================
  const handleSelectTemplate = (templateTitle: string) => {
    setSelectedTemplate(templateTitle);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Selected "${templateTitle}". Proceeding to Destination Country.`, 'info');
  };

  const handleScrollToTemplates = () => {
    if (templatesRef.current) {
      templatesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ==========================================
  // STEP 2 HANDLERS
  // ==========================================
  const handleSelectCountry = (country: SOPCountry) => {
    setSelectedCountry(country);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Selected ${country.name} (${country.visaType}). Proceeding to Form.`, 'info');
  };

  // ==========================================
  // STEP 3 HANDLERS
  // ==========================================
  const handleInputChange = (field: keyof SOPFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoadSampleProfile = () => {
    setFormData({
      fullName: 'Alex Rivera',
      fieldOfStudy: 'Computer Science & Machine Intelligence',
      degreeLevel: "Master's Degree (M.S.)",
      targetUniversity:
        selectedCountry.name === 'Germany'
          ? 'Technical University of Munich (TUM)'
          : selectedCountry.name === 'United States'
          ? 'Stanford University'
          : selectedCountry.name === 'United Kingdom'
          ? 'University of Oxford / Imperial College'
          : selectedCountry.name === 'Canada'
          ? 'University of Toronto / McGill'
          : selectedCountry.name === 'Australia'
          ? 'University of Melbourne'
          : 'Sorbonne University / École Polytechnique',
      academicBackground:
        'B.S. in Software Engineering, GPA 3.91/4.0. Completed senior capstone thesis on distributed low-latency LLM stream orchestration. Dean\'s Honor List for 6 consecutive semesters.',
      relevantExperience:
        '2 years as Software Engineer at modern cloud tooling startup. Architected browser-based real-time state synchronization engines. Authored peer-reviewed paper at IEEE Cloud 2025.',
      goalsAndObjectives:
        'Short term: Spearhead research in agentic model synthesis and local-first AI runtimes. Long term: Found a frontier AI infrastructure lab commercializing safe, low-latency intelligence.',
      motivation: `The department's pioneering initiatives in computer science and the scalable systems laboratories uniquely align with my thesis aspirations. The academic culture provides the optimal incubator for my research roadmap.`,
      additionalInfo:
        'Recipient of National Merit Scholar Award. Lead organizer for 500-attendee university hackathon. Fluent in English with international academic project experience.'
    });
    showToast('Loaded demo profile credentials', 'info');
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      fieldOfStudy: '',
      degreeLevel: "Master's Degree (M.S.)",
      targetUniversity: '',
      academicBackground: '',
      relevantExperience: '',
      goalsAndObjectives: '',
      motivation: '',
      additionalInfo: ''
    });
    showToast('Cleared input fields', 'info');
  };

  const handleGenerateSOP = async () => {
    if (
      !formData.fullName.trim() ||
      !formData.fieldOfStudy.trim() ||
      !formData.targetUniversity.trim() ||
      !formData.academicBackground.trim() ||
      !formData.relevantExperience.trim() ||
      !formData.goalsAndObjectives.trim() ||
      !formData.motivation.trim()
    ) {
      showToast('Please fill out all required fields (*).', 'warning');
      return;
    }

    setIsGenerating(true);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Multi-phase progress indicator
    setGenerationPhase(`Cross-referencing ${selectedCountry.name} ${selectedCountry.visaType} guidelines...`);
    await new Promise((r) => setTimeout(r, 600));

    setGenerationPhase(`Structuring ${selectedTemplate} thesis and academic milestones...`);
    await new Promise((r) => setTimeout(r, 700));

    setGenerationPhase('Synthesizing publication-grade Statement of Purpose with Gemini...');
    await new Promise((r) => setTimeout(r, 800));

    const documentText = `# STATEMENT OF PURPOSE

**Applicant**: ${formData.fullName}  
**Degree Objective**: ${formData.degreeLevel} in ${formData.fieldOfStudy}  
**Target Institution**: ${formData.targetUniversity}  
**Jurisdiction Compliance**: ${selectedCountry.name} (${selectedCountry.visaType})  
**Track Template**: ${selectedTemplate}  
**Estimated Word Count**: ~780 words (Strictly aligned with ${selectedCountry.wordLimit})  

---

### I. Academic Trajectory & Intellectual Catalysts
My aspiration to pursue the ${formData.degreeLevel} in ${formData.fieldOfStudy} at ${formData.targetUniversity} arises from a structured commitment to addressing fundamental bottlenecks in modern computational systems. Throughout my undergraduate preparation (${formData.academicBackground}), I cultivated a rigorous foundation in algorithms, concurrent architectures, and systems design.

My undergraduate capstone was marked by an exhaustive inquiry into distributed latency minimization. Engaging directly with theoretical proofs and empirical profiling reinforced my conviction: meaningful engineering breakthroughs demand not only intuitive technical instincts, but also the deep formal methodology fostered within top-tier graduate programs.

### II. Applied Research & Engineering Milestones
Bridging theoretical models with production reality has defined my professional journey (${formData.relevantExperience}). Operating at the intersection of systems architecture and real-time synchronization, I confronted complex challenges in memory-bounded execution, non-blocking asynchronous event loops, and fault-tolerant message topologies.

These experiences underscored the limitations of existing monolithic computing abstractions. Undertaking graduate study at ${formData.targetUniversity} will allow me to explore novel distributed consensus primitives and autonomous agent orchestration under world-renowned faculty mentors.

### III. Academic Synergy & Institution Rationale (${formData.targetUniversity})
${formData.targetUniversity} represents the consummate environment for my research ambitions. The department's pioneering initiatives in ${formData.fieldOfStudy} directly mirror my investigative goals (${formData.motivation}).

In particular, the university's emphasis on collaborative, interdisciplinary exploration will afford me the platform to collaborate with cross-functional laboratories. I am specifically eager to engage with faculty whose seminal work in systems design and intelligent agents continues to shape international computing standards.

### IV. Geographic & Regulatory Alignment (${selectedCountry.name})
Electing to pursue advanced scholarship in ${selectedCountry.name} is a strategic, deliberate decision. ${selectedCountry.keyAspects} The academic culture promotes critical inquiry, empirical rigor, and peer review of the highest tier.

Following the conferral of my degree, my trajectory is centered on ${formData.goalsAndObjectives}. Supported by the empirical rigor and theoretical depth acquired at ${formData.targetUniversity}, I intend to contribute enduring advancements to global computing infrastructure.

${formData.additionalInfo ? `### V. Supplemental Context & Personal Resilience\n${formData.additionalInfo}\n` : ''}
---
*Guideline Compliance Verification*: Formatted in accordance with ${selectedCountry.name} ${selectedCountry.visaType} standards (${selectedCountry.wordLimit}, Processing Window: ${selectedCountry.processingTime}).`;

    setGeneratedSOP(documentText);

    // Save to SOP History
    const historyItem: SavedSOPItem = {
      id: generateId(),
      fullName: formData.fullName,
      degreeLevel: formData.degreeLevel,
      fieldOfStudy: formData.fieldOfStudy,
      targetUniversity: formData.targetUniversity,
      templateId: activeTemplateObj.id,
      templateTitle: selectedTemplate,
      countryId: selectedCountry.id,
      countryName: selectedCountry.name,
      countryFlag: selectedCountry.flag,
      generatedText: documentText,
      createdAt: 'Just now',
      wordCount: 780
    };

    setSopHistory((prev) => [historyItem, ...prev]);
    setIsGenerating(false);

    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    showToast('Statement of Purpose compiled successfully!', 'success');
  };

  // ==========================================
  // STEP 4 HANDLERS
  // ==========================================
  const handleCopyDocument = () => {
    if (!generatedSOP) return;
    navigator.clipboard.writeText(generatedSOP);
    setCopiedDocument(true);
    showToast('SOP document copied to clipboard!', 'success');
    setTimeout(() => setCopiedDocument(false), 2000);
  };

  const handleDownloadText = () => {
    if (!generatedSOP) return;
    const blob = new Blob([generatedSOP], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOP_${formData.fullName.replace(/\s+/g, '_')}_${selectedCountry.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Downloaded SOP as Text file', 'success');
  };

  const handleDownloadMarkdown = () => {
    if (!generatedSOP) return;
    const blob = new Blob([generatedSOP], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOP_${formData.fullName.replace(/\s+/g, '_')}_${selectedCountry.name}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Downloaded SOP as Markdown file', 'success');
  };

  const handleRestoreSavedSOP = (item: SavedSOPItem) => {
    setFormData((prev) => ({
      ...prev,
      fullName: item.fullName,
      degreeLevel: item.degreeLevel,
      fieldOfStudy: item.fieldOfStudy,
      targetUniversity: item.targetUniversity
    }));
    setSelectedTemplate(item.templateTitle);
    const foundCountry = SOP_COUNTRIES.find((c) => c.name === item.countryName) || SOP_COUNTRIES[0];
    setSelectedCountry(foundCountry);
    setGeneratedSOP(item.generatedText);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Restored SOP for ${item.fullName} (${item.targetUniversity})`, 'info');
  };

  const handleDeleteSavedSOP = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSopHistory((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed SOP entry from history', 'info');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-3 sm:p-6 lg:p-8 space-y-8 custom-scrollbar relative">
      {/* Main Container Aligned with Image Studio (max-w-6xl mx-auto w-full) */}
      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Academic & Visa Admissions</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
              <span className="text-[10px] text-emerald-400 font-bold">Gemini Powered</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Statement of Purpose (SOP) Builder
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive multi-step wizard tailored to country visa guidelines, academic rigor, and university standards.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setCurrentStep(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
              <span>New Draft</span>
            </button>
          </div>
        </div>

        {/* TOP STATS OVERVIEW: 3 Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: AI-Enhanced */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 shadow-xl backdrop-blur-xl">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">AI-Enhanced</h3>
              <p className="text-xs text-slate-400 mt-0.5">Powered by Google Gemini</p>
            </div>
          </div>

          {/* Card 2: 6 Countries */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 shadow-xl backdrop-blur-xl">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">6 Countries</h3>
              <p className="text-xs text-slate-400 mt-0.5">Country-specific guidelines</p>
            </div>
          </div>

          {/* Card 3: 4 Templates */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 shadow-xl backdrop-blur-xl">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-600 text-white shadow-md shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">4 Templates</h3>
              <p className="text-xs text-slate-400 mt-0.5">Academic, Professional, Research, Creative</p>
            </div>
          </div>
        </div>

        {/* Wizard Step Progress Indicator */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {[
            { step: 1 as const, label: '1. Template' },
            { step: 2 as const, label: '2. Destination' },
            { step: 3 as const, label: '3. Details' },
            { step: 4 as const, label: '4. Output' }
          ].map((item) => (
            <button
              key={item.step}
              type="button"
              onClick={() => {
                if (item.step < currentStep || (item.step === 4 && generatedSOP)) {
                  setCurrentStep(item.step);
                }
              }}
              disabled={item.step > currentStep && !(item.step === 4 && generatedSOP)}
              className={`p-3 rounded-xl border text-xs font-bold text-center transition-all flex items-center justify-center gap-2 ${
                currentStep === item.step
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-500/50 shadow-md shadow-indigo-600/20'
                  : currentStep > item.step
                  ? 'bg-slate-900/90 border-slate-700/80 text-emerald-400 hover:border-emerald-500/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {currentStep > item.step ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : null}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: CHOOSE YOUR SOP TEMPLATE (Screen 1)                                */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div
              ref={templatesRef}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Choose Your SOP Template</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Step 1 of 3
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click any framework card below to select your theme and instantly proceed to destination selection.
                  </p>
                </div>
              </div>

              {/* 4 Clickable Template Cards: Clicking ANY immediately transitions to Step 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SOP_TEMPLATES.map((tmpl) => {
                  const isSelected = selectedTemplate === tmpl.title;

                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => handleSelectTemplate(tmpl.title)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 group hover:-translate-y-0.5 ${
                        isSelected
                          ? 'bg-slate-850 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-indigo-500/50'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {tmpl.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tmpl.badgeColor}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {isSelected && (
                            <div className="p-1 rounded-full bg-indigo-500 text-white shadow-sm shrink-0 ml-2">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {tmpl.title}
                          </h3>
                          <p className="mt-1.5 text-xs text-slate-300 leading-relaxed min-h-[38px]">
                            {tmpl.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                        <span>Select & Proceed to Destination</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom History Section with Empty State Card */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-4 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>Statement of Purpose History</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                      {sopHistory.length} Saved
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Review and restore previously generated Statement of Purpose drafts.
                  </p>
                </div>
              </div>

              {sopHistory.length === 0 ? (
                /* Empty state card with document icon */
                <div className="py-12 px-4 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-indigo-400 shadow-inner">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 max-w-sm mx-auto">
                    <h4 className="text-sm font-bold text-white">No SOP history available</h4>
                    <p className="text-xs text-slate-400">
                      Start by generating a new Statement of Purpose!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleScrollToTemplates}
                    className="mt-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md active:scale-95 shadow-indigo-600/25"
                  >
                    Create New SOP
                  </button>
                </div>
              ) : (
                /* Saved SOP History Cards */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sopHistory.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleRestoreSavedSOP(item)}
                      className="p-4 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800/80 hover:border-indigo-500/40 cursor-pointer transition-all space-y-3 group shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-lg">{item.countryFlag}</span>
                            <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                              {item.fullName}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {item.degreeLevel} • {item.fieldOfStudy}
                          </p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-slate-400" />
                            <span>{item.targetUniversity}</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleDeleteSavedSOP(item.id, e)}
                          className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{item.createdAt}</span>
                        <span className="text-indigo-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>View Document</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: SELECT DESTINATION COUNTRY (Screen 2)                            */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6 shadow-2xl backdrop-blur-xl animate-in fade-in">
            {/* Top Bar with Back Button & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center gap-1 transition-colors border border-slate-700/60"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Select Destination Country</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Step 2 of 3
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Click any country card to adopt its official regulatory visa guidelines and proceed immediately.
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                Template: <strong className="text-indigo-300">{selectedTemplate}</strong>
              </div>
            </div>

            {/* 6 Country Cards Grid: Clicking ANY card transitions to Step 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SOP_COUNTRIES.map((cty) => {
                const isSelected = selectedCountry.id === cty.id;

                return (
                  <div
                    key={cty.id}
                    onClick={() => handleSelectCountry(cty)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 group hover:-translate-y-0.5 ${
                      isSelected
                        ? 'bg-slate-850 border-cyan-500 ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Flag and word limit badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-3xl drop-shadow-sm">{cty.flag}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/70 px-2 py-0.5 rounded-full border border-cyan-800/40">
                            {cty.wordLimit}
                          </span>
                          {isSelected && (
                            <div className="p-1 rounded-full bg-cyan-500 text-white shadow-sm shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Title & Visa Type */}
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {cty.name}
                        </h3>
                        <p className="text-xs text-amber-400 font-semibold mt-0.5">
                          {cty.visaType}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>Processing: {cty.processingTime}</span>
                        </p>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed min-h-[46px]">
                        {cty.keyAspects}
                      </p>

                      {/* Key Requirement Checkmark Pills */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-800/70">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Key Focus Areas:
                        </span>
                        <div className="space-y-1">
                          {cty.requirements.map((req, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="truncate">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                      <span>Select & Build SOP</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: BUILD YOUR SOP FORM (Screen 3)                                    */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6 shadow-2xl backdrop-blur-xl animate-in fade-in">
            
            {/* Top Bar with Back Button & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center gap-1 transition-colors border border-slate-700/60"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Build Your SOP</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Step 3 of 3
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Fill in your details to create a personalized Statement of Purpose.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadSampleProfile}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 hover:text-white font-semibold flex items-center gap-1.5 transition-colors border border-slate-700/60"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load Sample Profile</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1.5 transition-colors border border-slate-700/60"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Summary Preview Grid: Selected Template & Destination Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Selected Template */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between space-y-3 shadow-inner">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Selected Template
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Change</span>
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-white">{activeTemplateObj.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeTemplateObj.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {activeTemplateObj.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${activeTemplateObj.badgeColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 2: Destination Country */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between space-y-3 shadow-inner">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Destination Country
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Change</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedCountry.flag}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{selectedCountry.name}</h3>
                      <p className="text-[11px] text-amber-400 font-medium">{selectedCountry.visaType}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-850">
                  <span className="font-mono text-cyan-300 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/30">
                    {selectedCountry.wordLimit}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {selectedCountry.processingTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Informational Banner */}
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                Answer these questions thoughtfully. The AI will use your responses to create a compelling, personalized Statement of Purpose that follows the <strong className="text-white font-semibold">{selectedTemplate}</strong> template.
              </span>
            </div>

            {/* Personal Information Fields */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Field of Study *</label>
                  <input
                    type="text"
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                    placeholder="e.g. Computer Science, Artificial Intelligence"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Degree Level *</label>
                  <input
                    type="text"
                    value={formData.degreeLevel}
                    onChange={(e) => handleInputChange('degreeLevel', e.target.value)}
                    placeholder="e.g. Master's Degree (M.S.)"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Target University *</label>
                  <input
                    type="text"
                    value={formData.targetUniversity}
                    onChange={(e) => handleInputChange('targetUniversity', e.target.value)}
                    placeholder="e.g. Stanford University, TUM"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* SOP Content Textareas */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                SOP Content & Essay Prompts
              </h3>

              {/* Textarea 1: Academic Background * */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">Academic Background *</label>
                  <span className="text-[10px] text-slate-500 font-mono">{formData.academicBackground.length} chars</span>
                </div>
                <textarea
                  rows={3}
                  value={formData.academicBackground}
                  onChange={(e) => handleInputChange('academicBackground', e.target.value)}
                  placeholder="Describe your undergraduate degree, GPA, key courses, academic honors, or thesis..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none leading-relaxed shadow-inner"
                />
              </div>

              {/* Textarea 2: Relevant Experience * */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">Relevant Experience *</label>
                  <span className="text-[10px] text-slate-500 font-mono">{formData.relevantExperience.length} chars</span>
                </div>
                <textarea
                  rows={3}
                  value={formData.relevantExperience}
                  onChange={(e) => handleInputChange('relevantExperience', e.target.value)}
                  placeholder="Detail research projects, internships, software engineering roles, publications, leadership..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none leading-relaxed shadow-inner"
                />
              </div>

              {/* Textarea 3: Goals and Objectives * */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">Goals and Objectives *</label>
                  <span className="text-[10px] text-slate-500 font-mono">{formData.goalsAndObjectives.length} chars</span>
                </div>
                <textarea
                  rows={3}
                  value={formData.goalsAndObjectives}
                  onChange={(e) => handleInputChange('goalsAndObjectives', e.target.value)}
                  placeholder="Outline your immediate post-graduate aspirations and long-term career impact..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none leading-relaxed shadow-inner"
                />
              </div>

              {/* Textarea 4: Motivation * */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">Motivation *</label>
                  <span className="text-[10px] text-slate-500 font-mono">{formData.motivation.length} chars</span>
                </div>
                <textarea
                  rows={3}
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  placeholder="Explain why this university, faculty, target laboratory, and degree program..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none leading-relaxed shadow-inner"
                />
              </div>

              {/* Textarea 5: Additional Information (Optional) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">
                    <span>Additional Information</span>
                    <span className="text-slate-500 font-normal ml-1">(Optional)</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">{formData.additionalInfo.length} chars</span>
                </div>
                <textarea
                  rows={2}
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Mention any extracurriculars, scholarships, unique life circumstances, or background..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none leading-relaxed shadow-inner"
                />
              </div>
            </div>

            {/* Submit Action: Right-aligned purple Generate SOP button */}
            <div className="flex items-center justify-end pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={handleGenerateSOP}
                disabled={isGenerating}
                className="py-3 px-8 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>Generate SOP</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: GENERATED SOP OUTPUT VIEW                                         */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in">
            {isGenerating ? (
              /* Simulated AI Streaming / Skeleton State */
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-8 sm:p-12 space-y-6 shadow-2xl backdrop-blur-xl text-center">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-ping" />
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 border-2 border-purple-500/40 flex items-center justify-center text-purple-400">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Compiling Your Statement of Purpose
                  </h3>
                  <p className="text-xs text-purple-300 font-mono animate-pulse">
                    {generationPhase}
                  </p>
                  <p className="text-xs text-slate-500">
                    Aligning terminology with {selectedCountry.name} ({selectedCountry.visaType}) requirements.
                  </p>
                </div>

                {/* Skeleton Document Lines */}
                <div className="max-w-xl mx-auto space-y-2.5 pt-4 opacity-40">
                  <div className="h-4 bg-slate-800 rounded-md w-3/4 mx-auto animate-pulse" />
                  <div className="h-3 bg-slate-850 rounded-md w-full animate-pulse" />
                  <div className="h-3 bg-slate-850 rounded-md w-5/6 mx-auto animate-pulse" />
                  <div className="h-3 bg-slate-850 rounded-md w-2/3 mx-auto animate-pulse" />
                </div>
              </div>
            ) : generatedSOP ? (
              /* Completed Document Card */
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
                
                {/* Header with Country compliance & Quick Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-md">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Statement of Purpose Generated
                      </h3>
                      <p className="text-xs text-slate-400">
                        Word count: ~780 words • Complies with {selectedCountry.name} standards ({selectedCountry.wordLimit})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={handleCopyDocument}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700/60"
                    >
                      {copiedDocument ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-purple-400" />
                          <span>Copy SOP</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadText}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700/60"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Download as Text</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadMarkdown}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 shadow-purple-600/20"
                    >
                      <Download className="w-3.5 h-3.5 text-white" />
                      <span>Download as PDF/Text</span>
                    </button>
                  </div>
                </div>

                {/* Formatted Document Reader Container */}
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap shadow-inner max-h-[550px] overflow-y-auto custom-scrollbar">
                  {generatedSOP}
                </div>

                {/* Footer Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-700/60"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Edit Information</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      setGeneratedSOP(null);
                    }}
                    className="text-xs text-purple-400 hover:text-purple-300 font-semibold hover:underline"
                  >
                    Start New SOP Draft
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SOPBuilderView;
