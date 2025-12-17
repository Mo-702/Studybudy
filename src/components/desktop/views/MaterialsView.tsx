import { FileText, Download, Eye, Calendar, User, Filter, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Course } from '../MainLayout';
import { toast } from 'sonner@2.0.3';
import { MaterialViewer } from '../MaterialViewer';

interface MaterialsViewProps {
  language: 'en' | 'ar';
  course: Course | null;
  onBack?: () => void;
  initialFilter?: string;
}

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

export function MaterialsView({ language, course, onBack, initialFilter = 'all' }: MaterialsViewProps) {
  const [selectedType, setSelectedType] = useState<string>(initialFilter);
  const [viewingMaterial, setViewingMaterial] = useState<Material | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const t = {
    en: {
      title: 'Course Materials',
      all: 'All',
      exams: 'Exams',
      summaries: 'Summaries',
      slides: 'Slides',
      assignments: 'Assignments',
      uploadDate: 'Upload Date',
      uploader: 'Uploader',
      downloads: 'Downloads',
      view: 'View',
      startExam: 'Start Exam',
      download: 'Download',
      noMaterials: 'No materials available',
      back: 'Back',
      instructor: 'Instructor',
      dueDate: 'Due Date',
      downloading: 'Downloading...',
      downloaded: 'Downloaded successfully',
    },
    ar: {
      title: 'محتوى المادة',
      all: 'الكل',
      exams: 'الاختبارات',
      summaries: 'الملخصات',
      slides: 'السلايدات',
      assignments: 'الواجبات',
      uploadDate: 'تاريخ الرفع',
      uploader: 'رافع المحتوى',
      downloads: 'التحميلات',
      view: 'عرض',
      startExam: 'بدء الاختبار',
      download: 'تحميل',
      noMaterials: 'لا توجد مواد متاحة',
      back: 'رجوع',
      instructor: 'المدرس',
      dueDate: 'موعد التسليم',
      downloading: 'جاري التحميل...',
      downloaded: 'تم التحميل بنجاح',
    },
  };

  // EXPANDED COMPREHENSIVE MATERIALS
  const allMaterials: Material[] = [
    // ============ EXAMS (10 items) ============
    {
      id: 'exam-1',
      title: language === 'en' ? 'Midterm Exam - Fall 2025' : 'اختبار منتصف الفصل - خريف 2025',
      type: 'exam',
      uploadDate: '2025-02-15',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 245,
      rating: 4.8,
      size: '2.4 MB',
      duration: '90 minutes',
      totalMarks: 90,
    },
    {
      id: 'exam-2',
      title: language === 'en' ? 'Final Exam - Spring 2025' : 'الاختبار النهائي - ربيع 2025',
      type: 'exam',
      uploadDate: '2025-05-10',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 312,
      rating: 4.9,
      size: '3.1 MB',
      duration: '120 minutes',
      totalMarks: 100,
    },
    {
      id: 'exam-3',
      title: language === 'en' ? 'Quiz 1 - Introduction & Basics' : 'اختبار قصير 1 - المقدمة والأساسيات',
      type: 'exam',
      uploadDate: '2025-01-20',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 189,
      rating: 4.6,
      size: '1.2 MB',
      duration: '30 minutes',
      totalMarks: 20,
    },
    {
      id: 'exam-4',
      title: language === 'en' ? 'Quiz 2 - Core Concepts' : 'اختبار قصير 2 - المفاهيم الأساسية',
      type: 'exam',
      uploadDate: '2025-03-12',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 198,
      rating: 4.7,
      size: '1.3 MB',
      duration: '30 minutes',
      totalMarks: 20,
    },
    {
      id: 'exam-5',
      title: language === 'en' ? 'Quiz 3 - Advanced Topics' : 'اختبار قصير 3 - الموضوعات المتقدمة',
      type: 'exam',
      uploadDate: '2025-04-05',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 176,
      rating: 4.5,
      size: '1.1 MB',
      duration: '30 minutes',
      totalMarks: 20,
    },
    {
      id: 'exam-6',
      title: language === 'en' ? 'Practice Exam - Comprehensive Review' : 'اختبار تجريبي - مراجعة شاملة',
      type: 'exam',
      uploadDate: '2025-04-25',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 276,
      rating: 4.9,
      size: '2.8 MB',
      duration: '120 minutes',
      totalMarks: 100,
    },
    {
      id: 'exam-7',
      title: language === 'en' ? 'Pop Quiz - Chapter 7' : 'اختبار مفاجئ - الفصل 7',
      type: 'exam',
      uploadDate: '2025-03-18',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 134,
      rating: 4.4,
      size: '0.8 MB',
      duration: '15 minutes',
      totalMarks: 10,
    },
    {
      id: 'exam-8',
      title: language === 'en' ? 'Makeup Exam - Midterm' : 'اختبار بديل - منتصف الفصل',
      type: 'exam',
      uploadDate: '2025-02-28',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 89,
      rating: 4.7,
      size: '2.5 MB',
      duration: '90 minutes',
      totalMarks: 90,
    },
    {
      id: 'exam-9',
      title: language === 'en' ? 'Sample Exam - Past Paper 2024' : 'اختبار نموذجي - ورقة 2024',
      type: 'exam',
      uploadDate: '2025-01-10',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 298,
      rating: 4.8,
      size: '2.6 MB',
      duration: '120 minutes',
      totalMarks: 100,
    },
    {
      id: 'exam-10',
      title: language === 'en' ? 'Oral Exam Guidelines' : 'إرشادات الاختبار الشفهي',
      type: 'exam',
      uploadDate: '2025-05-01',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 156,
      rating: 4.6,
      size: '1.0 MB',
      duration: '20 minutes per student',
      totalMarks: 40,
    },

    // ============ SUMMARIES (12 items) ============
    {
      id: 'summary-1',
      title: language === 'en' ? 'Complete Course Summary - All Chapters' : 'ملخص شامل للمادة - جميع الفصول',
      type: 'summary',
      uploadDate: '2025-04-20',
      uploader: 'Ahmad Mohammed',
      downloads: 423,
      rating: 4.9,
      size: '5.2 MB',
      pages: 24,
    },
    {
      id: 'summary-2',
      title: language === 'en' ? 'Chapter 1-3 Summary' : 'ملخص الفصول 1-3',
      type: 'summary',
      uploadDate: '2025-02-01',
      uploader: 'Ahmad Mohammed',
      downloads: 234,
      rating: 4.7,
      size: '1.8 MB',
      pages: 8,
    },
    {
      id: 'summary-3',
      title: language === 'en' ? 'Chapter 4-6 Summary' : 'ملخص الفصول 4-6',
      type: 'summary',
      uploadDate: '2025-03-05',
      uploader: 'Sara Ahmed',
      downloads: 198,
      rating: 4.6,
      size: '2.1 MB',
      pages: 10,
    },
    {
      id: 'summary-4',
      title: language === 'en' ? 'Chapter 7-10 Summary' : 'ملخص الفصول 7-10',
      type: 'summary',
      uploadDate: '2025-04-10',
      uploader: 'Mohammed Ali',
      downloads: 212,
      rating: 4.8,
      size: '2.4 MB',
      pages: 12,
    },
    {
      id: 'summary-5',
      title: language === 'en' ? 'Midterm Review Notes' : 'ملاحظات مراجعة منتصف الفصل',
      type: 'summary',
      uploadDate: '2025-02-10',
      uploader: 'Fatima Hassan',
      downloads: 289,
      rating: 4.8,
      size: '3.1 MB',
      pages: 15,
    },
    {
      id: 'summary-6',
      title: language === 'en' ? 'Final Exam Preparation Guide' : 'دليل التحضير للاختبار النهائي',
      type: 'summary',
      uploadDate: '2025-05-01',
      uploader: 'Khalid Ibrahim',
      downloads: 367,
      rating: 4.9,
      size: '4.8 MB',
      pages: 20,
    },
    {
      id: 'summary-7',
      title: language === 'en' ? 'Quick Review - Key Concepts' : 'مراجعة سريعة - المفاهيم الرئيسية',
      type: 'summary',
      uploadDate: '2025-04-18',
      uploader: 'Sara Ahmed',
      downloads: 156,
      rating: 4.5,
      size: '1.2 MB',
      pages: 6,
    },
    {
      id: 'summary-8',
      title: language === 'en' ? 'Visual Study Guide - Diagrams & Charts' : 'دليل دراسي مرئي - رسوم بيانية',
      type: 'summary',
      uploadDate: '2025-03-22',
      uploader: 'Omar Youssef',
      downloads: 245,
      rating: 4.9,
      size: '6.5 MB',
      pages: 18,
    },
    {
      id: 'summary-9',
      title: language === 'en' ? 'Formula Sheet & Important Equations' : 'ورقة الصيغ والمعادلات المهمة',
      type: 'summary',
      uploadDate: '2025-04-05',
      uploader: 'Layla Ahmed',
      downloads: 178,
      rating: 4.7,
      size: '0.9 MB',
      pages: 4,
    },
    {
      id: 'summary-10',
      title: language === 'en' ? 'Practice Problems & Solutions' : 'مسائل تدريبية وحلولها',
      type: 'summary',
      uploadDate: '2025-03-15',
      uploader: 'Hassan Ali',
      downloads: 267,
      rating: 4.8,
      size: '3.7 MB',
      pages: 16,
    },
    {
      id: 'summary-11',
      title: language === 'en' ? 'Lecture Notes - Compiled' : 'ملاحظات المحاضرات - مجمعة',
      type: 'summary',
      uploadDate: '2025-04-12',
      uploader: 'Noor Mohammed',
      downloads: 201,
      rating: 4.6,
      size: '4.2 MB',
      pages: 22,
    },
    {
      id: 'summary-12',
      title: language === 'en' ? 'Exam Tips & Strategies' : 'نصائح واستراتيجيات الاختبار',
      type: 'summary',
      uploadDate: '2025-04-28',
      uploader: 'Amira Khalil',
      downloads: 189,
      rating: 4.7,
      size: '1.5 MB',
      pages: 7,
    },

    // ============ SLIDES (10 items) ============
    {
      id: 'slide-1',
      title: language === 'en' ? 'Lecture 1 - Introduction & Course Overview' : 'محاضرة 1 - المقدمة ونظرة عامة',
      type: 'slide',
      uploadDate: '2025-01-05',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 423,
      rating: 4.9,
      size: '5.2 MB',
    },
    {
      id: 'slide-2',
      title: language === 'en' ? 'Lecture 2 - Fundamental Principles' : 'محاضرة 2 - المبادئ الأساسية',
      type: 'slide',
      uploadDate: '2025-01-12',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 398,
      rating: 4.8,
      size: '4.7 MB',
    },
    {
      id: 'slide-3',
      title: language === 'en' ? 'Lecture 3 - Core Concepts & Theories' : 'محاضرة 3 - المفاهيم والنظريات الأساسية',
      type: 'slide',
      uploadDate: '2025-01-19',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 376,
      rating: 4.8,
      size: '5.1 MB',
    },
    {
      id: 'slide-4',
      title: language === 'en' ? 'Lecture 4 - Advanced Topics Part 1' : 'محاضرة 4 - موضوعات متقدمة جزء 1',
      type: 'slide',
      uploadDate: '2025-01-26',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 354,
      rating: 4.7,
      size: '4.9 MB',
    },
    {
      id: 'slide-5',
      title: language === 'en' ? 'Lecture 5 - Advanced Topics Part 2' : 'محاضرة 5 - موضوعات متقدمة جزء 2',
      type: 'slide',
      uploadDate: '2025-02-02',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 342,
      rating: 4.8,
      size: '5.3 MB',
    },
    {
      id: 'slide-6',
      title: language === 'en' ? 'Lecture 6 - Practical Applications' : 'محاضرة 6 - التطبيقات العملية',
      type: 'slide',
      uploadDate: '2025-02-09',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 329,
      rating: 4.7,
      size: '6.1 MB',
    },
    {
      id: 'slide-7',
      title: language === 'en' ? 'Lecture 7 - Case Studies & Examples' : 'محاضرة 7 - دراسات الحالة والأمثلة',
      type: 'slide',
      uploadDate: '2025-02-16',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 312,
      rating: 4.9,
      size: '5.8 MB',
    },
    {
      id: 'slide-8',
      title: language === 'en' ? 'Lecture 8 - Problem Solving Techniques' : 'محاضرة 8 - تقنيات حل المشكلات',
      type: 'slide',
      uploadDate: '2025-02-23',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 298,
      rating: 4.8,
      size: '5.4 MB',
    },
    {
      id: 'slide-9',
      title: language === 'en' ? 'Lecture 9 - Industry Best Practices' : 'محاضرة 9 - أفضل ممارسات الصناعة',
      type: 'slide',
      uploadDate: '2025-03-02',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 287,
      rating: 4.7,
      size: '5.0 MB',
    },
    {
      id: 'slide-10',
      title: language === 'en' ? 'Lecture 10 - Review & Final Preparation' : 'محاضرة 10 - المراجعة والتحضير النهائي',
      type: 'slide',
      uploadDate: '2025-04-28',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      downloads: 401,
      rating: 4.9,
      size: '6.8 MB',
    },

    // ============ ASSIGNMENTS (8 items) ============
    {
      id: 'assignment-1',
      title: language === 'en' ? 'Assignment 1 - Problem Set' : 'واجب 1 - مجموعة مسائل',
      type: 'assignment',
      uploadDate: '2025-01-15',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      dueDate: '2025-01-29',
      downloads: 267,
      rating: 4.5,
      size: '0.5 MB',
    },
    {
      id: 'assignment-2',
      title: language === 'en' ? 'Assignment 2 - Research Project Proposal' : 'واجب 2 - مقترح مشروع بحثي',
      type: 'assignment',
      uploadDate: '2025-02-05',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      dueDate: '2025-03-05',
      downloads: 234,
      rating: 4.6,
      size: '0.4 MB',
    },
    {
      id: 'assignment-3',
      title: language === 'en' ? 'Assignment 3 - Case Study Analysis' : 'واجب 3 - تحليل دراسة حالة',
      type: 'assignment',
      uploadDate: '2025-03-10',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      dueDate: '2025-03-31',
      downloads: 198,
      rating: 4.7,
      size: '0.6 MB',
    },
    {
      id: 'assignment-4',
      title: language === 'en' ? 'Assignment 4 - Group Project Phase 1' : 'واجب 4 - المشروع الجماعي المرحلة 1',
      type: 'assignment',
      uploadDate: '2025-03-20',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      dueDate: '2025-04-15',
      downloads: 312,
      rating: 4.8,
      size: '0.7 MB',
    },
    {
      id: 'assignment-5',
      title: language === 'en' ? 'Assignment 5 - Group Project Phase 2' : 'واجب 5 - المشروع الجماعي المرحلة 2',
      type: 'assignment',
      uploadDate: '2025-04-10',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      dueDate: '2025-05-10',
      downloads: 276,
      rating: 4.9,
      size: '0.8 MB',
    },
    {
      id: 'assignment-6',
      title: language === 'en' ? 'Assignment 6 - Final Presentation' : 'واجب 6 - العرض التقديمي النهائي',
      type: 'assignment',
      uploadDate: '2025-04-25',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      dueDate: '2025-05-20',
      downloads: 289,
      rating: 4.8,
      size: '0.5 MB',
    },
    {
      id: 'assignment-7',
      title: language === 'en' ? 'Assignment 7 - Peer Review Exercise' : 'واجب 7 - تمرين التقييم الجماعي',
      type: 'assignment',
      uploadDate: '2025-04-05',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      dueDate: '2025-04-19',
      downloads: 145,
      rating: 4.5,
      size: '0.3 MB',
    },
    {
      id: 'assignment-8',
      title: language === 'en' ? 'Assignment 8 - Reflection Paper' : 'واجب 8 - ورقة تأملية',
      type: 'assignment',
      uploadDate: '2025-05-05',
      uploader: 'Dr. Sarah Chen',
      instructor: 'Dr. Sarah Chen',
      dueDate: '2025-05-25',
      downloads: 201,
      rating: 4.7,
      size: '0.4 MB',
    },
  ];

  const types = [
    { id: 'all', label: t[language].all, icon: '📁', count: allMaterials.length },
    { id: 'exam', label: t[language].exams, icon: '📝', count: allMaterials.filter(m => m.type === 'exam').length },
    { id: 'summary', label: t[language].summaries, icon: '📄', count: allMaterials.filter(m => m.type === 'summary').length },
    { id: 'slide', label: t[language].slides, icon: '📊', count: allMaterials.filter(m => m.type === 'slide').length },
    { id: 'assignment', label: t[language].assignments, icon: '📋', count: allMaterials.filter(m => m.type === 'assignment').length },
  ];

  const filteredMaterials = allMaterials.filter(
    (material) => selectedType === 'all' || material.type === selectedType
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'from-red-500 to-red-600';
      case 'summary':
        return 'from-blue-500 to-blue-600';
      case 'slide':
        return 'from-purple-500 to-purple-600';
      case 'assignment':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return '📝';
      case 'summary':
        return '📄';
      case 'slide':
        return '📊';
      case 'assignment':
        return '📋';
      default:
        return '📁';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'exam':
        return t[language].exams.toUpperCase();
      case 'summary':
        return t[language].summaries.toUpperCase();
      case 'slide':
        return t[language].slides.toUpperCase();
      case 'assignment':
        return t[language].assignments.toUpperCase();
      default:
        return type.toUpperCase();
    }
  };

  const handleView = (material: Material) => {
    setViewingMaterial(material);
  };

  const handleDownload = (material: Material) => {
    setDownloadingId(material.id);
    toast.success(t[language].downloading, { duration: 1500 });
    
    setTimeout(() => {
      setDownloadingId(null);
      toast.success(t[language].downloaded, { duration: 2000 });
    }, 2000);
  };

  // If viewing a material, show the viewer
  if (viewingMaterial) {
    return (
      <MaterialViewer
        material={viewingMaterial}
        courseName={course ? (language === 'en' ? course.name : course.nameAr) : ''}
        language={language}
        onBack={() => setViewingMaterial(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-8 py-6">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors group focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
            aria-label={t[language].back}
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t[language].back}</span>
          </button>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl text-foreground mb-2">{t[language].title}</h1>
            {course && (
              <p className="text-xl text-muted-foreground">
                {language === 'en' ? course.name : course.nameAr}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border-b border-border px-8 py-4">
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-muted-foreground" aria-hidden="true" />
          <div className="flex gap-2 flex-wrap">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
                  selectedType === type.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-accent text-accent-foreground hover:bg-secondary'
                }`}
                aria-pressed={selectedType === type.id}
              >
                <span className="flex items-center gap-2">
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                  <span className="text-xs opacity-75">({type.count})</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📂</div>
              <p className="text-xl text-muted-foreground">{t[language].noMaterials}</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${getTypeColor(material.type)} rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0`}>
                      {getTypeIcon(material.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg text-foreground mb-1 line-clamp-2">
                            {material.title}
                          </h3>
                          <span className={`inline-block px-3 py-1 rounded-lg text-xs ${getTypeBadgeColor(material.type)}`}>
                            {getTypeLabel(material.type)}
                          </span>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User size={14} className="flex-shrink-0" aria-hidden="true" />
                          <span className="truncate">{material.uploader}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="flex-shrink-0" aria-hidden="true" />
                          <span>{material.uploadDate}</span>
                        </div>
                        {material.instructor && (
                          <div className="flex items-center gap-2">
                            <User size={14} className="flex-shrink-0" aria-hidden="true" />
                            <span className="truncate">{material.instructor}</span>
                          </div>
                        )}
                        {material.dueDate && (
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="flex-shrink-0" aria-hidden="true" />
                            <span>{material.dueDate}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Download size={14} className="flex-shrink-0" aria-hidden="true" />
                          <span>{material.downloads}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="flex-shrink-0" aria-hidden="true" />
                          <span>{material.size}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewingMaterial(material)}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
                            material.type === 'exam'
                              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
                              : 'bg-secondary text-foreground hover:bg-accent hover:scale-[1.02] hover:shadow-md active:scale-[0.98]'
                          }`}
                          aria-label={`${material.type === 'exam' ? t[language].startExam : t[language].view} ${material.title}`}
                        >
                          <Eye size={16} />
                          <span>{material.type === 'exam' ? t[language].startExam : t[language].view}</span>
                        </button>
                        <button
                          onClick={() => handleDownload(material)}
                          disabled={downloadingId === material.id}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-ring"
                          aria-label={`${t[language].download} ${material.title}`}
                        >
                          <Download size={16} className={downloadingId === material.id ? 'animate-bounce' : ''} />
                          <span>{downloadingId === material.id ? t[language].downloading : t[language].download}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}