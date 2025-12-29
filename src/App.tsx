import { useState, useEffect } from 'react';
import { AuthScreen } from './components/desktop/AuthScreen';
import { MainLayout } from './components/desktop/MainLayout';
import { Toaster, toast } from 'sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import { Trophy, Medal, Award } from 'lucide-react';

// 1. تعريف أنواع البيانات (Interfaces)
interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  initials: string;
  color: string;
}

// 2. البيانات الوهمية للـ Leaderboard
const leaderboardData: LeaderboardUser[] = [
  { rank: 1, name: 'Sarah Chen', points: 2847, initials: 'SC', color: 'from-yellow-400 to-yellow-500' },
  { rank: 2, name: 'Michael Torres', points: 2634, initials: 'MT', color: 'from-gray-300 to-gray-400' },
  { rank: 3, name: 'Emma Wilson', points: 2521, initials: 'EW', color: 'from-orange-400 to-orange-500' },
  { rank: 4, name: 'Alex Kumar', points: 2318, initials: 'AK', color: 'from-blue-400 to-blue-500' },
  { rank: 5, name: 'Lisa Anderson', points: 2205, initials: 'LA', color: 'from-purple-400 to-purple-500' },
  { rank: 6, name: 'James Park', points: 2089, initials: 'JP', color: 'from-green-400 to-green-500' },
  { rank: 7, name: 'Sofia Martinez', points: 1956, initials: 'SM', color: 'from-pink-400 to-pink-500' },
  { rank: 8, name: 'Daniel Kim', points: 1834, initials: 'DK', color: 'from-indigo-400 to-indigo-500' },
  { rank: 9, name: 'Rachel Green', points: 1723, initials: 'RG', color: 'from-teal-400 to-teal-500' },
  { rank: 10, name: 'Chris Brown', points: 1689, initials: 'CB', color: 'from-red-400 to-red-500' },
];

// 3. مكون الـ Leaderboard (يمكنك استخدامه داخل أي صفحة)
export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={20} />;
    if (rank === 2) return <Medal className="text-gray-400" size={20} />;
    if (rank === 3) return <Award className="text-orange-400" size={20} />;
    return <span className="text-gray-500 font-bold">#{rank}</span>;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
        <select className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200 outline-none">
          <option>This Week</option>
          <option>This Month</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {leaderboardData.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              user.rank <= 3
                ? 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100'
                : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
            }`}
          >
            <div className="w-8 flex items-center justify-center">{getRankIcon(user.rank)}</div>
            <div className={`w-10 h-10 bg-gradient-to-br ${user.color} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
              {user.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-semibold truncate">{user.name}</p>
              <p className="text-xs text-gray-500">{user.points.toLocaleString()} pts</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border-2 border-blue-200">
          <div className="w-8 flex items-center justify-center text-blue-600 font-bold">#12</div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">JD</div>
          <div className="flex-1">
            <p className="text-gray-900 font-bold">You (John Doe)</p>
            <p className="text-xs text-blue-600 font-medium">1,247 pts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. المكون الأساسي للتطبيق
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogoutSuccess(true);
  };

  useEffect(() => {
    if (!isAuthenticated && showLogoutSuccess) {
      const timer = setTimeout(() => {
        toast.success(
          language === 'en' 
            ? 'You have been logged out successfully.' 
            : 'تم تسجيل الخروج بنجاح.',
          { duration: 2000 }
        );
        setShowLogoutSuccess(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, showLogoutSuccess, language]);

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <AuthScreen
          onLogin={() => setIsAuthenticated(true)}
          language={language}
          onLanguageChange={setLanguage}
        />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <MainLayout
        language={language}
        onLanguageChange={setLanguage}
        onLogout={handleLogout}
      />
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
