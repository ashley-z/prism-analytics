import { AnalysisResult, HistoryItem } from "../types";

const STORAGE_KEY = 'prism_history';

export const getHistory = (): HistoryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to parse history", e);
    return [];
  }
};

export const saveAnalysis = (fileName: string, result: AnalysisResult): void => {
  try {
    const history = getHistory();
    
    const newItem: HistoryItem = {
      ...result,
      id: crypto.randomUUID(),
      fileName,
      timestamp: Date.now(),
    };

    // Prepend new item (newest first) and limit to last 50
    const updatedHistory = [newItem, ...history].slice(0, 50);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (e) {
    console.error("Failed to save analysis", e);
  }
};

export const clearHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};