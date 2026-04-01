import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageSquare, Search, MapPin, Shield, Zap, Heart, Star, ArrowRight } from 'lucide-react';

export default function Landing() {
  const features = [
    {
      title: 'AI Health Chat',
      desc: 'Instant answers to your health queries powered by NVIDIA Nemotron.',
      icon: MessageSquare,
      color: 'bg-blue-50 text-blue-600',
      link: '/chat'
    },
    {
      title: 'Find Doctors',
      desc: 'Connect with top-rated specialists in your area with ease.',
      icon: Search,
      color: 'bg-purple-50 text-purple-600',
      link: '/doctors'
    },
    {
      title: 'Locate Hospitals',
      desc: 'Find the nearest medical facilities with real-time distance tracking.',
      icon: MapPin,
      color: 'bg-emerald-50 text-emerald-600',
      link: '/hospitals'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/5 text-accent-blue text-xs font-bold uppercase tracking-widest mb-8 border border-accent-blue/10">
            <Zap className="w-3.5 h-3.5" />
            Powered by NVIDIA NIM
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-8 leading-[1.1] text-ink">
            Your Personal <br />
            <span className="text-accent-blue italic">Healthcare</span> Companion
          </h1>
          <p className="text-lg md:text-xl text-ink/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Experience the future of healthcare with HealthBot AI. Get instant medical advice, 
            find the best doctors, and locate hospitals near you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/chat" className="btn-gradient text-lg py-4 px-10 w-full sm:w-auto flex items-center justify-center gap-2 group">
              Start Chatting
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/auth" className="px-10 py-4 rounded-full border border-black/5 hover:bg-black/5 transition-all w-full sm:w-auto font-medium text-ink/70">
              Create Account
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-black/5">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">Everything you need</h2>
          <p className="text-ink/40 font-light">Comprehensive medical tools at your fingertips.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 group hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-105`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-medium mb-4 text-ink">{feature.title}</h3>
              <p className="text-ink/50 mb-8 leading-relaxed font-light text-sm">{feature.desc}</p>
              <Link to={feature.link} className="inline-flex items-center gap-2 text-accent-blue font-medium group/link text-sm">
                Learn more
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mb-24">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">Trusted by thousands</h2>
          <div className="flex items-center justify-center gap-1 text-warning">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Sarah Johnson', role: 'Patient', text: 'HealthBot AI helped me understand my symptoms when I was worried late at night. Truly a lifesaver!' },
            { name: 'Dr. Michael Chen', role: 'Cardiologist', text: 'The accuracy of the AI responses is impressive. It is a great preliminary tool for patients.' },
            { name: 'Emma Wilson', role: 'Mother of two', text: 'Finding a pediatrician near me was so easy with the integrated doctor search. Highly recommend!' }
          ].map((t, idx) => (
            <div key={idx} className="glass-card p-10">
              <p className="text-ink/60 italic mb-8 font-light leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center font-bold text-accent-blue text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-medium text-ink">{t.name}</h4>
                  <p className="text-[10px] text-ink/30 uppercase tracking-widest font-bold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="glass-card p-12 md:p-24 bg-accent-blue/5 border-accent-blue/10">
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-8 text-ink">Ready to take control <br /> of your health?</h2>
          <p className="text-ink/50 mb-12 max-w-xl mx-auto font-light">Join thousands of users who trust HealthBot AI for their daily medical needs.</p>
          <Link to="/auth" className="btn-gradient text-lg py-4 px-12">
            Get Started Now
          </Link>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-black/5 text-center text-ink/30 text-xs tracking-widest uppercase font-bold">
        <p>&copy; 2026 HealthBot AI. Powered by NVIDIA Nemotron.</p>
      </footer>
    </div>
  );
}
