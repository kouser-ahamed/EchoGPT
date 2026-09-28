export interface SOPTemplate {
  id: string;
  title: string;
  description: string;
  tag: string;
  badgeColor: string;
}

export interface SOPCountry {
  id: string;
  name: string;
  flag: string;
  wordLimit: string;
  visaCriteria: string;
  keyAspects: string;
  rules: string[];
}

export const SOP_TEMPLATES: SOPTemplate[] = [
  {
    id: 'academic',
    title: 'Academic Excellence',
    description: 'Emphasizes coursework mastery, scholarly achievements, top grades, and faculty collaborations.',
    tag: 'Standard Master/PhD',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
  },
  {
    id: 'professional',
    title: 'Professional Track',
    description: 'Highlights real-world industry impact, leadership, product shipments, and clear MBA / Executive ROI.',
    tag: 'Applied Master / MBA',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'research',
    title: 'Research Focus',
    description: 'Spotlights experimental methodology, lab work, publications, and specific professor laboratory synergy.',
    tag: 'Thesis / Doctorate',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  },
  {
    id: 'creative',
    title: 'Creative Portfolio',
    description: 'Narrative-driven personal statement celebrating unique artistic vision, multidisciplinary design, and voice.',
    tag: 'Arts / Design / Arch',
    badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/30'
  }
];

export const SOP_COUNTRIES: SOPCountry[] = [
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    wordLimit: '600 - 1,000 words',
    visaCriteria: 'F-1 Student Visa Focus',
    keyAspects: 'Emphasizes personal initiative, extracurricular leadership, resilience, and unique perspective.',
    rules: ['Holistic personal narrative', 'Faculty interest mentions', 'Clear long-term career impact']
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    wordLimit: '500 - 800 words',
    visaCriteria: 'Student Route (Tier 4)',
    keyAspects: 'Direct academic focus with strict course syllabus relevance and independent critical inquiry.',
    rules: ['75% academic / 25% personal', 'Exact module alignment', 'Demonstrated literature review']
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    wordLimit: '800 - 1,200 words',
    visaCriteria: 'IRCC Study Permit Guidelines',
    keyAspects: 'Must explicitly demonstrate economic logic, study rationale, and strong home country ties.',
    rules: ['Clear financial justification', 'Why Canada over home country', 'Post-graduation trajectory']
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    wordLimit: '600 - 900 words',
    visaCriteria: 'Genuine Student (GS) Criterion',
    keyAspects: 'Rigorous justification of course choice, remuneration increase prospects, and financial readiness.',
    rules: ['Salary uplift calculations', 'University comparison matrix', 'Genuine temporary intent']
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    wordLimit: '500 - 750 words',
    visaCriteria: 'German National Student Visa',
    keyAspects: 'Precision alignment between undergraduate ECTS credit syllabus and target Master curriculum.',
    rules: ['Strict factual tone', 'Prerequisite credit matching', 'No generic emotional fluff']
  },
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    wordLimit: '600 - 800 words',
    visaCriteria: 'Campus France / VLS-TS Visa',
    keyAspects: 'Intercultural adaptability, European academic project cohesion, and language preparedness.',
    rules: ['Campus France coherency', 'Career plan timeline', 'European market integration']
  }
];
