// Shared Domain Interfaces & Types for EchoGPT Ecosystem

export type AppView = 'landing' | 'webapp' | 'extension';

export type WebAppSubView =
  | 'chat'
  | 'image-studio'
  | 'video-studio'
  | 'compare'
  | 'connectors'
  | 'history'
  | 'store'
  | 'tasks'
  | 'job-analysis'
  | 'sop-builder'
  | 'support'
  | 'newsletter'
  | 'billing';

export type ThemeMode = 'dark' | 'light';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  shortName: string;
  tagline: string;
  description: string;
  contextWindow: string;
  speed: string;
  reasoningScore: string;
  codeScore: string;
  category: string;
  badge: string;
  accentColor: string;
  borderColor: string;
  bgLight: string;
  dotColor: string;
  avatar: string;
  strengths: string[];
  samplePrompt: string;
  sampleResponse: string;
  tier?: 'Default / Free' | 'Limited / Advanced' | 'Pro Tier' | string;
}

export type ImageModelTier = 'GOOGLE' | 'OPENAI' | 'FRONTIER';

export interface ImageStudioModel {
  id: string;
  name: string;
  provider: string;
  tier: ImageModelTier;
  description: string;
  badge: string;
  speed: string;
  quality: string;
  avatar: string;
}

export interface VideoStudioModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  badge: string;
  speed?: string;
  quality?: string;
  avatar?: string;
  tier?: 'GOOGLE' | 'OPENAI' | 'FRONTIER';
}

export interface MessageAttachment {
  name: string;
  size: string;
  type?: string;
  dataUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  text?: string;
  modelId?: string;
  modelName?: string;
  timestamp: string;
  attachment?: MessageAttachment | null;
  error?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  category: string;
  dateGroup: 'Today' | 'Yesterday' | 'Previous 7 Days' | 'Older';
  timestamp: string;
  pinned: boolean;
  modelId: string;
  messages: ChatMessage[];
}

export interface MCPConnector {
  id: string;
  name: string;
  endpoint: string;
  description: string;
  authHeader: string;
  enabled: boolean;
  icon: string;
  category: string;
}

export type TaskCategory = 'Ideas' | 'Work' | 'Fun' | 'Online Content';

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  promptTemplate: string;
  icon: string;
  color: string;
  popular?: boolean;
}

export interface SOPTemplate {
  id: string;
  title: string;
  description: string;
  tag?: string;
  tags: string[];
  badgeColor: string;
  icon?: string;
}

export interface SOPCountry {
  id: string;
  name: string;
  flag: string;
  visaType: string;
  visaCriteria?: string;
  wordLimit: string;
  processingTime: string;
  keyAspects: string;
  rules?: string[];
  requirements: string[];
}

export interface SavedSOPItem {
  id: string;
  fullName: string;
  degreeLevel: string;
  fieldOfStudy: string;
  targetUniversity: string;
  templateId: string;
  templateTitle: string;
  countryId: string;
  countryName: string;
  countryFlag: string;
  generatedText: string;
  createdAt: string;
  wordCount: number;
}

export type AspectRatio = '1:1' | '3:2' | '2:3' | 'auto' | '16:9' | '9:16';

export interface CreatedImage {
  id: string;
  prompt: string;
  url: string;
  aspectRatio: string;
  model: string;
  provider?: string;
  hasReference?: boolean;
  referenceStrength?: string | null;
  timestamp: string;
}

export interface CreatedVideo {
  id: string;
  title: string;
  prompt: string;
  model: string;
  provider?: string;
  aspectRatio: string;
  duration: string;
  thumbnail: string;
  timestamp: string;
  resolution?: string;
  fps?: string;
  motionStrength?: number;
  hasReference?: boolean;
  referenceName?: string;
  videoUrl?: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface PricingTier {
  id: string;
  name: string;
  badge: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular: boolean;
  ctaText: string;
  features: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billed: string;
  discount?: string | null;
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FeatureItem {
  id?: string;
  title: string;
  description: string;
  icon?: string;
  iconName?: string;
  badge?: string;
  tag?: string;
  gradient?: string;
  stats?: string;
}

export interface TestimonialItem {
  id?: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  initials?: string;
  rating: number;
}

export interface StarterPromptItem {
  id: string;
  title: string;
  prompt: string;
  icon: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  icon: string;
  category?: string;
}

export interface JobAnalysisResult {
  matchScore: string;
  atsRating: string;
  keyStrengths: string[];
  suggestedImprovements: string[];
  tailoredSummary: string;
  recommendedInterviewPrep: string[];
}

export interface JobAnalysisItem {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  jobDescription: string;
  resumeSnippet: string;
  result: JobAnalysisResult;
}

