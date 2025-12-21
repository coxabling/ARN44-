
import React, { useState } from 'react';
import { Plus, Play, Info, MapPin, Target, Sparkles, Wand2, Copy, Loader2 } from 'lucide-react';
import { MOCK_ADS } from '../constants';
import { generateAdScripts } from '../services/geminiService';

const AdvertiserDashboard: React.FC = () => {
  const [ads, setAds] = useState(MOCK_ADS);
  const [scriptPrompt, setScriptPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScripts, setGeneratedScripts] = useState<any[]>([]);

  const handleAction = (label: string) => {
    alert(`${label} action triggered! Connect your AirPay44 account to proceed.`);
  };

  const handleGenerateScripts = async () => {
    if (!scriptPrompt) return;
    setIsGenerating(true);
    try {
      const scripts = await generateAdScripts(scriptPrompt);
      setGeneratedScripts(scripts);
    } catch (error) {
      console.error(error);
      alert("AI Script generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="min-h-screen md:ml-64 p-6 md:p-10 african-pattern pb-24 md:pb-10 dark:bg-[#121212] transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Ad Manager</h1>
            <p className="text-gray-500 dark:text-gray-400">Global reach for local products</p>
          </div>
          <button 
            onClick={() => handleAction('Create Campaign')}
            className="bg-[#2C5F2D] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-green-900/10 dark:shadow-none"
          >
            <Plus size={20} />
            CREATE NEW CAMPAIGN
          </button>
        </header>

        {/* AI Script Lab */}
        <section className="bg-gradient-to-br from-[#E5A443] to-[#d48c2c] p-1 rounded-[2.5rem] shadow-xl">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-[2.4rem] p-8 space-y-6 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-[#E5A443] p-2 rounded-xl text-white">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">AI Script Lab</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Let Gemini write your 30s radio spots instantly.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <input 
                type="text" 
                value={scriptPrompt}
                onChange={(e) => setScriptPrompt(e.target.value)}
                placeholder="Describe your product (e.g., 'A fresh mango juice brand in Accra')..."
                className="flex-1 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-800 dark:bg-[#2A2A2A] dark:text-white focus:border-[#E5A443] outline-none transition-all placeholder:dark:text-gray-600"
              />
              <button 
                onClick={handleGenerateScripts}
                disabled={isGenerating || !scriptPrompt}
                className="bg-black dark:bg-[#E5A443] text-white dark:text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-[#f5b453] disabled:opacity-50 transition-all"
              >
                {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
                GENERATE
              </button>
            </div>

            {generatedScripts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {generatedScripts.map((s, i) => (
                  <div key={i} className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black uppercase text-orange-600 dark:text-orange-400 bg-white dark:bg-[#1E1E1E] px-2 py-1 rounded">Option {i+1}</span>
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 italic">{s.tone}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">{s.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic line-clamp-4">"{s.script}"</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(s.script);
                        alert("Copied to clipboard!");
                      }}
                      className="w-full mt-4 py-2 bg-white dark:bg-[#2A2A2A] border border-orange-200 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-orange-100 dark:hover:bg-[#333]"
                    >
                      <Copy size={14} /> COPY SCRIPT
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Ad Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between transition-colors">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${ad.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-500'}`}>
                    {ad.status.toUpperCase()}
                  </span>
                  <button 
                    onClick={() => handleAction('Campaign Details')}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <Info size={18}/>
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{ad.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm italic mb-4 line-clamp-2">"{ad.content}"</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-500">
                    <MapPin size={16} className="text-[#E5A443]" />
                    {ad.targetCountries.join(', ')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-500">
                    <Target size={16} className="text-blue-500 dark:text-blue-400" />
                    {ad.impressions.toLocaleString()} Listeners Reached
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#E5A443] h-full transition-all" 
                    style={{ width: `${(ad.spent / ad.budget) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black text-gray-400 dark:text-gray-600">
                  <span>SPENT: ${ad.spent}</span>
                  <span>BUDGET: ${ad.budget}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAction('Analytics')}
                    className="flex-1 py-3 bg-gray-100 dark:bg-[#2A2A2A] text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-[#333] active:scale-95 transition-all text-sm"
                  >
                    ANALYTICS
                  </button>
                  <button 
                    onClick={() => handleAction('Preview Ad Audio')}
                    className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 active:scale-95 transition-all"
                  >
                    <Play size={20}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
