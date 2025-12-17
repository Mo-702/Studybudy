import { CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface InteractiveExamProps {
  material: any;
  language: 'en' | 'ar';
  t: any;
}

export function InteractiveExam({ material, language, t }: InteractiveExamProps) {
  // State for answers and submission
  const [mcqAnswers, setMcqAnswers] = useState<{[key: number]: number}>({});
  const [tfAnswers, setTfAnswers] = useState<{[key: number]: boolean}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Correct answers (index of correct option for MCQ, boolean for T/F)
  const mcqCorrectAnswers = [0, 1, 0, 1]; // A, B, A, B
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
    if (!isSubmitted) {
      setMcqAnswers({ ...mcqAnswers, [questionIndex]: optionIndex });
    }
  };

  const handleTfChange = (questionIndex: number, value: boolean) => {
    if (!isSubmitted) {
      setTfAnswers({ ...tfAnswers, [questionIndex]: value });
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Calculate score
    let mcqScore = 0;
    let tfScore = 0;
    mcqCorrectAnswers.forEach((correct, index) => {
      if (mcqAnswers[index] === correct) mcqScore++;
    });
    tfCorrectAnswers.forEach((correct, index) => {
      if (tfAnswers[index] === correct) tfScore++;
    });
    const totalScore = (mcqScore * 10) + (tfScore * 5); // 10 marks per MCQ, 5 per T/F
    const maxScore = (mcqCorrectAnswers.length * 10) + (tfCorrectAnswers.length * 5);
    
    toast.success(
      language === 'en' 
        ? `Exam submitted! Score: ${totalScore}/${maxScore}` 
        : `تم تسليم الاختبار! النتيجة: ${totalScore}/${maxScore}`,
      { duration: 3000 }
    );
  };

  const getMcqFeedback = (questionIndex: number) => {
    if (!isSubmitted) return null;
    const userAnswer = mcqAnswers[questionIndex];
    const correctAnswer = mcqCorrectAnswers[questionIndex];
    return userAnswer === correctAnswer;
  };

  const getTfFeedback = (questionIndex: number) => {
    if (!isSubmitted) return null;
    const userAnswer = tfAnswers[questionIndex];
    const correctAnswer = tfCorrectAnswers[questionIndex];
    return userAnswer === correctAnswer;
  };

  const calculateScore = () => {
    let mcqScore = 0;
    let tfScore = 0;
    mcqCorrectAnswers.forEach((correct, index) => {
      if (mcqAnswers[index] === correct) mcqScore++;
    });
    tfCorrectAnswers.forEach((correct, index) => {
      if (tfAnswers[index] === correct) tfScore++;
    });
    const totalScore = (mcqScore * 10) + (tfScore * 5);
    const maxScore = (mcqCorrectAnswers.length * 10) + (tfCorrectAnswers.length * 5);
    return { totalScore, maxScore, percentage: (totalScore / maxScore) * 100 };
  };

  const score = isSubmitted ? calculateScore() : null;

  return (
    <div className="space-y-6">
      {/* Results Summary (shown after submission) */}
      {isSubmitted && score && (
        <div className="bg-card rounded-3xl p-8 shadow-sm border-2 border-blue-500">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white text-3xl mb-4">
              {score.percentage >= 70 ? '🎉' : score.percentage >= 50 ? '✓' : '📚'}
            </div>
            <h2 className="text-3xl text-foreground mb-2">
              {language === 'en' ? 'Exam Results' : 'نتائج الاختبار'}
            </h2>
            <div className="text-5xl text-blue-600 dark:text-blue-400 mb-2">
              {score.totalScore}/{score.maxScore}
            </div>
            <div className="text-2xl text-muted-foreground mb-4">
              {score.percentage.toFixed(1)}%
            </div>
            <div className={`inline-block px-6 py-2 rounded-xl text-lg ${
              score.percentage >= 70 ? 'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20' :
              score.percentage >= 50 ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20' :
              'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20'
            }`}>
              {score.percentage >= 70 
                ? (language === 'en' ? 'Excellent!' : 'ممتاز!')
                : score.percentage >= 50
                ? (language === 'en' ? 'Good' : 'جيد')
                : (language === 'en' ? 'Needs Improvement' : 'يحتاج تحسين')}
            </div>
          </div>
        </div>
      )}

      <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
        <h2 className="text-3xl text-foreground mb-6">{t[language].examSections}</h2>

        {/* Multiple Choice */}
        <div className="mb-8">
          <h3 className="text-2xl text-red-600 mb-4">{t[language].multipleChoice} (40 {language === 'en' ? 'marks' : 'درجة'})</h3>
          <div className="space-y-4">
            {mcqQuestions.map((item: any, index: number) => {
              const isCorrect = getMcqFeedback(index);
              const userAnswer = mcqAnswers[index];
              const correctAnswer = mcqCorrectAnswers[index];
              
              return (
                <div 
                  key={index} 
                  className={`p-5 rounded-2xl transition-all border-2 ${
                    isSubmitted 
                      ? isCorrect 
                        ? 'bg-green-500/10 border-green-500' 
                        : userAnswer !== undefined
                        ? 'bg-red-500/10 border-red-500'
                        : 'bg-secondary border-border'
                      : 'bg-secondary border-border hover:border-accent'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {isSubmitted && (
                      <div className="flex-shrink-0 mt-1">
                        {isCorrect ? (
                          <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                        ) : userAnswer !== undefined ? (
                          <XCircle className="text-red-600 dark:text-red-400" size={24} />
                        ) : (
                          <div className="w-6 h-6" />
                        )}
                      </div>
                    )}
                    <p className="text-foreground flex-1">
                      <strong>Q{index + 1}.</strong> {item.q}
                    </p>
                  </div>
                  
                  <div className="space-y-2 ml-9">
                    {item.options.map((option: string, i: number) => {
                      const isSelected = mcqAnswers[index] === i;
                      const isCorrectOption = correctAnswer === i;
                      
                      return (
                        <label
                          key={i}
                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 ${
                            isSubmitted
                              ? isCorrectOption
                                ? 'bg-green-500/10 border-green-500 dark:bg-green-500/20'
                                : isSelected && !isCorrectOption
                                ? 'bg-red-500/10 border-red-500 dark:bg-red-500/20'
                                : 'bg-card border-border'
                              : isSelected
                              ? 'bg-blue-500/10 border-blue-500 dark:bg-blue-500/20'
                              : 'bg-card border-border hover:bg-accent'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`mcq-${index}`}
                            checked={isSelected}
                            onChange={() => handleMcqChange(index, i)}
                            disabled={isSubmitted}
                            className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className={`flex-1 ${
                            isSubmitted && isCorrectOption
                              ? 'text-green-700 dark:text-green-300'
                              : isSubmitted && isSelected && !isCorrectOption
                              ? 'text-red-700 dark:text-red-300'
                              : 'text-foreground'
                          }`}>
                            {option}
                            {isSubmitted && isCorrectOption && (
                              <span className="ml-2 text-green-600 dark:text-green-400">✓ {language === 'en' ? 'Correct' : 'صحيح'}</span>
                            )}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  
                  {isSubmitted && (
                    <div className={`mt-3 p-3 rounded-lg text-sm ml-9 ${
                      isCorrect ? 'bg-green-500/10 text-green-800 dark:text-green-300 border border-green-500/20' : 'bg-red-500/10 text-red-800 dark:text-red-300 border border-red-500/20'
                    }`}>
                      {isCorrect 
                        ? (language === 'en' ? '✓ Your answer is correct!' : '✓ إجابتك صحيحة!')
                        : (language === 'en' 
                          ? `✗ Incorrect. The correct answer is option ${String.fromCharCode(65 + correctAnswer)}.`
                          : `✗ خطأ. الإجابة الصحيحة هي الخيار ${String.fromCharCode(1571 + correctAnswer)}.`)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* True/False */}
        <div className="mb-8">
          <h3 className="text-2xl text-purple-600 mb-4">{t[language].trueFalse} (20 {language === 'en' ? 'marks' : 'درجة'})</h3>
          <div className="space-y-4">
            {trueFalseQuestions.map((q: string, index: number) => {
              const isCorrect = getTfFeedback(index);
              const userAnswer = tfAnswers[index];
              const correctAnswer = tfCorrectAnswers[index];
              
              return (
                <div 
                  key={index}
                  className={`p-5 rounded-2xl transition-all border-2 ${
                    isSubmitted 
                      ? isCorrect 
                        ? 'bg-green-500/10 border-green-500' 
                        : userAnswer !== undefined
                        ? 'bg-red-500/10 border-red-500'
                        : 'bg-secondary border-border'
                      : 'bg-secondary border-border hover:border-accent'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {isSubmitted && (
                      <div className="flex-shrink-0 mt-1">
                        {isCorrect ? (
                          <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                        ) : userAnswer !== undefined ? (
                          <XCircle className="text-red-600 dark:text-red-400" size={24} />
                        ) : (
                          <div className="w-6 h-6" />
                        )}
                      </div>
                    )}
                    <p className="text-foreground flex-1">
                      <strong>Q{index + 1}.</strong> {q}
                    </p>
                  </div>
                  
                  <div className="flex gap-4 ml-9">
                    <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer transition-all border-2 ${
                      isSubmitted
                        ? correctAnswer === true
                          ? 'bg-green-500/10 border-green-500 dark:bg-green-500/20'
                          : tfAnswers[index] === true && correctAnswer !== true
                          ? 'bg-red-500/10 border-red-500 dark:bg-red-500/20'
                          : 'bg-card border-border'
                        : tfAnswers[index] === true
                        ? 'bg-blue-500/10 border-blue-500 dark:bg-blue-500/20'
                        : 'bg-card border-border hover:bg-accent'
                    }`}>
                      <input
                        type="radio"
                        name={`tf-${index}`}
                        checked={tfAnswers[index] === true}
                        onChange={() => handleTfChange(index, true)}
                        disabled={isSubmitted}
                        className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className={`${
                        isSubmitted && correctAnswer === true
                          ? 'text-green-700 dark:text-green-300'
                          : isSubmitted && tfAnswers[index] === true && correctAnswer !== true
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-foreground'
                      }`}>
                        ⭕ {language === 'en' ? 'True' : 'صح'}
                      </span>
                    </label>
                    
                    <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer transition-all border-2 ${
                      isSubmitted
                        ? correctAnswer === false
                          ? 'bg-green-500/10 border-green-500 dark:bg-green-500/20'
                          : tfAnswers[index] === false && correctAnswer !== false
                          ? 'bg-red-500/10 border-red-500 dark:bg-red-500/20'
                          : 'bg-card border-border'
                        : tfAnswers[index] === false
                        ? 'bg-blue-500/10 border-blue-500 dark:bg-blue-500/20'
                        : 'bg-card border-border hover:bg-accent'
                    }`}>
                      <input
                        type="radio"
                        name={`tf-${index}`}
                        checked={tfAnswers[index] === false}
                        onChange={() => handleTfChange(index, false)}
                        disabled={isSubmitted}
                        className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className={`${
                        isSubmitted && correctAnswer === false
                          ? 'text-green-700 dark:text-green-300'
                          : isSubmitted && tfAnswers[index] === false && correctAnswer !== false
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-foreground'
                      }`}>
                        ❌ {language === 'en' ? 'False' : 'خطأ'}
                      </span>
                    </label>
                  </div>
                  
                  {isSubmitted && (
                    <div className={`mt-3 p-3 rounded-lg text-sm ml-9 ${
                      isCorrect ? 'bg-green-500/10 text-green-800 dark:text-green-300 border border-green-500/20' : 'bg-red-500/10 text-red-800 dark:text-red-300 border border-red-500/20'
                    }`}>
                      {isCorrect 
                        ? (language === 'en' ? '✓ Your answer is correct!' : '✓ إجابتك صحيحة!')
                        : (language === 'en' 
                          ? `✗ Incorrect. The correct answer is ${correctAnswer ? 'True' : 'False'}.`
                          : `✗ خطأ. الإجابة الصحيحة هي ${correctAnswer ? 'صح' : 'خطأ'}.`)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="flex justify-center pt-6">
            <button
              onClick={handleSubmit}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-lg"
            >
              {language === 'en' ? '📝 Submit Exam' : '📝 تسليم الاختبار'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
