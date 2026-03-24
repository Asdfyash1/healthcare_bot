import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { User, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Message } from '@/src/types';

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isBot = message.role === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full gap-4 mb-6",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center shrink-0 shadow-sm">
          <Activity className="text-white w-6 h-6" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] p-5 rounded-3xl shadow-sm",
          isBot 
            ? "bg-white border border-black/5 rounded-tl-none text-ink/80" 
            : "bg-accent-blue rounded-tr-none text-white"
        )}
      >
        <div className={cn(
          "prose prose-sm max-w-none",
          isBot ? "prose-slate" : "prose-invert"
        )}>
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed font-light">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 font-light">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 font-light">{children}</ol>,
              h1: ({ children }) => <h1 className="text-lg font-medium mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-medium mb-2">{children}</h2>,
              code: ({ children }) => <code className="bg-black/5 px-1 rounded text-xs">{children}</code>,
              blockquote: ({ children }) => <blockquote className="border-l-2 border-black/10 pl-3 italic text-ink/40 mb-2">{children}</blockquote>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <div className={cn(
          "text-[9px] mt-3 opacity-30 uppercase tracking-widest font-bold",
          isBot ? "text-left" : "text-right"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!isBot && (
        <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center shrink-0 border border-black/5">
          <User className="text-ink/40 w-6 h-6" />
        </div>
      )}
    </motion.div>
  );
}
