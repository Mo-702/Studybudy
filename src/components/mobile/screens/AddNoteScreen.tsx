import { Upload, FileText, Tag, X } from 'lucide-react';
import { useState } from 'react';

export function AddNoteScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const courses = ['CS101', 'CS201', 'CS301', 'CS202', 'CS250'];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    console.log({ title, description, selectedCourse, tags, uploadedFile });
    // Reset form
    setTitle('');
    setDescription('');
    setSelectedCourse('');
    setTags([]);
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 pt-safe">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl text-gray-900">Add Note</h1>
          <button
            onClick={handleSubmit}
            disabled={!title || !selectedCourse || !uploadedFile}
            className={`px-4 py-2 rounded-full transition-colors ${
              title && selectedCourse && uploadedFile
                ? 'bg-blue-500 text-white active:bg-blue-600'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            Post
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* File Upload */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <label className="block text-gray-600 text-sm mb-3">
            Document or Image
          </label>
          {uploadedFile ? (
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <FileText size={24} className="text-blue-500" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 truncate">{uploadedFile}</p>
                <p className="text-sm text-gray-500">PDF Document</p>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="p-2 text-gray-400 active:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setUploadedFile('lecture-notes-chapter5.pdf')}
              className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center gap-3 active:border-blue-500 active:bg-blue-50 transition-all"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Upload size={32} className="text-blue-500" />
              </div>
              <div className="text-center">
                <p className="text-gray-900 mb-1">Upload Document</p>
                <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB</p>
              </div>
            </button>
          )}
        </div>

        {/* Course Selection */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <label className="block text-gray-600 text-sm mb-3">
            Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition-colors text-gray-900"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <label className="block text-gray-600 text-sm mb-3">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Midterm Review Notes"
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <label className="block text-gray-600 text-sm mb-3">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any helpful context or details..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Tags */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <label className="block text-gray-600 text-sm mb-3">
            Tags (Optional)
          </label>
          
          {/* Tag Input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add a tag..."
              className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={handleAddTag}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl active:bg-blue-600 transition-colors"
            >
              <Tag size={20} />
            </button>
          </div>

          {/* Tags Display */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl"
                >
                  <span className="text-sm">{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-blue-400 active:text-blue-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
