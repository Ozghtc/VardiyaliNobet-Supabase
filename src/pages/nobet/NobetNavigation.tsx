import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, FileText, Settings, PieChart } from 'lucide-react';

const NobetNavigation: React.FC = () => {
  const location = useLocation();

  const tabs = [
    {
      path: '/nobet/kurallar',
      name: 'Nöbet Kuralları',
      icon: <Settings className="w-5 h-5 text-gray-500" />
    },
    {
      path: '/nobet/ekran',
      name: 'Nöbet Ekranı',
      icon: <Calendar className="w-5 h-5 text-gray-500" />
    },
    {
      path: '/nobet/olustur',
      name: 'Nöbet Oluştur',
      icon: <FileText className="w-5 h-5 text-gray-500" />
    },
    {
      path: '/nobet/raporlar',
      name: 'Raporlar',
      icon: <PieChart className="w-5 h-5 text-gray-500" />
    }
  ];

  return (
    <div className="flex items-center gap-8 mb-6">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`flex items-center gap-2 py-2 border-b-2 transition-colors ${
            location.pathname === tab.path
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className={location.pathname === tab.path ? 'text-blue-600' : ''}>
            {tab.icon}
          </div>
          <span className="font-medium">{tab.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default NobetNavigation;