import { CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface InteractiveExamProps {
  material: any;
  language: 'en' | 'ar';
  t: any;
}

export function InteractiveExam({ material, language, t }: InteractiveExamProps) {
  const [mcqAnswers, setMcqAnswers] = useState<{[key: number]: number}>({});
  const [tfAnswers, setTfAnswers] = useState<{[key: number]: boolean}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mcqCorrectAnswers = [0, 1, 0, 1];
  const tfCorrectAnswers = [true, false, false, true];

  const mcqQuestions = language === 'en' ? [
    { q: 'What is the primary function of an operating system?', options: ['A) Manage hardware resources', 'B) Create documents', 'C) Browse the internet', 'D) Edit photos'] },
    { q: 'Which data structure uses LIFO principle?', options: ['A) Queue', 'B) Stack', 'C) Array', 'D) Tree'] },
    { q: 'What does SQL stand for?', options: ['A) Structured Query Language', 'B) Simple Question Logic', 'C) System Quality Level', 'D) Software Query List'] },
    { q: 'Which sorting algorithm has O(n log n) average time complexity?', options: ['A) Bubble Sort', 'B) Merge Sort', 'C) Selection Sort', 'D) Insertion Sort'] },
  ] : [
    { q: 'ما هي الوظيفة الأساسية لنظام التشغيل؟', options: ['أ) إدارة موارد الأجهزة', 'ب) إنشاء المستندات', 'ج) تصفح الإنترنت', 'د) تحرير الصور'] },
    { q: 'أي هيكل بيانات يستخدم مبدأ LIFO؟', options: ['أ) قائمة الانتظار', 'ب) المكدس', 'ج) المصفوفة', 'د) الشجرة'] },
    { q: 'ماذا يعني SQL؟', options: ['أ) لغة الاستعلام المهيكلة', 'ب) منطق الأسئلة البسيط', 'ج) مستوى جودة النظام', 'د) قائمة استعلام البرمجيات'] },
    { q: 'أي خوارزمية ترتيب لها تعقيد زمني O(n log n)؟', options: ['أ) الترتيب الفقاعي', 'ب) ترتيب الدمج', 'ج) ترتيب الاختيار', 'د) ترتيب الإدراج'] },
  ];

  const trueFalseQuestions = language === 'en' ? [
    'Binary search works only on sorted arrays.',
    'Python is a compiled programming language.',
    'RAM is a type of permanent storage.',
    'An algorithm with O(1) complexity is constant time.',
  ] : [
    'البحث الثنائي يعمل فقط على المصفوفات المرتبة.',
    'بايثون هي لغة برمجة مترجمة.',
    'ذاكرة RAM هي نوع من التخزين الدائم.',
    'خوارزمية بتعقيد O(1) هي زمن ثابت.',
  ];

  const handleMcqChange = (questionIndex: number, optionIndex: number) => {
    if (!isSubmitted) setMcqAnswers({ ...mcqAnswers, [questionIndex]: optionIndex });
  };

  const handleTfChange = (questionIndex: number, value: boolean) => {
    if (!isSubmitted) setTfAnswers({ ...tfAnswers, [questionIndex]: value });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    toast.success(
      language === 'en' 
        ? `Exam submitted! Score: ${score.totalScore}/${score.maxScore}` 
        : `تم تسليم الاختبار! النتيجة: ${score.totalScore}/${score.maxScore}`
    );
  };

  const calculateScore = () => {
    let mcqScore = 0; let tfScore = 0;
    mcqCorrectAnswers.forEach((correct, index) => { if (mcqAnswers[index] === correct) mcqScore++; });
    tfCorrectAnswers.forEach((correct, index) => { if (tfAnswers[index] === correct) tfScore++; });
    const totalScore = (mcqScore * 10) + (tfScore * 5);
    const maxScore = (mcqCorrectAnswers.length * 10) + (tfCorrectAnswers.length * 5);
    return { totalScore, maxScore, percentage: (totalScore / maxScore) * 100 };
  };

  const score = isSubmitted ? calculateScore() : null;

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Results Summary */}
      {isSubmitted && score && (
        <div className="bg-card rounded-3xl p-4 md:p-8 shadow-sm border-2 border-blue-500 mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white text-2xl md:text-3xl mb-4">
              {score.percentage >= 70 ? '🎉' : score.percentage >= 50 ? '✓' : '📚'}
            </div>
            <h2 className="text-xl md:text-3xl text-foreground mb-2">{language === 'en' ? 'Results' : 'النتائج'}</h2>
            <div className="text-3xl md:text-5xl text-blue-600 font-bold mb-2">{score.totalScore}/{score.maxScore}</div>
            <div className="text-lg md:text-2xl text-muted-foreground mb-4">{score.percentage.toFixed(1)}%</div>
          </div>
        </div>
      )}

      <div className="bg-card rounded-3xl p-4 md:p-8 shadow-sm border border-border">
        <h2 className="text-2xl md:text-3xl text-foreground mb-6 text-start">{t[language].examSections}</h2>

        {/* MCQ Section */}
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl text-red-600 mb-4 text-start">{t[language].multipleChoice}</h3>
          <div className="space-y-4">
            {mcqQuestions.map((item, index) => (
              <div key={index} className={`p-4 md:p-5 rounded-2xl border-2 ${isSubmitted ? (mcqAnswers[index] === mcqCorrectAnswers[index] ? 'bg-green-500/5 border-green-500' : 'bg-red-500/5 border-red-500') : 'bg-secondary border-transparent'}`}>
                <div className="flex gap-3 mb-4">
                   <p className="text-foreground text-sm md:text-base font-medium text-start">
                    <strong>Q{index + 1}.</strong> {item.q}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {item.options.map((option, i) => (
                    <label key={i} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border-2 transition-all ${mcqAnswers[index] === i ? 'border-blue-500 bg-blue-500/5' : 'border-border bg-card'}`}>
                      <input type="radio" className="w-4 h-4" checked={mcqAnswers[index] === i} onChange={() => handleMcqChange(index, i)} disabled={isSubmitted} />
                      <span className="text-sm md:text-base text-start flex-1 break-words">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* True/False Section */}
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl text-purple-600 mb-4 text-start">{t[language].trueFalse}</h3>
          <div className="space-y-4">
            {trueFalseQuestions.map((q, index) => (
              <div key={index} className="p-4 md:p-5 rounded-2xl bg-secondary border border-border">
                <p className="text-foreground mb-4 text-sm md:text-base text-start font-medium"><strong>Q{index + 1}.</strong> {q}</p>
                <div className="flex flex-wrap gap-3">
                  {[true, false].map((val) => (
                    <button key={val.toString()} onClick={() => handleTfChange(index, val)} disabled={isSubmitted}
                      className={`flex-1 min-w-[120px] p-3 rounded-xl border-2 transition-all ${tfAnswers[index] === val ? 'border-purple-500 bg-purple-500/10' : 'border-border bg-card'}`}>
                      {val ? (language === 'en' ? '⭕ True' : '⭕ صح') : (language === 'en' ? '❌ False' : '❌ خطأ')}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isSubmitted && (
          <button onClick={handleSubmit} className="w-full py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all">
            {language === 'en' ? 'Submit Exam' : 'تسليم الاختبار'}
          </button>
        )}
      </div>
    </div>
  );
}
