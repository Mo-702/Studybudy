import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Edit2, Trash2, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

// Hijri date conversion utility
class HijriConverter {
  // Hijri calendar conversion algorithm based on Umm al-Qura calendar
  static gregorianToHijri(date: Date): { day: number; month: number; year: number } {
    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1;
    const gDay = date.getDate();

    // Julian day calculation
    let jd = Math.floor((1461 * (gYear + 4800 + Math.floor((gMonth - 14) / 12))) / 4) +
             Math.floor((367 * (gMonth - 2 - 12 * Math.floor((gMonth - 14) / 12))) / 12) -
             Math.floor((3 * Math.floor((gYear + 4900 + Math.floor((gMonth - 14) / 12)) / 100)) / 4) +
             gDay - 32075;

    // Convert Julian day to Hijri
    const l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l1 = l - 10631 * n + 354;
    const j = (Math.floor((10985 - l1) / 5316)) * (Math.floor((50 * l1) / 17719)) + 
              (Math.floor(l1 / 5670)) * (Math.floor((43 * l1) / 15238));
    const l2 = l1 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - 
               (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    const hMonth = Math.floor((24 * l2) / 709);
    const hDay = l2 - Math.floor((709 * hMonth) / 24);
    const hYear = 30 * n + j - 30;

    return {
      day: hDay,
      month: hMonth - 1, // 0-indexed for consistency
      year: hYear
    };
  }

  // Convert Hijri to Gregorian
  static hijriToGregorian(hYear: number, hMonth: number, hDay: number): Date {
    // Note: hMonth is 0-indexed
    const m = hMonth + 1; // Convert to 1-indexed for calculation
    
    // Calculate Julian day from Hijri date
    const jd = Math.floor((11 * hYear + 3) / 30) + 
               354 * hYear + 
               30 * m - 
               Math.floor((m - 1) / 2) + 
               hDay + 
               1948440 - 385;

    // Convert Julian day to Gregorian
    const l = jd + 68569;
    const n = Math.floor((4 * l) / 146097);
    const l1 = l - Math.floor((146097 * n + 3) / 4);
    const i = Math.floor((4000 * (l1 + 1)) / 1461001);
    const l2 = l1 - Math.floor((1461 * i) / 4) + 31;
    const j = Math.floor((80 * l2) / 2447);
    const gDay = l2 - Math.floor((2447 * j) / 80);
    const l3 = Math.floor(j / 11);
    const gMonth = j + 2 - 12 * l3;
    const gYear = 100 * (n - 49) + i + l3;

    return new Date(gYear, gMonth - 1, gDay);
  }

  // Get number of days in a Hijri month
  static getDaysInHijriMonth(year: number, month: number): number {
    // Hijri months alternate between 30 and 29 days
    // Odd months (1, 3, 5, 7, 9, 11) have 30 days
    // Even months (2, 4, 6, 8, 10) have 29 days
    // Month 12 has 29 days normally, 30 in leap years
    
    if (month === 11) { // 12th month (0-indexed)
      // Leap year calculation: (11 * year + 14) % 30 < 11
      return ((11 * year + 14) % 30 < 11) ? 30 : 29;
    }
    
    return (month % 2 === 0) ? 30 : 29;
  }
}

interface CalendarViewProps {
  language: 'en' | 'ar';
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM
  type: 'Exam' | 'Meeting' | 'Deadline' | 'Other';
  description?: string;
}

type DateDisplayMode = 'gregorian' | 'hijri' | 'both';

export function CalendarView({ language }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateDisplayMode, setDateDisplayMode] = useState<DateDisplayMode>('both');
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: language === 'en' ? 'Database Design Midterm' : 'اختبار منتصف الفصل لتصميم قواعد البيانات',
      date: '2025-02-15',
      time: '10:00',
      type: 'Exam',
      description: language === 'en' ? 'Chapters 1-5' : 'الفصول 1-5',
    },
    {
      id: '2',
      title: language === 'en' ? 'Project Submission' : 'تسليم المشروع',
      date: '2025-02-20',
      time: '23:59',
      type: 'Deadline',
      description: language === 'en' ? 'HCI Final Project' : 'مشروع HCI النهائي',
    },
    {
      id: '3',
      title: language === 'en' ? 'Team Meeting' : 'اجتماع الفريق',
      date: '2025-02-18',
      time: '14:00',
      type: 'Meeting',
      description: language === 'en' ? 'Discuss project progress' : 'مناقشة تقدم المشروع',
    },
  ]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventType, setEventType] = useState<'Exam' | 'Meeting' | 'Deadline' | 'Other'>('Other');
  const [eventDescription, setEventDescription] = useState('');

  const t = {
    en: {
      title: 'Calendar',
      today: 'Today',
      addEvent: 'Add Event',
      eventTitle: 'Event Title',
      time: 'Time',
      type: 'Type',
      description: 'Description',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      close: 'Close',
      noEvents: 'No events for this date',
      requiredField: 'This field is required',
      eventAdded: 'Event added successfully',
      eventUpdated: 'Event updated successfully',
      eventDeleted: 'Event deleted successfully',
      exam: 'Exam',
      meeting: 'Meeting',
      deadline: 'Deadline',
      other: 'Other',
      optional: 'Optional',
      at: 'at',
      gregorian: 'Gregorian',
      hijri: 'Hijri',
      both: 'Both',
      gregorianDate: 'Gregorian Date',
      hijriDate: 'Hijri Date',
      monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      hijriMonthNames: [
        'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani',
        'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
      ],
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    ar: {
      title: 'التقويم',
      today: 'اليوم',
      addEvent: 'إضافة حدث',
      eventTitle: 'عنوان الحدث',
      time: 'الوقت',
      type: 'النوع',
      description: 'الوصف',
      save: 'حفظ',
      cancel: 'إلغاء',
      edit: 'تعديل',
      delete: 'حذف',
      close: 'إغلاق',
      noEvents: 'لا توجد أحداث في هذا التاريخ',
      requiredField: 'هذا الحقل مطلوب',
      eventAdded: 'تمت إضافة الحدث بنجاح',
      eventUpdated: 'تم تحديث الحدث بنجاح',
      eventDeleted: 'تم حذف الحدث بنجاح',
      exam: 'اختبار',
      meeting: 'اجتماع',
      deadline: 'موعد نهائي',
      other: 'أخرى',
      optional: 'اختياري',
      at: 'في',
      gregorian: 'ميلادي',
      hijri: 'هجري',
      both: 'كلاهما',
      gregorianDate: 'التاريخ الميلادي',
      hijriDate: 'التاريخ الهجري',
      monthNames: [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
      ],
      hijriMonthNames: [
        'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية',
        'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
      ],
      dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    },
  };

  // Hijri conversion helper functions
  const getHijriDate = (gregorianDate: Date) => {
    return HijriConverter.gregorianToHijri(gregorianDate);
  };

  const formatHijriDate = (date: Date) => {
    const hijri = getHijriDate(date);
    const monthName = t[language].hijriMonthNames[hijri.month];
    return language === 'en' 
      ? `${hijri.day} ${monthName} ${hijri.year} AH`
      : `${hijri.day} ${monthName} ${hijri.year} هـ`;
  };

  const formatGregorianDate = (date: Date) => {
    const day = date.getDate();
    const month = t[language].monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getDaysInMonth = (date: Date) => {
    if (dateDisplayMode === 'hijri') {
      // For Hijri mode, calculate days based on Hijri calendar
      return getDaysInHijriMonth(date);
    }
    
    // For Gregorian mode
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getDaysInHijriMonth = (gregorianReferenceDate: Date) => {
    // Get the Hijri date for the reference date
    const hijriRef = getHijriDate(gregorianReferenceDate);
    
    // Get the first day of this Hijri month
    const firstDayGregorian = HijriConverter.hijriToGregorian(hijriRef.year, hijriRef.month, 1);
    const startingDayOfWeek = firstDayGregorian.getDay();
    
    // Get number of days in this Hijri month
    const daysInMonth = HijriConverter.getDaysInHijriMonth(hijriRef.year, hijriRef.month);
    
    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    if (dateDisplayMode === 'hijri') {
      // Navigate by Hijri month
      const hijri = getHijriDate(currentDate);
      let newMonth = hijri.month - 1;
      let newYear = hijri.year;
      
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      
      // Convert back to Gregorian for state storage
      const newDate = HijriConverter.hijriToGregorian(newYear, newMonth, 1);
      setCurrentDate(newDate);
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }
  };

  const goToNextMonth = () => {
    if (dateDisplayMode === 'hijri') {
      // Navigate by Hijri month
      const hijri = getHijriDate(currentDate);
      let newMonth = hijri.month + 1;
      let newYear = hijri.year;
      
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      
      // Convert back to Gregorian for state storage
      const newDate = HijriConverter.hijriToGregorian(newYear, newMonth, 1);
      setCurrentDate(newDate);
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDateString = (day: number) => {
    if (dateDisplayMode === 'hijri') {
      // Convert Hijri day to Gregorian date string
      const hijriRef = getHijriDate(currentDate);
      const gregorianDate = HijriConverter.hijriToGregorian(hijriRef.year, hijriRef.month, day);
      const year = gregorianDate.getFullYear();
      const month = String(gregorianDate.getMonth() + 1).padStart(2, '0');
      const dayStr = String(gregorianDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${dayStr}`;
    }
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const getEventsForDate = (dateString: string) => {
    return events.filter(event => event.date === dateString);
  };

  const isToday = (day: number) => {
    const today = new Date();
    
    if (dateDisplayMode === 'hijri') {
      // For Hijri mode, check if the Hijri day matches today's Hijri date
      const hijriRef = getHijriDate(currentDate);
      const todayHijri = getHijriDate(today);
      return (
        day === todayHijri.day &&
        hijriRef.month === todayHijri.month &&
        hijriRef.year === todayHijri.year
      );
    }
    
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    const dateString = formatDateString(day);
    setSelectedDate(dateString);
    resetForm();
    setShowEventModal(true);
  };

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const resetForm = () => {
    setEventTitle('');
    setEventTime('');
    setEventType('Other');
    setEventDescription('');
    setEditingEvent(null);
  };

  const handleAddEvent = () => {
    if (!eventTitle.trim()) {
      toast.error(t[language].requiredField);
      return;
    }

    if (!selectedDate) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventTitle,
      date: selectedDate,
      time: eventTime || undefined,
      type: eventType,
      description: eventDescription || undefined,
    };

    setEvents([...events, newEvent]);
    toast.success(t[language].eventAdded);
    setShowEventModal(false);
    resetForm();
  };

  const handleEditEvent = () => {
    if (!eventTitle.trim()) {
      toast.error(t[language].requiredField);
      return;
    }

    if (!editingEvent) return;

    const updatedEvents = events.map(event =>
      event.id === editingEvent.id
        ? {
            ...event,
            title: eventTitle,
            time: eventTime || undefined,
            type: eventType,
            description: eventDescription || undefined,
          }
        : event
    );

    setEvents(updatedEvents);
    toast.success(t[language].eventUpdated);
    setShowEventModal(false);
    setShowEventDetails(false);
    resetForm();
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast.success(t[language].eventDeleted);
    setShowEventDetails(false);
  };

  const openEditModal = (event: CalendarEvent) => {
    setEditingEvent(event);
    setEventTitle(event.title);
    setEventTime(event.time || '');
    setEventType(event.type);
    setEventDescription(event.description || '');
    setSelectedDate(event.date);
    setShowEventDetails(false);
    setShowEventModal(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Exam':
        return 'bg-red-500/90 dark:bg-red-500';
      case 'Meeting':
        return 'bg-blue-500/90 dark:bg-blue-500';
      case 'Deadline':
        return 'bg-orange-500/90 dark:bg-orange-500';
      default:
        return 'bg-purple-500/90 dark:bg-purple-500';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Exam':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Meeting':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Deadline':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default:
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <CalendarIcon size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl text-white">{t[language].title}</h1>
                <p className="text-sm text-white/80 mt-1">
                  {/* Show date based on selected mode */}
                  {dateDisplayMode === 'gregorian' && formatGregorianDate(new Date())}
                  {dateDisplayMode === 'hijri' && formatHijriDate(new Date())}
                  {dateDisplayMode === 'both' && (
                    <>
                      {formatGregorianDate(new Date())}
                      <span className="mx-2">•</span>
                      {formatHijriDate(new Date())}
                    </>
                  )}
                </p>
              </div>
            </div>
            
            {/* Date Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-1.5">
              {(['gregorian', 'hijri', 'both'] as DateDisplayMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDateDisplayMode(mode)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all ${
                    dateDisplayMode === mode
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t[language][mode]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-card border-b border-border px-6 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={goToPreviousMonth}
            className="p-3 hover:bg-accent rounded-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Previous month"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>

          <div className="text-center">
            {/* Show month title based on selected mode */}
            {dateDisplayMode === 'gregorian' && (
              <h2 className="text-2xl md:text-3xl text-foreground">
                {t[language].monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            )}
            {dateDisplayMode === 'hijri' && (
              <h2 className="text-2xl md:text-3xl text-foreground">
                {t[language].hijriMonthNames[getHijriDate(currentDate).month]} {getHijriDate(currentDate).year} {language === 'ar' ? 'هـ' : 'AH'}
              </h2>
            )}
            {dateDisplayMode === 'both' && (
              <>
                <h2 className="text-2xl md:text-3xl text-foreground">
                  {t[language].monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {t[language].hijriMonthNames[getHijriDate(currentDate).month]} {getHijriDate(currentDate).year} {language === 'ar' ? 'هـ' : 'AH'}
                </p>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring shadow-md hidden md:block"
            >
              {t[language].today}
            </button>
            <button
              onClick={goToNextMonth}
              className="p-3 hover:bg-accent rounded-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Next month"
            >
              <ChevronRight size={24} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {t[language].dayNames.map((day, index) => (
              <div
                key={index}
                className="text-center py-3 text-xs md:text-sm text-muted-foreground uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const dateString = formatDateString(day);
              const dayEvents = getEventsForDate(dateString);
              const isTodayDate = isToday(day);
              
              // Calculate dates for display
              let gregorianDay = day;
              let gregorianDate: Date;
              let hijriDay = day;
              let hijriMonth = 0;
              
              if (dateDisplayMode === 'hijri') {
                // In Hijri mode, day is Hijri day number
                const hijriRef = getHijriDate(currentDate);
                gregorianDate = HijriConverter.hijriToGregorian(hijriRef.year, hijriRef.month, day);
                gregorianDay = gregorianDate.getDate();
                hijriDay = day;
                hijriMonth = hijriRef.month;
              } else {
                // In Gregorian/Both mode, day is Gregorian day number
                gregorianDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const hijri = getHijriDate(gregorianDate);
                hijriDay = hijri.day;
                hijriMonth = hijri.month;
              }

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square p-2 md:p-3 rounded-2xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring relative overflow-hidden ${
                    isTodayDate
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl border-2 border-white/50'
                      : 'bg-card border-2 border-border hover:border-primary/50 hover:shadow-lg'
                  }`}
                >
                  <div className="flex flex-col h-full">
                    {/* Main Day Number */}
                    <div className="flex items-start justify-between mb-1">
                      <span className={`text-base md:text-lg ${isTodayDate ? 'text-white' : 'text-foreground'}`}>
                        {dateDisplayMode === 'hijri' ? hijriDay : gregorianDay}
                      </span>
                    </div>

                    {/* Secondary Date */}
                    {dateDisplayMode === 'hijri' ? (
                      // In Hijri mode, show Gregorian date as secondary (if "both" is selected)
                      // For pure Hijri mode, we don't show Gregorian at all
                      null
                    ) : dateDisplayMode === 'both' ? (
                      // In Both mode, show Hijri date as secondary
                      <div className={`text-[9px] md:text-[10px] mb-1 ${
                        isTodayDate ? 'text-white/90' : 'text-muted-foreground'
                      }`}>
                        {hijriDay} {language === 'ar' 
                          ? t[language].hijriMonthNames[hijriMonth].slice(0, 6)
                          : t[language].hijriMonthNames[hijriMonth].slice(0, 3)
                        }
                      </div>
                    ) : null}

                    {/* Event Chips */}
                    <div className="flex-1 flex flex-col gap-0.5 md:gap-1 overflow-hidden mt-auto">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          onClick={(e) => handleEventClick(event, e)}
                          className={`${getTypeColor(event.type)} rounded-md md:rounded-lg px-1 py-0.5 text-white text-[8px] md:text-[10px] truncate hover:opacity-80 transition-opacity shadow-sm`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className={`text-[8px] md:text-[10px] px-1 ${
                          isTodayDate ? 'text-white/90' : 'text-muted-foreground'
                        }`}>
                          +{dayEvents.length - 2} {language === 'en' ? 'more' : 'أخرى'}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl text-foreground">
                {editingEvent ? t[language].edit : t[language].addEvent}
              </h2>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-accent rounded-xl transition-colors"
              >
                <X size={20} className="text-foreground" />
              </button>
            </div>

            {/* Show selected date with both Gregorian and Hijri */}
            {selectedDate && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl">
                <div className="text-sm text-muted-foreground mb-1">{t[language].gregorianDate}</div>
                <div className="text-foreground">{formatGregorianDate(new Date(selectedDate))}</div>
                <div className="text-sm text-muted-foreground mt-2 mb-1">{t[language].hijriDate}</div>
                <div className="text-foreground">{formatHijriDate(new Date(selectedDate))}</div>
              </div>
            )}

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  {t[language].eventTitle} *
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary text-foreground transition-all"
                  placeholder={t[language].eventTitle}
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  {t[language].time} ({t[language].optional})
                </label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary text-foreground transition-all"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  {t[language].type}
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as any)}
                  className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary text-foreground transition-all"
                >
                  <option value="Exam">{t[language].exam}</option>
                  <option value="Meeting">{t[language].meeting}</option>
                  <option value="Deadline">{t[language].deadline}</option>
                  <option value="Other">{t[language].other}</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  {t[language].description} ({t[language].optional})
                </label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary text-foreground resize-none transition-all"
                  rows={3}
                  placeholder={t[language].description}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowEventModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-xl hover:bg-secondary transition-all hover:scale-105 active:scale-95"
                >
                  {t[language].cancel}
                </button>
                <button
                  onClick={editingEvent ? handleEditEvent : handleAddEvent}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  {t[language].save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl text-foreground pr-8">{selectedEvent.title}</h2>
              <button
                onClick={() => setShowEventDetails(false)}
                className="p-2 hover:bg-accent rounded-xl transition-colors"
              >
                <X size={20} className="text-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-4 py-2 rounded-xl text-sm ${getTypeBadgeColor(selectedEvent.type)}`}>
                  {t[language][selectedEvent.type.toLowerCase() as 'exam' | 'meeting' | 'deadline' | 'other']}
                </span>
              </div>

              {/* Date Information */}
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-foreground">
                  <Clock size={18} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t[language].gregorianDate}</div>
                    <div className="font-medium">
                      {formatGregorianDate(new Date(selectedEvent.date))}
                      {selectedEvent.time && ` ${t[language].at} ${selectedEvent.time}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CalendarIcon size={18} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t[language].hijriDate}</div>
                    <div className="font-medium">{formatHijriDate(new Date(selectedEvent.date))}</div>
                  </div>
                </div>
              </div>

              {selectedEvent.description && (
                <div>
                  <h3 className="text-sm text-muted-foreground mb-2">{t[language].description}</h3>
                  <p className="text-foreground bg-accent/50 p-4 rounded-xl">{selectedEvent.description}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-all hover:scale-105 active:scale-95"
                >
                  <Trash2 size={18} />
                  {t[language].delete}
                </button>
                <button
                  onClick={() => openEditModal(selectedEvent)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  <Edit2 size={18} />
                  {t[language].edit}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}