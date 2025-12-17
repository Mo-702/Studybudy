import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar, MobileSidebar } from './Sidebar';
import { DashboardView } from './views/DashboardView';
import { CoursesView } from './views/CoursesView';
import { MajorsView } from './views/MajorsView';
import { CourseDetailsView } from './views/CourseDetailsView';
import { MaterialsView } from './views/MaterialsView';
import { AIAssistantView } from './views/AIAssistantView';
import { ProfileView } from './views/ProfileView';
import { MeetingsView } from './views/MeetingsView';
import { ChartDetailView } from './views/ChartDetailView';
import { CalendarView } from './views/CalendarView';
import { LogoutModal } from './LogoutModal';

interface MainLayoutProps {
  language: 'en' | 'ar';
  onLanguageChange: (lang: 'en' | 'ar') => void;
  onLogout?: () => void;
}

export type ViewType = 
  | 'dashboard' 
  | 'majors' 
  | 'courses' 
  | 'courseDetail' 
  | 'materials' 
  | 'ai' 
  | 'calendar'
  | 'profile'
  | 'meetings'
  | 'chartDetail';

export interface Course {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  credits: number;
  level: string;
  major: string;
  instructor?: string;
  description?: string;
  schedule?: string;
}

export function MainLayout({ language, onLanguageChange, onLogout }: MainLayoutProps) {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedChartType, setSelectedChartType] = useState<'studyTime' | 'performance' | 'deadlines'>('studyTime');
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isRTL = language === 'ar';

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setIsMobileSidebarOpen(false); // Close mobile sidebar on navigation
  };

  const handleMajorSelect = (major: string) => {
    setSelectedMajor(major);
    setCurrentView('courses');
    setIsMobileSidebarOpen(false);
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('courseDetail');
  };

  const handleChartSelect = (chartType: 'studyTime' | 'performance' | 'deadlines') => {
    setSelectedChartType(chartType);
    setCurrentView('chartDetail');
  };

  const handleNavigateToMaterials = (filter: string = 'all') => {
    setMaterialFilter(filter);
    setCurrentView('materials');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsMobileSidebarOpen(false);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            language={language}
            onNavigate={handleViewChange}
            onMajorSelect={handleMajorSelect}
            onChartSelect={handleChartSelect}
          />
        );
      case 'majors':
        return (
          <MajorsView
            language={language}
            onMajorSelect={handleMajorSelect}
          />
        );
      case 'courses':
        return (
          <CoursesView
            language={language}
            selectedMajor={selectedMajor}
            onCourseSelect={handleCourseSelect}
            onBack={() => {
              setSelectedMajor(null);
              setCurrentView('majors');
            }}
          />
        );
      case 'courseDetail':
        return (
          <CourseDetailsView
            language={language}
            course={selectedCourse}
            onNavigateToMaterials={handleNavigateToMaterials}
            onNavigateBack={() => setCurrentView('courses')}
          />
        );
      case 'materials':
        return (
          <MaterialsView
            language={language}
            course={selectedCourse}
            initialFilter={materialFilter}
            onBack={() => setCurrentView('courseDetail')}
          />
        );
      case 'ai':
        return <AIAssistantView language={language} />;
      case 'calendar':
        return <CalendarView language={language} />;
      case 'profile':
        return (
          <ProfileView
            language={language}
            onLanguageChange={onLanguageChange}
          />
        );
      case 'meetings':
        return <MeetingsView language={language} />;
      case 'chartDetail':
        return (
          <ChartDetailView 
            language={language} 
            chartType={selectedChartType} 
            onNavigateBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return <DashboardView language={language} onNavigate={handleViewChange} onMajorSelect={handleMajorSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F1A] flex" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Desktop Sidebar - Fixed and Sticky */}
      <div className={`hidden lg:block fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-screen z-30`}>
        <Sidebar
          language={language}
          currentView={currentView}
          onViewChange={handleViewChange}
          onLogout={handleLogoutClick}
        />
      </div>

      {/* Mobile Sidebar - Overlay */}
      {isMobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          
          {/* Sidebar Drawer */}
          <div className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} bottom-0 z-50 lg:hidden`}>
            <MobileSidebar
              language={language}
              currentView={currentView}
              onViewChange={handleViewChange}
              onLogout={handleLogoutClick}
            />
          </div>
        </>
      )}

      {/* Main Content - With margin to account for fixed sidebar */}
      <div className={`flex-1 flex flex-col min-h-screen ${isRTL ? 'lg:mr-80' : 'lg:ml-80'}`}>
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label={language === 'en' ? 'Open menu' : 'فتح القائمة'}
          >
            <Menu size={24} className="text-foreground" />
          </button>
          <h1 className="text-lg font-medium text-foreground">Study Buddy</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {renderView()}
        </div>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        language={language}
      />
    </div>
  );
}