
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
    <div className="min-h-screen md:ml-64 p-6 md:p-10 african-pattern pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Ad Manager</h1>
            <p className="text-gray-500">Global reach for local products</p>
          </div>
          <button 
            onClick={() => handleAction('Create Campaign')}
            className="bg-[#2C5F2D] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-green-900/10"
          >
            <Plus size={20} />
            CREATE NEW CAMPAIGN
          </button>
        </header>

        {/* AI Script Lab */}
        <section className="bg-gradient-to-br from-[#E5A443] to-[#d48c2c] p-1 rounded-[2.5rem] shadow-xl">
          <div className="bg-white rounded-[2.4rem] p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#E5A443] p-2 rounded-xl text-white">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">AI Script Lab</h2>
                <p className="text-gray-500 text-sm">Let Gemini write your 30s radio spots instantly.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <input 
                type="text" 
                value={scriptPrompt}
                onChange={(e) => setScriptPrompt(e.target.value)}
                placeholder="Describe your product (e.g., 'A fresh mango juice brand in Accra')..."
                className="flex-1 p-4 rounded-2xl border-2 border-gray-100 focus:border-[#E5A443] outline-none transition-all"
              />
              <button 
                onClick={handleGenerateScripts}
                disabled={isGenerating || !scriptPrompt}
                className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50 transition-all"
              >
                {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
                GENERATE
              </button>
            </div>

            {generatedScripts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {generatedScripts.map((s, i) => (
                  <div key={i} className="bg-orange-50 p-6 rounded-2xl border border-orange-100 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black uppercase text-orange-600 bg-white px-2 py-1 rounded">Option {i+1}</span>
                        <span className="text-[10px] font-bold text-gray-400 italic">{s.tone}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{s.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-4">"{s.script}"</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(s.script);
                        alert("Copied to clipboard!");
                      }}
                      className="w-full mt-4 py-2 bg-white border border-orange-200 text-orange-600 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-orange-100"
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
            <div key={ad.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${ad.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {ad.status.toUpperCase()}
                  </span>
                  <button 
                    onClick={() => handleAction('Campaign Details')}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <Info size={18}/>
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{ad.title}</h3>
                <p className="text-gray-500 text-sm italic mb-4 line-clamp-2">"{ad.content}"</p>
                
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
                <div className="flex justify-between text-[10px] font-black text-gray-400">
                  <span>SPENT: ${ad.spent}</span>
                  <span>BUDGET: ${ad.budget}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAction('Analytics')}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-all text-sm"
                  >
                    ANALYTICS
                  </button>
                  <button 
                    onClick={() => handleAction('Preview Ad Audio')}
                    className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 active:scale-95 transition-all"
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
