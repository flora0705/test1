import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Sparkles, Database, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CITIES } from '../data/appData';
import { cn } from '../lib/utils';

export default function HomePage({ lang }: { lang: 'EN' | 'ZH' }) {
  const t = {
    heroTitle: lang === 'EN' ? "Imperial Heritage" : "千载古都",
    heroSubtitle: lang === 'EN' ? "Exploring China's Ancient Architecture" : "探索中国古代建筑之美",
    ctaMap: lang === 'EN' ? "Interactive Map" : "地图探索",
    ctaLearn: lang === 'EN' ? "Architectural Knowledge" : "建筑学习",
    ctaAI: lang === 'EN' ? "AI Assistant" : "AI 助手",
    ctaData: lang === 'EN' ? "Data Visuals" : "数据可视化",
    popularCapitals: lang === 'EN' ? "Famous Ancient Capitals" : "热门古都推荐",
    community: lang === 'EN' ? "Community Buzz" : "社区最新动态",
  };

  const featureCards = [
    { icon: MapPin, label: t.ctaMap, path: '/map', color: 'bg-emerald-50 text-emerald-700' },
    { icon: Sparkles, label: t.ctaLearn, path: '/culture', color: 'bg-amber-50 text-amber-700' },
    { icon: MessageSquare, label: t.ctaAI, path: '/ai', color: 'bg-blue-50 text-blue-700' },
    { icon: Database, label: t.ctaData, path: '/data', color: 'bg-purple-50 text-purple-700' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1547984609-906d96e87f17?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-50"
            alt="Hero"
          />
        </div>
        
        <div className="relative z-10 px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#d24545] text-6xl md:text-9xl font-serif font-bold tracking-tight mb-4"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-xl md:text-2xl font-serif italic mb-12"
          >
            {t.heroSubtitle}
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {featureCards.map((card, idx) => (
              <Link key={idx} to={card.path}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={cn("p-6 rounded-3xl backdrop-blur-md border border-white/20 flex flex-col items-center gap-3 group transition-all", "bg-white/10")}
                >
                  <card.icon className="text-imperial-gold group-hover:scale-110 transition-transform" />
                  <span className="text-white/90 text-sm font-medium">{card.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Down Arrow Scroll Indicator */}
        <motion.div 
           animate={{ y: [0, 10, 0] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ArrowRight className="rotate-90" />
        </motion.div>
      </section>

      {/* Popular Cities */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-2 uppercase tracking-tight">{t.popularCapitals}</h2>
            <div className="h-1 w-20 bg-imperial-red"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CITIES.map((city, idx) => (
            <motion.div 
              key={city.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={city.bannerImage} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={city.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex flex-col">
                  <span className="text-imperial-gold text-xs font-bold tracking-widest mb-1">{city.era}</span>
                  <div className="flex items-end gap-2">
                    <h3 className="text-white text-2xl font-serif font-bold">{lang === 'EN' ? city.name : city.nameZh}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-charcoal/60 text-sm mb-6 line-clamp-2">
                  {lang === 'EN' ? city.description : city.descriptionZh}
                </p>
                <Link to="/map" className="flex items-center gap-2 text-imperial-red text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all">
                  {lang === 'EN' ? 'Explore Map' : '探索地图'}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Teaser */}
      <section className="bg-charcoal text-parchment py-24 px-6 overflow-hidden relative">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <span className="text-[20rem] font-serif font-bold leading-none vertical-text">CULTURE</span>
        </div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="text-imperial-gold text-sm font-bold tracking-widest uppercase mb-4 block">{lang === 'EN' ? 'Join the Community' : '加入社区'}</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              {lang === 'EN' ? 'Share your footsteps across history.' : '在历史中留下你的足迹'}
            </h2>
            <Link to="/community">
              <button className="bg-imperial-gold text-charcoal px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors">
                {lang === 'EN' ? 'Enter Community' : '进入社区'}
              </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
               <img src="https://picsum.photos/seed/arch1/400/500" className="rounded-2xl w-full aspect-[4/5] object-cover" alt="arch" />
               <img src="https://picsum.photos/seed/arch2/400/300" className="rounded-2xl w-full aspect-[4/3] object-cover" alt="arch" />
            </div>
            <div className="space-y-4">
               <img src="https://picsum.photos/seed/arch3/400/300" className="rounded-2xl w-full aspect-[4/3] object-cover" alt="arch" />
               <img src="https://picsum.photos/seed/arch4/400/500" className="rounded-2xl w-full aspect-[4/5] object-cover" alt="arch" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
