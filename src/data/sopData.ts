import { SOPTemplate, SOPCountry } from '../@types';

export const SOP_TEMPLATES: SOPTemplate[] = [
  {
    id: 'academic',
    title: 'Academic Excellence',
    description: 'Emphasizes coursework mastery, scholarly achievements, top grades, and faculty collaborations.',
    tag: 'Academic',
    tags: ['Academic', 'Graduate Studies', 'Scholarships'],
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    icon: 'GraduationCap'
  },
  {
    id: 'professional',
    title: 'Professional Track',
    description: 'Highlights real-world industry impact, leadership, product shipments, and clear MBA / Executive ROI.',
    tag: 'Career',
    tags: ['Career', 'Professional Development', 'MBA'],
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: 'Briefcase'
  },
  {
    id: 'research',
    title: 'Research Focused',
    description: 'Spotlights experimental methodology, lab work, publications, and specific professor laboratory synergy.',
    tag: 'Research',
    tags: ['Research', 'PhD', 'Innovation'],
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    icon: 'FlaskConical'
  },
  {
    id: 'creative',
    title: 'Creative Arts / Creative Portfolio',
    description: 'Narrative-driven personal statement celebrating unique artistic vision, multidisciplinary design, and voice.',
    tag: 'Creative',
    tags: ['Creative', 'Arts', 'Portfolio'],
    badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    icon: 'Palette'
  }
];

export const SOP_COUNTRIES: SOPCountry[] = [
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    visaType: 'F-1 Student Visa',
    visaCriteria: 'F-1 Student Visa',
    wordLimit: '500–1000 words',
    processingTime: '3–5 weeks',
    keyAspects: 'Emphasizes personal initiative, extracurricular leadership, resilience, and unique perspective.',
    rules: ['Holistic personal narrative', 'Faculty interest mentions', 'Clear long-term career impact'],
    requirements: ['Holistic personal narrative', 'Faculty interest mentions', 'Clear long-term career impact']
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    visaType: 'Student Visa Tier 4',
    visaCriteria: 'Student Visa Tier 4',
    wordLimit: '500–1000 words',
    processingTime: '3 weeks',
    keyAspects: 'Direct academic focus with strict course syllabus relevance and independent critical inquiry.',
    rules: ['75% academic / 25% personal', 'Exact module alignment', 'Demonstrated literature review'],
    requirements: ['75% academic / 25% personal', 'Exact module alignment', 'Demonstrated literature review']
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    visaType: 'Study Permit',
    visaCriteria: 'Study Permit',
    wordLimit: '500–1000 words',
    processingTime: '4–6 weeks',
    keyAspects: 'Must explicitly demonstrate economic logic, study rationale, and strong home country ties.',
    rules: ['Clear financial justification', 'Why Canada over home country', 'Post-graduation trajectory'],
    requirements: ['Clear financial justification', 'Why Canada over home country', 'Post-graduation trajectory']
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    visaType: 'Student Visa Subclass 500',
    visaCriteria: 'Student Visa Subclass 500',
    wordLimit: '300–500 words',
    processingTime: '4–6 weeks',
    keyAspects: 'Rigorous justification of course choice, remuneration increase prospects, and financial readiness.',
    rules: ['Salary uplift calculations', 'University comparison matrix', 'Genuine temporary intent'],
    requirements: ['Salary uplift calculations', 'University comparison matrix', 'Genuine temporary intent']
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    visaType: 'Student Visa National Visa',
    visaCriteria: 'Student Visa National Visa',
    wordLimit: '500–750 words',
    processingTime: '6–8 weeks',
    keyAspects: 'Precision alignment between undergraduate ECTS credit syllabus and target Master curriculum.',
    rules: ['Strict factual tone', 'Prerequisite credit matching', 'No generic emotional fluff'],
    requirements: ['Strict factual tone', 'Prerequisite credit matching', 'No generic emotional fluff']
  },
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    visaType: 'Student Visa VLS-TS',
    visaCriteria: 'Student Visa VLS-TS',
    wordLimit: '500–1000 words',
    processingTime: '3–4 weeks',
    keyAspects: 'Intercultural adaptability, European academic project cohesion, and language preparedness.',
    rules: ['Campus France coherency', 'Career plan timeline', 'European market integration'],
    requirements: ['Campus France coherency', 'Career plan timeline', 'European market integration']
  }
];
