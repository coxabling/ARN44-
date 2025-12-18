
import React, { useState } from 'react';
import { Plus, Play, Info, BarChart2, MapPin, Target } from 'lucide-react';
import { MOCK_ADS } from '../constants';

const AdvertiserDashboard: React.FC = () => {
  const [ads, setAds] = useState(MOCK_ADS);
  
  return (
    <div className="min-h-screen md:ml-64 p-6 md:p-10 african-pattern pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Ad Manager</h1>
            <p className="text-gray-500">Global reach for local products</p>
          </div>
          <button className="bg-[#2C5F2D] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all">
            <Plus size={20} />
            CREATE NEW CAMPAIGN
          </button>
        </header>

        {/* Ad Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${ad.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {ad.status.toUpperCase()}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600"><Info size={18}/></button>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{ad.title}</h3>
                <p className="text-gray-500 text-sm italic mb-4">"{ad.content}"</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-[#E5A443]" />
                    {ad.targetCountries.join(', ')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target size={16} className="text-blue-500" />
                    {ad.impressions.toLocaleString()} Listeners Reached
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#E5A443] h-full transition-all" 
                    style={{ width: `${(ad.spent / ad.budget) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>SPENT: ${ad.spent}</span>
                  <span>BUDGET: ${ad.budget}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200">ANALYTICS</button>
                  <button className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200"><Play size={20}/></button>
                </div>
              </div>
            </div>
          ))}

          {/* New Ad Placeholder */}
          <button className="border-4 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-10 text-gray-400 hover:border-[#E5A443] hover:text-[#E5A443] transition-all group">
            <Plus size={48} className="mb-4 group-hover:scale-110 transition-transform" />
            <span className="font-bold">LAUNCH NEW AD</span>
          </button>
        </div>

        {/* Global Network Insights */}
        <div className="bg-[#2C5F2D] rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-black">Network Reach</h2>
                <p className="text-green-100 text-lg">Your ads are distributed across 1,000+ independent radio stations across 54 African countries.</p>
                <div className="flex gap-10 pt-4">
                    <div>
                        <p className="text-4xl font-black">12.5M</p>
                        <p className="text-xs font-bold text-green-300">DAILY LISTENERS</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black">4.2M</p>
                        <p className="text-xs font-bold text-green-300">DIASPORA REACH</p>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <h4 className="font-bold mb-4">Top Regions</h4>
                <div className="space-y-3">
                    {['West Africa', 'East Africa', 'Southern Africa', 'Global Diaspora'].map((region, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <span>{region}</span>
                            <div className="w-24 h-2 bg-white/20 rounded-full">
                                <div className="h-full bg-white rounded-full" style={{ width: `${80 - i*15}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
