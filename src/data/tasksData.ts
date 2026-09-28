import { TaskCategory, TaskItem } from '../@types';

export const TASK_CATEGORIES: TaskCategory[] = ['Ideas', 'Work', 'Fun', 'Online Content'];

export const AI_TASKS: TaskItem[] = [
  // IDEAS
  {
    id: 'task-ideas-1',
    category: 'Ideas',
    title: 'Think Outside the Box',
    description: 'Break free from conventional thinking with lateral brainstorm exercises and disruptive perspectives.',
    promptTemplate: 'Challenge traditional assumptions about this problem and propose 5 radical, lateral, high-upside solutions:',
    icon: 'Lightbulb',
    color: 'from-amber-500 to-orange-500',
    popular: true
  },
  {
    id: 'task-ideas-2',
    category: 'Ideas',
    title: 'Startup Validation & Moat',
    description: 'Stress-test value proposition, target ICP, unit economics, and defensibility moats against incumbents.',
    promptTemplate: 'Evaluate this startup concept using Y-Combinator framework (Problem, Solution, Unfair Advantage, Go-to-Market):',
    icon: 'Rocket',
    color: 'from-indigo-500 to-purple-500',
    popular: true
  },
  {
    id: 'task-ideas-3',
    category: 'Ideas',
    title: 'Innovate and Elevate',
    description: 'Transform an existing product or service into a modern AI-first experience with exponential leverage.',
    promptTemplate: 'How can we redesign this legacy workflow using modern autonomous agentic AI and real-time streaming interfaces?',
    icon: 'Sparkles',
    color: 'from-cyan-500 to-blue-500',
    popular: false
  },
  {
    id: 'task-ideas-4',
    category: 'Ideas',
    title: 'Idea Sparks',
    description: 'Rapid-fire brainstorming generator producing 10 distinct creative concepts in seconds.',
    promptTemplate: 'Generate 10 divergent and compelling concept ideas for the following domain, ranked by feasibility and novelty:',
    icon: 'Zap',
    color: 'from-yellow-400 to-amber-500',
    popular: false
  },

  // WORK
  {
    id: 'task-work-1',
    category: 'Work',
    title: 'Executive Briefing Memo',
    description: 'Synthesize complex technical proposals into a crisp 1-page memo suitable for VP / C-Suite leadership.',
    promptTemplate: 'Draft a crisp, persuasive 1-page executive memo summarizing the business impact, risks, and ROI of:',
    icon: 'Briefcase',
    color: 'from-blue-600 to-indigo-600',
    popular: true
  },
  {
    id: 'task-work-2',
    category: 'Work',
    title: 'Meeting Transcript Summarizer',
    description: 'Extract decisions, action item owners, and hard deadlines from chaotic meeting notes.',
    promptTemplate: 'Extract key decisions, unresolved debates, and an action items table (Owner, Task, Deadline) from this meeting:',
    icon: 'CheckSquare',
    color: 'from-emerald-500 to-teal-600',
    popular: true
  },
  {
    id: 'task-work-3',
    category: 'Work',
    title: 'Code Review & Security Auditor',
    description: 'Identify potential vulnerabilities, performance bottlenecks, and architectural anti-patterns.',
    promptTemplate: 'Perform an exhaustive senior staff code review on this snippet, focusing on security, memory leaks, and concurrency:',
    icon: 'Shield',
    color: 'from-rose-500 to-red-600',
    popular: false
  },
  {
    id: 'task-work-4',
    category: 'Work',
    title: 'Bug Triager & Root Cause Analysis',
    description: 'Diagnose stack traces, deduce root cause, and write step-by-step reproduction instructions.',
    promptTemplate: 'Analyze this error log and stack trace. Deduce the exact root cause and provide the minimal patch to resolve it:',
    icon: 'FileCode',
    color: 'from-purple-600 to-pink-600',
    popular: false
  },

  // FUN
  {
    id: 'task-fun-1',
    category: 'Fun',
    title: 'Trivia Master Showdown',
    description: 'Host an engaging, fast-paced trivia round tailored to any topic with tiered difficulty levels.',
    promptTemplate: 'Act as a lively trivia host. Give me 5 fascinating questions with multiple choice options about:',
    icon: 'Gamepad2',
    color: 'from-pink-500 to-rose-500',
    popular: true
  },
  {
    id: 'task-fun-2',
    category: 'Fun',
    title: 'Creative Sci-Fi Storyteller',
    description: 'Generate immersive cinematic narratives with vivid imagery, suspense, and unexpected plot twists.',
    promptTemplate: 'Write an atmospheric hard sci-fi short story exploring the philosophical implications of:',
    icon: 'BookOpen',
    color: 'from-violet-500 to-purple-600',
    popular: false
  },
  {
    id: 'task-fun-3',
    category: 'Fun',
    title: 'RPG Dungeon Master',
    description: 'Run an interactive text-based role-playing quest with inventory management and choices.',
    promptTemplate: 'You are the Dungeon Master. Set up an immersive dark-fantasy quest opening and offer me 3 initial actions:',
    icon: 'Compass',
    color: 'from-amber-600 to-orange-700',
    popular: false
  },
  {
    id: 'task-fun-4',
    category: 'Fun',
    title: 'Philosophical Debate Challenger',
    description: 'Engage in rigorous Socratic debate defending counter-intuitive ethical positions.',
    promptTemplate: 'Take the opposing stance on this thesis and present 3 rigorous philosophical arguments against it:',
    icon: 'MessageCircle',
    color: 'from-cyan-600 to-teal-700',
    popular: false
  },

  // ONLINE CONTENT
  {
    id: 'task-content-1',
    category: 'Online Content',
    title: 'Viral X / Twitter Threads',
    description: 'Turn deep technical knowledge into high-retention, punchy thread hooks with strong engagement.',
    promptTemplate: 'Write a high-retention 5-tweet thread explaining this concept. Include a curiosity hook, bulleted insights, and conclusion:',
    icon: 'Share2',
    color: 'from-sky-500 to-blue-600',
    popular: true
  },
  {
    id: 'task-content-2',
    category: 'Online Content',
    title: 'YouTube Video Scripts',
    description: 'Engaging video scripts with 5-second hook, retention loops, visual cue descriptions, and clear CTA.',
    promptTemplate: 'Draft an engaging 8-minute YouTube video script with timestamped sections, B-roll directions, and voiceover text on:',
    icon: 'Video',
    color: 'from-red-500 to-rose-600',
    popular: true
  },
  {
    id: 'task-content-3',
    category: 'Online Content',
    title: 'TikTok Posts & Concept',
    description: 'Fast-paced, entertaining short-form concepts built for the 9:16 smartphone vertical format.',
    promptTemplate: 'Create 3 viral 30-second TikTok concepts with visual hooks, text overlays, and audio suggestions for:',
    icon: 'Smartphone',
    color: 'from-purple-500 to-indigo-600',
    popular: false
  },
  {
    id: 'task-content-4',
    category: 'Online Content',
    title: 'TikTok Captions & Hashtags',
    description: 'Optimized short-form captions with trending keywords, emoji rhythm, and high-search tags.',
    promptTemplate: 'Write 5 compelling TikTok captions with emoji formatting and high-reach algorithmic hashtags for:',
    icon: 'Tag',
    color: 'from-fuchsia-500 to-pink-600',
    popular: false
  },
  {
    id: 'task-content-5',
    category: 'Online Content',
    title: 'Instagram Carousel Content',
    description: 'Educational slide-by-slide carousel copy formatted for high save-rate and shares.',
    promptTemplate: 'Create an 8-slide educational Instagram carousel outline with punchy headers, body copy, and CTA slide on:',
    icon: 'Layers',
    color: 'from-amber-500 to-pink-500',
    popular: true
  },
  {
    id: 'task-content-6',
    category: 'Online Content',
    title: 'Instagram Reels Script',
    description: '15-second to 60-second micro-scripts with visual transitions and audio trend guidance.',
    promptTemplate: 'Write a 30-second Instagram Reel script with exact speaking pace, text on screen, and visual direction on:',
    icon: 'Play',
    color: 'from-rose-500 to-orange-500',
    popular: false
  },
  {
    id: 'task-content-7',
    category: 'Online Content',
    title: 'LinkedIn Thought Leadership',
    description: 'Professional, authentic career stories and industry analysis formatted with clean whitespace.',
    promptTemplate: 'Write an authentic, narrative-driven LinkedIn thought leadership post sharing lessons learned regarding:',
    icon: 'Linkedin',
    color: 'from-blue-600 to-indigo-700',
    popular: true
  },
  {
    id: 'task-content-8',
    category: 'Online Content',
    title: 'LinkedIn Job Search Outreach',
    description: 'High-converting personalized networking messages to recruiters and engineering managers.',
    promptTemplate: 'Draft a respectful, personalized 75-word LinkedIn DM to an engineering hiring manager expressing interest in:',
    icon: 'Send',
    color: 'from-cyan-600 to-blue-700',
    popular: false
  }
];
