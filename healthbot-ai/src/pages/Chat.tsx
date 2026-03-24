import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Activity, Zap, Trash2, Plus, Settings, Info } from 'lucide-react';
import { Message } from '@/src/types';
import ChatBubble from '@/src/components/ChatBubble';
import { cn } from '@/src/lib/utils';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "Hello! I'm your **HealthBot AI** assistant. How can I help you today? \n\nYou can ask me about:\n- Symptoms you're experiencing\n- General health tips\n- Finding doctors or hospitals",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${baseUrl}/get_response/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: data.response || data.error || 'No response received.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: '⚠️ Could not connect to the server. Make sure the Django backend is running on port 8000.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-4rem)] flex gap-6 p-4 md:p-6">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex flex-col w-72 glass-card p-6 shrink-0">
        <button className="flex items-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-black/5 hover:bg-black/10 transition-all border border-black/5 mb-8 group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform text-accent-blue" />
          <span className="font-medium text-ink/80">New Consultation</span>
        </button>
        
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          <p className="text-[10px] uppercase tracking-widest font-bold text-ink/20 px-4 mb-4">Recent History</p>
          {[
            'Flu symptoms check',
            'Dietary advice',
            'Allergy consultation',
            'Exercise routine'
          ].map((item, i) => (
            <button key={i} className="w-full text-left px-4 py-3 rounded-xl hover:bg-black/5 text-sm text-ink/50 hover:text-ink transition-all truncate font-light">
              {item}
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-black/5 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 text-sm text-ink/50 transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 text-sm text-ink/50 transition-colors">
            <Info className="w-4 h-4" />
            Help Center
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col glass-card overflow-hidden relative">
        {/* Chat Header */}
        <div className="px-8 py-5 border-b border-black/5 flex items-center justify-between bg-white/50 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-accent-blue flex items-center justify-center shadow-sm">
                <Activity className="text-white w-7 h-7" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-4 border-white animate-pulse-status" />
            </div>
            <div>
              <h2 className="font-display font-medium text-lg text-ink">HealthBot AI</h2>
              <div className="flex items-center gap-2 text-[10px] text-ink/30 uppercase tracking-widest font-bold">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-accent-blue" />
                  Powered by NVIDIA NIM
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl hover:bg-black/5 text-ink/20 hover:text-ink transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-2 scroll-smooth bg-[#fafafa]/30"
        >
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center shrink-0 shadow-sm">
                <Activity className="text-white w-6 h-6" />
              </div>
              <div className="bg-white border border-black/5 p-5 rounded-3xl rounded-tl-none flex gap-1.5 shadow-sm">
                <div className="w-1.5 h-1.5 bg-ink/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-ink/20 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-ink/20 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 pt-4">
          <div className="relative group">
            <div className="relative flex items-center gap-3 bg-white border border-black/10 rounded-[2rem] p-2 pl-8 shadow-sm focus-within:shadow-md focus-within:border-accent-blue/30 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe your symptoms or ask a health question..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-ink placeholder:text-ink/20 py-4 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                  input.trim() 
                    ? "bg-accent-blue text-white shadow-md shadow-accent-blue/10" 
                    : "bg-black/5 text-ink/10"
                )}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-[9px] text-center text-ink/20 mt-6 uppercase tracking-widest font-bold">
            HealthBot AI can make mistakes. Check with a doctor for critical medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
