import { Clock, MapPin, Users } from 'lucide-react';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  attendees?: number;
  type: 'lab' | 'lecture' | 'study' | 'exam';
}

const scheduleItems: ScheduleItem[] = [
  {
    id: '1',
    time: '10:00 AM',
    title: 'Programming I Lab Session',
    location: 'Computer Lab 3B',
    attendees: 24,
    type: 'lab',
  },
  {
    id: '2',
    time: '1:00 PM',
    title: 'Data Structures Lecture',
    location: 'Hall A',
    attendees: 120,
    type: 'lecture',
  },
  {
    id: '3',
    time: '3:30 PM',
    title: 'Group Study Session',
    location: 'Library Room 204',
    attendees: 6,
    type: 'study',
  },
  {
    id: '4',
    time: '5:00 PM',
    title: 'Algorithm Design Review',
    location: 'Online - Zoom',
    attendees: 15,
    type: 'study',
  },
];

const typeColors = {
  lab: 'bg-blue-100 text-blue-700 border-blue-200',
  lecture: 'bg-purple-100 text-purple-700 border-purple-200',
  study: 'bg-green-100 text-green-700 border-green-200',
  exam: 'bg-red-100 text-red-700 border-red-200',
};

export function TodaySchedule() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-gray-900">Today's Schedule</h2>
        <span className="text-gray-500">Monday, Dec 14</span>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {scheduleItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              {/* Time */}
              <div className="flex-shrink-0 w-20">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock size={16} />
                  <span className="text-sm">{item.time}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-gray-900">{item.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs border ${
                      typeColors[item.type]
                    }`}
                  >
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>
                  {item.attendees && (
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{item.attendees} attendees</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-purple-400 hover:text-purple-600 transition-colors">
        + Add to Schedule
      </button>
    </div>
  );
}
