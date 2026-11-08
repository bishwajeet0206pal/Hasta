import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CheckoutModal } from './CheckoutModal';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    setActiveView
  } = useApp();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const productTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCharge = cart.length > 0 ? 1500 : 0;
  const totalPayable = productTotal + deliveryCharge;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
        <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
          {/* Header (Heuristic #3: User Freedom to exit) */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-stone-700" />
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List (Heuristic #6: Recognition Rather Than Recall) */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-600">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Your bag is empty
                </h3>
                <p className="text-xs text-stone-700 max-w-xs mx-auto font-medium">
                  Explore our curated collections of authentic master artisan creations.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('catalog');
                  }}
                  className="mt-2 inline-flex items-center justify-center gap-1.5 bg-stone-900 text-white h-[48px] px-6 rounded-[8px] text-[15px] font-bold cursor-pointer"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.product.id}
                  className="flex items-start gap-3.5 p-3.5 bg-white rounded-[12px] border border-[#E6D8C5] shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 rounded-[8px] object-cover border border-[#E6D8C5] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-stone-700 font-bold uppercase tracking-wider block">
                      {item.product.craftTechnique}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-stone-700 font-semibold mt-0.5">
                      By {item.product.artisanName}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      <span className="font-sans font-bold text-stone-900 text-base">
                        ₹{item.product.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-600 hover:text-rose-600 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Breakdown Footer (Heuristic #8: Clean & Minimal) */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E6D8C5] space-y-4">
              <div className="space-y-1.5 text-xs text-stone-700">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Product Total:</span>
                  <span className="font-bold text-stone-900">
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
                <div className="flex items-center justify-between text-emerald-800 text-[11px] font-bold">
                  <span>Buyer Platform Fee:</span>
                  <span>₹0 (Waived)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
                <span className="font-serif text-sm font-bold text-hasta-earth-900">
                  Total Payable:
                </span>
                <span className="text-[22px] font-bold font-sans text-hasta-earth-900">
                  ₹{totalPayable.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="btn-hingula w-full h-[48px] px-6 bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white rounded-[8px] font-sans text-[15px] font-bold tracking-wide shadow-md shadow-hasta-hingula-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-stone-700 font-semibold flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Protected by Hasta 48-Hour Escrow</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderPlaced={() => {
            setIsCheckoutOpen(false);
            setIsCartOpen(false);
          }}
        />
      )}
    </>
  );
};
