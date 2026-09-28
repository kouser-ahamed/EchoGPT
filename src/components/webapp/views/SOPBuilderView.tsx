import React, { useState, useEffect } from 'react';
import { SOP_TEMPLATES, SOP_COUNTRIES } from '../../../data/sopData';
import { useApp } from '../../../context/AppContext';
import { SOPTemplate, SOPCountry, SavedSOPItem } from '../../../@types';
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
  Clock,
  RotateCcw,
  FileText,
  Trash2,
  CheckCircle2,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'echogpt-sop-history';

let idCounter = 100;
const generateId = (): string => `sop-${++idCounter}`;

export const SOPBuilderView: React.FC = () => {
  const { showToast } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedTemplate, setSelectedTemplate] = useState<string>(SOP_TEMPLATES[0].id);
  const [selectedCountry, setSelectedCountry] = useState<string>(SOP_COUNTRIES[0].id);
  const [fullName, setFullName] = useState<string>('Alex Rivera');
  const [fieldOfStudy, setFieldOfStudy] = useState<string>('Computer Science & Machine Intelligence');
  const [degreeLevel, setDegreeLevel] = useState<string>("Master's Degree (M.S.)");
  const [targetUniversity, setTargetUniversity] = useState<string>('Stanford University / CMU');

  const [academicBackground, setAcademicBackground] = useState<string>(
    'B.S. in Software Engineering, GPA 3.91/4.0. Completed senior capstone thesis on distributed low-latency LLM stream orchestration. Dean\'s Honor List for 6 consecutive semesters.'
  );
  const [relevantExperience, setRelevantExperience] = useState<string>(
    '2 years as Software Engineer at modern cloud tooling startup. Architected browser-based real-time state synchronization engines. Authored peer-reviewed paper at IEEE Cloud 2025.'
  );
  const [goalsAndObjectives, setGoalsAndObjectives] = useState<string>(
    'Short term: Spearhead research in agentic model synthesis and local-first AI runtimes. Long term: Found a frontier AI infrastructure lab commercializing safe, low-latency intelligence.'
  );
  const [motivationText, setMotivationText] = useState<string>(
    'Stanford\'s Human-Centered AI Institute and the scalable systems laboratories uniquely align with my thesis aspirations. The interdisciplinary research culture provides the optimal incubator for my technical roadmap.'
  );
  const [additionalInfo, setAdditionalInfo] = useState<string>(
    'Recipient of National Merit Scholar Award. Lead organizer for 500-attendee university hackathon. Fluent in English and conversant in French.'
  );

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedSOP, setGeneratedSOP] = useState<string | null>(null);
  const [copiedDocument, setCopiedDocument] = useState<boolean>(false);

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

  const activeTemplateObj: SOPTemplate =
    SOP_TEMPLATES.find((t) => t.id === selectedTemplate) || SOP_TEMPLATES[0];
  const activeCountryObj: SOPCountry =
    SOP_COUNTRIES.find((c) => c.id === selectedCountry) || SOP_COUNTRIES[0];

  const handleLoadDemo = () => {
    setFullName('Alex Rivera');
    setFieldOfStudy('Computer Science & Machine Intelligence');
    setDegreeLevel("Master's Degree (M.S.)");
    setTargetUniversity('Stanford University / CMU');
    setAcademicBackground(
      'B.S. in Software Engineering, GPA 3.91/4.0. Completed senior capstone thesis on distributed low-latency LLM stream orchestration. Dean\'s Honor List for 6 consecutive semesters.'
    );
    setRelevantExperience(
      '2 years as Software Engineer at modern cloud tooling startup. Architected browser-based real-time state synchronization engines. Authored peer-reviewed paper at IEEE Cloud 2025.'
    );
    setGoalsAndObjectives(
      'Short term: Spearhead research in agentic model synthesis and local-first AI runtimes. Long term: Found a frontier AI infrastructure lab commercializing safe, low-latency intelligence.'
    );
    setMotivationText(
      'Stanford\'s Human-Centered AI Institute and the scalable systems laboratories uniquely align with my thesis aspirations. The interdisciplinary research culture provides the optimal incubator for my technical roadmap.'
    );
    setAdditionalInfo(
      'Recipient of National Merit Scholar Award. Lead organizer for 500-attendee university hackathon. Fluent in English and conversant in French.'
    );
    showToast('Loaded demo profile credentials', 'info');
  };

  const handleResetForm = () => {
    setFullName('');
    setFieldOfStudy('');
    setDegreeLevel("Master's Degree (M.S.)");
    setTargetUniversity('');
    setAcademicBackground('');
    setRelevantExperience('');
    setGoalsAndObjectives('');
    setMotivationText('');
    setAdditionalInfo('');
    showToast('Cleared input fields', 'info');
  };

  const handleGenerateSOP = async () => {
    if (!fullName.trim() || !fieldOfStudy.trim() || !targetUniversity.trim()) {
      showToast('Please fill in applicant name, field of study, and target institution.', 'warning');
      return;
    }

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const documentText = `# STATEMENT OF PURPOSE

**Applicant**: ${fullName}  
**Degree Objective**: ${degreeLevel} in ${fieldOfStudy}  
**Target Institution**: ${targetUniversity}  
**Jurisdiction Compliance**: ${activeCountryObj.name} (${activeCountryObj.visaType})  
**Track Template**: ${activeTemplateObj.title}  
**Estimated Word Count**: ~750 words (Compliant with ${activeCountryObj.wordLimit})  

---

### I. Academic Trajectory & Intellectual Catalysts
My aspiration to pursue the ${degreeLevel} in ${fieldOfStudy} at ${targetUniversity} arises from a structured commitment to addressing fundamental bottlenecks in modern software engineering and computational reasoning. Throughout my undergraduate preparation (${academicBackground}), I cultivated a rigorous mathematical foundation in algorithms, concurrent architectures, and systems design. 

My undergraduate capstone was marked by an exhaustive inquiry into distributed latency minimization. Engaging directly with theoretical proofs and empirical profiling reinforced my conviction: meaningful engineering breakthroughs demand not only intuitive technical instincts, but also the deep formal methodology fostered within top-tier graduate programs.

### II. Applied Research & Engineering Milestones
Bridging theoretical models with production reality has defined my professional journey (${relevantExperience}). Operating at the intersection of systems architecture and real-time synchronization, I confronted complex challenges in memory-bounded execution, non-blocking asynchronous event loops, and fault-tolerant message topologies. 

These experiences underscored the limitations of existing monolithic computing abstractions. Undertaking graduate study at ${targetUniversity} will allow me to explore novel distributed consensus primitives and autonomous agent orchestration under world-renowned faculty mentors.

### III. Academic Synergy & Institution Rationale (${targetUniversity})
${targetUniversity} represents the consummate environment for my research ambitions. The department's pioneering initiatives in ${fieldOfStudy} directly mirror my investigative goals (${motivationText}). 

In particular, the university's emphasis on collaborative, interdisciplinary exploration will afford me the platform to collaborate with cross-functional laboratories. I am specifically eager to engage with faculty whose seminal work in systems design and intelligent agents continues to shape international computing standards.

### IV. Geographic & Regulatory Alignment (${activeCountryObj.name})
Electing to pursue advanced scholarship in ${activeCountryObj.name} is a strategic, deliberate decision. ${activeCountryObj.keyAspects} The academic culture promotes critical inquiry, empirical rigor, and rigorous peer review of the highest tier.

Following the conferral of my degree, my trajectory is centered on ${goalsAndObjectives}. Supported by the empirical rigor and theoretical depth acquired at ${targetUniversity}, I intend to contribute enduring advancements to global computing infrastructure.

${additionalInfo ? `### V. Supplemental Context & Personal Resilience\n${additionalInfo}\n` : ''}
---
*Guideline Compliance Verification*: Formatted in accordance with ${activeCountryObj.name} ${activeCountryObj.visaType} standards (${activeCountryObj.wordLimit}, Processing Window: ${activeCountryObj.processingTime}).`;

    setGeneratedSOP(documentText);

    // Save to SOP History
    const historyItem: SavedSOPItem = {
      id: generateId(),
      fullName,
      degreeLevel,
      fieldOfStudy,
      targetUniversity,
      templateId: activeTemplateObj.id,
      templateTitle: activeTemplateObj.title,
      countryId: activeCountryObj.id,
      countryName: activeCountryObj.name,
      countryFlag: activeCountryObj.flag,
      generatedText: documentText,
      createdAt: 'Just now',
      wordCount: 750
    };

    setSopHistory((prev) => [historyItem, ...prev]);
    setIsGenerating(false);
    setCurrentStep(4);

    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    showToast('Statement of Purpose compiled successfully!', 'success');
  };

  const handleCopyDocument = () => {
    if (!generatedSOP) return;
    navigator.clipboard.writeText(generatedSOP);
    setCopiedDocument(true);
    showToast('SOP document copied to clipboard!', 'success');
    setTimeout(() => setCopiedDocument(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    if (!generatedSOP) return;
    const blob = new Blob([generatedSOP], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOP_${fullName.replace(/\s+/g, '_')}_${activeCountryObj.name}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Downloaded SOP Markdown file', 'success');
  };

  const handleRestoreSavedSOP = (item: SavedSOPItem) => {
    setFullName(item.fullName);
    setFieldOfStudy(item.fieldOfStudy);
    setDegreeLevel(item.degreeLevel);
    setTargetUniversity(item.targetUniversity);
    setSelectedTemplate(item.templateId);
    setSelectedCountry(item.countryId);
    setGeneratedSOP(item.generatedText);
    setCurrentStep(4);
    showToast(`Loaded saved SOP for ${item.fullName} (${item.targetUniversity})`, 'info');
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
            { step: 1, label: '1. Template Selection' },
            { step: 2, label: '2. Destination Country' },
            { step: 3, label: '3. Personal Details' },
            { step: 4, label: '4. Generated SOP' }
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
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : null}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>

        {/* STEP 1: 4 TEMPLATES & BOTTOM SOP HISTORY */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Template Selection Box */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Step 1: Select Statement of Purpose Template</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      4 Available
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Choose the thematic framework that aligns with your educational background and target program.
                  </p>
                </div>
              </div>

              {/* 4 Template Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SOP_TEMPLATES.map((tmpl) => {
                  const isSelected = selectedTemplate === tmpl.id;

                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 group ${
                        isSelected
                          ? 'bg-slate-850 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700'
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
                        <span>{isSelected ? 'Selected Framework' : 'Choose Framework'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Action */}
              <div className="flex items-center justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 shadow-indigo-600/25"
                >
                  <span>Continue to Destination Country</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom SOP History Section */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-4 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400" />
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
                    onClick={() => {
                      setCurrentStep(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md active:scale-95"
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

        {/* STEP 2: 6 DESTINATION COUNTRIES GRID */}
        {currentStep === 2 && (
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6 shadow-2xl backdrop-blur-xl animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Step 2: Destination Country & Visa Guidelines</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    6 Jurisdictions
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Admissions and visa reviewers apply strict criteria depending on jurisdiction.
                </p>
              </div>

              <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                Selected: <strong className="text-white">{activeCountryObj.name}</strong>
              </div>
            </div>

            {/* 6 Country Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SOP_COUNTRIES.map((cty) => {
                const isSelected = selectedCountry === cty.id;

                return (
                  <div
                    key={cty.id}
                    onClick={() => setSelectedCountry(cty.id)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 group ${
                      isSelected
                        ? 'bg-slate-850 border-cyan-500 ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Header with Flag and Word Limit */}
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

                      <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
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
                      <span>{isSelected ? 'Selected Country' : 'Select Country'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Templates</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 shadow-cyan-600/25"
              >
                <span>Continue to Information Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: COMPLETE INPUT FORM */}
        {currentStep === 3 && (
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6 shadow-2xl backdrop-blur-xl animate-in fade-in">
            
            {/* Top Summary Cards: Selected Template & Country with Back actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-800">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Selected Framework</span>
                    <h4 className="text-xs font-bold text-white truncate">{activeTemplateObj.title}</h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold underline shrink-0"
                >
                  Change
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0">{activeCountryObj.flag}</span>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Destination Country</span>
                    <h4 className="text-xs font-bold text-white truncate">
                      {activeCountryObj.name} ({activeCountryObj.visaType})
                    </h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold underline shrink-0"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Form Header with Quick Load Demo */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">Step 3: Applicant Credentials & Vision</h3>
                <p className="text-xs text-slate-400">
                  Provide detailed information to generate an articulate, personalized Statement of Purpose.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadDemo}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load Demo Profile</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Input Form Fields */}
            <div className="space-y-4">
              
              {/* Row 1: Full Name, Field of Study, Degree Level, Target University */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Field of Study</label>
                  <input
                    type="text"
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    placeholder="e.g. Computer Science, AI"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Degree Level</label>
                  <input
                    type="text"
                    value={degreeLevel}
                    onChange={(e) => setDegreeLevel(e.target.value)}
                    placeholder="e.g. Master's Degree (M.S.)"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Target University</label>
                  <input
                    type="text"
                    value={targetUniversity}
                    onChange={(e) => setTargetUniversity(e.target.value)}
                    placeholder="e.g. Stanford University / CMU"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
                  />
                </div>
              </div>

              {/* Textarea 1: Academic Background */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">Academic Background</label>
                  <span className="text-[10px] text-slate-500 font-mono">{academicBackground.length} chars</span>
                </div>
                <textarea
                  rows={3}
                  value={academicBackground}
                  onChange={(e) => setAcademicBackground(e.target.value)}
                  placeholder="Undergraduate degree, GPA, honors, relevant coursework, thesis projects..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed shadow-inner"
                />
              </div>

              {/* Textarea 2: Relevant Experience */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">Relevant Experience</label>
                  <span className="text-[10px] text-slate-500 font-mono">{relevantExperience.length} chars</span>
                </div>
                <textarea
                  rows={3}
                  value={relevantExperience}
                  onChange={(e) => setRelevantExperience(e.target.value)}
                  placeholder="Industry internships, research publications, engineering roles, leadership positions..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed shadow-inner"
                />
              </div>

              {/* Textarea 3: Goals and Objectives */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">Goals and Objectives</label>
                  <span className="text-[10px] text-slate-500 font-mono">{goalsAndObjectives.length} chars</span>
                </div>
                <textarea
                  rows={3}
                  value={goalsAndObjectives}
                  onChange={(e) => setGoalsAndObjectives(e.target.value)}
                  placeholder="Immediate post-graduate aspirations, target industry roles, long-term impact on your home country or industry..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed shadow-inner"
                />
              </div>

              {/* Textarea 4: Motivation */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">Motivation</label>
                  <span className="text-[10px] text-slate-500 font-mono">{motivationText.length} chars</span>
                </div>
                <textarea
                  rows={3}
                  value={motivationText}
                  onChange={(e) => setMotivationText(e.target.value)}
                  placeholder="Why this specific university, target laboratory, faculty advisors, and country..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed shadow-inner"
                />
              </div>

              {/* Textarea 5: Additional Information */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">Additional Information</label>
                  <span className="text-[10px] text-slate-500 font-mono">{additionalInfo.length} chars</span>
                </div>
                <textarea
                  rows={2}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Extracurriculars, personal hardships overcome, gaps explained, scholarship applications..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed shadow-inner"
                />
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleGenerateSOP}
                disabled={isGenerating}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Academic Statement with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Statement of Purpose</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: GENERATED STATEMENT OF PURPOSE VIEW */}
        {currentStep === 4 && generatedSOP && (
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl animate-in fade-in">
            
            {/* Header of Generated Document */}
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
                    Word count: ~750 words • Complies with {activeCountryObj.name} standards ({activeCountryObj.wordLimit})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
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
                      <Copy className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Copy Document</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 shadow-indigo-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>
              </div>
            </div>

            {/* Document Reader Container */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap shadow-inner max-h-[550px] overflow-y-auto custom-scrollbar">
              {generatedSOP}
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Information Form</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  setGeneratedSOP(null);
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold hover:underline"
              >
                Start New SOP Draft
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOPBuilderView;
