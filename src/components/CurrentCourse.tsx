import { BookOpen, Users, Calendar, TrendingUp } from 'lucide-react';

export function CurrentCourse() {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-indigo-100 text-sm mb-1">Current Course</p>
          <h3 className="text-xl">Programming I</h3>
        </div>
        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
          <BookOpen size={24} />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-indigo-200" />
            <span className="text-indigo-100">Enrolled Students</span>
          </div>
          <span>124</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-indigo-200" />
            <span className="text-indigo-100">Next Assignment</span>
          </div>
          <span>Dec 18</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-indigo-200" />
            <span className="text-indigo-100">Your Progress</span>
          </div>
          <span>78%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
        <div className="bg-white h-full rounded-full" style={{ width: '78%' }}></div>
      </div>

      <button className="w-full py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors text-sm">
        View Course Details
      </button>
    </div>
  );
}
