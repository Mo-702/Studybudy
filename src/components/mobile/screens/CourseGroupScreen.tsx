import { ChevronLeft, ThumbsUp, ThumbsDown, Download, User } from 'lucide-react';
import { useState } from 'react';

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  members: number;
  color: string;
}

interface CourseGroupScreenProps {
  course: Course;
  onBack: () => void;
}

interface Note {
  id: string;
  title: string;
  uploader: string;
  uploadDate: string;
  upvotes: number;
  downvotes: number;
  downloads: number;
}

interface Message {
  id: string;
  user: string;
  message: string;
  time: string;
  isOwn: boolean;
}

interface Member {
  id: string;
  name: string;
  initials: string;
  points: number;
  color: string;
}

export function CourseGroupScreen({ course, onBack }: CourseGroupScreenProps) {
  const [activeSegment, setActiveSegment] = useState<'chat' | 'notes' | 'members'>('notes');

  const notes: Note[] = [
    {
      id: '1',
      title: 'Midterm Review - Chapters 1-5',
      uploader: 'Sarah Chen',
      uploadDate: '2 days ago',
      upvotes: 24,
      downvotes: 2,
      downloads: 45,
    },
    {
      id: '2',
      title: 'Lecture Notes - Binary Trees',
      uploader: 'Michael Torres',
      uploadDate: '4 days ago',
      upvotes: 18,
      downvotes: 1,
      downloads: 32,
    },
    {
      id: '3',
      title: 'Practice Problems Set 3',
      uploader: 'Emma Wilson',
      uploadDate: '1 week ago',
      upvotes: 31,
      downvotes: 3,
      downloads: 67,
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      user: 'Sarah Chen',
      message: 'Has anyone finished the assignment yet?',
      time: '10:30 AM',
      isOwn: false,
    },
    {
      id: '2',
      user: 'You',
      message: "I'm almost done, just need to test the last function",
      time: '10:32 AM',
      isOwn: true,
    },
    {
      id: '3',
      user: 'Michael Torres',
      message: 'Check out the notes I uploaded, they might help!',
      time: '10:35 AM',
      isOwn: false,
    },
  ];

  const members: Member[] = [
    { id: '1', name: 'Sarah Chen', initials: 'SC', points: 2847, color: 'bg-blue-500' },
    { id: '2', name: 'Michael Torres', initials: 'MT', points: 2634, color: 'bg-purple-500' },
    { id: '3', name: 'Emma Wilson', initials: 'EW', points: 2521, color: 'bg-green-500' },
    { id: '4', name: 'Alex Kumar', initials: 'AK', points: 2318, color: 'bg-orange-500' },
    { id: '5', name: 'You', initials: 'JD', points: 1247, color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 pt-safe">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 active:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-blue-500" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-lg text-gray-900 truncate">{course.code}</p>
            <p className="text-sm text-gray-500 truncate">{course.name}</p>
          </div>
        </div>

        {/* Segmented Control */}
        <div className="px-6 pb-3">
          <div className="bg-gray-100 rounded-2xl p-1 flex">
            {(['chat', 'notes', 'members'] as const).map((segment) => (
              <button
                key={segment}
                onClick={() => setActiveSegment(segment)}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  activeSegment === segment
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500 active:text-gray-700'
                }`}
              >
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeSegment === 'notes' && (
          <div className="px-6 py-4 space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-white rounded-3xl p-4 shadow-sm">
                <h3 className="text-gray-900 mb-2">{note.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <User size={14} />
                  <span>{note.uploader}</span>
                  <span>·</span>
                  <span>{note.uploadDate}</span>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-600 rounded-xl active:bg-green-100 transition-colors">
                    <ThumbsUp size={16} />
                    <span className="text-sm">{note.upvotes}</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-xl active:bg-red-100 transition-colors">
                    <ThumbsDown size={16} />
                    <span className="text-sm">{note.downvotes}</span>
                  </button>
                  <div className="flex-1"></div>
                  <button className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl active:bg-blue-100 transition-colors">
                    <Download size={16} />
                    <span className="text-sm">{note.downloads}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSegment === 'chat' && (
          <div className="px-6 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${msg.isOwn ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'} rounded-3xl px-4 py-3 shadow-sm`}>
                  {!msg.isOwn && (
                    <p className="text-xs mb-1 opacity-60">{msg.user}</p>
                  )}
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSegment === 'members' && (
          <div className="px-6 py-4 space-y-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl p-4 shadow-sm flex items-center gap-3"
              >
                <div className={`w-12 h-12 ${member.color} rounded-full flex items-center justify-center text-white flex-shrink-0`}>
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 truncate">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.points.toLocaleString()} points</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Input (only for chat) */}
      {activeSegment === 'chat' && (
        <div className="bg-white border-t border-gray-200 px-6 py-3 pb-safe">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-100 rounded-2xl outline-none"
            />
            <button className="p-3 bg-blue-500 text-white rounded-full active:bg-blue-600 transition-colors">
              <ChevronLeft size={20} className="rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
