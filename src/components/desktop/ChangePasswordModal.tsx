import { X, Lock, Check } from 'lucide-react';
import { useState } from 'react';

interface ChangePasswordModalProps {
  language: 'en' | 'ar';
  onClose: () => void;
  onSuccess: () => void;
}

export function ChangePasswordModal({ language, onClose, onSuccess }: ChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = {
    en: {
      title: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      cancel: 'Cancel',
      submit: 'Change Password',
      currentPasswordPlaceholder: 'Enter your current password',
      newPasswordPlaceholder: 'Enter your new password',
      confirmPasswordPlaceholder: 'Confirm your new password',
      errors: {
        currentPasswordRequired: 'Current password is required',
        newPasswordRequired: 'New password is required',
        confirmPasswordRequired: 'Please confirm your password',
        passwordMismatch: 'Passwords do not match',
        passwordTooShort: 'Password must be at least 8 characters',
      },
    },
    ar: {
      title: 'تغيير كلمة المرور',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور الجديدة',
      cancel: 'إلغاء',
      submit: 'تغيير كلمة المرور',
      currentPasswordPlaceholder: 'أدخل كلمة المرور الحالية',
      newPasswordPlaceholder: 'أدخل كلمة المرور الجديدة',
      confirmPasswordPlaceholder: 'أكد كلمة المرور الجديدة',
      errors: {
        currentPasswordRequired: 'كلمة المرور الحالية مطلوبة',
        newPasswordRequired: 'كلمة المرور الجديدة مطلوبة',
        confirmPasswordRequired: 'يرجى تأكيد كلمة المرور',
        passwordMismatch: 'كلمات المرور غير متطابقة',
        passwordTooShort: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
      },
    },
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = t[language].errors.currentPasswordRequired;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = t[language].errors.newPasswordRequired;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = t[language].errors.passwordTooShort;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t[language].errors.confirmPasswordRequired;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t[language].errors.passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
      onClose();
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-3xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl text-card-foreground">{t[language].title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={language === 'en' ? 'Close' : 'إغلاق'}
          >
            <X size={20} className="text-muted-foreground" aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-muted-foreground mb-2">
              {t[language].currentPassword}
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder={t[language].currentPasswordPlaceholder}
              className={`w-full px-4 py-3 bg-input-background text-foreground placeholder:text-muted-foreground border rounded-xl outline-none focus:ring-2 focus:ring-ring transition-all ${
                errors.currentPassword ? 'border-red-500' : 'border-border'
              }`}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-muted-foreground mb-2">
              {t[language].newPassword}
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder={t[language].newPasswordPlaceholder}
              className={`w-full px-4 py-3 bg-input-background text-foreground placeholder:text-muted-foreground border rounded-xl outline-none focus:ring-2 focus:ring-ring transition-all ${
                errors.newPassword ? 'border-red-500' : 'border-border'
              }`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-muted-foreground mb-2">
              {t[language].confirmPassword}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t[language].confirmPasswordPlaceholder}
              className={`w-full px-4 py-3 bg-input-background text-foreground placeholder:text-muted-foreground border rounded-xl outline-none focus:ring-2 focus:ring-ring transition-all ${
                errors.confirmPassword ? 'border-red-500' : 'border-border'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-[#0B0F1A] text-gray-700 dark:text-[#C7CCE8] rounded-xl hover:bg-gray-200 dark:hover:bg-[#1A2035] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t[language].cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{language === 'en' ? 'Changing...' : 'جاري التغيير...'}</span>
                </>
              ) : (
                <>
                  <Check size={18} aria-hidden="true" />
                  <span>{t[language].submit}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}