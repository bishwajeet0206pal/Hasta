import React from 'react';
import {
  ArrowLeft,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TrustBadge } from '../common/TrustBadge';

export const ArtisanList: React.FC = () => {
  const { artisans, setSelectedArtisanId, setActiveView } = useApp();

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <button
          onClick={() => setActiveView('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-hasta-hingula-600 transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="type-caption font-bold tracking-widest text-hasta-hingula-700 uppercase block font-mono">
          Living Heritage Masters
        </span>
        <h1 className="type-h2 text-hasta-earth-900 mt-1">
          Verified Master Artisans of India
        </h1>
        <p className="type-body text-stone-800 font-medium text-sm mt-1 max-w-2xl">
          Discover certified lineage craftsmen preserving centuries-old techniques. Each artisan undergoes rigorous on-site studio, tool, and material verification.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {artisans.map(artisan => (
          <div
            key={artisan.id}
            className="bg-white rounded-[12px] border border-[#E6D8C5] p-6 sm:p-8 shadow-xs hover:-translate-y-[3px] transition-all duration-200 ease-out flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                {/* Maker portrait: 3:4 ratio, 8px radius */}
                <div className="w-24 aspect-[3/4] overflow-hidden rounded-[8px] border border-[#E6D8C5] shrink-0 bg-stone-100">
                  <img
                    src={artisan.profileImage}
                    alt={artisan.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.dataset.fallbackApplied) {
                        target.dataset.fallbackApplied = 'true';
                        target.src = 'https://images.unsplash.com/photo-1607867810523-d10955f2a8df?auto=format&fit=crop&w=600&q=80';
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="type-caption uppercase tracking-wider font-bold text-hasta-hingula-700 block font-mono">
                    {artisan.experienceYears}+ Years Ancestral Mastery
                  </span>
                  <h3 className="type-h3 text-hasta-earth-900 text-2xl truncate">
                    {artisan.name}
                  </h3>
                  <p className="type-caption text-stone-800 font-bold font-sans">
                    {artisan.studioName}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-stone-700 mt-1 font-sans font-medium">
                    <MapPin className="w-3.5 h-3.5 text-hasta-cobalt-700 shrink-0" />
                    <span>{artisan.region}, {artisan.state}</span>
                  </div>
                </div>
              </div>

              {/* Craft & Lineage */}
              <div className="bg-amber-50/60 p-4 rounded-[8px] border border-amber-200/80 text-xs font-sans">
                <span className="font-bold text-stone-900 block">Specialisation:</span>
                <span className="text-stone-800 font-medium">{artisan.craft}</span>
                <span className="text-stone-700 text-[11px] block mt-1 font-medium">Lineage: <strong className="text-stone-900">{artisan.lineage}</strong></span>
              </div>

              {/* Verification Badges */}
              <div>
                <span className="type-caption text-stone-700 uppercase font-bold block mb-1.5 font-sans">
                  Verified Trust Credentials:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {artisan.badges.map((b, idx) => (
                    <TrustBadge key={idx} badge={b} size="sm" />
                  ))}
                </div>
              </div>

              <p className="type-body text-xs text-stone-800 line-clamp-2 leading-relaxed font-medium">
                {artisan.story}
              </p>

              {/* Visual Workshop Preview Strip */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-600 block">
                  Studio & Making Glimpses:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {artisan.workshopImages.slice(0, 3).map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded-[8px] overflow-hidden bg-stone-100 border border-[#E6D8C5] shadow-xs">
                      <img src={img} alt="Studio work" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between font-sans">
              <span className="text-xs text-stone-700 font-semibold">
                {artisan.completedOrdersCount} works completed
              </span>
              <button
                onClick={() => {
                  setSelectedArtisanId(artisan.id);
                  setActiveView('artisan-profile');
                }}
                className="btn-hingula h-[42px] px-5 rounded-[8px] bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white font-sans text-[14px] font-bold shadow-md shadow-hasta-hingula-600/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <span>View Living Story & Works</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
