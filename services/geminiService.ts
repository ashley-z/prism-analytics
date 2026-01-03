import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, UserType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-3-flash-preview";

export const analyzeDocumentContent = async (
  input: { text?: string; inlineData?: { data: string; mimeType: string } }, 
  userType: UserType = UserType.INVESTOR
): Promise<AnalysisResult> => {
  
  const systemPrompt = `
    You are Prism's AI engine. Perform a deep-dive analysis on the following blockchain/crypto document.
    
    Target Audience: ${userType} (Focus on ROI, Risk, and Strategic Value).
    
    Your task is to extract structured intelligence:
    1. Executive Overview & Sentiment (with confidence).
    2. Hard Metrics & Timelines.
    3. Visual Relationships (how entities connect).
    4. Actionable Advice for an Investor.
    
    Return strictly valid JSON matching the schema.
  `;

  // Construct parts based on input type
  const parts: any[] = [{ text: systemPrompt }];

  if (input.text) {
    parts.push({ text: `\n\nDocument Content:\n${input.text.substring(0, 60000)}` });
  } else if (input.inlineData) {
    parts.push({ inlineData: input.inlineData });
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "3-4 sentence executive summary." },
            keyFindings: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "5-7 most important bullet point insights." 
            },
            sentiment: { type: Type.STRING, enum: ["BULLISH", "BEARISH", "NEUTRAL"] },
            sentimentConfidence: { type: Type.NUMBER, description: "Confidence score 0-100." },
            complexityScore: { type: Type.NUMBER, description: "1-10 score." },
            complexityLabel: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] },
            
            metrics: {
              type: Type.ARRAY,
              description: "Specific numbers mentioned (TVL, APY, Cap, etc).",
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING },
                  trend: { type: Type.STRING, enum: ["UP", "DOWN", "FLAT", "UNKNOWN"] }
                }
              }
            },
            timeline: {
              type: Type.ARRAY,
              description: "Dates and events mentioned.",
              items: {
                type: Type.OBJECT,
                properties: {
                  date: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            entities: {
              type: Type.ARRAY,
              description: "Key entities mentioned.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["BLOCKCHAIN", "PROTOCOL", "TOKEN", "ORG", "OTHER"] }
                }
              }
            },
            comparisons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Competitive comparisons found." },
            
            relationships: {
              type: Type.ARRAY,
              description: "For concept map: Entity A -> Relation -> Entity B",
              items: {
                type: Type.OBJECT,
                properties: {
                  source: { type: Type.STRING },
                  target: { type: Type.STRING },
                  relation: { type: Type.STRING }
                }
              }
            },
            riskSignals: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Warnings, risks, or caveats." },
            
            investorTakeaway: { type: Type.STRING, description: "Personalized 'What This Means For You'." },
            relatedMetrics: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Suggested metrics to watch." },
            questionsAnswered: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Common questions this doc answers." },
            knowledgeGaps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "What is missing or ambiguous." },
            
            credibilityScore: { type: Type.NUMBER, description: "1-10 based on tone and sourcing." },
            documentType: { type: Type.STRING, description: "Whitepaper, News, Technical Spec, etc." },
          },
          required: [
            "summary", "keyFindings", "sentiment", "sentimentConfidence", "complexityScore", 
            "complexityLabel", "metrics", "timeline", "entities", "comparisons", 
            "relationships", "riskSignals", "investorTakeaway", "relatedMetrics", 
            "questionsAnswered", "knowledgeGaps", "credibilityScore", "documentType"
          ]
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    throw new Error("No response text from Gemini");

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback stub
    return {
      summary: "Analysis failed. Please try again or check the document format.",
      keyFindings: [],
      sentiment: "NEUTRAL",
      sentimentConfidence: 0,
      complexityScore: 0,
      complexityLabel: "Beginner",
      metrics: [],
      timeline: [],
      entities: [],
      comparisons: [],
      relationships: [],
      riskSignals: ["Analysis error occurred"],
      investorTakeaway: "N/A",
      relatedMetrics: [],
      questionsAnswered: [],
      knowledgeGaps: [],
      credibilityScore: 0,
      documentType: "Unknown"
    };
  }
};