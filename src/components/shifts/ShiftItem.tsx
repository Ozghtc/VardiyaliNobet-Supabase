import React from 'react';
import { Trash2 } from 'lucide-react';

interface Shift {
  id: number;
  name: string;
  startHour: string;
  endHour: string;
}

interface ShiftItemProps {
  shift: Shift;
  onDelete: (id: number) => void;
}

const ShiftItem: React.FC<ShiftItemProps> = ({ shift, onDelete }) => {
  // Calculate shift duration in hours
  const calculateHours = (): number => {
    const start = new Date(`2024-01-01 ${shift.startHour}`);
    let end = new Date(`2024-01-01 ${shift.endHour}`);
    
    // Handle overnight shifts
    if (end <= start) {
      end = new Date(`2024-01-02 ${shift.endHour}`);
    }
    
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return hours;
  };

  const hours = calculateHours();

  return (
    <div
      className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{shift.name}</h3>
          <p className="text-sm text-gray-600">
            {shift.startHour} - {shift.endHour}
            <span className="ml-2 text-blue-600">({hours} Saat)</span>
          </p>
        </div>
        <button
          onClick={() => onDelete(shift.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Vardiyayı sil"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ShiftItem;