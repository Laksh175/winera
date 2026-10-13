import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'achfsmlm',
  api_key: process.env.CLOUDINARY_API_KEY || '753149659957868',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'eWxHZbi60csujh5_BpDln8qIQmA'
});

async function uploadToCloudinary(filePath, folder = 'winera_uploads') {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File does not exist: ${filePath}`);
  }
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: 'auto'
  });
  return result.secure_url;
}

async function run() {
  console.log('--- 1. Uploading Our Best Products Images to Cloudinary ---');
  const bestProductsDir = path.resolve(__dirname, '../../../frontend/public/assets/our best products');
  const productImagesDir = path.resolve(__dirname, '../../../frontend/public/assets/product-images');
  const vrImagesDir = path.resolve(__dirname, '../../../frontend/public/assets/vr-game-images');

  // Mapping of cards
  const bestProductsUploads = {
    arcade: path.join(bestProductsDir, 'Arcade game image3 (1).webp'),
    vr: path.join(bestProductsDir, 'VR-1.jpg.jpeg'),
    bowling: path.join(bestProductsDir, 'Bowling (2).webp'),
    softplay: path.join(bestProductsDir, 'Softplay 2 (1).webp'),
    bumpercar: path.join(bestProductsDir, 'Bumper car image (2).webp'),
    amusement: path.join(bestProductsDir, 'Amusment Park 2.jpg.jpeg'),
    ar: path.join(productImagesDir, 'AR Games.jpg'),
    trampoline: path.join(productImagesDir, 'Trampoline Prk.webp'),
    hypergrid: path.join(productImagesDir, 'Hypergrid.jpg'),
    lasertag: path.join(productImagesDir, 'LaserTag.webp')
  };

  const bestProductsUrls = {};
  for (const [key, fPath] of Object.entries(bestProductsUploads)) {
    console.log(`Uploading Our Best Products [${key}]: ${path.basename(fPath)}...`);
    try {
      const url = await uploadToCloudinary(fPath);
      bestProductsUrls[key] = url;
      console.log(`  ✓ Uploaded [${key}] -> ${url}`);
    } catch (e) {
      console.error(`  ✗ Error uploading ${key}:`, e.message);
    }
  }

  console.log('\n--- 2. Uploading Industries We Serve Images to Cloudinary ---');
  const industriesUploads = {
    "Airports & Terminals": path.join(vrImagesDir, '4611.webp'),
    "Hospitals & Clinics": path.join(vrImagesDir, '50666.jpg'),
    "Hotels & Resorts": path.join(vrImagesDir, '439229266.jpg'),
    "Schools & Academies": path.join(vrImagesDir, 'SCHOOL PHOTO 1.jpg'),
    "Shopping Malls": path.join(vrImagesDir, 'pexels-seher-dogan-640511704-19287629.jpg')
  };

  const industriesUrls = {};
  for (const [title, fPath] of Object.entries(industriesUploads)) {
    console.log(`Uploading Industry [${title}]: ${path.basename(fPath)}...`);
    try {
      const url = await uploadToCloudinary(fPath);
      industriesUrls[title] = url;
      console.log(`  ✓ Uploaded [${title}] -> ${url}`);
    } catch (e) {
      console.error(`  ✗ Error uploading industry ${title}:`, e.message);
    }
  }

  // Construct complete productsHome cardsList
  const updatedCardsList = [
    {
      id: "arcade",
      title: "Arcade Game",
      desc: "Discover endless fun with our innovative indoor arcade games, merging excitement and fitness seamlessly.",
      img: bestProductsUrls.arcade || "/assets/our best products/Arcade game image3 (1).webp",
      link: "/products/arcade-games"
    },
    {
      id: "vr",
      title: "VR GAME",
      desc: "Immersive commercial VR gaming machines delivering thrilling virtual reality experiences.",
      img: bestProductsUrls.vr || "/assets/our best products/VR-1.jpg.jpeg",
      link: "/products/vr-games"
    },
    {
      id: "ar",
      title: "AR GAME",
      desc: "Interactive AR gaming solutions blending technology and entertainment — sports simulators and more.",
      img: bestProductsUrls.ar || "/assets/product-images/AR Games.jpg",
      link: "/products/ar-games"
    },
    {
      id: "bowling",
      title: "Bowling Alley",
      desc: "The Brunswick bowling equipment with stable mechanical capacity popular across global entertainment hubs.",
      img: bestProductsUrls.bowling || "/assets/our best products/Bowling (2).webp",
      link: "/products/bowling-alley"
    },
    {
      id: "softplay",
      title: "Soft Play",
      desc: "Indoor playgrounds designed specifically for children aged 3-15 years of indoor game venues.",
      img: bestProductsUrls.softplay || "/assets/our best products/Softplay 2 (1).webp",
      link: "/products/soft-play"
    },
    {
      id: "trampoline",
      title: "Trampoline Park",
      desc: "Physical fitness and active fun combined in safe high-capacity commercial trampoline layouts.",
      img: bestProductsUrls.trampoline || "/assets/product-images/Trampoline Prk.webp",
      link: "/products/trampoline-park"
    },
    {
      id: "hypergrid",
      title: "Hyper Grid",
      desc: "Interactive LED floor game where players compete across pressure-sensitive glowing tiles.",
      img: bestProductsUrls.hypergrid || "/assets/product-images/Hypergrid.jpg",
      link: "/products/hypergrid"
    },
    {
      id: "amusement",
      title: "Amusement Park",
      desc: "Our amusement park rides are designed with high safety standards and exciting gameplay for all ages.",
      img: bestProductsUrls.amusement || "/assets/our best products/Amusment Park 2.jpg.jpeg",
      link: "/products/amusement-park"
    },
    {
      id: "bumpercar",
      title: "Bumper Cars",
      desc: "Our bumper cars are an exhilarating blend of thrilling collisions and smooth handling.",
      img: bestProductsUrls.bumpercar || "/assets/our best products/Bumper car image (2).webp",
      link: "/products/bumper-car"
    },
    {
      id: "lasertag",
      title: "Laser Tag",
      desc: "Action-packed laser tag arenas designed for competitive multiplayer gaming experiences.",
      img: bestProductsUrls.lasertag || "/assets/product-images/LaserTag.webp",
      link: "/products/laser-tag"
    }
  ];

  // Construct complete industries items list
  const updatedIndustriesItems = [
    {
      title: "Shopping Malls",
      img: industriesUrls["Shopping Malls"] || "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345668/winera_uploads/kaqqo6kbdgvhb9fbmdym.jpg"
    },
    {
      title: "Hotels & Resorts",
      img: industriesUrls["Hotels & Resorts"] || "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345668/winera_uploads/vrkmjhfuojjqkovqrvu1.jpg"
    },
    {
      title: "Schools & Academies",
      img: industriesUrls["Schools & Academies"] || "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345668/winera_uploads/nob5w0pern8lldzkntnp.jpg"
    },
    {
      title: "Commercial Spaces",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Residential Projects",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Sports Centres",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Entertainment Hubs",
      img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Airports & Terminals",
      img: industriesUrls["Airports & Terminals"] || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Hospitals & Clinics",
      img: industriesUrls["Hospitals & Clinics"] || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Food and Beverage",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
    }
  ];

  console.log('\n--- 3. Updating Local MongoDB ---');
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera');
  const Content = mongoose.model('Content', new mongoose.Schema({}, { strict: false }));

  // Update productsHome in local MongoDB
  const localProductsHome = await Content.findOne({ sectionKey: 'productsHome' });
  const productsHomeData = {
    title: localProductsHome?.data?.title || "Take a look At *Our Best Products*",
    subtitle: localProductsHome?.data?.subtitle || "Our Complete Game Zone Equipment & Setup Solutions",
    cardsList: updatedCardsList
  };
  await Content.findOneAndUpdate(
    { sectionKey: 'productsHome' },
    { sectionKey: 'productsHome', data: productsHomeData },
    { upsert: true, new: true }
  );
  console.log('✓ Updated productsHome in local MongoDB');

  // Update industriesHeader in local MongoDB
  const localIndustries = await Content.findOne({ sectionKey: 'industriesHeader' });
  const industriesHeaderData = {
    title: localIndustries?.data?.title || "Industries *We Serve*",
    subtitle: localIndustries?.data?.subtitle || "We deliver complete game zone setup solutions for businesses across India",
    items: updatedIndustriesItems
  };
  await Content.findOneAndUpdate(
    { sectionKey: 'industriesHeader' },
    { sectionKey: 'industriesHeader', data: industriesHeaderData },
    { upsert: true, new: true }
  );
  console.log('✓ Updated industriesHeader in local MongoDB');
  await mongoose.disconnect();

  console.log('\n--- 4. Updating Live Database via Admin API ---');
  const loginRes = await fetch('https://winera-backend.onrender.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;

  if (!token) {
    console.error('Failed to authenticate with live backend:', loginData);
  } else {
    // 1. Update productsHome on live
    const putProdRes = await fetch('https://winera-backend.onrender.com/api/admin/content', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        sectionKey: 'productsHome',
        data: productsHomeData
      })
    });
    console.log(`✓ Updated productsHome in live DB (status: ${putProdRes.status})`);

    // 2. Update industriesHeader on live
    const putIndRes = await fetch('https://winera-backend.onrender.com/api/admin/content', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        sectionKey: 'industriesHeader',
        data: industriesHeaderData
      })
    });
    console.log(`✓ Updated industriesHeader in live DB (status: ${putIndRes.status})`);
  }

  // Save JSON summary of mapping
  fs.writeFileSync(
    path.join(__dirname, '../data/homeAssetsCloudinaryMapping.json'),
    JSON.stringify({ bestProductsUrls, industriesUrls }, null, 2)
  );
  console.log('✓ Saved homeAssetsCloudinaryMapping.json');
}

run()
  .then(() => {
    console.log('\nAll uploads and database updates completed successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error during execution:', err);
    process.exit(1);
  });
