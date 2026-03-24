import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, MessageSquare, User, Search, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Activity },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Doctors', path: '/doctors', icon: Search },
    { name: 'Hospitals', path: '/hospitals', icon: MapPin },
    { name: 'Dashboard', path: '/dashboard', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-ink">
              HealthBot AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                    isActive 
                      ? "bg-black/5 text-ink" 
                      : "text-ink/60 hover:text-ink hover:bg-black/5"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
            <Link to="/auth" className="ml-4 btn-gradient text-sm py-2 px-5">
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-ink/70 hover:text-ink hover:bg-black/5 transition-colors"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-b border-black/5 px-4 pt-2 pb-6 space-y-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-xl text-base font-medium flex items-center gap-3",
                location.pathname === link.path
                  ? "bg-black/5 text-ink"
                  : "text-ink/60 hover:text-ink hover:bg-black/5"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          ))}
          <Link
            to="/auth"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center btn-gradient mt-4"
          >
            Sign In
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
