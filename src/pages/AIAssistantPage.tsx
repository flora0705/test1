import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Cpu, Sparkles, MessageSquare, History, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

const SUGGESTIONS = [
  { en: "Tell me about Tang dynasty architecture.", zh: "告诉我唐代建筑的特点。" },
  { en: "How was the Forbidden City built?", zh: "紫禁城是怎么建造的？" },
  { en: "Recommend a 1-day itinerary for Xi'an.", zh: "推荐西安一日游路线。" },
  { en: "What is special about the Big Wild Goose Pagoda?", zh: "大雁塔有什么特别之处？" },
];

export default function AIAssistantPage({ lang }: { lang: 'EN' | 'ZH' }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user' as const, content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
            { role: 'user', parts: [{ text: `The user is exploring a Chinese Ancient Architecture app. Language: ${lang}. Current query: ${text}` }] }
        ],
        config: {
          systemInstruction: `You are an expert in Chinese Ancient Capitals and Architecture. You provide historical, structural, and cultural insights. Be poetic yet factual. Always respond in the language requested (${lang}).`,
        }
      });

      const aiContent = response.text || "I am sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'ai', content: aiContent }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: "Lost connection to the Imperial Archives. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex bg-parchment overflow-hidden">
      {/* Sidebar - History */}
      <div className="hidden lg:flex w-80 flex-col border-r border-imperial-red/10 bg-white/50 p-6">
        <div className="flex items-center gap-2 mb-8">
           <History size={18} className="text-imperial-red" />
           <h3 className="text-xs font-bold uppercase tracking-widest">{lang === 'EN' ? 'Chat History' : '对话历史'}</h3>
        </div>
        <div className="flex-1 space-y-4">
           {messages.filter(m => m.role === 'user').slice(-5).map((m, i) => (
             <div key={i} className="p-3 bg-white rounded-xl text-xs text-charcoal/60 truncate cursor-pointer hover:bg-imperial-red/5 transition-all">
                {m.content}
             </div>
           ))}
        </div>
        <div className="bg-imperial-gold/10 p-4 rounded-2xl border border-imperial-gold/20">
           <div className="flex items-center gap-2 mb-2 text-imperial-gold">
             <Info size={14} />
             <span className="text-[10px] font-bold uppercase tracking-widest">{lang === 'EN' ? 'AI Guide' : 'AI 指南'}</span>
           </div>
           <p className="text-[10px] text-imperial-gold leading-relaxed">
             {lang === 'EN' 
               ? 'Our AI uses advanced models to synthesize thousands of years of architectural history.' 
               : '我们的 AI 融合了数千年的营造智慧，为您提供最深度的建筑解读。'}
           </p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col items-center relative h-full">
        {/* Messages */}
        <div className="flex-1 w-full max-w-4xl overflow-y-auto p-6 md:p-12 space-y-12">
           {messages.length === 0 && (
             <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 bg-imperial-red/10 rounded-full flex items-center justify-center mb-8"
                >
                  <Cpu size={48} className="text-imperial-red" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                   {lang === 'EN' ? 'Imperial AI Assistant' : '大唐・智慧 AI'}
                </h1>
                <p className="text-charcoal/40 text-sm max-w-sm mb-12">
                  {lang === 'EN' 
                    ? 'Ask me anything about Chinese ancient architecture, city planning, or history.' 
                    : '关于中国古建筑、都城格局或历史典故，尽情发问。'}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                   {SUGGESTIONS.map((s, i) => (
                     <button 
                       key={i} 
                       onClick={() => handleSend(lang === 'EN' ? s.en : s.zh)}
                       className="p-4 bg-white rounded-2xl border border-imperial-red/5 hover:border-imperial-red/30 transition-all text-xs text-charcoal/60 hover:text-imperial-red flex items-center gap-3 text-left group shadow-sm"
                     >
                        <Sparkles size={14} className="group-hover:text-imperial-gold" />
                        {lang === 'EN' ? s.en : s.zh}
                     </button>
                   ))}
                </div>
             </div>
           )}

           {messages.map((m, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className={cn(
                 "flex gap-4",
                 m.role === 'user' ? "flex-row-reverse" : ""
               )}
             >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                  m.role === 'user' ? "bg-imperial-gold text-white" : "bg-imperial-red text-white"
                )}>
                  {m.role === 'user' ? <User size={18} /> : <Cpu size={18} />}
                </div>
                <div className={cn(
                  "max-w-[80%] p-6 rounded-3xl text-sm leading-relaxed",
                  m.role === 'user' ? "bg-charcoal text-white rounded-tr-none" : "bg-white border border-imperial-red/5 shadow-sm rounded-tl-none"
                )}>
                   <div className="markdown-body">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                   </div>
                </div>
             </motion.div>
           ))}

           {loading && (
             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-imperial-red text-white flex items-center justify-center animate-pulse">
                  <Cpu size={18} />
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-imperial-red/5 flex gap-2 items-center">
                   <div className="w-2 h-2 bg-imperial-red rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-imperial-red rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-2 h-2 bg-imperial-red rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
             </div>
           )}
           <div ref={scrollRef}></div>
        </div>

        {/* Input Area */}
        <div className="w-full max-w-4xl p-6 mb-4">
           <div className="bg-white p-2 rounded-[2rem] shadow-2xl border border-imperial-red/5 flex items-center gap-2">
              <div className="p-3 bg-parchment rounded-full text-imperial-red">
                 <MessageSquare size={18} />
              </div>
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'EN' ? 'Ask a question...' : '输入你的问题...'}
                className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2"
              />
              <button 
                onClick={() => handleSend()}
                className="bg-imperial-red text-white p-3 rounded-full hover:brightness-110 transition-all shadow-lg"
              >
                 <Send size={18} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
