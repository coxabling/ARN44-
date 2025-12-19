
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Wallet, ArrowUpRight, MessageSquare, Music, Rocket, CheckCircle2, Share2, Zap } from 'lucide-react';
import { Station } from '../types';

const data = [
  { name: 'Mon', revenue: 400 },
  { name: 'Tue', revenue: 300 },
  { name: 'Wed', revenue: 600 },
  { name: 'Thu', revenue: 800 },
  { name: 'Fri', revenue: 500 },
  { name: 'Sat', revenue: 900 },
  { name: 'Sun', revenue: 1100 },
];

const StationDashboard: React.FC<{ station: Station }> = ({ station }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [checklist, setChecklist] = useState([
    { id: 1, label: "Add Station Logo", done: true },
    { id: 2, label: "Verify Stream URL", done: true },
    { id: 3, label: "First WhatsApp Share", done: station.onboardingProgress > 50 },
    { id: 4, label: "Set up $1 Micro-tips", done: station.isOptimized },
  ]);

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
    <div className="min-h-screen md:ml-64 p-6 md:p-10 african-pattern pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Studio Command</h1>
            <p className="text-gray-500">Managing {station.name}</p>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={() => handleAction('Edit Profile')}
              className="bg-white border-2 border-[#E5A443] text-[#E5A443] px-6 py-2 rounded-xl font-bold hover:bg-[#E5A443]/5 transition-colors"
             >
               Edit Profile
             </button>
             <button 
              onClick={() => handleAction('Withdraw Funds')}
              className="bg-[#E5A443] text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-orange-200 hover:scale-105 active:scale-95 transition-transform"
             >
               Withdraw Funds
             </button>
          </div>
        </header>

        {/* 30-Day Growth Optimization Module */}
        <div className="bg-gradient-to-r from-[#2C5F2D] to-[#3a7c3c] rounded-[2rem] p-8 text-white shadow-xl flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Rocket size={14} /> 30-Day Growth Plan
                </div>
                <h2 className="text-3xl font-black">Fastest Monetization Path</h2>
                <p className="opacity-80">Our AI suggests enabling Shoutouts and Micro-Tips for your region. Stations using these defaults see 400% more volume.</p>
                <div className="flex gap-4 pt-2">
                    <button 
                        onClick={handleOptimize}
                        disabled={isOptimizing}
                        className="bg-[#E5A443] text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:scale-100"
                    >
                        <Zap size={18} fill="white" />
                        {isOptimizing ? 'APPLYING...' : 'APPLY OPTIMIZED SETTINGS'}
                    </button>
                    <button 
                      onClick={() => handleAction('Growth Share')}
                      className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 active:scale-95"
                    >
                        <Share2 size={18} />
                        DAILY GROWTH SHARE
                    </button>
                </div>
            </div>
            <div className="w-full lg:w-72 bg-white rounded-3xl p-6 text-gray-900 shadow-2xl">
                <h4 className="font-black text-sm uppercase text-gray-400 mb-4 tracking-tighter">Launch Checklist</h4>
                <div className="space-y-3">
                    {checklist.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                            <CheckCircle2 size={18} className={item.done ? "text-green-500" : "text-gray-200"} />
                            <span className={`text-sm font-bold ${item.done ? "text-gray-900" : "text-gray-400"}`}>{item.label}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-xs font-black mb-2">
                        <span>READY TO EARN</span>
                        <span>{Math.round(checklist.filter(i=>i.done).length / checklist.length * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${(checklist.filter(i=>i.done).length / checklist.length) * 100}%` }}></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-2xl"><Wallet size={24}/></div>
              <span className="text-xs font-bold text-green-500 flex items-center"><ArrowUpRight size={14}/> +12%</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">Total Balance</p>
            <h3 className="text-2xl font-black text-gray-900">${station.metrics.totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><Users size={24}/></div>
              <span className="text-xs font-bold text-blue-500 flex items-center"><ArrowUpRight size={14}/> +5%</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">Subscribers</p>
            <h3 className="text-2xl font-black text-gray-900">{station.metrics.subscribers}</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl"><MessageSquare size={24}/></div>
            </div>
            <p className="text-gray-500 text-sm font-medium">Queue: Shoutouts</p>
            <h3 className="text-2xl font-black text-gray-900">14</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl"><Music size={24}/></div>
            </div>
            <p className="text-gray-500 text-sm font-medium">Queue: Requests</p>
            <h3 className="text-2xl font-black text-gray-900">8</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Revenue Growth (7d)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E5A443" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#E5A443" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#E5A443" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pending Requests Queue */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Live Queue</h3>
                <span className="text-xs font-black text-orange-500 bg-orange-50 px-2 py-1 rounded">PRIORITY ON</span>
            </div>
            <div className="space-y-4 flex-1 overflow-y-auto max-h-[400px]">
              {[
                { name: 'Sarah', type: 'shoutout', msg: 'Happy birthday to Kwame in Kumasi!', price: 5 },
                { name: 'James', type: 'request', msg: 'Burna Boy - Last Last', price: 10 },
                { name: 'Musa', type: 'tip', msg: 'Great energy today!', price: 2 },
                { name: 'Efya', type: 'shoutout', msg: 'Testing the new AirPay link!', price: 5 },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all group items-center">
                   <div className="w-12 h-12 rounded-xl bg-orange-50 flex-shrink-0 flex items-center justify-center text-orange-500 font-bold">
                      ${item.price}
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-gray-900 truncate">{item.name} <span className="font-normal text-gray-400 capitalize">• {item.type}</span></p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1 italic">"{item.msg}"</p>
                   </div>
                   <button 
                    onClick={() => handleAction(`Processing ${item.type} from ${item.name}`)}
                    className="opacity-0 group-hover:opacity-100 bg-[#2C5F2D] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95"
                   >
                     READ
                   </button>
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
