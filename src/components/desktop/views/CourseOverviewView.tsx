import { BookOpen, Target, Calendar, User, Mail, Phone, MapPin, Check } from 'lucide-react';
import { Course } from '../MainLayout';

interface CourseOverviewViewProps {
  language: 'en' | 'ar';
  course: Course | null;
}

export function CourseOverviewView({ language, course }: CourseOverviewViewProps) {
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
    },
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
    </div>
  );
}