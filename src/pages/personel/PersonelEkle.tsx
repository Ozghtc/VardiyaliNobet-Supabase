import React, { useState, useEffect } from 'react';
import { UserPlus, ChevronLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PersonelBilgileri from './PersonelBilgileri';
import PersonelNobetTanimlama from './PersonelNobetTanimlama';
import GirisBilgileri from './GirisBilgileri';
import PersonelIstek from './PersonelIstek';
import { supabase } from '../../lib/supabase';

const PersonelEkle: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bilgiler');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    title: '',
    tcno: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    startDate: '',
    istekTuru: '',
    baslangicTarihi: '',
    bitisTarihi: '',
    tekrarlaniyorMu: false,
    aciklama: '',
    hasLoginPage: false,
    password: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('Personel Bilgilerini Giriniz');
  const [hasNobetTanimlama, setHasNobetTanimlama] = useState(false);

  useEffect(() => {
    // Check if any shifts are defined in localStorage
    const checkExistingShifts = () => {
      const savedOzelNobetler = localStorage.getItem('kayitliOzelNobetler');
      const savedGenelNobetler = localStorage.getItem('kayitliGenelNobetler');
      
      const ozelNobetler = savedOzelNobetler ? JSON.parse(savedOzelNobetler) : [];
      const genelNobetler = savedGenelNobetler ? JSON.parse(savedGenelNobetler) : [];
      
      return ozelNobetler.length > 0 || genelNobetler.length > 0;
    };

    setHasNobetTanimlama(checkExistingShifts());
  }, []);

  useEffect(() => {
    const { name, surname, tcno } = formData;
    const isValid = Boolean(
      name.trim() && 
      surname.trim() && 
      tcno.trim() && 
      tcno.length === 11
    );
    setIsFormValid(isValid);

    if (!isValid) {
      setValidationMessage('Personel Bilgilerini Giriniz');
    } else {
      setValidationMessage('');
    }
  }, [formData]);

  const tabs = [
    { id: 'bilgiler', name: 'Personel Bilgileri' },
    { id: 'nobet', name: 'Nöbet Tanımlama' },
    { id: 'giris', name: 'Giriş Bilgileri' },
    { id: 'istek', name: 'İstek ve İzinler' }
  ];

  const handleSave = async () => {
    if (!isFormValid) return;
    // Supabase'a kayıt
    const { error } = await supabase.from('personnel').insert([
      {
        name: formData.name,
        surname: formData.surname,
        title: formData.title,
        tcno: formData.tcno,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        position: formData.position,
        startDate: formData.startDate,
        istekTuru: formData.istekTuru,
        baslangicTarihi: formData.baslangicTarihi,
        bitisTarihi: formData.bitisTarihi,
        tekrarlaniyorMu: formData.tekrarlaniyorMu,
        aciklama: formData.aciklama,
        hasLoginPage: formData.hasLoginPage,
        password: formData.password
      }
    ]);
    if (!error) {
      navigate(-1);
    } else {
      alert('Kayıt sırasında hata oluştu: ' + error.message);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'bilgiler':
        return <PersonelBilgileri data={formData} onChange={setFormData} />;
      case 'nobet':
        return <PersonelNobetTanimlama onValidityChange={setHasNobetTanimlama} />;
      case 'giris':
        return <GirisBilgileri />;
      case 'istek':
        return <PersonelIstek data={formData} onChange={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Personel Ekle</h2>
          </div>
          {validationMessage && (
            <div className="mt-2 text-red-600 text-sm font-medium">
              {validationMessage}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isFormValid
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-5 h-5" />
            <span>Kaydet</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Geri Dön</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mt-6">
        <div className="border-b">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PersonelEkle;