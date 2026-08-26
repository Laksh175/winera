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

export const defaultArcadeFaqs = [
  {
    q: "Where Can I Buy Arcade Game Machines In India?",
    a: "Winera International is a trusted arcade games manufacturer and supplier in India — supplying claw machines, redemption games, racing simulators, shooting games, and kiddy rides for malls, hotels, FECs, and amusement parks, with complete installation across 50+ cities by our own team."
  },
  {
    q: "Do You Supply Coin Operated Arcade Machines In India?",
    a: "Yes. Winera International supplies a wide range of coin operated arcade machines in India, card-based systems, and ticket redemption arcade machines, built for commercial environments such as malls, hotels, resorts, and family entertainment centres."
  },
  {
    q: "Can Winera International Set Up A Complete Arcade Game Zone Setup?",
    a: "Yes. We handle space planning, machine selection, delivery, installation, and staff training as one connected arcade game zone setup process, not separate transactions with different vendors."
  },
  {
    q: "What Happens If A Machine Breaks Down After Installation?",
    a: "Our own technicians handle servicing directly, with coverage across 50+ cities in India. You are not waiting on an overseas supplier or a disconnected logistics partner to respond."
  },
  {
    q: "Which Businesses Typically Install Arcade Game Machines In India?",
    a: "Malls, hotels, resorts, and family entertainment centres are the most common buyers of arcade machines."
  },
  {
    q: "How Long Does It Take To Install Arcade Machines?",
    a: "Installation timelines depend on the number of machines, your venue's readiness, and your location. We share an exact schedule as part of your quote, so you know precisely when your arcade zone will be ready."
  },
  {
    q: "What Is The Price Of Arcade Machines In India?",
    a: "Arcade machine pricing in India depends on the machine category, payment mechanism, and customisation level. Because Winera International sources directly at scale, our pricing avoids the markup typical of multi-layer resellers."
  },
  {
    q: "How Do I Get Started With Ordering Arcade Machines From Winera?",
    a: "Contact us via our website's contact form, WhatsApp, or call +91 94289 89488. Our team will recommend the right machine mix for your space and send a quote ASAP."
  },
  {
    q: "Which Arcade Games Give The Best ROI For FECs And Malls In India?",
    a: "Ticket redemption games, claw machines, and racing simulators consistently deliver the strongest revenue per square foot in Indian FECs and malls. Winera International helps you choose the right arcade game zone machine mix based on your specific footfall, floor size, and visitor demographic — not a generic recommendation."
  },
  {
    q: "What Is The Difference Between Coin-Operated And Card-Based Arcade Machines?",
    a: "Coin-operated arcade machines accept physical tokens and suit venues with casual walk-in visitors. Card-based systems use rechargeable cards — better for revenue tracking, reducing cash handling, and encouraging repeat visits through balance top-ups. Winera supplies both and advises on the right system for your venue."
  }
];

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
    {
      q: "How do I set up a game zone in India?",
      a: "Start with a consultation and share your available space, budget, and location with our team. As a trusted gaming zone setup company in India, Winera International handles everything from ROI analysis and layout design to equipment selection, installation, and post-launch support across 50+ cities."
    },
    {
      q: "What is the cost of a game zone setup in India?",
      a: "Game zone setup cost in India totally depends on the size of space, type of attractions, and level of customisation. As a direct game zone equipment supplier, Winera International provides a complete cost breakdown covering equipment, installation, and maintenance before you confirm any project. Contact our team for a quote specific to your venue."
    },
    {
      q: "Does Winera handle the complete game zone setup?",
      a: "Yes. As experienced game zone developers in India, we manage the entire project from concept to completion, space planning, equipment sourcing, layout design, installation, and after-sales support all handled by our own team, not third-party contractors."
    },
    {
      q: "Which cities does Winera cover in India?",
      a: "Winera International installs game zone equipment across 50+ cities in India — covering Tier-1 metros, Tier-2 cities, and emerging Tier-3 markets. Our own installation team reaches wherever your venue is located, without relying on local contractors."
    },
    {
      q: "What makes Winera International different from other game zone suppliers?",
      a: "Before recommending any equipment, we prepare a free ROI Blueprint for your specific venue covering projected footfall, revenue potential, and break-even timeline. Very few game zone suppliers in India offer this as a standard part of their process."
    },
    {
      q: "Do you provide after-sales support after installation?",
      a: "Yes. Our technical team provides ongoing maintenance, spare parts, and on-site support for all equipment we install available directly through our own team, not through agents or third-party service providers."
    },
    {
      q: "Can game zone equipment be customised for my venue's theme?",
      a: "Yes. Every game zone solution we deliver is designed around your specific space, theme, budget, and target audience from layout planning to equipment selection and visual design."
    },
    {
      q: "How do I get started with my game zone project?",
      a: "Contact us via our website's contact form, WhatsApp, or call +91 94289 89488. We're also available on social media."
    },
    {
      q: "Can Winera International help me plan my game zone from scratch?",
      a: "Yes, Winera International offers complete game zone planning support. From space planning and equipment selection to installation and staff training, we manage the entire project. Our “Plan Your Game Zone” service is specially designed for first-time entrepreneurs and existing businesses looking to add an entertainment zone."
    }
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
  amusementHero: {
    breadcrumbText: "Amusement Park",
    bgUrl: ""
  },
  amusementIntro: {
    title: "*Amusement Park Ride*<br/>Manufacturer in India",
    desc: "India's ROI-first amusement park partner rides and attractions sourced, installed, and serviced by our own team across 50+ cities.",
    buttonText: "Get Quote From Expert",
    buttonLink: "https://wa.me/919428989488",
    mainImgUrl: ""
  },
  amusementBanner: {
    title: "Complete Amusement Park<br/>*Setups, Built for Indian Venues*",
    paragraph1: "Winera International has been supplying and installing amusement park rides and attractions across India since 2014 — for theme parks, malls, resorts, and family entertainment centres in over 50 cities. We source every ride from established manufacturers, install it with our own team, and stay on for servicing after handover.",
    paragraph2: "From a few signature rides to a full park layout, we handle the whole project space planning, ride selection, installation, and after-sales support so you deal with one team from start to finish, not a chain of separate vendors.",
    imgUrl: ""
  },
  amusementOptions: {
    title: "*Rides & Attractions*<br/>We Supply",
    subtitle: "We Supply Many Types Of Rides So You Can Build The Right Experience For Your Space And Visitors.",
    items: [
      { boldText: "Thrill Rides", desc: "For Teens And Adults Chasing Excitement" },
      { boldText: "Family Rides", desc: "Gentler Attractions The Whole Family Can Enjoy Together" },
      { boldText: "Kids' Rides", desc: "Safe, Age-Appropriate Rides For Younger Visitors" },
      { boldText: "Classic Favourites", desc: "Proven, Time-Tested Crowd-Pullers" },
      { boldText: "Custom Attractions", desc: "Tailored To Your Theme And Space" }
    ],
    footerText: "Every Ride Comes With Strong Safety Belts, Automatic Sensors That Stop The Ride If Something Goes Wrong, And A Tough, Durable Build. We Test Each Ride On-Site Before Handing It Over To You.",
    topImgUrl: ""
  },
  amusementRoi: {
    title: "Before You Build,<br/>*Know What It Will Earn*",
    paragraph1: "Every Figure Is Calculated Around Your Land Size, Footfall Projection, And Target Visitor Demographic Not An Industry Average. Very Few Amusement Park Manufacturers In India Include This As A Standard Part Of Their Process. For Winera, It Is Where Every Project Begins.",
    paragraph2: "Most Amusement Park Equipment Suppliers In India Hand You A Catalogue And A Price List, Leaving The Financial Planning Entirely To You. As India's ROI-First Game Zone Developer, Winera International Works Differently. Before Recommending, Our Team Prepares A Complete ROI Report For Your Specific Venue Covering Equipment Cost, Projected Daily Visitor Capacity, Estimated Revenue, Maintenance Costs, And Break-Even Timeline.",
    buttonText: "Talk to an ROI Expert",
    buttonLink: "https://wa.me/919428989488",
    bottomImgUrl: ""
  },
  amusementFaqs: [
    {
      q: "What types of amusement park rides do you supply and install?",
      a: "We supply a complete range of amusement park attractions including thrill rides, family rides, kids' rides, bumper cars, Ferris wheels, carousel rides, and custom themed attractions engineered for indoor & outdoor venues."
    },
    {
      q: "Do you handle complete end-to-end park setup and installation?",
      a: "Yes! Winera International handles full turnkey project management — from space planning and layout design to ride sourcing, civil foundation guidance, structural assembly, safety testing, and final handover."
    },
    {
      q: "What safety standards and certifications do Winera amusement rides comply with?",
      a: "All our rides are built to international safety benchmarks. They feature reinforced structural steel, emergency automatic stop sensors, dual-lock safety harnesses/belts, and undergo rigorous load and performance testing prior to public operation."
    },
    {
      q: "Can Winera provide a venue-specific ROI and financial projection report?",
      a: "Absolutely. Before finalizing any purchase, our ROI experts prepare a comprehensive financial model detailing ride capacities, daily throughput, operational costs, estimated ticket revenue, and projected break-even timelines customized to your land size and city demographic."
    },
    {
      q: "What after-sales service and spare parts support do you offer?",
      a: "We maintain an in-house engineering and service team across 50+ Indian cities. We provide routine maintenance support, operator training, and stocked replacement spare parts to ensure zero extended downtime for your venue."
    }
  ],
  hypergridHero: {
    breadcrumbText: "Hypergrid",
    bgUrl: ""
  },
  hypergridIntro: {
    title: "*Interactive LED Hypergrid*<br/>Arena Manufacturer in India",
    desc: "Transform your venue into an immersive, active gaming arena with Winera's custom LED floor grid systems, real-time motion tracking, and high-margin active gaming attractions.",
    buttonText: "Get Quote From Expert",
    buttonLink: "https://wa.me/919428989488",
    mainImgUrl: ""
  },
  hypergridSpecs: {
    title: "*Technical* Specifications",
    buttonText: "Download Our Brochure",
    buttonLink: "https://wa.me/919428989488",
    bgUrl: "",
    rows: [
      { spec: "Players", details: "1 to 6 simultaneously" },
      { spec: "Game modes", details: "5+ repeatable modes" },
      { spec: "Attendant required", details: "No — fully self-operated" },
      { spec: "Minimum space required", details: "200 sq ft onwards" },
      { spec: "Expected lifespan", details: "8+ years — commercial grade" }
    ]
  },
  hypergridBanner: {
    title: "Complete Hypergrid Arena<br/>*Setups, Built for Indian Venues*",
    paragraph1: "Winera International designs, manufactures, and installs state-of-the-art Hypergrid active LED floor arenas across India. Featuring heavy-duty impact-resistant tempered glass, high-brightness LED matrix tiles, and integrated sound & light effects.",
    paragraph2: "From compact 100 sq ft boutique zones to massive 2,000+ sq ft multi-player competition arenas, we handle complete hardware assembly, game software installation, operator training, and maintenance.",
    imgUrl: ""
  },
  hypergridWhyWinera: {
    title: "Why Choose *Winera International*",
    cards: [
      { title: "Commercial-Grade Equipment", desc: "Made To Run Every Day In Busy Places Without Breaking Down." },
      { title: "Customized For Your Venue", desc: "We Set Up The Games, Levels, And Branding To Fit Your Space." },
      { title: "ROI Planning Before You Invest", desc: "We Show You The Cost And Profit Before You Spend Any Money." },
      { title: "Professional Installation", desc: "Our Own Team Comes And Sets Everything Up For You." },
      { title: "Operator Training Included", desc: "We Train Your Staff So They're Ready Before You Open." },
      { title: "Reliable After-Sales Support", desc: "We Fix, Update, And Service It Whenever You Need Help." }
    ]
  },
  hypergridRoi: {
    title: "Is Hypergrid a Smart<br/>*Investment for Your Venue?*",
    paragraph1: "Most interactive LED floor game suppliers quote a unit price and leave the business decision entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before confirming any Hypergrid order, our team prepares a complete ROI report for your specific venue — covering equipment cost, projected daily sessions, estimated revenue per session, maintenance costs, and break-even timeline.",
    paragraph2: "Every figure is calculated around your venue type, daily footfall, and target visitor demographic — not an industry average. Very few Hypergrid game suppliers in India include this as a standard part of their process. For Winera, it is where every project starts.",
    buttonText: "Talk to an ROI Expert",
    buttonLink: "https://wa.me/919428989488",
    imgUrl: ""
  },
  hypergridWhyUs: {
    title: "Why Choose *Winera International*",
    cards: [
      {
        title: "Full Turnkey Arena Setup",
        desc: "We handle space planning, floor levelling, matrix wiring, software installation, and live testing."
      },
      {
        title: "Heavy-Duty Tempered Glass",
        desc: "Anti-slip, high impact-resistant LED tiles built for high-footfall commercial active gaming zones."
      },
      {
        title: "Multi-Player Active Games",
        desc: "Includes classic floor lava, reaction matrix, team combat, and continuous software updates."
      },
      {
        title: "Tested & Certified Safe",
        desc: "Low-voltage DC powering, shock-absorbing subframe, and sealed waterproof LED modules."
      },
      {
        title: "Proven High ROI Footfall Driver",
        desc: "Hypergrid arenas generate massive social media buzz and repeat group bookings in malls and FECs."
      }
    ]
  },
  hypergridFaqs: [
    {
      question: "What is an Interactive LED Hypergrid Arena?",
      answer: "Hypergrid is an active gaming attraction featuring pressure-sensitive illuminated LED floor tiles. Players jump, step, and dodge on glowing grid cells to complete team challenges, score points, and avoid danger zones."
    },
    {
      question: "What minimum space is required to install a Hypergrid active gaming floor?",
      answer: "Hypergrid arenas are highly modular and can be configured for spaces starting as small as 150 sq ft up to 2,000+ sq ft competition arenas. We design custom matrix layouts tailored to your exact floor dimensions."
    },
    {
      question: "Is the illuminated glass floor durable enough for high footfall commercial use?",
      answer: "Yes! Our Hypergrid floor tiles are constructed using heavy-duty, anti-slip tempered glass engineered to withstand high impact, continuous jumping, and heavy commercial footfall in malls, FECs, and trampoline parks."
    },
    {
      question: "What game modes and software come included with the Hypergrid system?",
      answer: "Our Hypergrid systems come equipped with multi-player game modes including floor lava, memory matrix, speed reaction, team combat, and continuous automated software updates."
    },
    {
      question: "Do you offer complete installation and technical support across India?",
      answer: "Winera International provides complete end-to-end turnkey installation including civil floor leveling, LED matrix wiring, audio-visual sync setup, operator training, and 24/7 service support in over 50 cities across India."
    }
  ],
  hypergridCta: {
    yellowText: "NEED ANY",
    cyanText: "HYPERGRID CONSULTATIONS?",
    subtitle: "WE'RE READY TO GIVE ANSWERS TO YOUR QUESTIONS.",
    buttonText: "Talk to an ROI Expert",
    buttonLink: "https://wa.me/919428989488",
    bgUrl: ""
  },
  hypergridSeo: {
    pageTitle: "Interactive LED Hypergrid Arena Manufacturer in India | Winera International",
    metaDescription: "Winera International is India's leading manufacturer of Interactive LED Hypergrid active gaming arenas, offering high-ROI illuminated floor tile systems and turnkey game zone setups."
  },
  amusementCta: {
    yellowText: "NEED ANY",
    cyanText: "CONSULTATIONS?",
    subtitle: "WE'RE READY TO GIVE ANSWERS TO YOUR QUESTIONS.",
    buttonText: "Talk to an ROI Expert",
    buttonLink: "https://wa.me/919428989488",
    bgUrl: ""
  },
  amusementSeo: {
    pageTitle: "Amusement Park Equipment Manufacturer in India | Winera International",
    metaDescription: "As a premier Amusement Park Equipment Manufacturer in India, Winera International Pvt Ltd crafts thrilling, safe, and world-class amusement park rides and attractions."
  },
  amusementWhyUs: {
    title: "Why Choose *Winera International*",
    cards: [
      {
        title: "Full Project, Not Just Equipment",
        desc: "We Handle Everything From Layout To Installation, So You're Not Left Coordinating Vendors."
      },
      {
        title: "Right Attractions For Your Space",
        desc: "We Recommend Rides That Fit Your Land, Footfall, And Visitors Not A Catalogue Guess"
      },
      {
        title: "One Team, Zero Confusion",
        desc: "Sourcing, Installation, And Service Handled By Our Own Dedicated Team"
      },
      {
        title: "Ready To Open From Day One",
        desc: "Every Ride Is Tested On-Site Before Handover, So Opening Day Runs Smoothly"
      },
      {
        title: "We Know What Keeps Visitors Coming Back",
        desc: "Years Of Real Projects Tell Us Which Attractions Drive Repeat Footfall"
      }
    ],
    ctaText: "Get Free Consultation",
    ctaLink: "https://wa.me/919428989488"
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
  },
  hypergridHero: {
    bgUrl: "/src/assets/hypergrid-hero-bg.png",
    breadcrumbText: "Hypergrid"
  },
  hypergridIntro: {
    title: "*Hypergrid Game*<br/>Supplier in India",
    desc: "India's trusted Hypergrid game supplier commercial-grade interactive LED floor systems, installed and serviced by our own team across 50+ cities.",
    buttonText: "Get A Quote",
    buttonLink: "https://wa.me/919428989488",
    mainImgUrl: "/src/assets/hypergrid-supplier-collage.png"
  },
  hypergridBanner: {
    title: "Interactive LED Floor Games<br/>*for High-Footfall Venues*",
    paragraph1: "Winera International is a trusted Hypergrid game supplier in India, sourcing and installing commercial Hypergrid interactive LED floor systems for malls, family entertainment centres, hotels, schools, trampoline parks, and bowling alleys since 2014. Every Hypergrid unit we supply is sourced from established global manufacturers — configured specifically for sustained daily commercial use in high-footfall Indian venues.",
    paragraph2: "As a direct Hypergrid business partner, our own team manages the complete process from space assessment and product configuration to installation, software setup, and after-sales support. One team, zero third-party contractors, from order to opening day",
    imgUrl: "/src/assets/hypergrid-banner-img.png"
  },
  hypergridSpecs: {
    bgUrl: "/src/assets/hypergrid-specs-bg.png",
    title: "*Technical* Specifications",
    rows: [
      { spec: "Players", details: "1 to 6 simultaneously" },
      { spec: "Game modes", details: "5+ repeatable modes" },
      { spec: "Attendant required", details: "No — fully self-operated" },
      { spec: "Minimum space required", details: "200 sq ft onwards" },
      { spec: "Expected lifespan", details: "8+ years — commercial grade" }
    ],
    buttonText: "Download Our Brochure",
    buttonLink: "https://wa.me/919428989488"
  },
  hypergridWhyUs: {
    bgUrl: "/src/assets/hypergrid-why-us-bg.png",
    title: "*What Makes Hypergrid* the Right<br/>Choice for Your Venue",
    subtitle: "Every component in a Winera soft play structure is selected to perform reliably under heavy daily commercial use, not occasional play. Here is what goes into every build:",
    leftImgUrl: "/src/assets/AR-image.png",
    cards: [
      {
        title: "An Attraction That Draws a Crowd Without Marketing",
        desc: "Hypergrid's illuminated floor is visible from across a venue visitors stop, watch, and join without any promotion needed. The combination of moving lights, real-time competition, and full-body play creates a natural spectator effect that draws walk-in visitors throughout the day."
      },
      {
        title: "Every Visitor Has a Reason to Play",
        desc: "From a young child learning through colour-based games or a teenager competing for the top score, Hypergrid keeps players engaged with adjustable difficulty levels and multiple game modes. One attraction appeals to different age groups, helping your venue attract and entertain more visitors."
      },
      {
        title: "Revenue Without the Overhead",
        desc: "Visitors can start and play Hypergrid on their own without needing staff assistance. This helps reduce operating costs while generating consistent revenue, making it an ideal attraction for Indian FECs, malls, and hotels."
      }
    ]
  },
  hypergridRoi: {
    title: "Is Hypergrid a Smart<br/>*Investment for Your Venue?*",
    paragraph1: "Most interactive LED floor game suppliers quote a unit price and leave the business decision entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before confirming any Hypergrid order, our team prepares a complete ROI report for your specific venue — covering equipment cost, projected daily sessions, estimated revenue per session, maintenance costs, and break-even timeline.",
    paragraph2: "Every figure is calculated around your venue type, daily footfall, and target visitor demographic — not an industry average. Very few Hypergrid game suppliers in India include this as a standard part of their process. For Winera, it is where every project starts.",
    buttonText: "Talk to an ROI Expert",
    buttonLink: "https://wa.me/919428989488",
    imgUrl: "/src/assets/hypergrid-image.png"
  },
  hypergridWhyWinera: {
    title: "Why Choose *Winera International*",
    items: [
      {
        icon: "award",
        title: "Commercial-Grade Equipment",
        desc: "Made To Run Every Day In Busy Places Without Breaking Down."
      },
      {
        icon: "settings",
        title: "Customized For Your Venue",
        desc: "We Set Up The Games, Levels, And Branding To Fit Your Space."
      },
      {
        icon: "coins",
        title: "ROI Planning Before You Invest",
        desc: "We Show You The Cost And Profit Before You Spend Any Money."
      },
      {
        icon: "headphones",
        title: "Professional Installation",
        desc: "Our Own Team Comes And Sets Everything Up For You."
      },
      {
        icon: "calendar",
        title: "Operator Training Included",
        desc: "We Train Your Staff So They're Ready Before You Open."
      },
      {
        icon: "package",
        title: "Reliable After-Sales Support",
        desc: "We Fix, Update, And Service It Whenever You Need Help."
      }
    ]
  },
  hypergridFaqs: [
    {
      question: "Who is a reliable Hypergrid game supplier in India?",
      answer: "Winera International is a trusted Hypergrid game supplier in India, sourcing commercial interactive LED floor systems from established global manufacturers for malls, FECs, hotels, schools, and trampoline parks — installed across 50+ cities by our own team since 2014."
    },
    {
      question: "What is a Hypergrid interactive LED floor game?",
      answer: "Hypergrid is a commercial interactive LED floor system using pressure-sensitive RGB tiles. Players step, jump, and sprint across the glowing grid — reacting to colour patterns, memory sequences, and speed challenges in real time. It supports 1 to 6 players simultaneously, requires no attendant, and offers 5+ game modes for consistent repeat engagement."
    },
    {
      question: "Is Hypergrid a good business investment for an FEC or mall?",
      answer: "As a Hypergrid FEC game, it generates revenue through per-session fees with zero consumable costs and no attendant requirement — keeping operating costs low. Its self-operated design and high repeat-play appeal make it one of the strongest revenue-per-square-foot attractions for Indian FECs and malls."
    },
    {
      question: "What is the price of a Hypergrid game in India?",
      answer: "Hypergrid game pricing depends on configuration, tile count, and installation requirements. Winera provides a complete cost breakdown — equipment, installation, and projected maintenance — before confirming any order. Contact our team for a venue-specific quote and free ROI report."
    },
    {
      question: "How much space does Hypergrid require?",
      answer: "A commercial Hypergrid installation starts from 200 sq ft of flat floor space — compact enough to fit within an existing trampoline park, bowling alley, or mall entertainment zone without requiring a dedicated standalone room."
    },
    {
      question: "What game modes does Hypergrid offer?",
      answer: "Hypergrid offers 5+ game modes including colour-matching, memory sequences, speed reaction challenges, and competitive multiplayer formats — with adjustable difficulty settings for children through adults. Game modes can be configured through the 24\" operator control panel."
    },
    {
      question: "Does Hypergrid require a dedicated staff member to operate?",
      answer: "No. Hypergrid is fully self-operated — players start and control sessions through the intuitive interface without staff involvement."
    },
    {
      question: "How long does Hypergrid installation take?",
      answer: "A standard Hypergrid installation is typically completed within 1–2 days depending on floor configuration. Winera confirms an exact timeline at the quote stage covering delivery, calibration, and staff training."
    },
    {
      question: "What after-sales support does Winera provide for Hypergrid?",
      answer: "Winera International provides software updates, hardware servicing, tile replacement, and on-site support for all Hypergrid installations — directly through our own team across 50+ cities."
    }
  ],
  hypergridCta: {
    bgUrl: "/src/assets/hypergrid-winera-lastblock.png",
    buttonLink: "https://wa.me/919428989488"
  },
  hypergridSeo: {
    pageTitle: "Interactive LED Hypergrid Arena Manufacturer in India | Winera International",
    metaDescription: "Winera International is India's leading manufacturer of Interactive LED Hypergrid active gaming arenas, offering high-ROI illuminated floor tile systems and turnkey game zone setups."
  },
  projectHero: {
    bannerImg: "/src/assets/project-banner.png",
    breadcrumbHome: "Home",
    breadcrumbPage: "Project"
  },
  projectBlock: {
    strokeImg: "/src/assets/yellow-stroke-line.png",
    titleLine1: "FifthAlley Sport Bowling: A",
    titleLine2: "Complete ",
    titleLine2Black: "Bowling Alley Setup",
    titleLine3: "in the Heart of Surat",
    description: "How we designed and installed a professional-grade bowling alley across 3,000 sq. ft., transforming an empty space in Katargam into a destination entertainment venue in Surat.",
    buttonText: "Get A Quote",
    buttonLink: "https://wa.me/919428989488",
    image: "/src/assets/project-image01.png"
  },
  projectBasicInfo: {
    bgImg: "/src/assets/project-image2-bg.png",
    yellowTitle: "Basic ",
    whiteTitle: "Information",
    rows: [
      { label: 'Project Name', val: 'FifthAlley Sport Bowling' },
      { label: 'Project Type', val: 'Bowling Alley Setup' },
      { label: 'Location', val: 'Surat, Gujarat' },
      { label: 'Total Area', val: '3,000 sq. ft.' }
    ]
  },
  projectClientWanted: {
    titlePrefix: "What the ",
    titleCyan: "Client Wanted",
    paragraph1: "The client had an empty 3,000 sq. ft. space in Katargam and a clear goal: to open a professional bowling venue.",
    paragraph2: "They didn't want a supplier who only supplied the equipment. They wanted one partner to handle everything, plan the space, install the lanes, and hand over a venue that was ready for opening day. In short, they needed one team they could trust from start to finish.",
    image: "/src/assets/project-image-3.png"
  },
  projectSolution: {
    titleCyan: "What Solution ",
    titleSuffix: "We Provide",
    paragraph1: "We delivered FifthAlley Sport Bowling as a complete, ready-to-open venue. Across the 3,000 sq. ft. space in Katargam, we planned the layout so the professional lanes had enough room around them for people to walk, sit, and relax.",
    paragraph2: "The result is a venue that is fun to play in and comfortable to spend time in — just like a good family entertainment center should feel.",
    image: "/src/assets/project-image-4.png"
  },
  projectGallery: {
    titleCyan: "Project ",
    titleDark: "Gallery",
    bgImg: "/src/assets/project-images-bg.png",
    images: [
      "/src/assets/project-block1.png",
      "/src/assets/project-block2.png",
      "/src/assets/project-block3.png",
      "/src/assets/project-block1.png",
      "/src/assets/project-block2.png",
      "/src/assets/project-block3.png"
    ]
  },
  projectVideo: {
    image: "/src/assets/project-section-video.png",
    videoUrl: "https://wa.me/919428989488"
  },
  projectSeo: {
    title: "Our Projects | Turnkey Game Zone & Entertainment Venues by Winera International",
    description: "Explore turnkey bowling alley and entertainment venue setup projects by Winera International."
  },
  safetyHero: {
    bgUrl: "/src/assets/safety-bg.png",
    breadcrumbText: "Safety Standards"
  },
  safetyIntro: {
    titleLine1: "Game Zone & Kids Play",
    titleLine2: "Equipment Safety Standards",
    p1: "When you invest in a game zone or family entertainment center, the safety of your equipment protects your visitors, your reputation, and your investment. At Winera International, product safety and quality is our highest priority. Every product we supply — from arcade games to trampoline parks and climbing walls is certified to international safety standards for commercial, high-footfall use, and every venue is installed by our own trained team and inspected on-site before handover.",
    p2: "As a complete game zone developer, our safety commitment covers four areas: the attractions themselves, the materials they're made of, the electrical systems that power them, and the structure and operation of the finished venue.",
    mainImgUrl: "/src/assets/safety-standard-img1.png"
  },
  safetyCertifications: {
    title1: "Play & Attraction",
    title2: "Equipment Safety",
    subtitle: "These standards make sure every attraction people play on is safe by design.",
    cards: [
      {
        title: "EN 1176 — Play Structures & Ninja Courses (Europe)",
        desc: "EN 1176 is the European Standard for Playground Equipment, published by CEN. It sets safety requirements for structural strength, heights, gaps, and entrapment protection so children play without hidden risks. Winera International supplies and installs soft play and ninja course equipment that complies with EN 1176 — helping your venue pass inspections."
      },
      {
        title: "EN 1177 — Impact-Absorbing Surfaces (Europe)",
        desc: "EN 1177 is the European Standard for playground impact-absorbing surfaces, published by CEN. It defines how flooring must cushion falls, setting critical fall heights for different materials to reduce injury. Winera International supplies installs safety flooring around play, ninja, and climbing areas that complies with EN 1177 — keeping falls safe."
      },
      {
        title: "ASTM F1918 — Soft Contained Play (International)",
        desc: "ASTM F1918 is the Standard Safety Performance Specification for Soft Contained Play Equipment, published by ASTM International. It sets safety rules for enclosed, padded play structures used in indoor kids zones, covering design, padding, and fall protection. Winera International supplies and installs soft play equipment that complies with ASTM F1918 — helping your venue pass inspections."
      },
      {
        title: "ASTM F2970 — Trampoline Parks (International)",
        desc: "ASTM F2970 is the international Standard Practice for Trampoline Courts, published by ASTM International. It sets safety requirements for net enclosures, frame padding, spacing, and impact zones to prevent falls and collisions. Winera International supplies and installs trampoline parks certified to ASTM F2970 — helping your venue stay safe and pass inspections."
      },
      {
        title: "EN 12572 — Climbing Walls (Europe)",
        desc: "EN 12572 is the European Standard for artificial climbing structures, published by CEN. It sets safety requirements for wall stability, holds, heights, anchor points, and fall zones so climbers stay protected. Winera International supplies and installs wall climbing setups that comply with EN 12572 — helping your venue meet safety standards and pass inspections."
      },
      {
        title: "IS 15475 & IS 15492 — Amusement Rides (India / BIS)",
        desc: "IS 15475 and IS 15492 are Indian Standards published by the Bureau of Indian Standards (BIS). They set safety rules for the design, construction, and operation of amusement rides and devices in India. Winera International supplies amusement park rides and bumper cars that follow these BIS standards — keeping your venue compliant."
      },
      {
        title: "EN 13814 / ISO 17842 — Amusement Devices (International)",
        desc: "EN 13814 and ISO 17842 are the international standards for amusement rides and machinery safety. They specify structural strength, emergency stops, mechanical locks, and maintenance protocols. Winera International supplies rides and equipment that comply with these standards — keeping your operating staff and visitors safe."
      }
    ]
  },
  safetyMaterials: {
    title1: "Material &",
    title2: "Fire Safety",
    subtitle: "These standards make sure everything is made from safe materials that don't catch fire easily and are not harmful to touch which is also a legal rule for game zones in India.",
    imgUrl: "/src/assets/safety-standard-2.png",
    cards: [
      {
        title: "Fire-Safe Materials (India)",
        desc: "In India, game zone materials must not catch fire easily. The padding, nets, and finishes we use are fire-safe, so they slow down flames instead of feeding them. This keeps your visitors safer and helps your venue follow the law."
      },
      {
        title: "NFPA 701 & UL 94 — Fire Safety (International)",
        desc: "These two tests check how well materials resist fire. NFPA 701 tests cloth and nets, and UL 94 tests plastic parts, to make sure they don't burn quickly. The materials we use pass these fire-safety tests."
      },
      {
        title: "EN 71 — Safe Play Materials (Europe)",
        desc: "EN 71 is a European rule that makes sure play materials are safe for children. It checks that they don't catch fire easily and don't contain harmful chemicals. Our kids' equipment meets the EN 71 standard."
      },
      {
        title: "EU REACH & CPSIA — Non-Toxic Materials",
        desc: "These rules keep harmful chemicals, lead, and other unsafe substances out of children's products. The materials in our kids' equipment follow these rules, so they are safe for kids to touch and play on."
      }
    ]
  },
  safetyElectrical: {
    title1: "Electrical &",
    title2: "Machine Safety",
    subtitle: "These rules make sure all machines that run on electricity are safe to use — like arcade games, VR, laser tag, bumper cars, hypergrid, bowling, and rides.",
    imgUrl: "/src/assets/safety-standard-img3.png",
    items: [
      {
        num: "1",
        title: "CE Marking — European Safety Mark",
        desc: "The CE mark means a machine has passed Europe's health and safety checks. It shows the product is safe to use. Our arcade games, VR systems, laser tag, hypergrid, and bumper cars all carry the CE mark."
      },
      {
        num: "2",
        title: "RoHS — Safe Electronics",
        desc: "RoHS makes sure machines are not made with harmful materials inside their electronics. This keeps them safer and cleaner to use. All our electronic machines are RoHS-safe."
      },
      {
        num: "3",
        title: "IS / IEC — Electrical Safety Rules (India & International)",
        desc: "These rules make sure the wiring and power setup of every machine is safe. Our equipment — bowling pinsetters, scoring screens, VR, arcade games, and LED hypergrid floors — follows both Indian and international electrical safety rules for safe wiring, earthing, and power."
      }
    ]
  },
  safetyStructure: {
    title1: "Structure, Installation &",
    title2: "Operational Safety",
    subtitle: "These standards make sure the finished venue is strong, set up correctly, and safe to run every day — and ready to pass the local safety check needed for a licence.",
    cards: [
      {
        num: "01",
        accent: "#00aeef",
        title: "Strong and Stable Setup (India)",
        desc: "In India, a game zone must pass a check for strong, stable structure before it can get a licence. We build and fix everything properly so your venue is ready to pass that check. This matters most for climbing walls, ninja courses, trampolines, and rides, where the structure has to hold real weight safely."
      },
      {
        num: "02",
        accent: "#ffd600",
        title: "Quality Checks (ISO 9001)",
        desc: "ISO 9001 is a worldwide standard for good quality work. It makes sure the design, sourcing, and installation are done to a consistent, high standard every time. We follow these quality practices in all our projects."
      },
      {
        num: "03",
        accent: "#00aeef",
        title: "Full Safety Check Before Handover",
        desc: "Good equipment alone is not enough. Once all the games and machines are installed, our trained team runs a full safety check on the complete setup. We hand it over only after everything passes."
      },
      {
        num: "04",
        accent: "#ffd600",
        title: "Safe Running & Maintenance (ISO 17842-2 / EN 13814-2)",
        desc: "These standards are about running and looking after the attractions safely after they are built. We set up your venue the right way and show your team how to run and maintain each attraction safely."
      }
    ]
  },
  safetyWhyMatters: {
    title1: "Why This Matters",
    title2: "for Your Business",
    subtitle: "Good, certified equipment is a smart investment. It keeps visitors safe, protects your money, and helps you get your licence easier. In India, every game zone must pass checks for strong structure, fire safety, and electrical safety before it can open. Because we supply you certified equipment, fire-safe materials, and proper installation, your game zone is ready to pass these checks. The result: you open on time, stay within the rules, and win the trust of every family.",
    ctaTitle1: "BUILD",
    ctaTitle2: "YOURS NOW",
    buttonText: "Talk to an ROI Expert",
    buttonLink: "https://wa.me/919428989488"
  },
  safetySeo: {
    pageTitle: "Equipment Safety Standards | Winera International",
    metaDescription: "Winera International equipment safety standards, international certifications, commercial-grade materials, and on-site inspection protocols for game zones in India."
  },
  roiHero: {
    breadcrumbPage: "ROI",
    bgUrl: "/src/assets/roi-bg-image.png"
  },
  roiIntro: {
    tagline: "Return on Investment (ROI)",
    titleLine1: "You don't need a game zone…",
    titleLine2: "you need a",
    titleLine2Blue: "profit machine.",
    paragraph1: "Anyone can fill a room with arcade machines. Very few build a game zone that pays back your investment and keeps printing profit month after month.",
    paragraph2: "Most game zone owners lose money in year one — not because gaming is dead, but because the setup, game mix, and management were wrong from day one.",
    buttonText: "Book Your Free ROI Consultation",
    buttonLink: "https://wa.me/919428989488",
    image: "/src/assets/roi-img1.png"
  },
  roiMatters: {
    title: "Opening a game zone is easy. Making it profitable is a system.",
    paragraph1: "You've seen the crowds. You know the demand is real. So you're tempted to invest. But here's what nobody tells you:",
    cards: [
      "₹40–80 lakh invested, and the zone still runs at a loss.",
      "Machines that look exciting but nobody plays twice.",
      "Empty floors on weekdays, chaos on weekends, no system in between.",
      "No idea what your actual return per square foot is."
    ],
    warningTextLine1: "A cheap or random setup doesn't save you money.",
    warningTextLine2: "It quietly kills your ROI."
  },
  roiComparison: {
    title: "Why most game zones fail vs. why ours profit",
    subCaption: "The difference isn't the games. It's the system behind them.",
    wrongItems: [
      { "num": "01", "text": "Random game selection", "offset": "20px" },
      { "num": "02", "text": "No space planning", "offset": "65px" },
      { "num": "03", "text": "Buy machines, then figure it out", "offset": "95px" },
      { "num": "04", "text": "No pricing strategy", "offset": "95px" },
      { "num": "05", "text": "Owner manages everything manually", "offset": "65px" },
      { "num": "06", "text": "Guessing monthly income", "offset": "20px" }
    ],
    rightItems: [
      { "num": "01", "text": "Data-backed game mix (high footfall + high margin)", "offset": "20px" },
      { "num": "02", "text": "Optimized layout for max games per sq. ft.", "offset": "65px" },
      { "num": "03", "text": "ROI modeled before you spend a rupee", "offset": "95px" },
      { "num": "04", "text": "Dynamic pricing + package systems", "offset": "95px" },
      { "num": "05", "text": "Full management + POS + reporting system", "offset": "65px" },
      { "num": "06", "text": "Predictable, tracked revenue", "offset": "20px" }
    ]
  },
  roiProcess: {
    title: "From empty space to profit we handle everything",
    cards: [
      { "title": "Location & Feasibility", "desc": "We analyze your space and market and then project your ROI.", "img": "/src/assets/roi-block5-img1.png" },
      { "title": "Design & Layout", "desc": "Maximum games, best flow, optimized experience per sq. ft.", "img": "/src/assets/roi-block5-img2.png" },
      { "title": "Game Selection", "desc": "The right mix of high-demand + high-margin games.", "img": "/src/assets/roi-block5-img3.png" },
      { "title": "Setup & Installation", "desc": "You don't have to touch a single wire.", "img": "/src/assets/roi-block5-img4.png" },
      { "title": "Management System", "desc": "POS, pricing, staff training, reporting, and maintenance.", "img": "/src/assets/roi-block5-img5.png" },
      { "title": "Ongoing Growth", "desc": "We help you scale revenue, not just open doors.", "img": "/src/assets/roi-block5-img6.png" }
    ]
  },
  roiGet: {
    title: "What you get with Winera International",
    subtitle: "Three things that turn your investment into predictable, growing profit.",
    badgeText: "Built for Profit.",
    image: "/src/assets/roi-block6.png",
    steps: [
      { "title": "Predictable ROI", "desc": "Know your returns before you invest." },
      { "title": "Zero Guesswork", "desc": "We handle setup + management end-to-end." },
      { "title": "Ongoing Profit", "desc": "Systems that keep revenue growing." }
    ]
  },
  roiChecklist: {
    title: "This is for you if",
    bgImage: "/src/assets/roi-block7-bg.png",
    fitPill: "You're a fit",
    unfitPill: "You're a fit",
    fitItems: [
      "You want to invest ₹XX Lakh+ in a proven, growing business",
      "You want returns backed by data, not hope",
      "You'd rather have experts build it than learn by losing money",
      "You want a zone that runs as a system, not a headache"
    ],
    unfitItems: [
      "You want to invest ₹XX Lakh+ in a proven, growing business",
      "You want the cheapest possible setup",
      "You're not serious about returns",
      "You expect profit without a proper system"
    ]
  },
  roiCta: {
    yellowText: "READY TO",
    whiteText: "SEE YOUR",
    cyanText: "NUMBERS?",
    subtitle: "Book A Free Consultation With Winera International. We'll Walk You Through The ROI Projection For Your Space, Your Budget, And Your City — Before You Spend Anything.",
    buttonText: "Book Your Free ROI Call",
    buttonLink: "https://wa.me/919428989488",
    bgUrl: "/src/assets/home-block.png"
  },
  roiSeo: {
    pageTitle: "ROI Calculator for Game Zones | Return on Investment | Winera International",
    metaDescription: "Calculate your game zone ROI before investing. Winera International provides free ROI consultations, data-backed game mix planning, and complete setup services across India."
  },
  blogHero: {
    breadcrumbText: "Blog",
    bgUrl: "/src/assets/blog-image-bg.png"
  },
  blogPosts: [
    {
      id: 1,
      title: "Soft Play vs Trampoline Park: Which",
      subtitle: "Is Better for Your Space?",
      line1: "Soft play or trampoline park? Discover",
      line2: "the key differences in investment, space",
      line3: "requirements, safety, and revenue.....",
      date: "Aug 22, 2026",
      image: "/src/assets/blog-images.png"
    },
    {
      id: 2,
      title: "Soft Play vs Trampoline Park: Which",
      subtitle: "Is Better for Your Space?",
      line1: "Soft play or trampoline park? Discover",
      line2: "the key differences in investment, space",
      line3: "requirements, safety, and revenue.....",
      date: "Aug 22, 2026",
      image: "/src/assets/blog-images.png"
    },
    {
      id: 3,
      title: "Soft Play vs Trampoline Park: Which",
      subtitle: "Is Better for Your Space?",
      line1: "Soft play or trampoline park? Discover",
      line2: "the key differences in investment, space",
      line3: "requirements, safety, and revenue.....",
      date: "Aug 22, 2026",
      image: "/src/assets/blog-images.png"
    },
    {
      id: 4,
      title: "Soft Play vs Trampoline Park: Which",
      subtitle: "Is Better for Your Space?",
      line1: "Soft play or trampoline park? Discover",
      line2: "the key differences in investment, space",
      line3: "requirements, safety, and revenue.....",
      date: "Aug 22, 2026",
      image: "/src/assets/blog-images.png"
    },
    {
      id: 5,
      title: "Soft Play vs Trampoline Park: Which",
      subtitle: "Is Better for Your Space?",
      line1: "Soft play or trampoline park? Discover",
      line2: "the key differences in investment, space",
      line3: "requirements, safety, and revenue.....",
      date: "Aug 22, 2026",
      image: "/src/assets/blog-images.png"
    },
    {
      id: 6,
      title: "Soft Play vs Trampoline Park: Which",
      subtitle: "Is Better for Your Space?",
      line1: "Soft play or trampoline park? Discover",
      line2: "the key differences in investment, space",
      line3: "requirements, safety, and revenue.....",
      date: "Aug 22, 2026",
      image: "/src/assets/blog-images.png"
    },
    {
      id: 7,
      title: "Soft Play vs Trampoline Park: Which",
      subtitle: "Is Better for Your Space?",
      line1: "Soft play or trampoline park? Discover",
      line2: "the key differences in investment, space",
      line3: "requirements, safety, and revenue.....",
      date: "Aug 22, 2026",
      image: "/src/assets/blog-images.png"
    },
    {
      id: 8,
      title: "Soft Play vs Trampoline Park: Which",
      subtitle: "Is Better for Your Space?",
      line1: "Soft play or trampoline park? Discover",
      line2: "the key differences in investment, space",
      line3: "requirements, safety, and revenue.....",
      date: "Aug 22, 2026",
      image: "/src/assets/blog-images.png"
    },
    {
      id: 9,
      title: "Soft Play vs Trampoline Park: Which",
      subtitle: "Is Better for Your Space?",
      line1: "Soft play or trampoline park? Discover",
      line2: "the key differences in investment, space",
      line3: "requirements, safety, and revenue.....",
      date: "Aug 22, 2026",
      image: "/src/assets/blog-images.png"
    }
  ],
  homeSeo: {
    pageTitle: "Game Zone Equipment Manufacturer in India | Winera International",
    metaDescription: "Winera International is your trusted Game Zone Equipment Manufacturer and Indoor Play Equipment Manufacturer in India since 2014. Get Amazing deals!"
  },
  blogSeo: {
    pageTitle: "Winera International Blog | Winera International",
    metaDescription: "Explore expert insights, trends, and ideas from Winera International to elevate your entertainment venue and create unforgettable guest experiences."
  },
  aboutSeo: {
    pageTitle: "The Right Choice for Your Business | Winera International",
    metaDescription: "Winera delivers more than promises trusted expertise, customer care, and quality solutions that set us apart. Discover why clients choose us."
  },
  arcadeSeo: {
    pageTitle: "Arcade Games Manufacturer in India | Winera International",
    metaDescription: "Looking for arcade game machines in India? Winera International offers redemption games, kiddie rides, racing simulators, and more at direct factory prices."
  },
  bowlingSeo: {
    pageTitle: "Bowling Alley Manufacturer in India | Winera International",
    metaDescription: "Looking for a bowling alley manufacturer in India? Winera International supplies premium new and refurbished Brunswick systems, with 15+ years of expertise."
  },
  softplaySeo: {
    pageTitle: "Top Soft Play Equipment Manufacturers in India | Winera International",
    metaDescription: "As a premier soft play manufacturer in India, Winera International creates custom indoor soft play equipment. We deliver personalized solutions designed to fit your specific space and budget."
  },
  trampolineSeo: {
    pageTitle: "Trampoline Park Manufacturer in India | Winera International",
    metaDescription: "Looking for a trampoline park manufacturer in India? Winera International designs and installs custom trampoline parks to your space, vision, and budget."
  },
  vrSeo: {
    pageTitle: "VR Gaming Machine Manufacturer in India | Winera International",
    metaDescription: "Winera International is a leading VR gaming machine manufacturer in India, offering immersive virtual reality attractions built for arcades and FEC centers."
  },
  bumperSeo: {
    pageTitle: "Bumper Car Manufacturer in India | Winera International",
    metaDescription: "As a leading bumper car manufacturer in India, Winera International builds safe, durable, and thrilling bumper cars for amusement parks and FEC centers."
  },
  amusementSeo: {
    pageTitle: "Amusement Park Manufacturer in India | Winera International",
    metaDescription: "Winera International is a premier amusement park manufacturer in India, delivering innovative, safe rides and equipment tailored to your game zone and venue space."
  },
  arSeo: {
    pageTitle: "AR Games Supplier in India | Winera International",
    metaDescription: "Winera International is a leading AR games supplier in India, sourcing and installing sports simulators, interactive floors, and immersive gaming attractions."
  },
  hypergridSeo: {
    pageTitle: "Hypergrid Game Supplier in India | Winera International",
    metaDescription: "Winera International is a trusted Hypergrid game supplier in India, installing commercial interactive LED floor systems for malls, FECs, and trampoline parks."
  },
  lasertagSeo: {
    pageTitle: "Laser Tag Equipment Supplier in India | Winera International",
    metaDescription: "Want to add laser tag or laser spy to your venue? Winera International handles the full setup, from arena design and gear to software and staff training."
  },
  lasertagHero: {
    breadcrumbText: "Laser Tag"
  },
  safetySeo: {
    pageTitle: "Where Game Zone Safety Comes First | Winera International",
    metaDescription: "Safety comes first at Winera International. Every ride, play structure, and machine we install meets global safety standards, so your venue opens ready to run."
  },
  roiSeo: {
    pageTitle: "Know Your Game Zone ROI Before You Invest | Winera International",
    metaDescription: "Opening a game zone is easy, making it profitable is a system. Winera International models your ROI around your space and budget before you invest a rupee."
  },
  projectSeo: {
    pageTitle: "Our Projects | Game Zones Built | Winera International",
    metaDescription: "Explore Winera International's completed projects across India. Real play destinations we've designed, built, and installed for venues of every size and type."
  },
  privacySeo: {
    pageTitle: "Winera International Privacy Policy for Game Zone Solutions",
    metaDescription: "Learn how Winera International collects, uses, and protects the information you share when enquiring about our game zone equipment and setup services in India."
  },
  termsSeo: {
    pageTitle: "Terms of Service | Winera International",
    metaDescription: "Read Winera International's Terms of Service outlining your rights, responsibilities, and guidelines for using our game zone equipment and setup in India."
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

    // Auto-upsert any missing defaultSiteData keys in database
    const defaultKeys = Object.keys(defaultSiteData);
    for (const key of defaultKeys) {
      if (siteData[key] === undefined) {
        await Content.findOneAndUpdate(
          { sectionKey: key },
          { sectionKey: key, data: defaultSiteData[key] },
          { upsert: true, new: true }
        );
        siteData[key] = defaultSiteData[key];
      }
    }

    // Ensure arcadeFaqs in MongoDB has all 10 items
    if (!Array.isArray(siteData.arcadeFaqs) || siteData.arcadeFaqs.length < 10) {
      siteData.arcadeFaqs = defaultArcadeFaqs;
      await Content.findOneAndUpdate(
        { sectionKey: 'arcadeFaqs' },
        { sectionKey: 'arcadeFaqs', data: defaultArcadeFaqs },
        { upsert: true, new: true }
      );
    }

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


