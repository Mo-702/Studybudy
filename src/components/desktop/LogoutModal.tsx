import { X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  language: 'en' | 'ar';
}

export function LogoutModal({ isOpen, onClose, onConfirm, language }: LogoutModalProps) {
  if (!isOpen) return null;

  const t = {
    en: {
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      cancel: 'Cancel',
      logout: 'Logout',
    },
    ar: {
      title: 'تأكيد تسجيل الخروج',
      message: 'هل أنت متأكد من رغبتك في تسجيل الخروج؟',
      cancel: 'إلغاء',
      logout: 'تسجيل الخروج',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          onClick={onClose}
          aria-label={language === 'en' ? 'Close' : 'إغلاق'}
        >
          <X size={20} className="text-muted-foreground" aria-hidden="true" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl" aria-hidden="true">🚪</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl text-gray-900 dark:text-white mb-3">{t[language].title}</h2>

          {/* Message */}
          <p className="text-gray-600 dark:text-[#8B91B7] mb-8">{t[language].message}</p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-[#0B0F1A] text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-[#1A2035] transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t[language].cancel}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-red-600 dark:bg-red-700 text-white rounded-xl hover:bg-red-700 dark:hover:bg-red-800 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {t[language].logout}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}