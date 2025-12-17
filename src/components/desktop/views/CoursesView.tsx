import { BookOpen, Clock, Award, Search, Filter, ArrowLeft, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Course } from '../MainLayout';
import { toast } from 'sonner@2.0.3';

interface CoursesViewProps {
  language: 'en' | 'ar';
  selectedMajor: string | null;
  onCourseSelect: (course: Course) => void;
  onBack?: () => void;
}

const allCourses: Course[] = [
  // Computer Science
  { id: 'cs1', code: 'CS101', nameEn: 'Programming I', nameAr: 'برمجة 1', credits: 3, level: 'Level 2', major: 'cs', instructor: 'Dr. Sarah Chen' },
  { id: 'cs2', code: 'CS102', nameEn: 'Programming II', nameAr: 'برمجة 2', credits: 3, level: 'Level 3', major: 'cs', instructor: 'Dr. Michael Torres' },
  { id: 'cs3', code: 'CS201', nameEn: 'Data Structures', nameAr: 'هياكل البيانات', credits: 3, level: 'Level 3', major: 'cs', instructor: 'Prof. Emma Wilson' },
  { id: 'cs4', code: 'CS301', nameEn: 'Algorithm Design & Analysis', nameAr: 'تصميم وتحليل الخوارزميات', credits: 3, level: 'Level 4', major: 'cs', instructor: 'Dr. James Anderson' },
  { id: 'cs5', code: 'CS302', nameEn: 'Operating Systems', nameAr: 'نظم التشغيل', credits: 3, level: 'Level 5', major: 'cs', instructor: 'Prof. Lisa Martinez' },
  { id: 'cs6', code: 'CS303', nameEn: 'Computer Networks', nameAr: 'شبكات الحاسب', credits: 3, level: 'Level 5', major: 'cs', instructor: 'Dr. David Lee' },
  { id: 'cs7', code: 'CS304', nameEn: 'Database Systems', nameAr: 'نظم قواعد البيانات', credits: 3, level: 'Level 5', major: 'cs', instructor: 'Prof. Anna White' },
  { id: 'cs8', code: 'CS401', nameEn: 'Software Engineering', nameAr: 'هندسة البرمجيات', credits: 3, level: 'Level 6', major: 'cs', instructor: 'Dr. Robert Taylor' },
  { id: 'cs9', code: 'CS501', nameEn: 'Artificial Intelligence', nameAr: 'الذكاء الاصطناعي', credits: 3, level: 'Level 7', major: 'cs', instructor: 'Prof. Jennifer Brown' },
  { id: 'cs10', code: 'CS502', nameEn: 'Information Security', nameAr: 'أمن المعلومات', credits: 3, level: 'Level 7', major: 'cs', instructor: 'Dr. William Johnson' },
  
  // Software Engineering
  { id: 'se1', code: 'SE101', nameEn: 'Programming I', nameAr: 'برمجة 1', credits: 3, level: 'Level 2', major: 'se', instructor: 'Dr. Sarah Chen' },
  { id: 'se2', code: 'SE201', nameEn: 'Requirements Engineering', nameAr: 'هندسة المتطلبات', credits: 3, level: 'Level 4', major: 'se', instructor: 'Dr. Thomas Wilson' },
  { id: 'se3', code: 'SE301', nameEn: 'Software Architecture', nameAr: 'معمارية البرمجيات', credits: 3, level: 'Level 5', major: 'se', instructor: 'Prof. Karen Davis' },
  { id: 'se4', code: 'SE302', nameEn: 'Software Testing', nameAr: 'اختبار البرمجيات', credits: 3, level: 'Level 5', major: 'se', instructor: 'Dr. Paul Miller' },
  
  // Cybersecurity
  { id: 'cy1', code: 'CY101', nameEn: 'Programming I', nameAr: 'برمجة 1', credits: 3, level: 'Level 2', major: 'cyber', instructor: 'Dr. Sarah Chen' },
  { id: 'cy2', code: 'CY301', nameEn: 'Cybersecurity Fundamentals', nameAr: 'أساسيات الأمن السيبراني', credits: 3, level: 'Level 5', major: 'cyber', instructor: 'Dr. Kevin Harris' },
  { id: 'cy3', code: 'CY302', nameEn: 'Network Security', nameAr: 'أمن الشبكات', credits: 3, level: 'Level 5', major: 'cyber', instructor: 'Prof. Susan Clark' },
  { id: 'cy4', code: 'CY401', nameEn: 'Cryptography', nameAr: 'التشفير', credits: 3, level: 'Level 6', major: 'cyber', instructor: 'Dr. Mark Lewis' },
  
  // AI
  { id: 'ai1', code: 'AI101', nameEn: 'Python Programming', nameAr: 'برمجة بايثون', credits: 3, level: 'Level 2', major: 'ai', instructor: 'Dr. Nancy Young' },
  { id: 'ai2', code: 'AI301', nameEn: 'Machine Learning', nameAr: 'تعلم الآلة', credits: 3, level: 'Level 6', major: 'ai', instructor: 'Prof. Christopher Moore' },
  { id: 'ai3', code: 'AI401', nameEn: 'Deep Learning', nameAr: 'تعلم عميق', credits: 3, level: 'Level 6', major: 'ai', instructor: 'Dr. Patricia Adams' },
  { id: 'ai4', code: 'AI501', nameEn: 'Natural Language Processing', nameAr: 'معالجة اللغات الطبيعية', credits: 3, level: 'Level 7', major: 'ai', instructor: 'Prof. Daniel Wright' },
  
  // Data Science
  { id: 'ds1', code: 'DS101', nameEn: 'Introduction to Data Science', nameAr: 'مقدمة في علم البيانات', credits: 3, level: 'Level 2', major: 'ds', instructor: 'Dr. James Miller' },
  { id: 'ds2', code: 'DS201', nameEn: 'Statistics for Data Science', nameAr: 'الإحصاء لعلم البيانات', credits: 3, level: 'Level 3', major: 'ds', instructor: 'Prof. Lisa Anderson' },
  { id: 'ds3', code: 'DS301', nameEn: 'Data Mining', nameAr: 'التنقيب عن البيانات', credits: 3, level: 'Level 5', major: 'ds', instructor: 'Dr. Barbara Scott' },
  { id: 'ds4', code: 'DS302', nameEn: 'Big Data Analytics', nameAr: 'تحليلات البيانات الضخمة', credits: 3, level: 'Level 5', major: 'ds', instructor: 'Prof. Richard Turner' },
  { id: 'ds5', code: 'DS401', nameEn: 'Data Visualization', nameAr: 'تصور البيانات', credits: 3, level: 'Level 6', major: 'ds', instructor: 'Dr. Michelle Green' },
  { id: 'ds6', code: 'DS501', nameEn: 'Advanced Machine Learning', nameAr: 'تعلم الآلة المتقدم', credits: 3, level: 'Level 7', major: 'ds', instructor: 'Prof. Steven Baker' },
  
  // Human Computer Interaction
  { id: 'hci1', code: 'HCI101', nameEn: 'Introduction to HCI', nameAr: 'مقدمة في تفاعل الإنسان مع الحاسب', credits: 3, level: 'Level 2', major: 'hci', instructor: 'Dr. Rachel Thompson' },
  { id: 'hci2', code: 'HCI201', nameEn: 'User Interface Design', nameAr: 'تصميم واجهة المستخدم', credits: 3, level: 'Level 3', major: 'hci', instructor: 'Prof. Daniel Kim' },
  { id: 'hci3', code: 'HCI301', nameEn: 'User Experience Design', nameAr: 'تصميم تجربة المستخدم', credits: 3, level: 'Level 5', major: 'hci', instructor: 'Dr. Maria Garcia' },
  { id: 'hci4', code: 'HCI302', nameEn: 'Usability Engineering', nameAr: 'هندسة قابلية الاستخدام', credits: 3, level: 'Level 5', major: 'hci', instructor: 'Prof. Ahmed Hassan' },
  { id: 'hci5', code: 'HCI401', nameEn: 'Interaction Design', nameAr: 'تصميم التفاعل', credits: 3, level: 'Level 6', major: 'hci', instructor: 'Dr. Sarah Williams' },
  { id: 'hci6', code: 'HCI402', nameEn: 'Prototyping & Evaluation', nameAr: 'النماذج الأولية والتقييم', credits: 3, level: 'Level 6', major: 'hci', instructor: 'Prof. John Martinez' },
  { id: 'hci7', code: 'HCI501', nameEn: 'Advanced User Research', nameAr: 'بحث المستخدم المتقدم', credits: 3, level: 'Level 7', major: 'hci', instructor: 'Dr. Emily Rodriguez' },
  { id: 'hci8', code: 'HCI502', nameEn: 'Accessible Design', nameAr: 'التصميم الشامل', credits: 3, level: 'Level 7', major: 'hci', instructor: 'Prof. Michael Lee' },
];

