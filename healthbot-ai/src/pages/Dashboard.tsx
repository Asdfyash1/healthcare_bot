import { motion } from 'motion/react';
import { User, Activity, Calendar, History, Heart, TrendingUp, Bell, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Dashboard() {
  const healthTips = [
    { title: 'Stay Hydrated', desc: 'Drink at least 8 glasses of water daily for optimal health.', icon: Activity, color: 'text-blue-400' },
    { title: 'Daily Walk', desc: 'A 30-minute walk can significantly improve cardiovascular health.', icon: TrendingUp, color: 'text-emerald-400' },
    { title: 'Sleep Well', desc: 'Ensure 7-9 hours of quality sleep for mental clarity.', icon: Heart, color: 'text-pink-400' }
  ];

  const recentChats = [
    { title: 'Flu symptoms check', date: 'Mar 22, 2026', status: 'Completed' },
    { title: 'Dietary advice', date: 'Mar 20, 2026', status: 'Completed' },
    { title: 'Allergy consultation', date: 'Mar 15, 2026', status: 'Archived' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 text-center"
          >
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-3xl bg-accent-blue/5 p-1">
                <div className="w-full h-full rounded-[1.4rem] bg-white border border-black/5 flex items-center justify-center overflow-hidden">
                  <User className="w-16 h-16 text-ink/10" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-success rounded-2xl border-4 border-white flex items-center justify-center shadow-sm">
                <Activity className="w-5 h-5 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-display font-medium mb-1 text-ink">John Doe</h2>
            <p className="text-ink/30 text-xs mb-8 uppercase tracking-widest font-bold">Premium Member</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/5 p-4 rounded-2xl">
                <p className="text-[10px] uppercase tracking-widest font-bold text-ink/20 mb-1">Blood Type</p>
                <p className="text-xl font-bold text-accent-blue">O+</p>
              </div>
              <div className="bg-black/5 p-4 rounded-2xl">
                <p className="text-[10px] uppercase tracking-widest font-bold text-ink/20 mb-1">Weight</p>
                <p className="text-xl font-bold text-accent-purple">72kg</p>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl border border-black/5 hover:bg-black/5 transition-all font-medium text-ink/70 text-sm">
              Edit Profile
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-medium text-lg text-ink">Health Tips</h3>
              <Bell className="w-5 h-5 text-ink/20" />
            </div>
            <div className="space-y-6">
              {healthTips.map((tip, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center shrink-0 group-hover:bg-black/10 transition-colors`}>
                    <tip.icon className={`w-6 h-6 ${tip.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1 text-ink">{tip.title}</h4>
                    <p className="text-xs text-ink/40 leading-relaxed font-light">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="glass-card p-10 bg-accent-blue/5 border-accent-blue/10">
              <div className="w-12 h-12 rounded-xl bg-accent-blue flex items-center justify-center mb-8 shadow-sm">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-display font-medium mb-2 text-ink">Next Checkup</h3>
              <p className="text-ink/50 mb-8 font-light">General Consultation with Dr. Smith</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-accent-blue uppercase tracking-widest">March 28</span>
                <button className="text-xs font-bold text-ink/30 uppercase tracking-widest hover:text-ink transition-colors">Reschedule</button>
              </div>
            </div>

            <div className="glass-card p-10 bg-accent-purple/5 border-accent-purple/10">
              <div className="w-12 h-12 rounded-xl bg-accent-purple flex items-center justify-center mb-8 shadow-sm">
                <History className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-display font-medium mb-2 text-ink">Consultations</h3>
              <p className="text-ink/50 mb-8 font-light">You've had 12 consultations this month.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-accent-purple uppercase tracking-widest">+15% Growth</span>
                <button className="text-xs font-bold text-ink/30 uppercase tracking-widest hover:text-ink transition-colors">Reports</button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card overflow-hidden"
          >
            <div className="p-8 border-b border-black/5 flex items-center justify-between">
              <h3 className="font-display font-medium text-lg text-ink">Recent Activity</h3>
              <button className="text-xs font-bold text-accent-blue uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="divide-y divide-black/5">
              {recentChats.map((chat, i) => (
                <div key={i} className="p-8 flex items-center justify-between hover:bg-black/[0.01] transition-colors group cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                      <Activity className="w-6 h-6 text-ink/20 group-hover:text-accent-blue transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-ink">{chat.title}</h4>
                      <p className="text-[10px] text-ink/30 uppercase tracking-widest font-bold">{chat.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest",
                      chat.status === 'Completed' ? "bg-success/10 text-success" : "bg-black/5 text-ink/30"
                    )}>
                      {chat.status}
                    </span>
                    <ChevronRight className="w-5 h-5 text-ink/10 group-hover:text-ink transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
