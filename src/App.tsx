import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Map as MapIcon, 
  Library, 
  BarChart3, 
  MessageSquare, 
  Users, 
  User, 
  Search, 
  Languages, 
  Cpu
} from 'lucide-react';
import { cn } from './lib/utils';

// Pages (to be implemented)
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import CulturePage from './pages/CulturePage';
import DataPage from './pages/DataPage';
import AIAssistantPage from './pages/AIAssistantPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import DetailPage from './pages/DetailPage';

const NAV_ITEMS = [
  { path: '/', label: 'Home', labelZh: '首页', icon: Home },
  { path: '/map', label: 'Map', labelZh: '地图', icon: MapIcon },
  { path: '/culture', label: 'Culture', labelZh: '文化', icon: Library },
  { path: '/data', label: 'Data', labelZh: '数据', icon: BarChart3 },
  { path: '/ai', label: 'AI', labelZh: 'AI', icon: Cpu },
  { path: '/community', label: 'Community', labelZh: '社区', icon: Users },
  { path: '/profile', label: 'Profile', labelZh: '个人中心', icon: User },
];

export default function App() {
  const [lang, setLang] = useState<'EN' | 'ZH'>('ZH');

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-imperial-red/10 h-16 flex items-center px-6">
          <Link to="/" className="flex items-center gap-2 mr-auto">
            <span className="text-imperial-red font-serif text-2xl font-bold tracking-tight">CROWN</span>
            <span className="text-imperial-gold font-serif text-2xl font-bold tracking-tight underline decoration-imperial-red/30 underline-offset-4">CAPITALS</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} item={item} lang={lang} />
            ))}
          </div>

          <div className="ml-8 flex items-center gap-4">
             <button 
                onClick={() => setLang(lang === 'EN' ? 'ZH' : 'EN')}
                className="flex items-center gap-1 text-xs font-bold tracking-widest uppercase hover:text-imperial-red transition-colors"
              >
                <Languages size={14} />
                {lang === 'EN' ? 'ZH' : 'EN'}
              </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow pt-16">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage lang={lang} />} />
              <Route path="/map" element={<MapPage lang={lang} />} />
              <Route path="/culture" element={<CulturePage lang={lang} />} />
              <Route path="/data" element={<DataPage lang={lang} />} />
              <Route path="/ai" element={<AIAssistantPage lang={lang} />} />
              <Route path="/community" element={<CommunityPage lang={lang} />} />
              <Route path="/profile" element={<ProfilePage lang={lang} />} />
              <Route path="/detail/:id" element={<DetailPage lang={lang} />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Floating Controls */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-imperial-red text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-imperial-red/90 transition-colors"
          >
            <Cpu size={24} />
          </motion.button>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-full shadow-lg border border-imperial-red/10 px-4 py-2 flex items-center gap-2"
          >
            <Search size={16} className="text-charcoal/50" />
            <input 
              type="text" 
              placeholder={lang === 'EN' ? 'Search architecture...' : '搜索古建筑...'} 
              className="bg-transparent text-sm focus:outline-none w-32 md:w-48"
            />
          </motion.div>
        </div>
      </div>
    </BrowserRouter>
  );
}

function NavLink({ item, lang }: { item: typeof NAV_ITEMS[0], lang: 'EN' | 'ZH' }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  
  return (
    <Link 
      to={item.path}
      className={cn(
        "relative text-sm font-medium transition-all hover:text-imperial-red group py-1",
        isActive ? "text-imperial-red" : "text-charcoal/60"
      )}
    >
      <span className="relative z-10">
        {lang === 'EN' ? item.label : item.labelZh}
      </span>
      {isActive && (
        <motion.div 
          layoutId="nav-underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-imperial-red rounded-full"
        />
      )}
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <item.icon size={10} />
      </div>
    </Link>
  );
}
