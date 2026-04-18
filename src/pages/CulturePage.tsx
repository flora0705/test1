import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Scroll, Map as MapIcon, Library, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const ARTICLES = [
  {
    category: 'Dynasties',
    categoryZh: '都城通史',
    title: 'The Thirteen Dynasties of Xi\'an',
    titleZh: '十三朝古都：西安变迁史',
    description: 'Tracing the evolution of China\'s heartland from the Zhou to the Tang.',
    image: 'https://images.unsplash.com/photo-1610486337535-618476839556?auto=format&fit=crop&q=80&w=800'
  },
  {
    category: 'Architecture',
    categoryZh: '营造法则',
    title: 'Wooden Framework Mechanics',
    titleZh: '大木作：中国古代木构逻辑',
    description: 'Understanding Dou-gong and the art of joinery without nails.',
    image: 'https://images.unsplash.com/photo-1547984609-906d96e87f17?auto=format&fit=crop&q=80&w=800'
  },
  {
    category: 'City Planning',
    categoryZh: '都城格局',
    title: 'The Grid of Tang Chang\'an',
    titleZh: '唐长安坊市制与中轴对称',
    description: 'How cosmic order dictated the layout of the world\'s largest city.',
    image: 'https://images.unsplash.com/photo-1599573752119-be54b504e036?auto=format&fit=crop&q=80&w=800'
  }
];

export default function CulturePage({ lang }: { lang: 'EN' | 'ZH' }) {
  return (
    <div className="min-h-screen bg-parchment pb-24">
      {/* Banner */}
      <section className="bg-charcoal py-24 px-6 mb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-1 w-24 bg-imperial-gold mb-8"
          ></motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-7xl font-serif font-bold mb-6 italic"
          >
            {lang === 'EN' ? 'Imperial Archives' : '大都・文库'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-sm tracking-[0.3em] uppercase max-w-lg"
          >
            {lang === 'EN' 
              ? 'Thousands of years of wisdom, preserved in stone and wood.' 
              : '数千载智慧结晶，藏于一砖一瓦，一木一石。'}
          </motion.p>
        </div>
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none -translate-y-1/2 translate-x-1/2">
           <Library size={800} className="text-white" />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 mb-24">
        {[
          { icon: Scroll, label: lang === 'EN' ? 'Chronicles' : '朝代分布', sub: 'Dynasties' },
          { icon: BookOpen, label: lang === 'EN' ? 'Techniques' : '筑造技术', sub: 'Structural Art' },
          { icon: MapIcon, label: lang === 'EN' ? 'Planning' : '都城格局', sub: 'Urban Logic' },
          { icon: Library, label: lang === 'EN' ? 'Legends' : '历史典故', sub: 'Folklore' },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2rem] border border-imperial-red/5 flex flex-col items-center text-center group cursor-pointer"
          >
            <div className="w-16 h-16 bg-imperial-red/5 rounded-full flex items-center justify-center text-imperial-red mb-4 group-hover:bg-imperial-red group-hover:text-white transition-all">
               <item.icon size={28} />
            </div>
            <h3 className="font-serif font-bold text-xl mb-1">{item.label}</h3>
            <span className="text-[10px] text-charcoal/30 uppercase tracking-widest font-bold font-mono">{item.sub}</span>
          </motion.div>
        ))}
      </section>

      {/* Articles */}
      <section className="max-w-7xl mx-auto px-6 space-y-24">
        <div className="flex items-center gap-4 mb-12">
           <div className="h-px bg-imperial-red/10 flex-grow"></div>
           <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-imperial-red">
             Featured Insights
           </h2>
           <div className="h-px bg-imperial-red/10 flex-grow"></div>
        </div>

        {ARTICLES.map((article, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn(
              "flex flex-col md:flex-row gap-12 items-center",
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            )}
          >
            <div className="md:w-1/2 relative group">
              <div className="absolute -inset-4 bg-imperial-gold/10 rounded-[3rem] -z-10 group-hover:bg-imperial-red/5 transition-all"></div>
              <img 
                src={article.image} 
                className="w-full aspect-[4/3] object-cover rounded-[2.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" 
                alt={article.title} 
              />
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg">
                <span className="text-imperial-red text-xs font-bold uppercase tracking-widest">
                  {lang === 'EN' ? article.category : article.categoryZh}
                </span>
              </div>
            </div>
            
            <div className="md:w-1/2 space-y-6">
               <h3 className="text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
                 {lang === 'EN' ? article.title : article.titleZh}
               </h3>
               <p className="text-charcoal/60 text-lg leading-relaxed italic border-l-2 border-imperial-gold pl-6">
                 {lang === 'EN' ? article.description : "深入探讨中国古建筑背后的权力逻辑与空间美学，从宏观格局到微观构造。"}
               </p>
               <button className="flex items-center gap-3 text-imperial-red font-bold uppercase tracking-widest group">
                 {lang === 'EN' ? 'Read full article' : '阅读全文'}
                 <ChevronRight className="group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
