import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { DocumentAnalyzer } from './components/DocumentAnalyzer';
import { HistoryLog } from './components/HistoryLog';
import { Card } from './components/ui/Card';
import { HistoryItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analyze');
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initialize theme from local storage or system preference
    const savedTheme = localStorage.getItem('prism-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('prism-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'analyze') {
      setSelectedHistoryItem(null);
    } else {
        setSelectedHistoryItem(null);
    }
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setSelectedHistoryItem(item);
    setActiveTab('analyze');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'analyze':
        return <DocumentAnalyzer initialData={selectedHistoryItem} />;
      case 'history':
        return <HistoryLog onSelectAnalysis={handleSelectHistory} />;
      case 'profile':
        return (
          <div className="animate-fade-in space-y-6">
             <h2 className="text-2xl font-bold text-text-primary">User Profile</h2>
             <Card title="Account Settings">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl">👤</div>
                  <div>
                    <h3 className="font-bold text-lg text-text-primary">Investment User</h3>
                    <p className="text-text-secondary text-sm">investor@example.com</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg bg-surface">
                    <p className="text-xs text-text-tertiary uppercase font-semibold">Preference</p>
                    <p className="text-text-primary font-medium mt-1">ROI & Risk Analysis</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg bg-surface">
                    <p className="text-xs text-text-tertiary uppercase font-semibold">Skill Level</p>
                    <p className="text-text-primary font-medium mt-1">Beginner / Intermediate</p>
                  </div>
                </div>
             </Card>
             <Card>
                <p className="text-center text-text-tertiary py-8">
                  Coming in Phase 2: Wallet Integration & Advanced Alerts
                </p>
             </Card>
          </div>
        );
      default:
        return <DocumentAnalyzer />;
    }
  };

  return (
    <div className="flex min-h-screen font-sans transition-colors duration-300">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto bg-bg h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Area */}
          <header className="flex justify-between items-center mb-8">
            <div className="relative w-96 group">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary group-focus-within:text-primary transition-colors">🔍</span>
              <input 
                type="text" 
                placeholder="Search metrics, reports, or terms..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-primary placeholder-text-tertiary shadow-sm text-sm transition-all"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-text-tertiary hover:text-text-primary transition-colors">
                🔔
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-surface-elevated"></span>
              </button>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-secondary border-2 border-surface-elevated shadow-md cursor-pointer hover:scale-105 transition-transform"></div>
            </div>
          </header>

          {/* Content Area */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;