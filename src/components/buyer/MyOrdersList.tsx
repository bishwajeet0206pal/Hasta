import React from 'react';
import {
  ArrowLeft,
  Package,
  Clock,
  ShieldCheck,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MyOrdersList: React.FC = () => {
  const { orders, setSelectedOrderId, setActiveView } = useApp();

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <button
            onClick={() => setActiveView('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-hasta-hingula-600 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Discovery</span>
          </button>
          <h1 className="font-serif text-3xl font-bold text-hasta-charcoal-900">
            My Order Portfolio & Production Tracker
          </h1>
          <p className="text-xs text-stone-700 mt-1 font-medium">
            Track real-time crafting milestones, inspect pre-dispatch photo evidence, and manage your 48-hour delivery window.
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map(order => {
          const item = order.items[0];
          const hasQC = !!order.qcEvidence;

          return (
            <div
              key={order.id}
              className="bg-white rounded-[12px] border border-[#E6D8C5] p-6 sm:p-8 shadow-xs hover:-translate-y-[3px] transition-all duration-200 ease-out space-y-6"
            >
              {/* Order Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl font-bold text-stone-900">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-hasta-terracotta-100 text-hasta-terracotta-800 uppercase tracking-wide border border-hasta-terracotta-200">
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <span className="text-xs text-stone-700 block mt-0.5 font-medium">
                    Ordered on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-stone-700 uppercase font-bold block">Total Paid</span>
                  <span className="font-serif text-lg font-bold text-stone-900">
                    ₹{order.totalPaid.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-stone-600 block font-medium">(Product ₹{order.productTotal.toLocaleString('en-IN')} + ₹{order.deliveryFee.toLocaleString('en-IN')} delivery)</span>
                </div>
              </div>

              {/* Product Snippet */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover border border-stone-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-hasta-hingula-700 block font-mono">
                    {item.product.craftTechnique}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-stone-800 font-medium">
                    Master Artisan: <strong className="text-stone-900">{item.product.artisanName}</strong> ({item.product.artisanLocation.split(',')[0]})
                  </p>
                  <p className="text-xs text-stone-700 mt-1 font-medium">
                    Shipment: {order.shippingAddress.street}, {order.shippingAddress.city}
                  </p>
                </div>
              </div>

              {/* Highlight Trigger: Pre-Dispatch Quality Check Available */}
              {hasQC && (
                <div className="p-3.5 bg-hasta-gold-50 rounded-xl border border-hasta-gold-200 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-hasta-gold-900">
                    <Camera className="w-4 h-4 text-hasta-gold-700 shrink-0" />
                    <span>
                      <strong>Pre-dispatch quality evidence uploaded:</strong> High-res photo proof submitted by master artisan.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setActiveView('order-detail');
                    }}
                    className="text-hasta-gold-900 underline font-semibold whitespace-nowrap"
                  >
                    Inspect Photos
                  </button>
                </div>
              )}

              {/* 48-Hour Window Active Alert */}
              {order.status === 'delivered' && (
                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between gap-3 text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>48-Hour Inspection Window:</strong> Confirm your satisfaction or report issues before escrow payout is settled.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setActiveView('order-detail');
                    }}
                    className="bg-amber-600 text-white px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap"
                  >
                    Review Delivery
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-stone-700 font-sans font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Hasta Escrow Guaranteed</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedOrderId(order.id);
                    setActiveView('order-detail');
                  }}
                  className="btn-hingula h-[48px] px-6 rounded-[8px] bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white font-sans text-[15px] font-bold shadow-md shadow-hasta-hingula-600/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <span>View 10-Stage Milestone Tracker</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

