export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  initials: string;
  rating: number;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Elena Rostova',
    role: 'Staff Frontend Engineer at Vercel ecosystem',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    initials: 'ER',
    rating: 5,
    quote: 'The split-view comparison alone saves our engineering team hours every week. We test Claude 3.5 against GPT-4o for complex TypeScript refactors right from the browser sidebar.'
  },
  {
    id: 'test-2',
    author: 'Marcus Vance',
    role: 'Principal AI Researcher & Tech Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    initials: 'MV',
    rating: 5,
    quote: 'Having the Chrome Side Panel open with `Ctrl+Shift+E` while reviewing arXiv preprints and GitHub documentation completely eliminates context switching. Best AI extension on Chrome Web Store.'
  },
  {
    id: 'test-3',
    author: 'Sarah Chen',
    role: 'Product Manager at FinTech Scaleup',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    initials: 'SC',
    rating: 5,
    quote: 'I dropped three separate subscriptions ($60/mo) for EchoGPT at $9.99/mo. The multi-model flexibility gives me the best AI for writing, coding, and document analysis in one clean interface.'
  }
];
