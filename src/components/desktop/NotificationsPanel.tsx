import { X, Calendar, FileText, Users, BookOpen, Bell, Sparkles, CheckCheck } from 'lucide-react';
import { useState } from 'react';
import { ViewType } from './MainLayout';

interface Notification {
  id: string;
  type: 'deadline' | 'assignment' | 'material' | 'meeting' | 'ai' | 'general';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  actionView?: ViewType;
  courseId?: string;
}

interface NotificationsPanelProps {
  language: 'en' | 'ar';
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (view: ViewType, courseId?: string) => void;
}

export function NotificationsPanel({ language, isOpen, onClose, onNavigate }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'deadline',
      title: language === 'en' ? 'Operating Systems – Assignment 3' : 'نظم التشغيل - واجب 3',
      description: language === 'en' ? 'Due in 2 days' : 'ينتهي خلال يومين',
      time: language === 'en' ? '2 hours ago' : 'قبل ساعتين',
      isRead: false,
      actionView: 'materials',
    },
    {
      id: '2',
      type: 'assignment',
      title: language === 'en' ? 'Software Engineering – New Assignment' : 'هندسة البرمجيات - واجب جديد',
      description: language === 'en' ? 'New assignment available for download' : 'واجب جديد متاح للتحميل',
      time: language === 'en' ? '5 hours ago' : 'قبل 5 ساعات',
      isRead: false,
      actionView: 'courses',
    },
    {
      id: '3',
      type: 'material',
      title: language === 'en' ? 'User Interface Design – New Slides' : 'تصميم واجهات المستخدم - سلايدات جديدة',
      description: language === 'en' ? 'Lecture 7 slides have been uploaded' : 'تم رفع سلايدات المحاضرة 7',
      time: language === 'en' ? '1 day ago' : 'قبل يوم',
      isRead: false,
      actionView: 'courses',
    },
    {
      id: '4',
      type: 'meeting',
      title: language === 'en' ? 'HCI Project Meeting' : 'اجتماع مشروع HCI',
      description: language === 'en' ? 'Starts in 30 minutes' : 'يبدأ خلال 30 دقيقة',
      time: language === 'en' ? '10 minutes ago' : 'قبل 10 دقائق',
      isRead: false,
      actionView: 'meetings',
    },
    {
      id: '5',
      type: 'ai',
      title: language === 'en' ? 'AI Study Suggestion' : 'اقتراح دراسي من الذكاء الاصطناعي',
      description: language === 'en' ? 'You have an exam soon. Consider reviewing today.' : 'لديك اختبار قريب. فكر في المراجعة اليوم.',
      time: language === 'en' ? '3 hours ago' : 'قبل 3 ساعات',
      isRead: false,
      actionView: 'ai',
    },
    {
      id: '6',
      type: 'general',
      title: language === 'en' ? 'Database Systems – Midterm Exam' : 'قواعد البيانات - اختبار منتصف الفصل',
      description: language === 'en' ? 'Scheduled for next week Monday' : 'مجدول يوم الاثنين القادم',
      time: language === 'en' ? '1 day ago' : 'قبل يوم',
      isRead: true,
      actionView: 'courses',
    },
    {
      id: '7',
      type: 'material',
      title: language === 'en' ? 'Algorithm Analysis – Summary Added' : 'تحليل الخوارزميات - ملخص مضاف',
      description: language === 'en' ? 'Chapter 5 summary is now available' : 'ملخص الفصل 5 متاح الآن',
      time: language === 'en' ? '2 days ago' : 'قبل يومين',
      isRead: true,
      actionView: 'courses',
    },
    {
      id: '8',
      type: 'meeting',
      title: language === 'en' ? 'Data Structures Study Group' : 'مجموعة دراسة هياكل البيانات',
      description: language === 'en' ? 'Meeting completed successfully' : 'تم إكمال الاجتماع بنجاح',
      time: language === 'en' ? '3 days ago' : 'قبل 3 أيام',
      isRead: true,
      actionView: 'meetings',
    },
  ]);

  const t = {
    en: {
      notifications: 'Notifications',
      markAllRead: 'Mark all as read',
      noNotifications: 'No notifications',
      newNotification: 'New',
      all: 'All',
      courses: 'Courses',
      system: 'System',
      title: 'Notifications',
    },
    ar: {
      notifications: 'الإشعارات',
      markAllRead: 'تعليم الكل كمقروء',
      noNotifications: 'لا توجد إشعارات',
      newNotification: 'جديد',
      all: 'الكل',
      courses: 'الدورات',
      system: 'النظام',
      title: 'الإشعارات',
    },
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'deadline':
        return Calendar;
      case 'assignment':
        return FileText;
      case 'material':
        return BookOpen;
      case 'meeting':
        return Users;
      case 'ai':
        return Sparkles;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'deadline':
        return 'from-red-500 to-red-600';
      case 'assignment':
        return 'from-orange-500 to-orange-600';
      case 'material':
        return 'from-blue-500 to-blue-600';
      case 'meeting':
        return 'from-purple-500 to-purple-600';
      case 'ai':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, isRead: true } : n
    ));

    // Navigate if action exists
    if (notification.actionView && onNavigate) {
      onNavigate(notification.actionView, notification.courseId);
      onClose();
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'system'>('all');

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'courses') return notification.actionView === 'courses';
    if (activeTab === 'system') return notification.actionView !== 'courses';
    return false;
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-20 right-4 md:right-8 w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl z-50 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-xl md:text-2xl text-card-foreground">{t[language].title}</h2>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded px-2 py-1"
              >
                {t[language].markAllRead}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={language === 'en' ? 'Close notifications' : 'إغلاق الإشعارات'}
            >
              <X size={20} className="text-muted-foreground" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {(['all', 'courses', 'system'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 text-sm md:text-base transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
                activeTab === tab
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-pressed={activeTab === tab}
            >
              {t[language][tab]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell size={48} className="text-muted-foreground/30 mx-auto mb-4" aria-hidden="true" />
              <p className="text-muted-foreground">{t[language].noNotifications}</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`w-full text-left p-4 rounded-2xl transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring ${
                  notification.isRead 
                    ? 'bg-accent hover:bg-accent/80' 
                    : 'bg-blue-500/10 hover:bg-blue-500/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  {(() => {
                    const IconComponent = getIcon(notification.type);
                    return (
                      <div className={`w-10 h-10 bg-gradient-to-br ${getIconColor(notification.type)} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                        <IconComponent size={20} aria-hidden="true" />
                      </div>
                    );
                  })()}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-foreground font-medium truncate">
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full flex-shrink-0" aria-label="Unread"></span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 line-clamp-2">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground opacity-75">{notification.time}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}