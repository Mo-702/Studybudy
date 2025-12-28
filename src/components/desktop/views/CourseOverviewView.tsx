import { BookOpen, Target, Calendar, User, Mail, Phone, MapPin, Check, Trophy, Medal, Award, TrendingUp, TrendingDown } from 'lucide-react';
import { Course } from '../MainLayout';
import { useState } from 'react';

interface CourseOverviewViewProps {
  language: 'en' | 'ar';
  course: Course | null;
}

export function CourseOverviewView({ language, course }: CourseOverviewViewProps) {
  const [leaderboardFilter, setLeaderboardFilter] = useState<'overall' | 'interaction' | 'assignment' | 'exam'>('overall');

  if (!course) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground text-center">
          {language === 'en' ? 'No course selected' : 'لم يتم اختيار مادة'}
        </p>
      </div>
    );
  }

  const t = {
    en: {
      overview: 'Course Overview',
      description: 'Description',
      objectives: 'Learning Objectives',
      schedule: 'Weekly Schedule',
      instructor: 'Instructor Information',
      contactInfo: 'Contact Information',
      officeHours: 'Office Hours',
      office: 'Office Location',
      week: 'Week',
      leaderboard: 'Leaderboard',
      rank: 'Rank',
      student: 'Student',
      points: 'Points',
      overallPoints: 'Overall Points',
      interactionPoints: 'Interaction Points',
      assignmentPoints: 'Assignment Points',
      examPoints: 'Exam Points',
    },
    ar: {
      overview: 'نظرة عامة على المادة',
      description: 'الوصف',
      objectives: 'أهداف التعلم',
      schedule: 'الجدول الأسبوعي',
      instructor: 'معلومات المدرس',
      contactInfo: 'معلومات التواصل',
      officeHours: 'ساعات المكتب',
      office: 'موقع المكتب',
      week: 'الأسبوع',
      leaderboard: 'لوحة المتصدرين',
      rank: 'الترتيب',
      student: 'الطالب',
      points: 'النقاط',
      overallPoints: 'النقاط الإجمالية',
      interactionPoints: 'نقاط التفاعل',
      assignmentPoints: 'نقاط الواجبات',
      examPoints: 'نقاط الاختبارات',
    },
  };

  // Course-specific leaderboard data
  const leaderboardData = [
    {
      id: 1,
      name: language === 'en' ? 'Ahmed Al-Mansouri' : 'أحمد المنصوري',
      initials: 'AM',
      overallPoints: 2850,
      interactionPoints: 950,
      assignmentPoints: 1200,
      examPoints: 700,
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      id: 2,
      name: language === 'en' ? 'Fatima Al-Rashid' : 'فاطمة الراشد',
      initials: 'FR',
      overallPoints: 2720,
      interactionPoints: 880,
      assignmentPoints: 1150,
      examPoints: 690,
      color: 'from-gray-300 to-gray-500',
    },
    {
      id: 3,
      name: language === 'en' ? 'Yousef Hakeem' : 'يوسف حكيم',
      initials: 'YH',
      overallPoints: 2680,
      interactionPoints: 920,
      assignmentPoints: 1100,
      examPoints: 660,
      color: 'from-orange-400 to-orange-600',
    },
    {
      id: 4,
      name: language === 'en' ? 'Sarah Al-Otaibi' : 'سارة العتيبي',
      initials: 'SO',
      overallPoints: 2550,
      interactionPoints: 850,
      assignmentPoints: 1050,
      examPoints: 650,
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 5,
      name: language === 'en' ? 'Mohammed Al-Zahrani' : 'محمد الزهراني',
      initials: 'MZ',
      overallPoints: 2480,
      interactionPoints: 820,
      assignmentPoints: 1000,
      examPoints: 660,
      color: 'from-purple-400 to-purple-600',
    },
    {
      id: 6,
      name: language === 'en' ? 'Nora Al-Dosari' : 'نورة الدوسري',
      initials: 'ND',
      overallPoints: 2420,
      interactionPoints: 800,
      assignmentPoints: 980,
      examPoints: 640,
      color: 'from-green-400 to-green-600',
    },
    {
      id: 7,
      name: language === 'en' ? 'Omar Al-Ghamdi' : 'عمر الغامدي',
      initials: 'OG',
      overallPoints: 2380,
      interactionPoints: 790,
      assignmentPoints: 950,
      examPoints: 640,
      color: 'from-pink-400 to-pink-600',
    },
    {
      id: 8,
      name: language === 'en' ? 'Layla Al-Harbi' : 'ليلى الحربي',
      initials: 'LH',
      overallPoints: 2310,
      interactionPoints: 770,
      assignmentPoints: 920,
      examPoints: 620,
      color: 'from-indigo-400 to-indigo-600',
    },
    {
      id: 9,
      name: language === 'en' ? 'Khalid Al-Mutairi' : 'خالد المطيري',
      initials: 'KM',
      overallPoints: 2250,
      interactionPoints: 750,
      assignmentPoints: 900,
      examPoints: 600,
      color: 'from-red-400 to-red-600',
    },
    {
      id: 10,
      name: language === 'en' ? 'Aisha Al-Qahtani' : 'عائشة القحطاني',
      initials: 'AQ',
      overallPoints: 2180,
      interactionPoints: 730,
      assignmentPoints: 850,
      examPoints: 600,
      color: 'from-teal-400 to-teal-600',
    },
  ];

  // Sort leaderboard based on selected filter
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => {
    switch (leaderboardFilter) {
      case 'interaction':
        return b.interactionPoints - a.interactionPoints;
      case 'assignment':
        return b.assignmentPoints - a.assignmentPoints;
      case 'exam':
        return b.examPoints - a.examPoints;
      default:
        return b.overallPoints - a.overallPoints;
    }
  });

  // Get points based on filter
  const getPoints = (student: typeof leaderboardData[0]) => {
    switch (leaderboardFilter) {
      case 'interaction':
        return student.interactionPoints;
      case 'assignment':
        return student.assignmentPoints;
      case 'exam':
        return student.examPoints;
      default:
        return student.overallPoints;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 w-full">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 text-white w-full">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
            <BookOpen size={24} className="md:hidden" />
            <BookOpen size={28} className="hidden md:block lg:hidden" />
            <BookOpen size={32} className="hidden lg:block" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg md:text-xl lg:text-2xl text-white mb-1 md:mb-2 break-words">
              {language === 'en' ? course.nameEn : course.nameAr}
            </h2>
            <p className="text-white/80 text-sm md:text-base">{course.code}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-card border border-border rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-6 shadow-sm w-full">
        <h3 className="text-lg md:text-xl text-foreground mb-3 md:mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-blue-500 md:hidden flex-shrink-0" />
          <BookOpen size={24} className="text-blue-500 hidden md:block flex-shrink-0" />
          <span>{t[language].description}</span>
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          {language === 'en'
            ? 'This course provides a comprehensive introduction to fundamental concepts and practical applications in the field. Students will develop critical thinking skills and hands-on experience through lectures, labs, and projects.'
            : 'توفر هذه المادة مقدمة شاملة للمفاهيم الأساسية والتطبيقات العملية في المجال. سيطور الطلاب مهارات التفكير النقدي والخبرة العملية من خلال المحاضرات والمختبرات والمشاريع.'}
        </p>
      </div>

      {/* Learning Objectives */}
      <div className="bg-card border border-border rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-6 shadow-sm w-full">
        <h3 className="text-lg md:text-xl text-foreground mb-3 md:mb-4 flex items-center gap-2">
          <Target size={20} className="text-green-500 md:hidden flex-shrink-0" />
          <Target size={24} className="text-green-500 hidden md:block flex-shrink-0" />
          <span>{t[language].objectives}</span>
        </h3>
        <ul className="space-y-3">
          {[
            language === 'en' ? 'Master core concepts and principles' : 'إتقان المفاهيم والمبادئ الأساسية',
            language === 'en' ? 'Develop practical problem-solving skills' : 'تطوير مهارات حل المشكلات العملية',
            language === 'en' ? 'Apply knowledge to real-world scenarios' : 'تطبيق المعرفة على سيناريوهات العالم الحقيقي',
            language === 'en' ? 'Collaborate effectively in team projects' : 'التعاون بفعالية في المشاريع الجماعية',
          ].map((objective, index) => (
            <li key={index} className="flex items-start gap-2 md:gap-3 text-muted-foreground text-sm md:text-base">
              <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={12} className="text-green-600 dark:text-green-400 md:hidden" />
                <Check size={14} className="text-green-600 dark:text-green-400 hidden md:block" />
              </div>
              <span className="flex-1">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-card border border-border rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-6 shadow-sm w-full">
        <h3 className="text-lg md:text-xl text-foreground mb-3 md:mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-purple-500 md:hidden flex-shrink-0" />
          <Calendar size={24} className="text-purple-500 hidden md:block flex-shrink-0" />
          <span>{t[language].schedule}</span>
        </h3>
        <div className="space-y-3">
          {[
            { week: 1, topic: language === 'en' ? 'Introduction and Overview' : 'مقدمة ونظرة عامة' },
            { week: 2, topic: language === 'en' ? 'Fundamental Concepts' : 'المفاهيم الأساسية' },
            { week: 3, topic: language === 'en' ? 'Advanced Topics Part 1' : 'موضوعات متقدمة - الجزء 1' },
            { week: 4, topic: language === 'en' ? 'Advanced Topics Part 2' : 'موضوعات متقدمة - الجزء 2' },
          ].map((item) => (
            <div key={item.week} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-accent rounded-xl border border-border">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 dark:text-purple-400 text-sm md:text-base">{item.week}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground text-sm md:text-base break-words">{item.topic}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructor Information */}
      <div className="bg-card border border-border rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-6 shadow-sm w-full">
        <h3 className="text-lg md:text-xl text-foreground mb-3 md:mb-4 flex items-center gap-2">
          <User size={20} className="text-blue-500 md:hidden flex-shrink-0" />
          <User size={24} className="text-blue-500 hidden md:block flex-shrink-0" />
          <span>{t[language].instructor}</span>
        </h3>
        <div className="flex items-start gap-3 md:gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg md:text-xl lg:text-2xl flex-shrink-0">
            SC
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base md:text-lg text-foreground mb-2 md:mb-3">{course.instructor || 'Dr. Sarah Chen'}</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Mail size={14} className="text-blue-500 flex-shrink-0 md:hidden" />
                <Mail size={16} className="text-blue-500 flex-shrink-0 hidden md:block" />
                <span className="truncate">sarah.chen@university.edu</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Phone size={14} className="text-green-500 flex-shrink-0 md:hidden" />
                <Phone size={16} className="text-green-500 flex-shrink-0 hidden md:block" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <MapPin size={14} className="text-red-500 flex-shrink-0 md:hidden" />
                <MapPin size={16} className="text-red-500 flex-shrink-0 hidden md:block" />
                <span>Building A, Room 305</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Calendar size={14} className="text-purple-500 flex-shrink-0 md:hidden" />
                <Calendar size={16} className="text-purple-500 flex-shrink-0 hidden md:block" />
                <span className="break-words">{language === 'en' ? 'Mon & Wed, 2:00 PM - 4:00 PM' : 'الإثنين والأربعاء، 2:00 م - 4:00 م'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-card border border-border rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-6 shadow-sm w-full" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <h3 className="text-lg md:text-xl text-foreground mb-3 md:mb-4 flex items-center gap-2">
          <Trophy size={20} className="text-yellow-500 md:hidden flex-shrink-0" />
          <Trophy size={24} className="text-yellow-500 hidden md:block flex-shrink-0" />
          <span>{t[language].leaderboard}</span>
        </h3>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
          <button
            onClick={() => setLeaderboardFilter('overall')}
            className={`px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
              leaderboardFilter === 'overall'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-accent text-foreground hover:bg-accent/80'
            }`}
          >
            {t[language].overallPoints}
          </button>
          <button
            onClick={() => setLeaderboardFilter('interaction')}
            className={`px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
              leaderboardFilter === 'interaction'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-accent text-foreground hover:bg-accent/80'
            }`}
          >
            {t[language].interactionPoints}
          </button>
          <button
            onClick={() => setLeaderboardFilter('assignment')}
            className={`px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
              leaderboardFilter === 'assignment'
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-accent text-foreground hover:bg-accent/80'
            }`}
          >
            {t[language].assignmentPoints}
          </button>
          <button
            onClick={() => setLeaderboardFilter('exam')}
            className={`px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
              leaderboardFilter === 'exam'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-accent text-foreground hover:bg-accent/80'
            }`}
          >
            {t[language].examPoints}
          </button>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2 md:space-y-3">
          {sortedLeaderboard.map((student, index) => {
            const rank = index + 1;
            const isTop3 = rank <= 3;
            const isCurrentUser = student.name.includes(language === 'en' ? 'Yousef Hakeem' : 'يوسف حكيم');
            
            // Calculate points gap to next rank (for current user gamification)
            let pointsGap = 0;
            let nextRank = 0;
            if (isCurrentUser && rank > 1) {
              const nextStudent = sortedLeaderboard[index - 1];
              pointsGap = getPoints(nextStudent) - getPoints(student);
              nextRank = rank - 1;
            }

            // Determine card background gradient for top 3
            let cardBackground = '';
            let cardBorder = '';
            if (rank === 1) {
              // Gold - Subtle elegant gold gradient
              cardBackground = 'bg-gradient-to-br from-yellow-50/90 via-amber-50/70 to-yellow-100/80 dark:from-yellow-900/25 dark:via-amber-900/15 dark:to-yellow-800/20';
              cardBorder = 'border-yellow-400/40 dark:border-yellow-600/30';
            } else if (rank === 2) {
              // Silver - Subtle elegant silver gradient
              cardBackground = 'bg-gradient-to-br from-gray-100/80 via-slate-50/60 to-gray-100/70 dark:from-gray-700/25 dark:via-slate-800/15 dark:to-gray-700/20';
              cardBorder = 'border-gray-400/40 dark:border-gray-500/30';
            } else if (rank === 3) {
              // Bronze - Subtle warm bronze gradient
              cardBackground = 'bg-gradient-to-br from-orange-50/90 via-amber-50/60 to-orange-100/70 dark:from-orange-900/25 dark:via-amber-900/15 dark:to-orange-800/20';
              cardBorder = 'border-orange-400/40 dark:border-orange-600/30';
            } else if (isCurrentUser) {
              cardBackground = 'bg-blue-50/80 dark:bg-blue-900/20';
              cardBorder = 'border-blue-300/50 dark:border-blue-700/40';
            } else {
              cardBackground = 'bg-accent/50';
              cardBorder = 'border-border/50';
            }
            
            return (
              <div
                key={student.id}
                className={`relative flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border transition-all hover:shadow-lg ${cardBackground} ${cardBorder} ${
                  isTop3 ? 'shadow-sm' : ''
                }`}
              >
                {/* Subtle shimmer effect for top 3 */}
                {isTop3 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 rounded-2xl pointer-events-none opacity-30" />
                )}

                {/* Rank Badge */}
                <div className={`relative flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-xl flex-shrink-0 shadow-sm ${
                  rank === 1
                    ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 shadow-yellow-200 dark:shadow-yellow-900/30'
                    : rank === 2
                    ? 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-gray-200 dark:shadow-gray-700/30'
                    : rank === 3
                    ? 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-orange-200 dark:shadow-orange-900/30'
                    : 'bg-muted/80'
                }`}>
                  {rank <= 3 ? (
                    rank === 1 ? (
                      <Trophy size={16} className="text-white md:hidden drop-shadow-sm" aria-hidden="true" />
                    ) : rank === 2 ? (
                      <Medal size={16} className="text-white md:hidden drop-shadow-sm" aria-hidden="true" />
                    ) : (
                      <Award size={16} className="text-white md:hidden drop-shadow-sm" aria-hidden="true" />
                    )
                  ) : null}
                  {rank <= 3 ? (
                    rank === 1 ? (
                      <Trophy size={20} className="text-white hidden md:block drop-shadow-sm" aria-hidden="true" />
                    ) : rank === 2 ? (
                      <Medal size={20} className="text-white hidden md:block drop-shadow-sm" aria-hidden="true" />
                    ) : (
                      <Award size={20} className="text-white hidden md:block drop-shadow-sm" aria-hidden="true" />
                    )
                  ) : (
                    <span className="text-xs md:text-sm text-muted-foreground font-medium">
                      {rank}
                    </span>
                  )}
                </div>

                {/* Student Avatar */}
                <div className={`w-11 h-11 md:w-13 md:h-13 rounded-full bg-gradient-to-br ${student.color} flex items-center justify-center text-white text-xs md:text-sm font-medium flex-shrink-0 shadow-md`}>
                  {student.initials}
                </div>

                {/* Student Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`text-sm md:text-base break-words font-medium ${
                      isTop3 ? 'text-foreground' : 'text-foreground'
                    }`} style={{ fontFamily: language === 'ar' ? 'Tajawal, system-ui, sans-serif' : 'system-ui, -apple-system, sans-serif' }}>
                      {student.name}
                    </p>
                    {isCurrentUser && (
                      <span className={`text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium ${language === 'ar' ? 'mr-1' : 'ml-1'}`}>
                        {language === 'en' ? 'You' : 'أنت'}
                      </span>
                    )}
                    {/* Trend indicator for current user */}
                    {isCurrentUser && rank === 3 && (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400" title={language === 'en' ? 'Up from last week' : 'تحسن من الأسبوع الماضي'}>
                        <TrendingUp size={14} className="md:hidden" aria-hidden="true" />
                        <TrendingUp size={16} className="hidden md:block" aria-hidden="true" />
                        <span className="text-xs hidden md:inline" style={{ fontFamily: language === 'ar' ? 'Tajawal, system-ui, sans-serif' : 'system-ui, -apple-system, sans-serif' }}>
                          {language === 'en' ? '+1' : '+٢'}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground" style={{ fontFamily: language === 'ar' ? 'Tajawal, system-ui, sans-serif' : 'system-ui, -apple-system, sans-serif' }}>
                    {t[language].rank} #{rank}
                  </p>
                  {/* Motivational text for current user */}
                  {isCurrentUser && pointsGap > 0 && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium" style={{ fontFamily: language === 'ar' ? 'Tajawal, system-ui, sans-serif' : 'system-ui, -apple-system, sans-serif' }}>
                      {language === 'en' 
                        ? `Only ${pointsGap} points away from Rank #${nextRank}` 
                        : `${pointsGap} نقطة فقط بعيداً عن الترتيب #${nextRank}`}
                    </p>
                  )}
                </div>

                {/* Points */}
                <div className={`flex-shrink-0 ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                  <p className={`text-lg md:text-xl font-semibold ${
                    isTop3 ? 'text-foreground' : 'text-foreground'
                  }`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {getPoints(student).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: language === 'ar' ? 'Tajawal, system-ui, sans-serif' : 'system-ui, -apple-system, sans-serif' }}>
                    {t[language].points}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
