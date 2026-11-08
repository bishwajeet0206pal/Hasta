import React from 'react';
import {
  Search,
  ShoppingBag,
  Bookmark,
  Package,
  Wrench,
  ShieldCheck,
  Globe,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    persona,
    setPersona,
    language,
    setLanguage,
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    cart,
    setIsCartOpen,
    savedProductIds,
    orders,
    verifications,
    disputes
  } = useApp();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const pendingVerificationsCount = verifications.filter(v => v.status === 'pending_review').length;
  const activeDisputesCount = disputes.filter(d => d.status === 'under_investigation').length;

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9EB]/95 backdrop-blur-md border-b border-[#E6D8C5] transition-all">
      {/* 1. Minimal Persona Switcher */}
      <div className="bg-[#171513] text-stone-300 px-4 py-1.5 text-xs">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setPersona('buyer');
                setActiveView('home');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                persona === 'buyer'
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Buyer View
            </button>

            <span className="text-stone-600">|</span>

            <button
              onClick={() => {
                setPersona('artisan');
                setActiveView('artisan-dashboard');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                persona === 'artisan'
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Artisan Portal
            </button>

            <span className="text-stone-600">|</span>

            <button
              onClick={() => {
                setPersona('ops');
                setActiveView('ops-dashboard');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors relative cursor-pointer ${
                persona === 'ops'
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Ops Desk
              {(pendingVerificationsCount > 0 || activeDisputesCount > 0) && (
                <span className="w-1.5 h-1.5 rounded-full bg-hasta-hingula-500 absolute -top-0.5 -right-0.5" />
              )}
            </button>
          </div>

          {/* Bilingual toggle if in artisan mode */}
          {persona === 'artisan' && (
            <div className="flex items-center gap-1 text-[11px]">
              <Globe className="w-3 h-3 text-stone-400" />
              <button
                onClick={() => setLanguage('en')}
                className={`cursor-pointer ${language === 'en' ? 'text-white font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-stone-600">/</span>
              <button
                onClick={() => setLanguage('hi')}
                className={`cursor-pointer ${language === 'hi' ? 'text-white font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                हिन्दी
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Header Row: Logo, Spacious Search & Right Actions (Zero Overlap) */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[64px] md:h-[70px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            if (persona === 'buyer') setActiveView('home');
            else if (persona === 'artisan') setActiveView('artisan-dashboard');
            else setActiveView('ops-dashboard');
          }}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none shrink-0"
        >
          <div className="btn-hingula w-10 h-10 rounded-[8px] bg-hasta-hingula-600 text-white flex items-center justify-center font-serif text-2xl font-bold shadow-clean">
            ह
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-wider text-hasta-earth-900 block leading-none">
              HASTA
            </span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-stone-700 block mt-0.5 font-sans">
              {persona === 'artisan'
                ? (language === 'hi' ? 'शिल्पी पोर्टल • पार्टनर संघ' : 'Artisan Partner Portal')
                : 'Handmade in India'}
            </span>
          </div>
        </button>

        {/* Center Search Input for Buyer */}
        {persona === 'buyer' && (
          <div className="hidden sm:flex flex-1 max-w-md mx-4 lg:mx-8 relative">
            <input
              type="text"
              placeholder="Search craft, artisan, material..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                if (activeView !== 'catalog') setActiveView('catalog');
              }}
              className="w-full h-[42px] bg-white border border-[#D5C2AB] rounded-[8px] pl-10 pr-9 text-xs focus:outline-none focus:ring-2 focus:ring-hasta-cobalt-700 text-stone-900 placeholder-stone-500 font-medium transition-all shadow-2xs"
            />
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-stone-500 hover:text-stone-900 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer min-w-[24px] min-h-[24px] flex items-center justify-center"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Center Status Indicator for Artisan / Seller */}
        {persona === 'artisan' && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs font-sans">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-bold text-amber-950">
              {language === 'hi' ? 'भानु प्रजापति स्टूडियो • जयपुर' : 'Bhanu Prajapati Studio • Jaipur'}
            </span>
            <span className="text-stone-400">|</span>
            <span className="text-emerald-800 font-bold">
              {language === 'hi' ? 'सत्यापित शिल्पी • 10% शुल्क' : 'Verified Artisan • 10% Fair Fee'}
            </span>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {persona === 'buyer' ? (
            <>
              {/* Saved Items */}
              <button
                onClick={() => setActiveView('saved')}
                className={`w-[42px] h-[42px] rounded-[8px] flex items-center justify-center relative transition-colors cursor-pointer ${
                  activeView === 'saved'
                    ? 'bg-amber-100 text-stone-900 border border-[#E6D8C5]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                }`}
                title="Saved Items"
              >
                <Bookmark className="w-4 h-4" />
                {savedProductIds.length > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-hasta-hingula-600" />
                )}
              </button>

              {/* Orders */}
              <button
                onClick={() => setActiveView('my-orders')}
                className={`h-[42px] px-3.5 rounded-[8px] flex items-center gap-1.5 text-xs font-sans font-bold transition-colors cursor-pointer ${
                  activeView === 'my-orders' || activeView === 'order-detail'
                    ? 'bg-amber-100 text-stone-900 border border-[#E6D8C5]'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-white/80'
                }`}
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Orders</span>
                {orders.length > 0 && (
                  <span className="text-[11px] text-stone-800 font-bold">
                    ({orders.length})
                  </span>
                )}
              </button>

              {/* Cart / Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="btn-hingula h-[42px] px-5 rounded-[8px] bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white font-sans text-[13px] font-bold shadow-md shadow-hasta-hingula-600/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Bag</span>
                <span className="text-[11px] bg-white/25 px-2 py-0.5 rounded-full font-bold">
                  {cartItemCount}
                </span>
              </button>
            </>
          ) : persona === 'artisan' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('artisan-onboarding')}
                className="text-xs text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-stone-200 font-medium transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'सत्यापन स्थिति' : 'Verification Status'}
              </button>
              <button
                onClick={() => setActiveView('artisan-dashboard')}
                className="text-xs bg-hasta-charcoal-900 text-white font-medium px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'ऑर्डर सूची' : 'Orders'}
              </button>
            </div>
          ) : (
            <div className="text-xs font-medium text-stone-600">
              Operations Control
            </div>
          )}
        </div>
      </div>

      {/* 3. Dedicated Category Navigation Bar (Completely Separate Row — 100% Visible, ZERO Overlap) */}
      {persona === 'buyer' && (
        <div className="border-t border-[#E6D8C5]/70 bg-[#FFF9EB]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[40px] flex items-center justify-between overflow-x-auto scrollbar-none">
            <nav className="flex items-center gap-7 text-[13px] font-sans font-bold whitespace-nowrap">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setActiveView('catalog');
                }}
                className={`transition-colors cursor-pointer py-1.5 ${
                  activeView === 'catalog' && selectedCategory === 'all'
                    ? 'text-hasta-hingula-600 font-bold border-b-2 border-hasta-hingula-600'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                All Works
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('sculptures_pottery');
                  setActiveView('catalog');
                }}
                className={`transition-colors cursor-pointer py-1.5 ${
                  activeView === 'catalog' && selectedCategory === 'sculptures_pottery'
                    ? 'text-hasta-hingula-600 font-bold border-b-2 border-hasta-hingula-600'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Ganesha & Bronzes
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('wall_art');
                  setActiveView('catalog');
                }}
                className={`transition-colors cursor-pointer py-1.5 ${
                  activeView === 'catalog' && selectedCategory === 'wall_art'
                    ? 'text-hasta-hingula-600 font-bold border-b-2 border-hasta-hingula-600'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Indian Paintings
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('textiles_furnishings');
                  setActiveView('catalog');
                }}
                className={`transition-colors cursor-pointer py-1.5 ${
                  activeView === 'catalog' && selectedCategory === 'textiles_furnishings'
                    ? 'text-hasta-hingula-600 font-bold border-b-2 border-hasta-hingula-600'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Royal Handlooms
              </button>
              <button
                onClick={() => setActiveView('artisan-list')}
                className={`transition-colors cursor-pointer py-1.5 ${
                  activeView === 'artisan-list'
                    ? 'text-hasta-hingula-600 font-bold border-b-2 border-hasta-hingula-600'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Master Artisans
              </button>
            </nav>

            {/* Quick Helper Badge on Right of Subnav */}
            <div className="hidden md:flex items-center gap-2 text-[11px] text-stone-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Direct from Verified Studios</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Dedicated Artisan Partner Subnav Bar */}
      {persona === 'artisan' && (
        <div className="border-t border-[#E6D8C5]/70 bg-[#FFF9EB]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[40px] flex items-center justify-between overflow-x-auto scrollbar-none">
            <nav className="flex items-center gap-7 text-[13px] font-sans font-bold whitespace-nowrap">
              <button
                onClick={() => setActiveView('artisan-dashboard')}
                className={`transition-colors cursor-pointer py-1.5 ${
                  activeView === 'artisan-dashboard'
                    ? 'text-hasta-hingula-600 font-bold border-b-2 border-hasta-hingula-600'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {language === 'hi' ? 'ऑर्डर एवं निर्माण ट्रैकिंग' : 'Orders & In-Production'}
              </button>
              <button
                onClick={() => setActiveView('artisan-onboarding')}
                className={`transition-colors cursor-pointer py-1.5 ${
                  activeView === 'artisan-onboarding'
                    ? 'text-hasta-hingula-600 font-bold border-b-2 border-hasta-hingula-600'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {language === 'hi' ? 'स्टूडियो सत्यापन (Pehchan ID)' : 'Studio Verification'}
              </button>
            </nav>

            <div className="hidden md:flex items-center gap-2 text-[11px] text-stone-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>{language === 'hi' ? 'सीधा बैंक भुगतान • 48 घंटे एस्क्रो' : 'Direct Studio Payouts • 48-Hr Escrow'}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
