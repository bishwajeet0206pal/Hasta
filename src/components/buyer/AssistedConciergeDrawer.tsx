import React, { useState } from 'react';
import {
  X,
  Compass,
  PhoneCall,
  Sparkles,
  Send,
  CheckCircle2,
  Calendar,
  Layers,
  Ruler
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Enquiry } from '../../types';

export const AssistedConciergeDrawer: React.FC = () => {
  const {
    isConciergeOpen,
    setIsConciergeOpen,
    conciergeProduct,
    submitEnquiry
  } = useApp();

  const [buyerName, setBuyerName] = useState('Ananya Singhania');
  const [buyerPhone, setBuyerPhone] = useState('+91 98201 44590');
  const [buyerCity, setBuyerCity] = useState('Mumbai');
  const [requestType, setRequestType] = useState<Enquiry['requestType']>('custom_dimensions');
  const [requirements, setRequirements] = useState('');
  const [targetBudget, setTargetBudget] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isConciergeOpen || !conciergeProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry({
      buyerName,
      buyerPhone,
      buyerCity,
      productId: conciergeProduct.id,
      productName: conciergeProduct.name,
      productImage: conciergeProduct.images[0],
      artisanId: conciergeProduct.artisanId,
      artisanName: conciergeProduct.artisanName,
      requestType,
      requirements,
      targetBudget: targetBudget ? parseInt(targetBudget, 10) : undefined
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsConciergeOpen(false);
      setRequirements('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Top Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-hasta-terracotta-100 text-hasta-terracotta-700">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-hasta-terracotta-700 block">
                Hasta Assisted Buying
              </span>
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Custom Craft Commission
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsConciergeOpen(false)}
            className="p-1.5 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 space-y-6">
          {/* Target Product Summary */}
          <div className="flex items-center gap-3.5 p-3.5 bg-hasta-cream-100 rounded-xl border border-hasta-cream-200">
            <img
              src={conciergeProduct.images[0]}
              alt={conciergeProduct.name}
              className="w-16 h-16 rounded-lg object-cover border border-stone-200"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-stone-700 uppercase font-bold">
                Base Creation
              </span>
              <h4 className="font-serif font-bold text-sm text-stone-900 truncate">
                {conciergeProduct.name}
              </h4>
              <p className="text-xs text-stone-700 font-medium">
                Master: {conciergeProduct.artisanName} ({conciergeProduct.craftTechnique})
              </p>
            </div>
          </div>

          {isSuccess ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Enquiry Submitted to Concierge
              </h3>
              <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                Your request has been logged. Our craft coordinator will speak directly with {conciergeProduct.artisanName} and share a verified custom quote within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Type of Request */}
              <div>
                <label className="font-semibold text-stone-800 block mb-2">
                  What kind of customisation are you seeking?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'custom_dimensions', label: 'Custom Dimensions' },
                    { id: 'color_material_custom', label: 'Palette / Pigment' },
                    { id: 'interior_consult', label: 'Architect Consultation' },
                    { id: 'bespoke_piece', label: 'Complete Bespoke' }
                  ].map(type => (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setRequestType(type.id as any)}
                      className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                        requestType === type.id
                          ? 'border-hasta-terracotta-600 bg-hasta-terracotta-50 text-hasta-terracotta-900 font-semibold'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Requirements Description */}
              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  Describe your specifications or spatial requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  value={requirements}
                  onChange={e => setRequirements(e.target.value)}
                  placeholder="e.g. Seeking a 60cm diameter vessel instead of 42cm, with turquoise-only glazing to match our living room foyer console..."
                  className="w-full p-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hasta-terracotta-500/30 text-stone-800"
                />
              </div>

              {/* Target Budget */}
              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  Estimated Target Budget (Optional, ₹ INR)
                </label>
                <input
                  type="number"
                  value={targetBudget}
                  onChange={e => setTargetBudget(e.target.value)}
                  placeholder={`Base price starts at ₹${conciergeProduct.price.toLocaleString('en-IN')}`}
                  className="w-full p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hasta-terracotta-500/30 text-stone-800"
                />
              </div>

              {/* Buyer Contact Details */}
              <div className="pt-2 border-t border-stone-100 space-y-3">
                <span className="font-bold text-stone-900 block">
                  Your Homeowner Contact Details
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-stone-700 uppercase block mb-1 font-bold">Name</label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={e => setBuyerName(e.target.value)}
                      className="w-full h-[48px] px-3.5 rounded-[8px] border border-[#E6D8C5] text-stone-900 font-medium text-[14px] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-700 uppercase block mb-1 font-bold">Phone (WhatsApp)</label>
                    <input
                      type="text"
                      required
                      value={buyerPhone}
                      onChange={e => setBuyerPhone(e.target.value)}
                      className="w-full h-[48px] px-3.5 rounded-[8px] border border-[#E6D8C5] text-stone-900 font-medium text-[14px] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-stone-700 uppercase block mb-1 font-bold">Metro City</label>
                  <select
                    value={buyerCity}
                    onChange={e => setBuyerCity(e.target.value)}
                    className="w-full h-[48px] px-3.5 rounded-[8px] border border-[#E6D8C5] bg-white text-stone-900 font-medium text-[14px] focus:outline-none focus:border-amber-500"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi-NCR</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-hingula w-full mt-4 h-[48px] px-6 bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white rounded-[8px] font-sans text-[15px] font-bold tracking-wide shadow-md shadow-hasta-hingula-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Customisation Enquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Bottom Concierge Promise */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-700 font-medium flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-hasta-terracotta-600 shrink-0" />
          <span>Need immediate architect assistance? Call +91 80 4719 2200</span>
        </div>
      </div>
    </div>
  );
};

