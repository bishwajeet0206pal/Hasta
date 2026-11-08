import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Sparkles,
  Heart,
  Volume2,
  VolumeX,
  Clock,
  Wrench,
  X,
  Maximize2,
  Layers,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TrustBadge } from '../common/TrustBadge';

export const ArtisanProfile: React.FC = () => {
  const {
    artisans,
    selectedArtisanId,
    products,
    setActiveView,
    setSelectedProductId,
    savedProductIds,
    toggleSaveProduct,
    addToCart
  } = useApp();

  const [activeTab, setActiveTab] = useState<'visual_story' | 'process' | 'works'>('visual_story');
  const [selectedProcessStep, setSelectedProcessStep] = useState<number>(1);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; caption?: string } | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const artisan = artisans.find(a => a.id === selectedArtisanId) || artisans[0];
  const artisanProducts = products.filter(p => p.artisanId === artisan.id);

  const currentProcessStep = artisan.processSteps?.find(s => s.stepNumber === selectedProcessStep) || artisan.processSteps?.[0];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* 1. Navigation Back Button & Ambient Sound Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveView('artisan-list')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-hasta-hingula-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Master Artisans of India</span>
        </button>

        {/* Studio Ambient Soundscape Toggle */}
        <button
          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
          className={`px-3 py-1.5 rounded-full text-xs font-sans font-bold flex items-center gap-2 border transition-all cursor-pointer ${
            isPlayingAudio
              ? 'bg-amber-100 border-amber-300 text-amber-950 shadow-xs'
              : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
          title="Ambient studio soundscape"
        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-hasta-hingula-600 animate-pulse" />
              <span>Studio Atmosphere: Active</span>
              <span className="flex gap-0.5 items-end h-3">
                <span className="w-0.5 bg-hasta-hingula-600 h-2 animate-bounce" />
                <span className="w-0.5 bg-hasta-hingula-600 h-3 animate-bounce delay-75" />
                <span className="w-0.5 bg-hasta-hingula-600 h-1.5 animate-bounce delay-150" />
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-500" />
              <span>Listen to Studio Atmosphere</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Panoramic Visual Studio Header & Master Portrait */}
      <div className="bg-white rounded-[16px] overflow-hidden border border-[#E6D8C5] shadow-xs">
        {/* Cover: Full-Bleed Studio Atmosphere Image */}
        <div className="h-64 sm:h-80 relative overflow-hidden bg-stone-900 group">
          <img
            src={artisan.coverImage || artisan.workshopImages[0]}
            alt={artisan.studioName}
            className="w-full h-full object-cover opacity-85 group-hover:scale-103 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1610] via-black/40 to-transparent" />

          {/* Badges on Banner */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="bg-black/50 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-sans font-semibold flex items-center gap-1.5 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>On-Site Studio Verified</span>
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white hidden sm:block">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold block mb-1">
              Indian Living Craft Lineage
            </span>
            <p className="font-serif text-lg sm:text-xl italic max-w-2xl drop-shadow-md">
              “{artisan.hindiStory || artisan.story.slice(0, 140) + '...'}”
            </p>
          </div>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 sm:px-10 pb-8 pt-0 relative bg-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="flex items-end gap-5">
              {/* Portrait: exactly 3:4 aspect ratio, 8px radius */}
              <div
                className="relative group cursor-pointer"
                onClick={() =>
                  setLightboxImage({
                    url: artisan.profileImage,
                    title: artisan.name,
                    caption: `${artisan.experienceYears}+ years master artisan • ${artisan.studioName}`
                  })
                }
              >
                <img
                  src={artisan.profileImage}
                  alt={artisan.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1607867810523-d10955f2a8df?auto=format&fit=crop&w=600&q=80';
                  }}
                  className="w-28 sm:w-36 aspect-[3/4] rounded-[12px] object-cover border-4 border-white shadow-2xl bg-stone-100"
                />
                <span className="absolute bottom-2 right-2 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="pb-1">
                <span className="text-[11px] font-bold text-hasta-hingula-700 uppercase tracking-widest block font-mono">
                  {artisan.lineage}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-hasta-earth-900 leading-tight">
                  {artisan.name}
                </h1>
                {artisan.hindiName && (
                  <span className="text-base text-stone-600 font-serif font-bold block">
                    {artisan.hindiName}
                  </span>
                )}
                <p className="text-xs sm:text-sm text-stone-800 font-bold mt-0.5">
                  {artisan.studioName}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 bg-hasta-cream-100 px-6 py-3.5 rounded-[12px] border border-[#E6D8C5] shadow-xs">
              <div>
                <span className="text-xs text-stone-700 font-bold block font-sans">Heritage</span>
                <span className="font-serif text-xl font-bold text-stone-900">
                  {artisan.experienceYears}+ Years
                </span>
              </div>
              <div className="w-px h-8 bg-stone-300" />
              <div>
                <span className="text-xs text-stone-700 font-bold block font-sans">Works</span>
                <span className="font-serif text-xl font-bold text-stone-900">
                  {artisan.completedOrdersCount} Verified
                </span>
              </div>
              <div className="w-px h-8 bg-stone-300" />
              <div>
                <span className="text-xs text-stone-700 font-bold block font-sans">Rating</span>
                <span className="font-serif text-xl font-bold text-hasta-hingula-700">
                  ★ {artisan.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Location & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-2 text-xs text-stone-800 font-medium">
              <MapPin className="w-4 h-4 text-hasta-hingula-600 shrink-0" />
              <span>Studio: <strong>{artisan.region}, {artisan.state}</strong></span>
              <span>•</span>
              <span className="text-stone-700 font-semibold">{artisan.craft}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {artisan.badges.map((b, idx) => (
                <TrustBadge key={idx} badge={b} size="md" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Visual Story Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('visual_story')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'visual_story'
              ? 'btn-hingula bg-hasta-hingula-600 text-white shadow-md'
              : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>A Day in the Studio Life</span>
        </button>

        <button
          onClick={() => setActiveTab('process')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'process'
              ? 'btn-hingula bg-hasta-hingula-600 text-white shadow-md'
              : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Visual Craft Process (5 Steps)</span>
        </button>

        <button
          onClick={() => setActiveTab('works')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'works'
              ? 'btn-hingula bg-hasta-hingula-600 text-white shadow-md'
              : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Master’s Creations ({artisanProducts.length})</span>
        </button>
      </div>

      {/* 4. Tab 1: Visual Chronicle — A Day in the Studio Life */}
      {activeTab === 'visual_story' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          {/* Visual Story Banner */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-hasta-hingula-700 font-bold block">
              Photojournalistic Documentary
            </span>
            <h2 className="type-h2 text-hasta-earth-900">
              Living Heritage in {artisan.region}
            </h2>
            <p className="type-body text-stone-700 text-sm font-medium">
              A visual chronicle depicting the daily devotion, ancient tools, and generational rhythm of {artisan.name}'s workshop.
            </p>
          </div>

          {/* 4-Moment Visual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {artisan.studioMoments?.map((moment, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImage({ url: moment.image, title: moment.title, caption: moment.caption })}
                className="group bg-white rounded-[16px] overflow-hidden border border-[#E6D8C5] shadow-xs hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-mono font-bold flex items-center gap-1.5 border border-white/20">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>{moment.timeOfDay}</span>
                  </span>
                  <span className="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-hasta-earth-900 group-hover:text-hasta-hingula-600 transition-colors">
                    {moment.title}
                  </h3>
                  <p className="type-body text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                    {moment.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Heritage Tools Anatomy Spotlight */}
          <div className="bg-gradient-to-r from-hasta-haldi-100/90 via-hasta-haldi-50 to-hasta-haldi-100/90 p-8 rounded-[16px] border border-amber-300/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-950 font-bold block mb-1">
                  Sacred Instruments
                </span>
                <h3 className="type-h3 text-hasta-earth-900">
                  Tools Handed Down Through Generations
                </h3>
              </div>
              <p className="text-xs text-stone-800 font-medium max-w-md">
                No computer numerical controls (CNC) or mass factory molds. Every piece is shaped using the physical extensions of the artisan's hands.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {artisan.heritageTools?.map((tool, idx) => (
                <div key={idx} className="bg-white/90 p-4 rounded-[12px] border border-[#E6D8C5] shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-hasta-hingula-700">
                    <Wrench className="w-4 h-4" />
                    <h4 className="font-serif font-bold text-base text-hasta-earth-900">
                      {tool.name}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-700 font-medium leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab 2: Visual Step-by-Step Craft Process */}
      {activeTab === 'process' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-hasta-hingula-700 font-bold block">
              Step-by-Step Visual Journey
            </span>
            <h2 className="type-h2 text-hasta-earth-900">
              The Alchemy of {artisan.craft}
            </h2>
            <p className="type-body text-stone-700 text-sm font-medium">
              Watch how raw river earth, virgin forest beeswax, and natural stone pigments are transformed through hundreds of hours of patient hand craft.
            </p>
          </div>

          {/* Interactive Step Switcher */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
            {artisan.processSteps?.map(step => (
              <button
                key={step.stepNumber}
                onClick={() => setSelectedProcessStep(step.stepNumber)}
                className={`flex-1 min-w-[160px] p-4 rounded-[12px] border text-left transition-all cursor-pointer ${
                  selectedProcessStep === step.stepNumber
                    ? 'btn-cobalt bg-hasta-cobalt-700 text-white border-hasta-cobalt-800 shadow-md ring-2 ring-hasta-cobalt-700/30'
                    : 'bg-white text-stone-800 border-[#E6D8C5] hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-mono font-bold uppercase tracking-widest ${selectedProcessStep === step.stepNumber ? 'text-amber-300' : 'text-stone-500'}`}>
                    Step {step.stepNumber}
                  </span>
                  <span className="text-[11px] opacity-80">{step.duration}</span>
                </div>
                <h4 className="font-serif font-bold text-sm line-clamp-1">
                  {step.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Featured Process Step Stage (Large Visual) */}
          {currentProcessStep && (
            <div className="bg-white rounded-[16px] overflow-hidden border border-[#E6D8C5] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Large Visual */}
              <div
                onClick={() => setLightboxImage({ url: currentProcessStep.image, title: currentProcessStep.title, caption: currentProcessStep.description })}
                className="lg:col-span-7 relative aspect-[16/11] lg:aspect-auto overflow-hidden bg-stone-900 cursor-pointer group"
              >
                <img
                  src={currentProcessStep.image}
                  alt={currentProcessStep.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-mono font-bold flex items-center gap-2 border border-white/20">
                  <Wrench className="w-3.5 h-3.5 text-amber-300" />
                  <span>Tool: {currentProcessStep.toolUsed}</span>
                </span>
                <span className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>

              {/* Right Step Details */}
              <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-hasta-hingula-50 text-hasta-hingula-800 font-bold uppercase tracking-wider font-mono">
                      Phase {currentProcessStep.stepNumber} of {artisan.processSteps?.length}
                    </span>
                    <span className="font-bold text-stone-700 flex items-center gap-1 font-sans">
                      <Clock className="w-3.5 h-3.5 text-hasta-hingula-600" />
                      {currentProcessStep.duration}
                    </span>
                  </div>

                  <h3 className="type-h3 text-hasta-earth-900">
                    {currentProcessStep.title}
                  </h3>
                  {currentProcessStep.hindiTitle && (
                    <span className="text-sm font-serif font-bold text-stone-600 block">
                      {currentProcessStep.hindiTitle}
                    </span>
                  )}

                  <p className="type-body text-stone-700 text-sm leading-relaxed font-medium">
                    {currentProcessStep.description}
                  </p>

                  <div className="p-4 rounded-[10px] bg-stone-50 border border-stone-200/80 space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-700 font-bold block">
                      Instruments & Technique
                    </span>
                    <p className="text-xs font-bold text-stone-900 font-sans">
                      {currentProcessStep.toolUsed}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs font-sans">
                  <button
                    disabled={selectedProcessStep === 1}
                    onClick={() => setSelectedProcessStep(prev => Math.max(1, prev - 1))}
                    className="font-bold text-stone-700 hover:text-stone-900 disabled:opacity-40 cursor-pointer"
                  >
                    ← Previous Step
                  </button>
                  <button
                    disabled={selectedProcessStep === (artisan.processSteps?.length || 5)}
                    onClick={() => setSelectedProcessStep(prev => Math.min(artisan.processSteps?.length || 5, prev + 1))}
                    className="font-bold text-hasta-hingula-700 hover:text-hasta-hingula-800 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. Tab 3 / Default Catalog by this Artisan */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-hasta-hingula-600 font-mono">
              Masterpiece Gallery
            </span>
            <h2 className="type-h2 text-hasta-earth-900">
              Creations by {artisan.name}
            </h2>
          </div>
          <span className="text-xs text-stone-700 font-semibold font-sans">
            {artisanProducts.length} authenticated works available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisanProducts.map(product => {
            const isSaved = savedProductIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-[12px] overflow-hidden border border-[#E6D8C5] shadow-xs hover:-translate-y-[3px] transition-all duration-200 ease-out flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 p-2 pb-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-[8px] group-hover:scale-102 transition-transform duration-300"
                    />
                    <button
                      onClick={() => toggleSaveProduct(product.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-stone-700 hover:text-stone-900 shadow-xs transition-colors cursor-pointer"
                      title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-hasta-hingula-600 text-hasta-hingula-600' : 'text-stone-600'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <span className="text-[11px] font-sans uppercase tracking-wider font-bold text-stone-700 block truncate">
                      {product.craftTechnique}
                    </span>
                    <h3
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setActiveView('pdp');
                      }}
                      className="font-serif text-base font-bold text-hasta-earth-900 group-hover:text-hasta-hingula-600 transition-colors line-clamp-1 cursor-pointer leading-snug"
                    >
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Clean Bottom Price and CTA (Balanced Height 38px, Single-Line, Zero Overflow) */}
                <div className="p-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2 font-sans">
                  <div className="min-w-0">
                    <span className="text-[20px] font-bold font-sans text-hasta-earth-900 tracking-tight block">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn-hingula h-[38px] px-3.5 rounded-[8px] bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white font-sans text-[13px] font-bold shadow-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center whitespace-nowrap shrink-0"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Full-Screen Visual Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-in fade-in duration-200"
        >
          <div className="max-w-4xl max-h-[90vh] bg-stone-900 rounded-[16px] overflow-hidden p-3 relative" onClick={e => e.stopPropagation()}>
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="w-full h-auto max-h-[75vh] object-contain rounded-[8px]"
            />
            <div className="p-4 text-white">
              <h3 className="font-serif text-lg font-bold">{lightboxImage.title}</h3>
              {lightboxImage.caption && (
                <p className="text-xs text-stone-300 mt-1 font-medium">{lightboxImage.caption}</p>
              )}
            </div>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
