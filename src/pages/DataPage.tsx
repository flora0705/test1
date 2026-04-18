import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { motion } from 'motion/react';
import { ChartBar, TrendingUp, Hash, Layers } from 'lucide-react';
import { cn } from '../lib/utils';

const DYNASTY_EXPANSION = [
  { name: 'Han', zh: '汉', count: 120, color: '#B53D35' },
  { name: 'Tang', zh: '唐', count: 245, color: '#D4AF37' },
  { name: 'Song', zh: '宋', count: 180, color: '#5A5A40' },
  { name: 'Ming', zh: '明', count: 310, color: '#1A1A1A' },
  { name: 'Qing', zh: '清', count: 290, color: '#8E9299' },
];

const CITY_COMPARISON = [
  { name: 'Xi\'an', zh: '西安', archs: 45, hotspots: 82 },
  { name: 'Luoyang', zh: '洛阳', archs: 38, hotspots: 65 },
  { name: 'Beijing', zh: '北京', archs: 112, hotspots: 95 },
  { name: 'Nanjing', zh: '南京', archs: 32, hotspots: 58 },
];

export default function DataPage({ lang }: { lang: 'EN' | 'ZH' }) {
  return (
    <div className="min-h-screen bg-parchment pb-24">
      {/* Header */}
      <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
         >
           <ChartBar size={48} className="text-imperial-red mb-6" />
           <h1 className="text-5xl md:text-7xl font-serif font-bold text-charcoal mb-4 uppercase tracking-tight">
             {lang === 'EN' ? 'Digital Heritage' : '数说大都'}
           </h1>
           <p className="text-charcoal/40 text-sm font-bold tracking-[0.4em] uppercase">
             {lang === 'EN' ? 'Archaeological Data Visualized' : '古代建筑数据的现代化解读'}
           </p>
         </motion.div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
         {/* Chart 1: Dynasty Distribution */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="bg-white p-8 rounded-[3rem] shadow-sm border border-imperial-red/5 flex flex-col h-[400px]"
         >
           <h3 className="text-xs font-bold uppercase tracking-widest text-imperial-red mb-8 flex items-center gap-2">
             <TrendingUp size={14} />
             {lang === 'EN' ? 'Dynasty Presence' : '朝代分布统计'}
           </h3>
           <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DYNASTY_EXPANSION}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                   <XAxis 
                    dataKey={lang === 'EN' ? 'name' : 'zh'} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#1A1A1A' }}
                  />
                   <YAxis hide />
                   <Tooltip 
                     contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                     cursor={{ fill: 'rgba(181, 61, 53, 0.05)' }}
                   />
                   <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                      {DYNASTY_EXPANSION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                   </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
         </motion.div>

         {/* Chart 2: Architecture Types */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           className="bg-white p-8 rounded-[3rem] shadow-sm border border-imperial-red/5 flex flex-col h-[400px]"
         >
           <h3 className="text-xs font-bold uppercase tracking-widest text-imperial-red mb-8 flex items-center gap-2">
             <Layers size={14} />
             {lang === 'EN' ? 'Architecture Types' : '建筑类型统计'}
           </h3>
           <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie
                    data={[
                      { name: 'Palace', value: 30 },
                      { name: 'Temple', value: 45 },
                      { name: 'Fortress', value: 15 },
                      { name: 'Pagoda', value: 10 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#B53D35" />
                    <Cell fill="#D4AF37" />
                    <Cell fill="#5A5A40" />
                    <Cell fill="#1A1A1A" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-1 text-[10px] font-bold"><div className="w-2 h-2 rounded-full bg-imperial-red"></div> PALACE</div>
              <div className="flex items-center gap-1 text-[10px] font-bold"><div className="w-2 h-2 rounded-full bg-imperial-gold"></div> TEMPLE</div>
           </div>
         </motion.div>

         {/* Chart 3: City Hotspots */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="bg-white p-8 rounded-[3rem] shadow-sm border border-imperial-red/5 flex flex-col h-[400px] md:col-span-2 lg:col-span-1"
         >
           <h3 className="text-xs font-bold uppercase tracking-widest text-imperial-red mb-8 flex items-center gap-2">
             <Hash size={14} />
             {lang === 'EN' ? 'Popularity Score' : '各都城景点热度'}
           </h3>
           <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CITY_COMPARISON}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                   <XAxis 
                    dataKey={lang === 'EN' ? 'name' : 'zh'} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#1A1A1A' }}
                  />
                   <YAxis hide />
                   <Tooltip />
                   <Area type="monotone" dataKey="hotspots" stroke="#B53D35" fill="rgba(181, 61, 53, 0.1)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
         </motion.div>
      </section>

      {/* Data Insight Banner */}
      <section className="max-w-7xl mx-auto px-6">
         <div className="bg-charcoal text-parchment p-12 md:p-24 rounded-[4rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none">
              <span className="text-[15rem] font-serif font-bold italic leading-none">DATA</span>
            </div>
            <div className="relative z-10 md:w-2/3">
               <span className="text-imperial-gold text-xs font-bold tracking-widest uppercase mb-4 block">Archive Intelligence</span>
               <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">
                 {lang === 'EN' ? 'Synthesizing millennia of architectural evolution.' : '数字化赋能，洞察千古建筑衍进脉络。'}
               </h2>
               <p className="text-white/60 text-lg md:text-xl font-serif italic border-l border-white/20 pl-6 max-w-xl">
                 {lang === 'EN' 
                   ? 'Every bracket and beam recorded, analyzed, and preserved for the digital age.' 
                   : '每一座宫殿，每一座佛塔，其数据印记都已被永久铭刻在数字档案之中。'}
               </p>
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="text-center">
                 <span className="text-5xl font-serif font-bold text-imperial-gold block">3,400+</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Scanned Sites</span>
              </div>
              <div className="text-center">
                 <span className="text-5xl font-serif font-bold text-imperial-red block">12.5 TB</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Cultural Asset Data</span>
              </div>
            </div>
         </div>
      </section>
    </div>
  );
}
