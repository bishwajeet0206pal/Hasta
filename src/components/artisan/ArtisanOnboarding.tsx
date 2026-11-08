import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Camera,
  Upload,
  Building,
  Award,
  Video,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ArtisanOnboarding: React.FC = () => {
  const {
    setActiveView,
    submitVerificationApplication,
    verifications,
    language
  } = useApp();

  const [artisanName, setArtisanName] = useState('Rameshwar Lal Suthar');
  const [craft, setCraft] = useState('Tarkashi Brass Wire Inlay on Seasoned Sheesham');
  const [location, setLocation] = useState('Mainpura, Nagaur, Rajasthan');
  const [phone, setPhone] = useState('+91 94142 88912');
  const [aadhaarNumber, setAadhaarNumber] = useState('5481 9920 6741');
  const [toolsDescription, setToolsDescription] = useState(
    'Handmade steel fine-grooving chisels, wooden mallets, pure 1mm flattened brass wire, naturally air-seasoned sheesham wood (3 years old).'
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check if there is an existing application
  const existingApp = verifications[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitVerificationApplication({
      artisanId: `artisan-${Date.now()}`,
      artisanName,
      craft,
      location,
      phone,
      aadhaarNumberMasked: `XXXX-XXXX-${aadhaarNumber.slice(-4)}`,
      bankAccountVerified: true,
      workshopPhotos: [
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=600&q=80'
      ],
      processVideoThumbnail: 'https://images.unsplash.com/photo-1607867810523-d10955f2a8df?auto=format&fit=crop&w=600&q=80',
      toolsDescription,
      sampleProducts: ['Intricate Peacock Tarkashi Mirror Frame', 'Hexagonal Inlaid Jewelry Chest']
    });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => setActiveView('artisan-dashboard')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-hasta-terracotta-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'hi' ? 'कारीगर डैशबोर्ड पर वापस जाएं' : 'Back to Artisan Portal'}</span>
      </button>

      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-hasta-cream-300 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-hasta-sage-50 text-hasta-sage-700">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-hasta-sage-700 uppercase tracking-widest block">
              Hasta Trust Onboarding Cell
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {language === 'hi' ? 'कारीगर प्रमाणन एवं सत्यापन (KYC)' : 'Master Artisan Verification & Badging'}
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
          {language === 'hi'
            ? 'हस्ता केवल प्रामाणिक हस्तनिर्मित कृतियों को मान्यता देता है। एक बार सत्यापन होने के बाद आपकी कृतियों पर "सत्यापित शिल्प" का बैज प्रदर्शित होगा।'
            : 'Hasta protects authentic handmade craftsmanship. Once verified, your public listings carry verified identity and craftsmanship badges, enabling higher-value orders from discerning HNI homeowners.'}
        </p>
      </div>

      {/* Active Application Status Banner if already present */}
      {existingApp && (
        <div className="bg-white p-6 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 text-sm">
              Current Application ID: {existingApp.id}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wide">
              {existingApp.status.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-xs text-stone-600">
            Applicant: <strong>{existingApp.artisanName}</strong> ({existingApp.craft}) • Applied on: {existingApp.appliedDate}
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Bank account settlement test penny-drop confirmed.</span>
          </div>
        </div>
      )}

      {/* Verification Application Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-hasta-cream-300 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-stone-900 mb-6">
          {language === 'hi' ? 'सत्यापन आवेदन पत्र' : 'Verification Dossier Submission'}
        </h3>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-xl font-bold text-stone-900">
              Application Submitted to Hasta Trust Cell
            </h4>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              Our regional craft curator will review your workshop evidence and verify bank details within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* 1. Identity & Contact */}
            <div className="space-y-3">
              <span className="font-bold text-stone-900 uppercase tracking-wider block text-xs">
                1. Artisan Identity & Payout Account
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-800 font-bold block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={artisanName}
                    onChange={e => setArtisanName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 font-medium text-stone-900"
                  />
                </div>
                <div>
                  <label className="text-stone-800 font-bold block mb-1">Mobile (WhatsApp) *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 font-medium text-stone-900"
                  />
                </div>
                <div>
                  <label className="text-stone-800 font-bold block mb-1">Studio / Workshop Location *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 font-medium text-stone-900"
                  />
                </div>
                <div>
                  <label className="text-stone-800 font-bold block mb-1">Government ID (Aadhaar / Artisan Card) *</label>
                  <input
                    type="text"
                    required
                    value={aadhaarNumber}
                    onChange={e => setAadhaarNumber(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 font-medium text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* 2. Craft & Tools */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <span className="font-bold text-stone-900 uppercase tracking-wider block text-xs">
                2. Craftsmanship & Workshop Evidence
              </span>
              <div>
                <label className="text-stone-800 font-bold block mb-1">Primary Heritage Craft Specialisation *</label>
                <input
                  type="text"
                  required
                  value={craft}
                  onChange={e => setCraft(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-stone-300 font-medium text-stone-900"
                />
              </div>

              <div>
                <label className="text-stone-800 font-bold block mb-1">
                  Tools & Raw Materials Used (No factory moulds permitted) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={toolsDescription}
                  onChange={e => setToolsDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-stone-300 font-medium text-stone-900"
                />
              </div>

              {/* Uploaded Photos Simulation */}
              <div>
                <label className="text-stone-800 font-bold block mb-1.5">
                  Workshop & Wheel / Furnace Photographs (Simulated)
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-stone-200">
                    <img
                      src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80"
                      alt="Workshop"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-stone-200">
                    <img
                      src="https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=400&q=80"
                      alt="Tools"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-20 h-20 rounded-xl border-2 border-dashed border-stone-400 flex flex-col items-center justify-center text-stone-700 font-semibold text-[10px]">
                    <Upload className="w-4 h-4 mb-0.5" />
                    <span>Upload</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-cobalt w-full bg-hasta-cobalt-700 hover:bg-hasta-cobalt-800 text-white py-3.5 rounded-xl font-sans text-xs font-semibold shadow-clean transition-all cursor-pointer active:scale-[0.98]"
            >
              Submit Application to Hasta Trust Cell
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

