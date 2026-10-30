import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react';
import { useVideoModal } from '../context/VideoModalContext';
import SectionHeading from './SectionHeading';
import MotionFadeIn from './MotionFadeIn';
const testiOwner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/zginla6nsiaq2avxmot4.jpg";
const projHulaboo = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/a52mbp31belkkslptdal.jpg";
const projNeon1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/s8v6jwxs7eyoq877yeso.jpg";

const defaultTestimonials = [
  {
    quote: "When we were planning Rebounce we had the space and the budget but no idea how to turn it into a game zone. Winera International Pvt. Ltd. made the entire process effortless. One meeting was enough. We shared our requirements and they handled everything from game selection and layout design to complete installation. The result speaks for itself Rebounce today is a thriving game zone and our customers keep coming back.",
    name: "Rebounce Game Zone",
    gameZoneName: "Rebounce Game Zone",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/uanfdgdjqntkeaqm8d9u.webp",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/uanfdgdjqntkeaqm8d9u.webp",
    youtubeVideoUrl: "https://www.youtube.com/shorts/YNrfGqhhl5w",
    videoUrl: "https://www.youtube.com/shorts/YNrfGqhhl5w",
    videoImg: "https://img.youtube.com/vi/YNrfGqhhl5w/sddefault.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Choosing the right gaming zone setup company in India was critical for us given our tight deadline. Winera International Pvt. Ltd. delivered everything as planned and on schedule. Fun Houze opening day went smoothly and the game zone setup was exactly as we discussed.",
    name: "Fun Houze",
    gameZoneName: "Fun Houze",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/q9p8mlpn0ws9f9vlrxhd.webp",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/q9p8mlpn0ws9f9vlrxhd.webp",
    youtubeVideoUrl: "https://youtube.com/shorts/YXhUJ1k6pbQ",
    videoUrl: "https://youtube.com/shorts/YXhUJ1k6pbQ",
    videoImg: "https://img.youtube.com/vi/YXhUJ1k6pbQ/sddefault.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "To be honest before starting Hulaboo we had visited multiple game zone setup companies and was confused about who to trust. When we finally met Winera International Pvt. Ltd. the clarity they gave us from day one was different. They explained the entire process, showed us real projects and gave us a transparent quote. That confidence is what made us sign. And they delivered exactly what they promised.",
    name: "Hulaboo Game Zone",
    gameZoneName: "Hulaboo Game Zone",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877032/winera_uploads/projects/jvr2xtu8jszcmzaglxmr.jpg",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877032/winera_uploads/projects/jvr2xtu8jszcmzaglxmr.jpg",
    youtubeVideoUrl: "https://youtube.com/shorts/Jvtsn-TxVqE",
    videoUrl: "https://youtube.com/shorts/Jvtsn-TxVqE",
    videoImg: "https://img.youtube.com/vi/Jvtsn-TxVqE/sddefault.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Combining soft play and arcade under one roof was our vision but we had no idea how to execute it. We needed a reliable soft play equipment manufacturer in India who could also handle the arcade side. Winera International Pvt. Ltd. designed the House of Pepe layout perfectly; both zones feel different but connected. Customers enjoy both sections equally.",
    name: "House of Pepe",
    gameZoneName: "House of Pepe",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360320/winera_uploads/etpnimwouc6kknkwqzpd.webp",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360320/winera_uploads/etpnimwouc6kknkwqzpd.webp",
    youtubeVideoUrl: "https://youtube.com/shorts/lf1VMqxFvR0",
    videoUrl: "https://youtube.com/shorts/lf1VMqxFvR0",
    videoImg: "https://img.youtube.com/vi/lf1VMqxFvR0/sddefault.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Most game zone equipment suppliers just deliver and disappear. What surprised us most about Winera International Pvt. Ltd. was that they actually sat with us, understood our space and planned the entire Funfair game zone layout from scratch. That level of involvement made a real difference to our final setup.",
    name: "Funfair",
    gameZoneName: "Funfair",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1787751038/winera_uploads/d2hp3wbwrlideyexncbq.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1787751038/winera_uploads/d2hp3wbwrlideyexncbq.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/igg4yrl7xhnxllqifpj7.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/igg4yrl7xhnxllqifpj7.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Before finalizing we visited Winera International Pvt. Ltd. previous projects in person. The quality we saw there gave us confidence to move forward with Playzonia. They designed our complete soft play layout, selected age-appropriate equipment for children and handled the full installation from start to finish. Kids enjoy it daily and parents feel safe. That is our biggest win.",
    name: "Playzonia",
    gameZoneName: "Playzonia",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880827/winera_uploads/lqfwvfukadxhxyvvs313.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880827/winera_uploads/lqfwvfukadxhxyvvs313.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877055/winera_uploads/projects/kqskvifgcu4d5yuthggs.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877055/winera_uploads/projects/kqskvifgcu4d5yuthggs.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Adding a game zone to Uday Palace was a new experiment for us. We were looking for a complete indoor amusement park setup company in India and Winera International Pvt. Ltd. made the entire process simple and stress free. Today our game zone is one of the most enjoyed parts of our venue especially by families.",
    name: "Uday Palace",
    gameZoneName: "Uday Palace",
    role: "Navsari",
    reviewerRole: "Navsari",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881418/winera_uploads/xrrhjysw5s2kv13idbab.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881418/winera_uploads/xrrhjysw5s2kv13idbab.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791885839/winera_uploads/dnipphbitg7auvb8tkmz.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791885839/winera_uploads/dnipphbitg7auvb8tkmz.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Our space was completely underutilized before the VR gaming zone setup. Winera International Pvt. Ltd. transformed our space into a complete VR gaming zone and the results have been outstanding. Now 360 runs are packed almost every day and the ROI came much faster than we expected.",
    name: "360 VR Zone",
    gameZoneName: "360 VR Zone",
    role: "Gandhidham",
    reviewerRole: "Gandhidham",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880703/winera_uploads/nzzkicxebupzlpxlmhzy.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880703/winera_uploads/nzzkicxebupzlpxlmhzy.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791883780/winera_uploads/e9haienezg91tzsgj38x.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791883780/winera_uploads/e9haienezg91tzsgj38x.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Winera International set up our indoor play area, and the whole process was smooth from design to installation. The space is safe, colourful, and the kids absolutely love it. Parents keep coming back, and it's become the highlight of our venue.",
    name: "Team Bounce Berry",
    gameZoneName: "Team Bounce Berry",
    role: "Mumbai",
    reviewerRole: "Mumbai",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881018/winera_uploads/vvzdaifxodmrp1ivuaf8.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881018/winera_uploads/vvzdaifxodmrp1ivuaf8.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791885832/winera_uploads/cgxqcpf3yhkezpkq6rdi.webp",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791885832/winera_uploads/cgxqcpf3yhkezpkq6rdi.webp",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Winera developed our gaming zone end to end, and their team handled everything professionally. The equipment quality is excellent, and the support after installation has been quick and reliable. A great partner to work with.",
    name: "Team Nextgen Gaming Zone",
    gameZoneName: "Team Nextgen Gaming Zone",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881491/winera_uploads/buvknsolyme0s1f4fblf.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881491/winera_uploads/buvknsolyme0s1f4fblf.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791885830/winera_uploads/b1krydhxzvuibrbgnuuw.webp",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791885830/winera_uploads/b1krydhxzvuibrbgnuuw.webp",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Winera International helped us bring together everything under one roof — bowling, arcade, VR, and kids' play area. The whole project was well managed and finished on time, and honestly the variety is what keeps our guests coming back.",
    name: "Team Rock and Bowl",
    gameZoneName: "Team Rock and Bowl",
    role: "Vapi",
    reviewerRole: "Vapi",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880571/winera_uploads/gthc5zzrwzn9gkouwd9r.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880571/winera_uploads/gthc5zzrwzn9gkouwd9r.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877846/winera_uploads/ebko4as1kehon9gbnkg7.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877846/winera_uploads/ebko4as1kehon9gbnkg7.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Our soft play area was designed and installed exactly to our space and budget. The build quality is great, it's safe for the children, and thanks to Winera International the response from families has been wonderful.",
    name: "Team The Fun Factory",
    gameZoneName: "Team The Fun Factory",
    role: "Nallasopara",
    reviewerRole: "Nallasopara",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881095/winera_uploads/bcwejmmx5q48jdzujogs.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881095/winera_uploads/bcwejmmx5q48jdzujogs.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881209/winera_uploads/b9jr71otq8j24u3ugqid.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881209/winera_uploads/b9jr71otq8j24u3ugqid.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "From the first design to the final setup, Winera International made everything easy. They understood our space and delivered a bright, safe play area that kids enjoy every day. Professional team, smooth experience.",
    name: "Team Zaazaa Play",
    gameZoneName: "Team Zaazaa Play",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880677/winera_uploads/exkp2vteumt8ky75mdbp.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880677/winera_uploads/exkp2vteumt8ky75mdbp.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/olzpipldgl4mnb7c1y5q.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/olzpipldgl4mnb7c1y5q.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Winera built our multi-level soft play area. The climbing frames, slides, and ball pool are all top quality and completely safe for the kids. They handled everything with real professionalism, and children love spending time here. Their team supported us at every step.",
    name: "Team Gif Gaming is Fun",
    gameZoneName: "Team Gif Gaming is Fun",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880235/winera_uploads/gtiimh5jducs44uq90ej.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880235/winera_uploads/gtiimh5jducs44uq90ej.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791885836/winera_uploads/fg9p4noqwygcofknhl7i.webp",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791885836/winera_uploads/fg9p4noqwygcofknhl7i.webp",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Winera International built our kids' play area from start to finish, and the whole process was stress-free. The equipment is safe and well made, and our young visitors have a great time.",
    name: "Team Kidzonation",
    gameZoneName: "Team Kidzonation",
    role: "Mumbai",
    reviewerRole: "Mumbai",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880859/winera_uploads/btgwetb1unmp1qzjvzvd.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880859/winera_uploads/btgwetb1unmp1qzjvzvd.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791884286/winera_uploads/d9xxrrcg3v8trnkiq9kp.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791884286/winera_uploads/d9xxrrcg3v8trnkiq9kp.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Winera developed our game zone and delivered exactly what we needed. The setup was smooth, the equipment quality is top class, and the after-sales support has been dependable. A pleasure to work with.",
    name: "Team Fizzy Fox",
    gameZoneName: "Team Fizzy Fox",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791876622/winera_uploads/gcaitxliikawd3sx2jj0.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791876622/winera_uploads/gcaitxliikawd3sx2jj0.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/s8v6jwxs7eyoq877yeso.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/s8v6jwxs7eyoq877yeso.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "From planning to opening day, Winera International handled our game zone setup professionally. Their team understood our space and delivered on time. Our visitors love it, and it's been great for business.",
    name: "Team Rumble Zone",
    gameZoneName: "Team Rumble Zone",
    role: "Gurugram",
    reviewerRole: "Gurugram",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880086/winera_uploads/snodsgd2vmwbjuoux6gq.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880086/winera_uploads/snodsgd2vmwbjuoux6gq.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880685/winera_uploads/ts0qlqlxigm1vfl1qp9s.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880685/winera_uploads/ts0qlqlxigm1vfl1qp9s.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "The indoor kids play zone Winera built for us has become the highlight of our space. The quality of soft play products, attention to safety, and the overall finish of the installation reflects the expertise their team brings to every project.",
    name: "Team Happy Hoppers",
    gameZoneName: "Team Happy Hoppers",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881052/winera_uploads/bfrwk0i7ho8vwqc65bjy.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881052/winera_uploads/bfrwk0i7ho8vwqc65bjy.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882832/winera_uploads/megu51reihwjmg7sodji.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882832/winera_uploads/megu51reihwjmg7sodji.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Winera International handled our soft play setup from design to installation with complete professionalism. The 3D design process gave us full clarity before anything was built, and the final soft play equipment quality exceeded our expectations. We've had great visitor response since opening.",
    name: "Team Playzonia, Surat",
    gameZoneName: "Team Playzonia, Surat",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880827/winera_uploads/lqfwvfukadxhxyvvs313.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880827/winera_uploads/lqfwvfukadxhxyvvs313.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877055/winera_uploads/projects/kqskvifgcu4d5yuthggs.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877055/winera_uploads/projects/kqskvifgcu4d5yuthggs.jpg",
    rating: 5,
    starRating: 5
  },
  {
    quote: "Getting a bowling setup right takes real know-how, and that's what Winera brought. From choosing the right equipment to installing it and training our staff, everything was handled properly and the after-sales support has been just as reliable. Our guests love the lanes.",
    name: "Team FifthAlley",
    gameZoneName: "Team FifthAlley",
    role: "Surat",
    reviewerRole: "Surat",
    img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880600/winera_uploads/ziokha3xbk9ae3fatijh.png",
    founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880600/winera_uploads/ziokha3xbk9ae3fatijh.png",
    youtubeVideoUrl: "",
    videoUrl: "",
    videoImg: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877018/winera_uploads/projects/lf45hnr7l9jwbij9gh4q.jpg",
    videoThumbnail: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877018/winera_uploads/projects/lf45hnr7l9jwbij9gh4q.jpg",
    rating: 5,
    starRating: 5
  }
];

