import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateSectionContent, mutateContentItem, uploadImageFile, syncSitemapApi, fetchArcadeProducts, fetchVrGames, fetchProjects, createProjectApi, updateProjectApi, deleteProjectApi } from '../services/api';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import LeadManagementSection from '../components/LeadManagementSection';
import BlogAdminManagement from '../components/BlogAdminManagement';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import StatusDropdown from '../components/StatusDropdown';
import HomeDashboard from '../admin/HomeDashboard';
import ArcadeDashboard from '../admin/ArcadeDashboard';
import BowlingDashboard from '../admin/BowlingDashboard';
import SoftPlayDashboard from '../admin/SoftPlayDashboard';
import TrampolineDashboard from '../admin/TrampolineDashboard';
import AmusementDashboard from '../admin/AmusementDashboard';
import HypergridDashboard from '../admin/HypergridDashboard';
import BumperCarDashboard from '../admin/BumperCarDashboard';
import VrDashboard from '../admin/VrDashboard';
import ArDashboard from '../admin/ArDashboard';
import LaserTagDashboard from '../admin/LaserTagDashboard';
import ProjectsDashboard from '../admin/ProjectsDashboard';
import RoiDashboard from '../admin/RoiDashboard';
import BlogDashboard from '../admin/BlogDashboard';
import AboutDashboard from '../admin/AboutDashboard';
import ContactDashboard from '../admin/ContactDashboard';
import SafetyDashboard from '../admin/SafetyDashboard';
import HeaderDashboard from '../admin/HeaderDashboard';
import FooterDashboard from '../admin/FooterDashboard';
import PrivacyPolicyDashboard from '../admin/PrivacyPolicyDashboard';
import TermsConditionsDashboard from '../admin/TermsConditionsDashboard';

const DEFAULT_ARCADE_CATEGORIES = [
  "Arcade Games", "Claw Machine", "Redemption Game", "Kiddy Ride",
  "Bike & Car Racing Games", "Shooting Games", "Strength Based Games"
];
const DEFAULT_VR_CATEGORIES = [
  "All VR Games",
  "VR 9D Cinema",
  "VR Racing Simulator",
  "VR Shooting Simulator",
  "VR Flying Simulator",
  "Movie Experience",
  "VR 360 Simulator",
  "Kids' Interactive Equipment"
];
import projectPageMobileBanner from '../assets/project-page-mobile-banner.png';
import { Save, LogOut, ExternalLink, RefreshCw, CheckCircle, Users, Home, Gamepad2, Info, Layout, MessageSquare, HelpCircle, List, Sliders, PhoneCall, ShieldCheck, Building, Plus, Trash2, FileText, Upload, Image as ImageIcon, Edit2, Edit, Edit3, X, Star, Video, Trophy, Sparkles, Calculator, Menu, Target, ChevronDown } from 'lucide-react';
const blogCardImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345635/winera_uploads/ltwinrzpqitg4s8znfel.png";
const yellowBrushAccent = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345696/winera_uploads/kllqvzchxecftuxi6zdn.png";
const ctaConsultationsBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/ncvfqvtbv4zdvf9cd4n7.jpg";
const vrCtaRightImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/r7a7hoy1dktrgee5mxhq.png";
const vrBlock1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/lwatadqikcv51rk0ekf7.jpg";
const wineraLogo = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/dqjnjhybdtibqy4soznu.png";
const heroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345656/winera_uploads/jszelnb45kglcliprty7.png";
const heroMobileBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345650/winera_uploads/metbo4e8giv2tctvqkdh.png";
const laserTagImg1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345668/winera_uploads/pvowe89a9npyelw0urvy.png";
const laserTagImg2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/pdxjsxxlv5fmskyvexns.png";
const laserTagImg3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/c6ibna0gcd0tjshkgo8o.png";
const laserTagImg3Border = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/p1eoo20dsjbpbx6lja9n.png";
const laserTagBg3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/zehlru7p5ycnkgk0iy7s.png";
const laserTagBg4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/xrz97xddcvnnpf6roewa.png";
const laserTagImg5 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/v9ozhnic1za88buasewx.png";
const laserTagImg6 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/ekzzusfpuhfyih8nyc3w.png";
const laserTagImg6Bg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/bmfayjdfcpyocsjcg8cc.png";
const laserTagImg6Small = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/neuibh4fb5zojuvgtiec.png";
const laserTagImg6Btn = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/eo5gjslhvaiutogkzeq9.png";
const homePageIcon = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345656/winera_uploads/gp0aisnttd4hpnswmxu4.png";
const laserTagHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/tj7ke5cpufz9t41c4d7v.png";

const projectBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/a42izbmfkrylnroo3i7g.png";
const projectImage01 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/igg4yrl7xhnxllqifpj7.jpg";
const projectImage2Bg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/hjfo9tsk0tmkxgz1x2ab.png";
const projectImage3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/hifdo3jiuvbvu4cxkgq4.jpg";
const projectImage4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/nt4puaf87gc83fawddbc.jpg";
const projectImagesBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/kp4vrfwgnohju6x2hlae.png";
const projectBlock1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/vxfee3fxtxt09nu04bd8.png";
const projectBlock2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/vqhjjj1ruclhqyadhdso.png";
const projectBlock3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/w47edsuankt5lteq3ghx.png";
const projectSectionVideo = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/nd79kzv2qshsmkkeeun3.png";
const yellowStrokeLine = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345696/winera_uploads/kllqvzchxecftuxi6zdn.png";
const projectCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/jk3i8dno06b01dvjhwvi.png";
const projHulaboo = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/a52mbp31belkkslptdal.jpg";
const projSoft1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/olzpipldgl4mnb7c1y5q.jpg";
const projNeon1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/s8v6jwxs7eyoq877yeso.jpg";

const hypergridHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/dazartbigth5uomw4l82.png";
const trampolineParkBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/nri2vtjcndonajowvvqw.png";
const trampolineParkImg1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/gy34ivaldlm7ia55iwci.png";
const trampolineParkImg2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/za8k8euyryqqt3r7xsbw.png";
const trampolineImg3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/qhy9p0wnfrckyk0balq8.png";
const tampolineImg4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/chwp9rfndvq1wmsbywnu.png";
const tampolineImg5 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/ceb9kp4t9y89jdwmc01v.png";
const tampolineImage6 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/yxrlmzeeordrutqtvbcj.png";
const hypergridSupplierCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/dzjrsas1qwrxj8qxlw45.png";
const hypergridBannerImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/v1fevfcntejtyhfdhqzl.png";
const hypergridSpecsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/jhhdqkrobdtt22bztejh.png";
const hypergridWhyUsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/gtfgc6nbhnkzypye0phi.png";
const hypergridImage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/huto0jbp8fo9zx7bx3du.png";
const hypergridWineraLastblock = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345667/winera_uploads/enkcvfcpvzrd9rosyjno.jpg";
const leftTiltedCard = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345491/winera_uploads/n1iuhnpcp6oyxtdsosf0.png";
const rightTiltedCard = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345495/winera_uploads/oo9iwl6nuom77timvj3o.png";
const arImage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345478/winera_uploads/flajlse8cqswtulhkmtz.png";

const safetyBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/getce7p5gid4wrppgnic.png";
const safetyStandardImg1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/z3eceycrpfb2wkxweq2g.png";
const safetyStandardBg2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/lihbfrarrh6ffswp6v6s.png";
const safetyStandard2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/eawljpqyxow6oyrtd63i.png";
const safetyStandardImg3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/qbaxirh5jtpuy4ix90ae.png";

const roiBgImage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/mf1cwyxhxusz6bepq49z.png";
const roiImg1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/atfyiiq3xfyaasg0knig.png";
const roiImage3bg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/ovcg4qswhsqxudtga429.png";
const roiBlock5Img1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345678/winera_uploads/izqazydgn5rpfaztie6u.png";
const roiBlock5Img2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345678/winera_uploads/cxunxtrlppwkquabwexp.png";
const roiBlock5Img3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345678/winera_uploads/paetmpiccw1jsxatynka.png";
const roiBlock5Img4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/caygc5bib4f3zucmavng.png";
const roiBlock5Img5 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/wzwb837zocgpo1e2xfds.png";
const roiBlock5Img6 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/icyqws3zo0i1gnyw52zo.png";
const roiBlock6 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/u7yiknltu3acbgk5bdal.png";
const roiBlock7Bg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/fx5mcigkjl4duogrx0no.png";
const homeBlockBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345656/winera_uploads/ce68jfjddo1sxdoptwkv.png";
const homeBlock1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345655/winera_uploads/gv0pghj5lvv8p5tuhlri.png";
const homeBlock2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345655/winera_uploads/syhiztp9n4leryqbqjf6.png";
const about1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345510/winera_uploads/wxqjmaw9a6bio8qwbeq4.png";
const about2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345511/winera_uploads/tqdmbldbsagsq6pylfq0.jpg";
const trampolineParkCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/l1grqnreps9stov1wrta.png";
const about3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345512/winera_uploads/x14hcngkdlrhsdccxigh.jpg";
const about4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345513/winera_uploads/wvbncpu0ey7yttt9i4yc.jpg";
const aboutusCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345524/winera_uploads/xk0ihsjpsavmxrrt07di.png";
const ctaArcade = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/wrwlxquyxiiygubzvzlx.jpg";
const ctaMainBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/ei16uczeuelaabtue4bs.jpg";
const arcadeHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/t3gsogz8if5mw7t0hj1h.png";
const commercialTeam = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/ld6pprroti7x4husa1kz.jpg";
const arcadeCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/gqyx5q0t4y7o8lereesb.png";
const bowlingHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345639/winera_uploads/lp7tajaeyaq6qgrmo40k.png";
const bowlingImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345635/winera_uploads/zyqvt8jgfcgpdwwnsyp0.png";
const bowlingPinsExplode = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345635/winera_uploads/yma3vs3ksbgdout5sstv.png";
const bowlingBallPinsBlue = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345635/winera_uploads/itulmznrljzaclrtvu4p.png";
const bowlingImage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345640/winera_uploads/u8tizerxgewq8uzkhsws.png";
const blogHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/tj7ke5cpufz9t41c4d7v.png";
const bumpercarHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/d0pjhjvz9xnbyggqy1lh.png";
const bumpercarCtaBannerBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/ncvfqvtbv4zdvf9cd4n7.jpg";
const bumpercarOptionsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345640/winera_uploads/bwsuvrutkdiuezsqffni.png";
const bumpercarOptionsCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345640/winera_uploads/pg9vfwcztmuh1loeexhl.png";
const bumpercarInvestmentCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345640/winera_uploads/q6jdfhs7ac4pxs7rk75n.png";
const bumpercar3dNeon = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/zilfiijzb4arwuspyfwa.png";
const bumpercarCollageFrame = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/bcia8d2o3cekiuknvaqv.png";
const bumpercarSpecsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/ytjiaogminatt3ggybat.jpg";
const amusementParkCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/ncvfqvtbv4zdvf9cd4n7.jpg";
const bumperCarCtaLeft = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/pk9cr8bp7ysojuozyfqt.png";
const bumperCarCtaRight = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/nseoo0oro8g1jtcuyyuf.png";
const vrHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/q4ikneewn9feixt3dyat.png";
const vrSupplierCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/fotb8dwjs5b1tvmrbuut.png";
const vrMatchedVenueDirect = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/g1jdvjffwyfgczzas3bu.png";
const vrCommercialReliability = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/mwwbahj93n3edr79u56j.png";
const vrRoiFrame = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/q1ko5z5lntd6vquthluc.png";
const vrEarnPlayer = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/lgpdlfkmriydmxrftvc1.jpg";
const arHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/f1ecb4v7xdztwwimzb3l.png";
const arSupplierCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/jnv3jpypar3oyptok2ua.png";
const arAttractionsGraphic = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345544/winera_uploads/o0rxgli4i1gfotelvg9a.png";
const arFeaturesBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/ug6dmazccdtqxjpzixxz.png";
const arEarnGamers = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345546/winera_uploads/u9f9gkrbms7knuto3gg5.png";
const softPlayImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/jpa5i3veqiyi3c1ppm01.png";
const softplayCastle3d = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/vfq07wm5wsph9uhc9zqw.png";
const allImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345526/winera_uploads/bine7noydx0n6siekgzj.png";
const softPalyImage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/jt4xtkkan34gtiuzmhkw.png";
const groupImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345651/winera_uploads/mlrg5lqzsydk8zmymo2m.png";
const aboutCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345513/winera_uploads/gx7vudyvuoninal2tnbu.png";
const softplayHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/s9xcisfml3w3bzaqkoq9.png";
const softplaySpecsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/pn5nx938tt1q2pdzpaoi.png";
const softplayMaterialsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/q682amchcsfchvadr7fm.png";
const softplayRoiBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/y44ee2hbcjordwe3bpjf.png";
const softplayCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/onngsoz46k1mgxbyi6n1.png";
const ctaSoftplayBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/w1m4przklz2qiyevbxtu.png";
const amusementCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/ncvfqvtbv4zdvf9cd4n7.jpg";
const amusementLeftImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345537/winera_uploads/hmrjtkrjh2zaz9ugifto.png";
const amusementRightImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345540/winera_uploads/tbqjdb5su3jc0la19kfi.png";
const amusementHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345536/winera_uploads/s8shz3a3qqju8pkzuosz.png";
const amusementSupplierCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345542/winera_uploads/fdeml6rze08pwyeevuol.png";
const amusementSetupsCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345541/winera_uploads/ft99zjjtowo2whm7wmfm.png";
const amusementOptionsTopCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345534/winera_uploads/zwtfbjhcbssivoub3tt3.png";
const amusementOptionsBottomImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345532/winera_uploads/tztjfsszmpxauyphdevb.png";
const ctaGamersBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/mvnbpetz0ketq0uho4db.png";
const superAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/r9ri8fdp1zn23qijsqbb.jpg";
const puckCarnivalAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345678/winera_uploads/hgufw9unaxafrouason3.jpg";
const dazzlingAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/powuv61epkppbuxyouph.jpg";
const auroraAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345631/winera_uploads/dy0jbj6daxse0hxazo8t.jpg";
const ochaAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/xhpnlwznawws0pul4qqh.jpg";
const aeroXAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345525/winera_uploads/lchcicvnp2rz8bplwljd.jpg";
const arcadegamesImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/bwrkmv2tzczs7ciayqn5.png";
const maskGroupImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345494/winera_uploads/gez4jio7tv0srzaswalq.png";
const maskGroup01Img = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345493/winera_uploads/bf2obwmpvqhhbcbrsutk.png";

const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback;
  }
  return url;
};
const bikeArcade = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/schxkoaxrvkg5cdfqatw.jpg";
const arcadeBoy = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/lxgyufz5gdfquteol0qq.jpg";
const arcadeHall = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/ctowdzk3h7ee5rxb2vpn.jpg";
const founderUnnit = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345649/winera_uploads/cjhrbui8tkykaxa9tztp.png";
const welcomeWineraImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/lqcqhjziwp6sl1zbinep.png";
const aboutHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345517/winera_uploads/wa3oylkwg39op9yozk90.png";
const contactUsHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/z2qo5dtx8u7tyfvzjhmr.png";

const defaultGameZoneMobileBanner = projectPageMobileBanner;
const homeMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345650/winera_uploads/metbo4e8giv2tctvqkdh.png";
const arcadeMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345625/winera_uploads/dv8p9pwu3yjmojbsvay6.png";
const bowlingMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791344862/winera_uploads/rkmpp6gdku34kpzrxakm.png";
const softplayMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345497/winera_uploads/rvdbku2mm1xbhj90hvyq.png";
const trampolineMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345500/winera_uploads/dkzoc8fluvnby5coqgjp.png";
const amusementMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345538/winera_uploads/zoiowsmyqss0g4jfojxg.png";
const hypergridMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345666/winera_uploads/pbm1z3vndfr2wnyvlx8z.png";
const bumpercarMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345487/winera_uploads/euuvj5czlmbwfxazwcy8.png";
const vrMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/kpty49ky7coh1q3mmylu.png";
const arHeroMobileBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345484/winera_uploads/cjhcvoxksmptc84yslh2.png";
const lasertagMobileHeroBg = defaultGameZoneMobileBanner;

const arcadeProductImageMap = {
  "Astrology Cointopia": arcadeHall,
  "Astrology Capsule Version": arcadeBoy,
  "Basketball Star": superAirHockeyImg,
  "Pinball Storm": aeroXAirHockeyImg,
  "Larva Kids Ride": arcadeBoy,
  "Parkour Motor II (DX)": arcadegamesImg,
  "MANX TT 32\"": bikeArcade,
  "Super Air Hockey": superAirHockeyImg,
  "Puck Carnival Air Hockey": puckCarnivalAirHockeyImg,
  "Dazzling Air Hockey - Multi Puck": dazzlingAirHockeyImg,
  "Aurora Air Hockey": auroraAirHockeyImg,
  "Ocha Air Hockey": ochaAirHockeyImg,
  "Aero X Air Hockey": aeroXAirHockeyImg,
  "Happy Carousel Kiddy Ride": arcadeBoy,
  "Super Speed Mini Racer": bikeArcade,
  "Speed Driver 5 Twin Motion": arcadeBoy,
  "OutRun 2 Supercar Simulator": bikeArcade,
  "Scarlet Dawn Dual Gun Shooter": arcadeHall,
  "Jurassic Motion Arcade Shooter": arcadeBoy,
  "Dragon Boxer Punching Machine": arcadeHall,
  "Ultimate Hammer King Pro": arcadeBoy,
  "Toy Story Plush Claw Machine": arcadeHall,
  "Lucky Catcher Crane Machine": arcadeBoy,
  "Claw Machine": arcadeHall,
  "Redemption Game": superAirHockeyImg,
  "Bike & Car Racing Games": bikeArcade,
  "Bike Racing Game": bikeArcade,
  "Car Racing Game": arcadegamesImg,
  "Shooting Games": arcadeHall,
  "VR Games": arcadeBoy,
  "Kiddy Ride": arcadeBoy,
  "Strength Based Games": arcadeHall,
  "Arcade Games": arcadegamesImg
};

const getAdminValidImageUrl = (url, fallback = bikeArcade) => {
  if (!url) return fallback;
  if (typeof url === 'object' && url.default) return url.default;
  if (typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.includes('eqjkboeokagpaus2ifxa') || url.includes('project-page-mobile-banner')) {
    return projectPageMobileBanner;
  }
  if (url.includes('/src/assets/') || url.includes('hypergrid-specs-bg') || url.includes('AR-image') || url.includes('hypergrid-image')) {
    if (url.includes('hypergrid-specs-bg')) return hypergridSpecsBg;
    if (url.includes('AR-image') || url.includes('ar-image')) return arImage;
    if (url.includes('hypergrid-image')) return hypergridImage;
    if (url.includes('hypergrid-whyus-bg')) return hypergridWhyUsBg;
    if (url.includes('hypergrid-supplier-collage')) return hypergridSupplierCollage;
    if (url.includes('hypergrid-banner')) return hypergridBannerImg;
    if (url.includes('hypergrid-hero-bg')) return hypergridHeroBg;
    return fallback;
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  if (url.startsWith('/uploads')) {
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    return `http://${hostname}:5001${url}`;
  }
  if (url.startsWith('/') || url.startsWith('./')) {
    return url;
  }
  return fallback;
};

const defaultBumperCarThrillCards = [
  {
    title: "The Perfect Blend of Thrill and Safety:",
    desc: "When it comes to bumper cars, safety is paramount. At Winera International, we’ve made it our unwavering commitment to ensure the safety of every rider. Our bumper cars are equipped with state-of-the-art safety features and technology, making the bumper car experience a thrilling yet secure adventure. Visitors can enjoy the excitement of collisions without compromising their well-being."
  },
  {
    title: "A Long-Term, Low-Maintenance Investment:",
    desc: "Choosing Winera International’s bumper cars means investing in a long-term, low-maintenance attraction that guarantees maximum fun for your visitors. Our bumper cars are built to withstand the rigors of continuous use, which means less downtime for maintenance and more ride time for your guests. The reliability and durability of our bumper cars ensure that your investment pays off year after year."
  },
  {
    title: "Customization Options from India’s Trusted Bumper Car Manufacturer:",
    desc: "We recognize that every amusement park has its own unique theme and ambiance. That’s why we offer a wide array of designs and features for you to choose from. Our customization options allow you to tailor your bumper car attraction to seamlessly align with the overall look and feel of your park. Whether you’re aiming for a classic, nostalgic atmosphere or a modern, futuristic vibe, our range of choices ensures you can create the perfect fit."
  },
  {
    title: "Elevating Entertainment and Safety Standards:",
    desc: "At Winera International, we’re dedicated to supplying amusement park products that not only enhance the entertainment factor but also raise the bar for safety standards. Our bumper cars exemplify this commitment, where the pursuit of fun is always in harmony with ensuring the safety and well-being of your guests. By investing in our high-quality bumper cars, you’re not just providing memorable experiences; you’re also guaranteeing a secure environment for all riders."
  },
  {
    title: "Contact India’s Leading Bumper Car Manufacturer:",
    desc: "If you’re looking to elevate your amusement park to new heights, Winera International is your partner in making it happen. Our comprehensive range of offerings includes bumper cars designed to capture the hearts of visitors. As a reputed Bumper Car manufacturer in India, we’re ready to assist you in creating an attraction that draws families, friends, and thrill-seekers alike to your park. Contact us today to explore our extensive catalog and discover how our bumper cars can be the highlight of your amusement park."
  }
];

const defaultHypergridHero = {
  bgUrl: hypergridHeroBg,
  bgAlt: 'Hypergrid Game Supplier in India - Winera International',
  mobileBgUrl: hypergridMobileHeroBg,
  mobileBgAlt: 'Hypergrid Interactive Game Mobile Banner - Winera International',
  breadcrumbText: 'Hypergrid'
};

const defaultHypergridIntro = {
  title: '*Hypergrid Game* Supplier<br/>in India',
  desc: "India's trusted Hypergrid game supplier commercial-grade interactive LED floor systems, installed and serviced by our own team across 50+ cities.",
  buttonText: 'Get A Quote',
  buttonLink: 'https://wa.me/919157873576',
  mainImgUrl: hypergridSupplierCollage
};

const defaultHypergridBanner = {
  title: 'Interactive LED Floor Games *for High-<br/>Footfall Venues*',
  paragraph1: 'Winera International is a trusted Hypergrid game supplier in India, sourcing and installing commercial Hypergrid interactive LED floor systems for malls, family entertainment centres, hotels, schools, trampoline parks, and bowling alleys since 2014. Every Hypergrid unit we supply is sourced from established global manufacturers — configured specifically for sustained daily commercial use in high-footfall Indian venues.',
  paragraph2: 'As a direct Hypergrid business partner, our own team manages the complete process from space assessment and product configuration to installation, software setup, and after-sales support. One team, zero third-party contractors, from order to opening day.',
  imgUrl: hypergridBannerImg
};

const defaultHypergridSpecs = {
  bgUrl: hypergridSpecsBg,
  title: '*Technical* Specifications',
  rows: [
    { spec: "Players", details: "1 to 6 simultaneously" },
    { spec: "Game modes", details: "5+ repeatable modes" },
    { spec: "Attendant required", details: "No — fully self-operated" },
    { spec: "Minimum space required", details: "200 sq ft onwards" },
    { spec: "Expected lifespan", details: "8+ years — commercial grade" }
  ],
  buttonText: 'Download Our Brochure',
  buttonLink: '/pdf/Hyper Grid.pdf'
};

const defaultHypergridWhyUs = {
  bgUrl: hypergridWhyUsBg,
  title: '*What Makes Hypergrid* the Right<br/>Choice for Your Venue',
  subtitle: 'Every component in a Winera soft play structure is selected to perform reliably under heavy daily commercial use, not occasional play. Here is what goes into every build:',
  leftImgUrl: arImage,
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
};

const defaultHypergridRoi = {
  title: 'Is Hypergrid a Smart<br/>*Investment for Your Venue?*',
  paragraph1: "Most interactive LED floor game suppliers quote a unit price and leave the business decision entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before confirming any Hypergrid order, our team prepares a complete ROI report for your specific venue — covering equipment cost, projected daily sessions, estimated revenue per session, maintenance costs, and break-even timeline.",
  paragraph2: "Every figure is calculated around your venue type, daily footfall, and target visitor demographic — not an industry average. Very few Hypergrid game suppliers in India include this as a standard part of their process. For Winera, it is where every project starts.",
  buttonText: 'Talk to an ROI Expert',
  buttonLink: 'https://wa.me/919157873576',
  imgUrl: hypergridImage
};

const defaultHypergridWhyWineraItems = [
  {
    icon: 'award',
    title: "Commercial-Grade Equipment",
    desc: "Made To Run Every Day In Busy Places Without Breaking Down."
  },
  {
    icon: 'settings',
    title: "Customized For Your Venue",
    desc: "We Set Up The Games, Levels, And Branding To Fit Your Space."
  },
  {
    icon: 'coins',
    title: "ROI Planning Before You Invest",
    desc: "We Show You The Cost And Profit Before You Spend Any Money."
  },
  {
    icon: 'headphones',
    title: "Professional Installation",
    desc: "Our Own Team Comes And Sets Everything Up For You."
  },
  {
    icon: 'calendar',
    title: "Operator Training Included",
    desc: "We Train Your Staff So They're Ready Before You Open."
  },
  {
    icon: 'package',
    title: "Reliable After-Sales Support",
    desc: "We Fix, Update, And Service It Whenever You Need Help."
  }
];

const defaultHypergridWhyWinera = {
  title: 'Why Choose *Winera International*',
  items: defaultHypergridWhyWineraItems
};

const defaultHypergridFaqs = [
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
];

const defaultHypergridCta = {
  bgUrl: hypergridWineraLastblock,
  buttonLink: 'https://wa.me/919157873576'
};

const defaultHypergridSeo = {
  pageTitle: "Interactive LED Hypergrid Arena Manufacturer in India | Winera International",
  metaDescription: "Winera International is India's leading manufacturer of Interactive LED Hypergrid active gaming arenas, offering high-ROI illuminated floor tile systems and turnkey game zone setups."
};

const defaultLasertagHero = {
  breadcrumbText: "Laser Tag",
  bgUrl: laserTagHeroBg,
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Commercial Laser Tag Arena Equipment & Setup Mobile Banner - Winera"
};

const defaultLasertagIntro = {
  titleHighlight: "Laser Tag Gaming Equipment",
  titleNormal: "& Laser Spy Supplier in India",
  title: "*Laser Tag Gaming<br/>Equipment* & Laser Spy<br/>Supplier in India",
  desc: "Turn your venue into a place people book again and again. We set up complete laser tag and laser spy games for venues across India. arenas equipment, design, installation, and support handled by our own team across 50+ cities.",
  buttonText: "Get A Quote",
  buttonLink: "https://wa.me/919157873576",
  waMessage: "Hello Winera International! I want to get a quote for Laser Tag & Laser Spy Equipment setup. Please share details.",
  mainImgUrl: laserTagImg1
};

const defaultLasertagSetup = {
  titleNormal: "One Team for Your Whole Laser",
  titleHighlight: "Tag & Laser Spy Setup",
  title: "One Team for Your Whole<br/>Laser *Tag & Laser Spy Setup*",
  paragraph1: "Winera International has set up laser tag and laser spy games for entertainment centres, malls, hotels, schools, and resorts across India since 2014. Every setup comes with the full equipment, game software, scoreboards, and complete arena setup.",
  paragraph2: "Before you order anything, we check your space size, how many players you want, and how you plan to run it. Then our own team handles everything — design, setup, and staff training across 50+ cities in India.",
  mainImgUrl: laserTagImg2
};

const defaultLasertagGroups = {
  titleHighlight: "Laser Tag - ",
  titleNormal: "Great for Groups",
  desc: "Laser tag fills fast because groups book many players at once at birthday parties, office teams, and school outings. We supply the complete game and set it up fully, so you're ready to take bookings from day one.",
  listHeading: "What you get, fully set up:",
  features: [
    "Laser guns with lights and a small screen, and vests that show each hit right away",
    "Wireless charging, so you don't have to wait between games",
    "Home base points and power-ups that make the game more fun",
    "A TV to explain the rules, and a live score screen that makes players want to play again",
    "Full sound, game software, setup, and staff training all done by our team"
  ],
  mainImgUrl: laserTagImg3,
  bgUrl: laserTagBg3
};

const defaultLasertagSpecs = {
  titleHighlight: "Technical",
  titleNormal: "Specifications",
  title: "*Technical* Specifications",
  bgUrl: laserTagBg4,
  buttonText: "Download Our Brochure",
  buttonLink: "https://wa.me/919157873576",
  waMessage: "Hello Winera International! I want to download the Laser Tag Equipment & Setup Brochure. Please share details.",
  specHeading: "Specification",
  detailsHeading: "Details",
  rows: [
    { spec: "Players", details: "10 to 30+ simultaneously" },
    { spec: "Guns & vests", details: "Start with 8, add more anytime" },
    { spec: "Staff needed", details: "Just 1 person" },
    { spec: "Game types", details: "Team battle, solo, elimination, capture the flag" },
    { spec: "Lasts for", details: "8–10 years" }
  ]
};

const defaultLasertagSpySpecs = {
  titleHighlight: "Technical",
  titleNormal: "Specifications",
  title: "*Technical* Specifications",
  bgUrl: laserTagBg4,
  buttonText: "Download Our Brochure",
  buttonLink: "https://wa.me/919157873576",
  waMessage: "Hello Winera International! I want to download the Laser Spy Equipment & Setup Brochure. Please share details.",
  specHeading: "Specification",
  detailsHeading: "Details",
  rows: [
    { spec: "Smallest space", details: "150 sq ft" },
    { spec: "Best space", details: "Around 560 sq ft" },
    { spec: "Tasks", details: "3–4 team tasks + 1 main challenge" },
    { spec: "Staff needed", details: "Just 1 person" },
    { spec: "Scoreboard", details: "Automatic TV leaderboard" }
  ]
};

const defaultLasertagSpace = {
  titleHighlight: "How Much Space",
  titleNormal: "You Need for Laser Tag",
  desc: "A laser tag arena works from about 1,000 sq ft, but 2,500–5,000 sq ft is ideal; it gives players room to move, hide, and enjoy the game. Here's how the space is used:",
  mainImgUrl: laserTagImg5,
  zones: [
    {
      num: "01",
      title: "BRIEFING AREA",
      subtitle: "(EXPLAIN THE RULES)",
      space: "~150 sq ft",
      iconType: "rules"
    },
    {
      num: "02",
      title: "VESTING AREA",
      subtitle: "(PLAYERS GEAR UP)",
      space: "~250 sq ft",
      iconType: "vest"
    },
    {
      num: "03",
      title: "PLAY AREA",
      subtitle: "(COMBAT ZONE)",
      space: "7–8 sq ft / pl",
      iconType: "play"
    }
  ]
};

const defaultLasertagSpyFeatures = [
  "Laser guns with lights and a small screen, and vests that show each hit right away",
  "3 to 4 team games and one big final game",
  "A 40-inch TV that shows the top players",
  "Glowing lights, UV art, and smoke machines for a cool spy look",
  "Control panels, game software, sound system, and staff training — all by our team"
];

const defaultLasertagSpy = {
  titleDark: "Laser Spy — Laser ",
  titleCyan: "Beam Game That Fits in a Small Room",
  desc: "Laser spy is a room full of laser beams. Players have to move through them without touching any. People love it and come back again and again to beat their best score. And it fits in a small room, so you can add it even when you don't have much space. We supply and set up the full game, ready to play.",
  listHeading: "What you get, fully set up:",
  badgeText: "Small Space. Big Thrills.",
  mainImgUrl: laserTagImg6,
  borderImgUrl: laserTagImg6Bg,
  smallImgUrl: laserTagImg6Small,
  buttonImgUrl: laserTagImg6Btn,
  bgUrl: laserTagBg3,
  features: defaultLasertagSpyFeatures
};

const defaultLasertagComparison = {
  title: "*Which Game Is* Right for Your Venue?",
  features: [
    "How to play",
    "Space needed",
    "Players at once",
    "Best for",
    "Earns money from",
    "The feel"
  ],
  lasertagPoints: [
    { text: "Teams shoot each other with laser guns in an open arena" },
    { text: "A big open room" },
    { text: "10 to 30+" },
    { text: "Big groups, parties, and events" },
    { text: "Group bookings and parties" },
    { text: "Fast, active team battle" }
  ],
  laserspyPoints: [
    { text: "Players move through laser beams without touching them" },
    { text: "A small room (from 150 sq ft)" },
    { text: "A few at a time" },
    { text: "Quick play and small spaces" },
    { text: "Repeat play and walk-ins" },
    { text: "A cool spy-movie challenge" }
  ],
  note: "Not sure which fits your venue? Our team looks at your space and how you want to run it, then suggests the right game or both, if you have the room."
};

const defaultLasertagSeo = {
  pageTitle: "Laser Tag Equipment Supplier in India | Winera International",
  metaDescription: "Want to add laser tag or laser spy to your venue? Winera International handles the full setup, from arena design and gear to software and staff training."
};

const defaultProjectHero = {
  bannerImg: projectBanner,
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Commercial Game Zone Projects Portfolio Mobile Banner - Winera International",
  breadcrumbHome: 'Home',
  breadcrumbPage: 'Project'
};
const defaultProjectItemsList = [];


const defaultProjectBlock = {
  strokeImg: yellowStrokeLine,
  titleLine1: 'FifthAlley Sport Bowling: A',
  titleLine2: 'Complete ',
  titleLine2Black: 'Bowling Alley Setup',
  titleLine3: 'in the Heart of Surat',
  description: 'How we designed and installed a professional-grade bowling alley across 3,000 sq. ft., transforming an empty space in Katargam into a destination entertainment venue in Surat.',
  buttonText: 'Get A Quote',
  buttonLink: 'https://wa.me/919157873576',
  image: '/assets/FifthAlley-Sport-Bowling/fifthalley-sport-bowling.jpg'
};

const defaultProjectBasicInfo = {
  bgImg: '/assets/FifthAlley-Sport-Bowling/basic-information.jpg',
  yellowTitle: 'Basic ',
  whiteTitle: 'Information',
  rows: [
    { label: 'Project Name', val: 'FifthAlley Sport Bowling' },
    { label: 'Project Type', val: 'Bowling Alley Setup' },
    { label: 'Location', val: 'Surat, Gujarat' },
    { label: 'Total Area', val: '3,000 sq. ft.' }
  ]
};

const defaultProjectClientWanted = {
  titlePrefix: 'What the ',
  titleCyan: 'Client Wanted',
  paragraph1: 'The client had an empty 3,000 sq. ft. space in Katargam and a clear goal: to open a professional bowling venue.',
  paragraph2: "They didn't want a supplier who only supplied the equipment. They wanted one partner to handle everything, plan the space, install the lanes, and hand over a venue that was ready for opening day. In short, they needed one team they could trust from start to finish.",
  image: '/assets/FifthAlley-Sport-Bowling/what-the-client-wanted.jpg'
};

const defaultProjectSolution = {
  titleCyan: 'What Solution ',
  titleSuffix: 'We Provide',
  paragraph1: 'We delivered FifthAlley Sport Bowling as a complete, ready-to-open venue. Across the 3,000 sq. ft. space in Katargam, we planned the layout so the professional lanes had enough room around them for people to walk, sit, and relax.',
  paragraph2: 'The result is a venue that is fun to play in and comfortable to spend time in — just like a good family entertainment center should feel.',
  image: '/assets/FifthAlley-Sport-Bowling/what-solution-we-provide.jpg'
};

const defaultProjectGallery = {
  titleCyan: 'Project ',
  titleDark: 'Gallery',
  bgImg: projectImagesBg,
  images: [
    "/assets/FifthAlley-Sport-Bowling/gallery-1.jpg",
    "/assets/FifthAlley-Sport-Bowling/gallery-2.webp",
    "/assets/FifthAlley-Sport-Bowling/gallery-3.jpg",
    "/assets/FifthAlley-Sport-Bowling/gallery-4.jpg",
    "/assets/FifthAlley-Sport-Bowling/gallery-5.webp",
    "/assets/FifthAlley-Sport-Bowling/gallery-6.webp"
  ]
};

const defaultProjectVideo = {
  image: projectSectionVideo,
  videoUrl: 'https://wa.me/919157873576'
};

const defaultProjectSeo = {
  title: 'Our Projects | Turnkey Game Zone & Entertainment Venues by Winera International',
  description: 'Explore turnkey bowling alley and entertainment venue setup projects by Winera International.'
};

const defaultBlogHero = {
  breadcrumbText: "Blog",
  bgUrl: blogHeroBg,
  bgAlt: "Winera International Game Zone & Entertainment Industry Blog",
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Winera International Game Zone & Entertainment Industry Blog Mobile Banner"
};

const defaultBlogPosts = [];

const defaultBlogSeo = {
  pageTitle: "Blog | Winera International – Game Zone Insights & Tips",
  metaDescription: "Read the Winera International blog for expert insights on game zone setup, ROI tips, soft play trends, VR gaming, trampoline parks, and indoor amusement equipment."
};

const defaultRoiHero = {
  breadcrumbPage: "ROI",
  bgUrl: roiBgImage,
  bgAlt: "FEC & Game Zone ROI Calculator - Winera International",
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "FEC & Game Zone ROI Calculator Mobile Banner - Winera International"
};

const defaultRoiIntro = {
  tagline: "Return on Investment (ROI)",
  titleLine1: "You don't need a game zone…",
  titleLine2: "you need a",
  titleLine2Blue: "profit machine.",
  paragraph1: "Anyone can fill a room with arcade machines. Very few build a game zone that pays back your investment and keeps printing profit month after month.",
  paragraph2: "Most game zone owners lose money in year one — not because gaming is dead, but because the setup, game mix, and management were wrong from day one.",
  buttonText: "Book Your Free ROI Consultation",
  buttonLink: "https://wa.me/919157873576",
  image: roiImg1
};

const defaultRoiMatters = {
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
};

const defaultRoiComparison = {
  title: "Why most game zones fail vs. why ours profit",
  subCaption: "The difference isn't the games. It's the system behind them.",
  wrongItems: [
    { num: "01", text: "Random game selection", offset: "0px" },
    { num: "02", text: "No space planning", offset: "45px" },
    { num: "03", text: "Buy machines, then figure it out", offset: "95px" },
    { num: "04", text: "No pricing strategy", offset: "95px" },
    { num: "05", text: "Owner manages everything manually", offset: "45px" },
    { num: "06", text: "Guessing monthly income", offset: "0px" }
  ],
  rightItems: [
    { num: "01", text: "Data-backed game mix (high footfall + high margin)", offset: "0px" },
    { num: "02", text: "Optimized layout for max games per sq. ft.", offset: "45px" },
    { num: "03", text: "ROI modeled before you spend a rupee", offset: "95px" },
    { num: "04", text: "Dynamic pricing + package systems", offset: "95px" },
    { num: "05", text: "Full management + POS + reporting system", offset: "45px" },
    { num: "06", text: "Predictable, tracked revenue", offset: "0px" }
  ]
};

const defaultRoiProcess = {
  title: "From empty space to profit we handle everything",
  cards: [
    { title: "Location & Feasibility", desc: "We analyze your space and market and then project your ROI.", img: roiBlock5Img1 },
    { title: "Design & Layout", desc: "Maximum games, best flow, optimized experience per sq. ft.", img: roiBlock5Img2 },
    { title: "Game Selection", desc: "The right mix of high-demand + high-margin games.", img: roiBlock5Img3 },
    { title: "Setup & Installation", desc: "You don't have to touch a single wire.", img: roiBlock5Img4 },
    { title: "Management System", desc: "POS, pricing, staff training, reporting, and maintenance.", img: roiBlock5Img5 },
    { title: "Ongoing Growth", desc: "We help you scale revenue, not just open doors.", img: roiBlock5Img6 }
  ]
};

const defaultRoiGet = {
  title: "What you get with Winera International",
  subtitle: "Three things that turn your investment into predictable, growing profit.",
  badgeText: "Built for Profit.",
  image: roiBlock6,
  steps: [
    { title: "Predictable ROI", desc: "Know your returns before you invest." },
    { title: "Zero Guesswork", desc: "We handle setup + management end-to-end." },
    { title: "Ongoing Profit", desc: "Systems that keep revenue growing." }
  ]
};

const defaultRoiChecklist = {
  title: "This is for you if",
  bgImage: roiBlock7Bg,
  fitPill: "You're a fit",
  unfitPill: "You're not a fit",
  fitItems: [
    "You want to invest ₹XX Lakh+ in a proven, growing business",
    "You want returns backed by data, not hope",
    "You'd rather have experts build it than learn by losing money",
    "You want a zone that runs as a system, not a headache"
  ],
  unfitItems: [
    "You want the cheapest possible setup without care for quality",
    "You're looking for overnight shortcuts",
    "You're not serious about long term ROI",
    "You expect profit without a proper system"
  ]
};

const defaultRoiCta = {
  yellowText: "Ready To",
  whiteText: "See Your",
  cyanText: "Numbers?",
  subtitle: "Book A Free Consultation With Winera International. We'll Walk You Through The ROI Projection For Your Space, Your Budget, And Your City — Before You Spend Anything.",
  buttonText: "Book Your Free ROI Call",
  buttonLink: "https://wa.me/919157873576",
  bgUrl: homeBlockBg
};

const defaultRoiSeo = {
  pageTitle: "Know Your Game Zone ROI Before You Invest | Winera International",
  metaDescription: "Opening a game zone is easy, making it profitable is a system. Winera International models your ROI around your space and budget before you invest a rupee."
};

const defaultSafetyHero = {
  bgUrl: safetyBg,
  breadcrumbText: 'Safety Standards',
  bgAlt: 'Safety Standards & Quality Certification - Winera',
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: 'Safety Standards & Quality Certification Mobile Banner - Winera'
};

const defaultSafetyIntro = {
  titleLine1: 'Game Zone & Kids Play',
  titleLine2: 'Equipment Safety Standards',
  p1: 'When you invest in a game zone or family entertainment center, the safety of your equipment protects your visitors, your reputation, and your investment. At Winera International, product safety and quality is our highest priority. Every product we supply — from arcade games to trampoline parks and climbing walls is certified to international safety standards for commercial, high-footfall use, and every venue is installed by our own trained team and inspected on-site before handover.',
  p2: "As a complete game zone developer, our safety commitment covers four areas: the attractions themselves, the materials they're made of, the electrical systems that power them, and the structure and operation of the finished venue.",
  mainImgUrl: safetyStandardImg1
};

const defaultSafetyCertificationsCards = [
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
    desc: "EN 13814 and ISO 17842 are the international standards for amusement rides and devices, developed by CEN and ISO. They set safety requirements for the design, manufacturing, and operation of rides. Winera International supplies bumper cars and amusement park attractions that comply with these standards — ensuring safe, reliable operation in high-footfall venues."
  }
];

