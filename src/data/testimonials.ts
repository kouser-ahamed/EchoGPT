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
    role: 'Staff AI Engineer, Next-Gen Frontend Systems',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    initials: 'ER',
    rating: 5,
    quote: 'The dual-AI split view comparison alone saves our engineering team 6+ hours every week. We test Claude 3.5 Sonnet against DeepSeek V4 Pro on TypeScript refactoring tasks simultaneously without leaving our code editor or browser.'
  },
  {
    id: 'test-2',
    author: 'David Park',
    role: 'Founder & CEO at SynthAI Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    initials: 'DP',
    rating: 5,
    quote: 'We cut our monthly AI software bill from $600/month across disjointed seat licenses down to EchoGPT. Zero tab juggling, unified billing, and instant sidepanel access increased our developer shipping cadence by 35%.'
  },
  {
    id: 'test-3',
    author: 'Priya Sharma',
    role: 'CS Graduate Student & AI Researcher at Stanford',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    initials: 'PS',
    rating: 5,
    quote: 'As a student reviewing 20+ dense arXiv preprints a day, pressing Alt+E to summarize methodologies and extract LaTeX proofs right in Chrome without context switching is an absolute game changer.'
  }
];
