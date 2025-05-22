import React from 'react';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;