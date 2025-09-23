"use client";

import { Quote, Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface BlockquoteProps {
  children: React.ReactNode;
  type?: 'default' | 'info' | 'warning' | 'success' | 'tip';
  author?: string;
}

export function Blockquote({ children, type = 'default', author }: BlockquoteProps) {
  const getIcon = () => {
    switch (type) {
      case 'info': return <Info className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'tip': return <Lightbulb className="w-5 h-5" />;
      default: return <Quote className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'info':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-200';
      case 'warning':
        return 'border-l-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-800 dark:text-orange-200';
      case 'success':
        return 'border-l-green-500 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-200';
      case 'tip':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-200';
      default:
        return 'border-l-purple bg-purple/5 dark:bg-purple/10 text-gray-900 dark:text-white';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'info': return 'text-blue-500';
      case 'warning': return 'text-orange-500';
      case 'success': return 'text-green-500';
      case 'tip': return 'text-yellow-500';
      default: return 'text-purple';
    }
  };

  return (
    <blockquote className={`custom-blockquote relative my-4 sm:my-6 lg:my-8 p-4 sm:p-6 border-l-4 rounded-r-xl ${getStyles()}`}>
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={`flex-shrink-0 ${getIconColor()}`}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm sm:text-base lg:text-lg font-switzer leading-relaxed">
            {children}
          </div>
          {author && (
            <div className="mt-3 sm:mt-4 pt-3 border-t border-current border-opacity-20">
              <cite className="not-italic font-switzer font-medium text-xs sm:text-sm opacity-80">
                — {author}
              </cite>
            </div>
          )}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-current opacity-10 rounded-full" />
      <div className="absolute bottom-2 right-4 w-1.5 h-1.5 bg-current opacity-5 rounded-full" />
    </blockquote>
  );
}

interface CalloutProps {
  children: React.ReactNode;
  type: 'info' | 'warning' | 'success' | 'tip';
  title?: string;
}

export function Callout({ children, type, title }: CalloutProps) {
  const getConfig = () => {
    switch (type) {
      case 'info':
        return {
          icon: <Info className="w-5 h-5" />,
          styles: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50',
          iconColor: 'text-blue-600 dark:text-blue-400',
          titleColor: 'text-blue-900 dark:text-blue-100',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          styles: 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/50',
          iconColor: 'text-orange-600 dark:text-orange-400',
          titleColor: 'text-orange-900 dark:text-orange-100',
        };
      case 'success':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          styles: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50',
          iconColor: 'text-green-600 dark:text-green-400',
          titleColor: 'text-green-900 dark:text-green-100',
        };
      case 'tip':
        return {
          icon: <Lightbulb className="w-5 h-5" />,
          styles: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/50',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          titleColor: 'text-yellow-900 dark:text-yellow-100',
        };
    }
  };

  const config = getConfig();

  return (
    <div className={`callout-box my-4 sm:my-6 p-4 sm:p-5 border rounded-xl ${config.styles}`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-switzer font-bold text-base sm:text-lg mb-2 ${config.titleColor}`}>
              {title}
            </h4>
          )}
          <div className="text-gray-900/90 dark:text-white/90 font-switzer text-sm sm:text-base">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}