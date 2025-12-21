
import React, { useEffect, useState } from 'react';
import { Search, MapPin, ChevronRight, Globe, Zap, Radio, Users, Wallet, ArrowRight, ShieldCheck, Sparkles, Star, TrendingUp, Music } from 'lucide-react';
import { MOCK_STATIONS } from '../constants';
import { Station } from '../types';

interface HomeProps {
  onSelectStation: (station: Station) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectStation }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen md:ml-64 pb-20 dark:bg-[#0A0A0A] transition-colors relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className={`max-w-6xl mx-auto px-6 md:px-10 py-12 space-y-24 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        
        {/* HERO SECTION */}
        <section className="space-y-8 pt-12 md:pt-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
            <Sparkles size={14} /> The Future of African Media
          </div>
          
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tight leading-[0.85] text-gray-900 dark:text-white">
              Radio, <br className="hidden md:block" />
              <span className="text-primary italic">Reimagined.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl font-medium leading-relaxed">
              ARN44 provides premium monetization infrastructure for the continent's most influential independent radio stations.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-6 justify-center md:justify-start">
            <button className="bg-primary text-black px-10 py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20">
              EXPLORE NETWORK <ArrowRight size={20} />
            </button>
            <button className="bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-800 px-10 py-6 rounded-3xl font-bold text-lg hover:border-primary/50 transition-all">
              STATION ONBOARDING
            </button>
          </div>
        </section>

        {/* STATS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: 'Network Reach', val: '12M+', icon: Users, color: 'text-blue-500' },
            { label: 'Active Stations', val: '1,200+', icon: Radio, color: 'text-primary' },
            { label: 'Monetized Daily', val: '$45k+', icon: Wallet, color: 'text-green-500' },
            { label: 'Countries', val: '54', icon: Globe, color: 'text-secondary' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/40 dark:bg-[#151515]/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group">
              <stat.icon size={20} className={`${stat.color} mb-4 group-hover:scale-110 transition-transform`} />
              <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.val}</div>
              <div className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* VALUE PROP: BENTO GRID */}
        <section className="space-y-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">The AirPay44 Advantage</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Why the world's fastest growing stations trust ARN44.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-8 bg-secondary text-white p-10 rounded-[3rem] flex flex-col justify-between relative overflow-hidden group shadow-2xl">
              <div className="relative z-10 space-y-4">
                <ShieldCheck size={48} className="text-primary mb-4" />
                <h3 className="text-4xl font-black max-w-md leading-none">Institutional Grade Infrastructure.</h3>
                <p className="text-white/60 max-w-sm text-lg">Secure payments across all 54 African nations. Local mobile money meets global settlement.</p>
              </div>
              <div className="absolute right-[-10%] bottom-[-10%] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                <Radio size={400} />
              </div>
            </div>
            
            <div className="md:col-span-4 bg-primary p-10 rounded-[3rem] flex flex-col justify-center text-black shadow-2xl group cursor-pointer">
              <Music size={48} className="mb-4 group-hover:animate-bounce" />
              <h3 className="text-3xl font-black leading-none mb-4">Direct Artist Support.</h3>
              <p className="font-bold opacity-70">Empowering creators with real-time fan tipping and analytics.</p>
            </div>

            <div className="md:col-span-4 bg-white dark:bg-[#151515] p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex flex-col justify-between shadow-sm">
               <TrendingUp size={32} className="text-green-500" />
               <div>
                  <h4 className="text-2xl font-black dark:text-white">Global Ads.</h4>
                  <p className="text-gray-500 text-sm mt-2">Connect your station to global brands in minutes.</p>
               </div>
            </div>

            <div className="md:col-span-8 bg-[#151515] dark:bg-primary/5 p-10 rounded-[3rem] flex items-center justify-between border border-white/5 shadow-2xl">
              <div className="space-y-2">
                <div className="flex gap-1 text-primary">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <h4 className="text-2xl font-black text-white dark:text-primary">"The only platform that understands the African media landscape."</h4>
                <p className="text-white/40 font-bold">— Director, Hot FM Lagos</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED STATIONS SECTION */}
        <section className="space-y-12">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Premium Network</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Hand-picked stations with unparalleled community trust.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-primary font-black text-sm tracking-widest hover:gap-4 transition-all">
              VIEW DIRECTORY <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_STATIONS.map((station) => (
              <div 
                key={station.id}
                onClick={() => onSelectStation(station)}
                className="group relative bg-white dark:bg-[#151515] rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-800 flex flex-col"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img src={station.logo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={station.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                    <MapPin size={10} className="text-primary" /> {station.country}
                  </div>
                </div>

                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-none mb-2">{station.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed font-medium">{station.description}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between mt-auto">
                    <div className="flex -space-x-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-[#151515] bg-gray-100 dark:bg-[#2A2A2A] overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Supporter" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="text-primary group-hover:translate-x-2 transition-transform">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA HERO */}
        <section className="bg-dark rounded-[4rem] p-12 md:p-24 text-white text-center relative overflow-hidden african-pattern">
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter">
              Ready to <span className="text-primary italic">Transform</span> Your Broadcast?
            </h2>
            <p className="text-xl text-white/60 font-medium">Join 1,200+ stations already using ARN44 to grow their audience and double their revenue.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-primary text-black px-12 py-6 rounded-[2rem] font-black text-lg hover:scale-105 active:scale-95 transition-all">
                GET STARTED NOW
              </button>
              <button className="bg-white/5 border border-white/10 backdrop-blur-md text-white px-10 py-6 rounded-[2rem] font-bold text-lg hover:bg-white/10 transition-all">
                CONTACT SALES
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
