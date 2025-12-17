import { GraduationCap, Users, BookOpen, ChevronRight } from 'lucide-react';

interface MajorsViewProps {
  language: 'en' | 'ar';
  onMajorSelect: (major: string) => void;
}

const majors = [
  {
    id: 'cs',
    nameEn: 'Computer Science',
    nameAr: 'علوم الحاسب',
    descriptionEn: 'Study algorithms, programming, and theoretical foundations of computing',
    descriptionAr: 'دراسة الخوارزميات والبرمجة والأسس النظرية للحوسبة',
    courses: 16,
    students: 450,
    color: 'from-blue-500 to-blue-600',
    icon: <GraduationCap size={28} aria-hidden="true" />,
  },
  {
    id: 'se',
    nameEn: 'Software Engineering',
    nameAr: 'هندسة البرمجيات',
    descriptionEn: 'Learn to design, develop, and maintain large-scale software systems',
    descriptionAr: 'تعلم تصميم وتطوير وصيانة أنظمة البرمجيات الكبيرة',
    courses: 12,
    students: 380,
    color: 'from-purple-500 to-purple-600',
    icon: <GraduationCap size={28} aria-hidden="true" />,
  },
  {
    id: 'cyber',
    nameEn: 'Cybersecurity',
    nameAr: 'الأمن السيبراني',
    descriptionEn: 'Protect systems and networks from digital attacks and threats',
    descriptionAr: 'حماية الأنظمة والشبكات من الهجمات والتهديدات الرقمية',
    courses: 13,
    students: 320,
    color: 'from-red-500 to-red-600',
    icon: <GraduationCap size={28} aria-hidden="true" />,
  },
  {
    id: 'ai',
    nameEn: 'Artificial Intelligence',
    nameAr: 'الذكاء الاصطناعي',
    descriptionEn: 'Explore machine learning, neural networks, and intelligent systems',
    descriptionAr: 'استكشاف تعلم الآلة والشبكات العصبية والأنظمة الذكية',
    courses: 11,
    students: 290,
    color: 'from-green-500 to-green-600',
    icon: <GraduationCap size={28} aria-hidden="true" />,
  },
  {
    id: 'ds',
    nameEn: 'Data Science',
    nameAr: 'علم البيانات',
    descriptionEn: 'Extract insights from data using statistics and machine learning',
    descriptionAr: 'استخراج الرؤى من البيانات باستخدام الإحصاء وتعلم الآلة',
    courses: 10,
    students: 270,
    color: 'from-orange-500 to-orange-600',
    icon: <GraduationCap size={28} aria-hidden="true" />,
  },
  {
    id: 'hci',
    nameEn: 'Human Computer Interaction',
    nameAr: 'تفاعل الإنسان مع الحاسب',
    descriptionEn: 'Design intuitive and user-friendly interfaces and experiences',
    descriptionAr: 'تصميم واجهات وتجارب سهلة الاستخدام',
    courses: 10,
    students: 220,
    color: 'from-pink-500 to-pink-600',
    icon: <GraduationCap size={28} aria-hidden="true" />,
  },
];

export function MajorsView({ language, onMajorSelect }: MajorsViewProps) {
  const t = {
    en: {
      title: 'Academic Majors',
      subtitle: 'Explore different specializations and their courses',
      courses: 'Courses',
      students: 'Students',
      viewCourses: 'View Courses',
    },
    ar: {
      title: 'التخصصات الأكاديمية',
      subtitle: 'استكشف التخصصات المختلفة ومقرراتها',
      courses: 'مقررات',
      students: 'طلاب',
      viewCourses: 'عرض المقررات',
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 md:px-8 py-6">
        <h1 className="text-3xl md:text-4xl text-foreground mb-2">{t[language].title}</h1>
        <p className="text-muted-foreground">{t[language].subtitle}</p>
      </div>

      {/* Majors Grid */}
      <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {majors.map((major) => (
            <button
              key={major.id}
              onClick={() => onMajorSelect(major.id)}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all group text-left hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-16 h-16 bg-gradient-to-br ${major.color} rounded-2xl flex items-center justify-center text-white text-2xl`}>
                  {major.icon}
                </div>
                <ChevronRight className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-2 transition-all" size={24} aria-hidden="true" />
              </div>
              <h2 className="text-2xl text-foreground mb-2">
                {language === 'en' ? major.nameEn : major.nameAr}
              </h2>
              <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{language === 'en' ? major.descriptionEn : major.descriptionAr}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} className="text-muted-foreground" aria-hidden="true" />
                  <span className="text-foreground">{major.courses}</span>
                  <span className="text-muted-foreground text-sm">{t[language].courses}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-muted-foreground" aria-hidden="true" />
                  <span className="text-foreground">{major.students}</span>
                  <span className="text-muted-foreground text-sm">{t[language].students}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}