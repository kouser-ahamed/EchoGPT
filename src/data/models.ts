import { AIModel, ImageStudioModel, VideoStudioModel } from '../@types';

export const AI_MODELS: AIModel[] = [
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    provider: 'DeepSeek AI',
    shortName: 'DeepSeek V4',
    tagline: 'Lightning fast chain-of-thought inference',
    description: 'High-throughput reasoning model designed for instant code synthesis, logic puzzle solving, and structured real-time answers.',
    contextWindow: '128K tokens',
    speed: 'Blazing (68 tok/s)',
    reasoningScore: '98%',
    codeScore: '96%',
    category: 'Deep Reasoning',
    badge: 'Default',
    accentColor: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/30',
    bgLight: 'bg-cyan-500/10 text-cyan-400',
    dotColor: 'bg-cyan-400',
    avatar: '⚡',
    strengths: ['Step-by-step logic proofs', 'Low-latency code generation', 'Concise synthesis'],
    samplePrompt: 'Explain how async generator streams work in JavaScript.',
    sampleResponse: `Async generators combine \`async/await\` with generator iteration:

\`\`\`javascript
async function* fetchTokenStream(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    yield decoder.decode(value);
  }
}
\`\`\`
Each yield pauses execution until the consumer calls \`next()\`, enabling backpressure-friendly streaming without memory bloat.`
  },
  {
    id: 'deepseek-v4-pro',
    name: 'DeepSeek V4 Pro',
    provider: 'DeepSeek AI',
    shortName: 'DeepSeek Pro',
    tagline: 'Maximum depth reasoning & formal verification',
    description: 'Frontier reasoning engine with extended chain-of-thought verification for advanced algorithmics and mathematics.',
    contextWindow: '128K tokens',
    speed: 'Fast (42 tok/s)',
    reasoningScore: '99.4%',
    codeScore: '98%',
    category: 'Deep Reasoning',
    badge: 'Frontier',
    accentColor: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/30',
    bgLight: 'bg-blue-500/10 text-blue-400',
    dotColor: 'bg-blue-400',
    avatar: '🔷',
    strengths: ['Formal math proofs', 'Multi-file architecture', 'Complex debug traces'],
    samplePrompt: 'Prove that every planar graph has a vertex of degree at most 5.',
    sampleResponse: `By Euler's formula $V - E + F = 2$ for connected planar graphs. Since every face is bounded by at least 3 edges, $2E \\geq 3F \\implies F \\leq \\frac{2}{3}E$.
Substituting into Euler: $V - E + \\frac{2}{3}E \\geq 2 \\implies E \\leq 3V - 6$.
Sum of degrees is $2E \\leq 6V - 12$. If all vertices had degree $\\geq 6$, sum would be $\\geq 6V$, a contradiction. Thus $\\exists v$ with $\\deg(v) \\leq 5$. $\\blacksquare$`
  },
  {
    id: 'nemotron-3-ultra',
    name: 'Nemotron 3 Ultra',
    provider: 'NVIDIA AI',
    shortName: 'Nemotron Ultra',
    tagline: 'GPU-accelerated enterprise instruction tuning',
    description: 'Optimized on NVIDIA Blackwell supercomputers for enterprise function calling, tool use, and strict JSON outputs.',
    contextWindow: '256K tokens',
    speed: 'Ultra Fast (60 tok/s)',
    reasoningScore: '97.2%',
    codeScore: '95%',
    category: 'Enterprise & Tools',
    badge: 'NVIDIA Blackwell',
    accentColor: 'from-emerald-500 to-green-600',
    borderColor: 'border-emerald-500/30',
    bgLight: 'bg-emerald-500/10 text-emerald-400',
    dotColor: 'bg-emerald-400',
    avatar: '🟢',
    strengths: ['Tool calling & MCP', 'Large enterprise data parsing', 'High throughput API'],
    samplePrompt: 'Generate a JSON Schema for an MCP Server configuration.',
    sampleResponse: `\`\`\`json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "MCPConnectionConfig",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "endpoint": { "type": "string", "format": "uri" },
    "authHeader": { "type": "string" },
    "enabled": { "type": "boolean", "default": true }
  },
  "required": ["name", "endpoint"]
}
\`\`\``
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o Omnimodal',
    provider: 'OpenAI',
    shortName: 'GPT-4o',
    tagline: 'Flagship cross-domain omni intelligence',
    description: 'Premier general model for rapid multi-step reasoning, vision analysis, structured writing, and coding.',
    contextWindow: '128K tokens',
    speed: 'Very Fast (52 tok/s)',
    reasoningScore: '98%',
    codeScore: '96%',
    category: 'General & Vision',
    badge: 'Popular',
    accentColor: 'from-teal-500 to-emerald-600',
    borderColor: 'border-teal-500/30',
    bgLight: 'bg-teal-500/10 text-teal-400',
    dotColor: 'bg-teal-400',
    avatar: '🧠',
    strengths: ['Vision analysis', 'Cross-domain reasoning', 'Natural human conversational tone'],
    samplePrompt: 'Summarize the core benefits of adopting micro-frontends.',
    sampleResponse: `1. **Autonomous Team Velocity**: Independent deployments without cross-team release bottlenecks.
2. **Polyglot Stack Support**: Gradual framework migrations (e.g. legacy React to modern React 19) in isolated remotes.
3. **Resilient Fault Isolation**: A fatal error in one micro-frontend does not bring down the entire host shell.`
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    shortName: 'Claude 3.5',
    tagline: 'Gold standard for software engineering & nuanced prose',
    description: 'Unmatched coding precision, deep architectural guidance, and sophisticated editorial voice.',
    contextWindow: '200K tokens',
    speed: 'Fast (42 tok/s)',
    reasoningScore: '99%',
    codeScore: '99%',
    category: 'Code & Nuance',
    badge: 'Code Leader',
    accentColor: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/30',
    bgLight: 'bg-amber-500/10 text-amber-400',
    dotColor: 'bg-amber-400',
    avatar: '🟠',
    strengths: ['Refined programming', 'Artifact creation', 'Nuanced prose & tone'],
    samplePrompt: 'Refactor React state mutation with useOptimistic.',
    sampleResponse: `\`\`\`tsx
'use client';
import { useOptimistic } from 'react';

export function LikeButton({ likes, onLike }: { likes: number; onLike: () => Promise<void> }) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (current, update: number) => current + update
  );

  return (
    <button onClick={async () => {
      setOptimisticLikes(1);
      await onLike();
    }}>
      ❤️ {optimisticLikes}
    </button>
  );
}
\`\`\``
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google DeepMind',
    shortName: 'Gemini 1.5 Pro',
    tagline: 'Massive 2,000,000 token context window',
    description: 'Ingest entire codebases, multi-hour video lectures, and 500-page PDF financial reports without chunking loss.',
    contextWindow: '2,000K tokens',
    speed: 'Fast (40 tok/s)',
    reasoningScore: '97%',
    codeScore: '94%',
    category: 'Massive Context',
    badge: '2M Window',
    accentColor: 'from-indigo-500 to-purple-600',
    borderColor: 'border-indigo-500/30',
    bgLight: 'bg-indigo-500/10 text-indigo-400',
    dotColor: 'bg-indigo-400',
    avatar: '🔵',
    strengths: ['Entire codebase ingestion', 'Large PDF synthesis', 'Multimodal audio/video'],
    samplePrompt: 'How does needle-in-a-haystack recall scale across 2 million tokens?',
    sampleResponse: `Gemini 1.5 Pro maintains 99.7% retrieval recall across the full 2M token sequence using sparse attention heads and specialized flash-attention kernels trained on multimodal token distributions.`
  }
];

