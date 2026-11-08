import React, { useState } from 'react';
import {
  X,
  Plus,
  Upload,
  CheckCircle2,
  DollarSign,
  Calendar,
  Ruler,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Artisan, ProductCategory } from '../../types';

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  artisan: Artisan;
}

export const NewProductModal: React.FC<NewProductModalProps> = ({
  isOpen,
  onClose,
  artisan
}) => {
  const { createProductListing, language } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('sculptures_pottery');
  const [craftTechnique, setCraftTechnique] = useState(artisan.craft);
  const [materials, setMaterials] = useState('Ground Quartz, Natural Cobalt Pigments, Lead-Free Glaze');
  const [heightCm, setHeightCm] = useState(35);
  const [widthCm, setWidthCm] = useState(20);
  const [weightKg, setWeightKg] = useState(2.5);
  const [price, setPrice] = useState(12000);
  const [madeToOrder, setMadeToOrder] = useState(true);
  const [productionLeadDays, setProductionLeadDays] = useState(14);
  const [description, setDescription] = useState('');
  const [makingProcessBrief, setMakingProcessBrief] = useState('');
  const [customizationAvailable, setCustomizationAvailable] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProductListing({
      name,
      artisanId: artisan.id,
      artisanName: artisan.name,
      artisanLocation: `${artisan.region}, ${artisan.state}`,
      category,
      categoryLabel: category === 'wall_art' ? 'Wall Art & Scrolls' : category === 'sculptures_pottery' ? 'Sculptures & Pottery' : 'Handmade Furniture',
      craftTechnique,
      materials: materials.split(',').map(m => m.trim()),
      dimensions: {
        heightCm,
        widthCm,
        unit: 'cm'
      },
      weightKg,
      price,
      madeToOrder,
      productionLeadDays: madeToOrder ? productionLeadDays : 0,
      dispatchLeadDays: 2,
      stockCount: 2,
      images: [
        'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80'
      ],
      description: description || 'Handcrafted statement piece created in traditional Rajasthani studio.',
      makingProcessBrief: makingProcessBrief || 'Turned by hand on potter wheel and wood-fired with natural mineral oxides.',
      careInstructions: ['Wipe clean with microfibre cloth.', 'Do not use abrasive chemicals.'],
      customizationAvailable,
      customizationOptions: ['Scale adjustment', 'Custom base inscription'],
      featured: false
    });
    onClose();
  };

  const commission10Pct = Math.round(price * 0.10);
  const netArtisanPayout = price - commission10Pct;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-hasta-gold-600" />
            <h2 className="font-serif text-xl font-bold text-stone-900">
              {language === 'hi' ? 'नया हस्तशिल्प उत्पाद जोड़ें' : 'List New Handcrafted Creation'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-stone-700 hover:text-stone-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-900 block mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Turquoise Flora Fluted Ceramic Vase"
              className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-900 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-900 block mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 font-medium"
              >
                <option value="sculptures_pottery">Sculptures & Pottery</option>
                <option value="wall_art">Wall Art & Paintings</option>
                <option value="furniture_decor">Furniture & Accents</option>
                <option value="textiles_furnishings">Textiles & Pashmina</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-900 block mb-1">Craft Technique</label>
              <input
                type="text"
                required
                value={craftTechnique}
                onChange={e => setCraftTechnique(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-900 font-medium"
              />
            </div>
          </div>

          {/* Pricing Rule (FR-14 & 8.2: Artisan sets price; Hasta 10% commission) */}
          <div className="p-4 bg-hasta-cream-100 rounded-xl border border-hasta-cream-200 space-y-2">
            <label className="font-bold text-stone-900 block">
              Set Your Product Price (₹ INR) *
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                required
                min={1000}
                value={price}
                onChange={e => setPrice(parseInt(e.target.value, 10) || 0)}
                className="w-40 p-2.5 rounded-lg border border-stone-300 text-base font-bold text-stone-900 bg-white"
              />
              <div className="text-xs text-stone-700 font-medium">
                <span>10% Platform Commission: <strong className="text-stone-900">-₹{commission10Pct.toLocaleString('en-IN')}</strong></span>
                <span className="block text-emerald-800 font-bold">
                  Your Net Payout: ₹{netArtisanPayout.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Dimensions & Weight */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-stone-900 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={e => setHeightCm(parseInt(e.target.value, 10))}
                className="w-full p-2 rounded-lg border border-stone-300 font-medium text-stone-900"
              />
            </div>
            <div>
              <label className="font-bold text-stone-900 block mb-1">Width (cm)</label>
              <input
                type="number"
                value={widthCm}
                onChange={e => setWidthCm(parseInt(e.target.value, 10))}
                className="w-full p-2 rounded-lg border border-stone-300 font-medium text-stone-900"
              />
            </div>
            <div>
              <label className="font-bold text-stone-900 block mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={weightKg}
                onChange={e => setWeightKg(parseFloat(e.target.value))}
                className="w-full p-2 rounded-lg border border-stone-300 font-medium text-stone-900"
              />
            </div>
          </div>

          {/* Lead Times & Toggles */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-900">
                <input
                  type="checkbox"
                  checked={madeToOrder}
                  onChange={e => setMadeToOrder(e.target.checked)}
                  className="rounded text-hasta-terracotta-600"
                />
                <span>Made to Order</span>
              </label>
              {madeToOrder && (
                <div className="mt-1.5">
                  <label className="text-[10px] text-stone-700 font-bold uppercase block">Crafting Days Required</label>
                  <input
                    type="number"
                    value={productionLeadDays}
                    onChange={e => setProductionLeadDays(parseInt(e.target.value, 10))}
                    className="w-full p-2 rounded-lg border border-stone-300 font-medium text-stone-900"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-900">
                <input
                  type="checkbox"
                  checked={customizationAvailable}
                  onChange={e => setCustomizationAvailable(e.target.checked)}
                  className="rounded text-hasta-terracotta-600"
                />
                <span>Open for Custom Commissions</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn-cobalt w-full mt-4 bg-hasta-cobalt-700 hover:bg-hasta-cobalt-800 text-white py-3.5 rounded-xl font-sans text-xs font-semibold shadow-clean transition-all cursor-pointer active:scale-[0.98]"
          >
            Submit Listing for Marketplace Moderation
          </button>
        </form>
      </div>
    </div>
  );
};

