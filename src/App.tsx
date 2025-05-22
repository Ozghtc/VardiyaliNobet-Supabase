import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout components
import Layout from './components/layout/Layout';

// Pages
import AdminPage from './pages/AdminPage';
import VardiyaPlanla from './pages/VardiyaPlanla';
import KurumEkle from './admin/KurumEkle';
import KullaniciEkle from './admin/KullaniciEkle';
import Tanimlamalar from './pages/Tanimlamalar';
import PersonelEkle from './pages/personel/PersonelEkle';
import PersonelListesi from './pages/personel/PersonelListesi';
import PersonelPaneli from './pages/personel/PersonelPaneli';
import Nobetlerim from './pages/personel/Nobetlerim';
import IstekTaleplerim from './pages/personel/IstekTaleplerim';
import VardiyaliNobet from './pages/VardiyaliNobet';

// Nöbet Pages
import NobetEkrani from './pages/nobet/NobetEkrani';
import NobetKurallari from './pages/nobet/NobetKurallari';
import NobetOlustur from './pages/nobet/NobetOlustur';
import Raporlar from './pages/nobet/Raporlar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
        <Route path="/vardiya-planla/*" element={<Layout><VardiyaPlanla /></Layout>} />
        <Route path="/kurum-ekle" element={<Layout><KurumEkle /></Layout>} />
        <Route path="/kullanici-ekle" element={<Layout><KullaniciEkle /></Layout>} />
        <Route path="/tanimlamalar/*" element={<Layout><Tanimlamalar /></Layout>} />
        <Route path="/personel-ekle" element={<Layout><PersonelEkle /></Layout>} />
        <Route path="/personel-listesi" element={<Layout><PersonelListesi /></Layout>} />
        <Route path="/vardiyali-nobet" element={<Layout><VardiyaliNobet /></Layout>} />
        
        {/* Personel Panel Routes */}
        <Route path="/personel/panel" element={<Layout><PersonelPaneli /></Layout>} />
        <Route path="/personel/nobetlerim" element={<Layout><Nobetlerim /></Layout>} />
        <Route path="/personel/istekler" element={<Layout><IstekTaleplerim /></Layout>} />
        
        {/* Nöbet Routes */}
        <Route path="/nobet/ekran" element={<Layout><NobetEkrani /></Layout>} />
        <Route path="/nobet/kurallar" element={<Layout><NobetKurallari /></Layout>} />
        <Route path="/nobet/olustur" element={<Layout><NobetOlustur /></Layout>} />
        <Route path="/nobet/raporlar" element={<Layout><Raporlar /></Layout>} />
        
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;