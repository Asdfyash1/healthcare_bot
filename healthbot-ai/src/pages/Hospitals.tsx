import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Navigation, Star, Phone, Clock, Filter, Map as MapIcon } from 'lucide-react';
import HospitalCard from '@/src/components/HospitalCard';
import { Hospital } from '@/src/types';

export default function Hospitals() {
  const hospitals: Hospital[] = [
    {
      id: '1',
      name: 'City General Hospital',
      address: '123 Medical Plaza, New York, NY 10001',
      rating: 4.8,
      distance: '1.2 km',
      image: 'https://picsum.photos/seed/hosp1/800/600'
    },
    {
      id: '2',
      name: 'St. Mary Medical Center',
      address: '456 Health Ave, San Francisco, CA 94102',
      rating: 4.7,
      distance: '2.5 km',
      image: 'https://picsum.photos/seed/hosp2/800/600'
    },
    {
      id: '3',
      name: 'Northwestern Memorial',
      address: '789 Wellness Blvd, Chicago, IL 60611',
      rating: 4.9,
      distance: '3.1 km',
      image: 'https://picsum.photos/seed/hosp3/800/600'
    },
    {
      id: '4',
      name: 'Mayo Clinic Hospital',
      address: '101 Healing Way, Rochester, MN 55905',
      rating: 4.9,
      distance: '4.8 km',
      image: 'https://picsum.photos/seed/hosp4/800/600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-6 text-ink">Nearby Hospitals</h1>
          <p className="text-ink/40 font-light leading-relaxed">Locate the nearest medical facilities and emergency centers in real-time.</p>
        </div>
        <button className="btn-gradient from-accent-purple to-accent-blue flex items-center gap-2 py-4 px-10">
          <MapIcon className="w-4 h-4" />
          Map View
        </button>
      </div>

      {/* Search & Quick Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
        <div className="lg:col-span-2 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 group-focus-within:text-accent-purple transition-colors" />
          <input 
            type="text" 
            placeholder="Search hospitals, clinics, or pharmacies..."
            className="w-full bg-black/5 border border-transparent rounded-2xl py-4.5 pl-14 pr-6 focus:outline-none focus:border-accent-purple/20 transition-all text-sm"
          />
        </div>
        <div className="flex gap-4 lg:col-span-2">
          <button className="flex-1 border border-black/5 rounded-2xl flex items-center justify-center gap-3 text-xs uppercase tracking-widest font-bold text-ink/40 hover:bg-black/5 transition-all">
            <Navigation className="w-4 h-4 text-accent-purple" />
            Near Me
          </button>
          <button className="flex-1 border border-black/5 rounded-2xl flex items-center justify-center gap-3 text-xs uppercase tracking-widest font-bold text-ink/40 hover:bg-black/5 transition-all">
            <Filter className="w-4 h-4 text-accent-purple" />
            Filters
          </button>
        </div>
      </div>

      {/* Main Content: List + Map Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Hospital List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-medium text-xl text-ink">Showing {hospitals.length} results</h2>
            <select className="bg-transparent border-none text-[10px] uppercase tracking-widest font-bold text-ink/30 focus:ring-0 cursor-pointer">
              <option>Sort by: Distance</option>
              <option>Sort by: Rating</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hospitals.map((hospital, idx) => (
              <HospitalCard key={hospital.id} hospital={hospital} index={idx} />
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 glass-card h-[650px] overflow-hidden group">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center flex-col p-12 text-center z-10">
              <div className="w-20 h-20 rounded-3xl bg-accent-purple/5 flex items-center justify-center mb-8 animate-pulse">
                <MapPin className="w-10 h-10 text-accent-purple" />
              </div>
              <h3 className="text-2xl font-display font-medium mb-4 text-ink">Interactive Map</h3>
              <p className="text-ink/40 text-sm mb-10 leading-relaxed font-light">
                Enable location services to see hospitals and clinics directly on the map with real-time navigation.
              </p>
              <button className="btn-gradient from-accent-purple to-accent-blue py-4 px-10">
                Enable Location
              </button>
            </div>
            {/* Mock Map Image */}
            <img 
              src="https://picsum.photos/seed/map/800/1200?blur=10" 
              className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
              alt="Map"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
