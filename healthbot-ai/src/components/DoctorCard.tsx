import { Star, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Doctor } from '@/src/types';

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
}

export default function DoctorCard({ doctor, index }: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6 group hover:border-accent-blue/20 transition-all"
    >
      <div className="flex gap-6">
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-2xl bg-black/5 p-0.5">
            <div className="w-full h-full rounded-[0.9rem] bg-white overflow-hidden border border-black/5">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-success text-white text-[9px] font-bold px-2 py-1 rounded-lg shadow-sm">
            AVAILABLE
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-display font-medium text-xl mb-1 truncate text-ink">{doctor.name}</h3>
              <p className="text-accent-blue text-sm font-medium">{doctor.specialty}</p>
            </div>
            <div className="flex items-center gap-1 bg-warning/10 text-warning px-2 py-1 rounded-lg">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-bold">{doctor.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-[10px] text-ink/30 uppercase tracking-widest font-bold mb-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {doctor.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              09:00 - 17:00
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex-1 btn-gradient py-3 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 group/btn">
              Book Now
              <Calendar className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            </button>
            <button className="w-12 h-12 rounded-xl border border-black/5 flex items-center justify-center hover:bg-black/5 transition-colors">
              <ChevronRight className="w-5 h-5 text-ink/20" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