const defaultSafetyCertifications = {
  title1: "Play & Attraction",
  title2: "Equipment Safety",
  subtitle: "These standards make sure every attraction people play on is safe by design.",
  cards: defaultSafetyCertificationsCards
};

const defaultSafetyMaterialsCards = [
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
];

const defaultSafetyMaterials = {
  title1: "Material &",
  title2: "Fire Safety",
  subtitle: "These standards make sure everything is made from safe materials that don't catch fire easily and are not harmful to touch which is also a legal rule for game zones in India.",
  bgUrl: safetyStandardBg2,
  imgUrl: safetyStandard2,
  cards: defaultSafetyMaterialsCards
};

const defaultSafetyElectricalItems = [
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
];

const defaultSafetyElectrical = {
  title1: "Electrical &",
  title2: "Machine Safety",
  subtitle: "These rules make sure all machines that run on electricity are safe to use — like arcade games, VR, laser tag, bumper cars, hypergrid, bowling, and rides.",
  imgUrl: safetyStandardImg3,
  items: defaultSafetyElectricalItems
};

const defaultSafetyStructureCards = [
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
];

const defaultSafetyStructure = {
  title1: "Structure, Installation &",
  title2: "Operational Safety",
  subtitle: "These standards make sure the finished venue is strong, set up correctly, and safe to run every day — and ready to pass the local safety check needed for a licence.",
  cards: defaultSafetyStructureCards
};

const defaultSafetyWhyMatters = {
  title1: "Why This Matters",
  title2: "for Your Business",
  subtitle: "Good, certified equipment is a smart investment. It keeps visitors safe, protects your money, and helps you get your licence easier. In India, every game zone must pass checks for strong structure, fire safety, and electrical safety before it can open. Because we supply you certified equipment, fire-safe materials, and proper installation, your game zone is ready to pass these checks. The result: you open on time, stay within the rules, and win the trust of every family.",
  ctaTitle: "Need Any Consultations?",
  ctaSubtitle: "We're Ready To Give Answers To Your Questions.",
  buttonText: "Talk to an Expert",
  buttonLink: "https://wa.me/919157873576"
};

const defaultSafetySeo = {
  pageTitle: "Where Game Zone Safety Comes First | Winera International",
  metaDescription: "Safety comes first at Winera International. Every ride, play structure, and machine we install meets global safety standards, so your venue opens ready to run."
};

const defaultContactHero = {
  breadcrumbHome: "Home",
  breadcrumbText: "Contact Us",
  bgUrl: contactUsHeroBg,
  bgAlt: "Contact Winera International - Commercial Game Zone Setup & Turnkey Solutions",
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Contact Winera International Mobile Banner - Commercial Game Zone Setup & Turnkey Solutions"
};

const defaultPrivacyHero = {
  title: "Privacy *Policy*",
  breadcrumbHome: "Home",
  breadcrumbText: "Privacy Policy",
  bgUrl: aboutHeroBg,
  bgAlt: "Privacy Policy - Winera International",
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Privacy Policy Mobile Banner - Winera International"
};

const defaultTermsHero = {
  title: "Terms & *Conditions*",
  breadcrumbHome: "Home",
  breadcrumbText: "Terms & Conditions",
  bgUrl: aboutHeroBg,
  bgAlt: "Terms & Conditions - Winera International",
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Terms & Conditions Mobile Banner - Winera International"
};

const defaultPrivacySections = [
  {
    number: "1",
    title: "Introduction",
    content: [
      "Winera International Pvt. Ltd. ('Winera', 'Company', 'we', 'our', or 'us') is committed to protecting your personal and business information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.winera.in, interact with us online, or use our services. By using our website, you consent to the practices described in this policy."
    ]
  },
  {
    number: "2",
    title: "Information We Collect",
    subtitle: "We collect the following types of information:",
    bullets: [
      { label: "Personal Information", text: "Your name, email address, phone number, business name, designation, and other contact details." },
      { label: "Business Information", text: "Project details, site drawings, requirements, order history." },
      { label: "Technical Data", text: "IP address, browser type, device information, operating system, referring URLs, date/time stamps." },
      { label: "Cookies and Usage Data", text: "We use cookies to collect anonymous usage statistics and user behavior data." }
    ]
  },
  {
    number: "3",
    title: "How We Use Your Information",
    subtitle: "We use your information for purposes including:",
    bulletsText: [
      "Responding to inquiries and sending quotes",
      "Processing and managing your orders",
      "Delivering customer service and support",
      "Improving our website and services",
      "Sending transactional and promotional communications (with your consent)",
      "Legal compliance and dispute resolution"
    ]
  },
  {
    number: "4",
    title: "Legal Basis for Processing",
    subtitle: "We process your data based on:",
    bulletsText: [
      "Your consent",
      "The necessity to perform a contract",
      "Our legal obligations",
      "Legitimate business interests"
    ]
  },
  {
    number: "5",
    title: "Sharing and Disclosure of Information",
    subtitle: "We do not sell your data. We may share information with:",
    bulletsText: [
      "Internal teams for project fulfillment",
      "Logistics providers for delivery",
      "IT and analytics partners (e.g., Google Analytics)",
      "Legal or regulatory authorities when required"
    ]
  },
  {
    number: "6",
    title: "Data Retention",
    content: [
      "We retain your personal and business data only for as long as necessary to fulfill the purposes outlined in this policy. This includes compliance with legal obligations, resolving disputes, and enforcing agreements."
    ]
  },
  {
    number: "7",
    title: "Your Data Rights",
    subtitle: "You have the right to:",
    bulletsText: [
      "Access and review your data",
      "Correct or update inaccurate information",
      "Withdraw consent at any time",
      "Request data deletion, subject to legal limits",
      "Object to processing or request data portability"
    ]
  },
  {
    number: "8",
    title: "Security of Your Data",
    content: [
      "We implement appropriate technical and organizational measures to safeguard your data. This includes secure servers, firewalls, encryption, and access controls. While we strive for security, no method is fully secure."
    ]
  },
  {
    number: "9",
    title: "Cookies and Tracking",
    content: [
      "We use cookies to understand user behavior and improve site performance. You can manage your cookie preferences in your browser settings. Blocking cookies may impact your experience."
    ]
  },
  {
    number: "10",
    title: "Third-Party Links",
    content: [
      "Our website may contain links to other websites. We are not responsible for their privacy practices or content. Please review their policies before interacting with them."
    ]
  },
  {
    number: "11",
    title: "Children’s Privacy",
    content: [
      "Our services are intended for individuals 18 years and older. We do not knowingly collect data from children. If you believe we have inadvertently collected such data, contact us for deletion."
    ]
  },
  {
    number: "12",
    title: "International Data Transfers",
    content: [
      "If you are accessing our website from outside India, you consent to the transfer and processing of your data in accordance with Indian law."
    ]
  },
  {
    number: "13",
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. The latest version will be posted on this page. Continued use of our website means you accept the updated terms."
    ]
  },
  {
    number: "14",
    title: "Contact Information",
    subtitle: "For any questions or concerns, contact us at:",
    content: [
      "Winera International Pvt. Ltd.",
      "1011, 10th floor, Millennium Business Hub, opp. Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat-395006, India"
    ],
    bulletsText: [
      "Email: info@winera.in",
      "Phone: +91 91578 73576 / +91 95123 56766"
    ]
  }
];

const defaultTermsSections = [
  {
    number: "1",
    title: "About Winera International Pvt. Ltd.",
    intro: "Winera International Pvt. Ltd., incorporated under the Companies Act, 1956, with registered office at 1011, 10th floor, Millennium Business Hub, opp., Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat 395006, India, is a leading B2B turnkey entertainment solutions provider. Our services include:",
    bulletsText: [
      "Indoor soft play zones",
      "Trampoline parks and ninja courses",
      "Arcade and video game machine installations",
      "VR/AR entertainment zones",
      "Bowling alleys, bumper cars, laser tag setups",
      "Customized commercial play and recreation areas"
    ]
  },
  {
    number: "2",
    title: "Scope of Agreement",
    content: [
      "These Terms apply to all interactions, transactions, proposals, quotations, and contracts made through the Site or directly with the Company. These Terms do not override signed project-specific contracts; however, in case of conflict, the mutually signed agreement shall take precedence."
    ]
  },
  {
    number: "3",
    title: "Use of the Website",
    bulletsText: [
      "You agree to access this Site lawfully and only for legitimate business purposes.",
      "Unauthorized use of this Site may give rise to claims for damages and/or be a criminal offense.",
      "You may not attempt to gain unauthorized access to our systems or data, use this Site to copy, store, transmit, or distribute malicious software, or scrape, crawl, or collect user data without permission."
    ]
  },
  {
    number: "4",
    title: "Quotations, Proposals & Pricing",
    bulletsText: [
      "All quotations are non-binding until confirmed through a signed purchase/work order.",
      "Quotes are valid for 30 days unless otherwise stated in writing.",
      "All pricing is in Indian Rupees (INR) and exclusive of applicable taxes, duties, and levies.",
      "Price revisions may occur due to changes in raw material costs, design alterations, or import duties."
    ]
  },
  {
    number: "5",
    title: "Project Process & Order Confirmation",
    intro: "Projects commence only after receiving signed approval on quotation/design/BOQ and advance payment as per agreed terms.",
    bulletsText: [
      "The project is broken into phases: Design → Production → Dispatch → Installation → Handover.",
      "Project-specific responsibilities (like flooring, lighting, or electrical setup) must be completed by the client before installation begins."
    ]
  },
  {
    number: "6",
    title: "Payment Terms",
    intro: "Unless otherwise specified, standard payment milestones are:",
    bulletsText: [
      "50% of the total project value is payable in advance.",
      "40% before shipment or dispatch from factory.",
      "10% upon final handover and acceptance.",
      "No shipment or site work will begin without receipt of due payments.",
      "Delay in payment will lead to additional storage, demurrage, or interest charges (typically 1.5% per month).",
      "Payments must be made to official bank accounts listed on company invoices."
    ]
  },
  {
    number: "7",
    title: "Delivery & Logistics",
    bulletsText: [
      "Delivery timelines are indicative and commence only after design approval and advance receipt.",
      "Unexpected delays (strikes, customs clearance, shipping issues, etc.) will be communicated but shall not be grounds for penalty unless otherwise agreed.",
      "Risk of goods passes to the client upon dispatch from our warehouse.",
      "Insurance, if required, must be arranged by the client or requested in writing."
    ]
  },
  {
    number: "8",
    title: "Installation & Site Readiness",
    intro: "Winera provides installation services as part of turnkey projects.",
    bulletsText: [
      "Client responsibilities: Ensure access to the site during business hours, provide civil-ready conditions (flooring, walls, electric points, etc.), and provide accommodation or local logistics for installation crew in remote locations (as per mutual agreement).",
      "Any re-visits or delays due to client-side unpreparedness will be chargeable."
    ]
  },
  {
    number: "9",
    title: "Warranty & Maintenance",
    intro: "A standard 12-month manufacturer’s warranty is provided from date of installation.",
    bullets: [
      { label: "Coverage includes", text: "Structural integrity, weld failures, and manufacturing defects in supplied components." },
      { label: "Exclusions include", text: "Misuse, vandalism, natural disasters, water/fire/electrical damage, third-party installations or repairs, and consumables / wear-and-tear parts (nets, ropes, foam padding, etc.)." },
      { label: "AMC", text: "Post-warranty AMC (Annual Maintenance Contract) is available for a fee." }
    ]
  },
  {
    number: "10",
    title: "Design, Drawing & Intellectual Property",
    bulletsText: [
      "All designs, layouts, 3D renders, and proposals remain the intellectual property of Winera unless transferred by written agreement.",
      "No reuse, reproduction, or sharing is permitted without our written consent.",
      "Breach of this clause may result in legal action and claims for damages."
    ]
  },
  {
    number: "11",
    title: "Modifications & Customization",
    bulletsText: [
      "Clients may request minor customizations post-design approval; these will be accommodated if feasible.",
      "Major changes post-approval may involve additional cost and timeline revisions.",
      "Requests must be made in writing and approved by both parties."
    ]
  },
  {
    number: "12",
    title: "Cancellation & Refund Policy",
    bulletsText: [
      "Cancellation before production begins will attract a minimum 10% administrative fee.",
      "Once manufacturing or procurement has commenced, no refund will be issued.",
      "Refunds (where applicable) will be processed within 30 working days after due verification."
    ]
  },
  {
    number: "13",
    title: "Limitation of Liability",
    intro: "Winera shall not be liable for indirect or consequential losses, loss of business, revenue, or reputation, or delays due to force majeure or third-party vendors.",
    content: [
      "Maximum liability is capped at the total value of the product/service provided in the dispute."
    ]
  },
  {
    number: "14",
    title: "Subcontractors & Third Parties",
    content: [
      "We may use subcontractors or third-party service providers for part of the project (e.g., transport, electrical work). While we take care in selection, Winera is not liable for direct performance of subcontractors unless contractually stated."
    ]
  },
  {
    number: "15",
    title: "Confidentiality & Data Protection",
    bulletsText: [
      "All discussions, documents, drawings, client lists, and pricing details shared between Winera and the client are confidential.",
      "Each party agrees to use such data only for the intended project and not disclose to third parties without consent.",
      "Winera maintains strict cybersecurity and GDPR-compliant (where applicable) data handling protocols."
    ]
  },
  {
    number: "16",
    title: "Force Majeure",
    content: [
      "Winera shall not be liable for failure or delay in performance due to causes beyond its reasonable control, including but not limited to acts of God, war, fire, pandemics, strikes, shipping delays, embargoes, or government orders."
    ]
  },
  {
    number: "17",
    title: "Termination",
    subtitle: "Winera reserves the right to terminate any contract if:",
    bulletsText: [
      "The client breaches material terms of the agreement.",
      "Payments are withheld or delayed beyond agreed terms.",
      "The client is found engaging in fraudulent, unethical, or harmful business practices."
    ]
  },
  {
    number: "18",
    title: "Governing Law & Jurisdiction",
    bulletsText: [
      "These Terms shall be governed by and construed in accordance with the laws of the Republic of India.",
      "Any disputes or legal claims shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat."
    ]
  },
  {
    number: "19",
    title: "Revisions and Updates",
    content: [
      "These Terms may be updated periodically to reflect changes in law or business operations. Continued use of the Site or Services after updates will constitute acceptance of the revised Terms."
    ]
  },
  {
    number: "20",
    title: "Contact Us",
    content: [
      "Winera International Pvt. Ltd.",
      "📍 1011, 10th floor, Millennium Business Hub, opp., Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat-395006, India"
    ],
    bulletsText: [
      "Email: info@winera.in",
      "Phone: +91 91578 73576 / +91 95123 56766",
      "Website: www.winera.in"
    ]
  }
];

const defaultHeaderNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/why-us' },
  { label: 'Project', href: '/project' },
  { label: 'Contact Us', href: '/contact' }
];

const defaultHeaderProductSubMenu = [
  { label: 'Arcade Games', href: '/product/arcade-games' },
  { label: 'VR Games', href: '/product/vr-games' },
  { label: 'AR Games', href: '/product/ar-games' },
  { label: 'Bowling Alley', href: '/product/bowling-alley' },
  { label: 'Trampoline Park', href: '/product/trampoline-park' },
  { label: 'Soft Play', href: '/product/soft-play' },
  { label: 'Bumper Car', href: '/product/bumper-car' },
  { label: 'Hypergrid', href: '/product/hypergrid' },
  { label: 'Amusement Park', href: '/product/amusement-park' },
  { label: 'Laser Tag', href: '/product/laser-tag' }
];

const defaultHeaderResourcesSubMenu = [
  { label: 'Blog', href: '/blog' },
  { label: 'ROI', href: '/resource/roi' },
  { label: 'Safety Standards', href: '/resource/safety-standards' }
];

const defaultHeaderData = {
  logoUrl: wineraLogo,
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
  twitterUrl: 'https://x.com',
  whatsappUrl: 'https://wa.me/919157873576',
  navLinks: defaultHeaderNavLinks,
  productSubMenu: defaultHeaderProductSubMenu,
  resourcesSubMenu: defaultHeaderResourcesSubMenu,
  ctaText: 'Free Consultation',
  ctaLink: 'https://wa.me/919157873576'
};

const defaultFooterProductLinks = [
  { name: "Arcade Games", link: "/product/arcade-games" },
  { name: "Bowling Alley", link: "/product/bowling-alley" },
  { name: "Soft Play", link: "/product/soft-play" },
  { name: "Trampoline Park", link: "/product/trampoline-park" },
  { name: "VR Games", link: "/product/vr-games" },
  { name: "AR Games", link: "/product/ar-games" },
  { name: "Bumper Car", link: "/product/bumper-car" },
  { name: "Amusement Park", link: "/product/amusement-park" },
  { name: "Hypergrid", link: "/product/hypergrid" },
  { name: "Laser Tag", link: "/product/laser-tag" }
];

const defaultFooterQuickLinks = [
  { name: "About Us", link: "/why-us" },
  { name: "Contact Us", link: "/contact" },
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Terms & Conditions", link: "/terms-and-conditions" }
];

const defaultFooterResourceLinks = [
  { name: "Blog", link: "/blog" },
  { name: "Project", link: "/project" },
  { name: "ROI", link: "/resource/roi" },
  { name: "Safety Standards", link: "/resource/safety-standards" }
];

const defaultFooterData = {
  logoUrl: wineraLogo,
  tagline: "Winera is a professional solution provider and builder specializing in indoor amusement parks and playground equipment.",
  productLinks: defaultFooterProductLinks,
  quickLinks: defaultFooterQuickLinks,
  resourceLinks: defaultFooterResourceLinks,
  phone1: "+91 91578 73576",
  phone2: "+91 95123 56766",
  email: "info@winera.in",
  copyright: "© 2026 Winera International Pvt. Ltd. All Rights Reserved."
};

const defaultTrampolineHero = {
  bgUrl: trampolineParkBg,
  bgAlt: 'Commercial Trampoline Park Manufacturer & Setup - Winera International',
  mobileBgUrl: trampolineMobileHeroBg,
  mobileBgAlt: 'Commercial Trampoline Park Mobile Banner - Winera International',
  breadcrumbText: 'Trampoline Park'
};

const defaultTrampolineIntro = {
  title: 'Trampoline Park *Manufacturer in India*',
  desc: "India's trusted trampoline park manufacturer safety-certified equipment, custom-designed layouts, and installed by our own team across India.",
  buttonText: 'Get Quote From Expert',
  buttonLink: 'https://wa.me/919157873576',
  waMessage: 'Hello Winera International! I want to get a quote and design details for a Trampoline Park setup. Please share details. [Ref: Trampoline Park Page]',
  mainImgUrl: trampolineParkImg1
};

const defaultTrampolineCustom = {
  title1: 'Custom Trampoline Parks',
  title2: 'by Winera',
  title3: 'International',
  paragraph: "At Winera International, we specialize in creating custom-built trampoline parks tailored to your space, budget, and activity preferences. As a leading trampoline manufacturer in India we ensure top-quality design, safety, and durability in every project. Whether you're envisioning a compact jump zone or a large-scale interactive entertainment center, we are the trampoline park manufacturer that delivers complete turnkey solutions to bring your vision to life. We have been designing and supplying commercial trampoline parks for malls, hotels, schools, resorts, and family entertainment centres since 2014.",
  imgUrl: trampolineParkImg2
};

const defaultTrampolineSpecs = {
  title: '*Technical* Specifications',
  bgUrl: trampolineImg3,
  imgUrl: trampolineImg3,
  buttonText: 'Download Our Brochure',
  buttonLink: '/pdf/Trampoline Catalogue.pdf',
  specsData: [
    { label: "Minimum space required", value: "2,000 sq ft" },
    { label: "Ceiling height required", value: "4.5 m minimum" },
    { label: "Weight capacity", value: "150 kg per mat" },
    { label: "Frame", value: "Hot-dip galvanized steel" },
    { label: "Jump mats", value: "UV-stabilized polypropylene mesh" },
    { label: "Springs", value: "Zinc-coated carbon steel" },
    { label: "Expected lifespan", value: "8–12 years" }
  ]
};

const defaultTrampolineInside = {
  title: '*What is inside a* custom<br />trampoline park?',
  subtitle: 'A Winera trampoline park is built around your available space and visitor profile. Below are the zones you can include each can be combined in any configuration based on your floor area and budget.',
  zones: [
    {
      id: "free-jump",
      name: "Free Jump Zones",
      title: "Free Jump Zones",
      desc: "Free jump zones are open trampoline areas where visitors of all ages jump freely without restrictions. They are the primary attraction of any trampoline park — simple to supervise, high throughput, and effective at keeping visitors active throughout their session. Suitable for all age groups from 3 years upward.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386747/winera_trampoline_park/yknrmsmvy1aacscicymv.jpg"
    },
    {
      id: "dunk-hoops",
      name: "Dunk Hoops",
      title: "Dunk Hoops",
      desc: "Dunk hoops are basketball hoops mounted above trampolines so visitors can jump and slam-dunk — something impossible at standard court height. A consistently popular zone with teenagers and young adults that extends session time. Low maintenance and easy to integrate into any free jump area.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386746/winera_trampoline_park/u0hyusapnoejpkit0xho.webp"
    },
    {
      id: "zip-line",
      name: "Zip Line",
      title: "Zip Line",
      desc: "An indoor zip line where visitors glide from an elevated platform to a foam landing pit. The zip line is an aerial experience that most standard trampoline parks do not include, making it a strong differentiator for venues wanting a premium attraction mix. Suitable for visitors aged 6 and above.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386748/winera_trampoline_park/o0pgd5vemckew8ki1xxo.jpg"
    },
    {
      id: "obstacle-courts",
      name: "Obstacle Courts",
      title: "Obstacle Courts",
      desc: "Obstacle courts are connected physical challenge courses built across trampoline surfaces jumping, dodging, climbing, and balancing in a single run. They work particularly well for school group bookings, birthday parties, and corporate team events, where structured activity rather than open jumping is preferred.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386748/winera_trampoline_park/ridg0hj2y1xy6vwgyrsj.webp"
    },
    {
      id: "air-bags",
      name: "Air Bags",
      title: "Air Bags",
      desc: "Large soft inflatable bags where visitors land after jumping from a height. Safe and exciting visitors can try flips and aerial jumps without worrying about hard landings. Very popular with teenagers.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386744/winera_trampoline_park/udv5wncmkw7oav7berkx.webp"
    },
    {
      id: "climbing-wall",
      name: "Climbing Wall",
      title: "Climbing Wall",
      desc: "Indoor climbing walls where visitors use fixed grips to climb to the top. Winera International is a trusted Climbing Wall Manufacturer in India — offering options from beginner-friendly bouldering walls to more challenging rope climb routes, suitable for all ages and fitness levels.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386745/winera_trampoline_park/wgd3f1fult5ojkvwpuy5.jpg"
    },
    {
      id: "ninja-courses",
      name: "Ninja Courses",
      title: "Ninja Courses",
      desc: "A set of physical obstacles warped walls, balance beams, hanging bars, rope bridges, and timed speed courses. Winera International is a leading Ninja Course Equipment Manufacturer in India, designing courses for ages 6 and above. Visitors come back again and again to beat their own time and improve their skills.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386750/winera_trampoline_park/cle2bmqr4wyb7b4ancgt.webp"
    },
    {
      id: "foam-cubes",
      name: "Foam Cubes",
      title: "Foam Cubes",
      desc: "A large pit filled with soft foam cubes where visitors jump in and land safely. One of the most popular attractions is that children especially love it and tend to spend more time here than any other zone.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386749/winera_trampoline_park/goz913jmxtrozb7ha3tx.webp"
    }
  ]
};

