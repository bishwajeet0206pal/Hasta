import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
    }
  };

  const borderClass = () => {
    switch (toast.type) {
      case 'success':
        return 'border-emerald-200 bg-white text-stone-900';
      case 'warning':
        return 'border-amber-200 bg-white text-stone-900';
      case 'info':
        return 'border-blue-200 bg-white text-stone-900';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200 max-w-md">
      <div className={`flex items-start gap-3 p-4 rounded-xl shadow-xl border ${borderClass()}`}>
        {getIcon()}
        <div className="text-xs sm:text-sm font-medium leading-snug">
          {toast.message}
        </div>
      </div>
    </div>
  );
};

