import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import logoImage from 'figma:asset/e19ab9dd58b183578a2b4114d27050536321ef11.png';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingData = [
  {
    title: 'Welcome to Study Buddy',
    description: 'Your academic collaboration platform designed for university students',
    illustration: '📚',
    color: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Organize Your Studies',
    description: 'Join course-specific groups, share notes, and collaborate with classmates',
    illustration: '🎯',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Quality Content',
    description: 'Vote on shared materials to surface the best study resources',
    illustration: '⭐',
    color: 'from-pink-500 to-orange-500',
  },
  {
    title: 'Stay Motivated',
    description: 'Earn points, unlock badges, and climb the leaderboard while you study',
    illustration: '🏆',
    color: 'from-orange-500 to-yellow-500',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const currentSlide = onboardingData[currentPage];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Skip button */}
      <div className="pt-safe px-6 py-4 flex justify-end">
        <button
          onClick={onComplete}
          className="text-blue-500 active:text-blue-700 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Logo - only on first page */}
        {currentPage === 0 && (
          <div className="rounded-[20px] overflow-hidden mb-8">
            <img src={logoImage} alt="Study Buddy" className="w-48 h-auto" />
          </div>
        )}

        {/* Illustration */}
        <div className={`w-48 h-48 mb-12 bg-gradient-to-br ${currentSlide.color} rounded-full flex items-center justify-center text-8xl shadow-2xl`}>
          {currentSlide.illustration}
        </div>

        {/* Title */}
        <h1 className="text-3xl mb-4 text-gray-900">
          {currentSlide.title}
        </h1>

        {/* Description */}
        <p className="text-gray-500 leading-relaxed max-w-sm">
          {currentSlide.description}
        </p>
      </div>

      {/* Bottom section */}
      <div className="px-8 pb-safe pb-8">
        {/* Page dots */}
        <div className="flex justify-center gap-2 mb-8">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentPage
                  ? 'w-8 bg-blue-500'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Continue button */}
        <button
          onClick={handleNext}
          className="w-full bg-blue-500 active:bg-blue-600 text-white py-4 rounded-full flex items-center justify-center gap-2 transition-colors shadow-lg"
        >
          <span className="text-lg">
            {currentPage < onboardingData.length - 1 ? 'Continue' : 'Get Started'}
          </span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}