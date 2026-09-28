export interface PricingTier {
  id: string;
  name: string;
  badge: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular: boolean;
  ctaText: string;
  ctaLink: string;
  features: string[];
  limitations: string[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Free Forever',
    description: 'Perfect for casual exploration and daily browser assistance.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    isPopular: false,
    ctaText: 'Get Started Free',
    ctaLink: '#/app',
    features: [
      'Access to standard models (DeepSeek V4 Flash, Llama 3.3)',
      'Chrome Extension Sidebar & Popup',
      'Webpage summarization (up to 20/day)',
      'Single model conversational chat',
      'Local conversation history storage',
      'Community support'
    ],
    limitations: [
      'Split-view comparison limited',
      'Frontier model credits capped'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Creator',
    badge: 'Most Popular',
    description: 'For software engineers, researchers, and creators wanting all models.',
    monthlyPrice: 9.99,
    yearlyPrice: 7.99, // billed annually
    isPopular: true,
    ctaText: 'Upgrade to Pro — $9.99/mo',
    ctaLink: '#/app',
    features: [
      'Unlimited access to DeepSeek V4 Pro, GPT-4o, Claude 3.5 Sonnet',
      'Full Chrome Extension with Sidepanel & hotkeys (Ctrl+Shift+E)',
      'Real-time Side-by-Side Model Comparison (Split View)',
      'AI Image Studio (Google, OpenAI & Frontier tiers)',
      'AI Video Studio with cinematic camera direction',
      'Model Context Protocol (MCP) server connectors',
      'Instant Webpage Summarizer & Highlight Explainer',
      '2M Token Context Window support with Gemini',
      'Full conversation history search & Markdown/JSON export',
      'Priority routing & 99.9% uptime SLA'
    ],
    limitations: []
  },
  {
    id: 'team',
    name: 'Team Workspace',
    badge: 'For Collaboration',
    description: 'For engineering teams and agencies scaling shared knowledge.',
    monthlyPrice: 24.99,
    yearlyPrice: 19.99,
    isPopular: false,
    ctaText: 'Upgrade Team',
    ctaLink: '#/app',
    features: [
      'Everything in Pro Creator for each seat',
      'Unlimited custom MCP connectors & shared tools',
      'Shared team prompt repository & templates',
      'Centralized billing & member role management',
      'Audit logs & SOC2 compliance reports',
      'Custom domain SSO (SAML / Okta)',
      'Zero data retention agreement for AI training',
      'Dedicated engineering Slack channel'
    ],
    limitations: []
  }
];
