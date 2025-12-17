import { FileText, Download, Eye, Calendar, User, Link as LinkIcon, File, Image, X, Loader2, CheckCircle, Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { Course } from '../MainLayout';
import { useState } from 'react';

interface CourseResourcesViewProps {
  language: 'en' | 'ar';
  course: Course | null;
}

interface Resource {
  id: string;
  title: string;
  type: 'slide' | 'pdf' | 'link' | 'document' | 'image';
  uploadedBy: string;
  uploadDate: string;
  size?: string;
  url?: string;
  previewContent?: {
    pages?: number;
    slides?: string[];
    text?: string;
  };
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export function CourseResourcesView({ language, course }: CourseResourcesViewProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [downloadingResources, setDownloadingResources] = useState<Set<string>>(new Set());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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
      resources: 'Course Resources',
      slides: 'Lecture Slides',
      references: 'References',
      links: 'External Links',
      documents: 'Documents',
      uploadedBy: 'Uploaded by',
      view: 'View',
      download: 'Download',
      downloading: 'Downloading...',
      downloadSuccess: 'Downloaded successfully',
      openLink: 'Open Link',
      linkCopied: 'Link copied to clipboard',
      noResources: 'No resources available',
      preview: 'Preview',
      close: 'Close',
      page: 'Page',
      of: 'of',
      slide: 'Slide',
      previous: 'Previous',
      next: 'Next',
    },
    ar: {
      resources: 'موارد المادة',
      slides: 'سلايدات المحاضرات',
      references: 'المراجع',
      links: 'روابط خارجية',
      documents: 'المستندات',
      uploadedBy: 'رفع بواسطة',
      view: 'عرض',
      download: 'تحميل',
      downloading: 'جاري التحميل...',
      downloadSuccess: 'تم التحميل بنجاح',
      openLink: 'فتح الرابط',
      linkCopied: 'تم نسخ الرابط',
      noResources: 'لا توجد موارد متاحة',
      preview: 'معاينة',
      close: 'إغلاق',
      page: 'صفحة',
      of: 'من',
      slide: 'سلايد',
      previous: 'السابق',
      next: 'التالي',
    },
  };

  const resources: Resource[] = [
    {
      id: '1',
      title: language === 'en' ? 'Chapter 1 - Introduction Slides' : 'الفصل 1 - سلايدات المقدمة',
      type: 'slide',
      uploadedBy: 'Dr. Sarah Chen',
      uploadDate: '2025-01-15',
      size: '2.4 MB',
      previewContent: {
        slides: [
          'Introduction to Computer Science',
          'Course Overview & Objectives',
          'What is Programming?',
          'Algorithm Basics',
          'Development Environment Setup',
        ]
      }
    },
    {
      id: '2',
      title: language === 'en' ? 'Week 2 - Advanced Concepts' : 'الأسبوع 2 - المفاهيم المتقدمة',
      type: 'slide',
      uploadedBy: 'Dr. Sarah Chen',
      uploadDate: '2025-01-22',
      size: '3.1 MB',
      previewContent: {
        slides: [
          'Data Structures Overview',
          'Arrays and Lists',
          'Stacks and Queues',
          'Trees and Graphs',
          'Complexity Analysis',
        ]
      }
    },
    {
      id: '3',
      title: language === 'en' ? 'Course Textbook - Complete' : 'كتاب المادة - كامل',
      type: 'pdf',
      uploadedBy: 'Dr. Sarah Chen',
      uploadDate: '2025-01-10',
      size: '15.2 MB',
      previewContent: {
        pages: 324,
        text: 'This comprehensive textbook covers fundamental concepts in computer science including programming paradigms, data structures, algorithms, and software engineering principles. Each chapter includes practical examples, exercises, and case studies to reinforce learning outcomes.'
      }
    },
    {
      id: '4',
      title: language === 'en' ? 'Reference Guide' : 'دليل المرجع',
      type: 'pdf',
      uploadedBy: 'Dr. Sarah Chen',
      uploadDate: '2025-01-12',
      size: '5.8 MB',
      previewContent: {
        pages: 156,
        text: 'A quick reference guide containing syntax, common patterns, best practices, and troubleshooting tips for the programming concepts covered in this course. Designed for easy lookup during coding sessions and exams.'
      }
    },
    {
      id: '5',
      title: language === 'en' ? 'Interactive Tutorial' : 'دروس تفاعلية',
      type: 'link',
      uploadedBy: 'Teaching Assistant',
      uploadDate: '2025-01-18',
      url: 'https://example.com/tutorial',
    },
    {
      id: '6',
      title: language === 'en' ? 'Video Lectures Playlist' : 'قائمة محاضرات الفيديو',
      type: 'link',
      uploadedBy: 'Dr. Sarah Chen',
      uploadDate: '2025-01-20',
      url: 'https://youtube.com/playlist',
    },
    {
      id: '7',
      title: language === 'en' ? 'Lab Manual' : 'دليل المعمل',
      type: 'document',
      uploadedBy: 'Dr. Sarah Chen',
      uploadDate: '2025-01-05',
      size: '0.5 MB',
      previewContent: {
        pages: 45,
        text: 'Laboratory exercises and practical assignments designed to complement theoretical concepts. Includes step-by-step instructions, sample code, and expected outcomes for each lab session.'
      }
    },
    {
      id: '8',
      title: language === 'en' ? 'Practice Problems' : 'مسائل تدريبية',
      type: 'document',
      uploadedBy: 'Teaching Assistant',
      uploadDate: '2025-01-08',
      size: '1.2 MB',
      previewContent: {
        pages: 78,
        text: 'A collection of practice problems ranging from beginner to advanced levels. Each problem includes detailed solutions and explanations to help students understand key concepts and prepare for assessments.'
      }
    },
    {
      id: '9',
      title: language === 'en' ? 'Midterm Study Guide' : 'دليل دراسة المنتصف',
      type: 'pdf',
      uploadedBy: 'Dr. Sarah Chen',
      uploadDate: '2025-02-01',
      size: '4.3 MB',
      previewContent: {
        pages: 92,
        text: 'Comprehensive study guide for the midterm examination covering chapters 1-6. Includes summary notes, practice questions, key formulas, and exam tips to maximize your preparation and performance.'
      }
    },
    {
      id: '10',
      title: language === 'en' ? 'Additional Exercises' : 'تمارين إضافية',
      type: 'link',
      uploadedBy: 'Teaching Assistant',
      uploadDate: '2025-02-05',
      url: 'https://example.com/exercises',
    },
  ];

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(7);
    const newToast: Toast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleDownload = async (resourceId: string, resourceTitle: string) => {
    if (downloadingResources.has(resourceId)) return;

    setDownloadingResources(prev => new Set(prev).add(resourceId));

    await new Promise(resolve => setTimeout(resolve, 1500));

    setDownloadingResources(prev => {
      const newSet = new Set(prev);
      newSet.delete(resourceId);
      return newSet;
    });

    showToast(t[language].downloadSuccess, 'success');
  };

  const handleOpenLink = async (url: string) => {
    if (!url) return;
    
    // Use fallback method directly to avoid Clipboard API permissions errors
    // This method works reliably across all browsers and contexts
    const copyToClipboard = (text: string): boolean => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      let success = false;
      try {
        success = document.execCommand('copy');
      } catch (err) {
        success = false;
      } finally {
        document.body.removeChild(textArea);
      }
      
      return success;
    };
    
    // Try the reliable fallback method first
    const copied = copyToClipboard(url);
    
    if (copied) {
      showToast(t[language].linkCopied, 'success');
    } else {
      // If that doesn't work, show the URL so user can copy manually
      showToast(url, 'success');
    }
  };

  const handleView = (resource: Resource) => {
    setSelectedResource(resource);
    setCurrentSlide(0);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'slide':
        return FileText;
      case 'pdf':
        return File;
      case 'link':
        return LinkIcon;
      case 'document':
        return FileText;
      case 'image':
        return Image;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'slide':
        return 'from-purple-500 to-purple-600';
      case 'pdf':
        return 'from-red-500 to-red-600';
      case 'link':
        return 'from-blue-500 to-blue-600';
      case 'document':
        return 'from-green-500 to-green-600';
      case 'image':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'slide':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20';
      case 'pdf':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20';
      case 'link':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
      case 'document':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20';
      case 'image':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20';
      default:
        return 'bg-gray-500/10 text-muted-foreground border border-border';
    }
  };

  return (
    <>
      <div className="space-y-4 md:space-y-6 w-full max-w-full">
        <div className="grid grid-cols-1 gap-4 w-full">
          {resources.map((resource) => {
            const Icon = getTypeIcon(resource.type);
            const isDownloading = downloadingResources.has(resource.id);
            
            return (
              <div
                key={resource.id}
                className="bg-card border border-border rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.01] w-full max-w-full"
              >
                <div className="flex items-start gap-3 md:gap-4 w-full">
                  <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${getTypeColor(resource.type)} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                    <Icon size={20} className="md:hidden" />
                    <Icon size={24} className="hidden md:block" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 md:gap-4 mb-2">
                      <h3 className="text-base md:text-lg text-foreground break-words overflow-wrap-anywhere flex-1">{resource.title}</h3>
                      <span className={`px-2 md:px-3 py-1 rounded-lg text-xs ${getTypeBadgeColor(resource.type)} whitespace-nowrap flex-shrink-0`}>
                        {resource.type.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User size={12} className="md:hidden flex-shrink-0" />
                        <User size={14} className="hidden md:block flex-shrink-0" />
                        <span className="truncate">{resource.uploadedBy}</span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Calendar size={12} className="md:hidden flex-shrink-0" />
                        <Calendar size={14} className="hidden md:block flex-shrink-0" />
                        <span>{resource.uploadDate}</span>
                      </div>
                      {resource.size && (
                        <span className="opacity-75 flex-shrink-0">{resource.size}</span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {resource.type === 'link' ? (
                        <button 
                          onClick={() => handleOpenLink(resource.url || '')}
                          className="group flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-all duration-200 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-ring hover:scale-105 active:scale-95 hover:shadow-lg motion-reduce:hover:scale-100"
                        >
                          <Copy size={14} className="transition-transform group-hover:scale-110 md:hidden flex-shrink-0" />
                          <Copy size={16} className="transition-transform group-hover:scale-110 hidden md:block flex-shrink-0" />
                          <span className="whitespace-nowrap">{t[language].openLink}</span>
                        </button>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleView(resource)}
                            className="group flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-secondary hover:bg-accent text-foreground rounded-lg transition-all duration-200 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-ring hover:scale-105 active:scale-95 hover:shadow-md motion-reduce:hover:scale-100"
                          >
                            <Eye size={14} className="transition-transform group-hover:scale-110 md:hidden flex-shrink-0" />
                            <Eye size={16} className="transition-transform group-hover:scale-110 hidden md:block flex-shrink-0" />
                            <span className="whitespace-nowrap">{t[language].view}</span>
                          </button>
                          <button 
                            onClick={() => handleDownload(resource.id, resource.title)}
                            disabled={isDownloading}
                            className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 hover:shadow-xl transition-all duration-200 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 motion-reduce:active:scale-100"
                          >
                            {isDownloading ? (
                              <Loader2 size={14} className="animate-spin md:hidden flex-shrink-0" />
                            ) : (
                              <Download size={14} className="md:hidden flex-shrink-0" />
                            )}
                            {isDownloading ? (
                              <Loader2 size={16} className="animate-spin hidden md:block flex-shrink-0" />
                            ) : (
                              <Download size={16} className="hidden md:block flex-shrink-0" />
                            )}
                            <span className="whitespace-nowrap">{isDownloading ? t[language].downloading : t[language].download}</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card rounded-2xl md:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-border">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-secondary/50">
              <div className="flex-1 min-w-0 mr-4">
                <h2 className="text-lg md:text-2xl text-foreground mb-1 truncate">{selectedResource.title}</h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {selectedResource.type === 'slide' ? t[language].slides : t[language].preview}
                </p>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-2 hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring flex-shrink-0"
                aria-label={t[language].close}
              >
                <X size={20} className="text-foreground md:w-6 md:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {selectedResource.type === 'slide' && selectedResource.previewContent?.slides ? (
                <div className="space-y-4 md:space-y-6">
                  {/* Current Slide Display */}
                  <div className="bg-secondary rounded-xl md:rounded-2xl p-6 md:p-8 min-h-[200px] md:min-h-[300px] flex items-center justify-center border border-border">
                    <div className="text-center">
                      <div className="text-4xl md:text-6xl mb-3 md:mb-4 text-primary">{currentSlide + 1}</div>
                      <h3 className="text-lg md:text-2xl text-foreground">{selectedResource.previewContent.slides[currentSlide]}</h3>
                    </div>
                  </div>

                  {/* Slide Navigation */}
                  <div className="flex items-center justify-between gap-4">
                    <button
                      onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                      disabled={currentSlide === 0}
                      className="flex items-center gap-2 px-3 md:px-4 py-2 bg-secondary hover:bg-accent text-foreground rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring text-sm md:text-base"
                    >
                      <ChevronLeft size={18} className="md:w-5 md:h-5" />
                      <span className="hidden sm:inline">{t[language].previous}</span>
                    </button>
                    
                    <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                      {t[language].slide} {currentSlide + 1} {t[language].of} {selectedResource.previewContent.slides.length}
                    </span>
                    
                    <button
                      onClick={() => setCurrentSlide(Math.min(selectedResource.previewContent!.slides!.length - 1, currentSlide + 1))}
                      disabled={currentSlide === selectedResource.previewContent.slides.length - 1}
                      className="flex items-center gap-2 px-3 md:px-4 py-2 bg-secondary hover:bg-accent text-foreground rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring text-sm md:text-base"
                    >
                      <span className="hidden sm:inline">{t[language].next}</span>
                      <ChevronRight size={18} className="md:w-5 md:h-5" />
                    </button>
                  </div>

                  {/* Slide Thumbnails */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-3">
                    {selectedResource.previewContent.slides.map((slide, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`p-2 md:p-3 rounded-lg border-2 transition-all text-xs md:text-sm text-center hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring ${
                          currentSlide === idx
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-secondary/50 text-muted-foreground'
                        }`}
                      >
                        <div className="text-xs mb-1">{idx + 1}</div>
                        <div className="text-xs truncate">{slide}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  {/* Document/PDF Preview */}
                  <div className="bg-secondary rounded-xl md:rounded-2xl p-6 md:p-8 border border-border">
                    <div className="flex flex-col sm:flex-row items-start gap-4 mb-4 md:mb-6">
                      <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${getTypeColor(selectedResource.type)} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                        <File size={24} className="md:w-8 md:h-8" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl text-foreground mb-2">{selectedResource.title}</h3>
                        {selectedResource.previewContent?.pages && (
                          <p className="text-sm md:text-base text-muted-foreground">
                            {selectedResource.previewContent.pages} {t[language].page + 's'}
                          </p>
                        )}
                      </div>
                    </div>
                    {selectedResource.previewContent?.text && (
                      <p className="text-sm md:text-base text-foreground/90 leading-relaxed">{selectedResource.previewContent.text}</p>
                    )}
                  </div>

                  {/* Mock Page Preview */}
                  {selectedResource.previewContent?.pages && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                      {[1, 2, 3].map((page) => (
                        <div
                          key={page}
                          className="bg-secondary border border-border rounded-lg p-4 aspect-[3/4] flex items-center justify-center"
                        >
                          <div className="text-center text-muted-foreground">
                            <FileText size={24} className="md:w-8 md:h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-xs md:text-sm">{t[language].page} {page}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 p-4 md:p-6 border-t border-border bg-secondary/50">
              <button
                onClick={() => handleDownload(selectedResource.id, selectedResource.title)}
                disabled={downloadingResources.has(selectedResource.id)}
                className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 text-sm md:text-base"
              >
                {downloadingResources.has(selectedResource.id) ? (
                  <Loader2 size={18} className="animate-spin md:w-5 md:h-5" />
                ) : (
                  <Download size={18} className="md:w-5 md:h-5" />
                )}
                {downloadingResources.has(selectedResource.id) ? t[language].downloading : t[language].download}
              </button>
              <button
                onClick={() => setSelectedResource(null)}
                className="px-4 md:px-6 py-2.5 md:py-3 bg-secondary hover:bg-accent text-foreground rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-ring active:scale-95 text-sm md:text-base"
              >
                {t[language].close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-sm transition-all duration-300 animate-in slide-in-from-right ${
              toast.type === 'success'
                ? 'bg-green-500/95 dark:bg-green-600/95 text-white border-green-400/50'
                : 'bg-red-500/95 dark:bg-red-600/95 text-white border-red-400/50'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && (
                <CheckCircle size={20} className="flex-shrink-0" />
              )}
              <span className="flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-white/80 hover:text-white transition-colors"
                aria-label="Close notification"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}