import { Search, Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for notes, courses, or classmates..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all outline-none"
          />
        </div>

        {/* Notification Icon */}
        <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors">
          <Bell size={24} className="text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
