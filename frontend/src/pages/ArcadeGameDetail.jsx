import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CtaBanner from '../components/CtaBanner';
import arcadegame1Bg from '../assets/arcadegames-hero-bg.webp';
import arcadegamesImg from '../assets/arcadegames-img.webp';
import bikeArcade from '../assets/bike-arcade.webp';
import yellowBrushAccent from '../assets/yellow-stroke-line.webp';
import superAirHockeyImg from '../assets/super-air-hockey.webp';
import puckCarnivalAirHockeyImg from '../assets/puck-carnival-air-hockey.webp';
import dazzlingAirHockeyImg from '../assets/dazzling-air-hockey.webp';
import auroraAirHockeyImg from '../assets/aurora-air-hockey.webp';
import ochaAirHockeyImg from '../assets/ocha-air-hockey.webp';
import aeroXAirHockeyImg from '../assets/aero-x-air-hockey.webp';
import arcadeCtaBg from '../assets/arcadegame-cta-bg.webp';
import ctaArcade from '../assets/cta-arcade.webp';
import arcadeHall from '../assets/arcade-hall.webp';
import arcadeBoy from '../assets/arcade-boy.webp';
import arcadeBtn1 from '../assets/arcadegame-button-1.png';
import arcadeBtn2 from '../assets/arcadegame-button-2.png';

import { 
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoveHorizontal, Box, Ruler, MessageCircle, ArrowRight 
} from 'lucide-react';
import allArcadeProducts from '../data/allArcadeProducts.json';

const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback;
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('/uploads')) {
    return url;
  }
  return url;
};

