export enum UserType {
  INVESTOR = 'INVESTOR',
  DEVELOPER = 'DEVELOPER',
  RESEARCHER = 'RESEARCHER',
  TRADER = 'TRADER'
}

export interface ExtractedMetric {
  label: string;
  value: string;
  trend: 'UP' | 'DOWN' | 'FLAT' | 'UNKNOWN';
}

export interface TimelineEvent {
  date: string;
  description: string;
}

export interface Entity {
  name: string;
  type: 'BLOCKCHAIN' | 'PROTOCOL' | 'TOKEN' | 'ORG' | 'OTHER';
}

export interface Relationship {
  source: string;
  target: string;
  relation: string;
}

export interface AnalysisResult {
  // 1. Document Intelligence Panel
  summary: string;
  keyFindings: string[]; // 5-7 bullet points
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  sentimentConfidence: number; // 0-100
  complexityScore: number; // 1-10
  complexityLabel: 'Beginner' | 'Intermediate' | 'Advanced';

  // 2. Extracted Metrics Section
  metrics: ExtractedMetric[];
  timeline: TimelineEvent[];
  entities: Entity[];
  comparisons: string[];

  // 3. Visual Intelligence
  relationships: Relationship[]; // For concept map
  riskSignals: string[];

  // 4. Actionable Insights
  investorTakeaway: string;
  relatedMetrics: string[];
  questionsAnswered: string[];
  knowledgeGaps: string[];
  
  // Metadata
  credibilityScore: number; // 1-10
  documentType: string;
}

export interface HistoryItem extends AnalysisResult {
  id: string;
  fileName: string;
  timestamp: number;
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: number; // percentage
  trend: 'UP' | 'DOWN' | 'FLAT';
}