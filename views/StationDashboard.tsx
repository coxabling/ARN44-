
import React, { useState, useEffect } from 'react';
import { Users, Wallet, ArrowUpRight, MessageSquare, Music, Rocket, CheckCircle2, Share2, Zap, BrainCircuit, Sparkles, Loader2 } from 'lucide-react';
import { Station } from '../types';
import { getStationAdvice } from '../services/geminiService';

const revenueData = [
  { name: 'Mon', revenue: 400 },
  { name: 'Tue', revenue: 300 },
  { name: 'Wed', revenue: 600 },
  { name: 'Thu', revenue: 800 },
  { name: 'Fri', revenue: 500 },
  { name: 'Sat', revenue: 900 },
  { name: 'Sun', revenue: 1100 },
];

const SimpleAreaChart = ({ data }: { data: typeof revenueData }) => {
  const maxVal = Math.max(...data.map(d => d.revenue)) * 1.2;
  const width = 400;
  const height = 200;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (d.revenue / maxVal) * height;
    return `${x},${y}`;
  }).join(' ');
  const fillPath = `0,${height} ${points} ${width},${height}`;

  return (
    <div className="w-full h-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {[0, 0.25, 0.5, 0.75, 1].map((p) => (
          <line key={p} x1="0" y1={height * p} x2={width} y2={height * p} className="stroke-gray-100 dark:stroke-gray-800" strokeWidth="1" />
        ))}
        <polygon points={fillPath} className="fill-[#E5A443]/10 dark:fill-[#E5A443]/5" />
        <polyline fill="none" stroke="#E5A443" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={points} />
        {data.map((d, i) => (
          <circle key={i} cx={(i / (data.length - 1)) * width} cy={height - (d.revenue / maxVal) * height} r="4" fill="#E5A443" stroke="white" className="dark:stroke-[#1E1E1E]" strokeWidth="2" />
        ))}
      </svg>
      <div className="flex justify-between mt-2 px-1">
        {data.map(d => <span key={d.name} className="text-[10px] font-bold text-gray-400 dark:text-gray-600">{d.name}</span>)}
      </div>
    </div>
  );
};

