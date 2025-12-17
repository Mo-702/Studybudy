import { ArrowLeft, Download, Bookmark, Calendar, User, FileText, Clock, Award } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { InteractiveExam } from './InteractiveExam';

interface Material {
  id: string;
  title: string;
  type: 'exam' | 'summary' | 'slide' | 'assignment';
  uploadDate: string;
  uploader: string;
  downloads: number;
  rating: number;
  size: string;
  instructor?: string;
  dueDate?: string;
  duration?: string;
  totalMarks?: number;
  pages?: number;
}

interface MaterialViewerProps {
  material: Material;
  courseName: string;
  language: 'en' | 'ar';
  onBack: () => void;
}

export function MaterialViewer({ material, courseName, language, onBack }: MaterialViewerProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const t = {
    en: {
      back: 'Back',
      download: 'Download',
      bookmark: 'Bookmark',
      bookmarked: 'Bookmarked',
      downloading: 'Downloading...',
      downloaded: 'Downloaded successfully',
      instructor: 'Instructor',
      uploadDate: 'Upload Date',
      fileSize: 'File Size',
      duration: 'Duration',
      totalMarks: 'Total Marks',
      dueDate: 'Due Date',
      pages: 'Pages',
      exam: 'Exam',
      summary: 'Summary',
      slides: 'Slides',
      assignment: 'Assignment',
      examSections: 'Exam Sections',
      multipleChoice: 'Multiple Choice Questions',
      shortAnswer: 'Short Answer Questions',
      trueFalse: 'True/False Questions',
      essay: 'Essay Questions',
      preview: 'Content Preview',
      slidePreview: 'Slide Preview',
      requirements: 'Assignment Requirements',
      submissionFormat: 'Submission Format',
      rubric: 'Grading Rubric',
    },
    ar: {
      back: 'رجوع',
      download: 'تحميل',
      bookmark: 'حفظ',
      bookmarked: 'محفوظ',
      downloading: 'جاري التحميل...',
      downloaded: 'تم التحميل بنجاح',
      instructor: 'المدرس',
      uploadDate: 'تاريخ الرفع',
      fileSize: 'حجم الملف',
      duration: 'المدة',
      totalMarks: 'مجموع الدرجات',
      dueDate: 'موعد التسليم',
      pages: 'الصفحات',
      exam: 'اختبار',
      summary: 'ملخص',
      slides: 'شرائح',
      assignment: 'واجب',
      examSections: 'أقسام الاختبار',
      multipleChoice: 'أسئلة اختيار من متعدد',
      shortAnswer: 'أسئلة إجابة قصيرة',
      trueFalse: 'أسئلة صح وخطأ',
      essay: 'أسئلة مقالية',
      preview: 'معاينة المحتوى',
      slidePreview: 'معاينة الشرائح',
      requirements: 'متطلبات الواجب',
      submissionFormat: 'صيغة التسليم',
      rubric: 'معايير التقييم',
    },
  };

  const getTypeColor = () => {
    switch (material.type) {
      case 'exam':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20';
      case 'summary':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
      case 'slide':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20';
      case 'assignment':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20';
      default:
        return 'bg-gray-500/10 text-muted-foreground border border-border';
    }
  };

  const getTypeName = () => {
    return t[language][material.type];
  };

  const handleDownload = () => {
    setIsDownloading(true);
    toast.success(t[language].downloading, { duration: 1500 });
    
    setTimeout(() => {
      setIsDownloading(false);
      toast.success(t[language].downloaded, { duration: 2000 });
    }, 2000);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      language === 'en'
        ? isBookmarked
          ? 'Removed from bookmarks'
          : 'Added to bookmarks'
        : isBookmarked
          ? 'تمت الإزالة من المحفوظات'
          : 'تمت الإضافة إلى المحفوظات',
      { duration: 2000 }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-8 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors group focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t[language].back}</span>
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-4 py-1.5 rounded-xl text-sm ${getTypeColor()}`}>
                {getTypeName()}
              </span>
            </div>
            <h1 className="text-4xl text-foreground mb-2">{material.title}</h1>
            <p className="text-xl text-muted-foreground">{courseName}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105 ${
                isBookmarked
                  ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20'
                  : 'bg-secondary text-foreground hover:bg-accent border border-border'
              }`}
            >
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
              <span>{isBookmarked ? t[language].bookmarked : t[language].bookmark}</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 hover:scale-105 hover:shadow-lg"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t[language].downloading}</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>{t[language].download}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-6 mt-6 text-muted-foreground">
          {material.instructor && (
            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-500" />
              <span><strong>{t[language].instructor}:</strong> {material.instructor}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-muted-foreground" />
            <span><strong>{t[language].uploadDate}:</strong> {material.uploadDate}</span>
          </div>
          {material.dueDate && (
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-red-500" />
              <span className="text-red-600 dark:text-red-400"><strong>{t[language].dueDate}:</strong> {material.dueDate}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-muted-foreground" />
            <span><strong>{t[language].fileSize}:</strong> {material.size}</span>
          </div>
          {material.duration && (
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-purple-500" />
              <span><strong>{t[language].duration}:</strong> {material.duration}</span>
            </div>
          )}
          {material.totalMarks && (
            <div className="flex items-center gap-2">
              <Award size={18} className="text-orange-500" />
              <span><strong>{t[language].totalMarks}:</strong> {material.totalMarks}</span>
            </div>
          )}
          {material.pages && (
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-muted-foreground" />
              <span><strong>{t[language].pages}:</strong> {material.pages}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-[1400px] mx-auto">
        {material.type === 'exam' && <InteractiveExam material={material} language={language} t={t} />}
        {material.type === 'summary' && <SummaryContent material={material} language={language} t={t} />}
        {material.type === 'slide' && <SlideContent material={material} language={language} t={t} />}
        {material.type === 'assignment' && <AssignmentContent material={material} language={language} t={t} />}
      </div>
    </div>
  );
}



// Summary Content Component
function SummaryContent({ material, language, t }: any) {
  const summaryPages = [
    // Page 1 - Introduction
    {
      title: language === 'en' ? 'Introduction to Human-Computer Interaction' : 'مقدمة في تفاعل الإنسان مع الحاسب',
      content: language === 'en' 
        ? `Human-Computer Interaction (HCI) is a multidisciplinary field focused on the design and use of computer technology, particularly the interfaces between people and computers. HCI combines expertise from computer science, psychology, design, and social sciences to create systems that are both functional and user-friendly.

The primary goal of HCI is to improve the interactions between users and computers by making technology more usable and receptive to user needs. This involves understanding how people interact with technology and designing interfaces that enhance user experience.`
        : `تفاعل الإنسان مع الحاسب (HCI) هو مجال متعدد التخصصات يركز على تصميم واستخدام تكنولوجيا الحاسب، وخاصة الواجهات بين الناس وأجهزة الكمبيوتر. يجمع HCI بين الخبرة من علوم الكمبيوتر وعلم النفس والتصميم والعلوم الاجتماعية لإنشاء أنظمة وظيفية وسهلة الاستخدام.

الهدف الأساسي من HCI هو تحسين التفاعلات بين المستخدمين وأجهزة الكمبيوتر من خلال جعل التكنولوجيا أكثر قابلية للاستخدام واستجابة لاحتياجات المستخدم.`
    },
    // Page 2 - Key Concepts
    {
      title: language === 'en' ? 'Key Concepts in HCI' : 'المفاهيم الأساسية في تفاعل الإنسان مع الحاسب',
      content: language === 'en'
        ? `**Usability**: The extent to which a product can be used by specified users to achieve goals with effectiveness, efficiency, and satisfaction in a specified context of use.

**User Experience (UX)**: Encompasses all aspects of the end-user's interaction with the company, its services, and its products. UX design considers the entire user journey.

**Interaction Design**: The practice of designing interactive digital products, environments, systems, and services with a focus on behavior and user actions.

**Affordances**: Properties of objects that show users the actions they can take. For example, a button affords pushing.

**Feedback**: The system's response to user actions, confirming that an action has been registered and what the result is.`
        : `**قابلية الاستخدام**: المدى الذي يمكن للمنتج أن يستخدمه مستخدمون محددين لتحقيق الأهداف بفعالية وكفاءة ورضا في سياق استخدام محدد.

**تجربة المستخدم (UX)**: تشمل جميع جوانب تفاعل المستخدم النهائي مع الشركة وخدماتها ومنتجاتها.

**تصميم التفاعل**: ممارسة تصميم المنتجات والبيئات والأنظمة والخدمات الرقمية التفاعلية مع التركيز على السلوك وإجراءات المستخدم.

**القدرات المتصورة**: خصائص الأشياء التي تظهر للمستخدمين الإجراءات التي يمكنهم اتخاذها.

**التغذية الراجعة**: استجابة النظام لإجراءات المستخدم، تؤكد أنه تم تسجيل إجراء وما هي النتيجة.`
    },
    // Page 3 - Design Principles
    {
      title: language === 'en' ? 'Design Principles' : 'مبادئ التصميم',
      content: language === 'en'
        ? `**Visibility**: Important functions should be visible and easily discoverable. Users should not have to search for basic features.

**Consistency**: Similar operations should be performed in similar ways. Consistent interfaces are easier to learn and use.

**Mapping**: The relationship between controls and their effects should be clear and logical. Natural mapping reduces cognitive load.

**Constraint**: Limiting the possible actions helps prevent errors. Good constraints guide users toward successful interactions.

**Error Prevention & Recovery**: Design should prevent errors where possible and provide clear recovery paths when errors occur.`
        : `**الوضوح**: يجب أن تكون الوظائف المهمة مرئية وسهلة الاكتشاف.

**الاتساق**: يجب أن تُنفذ العمليات المتشابهة بطرق مماثلة.

**التخطيط**: يجب أن تكون العلاقة بين عناصر التحكم وتأثيراتها واضحة ومنطقية.

**القيود**: الحد من الإجراءات الممكنة يساعد على منع الأخطاء.

**منع الأخطاء والاسترداد**: يجب أن يمنع التصميم الأخطاء حيثما أمكن ويوفر مسارات استرداد واضحة.`
    },
    // Page 4 - User Research Methods
    {
      title: language === 'en' ? 'User Research Methods' : 'طرق بحث المستخدم',
      content: language === 'en'
        ? `**Interviews**: One-on-one conversations with users to understand their needs, behaviors, and pain points. Interviews can be structured, semi-structured, or unstructured.

**Surveys & Questionnaires**: Collect quantitative and qualitative data from a large number of users. Useful for identifying trends and patterns.

**Observational Studies**: Watching users interact with systems in natural settings provides insights into real-world usage patterns.

**Usability Testing**: Users perform tasks while observers watch and take notes. Identifies usability problems and areas for improvement.

**A/B Testing**: Comparing two versions of a design to determine which performs better based on measurable criteria.`
        : `**المقابلات**: محادثات فردية مع المستخدمين لفهم احتياجاتهم وسلوكياتهم ونقاط الألم.

**الاستطلاعات والاستبيانات**: جمع البيانات الكمية والنوعية من عدد كبير من المستخدمين.

**الدراسات الرصدية**: مشاهدة المستخدمين يتفاعلون مع الأنظمة في بيئات طبيعية.

**اختبار قابلية الاستخدام**: يؤدي المستخدمون مهام بينما يشاهد المراقبون ويدونون الملاحظات.

**اختبار A/B**: مقارنة نسخ��ين من التصميم لتحديد أيهما يؤدي بشكل أفضل.`
    },
    // Page 5 - Interaction Styles
    {
      title: language === 'en' ? 'Interaction Styles' : 'أنماط التفاعل',
      content: language === 'en'
        ? `**Command Line**: Users type commands to interact with the system. Powerful but requires learning specific syntax.

**Menu-Based**: Users select from presented options. Easy to learn but can be slow for experienced users.

**Form Fill-In**: Users enter data into structured forms. Familiar and efficient for data entry tasks.

**Direct Manipulation**: Users interact with visual representations of objects. Examples include drag-and-drop and touch interfaces.

**Natural Language**: Users communicate with systems using everyday language. Becoming more common with voice assistants and chatbots.`
        : `**سطر الأوامر**: يكتب المستخدمون الأوامر للتفاعل مع النظام.

**القوائم**: يختار المستخدمون من الخيارات المقدمة.

**ملء النماذج**: يدخل المستخدمون البيانات في نماذج منظمة.

**المعالجة المباشرة**: يتفاعل المستخدمون مع التمثيلات المرئية للكائنات.

**اللغة الطبيعية**: يتواصل المستخدمون مع الأنظمة باستخدام اللغة اليومية.`
    },
    // Page 6 - Accessibility
    {
      title: language === 'en' ? 'Accessibility in HCI' : 'إمكانية الوصول في HCI',
      content: language === 'en'
        ? `Accessibility ensures that systems can be used by people with diverse abilities, including those with visual, auditory, motor, or cognitive impairments.

**Visual Accessibility**: Provide text alternatives for images, ensure sufficient color contrast, support screen readers, and allow text resizing.

**Motor Accessibility**: Support keyboard navigation, provide large click targets, avoid time-sensitive interactions, and support voice input.

**Cognitive Accessibility**: Use clear language, provide consistent navigation, avoid overwhelming users with information, and offer help when needed.

**WCAG Guidelines**: The Web Content Accessibility Guidelines provide standards for creating accessible digital content.`
        : `تضمن إمكانية الوصول إمكانية استخدام الأنظمة من قبل الأشخاص ذوي القدرات المتنوعة.

**الوصول البصري**: توفير بدائل نصية للصور، ضمان تباين كافٍ للألوان، دعم قارئات الشاشة.

**الوصول الحركي**: دعم التنقل بلوحة المفاتيح، توفير أهداف نقر كبيرة، تجنب التفاعلات الحساسة للوقت.

**الوصول الإدراكي**: استخدام لغة واضحة، توفير تنقل متسق، تجنب إرباك المستخدمين.

**إرشادات WCAG**: توفر معايير لإنشاء محتوى رقمي يمكن الوصول إليه.`
    },
    // Page 7 - Evaluation Methods
    {
      title: language === 'en' ? 'Evaluation Methods' : 'طرق التقييم',
      content: language === 'en'
        ? `**Heuristic Evaluation**: Experts review interfaces against established usability principles (heuristics). Quick and cost-effective method for identifying major usability issues.

**Cognitive Walkthrough**: Evaluators step through tasks from a user's perspective, identifying potential problems in the learning process.

**Think-Aloud Protocol**: Users verbalize their thoughts while performing tasks, providing insight into their mental models and decision-making processes.

**Performance Metrics**: Measure task completion time, error rates, and success rates to quantify usability.

**Satisfaction Surveys**: Gather user opinions and subjective assessments of system quality and experience.`
        : `**التقييم الاستدلالي**: يراجع الخبراء الواجهات مقابل مبادئ قابلية الاستخدام المعمول بها.

**الجولة المعرفية**: يتنقل المقيمون عبر المهام من منظور المستخدم.

**بروتوكول التفكير بصوت عالٍ**: عبر المستخدمون عن أفكارهم أثناء أداء المهام.

**مقاييس الأداء**: قياس وقت إكمال المهمة ومعدلات الخطأ ومعدلات النجاح.

**استطلاعات الرضا**: جمع آراء المستخدمين والتقييمات الذاتية.`
    },
    // Page 8 - Conclusion
    {
      title: language === 'en' ? 'Conclusion & Future Directions' : 'الخلاصة والاتجاهات المستقبلية',
      content: language === 'en'
        ? `Human-Computer Interaction continues to evolve as technology advances. Understanding HCI principles is essential for creating systems that are not only functional but also enjoyable to use.

**Emerging Trends**: Voice interfaces, augmented reality (AR), virtual reality (VR), gesture-based interaction, and AI-powered personalization are shaping the future of HCI.

**Key Takeaways**: Always design with users in mind, test early and often, prioritize accessibility, maintain consistency, and provide clear feedback.

The field of HCI will continue to grow in importance as technology becomes increasingly integrated into all aspects of human life. Successful designers must balance technical constraints with human needs and capabilities.`
        : `يستمر تفاعل الإنسان مع الحاسب في التطور مع تقدم التكنولوجيا.

**الاتجاهات الناشئة**: واجهات الصوت، الواقع المعزز، الواقع الافتراضي، التفاعل القائم على الإيماءات.

**النقاط الرئيسية**: صمم دائمًا مع وضع المستخدمين في الاعتبار، اختبر مبكرًا وبشكل متكرر، أعط الأولوية لإمكانية الوصول.

سيستمر مجال HCI في النمو في الأهمية مع دمج التكنولوجيا بشكل متزايد في جميع جوانب الحياة البشرية.`
    },
  ];

  const pagesToShow = Math.min(summaryPages.length, material.pages || 8);
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-foreground mb-6">{t[language].preview}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {summaryPages.slice(0, pagesToShow).map((page, index) => (
          <div key={index} className="bg-card rounded-3xl p-8 shadow-sm border border-border min-h-[600px] flex flex-col">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Page' : 'صفحة'} {index + 1}
              </span>
              <span className="text-xs text-muted-foreground">{material.title}</span>
            </div>

            {/* Page Content */}
            <div className="flex-1 space-y-4">
              <h3 className="text-xl text-blue-600 dark:text-blue-400 mb-4">{page.title}</h3>
              <div className="text-foreground leading-relaxed whitespace-pre-line text-justify">
                {page.content}
              </div>
            </div>

            {/* Page Footer */}
            <div className="text-center text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
              {index + 1} / {pagesToShow}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Slide Content Component
function SlideContent({ material, language, t }: any) {
  const [selectedSlide, setSelectedSlide] = useState(0);

  const slides = language === 'en' ? [
    // Slide 1 - Title
    {
      title: 'Human-Computer Interaction',
      subtitle: 'Introduction to HCI Principles',
      content: ['Understanding user-centered design', 'Creating effective interfaces', 'Enhancing user experience'],
      type: 'title'
    },
    // Slide 2 - Definition
    {
      title: 'What is HCI?',
      subtitle: 'Definition',
      content: [
        '• Multidisciplinary field combining computer science, psychology, and design',
        '• Focuses on design and use of computer technology',
        '• Emphasizes interfaces between people and computers',
        '• Goal: Make technology usable and receptive to user needs'
      ],
      type: 'bullets'
    },
    // Slide 3 - Key Concepts
    {
      title: 'Core Concepts',
      subtitle: 'Fundamental Principles',
      content: [
        'Usability - Effectiveness, efficiency, satisfaction',
        'User Experience (UX) - Entire user journey',
        'Interaction Design - Focus on behavior',
        'Affordances - Visual cues for actions',
        'Feedback - System responses'
      ],
      type: 'bullets'
    },
    // Slide 4 - Design Principles
    {
      title: 'Design Principles',
      subtitle: 'Key Guidelines',
      content: [
        '1. Visibility - Make functions discoverable',
        '2. Consistency - Similar operations in similar ways',
        '3. Mapping - Clear control relationships',
        '4. Constraints - Prevent user errors',
        '5. Feedback - Confirm user actions'
      ],
      type: 'numbered'
    },
    // Slide 5 - User Research
    {
      title: 'User Research Methods',
      subtitle: 'Understanding Users',
      content: [
        'Interviews - Understand needs and behaviors',
        'Surveys - Collect quantitative data',
        'Observation - Watch real-world usage',
        'Usability Testing - Identify problems',
        'A/B Testing - Compare design versions'
      ],
      type: 'bullets'
    },
    // Slide 6 - Interaction Styles
    {
      title: 'Interaction Styles',
      subtitle: 'Methods of Communication',
      content: [
        'Command Line - Text-based commands',
        'Menu-Based - Selection from options',
        'Form Fill-In - Structured data entry',
        'Direct Manipulation - Visual object interaction',
        'Natural Language - Voice and text conversation'
      ],
      type: 'bullets'
    },
    // Slide 7 - Usability
    {
      title: 'Usability Dimensions',
      subtitle: 'ISO 9241-11 Standard',
      content: [
        'Effectiveness - Can users achieve their goals?',
        'Efficiency - How quickly can tasks be completed?',
        'Satisfaction - Is the experience pleasant?',
        'Context of Use - Environment and conditions',
        'Specified Users - Target audience characteristics'
      ],
      type: 'bullets'
    },
    // Slide 8 - Accessibility
    {
      title: 'Accessibility',
      subtitle: 'Design for All',
      content: [
        'Visual - Screen readers, color contrast, text sizing',
        'Motor - Keyboard navigation, large targets',
        'Auditory - Captions, visual alerts',
        'Cognitive - Clear language, consistent navigation',
        'WCAG - Web Content Accessibility Guidelines'
      ],
      type: 'bullets'
    },
    // Slide 9 - Evaluation
    {
      title: 'Evaluation Methods',
      subtitle: 'Assessing Interface Quality',
      content: [
        'Heuristic Evaluation - Expert review',
        'Cognitive Walkthrough - Task analysis',
        'Think-Aloud Protocol - User verbalization',
        'Performance Metrics - Quantitative measures',
        'Surveys - User satisfaction'
      ],
      type: 'bullets'
    },
    // Slide 10 - Process
    {
      title: 'HCI Design Process',
      subtitle: 'Iterative Approach',
      content: [
        '1. Research - Understand users and context',
        '2. Design - Create interface solutions',
        '3. Prototype - Build testable versions',
        '4. Evaluate - Test with users',
        '5. Iterate - Refine based on feedback'
      ],
      type: 'numbered'
    },
    // Slide 11 - Future
    {
      title: 'Emerging Trends',
      subtitle: 'Future of HCI',
      content: [
        'Voice Interfaces - AI assistants and smart speakers',
        'AR/VR - Immersive experiences',
        'Gesture Control - Touchless interaction',
        'AI Personalization - Adaptive interfaces',
        'Wearable Technology - Integrated devices'
      ],
      type: 'bullets'
    },
    // Slide 12 - Summary
    {
      title: 'Key Takeaways',
      subtitle: 'Summary',
      content: [
        '✓ Design with users in mind',
        '✓ Test early and often',
        '✓ Prioritize accessibility',
        '✓ Maintain consistency',
        '✓ Provide clear feedback',
        '✓ Iterate based on user input'
      ],
      type: 'summary'
    }
  ] : [
    // Arabic Slides
    {
      title: 'تفاعل الإنسان مع الحاسب',
      subtitle: 'مقدمة في مبادئ HCI',
      content: ['فهم التصميم المتمحور حول المستخدم', 'إنشاء واجهات فعالة', 'تحسين تجربة المستخدم'],
      type: 'title'
    },
    {
      title: 'ما هو HCI؟',
      subtitle: 'التعريف',
      content: [
        '• مجال متعدد التخصصات يجمع بين علوم الحاسب وعلم النفس والتصميم',
        '• يركز على تصميم واستخدام تكنولوجيا الحاسب',
        '• يؤكد على الواجهات بين الناس وأجهزة الكمبيوتر',
        '• الهدف: جعل التكنولوجيا قابلة للاستخدام ومستجيبة لاحتياجات المستخدم'
      ],
      type: 'bullets'
    },
    {
      title: 'المفاهيم الأساسية',
      subtitle: 'المبادئ الأساسية',
      content: [
        'قابلية الاستخدام - الفعالية والكفاءة والرضا',
        'تجربة المستخدم (UX) - رحلة المستخدم الكاملة',
        'تصميم التفاعل - التركيز على السلوك',
        'القدرات المتصورة - الإشارات البصرية للإجراءات',
        'التغذية الراجعة - استجابات النظام'
      ],
      type: 'bullets'
    },
    {
      title: 'مبادئ التصميم',
      subtitle: 'الإرشادات الرئيسية',
      content: [
        '1. الوضوح - اجعل الوظائف قابلة للاكتشاف',
        '2. الاتساق - عمليات مماثلة بطرق مماثلة',
        '3. التخطيط - علاقات تحكم واضحة',
        '4. القيود - منع أخطاء المستخدم',
        '5. التغذية الراجعة - تأكيد إجراءات المستخدم'
      ],
      type: 'numbered'
    },
    {
      title: 'طرق بحث المستخدم',
      subtitle: 'فهم المستخدمين',
      content: [
        'المقابلات - فهم الاحتياجات والسلوكيات',
        'الاستطلاعات - جمع البيانات الكمية',
        'الملاحظة - مشاهدة الاستخدام الفعلي',
        'اختبار قابلية الاستخدام - تحديد المشاكل',
        'اختبار A/B - مقارنة نسخ التصميم'
      ],
      type: 'bullets'
    },
    {
      title: 'أنماط التفاعل',
      subtitle: 'طرق التواصل',
      content: [
        'سطر الأوامر - الأوامر النصية',
        'القوائم - الاختيار من الخيارات',
        'ملء النماذج - إدخال البيانات المنظمة',
        'المعالجة المباشرة - التفاعل مع الكائنات المرئية',
        'اللغة الطبيعية - محادثة صوتية ونصية'
      ],
      type: 'bullets'
    },
    {
      title: 'أبعاد قابلية الاستخدام',
      subtitle: 'معيار ISO 9241-11',
      content: [
        'الفعالية - هل يمكن للمستخدمين تحقيق أهدافهم؟',
        'الكفاءة - ما مدى سرعة إكمال المهام؟',
        'الرضا - هل التجربة ممتعة؟',
        'سياق الاستخدام - البيئة والظروف',
        'المستخدمون المحددون - خصائص الجمهور المستهدف'
      ],
      type: 'bullets'
    },
    {
      title: 'إمكانية الوصول',
      subtitle: 'التصميم للجميع',
      content: [
        'البصري - قارئات الشاشة، تباين الألوان، تحجيم النص',
        'الحركي - التنقل بلوحة المفاتيح، الأهداف الك��يرة',
        'السمعي - التسميات التوضيحية، التنبيهات المرئية',
        'الإدراكي - لغة واضحة، تنقل متسق',
        'WCAG - إرشادات إمكانية الوصول إلى محتوى الويب'
      ],
      type: 'bullets'
    },
    {
      title: 'طرق التقييم',
      subtitle: 'تقييم جودة الواجهة',
      content: [
        'التقييم الاستدلالي - مراجعة الخبراء',
        'الجولة المعرفية - تحليل المهام',
        'بروتوكول التفكير بصوت عالٍ - التعبير اللفظي للمستخدم',
        'مقاييس الأداء - مقاييس كمية',
        'الاستطلاعات - رضا المستخدم'
      ],
      type: 'bullets'
    },
    {
      title: 'عملية تصميم HCI',
      subtitle: 'نهج تكراري',
      content: [
        '1. البحث - فهم المستخدمين والسياق',
        '2. التصميم - إنشاء حلول الواجهة',
        '3. النموذج الأولي - بناء نسخ قابلة للاختبار',
        '4. التقييم - الاختبار مع المستخدمين',
        '5. التكرار - التحسين بناءً على التغذية الراجعة'
      ],
      type: 'numbered'
    },
    {
      title: 'الاتجاهات الناشئة',
      subtitle: 'مستقبل HCI',
      content: [
        'واجهات الصوت - المساعدات الذكية والمكبرات الذكية',
        'الواقع المعزز/الافتراضي - تجارب غامرة',
        'التحكم بالإيماءات - التفاعل بدون لمس',
        'التخصيص بالذكاء الاصطناعي - واجهات تكيفية',
        'التكنولوجيا القابلة للارتداء - الأجهزة المتكاملة'
      ],
      type: 'bullets'
    },
    {
      title: 'النقاط الرئيسية',
      subtitle: 'الملخص',
      content: [
        '✓ صمم مع وضع المستخدمين في الاعتبار',
        '✓ اختبر مبكرًا وبشكل متكرر',
        '✓ أعط الأولوية لإمكانية الوصول',
        '✓ حافظ على الاتساق',
        '✓ قدم تغذية راجعة واضحة',
        '✓ كرر بناءً على مدخلات المستخدم'
      ],
      type: 'summary'
    }
  ];

  const currentSlide = slides[selectedSlide];

  return (
    <div className="space-y-6">
      {/* Full Slide Preview */}
      <div className="bg-card rounded-3xl p-12 shadow-sm border border-border min-h-[500px]">
        <div className="h-full flex flex-col">
          {currentSlide.type === 'title' ? (
            // Title Slide
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="text-6xl mb-4">🎓</div>
              <h1 className="text-5xl text-foreground">{currentSlide.title}</h1>
              <h2 className="text-3xl text-blue-600 dark:text-blue-400">{currentSlide.subtitle}</h2>
              <div className="mt-8 space-y-2">
                {currentSlide.content.map((item: string, i: number) => (
                  <p key={i} className="text-xl text-muted-foreground">{item}</p>
                ))}
              </div>
            </div>
          ) : (
            // Content Slide
            <div className="flex-1 flex flex-col">
              <div className="mb-8">
                <h2 className="text-4xl text-foreground mb-2">{currentSlide.title}</h2>
                <h3 className="text-2xl text-blue-600 dark:text-blue-400">{currentSlide.subtitle}</h3>
              </div>
              
              <div className="flex-1 space-y-4">
                {currentSlide.content.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    {currentSlide.type === 'bullets' && !item.startsWith('•') && (
                      <span className="text-blue-600 dark:text-blue-400 text-2xl flex-shrink-0">•</span>
                    )}
                    <p className="text-xl text-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              {/* Visual Diagram Section */}
              {selectedSlide >= 2 && selectedSlide <= 9 && (
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="bg-blue-500/10 dark:bg-blue-500/20 p-4 rounded-2xl border border-blue-500/20 text-center">
                    <div className="text-3xl mb-2">👥</div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">{language === 'en' ? 'Users' : 'المستخدمون'}</p>
                  </div>
                  <div className="bg-purple-500/10 dark:bg-purple-500/20 p-4 rounded-2xl border border-purple-500/20 text-center">
                    <div className="text-3xl mb-2">💻</div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">{language === 'en' ? 'Interface' : 'الواجهة'}</p>
                  </div>
                  <div className="bg-green-500/10 dark:bg-green-500/20 p-4 rounded-2xl border border-green-500/20 text-center">
                    <div className="text-3xl mb-2">⚙️</div>
                    <p className="text-sm text-green-700 dark:text-green-300">{language === 'en' ? 'System' : 'النظام'}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Slide Number Footer */}
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-muted-foreground text-sm">
            <span>{language === 'en' ? 'HCI Lecture' : 'محاضرة HCI'}</span>
            <span>{selectedSlide + 1} / {slides.length}</span>
          </div>
        </div>
      </div>

      {/* Slide Thumbnails */}
      <div>
        <h3 className="text-2xl text-foreground mb-4">{t[language].slidePreview}</h3>
        <div className="grid grid-cols-4 gap-4">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setSelectedSlide(index)}
              className={`bg-card rounded-2xl p-4 shadow-sm border-2 transition-all hover:shadow-md ${
                selectedSlide === index ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-border'
              }`}
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl flex flex-col items-center justify-center p-3 mb-2">
                <span className="text-2xl mb-1">
                  {slide.type === 'title' ? '🎓' : slide.type === 'summary' ? '✓' : '📊'}
                </span>
                <p className="text-xs text-muted-foreground text-center line-clamp-2">{slide.title}</p>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {language === 'en' ? 'Slide' : 'شريحة'} {index + 1}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Assignment Content Component
function AssignmentContent({ material, language, t }: any) {
  return (
    <div className="space-y-6">
      {/* Requirements */}
      <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
        <h2 className="text-3xl text-green-600 dark:text-green-400 mb-6">{t[language].requirements}</h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="text-green-600 dark:text-green-400 text-xl">•</span>
            <p className="text-foreground">
              {language === 'en' 
                ? 'Complete all sections of the assignment thoroughly and submit before the deadline.' 
                : 'أكمل جميع أقسام الواجب بدقة وقدمه قبل الموعد النهائي.'}
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-green-600 dark:text-green-400 text-xl">•</span>
            <p className="text-foreground">
              {language === 'en' 
                ? 'Use proper citations and references for any external sources.' 
                : 'استخدم الاستشهادات والمراجع المناسبة لأي مصادر خارجية.'}
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-green-600 dark:text-green-400 text-xl">•</span>
            <p className="text-foreground">
              {language === 'en' 
                ? 'Include diagrams and examples where applicable.' 
                : 'قم بتضمين الرسوم البيانية والأمثلة حيثما ينطبق ذلك.'}
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-green-600 dark:text-green-400 text-xl">•</span>
            <p className="text-foreground">
              {language === 'en' 
                ? 'Follow the formatting guidelines provided in the syllabus.' 
                : 'اتبع إرشادات التنسيق المقدمة في المنهج الدراسي.'}
            </p>
          </div>
        </div>
      </div>

      {/* Submission Format */}
      <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
        <h2 className="text-3xl text-blue-600 dark:text-blue-400 mb-6">{t[language].submissionFormat}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl border border-blue-500/20">
            <p className="text-muted-foreground text-sm mb-1">{language === 'en' ? 'File Format' : 'صيغة الملف'}</p>
            <p className="text-foreground">PDF, DOCX</p>
          </div>
          <div className="p-4 bg-purple-500/10 dark:bg-purple-500/20 rounded-2xl border border-purple-500/20">
            <p className="text-muted-foreground text-sm mb-1">{language === 'en' ? 'Max File Size' : 'حجم الملف الأقصى'}</p>
            <p className="text-foreground">10 MB</p>
          </div>
          <div className="p-4 bg-green-500/10 dark:bg-green-500/20 rounded-2xl border border-green-500/20">
            <p className="text-muted-foreground text-sm mb-1">{language === 'en' ? 'Naming Convention' : 'تنسيق الاسم'}</p>
            <p className="text-foreground">StudentID_AssignmentName.pdf</p>
          </div>
          <div className="p-4 bg-orange-500/10 dark:bg-orange-500/20 rounded-2xl border border-orange-500/20">
            <p className="text-muted-foreground text-sm mb-1">{language === 'en' ? 'Submission Method' : 'طريقة التسليم'}</p>
            <p className="text-foreground">{language === 'en' ? 'Upload Portal' : 'بوابة الرفع'}</p>
          </div>
        </div>
      </div>

      {/* Rubric */}
      <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
        <h2 className="text-3xl text-purple-600 dark:text-purple-400 mb-6">{t[language].rubric}</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-2xl border border-border">
            <span className="text-foreground">{language === 'en' ? 'Content Quality' : 'جودة المحتوى'}</span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">40%</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-2xl border border-border">
            <span className="text-foreground">{language === 'en' ? 'Organization & Structure' : 'التنظيم والهيكل'}</span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">25%</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-2xl border border-border">
            <span className="text-foreground">{language === 'en' ? 'Research & References' : 'البحث والمراجع'}</span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">20%</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-2xl border border-border">
            <span className="text-foreground">{language === 'en' ? 'Formatting & Presentation' : 'التنسيق والعرض'}</span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">15%</span>
          </div>
        </div>
      </div>
    </div>
  );
}