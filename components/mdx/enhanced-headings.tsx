"use client";

import { useState } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';

interface EnhancedHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  id?: string;
}

export function EnhancedHeading({ level, children, id }: EnhancedHeadingProps) {
  const [copied, setCopied] = useState(false);

  // Generate ID from children text if not provided
  const headingId = id || (typeof children === 'string' 
    ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') 
    : 'heading');

  const copyAnchorLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${headingId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const getHeadingClasses = () => {
    const baseClasses = "group relative font-ao font-bold text-dark dark:text-light leading-tight scroll-mt-24";
    
    switch (level) {
      case 1:
        return `${baseClasses} text-3xl md:text-4xl lg:text-5xl mb-8 mt-12`;
      case 2:
        return `${baseClasses} text-2xl md:text-3xl lg:text-4xl mb-6 mt-10`;
      case 3:
        return `${baseClasses} text-xl md:text-2xl lg:text-3xl mb-4 mt-8`;
      case 4:
        return `${baseClasses} text-lg md:text-xl lg:text-2xl mb-3 mt-6`;
      case 5:
        return `${baseClasses} text-base md:text-lg lg:text-xl mb-2 mt-4`;
      case 6:
        return `${baseClasses} text-sm md:text-base lg:text-lg mb-2 mt-3`;
      default:
        return baseClasses;
    }
  };

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag id={headingId} className={getHeadingClasses()}>
      {children}
      
      {/* Anchor link button */}
      <button
        onClick={copyAnchorLink}
        className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 active:scale-95 flex items-center justify-center rounded-md hover:bg-purple/10"
        title={copied ? "Link copied!" : "Copy link to this section"}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <LinkIcon className="w-4 h-4 text-purple" />
        )}
      </button>
      
      {/* Decorative elements for larger headings */}
      {level <= 2 && (
        <>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple/20 rounded-full" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple/15 rounded-full" />
        </>
      )}
    </HeadingTag>
  );
}

interface AnchorLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function AnchorLink({ href, children, external = false }: AnchorLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-purple hover:text-purple/80 underline underline-offset-2 decoration-purple/50 hover:decoration-purple transition-colors font-medium"
    >
      {children}
      {external && (
        <span className="inline-block ml-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </span>
      )}
    </a>
  );
}