// Arcade Products Database Mapping all dynamic game detail content
export const arcadeProductsData = {
  'parkour-motor-2-dx': {
    slug: 'parkour-motor-2-dx',
    name: 'Parkour Motor II (DX)',
    nameBase: 'Parkour Motor ',
    nameHighlight: 'II (DX)',
    category: 'Bike Racing Game',
    tagline: 'High-Performance Dual Player Commercial Motorbike Racing Simulator',
    img: arcadegamesImg,
    heroBg: arcadegame1Bg,
    gallery: [arcadegamesImg, bikeArcade, ctaArcade, arcadeHall],
    specs: {
      power: '880 W',
      voltage: '220v',
      category: 'Bike Racing Game',
      players: '2 Player',
      material: 'Imported',
      width: '2140 mm',
      depth: '2310 mm',
      height: '2490 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Parkour%20Motor%20II%20(DX)'
  },
  'manx-tt-32': {
    slug: 'manx-tt-32',
    name: 'MANX TT 32"',
    nameBase: 'MANX TT ',
    nameHighlight: '32"',
    category: 'Bike Racing Game',
    tagline: 'Classic High-Velocity Arcade Motorcycle Simulator',
    img: bikeArcade,
    heroBg: arcadegame1Bg,
    gallery: [bikeArcade, arcadegamesImg, ctaArcade, arcadeHall],
    specs: {
      power: '500 W',
      voltage: '220v',
      category: 'Bike Racing Game',
      players: '2 Player',
      material: 'Imported',
      width: '2150 mm',
      depth: '1900 mm',
      height: '1700 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20MANX%20TT%2032"'
  },
  'super-air-hockey': {
    slug: 'super-air-hockey',
    name: 'Super Air Hockey',
    nameBase: 'Super Air ',
    nameHighlight: 'Hockey',
    category: 'Arcade Games',
    tagline: 'Commercial Grade Heavy-Duty Air Hockey Table',
    img: superAirHockeyImg,
    heroBg: arcadegame1Bg,
    gallery: [superAirHockeyImg, puckCarnivalAirHockeyImg, dazzlingAirHockeyImg, aeroXAirHockeyImg],
    specs: {
      power: '450 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2 Player',
      material: 'Stainless Steel & Aluminum',
      width: '2100 mm',
      depth: '1200 mm',
      height: '820 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Super%20Air%20Hockey'
  },
  'puck-carnival-air-hockey': {
    slug: 'puck-carnival-air-hockey',
    name: 'Puck Carnival Air Hockey',
    nameBase: 'Puck Carnival ',
    nameHighlight: 'Air Hockey',
    category: 'Arcade Games',
    tagline: 'Multi-Puck Carnival Style Arcade Air Hockey Machine',
    img: puckCarnivalAirHockeyImg,
    heroBg: arcadegame1Bg,
    gallery: [puckCarnivalAirHockeyImg, superAirHockeyImg, dazzlingAirHockeyImg, auroraAirHockeyImg],
    specs: {
      power: '600 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2-4 Player',
      material: 'Heavy Commercial Polycarbonate',
      width: '2200 mm',
      depth: '1350 mm',
      height: '850 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Puck%20Carnival%20Air%20Hockey'
  },
  'dazzling-air-hockey-multi-puck': {
    slug: 'dazzling-air-hockey-multi-puck',
    name: 'Dazzling Air Hockey - Multi Puck',
    nameBase: 'Dazzling Air Hockey ',
    nameHighlight: 'Multi Puck',
    category: 'Arcade Games',
    tagline: 'LED Illuminated Multi-Puck Arcade Air Hockey Table',
    img: dazzlingAirHockeyImg,
    heroBg: arcadegame1Bg,
    gallery: [dazzlingAirHockeyImg, puckCarnivalAirHockeyImg, superAirHockeyImg, auroraAirHockeyImg],
    specs: {
      power: '700 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2-4 Player',
      material: 'Tempered Glass & Steel Frame',
      width: '2250 mm',
      depth: '1400 mm',
      height: '900 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Dazzling%20Air%20Hockey'
  },
  'aurora-air-hockey': {
    slug: 'aurora-air-hockey',
    name: 'Aurora Air Hockey',
    nameBase: 'Aurora Air ',
    nameHighlight: 'Hockey',
    category: 'Arcade Games',
    tagline: 'High-Power Blower Tournament Air Hockey Table',
    img: auroraAirHockeyImg,
    heroBg: arcadegame1Bg,
    gallery: [auroraAirHockeyImg, dazzlingAirHockeyImg, superAirHockeyImg, ochaAirHockeyImg],
    specs: {
      power: '500 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2 Player',
      material: 'Aluminum Railing & High-Grade MDF',
      width: '2150 mm',
      depth: '1250 mm',
      height: '830 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Aurora%20Air%20Hockey'
  },
  'ocha-air-hockey': {
    slug: 'ocha-air-hockey',
    name: 'Ocha Air Hockey',
    nameBase: 'Ocha Air ',
    nameHighlight: 'Hockey',
    category: 'Arcade Games',
    tagline: 'Compact & Stylish Arcade Air Hockey Machine',
    img: ochaAirHockeyImg,
    heroBg: arcadegame1Bg,
    gallery: [ochaAirHockeyImg, auroraAirHockeyImg, superAirHockeyImg, aeroXAirHockeyImg],
    specs: {
      power: '400 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2 Player',
      material: 'Imported Acrylic Top',
      width: '1980 mm',
      depth: '1100 mm',
      height: '800 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Ocha%20Air%20Hockey'
  },
  'aero-x-air-hockey': {
    slug: 'aero-x-air-hockey',
    name: 'Aero X Air Hockey',
    nameBase: 'Aero X Air ',
    nameHighlight: 'Hockey',
    category: 'Arcade Games',
    tagline: 'Next-Gen Arcade Air Hockey Table with Ticket Dispenser',
    img: aeroXAirHockeyImg,
    heroBg: arcadegame1Bg,
    gallery: [aeroXAirHockeyImg, ochaAirHockeyImg, puckCarnivalAirHockeyImg, superAirHockeyImg],
    specs: {
      power: '550 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2 Player',
      material: 'Stainless Steel Construction',
      width: '2180 mm',
      depth: '1280 mm',
      height: '860 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Aero%20X%20Air%20Hockey'
  },
  'astrology-cointopia': {
    slug: 'astrology-cointopia',
    name: 'Astrology Cointopia',
    nameBase: 'Astrology ',
    nameHighlight: 'Cointopia',
    category: 'Claw Machine',
    tagline: 'Commercial High-Earning Astrology Cointopia Coin & Prize Machine',
    img: arcadeHall,
    heroBg: arcadegame1Bg,
    gallery: [arcadeHall, arcadeBoy, arcadegamesImg, ctaArcade],
    specs: {
      power: '280 W',
      voltage: '220v',
      category: 'Claw Machine',
      players: '1 Player',
      material: 'High-Strength Acrylic & Steel',
      width: '950 mm',
      depth: '900 mm',
      height: '2100 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Astrology%20Cointopia'
  },
  'astrology-capsule-version': {
    slug: 'astrology-capsule-version',
    name: 'Astrology Capsule Version',
    nameBase: 'Astrology Capsule ',
    nameHighlight: 'Version',
    category: 'Claw Machine',
    tagline: 'Interactive Capsule Prize & Gashapon Vending Arcade Machine',
    img: arcadeBoy,
    heroBg: arcadegame1Bg,
    gallery: [arcadeBoy, arcadeHall, bikeArcade, arcadegamesImg],
    specs: {
      power: '220 W',
      voltage: '220v',
      category: 'Capsule Machine',
      players: '1 Player',
      material: 'Imported ABS & Steel Structure',
      width: '880 mm',
      depth: '850 mm',
      height: '1950 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Astrology%20Capsule%20Version'
  },
  'basketball-star': {
    slug: 'basketball-star',
    name: 'Basketball Star',
    nameBase: 'Basketball ',
    nameHighlight: 'Star',
    category: 'Redemption Game',
    tagline: 'Commercial LED Moving Hoop Arcade Basketball Simulator',
    img: superAirHockeyImg,
    heroBg: arcadegame1Bg,
    gallery: [superAirHockeyImg, puckCarnivalAirHockeyImg, arcadeHall, arcadegamesImg],
    specs: {
      power: '350 W',
      voltage: '220v',
      category: 'Sports Simulator',
      players: '1-2 Player',
      material: 'Heavy Duty Steel & Polycarbonate',
      width: '1050 mm',
      depth: '2500 mm',
      height: '2400 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Basketball%20Star'
  },
  'pinball-storm': {
    slug: 'pinball-storm',
    name: 'Pinball Storm',
    nameBase: 'Pinball ',
    nameHighlight: 'Storm',
    category: 'Arcade Games',
    tagline: 'Dynamic Digital Arcade Pinball Simulator with High-Score Display',
    img: aeroXAirHockeyImg,
    heroBg: arcadegame1Bg,
    gallery: [aeroXAirHockeyImg, dazzlingAirHockeyImg, arcadeBoy, arcadeHall],
    specs: {
      power: '400 W',
      voltage: '220v',
      category: 'Pinball Arcade',
      players: '1 Player',
      material: 'Tempered Glass & Solid Timber Frame',
      width: '800 mm',
      depth: '1400 mm',
      height: '1900 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Pinball%20Storm'
  },
  'larva-kids-ride': {
    slug: 'larva-kids-ride',
    name: 'Larva Kids Ride',
    nameBase: 'Larva ',
    nameHighlight: 'Kids Ride',
    category: 'Kiddy Ride',
    tagline: 'Animated Coin-Operated Dynamic Motion Ride for Children',
    img: arcadeBoy,
    heroBg: arcadegame1Bg,
    gallery: [arcadeBoy, bikeArcade, arcadeHall, arcadegamesImg],
    specs: {
      power: '180 W',
      voltage: '220v',
      category: 'Kiddy Ride',
      players: '1-2 Kids',
      material: 'Eco-friendly Fiberglass & Non-toxic Paint',
      width: '1200 mm',
      depth: '850 mm',
      height: '1100 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Larva%20Kids%20Ride'
  },
  'toy-story-plush-claw-machine': {
    slug: 'toy-story-plush-claw-machine',
    name: 'Toy Story Plush Claw Machine',
    nameBase: 'Toy Story Plush ',
    nameHighlight: 'Claw Machine',
    category: 'Claw Machine',
    tagline: 'Commercial Grade Plush Prize Claw Crane Game',
    img: arcadeHall,
    heroBg: arcadegame1Bg,
    gallery: [arcadeHall, arcadeBoy, arcadegamesImg, ctaArcade],
    specs: {
      power: '250 W',
      voltage: '220v',
      category: 'Claw Machine',
      players: '1 Player',
      material: 'Reinforced Metal & Acrylic',
      width: '900 mm',
      depth: '880 mm',
      height: '2000 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Toy%20Story%20Plush%20Claw%20Machine'
  },
  'lucky-catcher-crane-machine': {
    slug: 'lucky-catcher-crane-machine',
    name: 'Lucky Catcher Crane Machine',
    nameBase: 'Lucky Catcher ',
    nameHighlight: 'Crane Machine',
    category: 'Claw Machine',
    tagline: 'High Earning LED Claw Machine for Malls and Gaming Zones',
    img: arcadeBoy,
    heroBg: arcadegame1Bg,
    gallery: [arcadeBoy, arcadeHall, arcadegamesImg, bikeArcade],
    specs: {
      power: '260 W',
      voltage: '220v',
      category: 'Claw Machine',
      players: '1 Player',
      material: 'High-Gloss Steel & LED Strips',
      width: '920 mm',
      depth: '890 mm',
      height: '2050 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Lucky%20Catcher%20Crane%20Machine'
  },
  'happy-carousel-kiddy-ride': {
    slug: 'happy-carousel-kiddy-ride',
    name: 'Happy Carousel Kiddy Ride',
    nameBase: 'Happy Carousel ',
    nameHighlight: 'Kiddy Ride',
    category: 'Kiddy Ride',
    tagline: 'Interactive Coin-Operated Carousel Ride for Kids and Toddlers',
    img: arcadeBoy,
    heroBg: arcadegame1Bg,
    gallery: [arcadeBoy, arcadeHall, bikeArcade, arcadegamesImg],
    specs: {
      power: '350 W',
      voltage: '220v',
      category: 'Kiddy Ride',
      players: '3 Kids',
      material: 'Reinforced Fiberglass & Steel Frame',
      width: '1400 mm',
      depth: '1400 mm',
      height: '1800 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Happy%20Carousel%20Kiddy%20Ride'
  },
  'super-speed-mini-racer': {
    slug: 'super-speed-mini-racer',
    name: 'Super Speed Mini Racer',
    nameBase: 'Super Speed ',
    nameHighlight: 'Mini Racer',
    category: 'Kiddy Ride',
    tagline: 'Safe, Colorful Mini Racing Motion Ride for Children',
    img: bikeArcade,
    heroBg: arcadegame1Bg,
    gallery: [bikeArcade, arcadegamesImg, arcadeBoy, arcadeHall],
    specs: {
      power: '220 W',
      voltage: '220v',
      category: 'Kiddy Ride',
      players: '1 Kid',
      material: 'Commercial Grade ABS & Steel Chassis',
      width: '1100 mm',
      depth: '800 mm',
      height: '1050 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Super%20Speed%20Mini%20Racer'
  },
  'speed-driver-5-twin-motion': {
    slug: 'speed-driver-5-twin-motion',
    name: 'Speed Driver 5 Twin Motion',
    nameBase: 'Speed Driver 5 ',
    nameHighlight: 'Twin Motion',
    category: 'Car Racing Game',
    tagline: 'Motion Force-Feedback Twin Car Racing Arcade Machine with HD Screen',
    img: arcadeBoy,
    heroBg: arcadegame1Bg,
    gallery: [arcadeBoy, bikeArcade, arcadegamesImg, arcadeHall],
    specs: {
      power: '900 W',
      voltage: '220v',
      category: 'Car Racing Simulator',
      players: '2 Players',
      material: 'Commercial Steel Chassis & Motion Base',
      width: '2100 mm',
      depth: '1750 mm',
      height: '2100 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Speed%20Driver%205%20Twin%20Motion'
  },
  'outrun-2-supercar-simulator': {
    slug: 'outrun-2-supercar-simulator',
    name: 'OutRun 2 Supercar Simulator',
    nameBase: 'OutRun 2 ',
    nameHighlight: 'Supercar Simulator',
    category: 'Car Racing Game',
    tagline: 'Ultra-Dynamic Force Feedback Supercar Racing Simulator',
    img: bikeArcade,
    heroBg: arcadegame1Bg,
    gallery: [bikeArcade, arcadegamesImg, arcadeBoy, arcadeHall],
    specs: {
      power: '850 W',
      voltage: '220v',
      category: 'Car Racing Simulator',
      players: '1-2 Players',
      material: 'Imported Steel & Dual HD Displays',
      width: '2000 mm',
      depth: '1650 mm',
      height: '2050 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20OutRun%202%20Supercar%20Simulator'
  },
  'scarlet-dawn-dual-gun-shooter': {
    slug: 'scarlet-dawn-dual-gun-shooter',
    name: 'Scarlet Dawn Dual Gun Shooter',
    nameBase: 'Scarlet Dawn ',
    nameHighlight: 'Dual Gun Shooter',
    category: 'Shooting Games',
    tagline: 'Two-Player Recoil Force Arcade Gun Shooter with Immersive Sound',
    img: arcadeHall,
    heroBg: arcadegame1Bg,
    gallery: [arcadeHall, arcadegamesImg, arcadeBoy, bikeArcade],
    specs: {
      power: '650 W',
      voltage: '220v',
      category: 'Shooting Game',
      players: '2 Players',
      material: 'Heavy Duty Steel & 55" HD Screen',
      width: '1600 mm',
      depth: '1800 mm',
      height: '2250 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Scarlet%20Dawn%20Dual%20Gun%20Shooter'
  },
  'jurassic-motion-arcade-shooter': {
    slug: 'jurassic-motion-arcade-shooter',
    name: 'Jurassic Motion Arcade Shooter',
    nameBase: 'Jurassic Motion ',
    nameHighlight: 'Arcade Shooter',
    category: 'Shooting Games',
    tagline: 'Full Motion Theater Arcade Shooting Game Machine',
    img: arcadeBoy,
    heroBg: arcadegame1Bg,
    gallery: [arcadeBoy, arcadeHall, arcadegamesImg, bikeArcade],
    specs: {
      power: '950 W',
      voltage: '220v',
      category: 'Shooting Simulator',
      players: '2 Players',
      material: 'Enclosed Motion Theater & Surround Sound',
      width: '1850 mm',
      depth: '2200 mm',
      height: '2300 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Jurassic%20Motion%20Arcade%20Shooter'
  },
  'dragon-boxer-punching-machine': {
    slug: 'dragon-boxer-punching-machine',
    name: 'Dragon Boxer Punching Machine',
    nameBase: 'Dragon Boxer ',
    nameHighlight: 'Punching Machine',
    category: 'Strength Based Games',
    tagline: 'Commercial Boxing Punch Strength Tester Arcade Game',
    img: arcadeHall,
    heroBg: arcadegame1Bg,
    gallery: [arcadeHall, arcadeBoy, arcadegamesImg, bikeArcade],
    specs: {
      power: '120 W',
      voltage: '220v',
      category: 'Strength Game',
      players: '1 Player',
      material: 'Industrial Grade Reinforced Steel',
      width: '750 mm',
      depth: '1150 mm',
      height: '2200 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Dragon%20Boxer%20Punching%20Machine'
  },
  'ultimate-hammer-king-pro': {
    slug: 'ultimate-hammer-king-pro',
    name: 'Ultimate Hammer King Pro',
    nameBase: 'Ultimate Hammer King ',
    nameHighlight: 'Pro',
    category: 'Strength Based Games',
    tagline: 'High Power Hammer Strike Carnival Arcade Machine',
    img: arcadeBoy,
    heroBg: arcadegame1Bg,
    gallery: [arcadeBoy, arcadeHall, arcadegamesImg, bikeArcade],
    specs: {
      power: '150 W',
      voltage: '220v',
      category: 'Strength Game',
      players: '1 Player',
      material: 'Heavy Gauge Steel Tower & Padded Anvil',
      width: '800 mm',
      depth: '1200 mm',
      height: '2450 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Ultimate%20Hammer%20King%20Pro'
  }
};

import { useVideoModal } from '../context/VideoModalContext';

export default function ArcadeGameDetail({ siteData }) {
  const { openVideoModal } = useVideoModal();
  const { slug } = useParams();
  const header = siteData?.header || null;
  const footer = siteData?.footer || null;

  // Selected image index for gallery thumbnails
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [slug]);

  // Helper to slugify text
  const slugify = (text) => (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Image lookup map for preset products
  const categoryDefaultImages = {
    "Claw Machine": arcadeHall,
    "Redemption Game": superAirHockeyImg,
    "Bike Racing Game": bikeArcade,
    "Car Racing Game": arcadegamesImg,
    "Shooting Games": arcadeHall,
    "VR Games": arcadeBoy,
    "Kiddy Ride": arcadeBoy,
    "Strength Based Games": arcadeHall,
    "Arcade Games": arcadegamesImg
  };

  const defaultImageMap = {
    'parkour-motor-2-dx': arcadegamesImg,
    'manx-tt-32': bikeArcade,
    'super-air-hockey': superAirHockeyImg,
    'puck-carnival-air-hockey': puckCarnivalAirHockeyImg,
    'dazzling-air-hockey-multi-puck': dazzlingAirHockeyImg,
    'aurora-air-hockey': auroraAirHockeyImg,
    'ocha-air-hockey': ochaAirHockeyImg,
    'aero-x-air-hockey': aeroXAirHockeyImg,
    'astrology-cointopia': arcadeHall,
    'astrology-capsule-version': arcadeBoy,
    'toy-story-plush-claw-machine': arcadeHall,
    'lucky-catcher-crane-machine': arcadeBoy,
    'basketball-star': superAirHockeyImg,
    'pinball-storm': aeroXAirHockeyImg,
    'larva-kids-ride': arcadeBoy,
    'happy-carousel-kiddy-ride': arcadeBoy,
    'super-speed-mini-racer': bikeArcade,
    'speed-driver-5-twin-motion': arcadeBoy,
    'outrun-2-supercar-simulator': bikeArcade,
    'scarlet-dawn-dual-gun-shooter': arcadeHall,
    'jurassic-motion-arcade-shooter': arcadeBoy,
    'dragon-boxer-punching-machine': arcadeHall,
    'ultimate-hammer-king-pro': arcadeBoy
  };

  // Extract dynamic cards from CMS siteData.arcadeCategories
  const cmsArcadeData = siteData?.arcadeCategories;
  const cmsCards = Array.isArray(cmsArcadeData?.cards) ? cmsArcadeData.cards : (Array.isArray(cmsArcadeData) ? cmsArcadeData : []);

  // Find dynamic CMS product card matching slug
  const cmsFoundCard = cmsCards.find(c => {
    const cardTitleSlug = slugify(c.title || c.name);
    const cardSlug = (c.slug && c.slug !== 'new-arcade-game') ? c.slug : cardTitleSlug;
    return (
      cardSlug === slug ||
      cardTitleSlug === slug ||
      (c.slug && c.slug === slug) ||
      (c.title && slugify(c.title) === slug) ||
      (c.name && slugify(c.name) === slug) ||
      (c.title && c.title.toLowerCase().trim() === (slug || '').replace(/-/g, ' ').toLowerCase().trim()) ||
      (c.name && c.name.toLowerCase().trim() === (slug || '').replace(/-/g, ' ').toLowerCase().trim()) ||
      (c._id && String(c._id) === slug) ||
      (c.id && String(c.id) === slug)
    );
  });

  // Find in master catalog
  const masterCards = Array.isArray(allArcadeProducts?.cards) ? allArcadeProducts.cards : [];
  const masterFoundCard = masterCards.find(c => {
    const cardTitleSlug = slugify(c.title || c.name);
    return (
      c.slug === slug ||
      cardTitleSlug === slug ||
      (c.title && c.title.toLowerCase().trim() === (slug || '').replace(/-/g, ' ').toLowerCase().trim()) ||
      (c.name && c.name.toLowerCase().trim() === (slug || '').replace(/-/g, ' ').toLowerCase().trim())
    );
  });

  // Find preset product by slug or name
  const targetSlug = (cmsFoundCard?.slug && cmsFoundCard?.slug !== 'new-arcade-game')
    ? cmsFoundCard.slug
    : (masterFoundCard?.slug || (slugify(cmsFoundCard?.name || cmsFoundCard?.title || masterFoundCard?.name || masterFoundCard?.title) || slug));

  const presetKey = Object.keys(arcadeProductsData).find(k => 
    k === targetSlug || 
    k === slug || 
    slugify(arcadeProductsData[k].name) === targetSlug || 
    slugify(arcadeProductsData[k].name) === slug
  );

  const defaultProduct = masterFoundCard
    ? {
        name: masterFoundCard.name || masterFoundCard.title,
        category: masterFoundCard.category || 'Arcade Games',
        tagline: masterFoundCard.desc || `Commercial ${masterFoundCard.category} arcade game machine.`,
        img: masterFoundCard.img || categoryDefaultImages[masterFoundCard.category] || arcadegamesImg,
        heroBg: arcadegame1Bg,
        gallery: masterFoundCard.img ? [masterFoundCard.img] : [categoryDefaultImages[masterFoundCard.category] || arcadegamesImg],
        specs: {
          power: masterFoundCard.power || '450 W',
          voltage: masterFoundCard.voltage || '220v',
          category: masterFoundCard.category || 'Arcade Games',
          players: masterFoundCard.players || '1-2 Players',
          material: masterFoundCard.material || 'Commercial Steel & Acrylic',
          width: masterFoundCard.width || '1200 mm',
          depth: masterFoundCard.depth || '1100 mm',
          height: masterFoundCard.height || '2100 mm'
        }
      }
    : (presetKey ? arcadeProductsData[presetKey] : (arcadeProductsData[slug] || {
        name: (slug || 'Arcade Game').replace(/-/g, ' ').toUpperCase(),
        category: 'Arcade Games',
        tagline: 'Commercial Arcade Game Machine',
        img: arcadegamesImg,
        heroBg: arcadegame1Bg,
        gallery: [arcadegamesImg],
        specs: {
          power: '450 W',
          voltage: '220v',
          category: 'Arcade Games',
          players: '1-2 Players',
          material: 'Commercial Steel & Acrylic',
          width: '1200 mm',
          depth: '1100 mm',
          height: '2100 mm'
        }
      }));

  const defaultGallery = defaultProduct.gallery || [defaultProduct.img];

  // Resolve main image safely
  const rawMainImg = masterFoundCard?.imageUrl || masterFoundCard?.img || cmsFoundCard?.imageUrl || cmsFoundCard?.img || defaultProduct.img || categoryDefaultImages[masterFoundCard?.category || cmsFoundCard?.category] || arcadegamesImg;
  const resolvedMainImg = getValidImageUrl(rawMainImg, defaultProduct.img || arcadegamesImg);

  // Collect ONLY uploaded gallery photos
  let customGalleries = [];
  if (Array.isArray(cmsFoundCard?.gallery) && cmsFoundCard.gallery.length > 0) {
    customGalleries = cmsFoundCard.gallery.filter(g => typeof g === 'string' && g.trim() !== '');
  }
  if (customGalleries.length === 0) {
    const direct = [
      cmsFoundCard?.gallery1,
      cmsFoundCard?.gallery2,
      cmsFoundCard?.gallery3,
      cmsFoundCard?.gallery4,
      cmsFoundCard?.gallery5,
      cmsFoundCard?.gallery6
    ].filter(g => typeof g === 'string' && g.trim() !== '');
    if (direct.length > 0) {
      customGalleries = direct;
    }
  }

  let galleryList = [];
  if (customGalleries.length > 0) {
    const mapped = customGalleries.map(img => getValidImageUrl(img, resolvedMainImg));
    if (resolvedMainImg && !mapped.includes(resolvedMainImg)) {
      galleryList = [resolvedMainImg, ...mapped];
    } else {
      galleryList = mapped;
    }
  } else if (masterFoundCard?.img || cmsFoundCard?.img || cmsFoundCard?.imageUrl) {
    galleryList = [resolvedMainImg];
  } else {
    // Untouched default fallback mockups
    galleryList = defaultGallery.map(img => getValidImageUrl(img, resolvedMainImg));
  }

  // Calculate nameBase and nameHighlight cleanly to avoid duplicating title text
  let finalNameBase = defaultProduct.nameBase;
  let finalNameHighlight = defaultProduct.nameHighlight;

  if (cmsFoundCard?.nameBase !== undefined && cmsFoundCard?.nameHighlight !== undefined) {
    finalNameBase = cmsFoundCard.nameBase;
    finalNameHighlight = cmsFoundCard.nameHighlight;
  } else if (cmsFoundCard?.title || cmsFoundCard?.name) {
    const fullTitle = cmsFoundCard.title || cmsFoundCard.name;
    const highlight = cmsFoundCard?.nameHighlight || (presetKey ? defaultProduct?.nameHighlight : '');
    if (highlight && fullTitle.endsWith(highlight)) {
      finalNameBase = fullTitle.slice(0, fullTitle.length - highlight.length);
      finalNameHighlight = highlight;
    } else if (presetKey && defaultProduct?.nameBase && fullTitle === defaultProduct.name) {
      finalNameBase = defaultProduct.nameBase;
      finalNameHighlight = defaultProduct.nameHighlight;
    } else {
      finalNameBase = fullTitle;
      finalNameHighlight = '';
    }
  } else if (masterFoundCard?.title || masterFoundCard?.name) {
    finalNameBase = masterFoundCard.title || masterFoundCard.name;
    finalNameHighlight = '';
  }

  // Construct dynamic product object
  const productName = cmsFoundCard?.name || cmsFoundCard?.title || masterFoundCard?.name || masterFoundCard?.title || defaultProduct.name;
  const productCategory = cmsFoundCard?.category || cmsFoundCard?.specsCategory || masterFoundCard?.category || defaultProduct.category;

  const product = {
    name: productName,
    nameBase: finalNameBase || productName,
    nameHighlight: finalNameHighlight || '',
    category: productCategory,
    tagline: cmsFoundCard?.tagline || cmsFoundCard?.desc || masterFoundCard?.desc || defaultProduct.tagline || `Commercial ${productCategory} machine.`,
    img: resolvedMainImg,
    heroBg: defaultProduct.heroBg || arcadegame1Bg,
    specs: {
      power: cmsFoundCard?.power || masterFoundCard?.power || defaultProduct.specs?.power || '450 W',
      voltage: cmsFoundCard?.voltage || masterFoundCard?.voltage || defaultProduct.specs?.voltage || '220v',
      category: cmsFoundCard?.specsCategory || cmsFoundCard?.category || masterFoundCard?.category || defaultProduct.specs?.category || productCategory,
      players: cmsFoundCard?.players || masterFoundCard?.players || defaultProduct.specs?.players || '1-2 Players',
      material: cmsFoundCard?.material || masterFoundCard?.material || defaultProduct.specs?.material || 'Commercial Steel & Acrylic Top',
      width: cmsFoundCard?.width || masterFoundCard?.width || defaultProduct.specs?.width || '1200 mm',
      depth: cmsFoundCard?.depth || masterFoundCard?.depth || defaultProduct.specs?.depth || '1100 mm',
      height: cmsFoundCard?.height || masterFoundCard?.height || defaultProduct.specs?.height || '2100 mm'
    },
    gallery: galleryList,
    videoUrl: cmsFoundCard?.videoUrl || defaultProduct.videoUrl,
    quoteUrl: cmsFoundCard?.quoteUrl || defaultProduct.quoteUrl || `https://wa.me/919428989488?text=${encodeURIComponent(`Hello Winera, I want a quote for ${productName}`)}`,
    features: [
      {
        num: "1.",
        title: (cmsFoundCard?.feature1Title !== undefined && cmsFoundCard?.feature1Title !== '') ? cmsFoundCard.feature1Title : (defaultProduct.features?.[0]?.title || "12+ Years of Expertise"),
        desc: (cmsFoundCard?.feature1Desc !== undefined && cmsFoundCard?.feature1Desc !== '') ? cmsFoundCard.feature1Desc : (defaultProduct.features?.[0]?.desc || "Proven experience delivering game zone projects across malls, hotels, schools, and resorts since 2014.")
      },
      {
        num: "2.",
        title: (cmsFoundCard?.feature2Title !== undefined && cmsFoundCard?.feature2Title !== '') ? cmsFoundCard.feature2Title : (defaultProduct.features?.[1]?.title || "Quality & Safety Standards"),
        desc: (cmsFoundCard?.feature2Desc !== undefined && cmsFoundCard?.feature2Desc !== '') ? cmsFoundCard.feature2Desc : (defaultProduct.features?.[1]?.desc || "Every product sourced from global manufacturers and tested for commercial-grade safety and durability.")
      },
      {
        num: "3.",
        title: (cmsFoundCard?.feature3Title !== undefined && cmsFoundCard?.feature3Title !== '') ? cmsFoundCard.feature3Title : (defaultProduct.features?.[2]?.title || "ROI-First Approach"),
        desc: (cmsFoundCard?.feature3Desc !== undefined && cmsFoundCard?.feature3Desc !== '') ? cmsFoundCard.feature3Desc : (defaultProduct.features?.[2]?.desc || "Every project begins with a free ROI report, revenue and break-even calculated before you invest.")
      },
      {
        num: "4.",
        title: (cmsFoundCard?.feature4Title !== undefined && cmsFoundCard?.feature4Title !== '') ? cmsFoundCard.feature4Title : (defaultProduct.features?.[3]?.title || "Reliable Pan-India Service"),
        desc: (cmsFoundCard?.feature4Desc !== undefined && cmsFoundCard?.feature4Desc !== '') ? cmsFoundCard.feature4Desc : (defaultProduct.features?.[3]?.desc || "Our own team installs and supports every project across 50+ cities on time, every time.")
      }
    ]
  };

  const thumbRefs = useRef([]);
  const thumbContainerRef = useRef(null);

  useEffect(() => {
    document.title = `${product.name} | Arcade Game Machine | Winera International`;
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    if (thumbRefs.current[selectedImageIndex]) {
      thumbRefs.current[selectedImageIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [selectedImageIndex]);

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      <main id="main-content">
        {/* 2. HERO SECTION BANNER USING arcadegame1-bg.webp */}
        <section 
          className="winera-arcade-hero-section" 
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '175px',
            paddingBottom: '95px',
            background: `url(${arcadegame1Bg}) center top / 100% 100% no-repeat`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#ffffff'
          }}
        >
          {/* Breadcrumb Title: Home › [Product Name] */}
          <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
            <h1 className="winera-arcade-hero-h1" style={{
              fontSize: '21px',
              fontWeight: '800',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              margin: 0,
              lineHeight: 1.2,
              textAlign: 'center',
              flexWrap: 'wrap'
            }}>
              <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
              <Link to="/product/arcade-games" style={{ color: '#ffffff', textDecoration: 'none' }}>Arcade Games</Link>
              <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
              <span style={{ color: '#ffcd00', fontWeight: '900' }}>
                {product.name}
              </span>
            </h1>
          </div>
        </section>

        {/* 3. PRODUCT SPECIFICATION BLOCK IN HERO SECTION BOTTOM (MATCHING FIGMA/DESIGN SCREENSHOT 1:1) */}
        <section className="winera-arcade-specs-section" style={{ padding: '70px 4vw 90px', background: '#F5F5F9' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(480px, 550px) 1fr',
              gap: '28px',
              alignItems: 'start'
            }} className="winera-arcade-specs-grid">

              {/* Left Group: Side-by-Side Thumbnails + Main Showcase Card (Matching Image 2) */}
              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'stretch',
                width: '100%'
              }} className="winera-arcade-left-group">

                {/* 1. Left Vertical Thumbnails Menu */}
                {product.gallery.length > 1 && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '450px',
                    width: '85px',
                    flexShrink: 0
                  }} className="winera-arcade-thumb-column">
                    {/* Top / Left Arrow */}
                    <button
                      onClick={() => setSelectedImageIndex(prev => (prev > 0 ? prev - 1 : product.gallery.length - 1))}
                      aria-label="Previous image"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0284c7', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <ChevronUp className="winera-arrow-up" style={{ width: '32px', height: '32px', strokeWidth: 2.5 }} />
                      <ChevronLeft className="winera-arrow-left" style={{ width: '30px', height: '30px', strokeWidth: 2.5 }} />
                    </button>

                    {/* Thumbnails (1 to 6) */}
                    <div
                      ref={thumbContainerRef}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: product.gallery.length <= 4 ? 'space-evenly' : 'flex-start',
                        alignItems: 'center',
                        gap: '8px',
                        height: 'calc(100% - 66px)',
                        width: '100%',
                        padding: '4px 0',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                      }}
                      className="winera-arcade-thumb-inner"
                    >
                      {product.gallery.map((thumbUrl, thumbIdx) => {
                        const isSelected = selectedImageIndex === thumbIdx;
                        const boxSize = product.gallery.length > 4 ? '70px' : '78px';
                        return (
                          <div
                            key={thumbIdx}
                            ref={el => (thumbRefs.current[thumbIdx] = el)}
                            onClick={() => setSelectedImageIndex(thumbIdx)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Select product view ${thumbIdx + 1}`}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                setSelectedImageIndex(thumbIdx);
                              }
                            }}
                            style={{
                              width: boxSize,
                              height: boxSize,
                              borderRadius: '16px',
                              overflow: 'hidden',
                              background: 'radial-gradient(circle at center, #1e293b 0%, #090d16 100%)',
                              border: isSelected ? '2.5px solid #38bdf8' : '1px solid rgba(203, 213, 225, 0.4)',
                              boxShadow: isSelected ? '0 0 16px rgba(56, 189, 248, 0.8), 0 4px 12px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.08)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '4px',
                              flexShrink: 0,
                              transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            className="winera-arcade-thumb-box"
                          >
                            <img
                              src={thumbUrl}
                              alt=""
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = defaultProduct.img || arcadegamesImg;
                              }}
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom / Right Arrow */}
                    <button
                      onClick={() => setSelectedImageIndex(prev => (prev < product.gallery.length - 1 ? prev + 1 : 0))}
                      aria-label="Next image"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0284c7', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <ChevronDown className="winera-arrow-down" style={{ width: '32px', height: '32px', strokeWidth: 2.5 }} />
                      <ChevronRight className="winera-arrow-right" style={{ width: '30px', height: '30px', strokeWidth: 2.5 }} />
                    </button>
                  </div>
                )}

                {/* 2. Center Main Product Image Showcase Card */}
                <div style={{
                  flex: 1,
                  minWidth: 0,
                  height: '450px',
                  borderRadius: '28px',
                  background: '#ffffff',
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '20px'
                }} className="winera-arcade-main-card">
                  <img
                    key={selectedImageIndex}
                    src={product.gallery[selectedImageIndex] || product.img || arcadegamesImg}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultProduct.img || arcadegamesImg;
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      position: 'relative',
                      zIndex: 2,
                      transition: 'opacity 0.2s ease'
                    }}
                  />
                </div>
              </div>

              {/* 3. Right Details & Specifications */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '8px' }} className="winera-arcade-details-col">
                {/* Yellow Brush Stroke Line Accent */}
                <img
                  src={yellowBrushAccent}
                  alt=""
                  style={{ width: '380px', maxWidth: '92%', height: '8px', objectFit: 'fill', marginBottom: '4px' }}
                />

                {/* Title */}
                <h2 style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                  {product.nameBase || product.name || "Parkour Motor "}
                  {product.nameHighlight ? (
                    <>
                      {(!String(product.nameBase || product.name || '').endsWith(' ') && !String(product.nameHighlight || '').startsWith(' ')) ? ' ' : ''}
                      <span style={{ color: '#38bdf8' }}>{product.nameHighlight}</span>
                    </>
                  ) : null}
                </h2>

                {/* Specification Long Banner */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, rgba(56, 189, 248, 0.5) 55%, rgba(56, 189, 248, 0) 100%)',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '14px',
                  padding: '7px 16px',
                  borderRadius: '2px',
                  display: 'block',
                  width: '82%',
                  maxWidth: '360px',
                  marginTop: '4px'
                }} className="winera-arcade-banner-pill">
                  Specification:
                </div>

                {/* Specs Key-Value List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }} className="winera-arcade-specs-list">
                  <div><strong style={{ color: '#0f172a' }}>Power :</strong> {product.specs.power}</div>
                  <div><strong style={{ color: '#0f172a' }}>Voltage :</strong> {product.specs.voltage}</div>
                  <div><strong style={{ color: '#0f172a' }}>Category :</strong> {product.specs.category}</div>
                  <div><strong style={{ color: '#0f172a' }}>Players :</strong> {product.specs.players}</div>
                  <div><strong style={{ color: '#0f172a' }}>Main Material :</strong> {product.specs.material}</div>
                </div>

                {/* Dimension Long Banner */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, rgba(56, 189, 248, 0.5) 55%, rgba(56, 189, 248, 0) 100%)',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '14px',
                  padding: '7px 16px',
                  borderRadius: '2px',
                  display: 'block',
                  width: '82%',
                  maxWidth: '360px',
                  marginTop: '8px'
                }} className="winera-arcade-banner-pill">
                  Dimension :
                </div>

                {/* 3 Dimension Cards */}
                <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }} className="winera-arcade-dim-container">
                  {/* Width */}
                  <div style={{
                    width: '115px',
                    background: 'linear-gradient(180deg, rgba(216, 244, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                    border: '1px solid rgba(0, 174, 239, 0.6)',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0, 129, 178, 0.15)',
                    padding: '14px 6px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }} className="winera-arcade-dim-card">
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px', background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a'
                    }}>
                      <MoveHorizontal style={{ width: '22px', height: '22px', strokeWidth: 2.2 }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Width</span>
                    <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600' }}>{product.specs.width}</span>
                  </div>

                  {/* Depth */}
                  <div style={{
                    width: '115px',
                    background: 'linear-gradient(180deg, rgba(216, 244, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                    border: '1px solid rgba(0, 174, 239, 0.6)',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0, 129, 178, 0.15)',
                    padding: '14px 6px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }} className="winera-arcade-dim-card">
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px', background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a'
                    }}>
                      <Box style={{ width: '22px', height: '22px', strokeWidth: 2.2 }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Depth</span>
                    <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600' }}>{product.specs.depth}</span>
                  </div>

                  {/* Height */}
                  <div style={{
                    width: '115px',
                    background: 'linear-gradient(180deg, rgba(216, 244, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                    border: '1px solid rgba(0, 174, 239, 0.6)',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0, 129, 178, 0.15)',
                    padding: '14px 6px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }} className="winera-arcade-dim-card">
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px', background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a'
                    }}>
                      <Ruler style={{ width: '22px', height: '22px', strokeWidth: 2.2 }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Height</span>
                    <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600' }}>{product.specs.height}</span>
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '18px', flexWrap: 'wrap' }} className="winera-arcade-cta-row">
                  {/* Button 1: Watch Video with arcadegame-button-1.png BG */}
                  <button
                    onClick={() => openVideoModal(product.videoUrl, `${product.name} Showcase`)}
                    style={{
                      width: '190px',
                      height: '70px',
                      background: `url(${getValidImageUrl(siteData?.arcadeIntro?.videoBtnBg, arcadeBtn1)}) center center / 100% 100% no-repeat`,
                      color: '#ffffff',
                      fontSize: '15px',
                      fontWeight: '600',
                      border: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      padding: '7px 5px 2px 0',
                      textDecoration: 'none'
                    }}
                  >
                    <span>{siteData?.arcadeIntro?.videoBtnText || "Watch Video"}</span>
                  </button>

                  {/* Button 2: Get a Quote with arcadegame-button-2.png BG */}
                  {(() => {
                    const rawQuoteUrl = product.quoteUrl || "https://wa.me/919428989488";
                    let hrefUrl = rawQuoteUrl;
                    if (!rawQuoteUrl.includes('text=')) {
                      const defaultMsg = `Hello Winera International! I want to get a quote for ${product.name || 'this arcade machine'}. Please share price and details. [Ref: Arcade Game - ${product.name || 'Detail'}]`;
                      const separator = rawQuoteUrl.includes('?') ? '&' : '?';
                      hrefUrl = `${rawQuoteUrl}${separator}text=${encodeURIComponent(defaultMsg)}`;
                    }

                    return (
                      <a
                        href={hrefUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          width: '190px',
                          height: '70px',
                          background: `url(${getValidImageUrl(siteData?.arcadeIntro?.quoteBtnBg, arcadeBtn2)}) center center / 100% 100% no-repeat`,
                          color: '#0f172a',
                          fontSize: '15px',
                          fontWeight: '700',
                          border: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          padding: '6px 5px 2px 0',
                          textDecoration: 'none'
                        }}
                      >
                        <span>{siteData?.arcadeIntro?.quoteBtnText || "Get a Quote"}</span>
                      </a>
                    );
                  })()}
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 4. SPECIFICATION DETAIL SECTION (MATCHING DESIGN SCREENSHOT 1:1) */}
        <section className="winera-arcade-detail-section" style={{ padding: '40px 4vw 90px', background: '#F5F5F9' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            {/* Section Header with Yellow Brush Accent Line */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={yellowBrushAccent}
                alt=""
                style={{ width: '380px', maxWidth: '90%', height: '8px', objectFit: 'fill', marginBottom: '4px' }}
              />
              <h2 style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                Specification <span style={{ color: '#38bdf8' }}>Detail</span>
              </h2>
            </div>

            {/* Horizontal Rule Below Title Text */}
            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '28px 0 45px', width: '100%' }} />

            {/* 2x2 Grid of Feature Specification Cards with Top-Left & Bottom-Right Gradient Border */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: '24px'
            }} className="winera-spec-details-grid">
              {(product.features || []).map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 50%, rgba(216, 244, 255, 0.45) 100%) padding-box, linear-gradient(135deg, #38bdf8 0%, rgba(56, 189, 248, 0.08) 35%, rgba(56, 189, 248, 0.08) 65%, #38bdf8 100%) border-box',
                    border: '1.5px solid transparent',
                    borderRadius: '20px',
                    boxShadow: '0 4px 16px rgba(56, 189, 248, 0.08)',
                    padding: '28px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'all 0.3s ease'
                  }}
                  className="winera-spec-detail-card-hover"
                >
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#0f172a', fontWeight: '900' }}>{card.num}</span>
                    <span>{card.title}</span>
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, margin: 0, fontWeight: '500' }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. NEED ANY CONSULTATIONS CTA BANNER SECTION */}
        <CtaBanner
          pageSource={`Arcade Games › ${cmsFoundCard?.title || cmsFoundCard?.name || defaultProduct?.name || defaultProduct?.title || 'Game'}`}
          showOverlay={false}
          align="center"
          gradientTitle={true}
          buttonTheme="yellow"
          titleFontSize="35px"
          subtitleFontSize="20px"
          subtitleFontWeight="400"
          bgUrl={siteData?.arcadeCta?.bgUrl && !siteData.arcadeCta.bgUrl.includes('project-cta-bg') && !siteData.arcadeCta.bgUrl.includes('need-consultations-bg') ? siteData.arcadeCta.bgUrl : null}
          bg={arcadeCtaBg}
          tagline={null}
          title="Need Any Consultations?"
          subtitle={"We're Ready To Give Answers To <br/>Your Question."}
          description={null}
          buttonText="Get Quote Now"
          buttonLink={product.quoteUrl || "https://wa.me/919428989488"}
        />
      </main>

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
