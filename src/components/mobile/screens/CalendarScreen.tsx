import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Bell } from 'lucide-react';
import { useState } from 'react';

interface Event {
  id: string;
  time: string;
  title: string;
  location: string;
  type: 'class' | 'exam' | 'study' | 'reminder';
  color: string;
  hasReminder: boolean;
}

export function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(14);
  const [currentMonth] = useState('January 2025');

  const events: Event[] = [
    {
      id: '1',
      time: '10:00 AM',
      title: 'Programming I Lab',
      location: 'Computer Lab 3B',
      type: 'class',
      color: 'bg-blue-500',
      hasReminder: true,
    },
    {
      id: '2',
      time: '1:00 PM',
      title: 'Data Structures Lecture',
      location: 'Hall A',
      type: 'class',
      color: 'bg-purple-500',
      hasReminder: false,
    },
    {
      id: '3',
      time: '3:30 PM',
      title: 'Group Study Session',
      location: 'Library Room 204',
      type: 'study',
      color: 'bg-green-500',
      hasReminder: true,
    },
    {
      id: '4',
      time: '5:00 PM',
      title: 'Review algorithms',
      location: 'Personal reminder',
      type: 'reminder',
      color: 'bg-orange-500',
      hasReminder: true,
    },
  ];

  // Generate calendar days
  const daysInMonth = 31;
  const startDay = 5; // December 1st is on Friday
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarDays = Array(startDay).fill(null).concat(days);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 pt-safe">
        <div className="px-6 py-4">
          <h1 className="text-3xl text-gray-900">Calendar</h1>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white mx-6 mt-6 rounded-3xl shadow-sm p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button className="p-2 active:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <p className="text-lg text-gray-900">{currentMonth}</p>
          <button className="p-2 active:bg-gray-100 rounded-full transition-colors">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center text-sm text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const isSelected = day === selectedDate;
            const hasEvents = day === 14 || day === 18 || day === 20;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-900 active:bg-gray-100'
                }`}
              >
                <span className="text-sm">{day}</span>
                {hasEvents && (
                  <div
                    className={`w-1 h-1 rounded-full mt-1 ${
                      isSelected ? 'bg-white' : 'bg-blue-500'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events for Selected Day */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-900">
            Events for Dec {selectedDate}
          </h2>
          <button className="p-2 bg-blue-500 text-white rounded-full active:bg-blue-600 transition-colors">
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className={`w-1 h-16 ${event.color} rounded-full`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900">{event.title}</h3>
                    {event.hasReminder && (
                      <Bell size={16} className="text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggle Reminder */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-600">Reminder</span>
                <button
                  className={`w-12 h-7 rounded-full transition-colors relative ${
                    event.hasReminder ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      event.hasReminder ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}