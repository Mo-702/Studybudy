import { Bot, Send, Sparkles, BookOpen, FileText, HelpCircle, Lightbulb } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface AIAssistantViewProps {
  language: 'en' | 'ar';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIAssistantView({ language }: AIAssistantViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'en' 
        ? "Hello! I'm your AI study assistant. I can help you with explanations, summaries, practice questions, and more. How can I help you today?"
        : 'مرحباً! أنا مساعدك الذكي للدراسة. يمكنني مساعدتك في الشرح والتلخيص وتوليد الأسئلة والمزيد. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      title: 'AI Assistant',
      subtitle: 'Your intelligent study companion',
      typeMessage: 'Type your question...',
      quickActions: 'Quick Actions',
      explainLesson: 'Explain a Lesson',
      summarize: 'Summarize Content',
      generateQuestions: 'Generate Questions',
      studyPlan: 'Create Study Plan',
      send: 'Send',
    },
    ar: {
      title: 'المساعد الذكي',
      subtitle: 'رفيقك الذكي للدراسة',
      typeMessage: 'اكتب سؤالك...',
      quickActions: 'إجراءات سريعة',
      explainLesson: 'شرح الدرس',
      summarize: 'تلخيص المحتوى',
      generateQuestions: 'توليد أسئلة',
      studyPlan: 'إنشاء خطة مذاكرة',
      send: 'إرسال',
    },
  };

  const quickActions = [
    {
      id: 'explain',
      label: t[language].explainLesson,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      prompt: language === 'en' ? 'Can you explain [topic] to me?' : 'هل يمكنك شرح [الموضوع] لي؟',
    },
    {
      id: 'summarize',
      label: t[language].summarize,
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      prompt: language === 'en' ? 'Please summarize [content]' : 'من فضلك لخص [المحتوى]',
    },
    {
      id: 'questions',
      label: t[language].generateQuestions,
      icon: HelpCircle,
      color: 'from-green-500 to-green-600',
      prompt: language === 'en' ? 'Generate practice questions for [topic]' : 'أنشئ أسئلة تدريبية لـ [الموضوع]',
    },
    {
      id: 'plan',
      label: t[language].studyPlan,
      icon: Lightbulb,
      color: 'from-orange-500 to-orange-600',
      prompt: language === 'en' ? 'Help me create a study plan for [exam]' : 'ساعدني في إنشاء خطة مذاكرة لـ [الاختبار]',
    },
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Scroll to bottom after sending
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'en'
          ? "I understand your question. Let me help you with that. [This is a simulated response. In a real implementation, this would connect to an AI service.]"
          : 'أفهم سؤالك. دعني أساعدك في ذلك. [هذه استجابة محاكاة. في التطبيق الفعلي، سيتم الاتصال بخدمة الذكاء الاصطناعي.]',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      
      // Scroll to bottom after AI response
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1000);
  };

  const handleQuickAction = (prompt: string) => {
    setInputMessage(prompt);
  };

  // Scroll to bottom on mount
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, []);

  return (
    <div className="h-screen bg-background flex flex-col w-full max-w-full overflow-x-hidden">
      {/* Header - Fixed at top */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 md:px-6 lg:px-8 py-4 md:py-6 flex-shrink-0 w-full max-w-full">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
            <Bot size={24} className="md:hidden" />
            <Bot size={32} className="hidden md:block" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl mb-1 truncate">{t[language].title}</h1>
            <p className="text-blue-100 text-sm md:text-base truncate">{t[language].subtitle}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions - Fixed below header */}
      <div className="bg-card border-b border-border px-4 md:px-6 lg:px-8 py-3 md:py-4 w-full max-w-full flex-shrink-0">
        <h2 className="text-sm md:text-base lg:text-lg text-foreground mb-2 md:mb-3">{t[language].quickActions}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 w-full">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.prompt)}
                className="p-2.5 md:p-3 lg:p-4 bg-secondary hover:bg-accent rounded-xl md:rounded-2xl transition-all text-left w-full active:scale-95"
              >
                <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${action.color} rounded-lg md:rounded-xl flex items-center justify-center text-white mb-2`}>
                  <Icon size={16} className="md:hidden" />
                  <Icon size={20} className="hidden md:block lg:hidden" />
                  <Icon size={24} className="hidden lg:block" />
                </div>
                <p className="text-foreground text-xs md:text-sm lg:text-base break-words">{action.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area - Scrollable middle section */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 w-full max-w-full"
      >
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] lg:max-w-[70%] rounded-2xl md:rounded-3xl p-3 md:p-4 lg:p-6 break-words overflow-wrap-anywhere ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-card border border-border shadow-sm text-foreground'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <Sparkles size={16} className="text-purple-500 md:hidden flex-shrink-0" />
                    <Sparkles size={18} className="text-purple-500 hidden md:block lg:hidden flex-shrink-0" />
                    <Sparkles size={20} className="text-purple-500 hidden lg:block flex-shrink-0" />
                    <span className="text-purple-600 dark:text-purple-400 text-xs md:text-sm lg:text-base">AI Assistant</span>
                  </div>
                )}
                <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base break-words">{message.content}</p>
                <p
                  className={`text-xs mt-2 md:mt-3 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Sticky at bottom with iOS safe area */}
      <div 
        className="sticky bottom-0 left-0 right-0 bg-card border-t border-border px-4 md:px-6 lg:px-8 py-3 md:py-4 w-full max-w-full flex-shrink-0 z-10"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="max-w-4xl mx-auto flex gap-2 md:gap-3 lg:gap-4 w-full">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t[language].typeMessage}
            className="flex-1 px-3 md:px-4 lg:px-6 py-2.5 md:py-3 lg:py-4 bg-secondary rounded-xl md:rounded-2xl border-none focus:ring-2 focus:ring-ring outline-none text-foreground placeholder:text-muted-foreground text-sm md:text-base min-w-0"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className={`px-3 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 rounded-xl md:rounded-2xl transition-all flex items-center justify-center gap-2 flex-shrink-0 active:scale-95 ${
              inputMessage.trim()
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                : 'bg-secondary text-muted-foreground cursor-not-allowed'
            }`}
            aria-label={t[language].send}
          >
            <span className="hidden sm:inline text-sm md:text-base">{t[language].send}</span>
            <Send size={16} className="md:hidden" />
            <Send size={18} className="hidden md:block lg:hidden" />
            <Send size={20} className="hidden lg:block" />
          </button>
        </div>
      </div>
    </div>
  );
}
