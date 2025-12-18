
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './views/Home';
import StationProfile from './views/StationProfile';
import StationDashboard from './views/StationDashboard';
import AdvertiserDashboard from './views/AdvertiserDashboard';
import { Station } from './types';
import { MOCK_STATIONS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [userRole, setUserRole] = useState<'station' | 'advertiser' | 'admin' | 'supporter'>('admin');

  // URL routing emulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash.startsWith('station/')) {
        const id = hash.split('/')[1];
        const station = MOCK_STATIONS.find(s => s.id === id);
        if (station) {
          setSelectedStation(station);
          setCurrentView('station-profile');
        }
      } else if (hash) {
        setCurrentView(hash);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: string) => {
    window.location.hash = `/${view}`;
    setCurrentView(view);
  };

  const selectStation = (station: Station) => {
    setSelectedStation(station);
    window.location.hash = `/station/${station.id}`;
    setCurrentView('station-profile');
  };

  const renderView = () => {
    switch(currentView) {
      case 'home':
        return <Home onSelectStation={selectStation} />;
      case 'station-profile':
        return selectedStation ? <StationProfile station={selectedStation} /> : <Home onSelectStation={selectStation} />;
      case 'station-dash':
        return <StationDashboard station={MOCK_STATIONS[0]} />;
      case 'advertiser-dash':
        return <AdvertiserDashboard />;
      case 'admin-dash':
        return (
          <div className="md:ml-64 p-10 african-pattern min-h-screen">
            <h1 className="text-4xl font-black mb-6">Network Control Center</h1>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center">
              <p className="text-gray-500 mb-6">Aggregate network analytics and cross-station auditing for ARN44 Administrators.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-gray-400 font-bold mb-2">NETWORK REVENUE</h4>
                  <p className="text-4xl font-black text-green-600">$1.2M</p>
                </div>
                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-gray-400 font-bold mb-2">ACTIVE STATIONS</h4>
                  <p className="text-4xl font-black text-blue-600">1,245</p>
                </div>
                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-gray-400 font-bold mb-2">ADS SERVING</h4>
                  <p className="text-4xl font-black text-orange-600">4,890</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Home onSelectStation={selectStation} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F1]">
      <Navigation currentView={currentView} onNavigate={navigateTo} role={userRole} />
      <main className="pb-20 md:pb-0">
        {renderView()}
      </main>

      {/* Floating Network Alert Emulation */}
      <div className="fixed bottom-24 right-6 z-50 pointer-events-none hidden md:block">
        <div className="bg-white/90 backdrop-blur shadow-2xl p-4 rounded-2xl border-l-4 border-green-500 flex items-center gap-4 animate-bounce">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-black">
            $
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400">LIVE NETWORK ACTIVITY</p>
            <p className="text-sm font-bold">Kofi sent $5 to Nairobi Beats FM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
