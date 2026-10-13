import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RelatedProductsSection from '../components/RelatedProductsSection';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import MobileExpandableText from '../components/MobileExpandableText';
const projectBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/pdvhuaaasj3iyex07yql.png";
const gameZoneMobileBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345650/winera_uploads/eqjkboeokagpaus2ifxa.png";
const projectImage01 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/igg4yrl7xhnxllqifpj7.jpg";
const projectImage2Bg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/hjfo9tsk0tmkxgz1x2ab.png";
const projectImage3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/hifdo3jiuvbvu4cxkgq4.jpg";
const projectImage4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/nt4puaf87gc83fawddbc.jpg";
const projectImagesBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/kp4vrfwgnohju6x2hlae.png";
const projectGalleryTopCut = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345678/winera_uploads/mbslvxbxfelwdaand4ws.png";
const projectGalleryBottomCut = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/hwh78614omdrozwjtyn2.png";
const projectBlock1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/vxfee3fxtxt09nu04bd8.png";
const projectBlock2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/vqhjjj1ruclhqyadhdso.png";
const projectBlock3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/w47edsuankt5lteq3ghx.png";
const projectSectionVideo = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/nd79kzv2qshsmkkeeun3.png";
const yellowStrokeLine = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345696/winera_uploads/kllqvzchxecftuxi6zdn.png";
import CtaBanner from '../components/CtaBanner';
import projectsData from '../data/projectsData.json';
const bumpercarCtaBannerBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/ncvfqvtbv4zdvf9cd4n7.jpg";
const projHulaboo = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/a52mbp31belkkslptdal.jpg";
const projNeon1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/s8v6jwxs7eyoq877yeso.jpg";
const projSoft1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/olzpipldgl4mnb7c1y5q.jpg";

const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('/src/assets/')) {
    return fallback;
  }
  if (url.startsWith('https://res.cloudinary.com/') || url.startsWith('https://images.unsplash.com/') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/assets/Skadoosh ( Bengaluru )/')) {
    return url;
  }
  if (url.startsWith('/assets/Pop A Puddle ( Bengaluru )/')) {
    return url;
  }
  if (url.includes('FifthAlley') || url.includes('fifthalley')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('information')) {
      return '/assets/FifthAlley-Sport-Bowling/basic-information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/FifthAlley-Sport-Bowling/what-the-client-wanted.jpg';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/FifthAlley-Sport-Bowling/what-solution-we-provide.jpg';
    }
    const galMatch = url.match(/gallery[-_\s]*(\d)\.(jpg|webp)/i);
    if (galMatch) {
      return `/assets/FifthAlley-Sport-Bowling/gallery-${galMatch[1]}.${galMatch[2].toLowerCase()}`;
    }
    return '/assets/FifthAlley-Sport-Bowling/fifthalley-sport-bowling.jpg';
  }
  if (url.includes('Hulaboo') || url.includes('hulaboo')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('information')) {
      return '/assets/Hulaboo ( Surat )/Basic Information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/Hulaboo ( Surat )/What the Client Wanted.jpg';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/Hulaboo ( Surat )/What Solution We Provide.webp';
    }
    const galMatch = url.match(/gallery[-_\s]*(\d)\.(jpg|webp)/i);
    if (galMatch) {
      const ext = galMatch[1] === '2' ? 'webp' : 'jpg';
      return `/assets/Hulaboo ( Surat )/Gallery ${galMatch[1]}.${ext}`;
    }
    return '/assets/Hulaboo ( Surat )/1st Image.jpg';
  }
  if (url.includes('LaneX') || url.includes('lanex')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('information')) {
      return '/assets/LaneX Bowling Alley ( Surat )/Basic Information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/LaneX Bowling Alley ( Surat )/What the Client Wanted.jpg';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/LaneX Bowling Alley ( Surat )/What Solution We Provide.webp';
    }
    const galMatch = url.match(/gallery[-_\s]*(\d)\.(jpg|webp)/i);
    if (galMatch) {
      const idx = galMatch[1];
      const ext = ['2', '3', '4', '5', '6'].includes(idx) ? 'webp' : 'jpg';
      const spaces = ['2', '3'].includes(idx) ? '  ' : ' ';
      return `/assets/LaneX Bowling Alley ( Surat )/Gallery${spaces}${idx}.${ext}`;
    }
    return '/assets/LaneX Bowling Alley ( Surat )/1st Image.jpg';
  }
  if (url.includes('Playzonia') || url.includes('playzonia')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('information')) {
      return '/assets/Playzonia Kids Play Area ( Surat )/Basic Information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/Playzonia Kids Play Area ( Surat )/What the Client Wanted.jpg';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/Playzonia Kids Play Area ( Surat )/What Solution We Provide.jpg';
    }
    const galMatch = url.match(/gallery[-_\s]*(\d)\.(jpg|webp)/i);
    if (galMatch) {
      const idx = galMatch[1];
      const spaces = ['2', '3', '4', '6'].includes(idx) ? '  ' : ' ';
      return `/assets/Playzonia Kids Play Area ( Surat )/Gallery${spaces}${idx}.jpg`;
    }
    return '/assets/Playzonia Kids Play Area ( Surat )/1st Image.jpg';
  }
  if (url.includes('Rebounce') || url.includes('rebounce')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('information')) {
      return '/assets/Rebounce Game Zone ( Surat )/Basic Information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/Rebounce Game Zone ( Surat )/What the Client Wanted.jpg';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/Rebounce Game Zone ( Surat )/What Solution We Provide.jpg';
    }
    const galMatch = url.match(/gallery[-_\s]*(\d)\.(jpg|webp)/i);
    if (galMatch) {
      const idx = galMatch[1];
      const ext = idx === '6' ? 'webp' : 'jpg';
      return `/assets/Rebounce Game Zone ( Surat )/Gallery ${idx}.${ext}`;
    }
    return '/assets/Rebounce Game Zone ( Surat )/1st Image.jpg';
  }
  if (url.includes('Rock And Bowl') || url.includes('rock-and-bowl') || url.includes('rock and bowl')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('information')) {
      return '/assets/Rock And Bowl ( Vapi )/Basic Information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/Rock And Bowl ( Vapi )/What the Client Wanted.webp';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/Rock And Bowl ( Vapi )/What Solution We Provide.jpg';
    }
    const galMatch = url.match(/gall?e?ry[-_\s]*(\d)\.(jpg|webp)/i);
    if (galMatch) {
      const idx = galMatch[1];
      if (idx === '2') return '/assets/Rock And Bowl ( Vapi )/Gallery 2.webp';
      if (idx === '3') return '/assets/Rock And Bowl ( Vapi )/Galley 3.jpg';
      if (idx === '6') return '/assets/Rock And Bowl ( Vapi )/Gallery 6.webp';
      if (idx === '7') return '/assets/Rock And Bowl ( Vapi )/galley 7.jpg';
      return `/assets/Rock And Bowl ( Vapi )/Gallery ${idx}.jpg`;
    }
    return '/assets/Rock And Bowl ( Vapi )/1st Image.jpg';
  }
  if (url.includes('Level Up') || url.includes('level-up') || url.includes('level up') || url.includes('Morbi') || url.includes('morbi')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('information')) {
      return '/assets/Level Up ( Morbi )/Basic Information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/Level Up ( Morbi )/What the Client Wanted.jpg';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/Level Up ( Morbi )/What Solution We Provide.webp';
    }
    const galMatch = url.match(/gall?e?ry[-_\s]*(\d)\.(jpg|webp)/i);
    if (galMatch) {
      const idx = galMatch[1];
      if (idx === '1') return '/assets/Level Up ( Morbi )/gallery 1.jpg';
      if (idx === '2') return '/assets/Level Up ( Morbi )/Gallery 2.jpg';
      return `/assets/Level Up ( Morbi )/Gallery ${idx}.webp`;
    }
    return '/assets/Level Up ( Morbi )/1st Image.jpg';
  }
  if (url.includes('Rumble Zone') || url.includes('rumble-zone') || url.includes('rumble zone') || url.includes('Gurugram') || url.includes('gurugram')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('information')) {
      return '/assets/Rumble Zone ( Gurugram )/Basic information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/Rumble Zone ( Gurugram )/What the Client Wanted.jpg';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/Rumble Zone ( Gurugram )/What Solution We Provide.jpg';
    }
    const galMatch = url.match(/gall?e?ry[-_\s]*(\d)\.(jpg|webp)/i);
    if (galMatch) {
      const idx = galMatch[1];
      if (['1', '2', '4'].includes(idx)) return `/assets/Rumble Zone ( Gurugram )/gallery ${idx}.webp`;
      return `/assets/Rumble Zone ( Gurugram )/Gallery ${idx}.webp`;
    }
    return '/assets/Rumble Zone ( Gurugram )/1st Image.jpg';
  }
  if (url.includes('Fun Factory') || url.includes('the-fun-factory') || url.includes('fun-factory') || url.includes('Nallasopara') || url.includes('Nalasopara') || url.includes('nalasopara')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('information')) {
      return '/assets/The Fun Factory ( Nalasopara )/Basic Information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/The Fun Factory ( Nalasopara )/what the client wanted.jpg';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/The Fun Factory ( Nalasopara )/What Solution We Provide.jpg';
    }
    const galMatch = url.match(/gall?e?ry[-_\s]*(\d)\.(jpg|webp|jpeg)/i);
    if (galMatch) {
      const idx = galMatch[1];
      if (idx === '2') return '/assets/The Fun Factory ( Nalasopara )/Gallery 2.jpeg';
      return `/assets/The Fun Factory ( Nalasopara )/Gallery ${idx}.jpg`;
    }
    return '/assets/The Fun Factory ( Nalasopara )/1st image.jpg';
  }
  if (url.includes('Skadoosh') || url.includes('skadoosh-play-area') || url.includes('skadoosh')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('detail') || lower.includes('information')) {
      return '/assets/Skadoosh ( Bengaluru )/Basic Information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/Skadoosh ( Bengaluru )/What the Client Wanted.jpg';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/Skadoosh ( Bengaluru )/What Solution We Provide.webp';
    }
    const galMatch = url.match(/gall?[ea]ry[-_\s]*(\d+)\.(jpg|webp|jpeg)/i);
    if (galMatch) {
      const idx = galMatch[1];
      if (['1', '2', '3', '5', '6'].includes(idx)) return `/assets/Skadoosh ( Bengaluru )/Gallery ${idx}.jpg`;
      return `/assets/Skadoosh ( Bengaluru )/Gallery ${idx}.webp`;
    }
    return '/assets/Skadoosh ( Bengaluru )/1st image.jpg';
  }
  if (url.includes('Pop A Puddle') || url.includes('pop-a-puddle') || url.includes('pop a puddle')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('detail') || lower.includes('information')) {
      return '/assets/Pop A Puddle ( Bengaluru )/Basic Detail.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/Pop A Puddle ( Bengaluru )/What the client Wanted.webp';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/Pop A Puddle ( Bengaluru )/What Solution We Provide.jpg';
    }
    const galMatch = url.match(/gall?[ea]ry[-_\s]*(\d+)\.(jpg|webp|jpeg)/i);
    if (galMatch) {
      const idx = galMatch[1];
      if (idx === '1') return '/assets/Pop A Puddle ( Bengaluru )/Gallery 1.webp';
      if (idx === '2') return '/assets/Pop A Puddle ( Bengaluru )/Gallery 2.jpg';
      if (idx === '3') return '/assets/Pop A Puddle ( Bengaluru )/gallery 3.jpg';
      if (idx === '4') return '/assets/Pop A Puddle ( Bengaluru )/Gallery 4.jpg';
      if (idx === '5') return '/assets/Pop A Puddle ( Bengaluru )/Gallery 5.jpg';
      if (idx === '6') return '/assets/Pop A Puddle ( Bengaluru )/gallery 6.jpg';
      if (idx === '7') return '/assets/Pop A Puddle ( Bengaluru )/Gallery 7.webp';
      if (idx === '8') return '/assets/Pop A Puddle ( Bengaluru )/Gallary 8.webp';
      if (idx === '9') return '/assets/Pop A Puddle ( Bengaluru )/Gallery 9.webp';
      if (idx === '10') return '/assets/Pop A Puddle ( Bengaluru )/Gallery 10.webp';
      if (idx === '11') return '/assets/Pop A Puddle ( Bengaluru )/gallery 11.webp';
      return `/assets/Pop A Puddle ( Bengaluru )/Gallery ${idx}.webp`;
    }
    return '/assets/Pop A Puddle ( Bengaluru )/1st image.jpg';
  }
  if (url.includes('VR 360') || url.includes('vr-360') || url.includes('vr 360') || url.includes('Gandhidham') || url.includes('gandhidham')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('detail') || lower.includes('information')) {
      return '/assets/VR 360 Game  Zone ( Gandhidham )/Basic Information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/VR 360 Game  Zone ( Gandhidham )/What the Client Wanted.webp';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/VR 360 Game  Zone ( Gandhidham )/What Solution We Provide.jpg';
    }
    const galMatch = url.match(/gall?[ea]ry[-_\s]*(\d+)\.(jpg|webp|jpeg)/i);
    if (galMatch) {
      const idx = galMatch[1];
      if (idx === '1' || idx === '6') return `/assets/VR 360 Game  Zone ( Gandhidham )/Gallery ${idx}.jpg`;
      return `/assets/VR 360 Game  Zone ( Gandhidham )/Gallery ${idx}.webp`;
    }
    return '/assets/VR 360 Game  Zone ( Gandhidham )/1st image.png';
  }
  if (url.includes('Altitude') || url.includes('altitude') || url.includes('ball in ball out') || url.includes('ball-in-ball-out')) {
    const lower = url.toLowerCase();
    if (lower.includes('basic') || lower.includes('detail') || lower.includes('information')) {
      return '/assets/Altitude ball in ball out ( Mumbai )/Basic Information.jpg';
    }
    if (lower.includes('client') || lower.includes('wanted')) {
      return '/assets/Altitude ball in ball out ( Mumbai )/What the Client Wanted.jpg';
    }
    if (lower.includes('solution') || lower.includes('provide')) {
      return '/assets/Altitude ball in ball out ( Mumbai )/What Solution We Provide.jpg';
    }
    const galMatch = url.match(/gall?[ea]ry[-_\s]*(\d+)\.(jpg|webp|jpeg)/i);
    if (galMatch) {
      const idx = galMatch[1];
      if (['4', '5', '7'].includes(idx)) return `/assets/Altitude ball in ball out ( Mumbai )/Gallery ${idx}.webp`;
      return `/assets/Altitude ball in ball out ( Mumbai )/Gallery ${idx}.jpg`;
    }
    return '/assets/Altitude ball in ball out ( Mumbai )/1st Image.png';
  }
  if (url.startsWith('/assets/') || url.startsWith('assets/')) {
    return url;
  }
  if (url.startsWith('https://res.cloudinary.com/') || url.startsWith('https://images.unsplash.com/') || url.startsWith('data:')) {
    return url;
  }
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  if (url.startsWith('http://localhost:5001/uploads/') || url.startsWith('/uploads') || url.includes('/uploads/')) {
    if (isLocal) {
      const uploadPath = url.substring(url.indexOf('/uploads/'));
      return `http://localhost:5001${uploadPath}`;
    }
    return fallback;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return fallback;
};

