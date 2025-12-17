import { useState } from 'react';
import { Eye, EyeOff, Globe, Mail, Lock, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import logoImage from 'figma:asset/e19ab9dd58b183578a2b4114d27050536321ef11.png';
import { ThemeToggle } from '../ThemeToggle';

interface AuthScreenProps {
  onLogin: () => void;
  language: 'en' | 'ar';
  onLanguageChange: (lang: 'en' | 'ar') => void;
}

type AuthMode = 'login' | 'signup' | 'forgot' | 'verify' | 'reset';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const translations = {
  en: {
    welcome: 'Welcome to Study Buddy',
    subtitle: 'Your Academic Success Platform',
    login: 'Login',
    signup: 'Sign Up',
    forgotPassword: 'Forgot Password?',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    gpa: 'Current GPA',
    academicLevel: 'Current Level',
    major: 'Major',
    selectMajor: 'Select your major',
    selectLevel: 'Select your level',
    rememberMe: 'Remember me',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    resetPassword: 'Reset Password',
    backToLogin: 'Back to Login',
    sendReset: 'Send Reset Code',
    continue: 'Continue',
    verifyCode: 'Verify Code',
    enterCode: 'Enter Verification Code',
    codeInstructions: 'Enter the 6-digit code sent to',
    resendCode: 'Resend Code',
    didntReceive: "Didn't receive the code?",
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    resetPasswordTitle: 'Set New Password',
    resetPasswordSubtitle: 'Create a strong password for your account',
    resetSuccess: 'Password reset successfully!',
    codeSent: 'Verification code sent to your email',
    codeVerified: 'Code verified successfully',
    invalidCode: 'Invalid verification code',
    passwordMismatch: 'Passwords do not match',
    invalidEmail: 'Please enter a valid email',
    sending: 'Sending...',
    verifying: 'Verifying...',
    resetting: 'Resetting...',
  },
  ar: {
    welcome: 'مرحباً بك في Study Buddy',
    subtitle: 'منصتك الأكاديمية للنجاح',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    forgotPassword: 'نسيت كلمة المرور؟',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    fullName: 'الاسم الكامل',
    gpa: 'المعدل التراكمي الحالي',
    academicLevel: 'المستوى الحالي',
    major: 'التخصص',
    selectMajor: 'اختر تخصصك',
    selectLevel: 'اختر مستواك',
    rememberMe: 'تذكرني',
    noAccount: 'ليس لديك حساب؟',
    haveAccount: 'لديك حساب بالفعل؟',
    resetPassword: 'إعادة تعيين كلمة المرور',
    backToLogin: 'العودة لتسجيل الدخول',
    sendReset: 'إرسال رمز التحقق',
    continue: 'متابعة',
    verifyCode: 'تحقق من الرمز',
    enterCode: 'أدخل رمز التحقق',
    codeInstructions: 'أدخل الرمز المكون من 6 أرقام المرسل إلى',
    resendCode: 'إعادة إرسال الرمز',
    didntReceive: 'لم تستلم الرمز؟',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    resetPasswordTitle: 'تعيين كلمة مرور جديدة',
    resetPasswordSubtitle: 'أنشئ كلمة مرور قوية لحسابك',
    resetSuccess: 'تم إعادة تعيين كلمة المرور بنجاح!',
    codeSent: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني',
    codeVerified: 'تم التحقق من الرمز بنجاح',
    invalidCode: 'رمز التحقق غير صحيح',
    passwordMismatch: 'كلمات المرور غير متطابقة',
    invalidEmail: 'الرجاء إدخال بريد إلكتروني صحيح',
    sending: 'جاري الإرسال...',
    verifying: 'جاري التحقق...',
    resetting: 'جاري إعادة التعيين...',
  },
};

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

export function AuthScreen({ onLogin, language, onLanguageChange }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const t = translations[language];
  const isRTL = language === 'ar';

  // Toast system
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substring(7);
    const newToast: Toast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Handle forgot password - send reset code
  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      showToast(t.invalidEmail, 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    showToast(t.codeSent, 'success');
    setMode('verify');
  };

  // Handle verification code input
  const handleCodeInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only digits
    
    const newCode = [...verificationCode];
    newCode[index] = value.slice(-1); // Only last digit
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle code verification
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const code = verificationCode.join('');
    if (code.length !== 6) {
      showToast(t.invalidCode, 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - in real app, verify with backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success (in real app, check response)
    const isValid = code === '123456' || code.length === 6; // Mock validation
    
    setIsLoading(false);
    
    if (isValid) {
      showToast(t.codeVerified, 'success');
      setMode('reset');
    } else {
      showToast(t.invalidCode, 'error');
    }
  };

  // Handle password reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      showToast(t.passwordMismatch, 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast(language === 'en' ? 'Password must be at least 6 characters' : 'يجب أن تكون كلمة المرور 6 أحرف على الأقل', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    showToast(t.resetSuccess, 'success');
    
    // Reset state and go back to login after 1 second
    setTimeout(() => {
      setMode('login');
      setEmail('');
      setVerificationCode(['', '', '', '', '', '']);
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  // Resend verification code
  const handleResendCode = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    showToast(t.codeSent, 'success');
    setVerificationCode(['', '', '', '', '', '']);
  };

  // Render forgot password form
  const renderForgotPasswordForm = () => (
    <form className="space-y-5" onSubmit={handleSendResetCode}>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Mail className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" size={20} />
          <p className="text-sm text-blue-900 dark:text-blue-100">
            {language === 'en' 
              ? 'Enter your email address and we\'ll send you a verification code to reset your password.' 
              : 'أدخل عنوان بريدك الإلكتروني وسنرسل لك رمز التحقق لإعادة تعيين كلمة المرور.'}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-foreground mb-2 text-sm md:text-base">{t.email}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
          placeholder={language === 'en' ? 's44411454@uqu.edu.sa' : 's44411454@uqu.edu.sa'}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            {t.sending}
          </>
        ) : (
          t.sendReset
        )}
      </button>

      <button
        type="button"
        onClick={() => setMode('login')}
        className="w-full text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 py-2"
      >
        <ArrowLeft size={18} />
        {t.backToLogin}
      </button>
    </form>
  );

  // Render verification code form
  const renderVerificationForm = () => (
    <form className="space-y-5" onSubmit={handleVerifyCode}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="text-white" size={32} />
        </div>
        <p className="text-sm text-muted-foreground">
          {t.codeInstructions}
        </p>
        <p className="text-foreground mt-2">{email}</p>
      </div>

      <div>
        <label className="block text-foreground mb-3 text-center text-sm md:text-base">{t.enterCode}</label>
        <div className="flex gap-2 justify-center">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeInput(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !digit && index > 0) {
                  const prevInput = document.getElementById(`code-${index - 1}`);
                  prevInput?.focus();
                }
              }}
              className="w-12 h-12 md:w-14 md:h-14 text-center text-xl md:text-2xl bg-secondary border-2 border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-primary outline-none transition-all text-foreground"
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || verificationCode.join('').length !== 6}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            {t.verifying}
          </>
        ) : (
          t.verifyCode
        )}
      </button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">{t.didntReceive}</p>
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isLoading}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm disabled:opacity-60"
        >
          {t.resendCode}
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          setMode('forgot');
          setVerificationCode(['', '', '', '', '', '']);
        }}
        className="w-full text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 py-2"
      >
        <ArrowLeft size={18} />
        {t.backToLogin}
      </button>
    </form>
  );

  // Render reset password form
  const renderResetPasswordForm = () => (
    <form className="space-y-5" onSubmit={handleResetPassword}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="text-white" size={32} />
        </div>
        <h3 className="text-xl text-foreground mb-2">{t.resetPasswordTitle}</h3>
        <p className="text-sm text-muted-foreground">{t.resetPasswordSubtitle}</p>
      </div>

      <div>
        <label className="block text-foreground mb-2 text-sm md:text-base">{t.newPassword}</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all pr-12 text-foreground placeholder:text-muted-foreground"
            placeholder="••••••••"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-foreground mb-2 text-sm md:text-base">{t.confirmPassword}</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all pr-12 text-foreground placeholder:text-muted-foreground"
            placeholder="••••••••"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {newPassword && confirmPassword && newPassword !== confirmPassword && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
          <p className="text-sm text-red-700 dark:text-red-400">{t.passwordMismatch}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            {t.resetting}
          </>
        ) : (
          t.resetPassword
        )}
      </button>
    </form>
  );

  // Render standard login/signup form
  const renderAuthForm = () => (
    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
      {/* Full Name - signup only */}
      {mode === 'signup' && (
        <div>
          <label className="block text-foreground mb-2 text-sm md:text-base">{t.fullName}</label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
            placeholder={language === 'en' ? 'Yousef Hakeem' : 'يوسف حكيم'}
          />
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-foreground mb-2 text-sm md:text-base">{t.email}</label>
        <input
          type="email"
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
          placeholder={language === 'en' ? 's44411454@uqu.edu.sa' : 's44411454@uqu.edu.sa'}
        />
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-foreground text-sm md:text-base">{t.password}</label>
          {mode === 'login' && (
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t.forgotPassword}
            </button>
          )}
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all pr-12 text-foreground placeholder:text-muted-foreground"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* GPA - signup only */}
      {mode === 'signup' && (
        <div>
          <label className="block text-foreground mb-2 text-sm md:text-base">{t.gpa}</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
            placeholder={language === 'en' ? 'e.g. 3.85' : 'مثال: 3.85'}
          />
        </div>
      )}

      {/* Major - signup only */}
      {mode === 'signup' && (
        <div>
          <label className="block text-foreground mb-2 text-sm md:text-base">{t.major}</label>
          <select className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground">
            <option value="">{t.selectMajor}</option>
            {majors[language].map((major, index) => (
              <option key={index} value={major}>{major}</option>
            ))}
          </select>
        </div>
      )}

      {/* Academic Level - signup only */}
      {mode === 'signup' && (
        <div>
          <label className="block text-foreground mb-2 text-sm md:text-base">{t.academicLevel}</label>
          <select className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground">
            <option value="">{t.selectLevel}</option>
            <option value="1">{language === 'en' ? 'Level 1' : 'المستوى الأول'}</option>
            <option value="2">{language === 'en' ? 'Level 2' : 'المستوى الثاني'}</option>
            <option value="3">{language === 'en' ? 'Level 3' : 'المستوى الثالث'}</option>
            <option value="4">{language === 'en' ? 'Level 4' : 'المستوى الرابع'}</option>
            <option value="5">{language === 'en' ? 'Level 5' : 'المستوى الخامس'}</option>
          </select>
        </div>
      )}

      {/* Remember Me - login only */}
      {mode === 'login' && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 rounded border-border text-blue-600 focus:ring-2 focus:ring-ring"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">
            {t.rememberMe}
          </label>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
      >
        {mode === 'login' ? t.login : t.signup}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 [html[data-theme='dark']_&]:from-[#0F1220] [html[data-theme='dark']_&]:via-[#0F1220] [html[data-theme='dark']_&]:to-[#1E2140] flex items-center justify-center p-4 md:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Language and Theme Toggles */}
      <div className="fixed top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 md:gap-3 z-50">
        <ThemeToggle language={language} variant="icon" />
        <button
          onClick={() => onLanguageChange(language === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
        >
          <Globe size={18} className="text-muted-foreground md:w-5 md:h-5" />
          <span className="text-foreground hidden sm:inline">{language === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 xl:p-12 text-white flex-col justify-center min-h-[500px] xl:min-h-[600px]">
          {/* Centered Logo with Rounded Corners */}
          <div className="flex justify-center mb-8">
            <div className="rounded-[20px] overflow-hidden">
              <img src={logoImage} alt="Study Buddy" className="w-32 xl:w-48 h-auto" />
            </div>
          </div>
          
          <h1 className="text-4xl xl:text-5xl mb-4">{t.welcome}</h1>
          <p className="text-lg xl:text-xl text-blue-100 mb-8">{t.subtitle}</p>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📚
              </div>
              <div>
                <h3 className="text-lg xl:text-xl mb-2">{language === 'en' ? 'Course Materials' : 'محتوى المواد'}</h3>
                <p className="text-sm xl:text-base text-blue-100">{language === 'en' ? 'Access exams, summaries, slides & assignments' : 'الوصول للاختبارات والملخصات والواجبات'}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🤖
              </div>
              <div>
                <h3 className="text-lg xl:text-xl mb-2">{language === 'en' ? 'AI Assistant' : 'المساعد الذكي'}</h3>
                <p className="text-sm xl:text-base text-blue-100">{language === 'en' ? 'Get instant help with your studies' : 'احصل على مساعدة فورية في دراستك'}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📅
              </div>
              <div>
                <h3 className="text-lg xl:text-xl mb-2">{language === 'en' ? 'Meetings & Collaboration' : 'الاجتماعات والتعاون'}</h3>
                <p className="text-sm xl:text-base text-blue-100">{language === 'en' ? 'Connect with peers and study together' : 'تواصل مع زملائك وادرس معهم'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl">
          <h2 className="text-2xl md:text-3xl text-foreground mb-2">
            {mode === 'login' && t.login}
            {mode === 'signup' && t.signup}
            {mode === 'forgot' && t.resetPassword}
            {mode === 'verify' && t.verifyCode}
            {mode === 'reset' && t.resetPassword}
          </h2>
          
          {(mode === 'login' || mode === 'signup') && (
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
              {mode === 'login' ? t.noAccount : t.haveAccount}
              {' '}
              <button
                onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {mode === 'login' ? t.signup : t.login}
              </button>
            </p>
          )}

          {mode === 'login' || mode === 'signup' ? renderAuthForm() : null}
          {mode === 'forgot' ? renderForgotPasswordForm() : null}
          {mode === 'verify' ? renderVerificationForm() : null}
          {mode === 'reset' ? renderResetPasswordForm() : null}
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 left-4 md:left-auto md:right-4 z-50 space-y-2 max-w-md">
        {toasts.map(toast => (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-2xl border backdrop-blur-sm transition-all duration-300 animate-in slide-in-from-right ${
              toast.type === 'success'
                ? 'bg-green-500/95 dark:bg-green-600/95 text-white border-green-400/50'
                : toast.type === 'error'
                ? 'bg-red-500/95 dark:bg-red-600/95 text-white border-red-400/50'
                : 'bg-blue-500/95 dark:bg-blue-600/95 text-white border-blue-400/50'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && (
                <CheckCircle size={20} className="flex-shrink-0" />
              )}
              {toast.type === 'error' && (
                <span className="text-xl flex-shrink-0">⚠️</span>
              )}
              {toast.type === 'info' && (
                <Mail size={20} className="flex-shrink-0" />
              )}
              <span className="flex-1 text-sm md:text-base">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-white/80 hover:text-white transition-colors"
                aria-label="Close notification"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}