const StationDashboard: React.FC<{ station: Station }> = ({ station }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [aiAdvice, setAiAdvice] = useState('Generating strategy...');
  const [loadingAdvice, setLoadingAdvice] = useState(true);
  const [checklist, setChecklist] = useState([
    { id: 1, label: "Add Station Logo", done: true },
    { id: 2, label: "Verify Stream URL", done: true },
    { id: 3, label: "First WhatsApp Share", done: station.onboardingProgress > 50 },
    { id: 4, label: "Set up $1 Micro-tips", done: station.isOptimized },
  ]);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const advice = await getStationAdvice(station.name, station.metrics);
        setAiAdvice(advice || "Keep engaging your listeners!");
      } catch (err) {
        setAiAdvice("Focus on diaspora subscriptions this month.");
      } finally {
        setLoadingAdvice(false);
      }
    };
    fetchAdvice();
  }, [station]);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
        setIsOptimizing(false);
        alert("Optimization Applied! Your station is now set for maximum growth.");
    }, 2000);
  };

  const handleAction = (type: string) => {
    alert(`${type} feature coming soon to your studio dashboard!`);
  };

  return (
    <div className="min-h-screen md:ml-64 p-6 md:p-10 african-pattern pb-24 md:pb-10 dark:bg-[#121212] transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Studio Command</h1>
            <p className="text-gray-500 dark:text-gray-400">Managing {station.name}</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => handleAction('Edit Profile')} className="bg-white dark:bg-[#1E1E1E] border-2 border-[#E5A443] text-[#E5A443] px-6 py-2 rounded-xl font-bold hover:bg-[#E5A443]/5 transition-colors">Edit Profile</button>
             <button onClick={() => handleAction('Withdraw Funds')} className="bg-[#E5A443] text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-orange-200 dark:shadow-none hover:scale-105 active:scale-95 transition-transform">Withdraw Funds</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Growth Plan */}
          <div className="lg:col-span-2 bg-gradient-to-r from-[#2C5F2D] to-[#3a7c3c] rounded-[2rem] p-8 text-white shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Rocket size={14} /> 30-Day Growth Plan
                </div>
                <h2 className="text-3xl font-black">Fastest Monetization Path</h2>
                <p className="opacity-80">Stations using our micro-tipping defaults see 400% more transaction volume on average.</p>
                <div className="flex gap-4 pt-2">
                    <button onClick={handleOptimize} disabled={isOptimizing} className="bg-[#E5A443] text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:scale-100">
                        <Zap size={18} fill="white" />
                        {isOptimizing ? 'APPLYING...' : 'APPLY SETTINGS'}
                    </button>
                    <button onClick={() => handleAction('Growth Share')} className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 active:scale-95">
                        <Share2 size={18} /> SHARE
                    </button>
                </div>
            </div>
            <div className="w-full md:w-64 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                 <h4 className="font-bold text-xs uppercase opacity-60 mb-3">Launch Readiness</h4>
                 <div className="space-y-2">
                    {checklist.map(item => (
                        <div key={item.id} className="flex items-center gap-2 text-xs">
                            <CheckCircle2 size={14} className={item.done ? "text-[#E5A443]" : "text-white/20"} />
                            <span className={item.done ? "text-white" : "text-white/40"}>{item.label}</span>
                        </div>
                    ))}
                 </div>
            </div>
          </div>

          {/* AI Strategy Advice */}
          <div className="bg-[#1A1A1A] dark:bg-black p-8 rounded-[2rem] text-white shadow-2xl flex flex-col justify-between border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                <BrainCircuit size={100} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-[#E5A443]" size={20} />
                    <h3 className="text-xl font-black">AI Strategy</h3>
                </div>
                {loadingAdvice ? (
                    <div className="flex items-center gap-3 py-4">
                        <Loader2 className="animate-spin text-gray-500" />
                        <span className="text-sm italic text-gray-400">Consulting network data...</span>
                    </div>
                ) : (
                    <p className="text-lg font-medium leading-relaxed italic text-orange-50 underline decoration-[#E5A443]/30 decoration-wavy underline-offset-4">
                        "{aiAdvice}"
                    </p>
                )}
            </div>
            <div className="mt-6">
                <button onClick={() => alert("Detailed Strategy Coming Soon")} className="text-xs font-black text-[#E5A443] hover:underline">VIEW FULL REPORT →</button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl"><Wallet size={24}/></div>
              <span className="text-xs font-bold text-green-500 dark:text-green-400 flex items-center"><ArrowUpRight size={14}/> +12%</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Balance</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">${station.metrics.totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl"><Users size={24}/></div>
              <span className="text-xs font-bold text-blue-500 dark:text-blue-400 flex items-center"><ArrowUpRight size={14}/> +5%</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Subscribers</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">{station.metrics.subscribers}</h3>
          </div>
          <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl"><MessageSquare size={24}/></div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Queue: Shoutouts</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">14</h3>
          </div>
          <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl"><Music size={24}/></div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Queue: Requests</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">8</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-[#1E1E1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <h3 className="text-xl font-bold mb-6 dark:text-white">Revenue Growth (7d)</h3>
            <div className="h-80 w-full pt-4">
              <SimpleAreaChart data={revenueData} />
            </div>
          </div>

          <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col transition-colors">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold dark:text-white">Live Queue</h3>
                <span className="text-xs font-black text-orange-500 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded">PRIORITY ON</span>
            </div>
            <div className="space-y-4 flex-1 overflow-y-auto max-h-[400px]">
              {[
                { name: 'Sarah', type: 'shoutout', msg: 'Happy birthday to Kwame in Kumasi!', price: 5 },
                { name: 'James', type: 'request', msg: 'Burna Boy - Last Last', price: 10 },
                { name: 'Musa', type: 'tip', msg: 'Great energy today!', price: 2 },
                { name: 'Efya', type: 'shoutout', msg: 'Testing the new AirPay link!', price: 5 },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] rounded-2xl transition-all group items-center">
                   <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex-shrink-0 flex items-center justify-center text-orange-500 dark:text-orange-400 font-bold">
                      ${item.price}
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-gray-900 dark:text-white truncate">{item.name} <span className="font-normal text-gray-400 dark:text-gray-500 capitalize">• {item.type}</span></p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 italic">"{item.msg}"</p>
                   </div>
                   <button onClick={() => handleAction(`Processing ${item.type} from ${item.name}`)} className="opacity-0 group-hover:opacity-100 bg-[#2C5F2D] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95">READ</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDashboard;
