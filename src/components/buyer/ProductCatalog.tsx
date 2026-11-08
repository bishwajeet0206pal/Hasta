import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  X,
  Heart,
  Compass,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setActiveView,
    setSelectedProductId,
    setSelectedArtisanId,
    savedProductIds,
    toggleSaveProduct,
    addToCart,
    openConciergeForProduct
  } = useApp();

  // Filter States
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [priceTier, setPriceTier] = useState<string>('all');
  const [onlyReadyToShip, setOnlyReadyToShip] = useState<boolean>(false);
  const [onlyCustomizable, setOnlyCustomizable] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high'>('featured');

  const categories = [
    { id: 'all', label: 'All Handicrafts' },
    { id: 'sculptures_pottery', label: 'Sacred Bronzes & Ganesha' },
    { id: 'wall_art', label: 'Paintings (Pichwai & Madhubani)' },
    { id: 'textiles_furnishings', label: 'Royal Handlooms' },
    { id: 'furniture_decor', label: 'Blue Pottery & Jali' }
  ];

  const regions = ['all', 'Rajasthan', 'Chhattisgarh', 'Odisha', 'Jammu & Kashmir'];

  const hasActiveFilters = selectedRegion !== 'all' || priceTier !== 'all' || onlyReadyToShip || onlyCustomizable || searchQuery.trim().length > 0;

  const resetFilters = () => {
    setSelectedRegion('all');
    setPriceTier('all');
    setOnlyReadyToShip(false);
    setOnlyCustomizable(false);
    setSearchQuery('');
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesArtisan = product.artisanName.toLowerCase().includes(q);
        const matchesCraft = product.craftTechnique.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesLoc = product.artisanLocation.toLowerCase().includes(q);
        if (!matchesName && !matchesArtisan && !matchesCraft && !matchesDesc && !matchesLoc) {
          return false;
        }
      }

      // Region
      if (selectedRegion !== 'all') {
        if (!product.artisanLocation.includes(selectedRegion)) return false;
      }

      // Price Tier
      if (priceTier === 'under_15k' && product.price > 15000) return false;
      if (priceTier === '15k_30k' && (product.price < 15000 || product.price > 30000)) return false;
      if (priceTier === 'above_30k' && product.price < 30000) return false;

      // Made-to-order vs Ready
      if (onlyReadyToShip && product.madeToOrder) return false;

      // Customization
      if (onlyCustomizable && !product.customizationAvailable) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, selectedRegion, priceTier, onlyReadyToShip, onlyCustomizable, sortBy]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 1. Header with Vibrant Sunlit Yellow Banner (Clean & Uncluttered) */}
      <div className="bg-gradient-to-r from-hasta-haldi-400 via-hasta-haldi-300 to-hasta-haldi-400 p-6 sm:p-8 rounded-[12px] border border-[#E6D8C5] shadow-sm text-[#1F1610]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 text-xs font-bold text-[#1F1610] mb-2 border border-white/50">
            <span className="w-2 h-2 rounded-full bg-hasta-hingula-600" />
            <span>Direct Studio Catalogue</span>
          </div>
          <h1 className="type-h2 text-[#1F1610] leading-tight">
            Indian Craft Masterpieces
          </h1>
          <p className="text-xs sm:text-sm text-[#35251B] mt-1 font-medium max-w-2xl">
            Showing {filteredProducts.length} authenticated creations from verified master artisans across India.
          </p>
        </div>

        {/* Active Filter Chips (Heuristic #3: User Freedom to remove) */}
        {hasActiveFilters && (
          <div className="mt-4 pt-3 border-t border-[#1F1610]/15 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#35251B] font-bold">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#1F1610] font-medium shadow-xs">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="cursor-pointer hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedRegion !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#1F1610] font-medium shadow-xs">
                {selectedRegion}
                <button onClick={() => setSelectedRegion('all')} className="cursor-pointer hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceTier !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#1F1610] font-medium shadow-xs">
                {priceTier === 'under_15k' ? '< ₹15,000' : priceTier === '15k_30k' ? '₹15,000 - ₹30,000' : '> ₹30,000'}
                <button onClick={() => setPriceTier('all')} className="cursor-pointer hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {onlyReadyToShip && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold shadow-xs">
                Ready to Ship
                <button onClick={() => setOnlyReadyToShip(false)} className="cursor-pointer hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[#1F1610] hover:text-rose-700 underline ml-2 cursor-pointer font-bold"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* 2. Category Quick-Pills — Shifted BELOW Yellow Div, NO Scrolling, ALL Immediately Available */}
      <div className="bg-white p-4 sm:p-5 rounded-[12px] border border-[#E6D8C5] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-700 font-sans">
            Craft Traditions:
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-hasta-hingula-600 hover:underline font-bold cursor-pointer self-start sm:self-auto"
            >
              Show All Handicrafts
            </button>
          )}
        </div>

        {/* All categories right available and visible without scrolling */}
        <div className="flex flex-wrap items-center gap-2.5">
          {categories.map(cat => {
            const count = cat.id === 'all'
              ? products.length
              : products.filter(p => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2.5 rounded-[8px] text-[13px] font-sans font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'btn-hingula bg-hasta-hingula-600 text-white shadow-md shadow-hasta-hingula-600/20'
                    : 'bg-[#FFF9EB] hover:bg-amber-100/70 text-stone-800 border border-[#E6D8C5]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-stone-200/80 text-stone-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Grid with Minimalist Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar (Heuristic #8: Less is More) */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white p-5 rounded-[12px] border border-[#E6D8C5] space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-700" />
                Filter Pieces
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-stone-700 hover:text-stone-900 font-bold cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Price Tier */}
            <div>
              <label className="text-xs font-bold text-stone-900 block mb-2">
                Price Range
              </label>
              <div className="space-y-1.5 text-xs text-stone-800 font-medium">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under_15k', label: 'Under ₹15,000' },
                  { id: '15k_30k', label: '₹15,000 to ₹30,000' },
                  { id: 'above_30k', label: '₹30,000 and above' }
                ].map(tier => (
                  <label key={tier.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceTier"
                      checked={priceTier === tier.id}
                      onChange={() => setPriceTier(tier.id)}
                      className="text-stone-900 focus:ring-stone-500 text-xs"
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Region / Guild */}
            <div>
              <label className="text-xs font-bold text-stone-900 block mb-2">
                Craft Region
              </label>
              <div className="space-y-1.5 text-xs text-stone-800 font-medium">
                {regions.map(reg => (
                  <label key={reg} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="region"
                      checked={selectedRegion === reg}
                      onChange={() => setSelectedRegion(reg)}
                      className="text-stone-900 focus:ring-stone-500"
                    />
                    <span>{reg === 'all' ? 'All Regions' : reg}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyReadyToShip}
                  onChange={e => setOnlyReadyToShip(e.target.checked)}
                  className="rounded text-stone-900 focus:ring-stone-500"
                />
                <span className="text-stone-700">Ready to Ship Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyCustomizable}
                  onChange={e => setOnlyCustomizable(e.target.checked)}
                  className="rounded text-stone-900 focus:ring-stone-500"
                />
                <span className="text-stone-700">Custom Commissions Available</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3 space-y-5">
          {/* Top Sort Bar (Heuristic #7: Flexibility) */}
          <div className="flex items-center justify-between text-xs text-stone-800 font-bold py-1">
            <span>{filteredProducts.length} Results</span>
            <div className="flex items-center gap-2">
              <span className="text-stone-700 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-stone-900 focus:outline-none cursor-pointer"
              >
                <option value="featured">Curator's Spotlight</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Cards */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-[12px] border border-[#E6D8C5] p-8 space-y-2">
              <p className="font-serif text-xl font-bold text-stone-900">
                No matching creations found
              </p>
              <p className="text-xs text-stone-700 font-medium">
                Try loosening your filters or search terms.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 h-[48px] px-6 bg-stone-900 text-white rounded-[8px] text-[15px] font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => {
                const isSaved = savedProductIds.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-[12px] overflow-hidden border border-[#E6D8C5] shadow-xs hover:-translate-y-[3px] transition-all duration-200 ease-out flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Frame: 4:5 ratio, 8px radius */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 p-2 pb-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          onError={(e) => {
                            // Safe fallback to craft imagery if image network drops
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80';
                          }}
                          className="w-full h-full object-cover rounded-[8px] group-hover:scale-102 transition-transform duration-300"
                        />

                        {/* Top Chip */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-amber-100/95 text-amber-950 border border-amber-300/80 backdrop-blur-sm px-2.5 py-0.5 rounded-[6px] text-[11px] font-sans font-bold shadow-xs">
                            {product.madeToOrder ? `${product.productionLeadDays}d Crafting` : 'In Stock'}
                          </span>
                        </div>

                        {/* Save Button */}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            toggleSaveProduct(product.id);
                          }}
                          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-xs ${
                            isSaved
                              ? 'bg-rose-50 text-hasta-hingula-600'
                              : 'bg-white/90 text-stone-600 hover:text-hasta-hingula-600 hover:bg-white'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-hasta-hingula-600' : ''}`} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between gap-2 text-xs mb-1">
                          <span
                            className="text-[11px] font-sans uppercase tracking-wider font-bold text-stone-700 truncate"
                            title={product.craftTechnique}
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
                          className="font-serif text-base sm:text-lg font-bold text-hasta-earth-900 hover:text-hasta-hingula-600 transition-colors line-clamp-1 cursor-pointer leading-snug"
                        >
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs text-stone-700 font-sans">
                          <span className="text-stone-600 font-medium">By</span>
                          <button
                            onClick={() => {
                              setSelectedArtisanId(product.artisanId);
                              setActiveView('artisan-profile');
                            }}
                            className="text-hasta-earth-900 hover:underline cursor-pointer font-bold truncate"
                          >
                            {product.artisanName}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Footer / CTA: Clean Price and Balanced 38px Buttons */}
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
          )}
        </div>
      </div>
    </div>
  );
};
