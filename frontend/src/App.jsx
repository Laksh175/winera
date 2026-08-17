import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { fetchSiteContent } from './services/api';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ArcadeGame from './pages/ArcadeGame';
import BowlingAlley from './pages/BowlingAlley';
import ContactUs from './pages/ContactUs';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import SoftPlay from './pages/SoftPlay';
import BumperCar from './pages/BumperCar';
import VrGames from './pages/VrGames';
import ArGames from './pages/ArGames';

export default function App() {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await fetchSiteContent();
      setSiteData(data);
    } catch (err) {
      console.error('Failed to load content from backend, fallback to local', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home siteData={siteData} />} />
          <Route path="/about" element={<AboutUs siteData={siteData} />} />
          <Route path="/arcade-game" element={<ArcadeGame siteData={siteData} />} />
          <Route path="/products/arcade-game" element={<ArcadeGame siteData={siteData} />} />
          <Route path="/products/arcade-games" element={<ArcadeGame siteData={siteData} />} />
          <Route path="/bowling-alley" element={<BowlingAlley siteData={siteData} />} />
          <Route path="/products/bowling-alley" element={<BowlingAlley siteData={siteData} />} />
          <Route path="/soft-play" element={<SoftPlay siteData={siteData} />} />
          <Route path="/products/soft-play" element={<SoftPlay siteData={siteData} />} />
          <Route path="/bumper-car" element={<BumperCar siteData={siteData} />} />
          <Route path="/products/bumper-car" element={<BumperCar siteData={siteData} />} />
          <Route path="/products/bumper-cars" element={<BumperCar siteData={siteData} />} />
          <Route path="/vr-games" element={<VrGames siteData={siteData} />} />
          <Route path="/products/vr-games" element={<VrGames siteData={siteData} />} />
          <Route path="/ar-games" element={<ArGames siteData={siteData} />} />
          <Route path="/products/ar-games" element={<ArGames siteData={siteData} />} />
          <Route path="/contact" element={<ContactUs siteData={siteData} />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard siteData={siteData} refreshContent={loadData} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
