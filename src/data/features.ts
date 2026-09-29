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
    title: 'Multi-Model Routing',
    tag: 'Core Orchestrator',
    description: 'Intelligently route every prompt to the best-performing frontier AI—GPT-4o, Claude 3.5 Sonnet, DeepSeek V4, or Gemini—without managing fragmented subscriptions.',
    highlight: '6+ State-of-the-Art LLMs in One Account',
    icon: 'Layers',
    gradient: 'from-indigo-500 to-purple-600',
    stats: '1 Login • 6+ Frontier Engines'
  },
  {
    id: 'split-compare',
    title: 'Side-by-Side Dual AI Comparison',
    tag: 'Dual Verification',
    description: 'Broadcast one prompt to two different models simultaneously. Compare outputs side-by-side to catch hallucinations, verify code logic, and pick the best response.',
    highlight: 'Dual Stream Evaluation',
    icon: 'Columns2',
    gradient: 'from-amber-500 to-orange-600',
    stats: '2x Verification Speed'
  },
  {
    id: 'context-memory',
    title: 'Continuous Context Memory',
    tag: 'Context Retention',
    description: 'Maintain deep conversational memory across multi-turn workflows. Switch models mid-chat without losing token history, system instructions, or code references.',
    highlight: '1M+ Unified Token Memory Window',
    icon: 'Brain',
    gradient: 'from-purple-500 to-pink-600',
    stats: '100% Context Retention'
  },
  {
    id: 'mcp-tools',
    title: 'Tool Integration (MCP)',
    tag: 'Model Context Protocol',
    description: 'Plug frontier models directly into databases, GitHub repos, Slack channels, and live REST APIs via the open Model Context Protocol (MCP) standard.',
    highlight: 'Secure Local & Remote MCP Endpoints',
    icon: 'Cpu',
    gradient: 'from-emerald-500 to-teal-600',
    stats: 'Instant API & DB Connectors'
  },
  {
    id: 'chrome-sidebar',
    title: 'Instant Sidepanel Access',
    tag: 'Browser Native',
    description: 'Dock EchoGPT alongside any web tab via Chrome Manifest V3 Sidepanel API. Summarize web pages, explain documentation, and draft emails with Alt+E.',
    highlight: 'Instant Hotkey: Alt+E / Ctrl+Shift+E',
    icon: 'Chrome',
    gradient: 'from-cyan-500 to-blue-600',
    stats: '5.0★ Chrome Web Store'
  },
  {
    id: 'privacy-security',
    title: 'Privacy-First Architecture',
    tag: 'Enterprise Grade',
    description: 'We never train public models on your proprietary prompts or codebase. Enjoy encrypted transit (TLS 1.3), local storage sovereignty, and BYOK support.',
    highlight: 'Zero-Retention Model Training Guarantee',
    icon: 'ShieldCheck',
    gradient: 'from-violet-500 to-indigo-600',
    stats: 'Zero Data Retention'
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
