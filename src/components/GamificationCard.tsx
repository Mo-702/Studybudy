import { Trophy, TrendingUp, Award } from 'lucide-react';

export function GamificationCard() {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 rounded-2xl p-8 text-white shadow-2xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl mb-2">Your Progress</h2>
          <p className="text-purple-100">Keep up the great work!</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
          <Trophy size={32} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Total Points */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Award size={20} className="text-yellow-300" />
            <span className="text-purple-100">Total Points</span>
          </div>
          <p className="text-4xl">1,247</p>
          <div className="flex items-center gap-1 mt-2 text-green-300">
            <TrendingUp size={16} />
            <span className="text-sm">+127 this week</span>
          </div>
        </div>

        {/* Rank */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={20} className="text-yellow-300" />
            <span className="text-purple-100">Current Rank</span>
          </div>
          <p className="text-4xl">#12</p>
          <p className="text-sm text-purple-100 mt-2">in Programming I</p>
        </div>

        {/* Achievements */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Award size={20} className="text-yellow-300" />
            <span className="text-purple-100">Achievements</span>
          </div>
          <p className="text-4xl">23</p>
          <p className="text-sm text-purple-100 mt-2">8 unlocked this month</p>
        </div>
      </div>

      {/* Recent Badges */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <p className="text-purple-100 mb-3">Recent Badges</p>
        <div className="flex gap-3">
          {['🏆', '📚', '⭐', '🎯', '💡'].map((badge, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform cursor-pointer"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
