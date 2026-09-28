export interface CoreFeature {
  id: string;
  title: string;
  tag: string;
  description: string;
  highlight: string;
  icon: string;
  gradient: string;
  stats: string;
}

export interface ComparisonRow {
  feature: string;
  echoGpt: boolean | string;
  chatGptPlus: boolean | string;
  claudePro: boolean | string;
  fragmentedTabs: boolean | string;
}

export const CORE_FEATURES: CoreFeature[] = [
  {
    id: 'multi-model',
    title: 'Frontier Multi-Model Workspace',
    tag: 'Core Engine',
    description: 'Switch instantly between GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.3, and DeepSeek-R1 without jumping between disjointed tabs and billing portals.',
    highlight: '6+ State-of-the-Art LLMs in One Account',
    icon: 'Layers',
    gradient: 'from-indigo-500 to-purple-600',
    stats: '1 Login • 6 LLMs'
  },
  {
    id: 'chrome-sidebar',
    title: 'Chrome Extension Sidepanel',
    tag: 'Browser Native',
    description: 'Dock EchoGPT alongside your active browser tab via Manifest V3 Sidepanel API. Summarize web pages, explain documentation, or draft emails with simple keyboard shortcuts.',
    highlight: 'Instant Hotkey: Ctrl+Shift+E / ⌘+Shift+E',
    icon: 'Chrome',
    gradient: 'from-cyan-500 to-blue-600',
    stats: '5.0★ Chrome Web Store'
  },
  {
    id: 'split-compare',
    title: 'Real-Time Model Comparison',
    tag: 'Productivity Superpower',
    description: 'Send one prompt to two different models simultaneously. Compare outputs side-by-side to verify accuracy, benchmark coding solutions, and identify optimal answers.',
    highlight: 'Dual Stream Evaluation',
    icon: 'Columns2',
    gradient: 'from-amber-500 to-orange-600',
    stats: '2x Verification Speed'
  },
  {
    id: 'page-context',
    title: 'Contextual Web Intelligence',
    tag: 'Smart Reading',
    description: 'Highlight any text or let EchoGPT automatically ingest the current webpage article or documentation. Get precise explanations and bulleted executive takeaways in seconds.',
    highlight: 'Zero Copy-Pasting Required',
    icon: 'FileText',
    gradient: 'from-emerald-500 to-teal-600',
    stats: 'One-Click Page Summary'
  },
  {
    id: 'prompt-library',
    title: 'Curated Prompt Blueprints',
    tag: 'Workflow Automation',
    description: 'Access built-in one-click actions: Rewrite, Explain Code, Translate, Summarize, and Tone Polisher. Save your own custom team prompts with variable interpolations.',
    highlight: '50+ High-Yield Engineering Blueprints',
    icon: 'Sparkles',
    gradient: 'from-rose-500 to-pink-600',
    stats: '1-Click Shortcuts'
  },
  {
    id: 'privacy-security',
    title: 'Zero-Retention Privacy by Default',
    tag: 'Enterprise Grade',
    description: 'We never train public models on your confidential prompts or codebase context. Complete local storage control, encrypted transit, and optional API key bring-your-own mode.',
    highlight: 'GDPR & SOC2 Ready Infrastructure',
    icon: 'ShieldCheck',
    gradient: 'from-violet-500 to-indigo-600',
    stats: 'End-to-End HTTPS'
  }
];

export const COMPARISON_MATRIX: ComparisonRow[] = [
  {
    feature: 'Top-tier Frontier Models (GPT-4o, Claude 3.5, Gemini)',
    echoGpt: true,
    chatGptPlus: 'Only OpenAI',
    claudePro: 'Only Anthropic',
    fragmentedTabs: 'Requires 3+ Logins'
  },
  {
    feature: 'Monthly Cost for All Models',
    echoGpt: '$9.99 / month',
    chatGptPlus: '$20 / month',
    claudePro: '$20 / month',
    fragmentedTabs: '$60+ / month'
  },
  {
    feature: 'Native Chrome Sidebar (Sidepanel API)',
    echoGpt: true,
    chatGptPlus: false,
    claudePro: false,
    fragmentedTabs: false
  },
  {
    feature: 'Side-by-Side Dual Model Comparison',
    echoGpt: true,
    chatGptPlus: false,
    claudePro: false,
    fragmentedTabs: false
  },
  {
    feature: 'Instant Webpage Summarization & Highlight Explain',
    echoGpt: true,
    chatGptPlus: false,
    claudePro: false,
    fragmentedTabs: false
  },
  {
    feature: 'Unified Search & Conversation Archive',
    echoGpt: true,
    chatGptPlus: 'OpenAI only',
    claudePro: 'Claude only',
    fragmentedTabs: 'Fragmented'
  },
  {
    feature: 'Bring-Your-Own API Key Option',
    echoGpt: true,
    chatGptPlus: false,
    claudePro: false,
    fragmentedTabs: false
  }
];
