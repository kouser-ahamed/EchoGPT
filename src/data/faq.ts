export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItemData[] = [
  {
    id: 'faq-1',
    question: 'What is EchoGPT and how does it work?',
    answer: 'EchoGPT is a unified AI ecosystem created by AppifyDevs that integrates leading frontier AI models—including DeepSeek V4 Flash & Pro, OpenAI GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and Meta Llama 3.3—into a single web application and Chrome browser sidebar. Instead of managing multiple subscriptions and bouncing between browser tabs, EchoGPT routes your requests intelligently from one workspace.'
  },
  {
    id: 'faq-2',
    question: 'How does the Chrome Extension Sidebar work?',
    answer: 'The EchoGPT Chrome extension uses Google Chrome’s native Manifest V3 Sidepanel API. Once installed, pressing `Ctrl+Shift+E` (or `Cmd+Shift+E` on Mac) slides the EchoGPT assistant open alongside any webpage you are viewing. You can summarize articles, explain complex code, draft responses, and ask contextual questions without ever leaving your current tab.'
  },
  {
    id: 'faq-3',
    question: 'Can I compare multiple AI models simultaneously?',
    answer: 'Yes! EchoGPT features an interactive Multi-Compare mode. You can enter a single prompt, select up to three models (for example, DeepSeek V4 Flash, Claude 3.5 Sonnet, and Nemotron 3 Ultra), and inspect all responses side-by-side. You can also toggle into Focus Mode for deep sequential reasoning.'
  },
  {
    id: 'faq-4',
    question: 'What are Model Context Protocol (MCP) Connectors?',
    answer: 'MCP is an open standard allowing AI models to securely interface with local and remote data sources, databases, and APIs. EchoGPT lets you attach custom HTTPS MCP server endpoints (like GitHub, PostgreSQL, Slack, or Brave Search) so frontier models can query your infrastructure in real-time.'
  },
  {
    id: 'faq-5',
    question: 'Is my data or codebase used to train AI models?',
    answer: 'No. We maintain a strict zero-retention privacy policy. Queries sent through EchoGPT use commercial enterprise endpoints with training opt-outs enabled. Furthermore, your chat history and creations are stored locally in your browser by default, with complete data export and deletion options available anytime.'
  },
  {
    id: 'faq-6',
    question: 'Can I bring my own API keys (BYOK)?',
    answer: 'Yes. In the Settings modal, Pro users have the option to enter their personal OpenAI, Anthropic, or Google Gemini API keys. EchoGPT encrypts your keys in local storage, allowing you to pay at raw wholesale provider rates with zero markup.'
  }
];
