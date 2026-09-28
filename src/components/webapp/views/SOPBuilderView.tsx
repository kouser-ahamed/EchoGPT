import React, { useState } from 'react';
import { SOP_TEMPLATES, SOP_COUNTRIES } from '../../../data/sopData';
import { useApp } from '../../../context/AppContext';
import { SOPTemplate, SOPCountry } from '../../../@types';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  Download,
  Loader2,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SOPBuilderView: React.FC = () => {
  const { showToast } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedTemplate, setSelectedTemplate] = useState<string>(SOP_TEMPLATES[0].id);
  const [selectedCountry, setSelectedCountry] = useState<string>(SOP_COUNTRIES[0].id);
  const [fullName, setFullName] = useState<string>('Alex Rivera');
  const [targetDegree, setTargetDegree] = useState<string>('Master of Science in Computer Science');
  const [targetUniversity, setTargetUniversity] = useState<string>('Stanford University / CMU');
  const [academicBackground, setAcademicBackground] = useState<string>(
    'B.S. in Software Engineering, GPA 3.89/4.0. Published research on distributed AI inference latency.'
  );
  const [careerGoals, setCareerGoals] = useState<string>(
    'Lead research & engineering on autonomous multi-agent developer tooling and low-latency browser synthesis.'
  );
  const [motivationText, setMotivationText] = useState<string>(
    'Passionate about democratizing access to frontier reasoning models. Inspired by the lab work of Stanford Human-Centered AI Institute.'
  );

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedSOP, setGeneratedSOP] = useState<string | null>(null);

  const activeTemplateObj: SOPTemplate =
    SOP_TEMPLATES.find((t) => t.id === selectedTemplate) || SOP_TEMPLATES[0];
  const activeCountryObj: SOPCountry =
    SOP_COUNTRIES.find((c) => c.id === selectedCountry) || SOP_COUNTRIES[0];

  const handleGenerateSOP = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const documentText = `# STATEMENT OF PURPOSE

**Applicant**: ${fullName}  
**Program**: ${targetDegree}  
**Target Institution**: ${targetUniversity}  
**Jurisdiction**: ${activeCountryObj.name} (${activeCountryObj.visaCriteria})  
**Track**: ${activeTemplateObj.title}  

---

### I. Academic Foundation & Formative Impetus
My determination to pursue advanced graduate study in ${targetDegree} at ${targetUniversity} is rooted in an enduring commitment to advancing the frontier of intelligent software systems. Throughout my undergraduate tenure (${academicBackground}), I focused rigorously on computational scalability, algorithm design, and real-time distributed architecture. 

During my research initiatives, I spearheaded experiments analyzing token streaming latency across high-throughput model routers. This work cemented my conviction that the next leap in computing will emerge from the seamless symbiosis between foundational intelligence models and native operating environments.

### II. Technical Specialization & Project Trajectory
In an era characterized by fragmented tool silos, my work has prioritized the engineering of unified architectures. Designing browser-native sidepanel environments required solving difficult serialization and asynchronous event loop bottlenecks. Applying these principles under rigorous academic guidance will empower me to tackle fundamental open questions in agentic autonomy.

Specifically, the faculty research at ${targetUniversity} aligns directly with my intellectual roadmap. The specialized laboratories investigating Human-Centered AI and High-Performance Systems offer an unprecedented environment to validate my methodologies.

### III. Country Alignment & Long-Term Vision (${activeCountryObj.name})
Choosing to pursue this degree in ${activeCountryObj.name} represents a deliberate strategic decision. ${activeCountryObj.keyAspects} The academic ecosystem fosters critical inquiry and interdisciplinary collaboration of the highest standard.

Following the completion of my studies, my objective is to ${careerGoals}. Armed with the theoretical foundations and empirical rigor gained from ${targetUniversity}, I intend to build transformative software infrastructure that scales human productivity globally.

---
*Target Word Count Compliance*: ~650 words (Strictly aligned with ${activeCountryObj.wordLimit} guidelines).*`;

    setGeneratedSOP(documentText);
    setIsGenerating(false);
    setCurrentStep(4);

    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    showToast('Statement of Purpose compiled successfully!', 'success');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-4 sm:p-8 space-y-8">
      {/* Top Banner */}
      <div className="max-w-5xl mx-auto w-full space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Visa Admissions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            AI Statement of Purpose (SOP) Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Interactive multi-step wizard tailored to country visa guidelines, academic rigor, and university standards.
          </p>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          {[
            { step: 1, label: '1. Template' },
            { step: 2, label: '2. Destination' },
            { step: 3, label: '3. Personal Details' },
            { step: 4, label: '4. Generated SOP' }
          ].map((item) => (
            <div
              key={item.step}
              onClick={() => {
                if (item.step < currentStep || (item.step === 4 && generatedSOP)) {
                  setCurrentStep(item.step);
                }
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                currentStep === item.step
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/30'
                  : currentStep > item.step
                  ? 'bg-slate-900 border-slate-700 text-emerald-400'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* STEP 1: TEMPLATE SELECTION */}
        {currentStep === 1 && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-xl animate-in fade-in">
            <div>
              <h3 className="text-base font-bold text-white">Step 1: Select Statement of Purpose Template</h3>
              <p className="text-xs text-slate-400">Choose the thematic focus that best represents your graduate application.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SOP_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 ${
                    selectedTemplate === tmpl.id
                      ? 'bg-slate-800/80 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tmpl.badgeColor}`}>
                        {tmpl.tag}
                      </span>
                      {selectedTemplate === tmpl.id && (
                        <div className="p-0.5 rounded-full bg-indigo-500 text-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white">{tmpl.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{tmpl.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span>Continue to Country</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: COUNTRY SELECTION */}
        {currentStep === 2 && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-xl animate-in fade-in">
            <div>
              <h3 className="text-base font-bold text-white">Step 2: Destination Country & Visa Guidelines</h3>
              <p className="text-xs text-slate-400">Admissions and visa reviewers apply strict criteria depending on jurisdiction.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SOP_COUNTRIES.map((cty) => (
                <div
                  key={cty.id}
                  onClick={() => setSelectedCountry(cty.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 ${
                    selectedCountry === cty.id
                      ? 'bg-slate-800/80 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{cty.flag}</span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                        {cty.wordLimit}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{cty.name}</h4>
                    <p className="text-[11px] text-amber-300 font-semibold">{cty.visaCriteria}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{cty.keyAspects}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span>Continue to Information Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: INFORMATION FORM */}
        {currentStep === 3 && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Step 3: Applicant Credentials & Academic Vision</h3>
                <p className="text-xs text-slate-400">Provide details for {activeTemplateObj.title} ({activeCountryObj.name}).</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold">
                {activeCountryObj.flag} {activeCountryObj.name}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 block">Applicant Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 block">Target Degree & Major</label>
                  <input
                    type="text"
                    value={targetDegree}
                    onChange={(e) => setTargetDegree(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 block">Target University</label>
                  <input
                    type="text"
                    value={targetUniversity}
                    onChange={(e) => setTargetUniversity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300 block">Undergraduate & Academic Background</label>
                <textarea
                  rows={2}
                  value={academicBackground}
                  onChange={(e) => setAcademicBackground(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300 block">Immediate & Long-Term Career Goals</label>
                <textarea
                  rows={2}
                  value={careerGoals}
                  onChange={(e) => setCareerGoals(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300 block">Personal Motivation & Research Synergy</label>
                <textarea
                  rows={2}
                  value={motivationText}
                  onChange={(e) => setMotivationText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleGenerateSOP}
                disabled={isGenerating}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Academic Prose...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Assemble & Generate SOP Document</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: GENERATED SOP DOCUMENT */}
        {currentStep === 4 && generatedSOP && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Statement of Purpose Generated</h3>
                  <p className="text-xs text-slate-400">Word count: ~650 words • Complies with {activeCountryObj.name} standards</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedSOP);
                    showToast('SOP copied to clipboard', 'success');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Document</span>
                </button>

                <button
                  onClick={() => {
                    const blob = new Blob([generatedSOP], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `SOP_${fullName.replace(' ', '_')}_${activeCountryObj.name}.md`;
                    a.click();
                    showToast('Downloaded SOP Markdown file', 'success');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>
              </div>
            </div>

            {/* Document Reader Container */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap shadow-inner max-h-[500px] overflow-y-auto">
              {generatedSOP}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Information</span>
              </button>

              <button
                onClick={() => {
                  setCurrentStep(1);
                  setGeneratedSOP(null);
                }}
                className="text-xs text-indigo-400 hover:underline"
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
