import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'sonner@2.0.3';

interface ThemeToggleProps {
  language?: 'en' | 'ar';
  variant?: 'icon' | 'switch';
}

export function ThemeToggle({ language = 'en', variant = 'icon' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const labels = {
    en: {
      light: 'Light Mode',
      dark: 'Dark Mode',
      toggle: 'Toggle theme',
      darkEnabled: 'Dark mode enabled',
      lightEnabled: 'Light mode enabled',
    },
    ar: {
      light: 'الوضع الفاتح',
      dark: 'الوضع الداكن',
      toggle: 'تبديل المظهر',
      darkEnabled: 'تم تفعيل الوضع الداكن',
      lightEnabled: 'تم تفعيل الوضع الفاتح',
    },
  };

  const t = labels[language];

  const handleToggle = () => {
    toggleTheme();
    // Show toast after theme changes
    setTimeout(() => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      toast.success(
        newTheme === 'dark' ? t.darkEnabled : t.lightEnabled,
        { duration: 2000 }
      );
    }, 50);
  };

  if (variant === 'switch') {
    return (
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-secondary hover:bg-accent transition-all"
        aria-label={t.toggle}
        role="switch"
        aria-checked={theme === 'dark'}
      >
        <div className="flex items-center gap-3">
          {theme === 'light' ? (
            <Sun size={20} className="text-foreground" aria-hidden="true" />
          ) : (
            <Moon size={20} className="text-foreground" aria-hidden="true" />
          )}
          <span className="text-foreground">
            {theme === 'light' ? t.light : t.dark}
          </span>
        </div>
        <div
          className={`w-11 h-6 rounded-full transition-all ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
              : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
            } mt-0.5`}
          />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="p-2 md:p-2.5 rounded-xl bg-secondary hover:bg-accent transition-all focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label={t.toggle}
      title={theme === 'light' ? t.dark : t.light}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-foreground" aria-hidden="true" />
      ) : (
        <Sun size={20} className="text-foreground" aria-hidden="true" />
      )}
    </button>
  );
}