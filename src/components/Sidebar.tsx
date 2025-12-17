import { Home, BookOpen, Calendar, User } from 'lucide-react';
import { useState } from 'react';
import logoImage from 'figma:asset/e19ab9dd58b183578a2b4114d27050536321ef11.png';

export function Sidebar() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="rounded-[20px] overflow-hidden flex-shrink-0">
            <img src={logoImage} alt="Study Buddy" className="w-14 h-14 object-cover" />
          </div>
          <span className="text-xl text-gray-900">Study Buddy</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 truncate">Yousef Hakeem</p>
            <p className="text-gray-500 text-sm">Human Computer Interaction</p>
          </div>
        </div>
      </div>
    </aside>
  );
}