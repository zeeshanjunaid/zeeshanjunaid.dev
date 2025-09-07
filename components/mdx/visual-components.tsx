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
      <div className="image-gallery my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer group relative overflow-hidden rounded-xl"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-video relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              {image.caption && (
                <div className="p-3 bg-light dark:bg-dark">
                  <p className="text-sm text-dark/70 dark:text-light/70 font-switzer">
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
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-full">
            <div className="relative">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
            {images[currentIndex].caption && (
              <p className="text-white/80 text-center mt-4 font-switzer">
                {images[currentIndex].caption}
              </p>
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
    <div className="video-embed my-8">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-dark/5 dark:bg-light/5">
        {!isPlaying && thumbnail ? (
          <div className="relative w-full h-full cursor-pointer group" onClick={handlePlay}>
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                <Play className="w-6 h-6 text-dark ml-1" />
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
      <div className="mt-3 text-center">
        <h4 className="font-switzer font-medium text-dark dark:text-light">{title}</h4>
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
    <div className="process-steps my-8">
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* Step Number/Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-purple rounded-full flex items-center justify-center text-white font-bold">
                {step.icon || (index + 1)}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-8 bg-purple/30 mx-auto mt-2" />
              )}
            </div>
            
            {/* Step Content */}
            <div className="flex-1 pb-6">
              <h4 className="font-ao font-bold text-lg text-dark dark:text-light mb-2">
                {step.title}
              </h4>
              <p className="text-dark/80 dark:text-light/80 font-switzer leading-relaxed">
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
    <div className="comparison-table my-8 overflow-x-auto">
      <div className="min-w-full border border-lightBorderColor dark:border-darkBorderColor rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-light dark:bg-dark">
            <tr>
              <th className="px-6 py-4 text-left font-switzer font-bold text-dark dark:text-light">
                Feature
              </th>
              {items.map((item, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-center font-switzer font-bold text-dark dark:text-light"
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
                className={`border-t border-lightBorderColor dark:border-darkBorderColor ${
                  rowIndex % 2 === 0 ? 'bg-light/50 dark:bg-dark/50' : ''
                }`}
              >
                <td className="px-6 py-4 font-switzer font-medium text-dark dark:text-light">
                  {label}
                </td>
                {items.map((item, index) => (
                  <td key={index} className="px-6 py-4 text-center">
                    {typeof item.features[key] === 'boolean' ? (
                      <span
                        className={`inline-block w-5 h-5 rounded-full ${
                          item.features[key] ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    ) : (
                      <span className="text-dark/80 dark:text-light/80 font-switzer">
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