const defaultTrampolineRoi = {
  title: 'What Will Your *Trampoline<br />Park Actually Earn?*',
  subtitle: 'Most trampoline park suppliers in India send a price list and wait for you to decide.',
  paragraph1: "As India's ROI-First Game Zone Developer, Winera International works differently. Before a single design is drawn, our team prepares a complete ROI report for your specific venue covering your exact trampoline park setup cost, projected daily footfall, estimated monthly revenue, maintenance costs, and break-even timeline. Every figure is calculated around your location, your venue type, and your visitor profile, not an industry average.",
  paragraph2: "Very few indoor trampoline park suppliers in India include this as a standard part of their process. For Winera, the ROI report is not an add-on, it is how every project starts.",
  buttonText: 'Talk to an ROI Expert',
  buttonLink: 'https://wa.me/919157873576',
  waMessage: 'Hello Winera International! I want to talk to an ROI Expert for Trampoline Park setup & commercial ROI calculation. Please share details. [Ref: Trampoline Park Page]',
  imgUrl: tampolineImage6
};

const defaultTrampolineWhyChoose = {
  title: 'Why Choose *Winera International*',
  items: [
    { title: "Premium Quality", desc: "Commercial-Grade Materials Built To Survive Years Of Heavy Daily Jumping." },
    { title: "Safety First", desc: "Foam-Padded Frames, Safety Nets, And Certified Equipment On Every Build." },
    { title: "Custom Solutions", desc: "Layouts And Zone Mixes Designed Around Your Space, Budget, And Visitors." },
    { title: "Competitive Pricing", desc: "Factory-Direct Pricing With No Distributor Markup, Plus A Free ROI Report." },
    { title: "Prompt Delivery", desc: "Manufactured In-House And Installed On Schedule By Our Own Team." }
  ]
};

const defaultTrampolineFaqs = [
  {
    q: "Why does Winera International stand out as the best trampoline park manufacturer in India?",
    a: "Winera International manufactures every trampoline park in-house, offers a free ROI report before every project, and installs across 50+ cities through our own team, not a third-party contractor. One partner, from 3D design to after-sales support."
  },
  {
    q: "What is the trampoline park setup cost in India?",
    a: "Trampoline park setup cost in India depends on the facility size, number of attractions, and materials selected. Winera provides a complete cost breakdown — equipment, installation, and maintenance — before confirming any project. Contact our team for a quote specific to your space."
  },
  {
    q: "Is a trampoline park a profitable business in India?",
    a: "Yes, when located in a suitable venue with the right zone mix and pricing model. Trampoline parks generate revenue through entry fees, birthday party packages, school group bookings, corporate events, and membership plans. Winera prepares a free ROI report before every project showing your specific venue's projected daily capacity, estimated monthly revenue, and break-even timeline."
  },
  {
    q: "What licenses or permissions are required to open a trampoline park in India?",
    a: "Requirements vary by state and municipality but typically include a trade license, fire safety NOC, building use permission, and public liability insurance. Winera's team can guide you on general requirements based on your city and consult a local legal advisor for state-specific compliance."
  },
  {
    q: "What maintenance does a commercial trampoline park require?",
    a: "Winera trampoline parks are designed for 8–12 years of commercial operation with regular maintenance. Routine checks include: jump mat tension and condition, spring integrity, foam padding wear, safety net inspection, and frame connection points. A standard maintenance schedule and checklist is provided with every installation. Annual professional servicing is recommended."
  },
  {
    q: "What is the ideal target audience for a trampoline park in India?",
    a: "Children aged 5–15 years form the core audience, but modern trampoline parks increasingly serve teenagers, young adults, and corporate groups through ninja courses, dodgeball arenas, and team-building packages — making them viable for a much wider demographic than traditional play zones."
  }
];

const defaultBowlingFaqs = [
  {
    q: "Why Choose Refurbished Brunswick Bowling Alley Equipment?",
    a: "We offer refurbished Brunswick bowling equipment that is well-known for its long-term reliability and performance. As one of the most preferred brands worldwide, Brunswick is valued for its stable mechanical capacity and low failure rate making it a top choice for bowling alley equipment globally. One of Brunswick’s standout features is its advanced scoring system that automatically identifies potential issues and provides user-friendly troubleshooting guides. This helps keep your lanes running smoothly with minimal downtime."
  },
  {
    q: "How is Brunswick Equipment Refurbished to Perfection?",
    a: "Our skilled engineers refurbish each set of Brunswick equipment with precision, replacing all worn parts using original Brunswick components. The result? A product that performs like new, at a fraction of the cost."
  },
  {
    q: "Why is the quality of refurbished Brunswick equipment trustworthy?",
    a: "Many bowling centers in India have shut down in recent years due to shifts in the sport's popularity. However, the equipment from these venues often remains in excellent condition, with many systems being only 2–5 years old. Considering Brunswick equipment is built to last 40–50 years, even lightly used units are still in their prime."
  },
  {
    q: "Why Opt for Refurbished Equipment?",
    a: "By choosing our refurbished Brunswick bowling systems, you can create a high-end bowling center at a cost-effective budget. With reliable machinery that’s been expertly restored, you’ll enjoy top-tier performance, low maintenance, and durability."
  },
  {
    q: "What is the Bowling Alley Setup Cost in India?",
    a: "The bowling alley setup cost in India depends on the number of lanes, equipment condition, and venue size. Winera International provides refurbished Brunswick bowling equipment at a fraction of new equipment cost making it possible to set up a high-end bowling center within a realistic budget. Contact our team for a complete cost-to-revenue report for your specific space."
  },
  {
    q: "What After-Sales Support Does Winera Provide for Bowling Alley Equipment?",
    a: "Our relationship with clients continues well after installation. We provide comprehensive maintenance, servicing, and support for all Brunswick bowling alley equipment we supply ensuring your lanes run smoothly with minimal downtime for years to come."
  },
  {
    q: "How much space is required to set up a bowling alley?",
    a: "A standard bowling lane requires 89 feet in length and 6 feet in width; a minimum of 2 lanes is recommended for commercial setups. Winera assesses your exact dimensions and provides a complete layout plan along with a free ROI report before confirming any equipment."
  },
  {
    q: "What is the difference between a free-fall bowling system and a string bowling system?",
    a: "Free-Fall Bowling System: In this system, the pins fall freely when the bowling ball hits them. It feels just like real bowling played in professional bowling centers.\n\nString Bowling System: In this system, each pin has a string attached at the top. After the ball hits the pins, the strings lift them back into place. It is easier to maintain and more affordable."
  }
];

const defaultTrampolineCta = {
  titleLine1: "Plan Your Trampoline",
  titleLine2: "Park With Winera",
  descLine1: "Our team will assess your venue, prepare a free ROI report, and",
  descLine2: "recommend the right zone mix for your space.",
  buttonText: "Get Quote Now",
  buttonLink: "https://wa.me/919157873576",
  bgUrl: trampolineParkCtaBg
};

const defaultTrampolineSeo = {
  pageTitle: "Trampoline Park Manufacturer in India | Winera International",
  metaDescription: "Looking for a trampoline park manufacturer in India? Winera International designs and installs custom trampoline parks to your space, vision, and budget."
};

