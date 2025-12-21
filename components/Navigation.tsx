
import React from 'react';
import { Radio, LayoutDashboard, Megaphone, ShieldCheck, Home } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  role: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, role }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, roles: ['any'] },
    { id: 'station-dash', label: 'Station', icon: LayoutDashboard, roles: ['station', 'admin'] },
    { id: 'advertiser-dash', label: 'Ads', icon: Megaphone, roles: ['advertiser', 'admin'] },
    { id: 'admin-dash', label: 'Network', icon: ShieldCheck, roles: ['admin'] },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-50 md:top-0 md:bottom-auto md:flex-col md:w-64 md:h-screen md:justify-start md:p-6 md:border-r md:border-t-0 african-pattern">
      <div className="hidden md:flex items-center gap-2 mb-10">
        <div className="bg-[#E5A443] p-2 rounded-lg">
          <Radio className="text-white" size={24} />
        </div>
        <span className="text-2xl font-bold text-gray-800">ARN44</span>
      </div>
      
      {navItems.filter(item => item.roles.includes('any') || item.roles.includes(role)).map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 p-2 md:p-4 rounded-xl transition-all ${
            currentView === item.id 
              ? 'text-[#E5A443] md:bg-[#E5A443]/10' 
              : 'text-gray-500 hover:text-[#E5A443]'
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