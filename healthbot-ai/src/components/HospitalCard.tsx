import { MapPin, Star, Phone, Navigation, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Hospital } from '@/src/types';

interface HospitalCardProps {
  hospital: Hospital;
  index: number;
}

export default function HospitalCard({ hospital, index }: HospitalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card overflow-hidden group hover:border-accent-purple/20 transition-all"
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={hospital.image} 
          alt={hospital.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-black/5 shadow-sm">
            <Star className="w-3 h-3 text-warning fill-current" />
            <span className="text-[10px] font-bold text-ink">{hospital.rating}</span>
          </div>
          <div className="bg-accent-purple text-white text-[9px] font-bold px-2 py-1 rounded-lg shadow-sm uppercase tracking-widest">
            {hospital.distance}
          </div>
        </div>
      </div>

      <div className="p-8">
        <h3 className="font-display font-medium text-xl mb-2 group-hover:text-accent-purple transition-colors text-ink">{hospital.name}</h3>
        <div className="flex items-start gap-2 text-xs text-ink/40 mb-8">
          <MapPin className="w-4 h-4 shrink-0 text-accent-purple/50" />
          <p className="leading-relaxed font-light">{hospital.address}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black/5 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <Clock className="w-4 h-4 text-accent-purple" />
            </div>
            <div>
              <p className="text-[8px] uppercase tracking-widest font-bold text-ink/20">Status</p>
              <p className="text-[10px] font-bold text-success">Open 24/7</p>
            </div>
          </div>
          <div className="bg-black/5 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <Phone className="w-4 h-4 text-accent-purple" />
            </div>
            <div>
              <p className="text-[8px] uppercase tracking-widest font-bold text-ink/20">Contact</p>
              <p className="text-[10px] font-bold text-ink/70">Emergency</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex-1 btn-gradient from-accent-purple to-accent-blue py-3.5 rounded-xl text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 group/btn">
            Directions
            <Navigation className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </button>
          <button className="w-12 h-12 rounded-xl border border-black/5 flex items-center justify-center hover:bg-black/5 transition-colors">
            <ChevronRight className="w-5 h-5 text-ink/10" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
