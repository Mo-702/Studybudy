import { useState } from 'react';
import { Eye, EyeOff, Apple } from 'lucide-react';
import logoImage from 'figma:asset/e19ab9dd58b183578a2b4114d27050536321ef11.png';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="pt-safe px-6 py-8 flex flex-col items-center">
        <div className="rounded-[20px] overflow-hidden mb-4">
          <img src={logoImage} alt="Study Buddy" className="w-40 h-auto" />
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name - only for sign up */}
          {isSignUp && (
            <div>
              <label className="block text-gray-600 text-sm mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:bg-white transition-all outline-none"
                placeholder="Yousef Hakeem"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:bg-white transition-all outline-none"
              placeholder="you@university.edu"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:bg-white transition-all outline-none pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 active:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 active:bg-blue-600 text-white py-4 rounded-full transition-colors shadow-lg mt-6"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-gray-400">or</span>
            </div>
          </div>

          {/* Sign in with Apple */}
          <button
            type="button"
            onClick={onLogin}
            className="w-full bg-black active:bg-gray-900 text-white py-4 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <Apple size={20} fill="currentColor" />
            <span>Continue with Apple</span>
          </button>

          {/* Toggle sign up / sign in */}
          <div className="text-center pt-4">
            <span className="text-gray-500">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            </span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 active:text-blue-700 transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>

      <div className="pb-safe pb-8"></div>
    </div>
  );
}