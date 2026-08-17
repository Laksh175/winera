import path from 'path';
import fs from 'fs';
import multer from 'multer';
import Admin from '../models/Admin.js';
import Content from '../models/Content.js';
import jwt from 'jsonwebtoken';

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

export const upload = multer({ storage });

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'winera_secret_key_123', {
    expiresIn: '30d'
  });
};

export const defaultSiteData = {
  header: {
    brandName: "Winera International",
    tagline: "India's Trusted Game Zone Equipment Manufacturer",
    navLinks: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/#products" },
      { label: "About Us", href: "/about" },
      { label: "Arcade Game", href: "/arcade-game" },
      { label: "Projects", href: "/#projects" },
      { label: "Contact Us", href: "/#contact" }
    ],
    contactPhone: "+91 94289 89488",
    whatsappNumber: "+919428989488"
  },
  hero: {
    title: "India's Trusted Game Zone Equipment Manufacturer & Supplier",
    subtitle: "India's ROI-First Game Zone Developer from bowling alleys and trampoline parks to arcade zones and VR gaming & complete indoor amusement park setup, installed by our own team across 50+ cities.",
    ctaPrimaryText: "Plan Your Game Zone (WhatsApp)",
    ctaPrimaryLink: "https://wa.me/919428989488",
    ctaSecondaryText: "Explore Products",
    ctaSecondaryLink: "#products",
    heroImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80"
  },
  stats: [
    { number: "14+", label: "YEARS OF EXPERIENCE" },
    { number: "200+", label: "Project Completed" },
    { number: "98%", label: "Happy Clients" },
    { number: "50+", label: "Cities Covered" }
  ],
  aboutStats: {
    items: [
      { num: "14+", title: "YEARS OF EXPERIENCE" },
      { num: "200+", title: "Project Completed" },
      { num: "98%", title: "Happy Clients" },
      { num: "50+", title: "Cities Covered" }
    ]
  },
  clientLogos: [
    { name: "Rebounce", logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80" },
    { name: "Hulaboo", logoUrl: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?auto=format&fit=crop&w=300&q=80" },
    { name: "Nenopanda", logoUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300&q=80" },
    { name: "Fun Houze", logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80" }
  ],
  channelPartners: [
    { name: "Partner 1", logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80" },
    { name: "Partner 2", logoUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=80" },
    { name: "Partner 3", logoUrl: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=300&q=80" }
  ],
  builtProjects: [
    { name: "Hulaboo", city: "Surat", imageUrl: "" },
    { name: "Nenopanda", city: "Indore", imageUrl: "" },
    { name: "FizzyFox", city: "Nashik", imageUrl: "" },
    { name: "Playzonia", city: "Surat", imageUrl: "" }
  ],
  faqs: [
    { q: "1. How Do I Set Up A Game Zone In India?", a: "Start with a consultation and share your available space, budget, and location with our team. As a trusted gaming zone setup company in India, Winera International handles everything from ROI analysis and layout design to equipment selection, installation, and post-launch support across 50+ cities." },
    { q: "2. What Is The Cost Of A Game Zone Setup In India?", a: "The cost depends on your venue size, equipment mix (arcade, VR, bowling, softplay), and customization level. Winera provides transparent pricing and flexible packages tailored to your budget." },
    { q: "3. Does Winera Handle The Complete Game Zone Setup?", a: "Yes! We provide complete end-to-end turnkey solutions including 2D/3D layout planning, equipment manufacturing/sourcing, shipping, site installation, card system setup, and staff training." },
    { q: "4. Which Cities Does Winera Cover In India?", a: "We execute projects pan-India across 50+ major cities including Mumbai, Delhi NCR, Bangalore, Hyderabad, Surat, Indore, Ahmedabad, Pune, and Chennai." },
    { q: "5. What Makes Winera International Different From Other Game Zone Suppliers?", a: "We prioritize ROI consultancy first before selling equipment. Our safety-certified machines, dedicated technical support team, and custom venue branding give our clients higher profitability." },
    { q: "6. Do You Provide After-Sales Support After Installation?", a: "Absolutely. We offer lifetime technical support, spare parts assistance, machine maintenance guidance, and periodic software updates." }
  ],
  testimonials: [
    {
      founderImage: "",
      gameZoneName: "House of pepe",
      reviewerRole: "Founder & Business Owner, Larana Inc.",
      starRating: 5,
      youtubeVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      quote: "When we were planning our game zone, Winera International made the entire process effortless. One meeting was enough! They handled layout design to installation."
    },
    {
      founderImage: "",
      gameZoneName: "Hulaboo Family Fun Zone",
      reviewerRole: "Director & General Manager, Surat",
      starRating: 5,
      youtubeVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      quote: "Winera International exceeded our expectations! They guided us on ROI planning, equipment selection, and setup for our game zone in Surat."
    }
  ],
  about: {
    title: "About Winera International",
    subtitle: "Winera International Pvt. Ltd. is a dynamic force in the gaming and indoor amusement industry, headquartered in Surat, India.",
    description: "Our team calculates a complete ROI Blueprint for your space, covering projected footfall, revenue potential, and break-even timeline."
  },
  founder: {
    name: "Mr. Unnit Jogani",
    image: "",
    aboutDetails: "Mr. Unnit Jogani is the Founder & CEO of Winera International Pvt. Ltd., one of India's most trusted game zone equipment manufacturers and indoor amusement park solution providers.\n\nSince establishing Winera in Surat, Gujarat in 2014, Unnit has led the company's growth from a regional startup to a pan-India B2B leader with an uncompromising focus on quality, safety, and client satisfaction.",
    linkedinUrl: "https://linkedin.com",
    yearsOfExperience: "14+"
  },
  footer: {
    copyrightText: "© 2026 Winera International Pvt. Ltd. All Rights Reserved.",
    tagline: "India's Trusted Game Zone Equipment Manufacturer & Supplier"
  },
  arCategoriesData: {
  "Sports Simulators": [
    {
      "name": "Soccer Simulator",
      "img": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Penalty Shootout",
      "img": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Tennis Simulator",
      "img": "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Basketball",
      "img": "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Archery Simulator",
      "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Shooting Simulator",
      "img": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Cycling Simulator",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Skiing Simulator",
      "img": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Ski Simulator",
      "img": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Boxing Simulator",
      "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Running Simulator",
      "img": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Rowing Simulator",
      "img": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Curling Simulator",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Crazy Slingshot",
      "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Super Rolling Ball",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Dynamic Styling",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Motion Sensing Game",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Golf Simulator",
      "img": "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Golf Plus",
      "img": "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Smart Soccer Wall",
      "img": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Interactive Games": [
    {
      "name": "SAIO All-in-One 2.0",
      "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "SAIO (LED Version)",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Omniball LED Version",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Omniball",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Combat 6",
      "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Cyber Dunk Reality",
      "img": "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Running Wall",
      "img": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Curling",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Cyber AR Boxing",
      "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bike",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bikes — Luxe",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Rock Climbing",
      "img": "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magic Billiard",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Dynamic Kayaking",
      "img": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Billiards",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Whac-a-Mole on Wall",
      "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Wonder Wall",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Slide",
      "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Magic Swing",
      "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Music Wall",
      "img": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Legend Archery",
      "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Roll Action",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Particle Man",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Super Grid",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Laser Maze",
      "img": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Motion Master Console",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "AR & VR Experiences": [
    {
      "name": "AR Bumper Car",
      "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Garden",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bike",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bikes — Luxe",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Laser Shooting",
      "img": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "10M High Range High Accuracy Laser Shooting",
      "img": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Hunting Storm Realistic",
      "img": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Wireless Laser Tag",
      "img": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "7D Imax Cinema",
      "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Dynamic Cinema",
      "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Room",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Restaurant",
      "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AI Holographic Bot",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Fog Screen Machine",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Radar",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Interactive Floor & Walls": [
    {
      "name": "Magic Floor — Integrated",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magic Floor — Outdoor",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magic Floor — Indoor",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Active Game LED Floor",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Digital Display Wall",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Wonderful World",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magical Waterfall",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Wonder Wall",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Projection Lamp",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Projection Mapping Software",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Electronic Whiteboard",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Kids & Family Attractions": [
    {
      "name": "Interactive Trampoline",
      "img": "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Sandbox",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magic Egg Fort",
      "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Slide",
      "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Garden",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Gesture Interactive Book",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Draw2Life (Scan)",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Draw2Life (Screen)",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "GymBuster",
      "img": "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Fitness & Education": [
    {
      "name": "Gym Education Interactive Training System",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bike",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bikes — Luxe",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Rock Climbing",
      "img": "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Cyber AR Boxing",
      "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Combat 6",
      "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Roll Action",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Motion Master Console",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Bowling & Ball Games": [
    {
      "name": "Top Bowling",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Bowling",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Mini Bowling",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Bowling",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magic Billiard",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Billiards",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Super Rolling Ball",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Themed & Immersive Zones": [
    {
      "name": "Immersive Room",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Restaurant",
      "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Dynamic Cinema",
      "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "7D Imax Cinema",
      "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Themed Sports Bar",
      "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Whole Site Planning",
      "img": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Technology & Infrastructure": [
    {
      "name": "Projection Mapping Software",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AI Holographic Bot",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Electronic Whiteboard",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Fog Screen Machine",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Projection Lamp",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Radar",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Digital Display Wall",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Whole Site Planning",
      "img": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
    }
  ]
},
  bumpercarSeo: {
    pageTitle: "Bumper Car Manufacturer in India | Electric & Battery Cars | Winera International",
    metaDescription: "As a leading Bumper Car Manufacturer in India, Winera International Pvt Ltd crafts exhilarating, safe, and durable bumper cars that are a favorite at amusement parks."
  },
  vrRange: {
    title: "*Our VR Gaming* Machine Range",
    subtitle: "Every model in our VR gaming set is sourced from established global manufacturers and configured for sustained commercial operation.",
    items: [
      { title: "VR4 Seated", subtitle: "Multiplayer Ride", category: "ACTIVE SIMULATION", name: "VR Wings Experience", img: "/src/assets/vr-range-theater.png", status: "ONLINE", latency: "4ms", icon: "plane" },
      { title: "VR Wings", subtitle: "Immersive Flight", category: "FLIGHT SIMULATION", name: "VR Wings Flight Arena", img: "/src/assets/about-3.png", status: "ONLINE", latency: "2ms", icon: "users" },
      { title: "VR UFO 5 player", subtitle: "Multiplayer Ride", category: "THEATER SIMULATION", name: "VR UFO 5 Player Motion Pod", img: "/src/assets/arcade-hall.png", status: "ONLINE", latency: "5ms", icon: "radio" },
      { title: "VR UFO 4 player", subtitle: "Multiplayer Ride", category: "ARCADE SIMULATION", name: "VR UFO 4 Player Battle Station", img: "/src/assets/about-4.png", status: "ONLINE", latency: "3ms", icon: "gamepad" },
      { title: "VR Thunder Dual 360", subtitle: "Combat Station", category: "ACTION SIMULATION", name: "VR Thunder Dual 360 Platform", img: "/src/assets/cta-arcade.png", status: "ONLINE", latency: "4ms", icon: "zap" },
      { title: "VR 360 Egg Chair", subtitle: "Dual Seat Pod", category: "MOTION CINEMA", name: "VR 360 Egg Chair Simulator", img: "/src/assets/about-3.png", status: "ONLINE", latency: "3ms", icon: "sparkles" },
      { title: "VR Racing Motorbike", subtitle: "Speed Simulation", category: "RACING SIMULATION", name: "VR Moto Racing Simulator", img: "/src/assets/about-4.png", status: "ONLINE", latency: "2ms", icon: "flame" },
      { title: "VR Standing Arena", subtitle: "360 Platform", category: "ACTIVE SIMULATION", name: "VR Standing Flight Arena", img: "/src/assets/cta-arcade.png", status: "ONLINE", latency: "4ms", icon: "target" }
    ]
  }
};

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });

    if (!admin && username === 'admin' && password === 'admin123') {
      admin = await Admin.create({ username: 'admin', password: 'admin123' });
    }

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid admin username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContent = async (req, res) => {
  try {
    let contents = await Content.find({});

    // Auto-seed all default sections into MongoDB if empty
    if (contents.length === 0) {
      const seedEntries = Object.keys(defaultSiteData).map(sectionKey => ({
        sectionKey,
        data: defaultSiteData[sectionKey]
      }));
      await Content.insertMany(seedEntries);
      contents = await Content.find({});
    }

    const siteData = {};
    contents.forEach((item) => {
      siteData[item.sectionKey] = item.data;
    });

    res.json(siteData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContent = async (req, res) => {
  const { sectionKey, data } = req.body;

  if (!sectionKey || !data) {
    return res.status(400).json({ message: 'sectionKey and data are required' });
  }

  try {
    let content = await Content.findOne({ sectionKey });

    if (content) {
      content.data = data;
      await content.save();
    } else {
      content = await Content.create({ sectionKey, data });
    }

    res.json({ message: `Section '${sectionKey}' updated successfully`, content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.get('host');
  const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl, filename: req.file.filename });
};


