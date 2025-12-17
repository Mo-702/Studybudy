import { useState, useEffect } from 'react';
import { AuthScreen } from './components/desktop/AuthScreen';
import { MainLayout } from './components/desktop/MainLayout';
import { Toaster, toast } from 'sonner@2.0.3';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogoutSuccess(true);
  };

  // Show logout success toast when login page loads after logout
  useEffect(() => {
    if (!isAuthenticated && showLogoutSuccess) {
      // Small delay to ensure login page is rendered
      const timer = setTimeout(() => {
        toast.success(
          language === 'en' 
            ? 'You have been logged out successfully.' 
            : 'تم تسجيل الخروج بنجاح.',
          {
            duration: 2000,
          }
        );
        setShowLogoutSuccess(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, showLogoutSuccess, language]);

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <AuthScreen
          onLogin={() => setIsAuthenticated(true)}
          language={language}
          onLanguageChange={setLanguage}
        />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <MainLayout
        language={language}
        onLanguageChange={setLanguage}
        onLogout={handleLogout}
      />
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}