export interface QuickAction {
  id: string;
  title: string;
  shortLabel: string;
  icon: string;
  promptTemplate: string;
  color: string;
}

export interface StarterPrompt {
  category: string;
  title: string;
  prompt: string;
  modelId: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'summarize',
    title: 'Summarize Key Takeaways',
    shortLabel: 'Summarize',
    icon: 'ListFilter',
    promptTemplate: 'Please summarize the main ideas, key metrics, and critical takeaways from this text into 3-5 concise bullet points:',
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
  },
  {
    id: 'explain-code',
    title: 'Explain Code & Logic',
    shortLabel: 'Explain Code',
    icon: 'Code2',
    promptTemplate: 'Analyze this code snippet line by line. Explain the algorithm, time/space complexity, and identify any edge cases or potential vulnerabilities:',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  },
  {
    id: 'improve-writing',
    title: 'Improve Tone & Polish',
    shortLabel: 'Polish Writing',
    icon: 'PenTool',
    promptTemplate: 'Rewrite the following text to make it clear, punchy, persuasive, and professional, maintaining a natural human voice:',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
  },
  {
    id: 'brainstorm',
    title: 'Brainstorm Ideas',
    shortLabel: 'Brainstorm',
    icon: 'Lightbulb',
    promptTemplate: 'Brainstorm 5 innovative, unconventional, and high-impact ideas for the following challenge or product concept:',
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
  },
  {
    id: 'translate',
    title: 'Translate & Localize',
    shortLabel: 'Translate',
    icon: 'Languages',
    promptTemplate: 'Translate the following content into fluent, idiomatic English (or target language), preserving formatting and emotional nuance:',
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
  },
  {
    id: 'action-items',
    title: 'Extract Action Items',
    shortLabel: 'Action Items',
    icon: 'CheckSquare',
    promptTemplate: 'Extract all action items, owners, deadlines, and follow-ups from the following meeting transcript or notes:',
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
  }
];

export const STARTER_PROMPTS: StarterPrompt[] = [
  {
    category: 'Engineering',
    title: 'Refactor to React 19 useActionState',
    prompt: 'Show me an example of replacing a traditional useState and useEffect form submission with React 19 useActionState hook, including error states and pending indicator.',
    modelId: 'claude-3-5-sonnet'
  },
  {
    category: 'Research',
    title: 'Compare Vector DB vs Graph RAG',
    prompt: 'Compare Vector Similarity Search vs Knowledge Graph RAG for multi-hop enterprise reasoning. When should engineering teams adopt Graph RAG?',
    modelId: 'gpt-4o'
  },
  {
    category: 'Productivity',
    title: 'Chrome Side Panel Architecture',
    prompt: 'How does Chrome Manifest V3 Sidepanel API work compared to traditional background content scripts? Give code snippet for manifest.json and service_worker.js.',
    modelId: 'gemini-1-5-pro'
  },
  {
    category: 'Logic & Reasoning',
    title: 'Solve Logic Puzzle with DeepSeek',
    prompt: 'A farmer must transport a wolf, a goat, and a cabbage across a river in a boat that can only hold himself and one item. Provide step-by-step logic.',
    modelId: 'deepseek-v4-flash'
  }
];
