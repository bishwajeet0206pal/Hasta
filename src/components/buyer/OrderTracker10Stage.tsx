import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Camera,
  Eye,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import { DeliveryInspectionModal } from './DeliveryInspectionModal';

export const OrderTracker10Stage: React.FC = () => {
  const {
    orders,
    selectedOrderId,
    setSelectedOrderId,
    setActiveView,
    confirmDelivery,
    disputes
  } = useApp();

  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [selectedQCPhoto, setSelectedQCPhoto] = useState<string | null>(null);

  const order = orders.find(o => o.id === selectedOrderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="font-serif text-2xl font-bold text-stone-800">No active order selected</p>
        <button
          onClick={() => setActiveView('catalog')}
          className="mt-4 px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
        >
          Explore Crafts
        </button>
      </div>
    );
  }

  // 10 Milestone Stages (Heuristic #1: Visibility of System Status)
  const stages: { key: OrderStatus; label: string; stepNumber: number; description: string }[] = [
    { key: 'order_placed', label: 'Order Placed', stepNumber: 1, description: 'Order submitted & initial escrow locked' },
    { key: 'payment_confirmed', label: 'Payment Confirmed', stepNumber: 2, description: 'RBI-compliant gateway settlement authorized' },
    { key: 'artisan_accepted', label: 'Artisan Accepted', stepNumber: 3, description: 'Master artisan confirmed schedule & raw materials' },
    { key: 'in_production', label: 'In Production', stepNumber: 4, description: 'Shaping, painting, weaving or kiln firing' },
    { key: 'qc_evidence_submitted', label: 'Quality Evidence Uploaded', stepNumber: 5, description: 'Pre-dispatch inspection photos submitted by artisan' },
    { key: 'ready_for_dispatch', label: 'Ready for Dispatch', stepNumber: 6, description: 'White-glove 3-layer packaging certified' },
    { key: 'dispatched', label: 'Dispatched', stepNumber: 7, description: 'Handed to insured art courier' },
    { key: 'out_for_delivery', label: 'Out for Delivery', stepNumber: 8, description: 'Transit to metro residence' },
    { key: 'delivered', label: 'Delivered', stepNumber: 9, description: '48-hour buyer inspection window active' },
    { key: 'completed', label: 'Order Completed', stepNumber: 10, description: 'Buyer signed off; artisan payout released' },
  ];

  const getStageIndex = (status: OrderStatus) => {
    switch (status) {
      case 'order_placed': return 0;
      case 'payment_confirmed': return 1;
      case 'artisan_accepted': return 2;
      case 'in_production': return 3;
      case 'qc_evidence_submitted': return 4;
      case 'ready_for_dispatch': return 5;
      case 'dispatched': return 6;
      case 'out_for_delivery': return 7;
      case 'delivered': return 8;
      case 'completed': return 9;
      case 'disputed': return 8;
      case 'refunded': return 9;
      default: return 0;
    }
  };

  const currentStageIndex = getStageIndex(order.status);
  const activeDispute = disputes.find(d => d.orderId === order.id);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Breadcrumb & Switcher (Heuristic #3: User Control & Freedom) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
        <button
          onClick={() => setActiveView('my-orders')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Orders</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-700 font-bold">Switch Order:</span>
          <select
            value={order.id}
            onChange={e => setSelectedOrderId(e.target.value)}
            className="h-[40px] px-3 bg-white border border-[#E6D8C5] rounded-[8px] text-xs font-bold text-stone-900 cursor-pointer"
          >
            {orders.map(o => (
              <option key={o.id} value={o.id}>
                {o.orderNumber} ({o.items[0]?.product.name.slice(0, 20)}... - {o.status.replace(/_/g, ' ')})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1. Order Summary Card */}
      <div className="bg-white p-6 rounded-[12px] border border-[#E6D8C5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="font-serif text-2xl font-bold text-stone-900">
              Order {order.orderNumber}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 uppercase tracking-wide border border-stone-200">
              {order.status.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-xs text-stone-700 font-medium">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • Destination: {order.shippingAddress.city}
          </p>
        </div>

        {/* Escrow Status Indicator */}
        <div className="flex items-center gap-3 bg-stone-50 p-3.5 rounded-xl border border-stone-200/70 text-xs text-stone-700 font-medium">
          <ShieldCheck className="w-5 h-5 text-stone-800 shrink-0" />
          <div>
            <span className="font-bold text-stone-900 block">Hasta Escrow Protected</span>
            <span className="text-[11px] text-stone-700 font-medium">
              {order.payoutStatus === 'held_48h'
                ? '48-hour inspection active'
                : order.payoutStatus === 'initiated' || order.payoutStatus === 'completed'
                ? 'Artisan payout settled'
                : order.payoutStatus === 'disputed_hold'
                ? 'Payout held pending dispute review'
                : 'Escrow locked until delivery'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Visual 10-Stage Milestone Stepper (Heuristic #1: Visibility of System Status) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-clean space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Milestone Production & Transit Journey
            </h2>
            <p className="text-xs text-stone-700 font-medium mt-0.5">
              Stage {currentStageIndex + 1} of 10: {stages[currentStageIndex]?.label}
            </p>
          </div>
          <span className="text-xs font-bold text-stone-800 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
            {Math.round(((currentStageIndex + 1) / 10) * 100)}% Complete
          </span>
        </div>

        {/* Desktop 10 Steps */}
        <div className="hidden lg:grid grid-cols-10 gap-2 relative pt-3">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex || order.status === 'completed';
            const isCurrent = idx === currentStageIndex && order.status !== 'completed';

            return (
              <div key={stage.key} className="flex flex-col items-center text-center relative group">
                {/* Connecting Line */}
                {idx < 9 && (
                  <div
                    className={`absolute top-3.5 left-1/2 w-full h-0.5 -translate-y-1/2 z-0 ${
                      idx < currentStageIndex ? 'bg-stone-900' : 'bg-stone-200'
                    }`}
                  />
                )}

                {/* Circle Icon */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] relative z-10 transition-all ${
                    isCompleted
                      ? 'bg-stone-900 text-white'
                      : isCurrent
                      ? 'bg-hasta-terracotta-600 text-white ring-4 ring-hasta-terracotta-100'
                      : 'bg-stone-100 text-stone-600 border border-stone-400 font-semibold'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : stage.stepNumber}
                </div>

                <span
                  className={`text-[10px] mt-2 font-medium leading-tight line-clamp-2 ${
                    isCurrent ? 'text-stone-950 font-bold' : isCompleted ? 'text-stone-900 font-semibold' : 'text-stone-600 font-medium'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile / Vertical Milestone List */}
        <div className="lg:hidden space-y-3 pt-2">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex || order.status === 'completed';
            const isCurrent = idx === currentStageIndex && order.status !== 'completed';

            return (
              <div key={stage.key} className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 ${
                    isCompleted
                      ? 'bg-stone-900 text-white'
                      : isCurrent
                      ? 'bg-hasta-terracotta-600 text-white ring-2 ring-hasta-terracotta-200'
                      : 'bg-stone-200 text-stone-700 font-bold'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : stage.stepNumber}
                </div>
                <div className="flex-1 text-xs">
                  <h4 className={`font-semibold ${isCurrent ? 'text-stone-900 font-bold' : isCompleted ? 'text-stone-900 font-semibold' : 'text-stone-700 font-medium'}`}>
                    {stage.label}
                  </h4>
                  <p className="text-[11px] text-stone-600 font-medium">{stage.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. HIGHLIGHT STAGE: Pre-Dispatch QC Evidence Inspector */}
      {order.qcEvidence && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-clean space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-hasta-cobalt-700 text-white flex items-center justify-center shadow-clean shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-hasta-hingula-600 block">
                  Mandatory Trust Gate (Stage 5) • “Nobody ships on faith.”
                </span>
                <h3 className="type-h3 text-hasta-earth-900 text-xl">
                  Pre-Dispatch Quality Inspection Proof
                </h3>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified by Hasta Operations Team
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Before sealing into wooden crating, the master artisan submitted high-resolution inspection photos of the completed piece along with tape measurements and finish notes.
          </p>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {order.qcEvidence.photos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedQCPhoto(photo)}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 cursor-pointer shadow-xs hover:shadow-clean transition-all"
              >
                <img
                  src={photo}
                  alt="QC Evidence"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </div>
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                  Angle #{idx + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Artisan Notes */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60 text-xs space-y-1">
            <span className="font-semibold text-stone-800 block">Artisan Inspection Notes:</span>
            <p className="text-stone-800 italic font-medium">
              "{order.qcEvidence.artisanNotes}"
            </p>
            <span className="text-[10px] text-stone-600 block pt-1 font-medium">
              Uploaded at: {new Date(order.qcEvidence.submittedAt).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}

      {/* 4. Delivery & 48-Hour Inspection Desk (FR-10) */}
      {(order.status === 'delivered' || order.status === 'completed' || order.status === 'disputed') && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-clean space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Post-Delivery Window
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">
                48-Hour Buyer Inspection
              </h3>
              <p className="text-xs text-stone-700 mt-0.5 font-medium">
                Delivered to: {order.shippingAddress.street}, {order.shippingAddress.city}
              </p>
            </div>

            {order.status === 'delivered' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Inspection Window Active</span>
              </div>
            )}
          </div>

          {order.status === 'delivered' ? (
            <div className="bg-stone-50 p-5 rounded-xl border border-stone-200/80 space-y-3.5">
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Please examine your handcrafted creation. If you are satisfied, confirm delivery to release the master artisan’s payout immediately. If any damage occurred during transit or the item is materially different, you may log an issue for arbitration.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => confirmDelivery(order.id)}
                  className="h-[48px] px-6 rounded-[8px] bg-emerald-700 hover:bg-emerald-800 text-white text-[15px] font-sans font-bold shadow-md shadow-emerald-700/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>Confirm Satisfaction & Release Escrow</span>
                </button>

                <button
                  onClick={() => setIsDisputeModalOpen(true)}
                  className="h-[48px] px-6 rounded-[8px] bg-white hover:bg-rose-50 text-hasta-hingula-700 border border-hasta-hingula-300 text-[15px] font-sans font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4 text-hasta-hingula-600" />
                  <span>Report Transit Damage / Issue</span>
                </button>
              </div>
            </div>
          ) : order.status === 'completed' ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-semibold block">Order Completed & Escrow Released</span>
                <span>You confirmed satisfaction on {new Date(order.deliveryConfirmedAt || '').toLocaleDateString('en-IN')}. The artisan received their net payout.</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="font-semibold block">Dispute Case Active: #{activeDispute?.disputeNumber}</span>
                <span>Our Trust Cell is evaluating pre-dispatch QC photos against your claim. You will receive an update within 24 hours.</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Complete Order Activity History */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-clean space-y-4">
        <h3 className="font-serif text-lg font-bold text-stone-900">
          Timestamped Activity Log
        </h3>
        <div className="space-y-3">
          {order.statusHistory.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs border-l-2 border-stone-400 pl-3 py-0.5">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">{item.title}</span>
                  <span className="text-[10px] text-stone-600 font-medium">
                    {new Date(item.timestamp).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-stone-700 mt-0.5 font-medium">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Inspection Modal */}
      {isDisputeModalOpen && (
        <DeliveryInspectionModal
          order={order}
          isOpen={isDisputeModalOpen}
          onClose={() => setIsDisputeModalOpen(false)}
        />
      )}

      {/* Lightbox for QC Image */}
      {selectedQCPhoto && (
        <div
          onClick={() => setSelectedQCPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm cursor-pointer animate-in fade-in"
        >
          <div className="max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden bg-black p-2 relative">
            <img src={selectedQCPhoto} alt="QC High Res" className="w-full h-full object-contain max-h-[80vh]" />
            <button
              onClick={() => setSelectedQCPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
