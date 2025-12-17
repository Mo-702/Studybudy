import { BookOpen, User, Award, Clock, ArrowLeft, FileText, MessageSquare, Calendar, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { Course } from '../MainLayout';
import { CourseOverviewView } from './CourseOverviewView';
import { CourseChatView } from './CourseChatView';
import { CourseResourcesView } from './CourseResourcesView';

interface CourseDetailsViewProps {
  language: 'en' | 'ar';
  course: Course | null;
  onNavigateToMaterials: (filter?: string) => void;
  onNavigateBack: () => void;
}

type TabType = 'overview' | 'materials' | 'chat' | 'resources';

export function CourseDetailsView({ language, course, onNavigateToMaterials, onNavigateBack }: CourseDetailsViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">
          {language === 'en' ? 'No course selected' : 'لم يتم اختيار مادة'}
        </p>
      </div>
    );
  }

  const t = {
    en: {
      credits: 'Credits',
      backToCourses: 'Back to Courses',
      overview: 'Overview',
      materials: 'Materials',
      chat: 'Chat',
      resources: 'Resources',
      exams: 'Exams',
      summaries: 'Summaries',
      slides: 'Slides',
      assignments: 'Assignments',
      viewAll: 'View All Materials',
    },
    ar: {
      credits: 'الساعات',
      backToCourses: 'العودة للمواد',
      overview: 'نظرة عامة',
      materials: 'المواد',
      chat: 'المحادثة',
      resources: 'الموارد',
      exams: 'الاختبارات',
      summaries: 'الملخصات',
      slides: 'السلايدات',
      assignments: 'الواجبات',
      viewAll: 'عرض جميع المواد',
    },
  };

  const tabs = [
    { id: 'overview' as TabType, label: t[language].overview, icon: BookOpen },
    { id: 'materials' as TabType, label: t[language].materials, icon: FileText },
    { id: 'chat' as TabType, label: t[language].chat, icon: MessageSquare },
    { id: 'resources' as TabType, label: t[language].resources, icon: FolderOpen },
  ];

  const materials = [
    {
      type: 'exam',
      label: t[language].exams,
      count: 10,
      color: 'from-red-500 to-red-600',
    },
    {
      type: 'summary',
      label: t[language].summaries,
      count: 12,
      color: 'from-blue-500 to-blue-600',
    },
    {
      type: 'slide',
      label: t[language].slides,
      count: 10,
      color: 'from-purple-500 to-purple-600',
    },
    {
      type: 'assignment',
      label: t[language].assignments,
      count: 8,
      color: 'from-green-500 to-green-600',
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <CourseOverviewView language={language} course={course} />;
      case 'materials':
        return (
          <div className="space-y-6">
            {/* Materials Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {materials.map((material) => (
                <button
                  key={material.type}
                  onClick={() => onNavigateToMaterials(material.type)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onNavigateToMaterials(material.type);
                    }
                  }}
                  className="bg-card rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-left"
                  aria-label={`${material.label}: ${material.count} ${language === 'en' ? 'items' : 'عناصر'}`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${material.color} rounded-xl flex items-center justify-center text-white mb-3 md:mb-4`}>
                    <FileText size={20} />
                  </div>
                  <h3 className="text-foreground mb-1 text-sm md:text-base">{material.label}</h3>
                  <p className="text-xl md:text-2xl text-foreground">{material.count}</p>
                </button>
              ))}
            </div>
            {/* View All Button */}
            <button
              onClick={() => onNavigateToMaterials('all')}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {t[language].viewAll}
            </button>
          </div>
        );
      case 'chat':
        return <CourseChatView language={language} course={course} />;
      case 'resources':
        return <CourseResourcesView language={language} course={course} />;
      default:
        return <CourseOverviewView language={language} course={course} />;
    }
  };

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12 w-full max-w-full">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
            <span className="px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm md:text-base break-words">
              {course.code}
            </span>
            <span className="px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm md:text-base break-words">
              {course.level}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 break-words overflow-wrap-anywhere">
            {language === 'en' ? course.nameEn : course.nameAr}
          </h1>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 text-blue-100 text-sm md:text-base">
            <div className="flex items-center gap-2 min-w-0">
              <User size={16} className="md:hidden flex-shrink-0" />
              <User size={18} className="hidden md:block flex-shrink-0" />
              <span className="truncate">{course.instructor || 'Dr. Sarah Chen'}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Award size={16} className="md:hidden flex-shrink-0" />
              <Award size={18} className="hidden md:block flex-shrink-0" />
              <span>{course.credits} {t[language].credits}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Clock size={16} className="md:hidden flex-shrink-0" />
              <Clock size={18} className="hidden md:block flex-shrink-0" />
              <span>{course.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
        {/* Back Button */}
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 md:mb-6 group transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft size={18} className="md:hidden group-hover:-translate-x-1 transition-transform" />
          <ArrowLeft size={20} className="hidden md:block group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm md:text-base">{t[language].backToCourses}</span>
        </button>

        {/* Tabs */}
        <div className="bg-card rounded-xl md:rounded-2xl p-1.5 md:p-2 shadow-sm mb-4 md:mb-6 w-full max-w-full overflow-hidden">
          <div className="flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide w-full -mx-1 px-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-1 md:gap-1.5 lg:gap-2 px-2.5 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-lg md:rounded-xl transition-all whitespace-nowrap text-xs md:text-sm lg:text-base flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'text-muted-foreground hover:bg-secondary hover:scale-105 active:scale-95'
                  }`}
                >
                  <Icon size={14} className="md:hidden flex-shrink-0" />
                  <Icon size={16} className="hidden md:block lg:hidden flex-shrink-0" />
                  <Icon size={18} className="hidden lg:block flex-shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`w-full max-w-full ${activeTab === 'chat' ? 'h-[calc(100vh-280px)] md:h-[calc(100vh-320px)] min-h-[500px]' : 'min-h-[400px] md:min-h-[500px]'}`}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}