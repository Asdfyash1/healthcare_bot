import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Github, Chrome, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-10 relative z-10"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-display font-medium mb-2 text-ink">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-ink/40 font-light text-sm">
            {isLogin ? 'Enter your credentials to access your account' : 'Join HealthBot AI today for better healthcare'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/30 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 group-focus-within:text-accent-blue transition-colors" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-accent-blue/30 transition-all text-sm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-ink/30 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 group-focus-within:text-accent-blue transition-colors" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full bg-black/5 border border-black/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-accent-blue/30 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-ink/30 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 group-focus-within:text-accent-blue transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-black/5 border border-black/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-accent-blue/30 transition-all text-sm"
              />
            </div>
          </div>

          <button className="w-full btn-gradient py-4 flex items-center justify-center gap-2 group mt-6">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/5"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
            <span className="bg-white px-4 text-ink/20">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-black/5 hover:bg-black/5 transition-all text-sm font-medium text-ink/70">
            <Chrome className="w-4 h-4" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-black/5 hover:bg-black/5 transition-all text-sm font-medium text-ink/70">
            <Github className="w-4 h-4" />
            GitHub
          </button>
        </div>

        <p className="text-center mt-10 text-ink/40 text-sm font-light">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-accent-blue font-semibold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
