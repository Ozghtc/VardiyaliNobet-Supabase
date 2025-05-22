import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose?: () => void;
}

export const SuccessNotification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-xl animate-slide-up">
        <CheckCircle2 className="w-6 h-6 text-green-500" />
        <span className="text-lg font-medium">{message}</span>
      </div>
    </div>
  );
};

export const ErrorNotification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-slide-in-right">
      <div className="flex p-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">Hata</p>
          <p className="mt-1 text-sm text-gray-500">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onClose}
          >
            <span className="sr-only">Kapat</span>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};