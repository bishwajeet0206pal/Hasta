import React, { useState } from 'react';
import { ShieldCheck, Award, CheckCircle2, Info, X, Sparkles } from 'lucide-react';
import { VerificationBadge } from '../../types';

interface TrustBadgeProps {
  badge: VerificationBadge;
  size?: 'sm' | 'md' | 'lg';
  showExplainer?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ badge, size = 'md', showExplainer = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = () => {
    switch (badge.type) {
      case 'identity':
        return <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />;
      case 'craftsmanship':
        return <Award className="w-3.5 h-3.5 text-stone-700" />;
      case 'curated':
        return <Sparkles className="w-3.5 h-3.5 text-stone-700" />;
    }
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-xs px-3 py-1.5 gap-2'
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => showExplainer && setIsOpen(!isOpen)}
        className={`inline-flex items-center font-bold rounded-md border border-stone-300 bg-stone-50 text-stone-800 hover:bg-stone-100 hover:border-stone-400 transition-colors ${sizeClasses[size]} cursor-pointer`}
        title="View verified evidence"
      >
        {getIcon()}
        <span>{badge.label}</span>
        {showExplainer && <Info className="w-3 h-3 text-stone-600 ml-0.5" />}
      </button>

      {/* Explainer Popover Modal (Heuristic #10: Help & Documentation) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-clean-hover border border-stone-200 max-w-md w-full p-6 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="btn-hingula w-10 h-10 rounded-xl bg-hasta-hingula-600 text-white flex items-center justify-center shadow-clean shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-hasta-hingula-600 block">
                  The seal. Made by hand. Verified.
                </span>
                <h3 className="type-h3 text-hasta-earth-900 text-xl">
                  {badge.label}
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed mb-4 font-medium">
              {badge.description}
            </p>

            <div className="bg-stone-50 rounded-lg p-3.5 mb-4 border border-stone-200/60">
              <span className="text-[11px] font-bold text-stone-900 mb-2 block">
                Verified Verification Evidence:
              </span>
              <ul className="space-y-1.5 text-xs text-stone-700 font-medium">
                {badge.evidenceItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-700 pt-3 border-t border-stone-100 font-semibold">
              <span>Audited by: {badge.verifiedBy}</span>
              <span>{badge.verifiedAt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
