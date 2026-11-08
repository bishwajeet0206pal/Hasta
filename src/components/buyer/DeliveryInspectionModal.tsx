import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  Upload,
  Camera,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Order, Dispute } from '../../types';

interface DeliveryInspectionModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryInspectionModal: React.FC<DeliveryInspectionModalProps> = ({
  order,
  isOpen,
  onClose
}) => {
  const { reportDispute } = useApp();

  const [issueType, setIssueType] = useState<Dispute['issueType']>('damaged_in_transit');
  const [description, setDescription] = useState('');
  const [evidenceImages, setEvidenceImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reportDispute(order.id, issueType, description, evidenceImages);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#E6D8C5] max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#E6D8C5] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-[8px] bg-rose-100 text-rose-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-700 block font-mono">
                Evidence-Based Resolution Desk
              </span>
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Report Issue for Order #{order.orderNumber}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Dispute Logged & Escrow Frozen
            </h3>
            <p className="text-xs text-stone-700 max-w-xs mx-auto leading-relaxed font-medium">
              Artisan payout has been put on hold. The Hasta Trust Operations team will compare your photos with pre-dispatch evidence within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Issue Category */}
            <div>
              <label className="font-bold text-stone-900 block mb-1.5">
                What is the nature of the issue? *
              </label>
              <select
                value={issueType}
                onChange={e => setIssueType(e.target.value as any)}
                className="w-full h-[48px] px-3.5 rounded-[8px] border border-[#E6D8C5] bg-white text-stone-800 font-bold text-[14px] focus:outline-none focus:border-amber-500"
              >
                <option value="damaged_in_transit">Damaged in Transit (Chipped, Cracked, Torn)</option>
                <option value="materially_different">Materially Different from Authenticated Description</option>
                <option value="dimension_error">Dimension / Measurement Mismatch</option>
                <option value="craftsmanship_flaw">Major Craftsmanship Flaw</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="font-bold text-stone-900 block mb-1">
                Detailed Observation *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe the defect, condition of the outer packaging, and specific discrepancies observed upon unboxing..."
                className="w-full p-3 rounded-[8px] border border-[#E6D8C5] focus:outline-none focus:border-amber-500 text-stone-900 font-medium text-[14px]"
              />
            </div>

            {/* Uploaded Photos Preview */}
            <div>
              <label className="font-bold text-stone-900 block mb-1.5">
                Supporting Photo Evidence (Simulated)
              </label>
              <div className="flex items-center gap-3">
                {evidenceImages.map((img, idx) => (
                  <div key={idx} className="w-16 h-16 rounded-[8px] overflow-hidden border border-[#E6D8C5] relative">
                    <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-16 h-16 rounded-[8px] border-2 border-dashed border-stone-400 flex flex-col items-center justify-center text-stone-700 font-semibold text-[10px]">
                  <Camera className="w-4 h-4 mb-0.5" />
                  <span>Photo</span>
                </div>
              </div>
            </div>

            {/* Warning Note */}
            <div className="p-3 bg-amber-50 rounded-[8px] border border-amber-300 text-stone-800 text-[12px] leading-relaxed">
              <strong className="font-bold">Evidence-Based Policy:</strong> Hasta arbitrates disputes by comparing your submitted photos against the pre-dispatch QC photos captured by the master artisan prior to packaging.
            </div>

            <button
              type="submit"
              className="btn-hingula w-full h-[48px] px-6 bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white rounded-[8px] font-sans text-[15px] font-bold shadow-md shadow-hasta-hingula-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Submit Dispute & Hold Artisan Payout</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

