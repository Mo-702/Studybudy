import { BookOpen, Calendar, Clock, TrendingUp, Award, ChevronRight, Bell, BarChart3, LineChart, PieChart, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { ViewType } from '../MainLayout';
import { NotificationsPanel } from '../NotificationsPanel';

interface DashboardViewProps {
  language: 'en' | 'ar';
  onNavigate: (view: ViewType) => void;
  onMajorSelect: (major: string) => void;
  onChartSelect?: (chartType: 'studyTime' | 'performance' | 'deadlines') => void;
}

const translations = {
  en: {
    dashboard: 'Home',
    welcome: 'Welcome back',
    currentSemester: 'Current Semester',
    semester: 'Spring 2025 - Level 5',
    todaySchedule: "Today's Schedule",
    upcomingDeadlines: 'Upcoming Deadlines',
    quickAccess: 'Quick Access',
    recentActivity: 'Recent Activity',
    browseAllCourses: 'Browse All Courses',
    viewAllMajors: 'View All Majors',
    openAI: 'Open AI Assistant',
    stats: 'Your Statistics',
    enrolledCourses: 'Enrolled Courses',
    completedCredits: 'Completed Credits',
    currentGPA: 'Current GPA',
    achievements: 'Achievements',
  },
  ar: {
    dashboard: 'الرئيسية',
    welcome: 'مرحباً بك',
    currentSemester: 'الفصل الحالي',
    semester: 'ربيع 2025 - المستوى 5',
    todaySchedule: 'جدول اليوم',
    upcomingDeadlines: 'المواعيد القادمة',
    quickAccess: 'وصول سريع',
    recentActivity: 'النشاط الأخير',
    browseAllCourses: 'تصفح جميع المواد',
    viewAllMajors: 'عرض جميع التخصصات',
    openAI: 'فتح المساعد الذكي',
    stats: 'إحصائياتك',
    enrolledCourses: 'المواد المسجلة',
    completedCredits: 'الساعات المكتملة',
    currentGPA: 'المعدل الحالي',
    achievements: 'الإنجازات',
  },
};

export function DashboardView({ language, onNavigate, onMajorSelect, onChartSelect }: DashboardViewProps) {
  const t = translations[language];
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadNotifications] = useState(true);

  const todaySchedule = [
    {
      time: '10:00 AM',
      course: language === 'en' ? 'Operating Systems' : 'نظم التشغيل',
      code: 'CS301',
      room: language === 'en' ? 'Lab 3B' : 'معمل 3ب',
      color: 'bg-blue-500',
    },
    {
      time: '1:00 PM',
      course: language === 'en' ? 'Database Systems' : 'نظم قواعد البيانات',
      code: 'CS302',
      room: language === 'en' ? 'Hall A' : 'قاعة أ',
      color: 'bg-purple-500',
    },
    {
      time: '3:30 PM',
      course: language === 'en' ? 'Software Engineering' : 'هندسة البرمجيات',
      code: 'CS303',
      room: language === 'en' ? 'Hall B' : 'قاعة ب',
      color: 'bg-green-500',
    },
  ];

  const deadlines = [
    {
      title: language === 'en' ? 'Operating Systems - Assignment 3' : 'نظم التشغيل - واجب 3',
      daysLeft: 2,
      color: 'bg-[#1A1F35]',
      accentColor: 'text-purple-400',
    },
    {
      title: language === 'en' ? 'Database Systems - Midterm Exam' : 'قواعد البيانات - اختبار منتصف الفصل',
      daysLeft: 5,
      color: 'bg-[#1A1F35]',
      accentColor: 'text-blue-400',
    },
    {
      title: language === 'en' ? 'Software Engineering - Project Phase 2' : 'هندسة البرمجيات - المشروع المرحلة 2',
      daysLeft: 7,
      color: 'bg-[#1A1F35]',
      accentColor: 'text-cyan-400',
    },
  ];

  const recentActivity = [
    {
      action: language === 'en' ? 'New exam added' : 'اختبار جديد مضاف',
      course: language === 'en' ? 'Operating Systems' : 'نظم التشغيل',
      time: language === 'en' ? '2 hours ago' : 'قبل ساعتين',
    },
    {
      action: language === 'en' ? 'Summary uploaded' : 'ملخص مرفوع',
      course: language === 'en' ? 'Database Systems' : 'نظم قواعد البيانات',
      time: language === 'en' ? '5 hours ago' : 'قبل 5 ساعات',
    },
    {
      action: language === 'en' ? 'Slides updated' : 'سلايدات محدثة',
      course: language === 'en' ? 'Software Engineering' : 'هندسة البرمجيات',
      time: language === 'en' ? '1 day ago' : 'قبل يوم',
    },
  ];

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-card border-b border-border px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="text-start">
            <h1 className="text-4xl text-foreground mb-2">{t.dashboard}</h1>
            <p className="text-muted-foreground">
              {t.welcome}, {language === 'en' ? 'Yousef' : 'يوسف'}
            </p>
          </div>
          <button
            className="relative p-3 hover:bg-accent rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label={language === 'en' ? 'Notifications' : 'الإشعارات'}
          >
            <Bell size={24} className="text-muted-foreground" aria-hidden="true" />
            {hasUnreadNotifications && <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Semester Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white hover:shadow-2xl transition-shadow">
              <h2 className="text-2xl mb-2 text-start">{t.currentSemester}</h2>
              <p className="text-blue-100 text-lg mb-6 text-start">{t.semester}</p>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 md:p-4 hover:bg-white/20 transition-all cursor-pointer">
                  <p className="text-blue-100 text-xs md:text-sm mb-1">{t.enrolledCourses}</p>
                  <p className="text-2xl md:text-3xl text-start">6</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 md:p-4 hover:bg-white/20 transition-all cursor-pointer">
                  <p className="text-blue-100 text-xs md:text-sm mb-1">{t.completedCredits}</p>
                  <p className="text-2xl md:text-3xl text-start">87</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 md:p-4 hover:bg-white/20 transition-all cursor-pointer">
                  <p className="text-blue-100 text-xs md:text-sm mb-1">{t.currentGPA}</p>
                  <p className="text-2xl md:text-3xl text-start">3.85</p>
                </div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-card border border-border rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl text-card-foreground">{t.todaySchedule}</h2>
                <Clock size={24} className="text-muted-foreground" aria-hidden="true" />
              </div>
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <button key={index} className="w-full flex items-center gap-4 p-3 md:p-4 bg-accent rounded-2xl hover:bg-accent/80 hover:shadow-md transition-all group focus:outline-none focus:ring-2 focus:ring-ring">
                    <div className={`w-1.5 md:w-2 h-12 md:h-16 ${item.color} rounded-full group-hover:w-2 transition-all`}></div>
                    <div className="flex-1 text-start">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-card-foreground text-sm md:text-base">{item.course}</span>
                        <span className="text-xs md:text-sm text-muted-foreground">{item.code}</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                        <span>{item.time}</span>
                        <span>•</span>
                        <span>{item.room}</span>
                      </div>
                    </div>
                    <ChevronRight className={`text-muted-foreground group-hover:text-foreground transition-all ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} size={20} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Access */}
            <div className="bg-card border border-border rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-shadow">
              <h2 className="text-xl md:text-2xl text-card-foreground mb-6 text-start">{t.quickAccess}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button onClick={() => onNavigate('courses')} className="p-4 md:p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/20 hover:from-blue-500/20 hover:to-blue-500/30 rounded-2xl transition-all hover:shadow-lg hover:scale-105 active:scale-95 text-start">
                  <BookOpen size={28} className="text-blue-600 dark:text-blue-400 mb-2 md:mb-3" />
                  <p className="text-card-foreground text-sm md:text-base">{t.browseAllCourses}</p>
                </button>
                <button onClick={() => onNavigate('majors')} className="p-4 md:p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/20 hover:from-purple-500/20 hover:to-purple-500/30 rounded-2xl transition-all hover:shadow-lg hover:scale-105 active:scale-95 text-start">
                  <Award size={28} className="text-purple-600 dark:text-purple-400 mb-2 md:mb-3" />
                  <p className="text-card-foreground text-sm md:text-base">{t.viewAllMajors}</p>
                </button>
                <button onClick={() => onNavigate('ai')} className="p-4 md:p-6 bg-gradient-to-br from-green-500/10 to-green-500/20 hover:from-green-500/20 hover:to-green-500/30 rounded-2xl transition-all hover:shadow-lg hover:scale-105 active:scale-95 text-start">
                  <BookOpen size={28} className="text-green-600 dark:text-green-400 mb-2 md:mb-3" />
                  <p className="text-card-foreground text-sm md:text-base">{t.openAI}</p>
                </button>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-card border border-border rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-shadow">
              <h2 className="text-xl md:text-2xl text-card-foreground mb-6 text-start">
                {language === 'en' ? 'Analytics' : 'التحليلات'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button onClick={() => onChartSelect?.('studyTime')} className="p-4 md:p-5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl transition-all text-start group">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Clock size={32} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-foreground mb-1">{language === 'en' ? 'Study Time' : 'وقت الدراسة'}</h3>
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'by Course' : 'حسب المادة'}</p>
                </button>
                <button onClick={() => onChartSelect?.('performance')} className="p-4 md:p-5 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl transition-all text-start group">
                  <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <TrendingUp size={32} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-foreground mb-1">{language === 'en' ? 'Performance' : 'الأداء'}</h3>
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'by Level' : 'حسب المستوى'}</p>
                </button>
                <button onClick={() => onChartSelect?.('deadlines')} className="p-4 md:p-5 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl transition-all text-start group">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <AlertCircle size={32} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-foreground mb-1">{language === 'en' ? 'Deadlines' : 'المواعيد النهائية'}</h3>
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Overview' : 'نظرة عامة'}</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div className="bg-card border border-border rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-shadow">
              <h2 className="text-lg md:text-xl text-card-foreground mb-4 text-start">{t.upcomingDeadlines}</h2>
              <div className="space-y-3">
                {deadlines.map((deadline, index) => (
                  <button key={index} className={`w-full text-start p-3 md:p-4 rounded-2xl ${deadline.color} border border-border/50 transition-all active:scale-95`}>
                    <p className="text-xs md:text-sm mb-2 text-white/90">{deadline.title}</p>
                    <p className={`text-xl md:text-2xl ${deadline.accentColor}`}>
                      {deadline.daysLeft} {language === 'en' ? 'days' : 'أيام'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-shadow">
              <h2 className="text-lg md:text-xl text-card-foreground mb-4 text-start">{t.recentActivity}</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <button key={index} className="w-full text-start pb-4 border-b border-border last:border-0 hover:bg-accent p-2 rounded-xl transition-colors">
                    <p className="text-foreground mb-1 text-sm md:text-base">{activity.action}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">{activity.course}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationsPanel 
        language={language}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
}
