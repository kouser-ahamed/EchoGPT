export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItemData[] = [
  {
    id: 'faq-platforms',
    question: 'What platforms is EchoGPT available on?',
    answer: 'EchoGPT is available everywhere you work. You can access the full web application from any modern browser (Chrome, Safari, Firefox, Edge). Additionally, the official EchoGPT Chrome Extension runs natively via the Manifest V3 Sidepanel API on Google Chrome, Brave, Edge, and Arc. Dedicated native Android and iOS mobile applications are currently in active development.'
  },
  {
    id: 'faq-security',
    question: 'Is my personal data and codebase secure when using EchoGPT?',
    answer: 'Yes. We enforce a strict enterprise zero-retention security policy. We never train public foundation models on your private prompts, documents, or codebases. All communications are protected with end-to-end TLS 1.3 encryption. Furthermore, your chat history and API keys are stored securely in local browser storage with instant export and wiping capabilities.'
  },
  {
    id: 'faq-cancellation',
    question: 'How does subscription cancellation and billing work?',
    answer: 'You can cancel your subscription at any time with a single click from your Account Billing settings. There are no cancellation fees or lock-ins; your Pro features and 2,000 monthly advance credits remain fully active until the end of your current prepaid billing cycle. All plans come with an unconditional 14-day money-back guarantee.'
  },
  {
    id: 'faq-models-breakdown',
    question: 'What is the difference between Basic and Advanced models?',
    answer: 'All plans include unlimited chats with 15 Basic foundation models (such as EchoGPT, Nemotron 3 Ultra, LongCat 2.0, and Ling 3.0 Flash) with zero token caps. For heavier reasoning, complex code generation, and deep scientific tasks, members receive 2,000 monthly Advance Credits to access 100+ premier frontier engines including DeepSeek V4 Pro, GPT-5.6 Sol, Claude Opus 5.5, and Gemini 3.8 Flash.'
  },
  {
    id: 'faq-sidepanel',
    question: 'How do I toggle the Chrome Extension sidebar?',
    answer: 'Once installed from the Chrome Web Store, you can press Alt+E (or Ctrl+Shift+E on Windows/Linux, ⌘+Shift+E on Mac) on any website to reveal the EchoGPT sidebar immediately. You can summarize articles, explain highlighted code, draft email replies, and compare answers without switching tabs.'
  },
  {
    id: 'faq-mcp',
    question: 'What are Model Context Protocol (MCP) tool integrations?',
    answer: 'MCP is an open standard allowing AI models to securely interface with external developer tools, private databases, GitHub repositories, and custom APIs. EchoGPT lets you attach HTTPS MCP server endpoints directly to your workspace so frontier models can query your infrastructure in real time.'
  }
];
