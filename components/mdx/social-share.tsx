"use client";

import { Check, Facebook, Link, Linkedin, Share2, Twitter } from "lucide-react";

import { useState } from "react";

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export function SocialShare({
  title,
  url,
  description = "",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    url,
    description,
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <div className="social-share my-6 sm:my-8 p-4 sm:p-6 bg-light dark:bg-dark rounded-xl border border-lightBorderColor dark:border-darkBorderColor">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple/10 rounded-xl flex items-center justify-center">
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-ao font-bold text-base sm:text-lg text-dark dark:text-light">
            Share this article
          </h3>
          <p className="text-dark/60 dark:text-light/60 font-switzer text-xs sm:text-sm">
            Help others discover this content
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {/* Twitter */}
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-switzer font-medium text-xs sm:text-sm touch-friendly"
        >
          <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Twitter</span>
          <span className="sm:hidden">X</span>
        </a>

        {/* LinkedIn */}
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors font-switzer font-medium text-xs sm:text-sm touch-friendly"
        >
          <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">LinkedIn</span>
          <span className="sm:hidden">In</span>
        </a>

        {/* Facebook */}
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-switzer font-medium text-xs sm:text-sm touch-friendly"
        >
          <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Facebook</span>
          <span className="sm:hidden">FB</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-purple/10 hover:bg-purple/20 text-purple rounded-lg transition-colors font-switzer font-medium text-xs sm:text-sm border border-purple/20 touch-friendly"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Copied!</span>
              <span className="sm:hidden">✓</span>
            </>
          ) : (
            <>
              <Link className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Copy Link</span>
              <span className="sm:hidden">Copy</span>
            </>
          )}
        </button>

        {/* Native Share (mobile) */}
        {typeof navigator !== "undefined" &&
          typeof navigator.share === "function" && (
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
