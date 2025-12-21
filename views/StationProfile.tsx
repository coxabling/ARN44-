
import React, { useState, useEffect, useRef } from 'react';
import { Share2, DollarSign, Music, MessageCircle, Heart, Play, Pause, ExternalLink, Globe, Radio, Flame, Zap, MessageSquare, Send, X, Sparkles, Activity, ArrowLeft, MapPin } from 'lucide-react';
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
    const text = `Listen to ${station.name} on ARN44! 🌍 📻`;
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
    { id: 'shoutout', label: 'Shoutout', icon: MessageCircle, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20', active: station.features.shoutouts, popular: true },
    { id: 'tip', label: 'Tip DJ', icon: DollarSign, color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20', active: station.features.tips, popular: false },
    { id: 'request', label: 'Song Request', icon: Music, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20', active: station.features.requests, popular: false },
    { id: 'subscription', label: 'Premium', icon: Heart, color: 'text-red-500 bg-red-500/10 border-red-500/20', active: station.features.subscriptions, popular: false },
  ];

  return (
    <div className="min-h-screen md:ml-64 pb-32 dark:bg-[#0A0A0A] transition-colors african-pattern">
      
      {/* Station Banner / Header */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
         <img src={station.logo} className="w-full h-full object-cover blur-2xl scale-110 opacity-40" alt="" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFCFB] dark:to-[#0A0A0A]"></div>
         
         {/* Dedicated Floating Share Button */}
         <div className="absolute top-6 right-6 md:right-10 z-20">
            <button 
              onClick={handleShare}
              className="bg-white/10 hover:bg-white/20 hover:border-primary/50 backdrop-blur-md p-4 rounded-full text-white border border-white/10 transition-all group active:scale-95 shadow-2xl"
              title="Share Station"
            >
              <Share2 size={24} className="group-hover:rotate-12 transition-transform" />
            </button>
         </div>

         <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[3rem] shadow-2xl border-4 border-white dark:border-[#1A1A1A] overflow-hidden mb-6 group cursor-pointer" onClick={togglePlayback}>
                <img src={station.logo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={station.name} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   {isPlaying ? <Pause size={48} className="text-white" /> : <Play size={48} className="text-white" />}
                </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">{station.name}</h1>
            <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest mt-2">
                <MapPin size={12} /> {station.country} • LIVE NOW
            </div>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-12 -mt-10 relative z-10">
        
        {/* Support Engine Grid */}
        <section className="bg-white dark:bg-[#151515] p-2 rounded-[3.5rem] shadow-2xl border border-gray-100 dark:border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {monetizationButtons.filter(b => b.active).map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => setActivePaymentType(btn.id)}
                        className={`${btn.color} p-8 rounded-[3rem] border flex flex-col items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 group relative overflow-hidden`}
                    >
                        {btn.popular && <span className="absolute top-4 right-4 text-[8px] font-black bg-primary text-black px-2 py-0.5 rounded-full">POPULAR</span>}
                        <btn.icon size={28} className="group-hover:scale-110 transition-transform" />
                        <span className="font-black text-xs uppercase tracking-widest">{btn.label}</span>
                    </button>
                ))}
            </div>
        </section>

        {/* Info & Community Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
                <div className="bg-white dark:bg-[#151515] p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-white/5">
                    <h3 className="text-2xl font-black mb-4 dark:text-white">About the Station</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg font-medium">{station.description}</p>
                    
                    <div className="flex flex-wrap gap-4 mt-8">
                        <button onClick={handleShare} className="bg-green-500 text-white px-8 py-3 rounded-2xl font-black text-xs flex items-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-900/10">
                            <Share2 size={16} /> SHARE ON WHATSAPP
                        </button>
                        <button className="bg-gray-100 dark:bg-[#2A2A2A] text-gray-900 dark:text-white px-8 py-3 rounded-2xl font-black text-xs flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors">
                            <Globe size={16} /> WEBSITE
                        </button>
                    </div>
                </div>

                <div className="bg-[#7A2E28] text-white p-10 rounded-[3rem] relative overflow-hidden group shadow-2xl">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-2">Diaspora Member?</h3>
                        <p className="text-white/70 mb-6 font-medium">Your monthly subscription keeps independent African radio alive. Join the Inner Circle today.</p>
                        <button onClick={() => setActivePaymentType('subscription')} className="bg-white text-[#7A2E28] px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-transform">
                            BECOME A MEMBER
                        </button>
                    </div>
                    <Radio size={200} className="absolute -right-20 -bottom-20 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white dark:bg-[#151515] p-8 rounded-[3rem] shadow-sm border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-2 mb-6">
                        <Zap size={20} className="text-primary" />
                        <h4 className="font-black text-sm dark:text-white uppercase tracking-widest">Live Activity</h4>
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Grace L.', msg: 'Morning crew is fire!', type: 'shoutout', flag: '🇳🇬' },
                            { name: 'Kofi', msg: 'Requested King Promise', type: 'request', flag: '🇬🇭' },
                            { name: 'Sarah', msg: 'Supporting from LDN', type: 'tip', flag: '🇬🇧' },
                        ].map((act, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="text-lg">{act.flag}</div>
                                <div className="min-w-0">
                                    <p className="text-xs font-black dark:text-white truncate">{act.name}</p>
                                    <p className="text-xs text-gray-400 italic line-clamp-1">"{act.msg}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* STICKY PLAYER BAR */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 glass border-t border-gray-100 dark:border-white/5 px-6 py-6 z-[40]">
         <div className="max-w-4xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden hidden sm:block flex-shrink-0">
                    <img src={station.logo} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="min-w-0">
                    <h4 className="font-black text-sm dark:text-white truncate">{station.name}</h4>
                    <p className="text-[10px] text-primary font-black animate-pulse">LIVE FROM {station.country.toUpperCase()}</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button onClick={togglePlayback} className="w-16 h-16 bg-primary text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-xl shadow-primary/20">
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} className="ml-1" fill="currentColor" />}
                </button>
            </div>

            <div className="hidden md:flex flex-col items-end gap-1">
                <div className="flex gap-2">
                    <Activity size={16} className="text-primary" />
                    <span className="text-[10px] font-black dark:text-white uppercase">HD STREAM • 320KBPS</span>
                </div>
                <div className="text-[10px] text-gray-400 font-medium">1,245 listeners tuned in</div>
            </div>
         </div>
      </div>

      {/* AI SIDEKICK CHAT (Premium Refined) */}
      {!showAIChat && (
        <button 
          onClick={() => setShowAIChat(true)}
          className="fixed bottom-28 right-8 bg-black dark:bg-primary text-white dark:text-black p-5 rounded-full shadow-2xl hover:scale-110 transition-all z-50 group border border-white/10"
        >
          <Sparkles size={24} />
          <div className="absolute right-full mr-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-2xl text-[10px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            ASK AI SIDEKICK
          </div>
        </button>
      )}

      {showAIChat && (
        <div className="fixed bottom-28 right-8 w-[350px] bg-white dark:bg-[#151515] rounded-[2.5rem] shadow-2xl z-[100] border border-gray-100 dark:border-white/5 flex flex-col overflow-hidden animate-slide-up">
           <div className="bg-dark p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-primary p-1.5 rounded-lg text-black"><Sparkles size={16} /></div>
                <span className="font-black text-xs uppercase tracking-widest">AI Host Assistant</span>
              </div>
              <button onClick={() => setShowAIChat(false)} className="opacity-50 hover:opacity-100">
                <X size={20} />
              </button>
           </div>
           
           <div className="h-[300px] overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-[#0A0A0A]">
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-[1.5rem] text-xs font-medium text-gray-800 dark:text-gray-200">
                Welcome! I'm {station.name}'s AI Sidekick. Ask me about our hits, artists, or the culture! 🌍✨
              </div>
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-medium ${
                    msg.role === 'user' ? 'bg-secondary text-white' : 'bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 text-gray-800 dark:text-white shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-1 pl-4">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-200"></div>
                </div>
              )}
           </div>

           <div className="p-6 border-t border-gray-100 dark:border-white/5 flex gap-2">
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder="Ask the AI Host..."
                className="flex-1 bg-gray-100 dark:bg-[#1A1A1A] dark:text-white p-4 rounded-2xl text-sm outline-none focus:ring-1 ring-primary transition-all"
              />
              <button onClick={handleChatSend} className="bg-primary text-black p-4 rounded-2xl hover:scale-105 transition-transform">
                <Send size={20} />
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
    </div>
  );
};

export default StationProfile;
