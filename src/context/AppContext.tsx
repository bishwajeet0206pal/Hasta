import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Persona,
  Language,
  ProductCategory,
  Artisan,
  Product,
  Order,
  OrderStatus,
  Enquiry,
  VerificationApplication,
  Dispute,
  OrderItem,
  QCEvidence
} from '../types';
import {
  INITIAL_ARTISANS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_ENQUIRIES,
  INITIAL_VERIFICATIONS,
  INITIAL_DISPUTES
} from '../data/mockData';

interface CartItem {
  product: Product;
  quantity: number;
  customizationNotes?: string;
}

interface AppContextType {
  // Navigation & Persona
  persona: Persona;
  setPersona: (p: Persona) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedArtisanId: string | null;
  setSelectedArtisanId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;

  // Search & Filtering
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;

  // Data Stores
  artisans: Artisan[];
  products: Product[];
  orders: Order[];
  enquiries: Enquiry[];
  verifications: VerificationApplication[];
  disputes: Dispute[];
  savedProductIds: string[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customizationNotes?: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Assisted Buying Drawer
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  conciergeProduct: Product | null;
  openConciergeForProduct: (product: Product) => void;

  // Buyer Actions
  toggleSaveProduct: (productId: string) => void;
  createOrder: (deliveryAddress: Order['shippingAddress'], buyerDetails: { name: string; email: string; phone: string; city: string }) => Order;
  confirmDelivery: (orderId: string) => void;
  reportDispute: (orderId: string, issueType: Dispute['issueType'], description: string, evidenceImages: string[]) => void;
  submitEnquiry: (enquiryData: Omit<Enquiry, 'id' | 'enquiryNumber' | 'createdAt' | 'status'>) => void;

  // Artisan Actions
  acceptOrder: (orderId: string) => void;
  updateOrderProduction: (orderId: string, title: string, description: string) => void;
  submitQCEvidence: (orderId: string, evidence: Omit<QCEvidence, 'submittedAt'>) => void;
  submitVerificationApplication: (appData: Omit<VerificationApplication, 'id' | 'appliedDate' | 'status'>) => void;
  createProductListing: (productData: Omit<Product, 'id'>) => void;

  // Ops Actions
  approveVerification: (verificationId: string, remarks?: string) => void;
  rejectVerification: (verificationId: string, remarks: string) => void;
  updateLogisticsDispatch: (orderId: string, courierName: string, trackingId: string, estimatedDelivery: string) => void;
  resolveDispute: (disputeId: string, decision: Dispute['status'], notes: string) => void;
  releaseArtisanPayout: (orderId: string) => void;

  // Notification Toast
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'hasta_marketplace_state_v10_complete_craft_purity';

// Automatic migration & cleanup of stale legacy mock caches
if (typeof window !== 'undefined') {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('hasta_marketplace_state_') && !key.startsWith(STORAGE_KEY)) {
        localStorage.removeItem(key);
      }
    });
  } catch (e) {
    // ignore storage access errors
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [persona, setPersona] = useState<Persona>('buyer');
  const [language, setLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedArtisanId, setSelectedArtisanId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('ord-101'); // Default to interesting pre-dispatch review order

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [conciergeProduct, setConciergeProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Entities — Authenticated Indian Handicrafts Dataset
  const [artisans, setArtisans] = useState<Artisan[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_artisans`);
      if (saved) {
        const parsed: Artisan[] = JSON.parse(saved);
        const hasLegacyOrBroken = parsed.some(a =>
          a.coverImage?.includes('wikimedia.org') ||
          a.profileImage?.includes('photo-1544717305') ||
          a.profileImage?.includes('photo-1472099645') ||
          a.profileImage?.includes('photo-1507003211') ||
          a.profileImage?.includes('photo-1534528741') ||
          a.workshopImages?.some(img => img.includes('wikimedia.org') || img.includes('photo-1606744837')) ||
          a.studioMoments?.some(m => m.image?.includes('wikimedia.org') || m.image?.includes('photo-152414398') || m.image?.includes('photo-1606744837'))
        );
        if (!hasLegacyOrBroken && parsed.some(a => a.name.includes('Devendra Kashyap'))) {
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_ARTISANS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_products`);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        const hasLegacy = parsed.some(p =>
          p.images.some(img =>
            img.includes('wikimedia.org') ||
            img.includes('photo-152414398') ||
            (p.id === 'prod-5' && img.includes('photo-1606744837'))
          ) ||
          p.name.includes('Horned Bull') ||
          p.name.includes('Silver Damascene') ||
          (p.id === 'prod-4' && p.category === 'sculptures_pottery')
        );
        if (!hasLegacy && parsed.length >= INITIAL_PRODUCTS.length) {
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
      if (saved) {
        const parsed: Order[] = JSON.parse(saved);
        if (parsed.some(o => o.items[0]?.product?.name?.includes('Lord Ganesha'))) {
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_ORDERS;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_enquiries`);
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [verifications, setVerifications] = useState<VerificationApplication[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_verifications`);
    return saved ? JSON.parse(saved) : INITIAL_VERIFICATIONS;
  });

  const [disputes, setDisputes] = useState<Dispute[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_disputes`);
    return saved ? JSON.parse(saved) : INITIAL_DISPUTES;
  });

  const [savedProductIds, setSavedProductIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_saved`);
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-4'];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_cart`);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_artisans`, JSON.stringify(artisans));
  }, [artisans]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_products`, JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_enquiries`, JSON.stringify(enquiries));
  }, [enquiries]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_verifications`, JSON.stringify(verifications));
  }, [verifications]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_disputes`, JSON.stringify(disputes));
  }, [disputes]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_saved`, JSON.stringify(savedProductIds));
  }, [savedProductIds]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_cart`, JSON.stringify(cart));
  }, [cart]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, customizationNotes?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, customizationNotes }];
    });
    setIsCartOpen(true);
    showToast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const toggleSaveProduct = (productId: string) => {
    setSavedProductIds(prev => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from saved collection' : 'Saved to collection', 'info');
      return next;
    });
  };

  const openConciergeForProduct = (product: Product) => {
    setConciergeProduct(product);
    setIsConciergeOpen(true);
  };

  // Checkout and Order Creation
  const createOrder = (
    shippingAddress: Order['shippingAddress'],
    buyerDetails: { name: string; email: string; phone: string; city: string }
  ): Order => {
    const productTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const deliveryFee = 1500; // Flat white-glove insured delivery per shipment
    const commissionRate = 0.10; // 10% seller commission
    const commissionAmount = Math.round(productTotal * commissionRate);
    const artisanPayoutAmount = productTotal - commissionAmount;
    const totalPaid = productTotal + deliveryFee;

    const orderNumber = `HST-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      buyerName: buyerDetails.name,
      buyerEmail: buyerDetails.email,
      buyerPhone: buyerDetails.phone,
      buyerCity: buyerDetails.city,
      shippingAddress,
      items: [...cart],
      productTotal,
      deliveryFee,
      taxes: 0,
      totalPaid,
      commissionRate,
      commissionAmount,
      artisanPayoutAmount,
      status: 'order_placed',
      statusHistory: [
        {
          status: 'order_placed',
          timestamp: new Date().toISOString(),
          title: 'Order Placed & Escrow Secured',
          description: `Total ₹${totalPaid.toLocaleString('en-IN')} paid via Gateway. Hasta escrow locked.`,
          actor: 'buyer'
        },
        {
          status: 'payment_confirmed',
          timestamp: new Date().toISOString(),
          title: 'Payment Confirmed by Gateway',
          description: 'Payment authorized; order transmitted to master artisan for confirmation.',
          actor: 'system'
        }
      ],
      payoutStatus: 'pending'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setSelectedOrderId(newOrder.id);
    setActiveView('order-detail');
    showToast(`Order ${orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  // Artisan Actions
  const acceptOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const newHistory = [
          ...ord.statusHistory,
          {
            status: 'artisan_accepted' as OrderStatus,
            timestamp: new Date().toISOString(),
            title: 'Order Accepted by Artisan',
            description: 'Artisan has confirmed materials and schedule. Production sequence initiated.',
            actor: 'artisan' as const
          }
        ];
        return {
          ...ord,
          status: 'artisan_accepted',
          statusHistory: newHistory
        };
      })
    );
    showToast('Order confirmed. Buyer notified of production start.');
  };

  const updateOrderProduction = (orderId: string, title: string, description: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const newHistory = [
          ...ord.statusHistory,
          {
            status: 'in_production' as OrderStatus,
            timestamp: new Date().toISOString(),
            title,
            description,
            actor: 'artisan' as const
          }
        ];
        return {
          ...ord,
          status: 'in_production',
          statusHistory: newHistory
        };
      })
    );
    showToast('Production stage updated for buyer.');
  };

  const submitQCEvidence = (orderId: string, evidenceData: Omit<QCEvidence, 'submittedAt'>) => {
    const fullEvidence: QCEvidence = {
      ...evidenceData,
      submittedAt: new Date().toISOString(),
      verifiedByOps: true
    };

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const newHistory = [
          ...ord.statusHistory,
          {
            status: 'qc_evidence_submitted' as OrderStatus,
            timestamp: new Date().toISOString(),
            title: 'Pre-Dispatch Quality Evidence Uploaded',
            description: 'Master artisan has submitted finished inspection photos. Buyer and Ops notified for review.',
            actor: 'artisan' as const
          }
        ];
        return {
          ...ord,
          status: 'qc_evidence_submitted',
          statusHistory: newHistory,
          qcEvidence: fullEvidence
        };
      })
    );
    showToast('Pre-dispatch evidence uploaded! Ready for buyer inspection.');
  };

  // Logistics & Ops
  const updateLogisticsDispatch = (
    orderId: string,
    courierName: string,
    trackingId: string,
    estimatedDelivery: string
  ) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const newHistory = [
          ...ord.statusHistory,
          {
            status: 'ready_for_dispatch' as OrderStatus,
            timestamp: new Date().toISOString(),
            title: 'Packaging Inspected & Certified',
            description: 'Passed 3-layer cushioning and moisture seal standards.',
            actor: 'ops' as const
          },
          {
            status: 'dispatched' as OrderStatus,
            timestamp: new Date().toISOString(),
            title: `Dispatched via ${courierName}`,
            description: `Waybill tracking #${trackingId}. Insured art transit initiated.`,
            actor: 'ops' as const
          }
        ];
        return {
          ...ord,
          status: 'dispatched',
          statusHistory: newHistory,
          shippingDetails: {
            courierName,
            trackingId,
            estimatedDelivery,
            dispatchTimestamp: new Date().toISOString()
          }
        };
      })
    );
    showToast('Shipment dispatched and tracking assigned.');
  };

  // Buyer Delivery Confirmation & Dispute Window (48 Hours)
  const confirmDelivery = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const newHistory = [
          ...ord.statusHistory,
          {
            status: 'completed' as OrderStatus,
            timestamp: new Date().toISOString(),
            title: 'Delivered & Accepted by Buyer',
            description: 'Buyer confirmed receipt and satisfaction. Escrow released for artisan payout.',
            actor: 'buyer' as const
          }
        ];
        return {
          ...ord,
          status: 'completed',
          payoutStatus: 'initiated',
          deliveryConfirmedAt: new Date().toISOString(),
          statusHistory: newHistory
        };
      })
    );
    showToast('Delivery confirmed! Artisan payout initiated.', 'success');
  };

  const reportDispute = (
    orderId: string,
    issueType: Dispute['issueType'],
    description: string,
    evidenceImages: string[]
  ) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const disputeNumber = `DSP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newDispute: Dispute = {
      id: `disp-${Date.now()}`,
      disputeNumber,
      orderId,
      orderNumber: targetOrder.orderNumber,
      createdAt: new Date().toISOString(),
      buyerName: targetOrder.buyerName,
      artisanName: targetOrder.items[0]?.product.artisanName || 'Master Artisan',
      issueType,
      description,
      buyerEvidenceImages: evidenceImages,
      preDispatchQCImages: targetOrder.qcEvidence?.photos || targetOrder.items[0]?.product.images || [],
      status: 'under_investigation',
      opsOwner: 'Hasta Trust Cell'
    };

    setDisputes(prev => [newDispute, ...prev]);

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          status: 'disputed',
          payoutStatus: 'disputed_hold',
          disputeId: newDispute.id,
          statusHistory: [
            ...ord.statusHistory,
            {
              status: 'disputed' as OrderStatus,
              timestamp: new Date().toISOString(),
              title: `Dispute Case #${disputeNumber} Logged`,
              description: `Reported issue: ${issueType.replace(/_/g, ' ')}. Artisan payout held pending ops arbitration.`,
              actor: 'buyer' as const
            }
          ]
        };
      })
    );
    showToast(`Dispute #${disputeNumber} opened. Our Trust Concierge is reviewing evidence within 24 hours.`, 'warning');
  };

  const resolveDispute = (disputeId: string, decision: Dispute['status'], notes: string) => {
    const targetDispute = disputes.find(d => d.id === disputeId);
    if (!targetDispute) return;

    setDisputes(prev =>
      prev.map(d =>
        d.id === disputeId
          ? {
              ...d,
              status: decision,
              resolutionDecision: notes,
              resolutionTimestamp: new Date().toISOString()
            }
          : d
      )
    );

    // Update corresponding order
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== targetDispute.orderId) return ord;
        const newStatus: OrderStatus = decision.includes('refund') ? 'refunded' : 'completed';
        const newPayout = decision.includes('refund') ? 'pending' : 'initiated';
        return {
          ...ord,
          status: newStatus,
          payoutStatus: newPayout,
          statusHistory: [
            ...ord.statusHistory,
            {
              status: newStatus,
              timestamp: new Date().toISOString(),
              title: `Dispute Resolved: ${decision.replace(/_/g, ' ').toUpperCase()}`,
              description: notes,
              actor: 'ops' as const
            }
          ]
        };
      })
    );
    showToast(`Dispute #${targetDispute.disputeNumber} resolved.`);
  };

  const releaseArtisanPayout = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          payoutStatus: 'completed'
        };
      })
    );
    showToast('Artisan payout settled via RBI-regulated marketplace provider.');
  };

  // Assisted Buying Enquiries
  const submitEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'enquiryNumber' | 'createdAt' | 'status'>) => {
    const enquiryNumber = `ENQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      enquiryNumber,
      createdAt: new Date().toISOString(),
      status: 'submitted'
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    showToast(`Enquiry ${enquiryNumber} submitted. Our craft concierge will coordinate with the artisan.`, 'success');
  };

  // Artisan Verification Application
  const submitVerificationApplication = (appData: Omit<VerificationApplication, 'id' | 'appliedDate' | 'status'>) => {
    const newApp: VerificationApplication = {
      ...appData,
      id: `ver-${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending_review'
    };
    setVerifications(prev => [newApp, ...prev]);
    showToast('Verification application submitted! Hasta Trust Cell will inspect within 48 hours.');
  };

  const approveVerification = (verificationId: string, remarks?: string) => {
    const app = verifications.find(v => v.id === verificationId);
    if (!app) return;

    setVerifications(prev =>
      prev.map(v =>
        v.id === verificationId ? { ...v, status: 'approved', reviewerRemarks: remarks || 'Full criteria satisfied' } : v
      )
    );

    // Grant verification badges to artisan
    setArtisans(prev =>
      prev.map(art => {
        if (art.id === app.artisanId || art.name.toLowerCase() === app.artisanName.toLowerCase()) {
          return {
            ...art,
            identityVerified: true,
            bankVerified: true,
            badges: [
              ...art.badges,
              {
                type: 'curated',
                label: 'Verified by Hasta',
                badgeCode: 'HASTA_VERIFIED',
                description: 'Certified authentic Indian master craftsman.',
                verifiedAt: new Date().toISOString().split('T')[0],
                verifiedBy: 'Hasta Trust Team',
                evidenceItems: ['On-site verification passed', 'Raw material purity test']
              }
            ]
          };
        }
        return art;
      })
    );
    showToast(`Artisan application for ${app.artisanName} APPROVED with badges!`);
  };

  const rejectVerification = (verificationId: string, remarks: string) => {
    setVerifications(prev =>
      prev.map(v =>
        v.id === verificationId ? { ...v, status: 'rejected', reviewerRemarks: remarks } : v
      )
    );
    showToast('Application marked as rejected with feedback.', 'info');
  };

  const createProductListing = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Product "${productData.name}" submitted and listed successfully!`);
  };

  return (
    <AppContext.Provider
      value={{
        persona,
        setPersona,
        language,
        setLanguage,
        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        selectedArtisanId,
        setSelectedArtisanId,
        selectedOrderId,
        setSelectedOrderId,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        artisans,
        products,
        orders,
        enquiries,
        verifications,
        disputes,
        savedProductIds,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isConciergeOpen,
        setIsConciergeOpen,
        conciergeProduct,
        openConciergeForProduct,
        toggleSaveProduct,
        createOrder,
        confirmDelivery,
        reportDispute,
        submitEnquiry,
        acceptOrder,
        updateOrderProduction,
        submitQCEvidence,
        submitVerificationApplication,
        createProductListing,
        approveVerification,
        rejectVerification,
        updateLogisticsDispatch,
        resolveDispute,
        releaseArtisanPayout,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

