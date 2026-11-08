import { Artisan, Product, Order, Enquiry, VerificationApplication, Dispute } from '../types';

export const INITIAL_ARTISANS: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'Bhanu Prajapati',
    hindiName: 'भानु प्रजापति',
    studioName: 'Neelam Clay & Blue Pottery Studio',
    craft: 'Traditional Jaipur Blue Pottery & Glazed Terracotta',
    hindiCraft: 'पारंपरिक जयपुर ब्लू पॉटरी एवं टेराकोटा',
    region: 'Kot Jewar, Jaipur',
    state: 'Rajasthan',
    experienceYears: 28,
    profileImage: 'https://images.unsplash.com/photo-1607867810523-d10955f2a8df?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1672252508024-c80ac06f960c?auto=format&fit=crop&w=1200&q=80',
    workshopImages: [
      'https://images.unsplash.com/photo-1672252508024-c80ac06f960c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80'
    ],
    makingVideoThumb: 'https://images.unsplash.com/photo-1672252508024-c80ac06f960c?auto=format&fit=crop&w=800&q=80',
    story: 'Inheriting an eighth-generation ceramic lineage, Bhanu masterfully formulates quartz powder, Fullers earth, and natural copper oxide pigments without clay. Working against the sun-washed marigold walls of his ancestral workshop in Kot Jewar, every vessel is hand-turned and hand-painted with Persian motifs before firing in a low-temperature wood kiln.',
    hindiStory: 'आठ पीढ़ियों की मिट्टी-शिल्प विरासत को संभालते हुए, भानु बिना पारंपरिक चिकनी मिट्टी के क्वार्ट्ज और तांबे के प्राकृतिक रंगों से दुर्लभ ब्लू पॉटरी गढ़ते हैं। हर बर्तन पर हाथ से फारसी नक्काशी की जाती है।',
    lineage: '8th Generation Master Craftsman (Shilp Guru Nominee)',
    awards: ['Rajasthan State Award 2014', 'UNESCO Seal of Excellence Finalist 2018'],
    bankVerified: true,
    identityVerified: true,
    rating: 4.95,
    completedOrdersCount: 42,
    studioMoments: [
      {
        timeOfDay: '06:00 AM • Dawn',
        title: 'Gathering Quartz & Earth',
        caption: 'Bhanu crushes pure white river quartz with glass frit and multani mitti on a hand-cut granite slab.',
        image: 'https://images.unsplash.com/photo-1672252508024-c80ac06f960c?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '10:30 AM • Morning',
        title: 'Turning on the Stone Wheel',
        caption: 'Shaping the iconic Surahi neck without clay, relying solely on hand pressure and herbal binders.',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '02:30 PM • Afternoon',
        title: 'Cobalt Palmettes & Fine Brushes',
        caption: 'Applying natural cobalt oxide and copper blues with handmade squirrel-hair brushes before sun-drying.',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '06:30 PM • Dusk',
        title: 'Wood Kiln 800°C Firing',
        caption: 'Slowly firing the vessels in a wood-fueled kiln under the open Rajasthani evening sky.',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80'
      }
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Quartz Dough Formulation',
        hindiTitle: 'क्वार्ट्ज लेप निर्माण',
        duration: '2 Days',
        description: 'Crushed quartz stone, recycled glass cullet, and Multani clay are mixed with Katira gum water into a clay-free dough.',
        image: 'https://images.unsplash.com/photo-1672252508024-c80ac06f960c?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Heavy Stone Grinder & Water Sieve'
      },
      {
        stepNumber: 2,
        title: 'Hand Moulding & Sun Drying',
        hindiTitle: 'हस्त ढलाई व धूप में सुखाना',
        duration: '48 Hours',
        description: 'Pressed into open terracotta moulds, smoothed with river stones, and dried beneath the hot Rajasthani sun.',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Terracotta Open Moulds'
      },
      {
        stepNumber: 3,
        title: 'Cobalt & Copper Hand Painting',
        hindiTitle: 'नीले व फिरोजी रंगों का चित्रांकन',
        duration: '14 Hours',
        description: 'Freehand painting of traditional Persian palmettes and peacock eyes using pure cobalt oxide and copper glaze.',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Squirrel-Hair Fine Liner'
      },
      {
        stepNumber: 4,
        title: 'Lead-Free Borax Glaze & 800°C Fire',
        hindiTitle: 'कांच का लेप व भट्टी में पकाई',
        duration: '18 Hours',
        description: 'Dipped in clear borax and glass flux glaze, then fired in a slow wood-fired kiln to seal the vibrant turquoise gloss.',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Traditional Muffled Wood Kiln'
      },
      {
        stepNumber: 5,
        title: 'Hasta Trust Seal & Verification',
        hindiTitle: 'हस्त मुहर सत्यापन',
        duration: 'Final Stage',
        description: 'Sonic acoustic resonance test for hairline fissures, lead-free food-safe certification, and pre-dispatch photographic record.',
        image: 'https://images.unsplash.com/photo-1672252508024-c80ac06f960c?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Acoustic Sound Wand & Digital Macro Lens'
      }
    ],
    heritageTools: [
      { name: 'Chakra (चक्र)', description: 'Low-slung heavy granite wheel rotated with a sal-wood lever.' },
      { name: 'Kalam (कलम)', description: 'Fine brushes crafted from shed squirrel hair for micro-arabesques.' },
      { name: 'Kundi-Sota (कुंडी-सोटा)', description: 'Stone mortar and pestle to grind raw cobalt and copper ore.' },
      { name: 'Bhatti (भट्टी)', description: 'Ancestral mud brick kiln fired with locally sourced neem and babool wood.' }
    ],
    badges: [
      {
        type: 'identity',
        label: 'Identity Verified',
        badgeCode: 'ID_VERIFIED',
        description: 'Artisan identity and local studio address verified via Government ID and active bank IFSC settlement checks.',
        verifiedAt: '2024-03-12',
        verifiedBy: 'Hasta Trust & Verification Cell',
        evidenceItems: ['Aadhaar KYC', 'Studio Electricity Utility Deed', 'Penny Drop Bank Verification']
      },
      {
        type: 'craftsmanship',
        label: 'Craftsmanship Verified',
        badgeCode: 'CRAFT_VERIFIED',
        description: 'Authentic hand-wheel turning, natural Egyptian paste formula, and manual wood kiln firing verified on-site.',
        verifiedAt: '2024-03-18',
        verifiedBy: 'Hasta Senior Craft Curator',
        evidenceItems: ['Workshop Raw Material Inspection', 'Live Wheel-turning Video Verification', 'Kiln Firing Log']
      },
      {
        type: 'curated',
        label: 'Verified by Hasta',
        badgeCode: 'HASTA_VERIFIED',
        description: 'Curated for museum-grade finish, lead-free food-safe glaze, and exceptional architectural presence.',
        verifiedAt: '2024-04-01',
        verifiedBy: 'Hasta Curatorial Board',
        evidenceItems: ['Lead-Free Glaze Laboratory Test Report', 'Impact Packaging Protocol Clearance']
      }
    ]
  },
  {
    id: 'artisan-2',
    name: 'Devendra Kashyap & Somnath Karmakar',
    hindiName: 'देवेन्द्र कश्यप एवं सोमनाथ कर्मकार',
    studioName: 'Bastar Sacred Bell Metal & Dhokra Guild',
    craft: 'Lost-Wax Dhokra & Bronze Deity Idols (Ganesha & Sacred Statues)',
    hindiCraft: 'ढोकरा लॉस्ट-वैक्स कांस्य गणेश एवं देव मूर्तियां',
    region: 'Kondagaon, Bastar & Swamimalai',
    state: 'Chhattisgarh',
    experienceYears: 31,
    profileImage: 'https://images.unsplash.com/photo-1568074108423-9ff142472498?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1567591370504-80142b28f1c1?auto=format&fit=crop&w=1200&q=80',
    workshopImages: [
      'https://images.unsplash.com/photo-1567878673047-0451c851056e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1567591370504-80142b28f1c1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1568074108423-9ff142472498?auto=format&fit=crop&w=900&q=80'
    ],
    story: 'Practicing the 4,000-year-old non-ferrous lost-wax casting technique traced back to the Harappan civilization. Devendra and his guild harvest wild forest beeswax to sculpt sacred Lord Ganesha idols and ceremonial brass lamps. Each piece has a unique one-of-a-kind clay mould that is ritually shattered to reveal the golden bronze deity within.',
    hindiStory: 'सिंधु घाटी सभ्यता की 4000 वर्ष पुरानी लॉस्ट-वैक्स तकनीक से शुद्ध कांस्य और मधुमक्खी मोम की डोरियों से भगवान गणेश एवं पारंपरिक देव प्रतिमाएं गढ़ते हैं।',
    lineage: 'Kashyap-Karmakar Sacred Metalsmith Guild',
    awards: ['National Merit Certificate 2016', 'All India Handicrafts Board Gold Icon'],
    bankVerified: true,
    identityVerified: true,
    rating: 4.98,
    completedOrdersCount: 54,
    studioMoments: [
      {
        timeOfDay: '05:30 AM • Dawn',
        title: 'Forest Honeycomb Harvesting',
        caption: 'Collecting natural wild beeswax from Bastar Sal forests, filtered through muslin cloth.',
        image: 'https://images.unsplash.com/photo-1567591370504-80142b28f1c1?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '11:00 AM • Midday',
        title: 'Sculpting Ganesha with Wax Strings',
        caption: 'Pulling warm beeswax threads through a brass syringe to wind the sacred trunk, crown, and modak.',
        image: 'https://images.unsplash.com/photo-1567878673047-0451c851056e?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '03:30 PM • Afternoon',
        title: 'Ant-Hill Clay Encasement',
        caption: 'Enclosing the wax Ganesha model in five layers of fine ant-hill silt mixed with rice husk.',
        image: 'https://images.unsplash.com/photo-1568074108423-9ff142472498?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '08:00 PM • Night',
        title: 'Molten Bell Metal Smelt',
        caption: 'Pouring 1100°C molten brass into the preheated mould as the wax drains away to give birth to the bronze.',
        image: 'https://images.unsplash.com/photo-1568074108423-9ff142472498?auto=format&fit=crop&w=900&q=80'
      }
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Clay Core Formation',
        duration: '3 Days',
        description: 'Riverbed mud mixed with paddy husk is hand-shaped to form the inner anatomical core of Lord Ganesha.',
        image: 'https://images.unsplash.com/photo-1568074108423-9ff142472498?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Bamboo Sculpting Spatulas'
      },
      {
        stepNumber: 2,
        title: 'Beeswax Wire Threading',
        duration: '5 Days',
        description: 'Forest beeswax softened with damar resin is pressed into thin noodles to detail Ganesha’s crown, ornaments, and trunk.',
        image: 'https://images.unsplash.com/photo-1567878673047-0451c851056e?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Brass Piston Extruder (Pichki)'
      },
      {
        stepNumber: 3,
        title: 'Outer Mould Application',
        duration: '7 Days',
        description: 'Successive coatings of clay and fine sand envelope the model, creating channels for the melted wax to escape.',
        image: 'https://images.unsplash.com/photo-1568074108423-9ff142472498?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Ant-Hill Silt & Muslin Reinforcements'
      },
      {
        stepNumber: 4,
        title: 'Lost-Wax Smelt & Casting',
        duration: '12 Hours',
        description: 'Crucibles filled with virgin copper, tin, and zinc alloys are brought to white heat, pouring molten metal into the hollow void.',
        image: 'https://images.unsplash.com/photo-1567591370504-80142b28f1c1?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Ground Pit Furnace & Graphite Crucible'
      },
      {
        stepNumber: 5,
        title: 'Chiseling & Antique Patina',
        duration: '2 Days',
        description: 'The baked clay shell is gently broken. The bronze Ganesha is filed, chiseled, and rubbed with tamarind water for golden luster.',
        image: 'https://images.unsplash.com/photo-1567878673047-0451c851056e?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Steel Chisels & Tamarind Polishing Cloth'
      }
    ],
    heritageTools: [
      { name: 'Pichki (पिचकी)', description: 'Traditional brass piston device used to hand-extrude fine beeswax threads.' },
      { name: 'Kohl-Bhati (कोयला भट्टी)', description: 'Ground pit furnace fueled with sal wood charcoal reaching 1150°C.' },
      { name: 'Chheni (छेनी)', description: 'Hand-forged steel cold chisels for fine facial features and sacred eyes.' },
      { name: 'Sandasi (संडासी)', description: 'Long-handled blacksmith tongs used to pour white-hot molten crucibles.' }
    ],
    badges: [
      {
        type: 'identity',
        label: 'Identity Verified',
        badgeCode: 'ID_VERIFIED',
        description: 'Artisan identity and local studio address verified via Government ID and active bank IFSC settlement checks.',
        verifiedAt: '2024-02-10',
        verifiedBy: 'Hasta Trust Cell',
        evidenceItems: ['Voter ID Card', 'Bastar District Artisan Card', 'Bank Passbook KYC']
      },
      {
        type: 'craftsmanship',
        label: 'Craftsmanship Verified',
        badgeCode: 'CRAFT_VERIFIED',
        description: 'Verified pure brass bell-metal alloy melted in charcoal furnace; zero industrial die-cast replicas.',
        verifiedAt: '2024-02-25',
        verifiedBy: 'Hasta Craft Quality Team',
        evidenceItems: ['Clay Core & Wax Thread Inspection', 'Open Fire Melting Video', 'Hand Finishing Audit']
      },
      {
        type: 'curated',
        label: 'Verified by Hasta',
        badgeCode: 'HASTA_VERIFIED',
        description: 'Exclusive, signed architectural pieces curated for contemporary Indian luxury spaces.',
        verifiedAt: '2024-03-05',
        verifiedBy: 'Hasta Curatorial Board',
        evidenceItems: ['Metallurgical Purity Certificate', 'Anti-Tarnish Patina Seal']
      }
    ]
  },
  {
    id: 'artisan-3',
    name: 'Master Ghulam Mohiuddin & Kuppuswamy Mudaliar',
    hindiName: 'मास्टर गुलाम मोहीउद्दीन एवं कुप्पुस्वामी मुदलियार',
    studioName: 'Royal Pit Loom Silk & Pashmina Guild',
    craft: 'Kanchipuram Pure Zari Silk & Sozni Handloom Weaving',
    hindiCraft: 'कांचीपुरम शुद्ध ज़री सिल्क एवं पश्मीना हथकरघा',
    region: 'Kanchipuram & Old Srinagar',
    state: 'Tamil Nadu & Kashmir',
    experienceYears: 36,
    profileImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    workshopImages: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=900&q=80'
    ],
    story: 'Weaving heirloom textiles on centuries-old wooden pit looms. The master weavers use certified pure mulberry silk threads intertwined with silver zari dipped in 24K gold, producing heavy, lustrous temple borders that require two weavers seated side-by-side using the Korvai 3-shuttle interlocking technique.',
    hindiStory: 'लकड़ी के पारंपरिक गड्ढा-करघों पर शुद्ध रेशम और सोने-चांदी की असली ज़री से कांचीपुरम की भव्य साड़ियां और पश्मीना वस्त्र बुनते हैं।',
    lineage: 'Kanchi Temple Weaver Guild (5th Generation)',
    awards: ['National Award for Handloom Excellence 2011', 'Sant Kabir Master Weaver 2019'],
    bankVerified: true,
    identityVerified: true,
    rating: 5.0,
    completedOrdersCount: 38,
    studioMoments: [
      {
        timeOfDay: '07:00 AM • Morning',
        title: 'Winding Golden Zari Bobbins',
        caption: 'Hand-spinning pure silver wire wrapped around silk core before setting the loom warp.',
        image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '11:30 AM • Midday',
        title: 'The Korvai 3-Shuttle Dance',
        caption: 'Two master weavers working in synchrony to lock the temple spires of the pallu with the body.',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '03:00 PM • Afternoon',
        title: 'Beating the Teak Batten',
        caption: 'Rhythmically driving home 120 picks per inch for a heavy drape that lasts generations.',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '06:00 PM • Evening',
        title: 'Silk Luster Inspection',
        caption: 'Inspecting the rich peacock feather sheen under natural twilight in the weaving courtyard.',
        image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=900&q=80'
      }
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Mulberry Silk Degumming & Natural Dye',
        duration: '4 Days',
        description: 'Raw silk skeins are boiled in soap-nut water and dyed with madder root, lac, and turmeric.',
        image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Copper Dye Vats & Bamboo Stirs'
      },
      {
        stepNumber: 2,
        title: 'Warp Setting & Reed Drafting',
        duration: '3 Days',
        description: 'Threading 4,800 silk ends through fine brass reed eyes for immaculate weave tension.',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Pit Loom Wooden Harness'
      },
      {
        stepNumber: 3,
        title: 'Interlocking Korvai Weave',
        duration: '18 Days',
        description: 'Three flying shuttles pass simultaneously to create contrasting solid borders without weft overlap.',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Rosewood Flying Shuttles'
      },
      {
        stepNumber: 4,
        title: 'Real Zari Jacquard Embossing',
        duration: '6 Days',
        description: 'Woven with certified Surat silver zari gilded in 24K pure gold for iconic peacock and lotus motifs.',
        image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Hand-punched Adai Design Cards'
      },
      {
        stepNumber: 5,
        title: 'Silk Mark & The Seal Verification',
        duration: 'Final Stage',
        description: 'Burn-test purity certification, Silk Mark India holographic tagging, and tamper-proof cedar casing.',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Certified Silk Testing Apparatus'
      }
    ],
    heritageTools: [
      { name: 'Kuzhi Thari (कुझी थारी)', description: 'Traditional sunken pit loom that keeps silk supple through natural subterranean humidity.' },
      { name: 'Naada (नाडा)', description: 'Polished teakwood flying shuttles weighted with lead slugs for precision traverse.' },
      { name: 'Adai (अडाई)', description: 'Intricate cotton-cord harness controlling temple spires and figurative borders.' },
      { name: 'Charkha (चरखा)', description: 'Hand-operated spindle to unwind delicate pure silver zari skeins without snapping.' }
    ],
    badges: [
      {
        type: 'identity',
        label: 'Identity Verified',
        badgeCode: 'ID_VERIFIED',
        description: 'Artisan identity and local studio address verified via Government ID and active bank IFSC settlement checks.',
        verifiedAt: '2024-01-15',
        verifiedBy: 'Hasta Trust Cell',
        evidenceItems: ['GI Kashmir Weaver Registration', 'Aadhaar Card', 'SBI Payout Account Verified']
      },
      {
        type: 'craftsmanship',
        label: 'Craftsmanship Verified',
        badgeCode: 'CRAFT_VERIFIED',
        description: 'Pure 100% cashmere micron laboratory analysis and hand-spun wooden needle pit loom verification.',
        verifiedAt: '2024-02-01',
        verifiedBy: 'Hasta Craft Quality Team',
        evidenceItems: ['Craft Development Institute GI Mark Lab Test', 'Handloom Inspection Report']
      },
      {
        type: 'curated',
        label: 'Verified by Hasta',
        badgeCode: 'HASTA_VERIFIED',
        description: 'Museum-grade collector grade Pashmina textiles curated for HNI interiors.',
        verifiedAt: '2024-02-15',
        verifiedBy: 'Hasta Curatorial Board',
        evidenceItems: ['GI Registered Kashmir Pashmina Tag', 'Archival Cedar Wood Packaging Protocol']
      }
    ]
  },
  {
    id: 'artisan-4',
    name: 'Kalyan Joshi & Smt. Baua Devi',
    hindiName: 'कल्याण जोशी एवं श्रीमती बौआ देवी',
    studioName: 'Geet-Govind Chitrakala & Mithila Heritage Studio',
    craft: 'Sacred Pichwai, Madhubani Folk Art & Pattachitra',
    hindiCraft: 'पिछवाई, मधुबनी एवं पारंपरिक भारतीय चित्रकला',
    region: 'Nathdwara & Madhubani',
    state: 'Rajasthan & Bihar',
    experienceYears: 32,
    profileImage: 'https://images.unsplash.com/photo-1523827449357-10a2882155b6?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    workshopImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=900&q=80'
    ],
    story: 'Preserving the devotional painting traditions of India. Working with river-stone ground pigments—conch shell white, lapis lazuli indigo, raw cinnabar red, and pure 24-karat gold leaf. Their canvases celebrate sacred cows, lotus ponds, and the mythological Tree of Life, drafted freehand with bamboo reeds and fine camel hair without synthetic dyes.',
    hindiStory: 'शंख की सफेदी, लाजवर्द के नीले रंग, शुद्ध हिंगुल और 24 कैरेट असली सोने के पत्तर से भगवान श्रीनाथजी की पिछवाई एवं मधुबनी की अनूठी लोक चित्रकला तैयार करते हैं।',
    lineage: 'Pushtimarg Temple Chitrakar Lineage',
    awards: ['National Award for Master Craftsmen 2012', 'Padma Shri Nominee for Folk Arts'],
    bankVerified: true,
    identityVerified: true,
    rating: 4.97,
    completedOrdersCount: 62,
    studioMoments: [
      {
        timeOfDay: '06:00 AM • Dawn',
        title: 'Stone Mortar Pigment Grinding',
        caption: 'Grinding raw cinnabar (Hingula) and malachite green with gum arabic on wet granite.',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '10:00 AM • Morning',
        title: 'Khadi Starch Priming',
        caption: 'Treating handwoven khadi cotton with tamarind seed extract and chalk paste for a smooth tooth.',
        image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '02:00 PM • Afternoon',
        title: 'Bamboo Reed & Fine Lining',
        caption: 'Inking the sacred lotus pond and dancing peacocks directly with split bamboo reeds.',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80'
      },
      {
        timeOfDay: '05:30 PM • Dusk',
        title: '24K Gold Leaf Agate Burnishing',
        caption: 'Pressing pure gold foil onto ornaments and burnishing with polished agate stone for permanent brilliance.',
        image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=900&q=80'
      }
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Organic Fabric Priming',
        duration: '3 Days',
        description: 'Khadi cotton or handmade paper is bathed in tamarind seed starch and buffed with polished conch shells.',
        image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Conch Shell (Shankha) Polishing Burnisher'
      },
      {
        stepNumber: 2,
        title: 'Natural Pigment Alchemy',
        duration: '4 Days',
        description: 'Haritala yellow stone, lapis lazuli, Hingula cinnabar, and cow dung soot are ground with Acacia babool gum.',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Granite Mortar & Pestle (Sil-Batta)'
      },
      {
        stepNumber: 3,
        title: 'Freehand Sacred Outlining',
        duration: '8 Days',
        description: 'Drawing sacred figures, sacred cows, and forest foliage without pencil guides, using bamboo reeds.',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Hand-Cut Bamboo Pens (Kalam)'
      },
      {
        stepNumber: 4,
        title: '24-Karat Real Gold Leaf Gilding',
        duration: '5 Days',
        description: 'Pure 24K gold leaf is carefully floated onto wet gum and burnished using a precious agate tooth.',
        image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Agate Stone Burnisher'
      },
      {
        stepNumber: 5,
        title: 'Archival Inspection & Museum Framing',
        duration: 'Final Stage',
        description: 'Sealed with pine resin, certified 100% natural mineral pigments, and mounted in bespoke teakwood frames.',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
        toolUsed: 'Archival Museum UV Glass Casing'
      }
    ],
    heritageTools: [
      { name: 'Kalam (कलम)', description: 'Chiseled wild bamboo reed for unbroken, razor-sharp Madhubani borders.' },
      { name: 'Sil-Batta (सिल-बट्टा)', description: 'Riverbed stone slab used to grind cinnabar, orpiment, and lapis pigments.' },
      { name: 'Shankha (शंख)', description: 'Smooth sea conch used to burnish primed khadi cloth to marble smoothness.' },
      { name: 'Hakik Pathar (हकीक पत्थर)', description: 'Smooth agate stone burnisher to bring gold leaf to a gleaming mirror shine.' }
    ],
    badges: [
      {
        type: 'identity',
        label: 'Identity Verified',
        badgeCode: 'ID_VERIFIED',
        description: 'Artisan identity and local studio address verified via Government ID and active bank IFSC settlement checks.',
        verifiedAt: '2024-04-10',
        verifiedBy: 'Hasta Trust Cell',
        evidenceItems: ['Nathdwara Temple Artist Record', 'Pehchan ID Card', 'Bank KYC']
      },
      {
        type: 'craftsmanship',
        label: 'Craftsmanship Verified',
        badgeCode: 'CRAFT_VERIFIED',
        description: 'Verified 100% natural mineral and plant pigments; zero chemical acrylic or digital printing.',
        verifiedAt: '2024-04-20',
        verifiedBy: 'Hasta Craft Quality Team',
        evidenceItems: ['Pigment Stone Grinding Audit', 'Silk Cloth Preparation Verification', 'Process Video']
      },
      {
        type: 'curated',
        label: 'Verified by Hasta',
        badgeCode: 'HASTA_VERIFIED',
        description: 'Curated for archival permanence and museum-standard bespoke framing.',
        verifiedAt: '2024-05-01',
        verifiedBy: 'Hasta Curatorial Board',
        evidenceItems: ['Organic Khadi GSM Certification', 'Natural Gum Archival Guarantee']
      }
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Lord Ganesha in Lost-Wax Cast Bell Metal',
    artisanId: 'artisan-2',
    artisanName: 'Devendra Kashyap & Somnath Karmakar',
    artisanLocation: 'Bastar, Chhattisgarh',
    category: 'sculptures_pottery',
    categoryLabel: 'Sacred Idols & Bronzes',
    craftTechnique: 'Lost-Wax Bell Metal Casting (Dhokra)',
    materials: ['Pure Brass & Bell Metal', 'Wild Forest Beeswax', 'Riverbed Clay Core', 'Tamarind Luster Polish'],
    dimensions: {
      heightCm: 36,
      widthCm: 22,
      depthCm: 18,
      unit: 'cm'
    },
    weightKg: 4.8,
    price: 18500,
    madeToOrder: true,
    productionLeadDays: 14,
    dispatchLeadDays: 2,
    stockCount: 2,
    images: [
      'https://images.unsplash.com/photo-1567591370504-80142b28f1c1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567878673047-0451c851056e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568074108423-9ff142472498?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An iconic representation of Lord Ganesha hand-cast using the ancient 4,000-year-old lost-wax (Dhokra) technique. Every coil on Ganesha’s sacred crown, trunk, and modak is individually hand-wound with beeswax noodles before being encased in river silt and smelted in an open fire pit.',
    makingProcessBrief: 'Hand-sculpted in beeswax strings over a cured clay core, enveloped in river silt moulds, dried in the shade for seven days, and cast by pouring white-hot 1100°C molten bell metal.',
    careInstructions: [
      'Dust with a dry soft bristle camel-hair brush.',
      'Wipe periodically with a drop of virgin coconut oil or brass cleaner for warm golden luster.',
      'Never submerge in synthetic detergents or acidic fluids.'
    ],
    customizationAvailable: true,
    customizationOptions: ['Custom deity dimensions up to 60cm', 'Blessing Mudra posture adjustment', 'Antique verdigris or polished golden finish'],
    featured: true
  },
  {
    id: 'prod-2',
    name: 'Shreenathji Sanctum Lotus Pichwai with 24K Gold Leaf',
    artisanId: 'artisan-4',
    artisanName: 'Kalyan Joshi & Smt. Baua Devi',
    artisanLocation: 'Nathdwara, Rajasthan',
    category: 'wall_art',
    categoryLabel: 'Heritage Indian Paintings',
    craftTechnique: 'Stone-Pigment Pichwai on Khadi Cotton',
    materials: ['Organic Handwoven Khadi', '24-Karat Real Gold Leaf', 'Natural Conch White', 'Lapis Lazuli Indigo', 'Haritala Yellow'],
    dimensions: {
      heightCm: 110,
      widthCm: 85,
      depthCm: 4,
      unit: 'cm'
    },
    weightKg: 2.6,
    price: 32000,
    madeToOrder: true,
    productionLeadDays: 21,
    dispatchLeadDays: 3,
    stockCount: 1,
    images: [
      'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1641633593415-378819228d97?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An architectural devotional painting venerating Lord Shreenathji amidst blooming Yamuna lotuses and holy cows. Hand-painted with stone pigments ground on granite slabs and detailed with genuine 24-karat gold leaf burnished using agate stones on starched khadi canvas.',
    makingProcessBrief: 'Khadi cloth is treated with tamarind seed paste, drafted freehand with natural ink, filled with multi-layered mineral pigments, and highlighted with 24K pure gold leaf foil.',
    careInstructions: [
      'Framed behind UV museum-grade anti-reflective glass.',
      'Keep away from high humidity and direct scorching sun rays.',
      'Dust exterior wooden frame with a clean microfibre cloth.'
    ],
    customizationAvailable: true,
    customizationOptions: ['Custom sanctum border motifs', 'Custom large scale foyer sizing', 'Included hand-carved teakwood frame'],
    featured: true
  },
  {
    id: 'prod-3',
    name: 'Peacock & Tree of Life Madhubani Heritage Canvas',
    artisanId: 'artisan-4',
    artisanName: 'Kalyan Joshi & Smt. Baua Devi',
    artisanLocation: 'Madhubani, Bihar',
    category: 'wall_art',
    categoryLabel: 'Heritage Indian Paintings',
    craftTechnique: 'Natural Dye Madhubani on Handmade Paper',
    materials: ['Cow-Dung Treated Handmade Paper', 'Natural Indigo', 'Turmeric Yellow', 'Kajjal Lampblack', 'Acacia Gum'],
    dimensions: {
      heightCm: 75,
      widthCm: 100,
      depthCm: 3,
      unit: 'cm'
    },
    weightKg: 1.8,
    price: 14200,
    madeToOrder: false,
    productionLeadDays: 0,
    dispatchLeadDays: 2,
    stockCount: 3,
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A celebrated masterpiece of Mithila folk art celebrating harmony in nature. Features twin dancing peacocks perched on the sacred Tree of Life, drawn entirely with sharpened bamboo reeds and filled with plant juices, turmeric, and lamp soot on sun-dried paper.',
    makingProcessBrief: 'Handmade paper is primed with cow-dung water wash for sacred purity and anti-insect resistance, inked with bamboo nibs, and shaded by hand with natural herbal pigments.',
    careInstructions: [
      'Store or display framed under glass away from dampness.',
      'Wipe outer glass with dry cloth only.'
    ],
    customizationAvailable: true,
    customizationOptions: ['Custom dimension scaling', 'Fish & Kohbar marriage motifs', 'Teakwood floating frame option'],
    featured: true
  },
  {
    id: 'prod-4',
    name: 'Royal Cobalt Persian Urn (Surahi)',
    artisanId: 'artisan-1',
    artisanName: 'Bhanu Prajapati',
    artisanLocation: 'Jaipur, Rajasthan',
    category: 'furniture_decor',
    categoryLabel: 'Blue Pottery & Decor',
    craftTechnique: 'Quartz-Dough Blue Pottery',
    materials: ['Ground Quartz', 'Glass Cullet', 'Fullers Earth', 'Natural Cobalt Oxide Pigment', 'Lead-Free Borax Glaze'],
    dimensions: {
      heightCm: 42,
      widthCm: 24,
      depthCm: 24,
      unit: 'cm'
    },
    weightKg: 3.4,
    price: 14500,
    madeToOrder: true,
    productionLeadDays: 14,
    dispatchLeadDays: 2,
    stockCount: 3,
    images: [
      'https://images.unsplash.com/photo-1672252508024-c80ac06f960c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An architectural centerpiece inspired by 17th-century Jaipur court vessels. Crafted without clay from an ancient Egyptian quartz paste, this urn is painted with natural cobalt oxide and copper blues, featuring traditional floral arabesques and Persian palmettes.',
    makingProcessBrief: 'Hand-pressed into moulds from a paste of crushed quartz and gum, dried in the Rajasthani sun for 48 hours, delicately painted with squirrel hair brushes, glazed with lead-free glass flux, and fired once at 800°C.',
    careInstructions: [
      'Wipe with a soft, dry microfibre cloth.',
      'Not suitable for boiling liquids or dishwashers.',
      'Place on stable surfaces away from direct sharp impact.'
    ],
    customizationAvailable: true,
    customizationOptions: ['Custom Base Engraving', 'Cobalt-only or Turquoise-only palette', 'Height scaling (30cm to 60cm)'],
    featured: true
  },
  {
    id: 'prod-5',
    name: 'Pure Mulberry Zari Kanchipuram Brocade Saree',
    artisanId: 'artisan-3',
    artisanName: 'Master Ghulam Mohiuddin & Kuppuswamy Mudaliar',
    artisanLocation: 'Kanchipuram, Tamil Nadu',
    category: 'textiles_furnishings',
    categoryLabel: 'Royal Handlooms & Textiles',
    craftTechnique: 'Traditional 3-Shuttle Pit Loom Weaving',
    materials: ['100% Certified Mulberry Silk', 'Pure Silver Zari Dipped in 24K Gold', 'Natural Madder & Cochineal Dyes'],
    dimensions: {
      heightCm: 115,
      widthCm: 550,
      unit: 'cm'
    },
    weightKg: 0.95,
    price: 28500,
    madeToOrder: true,
    productionLeadDays: 18,
    dispatchLeadDays: 2,
    stockCount: 2,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A regal royal bridal weave hailing from the temple city of Kanchipuram. Woven on traditional pit looms by two master weavers simultaneously using the interlocking Korvai technique, with heavy pure silver and 24K gold dipped zari depicting sacred peacocks (Mayil) and temple gopurams.',
    makingProcessBrief: 'Pure silk warp and weft hand-threaded on timber pit looms. Contrasting temple borders locked with 3 shuttles and woven row by row over 18 days.',
    careInstructions: [
      'Dry clean only by certified luxury fabric caretakers.',
      'Store wrapped in unbleached pure cotton or muslin fabric with dried neem leaves.',
      'Refold every 6 months along alternate creases to preserve zari fibers.'
    ],
    customizationAvailable: true,
    customizationOptions: ['Custom blouse piece zari border weave', 'Custom pallu family insignia motif'],
    featured: true
  },
  {
    id: 'prod-6',
    name: 'Hand-Chiseled Sheesham Wood Jali Temple Screen',
    artisanId: 'artisan-1',
    artisanName: 'Bhanu Prajapati',
    artisanLocation: 'Saharanpur, Uttar Pradesh',
    category: 'furniture_decor',
    categoryLabel: 'Handmade Furniture & Decor',
    craftTechnique: 'Saharanpur Openwork Floral Trellis Carving',
    materials: ['Single-Block Seasoned Sheesham Wood', 'Organic Mustard Oil Finish', 'Brass Hardware Pins'],
    dimensions: {
      heightCm: 180,
      widthCm: 120,
      depthCm: 4,
      unit: 'cm'
    },
    weightKg: 14.5,
    price: 22500,
    madeToOrder: true,
    productionLeadDays: 24,
    dispatchLeadDays: 4,
    stockCount: 1,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1672215060136-eaa32b1a3c80?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1659397946238-2d99792b3c0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Inspired by the historic Mughal and Rajput palace jalis. Chiseled by hand from seasoned dense Indian Sheesham rosewood, featuring geometric fretwork and flowering vines that filter ambient light into hypnotic architectural patterns.',
    makingProcessBrief: 'Wood seasoned for 12 months, hand-traced with geometric divider compasses, and pierced with hand chisels before natural oil hand-rubbing.',
    careInstructions: [
      'Wipe with dry cotton cloth.',
      'Apply pure mustard or linseed oil once a year to nourish natural timber grain.'
    ],
    customizationAvailable: true,
    customizationOptions: ['Triptych 3-panel folding screen', 'Custom architectural partition sizing up to 2.4 meters'],
    featured: false
  },
  {
    id: 'prod-7',
    name: 'Nritya Ganesha Sacred Bronze Temple Sculpture',
    artisanId: 'artisan-2',
    artisanName: 'Devendra Kashyap & Somnath Karmakar',
    artisanLocation: 'Bastar, Chhattisgarh',
    category: 'sculptures_pottery',
    categoryLabel: 'Sacred Idols & Bronzes',
    craftTechnique: 'Swamimalai & Bastar Bronze Casting',
    materials: ['Panchaloha 5-Metal Alloy', 'Natural Beeswax Filigree', 'Ant-Hill Silt Mould'],
    dimensions: {
      heightCm: 45,
      widthCm: 28,
      depthCm: 20,
      unit: 'cm'
    },
    weightKg: 7.2,
    price: 26000,
    madeToOrder: true,
    productionLeadDays: 20,
    dispatchLeadDays: 3,
    stockCount: 1,
    images: [
      'https://images.unsplash.com/photo-1567878673047-0451c851056e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567591370504-80142b28f1c1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568074108423-9ff142472498?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Depicting Lord Ganesha in the ecstatic cosmic dance of joyous wisdom. Crafted according to classical Shilpa Shastra proportions, with one leg raised, holding the broken tusk, battle-axe, and sweet modak. An auspicious masterwork for home entryways and sacred altars.',
    makingProcessBrief: 'Lost-wax cast using forest honey-wax wires over clay core, cast in sacred Panchaloha bell-metal alloy, and hand-chiseled with devotional precision.',
    careInstructions: [
      'Clean with lemon wedge and dry cloth for traditional temple shine, or leave to age gracefully into natural deep bronze patina.'
    ],
    customizationAvailable: true,
    customizationOptions: ['Four-armed or eight-armed variant', 'Custom prabhavali aureole arch'],
    featured: true
  },
  {
    id: 'prod-8',
    name: 'Dashavatara Palm Leaf Scroll (Tala Pattachitra)',
    artisanId: 'artisan-4',
    artisanName: 'Kalyan Joshi & Smt. Baua Devi',
    artisanLocation: 'Raghurajpur, Odisha',
    category: 'wall_art',
    categoryLabel: 'Heritage Indian Paintings',
    craftTechnique: 'Classical Pattachitra with Mineral Pigments',
    materials: ['Sun-Cured Dried Palm Leaves (Tala)', 'Natural Lampblack', 'Turmeric Infusion', 'Cotton Thread Binding'],
    dimensions: {
      heightCm: 40,
      widthCm: 95,
      depthCm: 2,
      unit: 'cm'
    },
    weightKg: 0.8,
    price: 19800,
    madeToOrder: false,
    productionLeadDays: 0,
    dispatchLeadDays: 2,
    stockCount: 2,
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An ancient palm-leaf manuscript scroll portraying the Dashavatara (Ten Avatars of Lord Vishnu). Cured palm leaves are etched with sharp iron styluses, rubbed with organic soot to reveal fine miniature details, and bound with silk thread to open like a ceremonial fan.',
    makingProcessBrief: 'Palm leaves soaked in turmeric water, dried in shade, engraved with iron stylus without ink, and smeared with bean leaf juice and lampblack.',
    careInstructions: [
      'Store in dry ambient conditions away from water.',
      'Mount floating inside shadowbox glass frame.'
    ],
    customizationAvailable: true,
    customizationOptions: ['Specific deity narratives (Krishna Leela or Ramayana)', 'Folding accordion or horizontal scroll mount'],
    featured: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'HST-2024-8841',
    createdAt: '2024-10-18T14:32:00Z',
    buyerName: 'Ananya Singhania',
    buyerEmail: 'ananya.singhania@gmail.com',
    buyerPhone: '+91 98201 44590',
    buyerCity: 'Mumbai',
    shippingAddress: {
      street: '14B, Samudra Mahal, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400018'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Lord Ganesha in Lost-Wax Cast Bell Metal
        quantity: 1,
        customizationNotes: 'Custom teakwood pedestal base requested'
      }
    ],
    productTotal: 18500,
    deliveryFee: 1500,
    taxes: 0,
    totalPaid: 20000,
    commissionRate: 0.10, // 10%
    commissionAmount: 1850,
    artisanPayoutAmount: 16650,
    status: 'qc_evidence_submitted', // Step 5: In pre-dispatch review!
    statusHistory: [
      {
        status: 'order_placed',
        timestamp: '2024-10-18T14:32:00Z',
        title: 'Order Placed & Escrow Initiated',
        description: 'Payment of ₹16,000 confirmed via Netbanking. Funds safely allocated in marketplace settlement gateway.',
        actor: 'buyer'
      },
      {
        status: 'payment_confirmed',
        timestamp: '2024-10-18T14:35:00Z',
        title: 'Payment Confirmed',
        description: 'Payment authorized by RBI-regulated marketplace provider.',
        actor: 'system'
      },
      {
        status: 'artisan_accepted',
        timestamp: '2024-10-19T09:15:00Z',
        title: 'Accepted by Devendra Kashyap & Somnath',
        description: 'Artisan guild acknowledged deity specifications and initiated beeswax mould sculpting.',
        actor: 'artisan'
      },
      {
        status: 'in_production',
        timestamp: '2024-10-21T11:00:00Z',
        title: 'Lost-Wax Mould Cast in Bell Metal',
        description: 'Lord Ganesha sculpted in wild forest wax strings, encased in silt, and poured at 1100°C in Bastar.',
        actor: 'artisan'
      },
      {
        status: 'qc_evidence_submitted',
        timestamp: '2024-11-01T16:20:00Z',
        title: 'Pre-Dispatch Quality Evidence Uploaded',
        description: 'Devendra Kashyap has photographed the cast bronze deity alongside tape measurements and mudra inspection. Ready for buyer inspection.',
        actor: 'artisan'
      }
    ],
    qcEvidence: {
      photos: [
        'https://images.unsplash.com/photo-1567591370504-80142b28f1c1?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1567878673047-0451c851056e?auto=format&fit=crop&w=900&q=80'
      ],
      artisanNotes: 'The sacred lost-wax cast bell metal Ganesha has emerged with pristine detail. All Mudras, broken tusk, and modak inspected. Dimensions verified at 36 cm height. Ritual brass polish applied.',
      submittedAt: '2024-11-01T16:20:00Z',
      verifiedByOps: true
    },
    payoutStatus: 'pending'
  },
  {
    id: 'ord-102',
    orderNumber: 'HST-2024-7932',
    createdAt: '2024-10-05T10:15:00Z',
    buyerName: 'Vikramaditya Rao',
    buyerEmail: 'vikram.rao@matrixcap.in',
    buyerPhone: '+91 98450 12876',
    buyerCity: 'Bengaluru',
    shippingAddress: {
      street: 'Villa 22, Windmills of Your Mind, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560066'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Shreenathji Sanctum Lotus Pichwai with 24K Gold Leaf
        quantity: 1
      }
    ],
    productTotal: 32000,
    deliveryFee: 1500,
    taxes: 0,
    totalPaid: 33500,
    commissionRate: 0.10,
    commissionAmount: 3200,
    artisanPayoutAmount: 28800,
    status: 'delivered', // In 48-hour delivery inspection window!
    statusHistory: [
      {
        status: 'order_placed',
        timestamp: '2024-10-05T10:15:00Z',
        title: 'Order Placed',
        description: 'Payment confirmed.',
        actor: 'buyer'
      },
      {
        status: 'artisan_accepted',
        timestamp: '2024-10-06T08:30:00Z',
        title: 'Accepted by Devendra Kashyap',
        description: 'Clay core moulding initiated in Kondagaon.',
        actor: 'artisan'
      },
      {
        status: 'in_production',
        timestamp: '2024-10-10T14:00:00Z',
        title: 'Lost-Wax Casting Completed',
        description: 'Molten bell-metal poured in furnace.',
        actor: 'artisan'
      },
      {
        status: 'qc_evidence_submitted',
        timestamp: '2024-10-24T18:00:00Z',
        title: 'QC Evidence Verified',
        description: 'Devendra submitted high-res video of bell-metal clarity and patina inspection.',
        actor: 'artisan'
      },
      {
        status: 'ready_for_dispatch',
        timestamp: '2024-10-25T11:00:00Z',
        title: 'Packed in Foam Enclosure & Wood Crate',
        description: 'Hasta white-glove packaging standard verified.',
        actor: 'ops'
      },
      {
        status: 'dispatched',
        timestamp: '2024-10-26T09:00:00Z',
        title: 'Dispatched via Blue Dart Apex Secure',
        description: 'Waybill #BD8892144 dispatched from Raipur hub.',
        actor: 'ops'
      },
      {
        status: 'delivered',
        timestamp: '2024-10-30T15:45:00Z',
        title: 'Delivered to Residence',
        description: 'Signed by buyer. 48-hour verification window active.',
        actor: 'system'
      }
    ],
    shippingDetails: {
      courierName: 'Blue Dart Apex Secure (Art Cargo)',
      trackingId: 'BD8892144',
      estimatedDelivery: '2024-10-30',
      dispatchTimestamp: '2024-10-26T09:00:00Z'
    },
    deliveryConfirmedAt: '2024-10-30T15:45:00Z',
    payoutStatus: 'held_48h'
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-501',
    enquiryNumber: 'ENQ-2024-109',
    createdAt: '2024-11-02T16:10:00Z',
    buyerName: 'Radhika Mehra (Architect, Studio Vistar)',
    buyerPhone: '+91 98110 55432',
    buyerCity: 'Delhi',
    productId: 'prod-3',
    productName: 'Dashavatara Scroll on Wild Tussar Silk',
    productImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
    artisanId: 'artisan-4',
    artisanName: 'Smt. Sita Devi & Shambhu Chitrakar',
    requestType: 'custom_dimensions',
    requirements: 'Client is an avid collector commissioning a centerpiece for their duplex double-height lobby in Golf Links, New Delhi. Requesting a 180cm x 240cm scroll focusing on the Dashavatara with antique teak wood framing.',
    targetBudget: 75000,
    status: 'quote_shared',
    quoteAmount: 68000,
    estimatedLeadDays: 45,
    opsNotes: 'Discussed with Shambhu Chitrakar; master silk weaver can weave extra wide tussar cloth. Confirmed lead time of 6 weeks.'
  },
  {
    id: 'enq-502',
    enquiryNumber: 'ENQ-2024-110',
    createdAt: '2024-11-04T09:30:00Z',
    buyerName: 'Karanvir Oberoi',
    buyerPhone: '+91 97690 33211',
    buyerCity: 'Mumbai',
    productId: 'prod-4',
    productName: 'Autumn Chinar Jamawar Handloom Pashmina Throw',
    productImage: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=400&q=80',
    artisanId: 'artisan-3',
    artisanName: 'Master Ghulam Mohiuddin',
    requestType: 'bespoke_piece',
    requirements: 'Requesting monogram embroidery of family initials in antique gold zari on the border for a 25th anniversary heirloom gift.',
    targetBudget: 60000,
    status: 'submitted'
  }
];

export const INITIAL_VERIFICATIONS: VerificationApplication[] = [
  {
    id: 'ver-801',
    artisanId: 'artisan-new-1',
    artisanName: 'Rameshwar Lal Suthar',
    craft: 'Tarkashi Brass Wire Inlay on Sheesham & Rosewood',
    location: 'Mainpura, Nagaur, Rajasthan',
    phone: '+91 94142 88912',
    aadhaarNumberMasked: 'XXXX-XXXX-6741',
    bankAccountVerified: true,
    workshopPhotos: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=600&q=80'
    ],
    processVideoThumbnail: 'https://images.unsplash.com/photo-1607867810523-d10955f2a8df?auto=format&fit=crop&w=600&q=80',
    toolsDescription: 'Traditional fine steel chisels, flattening hammers, and seasoned sheesham seasoned naturally for 3 years. Pure 1mm brass flattened wire hammered directly into wood kerfs.',
    sampleProducts: ['Intricate Peacock Tarkashi Mirror Frame', 'Hexagonal Brass-Wire Inlaid Jewelry Chest'],
    appliedDate: '2024-11-05',
    status: 'pending_review'
  }
];

export const INITIAL_DISPUTES: Dispute[] = [
  {
    id: 'disp-301',
    disputeNumber: 'DSP-2024-007',
    orderId: 'ord-099',
    orderNumber: 'HST-2024-6512',
    createdAt: '2024-10-28T12:00:00Z',
    buyerName: 'Priya Nambiar (Hyderabad)',
    artisanName: 'Bhanu Prajapati',
    issueType: 'damaged_in_transit',
    description: 'The outer cardboard crate arrived punctured on the corner. Upon unboxing, a 4cm hairline crack was found near the rim of the terracotta vessel.',
    buyerEvidenceImages: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'
    ],
    preDispatchQCImages: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'under_investigation',
    opsOwner: 'Hasta Trust Team'
  }
];
