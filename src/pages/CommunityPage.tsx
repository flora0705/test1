import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Heart, Share2, Plus, Camera, Filter, Search } from 'lucide-react';
import { cn } from '../lib/utils';

const POSTS = [
  {
    id: 1,
    user: 'HeritageLover99',
    avatar: 'https://i.pravatar.cc/150?u=1',
    content: 'Sunset at the Giant Wild Goose Pagoda is breathtaking. The shadow of the Tang dynasty feels so close.',
    contentZh: '大雁塔的落日余晖美得令人窒息，唐风雅韵仿佛触手可及。',
    image: 'https://images.unsplash.com/photo-1610486337535-618476839556?auto=format&fit=crop&q=80&w=1000',
    likes: 1240,
    comments: 89,
    time: '2 hours ago'
  },
  {
    id: 2,
    user: 'ArchMaster',
    avatar: 'https://i.pravatar.cc/150?u=2',
    content: 'Just finished a deep dive into the Dou-gong joints of Yingxian Pagoda. Mind-blowing precision!',
    contentZh: '刚调研完应县木塔的斗拱结构，这种精密度简直是木构奇迹！',
    image: 'https://images.unsplash.com/photo-1547984609-906d96e87f17?auto=format&fit=crop&q=80&w=1000',
    likes: 856,
    comments: 42,
    time: '5 hours ago'
  }
];

export default function CommunityPage({ lang }: { lang: 'EN' | 'ZH' }) {
  const [activeTab, setActiveTab] = useState('Trending');

  return (
    <div className="min-h-screen bg-parchment pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-12 grid lg:grid-cols-12 gap-12">
        
        {/* Left: Sidebar Navigation */}
        <div className="lg:col-span-3 hidden lg:block">
           <div className="sticky top-28 space-y-6">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-imperial-red/5">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-imperial-red mb-6">Explore</h3>
                 <div className="space-y-2">
                    {['Trending', 'Latest', 'Photography', 'Technical'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                          activeTab === tab ? "bg-imperial-red text-white" : "text-charcoal/60 hover:bg-imperial-red/5"
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                 </div>
              </div>
              
              <div className="bg-imperial-gold/5 p-6 rounded-[2.5rem] border border-imperial-gold/20">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-imperial-gold mb-4">Topic of the Week</h4>
                 <p className="text-xs font-serif font-bold italic mb-4">"The hidden meaning of roof beasts in Ming architecture."</p>
                 <button className="text-[10px] font-bold uppercase tracking-widest text-charcoal border-b border-charcoal/20 pb-0.5">Read more</button>
              </div>
           </div>
        </div>

        {/* Middle: Feed */}
        <div className="lg:col-span-6 space-y-8">
           {/* Top Action Bar */}
           <div className="flex bg-white p-4 rounded-full shadow-sm border border-imperial-red/5 items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-parchment flex items-center justify-center text-charcoal/30">
                 <Camera size={20} />
              </div>
              <input 
                 type="text" 
                 placeholder={lang === 'EN' ? "Share your discovery..." : "分享你的发现..."}
                 className="flex-1 bg-transparent border-none focus:outline-none text-sm"
              />
              <button className="bg-imperial-red text-white p-3 rounded-full shadow-lg">
                 <Plus size={20} />
              </button>
           </div>

           {/* Mobile Tabs */}
           <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {['Trending', 'Latest', 'Photography'].map((tab) => (
                <button key={tab} className="bg-white px-6 py-2 rounded-full text-xs font-bold shadow-sm">{tab}</button>
              ))}
           </div>

           {/* Posts */}
           {POSTS.map((post) => (
             <motion.div 
               key={post.id} 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-white rounded-[3rem] shadow-sm border border-imperial-red/5 overflow-hidden"
             >
                <div className="p-8 pb-4 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <img src={post.avatar} className="w-12 h-12 rounded-full border-2 border-imperial-gold/20" alt="avatar" />
                      <div>
                         <h4 className="font-bold text-sm">{post.user}</h4>
                         <span className="text-[10px] text-charcoal/40 uppercase tracking-widest">{post.time}</span>
                      </div>
                   </div>
                   <button className="text-charcoal/30 hover:text-imperial-red transition-colors">
                      <Share2 size={18} />
                   </button>
                </div>
                
                <div className="px-8 py-4">
                   <p className="text-charcoal/80 text-sm leading-relaxed font-serif italic mb-6">
                      {lang === 'EN' ? post.content : post.contentZh}
                   </p>
                </div>

                <div className="px-4 pb-4">
                   <img src={post.image} className="w-full aspect-video object-cover rounded-[2.5rem]" alt="post image" />
                </div>

                <div className="p-8 pt-4 flex items-center gap-8 border-t border-imperial-red/5 mt-4">
                    <button className="flex items-center gap-2 text-xs font-bold text-charcoal/60 hover:text-imperial-red transition-all">
                       <Heart size={18} fill="transparent" className="hover:fill-current" />
                       {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold text-charcoal/60 hover:text-imperial-red transition-all">
                       <MessageCircle size={18} />
                       {post.comments}
                    </button>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Right: Sidebar Stats */}
        <div className="lg:col-span-3 hidden lg:block">
           <div className="sticky top-28 space-y-8">
              <div className="bg-charcoal text-white p-10 rounded-[3rem] shadow-2xl">
                 <h3 className="text-xl font-serif font-bold mb-6 italic text-imperial-gold">
                   {lang === 'EN' ? 'Top Contributors' : '贡献榜单'}
                 </h3>
                 <div className="space-y-6">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center gap-4 group">
                         <div className="relative">
                            <img src={`https://i.pravatar.cc/150?u=${i+10}`} className="w-10 h-10 rounded-full" alt="avatar" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-imperial-gold rounded-full flex items-center justify-center text-[8px] font-bold text-charcoal">
                               {i}
                            </div>
                         </div>
                         <div className="flex-1">
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 block mb-0.5">MEMBER</span>
                            <span className="text-xs font-bold group-hover:text-imperial-gold transition-all cursor-pointer">Artisan_{i}</span>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-10 bg-white/10 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all">
                    View Ranking
                 </button>
              </div>

              <div className="bg-white p-8 rounded-[3rem] border border-imperial-red/5">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-imperial-red/40 mb-6">Upcoming Events</h4>
                 <div className="space-y-6">
                    <div className="border-l-2 border-imperial-gold pl-4 pb-2">
                       <span className="text-[10px] font-bold text-imperial-gold block">MAY 15</span>
                       <span className="text-xs font-bold">Tang Dynasty Garden Walk</span>
                    </div>
                    <div className="border-l-2 border-imperial-red/20 pl-4 pb-2">
                       <span className="text-[10px] font-bold text-charcoal/30 block">JUN 02</span>
                       <span className="text-xs font-bold opacity-40">Luoyang Peony Art Expo</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
