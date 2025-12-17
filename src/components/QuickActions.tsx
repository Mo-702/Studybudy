import { FileSearch, Upload } from 'lucide-react';

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Browse Notes */}
      <button className="group bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl group-hover:scale-110 transition-transform">
            <FileSearch size={32} />
          </div>
          <div className="text-left">
            <h3 className="text-2xl mb-1">Browse Notes</h3>
            <p className="text-blue-100">Explore shared study materials</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
          <span className="text-blue-100">1,234 notes available</span>
          <span className="text-2xl">→</span>
        </div>
      </button>

      {/* Upload Note */}
      <button className="group bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl group-hover:scale-110 transition-transform">
            <Upload size={32} />
          </div>
          <div className="text-left">
            <h3 className="text-2xl mb-1">Upload Note</h3>
            <p className="text-purple-100">Share your study materials</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
          <span className="text-purple-100">Earn points for sharing</span>
          <span className="text-2xl">→</span>
        </div>
      </button>
    </div>
  );
}
