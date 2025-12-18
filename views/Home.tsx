
import React from 'react';
import { Search, MapPin, Star, ChevronRight, Globe, Zap } from 'lucide-react';
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
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight">
            Radio <span className="text-[#E5A443]">Powered</span> by the People.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl">
            ARN44 connects African radio stations with their global audiences. Support your favorite station through instant monetization.
          </p>
          
          <div className="relative max-w-2xl pt-6">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            <input 
              type="text" 
              placeholder="Search by station, city, or country..." 
              className="w-full p-6 pl-16 rounded-3xl bg-white shadow-xl border-none outline-none text-lg focus:ring-4 ring-[#E5A443]/20 transition-all"
            />
          </div>
        </div>

        {/* Quick Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
                <div className="bg-orange-100 p-3 rounded-2xl text-orange-600"><Zap size={24}/></div>
                <div>
                    <h4 className="font-black text-gray-900">Instant Alerts</h4>
                    <p className="text-sm text-gray-500">DJs hear your message in real-time.</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600"><Globe size={24}/></div>
                <div>
                    <h4 className="font-black text-gray-900">Global Payments</h4>
                    <p className="text-sm text-gray-500">Pay locally or from the diaspora.</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
                <div className="bg-green-100 p-3 rounded-2xl text-green-600"><Star size={24}/></div>
                <div>
                    <h4 className="font-black text-gray-900">Direct Support</h4>
                    <p className="text-sm text-gray-500">Keep independent voices alive.</p>
                </div>
            </div>
        </div>

        {/* Featured Stations */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-black text-gray-900">Explore Stations</h2>
            <button className="text-[#E5A443] font-bold flex items-center gap-1 hover:gap-2 transition-all">
              SEE ALL <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_STATIONS.map((station) => (
              <div 
                key={station.id}
                onClick={() => onSelectStation(station)}
                className="bg-white group rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer border border-gray-100 hover:-translate-y-2"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={station.logo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl flex items-center gap-1 text-sm font-bold shadow-sm">
                    <MapPin size={16} className="text-[#E5A443]" />
                    {station.country}
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1">{station.name}</h3>
                    <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed">{station.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <img key={i} src={`https://picsum.photos/seed/${i + station.id}/50/50`} className="w-10 h-10 rounded-full border-4 border-white object-cover" />
                      ))}
                      <div className="w-10 h-10 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">+20k</div>
                    </div>
                    <button className="bg-[#E5A443] text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-[#E5A443]/30">SUPPORT</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ad Call to Action */}
        <div className="bg-[#E5A443] rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-6 max-w-xl">
                <h2 className="text-4xl md:text-5xl font-black leading-tight">Advertise Across the Entire Network.</h2>
                <p className="text-xl opacity-90">Reach millions of listeners across Africa and the Diaspora. Start your campaign in 5 minutes.</p>
                <button className="bg-black text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 transition-transform">GET STARTED NOW</button>
            </div>
            {/* Design Element */}
            <div className="absolute right-[-10%] top-[-20%] w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
