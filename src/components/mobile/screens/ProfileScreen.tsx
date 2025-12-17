import { Settings, Bookmark, Trophy, TrendingUp, ChevronRight, Award, Star } from 'lucide-react';
import { useState } from 'react';

export function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'saved' | 'achievements'>('saved');

  const savedNotes = [
    {
      id: '1',
      title: 'Midterm Review - Chapters 1-5',
      course: 'CS101',
      date: '2 days ago',
    },
    {
      id: '2',
      title: 'Lecture Notes - Binary Trees',
      course: 'CS201',
      date: '4 days ago',
    },
    {
      id: '3',
      title: 'Practice Problems Set 3',
      course: 'CS301',
      date: '1 week ago',
    },
  ];

  const achievements = [
    { id: '1', icon: '🏆', title: 'Top Contributor', description: 'Upload 10 notes', unlocked: true },
    { id: '2', icon: '⭐', title: 'Rising Star', description: 'Earn 1000 points', unlocked: true },
    { id: '3', icon: '📚', title: 'Bookworm', description: 'Save 50 notes', unlocked: true },
    { id: '4', icon: '🎯', title: 'Perfect Week', description: '7 days streak', unlocked: true },
    { id: '5', icon: '💡', title: 'Helper', description: 'Get 100 upvotes', unlocked: false },
    { id: '6', icon: '🔥', title: 'On Fire', description: '30 days streak', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 pt-safe">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl text-gray-900">Profile</h1>
          <button className="p-2 active:bg-gray-100 rounded-full transition-colors">
            <Settings size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white mx-6 mt-6 rounded-3xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
            JD
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl text-gray-900 mb-1">Yousef Hakeem</h2>
            <p className="text-gray-500">Human Computer Interaction</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-2xl">
            <p className="text-2xl text-blue-600 mb-1">1,247</p>
            <p className="text-xs text-gray-600">Points</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-2xl">
            <p className="text-2xl text-purple-600 mb-1">#12</p>
            <p className="text-xs text-gray-600">Rank</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-2xl">
            <p className="text-2xl text-green-600 mb-1">23</p>
            <p className="text-xs text-gray-600">Badges</p>
          </div>
        </div>

        {/* View Leaderboard Button */}
        <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl active:from-blue-600 active:to-purple-600 transition-all flex items-center justify-center gap-2">
          <Trophy size={20} />
          <span>View Leaderboard</span>
        </button>
      </div>

      {/* Activity Stats */}
      <div className="bg-white mx-6 mt-4 rounded-3xl shadow-sm p-6">
        <h3 className="text-lg text-gray-900 mb-4">Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Bookmark size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-gray-900">Notes Uploaded</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
            </div>
            <p className="text-xl text-gray-900">12</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-gray-900">Points Earned</p>
                <p className="text-sm text-gray-500">This week</p>
              </div>
            </div>
            <p className="text-xl text-gray-900">127</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Star size={20} className="text-purple-500" />
              </div>
              <div>
                <p className="text-gray-900">Upvotes Received</p>
                <p className="text-sm text-gray-500">All time</p>
              </div>
            </div>
            <p className="text-xl text-gray-900">234</p>
          </div>
        </div>
      </div>

      {/* Segmented Control */}
      <div className="px-6 mt-6">
        <div className="bg-gray-100 rounded-2xl p-1 flex">
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'saved'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-500 active:text-gray-700'
            }`}
          >
            <Bookmark size={18} />
            <span>Saved</span>
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'achievements'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-500 active:text-gray-700'
            }`}
          >
            <Award size={18} />
            <span>Achievements</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4 pb-24">
        {activeTab === 'saved' && (
          <div className="space-y-3">
            {savedNotes.map((note) => (
              <button
                key={note.id}
                className="w-full bg-white rounded-3xl p-4 shadow-sm active:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-gray-900 truncate mb-1">{note.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{note.course}</span>
                      <span>·</span>
                      <span>{note.date}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 flex-shrink-0 ml-2" />
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`rounded-3xl p-4 text-center ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'
                    : 'bg-white border border-gray-200 opacity-60'
                }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="text-gray-900 text-sm mb-1">{achievement.title}</p>
                <p className="text-xs text-gray-500">{achievement.description}</p>
                {achievement.unlocked && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                    <Award size={12} />
                    <span>Unlocked</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
