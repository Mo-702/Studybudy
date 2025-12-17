import { useState } from 'react';
import { Home, BookOpen, PlusCircle, Calendar, User } from 'lucide-react';
import { HomeScreen } from './screens/HomeScreen';
import { CoursesScreen } from './screens/CoursesScreen';
import { AddNoteScreen } from './screens/AddNoteScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export function TabNavigator() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, screen: HomeScreen },
    { id: 'courses', label: 'Courses', icon: BookOpen, screen: CoursesScreen },
    { id: 'add', label: 'Add', icon: PlusCircle, screen: AddNoteScreen },
    { id: 'calendar', label: 'Calendar', icon: Calendar, screen: CalendarScreen },
    { id: 'profile', label: 'Profile', icon: User, screen: ProfileScreen },
  ];

  const ActiveScreen = tabs.find((tab) => tab.id === activeTab)?.screen || HomeScreen;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Screen Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <ActiveScreen />
      </div>

      {/* Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isAddButton = tab.id === 'add';

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-0 flex-1 ${
                  isAddButton
                    ? 'text-blue-500'
                    : isActive
                    ? 'text-blue-500'
                    : 'text-gray-400 active:text-gray-600'
                }`}
              >
                <Icon
                  size={isAddButton ? 32 : 24}
                  fill={isAddButton && isActive ? 'currentColor' : 'none'}
                  strokeWidth={isAddButton ? 1.5 : 2}
                />
                <span className="text-xs truncate">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
