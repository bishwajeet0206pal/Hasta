export type Persona = 'buyer' | 'artisan' | 'ops';

export type Language = 'en' | 'hi';

export type ProductCategory = 
  | 'wall_art' 
  | 'sculptures_pottery' 
  | 'furniture_decor' 
  | 'textiles_furnishings';

export interface VerificationBadge {
  type: 'identity' | 'craftsmanship' | 'curated';
  label: string;
  badgeCode: 'ID_VERIFIED' | 'CRAFT_VERIFIED' | 'HASTA_VERIFIED';
  description: string;
  verifiedAt: string;
  verifiedBy: string;
  evidenceItems: string[];
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  hindiTitle?: string;
  duration: string;
  description: string;
  image: string;
  toolUsed: string;
}

export interface StudioMoment {
  timeOfDay: string;
  title: string;
  caption: string;
  image: string;
}

export interface HeritageTool {
  name: string;
  hindiName?: string;
  description: string;
}

export interface Artisan {
  id: string;
  name: string;
  hindiName?: string;
  studioName: string;
  craft: string;
  hindiCraft?: string;
  region: string;
  state: string;
  experienceYears: number;
  profileImage: string;
  coverImage?: string;
  workshopImages: string[];
  makingVideoThumb?: string;
  story: string;
  hindiStory?: string;
  lineage: string;
  awards?: string[];
  badges: VerificationBadge[];
  bankVerified: boolean;
  identityVerified: boolean;
  rating: number;
  completedOrdersCount: number;
  processSteps?: ProcessStep[];
  studioMoments?: StudioMoment[];
  heritageTools?: HeritageTool[];
}

export interface Product {
  id: string;
  name: string;
  artisanId: string;
  artisanName: string;
  artisanLocation: string;
  category: ProductCategory;
  categoryLabel: string;
  craftTechnique: string;
  materials: string[];
  dimensions: {
    heightCm: number;
    widthCm: number;
    depthCm?: number;
    unit: 'cm' | 'inches';
  };
  weightKg: number;
  price: number;
  madeToOrder: boolean;
  productionLeadDays: number;
  dispatchLeadDays: number;
  stockCount: number;
  images: string[];
  description: string;
  makingProcessBrief: string;
  careInstructions: string[];
  customizationAvailable: boolean;
  customizationOptions?: string[];
  featured?: boolean;
}

export type OrderStatus =
  | 'order_placed'
  | 'payment_confirmed'
  | 'artisan_accepted'
  | 'in_production'
  | 'qc_evidence_submitted'
  | 'ready_for_dispatch'
  | 'dispatched'
  | 'out_for_delivery'
  | 'delivered'
  | 'completed'
  | 'disputed'
  | 'cancelled'
  | 'refunded';

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  title: string;
  description: string;
  actor: 'system' | 'buyer' | 'artisan' | 'ops';
}

export interface QCEvidence {
  photos: string[];
  videoThumbnail?: string;
  artisanNotes: string;
  submittedAt: string;
  verifiedByOps?: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  customizationNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerCity: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  items: OrderItem[];
  productTotal: number;
  deliveryFee: number;
  taxes: number;
  totalPaid: number;
  commissionRate: number; // 0.10 (10%)
  commissionAmount: number; // productTotal * 0.10
  artisanPayoutAmount: number; // productTotal * 0.90
  status: OrderStatus;
  statusHistory: OrderStatusHistoryItem[];
  qcEvidence?: QCEvidence;
  shippingDetails?: {
    courierName: string;
    trackingId: string;
    estimatedDelivery: string;
    dispatchTimestamp?: string;
  };
  deliveryConfirmedAt?: string;
  payoutStatus: 'pending' | 'held_48h' | 'initiated' | 'completed' | 'disputed_hold';
  disputeId?: string;
}

export interface Enquiry {
  id: string;
  enquiryNumber: string;
  createdAt: string;
  buyerName: string;
  buyerPhone: string;
  buyerCity: string;
  productId: string;
  productName: string;
  productImage: string;
  artisanId: string;
  artisanName: string;
  requestType: 'custom_dimensions' | 'color_material_custom' | 'interior_consult' | 'bespoke_piece';
  requirements: string;
  targetBudget?: number;
  status: 'submitted' | 'received' | 'responded' | 'quote_shared' | 'accepted' | 'rejected' | 'converted_to_order';
  quoteAmount?: number;
  estimatedLeadDays?: number;
  opsNotes?: string;
}

export interface VerificationApplication {
  id: string;
  artisanId: string;
  artisanName: string;
  craft: string;
  location: string;
  phone: string;
  aadhaarNumberMasked: string;
  bankAccountVerified: boolean;
  workshopPhotos: string[];
  processVideoThumbnail: string;
  toolsDescription: string;
  sampleProducts: string[];
  appliedDate: string;
  status: 'pending_review' | 'approved' | 'rejected' | 'more_info_needed';
  reviewerRemarks?: string;
}

export interface Dispute {
  id: string;
  disputeNumber: string;
  orderId: string;
  orderNumber: string;
  createdAt: string;
  buyerName: string;
  artisanName: string;
  issueType: 'damaged_in_transit' | 'materially_different' | 'dimension_error' | 'craftsmanship_flaw';
  description: string;
  buyerEvidenceImages: string[];
  preDispatchQCImages: string[];
  status: 'under_investigation' | 'resolved_replacement' | 'resolved_partial_refund' | 'resolved_full_refund' | 'carrier_claim_approved' | 'claim_declined';
  resolutionDecision?: string;
  resolutionTimestamp?: string;
  opsOwner: string;
}

