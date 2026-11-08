import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';

// Buyer Components
import { BuyerHome } from './components/buyer/BuyerHome';
import { ProductCatalog } from './components/buyer/ProductCatalog';
import { ProductDetail } from './components/buyer/ProductDetail';
import { ArtisanProfile } from './components/buyer/ArtisanProfile';
import { ArtisanList } from './components/buyer/ArtisanList';
import { MyOrdersList } from './components/buyer/MyOrdersList';
import { OrderTracker10Stage } from './components/buyer/OrderTracker10Stage';
import { SavedItemsView } from './components/buyer/SavedItemsView';
import { CartDrawer } from './components/buyer/CartDrawer';
import { AssistedConciergeDrawer } from './components/buyer/AssistedConciergeDrawer';

// Artisan Components
import { ArtisanDashboard } from './components/artisan/ArtisanDashboard';
import { ArtisanOnboarding } from './components/artisan/ArtisanOnboarding';

// Ops Components
import { OpsDashboard } from './components/ops/OpsDashboard';

// Design System & Typography Guide
import { TypographyDesignGuide } from './components/common/TypographyDesignGuide';

export const AppContent: React.FC = () => {
  const { persona, activeView } = useApp();

  const renderContent = () => {
    // 0. Global Design System & Typography Guide View
    if (activeView === 'typography' || activeView === 'design-system') {
      return <TypographyDesignGuide />;
    }

    // 1. Artisan Persona Views
    if (persona === 'artisan') {
      if (activeView === 'artisan-onboarding') return <ArtisanOnboarding />;
      if (activeView === 'order-detail') return <OrderTracker10Stage />;
      return <ArtisanDashboard />;
    }

    // 2. Ops Persona Views
    if (persona === 'ops') {
      if (activeView === 'order-detail') return <OrderTracker10Stage />;
      if (activeView === 'artisan-profile') return <ArtisanProfile />;
      return <OpsDashboard />;
    }

    // 3. Buyer Persona Views (Default)
    switch (activeView) {
      case 'home':
        return <BuyerHome />;
      case 'catalog':
        return <ProductCatalog />;
      case 'pdp':
        return <ProductDetail />;
      case 'artisan-profile':
        return <ArtisanProfile />;
      case 'artisan-list':
        return <ArtisanList />;
      case 'my-orders':
        return <MyOrdersList />;
      case 'order-detail':
        return <OrderTracker10Stage />;
      case 'saved':
        return <SavedItemsView />;
      default:
        return <BuyerHome />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9EB] text-[#2C1D13] font-sans selection:bg-hasta-haldi-500 selection:text-white">
      <Navbar />
      <main className="flex-1">{renderContent()}</main>
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <AssistedConciergeDrawer />
      <Toast />
    </div>
  );
};

export default AppContent;

