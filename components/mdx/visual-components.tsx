"use client";

import { useState } from 'react';
import { X, Play, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="image-gallery my-6 sm:my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer group relative overflow-hidden rounded-xl touch-friendly"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
            >
              <div className="aspect-video relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <span className="text-dark text-lg sm:text-xl">🔍</span>
                  </div>
                </div>
              </div>
              {image.caption && (
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs sm:text-sm text-gray-900/70 dark:text-white/70 font-switzer line-clamp-2">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors touch-friendly"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors touch-friendly"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors touch-friendly"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          <div className="max-w-full max-h-full flex flex-col items-center">
            <div className="relative max-w-4xl max-h-[70vh] sm:max-h-[80vh]">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
                sizes="(max-width: 640px) 95vw, 80vw"
              />
            </div>
            {images[currentIndex].caption && (
              <p className="text-white/80 text-center mt-2 sm:mt-4 font-switzer text-sm sm:text-base px-4 max-w-2xl">
                {images[currentIndex].caption}
              </p>
            )}
            {images.length > 1 && (
              <div className="mt-2 sm:mt-4 text-white/60 text-xs sm:text-sm font-switzer">
                {currentIndex + 1} of {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

interface VideoEmbedProps {
  src: string;
  title: string;
  thumbnail?: string;
  platform?: 'youtube' | 'vimeo' | 'custom';
}

export function VideoEmbed({ src, title, thumbnail, platform = 'custom' }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="video-embed my-6 sm:my-8">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg">
        {!isPlaying && thumbnail ? (
          <div 
            className="relative w-full h-full cursor-pointer group touch-friendly" 
            onClick={handlePlay}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handlePlay()}
          >
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 hover:bg-white dark:bg-white/80 dark:hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Play className="w-4 h-4 sm:w-6 sm:h-6 text-gray-900 ml-0.5 sm:ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={src}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <div className="mt-2 sm:mt-3 text-center">
        <h4 className="font-switzer font-medium text-sm sm:text-base text-gray-900 dark:text-white">{title}</h4>
      </div>
    </div>
  );
}

interface ProcessStepsProps {
  steps: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="process-steps my-6 sm:my-8">
      <div className="space-y-4 sm:space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3 sm:gap-4">
            {/* Step Number/Icon */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                {step.icon || (index + 1)}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-6 sm:h-8 bg-purple/30 mx-auto mt-2" />
              )}
            </div>
            
            {/* Step Content */}
            <div className="flex-1 pb-4 sm:pb-6 min-w-0">
              <h4 className="font-ao font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-2">
                {step.title}
              </h4>
              <p className="text-gray-900/80 dark:text-white/80 font-switzer leading-relaxed text-sm sm:text-base">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ComparisonTableProps {
  items: Array<{
    name: string;
    features: Record<string, boolean | string>;
  }>;
  featureLabels: Record<string, string>;
}

export function ComparisonTable({ items, featureLabels }: ComparisonTableProps) {
  return (
    <div className="comparison-table my-6 sm:my-8 overflow-x-auto">
      <div className="min-w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full min-w-[600px]">
          <thead className="bg-white dark:bg-gray-900">
            <tr>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-switzer font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                Feature
              </th>
              {items.map((item, index) => (
                <th
                  key={index}
                  className="px-3 sm:px-6 py-3 sm:py-4 text-center font-switzer font-bold text-gray-900 dark:text-white text-sm sm:text-base"
                >
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(featureLabels).map(([key, label], rowIndex) => (
              <tr
                key={key}
                className={`border-t border-gray-200 dark:border-gray-700 ${
                  rowIndex % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/50' : ''
                }`}
              >
                <td className="px-3 sm:px-6 py-3 sm:py-4 font-switzer font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                  {label}
                </td>
                {items.map((item, index) => (
                  <td key={index} className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                    {typeof item.features[key] === 'boolean' ? (
                      <span
                        className={`inline-block w-4 h-4 sm:w-5 sm:h-5 rounded-full ${
                          item.features[key] ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        title={item.features[key] ? 'Yes' : 'No'}
                      />
                    ) : (
                      <span className="text-gray-900/80 dark:text-white/80 font-switzer text-xs sm:text-sm">
                        {item.features[key]}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}