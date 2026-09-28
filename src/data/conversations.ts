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

#### 2. Pattern: Server Data Fetching with Direct Database Access
Instead of spinning up intermediate REST/GraphQL endpoints, your Server Components directly query the database securely:

\`\`\`tsx
// app/dashboard/page.tsx (Server Component by default)
import { db } from '@/lib/db';
import { MetricsGrid } from './MetricsGrid'; // Client or Server

export default async function DashboardPage({ params }: { params: { orgId: string } }) {
  // Direct async query executed on server - no API waterfall
  const [metrics, recentLogs] = await Promise.all([
    db.analytics.getSummary(params.orgId),
    db.auditLogs.findRecent({ limit: 10 })
  ]);

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Workspace Overview</h1>
      <MetricsGrid initialData={metrics} />
    </main>
  );
}
\`\`\`

#### 3. State Management & Server Actions
For interactive mutations, use Server Actions with \`useActionState\` and \`useOptimistic\`:

\`\`\`tsx
// 'use client' boundary component
'use client';
import { useOptimistic } from 'react';
import { updateWorkspaceName } from '@/actions/workspace';

export function RenameWorkspaceForm({ currentName }: { currentName: string }) {
  const [optimisticName, setOptimisticName] = useOptimistic(
    currentName,
    (state, newName: string) => newName
  );

  return (
    <form action={async (formData) => {
      const newName = formData.get('name') as string;
      setOptimisticName(newName);
      await updateWorkspaceName(newName);
    }}>
      <input name="name" defaultValue={optimisticName} />
      <button type="submit">Save</button>
    </form>
  );
}
\`\`\`

> **Key Rule of Thumb**: Keep data fetchers on the server, pass plain serializable JSON props down across the boundary, and isolate client interaction to leaf-node controls.`
      }
    ]
  },
  {
    id: 'conv-2',
    title: 'Competitor Analysis: Multi-Model AI Aggregators',
    category: 'Research',
    dateGroup: 'Today',
    timestamp: '09:15 AM',
    pinned: true,
    modelId: 'gpt-4o',
    messages: [
      {
        id: 'msg-2-1',
        role: 'user',
        content: 'Conduct a quick SWOT analysis comparing EchoGPT (unified web app + Chrome extension sidebar) against paying for standalone ChatGPT Plus, Claude Pro, and Gemini Advanced separately.',
        timestamp: '09:15 AM',
      },
      {
        id: 'msg-2-2',
        role: 'assistant',
        modelId: 'gpt-4o',
        timestamp: '09:16 AM',
        content: `### Strategic Comparison: EchoGPT Unified Workspace vs. Fragmented Standalone Subscriptions

Here is a comprehensive breakdown for a modern knowledge worker or development team choosing their AI stack:

#### 1. Economic Comparison
- **Standalone Subscriptions**:
  - ChatGPT Plus: **$20/mo**
  - Claude Pro: **$20/mo**
  - Gemini Advanced: **$20/mo**
  - **Total Cost**: **$60/month per seat** ($720/year) across 3 disconnected browser tabs.
- **EchoGPT Pro**:
  - Unified access to GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.3, and DeepSeek-R1.
  - **Total Cost**: **$12/month** (Savings of over **$576/year** per user).

#### 2. SWOT Matrix for EchoGPT

| Aspect | Factors & Capabilities |
| :--- | :--- |
| **Strengths (S)** | • **Unified Workflow**: No tab hopping or re-authenticating across 4 separate tabs.<br>• **Chrome Extension Sidebar**: Instant webpage summarization and contextual text explanations via \`Ctrl+Shift+E\`.<br>• **Split-View Comparison**: Test which model gives the best answer with a single click.<br>• **Centralized History**: All prompts, conversations, and bookmarks organized in one place. |
| **Weaknesses (W)** | • Frontier native features (like OpenAI custom GPTs store) require specialized API configurations.<br>• Subject to upstream model provider rate allocations. |
| **Opportunities (O)** | • Team collaborative workspaces with shared prompt repositories.<br>• Local LLM integration (Ollama / LM Studio) for 100% offline edge privacy. |
| **Threats (T)** | • First-party model providers bundling browser integrations (e.g. Chrome + Gemini). |

#### Core Takeaway
For productivity power users, developers, and researchers who need different models for different tasks (e.g. Claude for code, Gemini for long documents, GPT-4o for vision), **EchoGPT provides a superior ergonomic experience at 80% lower cost**.`
      }
    ]
  },
  {
    id: 'conv-3',
    title: 'Summarize Stripe Platform Earnings & Take Rate',
    category: 'Finance',
    dateGroup: 'Yesterday',
    timestamp: 'Yesterday',
    pinned: false,
    modelId: 'gemini-1-5-pro',
    messages: [
      {
        id: 'msg-3-1',
        role: 'user',
        content: 'Summarize the core takeaways from the Stripe annual letter regarding payment volume, Connect ecosystem growth, and AI billing integration.',
        timestamp: 'Yesterday, 3:30 PM',
      },
      {
        id: 'msg-3-2',
        role: 'assistant',
        modelId: 'gemini-1-5-pro',
        timestamp: 'Yesterday, 3:32 PM',
        content: `### Executive Summary: Stripe Annual Metrics & AI Growth Engine

Based on the latest shareholder report and platform performance data:

1. **Total Payment Volume (TPV)**:
   - Surpassed **$1.0 Trillion** in total payment volume, representing approximately 1% of global GDP transactions.
   - Robust year-over-year organic volume growth of **25%** amidst macroeconomic headwinds.

2. **AI & Agentic Commerce Acceleration**:
   - Over **1,000+ venture-backed AI startups** run their billing infrastructures on Stripe Billing and Stripe Tax.
   - Launch of specialized token-usage meter billing models and recurring subscription orchestration for dynamic compute tiers.

3. **Stripe Connect & Embedded Financial Services**:
   - Over **80% of top platforms** (Shopify, Substack, DoorDash) leverage Connect for automated split-payouts and multi-jurisdictional compliance.
   - Capital issuance and issuing volume grew by **34% YoY**, providing instant liquidity to marketplace SMBs.`
      }
    ]
  },
  {
    id: 'conv-4',
    title: 'DeepSeek-R1 Math Proof: Prime Distribution',
    category: 'Mathematics',
    dateGroup: 'Previous 7 Days',
    timestamp: '4 days ago',
    pinned: false,
    modelId: 'deepseek-v4-pro',
    messages: [
      {
        id: 'msg-4-1',
        role: 'user',
        content: 'Provide an intuitive formal outline for why there must be infinitely many prime numbers, contrasting Euclid’s classical proof with Euler’s analytical proof via the Riemann Zeta function.',
        timestamp: '4 days ago',
      },
      {
        id: 'msg-4-2',
        role: 'assistant',
        modelId: 'deepseek-v4-pro',
        timestamp: '4 days ago',
        content: `### Comparative Analysis: Infinitude of Primes (Euclid vs. Euler)

#### Approach 1: Euclid's Constructive Contradiction (Algebraic)
Suppose for contradiction that the set of all primes is finite: $\\mathcal{P} = \\{p_1, p_2, \\dots, p_n\\}$.

1. Construct the integer:
   $$N = (p_1 \\cdot p_2 \\cdots p_n) + 1$$
2. Since $N > 1$, by the Fundamental Theorem of Arithmetic, $N$ must have at least one prime divisor $q$.
3. If $q \\in \\mathcal{P}$, then $q$ divides the product $p_1 p_2 \\cdots p_n$.
4. Consequently, $q$ must divide the difference:
   $$N - (p_1 \\cdots p_n) = 1$$
5. No prime divides $1$. Hence, a contradiction is reached; $\\mathcal{P}$ cannot be finite. $\\blacksquare$

#### Approach 2: Euler's Analytical Product Formula
Euler demonstrated the infinitude of primes by proving that the sum of the reciprocals of primes diverges:
$$\\sum_{n=1}^\\infty \\frac{1}{n} = \\prod_{p \\in \\mathcal{P}} \\left(1 - \\frac{1}{p}\\right)^{-1}$$

Since the harmonic series $\\sum \\frac{1}{n}$ diverges to $\\infty$, the infinite Euler product over all primes must also diverge, requiring infinitely many factors (primes).`
      }
    ]
  },
  {
    id: 'conv-5',
    title: 'High-Converting Cold Outreach Template for Seed Round',
    category: 'Writing',
    dateGroup: 'Previous 7 Days',
    timestamp: '6 days ago',
    pinned: false,
    modelId: 'gpt-4o',
    messages: [
      {
        id: 'msg-5-1',
        role: 'user',
        content: 'Draft a short, punchy 100-word cold email to a top-tier angel investor showcasing a 400% MoM ARR growth AI developer tool.',
        timestamp: '6 days ago',
      },
      {
        id: 'msg-5-2',
        role: 'assistant',
        modelId: 'gpt-4o',
        timestamp: '6 days ago',
        content: `**Subject**: 420% MoM ARR / EchoGPT seed round (backed by top OSS devs)

Hi [Investor Name],

Noticed your thesis on developer productivity and multi-model routing.

We built **EchoGPT**—a unified workspace and browser sidebar allowing engineering teams to route queries across GPT-4o, Claude 3.5, and DeepSeek in real-time.

Key traction over the past 90 days:
• **$34k MRR** (growing 420% MoM, organic)
• **45,000+ Chrome extension active installs** (5.0★ rating)
• **62% D30 retention** across engineering teams

We are putting together a $1.8M seed round led by founders from GitHub and Stripe.

Open to a brief 10-minute intro call this Thursday at 2pm PST?

Best,  
[Your Name]  
Founder, EchoGPT`
      }
    ]
  }
];
