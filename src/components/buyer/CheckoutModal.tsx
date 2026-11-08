import React, { useState } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  MapPin,
  Lock,
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderPlaced
}) => {
  const { cart, createOrder } = useApp();

  const [name, setName] = useState('Ananya Singhania');
  const [email, setEmail] = useState('ananya.singhania@gmail.com');
  const [phone, setPhone] = useState('+91 98201 44590');
  const [street, setStreet] = useState('14B, Samudra Mahal, Worli Sea Face');
  const [city, setCity] = useState('Mumbai');
  const [postalCode, setPostalCode] = useState('400018');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const productTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCharge = 1500;
  const totalPayable = productTotal + deliveryCharge;
  const sellerCommission10Pct = Math.round(productTotal * 0.10);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      createOrder(
        {
          street,
          city,
          state: city === 'Mumbai' ? 'Maharashtra' : city === 'Bengaluru' ? 'Karnataka' : city === 'Delhi' ? 'Delhi' : 'Telangana',
          postalCode
        },
        { name, email, phone, city }
      );
      setIsProcessing(false);
      onOrderPlaced();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-[12px] shadow-clean-hover border border-[#E6D8C5] max-w-xl w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-150">
        {/* Header (Heuristic #3: User Freedom) */}
        <div className="p-5 border-b border-[#E6D8C5] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-stone-600" />
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Secure Escrow Checkout
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body (Heuristic #5: Error Prevention) */}
        <form onSubmit={handlePlaceOrder} className="p-6 space-y-6 text-xs">
          {/* 1. Metro Delivery Address */}
          <div className="space-y-3">
            <span className="font-bold text-stone-900 uppercase tracking-wide flex items-center gap-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-stone-700" />
              1. Delivery Address (White-Glove Insured)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-stone-800 uppercase block mb-1 font-bold">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full h-[48px] px-3.5 rounded-[8px] border border-[#E6D8C5] text-stone-800 text-[14px] focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-800 uppercase block mb-1 font-bold">Mobile Phone (WhatsApp)</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full h-[48px] px-3.5 rounded-[8px] border border-[#E6D8C5] text-stone-800 text-[14px] focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] text-stone-800 uppercase block mb-1 font-bold">Street Address / Villa</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  className="w-full h-[48px] px-3.5 rounded-[8px] border border-[#E6D8C5] text-stone-800 text-[14px] focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-800 uppercase block mb-1 font-bold">Metro City</label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full h-[48px] px-3.5 rounded-[8px] border border-[#E6D8C5] bg-white text-stone-800 text-[14px] focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="Mumbai">Mumbai (Maharashtra)</option>
                  <option value="Delhi">Delhi-NCR</option>
                  <option value="Bengaluru">Bengaluru (Karnataka)</option>
                  <option value="Hyderabad">Hyderabad (Telangana)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-stone-800 uppercase block mb-1 font-bold">Postal Code</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  className="w-full h-[48px] px-3.5 rounded-[8px] border border-[#E6D8C5] text-stone-800 text-[14px] focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method Selector (Heuristic #4: Consistency & Standards) */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <span className="font-bold text-stone-900 uppercase tracking-wide flex items-center gap-1.5 text-xs">
              <CreditCard className="w-3.5 h-3.5 text-stone-700" />
              2. Payment Mode (Held in Escrow)
            </span>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'upi', label: 'UPI (GPay / PhonePe)' },
                { id: 'card', label: 'Credit / Debit Card' },
                { id: 'netbanking', label: 'Netbanking' }
              ].map(method => (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`h-[48px] rounded-[8px] border text-center transition-all cursor-pointer flex items-center justify-center px-2 ${
                    paymentMethod === method.id
                      ? 'border-[#2C1D13] bg-amber-50/60 text-stone-950 font-bold'
                      : 'border-[#E6D8C5] text-stone-600 hover:border-stone-400'
                  }`}
                >
                  <span className="text-xs block">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Transparent Financial Breakdown (Heuristic #8: Less is More) */}
          <div className="bg-stone-50 p-4 rounded-[12px] border border-[#E6D8C5] space-y-2 text-stone-600">
            <div className="flex items-center justify-between">
              <span>Handcrafted Product Total:</span>
              <span className="font-semibold text-stone-900">
                ₹{productTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-stone-700 font-medium">
                <Truck className="w-3.5 h-3.5 text-stone-600" />
                White-Glove Insured Delivery:
              </span>
              <span className="font-bold text-stone-900">
                ₹{deliveryCharge.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-200 flex items-baseline justify-between text-stone-900">
              <span className="font-serif text-base font-bold">
                Final Payable:
              </span>
              <span className="text-[22px] font-bold font-sans text-hasta-earth-900">
                ₹{totalPayable.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="text-[11px] text-stone-700 font-medium pt-1">
              * Seller-side 10% commission (₹{sellerCommission10Pct.toLocaleString('en-IN')}) settled after 48-hr delivery confirmation.
            </div>
          </div>

          {/* Submit CTA (Standard 48px Button, Hingula Red) */}
          <div className="space-y-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="btn-hingula w-full h-[48px] px-6 bg-hasta-hingula-600 hover:bg-hasta-hingula-700 disabled:opacity-50 text-white rounded-[8px] font-sans text-[15px] font-bold tracking-wide shadow-md shadow-hasta-hingula-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
            >
              {isProcessing ? (
                <span>Securing Escrow & Authorizing...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Authorize ₹{totalPayable.toLocaleString('en-IN')} & Secure Order</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-stone-700 text-center font-medium">
              Funds are held in RBI-regulated marketplace settlement until you confirm satisfaction.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
