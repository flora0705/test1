import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ARCHITECTURES, Architecture } from '../data/appData';
import { Heart, Share2, MessageSquare, ArrowLeft, History, Layers, Globe, AudioLines, Box } from 'lucide-react';
import { cn } from '../lib/utils';
import ModelViewer from '../components/ModelViewer';

export default function DetailPage({ lang }: { lang: 'EN' | 'ZH' }) {
  const { id } = useParams();
  const arch = ARCHITECTURES.find(a => a.id === id);
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'structure'>('info');

  if (!arch) return <div className="p-20 text-center">Architectural marvel not found.</div>;

  const t = {
    history: lang === 'EN' ? "History" : "历史背景",
    structure: lang === 'EN' ? "Structure" : "营造成就",
    culture: lang === 'EN' ? "Culture" : "文化内涵",
    askAi: lang === 'EN' ? "Ask AI Guide" : "AI 语音讲解",
    threeD: lang === 'EN' ? "3D Model" : "3D 模型",
  };

  return (
    <div className="min-h-screen bg-parchment pb-24">
      {/* Hero Header */}
      <section className="relative h-[65vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={arch.image} 
          className="w-full h-full object-cover"
          alt={arch.name}
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-parchment via-parchment/80 to-transparent"></div>
        
        <Link to="/map" className="absolute top-8 left-8 z-10 bg-white/50 backdrop-blur-md p-3 rounded-full hover:bg-white transition-all text-charcoal">
          <ArrowLeft />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
           <div className="flex-1">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-imperial-gold text-xs font-bold tracking-[0.3em] uppercase block mb-3"
              >
                {arch.year} AD • {arch.type}
              </motion.span>
              <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-4"
              >
                {lang === 'EN' ? arch.name : arch.nameZh}
              </motion.h1>
              <div className="flex gap-4">
                 <button className="flex items-center gap-2 bg-imperial-red text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg">
                   <AudioLines size={16} />
                   {t.askAi}
                 </button>
                 <button className="bg-white/50 backdrop-blur-md p-2 rounded-full hover:bg-white transition-all">
                    <Heart className="text-imperial-red" />
                 </button>
                 <button className="bg-white/50 backdrop-blur-md p-2 rounded-full hover:bg-white transition-all">
                    <Share2 />
                 </button>
              </div>
           </div>
           
           <div className="md:w-1/3">
             <div className="bg-white/20 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-sm">
                <p className="text-charcoal/70 text-sm leading-relaxed serif italic">
                  "{lang === 'EN' ? arch.description : arch.descriptionZh}"
                </p>
             </div>
           </div>
        </div>
      </section>

      {/* 3D Model Section */}
      {arch.modelUrl && (
        <section className="max-w-7xl mx-auto px-6 mt-12">
          <ModelViewer url={arch.modelUrl} title={lang === 'EN' ? arch.name : arch.nameZh} />
        </section>
      )}

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-16 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          {/* Tabs */}
          <div className="flex border-b border-imperial-red/10 mb-12">
            {[
              { id: 'info', label: t.culture, icon: Globe },
              { id: 'history', label: t.history, icon: History },
              { id: 'structure', label: t.structure, icon: Layers },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all relative",
                  activeTab === tab.id ? "text-imperial-red" : "text-charcoal/40 hover:text-charcoal"
                )}
              >
                <tab.icon size={14} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="detail-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-imperial-red"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="prose prose-charcoal max-w-none"
            >
              {activeTab === 'info' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-imperial-red">{t.culture}</h3>
                  <p className="text-charcoal/80 text-lg leading-relaxed font-serif italic border-l-4 border-imperial-gold pl-6">
                    {lang === 'EN' ? arch.culture : "此处探讨建筑所承载的文化意义，包括礼制、风水与信仰。"}
                  </p>
                  <div className="grid md:grid-cols-2 gap-8 mt-12">
                     <img src="https://picsum.photos/seed/detail1/600/400" className="rounded-3xl shadow-lg" alt="detail" />
                     <img src="https://picsum.photos/seed/detail2/600/400" className="rounded-3xl shadow-lg" alt="detail" />
                  </div>
                </div>
              )}
              {activeTab === 'history' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-imperial-red">{t.history}</h3>
                  <p className="text-charcoal/80 text-lg leading-relaxed">
                    {lang === 'EN' ? arch.history : "追溯建筑自兴建以来的兴衰历程，见证王朝更迭与时代变迁。"}
                  </p>
                   <div className="relative pl-8 border-l border-imperial-red/20 space-y-12">
                      <div className="relative">
                        <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-imperial-red border-4 border-parchment"></div>
                        <span className="text-xs font-bold text-imperial-gold tracking-widest uppercase font-mono">{arch.year}</span>
                        <h4 className="font-serif font-bold text-xl">{lang === 'EN' ? 'Original Construction' : '营造肇始'}</h4>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-imperial-red/20 border-4 border-parchment"></div>
                        <span className="text-xs font-bold text-charcoal/30 tracking-widest uppercase font-mono">+200 Years</span>
                        <h4 className="font-serif font-bold text-xl text-charcoal/40">{lang === 'EN' ? 'Renovations' : '历代修缮'}</h4>
                      </div>
                   </div>
                </div>
              )}
              {activeTab === 'structure' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-imperial-red">{t.structure}</h3>
                  <p className="text-charcoal/80 text-lg leading-relaxed bg-white/50 p-8 rounded-3xl border border-imperial-red/5">
                    {lang === 'EN' ? arch.structure : "剖析斗拱、梁柱等营造技艺，展示中国古建筑科学与美学的结合。"}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-charcoal text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-imperial-red/20 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <MessageSquare className="text-imperial-gold mb-6" size={40} />
                <h3 className="text-2xl font-serif font-bold mb-4">{t.askAi}</h3>
                <p className="text-xs opacity-60 uppercase tracking-widest mb-8">
                  {lang === 'EN' ? 'Talk to our historical expert AI about this marvel.' : '与我们的历史专家 AI 对话，探寻建筑背后的奥秘。'}
                </p>
                <Link to="/ai">
                  <button className="w-full bg-white text-charcoal py-4 rounded-full font-bold uppercase tracking-widest hover:bg-imperial-gold transition-colors">
                    {lang === 'EN' ? 'Start Chat' : '开始对话'}
                  </button>
                </Link>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-imperial-red/5 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-imperial-red/50">
                {lang === 'EN' ? 'Location' : '地理位置'}
              </h4>
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-parchment rounded-2xl flex items-center justify-center text-imperial-gold">
                   <Globe size={24} />
                 </div>
                 <div>
                   <span className="text-sm font-bold block">{arch.coordinates.join(', ')}</span>
                   <span className="text-[10px] text-charcoal/40 uppercase tracking-widest uppercase italic">GPS Coordinates</span>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
