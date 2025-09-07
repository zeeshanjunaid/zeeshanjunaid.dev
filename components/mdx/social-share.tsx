"use client";

import { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Link, Check } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export function SocialShare({ title, url, description = '' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    url,
    description,
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="social-share my-8 p-6 bg-light dark:bg-dark rounded-xl border border-lightBorderColor dark:border-darkBorderColor">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-purple/10 rounded-xl flex items-center justify-center">
          <Share2 className="w-5 h-5 text-purple" />
        </div>
        <div>
          <h3 className="font-ao font-bold text-lg text-dark dark:text-light">
            Share this article
          </h3>
          <p className="text-dark/60 dark:text-light/60 font-switzer text-sm">
            Help others discover this content
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Twitter */}
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-switzer font-medium text-sm"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </a>

        {/* LinkedIn */}
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors font-switzer font-medium text-sm"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>

        {/* Facebook */}
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-switzer font-medium text-sm"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </a>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-purple/10 hover:bg-purple/20 text-purple rounded-lg transition-colors font-switzer font-medium text-sm border border-purple/20"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Link className="w-4 h-4" />
              Copy Link
            </>
          )}
        </button>

        {/* Native Share (mobile) */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-dark/10 dark:bg-light/10 hover:bg-dark/20 dark:hover:bg-light/20 text-dark dark:text-light rounded-lg transition-colors font-switzer font-medium text-sm"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        )}
      </div>
    </div>
  );
}