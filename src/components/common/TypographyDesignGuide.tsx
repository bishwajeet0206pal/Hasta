import React, { useState } from 'react';
import {
  Type,
  Layers,
  Palette,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Maximize2,
  Smartphone,
  Monitor,
  Eye,
  Sliders,
  Award,
  Clock,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TypographyDesignGuide: React.FC = () => {
  const { setActiveView, setSelectedProductId } = useApp();
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'overview' | 'specimens' | 'scale' | 'messages' | 'components' | 'colors'>('overview');
  const [customText, setCustomText] = useState('Authentic craft needs no translation.');

  return (
    <div className="bg-[#FFFDF8] text-hasta-earth-800 min-h-screen">
      {/* 1. Top Guideline Navigation Bar */}
      <section className="bg-hasta-earth-900 text-hasta-ivory-200 border-b border-hasta-earth-800 py-3 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-hasta-haldi-500 text-hasta-earth-900 flex items-center justify-center font-serif font-bold text-lg">
              H
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg tracking-wide text-white">HASTA</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-hasta-cobalt-700 text-white font-mono">
                  Design System v2.0
                </span>
              </div>
              <p className="text-[11px] text-hasta-ivory-400">
                Editorial Typography & Balanced Color System Specification
              </p>
            </div>
          </div>

          {/* Viewport switch & tab pill controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center bg-hasta-earth-850 border border-hasta-earth-700 rounded-lg p-0.5">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  previewDevice === 'desktop'
                    ? 'bg-hasta-earth-700 text-white shadow-sm'
                    : 'text-hasta-ivory-400 hover:text-white'
                }`}
                title="Desktop (1440px breakpoint)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  previewDevice === 'mobile'
                    ? 'bg-hasta-earth-700 text-white shadow-sm'
                    : 'text-hasta-ivory-400 hover:text-white'
                }`}
                title="Mobile (390px viewport simulation)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile (390px)</span>
              </button>
            </div>

            <button
              onClick={() => setActiveView('home')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-hasta-cobalt-700 hover:bg-hasta-cobalt-800 text-white transition-colors"
            >
              Exit to Live Store
            </button>
          </div>
        </div>
      </section>

      {/* 2. Sub-Navigation Tabs */}
      <div className="sticky top-[60px] z-30 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex overflow-x-auto gap-1 sm:gap-2 py-2">
          {[
            { id: 'overview', label: '1. Brand Personality & Manifesto' },
            { id: 'colors', label: '2. Color Alchemy & Balance' },
            { id: 'specimens', label: '3. Font Family Specimens' },
            { id: 'scale', label: '4. Typography Scale & Hierarchy' },
            { id: 'messages', label: '5. Core Hasta Voice Compositions' },
            { id: 'components', label: '6. Component Anatomy' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-hasta-earth-900 text-white shadow-sm'
                  : 'text-hasta-earth-700 hover:bg-hasta-ivory-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Design Guide Container */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className={`transition-all mx-auto ${previewDevice === 'mobile' ? 'max-w-[420px] border-x border-stone-300 shadow-2xl bg-white px-4 py-6 rounded-3xl' : ''}`}>

          {/* TAB 1: OVERVIEW & BRAND MANIFESTO */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="border-b border-stone-200 pb-8">
                <span className="text-xs uppercase tracking-widest text-hasta-hingula-600 font-semibold">
                  Brand Philosophy & Typographic DNA
                </span>
                <h1 className="type-h1 text-hasta-earth-900 mt-2">
                  Artistic. Rooted. <em className="font-normal italic text-hasta-hingula-600">Uncompromised.</em>
                </h1>
                <p className="type-body-lg text-hasta-earth-700 mt-4 max-w-3xl">
                  Hasta sits at the intersection of an independent art publication, a contemporary Indian craft gallery, and a high-trust marketplace. The typography is confident yet human; generous in whitespace, respectful of the artisan’s time, and devoid of transient SaaS clichés.
                </p>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-hasta-ivory-200 rounded-2xl border border-stone-200/80">
                  <div className="w-10 h-10 rounded-xl bg-hasta-earth-900 text-hasta-ivory-200 flex items-center justify-center mb-4">
                    <Type className="w-5 h-5" />
                  </div>
                  <h3 className="type-h3 text-hasta-earth-900 mb-2">Display: Fraunces</h3>
                  <p className="type-body text-hasta-earth-700 text-sm">
                    Expressive optical serif with warm, organic swelling strokes inspired by vintage British-Indian book design and traditional woodblock prints. We use Fraunces selectively for editorial headlines, storytelling pull-quotes, and craft signatures.
                  </p>
                  <div className="mt-4 pt-3 border-t border-stone-300/60 text-xs font-mono text-hasta-earth-600">
                    Weights: 500, 600, 700 + Italic
                  </div>
                </div>

                <div className="p-6 bg-hasta-ivory-200 rounded-2xl border border-stone-200/80">
                  <div className="w-10 h-10 rounded-xl bg-hasta-cobalt-700 text-white flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="type-h3 text-hasta-earth-900 mb-2">Interface: Manrope</h3>
                  <p className="type-body text-hasta-earth-700 text-sm">
                    A clean, geometric humanist sans-serif engineered for ultra-crisp legibility across mobile screens. Manrope handles navigation, prices (with tabular alignment), buttons, specifications, dimensions, and transactional states.
                  </p>
                  <div className="mt-4 pt-3 border-t border-stone-300/60 text-xs font-mono text-hasta-earth-600">
                    Weights: 400 (Regular), 500, 600 (Semibold), 700
                  </div>
                </div>

                <div className="p-6 bg-hasta-ivory-200 rounded-2xl border border-stone-200/80">
                  <div className="w-10 h-10 rounded-xl bg-hasta-hingula-600 text-white flex items-center justify-center mb-4">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h3 className="type-h3 text-hasta-earth-900 mb-2">Disciplined Balance</h3>
                  <p className="type-body text-hasta-earth-700 text-sm">
                    Warm Haldi Yellow and sunlit Ivory create an inviting gallery atmosphere, while Jodhpur Cobalt & Madder Red are deployed in small, surgical quantities—directing buyer attention to high-value actions without visual shouting.
                  </p>
                  <div className="mt-4 pt-3 border-t border-stone-300/60 text-xs font-mono text-hasta-earth-600">
                    60% Canvas | 30% Ink | 10% Mineral Accents
                  </div>
                </div>
              </div>

              {/* Interactive Sandbox */}
              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 shadow-clean space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-hasta-earth-800">
                    Live Type Tester
                  </span>
                  <span className="text-xs text-stone-700 font-medium">Type below to preview both font systems</span>
                </div>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-hasta-ivory-100 border border-stone-300 rounded-lg focus:outline-none focus:border-hasta-cobalt-700 text-stone-900 font-medium"
                  placeholder="Type anything here..."
                />
                <div className="pt-4 border-t border-stone-100 space-y-4">
                  <div>
                    <span className="text-xs text-stone-700 font-mono font-bold">Fraunces Display 700 / Italic:</span>
                    <p className="font-serif text-2xl sm:text-4xl text-hasta-earth-900 mt-1 leading-snug">
                      {customText} <em className="italic text-hasta-hingula-600">Crafted with patience.</em>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-stone-700 font-mono font-bold">Manrope Interface 600 / 15px:</span>
                    <p className="font-sans text-sm sm:text-base text-hasta-earth-800 font-medium mt-1">
                      {customText} — Fired at 800°C in an open-wood kiln in Jaipur, Rajasthan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COLOR ALCHEMY & BALANCED USAGE */}
          {activeTab === 'colors' && (
            <div className="space-y-10">
              <div className="bg-gradient-to-r from-hasta-haldi-400 via-hasta-haldi-300 to-hasta-haldi-400 p-8 rounded-3xl border-2 border-amber-400 text-[#1F1610] shadow-sm">
                <span className="text-xs uppercase tracking-widest text-hasta-hingula-700 font-bold font-mono">
                  Visual Reference Proportion Formula
                </span>
                <h2 className="type-h2 text-[#1F1610] mt-1">
                  Huge Quantity Yellow + Small Quantity Red & Green Pops
                </h2>
                <p className="type-body text-[#2C1D13] mt-2 max-w-3xl font-medium">
                  Directly mirroring our reference image: the massive, sun-drenched Indian street wall provides a <strong>huge quantity of radiant yellow</strong> (~65%), balanced by <strong>low-quantity, surgical pops of vibrant red</strong> (vendor's turban & tomatoes, ~8%) and <strong>fresh green</strong> (coriander showers & chilies, ~8%), with crisp white typography and grounded dark ink.
                </p>
              </div>

              {/* The Color Swatches Grid with Explicit Proportions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Haldi Yellow — HUGE QUANTITY */}
                <div className="border-4 border-amber-400 rounded-3xl overflow-hidden bg-white shadow-clean">
                  <div className="h-36 bg-gradient-to-br from-[#F5B82E] to-[#E59500] p-4 flex flex-col justify-between text-[#1F1610]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/20 text-white">
                        #F5B82E
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#1F1610] shadow-xs">
                        Huge Quantity (~65%)
                      </span>
                    </div>
                    <span className="font-serif text-2xl font-bold text-white drop-shadow-sm">
                      Sunlit Marigold Yellow
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-xs text-stone-800 font-medium">
                      <strong>Visual Role:</strong> Dominant atmosphere, hero backgrounds, pullquote cards, category highlights.
                    </p>
                    <p className="text-[11px] text-amber-800 font-mono font-semibold">
                      Proportion: 60%–70% of total visual surface
                    </p>
                  </div>
                </div>

                {/* 2. Madder & Hingula Red — LOW QUANTITY POP */}
                <div className="border-2 border-hasta-hingula-600 rounded-3xl overflow-hidden bg-white shadow-clean relative">
                  <div className="h-36 bg-gradient-to-br from-[#D94F30] to-[#B91C1C] p-4 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/20 text-white">
                        #D94F30
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-hasta-hingula-700 shadow-xs">
                        Low Quantity (~8%)
                      </span>
                    </div>
                    <span className="font-serif text-2xl font-bold">
                      Madder & Hingula Red
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-xs text-stone-800 font-medium">
                      <strong>Visual Role:</strong> Primary action buttons ("Add to Bag", "Explore"), verification wax seals, price highlights, heart wishlist pops.
                    </p>
                    <p className="text-[11px] text-stone-500 font-mono font-semibold">
                      Proportion: strictly &lt;10% of pixels
                    </p>
                  </div>
                </div>

                {/* 3. Cilantro & Mint Green — LOW QUANTITY POP */}
                <div className="border-2 border-emerald-600 rounded-3xl overflow-hidden bg-white shadow-clean relative">
                  <div className="h-36 bg-gradient-to-br from-[#16A34A] to-[#15803D] p-4 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/20 text-white">
                        #16A34A
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-emerald-800 shadow-xs">
                        Low Quantity (~8%)
                      </span>
                    </div>
                    <span className="font-serif text-2xl font-bold">
                      Cilantro Green (Chutney)
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-xs text-stone-800 font-medium">
                      <strong>Visual Role:</strong> Studio audit checks, in-stock badges, escrow assurance tags, quality certified seals.
                    </p>
                    <p className="text-[11px] text-stone-500 font-mono font-semibold">
                      Proportion: strictly &lt;10% of pixels
                    </p>
                  </div>
                </div>

                {/* 4. Jodhpur Indigo & Cobalt */}
                <div className="border border-stone-200 rounded-3xl overflow-hidden bg-white shadow-clean">
                  <div className="h-32 bg-[#163A5F] p-4 flex flex-col justify-between text-white">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/20 text-white w-max">
                      #163A5F
                    </span>
                    <span className="font-serif text-xl font-bold">
                      Jodhpur Cobalt (Doorway Frame)
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-xs text-stone-700 font-medium">
                      <strong className="text-stone-900">Role:</strong> Secondary interactive links, pottery category indicators, quiet structure.
                    </p>
                    <p className="text-[11px] text-stone-700 font-mono font-bold">
                      Proportion: ~4%
                    </p>
                  </div>
                </div>

                {/* 5. Earth Brown Ink */}
                <div className="border border-stone-200 rounded-3xl overflow-hidden bg-white shadow-clean">
                  <div className="h-32 bg-[#2C1D13] p-4 flex flex-col justify-between text-white">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/20 text-white w-max">
                      #2C1D13
                    </span>
                    <span className="font-serif text-xl font-bold">
                      Earth Brown (Grounded Ink)
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-xs text-stone-700 font-medium">
                      <strong className="text-stone-900">Role:</strong> High-contrast editorial headlines, readable body text, grounded outlines.
                    </p>
                    <p className="text-[11px] text-stone-700 font-mono font-bold">
                      Proportion: all primary copy
                    </p>
                  </div>
                </div>

                {/* 6. Crisp White */}
                <div className="border border-stone-200 rounded-3xl overflow-hidden bg-white shadow-clean">
                  <div className="h-32 bg-stone-100 p-4 flex flex-col justify-between text-stone-900 border-b border-stone-200">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-black/10 text-stone-800 w-max">
                      #FFFFFF
                    </span>
                    <span className="font-serif text-xl font-bold">
                      Crisp White Card Surfaces
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-xs text-stone-700 font-medium">
                      <strong className="text-stone-900">Role:</strong> Pure white headlines on yellow walls, product card backgrounds, dialogs.
                    </p>
                    <p className="text-[11px] text-stone-700 font-mono font-bold">
                      Proportion: ~15%
                    </p>
                  </div>
                </div>
              </div>

              {/* The Balanced Live Interaction Demo */}
              <div className="p-8 bg-gradient-to-r from-hasta-haldi-300 via-hasta-haldi-200 to-hasta-haldi-300 rounded-3xl border-2 border-amber-300 text-[#1F1610] shadow-sm">
                <h3 className="type-h3 text-[#1F1610] mb-2">Live Balanced Color Interactions</h3>
                <p className="text-xs text-[#2C1D13] mb-6 font-medium max-w-xl">
                  Huge yellow canvas field with small, vivid red and green pops maintaining perfect visual excitement without clutter.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="btn-hingula px-7 py-3.5 rounded-full bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white font-sans text-[15px] font-bold tracking-wide shadow-lg shadow-hasta-hingula-600/30 transition-all active:scale-95 cursor-pointer">
                    Add to Bag (Vivid Red Pop)
                  </button>
                  <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 text-white font-sans text-[14px] font-bold shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>The Seal Verified (Cilantro Green Pop)</span>
                  </div>
                  <button className="px-6 py-3.5 rounded-full bg-white hover:bg-amber-50 text-[#1F1610] font-sans text-[15px] font-bold border border-amber-300 shadow-md transition-all cursor-pointer">
                    Consult Concierge (Crisp White)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SPECIMENS */}
          {activeTab === 'specimens' && (
            <div className="space-y-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-hasta-cobalt-700 font-semibold">
                  Font Family Analysis
                </span>
                <h2 className="type-h2 text-hasta-earth-900 mt-1">
                  Fraunces & Manrope Anatomical Specimen
                </h2>
              </div>

              {/* Fraunces Specimen Box */}
              <div className="p-6 sm:p-10 bg-white border border-stone-200 rounded-2xl shadow-clean space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-hasta-earth-900">Fraunces</h3>
                    <span className="text-xs text-stone-500 font-mono">Display Serif • Optical Size 144 • Soft/Wonky Axes</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-hasta-ivory-300 text-hasta-earth-800 text-xs font-semibold">
                    Headings & Storytelling
                  </span>
                </div>

                <div className="text-5xl sm:text-7xl font-serif text-hasta-earth-900 tracking-tight select-none">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                </div>

                <div className="text-3xl sm:text-5xl font-serif italic text-hasta-hingula-600 tracking-tight select-none">
                  The quick brown fox jumps over the lazy dog. ₹12,500
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-100">
                  <div>
                    <span className="text-xs text-stone-700 font-mono font-bold">Weight 400 (Regular)</span>
                    <p className="font-serif font-normal text-lg text-hasta-earth-800">Jaipur Blue Pottery</p>
                  </div>
                  <div>
                    <span className="text-xs text-stone-700 font-mono font-bold">Weight 600 (Semibold)</span>
                    <p className="font-serif font-semibold text-lg text-hasta-earth-800">Kiln-Fired Terracotta</p>
                  </div>
                  <div>
                    <span className="text-xs text-stone-700 font-mono font-bold">Weight 700 (Bold)</span>
                    <p className="font-serif font-bold text-lg text-hasta-earth-800">Madhubani Heritage</p>
                  </div>
                  <div>
                    <span className="text-xs text-stone-700 font-mono font-bold">Weight 700 Italic</span>
                    <p className="font-serif font-bold italic text-lg text-hasta-hingula-600">Six Evenings of Care</p>
                  </div>
                </div>
              </div>

              {/* Manrope Specimen Box */}
              <div className="p-6 sm:p-10 bg-white border border-stone-200 rounded-2xl shadow-clean space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <div>
                    <h3 className="font-sans text-3xl font-bold text-hasta-earth-900">Manrope</h3>
                    <span className="text-xs text-stone-700 font-mono font-bold">Geometric Humanist Sans • High Tabular Clarity</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-hasta-cobalt-100 text-hasta-cobalt-800 text-xs font-semibold">
                    Interface, Prices & Forms
                  </span>
                </div>

                <div className="text-3xl sm:text-5xl font-sans text-hasta-earth-900 tracking-tight select-none font-medium">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                </div>

                <div className="text-2xl sm:text-3xl font-sans text-hasta-earth-800 tracking-normal select-none">
                  0 1 2 3 4 5 6 7 8 9 • ₹4,500.00 • 48 hrs Inspection • 10% Commission
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-100">
                  <div>
                    <span className="text-xs text-stone-700 font-mono font-bold">Weight 400 (Body)</span>
                    <p className="font-sans font-normal text-sm text-hasta-earth-800">Dimensions: 32 × 18 × 18 cm</p>
                  </div>
                  <div>
                    <span className="text-xs text-stone-700 font-mono font-bold">Weight 500 (Medium)</span>
                    <p className="font-sans font-medium text-sm text-hasta-earth-800">White-glove crated shipment</p>
                  </div>
                  <div>
                    <span className="text-xs text-stone-700 font-mono font-bold">Weight 600 (Semibold)</span>
                    <p className="font-sans font-semibold text-sm text-hasta-cobalt-800">Add to Bag • ₹8,400</p>
                  </div>
                  <div>
                    <span className="text-xs text-stone-700 font-mono font-bold">Weight 700 (Bold)</span>
                    <p className="font-sans font-bold text-sm text-hasta-earth-900">Stage 5: Pre-dispatch QC</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COMPLETE SCALE & HIERARCHY */}
          {activeTab === 'scale' && (
            <div className="space-y-10">
              <div>
                <span className="text-xs uppercase tracking-widest text-hasta-hingula-600 font-semibold">
                  Comprehensive Responsive Scale
                </span>
                <h2 className="type-h2 text-hasta-earth-900 mt-1">
                  Typographic Hierarchy Specifications
                </h2>
                <p className="type-body text-hasta-earth-700 mt-2">
                  Every size is mathematically balanced for optical harmony and legibility across all viewport breakpoints.
                </p>
              </div>

              {/* Responsive Scale Table */}
              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-clean">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-hasta-ivory-200 border-b border-stone-200 text-hasta-earth-900 text-xs font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Level</th>
                        <th className="py-3 px-4">Font Family</th>
                        <th className="py-3 px-4">Desktop / Mobile</th>
                        <th className="py-3 px-4">Weight</th>
                        <th className="py-3 px-4">Line Height</th>
                        <th className="py-3 px-4">Letter Spacing</th>
                        <th className="py-3 px-4">Sample</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-hasta-earth-800">
                      {/* H1 */}
                      <tr className="hover:bg-hasta-ivory-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-hasta-cobalt-700">H1</td>
                        <td className="py-3.5 px-4 font-serif">Fraunces</td>
                        <td className="py-3.5 px-4 font-mono">72px / 42px</td>
                        <td className="py-3.5 px-4">600 (Semibold)</td>
                        <td className="py-3.5 px-4 font-mono">1.08</td>
                        <td className="py-3.5 px-4 font-mono">-0.025em</td>
                        <td className="py-3.5 px-4 font-serif text-2xl font-bold truncate max-w-xs text-hasta-earth-900">
                          Authentic Indian Craft
                        </td>
                      </tr>

                      {/* H2 */}
                      <tr className="hover:bg-hasta-ivory-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-hasta-cobalt-700">H2</td>
                        <td className="py-3.5 px-4 font-serif">Fraunces</td>
                        <td className="py-3.5 px-4 font-mono">48px / 32px</td>
                        <td className="py-3.5 px-4">600 (Semibold)</td>
                        <td className="py-3.5 px-4 font-mono">1.15</td>
                        <td className="py-3.5 px-4 font-mono">-0.02em</td>
                        <td className="py-3.5 px-4 font-serif text-xl font-bold truncate max-w-xs text-hasta-earth-900">
                          Curated Masterpieces
                        </td>
                      </tr>

                      {/* H3 */}
                      <tr className="hover:bg-hasta-ivory-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-hasta-cobalt-700">H3</td>
                        <td className="py-3.5 px-4 font-serif">Fraunces</td>
                        <td className="py-3.5 px-4 font-mono">32px / 26px</td>
                        <td className="py-3.5 px-4">600 (Semibold)</td>
                        <td className="py-3.5 px-4 font-mono">1.2</td>
                        <td className="py-3.5 px-4 font-mono">-0.01em</td>
                        <td className="py-3.5 px-4 font-serif text-lg font-semibold truncate max-w-xs text-hasta-earth-900">
                          Jaipur Blue Pottery
                        </td>
                      </tr>

                      {/* H4 */}
                      <tr className="hover:bg-hasta-ivory-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-hasta-cobalt-700">H4</td>
                        <td className="py-3.5 px-4 font-sans">Manrope</td>
                        <td className="py-3.5 px-4 font-mono">24px / 22px</td>
                        <td className="py-3.5 px-4">600 (Semibold)</td>
                        <td className="py-3.5 px-4 font-mono">1.3</td>
                        <td className="py-3.5 px-4 font-mono">-0.005em</td>
                        <td className="py-3.5 px-4 font-sans text-base font-semibold truncate max-w-xs text-hasta-earth-900">
                          Artisan Provenance Dossier
                        </td>
                      </tr>

                      {/* Body Large */}
                      <tr className="hover:bg-hasta-ivory-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-hasta-cobalt-700">Body Large</td>
                        <td className="py-3.5 px-4 font-sans">Manrope</td>
                        <td className="py-3.5 px-4 font-mono">20px / 18px</td>
                        <td className="py-3.5 px-4">400 (Regular)</td>
                        <td className="py-3.5 px-4 font-mono">1.5</td>
                        <td className="py-3.5 px-4 font-mono">-0.005em</td>
                        <td className="py-3.5 px-4 font-sans text-base truncate max-w-xs text-hasta-earth-700">
                          Each vessel is thrown on a stone wheel.
                        </td>
                      </tr>

                      {/* Body */}
                      <tr className="hover:bg-hasta-ivory-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-hasta-cobalt-700">Body</td>
                        <td className="py-3.5 px-4 font-sans">Manrope</td>
                        <td className="py-3.5 px-4 font-mono">16px</td>
                        <td className="py-3.5 px-4">400 (Regular)</td>
                        <td className="py-3.5 px-4 font-mono">1.55</td>
                        <td className="py-3.5 px-4 font-mono">Normal</td>
                        <td className="py-3.5 px-4 font-sans text-sm truncate max-w-xs text-hasta-earth-700">
                          Glazed with pure copper and cobalt oxide.
                        </td>
                      </tr>

                      {/* Caption */}
                      <tr className="hover:bg-hasta-ivory-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-hasta-cobalt-700">Caption</td>
                        <td className="py-3.5 px-4 font-sans">Manrope</td>
                        <td className="py-3.5 px-4 font-mono">13px</td>
                        <td className="py-3.5 px-4">500 (Medium)</td>
                        <td className="py-3.5 px-4 font-mono">1.4</td>
                        <td className="py-3.5 px-4 font-mono">+0.01em</td>
                        <td className="py-3.5 px-4 font-sans text-xs text-stone-500 uppercase tracking-wider">
                          POTTERY & SCULPTURE
                        </td>
                      </tr>

                      {/* Buttons */}
                      <tr className="hover:bg-hasta-ivory-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-hasta-cobalt-700">Buttons</td>
                        <td className="py-3.5 px-4 font-sans">Manrope</td>
                        <td className="py-3.5 px-4 font-mono">15px</td>
                        <td className="py-3.5 px-4">600 (Semibold)</td>
                        <td className="py-3.5 px-4 font-mono">1.2</td>
                        <td className="py-3.5 px-4 font-mono">+0.015em</td>
                        <td className="py-3.5 px-4 font-sans text-xs font-semibold text-hasta-cobalt-700">
                          Add to Bag • 15px
                        </td>
                      </tr>

                      {/* Product Prices */}
                      <tr className="hover:bg-hasta-ivory-50 transition-colors bg-hasta-ivory-100/50">
                        <td className="py-3.5 px-4 font-mono font-bold text-hasta-hingula-600">Product Prices</td>
                        <td className="py-3.5 px-4 font-sans">Manrope</td>
                        <td className="py-3.5 px-4 font-mono">22px / 20px</td>
                        <td className="py-3.5 px-4">700 (Bold)</td>
                        <td className="py-3.5 px-4 font-mono">1.2</td>
                        <td className="py-3.5 px-4 font-mono">-0.02em</td>
                        <td className="py-3.5 px-4 font-sans text-lg font-bold text-hasta-earth-900">
                          ₹18,500 <span className="text-xs font-normal text-stone-500">incl. GST</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CORE HASTA VOICE COMPOSITIONS */}
          {activeTab === 'messages' && (
            <div className="space-y-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-hasta-cobalt-700 font-semibold">
                  Editorial Showpieces
                </span>
                <h2 className="type-h2 text-hasta-earth-900 mt-1">
                  The Six Core Hasta Messages
                </h2>
                <p className="type-body text-hasta-earth-700 mt-2">
                  Demonstrating asymmetric alignment, selective italic Fraunces, and generous whitespace.
                </p>
              </div>

              {/* Message 1 */}
              <div className="p-8 sm:p-14 bg-gradient-to-br from-hasta-haldi-100/80 via-hasta-ivory-200 to-white rounded-3xl border border-hasta-haldi-300 shadow-clean relative overflow-hidden">
                <span className="text-xs font-mono text-hasta-earth-600 uppercase tracking-widest block mb-3">
                  Message 01 • Artisan Manifesto
                </span>
                <h2 className="type-h1 text-hasta-earth-900 max-w-3xl leading-[1.05]">
                  “You made it by hand. <br />
                  <em className="italic font-normal text-hasta-hingula-600">Now earn like it.”</em>
                </h2>
                <div className="mt-6 flex items-center gap-4 text-xs font-sans text-hasta-earth-700">
                  <span className="w-2 h-2 rounded-full bg-hasta-hingula-500"></span>
                  <span>10% flat transparent commission</span>
                  <span className="text-stone-300">•</span>
                  <span>Artisans set their own prices</span>
                </div>
              </div>

              {/* Message 2 */}
              <div className="p-8 sm:p-14 bg-hasta-ivory-200 rounded-3xl border border-stone-200 shadow-clean">
                <span className="text-xs font-mono text-hasta-cobalt-700 uppercase tracking-widest block mb-3">
                  Message 02 • Buyer Value Proposition
                </span>
                <h2 className="type-h2 text-hasta-earth-900 max-w-2xl">
                  “A buyer sees one photo. <br />
                  <span className="text-hasta-cobalt-700 italic font-serif">Not the six evenings.”</span>
                </h2>
                <p className="type-body-lg text-hasta-earth-700 mt-4 max-w-xl">
                  Until now. Every piece on Hasta documents the hours of patience, kiln firings, and ancestral handcraft that a still photograph can never capture.
                </p>
              </div>

              {/* Message 3 & 4 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-white rounded-3xl border border-stone-200 shadow-clean flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-stone-700 font-bold uppercase tracking-widest block mb-2">
                      Message 03 • Pricing Transparency
                    </span>
                    <h3 className="type-h3 text-hasta-earth-900 mt-2 leading-snug">
                      “Your hours, <br />
                      <em className="italic text-hasta-hingula-600">visible before your price.”</em>
                    </h3>
                    <p className="type-body text-hasta-earth-800 mt-3 text-sm font-medium">
                      We break down the raw materials, the weeks of manual labour, and the artisan’s fair share before you see the final cart total.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono text-stone-700 font-bold">
                    <span>Labor: 74%</span>
                    <span>Materials: 16%</span>
                    <span>Packaging: 10%</span>
                  </div>
                </div>

                <div className="p-8 bg-white rounded-3xl border border-stone-200 shadow-clean flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-stone-700 font-bold uppercase tracking-widest block mb-2">
                      Message 04 • Partnership Model
                    </span>
                    <h3 className="type-h3 text-hasta-earth-900 mt-2 leading-snug">
                      “Built with makers, <br />
                      <span className="text-hasta-cobalt-700 underline decoration-hasta-haldi-400 decoration-4 underline-offset-4">not at them.”</span>
                    </h3>
                    <p className="type-body text-hasta-earth-800 mt-3 text-sm font-medium">
                      Bilingual voice onboarding, doorstep white-glove crating, and prompt payouts without labyrinthine merchant terms.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-hasta-earth-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dedicated Artisan Support in Hindi & Regional Dialects</span>
                  </div>
                </div>
              </div>

              {/* Message 5 & 6 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-hasta-earth-900 text-hasta-ivory-200 rounded-3xl border border-hasta-earth-800 shadow-clean">
                  <span className="text-xs font-mono text-hasta-haldi-400 uppercase tracking-widest block mb-2">
                    Message 05 • Quality & QC Assurance
                  </span>
                  <h3 className="type-h3 text-white mt-2 leading-snug">
                    “Nobody ships <br />
                    <em className="italic text-hasta-haldi-300">on faith.”</em>
                  </h3>
                  <p className="type-body text-stone-300 mt-3 text-sm">
                    Pre-dispatch photographs and dimensions are verified by our curation desk before the crate leaves the artisan’s workshop.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-hasta-earth-800 border border-hasta-earth-700 text-xs font-mono text-hasta-ivory-300">
                    <Clock className="w-3.5 h-3.5 text-hasta-haldi-400" />
                    <span>48-Hour Buyer Inspection Window</span>
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-br from-hasta-ivory-100 to-hasta-haldi-100 rounded-3xl border border-hasta-haldi-300 shadow-clean flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-hasta-hingula-600 uppercase tracking-widest block mb-2">
                      Message 06 • Provenance Stamp
                    </span>
                    <h3 className="type-h3 text-hasta-earth-900 mt-2 leading-snug">
                      “The seal. <br />
                      <em className="italic text-hasta-hingula-600">Made by hand. Verified.”</em>
                    </h3>
                    <p className="type-body text-hasta-earth-700 mt-3 text-sm">
                      Tamper-evident physical hologram seal + digital cryptographic certificate with video evidence of the artisan’s craft process.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-hasta-hingula-600 text-white flex items-center justify-center shadow">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-hasta-earth-900 uppercase tracking-wider">
                        HASTA GUARANTEE
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        UID #HST-RAJ-2026-0842
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: COMPONENT ANATOMY */}
          {activeTab === 'components' && (
            <div className="space-y-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-hasta-cobalt-700 font-semibold">
                  Practical Implementation
                </span>
                <h2 className="type-h2 text-hasta-earth-900 mt-1">
                  Component Typographic Anatomy
                </h2>
                <p className="type-body text-hasta-earth-700 mt-2">
                  Showing how Fraunces and Manrope unify cards, buttons, pricing displays, and form labels.
                </p>
              </div>

              {/* 1. Product Card Specimen */}
              <div className="p-8 bg-white rounded-3xl border border-stone-200 shadow-clean">
                <span className="text-xs font-mono text-stone-700 font-bold uppercase tracking-wider block mb-4">
                  1. Product Card Typography Anatomy
                </span>
                <div className="max-w-xs bg-[#FFFDF8] rounded-2xl border border-stone-200 overflow-hidden shadow-clean">
                  <div className="h-56 bg-stone-200 relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80"
                      alt="Jaipur Blue Pottery"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-hasta-hingula-600 text-white text-[10px] font-bold tracking-wider uppercase">
                      The Seal • Hand Verified
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-[11px] uppercase tracking-wider text-stone-700 font-bold">
                      POTTERY & SCULPTURE • JAIPUR
                    </div>
                    <h4 className="font-serif text-lg font-bold text-hasta-earth-900 leading-snug">
                      Cobalt & Turquoise Floral Urn
                    </h4>
                    <p className="text-xs text-stone-700 font-medium">
                      by Devendra Kashyap • 22 yrs master
                    </p>
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <div className="type-price text-hasta-earth-900">
                        ₹18,500
                      </div>
                      <button className="btn-cobalt px-3 py-1.5 rounded-lg bg-hasta-cobalt-700 hover:bg-hasta-cobalt-800 text-white font-sans text-xs font-semibold tracking-wide transition-colors">
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Buttons Specimen */}
              <div className="p-8 bg-white rounded-3xl border border-stone-200 shadow-clean space-y-4">
                <span className="text-xs font-mono text-stone-700 font-bold uppercase tracking-wider block mb-2">
                  2. Button Hierarchy & Weights (Manrope 15px Semibold)
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="btn-cobalt px-5 py-2.5 rounded-xl bg-hasta-cobalt-700 text-white text-[15px] font-semibold tracking-[0.015em] shadow-clean">
                    Primary CTA • Jodhpur Cobalt
                  </button>
                  <button className="btn-hingula px-5 py-2.5 rounded-xl bg-hasta-hingula-600 text-white text-[15px] font-semibold tracking-[0.015em] shadow-clean">
                    Verified Action • Hingula Red
                  </button>
                  <button className="px-5 py-2.5 rounded-xl bg-hasta-ivory-200 border border-stone-300 text-hasta-earth-900 font-bold text-[15px] tracking-[0.015em]">
                    Secondary Outline
                  </button>
                  <button disabled className="px-5 py-2.5 rounded-xl bg-stone-200 text-stone-500 font-bold text-[15px] tracking-[0.015em] cursor-not-allowed">
                    Disabled State
                  </button>
                </div>
              </div>

              {/* 3. Form Input Typography */}
              <div className="p-8 bg-white rounded-3xl border border-stone-200 shadow-clean space-y-4">
                <span className="text-xs font-mono text-stone-700 font-bold uppercase tracking-wider block mb-2">
                  3. Form Field Typography (Manrope 13px Label / 15px Input)
                </span>
                <div className="max-w-md space-y-3">
                  <div>
                    <label className="block text-[13px] font-bold text-hasta-earth-900 mb-1">
                      Custom Dimension Request (cm)
                    </label>
                    <input
                      type="text"
                      defaultValue="Height: 45 cm, Diameter: 24 cm"
                      className="w-full px-3.5 py-2 text-[15px] text-hasta-earth-900 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-hasta-cobalt-700 font-medium"
                    />
                    <span className="block text-[11px] text-stone-700 font-medium mt-1">
                      Our concierge confirms artisan feasibility within 4 hours.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

