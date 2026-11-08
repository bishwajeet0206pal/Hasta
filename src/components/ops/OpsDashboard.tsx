import React, { useState } from 'react';
import {
  CheckCircle2,
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OpsDashboard: React.FC = () => {
  const {
    verifications,
    orders,
    disputes,
    approveVerification,
    rejectVerification,
    updateLogisticsDispatch,
    resolveDispute,
    releaseArtisanPayout
  } = useApp();

  const [activeTab, setActiveTab] = useState<'verifications' | 'disputes' | 'logistics' | 'payouts'>('verifications');

  // Logistics form state
  const [selectedLogisticsOrder, setSelectedLogisticsOrder] = useState<string>(
    orders.find(o => o.status === 'qc_evidence_submitted')?.id || orders[0]?.id || ''
  );
  const [courierName, setCourierName] = useState('Blue Dart Apex Secure Art Cargo');
  const [trackingId, setTrackingId] = useState('BD99420188');

  // Dispute arbitration state
  const selectedDispute = disputes[0];
  const [disputeNotes, setDisputeNotes] = useState('Packaging damage corroborated with courier transit log. Full transit insurance claim filed.');

  const pendingVerifications = verifications.filter(v => v.status === 'pending_review');
  const activeDisputes = disputes.filter(d => d.status === 'under_investigation');

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 1. Dashboard Header */}
      <div className="bg-gradient-to-r from-hasta-haldi-400 via-hasta-haldi-300 to-hasta-haldi-400 p-6 sm:p-8 rounded-[12px] border border-[#E6D8C5] shadow-md text-[#1F1610] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-hasta-hingula-700 uppercase tracking-wider font-mono">
              Internal Command Center
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[10px] font-bold border border-emerald-300">
              Operations & Trust Cell
            </span>
          </div>
          <h1 className="type-h3 text-[#1F1610] mt-1">
            Trust & Marketplace Operations
          </h1>
          <p className="text-xs text-[#35251B] mt-1 font-medium">
            Artisan verification queue, evidence-based dispute arbitration, and white-glove dispatch control.
          </p>
        </div>

        {/* Quick Tabs */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-3.5 py-2 rounded-xl transition-all relative cursor-pointer ${
              activeTab === 'verifications'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Artisan Verification ({pendingVerifications.length})
            {pendingVerifications.length > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-hasta-marigold-500 absolute -top-1 -right-1" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('disputes')}
            className={`px-3.5 py-2 rounded-xl transition-all relative cursor-pointer ${
              activeTab === 'disputes'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Dispute Arbitration ({activeDisputes.length})
            {activeDisputes.length > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-hasta-bougainvillea-500 absolute -top-1 -right-1" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('logistics')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'logistics'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Logistics & Dispatches
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'payouts'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Commission & Escrow
          </button>
        </div>
      </div>

      {/* 2. TAB 1: ARTISAN VERIFICATION QUEUE (FR-17 & FR-12) */}
      {activeTab === 'verifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Pending Artisan Dossiers for Review
            </h2>
            <span className="text-xs text-stone-700 font-bold">
              {pendingVerifications.length} applications awaiting curatorial inspection
            </span>
          </div>

          {verifications.map(app => (
            <div
              key={app.id}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-serif text-2xl font-bold text-stone-900">
                      {app.artisanName}
                    </h3>
                    <span className="text-[11px] font-bold px-3 py-0.5 rounded-full bg-hasta-marigold-100 text-hasta-marigold-900 uppercase tracking-wide border border-hasta-marigold-300">
                      {app.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 mt-1 font-semibold">
                    Craft: <strong>{app.craft}</strong> • Location: {app.location} • Mobile: {app.phone}
                  </p>
                </div>

                <div className="text-xs text-stone-700 font-bold">
                  Application ID: <span className="font-mono font-bold text-stone-900">{app.id}</span>
                </div>
              </div>

              {/* Verified Checks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
                {/* 1. Identity Verification */}
                <div className="p-4 rounded-2xl bg-hasta-cream-100 border border-hasta-cream-200 space-y-2">
                  <span className="font-bold text-stone-800 uppercase tracking-wide block text-[10px]">
                    1. Identity & Payout Account
                  </span>
                  <div className="flex items-center gap-2 text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-hasta-cilantro-600" />
                    <span>Aadhaar: {app.aadhaarNumberMasked}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-hasta-cilantro-600" />
                    <span>Bank Penny-Drop: Passed</span>
                  </div>
                </div>

                {/* 2. Tools & Materials */}
                <div className="p-4 rounded-2xl bg-hasta-cream-100 border border-hasta-cream-200 space-y-2 md:col-span-2">
                  <span className="font-bold text-stone-800 uppercase tracking-wide block text-[10px]">
                    2. Workshop & Hand Tools Inspection
                  </span>
                  <p className="text-stone-700 leading-relaxed">
                    {app.toolsDescription}
                  </p>
                </div>
              </div>

              {/* Workshop Images */}
              <div>
                <span className="text-xs font-bold text-stone-700 block mb-2.5">
                  Submitted Workshop & Furnace Proof:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {app.workshopPhotos.map((img, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden aspect-square border border-stone-200 bg-stone-100 shadow-xs">
                      <img src={img} alt="Workshop" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100">
                <span className="text-xs text-stone-700 font-medium">
                  Approving grants 3 Trust Badges (`Identity Verified`, `Craftsmanship Verified`, `Verified by Hasta`).
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => rejectVerification(app.id, 'Insufficient tool video clarity; please re-upload.')}
                    className="px-4 py-2.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Request Revisions / Decline
                  </button>
                  <button
                    onClick={() => approveVerification(app.id)}
                    className="bg-hasta-cilantro-600 hover:bg-hasta-cilantro-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Grant Hasta Trust Badges</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. TAB 2: EVIDENCE-BASED DISPUTE ARBITRATION (FR-21) */}
      {activeTab === 'disputes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Evidence-Based Dispute Resolution Desk
            </h2>
            <span className="text-xs text-stone-700 font-bold">
              Resolution Policy: Side-by-side comparison of pre-dispatch photos vs buyer arrival condition
            </span>
          </div>

          {selectedDispute ? (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              {/* Dispute Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-serif text-2xl font-bold text-stone-900">
                      Dispute Case #{selectedDispute.disputeNumber}
                    </h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-hasta-bougainvillea-100 text-hasta-bougainvillea-900 uppercase tracking-wide border border-hasta-bougainvillea-200">
                      {selectedDispute.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 mt-1 font-semibold">
                    Order Ref: <strong>{selectedDispute.orderNumber}</strong> • Buyer: {selectedDispute.buyerName} • Master Artisan: {selectedDispute.artisanName}
                  </p>
                </div>

                <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3.5 py-1.5 rounded-xl">
                  Reported Issue: {selectedDispute.issueType.replace(/_/g, ' ').toUpperCase()}
                </span>
              </div>

              {/* Side-by-Side Photographic Arbitration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1: Pre-Dispatch QC Proof */}
                <div className="p-5 rounded-2xl bg-hasta-cream-100 border border-hasta-cream-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Pre-Dispatch Proof (Stage 5)
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded text-stone-600 font-bold">
                      Uploaded by Artisan
                    </span>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-stone-300 bg-stone-200 shadow-xs">
                    <img
                      src={selectedDispute.preDispatchQCImages[0]}
                      alt="Pre dispatch proof"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-600 italic font-medium">
                    Item documented in pristine condition with acoustic test and tape measurement prior to packing.
                  </p>
                </div>

                {/* Column 2: Buyer Claim Photos */}
                <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-900">
                      Buyer Arrival Evidence
                    </span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">
                      48-Hr Claim Window
                    </span>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-rose-200 bg-stone-200 shadow-xs">
                    <img
                      src={selectedDispute.buyerEvidenceImages[0]}
                      alt="Buyer claim evidence"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-700 font-medium">
                    "{selectedDispute.description}"
                  </p>
                </div>
              </div>

              {/* Resolution Decision Actions */}
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                <span className="font-bold text-xs uppercase tracking-wider text-stone-800 block">
                  Arbitration Determination & Action:
                </span>

                <textarea
                  rows={2}
                  value={disputeNotes}
                  onChange={e => setDisputeNotes(e.target.value)}
                  placeholder="Record formal resolution reasoning for audit trail..."
                  className="w-full p-3 rounded-xl border border-stone-300 text-xs text-stone-800 bg-white font-medium"
                />

                <div className="flex flex-wrap items-center gap-3 font-sans">
                  <button
                    onClick={() => resolveDispute(selectedDispute.id, 'carrier_claim_approved', disputeNotes)}
                    className="btn-cobalt bg-hasta-cobalt-700 hover:bg-hasta-cobalt-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-clean transition-all cursor-pointer active:scale-95"
                  >
                    Approve Carrier Insurance Claim (Artisan Paid + Buyer Refunded)
                  </button>

                  <button
                    onClick={() => resolveDispute(selectedDispute.id, 'resolved_full_refund', disputeNotes)}
                    className="btn-hingula bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-clean transition-all cursor-pointer active:scale-95"
                  >
                    Issue Full Refund to Buyer
                  </button>

                  <button
                    onClick={() => resolveDispute(selectedDispute.id, 'claim_declined', disputeNotes)}
                    className="bg-stone-200 hover:bg-stone-300 text-stone-800 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Decline Claim & Release Artisan Payout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 text-xs text-stone-700 font-semibold">
              No open disputes recorded. All transactions operating smoothly within 48-hour window.
            </div>
          )}
        </div>
      )}

      {/* 4. TAB 3: LOGISTICS & WHITE-GLOVE DISPATCH (FR-20) */}
      {activeTab === 'logistics' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Managed Logistics & White-Glove Dispatch Coordinator
            </h2>
            <p className="text-xs text-stone-700 font-medium">
              Assign insured art cargo partners (Blue Dart, Delhivery Art, specialized crating) once QC evidence is certified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-900 block mb-1">Select Order to Dispatch</label>
                <select
                  value={selectedLogisticsOrder}
                  onChange={e => setSelectedLogisticsOrder(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 font-bold"
                >
                  {orders.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.orderNumber} ({o.items[0]?.product.name}) - [{o.status}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-900 block mb-1">Carrier / Logistics Provider</label>
                <input
                  type="text"
                  value={courierName}
                  onChange={e => setCourierName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-stone-900 block mb-1">Air Waybill / Insured Tracking ID</label>
                <input
                  type="text"
                  value={trackingId}
                  onChange={e => setTrackingId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 font-mono font-bold"
                />
              </div>

              <button
                onClick={() => {
                  updateLogisticsDispatch(
                    selectedLogisticsOrder,
                    courierName,
                    trackingId,
                    '2024-11-12'
                  );
                }}
                className="btn-cobalt w-full bg-hasta-cobalt-700 hover:bg-hasta-cobalt-800 text-white py-3.5 rounded-xl font-sans text-xs font-semibold shadow-clean transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Truck className="w-4 h-4" />
                <span>Assign Carrier & Mark Dispatched (Notify Buyer)</span>
              </button>
            </div>

            {/* Quick Live Tracking Table */}
            <div className="bg-hasta-cream-100 p-5 rounded-2xl border border-hasta-cream-200 text-xs space-y-3">
              <span className="font-bold text-stone-900 uppercase tracking-wide block">
                Active Shipments Across India
              </span>
              <div className="space-y-2">
                {orders.map(o => (
                  <div key={o.id} className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-900 block">{o.orderNumber}</span>
                      <span className="text-stone-700 text-[11px] font-semibold">{o.shippingAddress.city} • {o.items[0]?.product.name.slice(0, 24)}...</span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 uppercase border border-stone-300">
                      {o.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 4: COMMISSION & ESCROW SETTLEMENT LEDGER (FR-22 & 8.1) */}
      {activeTab === 'payouts' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              10% Marketplace Commission & Artisan Payout Ledger
            </h2>
            <p className="text-xs text-stone-700 font-medium">
              Hasta strictly charges a 10% seller commission upon satisfactory delivery. Funds are settled via approved marketplace split-settlement provider.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-stone-100 text-stone-800 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Order</th>
                  <th className="p-3.5">Artisan</th>
                  <th className="p-3.5">Product Price</th>
                  <th className="p-3.5 text-hasta-terracotta-700">Hasta 10% Comm</th>
                  <th className="p-3.5 text-emerald-800">Net Artisan Payout</th>
                  <th className="p-3.5">Escrow Status</th>
                  <th className="p-3.5 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-stone-50">
                    <td className="p-3.5 font-bold font-mono text-stone-900">{order.orderNumber}</td>
                    <td className="p-3.5 font-medium text-stone-900">{order.items[0]?.product.artisanName}</td>
                    <td className="p-3.5 font-bold text-stone-900">₹{order.productTotal.toLocaleString('en-IN')}</td>
                    <td className="p-3.5 font-bold text-hasta-terracotta-700">₹{order.commissionAmount.toLocaleString('en-IN')}</td>
                    <td className="p-3.5 font-bold text-emerald-800">₹{order.artisanPayoutAmount.toLocaleString('en-IN')}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        order.payoutStatus === 'completed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : order.payoutStatus === 'held_48h'
                          ? 'bg-hasta-marigold-100 text-hasta-marigold-900 border border-hasta-marigold-300'
                          : order.payoutStatus === 'disputed_hold'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-stone-100 text-stone-800 border border-stone-300'
                      }`}>
                        {order.payoutStatus.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {order.payoutStatus === 'held_48h' || order.payoutStatus === 'initiated' ? (
                        <button
                          onClick={() => releaseArtisanPayout(order.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                        >
                          Release Payout Now
                        </button>
                      ) : (
                        <span className="text-stone-600 font-bold text-[11px]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
