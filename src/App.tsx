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

  useEffect(() => {
    if (!isAuthenticated && showLogoutSuccess) {
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

      {/* زر مشروع تصوير البيانات - يظهر فقط بعد تسجيل الدخول */}
      <a 
        href="admin_dashboard.html" 
        target="_blank" 
        style={{
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          background: '#5856D6', 
          color: 'white', 
          padding: '12px 20px', 
          borderRadius: '50px', 
          textDecoration: 'none', 
          zIndex: 9999, 
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span>📊</span>
        {language === 'en' ? 'Data Viz Dashboard' : 'مشروع تصوير البيانات'}
      </a>

      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
