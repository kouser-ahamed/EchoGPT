<div align="center">

# 🌐 EchoGPT — Unified Multi-AI Workspace & Extension Concept

**Stop tab-juggling. Route every prompt through the frontier, from one workspace.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.4-FF0055?style=flat-square&logo=framer&logoColor=white)](https://motion.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=flat-square)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/Live_Demo-echogpt.live-22D3EE?style=flat-square&logo=googlechrome&logoColor=black)](https://echogpt.live/)

</div>

---

## 📖 Table of Contents

- [Overview](#-project-overview)
- [Key Highlights](#-key-highlights)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Assumptions & Design Decisions](#-assumptions--design-decisions)
- [Beyond the Core Deliverables](#-beyond-the-core-deliverables)
- [Project Structure](#-project-structure)
- [Quality Checklist](#-quality-checklist)
- [Contributing](#-contributing)
- [License](#-license)
- [Credits](#-credits)

---

## 🚀 Project Overview

Most people don't have a model problem — they have a **fragmentation** problem. Eleven browser tabs, four vendor dashboards, and five overlapping subscriptions to answer one question. And the model that's fastest for prose is rarely the one that nails a refactor.

**EchoGPT** is a unified, high-performance workspace that aggregates frontier AI models behind a single interface, routing prompts to the right engine and presenting the results side by side.

The model catalogue is defined in [`src/data/models.ts`](./src/data/models.ts) and includes:

| Model | Provider | Context | Role in the ecosystem |
| :--- | :--- | :--- | :--- |
| **EchoGPT Core** | EchoGPT Core | 128K | Unified router / orchestrator (default, free) |
| **Nemotron 3 Ultra** | NVIDIA AI | 128K | Enterprise reasoning, synthetic data |
| **LongCat 2.0** | Meituan / LongCat AI | 128K | Long-horizon agentic work |
| **DeepSeek V4 Pro** | DeepSeek AI | 128K | Code generation & deep reasoning |
| **GPT-5.6 Sol** | OpenAI | 128K | General-purpose flagship |
| **Claude Opus 5.5** | Anthropic | 128K | Long-form writing & nuance |
| **Nemotron 3.5 Lightning** | NVIDIA AI | 128K | Low-latency fast path |
| **+ 100 more** | Various | Various | Full catalogue in the Store & Models Hub |

> **Note on model names:** the catalogue ships with `DeepSeek V4 Pro`, `Claude Opus 5.5`, `GPT-5.6 Sol`, `Nemotron 3.x`, and `LongCat 2.0`. There is no `GPT-4o` or `Claude 3.5 Sonnet` entry in the current data file.

### Why it exists

- **One surface, many engines** — no vendor lock-in, no tab juggling.
- **Compare, don't guess** — a dual-stream playground renders two models answering the same prompt simultaneously, with latency readouts.
- **Works immediately** — the AI layer falls back to a public, keyless endpoint, so the app is usable on first load with zero configuration.

---

## ✨ Key Highlights

- **Marketing Landing Page** — hero with a live, streaming product mockup, feature grid, frontier-model showcase, and pricing.
- **Live Chat Workspace** — multi-turn chat with token streaming, Markdown + GFM rendering, syntax-highlighted code blocks with one-click copy, and persistent history.
- **Dual-Model Split Comparison Playground** — two models, one prompt, two simultaneous streams, plus latency and TTFT benchmarks.
- **Image Studio** — aspect-ratio and batch controls, reference-image upload, and a persistent gallery.
- **Video Studio** — the same generation pipeline for text-to-video, with its own gallery.
- **AI SOP Builder** — turns a job description into a structured, editable standard operating procedure.
- **Job Analysis & Task Views** — role breakdowns and prioritised task lists.
- **Store & Models Hub** — browsable catalogue of the full 100+ model set with filters.
- **Interactive Chrome Extension Simulator** — a high-fidelity in-page sidepanel and popup that summarise the current page and expose contextual quick actions.

---

## 🛠️ Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Language** | TypeScript 7.0 (strict) | Strict type checking, explicit interfaces, no `any` |
| **Framework** | React 19.2 | Concurrent rendering, performant component trees |
| **Build & HMR** | Vite 8.3 | Sub-second builds, instant hot module replacement |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) | CSS-first config, atomic design tokens |
| **Theming** | Custom dark/light engine | React Context + `localStorage` + CSS custom variant |
| **Icons** | Lucide React + custom SVG | Consistent modern vector iconography |
| **Animation** | Framer Motion 13 | Spring physics, layout transitions, drawer animations |
| **Effects** | Canvas Confetti | Checkout and upgrade celebrations |
| **Markdown** | react-markdown + remark-gfm | Streaming Markdown with GFM tables and copyable code blocks |
| **AI Transport** | Pollinations public endpoint + local fallback | Keyless, CORS-friendly, two-tier degradation |
| **State** | React Context API + LocalStorage | Client-side persistence with no backend |

> **On routing:** navigation is driven by `AppContext` view state rather than a router, so the app runs as a single deployable bundle with no route-level code splitting.

---

## 🚦 Getting Started

### Prerequisites

- **Node.js 20+** — verified on **Node v26.3.0**
- **npm 10+** — verified on **npm 11.16.0**

> `package.json` does not declare an `engines` field, so these are the versions this project was built and verified against.

### 1. Clone the repository

```bash
git clone https://github.com/kouser-ahamed/EchoGPT.git
cd EchoGPT
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment configuration

**No configuration is required.** The app ships with a keyless AI fallback engine, so `npm run dev` gives you a working chat immediately.

If you later wire up your own provider, create a `.env` file at the project root:

```bash
cp .env.example .env   # add .env.example to your fork first — it is not shipped
```

```bash
# .env
VITE_AI_ENDPOINT=https://your-endpoint.example/v1/chat
VITE_AI_API_KEY=your-key-here
```

> Any variable prefixed with `VITE_` is exposed to the client bundle. **Never commit real API keys** — put keys behind a proxy server for production use.

### 4. Start the development server

```bash
npm run dev
```

Open the URL printed by Vite (default <http://localhost:5173>).

### 5. Verify a production build

```bash
npm run build     # tsc -b && vite build  ->  output in ./dist
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

---

## 💭 Assumptions & Design Decisions

- **Modern browsers only.** The UI targets current desktop, tablet, and mobile browsers with responsive breakpoints from 320px upward. Legacy browsers are out of scope.
- **Zero-key out of the box.** The AI layer uses a public, CORS-friendly endpoint with a local fallback engine, so chat works without any paid proprietary API key. This keeps the demo instantly usable and avoids shipping secrets to the browser.
- **The extension is a simulator, not a shipped extension.** The Chrome extension experience is implemented as a high-fidelity interactive simulator inside the web app. This demonstrates the UX and information architecture before committing to native Manifest V3 packaging and Chrome Web Store review.
- **Client-side state only.** There is no backend. Conversations, themes, preferences, generated media, and custom connectors persist to `localStorage`. Clearing site data clears the workspace.
- **The AI is a demonstration layer.** Responses come from a public model endpoint and are not calibrated for production accuracy or safety-critical use.

---

## 🚀 Beyond the Core Deliverables

- **100% strict TypeScript, zero `any`** — the entire codebase is `.ts`/`.tsx` under `strict` mode, with explicit interfaces in `src/@types`.
- **Dark/Light theme engine** — a full theme system with WCAG-conscious contrast in both modes, persisted across reloads, and zero washed-out surfaces.
- **Zero-glow dark-mode card system** — landing cards use flat `dark:shadow-none` surfaces with crisp borders, preserving soft shadows in light mode only.
- **Dual-model split comparison** — simultaneous streaming, per-column copy, and latency benchmarks.
- **Gallerisation & pagination** — Image and Video studios paginate at **8 items per page**; History paginates at **10**. Desktop galleries use a 4-column grid.
- **Interactive extension sidepanel** — docked sidepanel and popup modes, live page summarisation, and contextual quick actions.
- **Zero-overflow responsive experience** — fluid containers from 320px to 4K, a portalled touch-friendly drawer navigation, momentum-scroll strips, and safe-area insets for notched devices.

---

## 📂 Project Structure

```text
EchoGPT/
├── index.html                  # Entry HTML, viewport + theme bootstrap
├── vite.config.js              # Vite + React + Tailwind plugin config
├── tsconfig.json               # Strict TypeScript configuration
├── .oxlintrc.json              # Lint rules
└── src/
    ├── main.tsx                # React root, provider composition
    ├── App.tsx                 # App shell, view router, global overflow guard
    ├── index.css               # Tailwind import, theme tokens, utilities
    │
    ├── components/
    │   ├── common/             # Navbar, Footer, ThemeToggle, SettingsModal,
    │   │                       # ToastContainer, Icons, MarkdownRenderer
    │   ├── landing/            # HeroSection, FeaturesSection, ModelsSection,
    │   │                       # InteractiveComparisonPlayground, PricingSection,
    │   │                       # WhyEchoGPTSection, TestimonialsSection,
    │   │                       # FAQSection, CTASection, ExtensionSpotlightSection
    │   ├── webapp/             # Sidebar, WorkspaceHeader, ChatArea, PromptComposer,
    │   │                       # ModelSelectorModal, UpgradePlanModal,
    │   │                       # ProUpgradeModal, ShareModal, SplitCompareView
    │   │   └── views/          # ChatWorkspaceView, ImageStudioView, VideoStudioView,
    │   │                       # HistoryView, StoreView, CompareView, BillingView,
    │   │                       # ConnectorsView, TasksView, SOPBuilderView,
    │   │                       # JobAnalysisView, NewsletterView, SupportView
    │   └── extension/          # ExtensionUI (sidepanel + popup), ExtensionSimulator
    │
    ├── context/                # AppContext (view state), ThemeContext (dark/light)
    ├── data/                   # Static catalogues: models, pricing, conversations,
    │                           # faq, features, testimonials, tasks, quickActions
    ├── hooks/                  # useLocalStorage, useTheme
    ├── pages/                  # Thin page wrappers (LandingPage, WebAppPage,
    │                           # ExtensionPage, StorePage, HistoryPage, ...)
    ├── services/               # aiChatService (streaming + fallback), aiService
    ├── @types/                 # Shared TypeScript interfaces
    └── assets/
```

---

## 🎯 Quality Checklist

- [x] **100% TypeScript** — no `.js`/`.jsx` in `src`; all `.ts`/`.tsx`.
- [x] **Zero type errors** — `tsc -b` and `vite build` complete with 0 errors.
- [x] **Clean build** — `npm run build` succeeds and emits `./dist`.
- [x] **Zero placeholder components** — all views, studios, and modals are interactive.
- [x] **Responsive to 320px** — fluid layouts, drawer navigation, momentum scroll strips.
- [x] **Client-side persistence** — history, model selection, media, and connectors survive reloads.
- [ ] **Zero lint warnings** — `npm run lint` currently reports **1 pre-existing warning** in `src/components/extension/ExtensionUI.tsx` (`Date.now()` called during render).

---

## 🤝 Contributing

Contributions are welcome.

1. **Fork** the repository and create a feature branch.
   ```bash
   git checkout -b feature/your-change
   ```
2. **Install** dependencies with `npm install`.
3. **Keep types strict** — no `any`, no `@ts-ignore`. Add interfaces to `src/@types`.
4. **Verify before opening a PR**:
   ```bash
   npm run lint && npm run build
   ```
5. **Commit** with a clear message and **open a PR** describing the change.

**Style guidelines**
- Functional components with explicit prop interfaces.
- Tailwind utilities over inline styles; keep dark/light variants paired.
- Prefer `dark:shadow-none` over decorative glows on card surfaces.
- Any new horizontal scroller needs `no-scrollbar momentum-scroll` and `shrink-0` children.

---

## 📄 License

Released under the **MIT License**.

```text
MIT License

Copyright (c) 2026 Kouser Ahamed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

> A standalone `LICENSE` file has not yet been added to the repository root. The text above is the intended license.

---

## 👥 Credits

- **Created by** [Kouser Ahamed](https://github.com/kouser-ahamed) — <kouserahamed.cse.diu@gmail.com>
- Built for the **AppifyDevs** Frontend Software Engineering Internship evaluation.
- Design reference and inspiration: the official **EchoGPT** platform at [echogpt.live](https://echogpt.live/).

<p align="center">
  <em>Made with React, TypeScript, and an unreasonable number of model tabs.</em>
</p>