// Initial enrolled courses (HCI courses for Yousef Hakeem)
const initialEnrolledCourses = ['hci2', 'hci3', 'hci5', 'hci6', 'hci7', 'hci8'];

export function CoursesView({ language, selectedMajor, onCourseSelect, onBack }: CoursesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(initialEnrolledCourses);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [courseToAdd, setCourseToAdd] = useState<Course | null>(null);
  
  // Add Course Modal filters
  const [addCourseSearch, setAddCourseSearch] = useState('');
  const [addCourseMajor, setAddCourseMajor] = useState<string>('all');
  const [addCourseLevel, setAddCourseLevel] = useState<string>('all');

  // Determine if we're viewing a specific major (from Majors page) or My Courses
  const isViewingMajor = selectedMajor !== null;

  const t = {
    en: {
      title: isViewingMajor ? 'Major Courses' : 'My Courses',
      subtitle: isViewingMajor ? 'Explore courses in this major' : 'View and manage your enrolled courses',
      search: 'Search courses...',
      allLevels: 'All Levels',
      credits: 'Credits',
      instructor: 'Instructor',
      viewDetails: 'View Details',
      back: 'Back',
      addCourses: 'Add Courses',
      addCourseBtn: '+ Add Course',
      addCourseTitle: 'Add New Course',
      searchCourses: 'Search by name, code, or instructor...',
      major: 'Major',
      allMajors: 'All Majors',
      level: 'Level',
      add: 'Add',
      cancel: 'Cancel',
      close: 'Close',
      confirmTitle: 'Confirm Add Course',
      confirmMessage: 'Are you sure you want to add this course?',
      yesAdd: 'Yes, Add',
      courseAdded: 'Course added successfully!',
      alreadyEnrolled: 'Already enrolled',
      noCourses: 'No courses found',
      noEnrolledCourses: 'No enrolled courses yet',
      computerScience: 'Computer Science',
      softwareEngineering: 'Software Engineering',
      cybersecurity: 'Cybersecurity',
      artificialIntelligence: 'Artificial Intelligence',
      dataScience: 'Data Science',
      hci: 'Human Computer Interaction',
    },
    ar: {
      title: isViewingMajor ? 'موادي التخصص' : 'موادي الدراسية',
      subtitle: isViewingMajor ? 'استكشاف مواد هذا التخصص' : 'عرض وإدارة المواد المسجلة',
      search: 'بحث عن مادة...',
      allLevels: 'جميع المستويات',
      credits: 'ساعات',
      instructor: 'المدرس',
      viewDetails: 'عرض التفاصيل',
      back: 'رجوع',
      addCourses: 'إضافة مواد',
      addCourseBtn: '+ إضافة مادة',
      addCourseTitle: 'إضافة مادة جديدة',
      searchCourses: 'بحث بالاسم أو الرمز أو المدرس...',
      major: 'التخصص',
      allMajors: 'جميع التخصصات',
      level: 'المستوى',
      add: 'إضافة',
      cancel: 'إلغاء',
      close: 'إغلاق',
      confirmTitle: 'تأكيد إضافة المادة',
      confirmMessage: 'هل أنت متأكد من أنك تريد إضافة هذه المادة؟',
      yesAdd: 'نعم، أضف',
      courseAdded: 'تم إضافة المادة بنجاح!',
      alreadyEnrolled: 'مسجل بالفعل',
      noCourses: 'لا توجد مواد',
      noEnrolledCourses: 'لا توجد مواد مسجلة بعد',
      computerScience: 'علوم الحاسب',
      softwareEngineering: 'هندسة البرمجيات',
      cybersecurity: 'الأمن السيبراني',
      artificialIntelligence: 'الذكاء الاصطناعي',
      dataScience: 'علم البيانات',
      hci: 'تفاعل الإنسان مع الحاسب',
    },
  };

  const levels = ['all', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'];
  
  const majorOptions = [
    { value: 'all', label: t[language].allMajors },
    { value: 'cs', label: t[language].computerScience },
    { value: 'se', label: t[language].softwareEngineering },
    { value: 'cyber', label: t[language].cybersecurity },
    { value: 'ai', label: t[language].artificialIntelligence },
    { value: 'ds', label: t[language].dataScience },
    { value: 'hci', label: t[language].hci },
  ];

  // Filter enrolled courses
  const enrolledCourses = allCourses.filter((course) => enrolledCourseIds.includes(course.id));
  
  // When viewing a specific major, show ALL courses for that major (not just enrolled)
  // When viewing "My Courses", show only enrolled courses
  const coursesToDisplay = isViewingMajor 
    ? allCourses.filter((course) => course.major === selectedMajor)
    : enrolledCourses;
  
  const filteredCourses = coursesToDisplay.filter((course) => {
    const matchesSearch =
      !searchQuery ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.nameAr.includes(searchQuery);
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  // Filter available courses for Add Course modal
  const availableCourses = allCourses.filter((course) => {
    const notEnrolled = !enrolledCourseIds.includes(course.id);
    const matchesMajor = addCourseMajor === 'all' || course.major === addCourseMajor;
    const matchesSearch =
      !addCourseSearch ||
      course.code.toLowerCase().includes(addCourseSearch.toLowerCase()) ||
      course.nameEn.toLowerCase().includes(addCourseSearch.toLowerCase()) ||
      course.nameAr.includes(addCourseSearch) ||
      (course.instructor && course.instructor.toLowerCase().includes(addCourseSearch.toLowerCase()));
    const matchesLevel = addCourseLevel === 'all' || course.level === addCourseLevel;
    return notEnrolled && matchesMajor && matchesSearch && matchesLevel;
  });

  const handleAddCourseClick = (course: Course) => {
    setCourseToAdd(course);
    setShowConfirmation(true);
  };

  const handleConfirmAdd = () => {
    if (courseToAdd) {
      setEnrolledCourseIds([...enrolledCourseIds, courseToAdd.id]);
      setShowConfirmation(false);
      setShowAddCourseModal(false);
      setCourseToAdd(null);
      setAddCourseSearch('');
      setAddCourseMajor('all');
      setAddCourseLevel('all');
      toast.success(t[language].courseAdded, { duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 md:px-8 py-6">
        {selectedMajor && onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors group focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
            aria-label={t[language].back}
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span>{t[language].back}</span>
          </button>
        )}
        <h1 className="text-3xl md:text-4xl text-foreground mb-2">{t[language].title}</h1>
        <p className="text-muted-foreground">{t[language].subtitle}</p>
      </div>

      {/* Filters */}
      <div className="bg-card border-b border-border px-4 md:px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t[language].search}
              className="w-full pl-12 pr-4 py-3 bg-input-background text-foreground placeholder:text-muted-foreground rounded-xl border border-border focus:ring-2 focus:ring-ring outline-none transition-colors"
              aria-label={t[language].search}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={20} className="text-muted-foreground" aria-hidden="true" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 bg-input-background text-foreground rounded-xl border border-border focus:ring-2 focus:ring-ring outline-none transition-colors"
              aria-label="Filter by level"
            >
              <option value="all">{t[language].allLevels}</option>
              {levels.slice(1).map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
        <div className="flex gap-6">
          {/* Courses Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredCourses.map((course) => (
                <button
                  key={course.id}
                  className="bg-card rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-xl transition-all group text-left hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring border border-border"
                  onClick={() => onCourseSelect(course)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <BookOpen size={24} aria-hidden="true" />
                    </div>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs md:text-sm">
                      {course.code}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl text-card-foreground mb-2">
                    {language === 'en' ? course.nameEn : course.nameAr}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Award size={16} aria-hidden="true" />
                      <span className="text-xs md:text-sm">{course.credits} {t[language].credits}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={16} aria-hidden="true" />
                      <span className="text-xs md:text-sm">{course.level}</span>
                    </div>
                    {course.instructor && (
                      <p className="text-xs md:text-sm text-muted-foreground">{course.instructor}</p>
                    )}
                  </div>

                  <div className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2.5 md:py-3 rounded-xl group-hover:shadow-lg transition-all text-center text-sm md:text-base">
                    {t[language].viewDetails}
                  </div>
                </button>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <BookOpen size={64} className="text-muted-foreground/30 mx-auto mb-4" aria-hidden="true" />
                <p className="text-muted-foreground text-base md:text-lg">
                  {enrolledCourses.length === 0 ? t[language].noEnrolledCourses : t[language].noCourses}
                </p>
              </div>
            )}
          </div>

          {/* Add Courses Panel */}
          {!isViewingMajor && (
            <div className="hidden lg:block w-80">
              <div className="bg-card rounded-3xl p-6 shadow-sm border border-border sticky top-8">
                <h2 className="text-2xl text-foreground mb-4">{t[language].addCourses}</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  {language === 'en' 
                    ? 'Browse and add new courses to your schedule' 
                    : 'تصفح وإضافة مواد جديدة إلى جدولك'}
                </p>
                <button
                  onClick={() => setShowAddCourseModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Plus size={20} />
                  {t[language].addCourseBtn}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Add Course Button */}
        {!isViewingMajor && (
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setShowAddCourseModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
            >
              <Plus size={24} />
              <span className="font-medium">{t[language].addCourseBtn}</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Course Modal */}
      {!isViewingMajor && showAddCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-8" onClick={() => setShowAddCourseModal(false)}>
          <div className="bg-card rounded-3xl w-full max-w-4xl p-6 md:p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl text-foreground">{t[language].addCourseTitle}</h2>
              <button
                onClick={() => {
                  setShowAddCourseModal(false);
                  setAddCourseSearch('');
                  setAddCourseMajor('all');
                  setAddCourseLevel('all');
                }}
                className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-foreground" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  value={addCourseSearch}
                  onChange={(e) => setAddCourseSearch(e.target.value)}
                  placeholder={t[language].searchCourses}
                  className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-ring outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t[language].major}</label>
                  <select
                    value={addCourseMajor}
                    onChange={(e) => setAddCourseMajor(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-ring outline-none text-foreground"
                  >
                    {majorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t[language].level}</label>
                  <select
                    value={addCourseLevel}
                    onChange={(e) => setAddCourseLevel(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-ring outline-none text-foreground"
                  >
                    <option value="all">{t[language].allLevels}</option>
                    {levels.slice(1).map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Available Courses List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {availableCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-secondary rounded-2xl p-4 flex items-start justify-between gap-4 hover:bg-accent transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium">
                        {course.code}
                      </span>
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg text-xs">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-foreground font-medium mb-1">
                      {language === 'en' ? course.nameEn : course.nameAr}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{course.credits} {t[language].credits}</span>
                      {course.instructor && <span>• {course.instructor}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddCourseClick(course)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                  >
                    {t[language].add}
                  </button>
                </div>
              ))}

              {availableCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen size={48} className="text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    {language === 'en' ? 'No courses available' : 'لا توجد مواد متاحة'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && courseToAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4" onClick={() => setShowConfirmation(false)}>
          <div className="bg-card rounded-3xl w-full max-w-md p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl md:text-3xl text-foreground mb-4">{t[language].confirmTitle}</h2>
            <p className="text-muted-foreground mb-6">{t[language].confirmMessage}</p>

            <div className="bg-secondary rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium">
                  {courseToAdd.code}
                </span>
                <span className="px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg text-xs">
                  {courseToAdd.level}
                </span>
              </div>
              <h3 className="text-foreground font-medium mb-1">
                {language === 'en' ? courseToAdd.nameEn : courseToAdd.nameAr}
              </h3>
              <p className="text-sm text-muted-foreground">
                {courseToAdd.credits} {t[language].credits}
                {courseToAdd.instructor && ` • ${courseToAdd.instructor}`}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-6 py-3 bg-secondary text-foreground rounded-xl hover:bg-accent transition-colors"
              >
                {t[language].cancel}
              </button>
              <button
                onClick={handleConfirmAdd}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {t[language].yesAdd}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}