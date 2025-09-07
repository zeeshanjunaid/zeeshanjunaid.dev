"use client";

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check, Code } from 'lucide-react';
import { useTheme } from 'next-themes';

interface CodeBlockProps {
  children: string;
  className?: string;
  filename?: string;
}

export function CodeBlock({ children, className, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  
  // Extract language from className (e.g., "language-jsx" -> "jsx")
  const language = className?.replace(/language-/, '') || 'text';
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group my-6">
      {/* Header with filename and copy button */}
      <div className="flex items-center justify-between bg-dark/5 dark:bg-light/5 border border-lightBorderColor dark:border-darkBorderColor rounded-t-xl px-4 py-2">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-purple" />
          {filename ? (
            <span className="text-sm font-switzer font-medium text-dark/80 dark:text-light/80">
              {filename}
            </span>
          ) : (
            <span className="text-sm font-switzer font-medium text-dark/60 dark:text-light/60 uppercase">
              {language}
            </span>
          )}
        </div>
        
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple/10 hover:bg-purple/20 text-purple transition-all duration-200 hover:scale-105"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-xs font-switzer font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-xs font-switzer font-medium">Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code content */}
      <div className="relative overflow-hidden rounded-b-xl border-x border-b border-lightBorderColor dark:border-darkBorderColor">
        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            color: theme === 'dark' ? '#6b7280' : '#9ca3af',
            fontSize: '12px',
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {children}
        </SyntaxHighlighter>
        
        {/* Gradient overlay for better visual hierarchy */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-purple/5 pointer-events-none" />
      </div>
    </div>
  );
}

interface InlineCodeProps {
  children: string;
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="px-2 py-1 bg-purple/10 text-purple rounded-md text-sm font-mono font-medium border border-purple/20">
      {children}
    </code>
  );
}