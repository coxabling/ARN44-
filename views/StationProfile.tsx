
import React, { useState, useEffect } from 'react';
import { Share2, DollarSign, Music, MessageCircle, Heart, Play, Pause, ExternalLink, Globe, Radio, Flame, Zap } from 'lucide-react';
import { Station } from '../types';
import PaymentModal from '../components/PaymentModal';

interface StationProfileProps {
  station: Station;
}

const StationProfile: React.FC<StationProfileProps> = ({ station }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePaymentType, setActivePaymentType] = useState<any>(null);
  const [liveTicker, setLiveTicker] = useState("Waiting for next supporter...");

  useEffect(() => {
    const events = [
      "David just sent a $5 Tip from Nairobi!",
      "Grace requested 'Unavailable' by Davido!",
      "Kwame shared the stream to WhatsApp!",
      "New Subscriber joined from London! 🇬🇧",
      "Musa sent a Shoutout to the morning crew!"
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLiveTicker(events[i % events.length]);
      i++;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    const text = `Support ${station.name} on ARN44! 📻🌍`;
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const monetizationButtons = [
    { id: 'shoutout', label: 'Shoutout', icon: MessageCircle, color: 'bg-orange-100 text-orange-700', active: station.features.shoutouts, popular: true },
    { id: 'tip', label: 'Tip DJ', icon: DollarSign, color: 'bg-yellow-100 text-yellow-700', active: station.features.tips, popular: false },
    { id: 'request', label: 'Request Song', icon: Music, color: 'bg-blue-100 text-blue-700', active: station.features.requests, popular: false },
    { id: 'subscription', label: 'Subscribe', icon: Heart, color: 'bg-red-100 text-red-700', active: station.features.subscriptions, popular: false },
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:ml-64 p-4 md:p-10 african-pattern">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Social Proof Ticker */}
        <div className="bg-black/90 text-[#E5A443] px-6 py-3 rounded-full flex items-center gap-3 shadow-xl border border-[#E5A443]/20 overflow-hidden">
            <Zap size={18} className="animate-pulse fill-[#E5A443]" />
            <span className="text-sm font-bold tracking-wide uppercase whitespace-nowrap overflow-hidden">
                LIVE: {liveTicker}
            </span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4">
             <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> LIVE
             </span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <img src={station.logo} alt={station.name} className="w-32 h-32 md:w-48 md:h-48 rounded-2xl object-cover shadow-lg border-4 border-[#E5A443]" />
            <div className="flex-1 space-y-2">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900">{station.name}</h1>
              <p className="text-gray-500 text-lg">{station.country} • {station.description}</p>
              
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 bg-[#2C5F2D] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-green-900/20"
                >
                  {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                  {isPlaying ? 'PAUSE STREAM' : 'LISTEN NOW'}
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 border-2 border-green-500 text-green-600 px-8 py-3 rounded-full font-bold hover:bg-green-50"
                >
                  <Share2 size={20} />
                  WHATSAPP
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Monetization Engine */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {monetizationButtons.filter(b => b.active).map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActivePaymentType(btn.id)}
              className={`${btn.color} p-6 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-sm relative overflow-hidden`}
            >
              {btn.popular && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white p-2 rounded-bl-xl">
                  <Flame size={14} fill="white" />
                </div>
              )}
              <div className="p-3 bg-white rounded-full shadow-inner">
                <btn.icon size={28} />
              </div>
              <span className="font-bold text-sm text-center">{btn.label}</span>
              {btn.popular && <span className="text-[10px] font-black uppercase opacity-60">Most Popular</span>}
            </button>
          ))}
        </div>

        {/* Global Support Card */}
        <div className="bg-[#973931] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                    <Globe size={24} /> DIASPORA SUPPORT
                </h2>
                <p className="opacity-80 mb-6">Supporting from abroad? Help keep local independent radio alive with a monthly sponsorship.</p>
                <button 
                  onClick={() => setActivePaymentType('subscription')}
                  className="bg-white text-[#973931] px-10 py-4 rounded-2xl font-bold hover:bg-opacity-90 flex items-center gap-2 w-full md:w-auto justify-center shadow-xl"
                >
                    JOIN THE INNER CIRCLE
                    <ExternalLink size={18} />
                </button>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12">
                <Radio size={200} />
            </div>
        </div>

        {/* Recent Supporters */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Recent Superstars</h3>
            <div className="space-y-4">
                {[
                  { name: 'Kofi from UK', msg: 'Big up Accra Highlife! Keeping me connected.', type: 'tip', flag: '🇬🇧' },
                  { name: 'Amaka', msg: 'Shoutout to the best DJ in Lagos!', type: 'shoutout', flag: '🇳🇬' },
                  { name: 'David W.', msg: 'Play some Sauti Sol please!', type: 'request', flag: '🇰🇪' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-white hover:shadow-md">
                    <div className="text-2xl">{s.flag}</div>
                    <div className="flex-1">
                        <div className="flex justify-between">
                            <span className="font-bold text-gray-900">{s.name}</span>
                            <span className="text-xs uppercase font-bold text-gray-400">{s.type}</span>
                        </div>
                        <p className="text-gray-500 text-sm">"{s.msg}"</p>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </div>

      {activePaymentType && (
        <PaymentModal 
          station={station} 
          type={activePaymentType} 
          onClose={() => setActivePaymentType(null)} 
        />
      )}
    </div>
  );
};

export default StationProfile;
