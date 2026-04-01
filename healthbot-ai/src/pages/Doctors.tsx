import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Map as MapIcon, Grid, List, ChevronDown } from 'lucide-react';
import DoctorCard from '@/src/components/DoctorCard';
import { Doctor } from '@/src/types';
import { cn } from '@/src/lib/utils';

export default function Doctors() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiologist',
      location: 'New York, NY',
      rating: 4.9,
      image: 'https://picsum.photos/seed/doc1/400/400'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      location: 'San Francisco, CA',
      rating: 4.8,
      image: 'https://picsum.photos/seed/doc2/400/400'
    },
    {
      id: '3',
      name: 'Dr. Emily Wilson',
      specialty: 'Pediatrician',
      location: 'Chicago, IL',
      rating: 4.9,
      image: 'https://picsum.photos/seed/doc3/400/400'
    },
    {
      id: '4',
      name: 'Dr. James Bond',
      specialty: 'Dermatologist',
      location: 'London, UK',
      rating: 4.7,
      image: 'https://picsum.photos/seed/doc4/400/400'
    },
    {
      id: '5',
      name: 'Dr. Anna Maria',
      specialty: 'General Physician',
      location: 'Berlin, DE',
      rating: 4.6,
      image: 'https://picsum.photos/seed/doc5/400/400'
    },
    {
      id: '6',
      name: 'Dr. Robert Fox',
      specialty: 'Orthopedic Surgeon',
      location: 'Sydney, AU',
      rating: 4.9,
      image: 'https://picsum.photos/seed/doc6/400/400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-6 text-ink">Find your specialist</h1>
          <p className="text-ink/40 font-light leading-relaxed">Search from over 5,000+ verified medical professionals across the globe.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex border border-black/5 p-1.5 rounded-2xl bg-white shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("p-2.5 rounded-xl transition-all", viewMode === 'grid' ? "bg-black/5 text-ink" : "text-ink/20 hover:text-ink")}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-2.5 rounded-xl transition-all", viewMode === 'list' ? "bg-black/5 text-ink" : "text-ink/20 hover:text-ink")}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button className="btn-gradient flex items-center gap-2 py-4 px-8">
            <MapIcon className="w-4 h-4" />
            View Map
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="glass-card p-4 mb-12 flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 group-focus-within:text-accent-blue transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, specialty, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/5 border border-transparent rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-accent-blue/20 transition-all text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {['Specialty', 'Location', 'Rating'].map((filter) => (
            <button key={filter} className="border border-black/5 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-ink/40 flex items-center gap-2 hover:bg-black/5 transition-all">
              {filter}
              <ChevronDown className="w-3.5 h-3.5 opacity-40" />
            </button>
          ))}
          <button className="bg-accent-blue/5 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-accent-blue flex items-center gap-2 hover:bg-accent-blue/10 transition-all">
            <Filter className="w-3.5 h-3.5" />
            Filters
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className={cn(
        "grid gap-6",
        viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {doctors.map((doctor, idx) => (
          <DoctorCard key={doctor.id} doctor={doctor} index={idx} />
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-16 flex items-center justify-center gap-2">
        {[1, 2, 3, '...', 12].map((p, i) => (
          <button 
            key={i}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all",
              p === 1 ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/20" : "glass text-white/40 hover:text-white hover:bg-white/10"
            )}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
