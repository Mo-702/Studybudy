import { Send, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Course } from '../MainLayout';

interface CourseChatViewProps {
  language: 'en' | 'ar';
  course: Course | null;
}

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  avatar: string;
}

export function CourseChatView({ language, course }: CourseChatViewProps) {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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
      chat: 'Course Chat',
      typePlaceholder: 'Type your message...',
      send: 'Send',
      today: 'Today',
      yesterday: 'Yesterday',
    },
    ar: {
      chat: 'محادثة المادة',
      typePlaceholder: 'اكتب رسالتك...',
      send: 'إرسال',
      today: 'اليوم',
      yesterday: 'أمس',
    },
  };

  const messages: Message[] = [
    {
      id: '1',
      sender: language === 'en' ? 'Ahmad Mohammed' : 'أحمد محمد',
      message: language === 'en'
        ? 'Hi everyone! Does anyone have the slides from last lecture?'
        : 'مرحبًا بالجميع! هل لدى أحد سلايدات المحاضرة الأخيرة؟',
      timestamp: '10:30 AM',
      avatar: 'A',
    },
    {
      id: '2',
      sender: language === 'en' ? 'Sarah Ali' : 'سارة علي',
      message: language === 'en'
        ? 'Yes, I uploaded them to the materials section!'
        : 'نعم، لقد رفعتها في قسم المواد!',
      timestamp: '10:35 AM',
      avatar: 'S',
    },
    {
      id: '3',
      sender: language === 'en' ? 'Mohammed Hassan' : 'محمد حسن',
      message: language === 'en'
        ? 'Can someone explain the concept from chapter 3?'
        : 'هل يمكن لأحد شرح المفهوم من الفصل الثالث؟',
      timestamp: '11:15 AM',
      avatar: 'M',
    },
    {
      id: '4',
      sender: language === 'en' ? 'Fatima Ahmed' : 'فاطمة أحمد',
      message: language === 'en'
        ? 'Sure! The main idea is that we need to consider the time complexity when designing algorithms.'
        : 'بالتأكيد! الفكرة الأساسية هي أننا بحاجة إلى النظر في التعقيد الزمني عند تصميم الخوارزميات.',
      timestamp: '11:20 AM',
      avatar: 'F',
    },
    {
      id: '5',
      sender: language === 'en' ? 'Omar Abdullah' : 'عمر عبدالله',
      message: language === 'en'
        ? 'Are we having a study group session this week?'
        : 'هل لدينا جلسة مجموعة دراسية هذا الأسبوع؟',
      timestamp: '2:45 PM',
      avatar: 'O',
    },
    {
      id: '6',
      sender: language === 'en' ? 'Layla Ibrahim' : 'ليلى إبراهيم',
      message: language === 'en'
        ? 'Yes! Check the Meetings page - we scheduled one for Thursday at 4 PM.'
        : 'نعم! تحقق من صفحة الاجتماعات - جدولنا واحدة يوم الخميس الساعة 4 مساءً.',
      timestamp: '2:50 PM',
      avatar: 'L',
    },
    {
      id: '7',
      sender: language === 'en' ? 'Khaled Youssef' : 'خالد يوسف',
      message: language === 'en'
        ? 'Thanks everyone for the help with the assignment!'
        : 'شكرًا للجميع على المساعدة في الواجب!',
      timestamp: '3:30 PM',
      avatar: 'K',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', messageText);
      setMessageText('');
      
      // Scroll to bottom after sending
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const getAvatarColor = (avatar: string) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-red-500 to-red-600',
    ];
    const index = avatar.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Scroll to bottom on mount
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, []);

  return (
    <div className="flex flex-col h-full w-full max-w-full bg-background rounded-2xl border border-border overflow-hidden">
      {/* Messages Container - Scrollable */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 w-full max-w-full"
      >
        {/* Date Divider */}
        <div className="flex items-center gap-3 md:gap-4 w-full">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-xs md:text-sm text-muted-foreground flex-shrink-0">{t[language].today}</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Messages */}
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-2 md:gap-3 w-full max-w-full">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br ${getAvatarColor(msg.avatar)} flex items-center justify-center text-white flex-shrink-0 text-sm md:text-base`}>
              {msg.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                <span className="text-foreground text-sm md:text-base break-words">{msg.sender}</span>
                <span className="text-xs md:text-sm text-muted-foreground flex-shrink-0">{msg.timestamp}</span>
              </div>
              <div className="bg-accent border border-border rounded-2xl rounded-tl-sm px-3 md:px-4 py-2.5 md:py-3 max-w-full">
                <p className="text-foreground text-sm md:text-base break-words overflow-wrap-anywhere">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Sticky at bottom */}
      <div className="sticky bottom-0 left-0 right-0 border-t border-border p-3 md:p-4 bg-card w-full max-w-full z-10" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 md:gap-3 w-full max-w-full">
          <div className="flex-1 relative min-w-0">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={t[language].typePlaceholder}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-input-background text-foreground rounded-xl border border-border focus:ring-2 focus:ring-ring outline-none transition-all text-sm md:text-base"
            />
          </div>
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring flex-shrink-0 active:scale-95"
            aria-label={t[language].send}
          >
            <Send size={18} className="md:hidden" />
            <Send size={20} className="hidden md:block" />
          </button>
        </form>
      </div>
    </div>
  );
}
