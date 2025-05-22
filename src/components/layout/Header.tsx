import React from 'react';
import { BellRing, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin':
        return 'Yönetici Paneli';
      case '/vardiyali-nobet':
        return 'Vardiyalı Nöbet Sistemi';
      case '/vardiya-tanimlama':
        return 'Vardiya Tanımlama';
      case '/kurum-ekle':
        return 'Kurum Yönetimi';
      case '/kullanici-ekle':
        return 'Kullanıcı Yönetimi';
      case '/vardiya-planla':
        return 'Vardiya Planlama';
      case '/tanimlamalar':
        return 'Tanımlamalar';
      case '/nobet/ekran':
        return 'Nöbet Ekranı';
      case '/nobet/kurallar':
        return 'Nöbet Kuralları';
      case '/nobet/olustur':
        return 'Nöbet Oluştur';
      case '/nobet/raporlar':
        return 'Nöbet Raporları';
      default:
        return 'Vardiya Asistanı';
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-xl font-bold text-gray-800">
              Vardiya Asistanı
            </Link>
            <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BellRing className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;