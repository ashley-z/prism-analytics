# Prism - See Blockchain Clearly

**The Problem**: Blockchain data is overwhelming and inaccessible to newcomers. Industry research is filled with jargon, onchain metrics are scattered across platforms, and non-technical users struggle to make informed decisions about crypto investments, protocols, and market trends.

**The Solution**: Prism is an AI-powered document analysis platform that breaks down complex blockchain research into clear, understandable insights—just like a prism transforms light into a visible spectrum.

**Upload. Analyze. Understand.**

## Phase 1: MVP

This version represents the Phase 1 release, focusing on core document analysis capabilities using Google's Gemini models.

### Key Features

*   **📄 Document Intelligence (Core Focus)**
    *   AI-powered breakdown of research papers, reports, and data files (PDF, TXT, JSON, CSV, MD).
    *   Executive summaries in plain English.
    *   Key findings, sentiment analysis, and hard metrics extraction.
*   **📊 Prism Dashboard**
    *   Post-analysis view showing document insights at a glance.
    *   Concept maps showing entity relationships.
    *   Risk signals and actionable "What This Means for You" insights.
*   **📚 Document Log**
    *   Access previously analyzed documents.
    *   Personal blockchain intelligence library.

### Design System: Lavender Minimal (v1.0)

*   **Colors**: Primary Soft Purple (`#7C3AED`) & Light Purple (`#A78BFA`).
*   **Typography**: System fonts for optimal performance.
*   **Visuals**: Hexagonal dot motifs and sentiment-based glow effects.

### Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS (Custom "Lavender Minimal" Config)
*   **AI Model**: Google Gemini 1.5 Pro / Flash (via `@google/genai`)
*   **Visualization**: Recharts
*   **Persistence**: LocalStorage (Browser)

### Getting Started

1.  **Prerequisites**: Ensure you have a valid Google Gemini API Key.
2.  **Environment**: The application requires the `API_KEY` environment variable.
3.  **Run Application**:
    *   Install dependencies: `npm install`
    *   Start server: `npm start`

---
*Powered by Google Gemini*
*Brand Guidelines Version 1.0 | Last Updated: January 2026*