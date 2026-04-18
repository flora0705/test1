import React from 'react';
import { motion } from 'motion/react';
import { Award, Heart, MessageSquare, Settings, Share2, MapPin, Milestone, History, Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { CITIES } from '../data/appData';

const BADGES = [
  { id: 'xian', name: 'Chang\'an Guard', icon: '🏯', unlocked: true },
  { id: 'luoyang', name: 'Peony Scholar', icon: '🌸', unlocked: true },
  { id: 'beijing', name: 'Imperial Guide', icon: '👑', unlocked: false },
  { id: 'nanjing', name: 'Jiangnan Poet', icon: '🏮', unlocked: false },
];

export default function ProfilePage({ lang }: { lang: 'EN' | 'ZH' }) {
  return (
    <div className="min-h-screen bg-parchment pb-24">
      {/* Header Profile Section */}
      <section className="bg-charcoal py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <Milestone size={600} className="text-white absolute -right-20 -bottom-40" />
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
           <div className="relative group">
              <div className="absolute -inset-4 bg-imperial-gold/20 rounded-full blur-2xl group-hover:bg-imperial-gold/40 transition-all"></div>
              <img 
                src="https://i.pravatar.cc/150?u=me" 
                className="w-48 h-48 rounded-full border-4 border-imperial-gold shadow-2xl relative z-10" 
                alt="Profile" 
              />
              <div className="absolute -bottom-2 right-4 z-20 bg-imperial-red text-white p-3 rounded-full shadow-lg">
                <Settings size={20} />
              </div>
           </div>

           <div className="text-center md:text-left">
              <span className="text-imperial-gold text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Imperial Navigator</span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                Chrono_Explorer
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest border border-white/10">
                    <Milestone size={14} className="text-imperial-gold" />
                    Level 12
                 </div>
                 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest border border-white/10">
                    <MapPin size={14} className="text-imperial-red" />
                    2 Cities Explored
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Main Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 grid lg:grid-cols-12 gap-8 relative z-20">
        
        {/* Left: Badges & Achievements */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-imperial-red/5">
              <div className="flex items-center justify-between mb-12">
                 <h2 className="text-3xl font-serif font-bold uppercase tracking-tight italic">
                   {lang === 'EN' ? 'Capitals Footprints' : '古都足迹勋章'}
                 </h2>
                 <Award className="text-imperial-gold" size={32} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 {BADGES.map((badge) => (
                   <div 
                     key={badge.id}
                     className={cn(
                       "flex flex-col items-center gap-4 group cursor-pointer",
                       !badge.unlocked && "opacity-30 grayscale"
                     )}
                   >
                      <div className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-inner transition-all",
                        badge.unlocked ? "bg-imperial-gold/10 group-hover:scale-110" : "bg-charcoal/5"
                      )}>
                        {badge.icon}
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-imperial-gold block mb-1">
                          {badge.id}
                        </span>
                        <h4 className="font-serif font-bold text-sm tracking-tight">{badge.name}</h4>
                      </div>
                      {badge.unlocked && (
                         <div className="mt-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest">
                           Unlocked
                         </div>
                      )}
                   </div>
                 ))}
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3.5rem] shadow-lg border border-imperial-red/5">
                 <div className="flex items-center gap-4 mb-8">
                    <Heart className="text-imperial-red" />
                    <h3 className="font-bold text-sm uppercase tracking-widest">Saved Architecture</h3>
                 </div>
                 <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="flex gap-4 p-2 -mx-2 hover:bg-parchment rounded-2xl transition-all cursor-pointer group">
                         <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                           <img src={`https://picsum.photos/seed/save${i}/200/200`} className="w-full h-full object-cover group-hover:scale-110 transition-all" alt="save" />
                         </div>
                         <div className="flex flex-col justify-center">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/30">BEIJING</span>
                           <h4 className="font-serif font-bold text-sm">Arch Example {i}</h4>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="bg-white p-10 rounded-[3.5rem] shadow-lg border border-imperial-red/5">
                 <div className="flex items-center gap-4 mb-8">
                    <MessageSquare className="text-imperial-gold" />
                    <h3 className="font-bold text-sm uppercase tracking-widest">My Contributions</h3>
                 </div>
                 <div className="flex flex-col items-center justify-center text-center py-8">
                    <div className="w-12 h-12 bg-parchment rounded-full mb-4 flex items-center justify-center text-charcoal/20">
                       <MessageSquare size={20} />
                    </div>
                    <p className="text-xs text-charcoal/40 uppercase tracking-widest">No posts yet.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Stats Summary */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-imperial-gold text-charcoal p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 opacity-10 rotate-12 transition-transform group-hover:rotate-0">
                <Globe size={200} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-10 opacity-60">Journey Statistics</h3>
              <div className="space-y-8">
                 <div className="flex items-end justify-between border-b border-charcoal/10 pb-4">
                    <span className="text-xs font-bold uppercase tracking-widest">Total Sights</span>
                    <span className="text-4xl font-serif font-bold">42</span>
                 </div>
                 <div className="flex items-end justify-between border-b border-charcoal/10 pb-4">
                    <span className="text-xs font-bold uppercase tracking-widest">AI Queries</span>
                    <span className="text-4xl font-serif font-bold">156</span>
                 </div>
                 <div className="flex items-end justify-between border-b border-charcoal/10 pb-4">
                    <span className="text-xs font-bold uppercase tracking-widest">Collection Score</span>
                    <span className="text-4xl font-serif font-bold">2.8k</span>
                 </div>
              </div>
              <button className="w-full mt-10 bg-charcoal text-white py-4 rounded-full font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2">
                 <Share2 size={16} />
                 Share Profile
              </button>
           </div>
           
           <div className="bg-white p-10 rounded-[3.5rem] border border-imperial-red/5 shadow-sm text-center">
              <History size={32} className="mx-auto text-imperial-red/20 mb-6" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal/50 mb-2">Member Since</h4>
              <p className="font-serif font-bold text-xl">APRIL 2026</p>
           </div>
        </div>
      </section>
    </div>
  );
}
