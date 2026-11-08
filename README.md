# ह HASTA — Handmade in India
> Curated Marketplace Connecting Discerning Patrons with Verified Indian Master Craftspeople.

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🏛️ About Hasta

**Hasta** (हस्त) is a direct-to-artisan curatorial platform engineered to safeguard and celebrate Indian living craft traditions. Hasta directly connects heritage craft guilds and award-winning Shilp Gurus with discerning homeowners and collectors—eliminating middlemen, assuring 100% material provenance, and providing 48-hour escrow protection.

### ✨ Key Platform Features

- **Direct Studio Verification (Pehchan ID & On-Site Audits):** Rigorous multi-tier verification covering artisan Aadhaar identity, bank IFSC settlements, raw material inspections, and workshop tools lineage.
- **Fair 10% Artisan Commission Model:** Zero buyer markup, transparent artisan pricing, and guaranteed 48-hour escrow release to artisan bank accounts.
- **Labor & Craftsmanship Transparency:** "Your hours, visible before your price"—breakdown of raw material costs and skilled manual artisan labor for every unique piece.
- **Pre-Dispatch Photographic Evidence Desk:** High-resolution multi-angle studio documentation and dimensional measurements uploaded for patron approval prior to white-glove courier crating.
- **48-Hour Delivery Inspection Window:** Patrons inspect items upon home arrival before escrow funds are released to the artisan.
- **Bilingual Experience (English & हिन्दी):** Complete UI localization across buyer catalog, artisan portal, and operational oversight desks.
- **Multi-Persona Architecture:**
  - 🛍️ **Buyer / Patron Portal:** Curated search, high-res photography, heritage stories, transparent pricing, assisted concierge commissions, and order delivery inspection.
  - 🔨 **Artisan Partner Desk:** Order intake, in-production milestone updates, studio verification tracking, and pre-dispatch QC evidence submission.
  - ⚖️ **Ops & Trust Control:** Studio verifications review, escrow hold/release management, courier dispatch coordination, and dispute resolution.

---

## 🎨 Featured Heritage Craft Traditions

1. **Sacred Bronzes & Ganesha:** 4,000-year-old Harappan lost-wax casting (*Dhokra*) by master metalsmiths in Bastar, Chhattisgarh.
2. **Heritage Indian Paintings:** Devotional *Pichwai* on khadi with 24K gold leaf from Nathdwara, Rajasthan & natural-dye *Madhubani* folk canvases from Mithila, Bihar.
3. **Royal Handlooms & Silks:** Traditional 3-shuttle interlocking *Korvai* pure mulberry silk with gold zari borders from Kanchipuram, Tamil Nadu.
4. **Jaipur Blue Pottery:** Ancient Egyptian quartz-paste formulation with hand-painted cobalt arabesques from Kot Jewar, Rajasthan.
5. **Architectural Jali Woodcraft:** Single-block seasoned Sheesham openwork lattice carving from Saharanpur, Uttar Pradesh.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/bishwajeet0206pal/Hasta.git
cd Hasta

# Install project dependencies
npm install

# Start Vite local development server
npm run dev
```

The application will be live at `http://localhost:5173/`.

### Production Build

```bash
# Typecheck and bundle with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

```
Hasta/
├── src/
│   ├── components/
│   │   ├── layout/               # 2-Tier Header, Subnav & Persona-specific Footers
│   │   ├── buyer/                # Homepage, Catalog, Product Detail, Concierge, Orders
│   │   ├── artisan/              # Artisan Portal, In-Production Tracker, QC Evidence
│   │   ├── ops/                  # Admin Verification Queue, Escrow Releases, Disputes
│   │   └── common/               # Design System, Trust Badges, Toast notifications
│   ├── context/
│   │   └── AppContext.tsx        # Central State Management & Storage
│   ├── data/
│   │   └── mockData.ts           # Curated Artisans, Products, Orders & Provenance Data
│   ├── types/
│   │   └── index.ts              # Strongly Typed Domain Model
│   ├── App.tsx                   # Main App Shell
│   ├── index.css                 # Typography & Design Token Styles
│   └── main.tsx                  # Application Entrypoint
├── public/                       # Static Public Assets
├── package.json                  # Dependencies & Scripts
├── tailwind.config.js            # Design Tokens (Hingula, Haldi, Nil, Earth)
├── tsconfig.json                 # TypeScript Strict Configuration
└── vite.config.ts                # Vite Configuration
```

---

## 📜 License

Private & Proprietary © 2026 HASTA Crafts Marketplace Pvt. Ltd. All rights reserved.
