import React from 'react';
import { Card } from './ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Mon', value: 4000, market: 2400 },
  { name: 'Tue', value: 3000, market: 1398 },
  { name: 'Wed', value: 2000, market: 9800 },
  { name: 'Thu', value: 2780, market: 3908 },
  { name: 'Fri', value: 1890, market: 4800 },
  { name: 'Sat', value: 2390, market: 3800 },
  { name: 'Sun', value: 3490, market: 4300 },
];

const holdings = [
  { name: 'BTC', value: 45 },
  { name: 'ETH', value: 30 },
  { name: 'SOL', value: 15 },
  { name: 'Stable', value: 10 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">Market Overview</h2>
          <p className="text-text-tertiary mt-1">Welcome back, Investor. Here is your daily spectrum of insights.</p>
        </div>
        <button className="bg-surface border border-border text-text-secondary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-surface-elevated transition-colors">
          Last 7 Days ▼
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Global Market Cap', value: '$2.4T', change: '+2.4%', trend: 'up' },
          { label: 'BTC Dominance', value: '54.2%', change: '-0.1%', trend: 'down' },
          { label: 'Fear & Greed', value: '72', sub: 'Greed', trend: 'flat' },
          { label: 'Gas Price (ETH)', value: '12 gwei', change: '-15%', trend: 'down' },
        ].map((kpi, idx) => (
          <Card key={idx} className="flex flex-col justify-between hover:border-primary/30 transition-all cursor-default relative overflow-hidden group">
            {/* Hex decor */}
            <div className="absolute top-[-10px] right-[-10px] opacity-0 group-hover:opacity-10 transition-opacity">
               <div className="w-16 h-16 bg-primary rounded-full blur-xl"></div>
            </div>
            
            <span className="text-text-tertiary text-xs font-semibold uppercase tracking-wider">{kpi.label}</span>
            <div className="flex items-end justify-between mt-3">
              <span className="text-2xl font-bold text-text-primary">{kpi.value}</span>
              {kpi.change && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  kpi.trend === 'up' ? 'text-success bg-success/10 shadow-glow-success' : 
                  kpi.trend === 'down' ? 'text-error bg-error/10 shadow-glow-error' : 'text-warning bg-warning/10'
                }`}>
                  {kpi.change}
                </span>
              )}
              {kpi.sub && <span className="text-sm font-bold text-success">{kpi.sub}</span>}
            </div>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Portfolio Performance vs Market" className="lg:col-span-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-tertiary)', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-tertiary)', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                  itemStyle={{ color: 'var(--color-text-primary)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                <Area type="monotone" dataKey="market" stroke="#A78BFA" strokeWidth={2} fillOpacity={0} fill="transparent" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Allocation">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={holdings} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-secondary)', fontWeight: 600, fontSize: 12}} width={50}/>
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }} itemStyle={{color: 'var(--color-text-primary)'}}/>
                <Bar dataKey="value" fill="#7C3AED" radius={[0, 6, 6, 0]} barSize={20}>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      {/* Metric Cards Section (Mockup of Document insights) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card title="Recent Insights">
            <div className="space-y-4">
               <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-border">
                  <span className="w-2.5 h-2.5 rounded-full bg-success shadow-glow-success mt-1.5 flex-shrink-0"></span>
                  <div>
                     <h4 className="text-sm font-semibold text-text-primary">Ethereum Scaling Report</h4>
                     <p className="text-xs text-text-secondary mt-1">L2 transaction costs down 78%. Optimism leading adoption.</p>
                     <div className="flex gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md">Ethereum</span>
                        <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded-md">L2</span>
                     </div>
                  </div>
               </div>
               
               <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-border">
                  <span className="w-2.5 h-2.5 rounded-full bg-warning mt-1.5 flex-shrink-0"></span>
                  <div>
                     <h4 className="text-sm font-semibold text-text-primary">DeFi Market Q1</h4>
                     <p className="text-xs text-text-secondary mt-1">TVL stable at $45B. New lending protocols awaiting audit.</p>
                     <div className="flex gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md">DeFi</span>
                     </div>
                  </div>
               </div>
            </div>
         </Card>
         
         <Card title="Quick Stats">
             <div className="grid grid-cols-1 gap-4">
                 <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-border">
                    <span className="text-sm text-text-secondary">Documents Analyzed</span>
                    <span className="text-xl font-bold text-text-primary flex items-center gap-2">
                       <div className="w-2 h-2 bg-primary"></div> 247
                    </span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-border">
                    <span className="text-sm text-text-secondary">Insights Generated</span>
                    <span className="text-xl font-bold text-text-primary flex items-center gap-2">
                       <div className="w-2 h-2 bg-secondary"></div> 1,834
                    </span>
                 </div>
             </div>
         </Card>
      </div>
    </div>
  );
};