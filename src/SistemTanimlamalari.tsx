import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users } from 'lucide-react';
import UnvanPersonelTanimlama from './pages/tanimlamalar2/UnvanPersonelTanimlama';
import VardiyaTanimlama from './pages/tanimlamalar2/VardiyaTanimlama';
import AlanTanimlama from './pages/tanimlamalar2/AlanTanimlama';
import TanimliAlanlar from './pages/tanimlamalar2/TanimliAlanlar';

const SistemTanimlamalari: React.FC = () => {
  const [activeTab, setActiveTab] = useState('unvan-personel');
  const navigate = useNavigate();

  const tabs = [
    {
      id: 'unvan-personel',
      name: 'Ünvan ve Personel',
      icon: <Users className="w-5 h-5" />,
      component: <UnvanPersonelTanimlama />
    },
    {
      id: 'vardiya',
      name: 'Vardiya',
      icon: <Clock className="w-5 h-5" />,
      component: <VardiyaTanimlama />
    },
    {
      id: 'alan',
      name: 'Alan',
      icon: <MapPin className="w-5 h-5" />,
      component: <AlanTanimlama />
    },
    {
      id: 'tanimli-alanlar',
      name: 'Tanımlı Alanlar',
      icon: <MapPin className="w-5 h-5" />,
      component: <TanimliAlanlar />
    }
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sistem Tanımlamaları</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/personel-ekle')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Users className="w-5 h-5" />
            Personel Ekle
          </button>
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Geri Dön</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border-b mb-6">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default SistemTanimlamalari;