import { useVideoModal } from '../context/VideoModalContext';

export default function ProjectDetail({ siteData }) {
  const [isPhone, setIsPhone] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { openVideoModal } = useVideoModal();
  const { slug } = useParams();
  const header = siteData?.header || null;
  const footer = siteData?.footer || null;

  // Case Studies Database mapping all detailed case studies
  const caseStudies = {
    'fifthalley-sport-bowling': {
      name: "FifthAlley Sport Bowling",
      titleLine1: "FifthAlley Sport Bowling: A",
      titleLine2: "Complete ",
      titleLine2Black: "Bowling Alley Setup",
      titleLine3: "in the Heart of Surat",
      description: "How we designed and installed a professional-grade bowling alley across 3,000 sq. ft., transforming an empty space in Katargam into a destination entertainment venue in Surat.",
      metaTitle: "FifthAlley Sport Bowling Setup in Surat | Winera International",
      metaDescription: "Explore FifthAlley Sport Bowling in Surat by Winera International — a 3,000 sq. ft. complete bowling alley setup delivered from empty space to ready venue.",
      type: "Bowling Alley Setup",
      location: "Surat, Gujarat",
      area: "3,000 sq. ft.",
      clientWanted1: "The client had an empty 3,000 sq. ft. space in Katargam and a clear goal: to open a professional bowling venue.",
      clientWanted2: "They didn't want a supplier who only supplied the equipment. They wanted one partner to handle everything, plan the space, install the lanes, and hand over a venue that was ready for opening day. In short, they needed one team they could trust from start to finish.",
      solution1: "We delivered FifthAlley Sport Bowling as a complete, ready-to-open venue. Across the 3,000 sq. ft. space in Katargam, we planned the layout so the professional lanes had enough room around them for people to walk, sit, and relax.",
      solution2: "The result is a venue that is fun to play in and comfortable to spend time in — just like a good family entertainment center should feel.",
      mainImg: "/assets/FifthAlley-Sport-Bowling/fifthalley-sport-bowling.jpg",
      bannerImg: "/assets/FifthAlley-Sport-Bowling/fifthalley-sport-bowling.jpg",
      basicInfoBg: "/assets/FifthAlley-Sport-Bowling/basic-information.jpg",
      clientImg: "/assets/FifthAlley-Sport-Bowling/what-the-client-wanted.jpg",
      solutionImg: "/assets/FifthAlley-Sport-Bowling/what-solution-we-provide.jpg",
      galleryImages: [
        "/assets/FifthAlley-Sport-Bowling/gallery-1.jpg",
        "/assets/FifthAlley-Sport-Bowling/gallery-2.webp",
        "/assets/FifthAlley-Sport-Bowling/gallery-3.jpg",
        "/assets/FifthAlley-Sport-Bowling/gallery-4.jpg",
        "/assets/FifthAlley-Sport-Bowling/gallery-5.webp",
        "/assets/FifthAlley-Sport-Bowling/gallery-6.webp"
      ]
    },
    'hulaboo': {
      name: "Hulaboo Game Zone",
      titleLine1: "Hulaboo: How We Turned an Empty",
      titleLine2: "Space Into Surat's ",
      titleLine2Black: "Buzziest Game Zone",
      titleLine3: "for Families",
      description: "From a vacant commercial floor to a high-energy family entertainment center featuring redemption arcades, VR simulators, and kiddy rides.",
      metaTitle: "Hulaboo Game Zone Setup in Surat | Winera International",
      metaDescription: "Discover Hulaboo Game Zone in Surat built by Winera International across 7,000 sq. ft. Complete turnkey arcade and FEC design.",
      type: "Game Zone Setup",
      location: "Surat, Gujarat",
      area: "7,000 sq. ft.",
      clientWanted1: "The client wanted to create an unforgettable family game zone in Surat that attracts repeat visits from youngsters and families. They needed a high-earning attraction mix with strong commercial reliability.",
      clientWanted2: "They trusted Winera International as their single turnkey developer to handle architectural layout planning, equipment sourcing, installation, and staff operation training.",
      solution1: "We zoned the 7,000 sq. ft. area into high-intensity arcade racing, VR motion pods, interactive claw machines, and a dedicated redemption counter that drives player excitement.",
      solution2: "Clear navigational aisles and vibrant LED aesthetic treatments created an unforgettable guest experience, resulting in high daily footfall from day one.",
      mainImg: "/assets/Hulaboo ( Surat )/1st Image.jpg",
      basicInfoBg: "/assets/Hulaboo ( Surat )/Basic Information.jpg",
      clientImg: "/assets/Hulaboo ( Surat )/What the Client Wanted.jpg",
      solutionImg: "/assets/Hulaboo ( Surat )/What Solution We Provide.webp",
      galleryImages: [
        "/assets/Hulaboo ( Surat )/Gallery 1.jpg",
        "/assets/Hulaboo ( Surat )/Gallery 2.webp",
        "/assets/Hulaboo ( Surat )/Gallery 3.jpg",
        "/assets/Hulaboo ( Surat )/Gallery 4.jpg",
        "/assets/Hulaboo ( Surat )/Gallery 5.jpg",
        "/assets/Hulaboo ( Surat )/Gallery 6.jpg"
      ]
    },
    'playzonia': {
      name: "Playzonia Kids Play Area",
      titleLine1: "Playzonia: A Safe and Playful",
      titleLine2: "World Built Just ",
      titleLine2Black: "For Little Ones",
      titleLine3: "in Surat",
      description: "We created a soft play area in Surat where small children can climb, bounce, and explore freely — in a space designed around their safety and their fun.",
      metaTitle: "Playzonia Kids Soft Play Area in Surat | Winera International",
      metaDescription: "See how Winera International designed & installed Playzonia, a 1,500 sq. ft. safe and playful soft play area for young children in Surat.",
      type: "Soft Play Area",
      location: "Surat, Gujarat",
      area: "1,500 sq. ft.",
      clientWanted1: "The client came to us with one clear vision to create a kids play area in Surat. Not just a room with a few toys, but a real space where young children could play, laugh, and move around freely — and where parents could bring them without a single worry.",
      clientWanted2: "For them, safety and comfort mattered above everything. They wanted a place families would trust and keep coming back to.",
      solution1: "At Winera International, we designed and built the entire soft play area from the ground up shaping it completely around what young children need.",
      solution2: "Everything started with safety. We used soft, cushioned flooring so falls never hurt, and chose play structures with smooth, rounded edges that little hands and feet could enjoy without risk. From there, we added the fun gentle slides, climbing sections, and soft play elements that keep children active and curious. We also thought about the parents. The space was kept open and easy to see across, so parents could relax nearby while still keeping their little ones in sight at all times. The outcome is a warm, cheerful space that feels made for children — a place where kids lose track of time having fun, and parents feel completely at ease letting them play.",
      mainImg: projSoft1,
      clientImg: projSoft1,
      solutionImg: projectImage4
    },
    'lanex-bowling-alley': {
      name: "LaneX Bowling Alley",
      titleLine1: "LaneX Bowling Alley: Bringing",
      titleLine2: "Pro-Style Bowling ",
      titleLine2Black: "In Surat",
      titleLine3: "At AR Mall",
      description: "We designed and set up a full bowling alley at AR Mall. Turning an open floor into one of Surat's most exciting spots to bowl, hang out, and have fun.",
      metaTitle: "Bowling Alley Setup in Surat – LaneX at AR Mall | Winera International",
      metaDescription: "See how Winera International built LaneX Bowling Alley in Surat. A Complete 4,800 sq. ft. bowling setup, planned and installed from empty floor to opening day.",
      type: "Bowling Alley",
      location: "Surat, Gujarat",
      area: "4,800 sq. ft.",
      clientWanted1: "The client wanted to open a proper bowling alley in Surat. A place where friends, families, and groups could come together, roll a few games, and enjoy their time out. Located inside AR Mall in Mota Varachha, the venue needed to feel modern, lively, and welcoming to everyone, whether they bowl often or are picking up a ball for the first time.",
      clientWanted2: "They also wanted one team to look after the whole thing. Instead of managing different people for design, equipment, and setup, they were looking for a single partner who could take the empty floor and turn it into a finished, ready-to-play venue.",
      solution1: "At Winera International, we handled the complete bowling alley setup from the first layout plan to the final working lane.",
      solution2: "The main goal was to make the 4,800 sq. ft. floor feel right. Bowling lanes need proper spacing, so we planned the layout with care giving the lanes their room while leaving space for seating, walkways, and spots where people could relax between games. We installed the lanes to professional standards, so every roll feels smooth. Around them, we shaped a comfortable space where groups can gather, cheer, and enjoy the whole outing. The result is a venue that's fun to play in and ready to welcome guests.",
      mainImg: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      clientImg: projectImage3,
      solutionImg: projectImage4
    },
    'funfair': {
      name: "Funfair Game Zone",
      titleLine1: "Funfair: A Game Zone Made",
      titleLine2: "For Non-Stop Fun ",
      titleLine2Black: "In Surat",
      titleLine3: "Across 10,000 Sq. Ft.",
      description: "We took a wide open space in Surat and shaped it into Funfair. A lively game zone where kids, teens, and families can play, compete, and enjoy a full day out together.",
      metaTitle: "Funfair Game Zone Setup in Surat | Winera International",
      metaDescription: "See how Winera International built Funfair a complete 10,000 sq. ft. game zone in Surat, planned and set up from start to finish, ready to welcome families.",
      type: "Game Zone",
      location: "Surat, Gujarat",
      area: "10,000 sq. ft.",
      clientWanted1: "The client came to us with a simple wish to open a game zone in Surat where people of all ages could come and have a good time. Not just a place with a few machines, but a spot that families would choose again and again for weekends, birthdays, and evenings out.",
      clientWanted2: "They also wanted the whole thing handled by one team. Rather than running around to different suppliers, they were looking for a single partner to plan the space, set everything up, and hand over a venue that was ready to open its doors.",
      solution1: "At Winera International, we handled the full game zone setup from start to finish. A 10,000 sq. ft. floor gives you room to do a lot, but the layout is what makes or breaks it. So we planned each area with care, placing the louder, faster games where the energy could build, and keeping calmer spots for younger kids and families to settle in.",
      solution2: "We left proper room for walkways, seating, and open areas so the space never felt tight. The result is a game zone that flows smoothly from one corner to the next, ready to keep guests coming back.",
      mainImg: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      clientImg: projNeon1,
      solutionImg: projectImage4
    },
    'rock-and-bowl': {
      name: "Rock and Bowl",
      titleLine1: "Rock and Bowl: Strikes, Games",
      titleLine2: "and Good Times ",
      titleLine2Black: "in Vapi",
      titleLine3: "Across 6,000 Sq. Ft.",
      description: "We took a compact 6,000 sq. ft. space in Vapi and filled it with bowling, gaming and a cosy cafe. Rock and Bowl is now a favourite hangout for families, friends and kids alike.",
      metaTitle: "Rock and Bowl Game Zone Setup in Vapi | Winera International",
      metaDescription: "See how Winera International designed and installed Rock and Bowl in Vapi across 6,000 sq. ft. Turnkey bowling alley and game zone.",
      type: "Game Zone & Bowling Setup",
      location: "Vapi, Gujarat",
      area: "6,000 sq. ft.",
      clientWanted1: "The client wanted to give Vapi a place with more than one reason to visit. Bowling for groups of friends, games for teens, a safe play spot for young children and a cafe where everyone could sit together. With so much on offer, every outing could feel a little different, and that would keep people coming back.",
      clientWanted2: "Fitting all of this into one venue needed careful planning. The client wanted a single team to own the whole job, from the first layout drawing to installing the last machine, and hand over a venue ready to welcome guests.",
      solution1: "At Winera International, we knew every part of the 6,000 sq. ft. floor had to work hard to hold this many attractions. For this game zone setup in Vapi, we gave the bowling area its own stretch of the floor, since it needs length and space to play well. The arcade, VR and pool table sit close by, creating one lively zone for teens and young adults.",
      solution2: "The kids' soft play area sits away from the action, so little ones can play safely while parents relax at the cafe nearby. We kept walkways clear between each zone and added enough seating for groups to take a break. The result is a compact venue that never feels cramped and keeps guests returning.",
      mainImg: "/assets/Rock And Bowl ( Vapi )/1st Image.jpg",
      bannerImg: "/assets/Rock And Bowl ( Vapi )/1st Image.jpg",
      basicInfoBg: "/assets/Rock And Bowl ( Vapi )/Basic Information.jpg",
      clientImg: "/assets/Rock And Bowl ( Vapi )/What the Client Wanted.webp",
      solutionImg: "/assets/Rock And Bowl ( Vapi )/What Solution We Provide.jpg",
      galleryImages: [
        "/assets/Rock And Bowl ( Vapi )/Gallery 1.jpg",
        "/assets/Rock And Bowl ( Vapi )/Gallery 2.webp",
        "/assets/Rock And Bowl ( Vapi )/Galley 3.jpg",
        "/assets/Rock And Bowl ( Vapi )/Gallery 4.jpg",
        "/assets/Rock And Bowl ( Vapi )/Gallery 5.jpg",
        "/assets/Rock And Bowl ( Vapi )/Gallery 6.webp",
        "/assets/Rock And Bowl ( Vapi )/galley 7.jpg"
      ]
    },
    'level-up': {
      name: "Level Up Game Zone",
      titleLine1: "Level Up: Every Visit Feels",
      titleLine2: "Like a New High ",
      titleLine2Black: "Score in Morbi",
      titleLine3: "Across 15,000 Sq. Ft.",
      description: "We took a 15,000 sq. ft. space in Morbi and built Level Up from the ground up. Today it’s a go-to game zone for kids, teens and families looking for a fun day out.",
      metaTitle: "Level Up Game Zone Setup in Morbi | Winera International",
      metaDescription: "Turnkey game zone setup at Level Up in Morbi across 15,000 sq. ft. designed and installed by Winera International.",
      type: "Game Zone",
      location: "Morbi, Gujarat",
      area: "15,000 sq. ft.",
      clientWanted1: "The client saw that Morbi needed a proper place for families to spend their free time. They wanted a game zone where children, teenagers and parents could all find something they enjoy, so no one in the group feels left out. Most of all, they wanted guests to walk out already planning their next visit.",
      clientWanted2: "Instead of hiring separate vendors for design, equipment and installation, the client wanted a single partner. One team to plan the space, manage the setup and hand over a venue ready for opening day. That way, every decision stayed in one place and nothing slipped through the cracks.",
      solution1: "At Winera International, we began by studying how people would move across the 15,000 sq. ft. floor. For this game zone setup in Morbi, we divided the venue into clear zones. Faster, louder games sit together on one side, where players can enjoy the action without disturbing others. Softer play spots for little ones sit in a quieter corner, with seating close by so parents can keep an eye on them.",
      solution2: "Between these zones, we kept walkways wide and left open pockets where friends and families can pause and regroup. Every part of the floor has a purpose, so the space feels full of life but never crowded. The result is a game zone that guests find easy to enjoy and keep returning to.",
      mainImg: "/assets/Level Up ( Morbi )/1st Image.jpg",
      bannerImg: "/assets/Level Up ( Morbi )/1st Image.jpg",
      basicInfoBg: "/assets/Level Up ( Morbi )/Basic Information.jpg",
      clientImg: "/assets/Level Up ( Morbi )/What the Client Wanted.jpg",
      solutionImg: "/assets/Level Up ( Morbi )/What Solution We Provide.webp",
      galleryImages: [
        "/assets/Level Up ( Morbi )/gallery 1.jpg",
        "/assets/Level Up ( Morbi )/Gallery 2.jpg",
        "/assets/Level Up ( Morbi )/Gallery 3.webp",
        "/assets/Level Up ( Morbi )/Gallery 4.webp",
        "/assets/Level Up ( Morbi )/Gallery 5.webp",
        "/assets/Level Up ( Morbi )/Gallery 6.webp"
      ]
    },
    'rumble-zone': {
      name: "Rumble Zone",
      titleLine1: "Rumble Zone: Big Energy, Bold",
      titleLine2: "Games and Loud ",
      titleLine2Black: "Cheers in Gurugram",
      titleLine3: "Across 15,000 Sq. Ft.",
      description: "We turned a 15,000 sq. ft. space in Gurugram into Rumble Zone. It’s an action-filled game zone where kids, teens and families come to switch off and play.",
      metaTitle: "Rumble Zone Game Zone in Gurugram | Winera International",
      metaDescription: "See how Winera International designed and installed Rumble Zone in Gurugram across 15,000 sq. ft. Turnkey game zone setup.",
      type: "Game Zone",
      location: "Gurugram, Haryana",
      area: "15,000 sq. ft.",
      clientWanted1: "The client wanted to bring Gurugram a game zone with real energy. Somewhere friends could meet after a long week, kids could burn off steam, and families could plan a full outing without going anywhere else. The aim was a venue that feels exciting every single time, not just on the first visit.",
      clientWanted2: "With a project of this scale, the client did not want to juggle designers, suppliers and installers separately. They asked for one partner to take full responsibility, from shaping the layout to setting up every zone, so they could focus on opening day.",
      solution1: "At Winera International, we planned the 15,000 sq. ft. floor around one idea: let the excitement build as guests walk in. Our game zone setup in Gurugram places the most action-packed games deeper inside the venue, drawing people forward and keeping the noise contained. Areas for younger children sit nearer the entrance, in a calmer part of the floor with comfortable seating for parents.",
      solution2: "We also gave the venue enough breathing room. Walkways are wide enough for busy weekends, and there are spots to sit, chat and cheer on friends between games. The result is a game zone that is easy to explore and gives every visitor a reason to plan the next trip.",
      mainImg: "/assets/Rumble Zone ( Gurugram )/1st Image.jpg",
      bannerImg: "/assets/Rumble Zone ( Gurugram )/1st Image.jpg",
      basicInfoBg: "/assets/Rumble Zone ( Gurugram )/Basic information.jpg",
      clientImg: "/assets/Rumble Zone ( Gurugram )/What the Client Wanted.jpg",
      solutionImg: "/assets/Rumble Zone ( Gurugram )/What Solution We Provide.jpg",
      galleryImages: [
        "/assets/Rumble Zone ( Gurugram )/gallery 1.webp",
        "/assets/Rumble Zone ( Gurugram )/gallery 2.webp",
        "/assets/Rumble Zone ( Gurugram )/Gallery 3.webp",
        "/assets/Rumble Zone ( Gurugram )/gallery 4.webp",
        "/assets/Rumble Zone ( Gurugram )/Gallery 5.webp",
        "/assets/Rumble Zone ( Gurugram )/Gallery 6.webp"
      ]
    },
    'the-fun-factory': {
      name: "The Fun Factory",
      titleLine1: "The Fun Factory: Big Smiles",
      titleLine2: "for Little Ones in ",
      titleLine2Black: "Vasai-Virar & Badlapur",
      titleLine3: "Across 2,400 Sq. Ft.",
      description: "We took a 2,400 sq. ft. space in Nallasopara West and turned it into The Fun Factory. A lively, safe play venue made for children aged 2 to 10 and their families.",
      metaTitle: "The Fun Factory Soft Play Setup in Nallasopara | Winera International",
      metaDescription: "See how Winera International designed and installed The Fun Factory in Nallasopara across 2,400 sq. ft. Turnkey indoor playground.",
      type: "Soft Play",
      location: "Nallasopara, Maharashtra",
      area: "2,400 sq. ft.",
      clientWanted1: "The client wanted a play area where families in Vasai-Virar and Badlapur could bring their young children without having to travel into central Mumbai. The space had to be safe, colourful and packed with enough variety that kids aged 2 to 10 would stay happily busy for hours.",
      clientWanted2: "The client also wanted an easy journey from idea to opening. Instead of talking to different people for design, equipment and fitting, they chose one team to manage everything and hand over a play area ready for kids on day one.",
      solution1: "At Winera International, we planned every part of the 2,400 sq. ft. floor so no space was wasted. For this soft play setup in Vasai-Virar and Badlapur, we gave the soft play zone the biggest share of the room. Kids get lots of space to climb, jump and explore, and padded surfaces keep them safe while they play.",
      solution2: "We placed parent seating where they can see the whole play area at a glance, so they can relax without worry. Paths around the zone are kept open, making it easy for kids and parents to move in and out. The result is a happy, easy-to-use play space that families keep visiting.",
      mainImg: "/assets/The Fun Factory ( Nalasopara )/1st image.jpg",
      bannerImg: "/assets/The Fun Factory ( Nalasopara )/1st image.jpg",
      basicInfoBg: "/assets/The Fun Factory ( Nalasopara )/Basic Information.jpg",
      clientImg: "/assets/The Fun Factory ( Nalasopara )/what the client wanted.jpg",
      solutionImg: "/assets/The Fun Factory ( Nalasopara )/What Solution We Provide.jpg",
      galleryImages: [
        "/assets/The Fun Factory ( Nalasopara )/Gallery 1.jpg",
        "/assets/The Fun Factory ( Nalasopara )/Gallery 2.jpeg",
        "/assets/The Fun Factory ( Nalasopara )/Gallery 3.jpg",
        "/assets/The Fun Factory ( Nalasopara )/Gallery 4.jpg",
        "/assets/The Fun Factory ( Nalasopara )/Gallery 5.jpg",
        "/assets/The Fun Factory ( Nalasopara )/Gallery 6.jpg"
      ]
    },
    'pop-a-puddle': {
      name: "Pop A Puddle",
      titleLine1: "Pop A Puddle: Where Kids",
      titleLine2: "Play and Parents Sip ",
      titleLine2Black: "in Bangalore",
      titleLine3: "Across 4,800 Sq. Ft.",
      description: "We took a 4,800 sq. ft. space in Bangalore and turned it into Pop A Puddle, a soft play area with a family café. Kids aged 3 to 12 play freely, while parents relax at the café close by.",
      metaTitle: "Pop A Puddle Play Area and Café in Bangalore | Winera International",
      metaDescription: "See how Winera International designed and built Pop A Puddle in Bangalore across 4,800 sq. ft. Soft play and family play café setup.",
      type: "Soft Play / Family Play Café",
      location: "Bangalore, Karnataka",
      area: "4,800 sq. ft.",
      clientWanted1: "The client wanted a place where the whole family could spend time together, not just the kids. Children aged 3 to 12 needed a safe and exciting soft play area, and parents needed a comfortable café where they could sit, chat and unwind. When both kids and parents enjoy the visit, they naturally want to come back.",
      clientWanted2: "Building a play area and a café together means many moving parts. So the client wanted one team to handle it all, from planning the layout to fitting the equipment, and handing over a space that was ready to open.",
      solution1: "At Winera International, we used the 4,800 sq. ft. floor to bring play and rest together in one space. For this play café setup in Bangalore, we gave the soft play zone a large, open area where kids can climb, slide and explore. The padded play setup keeps every jump and tumble safe.",
      solution2: "We placed the café right next to the play area, so parents can enjoy their time while still keeping an eye on their children. Clear walkways connect both spaces, and seating is spread out so families never feel squeezed. The result is a warm, easy-going venue where kids play happily and parents feel at home.",
      mainImg: "/assets/Pop A Puddle ( Bengaluru )/1st image.jpg",
      bannerImg: "/assets/Pop A Puddle ( Bengaluru )/1st image.jpg",
      basicInfoBg: "/assets/Pop A Puddle ( Bengaluru )/Basic Detail.jpg",
      clientImg: "/assets/Pop A Puddle ( Bengaluru )/What the client Wanted.webp",
      solutionImg: "/assets/Pop A Puddle ( Bengaluru )/What Solution We Provide.jpg",
      galleryImages: [
        "/assets/Pop A Puddle ( Bengaluru )/Gallery 1.webp",
        "/assets/Pop A Puddle ( Bengaluru )/Gallery 2.jpg",
        "/assets/Pop A Puddle ( Bengaluru )/gallery 3.jpg",
        "/assets/Pop A Puddle ( Bengaluru )/Gallery 4.jpg",
        "/assets/Pop A Puddle ( Bengaluru )/Gallery 5.jpg",
        "/assets/Pop A Puddle ( Bengaluru )/gallery 6.jpg",
        "/assets/Pop A Puddle ( Bengaluru )/Gallery 7.webp",
        "/assets/Pop A Puddle ( Bengaluru )/Gallary 8.webp",
        "/assets/Pop A Puddle ( Bengaluru )/Gallery 9.webp",
        "/assets/Pop A Puddle ( Bengaluru )/Gallery 10.webp",
        "/assets/Pop A Puddle ( Bengaluru )/gallery 11.webp"
      ]
    },
    'skadoosh-play-area': {
      name: "Skadoosh Play Area",
      titleLine1: "Skadoosh Play Area: Endless",
      titleLine2: "Giggles and Adventures in ",
      titleLine2Black: "Haralur & Varthur",
      titleLine3: "Across 7,000 Sq. Ft.",
      description: "We took a 7,000 sq. ft. space and turned it into Skadoosh Play Area, a fun-filled kids play area in Bangalore. It’s made for children aged 3 to 12 and for parents in Haralur and Varthur who want a safe place to play nearby.",
      metaTitle: "Skadoosh Kids Play Area in Bangalore | Winera International",
      metaDescription: "See how Winera International built Skadoosh Play Area across 7,000 sq. ft. in Haralur and Varthur, Bangalore. Turnkey play area setup.",
      type: "Kids Play Area",
      location: "Bangalore, Karnataka",
      area: "7,000 sq. ft.",
      clientWanted1: "The client wanted a play area that kids would beg to visit. A cheerful, safe space in Haralur and Varthur where children aged 3 to 12 could spend hours playing, and where parents could feel at ease the whole time. They wanted every visit to be full of fun, so families would make it part of their routine.",
      clientWanted2: "To get there, the client needed a partner who could take care of the full project. They wanted one team to plan the layout, source and install the play equipment, and hand over a play area ready for its first little visitors.",
      solution1: "At Winera International, we saw the 7,000 sq. ft. floor as one big playground waiting to happen. For this kids play area in Bangalore, we kept the busiest, most active play sections in the centre, where kids can run, climb and jump freely. Gentler spots for the youngest children sit to the side, away from the rush, so they can play at their own pace.",
      solution2: "Parent seating wraps around the play area, giving a clear view from every seat. We kept the walkways wide and the open areas free, so kids can move from one section to another without bumping into each other. The result is a happy, well-organised play area that families in Haralur and Varthur love to visit again.",
      mainImg: "/assets/Skadoosh ( Bengaluru )/1st image.jpg",
      bannerImg: "/assets/Skadoosh ( Bengaluru )/1st image.jpg",
      basicInfoBg: "/assets/Skadoosh ( Bengaluru )/Basic Information.jpg",
      clientImg: "/assets/Skadoosh ( Bengaluru )/What the Client Wanted.jpg",
      solutionImg: "/assets/Skadoosh ( Bengaluru )/What Solution We Provide.webp",
      galleryImages: [
        "/assets/Skadoosh ( Bengaluru )/Gallery 1.jpg",
        "/assets/Skadoosh ( Bengaluru )/Gallery 2.jpg",
        "/assets/Skadoosh ( Bengaluru )/Gallery 3.jpg",
        "/assets/Skadoosh ( Bengaluru )/Gallery 4.webp",
        "/assets/Skadoosh ( Bengaluru )/Gallery 5.jpg",
        "/assets/Skadoosh ( Bengaluru )/Gallery 6.jpg",
        "/assets/Skadoosh ( Bengaluru )/Gallery 7.webp",
        "/assets/Skadoosh ( Bengaluru )/Gallery 8.webp",
        "/assets/Skadoosh ( Bengaluru )/Gallery 9.webp",
        "/assets/Skadoosh ( Bengaluru )/Gallery 10.webp",
        "/assets/Skadoosh ( Bengaluru )/Gallery 11.webp",
        "/assets/Skadoosh ( Bengaluru )/Gallery 12.webp"
      ]
    },
    'vr-360-game-zone': {
      name: "VR 360 Game Zone",
      titleLine1: "VR 360 Game Zone: Step Into",
      titleLine2: "New Worlds Right ",
      titleLine2Black: "Here in Gandhidham",
      titleLine3: "Across 2,000 Sq. Ft.",
      description: "We took a 2,000 sq. ft. space in Gandhidham and turned it into VR 360 Game Zone. It’s a fun, modern hangout where teens, young adults and families can try virtual reality and play together.",
      metaTitle: "VR 360 Game Zone in Gandhidham | Winera International",
      metaDescription: "See how Winera International designed and installed VR 360 Game Zone across 2,000 sq. ft. in Gandhidham. Turnkey virtual reality setup.",
      type: "Game Zone",
      location: "Gandhidham, Gujarat",
      area: "2,000 sq. ft.",
      clientWanted1: "The client wanted to bring something fresh to Gandhidham. A game zone built around virtual reality, where teens and young adults could hang out with friends, and families could try something new together. They wanted a place exciting enough that guests would keep coming back with their friends.",
      clientWanted2: "Virtual reality equipment needs careful layout and the right technical setup to run well. The client wanted one experienced partner to design the floor, source and install the machines, and hand over a space that was ready to welcome visitors on day one.",
      solution1: "At Winera International, we used every foot of the 2,000 sq. ft. floor to create an immersive experience. For this game zone setup in Gandhidham, we gave each VR attraction its own designated space so players can move and enjoy the action safely without crowding each other.",
      solution2: "We set up clear walking paths and added seating where friends can watch each other play and wait for their turn. The result is a sleek, modern game zone that draws regular crowds and keeps players coming back for another round.",
      mainImg: "/assets/VR 360 Game  Zone ( Gandhidham )/1st image.png",
      bannerImg: "/assets/VR 360 Game  Zone ( Gandhidham )/1st image.png",
      basicInfoBg: "/assets/VR 360 Game  Zone ( Gandhidham )/Basic Information.jpg",
      clientImg: "/assets/VR 360 Game  Zone ( Gandhidham )/What the Client Wanted.webp",
      solutionImg: "/assets/VR 360 Game  Zone ( Gandhidham )/What Solution We Provide.jpg",
      galleryImages: [
        "/assets/VR 360 Game  Zone ( Gandhidham )/Gallery 1.jpg",
        "/assets/VR 360 Game  Zone ( Gandhidham )/Gallery 2.webp",
        "/assets/VR 360 Game  Zone ( Gandhidham )/Gallery 3.webp",
        "/assets/VR 360 Game  Zone ( Gandhidham )/Gallery 4.webp",
        "/assets/VR 360 Game  Zone ( Gandhidham )/Gallery 5.webp",
        "/assets/VR 360 Game  Zone ( Gandhidham )/Gallery 6.jpg"
      ]
    },
    'altitude-ball-in-ball-out': {
      name: "Altitude Ball in Ball Out",
      titleLine1: "Altitude Ball in Ball Out: Every",
      titleLine2: "Roll Brings Friends ",
      titleLine2Black: "Closer in Mumbai",
      titleLine3: "Across 8,000 Sq. Ft.",
      description: "We took an 8,000 sq. ft. space in Mumbai and turned it into Altitude Ball in Ball Out, a lively bowling alley. It’s a place where teens, young adults and families come to play, compete and spend good time together.",
      metaTitle: "Altitude Ball in Ball Out Bowling Alley in Mumbai | Winera International",
      metaDescription: "See how Winera International designed and installed Altitude Ball in Ball Out across 8,000 sq. ft. in Mumbai. Turnkey bowling alley setup.",
      type: "Bowling Alley",
      location: "Mumbai, Maharashtra",
      area: "8,000 sq. ft.",
      clientWanted1: "The client wanted a bowling alley in Mumbai that feels fun as soon as people walk in. A place where friends can play against each other and families can laugh and enjoy a game together. They wanted guests to go home and plan their next visit right away.",
      clientWanted2: "A bowling alley needs exact planning, from the lane area to the seating around it. The client wanted one team to manage the whole project, from layout and installation to the final handover, so they did not have to deal with several suppliers at once.",
      solution1: "At Winera International, we started by giving the bowling lanes the space they need. Lanes need length, so we planned the 8,000 sq. ft. floor with the bowling area as its main feature. For this bowling alley setup in Mumbai, we made sure every lane is easy to see and reach, so the whole venue feels connected to the action.",
      solution2: "Behind the lanes, we added comfortable seating where players can relax, keep score and cheer each other on. Clear walkways let guests move around without crossing into the play area, and open spaces give groups room to gather between games. The result is an easy-to-enjoy bowling alley that brings friends and families back for one more game.",
      mainImg: "/assets/Altitude ball in ball out ( Mumbai )/1st Image.png",
      bannerImg: "/assets/Altitude ball in ball out ( Mumbai )/1st Image.png",
      basicInfoBg: "/assets/Altitude ball in ball out ( Mumbai )/Basic Information.jpg",
      clientImg: "/assets/Altitude ball in ball out ( Mumbai )/What the Client Wanted.jpg",
      solutionImg: "/assets/Altitude ball in ball out ( Mumbai )/What Solution We Provide.jpg",
      galleryImages: [
        "/assets/Altitude ball in ball out ( Mumbai )/Gallery 1.jpg",
        "/assets/Altitude ball in ball out ( Mumbai )/Gallery 2.jpg",
        "/assets/Altitude ball in ball out ( Mumbai )/Gallery 3.jpg",
        "/assets/Altitude ball in ball out ( Mumbai )/Gallery 4.webp",
        "/assets/Altitude ball in ball out ( Mumbai )/Gallery 5.webp",
        "/assets/Altitude ball in ball out ( Mumbai )/Gallery 6.jpg",
        "/assets/Altitude ball in ball out ( Mumbai )/Gallery 7.webp"
      ]
    }
  };

  const normalizeSlug = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const cleanAlpha = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const targetSlug = normalizeSlug(slug);
  const targetAlpha = cleanAlpha(slug);

  const allProjectsList = (Array.isArray(siteData?.projectItems) && siteData.projectItems.length > 0)
    ? siteData.projectItems
    : projectsData;

  const cmsItem = allProjectsList.find(p => {
        const itemSlug = (p.slug && p.slug !== 'new-turnkey-project') ? normalizeSlug(p.slug) : normalizeSlug(p.name);
        const itemAlpha = cleanAlpha(p.slug || p.name);
        const nameAlpha = cleanAlpha(p.name);
        const idAlpha = cleanAlpha(p.id);

        // 1. Direct exact matches
        if (
          itemSlug === targetSlug ||
          itemAlpha === targetAlpha ||
          nameAlpha === targetAlpha ||
          idAlpha === targetAlpha
        ) {
          return true;
        }

        // 2. Prefix & substring fuzzy matches (e.g. rebounce <-> rebounce-game-zone, fizzyfox <-> fizzy-fox)
        if (targetAlpha && targetAlpha.length >= 3) {
          if (itemAlpha.startsWith(targetAlpha) || targetAlpha.startsWith(itemAlpha)) return true;
          if (nameAlpha.startsWith(targetAlpha) || targetAlpha.startsWith(nameAlpha)) return true;
          if (itemAlpha.includes(targetAlpha) || targetAlpha.includes(itemAlpha)) return true;
          if (nameAlpha.includes(targetAlpha) || targetAlpha.includes(nameAlpha)) return true;
        }

        if (targetSlug === 'new-turnkey-project' && normalizeSlug(p.slug) === 'new-turnkey-project') {
          return true;
        }
        return false;
      }) || null;

  const builtItem = Array.isArray(siteData?.builtProjects)
    ? siteData.builtProjects.find(p => {
        const itemSlug = normalizeSlug(p.slug || p.name);
        const itemAlpha = cleanAlpha(p.slug || p.name);
        const nameAlpha = cleanAlpha(p.name);
        const idAlpha = cleanAlpha(p.id);
        return itemSlug === targetSlug || itemAlpha === targetAlpha || nameAlpha === targetAlpha || idAlpha === targetAlpha;
      })
    : null;

  const resolvedItem = cmsItem || (builtItem ? {
    name: builtItem.name,
    titleLine1: `${builtItem.name}: A`,
    titleLine2: "Turnkey ",
    titleLine2Black: "Entertainment Setup",
    titleLine3: `in ${builtItem.city || 'India'}`,
    description: `How Winera International designed, manufactured, and installed a complete turnkey game zone setup for ${builtItem.name} in ${builtItem.city || 'India'}, delivering a high-revenue entertainment venue from 3D planning to opening day.`,
    metaTitle: `${builtItem.name} Game Zone Setup in ${builtItem.city || 'India'} | Winera International`,
    metaDescription: `Explore how Winera International designed and built ${builtItem.name} in ${builtItem.city || 'India'}. Turnkey entertainment venue execution from empty space to opening day.`,
    type: builtItem.type || builtItem.category || "Game Zone Setup",
    location: builtItem.city ? `${builtItem.city}${builtItem.state ? `, ${builtItem.state}` : ''}` : "India",
    area: builtItem.area || "Turnkey Facility",
    clientWanted1: `The client wanted to create an unforgettable game zone destination in ${builtItem.city || 'India'} featuring multi-age amusement attractions for families and kids.`,
    clientWanted2: `They trusted Winera International as their single turnkey partner for 3D layout planning, equipment sourcing, installation, and complete venue execution.`,
    solution1: `At Winera International, we planned the complete space layout for ${builtItem.name} in ${builtItem.city || 'India'}, organizing attractions and seating for maximum footfall and smooth visitor flow.`,
    solution2: `The resulting venue delivers top-tier entertainment, reliable high-uptime equipment, and strong revenue performance from day one.`,
    imageUrl: builtItem.imageUrl || builtItem.img,
    img: builtItem.imageUrl || builtItem.img,
    clientImg: builtItem.clientImg || builtItem.imageUrl || builtItem.img,
    solutionImg: builtItem.solutionImg || builtItem.imageUrl || builtItem.img
  } : null);

  const staticDocProject = projectsData.find(p => {
    const itemSlug = normalizeSlug(p.slug || p.name);
    const itemAlpha = cleanAlpha(p.slug || p.name);
    return itemSlug === targetSlug || itemAlpha === targetAlpha;
  });

  const defaultProject = staticDocProject || caseStudies[slug] || {
    name: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Featured Winera Project",
    titleLine1: `${slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Winera Project"}: A`,
    titleLine2: "Turnkey ",
    titleLine2Black: "Entertainment Setup",
    titleLine3: "by Winera International",
    description: "Designed, manufactured, and installed by Winera International — delivering a complete, high-revenue game zone setup from 3D planning to opening day.",
    metaTitle: `${slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Featured Winera Project"} Setup | Winera International`,
    metaDescription: `Explore how Winera International designed and built ${slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "this project"}. Turnkey venue execution from empty floor to opening day.`,
    type: "Game Zone & Amusement Setup",
    location: "India",
    area: "Turnkey Facility",
    clientWanted1: "The client wanted to create an unforgettable entertainment space for families, gamers, and visitors of all ages.",
    clientWanted2: "They trusted Winera International as their single turnkey partner for 3D layout design, equipment sourcing, installation, and complete venue execution.",
    solution1: "Winera International executed the end-to-end setup — organizing high-energy attractions, VR simulators, and comfortable visitor areas for maximum footfall and smooth flow.",
    solution2: "The resulting venue delivers top-tier entertainment and strong revenue performance from day one.",
    mainImg: projHulaboo,
    bannerImg: projectBanner,
    clientImg: projectImage3,
    solutionImg: projectImage4,
    basicInfoBg: projectImage2Bg
  };

  const currentProject = resolvedItem ? {
    name: resolvedItem.name || defaultProject.name,
    titleLine1: resolvedItem.titleLine1 || defaultProject.titleLine1,
    titleLine2: resolvedItem.titleLine2 || defaultProject.titleLine2,
    titleLine2Black: resolvedItem.titleLine2Black || defaultProject.titleLine2Black,
    titleLine3: resolvedItem.titleLine3 || defaultProject.titleLine3,
    description: resolvedItem.description || defaultProject.description,
    metaTitle: resolvedItem.metaTitle || resolvedItem.seoTitle || defaultProject.metaTitle,
    metaDescription: resolvedItem.metaDescription || resolvedItem.seoDescription || defaultProject.metaDescription,
    type: resolvedItem.type || defaultProject.type,
    location: resolvedItem.city ? `${resolvedItem.city}${resolvedItem.state ? `, ${resolvedItem.state}` : ''}` : (resolvedItem.location || defaultProject.location),
    area: resolvedItem.area || defaultProject.area,
    clientWanted1: resolvedItem.clientWanted1 || defaultProject.clientWanted1,
    clientWanted2: resolvedItem.clientWanted2 || defaultProject.clientWanted2,
    solution1: resolvedItem.solution1 || defaultProject.solution1,
    solution2: resolvedItem.solution2 || defaultProject.solution2,
    mainImg: getValidImageUrl(resolvedItem.img || resolvedItem.imageUrl, defaultProject.mainImg),
    bannerImg: getValidImageUrl(resolvedItem.bannerImg || resolvedItem.coverImg, defaultProject.bannerImg || defaultProject.mainImg),
    clientImg: getValidImageUrl(resolvedItem.clientImg || resolvedItem.clientImageUrl, defaultProject.clientImg),
    solutionImg: getValidImageUrl(resolvedItem.solutionImg || resolvedItem.solutionImageUrl, defaultProject.solutionImg),
    galleryImages: (Array.isArray(resolvedItem.galleryImages) && resolvedItem.galleryImages.length > 0)
      ? resolvedItem.galleryImages.map(img => getValidImageUrl(img, img))
      : (Array.isArray(defaultProject.galleryImages) && defaultProject.galleryImages.length > 0)
        ? defaultProject.galleryImages
        : [
          resolvedItem.galleryImage1,
          resolvedItem.galleryImage2,
          resolvedItem.galleryImage3,
          resolvedItem.galleryImage4,
          resolvedItem.galleryImage5,
          resolvedItem.galleryImage6
        ].filter(Boolean),
    videoImg: resolvedItem.videoImg || resolvedItem.videoCoverUrl || defaultProject.videoImg,
    videoUrl: resolvedItem.videoUrl || resolvedItem.videoLink || defaultProject.videoUrl,
    basicInfoBg: getValidImageUrl(resolvedItem.basicInfoBg || resolvedItem.basicBg, defaultProject.basicInfoBg || ''),
    buttonText: resolvedItem.buttonText,
    buttonLink: resolvedItem.buttonLink,
    waMessage: resolvedItem.waMessage
  } : defaultProject;

  // Dynamic content sections from CMS siteData
  const heroData = siteData?.projectHero || {};
  const basicData = siteData?.projectBasicInfo || {};
  const galleryData = siteData?.projectGallery || {};
  const videoData = siteData?.projectVideo || {};

  const isFifthAlley = targetSlug === 'fifthalley-sport-bowling' || cleanAlpha(currentProject?.name || '').includes('fifthalley');
  const isHulaboo = targetSlug === 'hulaboo' || cleanAlpha(currentProject?.name || '').includes('hulaboo');
  const isLaneX = targetSlug === 'lanex-bowling-alley' || cleanAlpha(currentProject?.name || '').includes('lanex');
  const isPlayzonia = targetSlug === 'playzonia' || cleanAlpha(currentProject?.name || '').includes('playzonia');
  const isRebounce = targetSlug === 'rebounce' || cleanAlpha(currentProject?.name || '').includes('rebounce');
  const isSkadoosh = targetSlug === 'skadoosh-play-area' || cleanAlpha(currentProject?.name || '').includes('skadoosh');
  const isPopAPuddle = targetSlug === 'pop-a-puddle' || cleanAlpha(currentProject?.name || '').includes('popapuddle') || cleanAlpha(currentProject?.name || '').includes('pop a puddle');
  const bannerImg = getValidImageUrl(heroData.bannerImg, projectBanner);
  const breadcrumbHome = heroData.breadcrumbHome || 'Home';

  const strokeImg = yellowStrokeLine;
  const titleLine1 = currentProject.titleLine1;
  const titleLine2 = currentProject.titleLine2;
  const titleLine2Black = currentProject.titleLine2Black;
  const titleLine3 = currentProject.titleLine3;
  const description = currentProject.description;

  const buttonText = currentProject?.buttonText || siteData?.projectBlock?.buttonText || 'Get A Quote';

  let rawLink = currentProject?.buttonLink || siteData?.projectBlock?.buttonLink || 'https://wa.me/919428989488';
  let waMsg = currentProject?.waMessage || siteData?.projectBlock?.waMessage;

  // Extract base WhatsApp URL
  const baseLink = rawLink.split('?')[0];

  // If waMsg is not explicitly set, try extracting text from rawLink
  if (!waMsg && rawLink.includes('text=')) {
    try {
      const match = rawLink.match(/text=([^&]+)/);
      if (match && match[1]) {
        waMsg = decodeURIComponent(match[1]);
      }
    } catch (e) { }
  }

  // If waMsg is empty or generic without project reference, include the current project name
  if (!waMsg || waMsg.trim() === 'Hello Winera International! I want to get a project quote. Please share details. [Ref: Project Detail Page]') {
    const projName = currentProject?.name || 'this project';
    waMsg = `Hello Winera International! I want to get a project quote for ${projName}. Please share details. [Ref: Project Detail Page]`;
  }

  const buttonLink = `${baseLink}?text=${encodeURIComponent(waMsg)}`;
  const caseStudy = caseStudies[slug] || caseStudies[targetSlug]
    || Object.entries(caseStudies).find(([k]) => {
      const cleanK = cleanAlpha(k);
      return cleanK === targetAlpha || (targetAlpha.length >= 4 && (cleanK.includes(targetAlpha) || targetAlpha.includes(cleanK)));
    })?.[1]
    || null;

  const mainImage = isHulaboo
    ? "/assets/Hulaboo ( Surat )/1st Image.jpg"
    : (isLaneX
        ? (currentProject.mainImg && !currentProject.mainImg.includes('ix7eepjul52fmdfii3nf') ? currentProject.mainImg : "/assets/LaneX Bowling Alley ( Surat )/1st Image.jpg")
        : (isPlayzonia
            ? (currentProject.mainImg && !currentProject.mainImg.includes('ymswdjzfwqi5z7ksv7zd') ? currentProject.mainImg : "/assets/Playzonia Kids Play Area ( Surat )/1st Image.jpg")
            : (isRebounce
                ? (currentProject.mainImg && !currentProject.mainImg.includes('nri2vtjcndonajowvvqw') ? currentProject.mainImg : "/assets/Rebounce Game Zone ( Surat )/1st Image.jpg")
                : (isSkadoosh
                    ? (currentProject.mainImg || caseStudy?.mainImg || "/assets/Skadoosh ( Bengaluru )/1st image.jpg")
                    : (isPopAPuddle
                        ? (currentProject.mainImg || caseStudy?.mainImg || "/assets/Pop A Puddle ( Bengaluru )/1st image.jpg")
                        : (currentProject.mainImg || caseStudy?.mainImg))))));

  const basicBg = isFifthAlley
    ? "/assets/FifthAlley-Sport-Bowling/basic-information.jpg"
    : (isHulaboo
        ? "/assets/Hulaboo ( Surat )/Basic Information.jpg"
        : (isLaneX
            ? "/assets/LaneX Bowling Alley ( Surat )/Basic Information.jpg"
            : (isPlayzonia
                ? "/assets/Playzonia Kids Play Area ( Surat )/Basic Information.jpg"
                : (isRebounce
                    ? "/assets/Rebounce Game Zone ( Surat )/Basic Information.jpg"
                    : (isSkadoosh
                        ? (currentProject.basicInfoBg || caseStudy?.basicInfoBg || "/assets/Skadoosh ( Bengaluru )/Basic Information.jpg")
                        : (isPopAPuddle
                            ? (currentProject.basicInfoBg || caseStudy?.basicInfoBg || "/assets/Pop A Puddle ( Bengaluru )/Basic Detail.jpg")
                            : (currentProject.basicInfoBg || caseStudy?.basicInfoBg || getValidImageUrl(basicData.bgImg, projectImage2Bg))))))));
  const basicRows = [
    { label: 'Project Name', val: currentProject.name },
    { label: 'Project Type', val: currentProject.type },
    { label: 'Location', val: currentProject.location },
    { label: 'Total Area', val: currentProject.area }
  ];

  const clientTitlePrefix = 'What the ';
  const clientTitleCyan = 'Client Wanted';
  const clientP1 = currentProject.clientWanted1;
  const clientP2 = currentProject.clientWanted2;
  const clientImg = isHulaboo
    ? "/assets/Hulaboo ( Surat )/What the Client Wanted.jpg"
    : (isLaneX
        ? (currentProject.clientImg && !currentProject.clientImg.includes('igg4yrl7xhnxllqifpj7') ? currentProject.clientImg : "/assets/LaneX Bowling Alley ( Surat )/What the Client Wanted.jpg")
        : (isPlayzonia
            ? (currentProject.clientImg && !currentProject.clientImg.includes('olzpipldgl4mnb7c1y5q') ? currentProject.clientImg : "/assets/Playzonia Kids Play Area ( Surat )/What the Client Wanted.jpg")
            : (isRebounce
                ? (currentProject.clientImg && !currentProject.clientImg.includes('gy34ivaldlm7ia55iwci') ? currentProject.clientImg : "/assets/Rebounce Game Zone ( Surat )/What the Client Wanted.jpg")
                : (isSkadoosh
                    ? (currentProject.clientImg || caseStudy?.clientImg || "/assets/Skadoosh ( Bengaluru )/What the Client Wanted.jpg")
                    : (isPopAPuddle
                        ? (currentProject.clientImg || caseStudy?.clientImg || "/assets/Pop A Puddle ( Bengaluru )/What the client Wanted.webp")
                        : (currentProject.clientImg || caseStudy?.clientImg))))));

  const solutionTitleCyan = 'What Solution ';
  const solutionTitleSuffix = 'We Provide';
  const solutionP1 = currentProject.solution1;
  const solutionP2 = currentProject.solution2;
  const solutionImg = isHulaboo
    ? "/assets/Hulaboo ( Surat )/What Solution We Provide.webp"
    : (isLaneX
        ? (currentProject.solutionImg && !currentProject.solutionImg.includes('hifdo3jiuvbvu4cxkgq4') ? currentProject.solutionImg : "/assets/LaneX Bowling Alley ( Surat )/What Solution We Provide.webp")
        : (isPlayzonia
            ? (currentProject.solutionImg && !currentProject.solutionImg.includes('vxfee3fxtxt09nu04bd8') ? currentProject.solutionImg : "/assets/Playzonia Kids Play Area ( Surat )/What Solution We Provide.jpg")
            : (isRebounce
                ? (currentProject.solutionImg && !currentProject.solutionImg.includes('za8k8euyryqqt3r7xsbw') ? currentProject.solutionImg : "/assets/Rebounce Game Zone ( Surat )/What Solution We Provide.jpg")
                : (isSkadoosh
                    ? (currentProject.solutionImg || caseStudy?.solutionImg || "/assets/Skadoosh ( Bengaluru )/What Solution We Provide.webp")
                    : (isPopAPuddle
                        ? (currentProject.solutionImg || caseStudy?.solutionImg || "/assets/Pop A Puddle ( Bengaluru )/What Solution We Provide.jpg")
                        : (currentProject.solutionImg || caseStudy?.solutionImg))))));

  const galleryTitleCyan = 'Project ';
  const galleryTitleDark = 'Gallery';
  const galleryBg = getValidImageUrl(galleryData.bgImg, projectImagesBg);
  const defaultGalleryList = [
    projectBlock1,
    projectBlock2,
    projectBlock3,
    projectBlock1,
    projectBlock2,
    projectBlock3
  ];

  const cmsGalleryImages = isHulaboo
    ? [
        "/assets/Hulaboo ( Surat )/Gallery 1.jpg",
        "/assets/Hulaboo ( Surat )/Gallery 2.webp",
        "/assets/Hulaboo ( Surat )/Gallery 3.jpg",
        "/assets/Hulaboo ( Surat )/Gallery 4.jpg",
        "/assets/Hulaboo ( Surat )/Gallery 5.jpg",
        "/assets/Hulaboo ( Surat )/Gallery 6.jpg"
      ]
    : (isLaneX
        ? [
            "/assets/LaneX Bowling Alley ( Surat )/Gallery 1.jpg",
            "/assets/LaneX Bowling Alley ( Surat )/Gallery  2.webp",
            "/assets/LaneX Bowling Alley ( Surat )/Gallery  3.webp",
            "/assets/LaneX Bowling Alley ( Surat )/Gallery 4.webp",
            "/assets/LaneX Bowling Alley ( Surat )/Gallery 5.webp",
            "/assets/LaneX Bowling Alley ( Surat )/Gallery 6.webp"
          ]
        : (isPlayzonia
            ? [
                "/assets/Playzonia Kids Play Area ( Surat )/Gallery 1.jpg",
                "/assets/Playzonia Kids Play Area ( Surat )/Gallery  2.jpg",
                "/assets/Playzonia Kids Play Area ( Surat )/Gallery  3.jpg",
                "/assets/Playzonia Kids Play Area ( Surat )/Gallery  4.jpg",
                "/assets/Playzonia Kids Play Area ( Surat )/Gallery 5.jpg",
                "/assets/Playzonia Kids Play Area ( Surat )/Gallery  6.jpg"
              ]
            : (isRebounce
                ? [
                    "/assets/Rebounce Game Zone ( Surat )/Gallery 1.jpg",
                    "/assets/Rebounce Game Zone ( Surat )/Gallery 2.jpg",
                    "/assets/Rebounce Game Zone ( Surat )/Gallery 3.jpg",
                    "/assets/Rebounce Game Zone ( Surat )/Gallery 4.jpg",
                    "/assets/Rebounce Game Zone ( Surat )/Gallery 5.jpg",
                    "/assets/Rebounce Game Zone ( Surat )/Gallery 6.webp"
                  ]
                : (isSkadoosh
                    ? ((Array.isArray(currentProject.galleryImages) && currentProject.galleryImages.length > 0)
                        ? currentProject.galleryImages
                        : (caseStudy?.galleryImages || [
                            "/assets/Skadoosh ( Bengaluru )/Gallery 1.jpg",
                            "/assets/Skadoosh ( Bengaluru )/Gallery 2.jpg",
                            "/assets/Skadoosh ( Bengaluru )/Gallery 3.jpg",
                            "/assets/Skadoosh ( Bengaluru )/Gallery 4.webp",
                            "/assets/Skadoosh ( Bengaluru )/Gallery 5.jpg",
                            "/assets/Skadoosh ( Bengaluru )/Gallery 6.jpg",
                            "/assets/Skadoosh ( Bengaluru )/Gallery 7.webp",
                            "/assets/Skadoosh ( Bengaluru )/Gallery 8.webp",
                            "/assets/Skadoosh ( Bengaluru )/Gallery 9.webp",
                            "/assets/Skadoosh ( Bengaluru )/Gallery 10.webp",
                            "/assets/Skadoosh ( Bengaluru )/Gallery 11.webp",
                            "/assets/Skadoosh ( Bengaluru )/Gallery 12.webp"
                          ]))
                    : (isPopAPuddle
                        ? ((Array.isArray(currentProject.galleryImages) && currentProject.galleryImages.length > 0)
                            ? currentProject.galleryImages
                            : (caseStudy?.galleryImages || [
                                "/assets/Pop A Puddle ( Bengaluru )/Gallery 1.webp",
                                "/assets/Pop A Puddle ( Bengaluru )/Gallery 2.jpg",
                                "/assets/Pop A Puddle ( Bengaluru )/gallery 3.jpg",
                                "/assets/Pop A Puddle ( Bengaluru )/Gallery 4.jpg",
                                "/assets/Pop A Puddle ( Bengaluru )/Gallery 5.jpg",
                                "/assets/Pop A Puddle ( Bengaluru )/gallery 6.jpg",
                                "/assets/Pop A Puddle ( Bengaluru )/Gallery 7.webp",
                                "/assets/Pop A Puddle ( Bengaluru )/Gallary 8.webp",
                                "/assets/Pop A Puddle ( Bengaluru )/Gallery 9.webp",
                                "/assets/Pop A Puddle ( Bengaluru )/Gallery 10.webp",
                                "/assets/Pop A Puddle ( Bengaluru )/gallery 11.webp"
                              ]))
                        : ((Array.isArray(currentProject.galleryImages) && currentProject.galleryImages.length > 0)
                            ? currentProject.galleryImages
                            : ((caseStudy?.galleryImages && caseStudy.galleryImages.length > 0)
                                ? caseStudy.galleryImages
                                : (Array.isArray(galleryData.images) && galleryData.images.length > 0 ? galleryData.images : defaultGalleryList))))))));

  const galleryImages = cmsGalleryImages.map((imgUrl, idx) => {
    return getValidImageUrl(imgUrl, defaultGalleryList[idx % defaultGalleryList.length]);
  });

  const videoImg = getValidImageUrl(currentProject.videoImg || videoData.image, projectSectionVideo);
  const videoLink = currentProject.videoUrl || videoData.videoUrl || siteData?.header?.whatsAppUrl || 'https://wa.me/919428989488';

  // Set page title and meta description for SEO
  useEffect(() => {
    window.scrollTo(0, 0);
    const pageTitle = currentProject.metaTitle || `${currentProject.name} | Case Study | Winera International`;
    const metaDesc = currentProject.metaDescription || `Explore how Winera International designed and built ${currentProject.name} in ${currentProject.location}. Turnkey setup across ${currentProject.area}.`;
    document.title = pageTitle;

    let metaDesc_el = document.querySelector('meta[name="description"]');
    if (!metaDesc_el) {
      metaDesc_el = document.createElement('meta');
      metaDesc_el.setAttribute('name', 'description');
      document.head.appendChild(metaDesc_el);
    }
    metaDesc_el.setAttribute('content', metaDesc);
  }, [slug, currentProject]);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: '#0f172a', background: '#F5F5F9', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* HEADER */}
      <Header headerData={header} />

      {/* 1. HERO BANNER SECTION */}
      <section className="winera-project-hero-section" style={{
        position: 'relative',
        width: '100%',
        minHeight: 'auto',
        paddingTop: isPhone ? '55px' : '175px',
        paddingBottom: isPhone ? '0px' : '95px',
        aspectRatio: isPhone ? '941 / 550' : 'auto',
        background: isPhone ? `url(${gameZoneMobileBanner}) center top / 100% 100% no-repeat` : `url(${bannerImg}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Breadcrumb: Home › Project › Name */}
          <h1 className="winera-project-hero-h1" style={{
            fontSize: isPhone ? '1.05rem' : '21px',
            fontWeight: '900',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: isPhone ? '6px' : '8px',
            margin: 0,
            lineHeight: 1.3,
            textAlign: 'center',
            opacity: 0.95,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
          }}>
            <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>{breadcrumbHome}</Link>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <Link to="/project" style={{ color: '#ffffff', textDecoration: 'none' }}>Project</Link>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>{currentProject.name}</span>
          </h1>
        </div>
      </section>

      {/* 2. PROJECT BLOCK SECTION */}
      <section className="winera-project-block-section" style={{ padding: '40px 4vw 100px', maxWidth: '1240px', margin: '0 auto' }}>
        <div className="winera-project-block-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
          gap: '40px 50px',
          alignItems: 'center'
        }}>
          {/* Content Side */}
          <div className="winera-project-block-text">
            <img
              src={strokeImg}
              alt=""
              style={{ display: 'block', maxWidth: '100%', width: '300px', height: '8px', marginBottom: '12px', objectFit: 'fill' }}
            />

            <h2 style={{
              fontSize: '35px',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.2,
              marginBottom: '14px',
              maxWidth: '680px',
              wordBreak: 'normal',
              overflowWrap: 'break-word'
            }}>
              {(() => {
                const cyanPart = [titleLine1, titleLine2].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
                const blackPart = [titleLine2Black, titleLine3].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
                return (
                  <>
                    <span style={{ color: '#38bdf8' }}>{cyanPart} </span>
                    <span style={{ color: '#0f172a' }}>{blackPart}</span>
                  </>
                );
              })()}
            </h2>

            <p style={{
              fontSize: '15px',
              color: '#475569',
              lineHeight: 1.65,
              fontWeight: '500',
              marginBottom: '16px',
              maxWidth: '700px'
            }}>
              {description}
            </p>

            {/* Offset Yellow Backing + Cyan Pill Button */}
            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              <a
                href={buttonLink}
                target="_blank"
                rel="noreferrer"
                className="winera-cyan-cta-btn winera-cyan-cta-btn-sm">
                {buttonText}
              </a>
            </div>
          </div>

          {/* Image Side with Offset Cyan Border Frame */}
          <div className="winera-project-block-img" style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <div style={{
              position: 'relative',
              maxWidth: '340px',
              width: '100%',
              aspectRatio: '1 / 1'
            }}>
              <div className="winera-project-frame-bg" style={{
                position: 'absolute',
                inset: '-18px -20px -18px 22px',
                border: '2px solid #38bdf8',
                borderRadius: '10px',
                background: 'transparent',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>

              <img
                src={mainImage}
                alt="Project Main Card"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '0px',
                  display: 'block',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. BASIC INFORMATION CARD BLOCK */}
      <section className="winera-project-basic-section" style={{ padding: '0 4vw 45px', maxWidth: '1240px', margin: '0 auto' }}>
        <div className="winera-project-basic-card" style={{
          position: 'relative',
          width: '100%',
          backgroundImage: `url("${basicBg}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50px',
          padding: '38px 50px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
          overflow: 'hidden',
          minHeight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <img
              src={strokeImg}
              alt=""
              style={{ display: 'block', maxWidth: '100%', width: '240px', height: '8px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{
              fontSize: '35px',
              fontWeight: '900',
              margin: 0,
              lineHeight: 1.15,
              textShadow: '0 4px 15px rgba(0,0,0,0.4)'
            }}>
              <span style={{ color: '#ffcd00' }}>Basic </span>
              <span style={{ color: '#ffffff' }}>Information</span>
            </h2>
          </div>

          <div className="winera-project-basic-table-box" style={{
            maxWidth: '520px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '10px',
            border: '2px solid #ffcd00',
            boxShadow: '0 20px 45px rgba(0,0,0,0.25)',
            overflow: 'hidden',
            paddingBottom: '0px',
            marginTop: '15px',
            marginBottom: '15px'
          }}>
            {basicRows.map((row, rIdx) => (
              <div
                key={row.label || rIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 30px',
                  borderBottom: rIdx === basicRows.length - 1 ? 'none' : '1px solid #e2e8f0'
                }}
              >
                <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#0f172a', textAlign: 'left' }}>
                  {row.label}
                </span>
                <span style={{ fontSize: '14.5px', fontWeight: '500', color: '#334155', textAlign: 'right' }}>
                  {row.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT THE CLIENT WANTED BLOCK */}
      <section className="winera-project-client-section" style={{ padding: '30px 4vw 20px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img
            src={strokeImg}
            alt=""
            style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
          />
          <h2 style={{
            fontSize: '35px',
            fontWeight: '900',
            color: '#0f172a',
            margin: 0,
            lineHeight: 1.15
          }}>
            <span>{clientTitlePrefix}</span>
            <span style={{ color: '#38bdf8' }}>{clientTitleCyan}</span>
          </h2>
        </div>

        <div className="winera-project-client-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: '20px',
          alignItems: 'center'
        }}>
          <div className="winera-project-client-text">
            {clientP2 ? (
              <MobileExpandableText
                preview={
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '16px' }}>
                    {clientP1}
                  </p>
                }
                expandedContent={
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                    {clientP2}
                  </p>
                }
              />
            ) : (
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {clientP1}
              </p>
            )}
          </div>

          <div className="winera-project-client-img" style={{ display: 'flex', justifyContent: 'flex-start', padding: '16px 20px 16px 0' }}>
            <div style={{ position: 'relative', maxWidth: '430px', width: '100%', aspectRatio: '16 / 10' }}>
              <div style={{
                position: 'absolute',
                inset: '-16px -20px -16px 44px',
                border: '2px solid #38bdf8',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>
              <img
                src={clientImg}
                alt="What the Client Wanted"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '0px',
                  display: 'block',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT SOLUTION WE PROVIDE BLOCK */}
      <section className="winera-project-solution-section" style={{ padding: '20px 4vw 50px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img
            src={strokeImg}
            alt=""
            style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
          />
          <h2 style={{
            fontSize: '35px',
            fontWeight: '900',
            color: '#0f172a',
            margin: 0,
            lineHeight: 1.15
          }}>
            <span style={{ color: '#38bdf8' }}>{solutionTitleCyan}</span>
            <span>{solutionTitleSuffix}</span>
          </h2>
        </div>

        <div className="winera-project-solution-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
          gap: '50px',
          alignItems: 'center'
        }}>
          <div className="winera-project-solution-img" style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 0' }}>
            <div style={{ position: 'relative', maxWidth: '430px', width: '100%', aspectRatio: '16 / 10' }}>
              <div style={{
                position: 'absolute',
                inset: '-16px 44px -16px -20px',
                border: '2px solid #38bdf8',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>
              <img
                src={solutionImg}
                alt="What Solution We Provide"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '0px',
                  display: 'block',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          <div className="winera-project-solution-text">
            {solutionP2 ? (
              <MobileExpandableText
                preview={
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '16px' }}>
                    {solutionP1}
                  </p>
                }
                expandedContent={
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                    {solutionP2}
                  </p>
                }
              />
            ) : (
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {solutionP1}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 6. PROJECT GALLERY SECTION */}
      <section className="winera-project-gallery-section" style={{
        position: 'relative',
        width: '100%',
        padding: '105px 4vw 120px',
        background: 'linear-gradient(180deg, #c1edfc 0%, #dff4fe 20%, #f4faff 50%, #d8f1fe 80%, #ade9fe 100%)',
        margin: '20px 0 0',
        overflow: 'hidden'
      }}>
        {/* Top Decorative Cut Shape (Exact Original Asset Notch Cut) */}
        <div
          className="winera-project-gallery-top-cut"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '80px',
            background: `url(${projectGalleryTopCut}) center top / 100% 100% no-repeat`,
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        {/* Bottom Decorative Cut Shape (Exact Original Asset Stepped Yellow Cut Matching Image 2) */}
        <div
          className="winera-project-gallery-bottom-cut"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100px',
            background: `url(${projectGalleryBottomCut}) center bottom / 100% 100% no-repeat`,
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div
            className="winera-project-gallery-heading"
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '45px' }}
          >
            <img
              src={strokeImg}
              alt=""
              style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
              <span style={{ color: '#38bdf8' }}>{galleryTitleCyan}</span>
              <span>{galleryTitleDark}</span>
            </h2>
          </motion.div>

          <div className="winera-project-gallery-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {galleryImages.map((imgSrc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 45, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  delay: (idx % 6) * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{
                  y: -8,
                  scale: 1.025,
                  boxShadow: '0 20px 35px rgba(56, 189, 248, 0.25), 0 10px 20px rgba(0,0,0,0.12)'
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  background: '#ffffff',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  aspectRatio: '6 / 5'
                }}
              >
                <img
                  src={imgSrc}
                  alt={`Project Gallery ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '24px',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROJECT VIDEO SHOWCASE SECTION */}
      <section className="winera-project-video-section" style={{ padding: '60px 4vw 90px', maxWidth: '1060px', margin: '0 auto', textAlign: 'center' }}>
        <motion.button
          className="winera-project-video-btn"
          onClick={() => openVideoModal(videoLink, `${currentProject.name} Showcase`)}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -8, scale: 1.02, boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}
          whileTap={{ scale: 0.98 }}
          aria-label="Play Project Showcase Video"
          style={{
            display: 'block',
            position: 'relative',
            width: '100%',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 12px 35px rgba(0,0,0,0.12)',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            background: '#0f172a',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <img
            className="winera-project-video-img"
            src={videoImg}
            alt="Project Showcase Video"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = projectSectionVideo;
            }}
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '28px' }}
          />

          {/* Subtle Video Vignette Overlay for Crisp Contrast */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.45) 100%)',
              borderRadius: '28px',
              pointerEvents: 'none'
            }}
          />

          {/* Central Pulsing Play Button Badge */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 3
            }}
          >
            {/* Outer Expanding Pulse Ring */}
            <motion.div
              animate={{
                scale: [1, 1.45, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                width: isPhone ? '75px' : '96px',
                height: isPhone ? '75px' : '96px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.35)',
                border: '2px solid rgba(56, 189, 248, 0.7)'
              }}
            />

            {/* Glowing Brand Play Button */}
            <div
              style={{
                position: 'relative',
                width: isPhone ? '58px' : '76px',
                height: isPhone ? '58px' : '76px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                boxShadow: '0 8px 30px rgba(56, 189, 248, 0.6), 0 0 25px rgba(255, 255, 255, 0.5)',
                border: '3px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              <Play
                style={{
                  width: isPhone ? '24px' : '30px',
                  height: isPhone ? '24px' : '30px',
                  color: '#ffffff',
                  fill: '#ffffff',
                  marginLeft: '4px'
                }}
              />
            </div>
          </div>
        </motion.button>
      </section>

      {/* 8. OUR RECENT PROJECTS MARQUEE */}
      <ProjectsMarqueeSection
        siteData={siteData}
        projects={siteData?.builtProjects}
        showTopHeader={false}
        simpleTitle={<>Our <span style={{ color: '#38bdf8' }}>Recent Projects</span></>}
        showBottomButton={true}
        buttonText="View All Projects"
      />

      {/* 9. RELATED PRODUCTS SECTION */}
      <RelatedProductsSection sectionData={siteData?.projectRelated} />

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
