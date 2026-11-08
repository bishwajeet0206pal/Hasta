import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Compass,
  Sparkles,
  Clock,
  Layers,
  ChevronRight,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TrustBadge } from '../common/TrustBadge';

export const BuyerHome: React.FC = () => {
  const {
    products,
    artisans,
    setActiveView,
    setSelectedProductId,
    setSelectedArtisanId,
    setSelectedCategory,
    savedProductIds,
    toggleSaveProduct,
    addToCart,
    openConciergeForProduct
  } = useApp();

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="space-y-14 md:space-y-24 pb-20 bg-[#FFF9EB]">
      {/* 1. Hero Section — VIBRANT SUNLIT MARIGOLD YELLOW WALL (Huge Quantity Yellow + Small Red & Green Accents) */}
      <section className="relative bg-gradient-to-br from-[#F5B82E] via-[#F4B323] to-[#E59500] text-[#1F1610] pt-16 pb-24 px-4 sm:px-6 overflow-hidden border-b-4 border-amber-500/30">
        {/* Subtle authentic wall plaster texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Text — High Contrast Editorial Typographic Composition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill: Small Red Pop on High Contrast White Background */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-amber-500/50 text-[#170F0A] text-xs font-sans font-bold shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-hasta-hingula-600 animate-pulse" />
              <span className="tracking-wide">Direct from Verified Master Artisans Across India</span>
            </div>

            {/* Monumental Headline: Deep Espresso Ink for Maximum Contrast on Sunlit Yellow */}
            <h1 className="type-h1 text-[#170F0A] font-serif leading-[1.08] tracking-tight">
              Authentic Indian <br />
              <em className="font-normal italic text-hasta-hingula-800">craftsmanship,</em> <br />
              curated for your home.
            </h1>

            <p className="type-body-lg text-[#1F1610] font-semibold max-w-xl font-sans leading-relaxed">
              Discover verified master artisans across India. Transparent direct pricing, pre-dispatch quality proof, and a 48-hour delivery inspection window.
            </p>

            {/* Aligned Actions & Confidence Cards: Both sharing the exact same container & boundaries */}
            <div className="w-full max-w-[560px] space-y-6 pt-2">
              {/* Bigger Boxes: Primary CTAs in a 2-Column Grid spanning 100% width */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setActiveView('catalog');
                  }}
                  className="btn-hingula h-[54px] w-full px-5 rounded-[8px] bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white text-[15px] font-sans font-bold tracking-wide shadow-lg shadow-hasta-hingula-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 whitespace-nowrap"
                >
                  <span>Explore Curated Catalogue</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  onClick={() => setActiveView('artisan-list')}
                  className="h-[54px] w-full px-5 rounded-[8px] bg-white hover:bg-stone-50 text-[#170F0A] text-[15px] font-sans font-bold tracking-wide shadow-md transition-all cursor-pointer border border-[#E6D8C5] flex items-center justify-center whitespace-nowrap"
                >
                  Meet Master Artisans
                </button>
              </div>

              {/* Precise Divider spanning the exact container width */}
              <div className="border-t border-[#170F0A]/20 pt-6">
                {/* Three Boxes: Perfectly aligned to the left and right edges of the bigger boxes above */}
                <div className="grid grid-cols-3 gap-3 w-full">
                  <div className="bg-white/95 shadow-sm p-3.5 rounded-[12px] border border-amber-300/80 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 mb-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="truncate">100% Provenance</span>
                    </div>
                    <span className="type-caption text-stone-800 font-semibold block truncate">
                      Studio Audited
                    </span>
                  </div>

                  <div className="bg-white/95 shadow-sm p-3.5 rounded-[12px] border border-amber-300/80 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 mb-0.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="truncate">48-Hr Window</span>
                    </div>
                    <span className="type-caption text-stone-800 font-semibold block truncate">
                      Escrow Protected
                    </span>
                  </div>

                  <div className="bg-white/95 shadow-sm p-3.5 rounded-[12px] border border-amber-300/80 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-hasta-hingula-800 mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-hasta-hingula-600 shrink-0" />
                      <span className="truncate">10% Seller Fee</span>
                    </div>
                    <span className="type-caption text-stone-800 font-semibold block truncate">
                      No Buyer Markup
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Image — Framed Indian Masterwork on Yellow */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[12px] overflow-hidden shadow-2xl aspect-[4/5] bg-stone-100 group border-4 border-white/90">
              <img
                src="https://images.unsplash.com/photo-1567591370504-80142b28f1c1?auto=format&fit=crop&w=1200&q=80"
                alt="Sacred Lord Ganesha Bronze Idol"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1610]/85 via-transparent to-transparent" />

              {/* Minimal Provenance Pill with Green & Red Accents */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-clean border border-white/70 text-[#1F1610]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="type-caption text-stone-800 uppercase font-bold tracking-wider">
                    Sacred Lost-Wax Bell Metal
                  </span>
                  <span className="type-price text-hasta-hingula-600 font-bold">₹18,500</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1F1610] truncate">
                  Lord Ganesha in Lost-Wax Cast Bell Metal
                </h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-stone-800 font-sans font-semibold">
                  <span>By Devendra Kashyap & Somnath</span>
                  <span>•</span>
                  {/* Small Green Accent */}
                  <span className="text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    Verified Studio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Editorial Pullquote Banner (Vibrant Yellow Backdrop + Hingula Red Italic + Green Seal) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-14 bg-gradient-to-r from-hasta-haldi-400 via-hasta-haldi-300 to-hasta-haldi-400 rounded-[12px] border border-[#E6D8C5] shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            {/* Small Red Kicker */}
            <span className="text-xs font-mono text-hasta-hingula-800 font-bold uppercase tracking-widest block">
              Curator’s Perspective
            </span>
            <h2 className="type-h2 text-[#170F0A] leading-tight">
              “A buyer sees one photo. <br />
              <em className="italic font-bold text-hasta-hingula-800">Not the six evenings.”</em>
            </h2>
            <p className="type-body-lg text-[#1F1610] max-w-xl font-sans font-semibold">
              On Hasta, <strong className="font-bold text-[#170F0A]">“Your hours are visible before your price.”</strong> Every piece documents the artisan’s ancestral lineage, natural mineral glazes, and step-by-step kiln firings.
            </p>
            {/* Small Green Trust Seal */}
            <div className="pt-2 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ✓
              </span>
              <span className="text-xs font-sans text-[#170F0A] font-bold">
                The seal. Made by hand. Verified.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curated Craft Collections (Vibrant Tiles with Warm Overlays) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="type-caption font-bold tracking-wider text-amber-950 uppercase block mb-1">
              Curated Heritage
            </span>
            <h2 className="type-h2 text-hasta-earth-900">
              Explore by Craft Tradition
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('catalog');
            }}
            className="text-xs font-sans font-bold text-hasta-hingula-600 hover:text-hasta-hingula-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: 'sculptures_pottery',
              title: 'Sacred Bronzes & Ganesha',
              subtitle: 'Dhokra Lost-Wax & Bastar Metal',
              image: 'https://images.unsplash.com/photo-1567591370504-80142b28f1c1?auto=format&fit=crop&w=700&q=80',
            },
            {
              id: 'wall_art',
              title: 'Heritage Indian Paintings',
              subtitle: 'Pichwai, Madhubani & Pattachitra',
              image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=700&q=80',
            },
            {
              id: 'textiles_furnishings',
              title: 'Royal Handloom Silks',
              subtitle: 'Kanchipuram Zari & Pashmina',
              image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
            },
            {
              id: 'furniture_decor',
              title: 'Blue Pottery & Jali Wood',
              subtitle: 'Jaipur Quartz & Sheesham Craft',
              image: 'https://images.unsplash.com/photo-1672252508024-c80ac06f960c?auto=format&fit=crop&w=700&q=80',
            }
          ].map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                setActiveView('catalog');
              }}
              className="group relative rounded-[12px] overflow-hidden shadow-xs hover:-translate-y-[3px] transition-all duration-200 ease-out cursor-pointer aspect-[3/4] bg-stone-900 border border-[#E6D8C5]"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="type-h3 text-white leading-tight drop-shadow-md">
                  {cat.title}
                </h3>
                <p className="type-caption text-amber-300 font-bold drop-shadow-md mt-0.5 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Masterpieces (Crisp White Surfaces + Hingula Red Buttons + Cilantro Green Tags) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="type-caption font-bold tracking-wider text-amber-900 uppercase block mb-1">
              Curator’s Selection
            </span>
            <h2 className="type-h2 text-hasta-earth-900">
              Authenticated Masterpieces
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('catalog');
            }}
            className="text-xs font-sans font-bold text-hasta-hingula-600 hover:text-hasta-hingula-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Full Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => {
            const isSaved = savedProductIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-[12px] overflow-hidden border border-[#E6D8C5] shadow-xs hover:-translate-y-[3px] transition-all duration-200 ease-out flex flex-col justify-between"
              >
                <div>
                  {/* Product Image Frame: Exactly 4:5 ratio, 8px radius */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 p-2 pb-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-[8px] group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* Warm Marigold Lead Time Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-100/95 text-amber-950 border border-amber-300/80 backdrop-blur-sm px-2.5 py-0.5 rounded-[6px] text-[11px] font-sans font-bold shadow-xs">
                        {product.madeToOrder ? `${product.productionLeadDays}d Crafting` : 'In Stock'}
                      </span>
                    </div>

                    {/* Wishlist Button (Small Red Pop) */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleSaveProduct(product.id);
                      }}
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

                  {/* Product Details (16px internal padding) */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span
                        className="text-[11px] font-sans uppercase tracking-wider font-bold text-stone-700 truncate"
                        title={`${product.artisanLocation} • ${product.craftTechnique}`}
                      >
                        {product.craftTechnique}
                      </span>
                      {/* Compact Provenance Verified Mark */}
                      <span className="shrink-0 text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>Verified</span>
                      </span>
                    </div>

                    <h3
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setActiveView('pdp');
                      }}
                      className="font-serif text-base sm:text-lg font-bold text-hasta-earth-900 hover:text-hasta-hingula-600 transition-colors cursor-pointer line-clamp-1 leading-snug"
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-stone-800 font-sans">
                      <span className="text-stone-700 font-semibold">By</span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedArtisanId(product.artisanId);
                          setActiveView('artisan-profile');
                        }}
                        className="hover:underline font-bold text-hasta-earth-900 truncate"
                      >
                        {product.artisanName}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Clean Bottom Price and CTA (Balanced Height 38px, Single-Line, Zero Overflow) */}
                <div className="p-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[20px] font-bold font-sans text-hasta-earth-900 tracking-tight block">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {product.customizationAvailable && (
                      <button
                        onClick={() => openConciergeForProduct(product)}
                        className="h-[38px] w-[38px] rounded-[8px] text-stone-600 hover:text-hasta-earth-900 hover:bg-stone-100 border border-[#E6D8C5] transition-colors cursor-pointer flex items-center justify-center shrink-0"
                        title="Request Customisation"
                      >
                        <Compass className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => addToCart(product)}
                      className="btn-hingula h-[38px] px-3.5 rounded-[8px] bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white font-sans text-[13px] font-bold tracking-wide shadow-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center whitespace-nowrap shrink-0"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Master Artisan Lineage Spotlight (Warm Golden Canvas + Cilantro Green Badges) */}
      <section className="bg-gradient-to-r from-hasta-haldi-200/80 via-hasta-haldi-100 to-hasta-haldi-200/80 border-y-2 border-amber-300 py-16 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="type-caption font-bold tracking-wider text-amber-950 uppercase block mb-1">
                Direct Lineage
              </span>
              <h2 className="type-h2 text-hasta-earth-900">
                Verified Master Artisans
              </h2>
            </div>
            <button
              onClick={() => setActiveView('artisan-list')}
              className="text-xs font-sans font-bold text-hasta-hingula-600 hover:text-hasta-hingula-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Artisans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artisans.slice(0, 3).map(artisan => (
              <div
                key={artisan.id}
                className="p-6 rounded-[12px] bg-white border border-[#E6D8C5] shadow-xs hover:-translate-y-[3px] transition-all duration-200 ease-out flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    {/* Maker portrait: exactly 3:4 aspect ratio, 8px radius */}
                    <div className="w-20 aspect-[3/4] overflow-hidden rounded-[8px] border border-[#E6D8C5] shrink-0 bg-stone-100">
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
                    <div>
                      <h3 className="font-serif text-lg font-bold text-hasta-earth-900">
                        {artisan.name}
                      </h3>
                      <p className="text-xs text-stone-800 font-sans font-semibold">
                        {artisan.craft}
                      </p>
                      <span className="type-caption text-stone-700 block mt-0.5 font-sans font-medium">
                        {artisan.region}, {artisan.state} • {artisan.experienceYears}y Lineage
                      </span>
                    </div>
                  </div>

                  <p className="type-body text-xs text-stone-800 line-clamp-3 leading-relaxed mb-4">
                    {artisan.story}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {artisan.badges.slice(0, 2).map((b, idx) => (
                      <TrustBadge key={idx} badge={b} size="sm" showExplainer={false} />
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-sans">
                  <span className="text-stone-700 font-medium">{artisan.completedOrdersCount} works completed</span>
                  <button
                    onClick={() => {
                      setSelectedArtisanId(artisan.id);
                      setActiveView('artisan-profile');
                    }}
                    className="text-hasta-hingula-700 font-bold hover:underline cursor-pointer"
                  >
                    View Studio →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The Hasta Trust Promise (Vibrant Grounded Trust Architecture) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-stone-700">
          <div className="p-6 rounded-[12px] bg-white border border-[#E6D8C5] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-[8px] bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            </div>
            <span className="type-h4 text-hasta-earth-900 block font-bold text-base">Verified Artisans</span>
            <p className="type-body text-xs leading-relaxed text-stone-700 font-medium">On-site studio audits of tools, materials, and authentic heritage lineage.</p>
          </div>

          <div className="p-6 rounded-[12px] bg-white border border-[#E6D8C5] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-[8px] bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Award className="w-4 h-4 text-amber-700" />
            </div>
            <span className="type-h4 text-hasta-earth-900 block font-bold text-base">Pre-Dispatch Evidence</span>
            <p className="type-body text-xs leading-relaxed text-stone-700 font-medium">Inspect photos of your completed item before it is packed into wooden crates.</p>
          </div>

          <div className="p-6 rounded-[12px] bg-white border border-[#E6D8C5] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-[8px] bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
            </div>
            <span className="type-h4 text-hasta-earth-900 block font-bold text-base">48-Hour Inspection</span>
            <p className="type-body text-xs leading-relaxed text-stone-700 font-medium">Artisan payout is held in escrow until you confirm delivery satisfaction.</p>
          </div>

          <div className="p-6 rounded-[12px] bg-white border border-[#E6D8C5] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-[8px] bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
              <span className="font-mono text-xs font-bold text-hasta-hingula-700">10%</span>
            </div>
            <span className="type-h4 text-hasta-earth-900 block font-bold text-base">Transparent Pricing</span>
            <p className="type-body text-xs leading-relaxed text-stone-700 font-medium">Artisan sets the price. 10% platform commission with zero hidden buyer fees.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