export const STORE_MODELS: any[] = [
  ...AI_MODELS,
  {
    id: 'glm-5-2',
    name: 'GLM-5.2',
    provider: 'Zhipu AI',
    shortName: 'GLM 5.2',
    tagline: 'Bilingual frontier intelligence',
    description: 'Renowned for Chinese-English translation, technical cross-linguistic reasoning, and high compliance.',
    contextWindow: '128K tokens',
    badge: 'Bilingual',
    avatar: '🌏'
  },
  {
    id: 'tencent-hy3',
    name: 'Tencent Hy3',
    provider: 'Tencent Hunyuan',
    shortName: 'Hunyuan 3',
    tagline: 'Enterprise multimodal reasoning',
    description: 'Optimized for high-concurrency document processing, mathematics, and conversational agents.',
    contextWindow: '256K tokens',
    badge: 'Enterprise',
    avatar: '🐧'
  },
  {
    id: 'mimo-v2-5-pro',
    name: 'MiMo V2.5 Pro',
    provider: 'Xiaomi AI',
    shortName: 'MiMo Pro',
    tagline: 'Edge-to-cloud device assistant',
    description: 'Lightweight, ultra-low latency model tailored for fast smartphone and IoT agent automation.',
    contextWindow: '64K tokens',
    badge: 'IoT & Edge',
    avatar: '📱'
  },
  {
    id: 'qwen-3-7-plus',
    name: 'Qwen 3.7 Plus',
    provider: 'Alibaba Cloud',
    shortName: 'Qwen 3.7',
    tagline: 'State-of-the-art multilingual coding & math',
    description: 'Frontier open-weights powerhouse excelling across HumanEval, GSM8K, and STEM benchmarks.',
    contextWindow: '128K tokens',
    badge: 'Open Benchmark',
    avatar: '🟣'
  },
  {
    id: 'gpt-5-6-sol',
    name: 'GPT-5.6 Sol',
    provider: 'OpenAI Frontier',
    shortName: 'GPT-5.6 Sol',
    tagline: 'Next-generation autonomous agent engine',
    description: 'Experimental next-gen architecture with native planning, multi-step self-correction, and tool routing.',
    contextWindow: '512K tokens',
    badge: 'Preview',
    avatar: '☀️'
  },
  {
    id: 'muse-spark-1-3',
    name: 'Muse Spark 1.3',
    provider: 'Muse Research',
    shortName: 'Muse Spark',
    tagline: 'Creative writing and storytelling specialist',
    description: 'Tuned specifically on world-class literature, screenwriting, and conversational emotional intelligence.',
    contextWindow: '64K tokens',
    badge: 'Creative',
    avatar: '🎭'
  },
  {
    id: 'kimi-k2-7',
    name: 'Kimi K2.7',
    provider: 'Moonshot AI',
    shortName: 'Kimi K2.7',
    tagline: 'Super-long document reader and analyst',
    description: 'Specialized in digesting massive legal contracts, doctoral dissertations, and technical manuals.',
    contextWindow: '1,000K tokens',
    badge: 'Long-Doc',
    avatar: '🌙'
  },
  {
    id: 'step-3-7-flash',
    name: 'Step 3.7 Flash',
    provider: 'StepFun AI',
    shortName: 'Step Flash',
    tagline: 'High speed real-time conversational voice agent',
    description: 'Sub-200ms latency designed for voice interaction, live customer support, and instant replies.',
    contextWindow: '64K tokens',
    badge: 'Realtime',
    avatar: '⚡'
  },
  {
    id: 'inkling',
    name: 'Inkling 2.0',
    provider: 'AppifyDevs Labs',
    shortName: 'Inkling',
    tagline: 'Boutique code companion for modern React & TypeScript',
    description: 'Custom fine-tuned by AppifyDevs for frontend engineering, CSS animations, and UI/UX best practices.',
    contextWindow: '64K tokens',
    badge: 'EchoGPT Native',
    avatar: '✨'
  }
];

