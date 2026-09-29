import { Conversation } from '../@types';

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    title: 'React 19 Server Components Architecture',
    category: 'Engineering',
    dateGroup: 'Today',
    timestamp: '10:42 AM',
    pinned: true,
    modelId: 'claude-3-5-sonnet',
    messages: [
      {
        id: 'msg-1-1',
        role: 'user',
        content: 'Explain the mental model shift when migrating an existing React 18 SPA to React 19 Server Components. What are the key patterns for state management and data fetching?',
        timestamp: '10:42 AM',
      },
      {
        id: 'msg-1-2',
        role: 'assistant',
        modelId: 'claude-3-5-sonnet',
        timestamp: '10:43 AM',
        content: `### Architectural Paradigm Shift: React 18 to React 19 RSC

Moving from a client-rendered SPA to React 19 Server Components is fundamentally about **co-locating data acquisition with rendering** and shifting component execution to the build/server phase.

#### 1. The Component Topology Spectrum
In React 18, all components live in the browser bundle. In React 19, your component tree is divided across a boundary:

| Feature | React 18 SPA (Client) | React 19 Server Components (RSC) |
| :--- | :--- | :--- |
| **Execution Environment** | Browser only | Node.js / Edge runtime |
| **Data Fetching** | \`useEffect\` + \`fetch\` / TanStack Query | Direct \`async/await\` database calls |
| **Bundle Size Cost** | Included in JavaScript bundle | **0 KB** client bundle impact |
| **Interactive State** | \`useState\`, \`useReducer\`, DOM events | Not supported (Client leaves only) |

> **Key Rule of Thumb**: Keep data fetchers on the server, pass plain serializable JSON props down across the boundary, and isolate client interaction to leaf-node controls.`
      }
    ]
  },
  {
    id: 'conv-2',
    title: 'Nemotron MCP Tool Calling & Schema Orchestration',
    category: 'Engineering',
    dateGroup: 'Today',
    timestamp: '09:30 AM',
    pinned: true,
    modelId: 'nemotron-3-ultra',
    messages: [
      {
        id: 'msg-2-1',
        role: 'user',
        content: 'How does NVIDIA Nemotron 3 Ultra validate JSON schema contracts for MCP tool execution with sub-millisecond overhead?',
        timestamp: '09:30 AM',
      },
      {
        id: 'msg-2-2',
        role: 'assistant',
        modelId: 'nemotron-3-ultra',
        timestamp: '09:31 AM',
        content: `### Nemotron 3 Ultra Tool-Calling & Structured Decoding

Nemotron uses **hardware-accelerated constrained grammar sampling** over NVIDIA Blackwell Tensor Cores:

1. **Deterministic Grammar Masks**: Converts JSON Schema into a finite state automaton (FSA) prior to token prediction.
2. **Sub-40ms Response Time**: Zero token waste from ill-formatted JSON retry loops.
3. **Multi-Server MCP Routing**: Dispatches parallel tool calls across PostgreSQL, GitHub, and Slack servers simultaneously.`
      }
    ]
  },
  {
    id: 'conv-3',
    title: 'Competitor Analysis: Multi-Model AI Aggregators',
    category: 'Research',
    dateGroup: 'Today',
    timestamp: '09:15 AM',
    pinned: false,
    modelId: 'gpt-5-4',
    messages: [
      {
        id: 'msg-3-1',
        role: 'user',
        content: 'Conduct a quick SWOT analysis comparing EchoGPT against paying for standalone subscriptions separately.',
        timestamp: '09:15 AM',
      },
      {
        id: 'msg-3-2',
        role: 'assistant',
        modelId: 'gpt-5-4',
        timestamp: '09:16 AM',
        content: `### Strategic Comparison: EchoGPT Unified Workspace

| Aspect | Factors & Capabilities |
| :--- | :--- |
| **Strengths** | Unified workflow, split comparative testing, $12/mo vs $60/mo standalone cost |
| **Ergonomics** | Instant Chrome extension sidebar + full-screen studio |`
      }
    ]
  },
  {
    id: 'conv-4',
    title: 'DeepSeek Formal Mathematical Planar Graph Proof',
    category: 'Research',
    dateGroup: 'Yesterday',
    timestamp: 'Yesterday',
    pinned: false,
    modelId: 'deepseek-v4-pro',
    messages: [
      {
        id: 'msg-4-1',
        role: 'user',
        content: 'Provide a formal proof that every planar graph has a vertex of degree at most 5 using Euler formula.',
        timestamp: 'Yesterday',
      },
      {
        id: 'msg-4-2',
        role: 'assistant',
        modelId: 'deepseek-v4-pro',
        timestamp: 'Yesterday',
        content: `By Euler's formula $V - E + F = 2$. Since $2E \\geq 3F$, substitution yields $E \\leq 3V - 6$.
Sum of degrees is $2E \\leq 6V - 12 < 6V$. Hence $\\exists v$ with $\\deg(v) \\leq 5$. $\\blacksquare$`
      }
    ]
  },
  {
    id: 'conv-5',
    title: 'High-Throughput Web Workers Token Streaming',
    category: 'Engineering',
    dateGroup: 'Yesterday',
    timestamp: 'Yesterday',
    pinned: false,
    modelId: 'deepseek-v4-flash',
    messages: [
      {
        id: 'msg-5-1',
        role: 'user',
        content: 'How to implement zero-lag token stream rendering using dedicated Web Workers?',
        timestamp: 'Yesterday',
      },
      {
        id: 'msg-5-2',
        role: 'assistant',
        modelId: 'deepseek-v4-flash',
        timestamp: 'Yesterday',
        content: `Offload TextDecoder and Markdown chunk tokenization to a DedicatedWorker via Transferable ArrayBuffers to preserve 120fps UI render loop.`
      }
    ]
  },
  {
    id: 'conv-6',
    title: 'Autonomous Multi-Step Agentic Planning Pipeline',
    category: 'Engineering',
    dateGroup: 'Yesterday',
    timestamp: 'Yesterday',
    pinned: false,
    modelId: 'gpt-5-6-sol',
    messages: [
      {
        id: 'msg-6-1',
        role: 'user',
        content: 'Outline the execution tree for self-correcting autonomous coding agents.',
        timestamp: 'Yesterday',
      },
      {
        id: 'msg-6-2',
        role: 'assistant',
        modelId: 'gpt-5-6-sol',
        timestamp: 'Yesterday',
        content: `1. Goal Decomposition -> 2. Environment Verification -> 3. Patch Execution -> 4. Self-Correction Loop.`
      }
    ]
  },
  {
    id: 'conv-7',
    title: 'Summarize Stripe Platform Earnings & Take Rate',
    category: 'Finance',
    dateGroup: 'Previous 7 Days',
    timestamp: '3 days ago',
    pinned: false,
    modelId: 'gemini-3-8-flash',
    messages: [
      {
        id: 'msg-7-1',
        role: 'user',
        content: 'Summarize Stripe annual platform transaction metrics and AI billing adoption.',
        timestamp: '3 days ago',
      },
      {
        id: 'msg-7-2',
        role: 'assistant',
        modelId: 'gemini-3-8-flash',
        timestamp: '3 days ago',
        content: `Stripe surpassed $1.0 Trillion in total payment volume with 1,000+ AI startups utilizing meter-based usage billing APIs.`
      }
    ]
  },
  {
    id: 'conv-8',
    title: 'Mathematical Benchmark Optimization on Open Weights',
    category: 'Research',
    dateGroup: 'Previous 7 Days',
    timestamp: '4 days ago',
    pinned: false,
    modelId: 'qwen-3-8-27b',
    messages: [
      {
        id: 'msg-8-1',
        role: 'user',
        content: 'Compare Qwen 3.8 27B benchmark performance on GSM8K against Llama 3.3.',
        timestamp: '4 days ago',
      },
      {
        id: 'msg-8-2',
        role: 'assistant',
        modelId: 'qwen-3-8-27b',
        timestamp: '4 days ago',
        content: `Qwen 3.8 achieves 88.4% on GSM8K and 54.2% on MATH benchmarks, leading open-weights efficiency for STEM tasks.`
      }
    ]
  },
  {
    id: 'conv-9',
    title: 'EchoGPT Multi-Engine Orchestration & Routing Matrix',
    category: 'Engineering',
    dateGroup: 'Previous 7 Days',
    timestamp: '5 days ago',
    pinned: false,
    modelId: 'echogpt',
    messages: [
      {
        id: 'msg-9-1',
        role: 'user',
        content: 'Explain how EchoGPT dynamically dispatches user queries to the lowest-cost, highest-accuracy LLM.',
        timestamp: '5 days ago',
      },
      {
        id: 'msg-9-2',
        role: 'assistant',
        modelId: 'echogpt',
        timestamp: '5 days ago',
        content: `EchoGPT classifies query intent and routes coding to Claude 3.5 Sonnet, math to DeepSeek V4 Pro, and general search to Gemini 3.8 Flash.`
      }
    ]
  },
  {
    id: 'conv-10',
    title: 'High-Converting Cold Outreach Template for Seed Round',
    category: 'Writing',
    dateGroup: 'Older',
    timestamp: '2 weeks ago',
    pinned: false,
    modelId: 'claude-3-5-sonnet',
    messages: [
      {
        id: 'msg-10-1',
        role: 'user',
        content: 'Draft a short 100-word seed fundraising pitch.',
        timestamp: '2 weeks ago',
      },
      {
        id: 'msg-10-2',
        role: 'assistant',
        modelId: 'claude-3-5-sonnet',
        timestamp: '2 weeks ago',
        content: `Subject: 420% MoM ARR / EchoGPT seed round\n\nHighlighting $34k MRR and 45k+ active extension installs.`
      }
    ]
  },
  {
    id: 'conv-11',
    title: 'PostgreSQL Vector Search & HNSW Index Tuning',
    category: 'Engineering',
    dateGroup: 'Older',
    timestamp: '3 weeks ago',
    pinned: false,
    modelId: 'deepseek-v4-pro',
    messages: [
      {
        id: 'msg-11-1',
        role: 'user',
        content: 'How do m and ef_construction parameters impact recall vs memory in pgvector HNSW indexing?',
        timestamp: '3 weeks ago'
      },
      {
        id: 'msg-11-2',
        role: 'assistant',
        modelId: 'deepseek-v4-pro',
        timestamp: '3 weeks ago',
        content: 'Higher `ef_construction` enhances graph construction accuracy and recall at the expense of build latency.'
      }
    ]
  },
  {
    id: 'conv-12',
    title: 'Growth Marketing Strategy for Developer Tools',
    category: 'Marketing',
    dateGroup: 'Older',
    timestamp: '1 month ago',
    pinned: false,
    modelId: 'gpt-4o',
    messages: [
      {
        id: 'msg-12-1',
        role: 'user',
        content: 'What are the top 3 developer acquisition channels for zero-budget open-source tools?',
        timestamp: '1 month ago'
      },
      {
        id: 'msg-12-2',
        role: 'assistant',
        modelId: 'gpt-4o',
        timestamp: '1 month ago',
        content: '1. Launch on GitHub Trending & Hacker News Show HN\n2. Documentation-first SEO for exact error stack traces\n3. High-signal interactive interactive demos.'
      }
    ]
  },
  {
    id: 'conv-13',
    title: 'Model Context Protocol (MCP) Remote Auth Specs',
    category: 'Research',
    dateGroup: 'Older',
    timestamp: '1 month ago',
    pinned: false,
    modelId: 'nemotron-3-ultra',
    messages: [
      {
        id: 'msg-13-1',
        role: 'user',
        content: 'Explain OAuth2 bearer token delegation when proxying MCP servers through cloud gateways.',
        timestamp: '1 month ago'
      },
      {
        id: 'msg-13-2',
        role: 'assistant',
        modelId: 'nemotron-3-ultra',
        timestamp: '1 month ago',
        content: 'OAuth2 access tokens should be passed in the `Authorization: Bearer <token>` header of the JSON-RPC HTTP transport layer.'
      }
    ]
  },
  {
    id: 'conv-14',
    title: 'Executive Summary: Frontier LLM Benchmarks 2026',
    category: 'Analysis',
    dateGroup: 'Older',
    timestamp: '1 month ago',
    pinned: false,
    modelId: 'claude-3-5-sonnet',
    messages: [
      {
        id: 'msg-14-1',
        role: 'user',
        content: 'Compare token throughput and reasoning capability between Claude 3.5 Sonnet and DeepSeek V4.',
        timestamp: '1 month ago'
      },
      {
        id: 'msg-14-2',
        role: 'assistant',
        modelId: 'claude-3-5-sonnet',
        timestamp: '1 month ago',
        content: 'DeepSeek V4 dominates algorithmic math and coding competitive tests, while Claude 3.5 Sonnet leads in complex system architecture design.'
      }
    ]
  },
  {
    id: 'conv-15',
    title: 'Tailwind CSS v4 Oxide Engine Performance Review',
    category: 'Engineering',
    dateGroup: 'Older',
    timestamp: '2 months ago',
    pinned: false,
    modelId: 'gemini-1-5-pro',
    messages: [
      {
        id: 'msg-15-1',
        role: 'user',
        content: 'Why does Tailwind v4 no longer require tailwind.config.js and postcss.config.js?',
        timestamp: '2 months ago'
      },
      {
        id: 'msg-15-2',
        role: 'assistant',
        modelId: 'gemini-1-5-pro',
        timestamp: '2 months ago',
        content: 'Tailwind v4 is built on the Rust Oxide engine with pure CSS-first configuration via `@theme` directives, achieving sub-millisecond builds.'
      }
    ]
  }
];

