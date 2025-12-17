import { BookOpen, Users, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { CourseGroupScreen } from './CourseGroupScreen';

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  members: number;
  color: string;
  unread: number;
}

export function CoursesScreen() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  const courses: Course[] = [
    {
      id: '1',
      code: 'CS101',
      name: 'Introduction to Programming',
      instructor: 'Dr. Sarah Chen',
      members: 124,
      color: 'bg-blue-500',
      unread: 3,
    },
    {
      id: '2',
      code: 'CS201',
      name: 'Data Structures',
      instructor: 'Prof. Michael Torres',
      members: 98,
      color: 'bg-purple-500',
      unread: 0,
    },
    {
      id: '3',
      code: 'CS301',
      name: 'Algorithm Design',
      instructor: 'Dr. Emma Wilson',
      members: 76,
      color: 'bg-green-500',
      unread: 5,
    },
    {
      id: '4',
      code: 'CS202',
      name: 'Database Systems',
      instructor: 'Prof. James Park',
      members: 85,
      color: 'bg-orange-500',
      unread: 1,
    },
    {
      id: '5',
      code: 'CS250',
      name: 'Web Development',
      instructor: 'Dr. Lisa Anderson',
      members: 112,
      color: 'bg-pink-500',
      unread: 0,
    },
  ];

  if (selectedCourse) {
    return (
      <CourseGroupScreen
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 pt-safe">
        <div className="px-6 py-4">
          <h1 className="text-3xl text-gray-900">Courses</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full px-4 py-3 bg-white rounded-2xl border border-gray-200 outline-none focus:border-blue-500 transition-colors shadow-sm"
        />
      </div>

      {/* Courses List */}
      <div className="px-6 pb-6 space-y-3">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className="w-full bg-white rounded-3xl p-4 shadow-sm active:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Course Icon */}
              <div className={`w-14 h-14 ${course.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <BookOpen size={28} className="text-white" />
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-gray-900">{course.code}</p>
                  {course.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {course.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate mb-1">{course.name}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Users size={12} />
                  <span>{course.members} members</span>
                  <span className="mx-1">·</span>
                  <span>{course.instructor}</span>
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      {/* Join Course Button */}
      <div className="px-6 pb-6">
        <button className="w-full bg-blue-500 active:bg-blue-600 text-white py-4 rounded-2xl transition-colors shadow-lg">
          + Join a Course
        </button>
      </div>
    </div>
  );
}