export const IMAGE_STUDIO_MODELS: ImageStudioModel[] = [
  // GOOGLE Tier
  {
    id: 'nano-banana-2-lite',
    name: 'Nano Banana 2 Lite',
    provider: 'Google',
    tier: 'GOOGLE',
    description: 'Lightest Google tier. Quickest and cheapest - Default.',
    badge: 'Default',
    speed: 'Ultra Fast (0.8s)',
    quality: 'High Balanced',
    avatar: '🍌'
  },
  {
    id: 'nano-banana-2',
    name: 'Nano Banana 2',
    provider: 'Google',
    tier: 'GOOGLE',
    description: 'Fast Google model with well-balanced quality.',
    badge: 'Popular',
    speed: 'Fast (1.2s)',
    quality: 'Superior',
    avatar: '⚡'
  },
  {
    id: 'nano-banana-pro',
    name: 'Nano Banana Pro',
    provider: 'Google',
    tier: 'GOOGLE',
    description: "Google's best. Highest fidelity and strongest at text in images.",
    badge: 'Best Fidelity',
    speed: 'Standard (2.1s)',
    quality: 'Maximum 8K',
    avatar: '🌟'
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana',
    provider: 'Google',
    tier: 'GOOGLE',
    description: 'Previous Google generation. Quick and dependable.',
    badge: 'Legacy Stable',
    speed: 'Fast (1.1s)',
    quality: 'Standard',
    avatar: '🟡'
  },

  // OPENAI Tier
  {
    id: 'chatgpt-image-latest',
    name: 'ChatGPT Image Latest',
    provider: 'OpenAI',
    tier: 'OPENAI',
    description: 'Tracks whatever ChatGPT currently uses for images.',
    badge: 'Dynamic Auto',
    speed: 'Adaptive (1.5s)',
    quality: 'Top Tier',
    avatar: '🟢'
  },
  {
    id: 'gpt-image-1',
    name: 'GPT Image 1',
    provider: 'OpenAI',
    tier: 'OPENAI',
    description: 'Reliable all-rounder. Handles text in images well.',
    badge: 'All-Rounder',
    speed: 'Fast (1.4s)',
    quality: 'Photoreal',
    avatar: '🎨'
  },
  {
    id: 'gpt-image-1-mini',
    name: 'GPT Image 1 Mini',
    provider: 'OpenAI',
    tier: 'OPENAI',
    description: 'Cheapest tier, lower fidelity.',
    badge: 'Budget Friendly',
    speed: 'Instant (0.7s)',
    quality: 'Draft/Concept',
    avatar: '🌱'
  },
  {
    id: 'gpt-image-1-5',
    name: 'GPT Image 1.5',
    provider: 'OpenAI',
    tier: 'OPENAI',
    description: 'High quality with good prompt following.',
    badge: 'Prompt Alignment',
    speed: 'Fast (1.6s)',
    quality: 'Refined Pro',
    avatar: '✨'
  },
  {
    id: 'gpt-image-2',
    name: 'GPT Image 2',
    provider: 'OpenAI',
    tier: 'OPENAI',
    description: 'Newest generation. Fastest of the lot and strong on detail.',
    badge: 'New Gen',
    speed: 'Blazing (0.9s)',
    quality: 'Next-Gen Ultra',
    avatar: '🚀'
  },

  // ADDITIONAL FRONTIER MODELS (Extended)
  {
    id: 'midjourney-v6-1-turbo',
    name: 'Midjourney v6.1 Turbo',
    provider: 'Midjourney',
    tier: 'FRONTIER',
    description: 'Photorealistic rendering and cinematic lighting.',
    badge: 'Cinematic Leader',
    speed: 'Fast (2.0s)',
    quality: 'Cinematic 8K',
    avatar: '🎬'
  },
  {
    id: 'flux-1-schnell',
    name: 'FLUX.1 Schnell',
    provider: 'Black Forest Labs',
    tier: 'FRONTIER',
    description: 'Ultra-fast 4-step diffusion model.',
    badge: '4-Step Realtime',
    speed: 'Ultra Fast (0.5s)',
    quality: 'Crisp Detail',
    avatar: '⚡'
  },
  {
    id: 'stable-diffusion-3-5-large',
    name: 'Stable Diffusion 3.5 Large',
    provider: 'Stability AI',
    tier: 'FRONTIER',
    description: 'High adherence to typography and anatomy.',
    badge: 'Typography & Anatomy',
    speed: 'Standard (1.8s)',
    quality: 'Studio Grade',
    avatar: '💎'
  }
];

export const VIDEO_STUDIO_MODELS: VideoStudioModel[] = [
  { id: 'veo-3-1-fast', name: 'Veo 3.1 Fast', provider: 'Google DeepMind', description: 'Google DeepMind 1080p high-coherence motion synthesis', badge: '1080p Fast' },
  { id: 'sora-v2-turbo', name: 'Sora v2 Turbo', provider: 'OpenAI', description: 'Complex physics, cinematic lighting, and photorealistic temporal continuity', badge: 'Flagship' },
  { id: 'runway-gen3', name: 'Runway Gen-3 Alpha', provider: 'Runway ML', description: 'Cinematic camera controls and hyper-detailed visual VFX', badge: 'Director Mode' },
  { id: 'kling-1-5', name: 'Kling 1.5 HD', provider: 'Kuaishou', description: 'High-frame-rate realistic camera pan and object manipulation', badge: 'Fluid Motion' }
];

export const DEFAULT_MODEL_ID = 'deepseek-v4-flash';
