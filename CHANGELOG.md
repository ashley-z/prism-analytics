# Changelog

All notable changes to the ChainClarify project will be documented in this file.

## [Phase 1.1] - Brand Identity Update

### Changed
- **Design System**: Implemented "Lavender Minimal" Brand Guidelines (v1.0).
- **Color Palette**: Updated to Soft Purple (`#7C3AED`) primary, Warm White (`#FEFEFE`) background, and semantic sentiment colors.
- **Logo**: Replaced text logo with official Hexagonal Dots Icon Mark.
- **Typography**: Switched to system font stack as per guidelines.
- **UI Components**: 
    - Buttons updated to brand gradient (`#7C3AED` -> `#8B5CF6`).
    - Cards updated to 12px radius and lavender mist background (`#FAF9FB`).
    - Status indicators added glow effects for Bullish/Bearish states.

## [Phase 1] - MVP Release

### Added
- **Document Analyzer**: Core component to upload files and display AI analysis.
- **PDF Support**: Integrated binary file reading to support PDF uploads via Gemini `inlineData`.
- **Activity Log**: New sidebar view and service to save/load previous analysis results using LocalStorage.
- **Dashboard**: Visual landing page with mock market data and portfolio charts using `recharts`.
- **Sidebar Navigation**: Responsive left-hand navigation menu.
- **Gemini Integration**: Service layer configured to use `gemini-3-flash-preview` for high-speed, structured JSON responses.

### Technical Details
- Implemented `HistoryItem` interface extending `AnalysisResult`.
- Configured strictly typed JSON schema for Gemini output to ensure consistent UI rendering.