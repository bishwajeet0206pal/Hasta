import React, { useState } from 'react';
import {
  Package,
  Camera,
  CheckCircle2,
  Plus,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PreDispatchQCModal } from './PreDispatchQCModal';
import { NewProductModal } from './NewProductModal';

export const ArtisanDashboard: React.FC = () => {
  const {
    language,
    orders,
    artisans,
    acceptOrder,
    setActiveView,
    setSelectedOrderId
  } = useApp();

  // Pick Master Bhanu as active logged-in artisan profile for simulation
  const currentArtisan = artisans[0]; // Bhanu Prajapati

  // Filter orders for this artisan
  const artisanOrders = orders.filter(
    o => o.items.some(item => item.product.artisanId === currentArtisan.id)
  );

  const [selectedOrderForQC, setSelectedOrderForQC] = useState<string | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  // Financial calculations
  const totalRevenue = artisanOrders.reduce((sum, o) => sum + o.productTotal, 0);
  const totalCommission = artisanOrders.reduce((sum, o) => sum + o.commissionAmount, 0);
  const netEarnings = artisanOrders.reduce((sum, o) => sum + o.artisanPayoutAmount, 0);

  // Localized strings
  const t = {
    dashboardTitle: language === 'hi' ? 'कारीगर पोर्टल एवं कार्यशाला' : 'Master Artisan Workshop Portal',
    greeting: language === 'hi' ? `नमस्ते, ${currentArtisan.hindiName || currentArtisan.name}` : `Welcome, ${currentArtisan.name}`,
    studio: currentArtisan.studioName,
    netPayouts: language === 'hi' ? 'कुल भुगतान (10% कमीशन बाद)' : 'Net Payouts (After 10% Commission)',
    orderQueue: language === 'hi' ? 'ऑर्डर सूची एवं उत्पादन स्थिति' : 'Order Queue & Production Updates',
    accept: language === 'hi' ? 'ऑर्डर स्वीकारें' : 'Accept Order',
    uploadQC: language === 'hi' ? 'प्री-डिस्पैच फोटो अपलोड करें' : 'Upload Pre-Dispatch Photos',
    viewDetails: language === 'hi' ? 'विवरण देखें' : 'View Tracking',
    qcUploaded: language === 'hi' ? 'जाँच फोटो अपलोड हो चुकी है' : 'Pre-Dispatch Evidence Uploaded',
    addNewProduct: language === 'hi' ? 'नया शिल्प सूचीबद्ध करें' : 'List New Craft Piece'
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 1. Artisan Header Banner with Vibrant Marigold Yellow & Editorial Voice */}
      <div className="bg-gradient-to-r from-hasta-haldi-400 via-hasta-haldi-300 to-hasta-haldi-400 p-6 sm:p-8 rounded-[12px] border border-[#E6D8C5] shadow-md text-[#1F1610] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentArtisan.profileImage}
            alt={currentArtisan.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-[8px] object-cover border-4 border-white shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-hasta-hingula-700 uppercase tracking-wider font-mono">
                {t.dashboardTitle}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[10px] font-bold flex items-center gap-1 border border-emerald-300 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                {language === 'hi' ? 'प्रमाणित' : 'Verified Master'}
              </span>
            </div>
            <h1 className="type-h3 text-[#1F1610] mt-0.5">
              {t.greeting}
            </h1>
            <p className="type-caption text-[#3D2516] font-semibold">
              {t.studio} • {currentArtisan.region}, {currentArtisan.state}
            </p>
            <div className="mt-2 text-xs font-serif italic text-[#170F0A] font-bold">
              “You made it by hand. Now earn like it.” — Built with makers, not at them.
            </div>
          </div>
        </div>

        {/* Actions: Standard 48px buttons, 8px radius */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsNewProductModalOpen(true)}
            className="btn-hingula h-[48px] px-6 rounded-[8px] bg-hasta-hingula-600 hover:bg-hasta-hingula-700 text-white font-sans text-[15px] font-bold shadow-md shadow-hasta-hingula-700/30 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addNewProduct}</span>
          </button>

          <button
            onClick={() => setActiveView('artisan-onboarding')}
            className="h-[48px] px-6 rounded-[8px] bg-white hover:bg-amber-50 text-[#1F1610] font-sans text-[15px] font-bold border border-[#E6D8C5] flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <UserCheck className="w-4 h-4 text-hasta-cobalt-700" />
            <span>KYC Details</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row (Transparent 10% Model) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-700 font-bold block uppercase tracking-wide">
            {language === 'hi' ? 'सक्रिय ऑर्डर' : 'Active Orders Fulfilled'}
          </span>
          <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 block">
            {artisanOrders.length}
          </span>
          <span className="text-[11px] text-stone-700 mt-1 block font-semibold">
            {language === 'hi' ? 'समय पर प्रेषण दर: 100%' : 'On-time crafting rate: 100%'}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-700 font-bold block uppercase tracking-wide">
            {language === 'hi' ? 'कुल विक्रय मूल्य' : 'Gross Artisan Sales'}
          </span>
          <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 block">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-stone-700 mt-1 block font-semibold">
            {language === 'hi' ? 'सीधा ग्राहक मूल्य' : 'Artisan-set product price'}
          </span>
        </div>

        <div className="bg-gradient-to-br from-hasta-marigold-100/70 to-hasta-cream-200 p-6 rounded-2xl border border-hasta-marigold-300 shadow-sm">
          <span className="text-xs text-hasta-terracotta-800 font-bold block uppercase tracking-wide">
            {t.netPayouts}
          </span>
          <span className="font-serif text-3xl sm:text-4xl font-bold text-hasta-charcoal-900 mt-1 block">
            ₹{netEarnings.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-stone-700 mt-1 block font-semibold">
            {language === 'hi'
              ? `हस्ता कमीशन (10%): -₹${totalCommission.toLocaleString('en-IN')}`
              : `Hasta 10% Commission: -₹${totalCommission.toLocaleString('en-IN')}`}
          </span>
        </div>
      </div>

      {/* 3. Orders Management Queue */}
      <div className="bg-white rounded-3xl border border-hasta-cream-300 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-hasta-terracotta-600" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              {t.orderQueue}
            </h2>
          </div>
          <span className="text-xs text-stone-700 font-bold">
            {artisanOrders.length} {language === 'hi' ? 'ऑर्डर' : 'Orders'}
          </span>
        </div>

        <div className="divide-y divide-stone-100">
          {artisanOrders.map(order => {
            const item = order.items[0];
            const canUploadQC = order.status === 'in_production' || order.status === 'artisan_accepted';
            const hasQC = !!order.qcEvidence;

            return (
              <div key={order.id} className="p-6 space-y-4 hover:bg-stone-50/60 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-lg font-bold text-stone-900">
                        {order.orderNumber}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-hasta-terracotta-100 text-hasta-terracotta-800 uppercase tracking-wide border border-hasta-terracotta-200">
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 mt-1 font-semibold">
                      Buyer: {order.buyerName} ({order.buyerCity}) • Placed: {new Date(order.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-stone-700 block font-bold">
                      Your Net Payout (90%)
                    </span>
                    <span className="font-serif text-xl font-bold text-emerald-800">
                      ₹{order.artisanPayoutAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-stone-600 block font-semibold">
                      (Price: ₹{order.productTotal.toLocaleString('en-IN')} - 10% comm: ₹{order.commissionAmount.toLocaleString('en-IN')})
                    </span>
                  </div>
                </div>

                {/* Item Details */}
                <div className="flex items-center gap-3.5 p-3.5 bg-hasta-cream-100 rounded-2xl border border-hasta-cream-200">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="text-xs flex-1">
                    <span className="font-bold text-stone-900 block">{item.product.name}</span>
                    <span className="text-stone-600 font-medium">{item.product.craftTechnique}</span>
                    {item.customizationNotes && (
                      <span className="text-hasta-terracotta-800 font-bold block mt-0.5">
                        Note: {item.customizationNotes}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    {order.status === 'order_placed' && (
                      <button
                        onClick={() => acceptOrder(order.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                      >
                        {t.accept}
                      </button>
                    )}

                    {canUploadQC && (
                      <button
                        onClick={() => setSelectedOrderForQC(order.id)}
                        className="bg-hasta-marigold-500 hover:bg-hasta-marigold-600 text-hasta-charcoal-950 px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Camera className="w-4 h-4" />
                        <span>{t.uploadQC}</span>
                      </button>
                    )}

                    {hasQC && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-hasta-cilantro-800 bg-hasta-cilantro-50 px-3 py-1.5 rounded-xl border border-hasta-cilantro-200 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-hasta-cilantro-600" />
                        <span>{t.qcUploaded}</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setActiveView('order-detail');
                    }}
                    className="text-xs text-hasta-terracotta-700 hover:underline font-bold cursor-pointer"
                  >
                    {t.viewDetails} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QC Modal */}
      {selectedOrderForQC && (
        <PreDispatchQCModal
          orderId={selectedOrderForQC}
          isOpen={!!selectedOrderForQC}
          onClose={() => setSelectedOrderForQC(null)}
        />
      )}

      {/* New Product Modal */}
      {isNewProductModalOpen && (
        <NewProductModal
          isOpen={isNewProductModalOpen}
          onClose={() => setIsNewProductModalOpen(false)}
          artisan={currentArtisan}
        />
      )}
    </div>
  );
};
