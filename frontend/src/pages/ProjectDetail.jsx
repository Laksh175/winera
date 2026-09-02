import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RelatedProductsSection from '../components/RelatedProductsSection';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import projectBanner from '../assets/project-banner.webp';
import projectImage01 from '../assets/project-image01.webp';
import projectImage2Bg from '../assets/project-image2-bg.webp';
import projectImage3 from '../assets/project-image-3.webp';
import projectImage4 from '../assets/project-image-4.webp';
import projectImagesBg from '../assets/project-images-bg.webp';
import projectBlock1 from '../assets/project-block1.webp';
import projectBlock2 from '../assets/project-block2.webp';
import projectBlock3 from '../assets/project-block3.webp';
import projectSectionVideo from '../assets/project-section-video.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import CtaBanner from '../components/CtaBanner';
import bumpercarCtaBannerBg from '../assets/bumpercar-cta-banner-bg.webp';
import projHulaboo from '../assets/proj-hulaboo.webp';
import projNeon1 from '../assets/proj-neonpanda1.webp';
import projSoft1 from '../assets/proj-softplay1.webp';

const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('/src/assets/')) {
    return fallback;
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/uploads')) {
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    return `http://${hostname}:5001${url}`;
  }
  return fallback;
};

import { useVideoModal } from '../context/VideoModalContext';

