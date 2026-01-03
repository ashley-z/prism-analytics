import React from 'react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const HexLogo = ({ size = 32 }: { size?: number }) => {
  // Scaling factors based on 130px standard
  const scale = size / 130;
  const centerSize = 18 * (130/130) * scale;
  const outerSize = 12 * (130/130) * scale;
  
  // Positions relative to 130px box
  const center = { top: 56 * scale, left: 56 * scale };
  const dots = [
    { top: 12 * scale, left: 59 * scale, color: '#8B5CF6' },
    { top: 34 * scale, left: 96 * scale, color: '#9F7FFA' },
    { top: 78 * scale, left: 96 * scale, color: '#A78BFA' },
    { top: 100 * scale, left: 59 * scale, color: '#B4A3FF' },
    { top: 78 * scale, left: 22 * scale, color: '#A78BFA' },
    { top: 34 * scale, left: 22 * scale, color: '#9F7FFA' },
  ];

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      {/* Center Dot */}
      <div 
        className="absolute rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/40"
        style={{ width: centerSize, height: centerSize, top: center.top, left: center.left }}
      />
      {/* Outer Dots */}
      {dots.map((dot, i) => (
        <div 
          key={i}
          className="absolute rounded-full"
          style={{ 
            width: outerSize, 
            height: outerSize, 
            top: dot.top, 
            left: dot.left,
            backgroundColor: dot.color 
          }}
        />
      ))}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, theme, onToggleTheme }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analyze', label: 'Analyze Docs', icon: '📁' },
    { id: 'history', label: 'Document Log', icon: '📚' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
  ];

  return (
    <aside className="w-64 bg-surface text-text-primary h-screen fixed left-0 top-0 flex flex-col z-10 border-r border-border transition-colors duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-3">
           <HexLogo size={48} />
           <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              Prism
            </h1>
           </div>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
              activeTab === item.id
                ? 'bg-primary text-white shadow-lg shadow-primary/30 transform translate-y-[-1px]'
                : 'text-text-secondary hover:bg-surface-elevated hover:text-primary'
            }`}
          >
            <span className="text-lg opacity-90">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-4">
        {/* Theme Toggle */}
        <button 
          onClick={onToggleTheme}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-elevated border border-border text-xs font-semibold text-text-secondary hover:border-primary/30 transition-colors"
        >
           <span className="flex items-center gap-2">
             {theme === 'light' ? '🌞 Light' : '🌙 Dark'} 
           </span>
           <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}>
             <div className={`w-3 h-3 rounded-full bg-white shadow-sm transform transition-transform ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`}></div>
           </div>
        </button>

        <div className="bg-surface-elevated border border-border rounded-xl p-4">
          <p className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider mb-2">Free Plan</p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-text-primary">2/5 Uploads</span>
            <span className="text-[10px] text-success bg-success/10 px-2 py-0.5 rounded-full font-bold">Active</span>
          </div>
          <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full w-2/5"></div>
          </div>
          <button className="w-full mt-3 text-xs text-primary font-bold hover:underline">Upgrade to Pro</button>
        </div>
      </div>
    </aside>
  );
};