export default function AdminDashboard({ siteData, refreshContent }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  // Selected page context in sidebar: persisted across page refreshes via localStorage & URL query
  const [selectedPage, setSelectedPage] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlPage = params.get('page');
        if (urlPage) return urlPage;
        const saved = localStorage.getItem('admin_selected_page');
        if (saved) return saved;
      } catch (e) { }
    }
    return 'home';
  });

  // Selected section tab within the page: persisted across page refreshes via localStorage & URL query
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlSection = params.get('section');
        if (urlSection) return urlSection;
        const saved = localStorage.getItem('admin_active_section');
        if (saved) return saved;
      } catch (e) { }
    }
    return 'stats';
  });

  // Automatically keep localStorage and URL in sync whenever selectedPage or activeSection changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('admin_selected_page', selectedPage);
        localStorage.setItem('admin_active_section', activeSection);

        const url = new URL(window.location.href);
        if (url.searchParams.get('page') !== selectedPage || url.searchParams.get('section') !== activeSection) {
          url.searchParams.set('page', selectedPage);
          url.searchParams.set('section', activeSection);
          window.history.replaceState(null, '', url.pathname + url.search);
        }
      } catch (e) { }
    }
  }, [selectedPage, activeSection]);

  const [formData, setFormData] = useState(siteData || {});
  const [statusMsg, setStatusMsg] = useState('');
  const [loadingSection, setLoadingSection] = useState('');
  const [adminSelectedCat, setAdminSelectedCat] = useState('Sports Simulators');
  const [adminProjectFilterCat, setAdminProjectFilterCat] = useState('All');
  const [adminProjectFilterStatus, setAdminProjectFilterStatus] = useState('All');
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [adminArcadeSearch, setAdminArcadeSearch] = useState('');
  const [adminArcadePage, setAdminArcadePage] = useState(1);
  const [adminVrSearch, setAdminVrSearch] = useState('');
  const [adminVrFilterCat, setAdminVrFilterCat] = useState('All');
  const [adminVrPage, setAdminVrPage] = useState(1);
  const [newVrCategoryInput, setNewVrCategoryInput] = useState('');
  const [openProjectStatusDropdown, setOpenProjectStatusDropdown] = useState(null);
  const [isSyncingSitemap, setIsSyncingSitemap] = useState(false);
  const [arcadeMasterCards, setArcadeMasterCards] = useState([]);
  const [vrMasterCards, setVrMasterCards] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetchArcadeProducts({ limit: 'all' })
      .then(res => {
        if (isMounted && res?.success && Array.isArray(res.cards || res.products)) {
          setArcadeMasterCards(res.cards || res.products);
        }
      })
      .catch(() => { });
    fetchVrGames({ limit: 'all' })
      .then(res => {
        if (isMounted && res?.success && Array.isArray(res.cards)) {
          setVrMasterCards(res.cards);
        }
      })
      .catch(() => { });
    return () => { isMounted = false; };
  }, []);

  // Close project status dropdown when clicking outside
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest('.project-status-dropdown-wrapper')) {
        setOpenProjectStatusDropdown(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Modal State for Add / Edit Operations
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalItemData, setModalItemData] = useState({});
  const [modalTargetSection, setModalTargetSection] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [expandedBlogIdx, setExpandedBlogIdx] = useState(null);

  // Keep formData in sync when siteData is fetched or refreshed from MongoDB API
  useEffect(() => {
    if (siteData && Object.keys(siteData).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...siteData
      }));
    }
  }, [siteData]);

  // Auto-dismiss status message toast notification after 3.5 seconds
  useEffect(() => {
    if (statusMsg) {
      const timer = setTimeout(() => {
        setStatusMsg('');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [statusMsg]);

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }



  // Sidebar navigation structure by page
  const navigationMenu = {
    leads: {
      label: '💬 Lead Inquiries',
      icon: <Users style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'leadList', name: 'Manage All Popup Leads' }
      ]
    },
    home: {
      label: 'Home Page',
      icon: <Home style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'hero', name: 'Hero Banner' },
        { id: 'stats', name: 'Company Stats' },
        { id: 'aboutHome', name: 'About Winera Section' },
        { id: 'productsHome', name: 'Our Best Products' },
        { id: 'partnerHome', name: 'Your Partner Section' },
        { id: 'industries', name: 'Industries We Serve' },
        { id: 'processHome', name: 'Our Working Process' },
        { id: 'clientLogos', name: 'Our Clients Logos' },
        { id: 'builtProjects', name: 'Game Zones Built' },
        { id: 'channelPartners', name: 'Channel Partners Logos' },
        { id: 'whyChooseUs', name: 'Why Choose Us Section' },
        { id: 'testimonials', name: 'Client Testimonials' },
        { id: 'faqs', name: 'FAQ Accordions' },
        { id: 'ctaBanner', name: 'CTA Consultation Banner' },
        { id: 'homeSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    arcade: {
      label: 'Arcade Game Page',
      icon: <Gamepad2 style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'arcadeHero', name: 'Arcade Hero Banner' },
        { id: 'arcadeIntro', name: 'Arcade Intro & Specs' },
        { id: 'arcadeCategories', name: 'Game Categories & Cards' },
        { id: 'arcadeCommercial', name: 'Commercial Features' },
        { id: 'arcadeWhyUs', name: 'Why Choose Winera' },
        { id: 'arcadeRelated', name: 'Related Products Carousel' },
        { id: 'arcadeFaqs', name: 'Arcade Page FAQs' },
        { id: 'arcadeCta', name: 'Arcade CTA Banner' },
        { id: 'arcadeSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    bowling: {
      label: 'Bowling Alley Page',
      icon: <Trophy style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'bowlingHero', name: 'Hero Banner' },
        { id: 'bowlingIntro', name: 'Bowling Manufacturers Section' },
        { id: 'bowlingManufacturer', name: 'Premium Bowling Manufacturer' },
        { id: 'bowlingFreeFall', name: 'Free-Fall Bowling Section' },
        { id: 'bowlingString', name: 'String Bowling Section' },
        { id: 'bowlingRoi', name: 'Investment & ROI Section' },
        { id: 'bowlingWhyUs', name: 'Why Choose Winera' },
        { id: 'bowlingRelated', name: 'Related Products Carousel' },
        { id: 'bowlingFaqs', name: 'Bowling Page FAQs' },
        { id: 'bowlingCta', name: 'Bowling CTA Banner' },
        { id: 'bowlingSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    softplay: {
      label: 'Soft Play Page',
      icon: <Sparkles style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'softplayHero', name: 'Soft Play Hero Banner' },
        { id: 'softplayIntro', name: 'Indoor Soft Play Manufacturer' },
        { id: 'softplayManufacture', name: 'Soft Play Equipment Manufacture' },
        { id: 'softplaySpecs', name: 'Technical Specifications Card' },
        { id: 'softplayMaterials', name: 'Materials Quality & Durability' },
        { id: 'softplayTypes', name: 'Types of Soft Play Zones Timeline' },
        { id: 'softplayRoi', name: 'Know Your Returns & ROI Section' },
        { id: 'softplayWhyUs', name: 'Why Choose Winera Section' },
        { id: 'softplayRelated', name: 'Related Products Carousel' },
        { id: 'softplayFaqs', name: 'Soft Play Page FAQs' },
        { id: 'softplayCta', name: 'Soft Play CTA Banner' },
        { id: 'softplaySeo', name: 'SEO Meta Title & Description' }
      ]
    },
    trampolinePark: {
      label: 'Trampoline Park Page',
      icon: <Sparkles style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'trampolineHero', name: 'Hero Banner & Breadcrumb' },
        { id: 'trampolineIntro', name: 'Manufacturer Intro Section' },
        { id: 'trampolineCustom', name: 'Custom Trampoline Parks Section' },
        { id: 'trampolineSpecs', name: 'Technical Specifications Card' },
        { id: 'trampolineInside', name: 'What is inside Custom Park (Zones)' },
        { id: 'trampolineRoi', name: 'What Will Your Park Earn (ROI)' },
        { id: 'trampolineWhyChoose', name: 'Why Choose Winera International' },
        { id: 'trampolineRelated', name: 'Related Products Carousel' },
        { id: 'trampolineFaqs', name: 'Trampoline Park FAQs' },
        { id: 'trampolineCta', name: 'Plan Trampoline Park CTA Banner' },
        { id: 'trampolineSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    amusementPark: {
      label: 'Amusement Park Page',
      icon: <Gamepad2 style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'amusementHero', name: 'Amusement Hero Banner' },
        { id: 'amusementIntro', name: 'Amusement Park Ride Manufacturer' },
        { id: 'amusementBanner', name: 'Complete Amusement Park Setups' },
        { id: 'amusementOptions', name: 'Rides & Attractions We Supply' },
        { id: 'amusementRoi', name: 'Before You Build ROI Section' },
        { id: 'amusementWhyUs', name: 'Why Choose Winera Section' },
        { id: 'amusementRelated', name: 'Related Products Carousel' },
        { id: 'amusementFaqs', name: 'Amusement Park FAQs' },
        { id: 'amusementCta', name: 'Amusement Park CTA Banner' },
        { id: 'amusementSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    hypergrid: {
      label: 'Hypergrid Page',
      icon: <Gamepad2 style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'hypergridHero', name: 'Hypergrid Hero Banner' },
        { id: 'hypergridIntro', name: 'Hypergrid Manufacturer Section' },
        { id: 'hypergridBanner', name: 'High-Footfall Venues Section' },
        { id: 'hypergridSpecs', name: 'Technical Specifications' },
        { id: 'hypergridWhyUs', name: 'Why Choose Hypergrid' },
        { id: 'hypergridRoi', name: 'Smart Investment ROI' },
        { id: 'hypergridWhyWinera', name: 'Why Choose Winera Section' },
        { id: 'hypergridRelated', name: 'Related Products Carousel' },
        { id: 'hypergridFaqs', name: 'Hypergrid FAQs Management' },
        { id: 'hypergridCta', name: 'Hypergrid CTA Banner' },
        { id: 'hypergridSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    bumpercar: {
      label: 'Bumper Car Page',
      icon: <Gamepad2 style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'bumpercarHero', name: 'Bumper Car Hero Banner' },
        { id: 'bumpercarIntro', name: 'Bumper Car Manufacturer in India' },
        { id: 'bumpercarBanner', name: 'Bumper Car Description & 3D Car' },
        { id: 'bumpercarThrill', name: 'Thrill & Safety Card Slider' },
        { id: 'bumpercarSpecs', name: 'Technical Specifications Card' },
        { id: 'bumpercarOptions', name: 'Indoor Bumper Car Options' },
        { id: 'bumpercarComparison', name: 'Quick Comparison Table' },
        { id: 'bumpercarInvestment', name: 'Bumper Car Ride Smart Investment' },
        { id: 'bumpercarWhyChoose', name: 'Why Choose Winera International' },
        { id: 'bumpercarRelated', name: 'Related Products Carousel' },
        { id: 'bumpercarFaqs', name: 'Bumper Car FAQs' },
        { id: 'bumpercarCta', name: 'Bumper Car CTA Banner' },
        { id: 'bumpercarSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    vrgames: {
      label: 'VR Games Page',
      icon: <Gamepad2 style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'vrHero', name: 'VR Games Hero Banner' },
        { id: 'vrSupplier', name: 'VR Gaming Machine Supplier' },
        { id: 'vrMatchedVenue', name: 'Commercial VR Machines Matched Venue' },
        { id: 'vrCategories', name: 'Game Categories & Cards' },
        { id: 'vrReliability', name: 'Commercial-Grade Quality & Reliability' },
        { id: 'vrEarn', name: 'What Will Your VR Zone Earn' },
        { id: 'vrWhyUs', name: 'Why Choose Winera Section' },
        { id: 'vrRelated', name: 'Related Products Carousel' },
        { id: 'vrFaqs', name: 'VR Games FAQs' },
        { id: 'vrCta', name: 'VR Games CTA Banner' },
        { id: 'vrSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    argames: {
      label: 'AR Games Page',
      icon: <Gamepad2 style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'arHero', name: 'AR Games Hero Banner' },
        { id: 'arIntro', name: 'AR Games Supplier in India' },
        { id: 'arMatchedVenue', name: 'Interactive AR Attractions' },
        { id: 'arFeatures', name: 'AR Features & Highlights' },
        { id: 'arEarn', name: 'Know Your Returns Section' },
        { id: 'arWhyUs', name: 'Why Choose Winera Section' },
        { id: 'arRelated', name: 'Related Products Carousel' },
        { id: 'arFaqs', name: 'AR Games FAQs' },
        { id: 'arCta', name: 'CTA Consultations Banner' },
        { id: 'arSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    lasertag: {
      label: 'Laser Tag Page',
      icon: <Target style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'lasertagHero', name: 'Laser Tag Hero Banner' },
        { id: 'lasertagIntro', name: 'Laser Tag Supplier Section' },
        { id: 'lasertagSetup', name: 'Laser Tag Setup Section' },
        { id: 'lasertagGroups', name: 'Great for Groups Section' },
        { id: 'lasertagSpecs', name: 'Laser Tag Technical Specifications' },
        { id: 'lasertagSpace', name: 'Space Requirements Section' },
        { id: 'lasertagSpy', name: 'Laser Spy Section' },
        { id: 'lasertagSpySpecs', name: 'Laser Spy Technical Specifications' },
        { id: 'lasertagComparison', name: 'Game Comparison Section' },
        { id: 'lasertagRoi', name: 'Know Your Numbers ROI Section' },
        { id: 'lasertagWhyUs', name: 'Why Choose Winera Section' },
        { id: 'lasertagFaqs', name: 'Frequently Asked Questions (FAQs)' },
        { id: 'lasertagCta', name: 'Laser Tag CTA Banner' },
        { id: 'lasertagRelated', name: 'Related Products Carousel' },
        { id: 'lasertagSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    projectPage: {
      label: 'Projects Page',
      icon: <Trophy style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'projectHero', name: '1. Hero Banner' },
        { id: 'projectItems', name: '2. Categories & Projects Manager' },
        { id: 'projectCta', name: '3. Bottom CTA Graphic Banner' },
        { id: 'projectRelated', name: '4. Related Products Carousel' },
        { id: 'projectSeo', name: '5. SEO Meta Title & Description' }
      ]
    },
    roiPage: {
      label: 'ROI Page',
      icon: <Calculator style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'roiHero', name: 'ROI Hero Banner' },
        { id: 'roiIntro', name: 'Know Your Numbers Section' },
        { id: 'roiMatters', name: 'Why Setup Matters Section' },
        { id: 'roiComparison', name: 'Game Zones Fail vs. Profit' },
        { id: 'roiProcess', name: 'Working Process Steps' },
        { id: 'roiGet', name: 'What You Get Section' },
        { id: 'roiChecklist', name: 'This is for you if Checklist' },
        { id: 'roiCta', name: 'Ready to See Your Numbers CTA' },
        { id: 'roiSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    blogPage: {
      label: 'Blog Page',
      icon: <FileText style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'blogPosts', name: '1. All Blog Posts Manager' },
        { id: 'blogHero', name: '2. Blog Hero Banner' },
        { id: 'blogSeo', name: '3. SEO Meta Title & Description' }
      ]
    },
    about: {
      label: 'About Us Page',
      icon: <Info style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'aboutHero', name: 'About Hero Banner' },
        { id: 'aboutWelcome', name: 'Welcome To Winera Section' },
        { id: 'aboutStats', name: 'Achievements & Counter Stats' },
        { id: 'aboutMissionVision', name: 'Our Purpose & Promise' },
        { id: 'aboutWhyUsDetail', name: 'Why Choose Us Mindmap' },
        { id: 'founder', name: 'Founder Profile Data' },
        { id: 'aboutCta', name: 'About Us CTA Banner' },
        { id: 'aboutSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    contact: {
      label: 'Contact Us Page',
      icon: <PhoneCall style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'contactHero', name: 'Contact Hero Banner' },
        { id: 'contactPage', name: 'Contact Info & Form' },
        { id: 'contactSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    safetyStandards: {
      label: 'Safety Standards Page',
      icon: <ShieldCheck style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'safetyHero', name: 'Safety Hero Banner' },
        { id: 'safetyIntro', name: 'Safety Standards Intro' },
        { id: 'safetyCertifications', name: '7 Certified Standards Cards' },
        { id: 'safetyMaterials', name: 'Material & Fire Safety' },
        { id: 'safetyElectrical', name: 'Electrical & Machine Safety' },
        { id: 'safetyStructure', name: 'Structure & Installation Safety' },
        { id: 'safetyWhyMatters', name: 'Why This Matters & CTA Banner' },
        { id: 'safetySeo', name: 'SEO Meta Title & Description' }
      ]
    },
    headerPage: {
      label: 'Header Page',
      icon: <Layout style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'header', name: 'Header Details & Logo' }
      ]
    },
    footerPage: {
      label: 'Footer Page',
      icon: <Layout style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'footer', name: 'Footer Details' }
      ]
    },
    privacyPolicyPage: {
      label: 'Privacy Policy Page',
      icon: <FileText style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'privacyHero', name: 'Privacy Hero Banner' },
        { id: 'privacySections', name: 'Privacy Policy Content & Sections' },
        { id: 'privacySeo', name: 'SEO Meta Title & Description' }
      ]
    },
    termsConditionsPage: {
      label: 'Terms & Conditions Page',
      icon: <FileText style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'termsHero', name: 'Terms Hero Banner' },
        { id: 'termsSections', name: 'Terms & Conditions Content & Sections' },
        { id: 'termsSeo', name: 'SEO Meta Title & Description' }
      ]
    }
  };

  const handleSyncSitemap = async () => {
    setIsSyncingSitemap(true);
    setStatusMsg('Synchronizing SEO Sitemap (scanning all blogs, products, categories & projects)...');
    try {
      const token = admin?.token || (() => {
        try {
          const stored = JSON.parse(localStorage.getItem('winera_admin') || '{}');
          return stored?.token || '';
        } catch { return ''; }
      })();
      const res = await syncSitemapApi(token);
      setStatusMsg(res.message || '✅ Sitemap synchronized successfully!');
      alert(res.message || '✅ Sitemap synchronized successfully!');
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setStatusMsg('Sitemap notice: ' + msg);
      alert('Sitemap Sync Notice:\n\n' + msg);
    } finally {
      setIsSyncingSitemap(false);
    }
  };

  const handleSaveSection = async (sectionKey) => {
    setLoadingSection(sectionKey);
    setStatusMsg('');
    try {
      const token = admin?.token || (() => {
        try {
          const stored = JSON.parse(localStorage.getItem('winera_admin') || '{}');
          return stored?.token || '';
        } catch { return ''; }
      })();
      await updateSectionContent(sectionKey, formData[sectionKey], token);
      if (typeof refreshContent === 'function') {
        await refreshContent(true, true);
      }
      setStatusMsg(`'${sectionKey.toUpperCase()}' updated successfully!`);
    } catch (err) {
      setStatusMsg(`Error saving ${sectionKey}: ` + (err.response?.data?.message || err.message));
    } finally {
      setLoadingSection('');
    }
  };

  const handleFieldChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };

  const handleArrayFieldChange = (section, index, field, value) => {
    setFormData(prev => {
      const list = [...(prev[section] || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [section]: list };
    });
  };

  const handleBrochureUpload = async (e, sectionKey, fieldKey = 'brochureUrl', extraOverrides = {}, defaultData = {}) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset file input value so selecting the same file again triggers onChange
    e.target.value = '';

    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    setStatusMsg(`Uploading PDF brochure to Cloudinary (${sizeMB} MB)... Please wait.`);
    try {
      const token = admin?.token || (() => {
        try {
          const stored = JSON.parse(localStorage.getItem('winera_admin') || '{}');
          return stored?.token || '';
        } catch { return ''; }
      })();
      const res = await uploadImageFile(file, token);
      const currentSectionData = formData[sectionKey] || {};
      const updatedSec = { ...defaultData, ...currentSectionData, ...extraOverrides, [fieldKey]: res.url };
      setFormData(prev => ({ ...prev, [sectionKey]: updatedSec }));
      await persistSectionToDatabase(sectionKey, updatedSec);
      setStatusMsg(`✅ PDF Brochure (${sizeMB} MB) uploaded to Cloudinary & saved permanently!`);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      setStatusMsg('❌ Upload error: ' + errMsg);
      alert('Upload Error:\n\n' + errMsg);
    }
  };

  const handleFileUpload = async (e, section, index, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatusMsg('Uploading file to server...');
    try {
      const token = admin?.token || (() => {
        try {
          const stored = JSON.parse(localStorage.getItem('winera_admin') || '{}');
          return stored?.token || '';
        } catch { return ''; }
      })();
      const res = await uploadImageFile(file, token);
      handleArrayFieldChange(section, index, field, res.url);
      setStatusMsg('File uploaded successfully to server!');
    } catch (err) {
      setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
    }
  };

  // Direct update helper function to save section to MongoDB
  const persistSectionToDatabase = async (sectionKey, updatedData) => {
    setLoadingSection(sectionKey);
    setStatusMsg('');
    try {
      // 1. Immediately reflect in local state so UI updates instantly without any delay
      setFormData(prev => ({ ...prev, [sectionKey]: updatedData }));
      const token = admin?.token || (() => {
        try {
          const stored = JSON.parse(localStorage.getItem('winera_admin') || '{}');
          return stored?.token || '';
        } catch { return ''; }
      })();
      await updateSectionContent(sectionKey, updatedData, token);
      if (typeof refreshContent === 'function') {
        await refreshContent(true, true);
      }
      setStatusMsg(`Saved directly to MongoDB database!`);
    } catch (err) {
      setStatusMsg(`Database Save Error: ` + (err.response?.data?.message || err.message));
    } finally {
      setLoadingSection('');
    }
  };

  // Delete item from table & save directly to MongoDB
  const handleDeleteItem = async (sectionKey, index) => {
    let currentList = [];
    if (Array.isArray(formData[sectionKey])) {
      currentList = [...formData[sectionKey]];
    } else {
      const fallbackDefaults = {
        stats: [
          { number: "14+", label: "YEARS OF EXPERIENCE" },
          { number: "200+", label: "Project Completed" },
          { number: "98%", label: "Happy Clients" },
          { number: "50+", label: "Cities Covered" }
        ],
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
          { name: "FifthAlley Sport Bowling", city: "Surat", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877018/winera_uploads/projects/lf45hnr7l9jwbij9gh4q.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877018/winera_uploads/projects/lf45hnr7l9jwbij9gh4q.jpg", slug: "fifthalley-sport-bowling" },
          { name: "Hulaboo", city: "Surat", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877032/winera_uploads/projects/jvr2xtu8jszcmzaglxmr.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877032/winera_uploads/projects/jvr2xtu8jszcmzaglxmr.jpg", slug: "hulaboo" },
          { name: "Playzonia", city: "Surat", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877055/winera_uploads/projects/kqskvifgcu4d5yuthggs.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877055/winera_uploads/projects/kqskvifgcu4d5yuthggs.jpg", slug: "playzonia" },
          { name: "LaneX Bowling Alley", city: "Surat", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877047/winera_uploads/projects/ax4fuat1a1uf3l7ex1he.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877047/winera_uploads/projects/ax4fuat1a1uf3l7ex1he.jpg", slug: "lanex-bowling-alley" },
          { name: "Rebounce", city: "Surat", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877065/winera_uploads/projects/ulhoypau8uifcunj9ogn.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877065/winera_uploads/projects/ulhoypau8uifcunj9ogn.jpg", slug: "rebounce" },
          { name: "Level Up", city: "Morbi", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880283/winera_uploads/pskx11h3zysrl8yrx0te.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880283/winera_uploads/pskx11h3zysrl8yrx0te.jpg", slug: "level-up" },
          { name: "Rock and Bowl", city: "Vapi", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877846/winera_uploads/ebko4as1kehon9gbnkg7.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877846/winera_uploads/ebko4as1kehon9gbnkg7.jpg", slug: "rock-and-bowl" },
          { name: "Rumble Zone", city: "Gurugram", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880685/winera_uploads/ts0qlqlxigm1vfl1qp9s.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880685/winera_uploads/ts0qlqlxigm1vfl1qp9s.jpg", slug: "rumble-zone" },
          { name: "The Fun Factory", city: "Nallasopara", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881209/winera_uploads/b9jr71otq8j24u3ugqid.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881209/winera_uploads/b9jr71otq8j24u3ugqid.jpg", slug: "the-fun-factory" },
          { name: "Pop A Puddle", city: "Bangalore", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882402/winera_uploads/wikn3ojponc3myqreve9.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882402/winera_uploads/wikn3ojponc3myqreve9.jpg", slug: "pop-a-puddle" },
          { name: "Skadoosh Play Area", city: "Bangalore", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882832/winera_uploads/megu51reihwjmg7sodji.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882832/winera_uploads/megu51reihwjmg7sodji.jpg", slug: "skadoosh-play-area" },
          { name: "VR 360 Game Zone", city: "Gandhidham", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791883780/winera_uploads/e9haienezg91tzsgj38x.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791883780/winera_uploads/e9haienezg91tzsgj38x.jpg", slug: "vr-360-game-zone" },
          { name: "Altitude Ball in Ball Out", city: "Mumbai", imageUrl: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791884286/winera_uploads/d9xxrrcg3v8trnkiq9kp.jpg", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791884286/winera_uploads/d9xxrrcg3v8trnkiq9kp.jpg", slug: "altitude-ball-in-ball-out" }
        ],
        testimonials: [
          {
            gameZoneName: "Rebounce Game Zone",
            name: "Rebounce Game Zone",
            reviewerRole: "Surat",
            role: "Surat",
            starRating: 5,
            rating: 5,
            youtubeVideoUrl: "https://www.youtube.com/shorts/YNrfGqhhl5w",
            videoUrl: "https://www.youtube.com/shorts/YNrfGqhhl5w",
            founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/uanfdgdjqntkeaqm8d9u.webp",
            img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/uanfdgdjqntkeaqm8d9u.webp",
            videoImg: "https://img.youtube.com/vi/YNrfGqhhl5w/sddefault.jpg",
            quote: "When we were planning Rebounce we had the space and the budget but no idea how to turn it into a game zone. Winera International Pvt. Ltd. made the entire process effortless. One meeting was enough. We shared our requirements and they handled everything from game selection and layout design to complete installation. The result speaks for itself Rebounce today is a thriving game zone and our customers keep coming back."
          },
          {
            gameZoneName: "Fun Houze",
            name: "Fun Houze",
            reviewerRole: "Surat",
            role: "Surat",
            starRating: 5,
            rating: 5,
            youtubeVideoUrl: "https://youtube.com/shorts/YXhUJ1k6pbQ",
            videoUrl: "https://youtube.com/shorts/YXhUJ1k6pbQ",
            founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/q9p8mlpn0ws9f9vlrxhd.webp",
            img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/q9p8mlpn0ws9f9vlrxhd.webp",
            videoImg: "https://img.youtube.com/vi/YXhUJ1k6pbQ/sddefault.jpg",
            quote: "Choosing the right gaming zone setup company in India was critical for us given our tight deadline. Winera International Pvt. Ltd. delivered everything as planned and on schedule. Fun Houze opening day went smoothly and the game zone setup was exactly as we discussed."
          },
          {
            gameZoneName: "Hulaboo Game Zone",
            name: "Hulaboo Game Zone",
            reviewerRole: "Surat",
            role: "Surat",
            starRating: 5,
            rating: 5,
            youtubeVideoUrl: "https://youtube.com/shorts/Jvtsn-TxVqE",
            videoUrl: "https://youtube.com/shorts/Jvtsn-TxVqE",
            founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877032/winera_uploads/projects/jvr2xtu8jszcmzaglxmr.jpg",
            img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877032/winera_uploads/projects/jvr2xtu8jszcmzaglxmr.jpg",
            videoImg: "https://img.youtube.com/vi/Jvtsn-TxVqE/sddefault.jpg",
            quote: "To be honest before starting Hulaboo we had visited multiple game zone setup companies and was confused about who to trust. When we finally met Winera International Pvt. Ltd. the clarity they gave us from day one was different. They explained the entire process, showed us real projects and gave us a transparent quote. That confidence is what made us sign. And they delivered exactly what they promised."
          },
          {
            gameZoneName: "House of Pepe",
            name: "House of Pepe",
            reviewerRole: "Surat",
            role: "Surat",
            starRating: 5,
            rating: 5,
            youtubeVideoUrl: "https://youtube.com/shorts/lf1VMqxFvR0",
            videoUrl: "https://youtube.com/shorts/lf1VMqxFvR0",
            founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360320/winera_uploads/etpnimwouc6kknkwqzpd.webp",
            img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360320/winera_uploads/etpnimwouc6kknkwqzpd.webp",
            videoImg: "https://img.youtube.com/vi/lf1VMqxFvR0/sddefault.jpg",
            quote: "Combining soft play and arcade under one roof was our vision but we had no idea how to execute it. We needed a reliable soft play equipment manufacturer in India who could also handle the arcade side. Winera International Pvt. Ltd. designed the House of Pepe layout perfectly; both zones feel different but connected. Customers enjoy both sections equally."
          }
        ]
      };
      currentList = fallbackDefaults[sectionKey] ? [...fallbackDefaults[sectionKey]] : [];
    }
    const updatedList = currentList.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [sectionKey]: updatedList }));
    await persistSectionToDatabase(sectionKey, updatedList);
  };

  // Open Modal Handler (Add or Edit)
  const openModal = (mode, index = null, currentItem = {}, targetSec = null) => {
    const item = currentItem || {};
    const sec = targetSec || activeSection;
    setModalTargetSection(sec);
    setModalMode(mode);
    setEditingIndex(index);
    if (sec === 'arcadeCategories') {
      const slugifyText = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const cardTitle = item.title || item.name || (mode === 'add' ? '' : 'Parkour Motor II (DX)');
      const cardSlug = (item.slug && item.slug !== 'new-arcade-game') ? item.slug : slugifyText(cardTitle);

      const arcadeDefaultsLookup = {
        'parkour-motor-2-dx': {
          nameBase: 'Parkour Motor ',
          nameHighlight: 'II (DX)',
          category: 'Bike Racing Game',
          tagline: 'High-Performance Dual Player Commercial Motorbike Racing Simulator',
          power: '880 W',
          voltage: '220v',
          specsCategory: 'Bike Racing Game',
          players: '2 Player',
          material: 'Imported Steel & ABS',
          width: '2140 mm',
          depth: '2310 mm',
          height: '2490 mm',
          videoUrl: 'https://youtube.com',
          quoteUrl: 'https://wa.me/919157873576?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Parkour%20Motor%20II%20(DX)'
        },
        'manx-tt-32': {
          nameBase: 'MANX TT ',
          nameHighlight: '32"',
          category: 'Bike Racing Game',
          tagline: 'Classic High-Velocity Arcade Motorcycle Simulator',
          power: '500 W',
          voltage: '220v',
          specsCategory: 'Bike Racing Game',
          players: '2 Player',
          material: 'Imported Steel & ABS',
          width: '2150 mm',
          depth: '2200 mm',
          height: '2400 mm',
          videoUrl: 'https://youtube.com',
          quoteUrl: 'https://wa.me/919157873576?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20MANX%20TT%2032'
        },
        'super-air-hockey': {
          nameBase: 'Super Air ',
          nameHighlight: 'Hockey',
          category: 'Air Hockey',
          tagline: 'Commercial Grade Heavy-Duty Air Hockey Table with Digital Score Display',
          power: '600 W',
          voltage: '220v',
          specsCategory: 'Air Hockey',
          players: '2 Player',
          material: 'Stainless Steel & Aluminum',
          width: '2200 mm',
          depth: '1300 mm',
          height: '850 mm',
          videoUrl: 'https://youtube.com',
          quoteUrl: 'https://wa.me/919157873576?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Super%20Air%20Hockey'
        },
        'puck-carnival-air-hockey': {
          nameBase: 'Puck Carnival ',
          nameHighlight: 'Air Hockey',
          category: 'Air Hockey',
          tagline: 'Multi-Puck Carnival Style Air Hockey Machine for High Footfall Game Zones',
          power: '650 W',
          voltage: '220v',
          specsCategory: 'Air Hockey',
          players: '2-4 Player',
          material: 'Stainless Steel & Polycarbonate',
          width: '2250 mm',
          depth: '1350 mm',
          height: '880 mm',
          videoUrl: 'https://youtube.com',
          quoteUrl: 'https://wa.me/919157873576?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Puck%20Carnival%20Air%20Hockey'
        },
        'dazzling-air-hockey-multi-puck': {
          nameBase: 'Dazzling Air Hockey ',
          nameHighlight: '- Multi Puck',
          category: 'Air Hockey',
          tagline: 'LED Illuminated Stainless Steel Air Hockey Table with Sound Effects',
          power: '700 W',
          voltage: '220v',
          specsCategory: 'Air Hockey',
          players: '2 Player',
          material: 'Stainless Steel Construction',
          width: '2300 mm',
          depth: '1400 mm',
          height: '900 mm',
          videoUrl: 'https://youtube.com',
          quoteUrl: 'https://wa.me/919157873576?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Dazzling%20Air%20Hockey'
        },
        'aurora-air-hockey': {
          nameBase: 'Aurora Air ',
          nameHighlight: 'Hockey',
          category: 'Air Hockey',
          tagline: 'High-Power Air Blower Tournament Air Hockey Table with Durable Aluminum Rails',
          power: '620 W',
          voltage: '220v',
          specsCategory: 'Air Hockey',
          players: '2 Player',
          material: 'Aluminum & Stainless Steel',
          width: '2150 mm',
          depth: '1250 mm',
          height: '840 mm',
          videoUrl: 'https://youtube.com',
          quoteUrl: 'https://wa.me/919157873576?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Aurora%20Air%20Hockey'
        },
        'ocha-air-hockey': {
          nameBase: 'Ocha Air ',
          nameHighlight: 'Hockey',
          category: 'Air Hockey',
          tagline: 'Compact & Stylish Commercial Air Hockey Machine for Malls & FECs',
          power: '500 W',
          voltage: '220v',
          specsCategory: 'Air Hockey',
          players: '2 Player',
          material: 'Imported Acrylic & Alloy',
          width: '2100 mm',
          depth: '1200 mm',
          height: '820 mm',
          videoUrl: 'https://youtube.com',
          quoteUrl: 'https://wa.me/919157873576?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Ocha%20Air%20Hockey'
        },
        'aero-x-air-hockey': {
          nameBase: 'Aero X Air ',
          nameHighlight: 'Hockey',
          category: 'Air Hockey',
          tagline: 'Next-Gen Arcade Air Hockey Table with Ticket Dispenser',
          power: '550 W',
          voltage: '220v',
          specsCategory: 'Air Hockey',
          players: '2 Player',
          material: 'Stainless Steel Construction',
          width: '2180 mm',
          depth: '1280 mm',
          height: '860 mm',
          videoUrl: 'https://youtube.com',
          quoteUrl: 'https://wa.me/919157873576?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Aero%20X%20Air%20Hockey'
        }
      };

      const knownDefault = arcadeDefaultsLookup[cardSlug] || {};

      const defaultArcadeItem = {
        title: cardTitle,
        name: cardTitle,
        nameBase: item.nameBase !== undefined ? item.nameBase : (knownDefault.nameBase || `${cardTitle} `),
        nameHighlight: item.nameHighlight !== undefined ? item.nameHighlight : (knownDefault.nameHighlight || ''),
        category: item.category || knownDefault.category || (adminProjectFilterCat && adminProjectFilterCat !== 'All' ? adminProjectFilterCat : 'Arcade Games'),
        tag: item.tag || 'Popular',
        tagline: item.tagline || item.desc || knownDefault.tagline || 'High-Performance Commercial Arcade Simulator Machine',
        desc: item.desc || item.tagline || knownDefault.tagline || 'High-Performance Commercial Arcade Simulator Machine',
        slug: cardSlug,
        power: item.power || knownDefault.power || '880 W',
        voltage: item.voltage || knownDefault.voltage || '220v',
        specsCategory: item.specsCategory || item.category || knownDefault.specsCategory || 'Arcade Games',
        players: item.players || knownDefault.players || '2 Player',
        material: item.material || knownDefault.material || 'Imported Steel & ABS',
        width: item.width || knownDefault.width || '2140 mm',
        depth: item.depth || knownDefault.depth || '2310 mm',
        height: item.height || knownDefault.height || '2490 mm',
        img: item.img || item.imageUrl || arcadeProductImageMap[cardTitle] || arcadeProductImageMap[item.name] || arcadeProductImageMap[item.title] || '',
        gallery: (Array.isArray(item.gallery) && item.gallery.length > 0)
          ? item.gallery.filter(Boolean)
          : [item.gallery1, item.gallery2, item.gallery3, item.gallery4, item.gallery5, item.gallery6].filter(Boolean),
        gallery1: item.gallery1 || (Array.isArray(item.gallery) ? item.gallery[0] : '') || '',
        gallery2: item.gallery2 || (Array.isArray(item.gallery) ? item.gallery[1] : '') || '',
        gallery3: item.gallery3 || (Array.isArray(item.gallery) ? item.gallery[2] : '') || '',
        gallery4: item.gallery4 || (Array.isArray(item.gallery) ? item.gallery[3] : '') || '',
        gallery5: item.gallery5 || (Array.isArray(item.gallery) ? item.gallery[4] : '') || '',
        gallery6: item.gallery6 || (Array.isArray(item.gallery) ? item.gallery[5] : '') || '',
        videoUrl: item.videoUrl || knownDefault.videoUrl || 'https://youtube.com',
        quoteUrl: item.quoteUrl || knownDefault.quoteUrl || 'https://wa.me/919157873576',
        feature1Title: item.feature1Title !== undefined ? String(item.feature1Title).replace(/12\+/g, '15+') : (knownDefault.feature1Title ? String(knownDefault.feature1Title).replace(/12\+/g, '15+') : '15+ Years of Expertise'),
        feature1Desc: item.feature1Desc !== undefined ? item.feature1Desc : (knownDefault.feature1Desc || 'Proven experience delivering game zone projects across malls, hotels, schools, and resorts since 2014.'),
        feature2Title: item.feature2Title !== undefined ? item.feature2Title : (knownDefault.feature2Title || 'Quality & Safety Standards'),
        feature2Desc: item.feature2Desc !== undefined ? item.feature2Desc : (knownDefault.feature2Desc || 'Every product sourced from global manufacturers and tested for commercial-grade safety and durability.'),
        feature3Title: item.feature3Title !== undefined ? item.feature3Title : (knownDefault.feature3Title || 'ROI-First Approach'),
        feature3Desc: item.feature3Desc !== undefined ? item.feature3Desc : (knownDefault.feature3Desc || 'Every project begins with a free ROI report, revenue and break-even calculated before you invest.'),
        feature4Title: item.feature4Title !== undefined ? item.feature4Title : (knownDefault.feature4Title || 'Reliable Pan-India Service'),
        feature4Desc: item.feature4Desc !== undefined ? item.feature4Desc : (knownDefault.feature4Desc || 'Our own team installs and supports every project across 50+ cities on time, every time.')
      };

      // Search in arcadeMasterCards for full catalog data and multi-angle gallery
      const masterCards = arcadeMasterCards || [];
      const masterMatch = masterCards.find(m =>
        (m.slug && cardSlug && m.slug.toLowerCase().trim() === cardSlug.toLowerCase().trim()) ||
        (m.name && cardTitle && m.name.toLowerCase().trim() === cardTitle.toLowerCase().trim()) ||
        (m.title && cardTitle && m.title.toLowerCase().trim() === cardTitle.toLowerCase().trim())
      );

      const candidateGalleries = [
        Array.isArray(item.gallery) ? item.gallery.filter(Boolean) : [],
        [item.gallery1, item.gallery2, item.gallery3, item.gallery4, item.gallery5, item.gallery6].filter(Boolean),
        Array.isArray(masterMatch?.gallery) ? masterMatch.gallery.filter(Boolean) : []
      ];
      let richestGallery = [];
      for (const gal of candidateGalleries) {
        if (gal.length > richestGallery.length) {
          richestGallery = gal;
        }
      }
      if (richestGallery.length === 0 && (item.img || item.imageUrl || masterMatch?.img || masterMatch?.imageUrl)) {
        richestGallery = [item.img || item.imageUrl || masterMatch?.img || masterMatch?.imageUrl].filter(Boolean);
      }

      setModalItemData({
        ...defaultArcadeItem,
        ...(masterMatch || {}),
        ...item,
        gallery: richestGallery
      });
      setIsModalOpen(true);
      return;
    }

    if (sec === 'vrCategories' || sec === 'vrRange') {
      const slugifyText = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const cardTitle = item.title || item.name || (mode === 'add' ? '' : 'New VR Game');
      const cardSlug = (item.slug && item.slug !== 'new-vr-game') ? item.slug : slugifyText(cardTitle);

      const masterVrList = vrMasterCards || [];
      const vrMatch = masterVrList.find(m =>
        (m.slug && cardSlug && m.slug.toLowerCase().trim() === cardSlug.toLowerCase().trim()) ||
        (m.name && cardTitle && m.name.toLowerCase().trim() === cardTitle.toLowerCase().trim()) ||
        (m.title && cardTitle && m.title.toLowerCase().trim() === cardTitle.toLowerCase().trim())
      );

      const candidateVrGalleries = [
        Array.isArray(item.gallery) ? item.gallery.filter(Boolean) : [],
        [item.gallery1, item.gallery2, item.gallery3, item.gallery4].filter(Boolean),
        Array.isArray(vrMatch?.gallery) ? vrMatch.gallery.filter(Boolean) : []
      ];
      let richestVrGallery = [];
      for (const gal of candidateVrGalleries) {
        if (gal.length > richestVrGallery.length) {
          richestVrGallery = gal;
        }
      }
      if (richestVrGallery.length === 0 && (item.img || item.imageUrl || vrMatch?.img || vrMatch?.imageUrl)) {
        richestVrGallery = [item.img || item.imageUrl || vrMatch?.img || vrMatch?.imageUrl].filter(Boolean);
      }

      const defaultVrItem = {
        name: cardTitle,
        title: cardTitle,
        nameBase: item.nameBase !== undefined ? item.nameBase : cardTitle,
        nameHighlight: item.nameHighlight || '',
        category: item.category || 'Bester VR',
        tag: item.tag || item.category || 'Bester VR',
        slug: cardSlug,
        tagline: item.tagline || 'Commercial VR virtual reality simulation system designed for maximum guest throughput.',
        desc: item.desc || '',
        img: item.img || item.imageUrl || vrMatch?.img || vrMatch?.imageUrl || '',
        imageUrl: item.img || item.imageUrl || vrMatch?.imageUrl || vrMatch?.img || '',
        power: item.power || '',
        voltage: item.voltage || '220V / 110V',
        specsCategory: item.specsCategory || item.category || 'VR Game',
        players: item.players || '1',
        weight: item.weight || '',
        maxLoad: item.maxLoad || '',
        games: item.games || '',
        helmet: item.helmet || 'DP',
        material: item.material || 'Commercial Heavy-Duty Steel & High-Gloss Fiberglass',
        dimensions: item.dimensions || '',
        width: item.width || '',
        depth: item.depth || '',
        height: item.height || '',
        gallery: richestVrGallery,
        gallery1: richestVrGallery[0] || item.gallery1 || '',
        gallery2: richestVrGallery[1] || item.gallery2 || '',
        gallery3: richestVrGallery[2] || item.gallery3 || '',
        gallery4: richestVrGallery[3] || item.gallery4 || '',
        videoUrl: item.videoUrl || '',
        quoteUrl: item.quoteUrl || `https://wa.me/919157873576?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20${encodeURIComponent(cardTitle)}`
      };

      setModalItemData({
        ...defaultVrItem,
        ...(vrMatch || {}),
        ...item,
        gallery: richestVrGallery
      });
      setIsModalOpen(true);
      return;
    }

    if (sec === 'projectItems') {
      const slugifyText = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const projTitle = currentItem.name || currentItem.title || (mode === 'add' ? '' : 'FifthAlley Sport Bowling');
      const projSlug = currentItem.slug && currentItem.slug !== 'new-turnkey-project'
        ? currentItem.slug
        : (projTitle ? slugifyText(projTitle) : '');

      const projectCaseStudiesDefaults = {
        'fifthalley-sport-bowling': {
          name: "FifthAlley Sport Bowling",
          titleLine1: "FifthAlley Sport Bowling: A",
          titleLine2: "Complete ",
          titleLine2Black: "Bowling Alley Setup",
          titleLine3: "in the Heart of Surat",
          description: "How we designed and installed a professional-grade bowling alley across 3,000 sq. ft., transforming an empty space in Katargam into a destination entertainment venue in Surat.",
          type: "Bowling Alley Setup",
          category: "Bowling",
          city: "Surat",
          state: "Gujarat",
          area: "3,000 sq. ft.",
          clientWanted1: "The client had an empty 3,000 sq. ft. space in Katargam and a clear goal: to open a professional bowling venue.",
          clientWanted2: "They didn't want a supplier who only supplied the equipment. They wanted one partner to handle everything, plan the space, install the lanes, and hand over a venue that was ready for opening day. In short, they needed one team they could trust from start to finish.",
          solution1: "We delivered FifthAlley Sport Bowling as a complete, ready-to-open venue. Across the 3,000 sq. ft. space in Katargam, we planned the layout so the professional lanes had enough room around them for people to walk, sit, and relax.",
          solution2: "The result is a venue that is fun to play in and comfortable to spend time in — just like a good family entertainment center should feel.",
          img: '/assets/FifthAlley-Sport-Bowling/fifthalley-sport-bowling.jpg',
          clientImg: '/assets/FifthAlley-Sport-Bowling/what-the-client-wanted.jpg',
          solutionImg: '/assets/FifthAlley-Sport-Bowling/what-solution-we-provide.jpg',
          basicInfoBg: '/assets/FifthAlley-Sport-Bowling/basic-information.jpg'
        },
        'hulaboo': {
          name: "Hulaboo Game Zone",
          titleLine1: "Hulaboo: How We Turned an Empty",
          titleLine2: "Space Into Surat's ",
          titleLine2Black: "Buzziest Game Zone",
          titleLine3: "for Families",
          description: "From a vacant commercial floor to a high-energy family entertainment center featuring redemption arcades, VR simulators, and kiddy rides.",
          type: "Game Zone Setup",
          category: "Game Zones",
          city: "Surat",
          state: "Gujarat",
          area: "7,000 sq. ft.",
          clientWanted1: "The client wanted to create an unforgettable family game zone in Surat that attracts repeat visits from youngsters and families. They needed a high-earning attraction mix with strong commercial reliability.",
          clientWanted2: "They trusted Winera International as their single turnkey developer to handle architectural layout planning, equipment sourcing, installation, and staff operation training.",
          solution1: "We zoned the 7,000 sq. ft. area into high-intensity arcade racing, VR motion pods, interactive claw machines, and a dedicated redemption counter that drives player excitement.",
          solution2: "Clear navigational aisles and vibrant LED aesthetic treatments created an unforgettable guest experience, resulting in high daily footfall from day one.",
          img: "/assets/Hulaboo ( Surat )/1st Image.jpg",
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
          ],
          galleryImage1: "/assets/Hulaboo ( Surat )/Gallery 1.jpg",
          galleryImage2: "/assets/Hulaboo ( Surat )/Gallery 2.webp",
          galleryImage3: "/assets/Hulaboo ( Surat )/Gallery 3.jpg",
          galleryImage4: "/assets/Hulaboo ( Surat )/Gallery 4.jpg",
          galleryImage5: "/assets/Hulaboo ( Surat )/Gallery 5.jpg",
          galleryImage6: "/assets/Hulaboo ( Surat )/Gallery 6.jpg"
        },
        'playzonia': {
          name: "Playzonia Kids Play Area",
          titleLine1: "Playzonia: A Safe and Playful",
          titleLine2: "World Built Just ",
          titleLine2Black: "For Little Ones",
          titleLine3: "in Surat",
          description: "We created a soft play area in Surat where small children can climb, bounce, and explore freely — in a space designed around their safety and their fun.",
          type: "Soft Play Area",
          category: "Soft Play",
          city: "Surat",
          state: "Gujarat",
          area: "1,500 sq. ft.",
          clientWanted1: "The client came to us with one clear vision to create a kids play area in Surat. Not just a room with a few toys, but a real space where young children could play, laugh, and move around freely — and where parents could bring them without a single worry.",
          clientWanted2: "For them, safety and comfort mattered above everything. They wanted a place families would trust and keep coming back to.",
          solution1: "At Winera International, we designed and built the entire soft play area from the ground up shaping it completely around what young children need.",
          solution2: "Everything started with safety. We used soft, cushioned flooring so falls never hurt, and chose play structures with smooth, rounded edges that little hands and feet could enjoy without risk. From there, we added the fun gentle slides, climbing sections, and soft play elements that keep children active and curious. We also thought about the parents. The space was kept open and easy to see across, so parents could relax nearby while still keeping their little ones in sight at all times. The outcome is a warm, cheerful space that feels made for children — a place where kids lose track of time having fun, and parents feel completely at ease letting them play.",
          img: projSoft1,
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
          type: "Bowling Alley",
          category: "Bowling",
          city: "Surat",
          state: "Gujarat",
          area: "4,800 sq. ft.",
          clientWanted1: "The client wanted a bowling alley at AR Mall in Surat that would draw crowds, look modern, and deliver a smooth bowling experience for both casual players and serious enthusiasts.",
          clientWanted2: "They required complete turnkey execution including lane setup, scoring systems, seating areas, and architectural lighting to create a premier entertainment destination.",
          solution1: "Winera International designed and installed a 4,800 sq. ft. bowling facility featuring professional synthetic lanes, pinsetters, automated scoring, and vibrant LED lighting.",
          solution2: "The layout maximizes lane throughput while providing spacious lounge areas for spectators and dining visitors, establishing LaneX as AR Mall's flagship entertainment anchor.",
          img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
          clientImg: projectImage3,
          solutionImg: projectImage4
        },
        'funfair': {
          name: "Funfair Game Zone",
          titleLine1: "Funfair: A 10,000 sq. ft.",
          titleLine2: "Complete Game ",
          titleLine2Black: "Zone Setup",
          titleLine3: "in Surat",
          description: "See how Winera International built Funfair a complete 10,000 sq. ft. game zone in Surat, planned and set up from start to finish.",
          type: "Game Zone",
          category: "Game Zones",
          city: "Surat",
          state: "Gujarat",
          area: "10,000 sq. ft.",
          clientWanted1: "The client wanted a high-throughput 10,000 sq. ft. game zone featuring a mix of arcade simulators, redemption machines, VR games, and bumper cars.",
          clientWanted2: "They needed a partner to handle 3D layout planning, electrical load distribution, machine sourcing, and complete installation on schedule.",
          solution1: "We executed Funfair as a comprehensive turnkey project, arranging 40+ attraction units into high-energy zones designed for optimal footfall flow.",
          solution2: "The result is a bustling family entertainment center in Surat that delivers high revenue per square foot and maximum visitor satisfaction.",
          img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
          clientImg: projNeon1,
          solutionImg: projectImage4
        }
      };

      const knownProj = (Array.isArray(formData.projectItems) ? formData.projectItems : []).find(p => p.slug === projSlug || p.id === projSlug) || projectCaseStudiesDefaults[projSlug] || {};

      const defaultProjectItem = {
        name: projTitle,
        category: currentItem.category || knownProj.category || 'Game Zones',
        type: currentItem.type || knownProj.type || 'Game Zone Setup',
        city: currentItem.city || knownProj.city || 'Surat',
        state: currentItem.state || knownProj.state || 'Gujarat',
        area: currentItem.area || knownProj.area || '5,000 sq. ft.',
        slug: projSlug,
        img: currentItem.img || currentItem.imageUrl || knownProj.img || projectImage01,
        titleLine1: currentItem.titleLine1 || knownProj.titleLine1 || `${projTitle}: A`,
        titleLine2: currentItem.titleLine2 || knownProj.titleLine2 || 'Complete ',
        titleLine2Black: currentItem.titleLine2Black || knownProj.titleLine2Black || (currentItem.type || 'Game Zone Setup'),
        titleLine3: currentItem.titleLine3 || knownProj.titleLine3 || `in the Heart of ${currentItem.city || 'Surat'}`,
        description: currentItem.description || knownProj.description || 'How we designed and installed a professional entertainment facility with 3D space planning and turnkey execution.',
        clientWanted1: currentItem.clientWanted1 || knownProj.clientWanted1 || 'The client had an empty space and a clear vision to build a top-tier entertainment center.',
        clientWanted2: currentItem.clientWanted2 || knownProj.clientWanted2 || 'They wanted one partner to handle layout planning, machine installation, and final handover.',
        clientImg: currentItem.clientImg || currentItem.clientImageUrl || knownProj.clientImg || projectImage3,
        solution1: currentItem.solution1 || knownProj.solution1 || 'Winera International delivered the complete setup from start to finish, optimizing flow and high-energy zones.',
        solution2: currentItem.solution2 || knownProj.solution2 || 'The result is a bright, safe, and profitable entertainment venue ready for opening day.',
        solutionImg: currentItem.solutionImg || currentItem.solutionImageUrl || knownProj.solutionImg || projectImage4,
        galleryImages: Array.isArray(currentItem.galleryImages) && currentItem.galleryImages.length > 0
          ? currentItem.galleryImages
          : [
            currentItem.galleryImage1 || projectBlock1,
            currentItem.galleryImage2 || projectBlock2,
            currentItem.galleryImage3 || projectBlock3,
            currentItem.galleryImage4 || projectBlock1,
            currentItem.galleryImage5 || projectBlock2,
            currentItem.galleryImage6 || projectBlock3
          ].filter(Boolean),
        galleryImage1: (currentItem.galleryImages && currentItem.galleryImages[0]) || currentItem.galleryImage1 || projectBlock1,
        galleryImage2: (currentItem.galleryImages && currentItem.galleryImages[1]) || currentItem.galleryImage2 || projectBlock2,
        galleryImage3: (currentItem.galleryImages && currentItem.galleryImages[2]) || currentItem.galleryImage3 || projectBlock3,
        galleryImage4: (currentItem.galleryImages && currentItem.galleryImages[3]) || currentItem.galleryImage4 || projectBlock1,
        galleryImage5: (currentItem.galleryImages && currentItem.galleryImages[4]) || currentItem.galleryImage5 || projectBlock2,
        galleryImage6: (currentItem.galleryImages && currentItem.galleryImages[5]) || currentItem.galleryImage6 || projectBlock3,
        videoImg: currentItem.videoImg || currentItem.videoCoverUrl || projectSectionVideo,
        videoUrl: currentItem.videoUrl || currentItem.videoLink || 'https://wa.me/919157873576',
        buttonText: currentItem.buttonText || knownProj.buttonText || 'Get A Quote',
        buttonLink: currentItem.buttonLink || knownProj.buttonLink || 'https://wa.me/919157873576',
        waMessage: currentItem.waMessage || knownProj.waMessage || `Hello Winera International! I want to get a project quote for ${currentItem.name || projTitle || 'this project'}. Please share details. [Ref: Project Detail Page]`
      };

      const isCurrentActive = currentItem.isActive !== false && currentItem.status !== 'inactive';
      setModalItemData({
        ...defaultProjectItem,
        ...currentItem,
        isActive: isCurrentActive,
        status: isCurrentActive ? 'active' : 'inactive'
      });
      setIsModalOpen(true);
      return;
    }

    if (mode === 'edit') {
      const editData = { ...currentItem };
      if (sec === 'clientLogos' || sec === 'channelPartners') {
        editData.logoAlt = editData.logoAlt || '';
      }
      if (sec === 'builtProjects') {
        editData.imageUrl = editData.imageUrl || editData.img || '';
        editData.img = editData.imageUrl;
        editData.imgAlt = editData.imgAlt || '';
      }
      if (sec === 'testimonials') {
        editData.gameZoneName = editData.gameZoneName || editData.name || '';
        editData.reviewerRole = editData.reviewerRole || editData.role || '';
        editData.founderImage = editData.founderImage || editData.img || '';
        editData.founderImgAlt = editData.founderImgAlt || editData.imgAlt || '';
        editData.starRating = editData.starRating || editData.rating || 5;
        editData.youtubeVideoUrl = editData.youtubeVideoUrl || editData.videoUrl || '';
        editData.videoImg = editData.videoImg || editData.videoThumbnail || '';
        editData.videoImgAlt = editData.videoImgAlt || '';
        editData.quote = editData.quote || '';
      }
      setModalItemData(editData);
    } else {
      // Default empty structure based on active section
      if (sec === 'stats') setModalItemData({ number: '', label: '' });
      else if (sec === 'clientLogos') setModalItemData({ name: '', logoUrl: '', logoAlt: '' });
      else if (sec === 'channelPartners') setModalItemData({ name: '', logoUrl: '', logoAlt: '' });
      else if (sec === 'builtProjects') setModalItemData({ name: '', city: '', imageUrl: '', img: '', imgAlt: '' });
      else if (sec === 'projectItems') setModalItemData({
        name: 'New Turnkey Project',
        category: 'Game Zones',
        type: 'Game Zone Setup',
        city: 'Surat',
        state: 'Gujarat',
        area: '5,000 sq. ft.',
        slug: 'new-turnkey-project',
        isActive: true,
        status: 'active',
        img: projectImage01,
        imgAlt: '',
        titleLine1: 'New Project: A',
        titleLine2: 'Complete ',
        titleLine2Black: 'Game Zone Setup',
        titleLine3: 'in Surat',
        description: 'How we designed and installed a professional game zone facility with 3D space planning and turnkey execution.',
        clientWanted1: 'The client had an empty space and a clear vision to build a top-tier entertainment center.',
        clientWanted2: 'They wanted one partner to handle layout planning, machine installation, and final handover.',
        clientImg: projectImage3,
        clientImgAlt: '',
        solution1: 'Winera International delivered the complete setup from start to finish, optimizing flow and high-energy zones.',
        solution2: 'The result is a bright, safe, and profitable entertainment venue ready for opening day.',
        solutionImg: projectImage4,
        solutionImgAlt: '',
        galleryImages: [
          projectBlock1,
          projectBlock2,
          projectBlock3,
          projectBlock1,
          projectBlock2,
          projectBlock3
        ],
        galleryImage1: projectBlock1,
        galleryImage2: projectBlock2,
        galleryImage3: projectBlock3,
        galleryImage4: projectBlock1,
        galleryImage5: projectBlock2,
        galleryImage6: projectBlock3,
        videoImg: projectSectionVideo,
        videoUrl: 'https://wa.me/919157873576',
        buttonText: 'Get A Quote',
        buttonLink: 'https://wa.me/919157873576',
        waMessage: 'Hello Winera International! I want to get a project quote. Please share details. [Ref: Project Detail Page]'
      });
      else if (sec && sec.toLowerCase().includes('faq')) setModalItemData({ q: '', a: '' });
      else if (sec === 'testimonials') setModalItemData({ founderImage: '', founderImgAlt: '', gameZoneName: '', reviewerRole: '', starRating: 5, youtubeVideoUrl: '', videoImg: '', videoImgAlt: '', quote: '' });
      else setModalItemData({});
    }
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalItemData({});
    setEditingIndex(null);
    setModalTargetSection(null);
  };

  // Save Modal Item DIRECTLY to MongoDB Database
  const saveModalItem = async () => {
    const secKey = modalTargetSection || activeSection;
    let currentList = Array.isArray(formData[secKey]) ? [...formData[secKey]] : [];

    if (secKey === 'projectItems') {
      const defaultRawList = defaultProjectItemsList;
      if (currentList.length === 0) {
        currentList = [...defaultRawList];
      }

      const slugifyText = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const projName = modalItemData.name || 'New Project';
      let autoSlug = (modalItemData.slug && modalItemData.slug !== 'new-turnkey-project')
        ? slugifyText(modalItemData.slug)
        : slugifyText(projName);
      if (!autoSlug) autoSlug = 'project-' + Date.now();

      modalItemData.name = projName;
      modalItemData.slug = autoSlug;
      modalItemData.id = modalItemData.id && modalItemData.id !== 'new-turnkey-project' ? modalItemData.id : autoSlug;

      const isItemActiveVal = modalItemData.isActive !== false && modalItemData.status !== 'inactive';
      modalItemData.isActive = isItemActiveVal;
      modalItemData.status = isItemActiveVal ? 'active' : 'inactive';

      if (!modalItemData.titleLine1 || modalItemData.titleLine1.startsWith('New Project')) modalItemData.titleLine1 = `${projName}: A`;
      if (!modalItemData.titleLine2) modalItemData.titleLine2 = 'Complete ';
      if (!modalItemData.titleLine2Black) modalItemData.titleLine2Black = modalItemData.type || 'Game Zone Setup';
      if (!modalItemData.titleLine3) modalItemData.titleLine3 = `in ${modalItemData.city || 'India'}`;
      if (!modalItemData.metaTitle) modalItemData.metaTitle = `${projName} Setup in ${modalItemData.city || 'India'} | Winera International`;
      if (!modalItemData.metaDescription) modalItemData.metaDescription = `Explore ${projName} in ${modalItemData.city || 'India'} by Winera International. Complete turnkey entertainment setup.`;

      // Update local state for immediate UI feedback
      if (modalMode === 'add') {
        currentList.push(modalItemData);
      } else if (modalMode === 'edit') {
        const foundIdx = currentList.findIndex(x => x && (x.slug === autoSlug || x.id === autoSlug || (x.name && x.name.toLowerCase() === projName.toLowerCase())));
        if (foundIdx !== -1) {
          currentList[foundIdx] = modalItemData;
        } else if (editingIndex !== null && editingIndex >= 0 && editingIndex < currentList.length) {
          currentList[editingIndex] = modalItemData;
        } else {
          currentList.push(modalItemData);
        }
      }

      let updatedBuiltProjects = Array.isArray(formData.builtProjects) ? [...formData.builtProjects] : [];
      const bpIdx = updatedBuiltProjects.findIndex(b => (b.slug && (b.slug === autoSlug || b.slug === modalItemData.id)) || (b.name && b.name.toLowerCase() === projName.toLowerCase()));
      if (bpIdx !== -1) {
        updatedBuiltProjects[bpIdx] = {
          ...updatedBuiltProjects[bpIdx],
          img: modalItemData.img || modalItemData.imageUrl || updatedBuiltProjects[bpIdx].img,
          imageUrl: modalItemData.imageUrl || modalItemData.img || updatedBuiltProjects[bpIdx].imageUrl,
          imgAlt: modalItemData.imgAlt || updatedBuiltProjects[bpIdx].imgAlt,
          isActive: isItemActiveVal,
          status: isItemActiveVal ? 'active' : 'inactive'
        };
      }
      setFormData(prev => ({ ...prev, projectItems: currentList, builtProjects: updatedBuiltProjects }));
      closeModal();

      // Send ONLY THIS SINGLE PROJECT to backend payload!
      setLoadingSection('projectItems');
      try {
        await mutateContentItem({
          sectionKey: 'projectItems',
          action: modalMode === 'add' ? 'add' : 'update',
          item: modalItemData,
          matchKey: 'slug',
          matchValue: autoSlug,
          index: editingIndex
        }, admin.token);
        if (typeof refreshContent === 'function') await refreshContent(true, true);
        setStatusMsg(`Project '${projName}' saved directly to database!`);
      } catch (err) {
        console.error("Single project save error:", err);
        if (err.response?.status === 404) {
          try {
            await updateSectionContent('projectItems', currentList, admin.token);
            if (typeof refreshContent === 'function') await refreshContent(true, true);
            setStatusMsg(`Project '${projName}' saved directly to database!`);
            return;
          } catch (fbErr) {
            setStatusMsg('Database Save Error: ' + (fbErr.response?.data?.message || fbErr.message));
            return;
          }
        }
        setStatusMsg('Database Save Error: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoadingSection('');
      }
      return;
    }

    if (secKey === 'arcadeCategories') {
      const defaultCats = DEFAULT_ARCADE_CATEGORIES;
      const masterCards = arcadeMasterCards || [];

      let categoriesList = defaultCats;
      let cardsList = [...masterCards];

      if (formData.arcadeCategories) {
        if (Array.isArray(formData.arcadeCategories.cards) && formData.arcadeCategories.cards.length > 0) {
          const cmsMap = new Map();
          formData.arcadeCategories.cards.forEach(c => {
            const k = (c.slug || c.name || c.title || '').toLowerCase().trim();
            if (k) cmsMap.set(k, c);
          });
          cardsList = cardsList.map(mc => {
            const k = (mc.slug || mc.name || mc.title || '').toLowerCase().trim();
            return cmsMap.has(k) ? { ...mc, ...cmsMap.get(k) } : mc;
          });
          formData.arcadeCategories.cards.forEach(cc => {
            if (cc.isUserCreated) cardsList.unshift(cc);
          });
        }
        if (Array.isArray(formData.arcadeCategories.categoriesList)) categoriesList = [...formData.arcadeCategories.categoriesList];
      }

      const slugifyText = (text) => (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const cardTitle = modalItemData.title || modalItemData.name || 'New Arcade Product';
      const cleanSlug = (modalItemData.slug && modalItemData.slug !== 'new-arcade-game') ? modalItemData.slug : (slugifyText(cardTitle) || 'arcade-product');

      const cardItem = {
        ...modalItemData,
        isUserCreated: modalMode === 'add' ? true : Boolean(modalItemData.isUserCreated),
        name: cardTitle,
        title: cardTitle,
        slug: cleanSlug,
        nameBase: modalItemData.nameBase !== undefined ? modalItemData.nameBase : cardTitle,
        nameHighlight: modalItemData.nameHighlight || '',
        category: modalItemData.category || 'Arcade Games',
        tag: modalItemData.tag || 'Popular',
        tagline: modalItemData.tagline || '',
        desc: modalItemData.desc || '',
        img: modalItemData.img || modalItemData.imageUrl || '',
        gallery: (Array.isArray(modalItemData.gallery)
          ? modalItemData.gallery
          : [
            modalItemData.gallery1,
            modalItemData.gallery2,
            modalItemData.gallery3,
            modalItemData.gallery4,
            modalItemData.gallery5,
            modalItemData.gallery6
          ]
        ).map(s => (typeof s === 'string' ? s.trim() : '')).filter(Boolean),
        gallery1: (Array.isArray(modalItemData.gallery) ? modalItemData.gallery[0] : modalItemData.gallery1) || '',
        gallery2: (Array.isArray(modalItemData.gallery) ? modalItemData.gallery[1] : modalItemData.gallery2) || '',
        gallery3: (Array.isArray(modalItemData.gallery) ? modalItemData.gallery[2] : modalItemData.gallery3) || '',
        gallery4: (Array.isArray(modalItemData.gallery) ? modalItemData.gallery[3] : modalItemData.gallery4) || '',
        gallery5: (Array.isArray(modalItemData.gallery) ? modalItemData.gallery[4] : modalItemData.gallery5) || '',
        gallery6: (Array.isArray(modalItemData.gallery) ? modalItemData.gallery[5] : modalItemData.gallery6) || '',
        power: modalItemData.power || '880 W',
        voltage: modalItemData.voltage || '220v',
        specsCategory: modalItemData.specsCategory || modalItemData.category || 'Bike Racing Game',
        players: modalItemData.players || '2 Player',
        material: modalItemData.material || 'Imported Steel & ABS',
        width: modalItemData.width || '2140 mm',
        depth: modalItemData.depth || '2310 mm',
        height: modalItemData.height || '2490 mm',
        videoUrl: modalItemData.videoUrl || '',
        quoteUrl: modalItemData.quoteUrl || 'https://wa.me/919157873576',
        feature1Title: modalItemData.feature1Title !== undefined ? String(modalItemData.feature1Title).replace(/12\+/g, '15+') : '15+ Years of Expertise',
        feature1Desc: modalItemData.feature1Desc !== undefined ? modalItemData.feature1Desc : 'Proven experience delivering game zone projects across malls, hotels, schools, and resorts since 2014.',
        feature2Title: modalItemData.feature2Title !== undefined ? modalItemData.feature2Title : 'Quality & Safety Standards',
        feature2Desc: modalItemData.feature2Desc !== undefined ? modalItemData.feature2Desc : 'Every product sourced from global manufacturers and tested for commercial-grade safety and durability.',
        feature3Title: modalItemData.feature3Title !== undefined ? modalItemData.feature3Title : 'ROI-First Approach',
        feature3Desc: modalItemData.feature3Desc !== undefined ? modalItemData.feature3Desc : 'Every project begins with a free ROI report, revenue and break-even calculated before you invest.',
        feature4Title: modalItemData.feature4Title !== undefined ? modalItemData.feature4Title : 'Reliable Pan-India Service',
        feature4Desc: modalItemData.feature4Desc !== undefined ? modalItemData.feature4Desc : 'Our own team installs and supports every project across 50+ cities on time, every time.'
      };

      if (modalMode === 'add') {
        cardsList.unshift(cardItem);
      } else if (modalMode === 'edit' && editingIndex !== null) {
        cardsList[editingIndex] = cardItem;
      }

      if (cardItem.category && !categoriesList.includes(cardItem.category)) {
        categoriesList.push(cardItem.category);
      }

      setAdminProjectFilterCat("All");
      const cleanedCards = cardsList.map(c => ({
        ...c,
        slug: (c.slug && c.slug !== 'new-arcade-game') ? c.slug : (slugifyText(c.title || c.name) || 'arcade-game')
      }));
      const updated = { categoriesList, cards: cleanedCards };
      setFormData(prev => ({ ...prev, arcadeCategories: updated }));
      closeModal();

      // Send ONLY THIS SINGLE ARCADE PRODUCT to backend payload!
      setLoadingSection('arcadeCategories');
      try {
        await mutateContentItem({
          sectionKey: 'arcadeCategories',
          action: modalMode === 'add' ? 'add' : 'update',
          item: cardItem,
          matchKey: 'slug',
          matchValue: cleanSlug,
          index: editingIndex
        }, admin.token);
        if (typeof refreshContent === 'function') await refreshContent(true, true);
        setStatusMsg(`Product '${cardTitle}' saved directly to database!`);
      } catch (err) {
        console.error("Single arcade card save error:", err);
        if (err.response?.status === 404) {
          try {
            await persistSectionToDatabase('arcadeCategories', updated);
            if (typeof refreshContent === 'function') await refreshContent(true, true);
            setStatusMsg(`Product '${cardTitle}' saved directly to database!`);
            return;
          } catch (fbErr) {
            setStatusMsg('Database Save Error: ' + (fbErr.response?.data?.message || fbErr.message));
            return;
          }
        }
        setStatusMsg('Database Save Error: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoadingSection('');
      }
      return;
    }

    if (secKey === 'vrCategories' || secKey === 'vrRange') {
      const defaultVrCats = DEFAULT_VR_CATEGORIES;
      const masterCards = vrMasterCards || [];

      let categoriesList = defaultVrCats;
      let cardsList = [...masterCards];

      const vrSource = formData.vrCategories || formData.vrRange;
      if (vrSource) {
        if (Array.isArray(vrSource.cards) && vrSource.cards.length > 0) {
          const cmsMap = new Map();
          vrSource.cards.forEach(c => {
            const k = (c.slug || c.name || c.title || '').toLowerCase().trim();
            if (k) cmsMap.set(k, c);
          });
          cardsList = cardsList.map(mc => {
            const k = (mc.slug || mc.name || mc.title || '').toLowerCase().trim();
            return cmsMap.has(k) ? { ...mc, ...cmsMap.get(k) } : mc;
          });
          vrSource.cards.forEach(cc => {
            if (cc.isUserCreated) cardsList.unshift(cc);
          });
        }
        if (Array.isArray(vrSource.categoriesList) && vrSource.categoriesList.length > 0) {
          categoriesList = [...vrSource.categoriesList];
        }
      }

      const slugifyText = (text) => (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const cardTitle = modalItemData.title || modalItemData.name || 'New VR Game';
      const cleanSlug = (modalItemData.slug && modalItemData.slug !== 'new-vr-game') ? modalItemData.slug : (slugifyText(cardTitle) || 'vr-game');

      const cardItem = {
        ...modalItemData,
        isUserCreated: modalMode === 'add' ? true : Boolean(modalItemData.isUserCreated),
        name: cardTitle,
        title: cardTitle,
        slug: cleanSlug,
        nameBase: modalItemData.nameBase !== undefined ? modalItemData.nameBase : cardTitle,
        nameHighlight: modalItemData.nameHighlight || '',
        category: modalItemData.category || 'Bester VR',
        tag: modalItemData.tag || modalItemData.category || 'Bester VR',
        tagline: modalItemData.tagline || '',
        desc: modalItemData.desc || '',
        img: modalItemData.img || modalItemData.imageUrl || '',
        imageUrl: modalItemData.img || modalItemData.imageUrl || '',
        gallery: (Array.isArray(modalItemData.gallery)
          ? modalItemData.gallery
          : [
            modalItemData.gallery1,
            modalItemData.gallery2,
            modalItemData.gallery3,
            modalItemData.gallery4
          ]
        ).map(s => (typeof s === 'string' ? s.trim() : '')).filter(Boolean),
        gallery1: (Array.isArray(modalItemData.gallery) ? modalItemData.gallery[0] : modalItemData.gallery1) || '',
        gallery2: (Array.isArray(modalItemData.gallery) ? modalItemData.gallery[1] : modalItemData.gallery2) || '',
        gallery3: (Array.isArray(modalItemData.gallery) ? modalItemData.gallery[2] : modalItemData.gallery3) || '',
        gallery4: (Array.isArray(modalItemData.gallery) ? modalItemData.gallery[3] : modalItemData.gallery4) || '',
        power: modalItemData.power || '',
        voltage: modalItemData.voltage || '220V / 110V',
        specsCategory: modalItemData.specsCategory || modalItemData.category || 'VR Game',
        players: modalItemData.players || '1',
        weight: modalItemData.weight || '',
        maxLoad: modalItemData.maxLoad || '',
        games: modalItemData.games || '',
        helmet: modalItemData.helmet || 'DP',
        material: modalItemData.material || 'Commercial Heavy-Duty Steel & High-Gloss Fiberglass',
        dimensions: modalItemData.dimensions || '',
        width: modalItemData.width || '',
        depth: modalItemData.depth || '',
        height: modalItemData.height || '',
        videoUrl: modalItemData.videoUrl || '',
        quoteUrl: modalItemData.quoteUrl || `https://wa.me/919157873576?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20${encodeURIComponent(cardTitle)}`
      };

      if (modalMode === 'add') {
        cardsList.unshift(cardItem);
      } else if (modalMode === 'edit' && editingIndex !== null) {
        cardsList[editingIndex] = cardItem;
      }

      if (cardItem.category && !categoriesList.includes(cardItem.category)) {
        categoriesList.push(cardItem.category);
      }

      setAdminVrFilterCat("All");
      const cleanedCards = cardsList.map(c => ({
        ...c,
        slug: (c.slug && c.slug !== 'new-vr-game') ? c.slug : (slugifyText(c.title || c.name) || 'vr-game')
      }));
      const updated = { categoriesList, cards: cleanedCards };
      setFormData(prev => ({ ...prev, vrCategories: updated, vrRange: updated }));
      closeModal();

      const token = admin?.token || (() => {
        try {
          const stored = JSON.parse(localStorage.getItem('winera_admin') || '{}');
          return stored?.token || '';
        } catch { return ''; }
      })();

      setLoadingSection(secKey);
      try {
        await mutateContentItem({
          sectionKey: secKey,
          action: modalMode === 'add' ? 'add' : 'update',
          item: cardItem,
          matchKey: 'slug',
          matchValue: cleanSlug,
          index: editingIndex
        }, token);
        if (typeof refreshContent === 'function') await refreshContent(true, true);
        setStatusMsg(`VR Product '${cardTitle}' saved directly to database!`);
      } catch (err) {
        console.error("Single VR card save error:", err);
        try {
          await persistSectionToDatabase(secKey, updated);
          if (typeof refreshContent === 'function') await refreshContent(true, true);
          setStatusMsg(`VR Product '${cardTitle}' saved directly to database!`);
        } catch (fbErr) {
          setStatusMsg('Database Save Error: ' + (fbErr.response?.data?.message || fbErr.message));
        }
      } finally {
        setLoadingSection('');
      }
      return;
    }

    if (secKey === 'bowlingFaqs' && currentList.length < 8) {
      currentList = [...defaultBowlingFaqs];
    }

    if (secKey === 'stats') {
      const defaultHomeStats = [
        { number: "14+", label: "YEARS OF EXPERIENCE" },
        { number: "200+", label: "Project Completed" },
        { number: "98%", label: "Happy Clients" },
        { number: "50+", label: "Cities Covered" }
      ];
      if (!Array.isArray(formData.stats) || formData.stats.length === 0) {
        currentList = [...defaultHomeStats];
      } else {
        currentList = [...formData.stats];
      }
    }

    if (secKey === 'testimonials') {
      const defaultTestimonialsList = [
        {
          gameZoneName: "Rebounce Game Zone",
          name: "Rebounce Game Zone",
          reviewerRole: "Surat",
          role: "Surat",
          starRating: 5,
          rating: 5,
          youtubeVideoUrl: "https://www.youtube.com/shorts/YNrfGqhhl5w",
          videoUrl: "https://www.youtube.com/shorts/YNrfGqhhl5w",
          founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/uanfdgdjqntkeaqm8d9u.webp",
          img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/uanfdgdjqntkeaqm8d9u.webp",
          videoImg: "https://img.youtube.com/vi/YNrfGqhhl5w/sddefault.jpg",
          videoThumbnail: "https://img.youtube.com/vi/YNrfGqhhl5w/sddefault.jpg",
          quote: "When we were planning Rebounce we had the space and the budget but no idea how to turn it into a game zone. Winera International Pvt. Ltd. made the entire process effortless. One meeting was enough. We shared our requirements and they handled everything from game selection and layout design to complete installation. The result speaks for itself Rebounce today is a thriving game zone and our customers keep coming back."
        },
        {
          gameZoneName: "Fun Houze",
          name: "Fun Houze",
          reviewerRole: "Surat",
          role: "Surat",
          starRating: 5,
          rating: 5,
          youtubeVideoUrl: "https://youtube.com/shorts/YXhUJ1k6pbQ",
          videoUrl: "https://youtube.com/shorts/YXhUJ1k6pbQ",
          founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/q9p8mlpn0ws9f9vlrxhd.webp",
          img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/q9p8mlpn0ws9f9vlrxhd.webp",
          videoImg: "https://img.youtube.com/vi/YXhUJ1k6pbQ/sddefault.jpg",
          videoThumbnail: "https://img.youtube.com/vi/YXhUJ1k6pbQ/sddefault.jpg",
          quote: "Choosing the right gaming zone setup company in India was critical for us given our tight deadline. Winera International Pvt. Ltd. delivered everything as planned and on schedule. Fun Houze opening day went smoothly and the game zone setup was exactly as we discussed."
        },
        {
          gameZoneName: "Hulaboo Game Zone",
          name: "Hulaboo Game Zone",
          reviewerRole: "Surat",
          role: "Surat",
          starRating: 5,
          rating: 5,
          youtubeVideoUrl: "https://youtube.com/shorts/Jvtsn-TxVqE",
          videoUrl: "https://youtube.com/shorts/Jvtsn-TxVqE",
          founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877032/winera_uploads/projects/jvr2xtu8jszcmzaglxmr.jpg",
          img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877032/winera_uploads/projects/jvr2xtu8jszcmzaglxmr.jpg",
          videoImg: "https://img.youtube.com/vi/Jvtsn-TxVqE/sddefault.jpg",
          videoThumbnail: "https://img.youtube.com/vi/Jvtsn-TxVqE/sddefault.jpg",
          quote: "To be honest before starting Hulaboo we had visited multiple game zone setup companies and was confused about who to trust. When we finally met Winera International Pvt. Ltd. the clarity they gave us from day one was different. They explained the entire process, showed us real projects and gave us a transparent quote. That confidence is what made us sign. And they delivered exactly what they promised."
        },
        {
          gameZoneName: "House of Pepe",
          name: "House of Pepe",
          reviewerRole: "Surat",
          role: "Surat",
          starRating: 5,
          rating: 5,
          youtubeVideoUrl: "https://youtube.com/shorts/lf1VMqxFvR0",
          videoUrl: "https://youtube.com/shorts/lf1VMqxFvR0",
          founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360320/winera_uploads/etpnimwouc6kknkwqzpd.webp",
          img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360320/winera_uploads/etpnimwouc6kknkwqzpd.webp",
          videoImg: "https://img.youtube.com/vi/lf1VMqxFvR0/sddefault.jpg",
          videoThumbnail: "https://img.youtube.com/vi/lf1VMqxFvR0/sddefault.jpg",
          quote: "Combining soft play and arcade under one roof was our vision but we had no idea how to execute it. We needed a reliable soft play equipment manufacturer in India who could also handle the arcade side. Winera International Pvt. Ltd. designed the House of Pepe layout perfectly; both zones feel different but connected. Customers enjoy both sections equally."
        }
      ];
      if (!Array.isArray(formData.testimonials) || formData.testimonials.length === 0) {
        currentList = [...defaultTestimonialsList];
      } else {
        currentList = [...formData.testimonials];
      }

      // Synchronize both sets of field names so user side and admin side always see identical data
      const gzName = modalItemData.gameZoneName || modalItemData.name || 'Game Zone';
      const rRole = modalItemData.reviewerRole || modalItemData.role || 'Surat';
      const fImg = modalItemData.founderImage || modalItemData.img || '';
      const vUrl = modalItemData.youtubeVideoUrl || modalItemData.videoUrl || '';
      const sRating = Number(modalItemData.starRating || modalItemData.rating || 5);
      const qText = modalItemData.quote || '';
      let vImg = modalItemData.videoImg || modalItemData.videoThumbnail || '';
      if (!vImg && vUrl) {
        const match = vUrl.trim().match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/))([^"&?\/\s]{11})/i);
        if (match && match[1]) {
          vImg = `https://img.youtube.com/vi/${match[1]}/sddefault.jpg`;
        }
      }

      modalItemData.gameZoneName = gzName;
      modalItemData.name = gzName;
      modalItemData.reviewerRole = rRole;
      modalItemData.role = rRole;
      modalItemData.founderImage = fImg;
      modalItemData.img = fImg;
      modalItemData.youtubeVideoUrl = vUrl;
      modalItemData.videoUrl = vUrl;
      modalItemData.starRating = sRating;
      modalItemData.rating = sRating;
      modalItemData.quote = qText;
      modalItemData.videoImg = vImg;
      modalItemData.videoThumbnail = vImg;
      modalItemData.founderImgAlt = modalItemData.founderImgAlt || modalItemData.imgAlt || '';
      modalItemData.videoImgAlt = modalItemData.videoImgAlt || '';
    }

    if (secKey === 'builtProjects') {
      const pImg = modalItemData.imageUrl || modalItemData.img || '';
      const pName = modalItemData.name || modalItemData.title || 'New Game Zone';
      const pCity = modalItemData.city || '';
      modalItemData.name = pName;
      modalItemData.title = pName;
      modalItemData.city = pCity;
      modalItemData.location = modalItemData.location || (pCity ? `${pCity}` : '');
      modalItemData.imageUrl = pImg;
      modalItemData.img = pImg;
      modalItemData.imgAlt = modalItemData.imgAlt || '';
      modalItemData.slug = modalItemData.slug || pName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    if (secKey === 'clientLogos' || secKey === 'channelPartners') {
      modalItemData.logoAlt = modalItemData.logoAlt || '';
    }

    if (modalMode === 'add') {
      currentList.push(modalItemData);
    } else if (modalMode === 'edit' && editingIndex !== null) {
      currentList[editingIndex] = modalItemData;
    }
    setFormData(prev => ({ ...prev, [secKey]: currentList }));
    closeModal();
    await persistSectionToDatabase(secKey, currentList);
  };


  // Handle File Upload inside Modal
  const handleModalFileUpload = async (e, field, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatusMsg('Uploading image to server...');
    try {
      const res = await uploadImageFile(file, admin?.token);
      if (typeof index === 'number' && field === 'gallery') {
        setModalItemData(prev => {
          const list = Array.isArray(prev.gallery) ? [...prev.gallery] : [];
          list[index] = res.url;
          return {
            ...prev,
            gallery: list,
            [`gallery${index + 1}`]: res.url
          };
        });
      } else {
        setModalItemData(prev => {
          const updated = { ...prev, [field]: res.url };
          if (field === 'img') updated.imageUrl = res.url;
          if (field === 'imageUrl') updated.img = res.url;
          if (field === 'founderImage') updated.img = res.url;
          if (field === 'videoImg') updated.videoThumbnail = res.url;
          if (field === 'videoThumbnail') updated.videoImg = res.url;
          if (field === 'clientImg') updated.clientImageUrl = res.url;
          if (field === 'clientImageUrl') updated.clientImg = res.url;
          if (field === 'solutionImg') updated.solutionImageUrl = res.url;
          if (field === 'solutionImageUrl') updated.solutionImg = res.url;
          return updated;
        });
      }
      setStatusMsg('Image uploaded successfully to server!');
    } catch (err) {
      setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
    }
  };



  return (
    <div style={{ height: '100vh', backgroundColor: '#F5F5F9', color: '#0f172a', display: 'flex', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box !important;
        }

        body, html, #root {
          overflow-x: hidden !important;
          width: 100% !important;
        }

        /* Standardize File Inputs */
        input[type="file"] {
          max-width: 100% !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
          font-size: 11px !important;
          box-sizing: border-box !important;
        }

        /* Responsive Layout Overrides for Admin Panel */
        @media (max-width: 992px) {
          .winera-admin-sidebar {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            height: 100vh !important;
            z-index: 99999 !important;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
            box-shadow: 0 0 40px rgba(0,0,0,0.5) !important;
          }
          .winera-admin-sidebar.mobile-open {
            transform: translateX(0) !important;
          }
          .winera-admin-main {
            padding: 10px 6px 50px 6px !important;
            width: 100% !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }
          .winera-admin-topheader {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 10px !important;
            padding: 12px 14px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .winera-admin-hamburger-btn {
            display: inline-flex !important;
          }
          .winera-admin-card {
            padding: 14px 10px !important;
            border-radius: 14px !important;
            gap: 12px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }
          .winera-admin-flex-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
            width: 100% !important;
          }
          .winera-admin-grid-2col {
            grid-template-columns: 1fr !important;
          }
          img, video, iframe {
            max-width: 100% !important;
            height: auto !important;
          }
          table {
            display: block !important;
            width: 100% !important;
            overflow-x: auto !important;
          }
          .winera-admin-modal-box {
            width: 96vw !important;
            max-width: 96vw !important;
            margin: 6px auto !important;
            max-height: 92vh !important;
            padding: 14px 10px !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }

          /* Force all text inputs, textareas, and selects to 100% width with compact padding on mobile */
          input[type="text"], input[type="number"], input[type="email"], input[type="tel"], input[type="password"], input[type="url"], textarea, select {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            padding: 8px 10px !important;
            font-size: 13px !important;
          }

          /* Force inline grids to collapse to 1 column on screens <= 992px */
          div[style*="gridTemplateColumns"],
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }

          /* Ensure flex containers wrap properly */
          div[style*="display: flex"],
          div[style*="display:flex"] {
            flex-wrap: wrap !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }

          /* Compact inner padding for sub-cards and sub-containers on mobile */
          div[style*="padding: 18px"],
          div[style*="padding: 20px"],
          div[style*="padding: 24px"],
          div[style*="padding: 30px"],
          div[style*="padding:18px"],
          div[style*="padding:20px"],
          div[style*="padding:24px"],
          div[style*="padding:30px"],
          div[style*="padding: 16px"],
          div[style*="padding:16px"] {
            padding: 12px 10px !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }

          /* Fix Top Header Badge text cutoff */
          .winera-admin-topheader span[style*="border-radius"] {
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            font-size: 11px !important;
            padding: 4px 10px !important;
          }
        }

        @media (max-width: 480px) {
          .winera-admin-main {
            padding: 8px 4px 40px 4px !important;
          }
          .winera-admin-card {
            padding: 12px 8px !important;
            border-radius: 12px !important;
          }
          .winera-admin-modal-box {
            padding: 12px 6px !important;
          }
          h3 {
            font-size: 1.05rem !important;
          }
          h4 {
            font-size: 0.9rem !important;
          }
          button {
            max-width: 100% !important;
            white-space: normal !important;
            word-break: break-word !important;
          }
        }

        @media (min-width: 993px) {
          .winera-admin-hamburger-btn {
            display: none !important;
          }
        }
      `}</style>

      {/* MOBILE BACKDROP OVERLAY */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 99998
          }}
        />
      )}

      {/* SIDEBAR NAVIGATION (RESPONSIVE OFF-CANVAS DRAWER ON MOBILE) */}
      <aside className={`winera-admin-sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`} style={{
        width: '280px',
        height: '100vh',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        overflowY: 'auto'
      }}>
        <div>
          {/* Brand Logo & Title Header */}
          <div style={{ padding: '24px 20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: '#38bdf8',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '18px'
              }}>
                W
              </div>
              <div>
                <h2 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#ffffff', margin: 0, letterSpacing: '-0.3px' }}>
                  Winera Admin
                </h2>
                <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '700' }}>
                  CMS Content Manager
                </span>
              </div>
            </div>
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="winera-admin-hamburger-btn"
              style={{
                background: '#1e293b',
                color: '#cbd5e1',
                border: 'none',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer'
              }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          {/* Navigation Links */}
          <div style={{ padding: '20px 16px' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '900',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: '12px',
              paddingLeft: '12px'
            }}>
              Pages & Sections
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.keys(navigationMenu).map((pageKey) => {
                const item = navigationMenu[pageKey];
                const isSelected = selectedPage === pageKey;

                return (
                  <div key={pageKey} style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Main Page Category Switcher */}
                    <button
                      onClick={() => {
                        setSelectedPage(pageKey);
                        if (item.sections && item.sections.length > 0) {
                          setActiveSection(item.sections[0].id);
                        }
                        setIsMobileSidebarOpen(false); // Hide menu drawer on mobile when clicked!
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '14px',
                        border: 'none',
                        background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                        color: isSelected ? '#38bdf8' : '#94a3b8',
                        fontWeight: isSelected ? '800' : '600',
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <span style={{
                        fontSize: '11px',
                        background: isSelected ? '#38bdf8' : '#1e293b',
                        color: isSelected ? '#ffffff' : '#64748b',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontWeight: '800'
                      }}>
                        {item.sections.length}
                      </span>
                    </button>

                    {/* Sub-sections accordions */}
                    {isSelected && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        marginTop: '6px',
                        marginBottom: '12px',
                        paddingLeft: '24px',
                        borderLeft: '2px solid rgba(56, 189, 248, 0.3)',
                        marginLeft: '16px'
                      }}>
                        {item.sections.map((sec) => {
                          const isSecActive = activeSection === sec.id;
                          return (
                            <button
                              key={sec.id}
                              onClick={() => {
                                setActiveSection(sec.id);
                                setIsMobileSidebarOpen(false); // Hide menu drawer on mobile when clicked!
                              }}
                              style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '8px 12px',
                                borderRadius: '10px',
                                border: 'none',
                                background: isSecActive ? '#38bdf8' : 'transparent',
                                color: isSecActive ? '#ffffff' : '#cbd5e1',
                                fontWeight: isSecActive ? '800' : '500',
                                fontSize: '12.5px',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {sec.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer Details & Quick Action Controls */}
        <div style={{ padding: '20px 16px', borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={handleSyncSitemap}
            disabled={isSyncingSitemap}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '12px',
              background: '#f0fdf4',
              border: '1px solid #86efac',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '12.5px',
              fontWeight: '800',
              cursor: isSyncingSitemap ? 'wait' : 'pointer',
              marginBottom: '8px',
              transition: 'all 0.2s ease'
            }}
            title="Sitemap updates automatically on every save. Click to force a full re-sync anytime."
          >
            <RefreshCw style={{ width: '15px', height: '15px', animation: isSyncingSitemap ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isSyncingSitemap ? 'Syncing...' : '⚡ Sync Sitemap (SEO)'}</span>
          </button>

          <Link
            to="/"
            target="_blank"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '12px',
              background: '#1e293b',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '12.5px',
              fontWeight: '800',
              textDecoration: 'none'
            }}
          >
            <ExternalLink style={{ width: '16px', height: '16px' }} />
            <span>View Live Website</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '12px',
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '12.5px',
              fontWeight: '800',
              cursor: 'pointer'
            }}
          >
            <LogOut style={{ width: '16px', height: '16px' }} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT EDIT AREA */}
      <main className="winera-admin-main" style={{ flex: 1, height: '100vh', padding: '30px 36px', overflowY: 'auto' }}>
        {/* Dynamic Current Breadcrumb Path & Section Info */}
        {(() => {
          const currentNavPage = navigationMenu[selectedPage];
          let matchedPageTitle = currentNavPage?.label || selectedPage.replace(/([A-Z])/g, ' $1').replace('_', ' ');
          let currentNavSection = currentNavPage?.sections?.find(s => s.id === activeSection);

          if (!currentNavSection) {
            for (const pKey of Object.keys(navigationMenu)) {
              const s = navigationMenu[pKey]?.sections?.find(sec => sec.id === activeSection);
              if (s) {
                currentNavSection = s;
                matchedPageTitle = navigationMenu[pKey]?.label || pKey;
                break;
              }
            }
          }

          const currentSectionTitle = currentNavSection?.name || activeSection;

          return (
            <>
              {/* Mobile Top Navigation Toggle Bar */}
              <div className="winera-admin-hamburger-btn" style={{ marginBottom: '16px', width: '100%' }}>
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: '14px',
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: '13.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.2)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Menu style={{ width: '20px', height: '20px', color: '#38bdf8' }} />
                    <span>Open Pages & Sections Menu</span>
                  </div>
                  <span style={{ background: '#38bdf8', color: '#fff', fontSize: '11px', padding: '3px 10px', borderRadius: '10px' }}>
                    {matchedPageTitle}
                  </span>
                </button>
              </div>

              {/* Top Header Card: Proper Breadcrumb Path & Section Title */}
              <div className="winera-admin-topheader" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '28px',
                background: '#ffffff',
                padding: '24px 32px',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ width: '100%' }}>
                  {/* Proper Breadcrumb Navigation Trail */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    color: '#64748b',
                    marginBottom: '10px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Home style={{ width: '13px', height: '13px', color: '#94a3b8' }} /> CMS Admin
                    </span>
                    <span style={{ color: '#cbd5e1', fontWeight: '900' }}>›</span>
                    <span style={{
                      background: '#e0f2fe',
                      color: '#0284c7',
                      fontSize: '11.5px',
                      fontWeight: '900',
                      padding: '3px 10px',
                      borderRadius: '8px',
                      letterSpacing: '0.2px'
                    }}>
                      {matchedPageTitle}
                    </span>
                    <span style={{ color: '#cbd5e1', fontWeight: '900' }}>›</span>
                    <span style={{
                      color: '#0f172a',
                      fontWeight: '800',
                      fontSize: '12px',
                      background: '#f8fafc',
                      padding: '3px 10px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      {currentSectionTitle}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
                    <h1 style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span>{currentSectionTitle}</span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        color: '#64748b',
                        background: '#f1f5f9',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        fontFamily: 'monospace'
                      }}>
                        #{activeSection}
                      </span>
                    </h1>
                  </div>

                  <p style={{ color: '#64748b', fontSize: '12.5px', fontWeight: '500', marginTop: '6px', margin: '6px 0 0' }}>
                    Add, edit, or delete items. Changes save automatically directly into MongoDB database.
                  </p>
                </div>
              </div>
            </>
          );
        })()}

        {/* Floating Top-Right Success / Status Toast Notification */}
        {statusMsg && (
          <>
            <style>{`
              @keyframes toastSlideIn {
                from { transform: translateX(100%) scale(0.9); opacity: 0; }
                to { transform: translateX(0) scale(1); opacity: 1; }
              }
            `}</style>
            <div style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              zIndex: 9999,
              background: statusMsg.toLowerCase().includes('error') ? '#ef4444' : '#10b981',
              color: '#ffffff',
              padding: '14px 22px',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: '800',
              boxShadow: statusMsg.toLowerCase().includes('error')
                ? '0 12px 30px rgba(239, 68, 68, 0.4)'
                : '0 12px 30px rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              maxWidth: '420px',
              animation: 'toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transition: 'all 0.3s ease'
            }}>
              <CheckCircle style={{ width: '20px', height: '20px', flexShrink: 0 }} />
              <span style={{ flex: 1, lineHeight: '1.4' }}>{statusMsg}</span>
              <button
                onClick={() => setStatusMsg('')}
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  border: 'none',
                  color: '#ffffff',
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '900',
                  marginLeft: '8px'
                }}
                title="Close"
              >
                ✕
              </button>
            </div>
          </>
        )}

        {/* DYNAMIC EDIT FORM PANELS */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
          border: '1px solid #e2e8f0'
        }}>
          {/* LEAD INQUIRIES MANAGEMENT PANEL */}
          {selectedPage === 'leads' && (
            <LeadManagementSection
              siteData={formData}
              onUpdateSiteData={async (sectionKey, updatedData) => {
                setFormData(prev => ({ ...prev, [sectionKey]: updatedData }));
                await updateSectionContent(sectionKey, updatedData);
              }}
              authToken={admin?.token || (() => {
                try {
                  return JSON.parse(localStorage.getItem('winera_admin') || '{}')?.token;
                } catch {
                  return null;
                }
              })()}
            />
          )}

          {/* HOME PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'home' || ['hero', 'stats', 'aboutHome', 'productsHome', 'partnerHome', 'industries', 'processHome', 'clientLogos', 'builtProjects', 'channelPartners', 'whyChooseUs', 'testimonials', 'faqs', 'ctaBanner'].includes(activeSection)) && (
            <HomeDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              openModal={openModal}
              handleDeleteItem={handleDeleteItem}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* ARCADE GAME PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'arcade' || ['arcadeHero', 'arcadeIntro', 'arcadeCategories', 'arcadeCommercial', 'arcadeWhyUs', 'arcadeCta', 'arcadeFaqs'].includes(activeSection)) && (
            <ArcadeDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              openModal={openModal}
              handleDeleteItem={handleDeleteItem}
              admin={admin}
              setStatusMsg={setStatusMsg}
              setLoadingSection={setLoadingSection}
              refreshContent={refreshContent}
              setDeleteConfirmModal={setDeleteConfirmModal}
              arcadeMasterCards={arcadeMasterCards}
              adminProjectFilterCat={adminProjectFilterCat}
              setAdminProjectFilterCat={setAdminProjectFilterCat}
              adminArcadeSearch={adminArcadeSearch}
              setAdminArcadeSearch={setAdminArcadeSearch}
              adminArcadePage={adminArcadePage}
              setAdminArcadePage={setAdminArcadePage}
              newCategoryInput={newCategoryInput}
              setNewCategoryInput={setNewCategoryInput}
            />
          )}

          {/* RELATED PRODUCTS SECTION FORM (GENERIC FOR ALL PAGES) */}
          {(activeSection.endsWith('Related') || activeSection.includes('Related')) && (() => {
            const defaultList = [
              { title: "Arcade Games", link: "/product/arcade-games", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882222/winera_uploads/psq0lwhhp7kdasz18mhg.jpg", isActive: true, status: 'active' },
              { title: "VR Games", link: "/product/vr-games", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881945/winera_uploads/ciltspbpf3nwcvcbu16m.jpg", isActive: true, status: 'active' },
              { title: "AR Games", link: "/product/ar-games", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881961/winera_uploads/ucij9ckzxnlpskx6n0hj.png", isActive: true, status: 'active' },
              { title: "Bowling Alley", link: "/product/bowling-alley", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881975/winera_uploads/bj0fjmjyi9ogxwme3hqc.jpg", isActive: true, status: 'active' },
              { title: "Trampoline Park", link: "/product/trampoline-park", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881999/winera_uploads/yx5bfvbaexcazrkt331g.jpg", isActive: true, status: 'active' },
              { title: "Soft Play", link: "/product/soft-play", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882021/winera_uploads/sxlzfslbp7mmm3avg0vq.jpg", isActive: true, status: 'active' },
              { title: "Bumper Cars", link: "/product/bumper-car", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882033/winera_uploads/goun29t9b7kopvwkfze9.jpg", isActive: true, status: 'active' },
              { title: "Hypergrid", link: "/product/hypergrid", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882049/winera_uploads/jxgltybqdkbolwzlzcar.jpg", isActive: true, status: 'active' },
              { title: "Laser Tag", link: "/product/laser-tag", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882062/winera_uploads/y7nkbq60c8siqqatkr36.jpg", isActive: true, status: 'active' },
              { title: "Amusement Park", link: "/product/amusement-park", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882084/winera_uploads/tgofoefcimwe14lmqrso.jpg", isActive: true, status: 'active' },
              { title: "Lights", link: "/product/lights", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791892550/winera_uploads/xzgzyyd26y9sukeicpd1.jpg", isActive: false, status: 'inactive' },
              { title: "Sculpture", link: "/product/sculpture", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791893113/winera_uploads/llle0ckzymanfgvegqmw.jpg", isActive: false, status: 'inactive' },
              { title: "Reception Table", link: "/product/reception-table", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791892969/winera_uploads/uswx6jond0sb102zq1k9.jpg", isActive: false, status: 'inactive' }
            ];

            const rawItemsList = (Array.isArray(formData[activeSection]?.items) && formData[activeSection].items.length > 0)
              ? formData[activeSection].items
              : defaultList;

            const itemsList = rawItemsList.map(it => {
              const clean = (it.title || '').trim().toLowerCase();
              let img = it.img;
              if (clean === 'lights' && (!img || img.includes('images.unsplash.com') || img.includes('1508739773434'))) {
                img = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791892550/winera_uploads/xzgzyyd26y9sukeicpd1.jpg";
              } else if (clean === 'sculpture' && (!img || img.includes('r9m4zijctdjvzmbueeze'))) {
                img = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791893113/winera_uploads/llle0ckzymanfgvegqmw.jpg";
              } else if (clean === 'reception table' && (!img || img.includes('images.unsplash.com') || img.includes('1497366216548'))) {
                img = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791892969/winera_uploads/uswx6jond0sb102zq1k9.jpg";
              }

              // Determine active status: default Lights, Sculpture, Reception Table to false unless explicitly set true
              const isDefaultInactive = clean === 'lights' || clean === 'sculpture' || clean === 'reception table';
              let isActive = it.isActive;
              let status = it.status;
              if (isActive === undefined && !status) {
                isActive = !isDefaultInactive;
                status = isDefaultInactive ? 'inactive' : 'active';
              } else {
                isActive = isActive !== false && status !== 'inactive';
                status = isActive ? 'active' : 'inactive';
              }

              // Normalize link to /product/
              const rawLink = it.link || '';
              const normalizedLink = rawLink.startsWith('/products/')
                ? rawLink.replace(/^\/products\//, '/product/')
                : rawLink;

              return { ...it, img, isActive, status, link: normalizedLink };
            });

            const handleAddItem = () => {
              const updated = [...itemsList, { title: "New Product", link: "/product/new-product", img: "", isActive: true, status: 'active' }];
              const updatedSection = { ...(formData[activeSection] || {}), items: updated };
              setFormData(prev => ({ ...prev, [activeSection]: updatedSection }));
            };

            const handleDeleteItem = (idxToDelete) => {
              setDeleteConfirmModal({
                title: 'Delete Related Product Card?',
                message: `Are you sure you want to delete '${itemsList[idxToDelete]?.title || `Card #${idxToDelete + 1}`}'?`,
                onConfirm: async () => {
                  const updated = itemsList.filter((_, i) => i !== idxToDelete);
                  const updatedSection = { ...(formData[activeSection] || {}), items: updated };
                  setFormData(prev => ({ ...prev, [activeSection]: updatedSection }));
                  await persistSectionToDatabase(activeSection, updatedSection);
                }
              });
            };

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Related Products Carousel Section</h3>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Section Title (Use *word* for Cyan Highlight)
                  </label>
                  <input
                    type="text"
                    value={formData[activeSection]?.title || '*Related* Products'}
                    onChange={(e) => handleFieldChange(activeSection, 'title', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>

                {/* Product Cards List */}
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Product Category Cards & Cover Images</h4>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      style={{
                        background: '#38bdf8',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(56, 189, 248, 0.3)'
                      }}
                    >
                      <Plus style={{ width: '15px', height: '15px' }} /> Add New Product Card
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {itemsList.map((item, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: '800', fontSize: '13px', color: '#38bdf8' }}>Category Card #{idx + 1}</span>
                            <StatusDropdown
                              isActive={item.isActive !== false && item.status !== 'inactive'}
                              status={item.status}
                              onChange={async (newStatus, isAct) => {
                                const updated = itemsList.map((it, i) => i === idx ? { ...it, isActive: isAct, status: newStatus } : it);
                                const updatedSection = { ...(formData[activeSection] || {}), items: updated };
                                setFormData(prev => ({ ...prev, [activeSection]: updatedSection }));
                                await persistSectionToDatabase(activeSection, updatedSection);
                                setStatusMsg(`'${item.title || `Card #${idx + 1}`}' set to ${isAct ? 'Active (Visible on website)' : 'Inactive (Hidden on website)'}!`);
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(idx)}
                            style={{
                              background: '#fef2f2',
                              color: '#dc2626',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontWeight: '800',
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Trash2 style={{ width: '13px', height: '13px' }} /> Delete
                          </button>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Card Title</label>
                          <input
                            type="text"
                            value={item.title || ''}
                            onChange={(e) => {
                              const updated = [...itemsList];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setFormData(prev => ({
                                ...prev,
                                [activeSection]: { ...(prev[activeSection] || {}), items: updated }
                              }));
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Target Link / URL</label>
                          <input
                            type="text"
                            value={item.link || ''}
                            placeholder="/product/your-product-slug"
                            onChange={(e) => {
                              const updated = [...itemsList];
                              updated[idx] = { ...updated[idx], link: e.target.value };
                              setFormData(prev => ({
                                ...prev,
                                [activeSection]: { ...(prev[activeSection] || {}), items: updated }
                              }));
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                          />
                        </div>

                        {/* Image Upload Input */}
                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Category Cover Photo <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: '700', marginLeft: '6px' }}>📐 Recommended: 600 × 600 px (Square 1:1)</span>
                          </label>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <label style={{
                              background: '#38bdf8',
                              color: '#fff',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              fontWeight: '700',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}>
                              <Upload style={{ width: '14px', height: '14px' }} /> Upload Cover Photo
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files[0];
                                  if (!file) return;
                                  setStatusMsg(`Uploading photo for ${item.title}...`);
                                  try {
                                    const res = await uploadImageFile(file, admin.token);
                                    const updated = itemsList.map((it, i) => i === idx ? { ...it, img: res.url } : it);
                                    const updatedSection = { ...(formData[activeSection] || {}), items: updated };
                                    setFormData(prev => ({ ...prev, [activeSection]: updatedSection }));
                                    await persistSectionToDatabase(activeSection, updatedSection);
                                    setStatusMsg(`Cover photo for ${item.title} updated and saved!`);
                                  } catch (err) {
                                    setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                                  }
                                }}
                                style={{ display: 'none' }}
                              />
                            </label>
                            <input
                              type="text"
                              value={item.img || ''}
                              placeholder="Or paste image URL"
                              onChange={(e) => {
                                const updated = itemsList.map((it, i) => i === idx ? { ...it, img: e.target.value } : it);
                                setFormData(prev => ({
                                  ...prev,
                                  [activeSection]: { ...(prev[activeSection] || {}), items: updated }
                                }));
                              }}
                              style={{ flex: '1 1 200px', minWidth: '180px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', color: '#334155' }}
                            />
                            {(() => {
                              const displayImg = item.img || defaultList.find(c => c.title.toLowerCase() === (item.title || '').trim().toLowerCase())?.img || defaultList[idx]?.img;
                              return displayImg ? (
                                <img src={displayImg} alt="" style={{ width: '54px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1.5px solid #38bdf8' }} />
                              ) : null;
                            })()}
                          </div>
                          <div style={{ marginTop: '8px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                              🏷️ Image Alt Text (SEO Keyword)
                            </label>
                            <input
                              type="text"
                              value={item.imgAlt || ''}
                              placeholder="e.g. Commercial Arcade Racing Game Setup - Winera"
                              onChange={(e) => {
                                const updated = itemsList.map((it, i) => i === idx ? { ...it, imgAlt: e.target.value } : it);
                                setFormData(prev => ({
                                  ...prev,
                                  [activeSection]: { ...(prev[activeSection] || {}), items: updated }
                                }));
                              }}
                              style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={async () => {
                      const finalItems = itemsList.map((it, i) => ({
                        ...it,
                        img: it.img || defaultList.find(c => c.title.toLowerCase() === (it.title || '').trim().toLowerCase())?.img || defaultList[i]?.img || '',
                        isActive: it.isActive !== false && it.status !== 'inactive',
                        status: it.status || (it.isActive !== false ? 'active' : 'inactive')
                      }));
                      const allRelatedKeys = [
                        'arcadeRelated',
                        'bowlingRelated',
                        'softplayRelated',
                        'trampolineRelated',
                        'amusementRelated',
                        'hypergridRelated',
                        'bumpercarRelated',
                        'vrRelated',
                        'arRelated',
                        'lasertagRelated',
                        'projectRelated'
                      ];
                      setLoadingSection(activeSection);
                      setStatusMsg('Syncing Related Products Carousel across ALL 11 pages...');
                      try {
                        const token = admin?.token || (() => {
                          try {
                            const stored = JSON.parse(localStorage.getItem('winera_admin') || '{}');
                            return stored?.token || '';
                          } catch { return ''; }
                        })();
                        for (const key of allRelatedKeys) {
                          const existing = formData[key] || {};
                          const payload = {
                            ...existing,
                            title: existing.title || formData[activeSection]?.title || '*Related* Products',
                            items: finalItems
                          };
                          await updateSectionContent(key, payload, token);
                        }
                        if (typeof refreshContent === 'function') await refreshContent(true, true);
                        setStatusMsg('✓ Successfully saved & synced to ALL 11 product & project pages!');
                      } catch (err) {
                        setStatusMsg('Sync Error: ' + (err.response?.data?.message || err.message));
                      } finally {
                        setLoadingSection('');
                      }
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
                    }}
                  >
                    ⚡ Save & Sync to ALL Pages
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const finalItems = itemsList.map((it, i) => ({
                        ...it,
                        img: it.img || defaultList.find(c => c.title.toLowerCase() === (it.title || '').trim().toLowerCase())?.img || defaultList[i]?.img || ''
                      }));
                      persistSectionToDatabase(activeSection, { ...(formData[activeSection] || {}), items: finalItems });
                    }}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '800', fontSize: '13.5px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save for This Page Only
                  </button>
                </div>
              </div>
            );
          })()}

          {/* BOWLING ALLEY PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'bowling' || ['bowlingHero', 'bowlingIntro', 'bowlingManufacturer', 'bowlingFreeFall', 'bowlingString', 'bowlingRoi', 'bowlingWhyUs', 'bowlingCta', 'bowlingFaqs'].includes(activeSection)) && (
            <BowlingDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              openModal={openModal}
              handleDeleteItem={handleDeleteItem}
              handleBrochureUpload={handleBrochureUpload}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* SOFT PLAY PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'softplay' || ['softplayHero', 'softplayIntro', 'softplayManufacture', 'softplaySpecs', 'softplayMaterials', 'softplayTypes', 'softplayRoi', 'softplayWhyUs', 'softplayFaqs', 'softplayCta'].includes(activeSection)) && (
            <SoftPlayDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              openModal={openModal}
              handleDeleteItem={handleDeleteItem}
              handleBrochureUpload={handleBrochureUpload}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* AMUSEMENT PARK PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'amusementPark' || ['amusementHero', 'amusementIntro', 'amusementBanner', 'amusementOptions', 'amusementRoi', 'amusementWhyUs', 'amusementFaqs', 'amusementCta'].includes(activeSection)) && (
            <AmusementDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              openModal={openModal}
              handleDeleteItem={handleDeleteItem}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}



          {/* HYPERGRID PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'hypergrid' || ['hypergridHero', 'hypergridIntro', 'hypergridBanner', 'hypergridSpecs', 'hypergridWhyUs', 'hypergridRoi', 'hypergridWhyWinera', 'hypergridFaqs', 'hypergridCta'].includes(activeSection)) && (
            <HypergridDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              handleBrochureUpload={handleBrochureUpload}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}



          {/* BUMPER CAR PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'bumpercar' || ['bumpercarHero', 'bumpercarIntro', 'bumpercarBanner', 'bumpercarThrill', 'bumpercarSpecs', 'bumpercarOptions', 'bumpercarComparison', 'bumpercarInvestment', 'bumpercarWhyChoose', 'bumpercarFaqs', 'bumpercarCta'].includes(activeSection)) && (
            <BumperCarDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              handleBrochureUpload={handleBrochureUpload}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* AR GAMES PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'argames' || ['arHero', 'arIntro', 'arMatchedVenue', 'arFeatures', 'arEarn', 'arWhyUs', 'arFaqs', 'arCta'].includes(activeSection)) && (
            <ArDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* VR GAMES PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'vrgames' || ['vrHero', 'vrSupplier', 'vrMatchedVenue', 'vrCategories', 'vrRange', 'vrReliability', 'vrEarn', 'vrWhyUs', 'vrFaqs', 'vrCta'].includes(activeSection)) && (
            <VrDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              openModal={openModal}
              handleDeleteItem={handleDeleteItem}
              admin={admin}
              setStatusMsg={setStatusMsg}
              vrMasterCards={vrMasterCards}
              refreshContent={refreshContent}
              setLoadingSection={setLoadingSection}
            />
          )}

          {/* LASER TAG PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'lasertag' || ['lasertagHero', 'lasertagIntro', 'lasertagSetup', 'lasertagGroups', 'lasertagSpecs', 'lasertagSpace', 'lasertagSpy', 'lasertagSpySpecs', 'lasertagComparison', 'lasertagRoi', 'lasertagWhyUs', 'lasertagFaqs', 'lasertagCta'].includes(activeSection)) && (
            <LaserTagDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              handleBrochureUpload={handleBrochureUpload}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}




          {/* ABOUT US PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'about' || ['aboutHero', 'aboutWelcome', 'aboutStats', 'aboutMissionVision', 'aboutWhyUsDetail', 'founder', 'aboutCta'].includes(activeSection)) && (
            <AboutDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              admin={admin}
              setStatusMsg={setStatusMsg}
              loadingSection={loadingSection}
            />
          )}

          {/* CONTACT US PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'contact' || ['contactHero', 'contactPage'].includes(activeSection)) && (
            <ContactDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* PROJECTS PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'projectPage' || ['projectHero', 'projectItems', 'projectBlock', 'projectBasicInfo', 'projectClientWanted', 'projectSolution', 'projectGallery', 'projectVideo', 'projectCta'].includes(activeSection)) && (
            <ProjectsDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              openModal={openModal}
              handleDeleteItem={handleDeleteItem}
              admin={admin}
              setStatusMsg={setStatusMsg}
              setSelectedPage={setSelectedPage}
              setActiveSection={setActiveSection}
              setDeleteConfirmModal={setDeleteConfirmModal}
              refreshContent={refreshContent}
            />
          )}



          {/* SAFETY STANDARDS PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'safetyStandards' || ['safetyHero', 'safetyIntro', 'safetyCertifications', 'safetyMaterials', 'safetyElectrical', 'safetyStructure', 'safetyWhyMatters'].includes(activeSection)) && (
            <SafetyDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}



          {/* TRAMPOLINE PARK PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'trampolinePark' || ['trampolineHero', 'trampolineIntro', 'trampolineCustom', 'trampolineSpecs', 'trampolineInside', 'trampolineRoi', 'trampolineWhyChoose', 'trampolineFaqs', 'trampolineCta'].includes(activeSection)) && (
            <TrampolineDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              handleBrochureUpload={handleBrochureUpload}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* ROI PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'roiPage' || ['roiHero', 'roiIntro', 'roiMatters', 'roiComparison', 'roiProcess', 'roiGet', 'roiChecklist', 'roiCta'].includes(activeSection)) && (
            <RoiDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* UNIVERSAL SEO META TITLE & DESCRIPTION FORM */}
          {activeSection && activeSection.endsWith('Seo') && (() => {
            const defaultSeoMap = {
              homeSeo: {
                pageTitle: "Game Zone Equipment Manufacturer in India | Winera International",
                metaDescription: "Winera International is your trusted Game Zone Equipment Manufacturer and Indoor Play Equipment Manufacturer in India since 2014. Get Amazing deals!",
                canonicalUrl: "https://winera.in/"
              },
              blogSeo: {
                pageTitle: "Winera International Blog | Winera International",
                metaDescription: "Explore expert insights, trends, and ideas from Winera International to elevate your entertainment venue and create unforgettable guest experiences.",
                canonicalUrl: "https://winera.in/blog"
              },
              aboutSeo: {
                pageTitle: "The Right Choice for Your Business | Winera International",
                metaDescription: "Winera delivers more than promises trusted expertise, customer care, and quality solutions that set us apart. Discover why clients choose us.",
                canonicalUrl: "https://winera.in/why-us"
              },
              arcadeSeo: {
                pageTitle: "Arcade Games Manufacturer in India | Winera International",
                metaDescription: "Looking for arcade game machines in India? Winera International offers redemption games, kiddie rides, racing simulators, and more at direct factory prices.",
                canonicalUrl: "https://winera.in/product/arcade-games"
              },
              bowlingSeo: {
                pageTitle: "Bowling Alley Manufacturer in India | Winera International",
                metaDescription: "Looking for a bowling alley manufacturer in India? Winera International supplies premium new and refurbished Brunswick systems, with 15+ years of expertise.",
                canonicalUrl: "https://winera.in/product/bowling-alley"
              },
              softplaySeo: {
                pageTitle: "Top Soft Play Equipment Manufacturers in India | Winera International",
                metaDescription: "As a premier soft play manufacturer in India, Winera International creates custom indoor soft play equipment. We deliver personalized solutions designed to fit your specific space and budget.",
                canonicalUrl: "https://winera.in/product/soft-play"
              },
              trampolineSeo: {
                pageTitle: "Trampoline Park Manufacturer in India | Winera International",
                metaDescription: "Looking for a trampoline park manufacturer in India? Winera International designs and installs custom trampoline parks to your space, vision, and budget.",
                canonicalUrl: "https://winera.in/product/trampoline-park"
              },
              vrSeo: {
                pageTitle: "VR Gaming Machine Manufacturer in India | Winera International",
                metaDescription: "Winera International is a leading VR gaming machine manufacturer in India, offering immersive virtual reality attractions built for arcades and FEC centers.",
                canonicalUrl: "https://winera.in/product/vr-games"
              },
              bumpercarSeo: {
                pageTitle: "Bumper Car Manufacturer in India | Winera International",
                metaDescription: "As a leading bumper car manufacturer in India, Winera International builds safe, durable, and thrilling bumper cars for amusement parks and FEC centers.",
                canonicalUrl: "https://winera.in/product/bumper-car"
              },
              bumperSeo: {
                pageTitle: "Bumper Car Manufacturer in India | Winera International",
                metaDescription: "As a leading bumper car manufacturer in India, Winera International builds safe, durable, and thrilling bumper cars for amusement parks and FEC centers.",
                canonicalUrl: "https://winera.in/product/bumper-car"
              },
              amusementSeo: {
                pageTitle: "Amusement Park Manufacturer in India | Winera International",
                metaDescription: "Winera International is a premier amusement park manufacturer in India, delivering innovative, safe rides and equipment tailored to your game zone and venue space.",
                canonicalUrl: "https://winera.in/product/amusement-park"
              },
              arSeo: {
                pageTitle: "AR Games Supplier in India | Winera International",
                metaDescription: "Winera International is a leading AR games supplier in India, sourcing and installing sports simulators, interactive floors, and immersive gaming attractions.",
                canonicalUrl: "https://winera.in/product/ar-games"
              },
              hypergridSeo: {
                pageTitle: "Hypergrid Game Supplier in India | Winera International",
                metaDescription: "Winera International is a trusted Hypergrid game supplier in India, installing commercial interactive LED floor systems for malls, FECs, and trampoline parks.",
                canonicalUrl: "https://winera.in/product/hypergrid"
              },
              lasertagSeo: {
                pageTitle: "Laser Tag Equipment Supplier in India | Winera International",
                metaDescription: "Want to add laser tag or laser spy to your venue? Winera International handles the full setup, from arena design and gear to software and staff training.",
                canonicalUrl: "https://winera.in/product/laser-tag"
              },
              safetySeo: {
                pageTitle: "Where Game Zone Safety Comes First | Winera International",
                metaDescription: "Safety comes first at Winera International. Every ride, play structure, and machine we install meets global safety standards, so your venue opens ready to run.",
                canonicalUrl: "https://winera.in/resource/safety-standards"
              },
              roiSeo: {
                pageTitle: "Know Your Game Zone ROI Before You Invest | Winera International",
                metaDescription: "Opening a game zone is easy, making it profitable is a system. Winera International models your ROI around your space and budget before you invest a rupee.",
                canonicalUrl: "https://winera.in/resource/roi"
              },
              projectSeo: {
                pageTitle: "Our Projects | Game Zones Built | Winera International",
                metaDescription: "Explore Winera International's completed projects across India. Real play destinations we've designed, built, and installed for venues of every size and type.",
                canonicalUrl: "https://winera.in/project"
              },
              privacySeo: {
                pageTitle: "Winera International Privacy Policy for Game Zone Solutions",
                metaDescription: "Learn how Winera International collects, uses, and protects the information you share when enquiring about our game zone equipment and setup services in India.",
                canonicalUrl: "https://winera.in/privacy-policy"
              },
              termsSeo: {
                pageTitle: "Terms of Service | Winera International",
                metaDescription: "Read Winera International's Terms of Service outlining your rights, responsibilities, and guidelines for using our game zone equipment and setup in India.",
                canonicalUrl: "https://winera.in/terms-and-conditions"
              },
              contactSeo: {
                pageTitle: "Contact Winera International | Game Zone Equipment Setup",
                metaDescription: "Contact Winera International for game zone equipment setup, bowling alley installation, soft play, trampoline park & VR gaming inquiries in India.",
                canonicalUrl: "https://winera.in/contact"
              }
            };

            const defaultObj = defaultSeoMap[activeSection] || { pageTitle: '', metaDescription: '', canonicalUrl: '' };
            const currentSec = formData[activeSection] || defaultObj;

            const pageTitleVal = currentSec.pageTitle !== undefined ? currentSec.pageTitle : (currentSec.title !== undefined ? currentSec.title : defaultObj.pageTitle);
            const metaDescVal = currentSec.metaDescription !== undefined ? currentSec.metaDescription : (currentSec.description !== undefined ? currentSec.description : defaultObj.metaDescription);
            const canonicalUrlVal = currentSec.canonicalUrl !== undefined ? currentSec.canonicalUrl : (defaultObj.canonicalUrl || '');

            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                    SEO Meta Title & Description Settings ({activeSection})
                  </h3>
                  <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0284c7', padding: '4px 12px', borderRadius: '20px', fontWeight: '800' }}>
                    Google Search Preview
                  </span>
                </div>

                {/* Google Search Result Live Preview Card */}
                <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px 20px', marginBottom: '24px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '12px', color: '#475569', marginBottom: '4px', wordBreak: 'break-all' }}>
                    {canonicalUrlVal || 'https://winera.in'}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#1a0dab', marginBottom: '6px', lineHeight: 1.3, cursor: 'pointer' }}>
                    {pageTitleVal || 'Page Title Tag Placeholder'}
                  </div>
                  <div style={{ fontSize: '13px', color: '#4d5156', lineHeight: 1.5 }}>
                    {metaDescVal || 'Meta Description Tag Placeholder'}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>Page Title Tag (&lt;title&gt;)</label>
                      <span style={{ fontSize: '11px', color: (pageTitleVal || '').length > 60 ? '#ef4444' : '#64748b' }}>{(pageTitleVal || '').length} / 60 characters</span>
                    </div>
                    <input
                      type="text"
                      value={pageTitleVal || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        [activeSection]: {
                          ...(prev[activeSection] || defaultObj),
                          pageTitle: e.target.value,
                          title: e.target.value
                        }
                      }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontFamily: 'inherit' }}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>Meta Description Tag (&lt;meta name="description"&gt;)</label>
                      <span style={{ fontSize: '11px', color: (metaDescVal || '').length > 160 ? '#ef4444' : '#64748b' }}>{(metaDescVal || '').length} / 160 characters</span>
                    </div>
                    <textarea
                      rows={4}
                      value={metaDescVal || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        [activeSection]: {
                          ...(prev[activeSection] || defaultObj),
                          metaDescription: e.target.value,
                          description: e.target.value
                        }
                      }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', lineHeight: 1.6, fontFamily: 'inherit' }}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>
                        🔗 Canonical URL Tag (<code style={{ fontWeight: '700', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', color: '#0284c7' }}>&lt;link rel="canonical"&gt;</code>)
                      </label>
                    </div>
                    <input
                      type="url"
                      value={canonicalUrlVal || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        [activeSection]: {
                          ...(prev[activeSection] || defaultObj),
                          canonicalUrl: e.target.value
                        }
                      }))}
                      placeholder={`e.g. ${defaultObj.canonicalUrl || 'https://winera.in'}`}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontFamily: 'inherit' }}
                    />
                    <div style={{ marginTop: '6px', fontSize: '11.5px', color: '#64748b', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', lineHeight: 1.5 }}>
                      💡 <strong>Tip:</strong> Sets the primary official URL for search engines. Always enter a live, valid URL.
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase(activeSection, formData[activeSection] || defaultObj)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save SEO Settings
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* PRIVACY POLICY PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'privacyPolicyPage' || ['privacyHero', 'privacySections'].includes(activeSection)) && (
            <PrivacyPolicyDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* TERMS & CONDITIONS PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'termsConditionsPage' || ['termsHero', 'termsSections'].includes(activeSection)) && (
            <TermsConditionsDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* BLOG PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'blogPage' || ['blogHero', 'blogPosts'].includes(activeSection)) && (
            <BlogDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}



          {/* HEADER PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'headerPage' || activeSection === 'header') && (
            <HeaderDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* FOOTER PAGE CMS SECTIONS (MODULAR COMPONENT) */}
          {(selectedPage === 'footerPage' || activeSection === 'footer') && (
            <FooterDashboard
              activeSection={activeSection}
              formData={formData}
              setFormData={setFormData}
              handleFieldChange={handleFieldChange}
              persistSectionToDatabase={persistSectionToDatabase}
              admin={admin}
              setStatusMsg={setStatusMsg}
            />
          )}

          {/* FALLBACK FOR OTHER UNCHECKED SECTIONS */}
          {!activeSection.endsWith('Related') && !activeSection.endsWith('Seo') && !activeSection.startsWith('lasertag') && !activeSection.startsWith('bowling') && !activeSection.startsWith('amusement') && !activeSection.startsWith('bumper') && !activeSection.startsWith('vr') && !activeSection.startsWith('ar') && !activeSection.startsWith('softplay') && !activeSection.startsWith('home') && !activeSection.startsWith('about') && !activeSection.startsWith('contact') && !activeSection.startsWith('terms') && !activeSection.startsWith('privacy') && !['stats', 'clientLogos', 'channelPartners', 'builtProjects', 'faqs', 'testimonials', 'founder', 'projectHero', 'projectHeader', 'projectItems', 'projectBlock', 'projectBasicInfo', 'projectClientWanted', 'projectSolution', 'projectGallery', 'projectVideo', 'projectCta', 'projectSeo', 'arcadeHero', 'arcadeIntro', 'arcadeCategories', 'arcadeCommercial', 'arcadeWhyUs', 'arcadeRelated', 'arcadeFaqs', 'arcadeCta', 'arcadeSeo', 'hypergridHero', 'hypergridIntro', 'hypergridBanner', 'hypergridSpecs', 'hypergridWhyUs', 'hypergridRoi', 'hypergridWhyWinera', 'hypergridFaqs', 'hypergridCta', 'hypergridSeo', 'safetyHero', 'safetyIntro', 'safetyCertifications', 'safetyMaterials', 'safetyElectrical', 'safetyStructure', 'safetyWhyMatters', 'safetySeo', 'trampolineHero', 'trampolineIntro', 'trampolineCustom', 'trampolineSpecs', 'trampolineInside', 'trampolineRoi', 'trampolineWhyChoose', 'trampolineFaqs', 'trampolineCta', 'trampolineSeo', 'roiHero', 'roiIntro', 'roiMatters', 'roiComparison', 'roiProcess', 'roiGet', 'roiChecklist', 'roiCta', 'roiSeo', 'blogHero', 'blogPosts', 'blogSeo', 'header', 'footer'].includes(activeSection) && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <FileText style={{ width: '48px', height: '48px', color: '#38bdf8', marginBottom: '14px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                Section: '{activeSection}' Configuration
              </h3>
              <div style={{ textAlign: 'left', maxWidth: '650px', margin: '0 auto' }}>
                <textarea
                  rows={8}
                  value={JSON.stringify(formData[activeSection] || {}, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setFormData(prev => ({ ...prev, [activeSection]: parsed }));
                    } catch (err) { }
                  }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '14px',
                    border: '1.5px solid #e2e8f0',
                    background: '#0f172a',
                    color: '#38bdf8',
                    fontFamily: 'monospace',
                    fontSize: '12.5px'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* PROFESSIONAL POPUP MODAL DIALOG */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="winera-admin-modal-box" style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: (activeSection === 'projectItems' || modalTargetSection === 'projectItems')
              ? '1150px'
              : (activeSection === 'arcadeCategories' || activeSection === 'vrCategories' || activeSection === 'vrRange' || modalTargetSection === 'vrCategories' || modalTargetSection === 'vrRange')
                ? '760px'
                : '560px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 28px',
              background: '#0F172B',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#38bdf8' }}>{modalMode === 'add' ? 'Add New' : 'Edit'}</span> {activeSection.toUpperCase()} Item
              </h3>
              <button
                onClick={closeModal}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Modal Form Body */}
            <div style={{
              padding: (activeSection === 'projectItems' || modalTargetSection === 'projectItems') ? '28px 32px' : '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxHeight: (activeSection === 'projectItems' || modalTargetSection === 'projectItems') ? '84vh' : '70vh',
              overflowY: 'auto'
            }}>
              {/* 1. STATS FIELDS */}
              {activeSection === 'stats' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Number (e.g., 14+, 200+)</label>
                    <input
                      type="text"
                      value={modalItemData.number || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, number: e.target.value }))}
                      placeholder="e.g. 14+"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Label Text</label>
                    <input
                      type="text"
                      value={modalItemData.label || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, label: e.target.value }))}
                      placeholder="e.g. YEARS OF EXPERIENCE"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '600', fontSize: '14px' }}
                    />
                  </div>
                </>
              )}

              {/* 2. CLIENT LOGOS & CHANNEL PARTNERS FIELDS */}
              {(activeSection === 'clientLogos' || activeSection === 'channelPartners') && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Name / Brand Title</label>
                    <input
                      type="text"
                      value={modalItemData.name || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter brand name"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>
                      Upload Logo File (Saved on Server) <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: '700', marginLeft: '6px' }}>📐 Recommended: 300 × 150 px (Transparent PNG)</span>
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <label style={{
                        background: '#38bdf8',
                        color: '#fff',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        fontWeight: '800',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Choose Logo File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleModalFileUpload(e, 'logoUrl')}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {modalItemData.logoUrl && (
                        <img src={modalItemData.logoUrl} alt="" style={{ height: '40px', maxWidth: '100px', objectFit: 'contain', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '2px' }} />
                      )}
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>🏷️ Logo Alt Text (SEO Keyword)</label>
                      <input
                        type="text"
                        value={modalItemData.logoAlt || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, logoAlt: e.target.value }))}
                        placeholder="e.g. Brand Name Logo - Winera Client"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* 3. GAME ZONES BUILT FIELDS */}
              {activeSection === 'builtProjects' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Name of Game Zone</label>
                    <input
                      type="text"
                      value={modalItemData.name || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Hulaboo Game Zone"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>City Location</label>
                    <input
                      type="text"
                      value={modalItemData.city || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="e.g. Surat"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '600', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>
                      Upload Venue Image File <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: '700', marginLeft: '6px' }}>📐 Recommended: 800 × 600 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <label style={{
                        background: '#38bdf8',
                        color: '#fff',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        fontWeight: '800',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Choose Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleModalFileUpload(e, 'imageUrl')}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {(modalItemData.imageUrl || modalItemData.img) && (
                        <img src={modalItemData.imageUrl || modalItemData.img} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #38bdf8' }} />
                      )}
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>🏷️ Venue Photo Alt Text (SEO Keyword)</label>
                      <input
                        type="text"
                        value={modalItemData.imgAlt || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, imgAlt: e.target.value }))}
                        placeholder="e.g. Hulaboo Game Zone Indoor Amusement Park Setup - Surat"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ARCADE GAME CATEGORIES & PRODUCT DETAIL FIELDS */}
              {(activeSection === 'arcadeCategories' || modalTargetSection === 'arcadeCategories') && (
                <>
                  <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, color: '#0284c7', fontSize: '15px', fontWeight: '800' }}>1. Basic Product Info & Title</h4>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Arcade Game Full Title</label>
                    <input
                      type="text"
                      value={modalItemData.title || modalItemData.name || ''}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setModalItemData(prev => {
                          const slugify = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          const oldSlug = prev.slug || '';
                          const oldAutoSlug = slugify(prev.title || prev.name || '');
                          const isAuto = !oldSlug || oldSlug === 'new-arcade-game' || oldSlug === oldAutoSlug;
                          return {
                            ...prev,
                            title: newTitle,
                            name: newTitle,
                            slug: isAuto ? slugify(newTitle) : prev.slug
                          };
                        });
                      }}
                      placeholder="e.g. Parkour Motor II (DX)"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Title Base Text (Black)</label>
                      <input
                        type="text"
                        value={modalItemData.nameBase !== undefined ? modalItemData.nameBase : (modalItemData.title || '')}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, nameBase: e.target.value }))}
                        placeholder="e.g. Parkour Motor "
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Title Highlight (Cyan)</label>
                      <input
                        type="text"
                        value={modalItemData.nameHighlight || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, nameHighlight: e.target.value }))}
                        placeholder="e.g. II (DX)"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Product Category Tab</label>
                      <select
                        value={modalItemData.category || 'Arcade Games'}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, category: e.target.value, specsCategory: e.target.value }))}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '700', background: '#ffffff', color: '#0284c7' }}
                      >
                        {((Array.isArray(formData.arcadeCategories?.categoriesList) && formData.arcadeCategories.categoriesList.length > 0)
                          ? formData.arcadeCategories.categoriesList
                          : ["Arcade Games", "Claw Machine", "Redemption Game", "Kiddy Ride", "Bike & Car Racing Games", "Shooting Games", "Strength Based Games"]
                        ).map((catName, cIdx) => (
                          <option key={cIdx} value={catName}>{catName}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Badge Tag</label>
                      <input
                        type="text"
                        value={modalItemData.tag || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, tag: e.target.value }))}
                        placeholder="e.g. Popular, Hot Seller"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>URL Slug</label>
                      <input
                        type="text"
                        value={modalItemData.slug || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="e.g. parkour-motor-2-dx"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <RichTextareaWithEditor
                      label="Product Tagline / Subtitle"
                      rows={2}
                      value={modalItemData.tagline || modalItemData.desc || ''}
                      onChange={(val) => setModalItemData(prev => ({ ...prev, tagline: val, desc: val }))}
                      placeholder="High-Performance Dual Player Commercial Motorbike Racing Simulator..."
                    />
                  </div>

                  <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginTop: '10px', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, color: '#0284c7', fontSize: '15px', fontWeight: '800' }}>2. Key Technical Specifications</h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Power</label>
                      <input
                        type="text"
                        value={modalItemData.power || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, power: e.target.value }))}
                        placeholder="e.g. 880 W"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Voltage</label>
                      <input
                        type="text"
                        value={modalItemData.voltage || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, voltage: e.target.value }))}
                        placeholder="e.g. 220v"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Players</label>
                      <input
                        type="text"
                        value={modalItemData.players || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, players: e.target.value }))}
                        placeholder="e.g. 2 Player"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Category Name (Specification)</label>
                      <input
                        type="text"
                        value={modalItemData.specsCategory !== undefined ? modalItemData.specsCategory : (modalItemData.category || '')}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, specsCategory: e.target.value }))}
                        placeholder="e.g. Bike Racing Game"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Main Material</label>
                      <input
                        type="text"
                        value={modalItemData.material || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, material: e.target.value }))}
                        placeholder="e.g. Imported Steel & ABS"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginTop: '10px', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, color: '#0284c7', fontSize: '15px', fontWeight: '800' }}>3. Dimensions (Cards)</h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Width</label>
                      <input
                        type="text"
                        value={modalItemData.width || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, width: e.target.value }))}
                        placeholder="e.g. 2140 mm"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Depth</label>
                      <input
                        type="text"
                        value={modalItemData.depth || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, depth: e.target.value }))}
                        placeholder="e.g. 2310 mm"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Height</label>
                      <input
                        type="text"
                        value={modalItemData.height || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, height: e.target.value }))}
                        placeholder="e.g. 2490 mm"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginTop: '10px', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, color: '#0284c7', fontSize: '15px', fontWeight: '800' }}>4. Showcase Image & Thumbnail Photos</h4>
                  </div>

                  {/* Main Photo - Stacked Layout */}
                  <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '14px', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
                      Main Product Showcase Photo
                      <span style={{ fontSize: '10.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: '700', marginLeft: '8px' }}>📐 600 × 600 px (1:1)</span>
                    </label>
                    {/* Image Preview */}
                    {(() => {
                      const resolvedMainImg = getAdminValidImageUrl(
                        modalItemData.img || modalItemData.imageUrl || arcadeProductImageMap[modalItemData.name || modalItemData.title],
                        arcadeProductImageMap[modalItemData.name || modalItemData.title] || bikeArcade
                      );
                      return (
                        <div style={{ width: '100%', height: '160px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #38bdf8', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                          <img
                            src={resolvedMainImg}
                            alt="Product Preview"
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          />
                        </div>
                      );
                    })()}
                    {/* Upload + URL row */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <label style={{ background: '#0284c7', color: '#fff', padding: '9px 14px', borderRadius: '10px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                        <Upload style={{ width: '13px', height: '13px' }} /> Upload
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleModalFileUpload(e, 'img')}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <input
                        type="text"
                        value={typeof modalItemData.img === 'string' ? modalItemData.img : ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, img: e.target.value }))}
                        placeholder="Paste image URL here..."
                        style={{ flex: 1, padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12px', minWidth: 0 }}
                      />
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Image Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={modalItemData.imgAlt || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, imgAlt: e.target.value }))}
                        placeholder={`e.g. ${modalItemData.name || 'Commercial Arcade Game Machine'} - Winera International`}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                      />
                    </div>
                  </div>

                  {/* Dynamic Gallery Thumbnails */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        Thumbnail Photos <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>(Optional — jitni images add karenge utni hi detail gallery me aayegi)</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setModalItemData(prev => {
                            const list = Array.isArray(prev.gallery) ? [...prev.gallery] : [];
                            return { ...prev, gallery: [...list, ''] };
                          });
                        }}
                        style={{
                          background: '#0284c7',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 13px',
                          borderRadius: '8px',
                          fontWeight: '800',
                          fontSize: '11.5px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)'
                        }}
                      >
                        <Plus style={{ width: '13px', height: '13px' }} /> Add Image
                      </button>
                    </div>

                    {(!Array.isArray(modalItemData.gallery) || modalItemData.gallery.length === 0) ? (
                      <div style={{ padding: '14px', background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: '12px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
                        No gallery thumbnails added yet. Only main photo will be shown.
                        <div style={{ marginTop: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setModalItemData(prev => ({ ...prev, gallery: [''] }))}
                            style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '11.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Plus style={{ width: '12px', height: '12px' }} /> Add First Thumbnail
                          </button>
                        </div>
                      </div>
                    ) : (
                      modalItemData.gallery.map((thumbVal, thumbIdx) => {
                        const thumbStr = typeof thumbVal === 'string' ? thumbVal : '';
                        return (
                          <div key={thumbIdx} style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                              <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#0f172a' }}>
                                Thumbnail {thumbIdx + 1}
                                <span style={{ fontSize: '10px', color: '#0284c7', background: '#e0f2fe', padding: '1px 5px', borderRadius: '4px', fontWeight: '700', marginLeft: '6px' }}>300 × 300 px</span>
                              </label>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                {thumbStr && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setModalItemData(prev => {
                                        const list = Array.isArray(prev.gallery) ? [...prev.gallery] : [];
                                        list[thumbIdx] = '';
                                        return { ...prev, gallery: list };
                                      });
                                    }}
                                    style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '11px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
                                  >
                                    Clear
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setModalItemData(prev => {
                                      const list = (prev.gallery || []).filter((_, i) => i !== thumbIdx);
                                      const altList = (prev.galleryAlt || []).filter((_, i) => i !== thumbIdx);
                                      return { ...prev, gallery: list, galleryAlt: altList };
                                    });
                                  }}
                                  style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '11px', fontWeight: '800', cursor: 'pointer', padding: 0 }}
                                >
                                  ✕ Remove
                                </button>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <label style={{ background: '#0284c7', color: '#fff', padding: '7px 11px', borderRadius: '8px', fontWeight: '800', fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                                <Upload style={{ width: '11px', height: '11px' }} /> Upload
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleModalFileUpload(e, 'gallery', thumbIdx)}
                                  style={{ display: 'none' }}
                                />
                              </label>
                              <input
                                type="text"
                                value={thumbStr}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setModalItemData(prev => {
                                    const list = Array.isArray(prev.gallery) ? [...prev.gallery] : [];
                                    list[thumbIdx] = val;
                                    return { ...prev, gallery: list };
                                  });
                                }}
                                placeholder="Paste image URL..."
                                style={{ flex: 1, padding: '7px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '11.5px', minWidth: 0 }}
                              />
                              {thumbStr && (
                                <div style={{ width: '44px', height: '36px', borderRadius: '6px', overflow: 'hidden', border: '1.5px solid #38bdf8', flexShrink: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <img
                                    src={getAdminValidImageUrl(thumbStr)}
                                    alt=""
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                </div>
                              )}
                            </div>
                            <div style={{ marginTop: '6px' }}>
                              <input
                                type="text"
                                value={Array.isArray(modalItemData.galleryAlt) ? (modalItemData.galleryAlt[thumbIdx] || '') : ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setModalItemData(prev => {
                                    const altList = Array.isArray(prev.galleryAlt) ? [...prev.galleryAlt] : [];
                                    altList[thumbIdx] = val;
                                    return { ...prev, galleryAlt: altList };
                                  });
                                }}
                                placeholder={`🏷️ Thumbnail ${thumbIdx + 1} Alt Text (SEO Keyword)`}
                                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px' }}
                              />
                            </div>
                          </div>
                        );
                      })
                    )}

                    {Array.isArray(modalItemData.gallery) && modalItemData.gallery.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setModalItemData(prev => {
                            const list = Array.isArray(prev.gallery) ? [...prev.gallery] : [];
                            return { ...prev, gallery: [...list, ''] };
                          });
                        }}
                        style={{
                          background: '#f0f9ff',
                          color: '#0284c7',
                          border: '1.5px dashed #38bdf8',
                          padding: '8px 14px',
                          borderRadius: '10px',
                          fontWeight: '800',
                          fontSize: '11.5px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          marginTop: '2px'
                        }}
                      >
                        <Plus style={{ width: '13px', height: '13px' }} /> Add Another Image
                      </button>
                    )}
                  </div>

                  <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginTop: '10px', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, color: '#0284c7', fontSize: '15px', fontWeight: '800' }}>5. Action Links & Videos</h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>
                        Watch Video URL <span style={{ fontSize: '10.5px', color: '#0284c7', background: '#e0f2fe', padding: '1px 5px', borderRadius: '4px', fontWeight: '700', marginLeft: '4px' }}>🎬 Video Ratio: 16:9 Landscape</span>
                      </label>
                      <input
                        type="text"
                        value={modalItemData.videoUrl || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, videoUrl: e.target.value }))}
                        placeholder="https://youtube.com/watch?v=..."
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Base WhatsApp Link / URL</label>
                      <input
                        type="text"
                        value={(modalItemData.quoteUrl && modalItemData.quoteUrl.split('?')[0]) || 'https://wa.me/919157873576'}
                        onChange={(e) => {
                          const newBase = e.target.value;
                          setModalItemData(prev => {
                            const msg = prev.waMessage || (() => {
                              if (prev.quoteUrl && prev.quoteUrl.includes('text=')) {
                                try {
                                  const match = prev.quoteUrl.match(/text=([^&]+)/);
                                  if (match && match[1]) return decodeURIComponent(match[1]);
                                } catch (err) { }
                              }
                              return prev.name ? `Hello Winera International! I want to get a quote for ${prev.name}. Please share price and details.` : '';
                            })();
                            const updatedUrl = msg ? `${newBase.split('?')[0]}?text=${encodeURIComponent(msg)}` : newBase;
                            return { ...prev, quoteUrl: updatedUrl };
                          });
                        }}
                        placeholder="https://wa.me/919157873576"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                      WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '10.5px', color: '#0284c7', background: '#e0f2fe', padding: '1px 5px', borderRadius: '4px', fontWeight: '700', marginLeft: '4px' }}>💬 Sent when user clicks Get a Quote</span>
                    </label>
                    <textarea
                      rows={2}
                      value={(() => {
                        if (modalItemData.waMessage !== undefined && modalItemData.waMessage !== '') return modalItemData.waMessage;
                        if (modalItemData.quoteUrl && modalItemData.quoteUrl.includes('text=')) {
                          try {
                            const match = modalItemData.quoteUrl.match(/text=([^&]+)/);
                            if (match && match[1]) return decodeURIComponent(match[1]);
                          } catch (err) { }
                        }
                        return modalItemData.name ? `Hello Winera International! I want to get a quote for ${modalItemData.name}. Please share price and details.` : '';
                      })()}
                      onChange={(e) => {
                        const newMsg = e.target.value;
                        setModalItemData(prev => {
                          const base = (prev.quoteUrl && prev.quoteUrl.split('?')[0]) || 'https://wa.me/919157873576';
                          const updatedUrl = newMsg ? `${base}?text=${encodeURIComponent(newMsg)}` : base;
                          return {
                            ...prev,
                            waMessage: newMsg,
                            quoteUrl: updatedUrl
                          };
                        });
                      }}
                      placeholder={`e.g. Hello Winera International! I want to get a quote for ${modalItemData.name || 'this machine'}. Please share price and details.`}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: '500', lineHeight: 1.5 }}
                    />
                  </div>

                  <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginTop: '10px', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, color: '#0284c7', fontSize: '15px', fontWeight: '800' }}>6. Specification Detail 2x2 Feature Cards</h4>
                  </div>

                  {[1, 2, 3, 4].map(num => (
                    <div key={num} style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Feature Card {num}</label>
                      <input
                        type="text"
                        value={modalItemData[`feature${num}Title`] || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, [`feature${num}Title`]: e.target.value }))}
                        placeholder={`Feature ${num} Title`}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: '700', marginBottom: '6px' }}
                      />
                      <textarea
                        rows={2}
                        value={modalItemData[`feature${num}Desc`] || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, [`feature${num}Desc`]: e.target.value }))}
                        placeholder={`Feature ${num} Description`}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                      />
                    </div>
                  ))}
                </>
              )}

              {/* VR GAME CATEGORIES & PRODUCT DETAIL FIELDS */}
              {(activeSection === 'vrCategories' || activeSection === 'vrRange' || modalTargetSection === 'vrCategories' || modalTargetSection === 'vrRange') && (
                <>
                  <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, color: '#0284c7', fontSize: '15px', fontWeight: '800' }}>1. Basic VR Product Info & Title</h4>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>VR Game Full Title / Name</label>
                    <input
                      type="text"
                      value={modalItemData.title || modalItemData.name || ''}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setModalItemData(prev => {
                          const slugify = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          const oldSlug = prev.slug || '';
                          const oldAutoSlug = slugify(prev.title || prev.name || '');
                          const isAuto = !oldSlug || oldSlug === 'new-vr-game' || oldSlug === oldAutoSlug;
                          return {
                            ...prev,
                            title: newTitle,
                            name: newTitle,
                            slug: isAuto ? slugify(newTitle) : prev.slug
                          };
                        });
                      }}
                      placeholder="e.g. VR UFO 5 Player Motion Pod"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Title Base Text (Black)</label>
                      <input
                        type="text"
                        value={modalItemData.nameBase !== undefined ? modalItemData.nameBase : (modalItemData.title || '')}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, nameBase: e.target.value }))}
                        placeholder="e.g. VR UFO "
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Title Highlight (Cyan)</label>
                      <input
                        type="text"
                        value={modalItemData.nameHighlight || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, nameHighlight: e.target.value }))}
                        placeholder="e.g. 5 Player"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>VR Category Tab</label>
                      <select
                        value={modalItemData.category || 'VR 9D Cinema'}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, category: e.target.value, tag: e.target.value, specsCategory: e.target.value }))}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '700', background: '#ffffff', color: '#0284c7' }}
                      >
                        {((Array.isArray(formData.vrCategories?.categoriesList) && formData.vrCategories.categoriesList.length > 0)
                          ? formData.vrCategories.categoriesList
                          : ((Array.isArray(formData.vrRange?.categoriesList) && formData.vrRange.categoriesList.length > 0)
                            ? formData.vrRange.categoriesList
                            : DEFAULT_VR_CATEGORIES)
                        ).map((catName, cIdx) => (
                          <option key={cIdx} value={catName}>{catName}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Badge Tag</label>
                      <input
                        type="text"
                        value={modalItemData.tag || modalItemData.category || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, tag: e.target.value }))}
                        placeholder="e.g. Bester VR"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Product URL Slug</label>
                      <input
                        type="text"
                        value={modalItemData.slug || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="e.g. vr-ufo-5-player"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12px', fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Short Tagline / Subtitle</label>
                    <input
                      type="text"
                      value={modalItemData.tagline || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, tagline: e.target.value }))}
                      placeholder="e.g. 5-Player High-Capacity 360 Degree Motion VR Flight Simulator"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <RichTextareaWithEditor
                      label="Product Description / Overview"
                      rows={3}
                      value={modalItemData.desc || ''}
                      onChange={(val) => setModalItemData(prev => ({ ...prev, desc: val }))}
                      placeholder="Commercial description explaining simulator dynamics, motion freedom, guest excitement..."
                    />
                  </div>

                  <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', margin: '14px 0 8px 0' }}>
                    <h4 style={{ margin: 0, color: '#0284c7', fontSize: '15px', fontWeight: '800' }}>2. Technical Specifications</h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Power</label>
                      <input
                        type="text"
                        value={modalItemData.power || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, power: e.target.value }))}
                        placeholder="e.g. 1.8 KW"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Voltage</label>
                      <input
                        type="text"
                        value={modalItemData.voltage || '220V'}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, voltage: e.target.value }))}
                        placeholder="e.g. 220V"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Players Capacity</label>
                      <input
                        type="text"
                        value={modalItemData.players || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, players: e.target.value }))}
                        placeholder="e.g. 1 / 2 / 5"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Weight</label>
                      <input
                        type="text"
                        value={modalItemData.weight || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, weight: e.target.value }))}
                        placeholder="e.g. 350 KG"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Max Load</label>
                      <input
                        type="text"
                        value={modalItemData.maxLoad || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, maxLoad: e.target.value }))}
                        placeholder="e.g. 200 KG"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Games Library</label>
                      <input
                        type="text"
                        value={modalItemData.games || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, games: e.target.value }))}
                        placeholder="e.g. 50+ Games"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>VR Helmet / Headset</label>
                      <input
                        type="text"
                        value={modalItemData.helmet || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, helmet: e.target.value }))}
                        placeholder="e.g. DP / Pico"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Dimensions (L × W × H)</label>
                      <input
                        type="text"
                        value={modalItemData.dimensions || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, dimensions: e.target.value }))}
                        placeholder="e.g. 2100 x 1400 x 1950 mm"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', margin: '14px 0 8px 0' }}>
                    <h4 style={{ margin: 0, color: '#0284c7', fontSize: '15px', fontWeight: '800' }}>3. Product Image & Gallery</h4>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                      Main Showcase Image <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>📐 Clean Isolated Image</span>
                    </label>
                    {(() => {
                      const resolvedMainImg = getAdminValidImageUrl(
                        modalItemData.img || modalItemData.imageUrl,
                        '/assets/vr-game-images/bester-vr/1.png'
                      );
                      return (
                        <div style={{ width: '100%', height: '160px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #38bdf8', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                          <img
                            src={resolvedMainImg}
                            alt="VR Product Preview"
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          />
                        </div>
                      );
                    })()}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <label style={{ background: '#0284c7', color: '#fff', padding: '9px 14px', borderRadius: '10px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                        <Upload style={{ width: '13px', height: '13px' }} /> Upload
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleModalFileUpload(e, 'img')}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <input
                        type="text"
                        value={typeof modalItemData.img === 'string' ? modalItemData.img : ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, img: e.target.value, imageUrl: e.target.value }))}
                        placeholder="Paste image URL here..."
                        style={{ flex: 1, padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12px', minWidth: 0 }}
                      />
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ VR Game Image Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={modalItemData.imgAlt || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, imgAlt: e.target.value }))}
                        placeholder={`e.g. ${modalItemData.name || 'Commercial VR Simulator'} - Winera International`}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                      />
                    </div>
                  </div>

                  {/* Dynamic Gallery Thumbnails */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        Additional Angle Photos <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>(Optional — gallery thumbnails)</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setModalItemData(prev => {
                            const list = Array.isArray(prev.gallery) ? [...prev.gallery] : [];
                            return { ...prev, gallery: [...list, ''] };
                          });
                        }}
                        style={{ background: '#e0f2fe', color: '#0284c7', border: '1px solid #bae6fd', padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer' }}
                      >
                        + Add Photo
                      </button>
                    </div>

                    {(Array.isArray(modalItemData.gallery) ? modalItemData.gallery : []).map((thumb, thumbIdx) => {
                      const thumbStr = typeof thumb === 'string' ? thumb : '';
                      return (
                        <div key={thumbIdx} style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#475569' }}>Photo #{thumbIdx + 1}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setModalItemData(prev => {
                                  const list = Array.isArray(prev.gallery) ? [...prev.gallery] : [];
                                  list.splice(thumbIdx, 1);
                                  const altList = Array.isArray(prev.galleryAlt) ? [...prev.galleryAlt] : [];
                                  altList.splice(thumbIdx, 1);
                                  return { ...prev, gallery: list, galleryAlt: altList };
                                });
                              }}
                              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                            >
                              ✕ Remove
                            </button>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <label style={{ background: '#0284c7', color: '#fff', padding: '7px 11px', borderRadius: '8px', fontWeight: '800', fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                              <Upload style={{ width: '11px', height: '11px' }} /> Upload
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleModalFileUpload(e, 'gallery', thumbIdx)}
                                style={{ display: 'none' }}
                              />
                            </label>
                            <input
                              type="text"
                              value={thumbStr}
                              onChange={(e) => {
                                const val = e.target.value;
                                setModalItemData(prev => {
                                  const list = Array.isArray(prev.gallery) ? [...prev.gallery] : [];
                                  list[thumbIdx] = val;
                                  return { ...prev, gallery: list };
                                });
                              }}
                              placeholder="Paste image URL..."
                              style={{ flex: 1, padding: '7px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '11.5px', minWidth: 0 }}
                            />
                            {thumbStr && (
                              <div style={{ width: '44px', height: '36px', borderRadius: '6px', overflow: 'hidden', border: '1.5px solid #38bdf8', flexShrink: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                  src={getAdminValidImageUrl(thumbStr)}
                                  alt=""
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </div>
                            )}
                          </div>
                          <div style={{ marginTop: '6px' }}>
                            <input
                              type="text"
                              value={Array.isArray(modalItemData.galleryAlt) ? (modalItemData.galleryAlt[thumbIdx] || '') : ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setModalItemData(prev => {
                                  const altList = Array.isArray(prev.galleryAlt) ? [...prev.galleryAlt] : [];
                                  altList[thumbIdx] = val;
                                  return { ...prev, galleryAlt: altList };
                                });
                              }}
                              placeholder={`🏷️ Photo #${thumbIdx + 1} Alt Text (SEO Keyword)`}
                              style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px' }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', margin: '14px 0 8px 0' }}>
                    <h4 style={{ margin: 0, color: '#0284c7', fontSize: '15px', fontWeight: '800' }}>4. Video & Interactive Quotation</h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Watch Video URL (YouTube)</label>
                      <input
                        type="text"
                        value={modalItemData.videoUrl || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, videoUrl: e.target.value }))}
                        placeholder="https://youtube.com/watch?v=..."
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Base WhatsApp Link</label>
                      <input
                        type="text"
                        value={(modalItemData.quoteUrl && modalItemData.quoteUrl.split('?')[0]) || 'https://wa.me/919157873576'}
                        onChange={(e) => {
                          const newBase = e.target.value;
                          setModalItemData(prev => {
                            const msg = prev.name ? `Hello Winera International! I want to get a quote for ${prev.name}. Please share price and details.` : '';
                            const updatedUrl = msg ? `${newBase.split('?')[0]}?text=${encodeURIComponent(msg)}` : newBase;
                            return { ...prev, quoteUrl: updatedUrl };
                          });
                        }}
                        placeholder="https://wa.me/919157873576"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* PORTFOLIO PROJECT ITEMS FIELDS */}
              {(activeSection === 'projectItems' || modalTargetSection === 'projectItems') && (() => {
                const defaultProjectCategories = ["Game Zones", "Bowling", "Soft Play", "Arcade & VR", "Hospitality"];
                const cats = (Array.isArray(formData.projectCategories) && formData.projectCategories.length > 0)
                  ? Array.from(new Set([...formData.projectCategories, "Hospitality"]))
                  : defaultProjectCategories;
                return (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Project Name</label>
                      <input
                        type="text"
                        value={modalItemData.name || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Hulaboo Game Zone"
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Category</label>
                        <select
                          value={modalItemData.category || cats[0]}
                          onChange={(e) => setModalItemData(prev => ({ ...prev, category: e.target.value }))}
                          style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px', background: '#fff' }}
                        >
                          {cats.map((c, i) => <option key={i} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Project Type</label>
                        <input
                          type="text"
                          value={modalItemData.type || ''}
                          onChange={(e) => setModalItemData(prev => ({ ...prev, type: e.target.value }))}
                          placeholder="e.g. Game Zone Setup"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '600', fontSize: '14px' }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>City</label>
                        <input
                          type="text"
                          value={modalItemData.city || ''}
                          onChange={(e) => setModalItemData(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="e.g. Surat"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '600', fontSize: '14px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>State</label>
                        <input
                          type="text"
                          value={modalItemData.state || ''}
                          onChange={(e) => setModalItemData(prev => ({ ...prev, state: e.target.value }))}
                          placeholder="e.g. Gujarat"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '600', fontSize: '14px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Total Area</label>
                        <input
                          type="text"
                          value={modalItemData.area || ''}
                          onChange={(e) => setModalItemData(prev => ({ ...prev, area: e.target.value }))}
                          placeholder="e.g. 27,000 sq. ft."
                          style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '600', fontSize: '14px' }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Detail Page Slug Link</label>
                        <input
                          type="text"
                          value={modalItemData.slug || ''}
                          onChange={(e) => setModalItemData(prev => ({ ...prev, slug: e.target.value }))}
                          placeholder="e.g. hulaboo (opens /project/hulaboo)"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '600', fontSize: '14px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Project Status</label>
                        <select
                          value={(modalItemData.isActive !== false && modalItemData.status !== 'inactive') ? 'active' : 'inactive'}
                          onChange={(e) => {
                            const isAct = e.target.value === 'active';
                            setModalItemData(prev => ({ ...prev, isActive: isAct, status: isAct ? 'active' : 'inactive' }));
                          }}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '12px',
                            border: '1.5px solid #cbd5e1',
                            fontWeight: '800',
                            fontSize: '14px',
                            background: (modalItemData.isActive !== false && modalItemData.status !== 'inactive') ? '#ecfdf5' : '#fef2f2',
                            color: (modalItemData.isActive !== false && modalItemData.status !== 'inactive') ? '#059669' : '#dc2626'
                          }}
                        >
                          <option value="active">🟢 Active (Visible on Website)</option>
                          <option value="inactive">🔴 Inactive (Hidden from Website)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>
                        Upload Project Photo <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                      </label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <label style={{
                          background: '#38bdf8',
                          color: '#fff',
                          padding: '10px 16px',
                          borderRadius: '12px',
                          fontWeight: '800',
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Upload style={{ width: '16px', height: '16px' }} /> Choose Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleModalFileUpload(e, 'img')}
                            style={{ display: 'none' }}
                          />
                        </label>
                        <input
                          type="text"
                          value={modalItemData.img || modalItemData.imageUrl || ''}
                          onChange={(e) => setModalItemData(prev => ({ ...prev, img: e.target.value, imageUrl: e.target.value }))}
                          placeholder="or paste Image URL"
                          style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                        />
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                          🏷️ Project Photo Alt Text (SEO Keyword)
                        </label>
                        <input
                          type="text"
                          value={modalItemData.imgAlt || ''}
                          onChange={(e) => setModalItemData(prev => ({ ...prev, imgAlt: e.target.value }))}
                          placeholder={`e.g. ${modalItemData.name || 'Commercial Game Zone'} Setup - Winera International`}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                        />
                      </div>
                    </div>

                    {/* CASE STUDY CONTENT FIELDS */}
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: 0, paddingBottom: '8px', borderBottom: '1px solid #cbd5e1' }}>
                        📖 Full Case Study Details (Matches Live Detail Page)
                      </h4>

                      {/* Headline Lines */}
                      <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h5 style={{ fontSize: '12.5px', fontWeight: '800', color: '#0284c7', margin: 0 }}>Case Study Headline Lines</h5>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Title Line 1 (Cyan/Blue Text)</label>
                            <input
                              type="text"
                              value={modalItemData.titleLine1 || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, titleLine1: e.target.value }))}
                              placeholder="e.g. FifthAlley Sport Bowling: A"
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: '700' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Title Line 2 (Cyan Prefix)</label>
                            <input
                              type="text"
                              value={modalItemData.titleLine2 || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, titleLine2: e.target.value }))}
                              placeholder="e.g. Complete "
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: '700' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Title Line 2 (Dark Text)</label>
                            <input
                              type="text"
                              value={modalItemData.titleLine2Black || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, titleLine2Black: e.target.value }))}
                              placeholder="e.g. Bowling Alley Setup"
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: '700' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Title Line 3 (Dark Location/Details)</label>
                            <input
                              type="text"
                              value={modalItemData.titleLine3 || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, titleLine3: e.target.value }))}
                              placeholder="e.g. in the Heart of Surat"
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: '700' }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Subheadline / Description Summary</label>
                          <RichTextareaWithEditor
                            rows={3}
                            value={modalItemData.description || ''}
                            onChange={(val) => setModalItemData(prev => ({ ...prev, description: val }))}
                            placeholder="e.g. How we designed and installed a professional-grade bowling alley across 3,000 sq. ft..."
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                          />
                        </div>
                      </div>

                      {/* CTA Button & WhatsApp Pre-filled Message */}
                      <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h5 style={{ fontSize: '12.5px', fontWeight: '800', color: '#0284c7', margin: 0 }}>CTA Button & WhatsApp Pre-filled Message</h5>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Button Text / Label</label>
                            <input
                              type="text"
                              value={modalItemData.buttonText !== undefined ? modalItemData.buttonText : 'Get A Quote'}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, buttonText: e.target.value }))}
                              placeholder="e.g. Get A Quote"
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: '700' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Button Base Link (WhatsApp URL)</label>
                            <input
                              type="text"
                              value={modalItemData.buttonLink !== undefined ? modalItemData.buttonLink : 'https://wa.me/919157873576'}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, buttonLink: e.target.value }))}
                              placeholder="https://wa.me/919157873576"
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>
                            WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '10.5px', color: '#0284c7', background: '#e0f2fe', padding: '1px 6px', borderRadius: '4px', fontWeight: '700', marginLeft: '6px' }}>💬 Sent when user clicks Get A Quote</span>
                          </label>
                          <textarea
                            rows={2}
                            value={(() => {
                              if (modalItemData.waMessage !== undefined && modalItemData.waMessage !== '') return modalItemData.waMessage;
                              if (modalItemData.buttonLink && modalItemData.buttonLink.includes('text=')) {
                                try {
                                  const match = modalItemData.buttonLink.match(/text=([^&]+)/);
                                  if (match && match[1]) return decodeURIComponent(match[1]);
                                } catch (err) { }
                              }
                              return `Hello Winera International! I want to get a project quote for ${modalItemData.name || 'this project'}. Please share details. [Ref: Project Detail Page]`;
                            })()}
                            onChange={(e) => {
                              const newMsg = e.target.value;
                              const baseLink = (modalItemData.buttonLink && modalItemData.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                              const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                              setModalItemData(prev => ({
                                ...prev,
                                waMessage: newMsg,
                                buttonLink: updatedLink
                              }));
                            }}
                            placeholder="e.g. Hello Winera International! I want to get a project quote..."
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', lineHeight: 1.5 }}
                          />
                        </div>
                      </div>

                      {/* Basic Information Card Block */}
                      <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h5 style={{ fontSize: '12.5px', fontWeight: '800', color: '#0284c7', margin: 0 }}>Basic Information Card Section</h5>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>
                            Card Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1200 × 800 px</span>
                          </label>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <label style={{ background: '#0284c7', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Upload style={{ width: '14px', height: '14px' }} /> Upload BG Image
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleModalFileUpload(e, 'basicInfoBg')}
                                style={{ display: 'none' }}
                              />
                            </label>
                            <input
                              type="text"
                              value={modalItemData.basicInfoBg || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, basicInfoBg: e.target.value }))}
                              placeholder="Image URL or Asset Path (e.g. /src/assets/project-images-bg.webp)"
                              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                            />
                            {modalItemData.basicInfoBg && (
                              <img src={modalItemData.basicInfoBg} alt="" style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '6px' }} />
                            )}
                          </div>
                          <div style={{ marginTop: '6px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '3px' }}>
                              🏷️ Background Image Alt Text (SEO Keyword)
                            </label>
                            <input
                              type="text"
                              value={modalItemData.basicInfoBgAlt || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, basicInfoBgAlt: e.target.value }))}
                              placeholder={`e.g. ${modalItemData.name || 'Commercial Game Zone'} Setup Facility - Winera`}
                              style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* What Client Wanted Block */}
                      <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h5 style={{ fontSize: '12.5px', fontWeight: '800', color: '#0284c7', margin: 0 }}>What The Client Wanted Section</h5>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Paragraph 1</label>
                          <RichTextareaWithEditor
                            rows={3}
                            value={modalItemData.clientWanted1 || ''}
                            onChange={(val) => setModalItemData(prev => ({ ...prev, clientWanted1: val }))}
                            placeholder="The client had an empty 3,000 sq. ft. space in Katargam and a clear goal..."
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Paragraph 2</label>
                          <RichTextareaWithEditor
                            rows={3}
                            value={modalItemData.clientWanted2 || ''}
                            onChange={(val) => setModalItemData(prev => ({ ...prev, clientWanted2: val }))}
                            placeholder="They didn't want a supplier who only supplied equipment. They wanted one partner..."
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>
                            Section Photo (What Client Wanted) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Ratio: 16:10 (e.g. 430 × 270 px)</span>
                          </label>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <label style={{ background: '#0284c7', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Upload style={{ width: '14px', height: '14px' }} /> Upload Photo
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleModalFileUpload(e, 'clientImg')}
                                style={{ display: 'none' }}
                              />
                            </label>
                            <input
                              type="text"
                              value={modalItemData.clientImg || modalItemData.clientImageUrl || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, clientImg: e.target.value, clientImageUrl: e.target.value }))}
                              placeholder="Image URL or Asset Path"
                              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                            />
                            {(modalItemData.clientImg || modalItemData.clientImageUrl) && (
                              <img src={modalItemData.clientImg || modalItemData.clientImageUrl} alt="" style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '6px' }} />
                            )}
                          </div>
                          <div style={{ marginTop: '6px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '3px' }}>
                              🏷️ Client Photo Alt Text (SEO Keyword)
                            </label>
                            <input
                              type="text"
                              value={modalItemData.clientImgAlt || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, clientImgAlt: e.target.value }))}
                              placeholder={`e.g. ${modalItemData.name || 'Commercial Game Zone'} Client Requirement Setup - Winera`}
                              style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* What Solution We Provide Block */}
                      <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h5 style={{ fontSize: '12.5px', fontWeight: '800', color: '#0284c7', margin: 0 }}>What Solution We Provide Section</h5>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Paragraph 1</label>
                          <textarea
                            rows={2}
                            value={modalItemData.solution1 || ''}
                            onChange={(e) => setModalItemData(prev => ({ ...prev, solution1: e.target.value }))}
                            placeholder="We delivered FifthAlley Sport Bowling as a complete, ready-to-open venue..."
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Paragraph 2</label>
                          <textarea
                            rows={2}
                            value={modalItemData.solution2 || ''}
                            onChange={(e) => setModalItemData(prev => ({ ...prev, solution2: e.target.value }))}
                            placeholder="The result is a venue that is fun to play in and comfortable..."
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>
                            Section Photo (What Solution We Provide) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Ratio: 16:10 (e.g. 430 × 270 px)</span>
                          </label>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <label style={{ background: '#0284c7', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Upload style={{ width: '14px', height: '14px' }} /> Upload Photo
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleModalFileUpload(e, 'solutionImg')}
                                style={{ display: 'none' }}
                              />
                            </label>
                            <input
                              type="text"
                              value={modalItemData.solutionImg || modalItemData.solutionImageUrl || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, solutionImg: e.target.value, solutionImageUrl: e.target.value }))}
                              placeholder="Image URL or Asset Path"
                              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                            />
                            {(modalItemData.solutionImg || modalItemData.solutionImageUrl) && (
                              <img src={modalItemData.solutionImg || modalItemData.solutionImageUrl} alt="" style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '6px' }} />
                            )}
                          </div>
                          <div style={{ marginTop: '6px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '3px' }}>
                              🏷️ Solution Photo Alt Text (SEO Keyword)
                            </label>
                            <input
                              type="text"
                              value={modalItemData.solutionImgAlt || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, solutionImgAlt: e.target.value }))}
                              placeholder={`e.g. ${modalItemData.name || 'Game Zone'} Turnkey Solution by Winera International`}
                              style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Project Gallery Grid (Dynamic Add / Delete Photos) */}
                      {(() => {
                        const galleryList = Array.isArray(modalItemData.galleryImages) && modalItemData.galleryImages.length > 0
                          ? modalItemData.galleryImages
                          : [
                            modalItemData.galleryImage1 || projectBlock1,
                            modalItemData.galleryImage2 || projectBlock2,
                            modalItemData.galleryImage3 || projectBlock3,
                            modalItemData.galleryImage4 || projectBlock1,
                            modalItemData.galleryImage5 || projectBlock2,
                            modalItemData.galleryImage6 || projectBlock3
                          ].filter(Boolean);

                        return (
                          <div style={{ background: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                              <div>
                                <h5 style={{ fontSize: '13px', fontWeight: '800', color: '#0284c7', margin: 0 }}>
                                  🖼️ Project Gallery Grid ({galleryList.length} Photos)
                                </h5>
                                <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0' }}>Add or delete photos to display 4, 6, 8, or any number of venue photos.</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setModalItemData(prev => {
                                    const currentList = Array.isArray(prev.galleryImages) && prev.galleryImages.length > 0
                                      ? [...prev.galleryImages]
                                      : [
                                        prev.galleryImage1 || projectBlock1,
                                        prev.galleryImage2 || projectBlock2,
                                        prev.galleryImage3 || projectBlock3,
                                        prev.galleryImage4 || projectBlock1,
                                        prev.galleryImage5 || projectBlock2,
                                        prev.galleryImage6 || projectBlock3
                                      ].filter(Boolean);
                                    const updated = [...currentList, projectBlock1];
                                    return {
                                      ...prev,
                                      galleryImages: updated,
                                      galleryImage1: updated[0] || '',
                                      galleryImage2: updated[1] || '',
                                      galleryImage3: updated[2] || '',
                                      galleryImage4: updated[3] || '',
                                      galleryImage5: updated[4] || '',
                                      galleryImage6: updated[5] || ''
                                    };
                                  });
                                }}
                                style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '11.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Plus style={{ width: '14px', height: '14px' }} /> Add Gallery Photo
                              </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', width: '100%' }}>
                              {galleryList.map((imgUrl, idx) => (
                                <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#0f172a' }}>
                                      Gallery Photo #{idx + 1} <span style={{ fontSize: '10.5px', color: '#0284c7', background: '#e0f2fe', padding: '1px 6px', borderRadius: '5px', fontWeight: '700', marginLeft: '6px' }}>📐 Recommended Size: 600 × 500 px</span>
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      {imgUrl ? (
                                        <img src={imgUrl} alt="" style={{ width: '45px', height: '30px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                                      ) : (
                                        <span style={{ fontSize: '10px', color: '#94a3b8', fontStyle: 'italic' }}>No photo</span>
                                      )}
                                      <button
                                        type="button"
                                        title="Delete Photo"
                                        onClick={() => {
                                          setDeleteConfirmModal({
                                            title: 'Delete Gallery Photo?',
                                            message: `Are you sure you want to delete Gallery Photo #${idx + 1}?`,
                                            onConfirm: () => {
                                              setModalItemData(prev => {
                                                const currentList = Array.isArray(prev.galleryImages) && prev.galleryImages.length > 0
                                                  ? [...prev.galleryImages]
                                                  : [
                                                    prev.galleryImage1 || projectBlock1,
                                                    prev.galleryImage2 || projectBlock2,
                                                    prev.galleryImage3 || projectBlock3,
                                                    prev.galleryImage4 || projectBlock1,
                                                    prev.galleryImage5 || projectBlock2,
                                                    prev.galleryImage6 || projectBlock3
                                                  ].filter(Boolean);
                                                const updated = currentList.filter((_, i) => i !== idx);
                                                return {
                                                  ...prev,
                                                  galleryImages: updated,
                                                  galleryImage1: updated[0] || '',
                                                  galleryImage2: updated[1] || '',
                                                  galleryImage3: updated[2] || '',
                                                  galleryImage4: updated[3] || '',
                                                  galleryImage5: updated[4] || '',
                                                  galleryImage6: updated[5] || ''
                                                };
                                              });
                                            }
                                          });
                                        }}
                                        style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '3px 8px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
                                      >
                                        ✕ Delete
                                      </button>
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                    <label style={{ background: '#38bdf8', color: '#fff', padding: '6px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
                                      <Upload style={{ width: '12px', height: '12px', verticalAlign: 'middle', marginRight: '3px' }} /> Choose
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={async (e) => {
                                          const file = e.target.files[0];
                                          if (file) {
                                            const res = await uploadImageFile(file, admin.token);
                                            if (res && res.url) {
                                              setModalItemData(prev => {
                                                const currentList = Array.isArray(prev.galleryImages) && prev.galleryImages.length > 0
                                                  ? [...prev.galleryImages]
                                                  : [
                                                    prev.galleryImage1 || projectBlock1,
                                                    prev.galleryImage2 || projectBlock2,
                                                    prev.galleryImage3 || projectBlock3,
                                                    prev.galleryImage4 || projectBlock1,
                                                    prev.galleryImage5 || projectBlock2,
                                                    prev.galleryImage6 || projectBlock3
                                                  ].filter(Boolean);
                                                currentList[idx] = res.url;
                                                return {
                                                  ...prev,
                                                  galleryImages: currentList,
                                                  galleryImage1: currentList[0] || '',
                                                  galleryImage2: currentList[1] || '',
                                                  galleryImage3: currentList[2] || '',
                                                  galleryImage4: currentList[3] || '',
                                                  galleryImage5: currentList[4] || '',
                                                  galleryImage6: currentList[5] || ''
                                                };
                                              });
                                            }
                                          }
                                        }}
                                        style={{ display: 'none' }}
                                      />
                                    </label>
                                    <input
                                      type="text"
                                      value={imgUrl || ''}
                                      onChange={(e) => {
                                        const newUrl = e.target.value;
                                        setModalItemData(prev => {
                                          const currentList = Array.isArray(prev.galleryImages) && prev.galleryImages.length > 0
                                            ? [...prev.galleryImages]
                                            : [
                                              prev.galleryImage1 || projectBlock1,
                                              prev.galleryImage2 || projectBlock2,
                                              prev.galleryImage3 || projectBlock3,
                                              prev.galleryImage4 || projectBlock1,
                                              prev.galleryImage5 || projectBlock2,
                                              prev.galleryImage6 || projectBlock3
                                            ].filter(Boolean);
                                          currentList[idx] = newUrl;
                                          return {
                                            ...prev,
                                            galleryImages: currentList,
                                            galleryImage1: currentList[0] || '',
                                            galleryImage2: currentList[1] || '',
                                            galleryImage3: currentList[2] || '',
                                            galleryImage4: currentList[3] || '',
                                            galleryImage5: currentList[4] || '',
                                            galleryImage6: currentList[5] || ''
                                          };
                                        });
                                      }}
                                      placeholder="Image URL..."
                                      style={{ flex: 1, minWidth: 0, padding: '6px 8px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '11px' }}
                                    />
                                  </div>
                                  <div style={{ marginTop: '4px' }}>
                                    <input
                                      type="text"
                                      value={Array.isArray(modalItemData.galleryImagesAlt) ? (modalItemData.galleryImagesAlt[idx] || '') : ''}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setModalItemData(prev => {
                                          const altList = Array.isArray(prev.galleryImagesAlt) ? [...prev.galleryImagesAlt] : [];
                                          altList[idx] = val;
                                          return { ...prev, galleryImagesAlt: altList };
                                        });
                                      }}
                                      placeholder={`🏷️ Gallery Photo #${idx + 1} Alt Text (SEO Keyword)`}
                                      style={{ width: '100%', boxSizing: 'border-box', padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px' }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Project Video Showcase */}
                      <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h5 style={{ fontSize: '12.5px', fontWeight: '800', color: '#0284c7', margin: 0 }}>🎥 Project Video Showcase</h5>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>
                            Video Cover Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1280 × 720 px (16:9)</span>
                          </label>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <label style={{ background: '#0284c7', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Upload style={{ width: '14px', height: '14px' }} /> Upload Cover
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleModalFileUpload(e, 'videoImg')}
                                style={{ display: 'none' }}
                              />
                            </label>
                            <input
                              type="text"
                              value={modalItemData.videoImg || modalItemData.videoCoverUrl || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, videoImg: e.target.value, videoCoverUrl: e.target.value }))}
                              placeholder="Image URL or Asset Path"
                              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                            />
                            {(modalItemData.videoImg || modalItemData.videoCoverUrl) && (
                              <img src={modalItemData.videoImg || modalItemData.videoCoverUrl} alt="" style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '6px' }} />
                            )}
                          </div>
                          <div style={{ marginTop: '6px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '3px' }}>
                              🏷️ Video Cover Alt Text (SEO Keyword)
                            </label>
                            <input
                              type="text"
                              value={modalItemData.videoAlt || ''}
                              onChange={(e) => setModalItemData(prev => ({ ...prev, videoAlt: e.target.value }))}
                              placeholder={`e.g. ${modalItemData.name || 'Commercial Game Zone'} Setup Video Tour - Winera`}
                              style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>YouTube Video URL / Action Link</label>
                          <input
                            type="text"
                            value={modalItemData.videoUrl || modalItemData.videoLink || ''}
                            onChange={(e) => setModalItemData(prev => ({ ...prev, videoUrl: e.target.value, videoLink: e.target.value }))}
                            placeholder="e.g. https://youtube.com/watch?v=... or https://wa.me/..."
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                          />
                        </div>
                      </div>

                      {/* Project Specific SEO Meta Title & Description */}
                      <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h5 style={{ fontSize: '12.5px', fontWeight: '800', color: '#0284c7', margin: 0 }}>🔍 Individual Project SEO Meta Title & Meta Description</h5>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Meta Title (SEO Title)</label>
                          <input
                            type="text"
                            value={modalItemData.metaTitle || modalItemData.seoTitle || ''}
                            onChange={(e) => setModalItemData(prev => ({ ...prev, metaTitle: e.target.value, seoTitle: e.target.value }))}
                            placeholder="e.g. Bowling Alley Setup in Surat – LaneX at AR Mall | Winera International"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: '600' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '4px' }}>Meta Description (SEO Description)</label>
                          <textarea
                            rows={3}
                            value={modalItemData.metaDescription || modalItemData.seoDescription || ''}
                            onChange={(e) => setModalItemData(prev => ({ ...prev, metaDescription: e.target.value, seoDescription: e.target.value }))}
                            placeholder="e.g. See how Winera International built LaneX Bowling Alley in Surat..."
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}

              {/* 4. FAQ FIELDS */}
              {((activeSection && activeSection.toLowerCase().includes('faq')) || (modalTargetSection && modalTargetSection.toLowerCase().includes('faq'))) && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Question Text</label>
                    <input
                      type="text"
                      value={modalItemData.q || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, q: e.target.value }))}
                      placeholder="Enter question..."
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Answer Text"
                      rows={4}
                      value={modalItemData.a || ''}
                      onChange={(val) => setModalItemData(prev => ({ ...prev, a: val }))}
                      placeholder="Enter detailed answer..."
                    />
                  </div>
                </>
              )}

              {/* 5. TESTIMONIAL FIELDS */}
              {activeSection === 'testimonials' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Game Zone Name</label>
                      <input
                        type="text"
                        value={modalItemData.gameZoneName || modalItemData.name || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, gameZoneName: e.target.value, name: e.target.value }))}
                        placeholder="e.g. Hulaboo Game Zone"
                        style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Reviewer Role / Location</label>
                      <input
                        type="text"
                        value={modalItemData.reviewerRole || modalItemData.role || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, reviewerRole: e.target.value, role: e.target.value }))}
                        placeholder="e.g. Surat"
                        style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Star Rating ({modalItemData.starRating || modalItemData.rating || 5} Stars)</label>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', padding: '4px 0' }}>
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const isFilled = starVal <= (modalItemData.starRating || modalItemData.rating || 5);
                        return (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setModalItemData(prev => ({ ...prev, starRating: starVal, rating: starVal }))}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '2px',
                              transition: 'transform 0.15s ease'
                            }}
                          >
                            <Star
                              style={{
                                width: '26px',
                                height: '26px',
                                color: isFilled ? '#ffcd00' : '#cbd5e1',
                                fill: isFilled ? '#ffcd00' : 'none',
                                strokeWidth: 2
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>
                      YouTube Video Link <span style={{ fontSize: '10.5px', color: '#0284c7', background: '#e0f2fe', padding: '1px 6px', borderRadius: '4px', fontWeight: '700', marginLeft: '4px' }}>🎬 Video / Shorts URL</span>
                    </label>
                    <input
                      type="text"
                      value={modalItemData.youtubeVideoUrl || modalItemData.videoUrl || ''}
                      onChange={(e) => {
                        const urlVal = e.target.value;
                        setModalItemData(prev => {
                          const updated = { ...prev, youtubeVideoUrl: urlVal, videoUrl: urlVal };
                          if (!prev.videoImg && urlVal) {
                            const match = urlVal.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/))([^"&?\/\s]{11})/i);
                            if (match && match[1]) {
                              updated.videoImg = `https://img.youtube.com/vi/${match[1]}/sddefault.jpg`;
                              updated.videoThumbnail = updated.videoImg;
                            }
                          }
                          return updated;
                        });
                      }}
                      placeholder="https://www.youtube.com/shorts/... or https://www.youtube.com/watch?v=..."
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    {/* Founder Photo */}
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                        Founder / Client Photo <span style={{ fontSize: '10px', color: '#64748b' }}>(Square 1:1)</span>
                      </label>
                      <input
                        type="text"
                        value={modalItemData.founderImage || modalItemData.img || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, founderImage: e.target.value, img: e.target.value }))}
                        placeholder="Image URL or upload below..."
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px', marginBottom: '8px' }}
                      />
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label style={{
                          background: '#38bdf8',
                          color: '#fff',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          fontWeight: '800',
                          fontSize: '11.5px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Upload style={{ width: '13px', height: '13px' }} /> Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleModalFileUpload(e, 'founderImage')}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {(modalItemData.founderImage || modalItemData.img) && (
                          <img
                            src={modalItemData.founderImage || modalItemData.img}
                            alt=""
                            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #cbd5e1' }}
                          />
                        )}
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '3px' }}>
                          🏷️ Photo Alt Text (SEO Keyword)
                        </label>
                        <input
                          type="text"
                          value={modalItemData.founderImgAlt || modalItemData.imgAlt || ''}
                          onChange={(e) => setModalItemData(prev => ({ ...prev, founderImgAlt: e.target.value, imgAlt: e.target.value }))}
                          placeholder="e.g. Client Testimonial - Game Zone Owner"
                          style={{ width: '100%', boxSizing: 'border-box', padding: '6px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '11.5px' }}
                        />
                      </div>
                    </div>

                    {/* Video Cover / Thumbnail Photo */}
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                        Video Cover Photo <span style={{ fontSize: '10px', color: '#64748b' }}>(Right side frame)</span>
                      </label>
                      <input
                        type="text"
                        value={modalItemData.videoImg || modalItemData.videoThumbnail || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, videoImg: e.target.value, videoThumbnail: e.target.value }))}
                        placeholder="Thumbnail URL or upload..."
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px', marginBottom: '8px' }}
                      />
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label style={{
                          background: '#0284c7',
                          color: '#fff',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          fontWeight: '800',
                          fontSize: '11.5px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Upload style={{ width: '13px', height: '13px' }} /> Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleModalFileUpload(e, 'videoImg')}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {(modalItemData.videoImg || modalItemData.videoThumbnail) && (
                          <img
                            src={modalItemData.videoImg || modalItemData.videoThumbnail}
                            alt=""
                            style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover', border: '2px solid #cbd5e1' }}
                          />
                        )}
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '3px' }}>
                          🏷️ Video Thumbnail Alt Text (SEO Keyword)
                        </label>
                        <input
                          type="text"
                          value={modalItemData.videoImgAlt || ''}
                          onChange={(e) => setModalItemData(prev => ({ ...prev, videoImgAlt: e.target.value }))}
                          placeholder="e.g. Video Testimonial - Client Feedback Winera"
                          style={{ width: '100%', boxSizing: 'border-box', padding: '6px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '11.5px' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Review Quote</label>
                    <textarea
                      rows={3}
                      value={modalItemData.quote || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, quote: e.target.value }))}
                      placeholder="Enter review quote..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px', lineHeight: 1.5 }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                onClick={closeModal}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  color: '#475569',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveModalItem}
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  background: '#38bdf8',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                }}
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STYLISH CONFIRMATION DELETE MODAL */}
      {deleteConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            maxWidth: '440px',
            width: '100%',
            padding: '32px 26px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: '#ef4444',
              boxShadow: '0 8px 20px rgba(239, 68, 68, 0.25)'
            }}>
              <Trash2 style={{ width: '32px', height: '32px' }} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: '0 0 8px' }}>
              {deleteConfirmModal.title || 'Are you sure?'}
            </h3>

            <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 24px', lineHeight: 1.5, fontWeight: '500' }}>
              {deleteConfirmModal.message || 'Are you sure you want to delete this item? This action cannot be undone.'}
            </p>

            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <button
                onClick={() => setDeleteConfirmModal(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  background: '#f1f5f9',
                  border: '1.5px solid #cbd5e1',
                  color: '#475569',
                  fontWeight: '800',
                  fontSize: '13.5px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (typeof deleteConfirmModal.onConfirm === 'function') {
                    deleteConfirmModal.onConfirm();
                  }
                  setDeleteConfirmModal(null);
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
                }}
              >
                Yes, Delete It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

