import React from 'react';
import { Plus } from 'lucide-react';

interface QuickShiftButtonProps {
  name: string;
  startHour: string;
  endHour: string;
  isDisabled: boolean;
  onAdd: (name: string, startHour: string, endHour: string) => void;
}

const QuickShiftButton: React.FC<QuickShiftButtonProps> = ({
  name,
  startHour,
  endHour,
  isDisabled,
  onAdd
}) => {
  return (
    <button
      onClick={() => onAdd(name, startHour, endHour)}
      className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-colors ${
        isDisabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
      }`}
      disabled={isDisabled}
    >
      <Plus className="w-4 h-4" />
      <span>{name}</span>
    </button>
  );
};

export default QuickShiftButton;