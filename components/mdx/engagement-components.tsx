"use client";

import { useState } from 'react';
import { Mail, Send, ArrowRight, CheckCircle, User, MapPin, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
}

export function NewsletterSignup({ 
  title = "Stay Updated",
  description = "Get the latest posts and insights delivered to your inbox.",
  placeholder = "Enter your email",
  buttonText = "Subscribe"
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubmitted) {
    return (
      <div className="newsletter-signup my-8 p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-ao font-bold text-xl text-green-900 dark:text-green-100 mb-2">
            You're subscribed!
          </h3>
          <p className="text-green-700 dark:text-green-300 font-switzer">
            Thank you for subscribing. You'll receive updates about new posts and insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-signup my-8 p-8 bg-gradient-to-br from-purple/10 via-purple/5 to-transparent rounded-xl border border-purple/20">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-purple" />
        </div>
        <h3 className="font-ao font-bold text-2xl text-dark dark:text-light mb-2">
          {title}
        </h3>
        <p className="text-dark/70 dark:text-light/70 font-switzer text-lg">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="flex-1 px-4 py-3 bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor rounded-xl text-dark dark:text-light placeholder-dark/50 dark:placeholder-light/50 focus:outline-none focus:ring-2 focus:ring-purple/20 focus:border-purple/50 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-purple hover:bg-purple/90 text-white rounded-xl font-switzer font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {buttonText}
          </button>
        </div>
        <p className="text-xs text-dark/50 dark:text-light/50 mt-3 text-center font-switzer">
          No spam, unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}

interface CTABoxProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export function CTABox({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  variant = 'primary',
  icon 
}: CTABoxProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800';
      case 'outline':
        return 'bg-light dark:bg-dark border-lightBorderColor dark:border-darkBorderColor';
      default:
        return 'bg-gradient-to-br from-purple/10 via-purple/5 to-transparent border-purple/20';
    }
  };

  const getButtonStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'outline':
        return 'bg-transparent border-2 border-purple text-purple hover:bg-purple hover:text-white';
      default:
        return 'bg-purple hover:bg-purple/90 text-white';
    }
  };

  return (
    <div className={`cta-box my-8 p-8 rounded-xl border ${getVariantStyles()}`}>
      <div className="text-center">
        {icon && (
          <div className="w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
            {icon}
          </div>
        )}
        <h3 className="font-ao font-bold text-2xl text-dark dark:text-light mb-4">
          {title}
        </h3>
        <p className="text-dark/80 dark:text-light/80 font-switzer text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <Link href={buttonLink}>
          <button className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-switzer font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${getButtonStyles()}`}>
            {buttonText}
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}

interface AuthorBioProps {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location?: string;
  joinDate?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export function AuthorBio({ 
  name, 
  title, 
  bio, 
  avatar, 
  location, 
  joinDate, 
  website,
  social = {} 
}: AuthorBioProps) {
  return (
    <div className="author-bio my-8 p-6 bg-light dark:bg-dark rounded-xl border border-lightBorderColor dark:border-darkBorderColor">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 relative rounded-full overflow-hidden">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="font-ao font-bold text-xl text-dark dark:text-light mb-1">
              {name}
            </h3>
            <p className="text-purple font-switzer font-medium">
              {title}
            </p>
          </div>

          <p className="text-dark/80 dark:text-light/80 font-switzer leading-relaxed mb-4">
            {bio}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-dark/60 dark:text-light/60 font-switzer mb-4">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {location}
              </div>
            )}
            {joinDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined {joinDate}
              </div>
            )}
            {website && (
              <a 
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-purple hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Website
              </a>
            )}
          </div>

          {/* Social links */}
          {Object.keys(social).length > 0 && (
            <div className="flex gap-3">
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors font-switzer font-medium"
                >
                  Twitter
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-700 text-white text-xs rounded-lg hover:bg-blue-800 transition-colors font-switzer font-medium"
                >
                  LinkedIn
                </a>
              )}
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg hover:bg-gray-900 transition-colors font-switzer font-medium"
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface RelatedPostsProps {
  posts: Array<{
    title: string;
    excerpt: string;
    slug: string;
    readingTime: string;
    tags: string[];
  }>;
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="related-posts my-8">
      <h3 className="font-ao font-bold text-2xl text-dark dark:text-light mb-6">
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`}>
            <div className="group p-6 bg-light dark:bg-dark rounded-xl border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/30 transition-all duration-300 hover:shadow-lg">
              <h4 className="font-ao font-bold text-lg text-dark dark:text-light mb-3 group-hover:text-purple transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-dark/70 dark:text-light/70 font-switzer text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-dark/50 dark:text-light/50 font-switzer">
                  {post.readingTime}
                </span>
                <div className="flex gap-1">
                  {post.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-purple/10 text-purple text-xs rounded-md font-switzer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}