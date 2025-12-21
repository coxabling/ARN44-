
import React from 'react';
import { Search, MapPin, Star, ChevronRight, Globe, Zap, Radio, Users, Wallet } from 'lucide-react';
import { MOCK_STATIONS } from '../constants';
import { Station } from '../types';

interface HomeProps {
  onSelectStation: (station: Station) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectStation }) => {
  return (
    <div className="min-h-screen md:ml-64 p-6 md:p-10 african-pattern pb-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="space-y-4 pt-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-[#E5A443] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <Radio size={14} /> The Voice of the Continent
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9]">
            Radio <span className="text-[#E5A443] drop-shadow-sm">Powered</span> <br className="hidden md:block"/> by the People.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            ARN44 is the monetization engine for African radio. Join thousands of listeners supporting local independent voices.
          </p>
          
          <div className="relative max-w-2xl pt-8">
            <Search className="absolute left-6 top-[calc(50%+16px)] -translate-y-1/2 text-gray-400" size={24} />
            <input 
              type="text" 
              placeholder="Search by station, city, or country..." 
              className="w-full p-7 pl-16 rounded-[2rem] bg-white shadow-2xl border-2 border-transparent outline-none text-lg focus:border-[#E5A443]/50 transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Dynamic Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
                { label: 'Active Stations', val: '1.2k+', icon: Radio, color: 'text-blue-500' },
                { label: 'Daily Listeners', val: '2.5M+', icon: Users, color: 'text-green-500' },
                { label: 'Direct Revenue', val: '$140k', icon: Wallet, color: 'text-orange-500' },
                { label: 'Countries', val: '54', icon: Globe, color: 'text-purple-500' },
            ].map((stat, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm p-6 rounded-[2rem] border border-white/40 shadow-sm flex flex-col items-center text-center space-y-1">
                    <stat.icon size={20} className={stat.color} />
                    <span className="text-2xl font-black text-gray-900 tracking-tight">{stat.val}</span>
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</span>
                </div>
            ))}
        </div>

        {/* Featured Stations */}
        <section className="space-y-8">
          <div className="flex justify-between items-end border-b-2 border-gray-100 pb-4">
            <h2 className="text-4xl font-black text-gray-900">Explore Stations</h2>
            <button 
              onClick={() => alert("Loading full station directory...")}
              className="text-[#E5A443] font-black flex items-center gap-1 hover:gap-3 transition-all tracking-tighter"
            >
              SEE ALL DIRECTORY <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_STATIONS.map((station) => (
              <div 
                key={station.id}
                onClick={() => onSelectStation(station)}
                className="bg-white group rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer border border-gray-50 hover:-translate-y-3"
              >
                <div className="h-56 relative overflow-hidden">
                  <img src={station.logo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={station.name} />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-1.5 text-[10px] font-black uppercase shadow-xl tracking-widest">
                    <MapPin size={12} className="text-[#E5A443]" />
                    {station.country}
                  </div>
                  <div className="absolute bottom-4 left-6 flex gap-1">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-green-500 shadow-sm"></div>
                     <span className="text-[10px] text-white font-black drop-shadow-md">LIVE NOW</span>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 mb-2 leading-none">{station.name}</h3>
                    <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed">{station.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <img key={i} src={`https://picsum.photos/seed/${i + station.id}/100/100`} className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-sm" alt="Supporter" />
                      ))}
                      <div className="w-12 h-12 rounded-full border-4 border-white bg-[#FCF8F1] flex items-center justify-center text-[10px] font-black text-gray-400">+20k</div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStation(station);
                      }}
                      className="bg-[#E5A443] text-white px-8 py-3 rounded-2xl font-black text-xs shadow-xl shadow-[#E5A443]/30 hover:bg-[#d48c2c] transition-all transform active:scale-90"
                    >
                      SUPPORT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Advertiser Hero */}
        <div className="bg-[#1A1A1A] rounded-[4rem] p-16 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-8 max-w-2xl">
                <div className="bg-white/10 w-fit px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Ad Network</div>
                <h2 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter">
                  Scale your brand <br/> <span className="text-[#E5A443]">across 54 nations.</span>
                </h2>
                <p className="text-xl opacity-60 font-medium">Reach 12M+ engaged listeners. Use our AI tools to generate, launch, and track campaigns in minutes.</p>
                <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <button 
                      onClick={() => alert("Redirecting to Advertiser Onboarding...")}
                      className="bg-[#E5A443] text-black px-12 py-6 rounded-[2rem] font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                      LAUNCH CAMPAIGN
                    </button>
                    <button 
                      onClick={() => alert("Opening Network Media Kit...")}
                      className="bg-white/5 border border-white/10 backdrop-blur-md text-white px-10 py-6 rounded-[2rem] font-bold text-lg hover:bg-white/10 transition-all"
                    >
                      VIEW MEDIA KIT
                    </button>
                </div>
            </div>
            {/* Design Element */}
            <div className="absolute right-[-10%] top-[-10%] opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-1000">
                <Globe size={600} className="text-white" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
