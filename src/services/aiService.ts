import { AIModel, ChatMessage } from '../@types/index';

export interface GenerationOptions {
  model: AIModel;
  userPrompt: string;
  conversationHistory?: ChatMessage[];
  codeContextActive?: boolean;
  webSearchActive?: boolean;
}

/**
 * Intelligent context-aware AI response resolver
 * Generates dynamic, realistic responses based on user prompt intent and selected model personality.
 */
export function generateRealisticAIResponse(options: GenerationOptions): string {
  const { model, userPrompt, codeContextActive, webSearchActive } = options;
  const prompt = userPrompt.trim();
  const lower = prompt.toLowerCase();
  const modelName = model.name;
  const isDeepSeek = model.id.includes('deepseek') || modelName.toLowerCase().includes('deepseek');
  const isClaude = model.id.includes('claude') || modelName.toLowerCase().includes('claude');
  const isGPT = model.id.includes('gpt') || modelName.toLowerCase().includes('gpt') || modelName.toLowerCase().includes('openai');
  const isNemotron = model.id.includes('nemotron') || modelName.toLowerCase().includes('nemotron') || modelName.toLowerCase().includes('nvidia');
  const isGemini = model.id.includes('gemini') || modelName.toLowerCase().includes('gemini');

  // Prefix personality nuance if applicable
  const getThinkingBlock = (): string => {
    if (isDeepSeek) {
      return `> **[DeepSeek Thinking Process]**\n> 1. Analyzed prompt token semantics and query intent.\n> 2. Formulating mathematically sound, high-throughput deduction.\n> 3. Synthesizing optimal answer with edge-case considerations.\n\n`;
    }
    return '';
  };

  // 1. GREETINGS & CASUAL PROMPTS
  if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|yo|sup|hiya|howdy)\b/i.test(lower) || lower === 'hi' || lower === 'hello') {
    if (isDeepSeek) {
      return `${getThinkingBlock()}Hello! I'm **${modelName}**, optimized for deep mathematical reasoning, algorithmic design, and high-throughput code synthesis.

How can I assist your workflow today? Feel free to ask me to:
- **Solve or optimize complex algorithms** (e.g., dynamic programming, distributed pipelines)
- **Refactor TypeScript / React components** with benchmarked performance
- **Analyze technical architectures** or debug tricky edge cases
- **Compare reasoning paths** against other models in Dual Split View`;
    }

    if (isClaude) {
      return `Hello! I'm **${modelName}**. I'm here to help with software architecture, comprehensive code review, nuanced problem solving, and clear technical communication.

Whether you're crafting a complex TypeScript application, designing an API schema, or brainstorming solutions, I'm ready. What are you working on today?`;
    }

    if (isNemotron) {
      return `Greetings! I'm **${modelName}**, NVIDIA's high-parameter reasoning and synthetic intelligence model.

I'm ready to assist with enterprise-grade computation, scalable system modeling, parallel workflows, and structured technical data. What problem can we solve together?`;
    }

    if (isGPT) {
      return `Hello! I'm **${modelName}**, ready to assist you. 

Whether you need full-stack code implementation, system architecture analysis, creative copywriting, or comparing model outputs side-by-side, feel free to ask! What would you like to explore?`;
    }

    if (isGemini) {
      return `Hello! I'm **${modelName}**, Google's multimodal intelligence engine. 

I excel at large context analysis, rapid real-time comprehension, and cross-modal synthesis. What project or query can I help you accelerate today?`;
    }

    return `Hello! I'm **${modelName}**, ready to assist you.

Whether you need code refactoring, system architecture analysis, creative writing, or comparing model outputs side-by-side, feel free to ask! What are we building or exploring today?`;
  }

  // 2. CAPABILITIES / "WHAT CAN YOU DO?"
  if (lower.includes('what can you do') || lower.includes('who are you') || lower.includes('help me') && prompt.length < 20) {
    return `${getThinkingBlock()}I am **${modelName}** powered by ${model.provider}. Through the **EchoGPT Workspace**, I offer frontier capabilities tailored for engineers, creators, and analysts:

### Core Capabilities
- **Advanced Code Generation & Review**: Modern TypeScript, React, Next.js, Node.js, Python, and SQL with clean documentation.
- **System Architecture & Design**: Microservices, Model Context Protocol (MCP) integrations, REST/GraphQL APIs, and database indexing.
- **Multimodal & Cross-Model Comparison**: Test prompts in **Split View** against Claude 3.5 Sonnet, DeepSeek V4 Pro, and Nemotron 3 Ultra.
- **Tool Automation**: Seamless connection to local and cloud MCP connectors (GitHub, PostgreSQL, Slack, Brave Search).

Try asking me to write a custom React hook, analyze a database query, or summarize a research article!`;
  }

  // 3. REACT / FRONTEND / TYPESCRIPT SPECIFIC PROMPTS
  if (lower.includes('react') || lower.includes('hook') || lower.includes('component') || lower.includes('debounce') || lower.includes('state') || lower.includes('next.js') || lower.includes('nextjs')) {
    if (lower.includes('debounce')) {
      return `${getThinkingBlock()}### Custom Debounce Hook in React with TypeScript

Here is a resilient, memory-leak-safe implementation of \`useDebounce\` utilizing standard React hooks:

\`\`\`typescript
import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any fast-changing value
 * @param value The raw input value
 * @param delayMs Debounce delay in milliseconds (default: 300ms)
 */
export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Schedule update after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    // Cancel timer on component unmount or if value changes before expiry
    return () => {
      clearTimeout(timer);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
\`\`\`

### Example Usage: Search Input
\`\`\`tsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      console.log('Dispatching network request for:', debouncedQuery);
      // Trigger API search
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search documentation or models..."
      className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
    />
  );
};
\`\`\`

> **Performance Tip**: By clearing the timer in the effect cleanup function, you guarantee zero stale state updates and prevent unnecessary API requests during rapid typing.`;
    }

    return `${getThinkingBlock()}### Clean TypeScript & React Solution with ${modelName}

Here is a modular, high-performance solution tailored to your specification:

\`\`\`tsx
import React, { useState, useCallback, useMemo } from 'react';

interface DataItem {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'completed';
}

interface FeatureProps {
  initialItems?: DataItem[];
  onItemSelect?: (item: DataItem) => void;
}

export const ModernDataList: React.FC<FeatureProps> = ({
  initialItems = [],
  onItemSelect
}) => {
  const [items] = useState<DataItem[]>(initialItems);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeCount = useMemo(() => {
    return items.filter((item) => item.status === 'active').length;
  }, [items]);

  const handleSelect = useCallback((item: DataItem) => {
    setSelectedId(item.id);
    onItemSelect?.(item);
  }, [onItemSelect]);

  return (
    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-100">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h4 className="font-bold text-white text-sm">System Pipeline Items</h4>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Active: {activeCount}
        </span>
      </div>

      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => handleSelect(item)}
            className={\`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between \${
              selectedId === item.id
                ? 'bg-indigo-600/20 border-indigo-500 text-white'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
            }\`}
          >
            <span className="font-medium">{item.title}</span>
            <span className="text-[10px] uppercase font-mono tracking-wider opacity-75">{item.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
\`\`\`

> **Architectural Tip**: Extracting callback references via \`useCallback\` and computing derived values with \`useMemo\` ensures that downstream child elements avoid redundant re-renders.`;
  }

  // 4. GENERAL CODING / PROGRAMMING / TECHNICAL INQUIRIES
  if (lower.includes('code') || lower.includes('function') || lower.includes('api') || lower.includes('typescript') || lower.includes('javascript') || lower.includes('python') || lower.includes('algorithm') || lower.includes('sql')) {
    return `${getThinkingBlock()}### Technical Implementation & Analysis (${modelName})

Addressing your inquiry: **"${prompt}"**

\`\`\`typescript
/**
 * Production-ready execution handler with exponential backoff
 */
interface ExecutionConfig {
  maxRetries: number;
  initialDelayMs: number;
  timeoutMs: number;
}

export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  config: ExecutionConfig = { maxRetries: 3, initialDelayMs: 300, timeoutMs: 5000 }
): Promise<T> {
  let attempt = 0;
  let delay = config.initialDelayMs;

  while (attempt < config.maxRetries) {
    try {
      // Race operation against configured timeout
      return await Promise.race([
        operation(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Operation timed out')), config.timeoutMs)
        )
      ]);
    } catch (error) {
      attempt++;
      if (attempt >= config.maxRetries) {
        throw new Error(\`Execution failed after \${attempt} attempts: \${(error as Error).message}\`);
      }
      // Exponential backoff with jitter
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }

  throw new Error('Unexpected execution termination');
}
\`\`\`

### Architectural Breakdown
1. **Resilience Boundary**: Wraps critical asynchronous operations in a timeout race to guarantee no hanging worker processes.
2. **Exponential Backoff**: Prevents cascading server load during rate limiting or transient microservice downtime.
3. **Type Safety**: Strictly typed with generics (\`T\`) ensuring seamless inference for return payloads.

> **Production Recommendation**: When integrating with external LLM inference endpoints or MCP servers, pair this with an idempotency key to prevent duplicated side-effects.`;
  }

  // 5. MCP (MODEL CONTEXT PROTOCOL) / CONNECTORS
  if (lower.includes('mcp') || lower.includes('model context protocol') || lower.includes('connector')) {
    return `${getThinkingBlock()}### Model Context Protocol (MCP) Architecture Breakdown

The **Model Context Protocol (MCP)** is an open standard designed to decouple language models from external data silos and execution environments.

\`\`\`
┌────────────────┐          JSON-RPC          ┌────────────────┐
│   EchoGPT Host │  ◄──────────────────────►  │   MCP Server   │
│ (Chat/Sidepanel│       STDIO / HTTPS        │(GitHub/DB/Web) │
└────────────────┘                            └────────────────┘
\`\`\`

### Three Core Concepts
1. **Host (EchoGPT Client)**: Coordinates user sessions, handles prompt routing, and requests tool capabilities from connected servers.
2. **MCP Server (Tool Provider)**: Exposes discrete tools (e.g. \`github_search_issues\`, \`postgres_query\`, \`brave_search\`) over standardized JSON-RPC schemas.
3. **Context Resources**: Allows the model to inspect live file trees, read database schemas, and trigger external webhooks without custom hardcoded glue code.

### Advantages in EchoGPT
- **Zero Vendor Lock-in**: Run self-hosted local tool servers over HTTPS without sharing credentials.
- **Dynamic Context Ingestion**: Models query only the slice of external data needed to answer your prompt.`;
  }

  // 6. SUMMARIZATION & ANALYSIS REQUESTS
  if (lower.includes('summarize') || lower.includes('summary') || lower.includes('break down') || lower.includes('analyze')) {
    return `${getThinkingBlock()}### Executive Synthesis by ${modelName}

Here is a structured, high-signal breakdown of your query:

### 1. Key Findings & Core Takeaways
- **Primary Objective**: Clarifying foundational requirements and isolating critical operational levers.
- **Efficiency Metric**: Consolidating modular pipelines reduces operational friction and multi-tool switching overhead by up to **65%**.
- **Implementation Path**: Start with an iterative baseline, benchmark performance, and systematically eliminate architectural bottlenecks.

### 2. Actionable Recommendations
| Priority | Action Item | Expected Impact |
| :--- | :--- | :--- |
| **P0 (Immediate)** | Standardize interfaces & types | Prevents cross-module runtime regressions |
| **P1 (Next)** | Implement automated verification | Guarantees deterministic output quality |
| **P2 (Strategic)** | Enable multi-model comparison | Optimizes cost vs reasoning trade-offs |

> **Pro Tip**: You can launch this topic into **Compare Mode** in EchoGPT to verify how Claude 3.5 Sonnet, DeepSeek V4 Pro, or GPT-5.4 assess these findings.`;
  }

  // 7. COMPARISONS / "VERSUS" / WHICH MODEL IS BETTER
  if (lower.includes('vs') || lower.includes('versus') || lower.includes('difference between') || lower.includes('which is better')) {
    return `${getThinkingBlock()}### Comparative Evaluation (${modelName})

Analyzing the key distinctions and trade-offs regarding: **"${prompt}"**

### Structural Comparison
1. **Latency & Throughput**:
   - Specialized lightweight models (e.g., DeepSeek Flash, Gemini Flash) offer blazing sub-50ms token generation for interactive workflows.
   - Frontier reasoning models (e.g., DeepSeek V4 Pro, Claude 3.7 Sonnet) invest compute in deliberate multi-step reasoning before outputting answers.

2. **Context Window vs Depth of Reasoning**:
   - High-context architectures excel at multi-document ingestion and large codebase analysis.
   - High-parameter reasoning architectures excel at algorithmic proofs, competitive programming, and formal verification.

3. **Recommendation**:
   - For rapid iterative coding: Use **Claude 3.5 Sonnet** or **DeepSeek V4 Pro**.
   - For high-volume drafting and general search: Use **EchoGPT Core** or **Gemini 1.5 Flash**.`;
  }

  // 8. GENERAL INTENTIONAL RESPONSE (DIRECT ANSWER)
  const contextNotes = [];
  if (codeContextActive) contextNotes.push('Codebase context enabled');
  if (webSearchActive) contextNotes.push('Web search synthesis active');

  return `${getThinkingBlock()}### Analysis & Response (${modelName})

${contextNotes.length > 0 ? `*Context: ${contextNotes.join(' · ')}*\n\n` : ''}Regarding your question: **"${prompt}"**

### Key Insights
1. **Core Perspective**: Addressing this requires understanding both the immediate requirements and the long-term scalability implications.
2. **Optimal Approach**: By breaking the problem down into discrete, testable steps, you minimize edge-case failures and maximize maintainability.
3. **Execution Plan**:
   - Validate input parameters and system boundaries.
   - Establish clean separation between orchestration logic and domain execution.
   - Monitor performance metrics continuously.

Would you like me to provide a concrete implementation, elaborate on architectural trade-offs, or compare this with an alternative approach?`;
}

/**
 * Splits a response string into natural token chunks for realistic streaming simulation
 */
export function splitIntoStreamChunks(text: string): string[] {
  // Break into natural chunks (2-5 words or punctuation boundaries)
  const regex = /([^\s\n]+[\s\n]+){1,3}/g;
  const chunks: string[] = [];
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    chunks.push(match[0]);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    chunks.push(text.slice(lastIndex));
  }

  return chunks.length > 0 ? chunks : [text];
}
