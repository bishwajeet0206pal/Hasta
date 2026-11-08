import React, { useState } from 'react';
import {
  ArrowLeft,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  Compass,
  CheckCircle2,
  Calendar,
  Ruler
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TrustBadge } from '../common/TrustBadge';

export const ProductDetail: React.FC = () => {
  const {
    products,
    selectedProductId,
    artisans,
    setActiveView,
    setSelectedArtisanId,
    addToCart,
    savedProductIds,
    toggleSaveProduct,
    openConciergeForProduct,
    showToast
  } = useApp();

  const product = products.find(p => p.id === selectedProductId) || products[0];
  const artisan = artisans.find(a => a.id === product.artisanId) || artisans[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  const isSaved = savedProductIds.includes(product.id);

  // Unit conversion helper
  const formatDimension = (cmValue: number) => {
    if (unit === 'inches') {
      return `${(cmValue / 2.54).toFixed(1)} in`;
    }
    return `${cmValue} cm`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard', 'info');
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      {/* Back Button (Heuristic #3: User Freedom) */}
      <button
        onClick={() => setActiveView('catalog')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-900 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Catalogue</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Image Gallery (7 cols) (Heuristic #8: Less is More) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Display: Exactly 4:5 Product Ratio, 8px Image Radius, 12px Container Radius */}
          <div className="relative rounded-[12px] overflow-hidden bg-stone-100 border border-[#E6D8C5] aspect-[4/5] shadow-xs">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.dataset.fallbackApplied) {
                  target.dataset.fallbackApplied = 'true';
                  target.src = 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&q=80';
                }
              }}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Quick Action Overlay */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-stone-900 shadow-xs transition-all cursor-pointer"
                title="Share piece"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleSaveProduct(product.id)}
                className={`p-2.5 rounded-full backdrop-blur-md shadow-xs transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-white/90 text-stone-700 hover:text-rose-600'
                }`}
                title={isSaved ? 'Saved' : 'Save to collection'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-18 h-18 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-stone-900 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Making Process Brief */}
          <div className="bg-stone-50 p-6 rounded-[12px] border border-[#E6D8C5] mt-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Making Process & Craft Technique
            </span>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
              {product.makingProcessBrief}
            </p>
          </div>
        </div>

        {/* Right: Specifications & Purchasing (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="type-caption font-bold text-stone-700 uppercase tracking-wider block mb-1">
              {product.categoryLabel} • {product.craftTechnique}
            </span>

            <h1 className="type-h2 text-hasta-earth-900 leading-tight">
              {product.name}
            </h1>

            {/* Master Artisan Provenance Anchor (12px radius, 1px #E6D8C5 border, ZERO text collision) */}
            <div className="flex items-center justify-between gap-3 mt-4 p-3.5 bg-white rounded-[12px] border border-[#E6D8C5] shadow-xs">
              <div className="flex items-center gap-3 min-w-0 flex-1">
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
                  className="w-12 h-12 rounded-[8px] object-cover border border-[#E6D8C5] shrink-0 bg-stone-100"
                />
                <div className="min-w-0 flex-1">
                  <button
                    onClick={() => {
                      setSelectedArtisanId(artisan.id);
                      setActiveView('artisan-profile');
                    }}
                    className="font-serif font-bold text-hasta-earth-900 hover:underline truncate text-sm sm:text-base block w-full text-left cursor-pointer"
                    title={artisan.name}
                  >
                    {artisan.name}
                  </button>
                  <span className="type-caption text-stone-700 block truncate font-sans font-medium text-xs">
                    {artisan.region}, {artisan.state} • {artisan.experienceYears}y Lineage
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedArtisanId(artisan.id);
                  setActiveView('artisan-profile');
                }}
                className="h-8 px-3 rounded-[6px] bg-[#FFF9EB] hover:bg-amber-100 text-xs font-sans text-stone-800 hover:text-stone-900 border border-[#E6D8C5] font-bold shrink-0 cursor-pointer flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Profile</span>
                <span className="text-hasta-hingula-600">→</span>
              </button>
            </div>
          </div>

          {/* Verification Badges (Heuristic #10: Help/Explainer) */}
          <div className="space-y-1.5">
            <span className="type-caption font-medium text-stone-600 block">
              Verified Credentials:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {artisan.badges.map((b, idx) => (
                <TrustBadge key={idx} badge={b} size="sm" showExplainer={true} />
              ))}
            </div>
          </div>

          {/* Minimalist Price & Purchase Box with Transparency */}
          <div className="bg-white p-6 rounded-[12px] border border-[#E6D8C5] shadow-xs space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="type-caption uppercase tracking-wider text-stone-700 font-bold block">
                  Artisan Price
                </span>
                <span className="type-price text-3xl font-bold text-hasta-earth-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[6px] border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  No Buyer Fee
                </span>
                <span className="type-caption text-stone-600 block mt-0.5 font-semibold">
                  10% seller comm model
                </span>
              </div>
            </div>

            {/* Hasta Core Principle: "Your hours, visible before your price" (Tailored to Specific Craft Tradition) */}
            {(() => {
              let title = 'Labor & Craft Transparency';
              let leadTime = product.madeToOrder ? `${product.productionLeadDays} Days` : 'In Stock (Ready to Ship)';
              let breakdown = '“Your hours, visible before your price.” Raw materials account for ~22%; verified artisan master labor accounts for ~78%.';

              if (product.category === 'textiles_furnishings') {
                title = 'Labor & Handloom Transparency';
                leadTime = `${product.productionLeadDays || 18} Days Weaving`;
                breakdown = '“Your hours, visible before your price.” Certified pure mulberry silk and pure silver 24K gold zari account for ~28%; master pit-loom handloom weaving labor accounts for ~72%.';
              } else if (product.category === 'sculptures_pottery') {
                title = 'Labor & Smelting Transparency';
                leadTime = `${product.productionLeadDays || 14} Days Casting`;
                breakdown = '“Your hours, visible before your price.” Raw bell-metal bronze alloy and forest beeswax core account for ~24%; lost-wax hand sculpting, open furnace smelting & chiseling account for ~76%.';
              } else if (product.category === 'wall_art') {
                title = 'Labor & Devotional Art Transparency';
                leadTime = `${product.productionLeadDays || 21} Days Detailing`;
                breakdown = '“Your hours, visible before your price.” Handwoven organic khadi, 24K real gold leaf and riverbed stone pigments account for ~20%; freehand bamboo reed detailing accounts for ~80%.';
              } else if (product.category === 'furniture_decor') {
                if (product.craftTechnique?.toLowerCase().includes('pottery')) {
                  title = 'Labor & Firing Transparency';
                  leadTime = `${product.productionLeadDays || 14} Days Firing`;
                  breakdown = '“Your hours, visible before your price.” Raw quartz dough and natural cobalt pigment account for ~22%; artisan wheel shaping, hand-painting and 800°C wood kiln firing account for ~78%.';
                } else {
                  title = 'Labor & Carving Transparency';
                  leadTime = `${product.productionLeadDays || 24} Days Carving`;
                  breakdown = '“Your hours, visible before your price.” Seasoned single-block Indian Sheesham rosewood accounts for ~25%; hand-chiseled openwork floral trellis carving accounts for ~75%.';
                }
              }

              return (
                <div className="p-4 rounded-[12px] bg-gradient-to-r from-amber-100 via-amber-200/80 to-amber-100 border border-amber-400 text-xs font-sans text-amber-950 space-y-1 shadow-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-[#170F0A]">{title}</span>
                    <span className="text-hasta-hingula-700 font-mono font-bold">{leadTime}</span>
                  </div>
                  <p className="type-caption text-[#1F1610] font-semibold leading-relaxed">
                    {breakdown}
                  </p>
                </div>
              );
            })()}

            {/* Delivery & Timeline Breakdown */}
            <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs text-stone-700 font-sans">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                  <Truck className="w-3.5 h-3.5 text-stone-600" />
                  Insured Delivery:
                </span>
                <span className="font-bold text-stone-900">₹1,500</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-stone-600" />
                  Crafting Timeline:
                </span>
                <span className="font-bold text-stone-900">
                  {product.madeToOrder ? `${product.productionLeadDays} days + transit` : 'Ships within 48h'}
                </span>
              </div>
            </div>

            {/* Actions: Large 56px Primary Button + Standard 48px Secondary Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => addToCart(product)}
                className="btn-hingula w-full h-[56px] px-8 rounded-[8px] bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white text-[16px] font-sans font-bold tracking-wide shadow-lg shadow-hasta-hingula-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Add to Bag</span>
                <span>•</span>
                <span>₹{product.price.toLocaleString('en-IN')}</span>
              </button>

              {product.customizationAvailable && (
                <button
                  onClick={() => openConciergeForProduct(product)}
                  className="w-full h-[48px] px-6 rounded-[8px] bg-white hover:bg-stone-50 text-hasta-earth-800 border border-[#E6D8C5] text-[15px] font-sans font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-stone-700" />
                  <span>Request Custom Dimensions or Consultation</span>
                </button>
              )}
            </div>
          </div>

          {/* Dimensions & Specifications (Heuristic #6: Recognition Rather Than Recall) */}
          <div className="bg-white p-5 rounded-[12px] border border-[#E6D8C5] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-stone-700" />
                Dimensions & Specs
              </h3>
              <div className="inline-flex rounded-md border border-stone-200 p-0.5 text-[11px]">
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${unit === 'cm' ? 'bg-stone-900 text-white font-medium' : 'text-stone-700 font-semibold'}`}
                >
                  cm
                </button>
                <button
                  onClick={() => setUnit('inches')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${unit === 'inches' ? 'bg-stone-900 text-white font-medium' : 'text-stone-700 font-semibold'}`}
                >
                  in
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
                <span className="text-stone-700 block text-[10px] uppercase font-bold">Height</span>
                <span className="font-bold text-stone-900 text-sm">
                  {formatDimension(product.dimensions.heightCm)}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
                <span className="text-stone-700 block text-[10px] uppercase font-bold">Width</span>
                <span className="font-bold text-stone-900 text-sm">
                  {formatDimension(product.dimensions.widthCm)}
                </span>
              </div>
              {product.dimensions.depthCm && (
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
                  <span className="text-stone-700 block text-[10px] uppercase font-bold">Depth</span>
                  <span className="font-bold text-stone-900 text-sm">
                    {formatDimension(product.dimensions.depthCm)}
                  </span>
                </div>
              )}
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
                <span className="text-stone-700 block text-[10px] uppercase font-bold">Weight</span>
                <span className="font-bold text-stone-900 text-sm">
                  {product.weightKg} kg
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs">
              <span className="text-stone-900 font-bold block mb-1">Materials:</span>
              <div className="flex flex-wrap gap-1">
                {product.materials.map((mat, idx) => (
                  <span key={idx} className="bg-stone-100 text-stone-900 font-semibold px-2 py-0.5 rounded text-[11px] border border-stone-200">
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 48-Hour Guarantee Policy */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
              <span>Hasta 48-Hour Inspection Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-700 font-medium">
              Funds are held in secure escrow until 48 hours after confirmed delivery. If any damage in transit or material discrepancy occurs, upload photos for immediate evidence-based resolution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
