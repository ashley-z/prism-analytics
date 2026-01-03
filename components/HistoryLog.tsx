import React, { useEffect, useState } from 'react';
import { Card } from './ui/Card';
import { HistoryItem } from '../types';
import { getHistory } from '../services/historyService';

interface HistoryLogProps {
  onSelectAnalysis: (item: HistoryItem) => void;
}

export const HistoryLog: React.FC<HistoryLogProps> = ({ onSelectAnalysis }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="bg-surface-elevated p-6 rounded-full mb-4 shadow-sm border border-border">
          <span className="text-4xl">🕰️</span>
        </div>
        <h2 className="text-xl font-bold text-text-primary">No History Yet</h2>
        <p className="text-text-secondary mt-2">Analyze your first document to build your log.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-text-primary">Activity Log</h2>
           <p className="text-text-secondary">Your recent document analyses.</p>
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-text-primary">Date</th>
                <th className="px-6 py-4 font-semibold text-text-primary">Document Name</th>
                <th className="px-6 py-4 font-semibold text-text-primary">Type</th>
                <th className="px-6 py-4 font-semibold text-text-primary">Sentiment</th>
                <th className="px-6 py-4 font-semibold text-text-primary">Complexity</th>
                <th className="px-6 py-4 font-semibold text-text-primary">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-surface transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(item.timestamp).toLocaleDateString()}
                    <span className="text-xs text-text-tertiary block">{new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-text-primary">{item.fileName}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-surface-elevated border border-border rounded text-xs font-semibold uppercase tracking-wide">
                      {item.documentType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 font-medium ${
                      item.sentiment === 'BULLISH' ? 'text-success' :
                      item.sentiment === 'BEARISH' ? 'text-error' : 'text-warning'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        item.sentiment === 'BULLISH' ? 'bg-success' :
                        item.sentiment === 'BEARISH' ? 'bg-error' : 'bg-warning'
                      }`}></span>
                      {item.sentiment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                       <div className="w-16 bg-surface-elevated h-1.5 rounded-full overflow-hidden border border-border">
                         <div className="bg-text-secondary h-full" style={{ width: `${item.complexityScore * 10}%` }}></div>
                       </div>
                       <span className="text-xs text-text-tertiary">{item.complexityLabel}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onSelectAnalysis(item)}
                      className="text-primary hover:text-secondary font-medium text-sm hover:underline"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};