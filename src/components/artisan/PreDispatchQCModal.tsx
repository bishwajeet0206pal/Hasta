import React, { useState } from 'react';
import {
  X,
  Camera,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PreDispatchQCModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PreDispatchQCModal: React.FC<PreDispatchQCModalProps> = ({
  orderId,
  isOpen,
  onClose
}) => {
  const { orders, submitQCEvidence, language } = useApp();
  const order = orders.find(o => o.id === orderId);

  const [notes, setNotes] = useState(
    'Piece finished and kiln fired. Glaze luster checked under daylight. Dimensions verified at 42.4 cm height with flawless rim. Hand-signed at base.'
  );
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitQCEvidence(orderId, {
        photos,
        artisanNotes: notes
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-hasta-gold-100 text-hasta-gold-800">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-hasta-gold-800 block">
                {language === 'hi' ? 'हस्ता गुणवत्ता प्रमाण' : 'Stage 5 Quality Assurance'}
              </span>
              <h2 className="font-serif text-lg font-bold text-stone-900">
                {language === 'hi' ? 'प्री-डिस्पैच फोटो एवं वीडियो' : 'Pre-Dispatch Quality Evidence'}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          <div className="p-3 bg-hasta-cream-100 rounded-xl border border-hasta-cream-200 text-stone-800 leading-relaxed text-[11px] font-medium">
            <strong className="text-stone-900 font-bold">{language === 'hi' ? 'महत्वपूर्ण नियम:' : 'Mandatory Trust Protocol:'}</strong>{' '}
            {language === 'hi'
              ? 'पैकिंग से पहले तैयार शिल्प की स्पष्ट तस्वीरें अपलोड करें ताकि ग्राहक अपनी कृति की जांच कर सके और विवाद की स्थिति में आपका प्रमाण सुरक्षित रहे।'
              : 'Upload clear photographs of the completed piece next to measurement tape before packing. This protects your payout in case of courier transit disputes.'}
          </div>

          {/* Captured Photos Preview */}
          <div>
            <label className="font-bold text-stone-900 block mb-2">
              {language === 'hi' ? 'अपलोड की गई तस्वीरें (2 कोण)' : 'Inspection Angle Photos (2 Angles Attached)'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {photos.map((img, idx) => (
                <div key={idx} className="relative rounded-xl overflow-hidden aspect-[4/3] border border-stone-200">
                  <img src={img} alt="QC Preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                    Angle #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Artisan Notes & Measurements */}
          <div>
            <label className="font-bold text-stone-900 block mb-1">
              {language === 'hi' ? 'शिल्पकार निरीक्षण टिप्पणी एवं माप' : 'Craftsman Notes & Measurement Verification *'}
            </label>
            <textarea
              required
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-hasta-gold-500/40 text-stone-900 font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-cobalt w-full bg-hasta-cobalt-700 hover:bg-hasta-cobalt-800 text-white py-3.5 rounded-xl font-sans text-xs font-semibold shadow-clean flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
          >
            {isSubmitting ? (
              <span>{language === 'hi' ? 'सत्यापन भेजा जा रहा है...' : 'Submitting Proof...'}</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {language === 'hi'
                    ? 'गुणवत्ता प्रमाण जमा करें व ग्राहक को सूचित करें'
                    : 'Submit Evidence & Notify Buyer for Inspection'}
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

