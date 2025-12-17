import { Home, BookOpen, GraduationCap, FileText, Bot, Search, User, LogOut, Calendar, CalendarDays } from 'lucide-react';
import { ViewType } from './MainLayout';
import { ThemeToggle } from '../ThemeToggle';
const logoImage = "https://i.postimg.cc/hGVkyVZH/Logo.png";
interface SidebarProps {
  language: 'en' | 'ar';
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout?: () => void;
}

const navItems: Record<'en' | 'ar', Array<{ id: ViewType; label: string; icon: any }>> = {
  en: [
    { id: 'dashboard' as ViewType, label: 'Home', icon: Home },
    { id: 'courses' as ViewType, label: 'Courses', icon: BookOpen },
    { id: 'majors' as ViewType, label: 'Majors', icon: GraduationCap },
    { id: 'meetings' as ViewType, label: 'Meetings', icon: CalendarDays },
    { id: 'ai' as ViewType, label: 'AI Assistant', icon: Bot },
    { id: 'calendar' as ViewType, label: 'Calendar', icon: Calendar },
    { id: 'profile' as ViewType, label: 'Profile', icon: User },
  ],
  ar: [
    { id: 'dashboard' as ViewType, label: 'الرئيسية', icon: Home },
    { id: 'courses' as ViewType, label: 'المواد', icon: BookOpen },
    { id: 'majors' as ViewType, label: 'التخصصات', icon: GraduationCap },
    { id: 'meetings' as ViewType, label: 'الاجتماعات', icon: CalendarDays },
    { id: 'ai' as ViewType, label: 'المساعد الذكي', icon: Bot },
    { id: 'calendar' as ViewType, label: 'التقويم', icon: Calendar },
    { id: 'profile' as ViewType, label: 'الملف الشخصي', icon: User },
  ],
};

export function Sidebar({ language, currentView, onViewChange, onLogout }: SidebarProps) {
  const items = navItems[language];
  const isRTL = language === 'ar';

  return (
    <aside className={`w-64 md:w-72 lg:w-80 bg-sidebar ${isRTL ? 'border-l' : 'border-r'} border-sidebar-border flex flex-col h-screen overflow-y-auto`}>
      {/* Logo */}
      <div className="p-4 lg:p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="rounded-[20px] overflow-hidden flex-shrink-0">
            <img src={logoImage} alt="Study Buddy" className="w-auto h-12 lg:w-16 lg:h-16 object-contain" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl text-sidebar-foreground">Study Buddy</h1>
            <p className="text-xs lg:text-sm text-sidebar-accent-foreground">
              {language === 'en' ? 'Academic Platform' : 'المنصة الأكاديمية'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 lg:p-6">
        <ul className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-sidebar-ring ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'text-sidebar-accent-foreground hover:bg-sidebar-accent hover:scale-105 active:scale-95'
                  }`}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span className="text-sm lg:text-base">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 lg:p-6 border-t border-sidebar-border space-y-3">
        {/* Theme Toggle */}
        <ThemeToggle language={language} variant="icon" />
        
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm lg:text-base">
            {language === 'en' ? 'YH' : 'ي ح'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sidebar-foreground truncate text-sm lg:text-base">
              {language === 'en' ? 'Yousef Hakeem' : 'يوسف حكيم'}
            </p>
            <p className="text-xs lg:text-sm text-sidebar-accent-foreground truncate">
              {language === 'en' ? 'HCI' : 'تفاعل الإنسان مع الحاسب'}
            </p>
          </div>
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 px-3 lg:px-4 py-2.5 lg:py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={onLogout}
          aria-label={language === 'en' ? 'Logout' : 'تسجيل الخروج'}
        >
          <LogOut size={18} aria-hidden="true" />
          <span className="text-sm lg:text-base">{language === 'en' ? 'Logout' : 'تسجيل الخروج'}</span>
        </button>
      </div>
    </aside>
  );
}

// Mobile Sidebar Component
export function MobileSidebar({ language, currentView, onViewChange, onLogout }: SidebarProps) {
  const items = navItems[language];
  const isRTL = language === 'ar';

  return (
    <aside className={`w-64 md:w-72 bg-sidebar ${isRTL ? 'border-l' : 'border-r'} border-sidebar-border flex flex-col h-screen overflow-y-auto`}>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="rounded-[20px] overflow-hidden flex-shrink-0">
            <img src={logoImage} alt="Study Buddy" className="w-auto h-12 object-contain" />
          </div>
          <div>
            <h1 className="text-lg text-sidebar-foreground">Study Buddy</h1>
            <p className="text-xs text-sidebar-accent-foreground">
              {language === 'en' ? 'Academic Platform' : 'المنصة الأكاديمية'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-sidebar-ring ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'text-sidebar-accent-foreground hover:bg-sidebar-accent hover:scale-105 active:scale-95'
                  }`}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        {/* Theme Toggle */}
        <ThemeToggle language={language} variant="icon" />
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
            {language === 'en' ? 'YH' : 'ي ح'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sidebar-foreground truncate text-sm">
              {language === 'en' ? 'Yousef Hakeem' : 'يوسف حكيم'}
            </p>
            <p className="text-xs text-sidebar-accent-foreground truncate">
              {language === 'en' ? 'HCI' : 'تفاعل الإنسان مع الحاسب'}
            </p>
          </div>
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={onLogout}
          aria-label={language === 'en' ? 'Logout' : 'تسجيل الخروج'}
        >
          <LogOut size={18} aria-hidden="true" />
          <span className="text-sm">{language === 'en' ? 'Logout' : 'تسجيل الخروج'}</span>
        </button>
      </div>
    </aside>
  );
}
