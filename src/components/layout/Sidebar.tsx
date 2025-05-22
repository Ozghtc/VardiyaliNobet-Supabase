import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  BuildingIcon, 
  Users, 
  CalendarCheck, 
  Clock 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', name: 'Ana Sayfa', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/vardiya-tanimlama', name: 'Vardiya Tanımla', icon: <Clock className="w-5 h-5" /> },
    { path: '/kurum-ekle', name: 'Kurum Yönetimi', icon: <BuildingIcon className="w-5 h-5" /> },
    { path: '/kullanici-ekle', name: 'Kullanıcı Yönetimi', icon: <Users className="w-5 h-5" /> },
    { path: '/vardiya-planla', name: 'Vardiya Planlama', icon: <CalendarCheck className="w-5 h-5" /> },
    { path: '/raporlar', name: 'Raporlar', icon: <ClipboardList className="w-5 h-5" /> },
  ];

  return (
    <div className="h-full w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <Clock className="w-6 h-6 mr-2 text-blue-400" />
        <span className="text-lg font-bold">Vardiya Asistanı</span>
      </div>
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group flex items-center px-4 py-3 text-sm font-medium rounded-md
                ${location.pathname === item.path
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
              `}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;