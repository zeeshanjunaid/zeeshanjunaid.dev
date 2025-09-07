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
    <div className="custom-code-block relative group my-8">
      {/* Header with filename and copy button */}
      <div className="flex items-center justify-between bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor rounded-t-xl px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple/10 rounded-lg flex items-center justify-center">
            <Code className="w-4 h-4 text-purple" />
          </div>
          {filename ? (
            <span className="text-sm font-switzer font-semibold text-dark dark:text-light">
              {filename}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-switzer font-semibold text-dark/80 dark:text-light/80 uppercase tracking-wider">
                {language}
              </span>
              <div className="w-2 h-2 bg-purple rounded-full opacity-60" />
            </div>
          )}
        </div>
        
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple/10 hover:bg-purple/20 text-purple transition-all duration-300 hover:scale-105 active:scale-95 border border-purple/20 hover:border-purple/30"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-xs font-switzer font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-xs font-switzer font-semibold">Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code content */}
      <div className="relative overflow-hidden rounded-b-xl border-x border-b border-lightBorderColor dark:border-darkBorderColor bg-light dark:bg-dark">
        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: theme === 'dark' ? '#1D1D1F' : '#FAFAF6',
            fontSize: '14px',
            lineHeight: '1.6',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1.5em',
            color: theme === 'dark' ? '#6b7280' : '#9ca3af',
            fontSize: '13px',
            userSelect: 'none',
            borderRight: '1px solid',
            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            marginRight: '1em',
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {children}
        </SyntaxHighlighter>
        
        {/* Subtle gradient overlay for visual hierarchy */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple/2 via-transparent to-purple/3 pointer-events-none rounded-b-xl" />
        
        {/* Corner decorations */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-purple/20 rounded-full" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-purple/15 rounded-full" />
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