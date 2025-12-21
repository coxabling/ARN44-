
import React from 'react';
import { Radio, LayoutDashboard, Megaphone, ShieldCheck, Home, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  role: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, role, isDarkMode, onToggleDarkMode }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, roles: ['any'] },
    { id: 'station-dash', label: 'Station', icon: LayoutDashboard, roles: ['station', 'admin'] },
    { id: 'advertiser-dash', label: 'Ads', icon: Megaphone, roles: ['advertiser', 'admin'] },
    { id: 'admin-dash', label: 'Network', icon: ShieldCheck, roles: ['admin'] },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E1E1E] border-t border-gray-200 dark:border-gray-800 flex justify-around p-2 z-50 md:top-0 md:bottom-auto md:flex-col md:w-64 md:h-screen md:justify-start md:p-6 md:border-r md:border-t-0 african-pattern transition-colors">
      <div className="hidden md:flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
          <div className="bg-[#E5A443] p-2 rounded-lg">
            <Radio className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-gray-800 dark:text-white">ARN44</span>
        </div>
        <button 
          onClick={onToggleDarkMode}
          className="p-2 rounded-xl bg-gray-100 dark:bg-[#2A2A2A] text-gray-600 dark:text-[#E5A443] hover:scale-110 transition-transform"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden absolute top-[-60px] right-4">
        <button 
          onClick={onToggleDarkMode}
          className="p-3 rounded-full bg-white dark:bg-[#1E1E1E] text-gray-800 dark:text-[#E5A443] shadow-lg border border-gray-100 dark:border-gray-800"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
      
      {navItems.filter(item => item.roles.includes('any') || item.roles.includes(role)).map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 p-2 md:p-4 rounded-xl transition-all ${
            currentView === item.id 
              ? 'text-[#E5A443] md:bg-[#E5A443]/10' 
              : 'text-gray-500 dark:text-gray-400 hover:text-[#E5A443]'
          }`}
        >
          <item.icon size={24} />
          <span className="text-xs md:text-lg font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
