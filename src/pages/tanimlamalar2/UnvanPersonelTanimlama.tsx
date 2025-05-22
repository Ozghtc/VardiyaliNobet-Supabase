import React, { useState, useEffect } from 'react';
import { Plus, Trash2, UserPlus, UserCog } from 'lucide-react';
import { useCapitalization } from '../../hooks/useCapitalization';
import { SuccessNotification } from '../../components/ui/Notification';

const UnvanPersonelTanimlama: React.FC = () => {
  const [unvan, handleUnvanChange] = useCapitalization('');
  const [unvanlar, setUnvanlar] = useState<string[]>([]);
  const [personnelRequest, handlePersonnelRequestChange] = useCapitalization('');
  const [personnelRequests, setPersonnelRequests] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUnvanlar = localStorage.getItem('unvanlar');
    if (savedUnvanlar) {
      setUnvanlar(JSON.parse(savedUnvanlar));
    }

    const savedRequests = localStorage.getItem('personnelRequests');
    if (savedRequests) {
      setPersonnelRequests(JSON.parse(savedRequests));
    }
  }, []);

  const handleAddUnvan = () => {
    if (!unvan.trim()) return;
    const updatedUnvanlar = [...unvanlar, unvan.trim()];
    setUnvanlar(updatedUnvanlar);
    localStorage.setItem('unvanlar', JSON.stringify(updatedUnvanlar));
    handleUnvanChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    showSuccessMessage();
  };

  const handleRemoveUnvan = (index: number) => {
    const updatedUnvanlar = unvanlar.filter((_, i) => i !== index);
    setUnvanlar(updatedUnvanlar);
    localStorage.setItem('unvanlar', JSON.stringify(updatedUnvanlar));
  };

  const handleAddRequest = () => {
    if (!personnelRequest.trim()) return;
    const newRequest = {
      id: Date.now(),
      name: personnelRequest.trim(),
      type: 'istek'
    };
    const updatedRequests = [...personnelRequests, newRequest];
    setPersonnelRequests(updatedRequests);
    localStorage.setItem('personnelRequests', JSON.stringify(updatedRequests));
    handlePersonnelRequestChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    showSuccessMessage();
  };

  const handleRemoveRequest = (id: number) => {
    const updatedRequests = personnelRequests.filter(r => r.id !== id);
    setPersonnelRequests(updatedRequests);
    localStorage.setItem('personnelRequests', JSON.stringify(updatedRequests));
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Ünvan Tanımları */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Ünvan Tanımları</h2>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={unvan}
            onChange={handleUnvanChange}
            placeholder="YENİ ÜNVAN GİRİN"
            className="flex-1 rounded-lg border-gray-300"
          />
          <button
            onClick={handleAddUnvan}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {unvanlar.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{item}</span>
              <button
                onClick={() => handleRemoveUnvan(index)}
                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Personel İstek Tanımları */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserCog className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold">Personel İstek Tanımları</h2>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={personnelRequest}
            onChange={handlePersonnelRequestChange}
            placeholder="YENİ İSTEK TÜRÜ GİRİN"
            className="flex-1 rounded-lg border-gray-300"
          />
          <button
            onClick={handleAddRequest}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {personnelRequests.map((request) => (
            <div key={request.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{request.name}</span>
              <button
                onClick={() => handleRemoveRequest(request.id)}
                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {showSuccess && <SuccessNotification message="Başarıyla eklendi" />}
    </div>
  );
};

export default UnvanPersonelTanimlama;