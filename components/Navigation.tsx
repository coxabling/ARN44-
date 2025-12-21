
import React from 'react';
import { Radio, LayoutDashboard, Megaphone, ShieldCheck, Home, Moon, Sun, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  role: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, role, isDarkMode, onToggleDarkMode }) => {
  const navItems = [
    { id: 'home', label: 'Explore', icon: Home, roles: ['any'] },
    { id: 'station-dash', label: 'Studio', icon: LayoutDashboard, roles: ['station', 'admin'] },
    { id: 'advertiser-dash', label: 'Ad Lab', icon: Megaphone, roles: ['advertiser', 'admin'] },
    { id: 'admin-dash', label: 'Network', icon: ShieldCheck, roles: ['admin'] },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-gray-200 dark:border-white/5 flex justify-around p-4 z-[50] md:top-0 md:bottom-auto md:flex-col md:w-64 md:h-screen md:justify-start md:p-8 md:border-r md:border-t-0 transition-all">
      <div className="hidden md:flex items-center justify-between mb-16">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-2xl shadow-lg shadow-primary/20">
            <Radio className="text-black" size={24} />
          </div>
          <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">ARN44</span>
        </div>
      </div>

      <div className="flex-1 flex md:flex-col gap-2 justify-around md:justify-start w-full">
        {navItems.filter(item => item.roles.includes('any') || item.roles.includes(role)).map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 p-3 md:px-6 md:py-4 rounded-[1.5rem] transition-all relative group ${
              currentView === item.id 
                ? 'text-primary md:bg-primary/10' 
                : 'text-gray-400 dark:text-gray-500 hover:text-primary md:hover:bg-primary/5'
            }`}
          >
            <item.icon size={22} className={currentView === item.id ? 'animate-pulse' : ''} />
            <span className="text-[10px] md:text-sm font-black uppercase tracking-widest">{item.label}</span>
            {currentView === item.id && <div className="hidden md:block absolute left-0 w-1 h-6 bg-primary rounded-r-full"></div>}
          </button>
        ))}
      </div>

      <div className="hidden md:flex flex-col gap-6 pt-10 border-t border-gray-100 dark:border-white/5">
        <button 
          onClick={onToggleDarkMode}
          className="flex items-center gap-4 text-gray-400 dark:text-gray-500 hover:text-primary transition-colors px-6"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="text-sm font-black uppercase tracking-widest">{isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}</span>
        </button>
        
        <div className="bg-primary/10 rounded-3xl p-6 border border-primary/20 space-y-3">
           <div className="flex items-center gap-2 text-primary">
              <Sparkles size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Network Alert</span>
           </div>
           <p className="text-[10px] font-bold dark:text-white/60 leading-relaxed">Nairobi Beats FM just cleared $1,200 in member tips.</p>
        </div>
      </div>

      {/* Mobile Mode Toggle (Overlaid) */}
      <div className="md:hidden absolute top-[-70px] right-6">
        <button 
          onClick={onToggleDarkMode}
          className="p-4 rounded-full glass border border-white/20 shadow-2xl text-primary"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
