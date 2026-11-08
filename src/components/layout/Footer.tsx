import React from 'react';
import {
  ShieldCheck,
  HeartHandshake,
  PhoneCall,
  Banknote,
  PackageCheck,
  Award,
  Hammer,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { persona, language, setActiveView, setSelectedCategory } = useApp();

  // ==========================================
  // 1. ARTISAN / SELLER PERSONA FOOTER
  // ==========================================
  if (persona === 'artisan') {
    const isHindi = language === 'hi';
    return (
      <footer className="bg-[#141210] text-stone-300 border-t border-stone-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {/* 1. Artisan Guild Mission */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="btn-hingula w-9 h-9 rounded-[8px] bg-hasta-hingula-600 text-white flex items-center justify-center font-serif text-xl font-bold shadow-clean">
                  ह
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold tracking-wider text-white block leading-none">
                    HASTA
                  </span>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-amber-400 block mt-0.5 font-sans">
                    {isHindi ? 'शिल्पी संघ एवं पोर्टल' : 'Artisan Partner Guild'}
                  </span>
                </div>
              </div>

              <p className="text-stone-300 text-[13px] leading-relaxed max-w-sm font-medium">
                {isHindi
                  ? 'भारत के प्रामाणिक शिल्पकारों का स्वाभिमान। 100% पारदर्शी सीधा व्यापार, ग्राहक संतुष्टि के 48 घंटे में सीधे बैंक खाते में भुगतान और सुरक्षित डिस्पैच क्रेटिंग।'
                  : 'Empowering India’s heritage masters with dignified, direct-to-patron trade. Guaranteed bank escrow settlements within 48 hours of delivery inspection, zero buyer markups, and wooden crating support.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60">
                  <Banknote className="w-3.5 h-3.5" />
                  <span>{isHindi ? '48 घंटे में गारंटीड बैंक भुगतान' : 'Guaranteed 48-Hr Escrow Payout'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-stone-300 font-medium">
                  <HeartHandshake className="w-3.5 h-3.5 text-hasta-hingula-400" />
                  <span>{isHindi ? 'केवल 10% पारदर्शी शुल्क • कोई छिपा कमीशन नहीं' : 'Fair 10% Flat Fee • No Buyer Markups'}</span>
                </span>
              </div>
            </div>

            {/* 2. Artisan Workdesk & Tools */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider">
                {isHindi ? 'शिल्पी कार्यक्षेत्र' : 'Artisan Workdesk'}
              </h4>
              <ul className="space-y-2 text-[13px] font-sans font-medium text-stone-300">
                <li>
                  <button
                    onClick={() => setActiveView('artisan-dashboard')}
                    className="hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <PackageCheck className="w-3.5 h-3.5 text-hasta-hingula-500 shrink-0" />
                    <span>{isHindi ? 'सक्रिय ऑर्डर व निर्माण ट्रैकिंग' : 'Orders & In-Production Log'}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveView('artisan-onboarding')}
                    className="hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Award className="w-3.5 h-3.5 text-hasta-marigold-400 shrink-0" />
                    <span>{isHindi ? 'स्टूडियो सत्यापन एवं पहचान पत्र' : 'Studio Verification (Pehchan ID)'}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveView('artisan-dashboard')}
                    className="hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Hammer className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isHindi ? 'डिस्पैच पूर्व गुणवत्ता साक्ष्य (QC)' : 'Pre-Dispatch Photo QC Protocol'}</span>
                  </button>
                </li>
                <li>
                  <span className="text-stone-400 text-xs flex items-center gap-2 pt-0.5">
                    <FileText className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>{isHindi ? 'हस्त निष्पक्ष व्यापार आचार संहिता' : 'Fair Artisan Trade Code'}</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* 3. Artisan Helpdesk & Logistics Cell */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider">
                {isHindi ? 'शिल्पी सहायता एवं रसद केंद्र' : 'Artisan Cell & Logistics Desk'}
              </h4>
              <p className="text-stone-300 text-[13px] leading-relaxed font-medium">
                {isHindi
                  ? 'स्टूडियो फोटोग्राफी, कच्चा माल प्रमाणीकरण या लकड़ी के बक्से (क्रेटिंग) डिस्पैच के लिए सीधे संपर्क करें।'
                  : 'Direct coordinator for studio photo audits, raw material certificates, and wooden crating dispatch.'}
              </p>

              <div className="pt-1 space-y-2">
                <a
                  href="tel:+918047192201"
                  className="inline-flex items-center gap-2 text-stone-200 hover:text-white font-sans text-sm font-bold bg-stone-800/80 hover:bg-stone-800 px-3.5 py-2 rounded-[8px] border border-stone-700/80 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-hasta-marigold-400" />
                  <span>+91 80 4719 2201</span>
                </a>
                <div className="text-[11px] text-stone-400 font-medium">
                  {isHindi
                    ? 'सोम - शनि: प्रातः 9:00 से रात्रि 8:00 बजे • शिल्पी हेल्पलाइन'
                    : 'Mon - Sat: 9:00 AM – 8:00 PM IST • Direct Artisan Helpdesk'}
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-medium">
            <p>© 2026 HASTA Artisan Guild • Ministry of Textiles Pehchan Audited</p>
            <div className="flex items-center gap-6">
              <span className="text-stone-300">Direct Studio Settlement</span>
              <span>•</span>
              <span className="text-stone-300">RBI Regulated Escrow</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // ==========================================
  // 2. OPS DESK PERSONA FOOTER
  // ==========================================
  if (persona === 'ops') {
    return (
      <footer className="bg-[#141210] text-stone-300 border-t border-stone-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-stone-800 text-stone-200 flex items-center justify-center font-serif font-bold">
                ह
              </div>
              <div>
                <span className="font-bold text-white block">HASTA Operations & Escrow Desk</span>
                <span className="text-stone-400 text-[11px]">Audit verification, pre-dispatch QC approvals & dispute arbitration</span>
              </div>
            </div>
            <div className="text-stone-400 text-[11px]">
              Internal System • Encrypted Audit Trail
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // ==========================================
  // 3. BUYER / PATRON PERSONA FOOTER (DEFAULT)
  // ==========================================
  return (
    <footer className="bg-[#141210] text-stone-300 border-t border-stone-800">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* 1. Brand Identity & Heritage Mission (Col 1-5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="btn-hingula w-9 h-9 rounded-[8px] bg-hasta-hingula-600 text-white flex items-center justify-center font-serif text-xl font-bold shadow-clean">
                ह
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-white block leading-none">
                  HASTA
                </span>
                <span className="text-[10px] tracking-widest uppercase font-bold text-stone-400 block mt-0.5 font-sans">
                  Handmade in India
                </span>
              </div>
            </div>

            <p className="text-stone-300 text-[13px] leading-relaxed max-w-sm font-medium">
              Curated marketplace connecting discerning patrons with verified Indian master craftspeople. Direct pricing, studio-verified provenance, and escrow protection.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>48-Hr Delivery Inspection</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-stone-300 font-medium">
                <HeartHandshake className="w-3.5 h-3.5 text-hasta-hingula-400" />
                <span>10% Fair Artisan Fee</span>
              </span>
            </div>
          </div>

          {/* 2. Curated Craft Collections (Col 6-8) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider">
              Curated Traditions
            </h4>
            <ul className="space-y-2 text-[13px] font-sans font-medium text-stone-300">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('sculptures_pottery');
                    setActiveView('catalog');
                  }}
                  className="hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-hasta-hingula-500" />
                  <span>Sacred Bronzes & Ganesha</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('wall_art');
                    setActiveView('catalog');
                  }}
                  className="hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-hasta-marigold-400" />
                  <span>Heritage Indian Paintings</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('textiles_furnishings');
                    setActiveView('catalog');
                  }}
                  className="hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Royal Handloom Silks</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('furniture_decor');
                    setActiveView('catalog');
                  }}
                  className="hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Blue Pottery & Jali Wood</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Concierge & Direct Assistance (Col 9-12) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider">
              Patron Concierge
            </h4>
            <p className="text-stone-300 text-[13px] leading-relaxed font-medium">
              Bespoke commissions, home consultations, and authentic material certifications.
            </p>

            <div className="pt-1 space-y-2">
              <a
                href="tel:+918047192201"
                className="inline-flex items-center gap-2 text-stone-200 hover:text-white font-sans text-sm font-bold bg-stone-800/80 hover:bg-stone-800 px-3.5 py-2 rounded-[8px] border border-stone-700/80 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-hasta-marigold-400" />
                <span>+91 80 4719 2200</span>
              </a>
              <div className="text-[11px] text-stone-400 font-medium">
                Mon - Sat: 10:00 AM – 7:00 PM IST • Direct Studio Line
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-medium">
          <p>© 2026 HASTA Crafts Marketplace Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-stone-300">100% Provenance Guaranteed</span>
            <span>•</span>
            <span className="text-stone-300">Escrow Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
