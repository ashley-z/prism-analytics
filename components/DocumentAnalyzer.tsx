import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { analyzeDocumentContent } from '../services/geminiService';
import { saveAnalysis } from '../services/historyService';
import { AnalysisResult, UserType, HistoryItem } from '../types';

interface DocumentAnalyzerProps {
  initialData?: HistoryItem | null;
}

export const DocumentAnalyzer: React.FC<DocumentAnalyzerProps> = ({ initialData }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setResult(initialData);
      setFile(null);
    } else {
      setResult(null);
    }
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const fileContent = e.target?.result as string;
        let analysisInput;

        if (file.type === 'application/pdf') {
          const base64Data = fileContent.split(',')[1];
          analysisInput = {
            inlineData: {
              data: base64Data,
              mimeType: 'application/pdf'
            }
          };
        } else {
          analysisInput = { text: fileContent };
        }

        const analysis = await analyzeDocumentContent(analysisInput, UserType.INVESTOR);
        setResult(analysis);
        saveAnalysis(file.name, analysis);

      } catch (err) {
        console.error(err);
        setError("Failed to analyze document. Ensure it is a valid text or PDF file.");
      } finally {
        setIsAnalyzing(false);
      }
    };

    reader.onerror = () => {
      setError("Error reading file.");
      setIsAnalyzing(false);
    };

    if (file.type === 'application/pdf') {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-24">
      {/* Upload Section */}
      {!result && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">Document Intelligence</h2>
            <p className="text-text-secondary text-lg">Upload any crypto whitepaper, report, or contract. Get instant ROI-focused intelligence.</p>
          </div>

          <div className="relative group">
            <Card className={`relative border-dashed border-2 transition-all duration-300 ${
              file ? 'border-success bg-success/5' : 'border-text-tertiary/20 hover:border-primary hover:bg-primary/5'
            }`}>
              <input 
                type="file" 
                onChange={handleFileChange}
                accept=".txt,.json,.csv,.md,.pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className="flex flex-col items-center justify-center py-16 text-center pointer-events-none relative z-10">
                <div className={`p-5 rounded-full mb-6 transition-colors ${
                  file ? 'bg-success/10 text-success' : 'bg-primary/5 text-primary'
                }`}>
                  {file ? (
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                
                {file ? (
                   <div className="animate-fade-in">
                     <p className="text-xl font-bold text-text-primary">{file.name}</p>
                     <p className="text-success mt-2 font-medium">Ready to analyze</p>
                     <p className="text-xs text-text-tertiary mt-1">Click to change file</p>
                   </div>
                ) : (
                   <div>
                     <p className="text-xl font-semibold text-text-primary">Drop your document here</p>
                     <p className="text-text-secondary mt-2 mb-6">PDF, TXT, JSON, MD supported (Max 10MB)</p>
                     <div className="inline-block bg-surface border border-border text-text-secondary px-6 py-2 rounded-lg font-semibold shadow-sm group-hover:text-primary group-hover:border-primary transition-colors">
                        Select File
                     </div>
                   </div>
                )}
              </div>
            </Card>
          </div>

          {file && (
            <div className="flex justify-center animate-fade-in">
               <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`w-full max-w-xs py-3.5 px-6 rounded-lg font-semibold text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center btn-primary-gradient
                  ${isAnalyzing ? 'opacity-75 cursor-not-allowed' : ''}
                `}
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Analyze Document'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Loading Overlay */}
      {isAnalyzing && !result && (
        <div className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
           <div className="bg-surface p-8 rounded-2xl shadow-2xl border border-border max-w-sm w-full text-center">
             <div className="flex justify-center mb-6 space-x-2 animate-pulse-dot">
               {/* Hex Dots Animation */}
               <div className="w-3 h-3 bg-primary rounded-full"></div>
               <div className="w-3 h-3 bg-secondary rounded-full"></div>
               <div className="w-3 h-3 bg-primary rounded-full"></div>
             </div>
             <h3 className="text-lg font-bold text-text-primary mb-2">Analyzing Document</h3>
             <p className="text-text-secondary text-sm">Extracting metrics, sentiment, and risk signals...</p>
           </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
            <div>
               <div className="flex items-center space-x-3 mb-1">
                 <h2 className="text-2xl font-bold text-text-primary">Analysis Report</h2>
                 <span className="px-2 py-1 bg-surface-elevated text-text-secondary border border-border text-xs font-bold rounded-md uppercase tracking-wide">
                   {result.documentType}
                 </span>
               </div>
               <div className="flex items-center space-x-4 text-sm text-text-tertiary">
                 <span>Credibility: <b className="text-text-primary">{result.credibilityScore}/10</b></span>
                 <span>•</span>
                 <span>{initialData ? new Date(initialData.timestamp).toLocaleDateString() : new Date().toLocaleDateString()}</span>
               </div>
            </div>
            
            <div className="flex space-x-2">
               <button onClick={resetAnalysis} className="px-4 py-2 bg-surface text-text-secondary hover:text-text-primary font-medium text-sm border border-border rounded-lg hover:bg-surface-elevated transition-colors">
                 Analyze Another
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-l-4 border-l-primary">
               <div className="mb-6">
                 <h3 className="text-lg font-bold text-text-primary mb-3">Executive Summary</h3>
                 <p className="text-text-secondary leading-relaxed text-base">{result.summary}</p>
               </div>
               <div>
                 <h3 className="text-xs font-bold text-text-tertiary uppercase tracking-wide mb-3">Key Findings</h3>
                 <ul className="space-y-3">
                   {result.keyFindings.map((finding, idx) => (
                     <li key={idx} className="flex items-start">
                       <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                       <span className="text-text-primary font-medium text-sm">{finding}</span>
                     </li>
                   ))}
                 </ul>
               </div>
            </Card>

            <div className="space-y-6">
              <Card>
                <h3 className="text-xs font-bold text-text-tertiary uppercase tracking-wide mb-4">Sentiment Indicator</h3>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className={`w-4 h-4 rounded-full mb-3 ${
                    result.sentiment === 'BULLISH' ? 'bg-success shadow-glow-success' : 
                    result.sentiment === 'BEARISH' ? 'bg-error shadow-glow-error' : 'bg-warning'
                  }`}></div>
                  <span className={`text-2xl font-bold ${
                    result.sentiment === 'BULLISH' ? 'text-success' : 
                    result.sentiment === 'BEARISH' ? 'text-error' : 'text-warning'
                  }`}>
                    {result.sentiment}
                  </span>
                  <span className="text-xs text-text-tertiary mt-1">{result.sentimentConfidence}% Confidence</span>
                </div>
              </Card>

              <Card>
                <h3 className="text-xs font-bold text-text-tertiary uppercase tracking-wide mb-2">Complexity</h3>
                <div className="flex items-end justify-between">
                   <div>
                     <span className="text-3xl font-bold text-text-primary">{result.complexityScore}</span>
                     <span className="text-text-tertiary text-lg">/10</span>
                   </div>
                   <span className="text-sm font-medium text-text-secondary">{result.complexityLabel}</span>
                </div>
                <div className="w-full bg-surface-elevated h-2 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full" 
                    style={{ width: `${result.complexityScore * 10}%` }}
                  ></div>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Numbers That Matter">
              <div className="grid grid-cols-2 gap-4">
                {result.metrics.length > 0 ? result.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <p className="text-[10px] text-text-tertiary uppercase font-bold truncate">{m.label}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-lg font-bold text-text-primary truncate mr-2">{m.value}</span>
                      {m.trend !== 'UNKNOWN' && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          m.trend === 'UP' ? 'bg-success/10 text-success' :
                          m.trend === 'DOWN' ? 'bg-error/10 text-error' :
                          'bg-warning/10 text-warning'
                        }`}>
                          {m.trend === 'UP' ? '▲' : m.trend === 'DOWN' ? '▼' : '−'}
                        </span>
                      )}
                    </div>
                  </div>
                )) : <p className="text-text-tertiary text-sm italic">No specific hard metrics found.</p>}
              </div>
            </Card>

            <Card title="Timeline & Events">
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {result.timeline.length > 0 ? result.timeline.map((event, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {/* Vertical line connector */}
                    {idx !== result.timeline.length - 1 && (
                        <div className="absolute left-[5px] top-2 bottom-[-24px] w-0.5 bg-border"></div>
                    )}
                    <div className="flex-shrink-0 mt-1">
                       <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-bg"></div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary block mb-0.5">{event.date}</span>
                      <p className="text-sm text-text-secondary">{event.description}</p>
                    </div>
                  </div>
                )) : <p className="text-text-tertiary text-sm italic">No timeline events detected.</p>}
              </div>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-text-primary to-[#4A3B55] text-white border-none shadow-xl">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                 <h3 className="text-lg font-bold text-secondary mb-4 flex items-center">
                   <span className="mr-2">💡</span> What This Means For You
                 </h3>
                 <p className="text-white/90 leading-relaxed text-sm">
                   {result.investorTakeaway}
                 </p>
                 
                 <div className="mt-6">
                   <h4 className="text-xs font-bold text-white/60 uppercase tracking-wide mb-2">Metrics to Watch</h4>
                   <div className="flex flex-wrap gap-2">
                     {result.relatedMetrics.map((m, idx) => (
                       <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-secondary border border-white/5">
                         {m}
                       </span>
                     ))}
                   </div>
                 </div>
               </div>

               <div className="space-y-6">
                 <div>
                    <h4 className="text-xs font-bold text-success/90 uppercase tracking-wide mb-2">Questions Answered</h4>
                    <ul className="space-y-2">
                      {result.questionsAnswered.slice(0, 3).map((q, idx) => (
                        <li key={idx} className="flex items-start text-sm text-white/90">
                          <span className="text-success mr-2 font-bold">✓</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                 </div>
                 <div>
                    <h4 className="text-xs font-bold text-warning/90 uppercase tracking-wide mb-2">Knowledge Gaps</h4>
                    <ul className="space-y-2">
                      {result.knowledgeGaps.length > 0 ? result.knowledgeGaps.slice(0, 3).map((g, idx) => (
                        <li key={idx} className="flex items-start text-sm text-white/90">
                          <span className="text-warning mr-2 font-bold">?</span>
                          {g}
                        </li>
                      )) : <li className="text-white/50 text-sm italic">None detected.</li>}
                    </ul>
                 </div>
               </div>
             </div>
          </Card>

        </div>
      )}
    </div>
  );
};