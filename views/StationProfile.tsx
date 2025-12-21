
import React, { useState, useEffect, useRef } from 'react';
import { Share2, DollarSign, Music, MessageCircle, Heart, Play, Pause, ExternalLink, Globe, Radio, Flame, Zap, MessageSquare, Send, X, Sparkles, Activity } from 'lucide-react';
import { Station } from '../types';
import PaymentModal from '../components/PaymentModal';
import { GoogleGenAI } from "@google/genai";

interface StationProfileProps {
  station: Station;
}

const StationProfile: React.FC<StationProfileProps> = ({ station }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePaymentType, setActivePaymentType] = useState<any>(null);
  const [liveTicker, setLiveTicker] = useState("Waiting for next supporter...");
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string, text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Reset audio when station changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
  }, [station.id]);

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(station.streamUrl);
      audioRef.current.onplay = () => setIsPlaying(true);
      audioRef.current.onpause = () => setIsPlaying(false);
      audioRef.current.onerror = () => {
        alert("Failed to load stream. Please try again later.");
        setIsPlaying(false);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Playback error:", err);
        alert("Could not start audio playback. Some browsers require a user interaction first.");
      });
    }
  };

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

  const handleChatSend = async () => {
    if (!chatMessage) return;
    const userMsg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are the AI sidekick for "${station.name}", a radio station in ${station.country}. 
        The listener says: "${userMsg}". Keep the response under 60 words and be very enthusiastic about African radio culture!`,
      });
      setChatHistory(prev => [...prev, { role: 'ai', text: response.text || "That's amazing! Keep listening!" }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'ai', text: "Sorry, I'm a bit overwhelmed by all the music! Let's talk again in a second." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const monetizationButtons = [
    { id: 'shoutout', label: 'Shoutout', icon: MessageCircle, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', active: station.features.shoutouts, popular: true },
    { id: 'tip', label: 'Tip DJ', icon: DollarSign, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', active: station.features.tips, popular: false },
    { id: 'request', label: 'Request Song', icon: Music, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', active: station.features.requests, popular: false },
    { id: 'subscription', label: 'Subscribe', icon: Heart, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', active: station.features.subscriptions, popular: false },
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:ml-64 p-4 md:p-10 african-pattern dark:bg-[#121212] transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Social Proof Ticker */}
        <div className="bg-black/90 dark:bg-black/40 text-[#E5A443] px-6 py-3 rounded-full flex items-center gap-3 shadow-xl border border-[#E5A443]/20 overflow-hidden">
            <Zap size={18} className="animate-pulse fill-[#E5A443]" />
            <span className="text-sm font-bold tracking-wide uppercase whitespace-nowrap overflow-hidden">
                LIVE: {liveTicker}
            </span>
        </div>

        {/* Hero Section */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 shadow-sm border border-orange-100 dark:border-gray-800 overflow-hidden relative transition-colors">
          <div className="absolute top-0 right-0 p-4 flex gap-2">
             <div className="flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                <Activity size={12} className="animate-pulse" /> Signal: High
             </div>
             <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> LIVE
             </span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="relative group">
              <img src={station.logo} alt={station.name} className="w-32 h-32 md:w-48 md:h-48 rounded-2xl object-cover shadow-lg border-4 border-[#E5A443] transition-transform group-hover:scale-105" />
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 bg-[#E5A443]/20 rounded-full animate-ping"></div>
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">{station.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg">{station.country} • {station.description}</p>
              
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <button 
                  onClick={togglePlayback}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all shadow-lg ${
                    isPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#2C5F2D] hover:bg-[#1e421e] text-white hover:scale-105'
                  }`}
                >
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                  {isPlaying ? 'PAUSE STREAM' : 'LISTEN NOW'}
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 border-2 border-green-500 dark:border-green-700 text-green-600 dark:text-green-400 px-8 py-3 rounded-full font-bold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
                >
                  <Share2 size={20} />
                  WHATSAPP
                </button>
              </div>
            </div>
          </div>

          {/* Simulated Waveform Visualizer */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center gap-1 opacity-20 dark:opacity-40 pointer-events-none px-10">
                {[...Array(30)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-[#E5A443] w-full rounded-t-sm" 
                      style={{ 
                        height: `${Math.random() * 80 + 20}%`,
                        animation: `pulse ${Math.random() * 0.5 + 0.3}s infinite alternate ease-in-out` 
                      }}
                    ></div>
                ))}
            </div>
          )}
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
              <div className="p-3 bg-white dark:bg-[#2A2A2A] rounded-full shadow-inner">
                <btn.icon size={28} />
              </div>
              <span className="font-bold text-sm text-center">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Global Support Card */}
        <div className="bg-[#973931] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden group">
            <div className="relative z-10">
                <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                    <Globe size={24} /> DIASPORA SUPPORT
                </h2>
                <p className="opacity-80 mb-6">Supporting from abroad? Help keep local independent radio alive with a monthly sponsorship.</p>
                <button 
                  onClick={() => setActivePaymentType('subscription')}
                  className="bg-white text-[#973931] px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 flex items-center gap-2 w-full md:w-auto justify-center shadow-xl transition-all hover:scale-105"
                >
                    JOIN THE INNER CIRCLE
                    <ExternalLink size={18} />
                </button>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Radio size={240} />
            </div>
        </div>

        {/* Recent Supporters */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
              <Zap size={20} className="text-yellow-500" /> Recent Superstars
            </h3>
            <div className="space-y-4">
                {[
                  { name: 'Kofi from UK', msg: 'Big up Accra Highlife! Keeping me connected.', type: 'tip', flag: '🇬🇧' },
                  { name: 'Amaka', msg: 'Shoutout to the best DJ in Lagos!', type: 'shoutout', flag: '🇳🇬' },
                  { name: 'David W.', msg: 'Play some Sauti Sol please!', type: 'request', flag: '🇰🇪' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#2A2A2A] rounded-2xl border border-gray-100 dark:border-gray-700 transition-all hover:bg-white dark:hover:bg-[#333] hover:shadow-md">
                    <div className="text-2xl">{s.flag}</div>
                    <div className="flex-1">
                        <div className="flex justify-between">
                            <span className="font-bold text-gray-900 dark:text-white">{s.name}</span>
                            <span className="text-[10px] uppercase font-black text-[#E5A443] tracking-tighter">{s.type}</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">"{s.msg}"</p>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </div>

      {/* AI Sidekick Chat Floating Button */}
      {!showAIChat && (
        <button 
          onClick={() => setShowAIChat(true)}
          className="fixed bottom-24 md:bottom-10 right-10 bg-black dark:bg-[#1E1E1E] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center gap-2 group border border-gray-100 dark:border-gray-800"
        >
          <div className="bg-[#E5A443] p-1 rounded-full text-black group-hover:rotate-12 transition-transform">
            <Sparkles size={16} />
          </div>
          <span className="font-bold text-sm pr-2">Ask AI Host</span>
        </button>
      )}

      {/* AI Chat Window */}
      {showAIChat && (
        <div className="fixed bottom-24 md:bottom-10 right-6 w-[320px] md:w-[380px] bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-2xl z-[100] border-2 border-gray-50 dark:border-gray-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
           <div className="bg-black p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#E5A443]" />
                <span className="text-white font-bold text-sm">ARN44 AI Sidekick</span>
              </div>
              <button onClick={() => setShowAIChat(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
           </div>
           
           <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#2A2A2A]">
              <div className="bg-[#E5A443]/10 dark:bg-[#E5A443]/5 border border-[#E5A443]/20 p-3 rounded-2xl text-xs text-gray-800 dark:text-gray-200">
                Hi! I'm your AI Radio Sidekick. Ask me anything about {station.name} or African music! 🌍✨
              </div>
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' ? 'bg-[#2C5F2D] text-white' : 'bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-white shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              )}
           </div>

           <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 dark:bg-[#2A2A2A] dark:text-white p-2 px-4 rounded-xl text-sm outline-none focus:ring-1 ring-[#E5A443]"
              />
              <button onClick={handleChatSend} className="bg-[#E5A443] text-black p-2 rounded-xl">
                <Send size={18} />
              </button>
           </div>
        </div>
      )}

      {activePaymentType && (
        <PaymentModal 
          station={station} 
          type={activePaymentType} 
          onClose={() => setActivePaymentType(null)} 
        />
      )}

      <style>{`
        @keyframes pulse {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
};

export default StationProfile;