export default function TestimonialsSection({
  id = 'testimonials',
  siteData = null,
  testimonials = defaultTestimonials,
  title = '*What Our* Clients Say',
  subtitle = "We are proud to have helped businesses across India build successful game zones. Here's what our clients say about our quality, service, and support.",
  highlightColor = '#00a8ff',
  bg = '#F5F5F9',
  accentWidth = '465px',
  accentMaxWidth = '100%',
  accentHeight = '11px',
  accentMarginBottom = '8px',
  accentAlign = 'center'
}) {
  const actualTestimonials = (() => {
    if (Array.isArray(siteData?.testimonials) && siteData.testimonials.length > 0) return siteData.testimonials;
    if (Array.isArray(testimonials) && testimonials.length > 0) return testimonials;
    try {
      const cached = JSON.parse(localStorage.getItem('winera_cached_testimonials') || '[]');
      if (Array.isArray(cached) && cached.length > 0) return cached;
    } catch (e) {}
    return defaultTestimonials;
  })();
  const list = Array.isArray(actualTestimonials) && actualTestimonials.length > 0 ? actualTestimonials : defaultTestimonials;
  const actualTitle = siteData?.testimonialsHeader?.title || title;
  let actualSubtitle = siteData?.testimonialsHeader?.subtitle || subtitle;
  if (typeof actualSubtitle === 'string' && actualSubtitle.includes('When we were planning Rebounce')) {
    actualSubtitle = actualSubtitle.replace(/\n*When we were planning Rebounce[\s\S]*$/, '').trim();
  }
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { openVideoModal } = useVideoModal();
  const currentItem = list[activeIndex % list.length] || defaultTestimonials[0];

  const getYouTubeThumbnail = (url, fallbackImg) => {
    if (!url || typeof url !== 'string') return fallbackImg;
    const trimmed = url.trim();
    const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/))([^"&?\/\s]{11})/i);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/sddefault.jpg`;
    }
    return fallbackImg;
  };

  const activeVideoUrl = currentItem?.youtubeVideoUrl || currentItem?.videoUrl || currentItem?.videoLink || '';
  const videoThumbnail = currentItem?.videoImg || currentItem?.videoThumbnail || getYouTubeThumbnail(activeVideoUrl, currentItem?.founderImage || currentItem?.img || testiOwner);

  const goNext = () => {
    setIsExpanded(false);
    setActiveIndex((prev) => (prev < list.length - 1 ? prev + 1 : 0));
  };
  const goPrev = () => {
    setIsExpanded(false);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : list.length - 1));
  };

  const hasMultipleTestimonials = list.length > 1;

  return (
    <section id={id} className="winera-testi-section" style={{ padding: '45px 4vw 60px', background: bg, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <MotionFadeIn>
          <SectionHeading marginBottom="12px" accentWidth={accentWidth} accentMaxWidth={accentMaxWidth} accentHeight={accentHeight} accentMarginBottom={accentMarginBottom} accentAlign={accentAlign}>
            {(() => {
              const rawTitle = actualTitle || "*What Our* Clients Say";
              const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
              return parts.map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <span key={index} style={{ color: highlightColor }}>
                      {part}
                    </span>
                  );
                }
                return part;
              });
            })()}
          </SectionHeading>

          <p className="winera-testi-subtitle" style={{
            color: '#475569',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: 1.6,
            maxWidth: '750px',
            margin: '0 auto 60px',
            textAlign: 'center',
            whiteSpace: 'pre-line'
          }}>
            {actualSubtitle}
          </p>

          {/* ── DESKTOP LAYOUT (Pop-Out Video Frame matching Image 2) ── */}
          <div className="winera-testi-desktop" style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '920px',
            margin: '25px auto 10px'
          }}>
            {/* Left Arrow Button (Only if > 1 testimonial) */}
            {hasMultipleTestimonials && (
              <button
                onClick={goPrev}
                onMouseDown={(e) => e.preventDefault()}
                aria-label="Previous Testimonial"
                className="winera-testi-nav-btn winera-testi-btn-prev"
                style={{
                  position: 'absolute',
                  left: '-24px',
                  zIndex: 30,
                  width: '48px',
                  height: '48px',
                  outline: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <ChevronLeft style={{ width: '26px', height: '26px', strokeWidth: 2, pointerEvents: 'none', userSelect: 'none' }} />
              </button>
            )}

            {/* White Rectangle Card Container */}
            <div className="winera-testi-card-box" style={{
              position: 'relative',
              width: '100%',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '28px 360px 28px 36px',
              minHeight: '300px',
              height: isExpanded ? 'auto' : '330px',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
              border: '1px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'left',
              transition: 'all 0.3s ease'
            }}>
              {/* Top: Star Rating & Quote */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
                  {[...Array(currentItem.starRating || currentItem.rating || 5)].map((_, i) => (
                    <Star key={i} style={{ width: '18px', height: '18px', fill: '#ffcd00', color: '#ffcd00' }} />
                  ))}
                </div>

                {(() => {
                  const quoteText = currentItem.quote || '';
                  const isLong = quoteText.length > 280;

                  return (
                    <div style={{ position: 'relative', maxWidth: '430px', margin: '0 0 8px' }}>
                      <p className="winera-testi-quote" style={{
                        fontFamily: "'Open Sans', sans-serif",
                        color: 'rgb(55, 62, 65)',
                        fontSize: '17px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '28px',
                        letterSpacing: '0px',
                        margin: 0,
                        ...(isLong && !isExpanded ? {
                          display: '-webkit-box',
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        } : {})
                      }}>
                        {quoteText}
                      </p>
                      {isLong && !isExpanded && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(true);
                          }}
                          style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, #ffffff 32%, #ffffff 100%)',
                            border: 'none',
                            color: '#00a8ff',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            fontSize: '16.5px',
                            cursor: 'pointer',
                            paddingLeft: '28px',
                            paddingRight: '0px',
                            lineHeight: 1.5,
                            textDecoration: 'underline'
                          }}
                        >
                          ... read more..
                        </button>
                      )}
                      {isLong && isExpanded && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(false);
                          }}
                          style={{
                            color: '#00a8ff',
                            background: 'none',
                            border: 'none',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            fontSize: '16.5px',
                            cursor: 'pointer',
                            padding: 0,
                            margin: '4px 0 0 4px',
                            textDecoration: 'underline'
                          }}
                        >
                          read less..
                        </button>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Bottom: Founder / Client Profile Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={currentItem.founderImage || currentItem.img || testiOwner}
                  alt={currentItem.founderImgAlt || currentItem.imgAlt || currentItem.gameZoneName || currentItem.name || "Client Review"}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#00a8ff', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                    <span>{currentItem.gameZoneName || currentItem.name}</span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#000000',
                      color: '#ffffff',
                      fontSize: '9px',
                      fontWeight: '900'
                    }}>✓</span>
                  </h3>
                  <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', margin: '2px 0 0' }}>
                    {currentItem.reviewerRole || currentItem.role || 'Surat'}
                  </p>
                </div>
              </div>

              {/* Right Side: Floating / Pop-Out Video Frame (Linear Gradient Fade matching Image 2) */}
              <div className="winera-testi-floating-img" style={{
                position: 'absolute',
                right: '35px',
                top: '39%',
                transform: 'translateY(-50%)',
                width: '340px',
                height: '340px',
                background: 'linear-gradient(191.09deg, #F5F5F9 8.2%, #E0F4FC 116.74%)',
                borderRadius: '32px',
                padding: '12px',
                zIndex: 10
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#0f172a'
                }}>
                  <img
                    src={videoThumbnail}
                    alt={currentItem.videoImgAlt || `${currentItem.gameZoneName || currentItem.name || 'Client'} - Video Review`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      position: 'absolute',
                      inset: 0,
                      transform: (videoThumbnail.includes('youtube') || videoThumbnail.includes('sddefault') || videoThumbnail.includes('hqdefault')) ? 'scale(1.35)' : 'scale(1.02)'
                    }}
                    onError={(e) => {
                      if (e.target.src.includes('sddefault')) {
                        e.target.src = e.target.src.replace('sddefault.jpg', 'hqdefault.jpg');
                      }
                    }}
                  />
                  {Boolean(activeVideoUrl && String(activeVideoUrl).trim()) && (
                    <button
                      onClick={() => openVideoModal(activeVideoUrl, `${currentItem.gameZoneName || currentItem.name || 'Client'} - Video Review`, { isVertical: true })}
                      onMouseDown={(e) => e.preventDefault()}
                      aria-label="Watch Review Video"
                      title="Watch Review Video"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.22)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: '#ffcd00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(255, 205, 0, 0.5)',
                        cursor: 'pointer'
                      }}>
                        <Play style={{ width: '24px', height: '24px', color: '#000000', fill: '#000000', marginLeft: '3px' }} />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Arrow Button (Only if > 1 testimonial) */}
            {hasMultipleTestimonials && (
              <button
                onClick={goNext}
                onMouseDown={(e) => e.preventDefault()}
                aria-label="Next Testimonial"
                className="winera-testi-nav-btn winera-testi-btn-next"
                style={{
                  position: 'absolute',
                  right: '-24px',
                  zIndex: 30,
                  width: '48px',
                  height: '48px',
                  outline: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <ChevronRight style={{ width: '26px', height: '26px', strokeWidth: 2, pointerEvents: 'none', userSelect: 'none' }} />
              </button>
            )}
          </div>

          {/* ── MOBILE LAYOUT ── */}
          <div className="winera-testi-mobile" style={{ display: 'none' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '24px 20px',
              boxShadow: '0 10px 35px rgba(0,0,0,0.07)',
              textAlign: 'left',
              margin: '0 4px'
            }}>
              {/* Star Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '14px' }}>
                {[...Array(currentItem.starRating || currentItem.rating || 5)].map((_, i) => (
                  <Star key={i} style={{ width: '17px', height: '17px', fill: '#ffcd00', color: '#ffcd00' }} />
                ))}
              </div>

              {/* Quote */}
              {(() => {
                const quoteText = currentItem.quote || '';
                const isLong = quoteText.length > 280;

                return (
                  <div style={{ position: 'relative', margin: '0 0 20px' }}>
                    <p className="winera-testi-quote" style={{
                      fontFamily: "'Open Sans', sans-serif",
                      color: 'rgb(55, 62, 65)',
                      fontSize: '17px',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      lineHeight: '28px',
                      letterSpacing: '0px',
                      margin: 0,
                      ...(isLong && !isExpanded ? {
                        display: '-webkit-box',
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      } : {})
                    }}>
                      {quoteText}
                    </p>
                    {isLong && !isExpanded && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(true);
                        }}
                        style={{
                          position: 'absolute',
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, #ffffff 32%, #ffffff 100%)',
                          border: 'none',
                          color: '#00a8ff',
                          fontStyle: 'normal',
                          fontWeight: '700',
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          paddingLeft: '28px',
                          paddingRight: '0px',
                          lineHeight: 1.6,
                          textDecoration: 'underline'
                        }}
                      >
                        ... read more..
                      </button>
                    )}
                    {isLong && isExpanded && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(false);
                        }}
                        style={{
                          color: '#00a8ff',
                          background: 'none',
                          border: 'none',
                          fontStyle: 'normal',
                          fontWeight: '700',
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          padding: 0,
                          margin: '4px 0 0 4px',
                          textDecoration: 'underline'
                        }}
                      >
                        read less..
                      </button>
                    )}
                  </div>
                );
              })()}

              {/* Profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <img
                  src={currentItem.founderImage || currentItem.img || testiOwner}
                  alt={currentItem.founderImgAlt || currentItem.imgAlt || currentItem.gameZoneName || currentItem.name || "Client Review"}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#00a8ff', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {currentItem.gameZoneName || currentItem.name}
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      background: '#000000',
                      color: '#ffffff',
                      fontSize: '8px',
                      fontWeight: '900',
                      flexShrink: 0
                    }}>✓</span>
                  </h3>
                  <p style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: '600', margin: '2px 0 0' }}>
                    {currentItem.reviewerRole || currentItem.role || 'Surat'}
                  </p>
                </div>
              </div>

              {/* Video Thumbnail */}
              <div style={{
                width: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                background: '#000',
                aspectRatio: '16/10'
              }}>
                <img
                  src={videoThumbnail}
                  alt={currentItem.videoImgAlt || `${currentItem.gameZoneName || currentItem.name || 'Client'} - Video Review`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    position: 'absolute',
                    inset: 0,
                    transform: (videoThumbnail.includes('youtube') || videoThumbnail.includes('sddefault') || videoThumbnail.includes('hqdefault')) ? 'scale(1.35)' : 'scale(1.02)'
                  }}
                  onError={(e) => {
                    if (e.target.src.includes('sddefault')) {
                      e.target.src = e.target.src.replace('sddefault.jpg', 'hqdefault.jpg');
                    }
                  }}
                />
                {Boolean(currentItem.youtubeVideoUrl && String(currentItem.youtubeVideoUrl).trim()) && (
                  <button
                    onClick={() => openVideoModal(currentItem.youtubeVideoUrl, `${currentItem.name} - Video Review`, { isVertical: true })}
                    onMouseDown={(e) => e.preventDefault()}
                    aria-label="Watch Review Video"
                    title="Watch Review Video"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: '#ffcd00',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 20px rgba(255,205,0,0.5)'
                    }}>
                      <Play style={{ width: '22px', height: '22px', color: '#000000', fill: '#000000', marginLeft: '3px' }} />
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Navigation Controls (Only if > 1) */}
            {hasMultipleTestimonials && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '20px',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                touchAction: 'manipulation'
              }}>
                <button
                  onClick={goPrev}
                  onMouseDown={(e) => e.preventDefault()}
                  aria-label="Previous Testimonial"
                  className="winera-testi-nav-btn winera-testi-btn-prev"
                  style={{
                    width: '44px',
                    height: '44px',
                    outline: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  <ChevronLeft aria-hidden="true" style={{ width: '22px', height: '22px', pointerEvents: 'none', userSelect: 'none' }} />
                </button>

                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', userSelect: 'none', WebkitUserSelect: 'none' }}>
                  {activeIndex + 1} / {list.length}
                </span>

                <button
                  onClick={goNext}
                  onMouseDown={(e) => e.preventDefault()}
                  aria-label="Next Testimonial"
                  className="winera-testi-nav-btn winera-testi-btn-next"
                  style={{
                    width: '44px',
                    height: '44px',
                    outline: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  <ChevronRight aria-hidden="true" style={{ width: '22px', height: '22px', pointerEvents: 'none', userSelect: 'none' }} />
                </button>
              </div>
            )}
          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}
