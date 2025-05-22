import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { useCapitalization } from '../../hooks/useCapitalization';
import QuickShiftButton from '../../components/shifts/QuickShiftButton';
import ShiftItem from '../../components/shifts/ShiftItem';
import { SuccessNotification } from '../../components/ui/Notification';

interface Shift {
  id: number;
  name: string;
  startHour: string;
  endHour: string;
}

const VardiyaTanimlama: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [name, handleNameChange] = useCapitalization('');
  const [startHour, setStartHour] = useState<string>('');
  const [endHour, setEndHour] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  // Load shifts from localStorage on component mount
  useEffect(() => {
    const savedShifts = localStorage.getItem('shifts');
    if (savedShifts) {
      setShifts(JSON.parse(savedShifts));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Vardiya adı gereklidir');
      return;
    }

    if (shifts.some(shift => shift.name === name)) {
      setError('Bu vardiya adı zaten kullanılmış');
      return;
    }

    if (!startHour || !endHour) {
      setError('Başlangıç ve bitiş saati gereklidir');
      return;
    }

    const newShift: Shift = {
      id: Date.now(),
      name,
      startHour,
      endHour
    };

    const updatedShifts = [...shifts, newShift];
    setShifts(updatedShifts);
    localStorage.setItem('shifts', JSON.stringify(updatedShifts));
    
    handleNameChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    setStartHour('');
    setEndHour('');
    setError('');
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleDelete = (id: number) => {
    const updatedShifts = shifts.filter(shift => shift.id !== id);
    setShifts(updatedShifts);
    localStorage.setItem('shifts', JSON.stringify(updatedShifts));
  };

  const handleQuickAdd = (name: string, startHour: string, endHour: string) => {
    if (shifts.some(shift => shift.name === name)) {
      setError(`${name} vardiyası zaten tanımlı`);
      setTimeout(() => setError(''), 2000);
      return;
    }

    const newShift: Shift = {
      id: Date.now(),
      name,
      startHour,
      endHour
    };

    const updatedShifts = [...shifts, newShift];
    setShifts(updatedShifts);
    localStorage.setItem('shifts', JSON.stringify(updatedShifts));
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Hızlı Vardiya Ekleme */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Hızlı Vardiya Ekleme</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickShiftButton
              name="GÜNDÜZ"
              startHour="08:00"
              endHour="16:00"
              isDisabled={shifts.some(s => s.name === "GÜNDÜZ")}
              onAdd={handleQuickAdd}
            />
            <QuickShiftButton
              name="AKŞAM"
              startHour="16:00"
              endHour="24:00"
              isDisabled={shifts.some(s => s.name === "AKŞAM")}
              onAdd={handleQuickAdd}
            />
            <QuickShiftButton
              name="GECE"
              startHour="00:00"
              endHour="08:00"
              isDisabled={shifts.some(s => s.name === "GECE")}
              onAdd={handleQuickAdd}
            />
            <QuickShiftButton
              name="24 SAAT"
              startHour="08:00"
              endHour="08:00"
              isDisabled={shifts.some(s => s.name === "24 SAAT")}
              onAdd={handleQuickAdd}
            />
          </div>
        </div>

        {/* Manuel Vardiya Ekleme */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Manuel Vardiya Ekleme</h2>
          
          <div>
            <label className="block text-gray-700 mb-2">Vardiya Adı</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="GECE, SABAH, AKŞAM 1"
              className="w-full rounded-lg border-gray-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              <Clock className="inline-block w-5 h-5 mr-2 text-blue-600" />
              Vardiya Saatleri
            </label>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Başlangıç Saati:</label>
                <input
                  type="time"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  className="w-full rounded-lg border-gray-300"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bitiş Saati:</label>
                <input
                  type="time"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                  className="w-full rounded-lg border-gray-300"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Vardiya Ekle
          </button>
        </form>
      </div>

      {/* Tanımlı Vardiyalar */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Tanımlı Vardiyalar</h2>
        
        {shifts.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Henüz vardiya tanımlanmadı</p>
          </div>
        ) : (
          <div className="space-y-4">
            {shifts.map((shift) => (
              <ShiftItem 
                key={shift.id} 
                shift={shift} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </div>

      {showSuccess && <SuccessNotification message="Vardiya başarıyla eklendi" />}
    </div>
  );
};

export default VardiyaTanimlama;