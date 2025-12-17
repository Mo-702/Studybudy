import { User, Mail, Phone, GraduationCap, Award, BookOpen, TrendingUp, Settings, Globe, Bell, Lock, Edit2, Check, X, Pencil } from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'sonner@2.0.3';
import { ChangePasswordModal } from '../ChangePasswordModal';

interface ProfileViewProps {
  language: 'en' | 'ar';
  onLanguageChange: (lang: 'en' | 'ar') => void;
}

const majors = {
  en: [
    'Computer Science',
    'Software Engineering',
    'Cybersecurity',
    'Artificial Intelligence',
    'Data Science',
    'Human Computer Interaction',
  ],
  ar: [
    'علوم الحاسب',
    'هندسة البرمجيات',
    'الأمن السيبراني',
    'الذكاء الاصطناعي',
    'علم البيانات',
    'تفاعل الإنسان مع الحاسب',
  ],
};

export function ProfileView({ language, onLanguageChange }: ProfileViewProps) {
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [isEditingMajor, setIsEditingMajor] = useState(false);
  const [currentMajor, setCurrentMajor] = useState(
    language === 'en' ? 'Human Computer Interaction' : 'تفاعل الإنسان مع الحاسب'
  );
  const [tempMajor, setTempMajor] = useState(currentMajor);
  const [isEditingGPA, setIsEditingGPA] = useState(false);
  const [currentGPA, setCurrentGPA] = useState('3.85');
  const [tempGPA, setTempGPA] = useState(currentGPA);
  const [gpaError, setGpaError] = useState('');
  const [isEditingLevel, setIsEditingLevel] = useState(false);
  const [currentLevel, setCurrentLevel] = useState('5');
  const [tempLevel, setTempLevel] = useState(currentLevel);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('s44411454@uqu.edu.sa');
  const [tempEmail, setTempEmail] = useState(currentEmail);
  const [emailError, setEmailError] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [currentPhone, setCurrentPhone] = useState('+966 590700541');
  const [tempPhone, setTempPhone] = useState(currentPhone);
  const [phoneError, setPhoneError] = useState('');
  const gpaInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const handleEmailNotificationsToggle = () => {
    const newState = !emailNotificationsEnabled;
    setEmailNotificationsEnabled(newState);
    
    toast.success(
      language === 'en'
        ? newState
          ? 'Email notifications enabled'
          : 'Email notifications disabled'
        : newState
          ? 'تم تفعيل إشعارات البريد'
          : 'تم تعطيل إشعارات البريد',
      {
        duration: 2000,
      }
    );
  };

  const handlePushNotificationsToggle = () => {
    const newState = !pushNotificationsEnabled;
    setPushNotificationsEnabled(newState);
    
    toast.success(
      language === 'en'
        ? newState
          ? 'Push notifications enabled'
          : 'Push notifications disabled'
        : newState
          ? 'تم تفعيل الإشعارات الفورية'
          : 'تم تعطيل الإشعارات الفورية',
      {
        duration: 2000,
      }
    );
  };

  const handleEditMajor = () => {
    setIsEditingMajor(true);
    setTempMajor(currentMajor);
  };

  const handleSaveMajor = () => {
    if (!tempMajor || tempMajor.trim() === '') {
      toast.error(
        language === 'en'
          ? 'Major cannot be empty'
          : 'التخصص لا يمكن أن يكون فارغاً',
        {
          duration: 2000,
        }
      );
      return;
    }

    setCurrentMajor(tempMajor);
    setIsEditingMajor(false);
    
    toast.success(
      language === 'en'
        ? 'Major updated successfully'
        : 'تم تحديث التخصص بنجاح',
      {
        duration: 2000,
      }
    );
  };

  const handleCancelMajor = () => {
    setTempMajor(currentMajor);
    setIsEditingMajor(false);
  };

  const handleEditGPA = () => {
    setIsEditingGPA(true);
    setTempGPA(currentGPA);
  };

  const handleSaveGPA = () => {
    if (!tempGPA || tempGPA.trim() === '') {
      toast.error(
        language === 'en'
          ? 'GPA cannot be empty'
          : 'المعدل لا يمكن أن يكون فارغاً',
        {
          duration: 2000,
        }
      );
      return;
    }

    const gpaValue = parseFloat(tempGPA);
    if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
      setGpaError(
        language === 'en'
          ? 'GPA must be between 0.0 and 4.0'
          : 'المعدل يجب أن يكون بين 0.0 و 4.0'
      );
      gpaInputRef.current?.focus();
      return;
    }

    setCurrentGPA(tempGPA);
    setIsEditingGPA(false);
    setGpaError('');
    
    toast.success(
      language === 'en'
        ? 'GPA updated successfully'
        : 'تم تحديث المعدل بنجاح',
      {
        duration: 2000,
      }
    );
  };

  const handleCancelGPA = () => {
    setTempGPA(currentGPA);
    setIsEditingGPA(false);
    setGpaError('');
  };

  const handleEditLevel = () => {
    setIsEditingLevel(true);
    setTempLevel(currentLevel);
  };

  const handleSaveLevel = () => {
    if (!tempLevel || tempLevel.trim() === '') {
      toast.error(
        language === 'en'
          ? 'Level cannot be empty'
          : 'المستوى لا يمكن أن يكون فارغاً',
        {
          duration: 2000,
        }
      );
      return;
    }

    setCurrentLevel(tempLevel);
    setIsEditingLevel(false);
    
    toast.success(
      language === 'en'
        ? 'Level updated successfully'
        : 'تم تحديث المستوى بنجاح',
      {
        duration: 2000,
      }
    );
  };

  const handleCancelLevel = () => {
    setTempLevel(currentLevel);
    setIsEditingLevel(false);
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setTempEmail(currentEmail);
  };

  const handleSaveEmail = () => {
    if (!tempEmail || tempEmail.trim() === '') {
      toast.error(
        language === 'en'
          ? 'Email cannot be empty'
          : 'البريد الإلكتروني لا يمكن أن يكون فارغاً',
        {
          duration: 2000,
        }
      );
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(tempEmail)) {
      setEmailError(
        language === 'en'
          ? 'Invalid email format'
          : 'تنسيق البريد الإلكتروني غير صحيح'
      );
      emailInputRef.current?.focus();
      return;
    }

    setCurrentEmail(tempEmail);
    setIsEditingEmail(false);
    setEmailError('');
    
    toast.success(
      language === 'en'
        ? 'Email updated successfully'
        : 'تم تحديث البريد الإلكتروني بنجاح',
      {
        duration: 2000,
      }
    );
  };

  const handleCancelEmail = () => {
    setTempEmail(currentEmail);
    setIsEditingEmail(false);
    setEmailError('');
  };

  const handleEditPhone = () => {
    setIsEditingPhone(true);
    setTempPhone(currentPhone);
  };

  const handleSavePhone = () => {
    if (!tempPhone || tempPhone.trim() === '') {
      toast.error(
        language === 'en'
          ? 'Phone cannot be empty'
          : 'الهاتف لا يمكن أن يكون فارغاً',
        {
          duration: 2000,
        }
      );
      return;
    }

    const phonePattern = /^\+?[0-9\s\-()]{10,15}$/;
    if (!phonePattern.test(tempPhone)) {
      setPhoneError(
        language === 'en'
          ? 'Invalid phone format'
          : 'تنسيق الهاتف غير صحيح'
      );
      phoneInputRef.current?.focus();
      return;
    }

    setCurrentPhone(tempPhone);
    setIsEditingPhone(false);
    setPhoneError('');
    
    toast.success(
      language === 'en'
        ? 'Phone updated successfully'
        : 'تم تحديث الهاتف بنجاح',
      {
        duration: 2000,
      }
    );
  };

  const handleCancelPhone = () => {
    setTempPhone(currentPhone);
    setIsEditingPhone(false);
    setPhoneError('');
  };

  const t = {
    en: {
      title: 'Profile',
      profileOverview: 'Profile Overview',
      personalInfo: 'Personal Information',
      academicProgress: 'Academic Progress',
      settings: 'Settings',
      fullName: 'Full Name',
      studentId: 'Student ID',
      email: 'Email',
      phone: 'Phone',
      major: 'Major',
      level: 'Current Level',
      gpa: 'GPA',
      completedCredits: 'Completed Credits',
      totalCredits: 'Total Credits',
      enrolledCourses: 'Enrolled Courses',
      achievements: 'Achievements',
      language: 'Language',
      notifications: 'Notifications',
      privacy: 'Privacy',
      changePassword: 'Change Password',
      saveChanges: 'Save Changes',
      english: 'English',
      arabic: 'العربية',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      profileVisibility: 'Profile Visibility',
      public: 'Public',
      private: 'Private',
      semesterProgress: 'Semester Progress',
    },
    ar: {
      title: 'الملف الشخصي',
      profileOverview: 'نظرة عامة',
      personalInfo: 'المعلومات الشخصية',
      academicProgress: 'التقدم الأكاديمي',
      settings: 'الإعدادات',
      fullName: 'الاسم الكامل',
      studentId: 'الرقم الجامعي',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      major: 'التخصص',
      level: 'المستوى الحالي',
      gpa: 'المعدل',
      completedCredits: 'الساعات المكتملة',
      totalCredits: 'إجمالي الساعات',
      enrolledCourses: 'المواد المسجلة',
      achievements: 'الإنجازات',
      language: 'اللغة',
      notifications: 'الإشعارات',
      privacy: 'الخصوصية',
      changePassword: 'تغيير كلمة المرور',
      saveChanges: 'حفظ التغييرات',
      english: 'English',
      arabic: 'العربية',
      emailNotifications: 'إشعارات البريد',
      pushNotifications: 'الإشعارات الفورية',
      profileVisibility: 'ظهور الملف الشخصي',
      public: 'عام',
      private: 'خاص',
      semesterProgress: 'تقدم الفصل الدراسي',
    },
  };

  const achievements = [
    { icon: '🏆', title: language === 'en' ? 'Top Student' : 'طالب متفوق', description: language === 'en' ? 'GPA above 3.8' : 'معدل فوق 3.8' },
    { icon: '📚', title: language === 'en' ? 'Active Learner' : 'متعلم نشط', description: language === 'en' ? 'Completed 10 courses' : 'أكمل 10 مواد' },
    { icon: '⭐', title: language === 'en' ? 'Rising Star' : 'نجم صاعد', description: language === 'en' ? 'Top 10 in major' : 'ضمن أفضل 10 في التخصص' },
    { icon: '🎯', title: language === 'en' ? 'Consistent' : 'منتظم', description: language === 'en' ? 'Perfect attendance' : 'حضور كامل' },
  ];

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8">
          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl md:text-4xl lg:text-5xl flex-shrink-0">
            {language === 'en' ? 'YH' : 'ي ح'}
          </div>
          <div className="text-center sm:text-left min-w-0 flex-1">
            <h1 className="text-2xl md:text-3xl lg:text-5xl mb-2">{language === 'en' ? 'Yousef Hakeem' : 'يوسف حكيم'}</h1>
            <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-2">
              {language === 'en' ? 'Human Computer Interaction' : 'تفاعل الإنسان مع الحاسب'} - {t[language].level} 5
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 text-sm md:text-base text-blue-100">
              <span className="truncate">📧 s44411454@uqu.edu.sa</span>
              <span dir="ltr" className="text-left">📱 +966 590700541</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8 md:space-y-10 lg:space-y-12 w-full">
        {/* Profile Overview Section */}
        <section>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 md:mb-6 lg:mb-8">{t[language].profileOverview}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 md:p-5 lg:p-6 shadow-sm hover:shadow-xl transition-all text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-blue-500/10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <GraduationCap size={24} className="text-blue-600 dark:text-blue-400 md:w-7 md:h-7 lg:w-8 lg:h-8" aria-hidden="true" />
              </div>
              <p className="text-card-foreground text-2xl md:text-2xl lg:text-3xl mb-1 md:mb-2">3.85</p>
              <p className="text-muted-foreground text-xs md:text-sm">{t[language].gpa}</p>
            </div>
            <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 md:p-5 lg:p-6 shadow-sm hover:shadow-xl transition-all text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-green-500/10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <BookOpen size={24} className="text-green-600 dark:text-green-400 md:w-7 md:h-7 lg:w-8 lg:h-8" aria-hidden="true" />
              </div>
              <p className="text-card-foreground text-2xl md:text-2xl lg:text-3xl mb-1 md:mb-2">87</p>
              <p className="text-muted-foreground text-xs md:text-sm">{t[language].completedCredits}</p>
            </div>
            <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 md:p-5 lg:p-6 shadow-sm hover:shadow-xl transition-all text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-purple-500/10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <TrendingUp size={24} className="text-purple-600 dark:text-purple-400 md:w-7 md:h-7 lg:w-8 lg:h-8" aria-hidden="true" />
              </div>
              <p className="text-card-foreground text-2xl md:text-2xl lg:text-3xl mb-1 md:mb-2">6</p>
              <p className="text-muted-foreground text-xs md:text-sm">{t[language].enrolledCourses}</p>
            </div>
            <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 md:p-5 lg:p-6 shadow-sm hover:shadow-xl transition-all text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-orange-500/10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Award size={24} className="text-orange-600 dark:text-orange-400 md:w-7 md:h-7 lg:w-8 lg:h-8" aria-hidden="true" />
              </div>
              <p className="text-card-foreground text-2xl md:text-2xl lg:text-3xl mb-1 md:mb-2">12</p>
              <p className="text-muted-foreground text-xs md:text-sm">{t[language].achievements}</p>
            </div>
          </div>
        </section>

        {/* Academic Progress */}
        <section>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 md:mb-6 lg:mb-8">{t[language].academicProgress}</h2>
          <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 shadow-sm">
            <h3 className="text-xl md:text-xl lg:text-2xl text-card-foreground mb-4 md:mb-5 lg:mb-6">{t[language].semesterProgress}</h3>
            <div className="space-y-4">
              {[
                { course: language === 'en' ? 'Operating Systems' : 'نظم التشغيل', progress: 78 },
                { course: language === 'en' ? 'Database Systems' : 'نظم قواعد البيانات', progress: 85 },
                { course: language === 'en' ? 'Software Engineering' : 'هندسة البرمجيات', progress: 92 },
                { course: language === 'en' ? 'Computer Networks' : 'شبكات الحاسب', progress: 68 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground text-sm md:text-base">{item.course}</span>
                    <span className="text-muted-foreground text-sm md:text-base">{item.progress}%</span>
                  </div>
                  <div className="h-2.5 md:h-3 bg-accent rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Information & Achievements Section */}
        <section>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 md:mb-6 lg:mb-8">{t[language].personalInfo}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-muted-foreground mb-2 text-sm md:text-base">{t[language].fullName}</label>
                  <input
                    type="text"
                    defaultValue={language === 'en' ? 'Yousef Hakeem' : 'يوسف حكيم'}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring transition-all text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-2 text-sm md:text-base">{t[language].email}</label>
                  {!isEditingEmail ? (
                    <div className="relative">
                      <input
                        type="email"
                        value={currentEmail}
                        disabled
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none text-sm md:text-base pe-12"
                      />
                      <button
                        type="button"
                        onClick={handleEditEmail}
                        className="absolute end-3 md:end-4 top-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-105 hover:-translate-y-[calc(50%+1px)] transition-all duration-150 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:-translate-y-1/2"
                        aria-label={language === 'en' ? 'Edit email' : 'تعديل البريد الإلكتروني'}
                      >
                        <Pencil size={18} className="md:w-5 md:h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring transition-all text-sm md:text-base"
                        ref={emailInputRef}
                      />
                      {emailError && <p className="text-red-500 text-xs md:text-sm">{emailError}</p>}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleSaveEmail}
                          className="flex-1 bg-green-500/10 text-green-600 dark:text-green-400 py-2 md:py-2.5 px-3 md:px-4 rounded-xl hover:bg-green-500/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <Check size={16} className="md:w-5 md:h-5" />
                          <span>{language === 'en' ? 'Save' : 'حفظ'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEmail}
                          className="flex-1 bg-red-500/10 text-red-600 dark:text-red-400 py-2 md:py-2.5 px-3 md:px-4 rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <X size={16} className="md:w-5 md:h-5" />
                          <span>{language === 'en' ? 'Cancel' : 'إلغاء'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-muted-foreground mb-2 text-sm md:text-base">{t[language].phone}</label>
                  {!isEditingPhone ? (
                    <div className="relative">
                      <input
                        type="tel"
                        value={currentPhone}
                        disabled
                        dir="ltr"
                        className={`w-full py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none text-sm md:text-base text-left ${
                          language === 'ar' 
                            ? 'ps-12 pe-3 md:ps-16 md:pe-4' 
                            : 'ps-3 pe-12 md:ps-4 md:pe-16'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleEditPhone}
                        className={`absolute top-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-105 hover:-translate-y-[calc(50%+1px)] transition-all duration-150 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:-translate-y-1/2 ${
                          language === 'ar' ? 'start-3 md:start-4' : 'end-3 md:end-4'
                        }`}
                        aria-label={language === 'en' ? 'Edit phone' : 'تعديل الهاتف'}
                      >
                        <Pencil size={18} className="md:w-5 md:h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="tel"
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        dir="ltr"
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring transition-all text-sm md:text-base text-left"
                        ref={phoneInputRef}
                      />
                      {phoneError && <p className="text-red-500 text-xs md:text-sm">{phoneError}</p>}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleSavePhone}
                          className="flex-1 bg-green-500/10 text-green-600 dark:text-green-400 py-2 md:py-2.5 px-3 md:px-4 rounded-xl hover:bg-green-500/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <Check size={16} className="md:w-5 md:h-5" />
                          <span>{language === 'en' ? 'Save' : 'حفظ'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelPhone}
                          className="flex-1 bg-red-500/10 text-red-600 dark:text-red-400 py-2 md:py-2.5 px-3 md:px-4 rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <X size={16} className="md:w-5 md:h-5" />
                          <span>{language === 'en' ? 'Cancel' : 'إلغاء'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-muted-foreground mb-2 text-sm md:text-base">{t[language].major}</label>
                  {!isEditingMajor ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={currentMajor}
                        disabled
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none text-sm md:text-base pe-12"
                      />
                      <button
                        type="button"
                        onClick={handleEditMajor}
                        className="absolute end-3 md:end-4 top-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-105 hover:-translate-y-[calc(50%+1px)] transition-all duration-150 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:-translate-y-1/2"
                        aria-label={language === 'en' ? 'Edit major' : 'تعديل التخصص'}
                      >
                        <Pencil size={18} className="md:w-5 md:h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <select
                        value={tempMajor}
                        onChange={(e) => setTempMajor(e.target.value)}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring transition-all text-sm md:text-base"
                      >
                        {majors[language].map((major, index) => (
                          <option key={index} value={major}>
                            {major}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleSaveMajor}
                          className="flex-1 bg-green-500/10 text-green-600 dark:text-green-400 py-2 md:py-2.5 px-3 md:px-4 rounded-xl hover:bg-green-500/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <Check size={16} className="md:w-5 md:h-5" />
                          <span>{language === 'en' ? 'Save' : 'حفظ'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelMajor}
                          className="flex-1 bg-red-500/10 text-red-600 dark:text-red-400 py-2 md:py-2.5 px-3 md:px-4 rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <X size={16} className="md:w-5 md:h-5" />
                          <span>{language === 'en' ? 'Cancel' : 'إلغاء'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-muted-foreground mb-2 text-sm md:text-base">{t[language].gpa}</label>
                  {!isEditingGPA ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={currentGPA}
                        disabled
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none text-sm md:text-base pe-12"
                      />
                      <button
                        type="button"
                        onClick={handleEditGPA}
                        className="absolute end-3 md:end-4 top-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-105 hover:-translate-y-[calc(50%+1px)] transition-all duration-150 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:-translate-y-1/2"
                        aria-label={language === 'en' ? 'Edit GPA' : 'تعديل المعدل'}
                      >
                        <Pencil size={18} className="md:w-5 md:h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={tempGPA}
                        onChange={(e) => setTempGPA(e.target.value)}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring transition-all text-sm md:text-base"
                        ref={gpaInputRef}
                      />
                      {gpaError && <p className="text-red-500 text-xs md:text-sm">{gpaError}</p>}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleSaveGPA}
                          className="flex-1 bg-green-500/10 text-green-600 dark:text-green-400 py-2 md:py-2.5 px-3 md:px-4 rounded-xl hover:bg-green-500/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <Check size={16} className="md:w-5 md:h-5" />
                          <span>{language === 'en' ? 'Save' : 'حفظ'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelGPA}
                          className="flex-1 bg-red-500/10 text-red-600 dark:text-red-400 py-2 md:py-2.5 px-3 md:px-4 rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <X size={16} className="md:w-5 md:h-5" />
                          <span>{language === 'en' ? 'Cancel' : 'إلغاء'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-muted-foreground mb-2 text-sm md:text-base">{t[language].level}</label>
                  {!isEditingLevel ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={language === 'en' ? `Level ${currentLevel}` : `المستوى ${currentLevel}`}
                        disabled
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none text-sm md:text-base pe-12"
                      />
                      <button
                        type="button"
                        onClick={handleEditLevel}
                        className="absolute end-3 md:end-4 top-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-105 hover:-translate-y-[calc(50%+1px)] transition-all duration-150 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:-translate-y-1/2"
                        aria-label={language === 'en' ? 'Edit level' : 'تعديل المستوى'}
                      >
                        <Pencil size={18} className="md:w-5 md:h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <select
                        value={tempLevel}
                        onChange={(e) => setTempLevel(e.target.value)}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring transition-all text-sm md:text-base"
                      >
                        {[1, 2, 3, 4, 5].map((level) => (
                          <option key={level} value={level.toString()}>
                            {language === 'en' ? `Level ${level}` : `المستوى ${level}`}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleSaveLevel}
                          className="flex-1 bg-green-500/10 text-green-600 dark:text-green-400 py-2 md:py-2.5 px-3 md:px-4 rounded-xl hover:bg-green-500/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <Check size={16} className="md:w-5 md:h-5" />
                          <span>{language === 'en' ? 'Save' : 'حفظ'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelLevel}
                          className="flex-1 bg-red-500/10 text-red-600 dark:text-red-400 py-2 md:py-2.5 px-3 md:px-4 rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <X size={16} className="md:w-5 md:h-5" />
                          <span>{language === 'en' ? 'Cancel' : 'إلغاء'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 shadow-sm">
              <h3 className="text-xl md:text-xl lg:text-2xl text-card-foreground mb-4 md:mb-5 lg:mb-6">{t[language].achievements}</h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-3 md:p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl lg:rounded-2xl text-center">
                    <div className="text-2xl md:text-3xl mb-2">{achievement.icon}</div>
                    <p className="text-xs md:text-sm text-foreground mb-1">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Settings Section */}
        <section>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 md:mb-6 lg:mb-8">{t[language].settings}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4 md:mb-5 lg:mb-6">
                <Globe size={20} className="text-blue-500 md:w-6 md:h-6" aria-hidden="true" />
                <h3 className="text-xl md:text-xl lg:text-2xl text-card-foreground">{t[language].language}</h3>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-ring text-sm md:text-base ${
                    language === 'en'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-accent-foreground hover:bg-secondary'
                  }`}
                  aria-pressed={language === 'en'}
                >
                  {t[language].english}
                </button>
                <button
                  onClick={() => onLanguageChange('ar')}
                  className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-ring text-sm md:text-base ${
                    language === 'ar'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-accent-foreground hover:bg-secondary'
                  }`}
                  aria-pressed={language === 'ar'}
                >
                  {t[language].arabic}
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4 md:mb-5 lg:mb-6">
                <Bell size={20} className="text-purple-500 md:w-6 md:h-6" aria-hidden="true" />
                <h3 className="text-xl md:text-xl lg:text-2xl text-card-foreground">{t[language].notifications}</h3>
              </div>
              <div className="space-y-4">
                {/* Email Notifications Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-foreground text-sm md:text-base">{t[language].emailNotifications}</span>
                  <button
                    onClick={handleEmailNotificationsToggle}
                    className={`w-12 h-7 rounded-full relative transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring cursor-pointer ${
                      emailNotificationsEnabled ? 'bg-primary' : 'bg-switch-background'
                    }`}
                    role="switch"
                    aria-checked={emailNotificationsEnabled}
                    aria-label={t[language].emailNotifications}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
                        emailNotificationsEnabled ? 'right-1' : 'left-1'
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Push Notifications Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-foreground text-sm md:text-base">{t[language].pushNotifications}</span>
                  <button
                    onClick={handlePushNotificationsToggle}
                    className={`w-12 h-7 rounded-full relative transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring cursor-pointer ${
                      pushNotificationsEnabled ? 'bg-primary' : 'bg-switch-background'
                    }`}
                    role="switch"
                    aria-checked={pushNotificationsEnabled}
                    aria-label={t[language].pushNotifications}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
                        pushNotificationsEnabled ? 'right-1' : 'left-1'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4 md:mb-5 lg:mb-6">
                <Lock size={20} className="text-green-500 md:w-6 md:h-6" aria-hidden="true" />
                <h3 className="text-xl md:text-xl lg:text-2xl text-card-foreground">{t[language].privacy}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-muted-foreground mb-2 text-sm md:text-base">{t[language].profileVisibility}</label>
                  <select className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring transition-all text-sm md:text-base">
                    <option>{t[language].public}</option>
                    <option>{t[language].private}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4 md:mb-5 lg:mb-6">
                <Lock size={20} className="text-red-500 md:w-6 md:h-6" aria-hidden="true" />
                <h3 className="text-xl md:text-xl lg:text-2xl text-card-foreground">{t[language].changePassword}</h3>
              </div>
              <button
                className="w-full bg-red-500/10 text-red-600 dark:text-red-400 py-2.5 md:py-3 rounded-xl hover:bg-red-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
                onClick={() => setShowChangePasswordModal(true)}
              >
                {t[language].changePassword}
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          language={language}
          onClose={() => setShowChangePasswordModal(false)}
          onSuccess={() => {
            toast.success(
              language === 'en'
                ? 'Password changed successfully'
                : 'تم تغيير كلمة المرور بنجاح',
              {
                duration: 2000,
              }
            );
          }}
        />
      )}
    </div>
  );
}