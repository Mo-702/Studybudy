import { Bell, Trophy, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function HomeScreen() {
  const [todaySchedule] = useState([
    { time: '10:00 AM', title: 'Programming I Lab', location: 'Lab 3B', color: 'bg-blue-500' },
    { time: '1:00 PM', title: 'Data Structures', location: 'Hall A', color: 'bg-purple-500' },
    { time: '3:30 PM', title: 'Study Group', location: 'Library', color: 'bg-green-500' },
  ]);

  const [upcomingExams] = useState([
    { course: 'Algorithms', date: 'Dec 20', days: 6, color: 'bg-red-500' },
    { course: 'Database Design', date: 'Dec 22', days: 8, color: 'bg-orange-500' },
  ]);

  const [quickCourses] = useState([
    { code: 'CS101', name: 'Programming I', unread: 3 },
    { code: 'CS201', name: 'Data Structures', unread: 0 },
    { code: 'CS301', name: 'Algorithms', unread: 5 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 pt-safe">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900">Dashboard</h1>
          </div>
          <button className="relative p-2 active:bg-gray-100 rounded-full transition-colors">
            <Bell size={24} className="text-gray-900" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Points Card */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm mb-1">Your Points</p>
              <p className="text-5xl mb-2">1,247</p>
              <p className="text-blue-100">Rank #12 in Programming I</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Trophy size={28} />
            </div>
          </div>
          <button className="w-full bg-white/20 backdrop-blur-sm active:bg-white/30 text-white py-3 rounded-2xl transition-colors flex items-center justify-center gap-2">
            <span>View Achievements</span>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-gray-900">Today's Schedule</h2>
            <Clock size={20} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {todaySchedule.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                <div className={`w-1 h-14 ${item.color} rounded-full`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 truncate">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.time} · {item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl text-gray-900 mb-4">Upcoming Exams</h2>
          <div className="space-y-3">
            {upcomingExams.map((exam, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                <div>
                  <p className="text-gray-900">{exam.course}</p>
                  <p className="text-sm text-gray-500">{exam.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl text-red-600">{exam.days}</p>
                  <p className="text-xs text-gray-500">days left</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-gray-900">Quick Access</h2>
            <BookOpen size={20} className="text-gray-400" />
          </div>
          <div className="space-y-2">
            {quickCourses.map((course, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 bg-gray-50 active:bg-gray-100 rounded-2xl transition-colors"
              >
                <div className="text-left">
                  <p className="text-gray-900">{course.code}</p>
                  <p className="text-sm text-gray-500">{course.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {course.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {course.unread}
                    </span>
                  )}
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