export default function ProjectDetail({ siteData }) {
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
      mainImg: projectImage01,
      clientImg: projectImage3,
      solutionImg: projectImage4
    },
    'hulaboo': {
      name: "Hulaboo Game Zone",
      titleLine1: "Hulaboo: How We Turned",
      titleLine2: "An Empty Space Into ",
      titleLine2Black: "Surat's Buzziest",
      titleLine3: "Game Zone Destination",
      description: "We turned a large empty space in Surat into one of the city's biggest indoor game zones — packed with games for every age, all under one roof.",
      metaTitle: "Hulaboo Game Zone Setup in Surat | Winera International",
      metaDescription: "Discover how Winera International built Hulaboo, a 27,000 sq. ft. indoor game zone setup in Surat with multi-age attractions and turnkey execution.",
      type: "Game Zone Setup",
      location: "Surat, Gujarat",
      area: "27,000 sq. ft.",
      clientWanted1: "The client had a large space in Surat and a clear idea in mind. They didn't just want a few games, they wanted a place that people would remember. Somewhere a small kid, a group of friends, and a whole family could all come and have fun.",
      clientWanted2: "Most importantly, they wanted the whole process to be easy. Instead of dealing with many different suppliers, they wanted just one team to manage everything from planning and design to installation and hand over a game zone that was completely ready to open.",
      solution1: "At Winera International, we handled the complete game zone setup from start to finish — planning the layout, installing every attraction, and getting the venue ready to open.",
      solution2: "A 27,000 sq. ft. space gives you plenty of room, but the real work is in the planning. You can't just line up machines; the layout has to move people smoothly from one experience to the next. So we mapped out the space around how visitors actually move and spend their time. The high-energy attractions were placed where the noise and action wouldn't clash, while the quieter games and kids' zones were set up in calmer, safer areas. We also planned proper room for walkways, seating, and open space so no part of the venue ever felt tight or crowded. The result is one smooth experience where families, friends, and serious gamers can all visit and each find their own kind of fun.",
      mainImg: projHulaboo,
      clientImg: projNeon1,
      solutionImg: projSoft1
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
    }
  };

  const cmsItem = Array.isArray(siteData?.projectItems)
    ? siteData.projectItems.find(p => p.slug === slug || p.id === slug)
    : null;

  const defaultProject = caseStudies[slug] || {
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
    clientImg: projectImage3,
    solutionImg: projectImage4
  };

  const currentProject = cmsItem ? {
    name: cmsItem.name || defaultProject.name,
    titleLine1: cmsItem.titleLine1 || defaultProject.titleLine1,
    titleLine2: cmsItem.titleLine2 || defaultProject.titleLine2,
    titleLine2Black: cmsItem.titleLine2Black || defaultProject.titleLine2Black,
    titleLine3: cmsItem.titleLine3 || defaultProject.titleLine3,
    description: cmsItem.description || defaultProject.description,
    metaTitle: cmsItem.metaTitle || cmsItem.seoTitle || defaultProject.metaTitle,
    metaDescription: cmsItem.metaDescription || cmsItem.seoDescription || defaultProject.metaDescription,
    type: cmsItem.type || defaultProject.type,
    location: cmsItem.city ? `${cmsItem.city}${cmsItem.state ? `, ${cmsItem.state}` : ''}` : (cmsItem.location || defaultProject.location),
    area: cmsItem.area || defaultProject.area,
    clientWanted1: cmsItem.clientWanted1 || defaultProject.clientWanted1,
    clientWanted2: cmsItem.clientWanted2 || defaultProject.clientWanted2,
    solution1: cmsItem.solution1 || defaultProject.solution1,
    solution2: cmsItem.solution2 || defaultProject.solution2,
    mainImg: getValidImageUrl(cmsItem.img || cmsItem.imageUrl, defaultProject.mainImg),
    clientImg: getValidImageUrl(cmsItem.clientImg || cmsItem.clientImageUrl, defaultProject.clientImg),
    solutionImg: getValidImageUrl(cmsItem.solutionImg || cmsItem.solutionImageUrl, defaultProject.solutionImg),
    galleryImages: [
      cmsItem.galleryImage1,
      cmsItem.galleryImage2,
      cmsItem.galleryImage3,
      cmsItem.galleryImage4,
      cmsItem.galleryImage5,
      cmsItem.galleryImage6
    ].filter(Boolean),
    videoImg: cmsItem.videoImg || cmsItem.videoCoverUrl || defaultProject.videoImg,
    videoUrl: cmsItem.videoUrl || cmsItem.videoLink || defaultProject.videoUrl,
    basicInfoBg: cmsItem.basicInfoBg || cmsItem.basicBg || ''
  } : defaultProject;

  // Dynamic content sections from CMS siteData
  const heroData = siteData?.projectHero || {};
  const basicData = siteData?.projectBasicInfo || {};
  const galleryData = siteData?.projectGallery || {};
  const videoData = siteData?.projectVideo || {};

  const bannerImg = getValidImageUrl(heroData.bannerImg, projectBanner);
  const breadcrumbHome = heroData.breadcrumbHome || 'Home';

  const strokeImg = yellowStrokeLine;
  const titleLine1 = currentProject.titleLine1;
  const titleLine2 = currentProject.titleLine2;
  const titleLine2Black = currentProject.titleLine2Black;
  const titleLine3 = currentProject.titleLine3;
  const description = currentProject.description;
  const buttonText = siteData?.projectBlock?.buttonText || 'Get A Quote';
  const _rawButtonLink = siteData?.projectBlock?.buttonLink || 'https://wa.me/919428989488';
  const _waMessage = siteData?.projectBlock?.waMessage || 'Hello Winera International! I want to get a project quote. Please share details. [Ref: Project Detail Page]';
  const buttonLink = !_rawButtonLink.includes('text=')
    ? `${_rawButtonLink.split('?')[0]}?text=${encodeURIComponent(_waMessage)}`
    : _rawButtonLink;
  const mainImage = currentProject.mainImg;

  const basicBg = getValidImageUrl(currentProject.basicInfoBg || basicData.bgImg, projectImage2Bg);
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
  const clientImg = currentProject.clientImg;

  const solutionTitleCyan = 'What Solution ';
  const solutionTitleSuffix = 'We Provide';
  const solutionP1 = currentProject.solution1;
  const solutionP2 = currentProject.solution2;
  const solutionImg = currentProject.solutionImg;

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

  const cmsGalleryImages = Array.isArray(currentProject.galleryImages) && currentProject.galleryImages.length > 0
    ? currentProject.galleryImages
    : (Array.isArray(galleryData.images) && galleryData.images.length > 0 ? galleryData.images : defaultGalleryList);

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
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a', background: '#F5F5F9', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* HEADER */}
      <Header headerData={header} />

      {/* 1. HERO BANNER SECTION */}
      <section className="winera-project-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '150px',
        paddingBottom: '120px',
        background: `url(${bannerImg}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Crafting Heading — TOP */}
          <p style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#38bdf8',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>Case Study</p>
          <h2 style={{
            fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)',
            fontWeight: '900',
            color: '#ffffff',
            margin: '0 auto 10px',
            lineHeight: 1.18,
            maxWidth: '700px',
            textShadow: '0 4px 18px rgba(0,0,0,0.45)'
          }}>
            {currentProject.name}
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65 }}>
            {currentProject.type} &bull; {currentProject.location}
          </p>

          {/* Breadcrumb: Home › Project › Name */}
          <h1 className="winera-project-hero-h1" style={{
            fontSize: '1.45rem',
            fontWeight: '900',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            margin: '15px 0 0 0',
            lineHeight: 1.2,
            textAlign: 'center',
            opacity: 0.95
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
              fontSize: '2.1rem',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.18,
              marginBottom: '14px'
            }}>
              <span style={{ color: '#38bdf8' }}>{titleLine1}</span>
              <br />
              <span style={{ color: '#38bdf8' }}>{titleLine2}</span>
              <span style={{ color: '#0f172a' }}>{titleLine2Black}</span>
              <br />
              <span style={{ color: '#0f172a' }}>{titleLine3}</span>
            </h2>

            <p style={{
              fontSize: '12px',
              color: '#475569',
              lineHeight: 1.55,
              fontWeight: '400',
              marginBottom: '24px',
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
                className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
              >
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
                top: '-15px',
                right: '-15px',
                bottom: '15px',
                left: '15px',
                border: '2px solid #38bdf8',
                borderRadius: '24px',
                background: 'rgba(56, 189, 248, 0.08)',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>

              <img
                src={mainImage}
                alt="Project Main Card"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
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
      <section className="winera-project-basic-section" style={{ padding: '0 4vw 90px', maxWidth: '1240px', margin: '0 auto' }}>
        <div className="winera-project-basic-card" style={{
          position: 'relative',
          width: '100%',
          backgroundImage: `url(${basicBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '60px',
          padding: '55px 65px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
          overflow: 'hidden',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ marginBottom: '32px' }}>
            <img
              src={strokeImg}
              alt=""
              style={{ display: 'block', maxWidth: '100%', width: '260px', height: '8px', marginBottom: '12px', objectFit: 'fill' }}
            />
            <h3 style={{
              fontSize: '2.6rem',
              fontWeight: '900',
              margin: 0,
              lineHeight: 1.15,
              textShadow: '0 4px 15px rgba(0,0,0,0.4)'
            }}>
              <span style={{ color: '#ffcd00' }}>Basic </span>
              <span style={{ color: '#ffffff' }}>Information</span>
            </h3>
          </div>

          <div className="winera-project-basic-table-box" style={{
            maxWidth: '520px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '28px',
            border: '2px solid #ffcd00',
            boxShadow: '0 20px 45px rgba(0,0,0,0.25)',
            overflow: 'hidden',
            paddingBottom: '16px'
          }}>
            {basicRows.map((row, rIdx) => (
              <div
                key={row.label || rIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 36px',
                  borderBottom: '1px solid #e2e8f0'
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
      <section className="winera-project-client-section" style={{ padding: '40px 4vw 70px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <img
            src={strokeImg}
            alt=""
            style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
          />
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#0f172a',
            margin: 0,
            lineHeight: 1.15
          }}>
            <span>{clientTitlePrefix}</span>
            <span style={{ color: '#38bdf8' }}>{clientTitleCyan}</span>
          </h3>
        </div>

        <div className="winera-project-client-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: '50px',
          alignItems: 'center'
        }}>
          <div className="winera-project-client-text">
            <p style={{ fontSize: '22px', color: '#475569', lineHeight: 1.6, fontWeight: '400', marginBottom: '20px' }}>
              {clientP1}
            </p>
            <p style={{ fontSize: '22px', color: '#475569', lineHeight: 1.6, fontWeight: '400', margin: 0 }}>
              {clientP2}
            </p>
          </div>

          <div className="winera-project-client-img" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ position: 'relative', maxWidth: '430px', width: '100%' }}>
              <div style={{
                position: 'absolute',
                top: '-18px',
                right: '-18px',
                bottom: '18px',
                left: '18px',
                border: '2px solid #38bdf8',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>
              <img
                src={clientImg}
                alt="What the Client Wanted"
                style={{
                  width: '100%',
                  height: 'auto',
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
      <section className="winera-project-solution-section" style={{ padding: '20px 4vw 90px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <img
            src={strokeImg}
            alt=""
            style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
          />
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#0f172a',
            margin: 0,
            lineHeight: 1.15
          }}>
            <span style={{ color: '#38bdf8' }}>{solutionTitleCyan}</span>
            <span>{solutionTitleSuffix}</span>
          </h3>
        </div>

        <div className="winera-project-solution-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
          gap: '50px',
          alignItems: 'center'
        }}>
          <div className="winera-project-solution-img" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ position: 'relative', maxWidth: '430px', width: '100%' }}>
              <div style={{
                position: 'absolute',
                inset: '-15px -17px -17px 18px',
                border: '2px solid #38bdf8',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>
              <img
                src={solutionImg}
                alt="What Solution We Provide"
                style={{
                  width: '100%',
                  height: 'auto',
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
            <p style={{ fontSize: '21px', color: '#475569', lineHeight: 1.6, fontWeight: '400', marginBottom: '20px' }}>
              {solutionP1}
            </p>
            <p style={{ fontSize: '21px', color: '#475569', lineHeight: 1.6, fontWeight: '400', margin: 0 }}>
              {solutionP2}
            </p>
          </div>
        </div>
      </section>

      {/* 6. PROJECT GALLERY SECTION */}
      <section className="winera-project-gallery-section" style={{
        position: 'relative',
        width: '100%',
        padding: '70px 4vw 90px',
        background: `url(${galleryBg}) center top / 100% 100% no-repeat`,
        margin: '20px 0 0'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '45px' }}>
            <img
              src={strokeImg}
              alt=""
              style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
            />
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
              <span style={{ color: '#38bdf8' }}>{galleryTitleCyan}</span>
              <span>{galleryTitleDark}</span>
            </h3>
          </div>

          <div className="winera-project-gallery-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {galleryImages.map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt={`Project Gallery ${idx + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '24px',
                  display: 'block',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  objectFit: 'cover'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROJECT VIDEO SHOWCASE SECTION */}
      <section style={{ padding: '60px 4vw 90px', maxWidth: '1060px', margin: '0 auto', textAlign: 'center' }}>
        <button
          onClick={() => openVideoModal(videoLink, `${currentProject.name} Showcase`)}
          style={{
            display: 'block',
            position: 'relative',
            width: '100%',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer'
          }}
        >
          <img
            src={videoImg}
            alt="Project Showcase Video"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '28px' }}
          />
        </button>
      </section>

      {/* 8. OUR RECENT PROJECTS MARQUEE */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>Our <span style={{ color: '#38bdf8' }}>Recent Projects</span></>}
        showBottomButton={true}
        buttonText="View All Projects"
      />

      {/* 9. RELATED PRODUCTS SECTION */}
      <RelatedProductsSection />

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
