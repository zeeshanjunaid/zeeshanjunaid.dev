"use client";

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-light/20 dark:bg-dark/20">
        <div 
          className="h-full bg-gradient-to-r from-purple to-purple/80 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-purple hover:bg-purple/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
          title="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="table-of-contents sticky top-24 bg-light dark:bg-dark rounded-xl border border-lightBorderColor dark:border-darkBorderColor p-5">
      <h3 className="font-ao font-bold text-lg text-dark dark:text-light mb-4 flex items-center gap-2">
        📖 Table of Contents
      </h3>
      <nav>
        <ul className="space-y-2">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <button
                onClick={() => scrollToHeading(id)}
                className={`block w-full text-left py-2 px-3 rounded-lg font-switzer text-sm transition-all duration-200 ${
                  level === 2 ? 'ml-0' : level === 3 ? 'ml-4' : 'ml-8'
                } ${
                  activeId === id
                    ? 'bg-purple/10 text-purple font-medium border-l-2 border-purple'
                    : 'text-dark/70 dark:text-light/70 hover:text-purple hover:bg-purple/5'
                }`}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}