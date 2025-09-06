'use client';

import { useEffect, useRef } from 'react';

interface MermaidDiagramProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function MermaidDiagram({ children, className, ...props }: MermaidDiagramProps) {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMermaid = async () => {
      if (typeof window !== 'undefined' && diagramRef.current) {
        try {
          console.log('Loading Mermaid diagram...');
          
          // Try to load Mermaid from CDN first
          if (!window.mermaid) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11.11.0/dist/mermaid.min.js';
            script.onload = () => {
              console.log('Mermaid CDN loaded');
              initializeAndRender();
            };
            script.onerror = () => {
              console.error('Failed to load Mermaid from CDN');
              // Fallback to npm package
              loadFromNpm();
            };
            document.head.appendChild(script);
          } else {
            initializeAndRender();
          }
        } catch (error) {
          console.error('Error loading Mermaid:', error);
          // Fallback: show the raw content
          if (diagramRef.current) {
            const diagramContent = children?.toString() || '';
            diagramRef.current.innerHTML = `
              <div class="text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Mermaid Diagram</div>
                <pre class="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">${diagramContent}</pre>
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-2">Unable to render diagram. Showing raw content.</div>
              </div>
            `;
          }
        }
      }
    };

    const loadFromNpm = async () => {
      try {
        const mermaid = await import('mermaid');
        window.mermaid = mermaid.default;
        initializeAndRender();
      } catch (error) {
        console.error('Error loading Mermaid from npm:', error);
        if (diagramRef.current) {
          const diagramContent = children?.toString() || '';
          diagramRef.current.innerHTML = `
            <div class="text-center">
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Mermaid Diagram</div>
              <pre class="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">${diagramContent}</pre>
              <div class="text-xs text-gray-400 dark:text-gray-500 mt-2">Unable to render diagram. Showing raw content.</div>
            </div>
          `;
        }
      }
    };

    const initializeAndRender = () => {
      if (!window.mermaid) return;
      
      try {
        console.log('Initializing Mermaid...');
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'Inter, system-ui, sans-serif',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true
          }
        });
        console.log('Mermaid initialized');

        // Clear previous content
        diagramRef.current!.innerHTML = '';
        
        // Generate unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        
        // Get the diagram content
        const diagramContent = children?.toString() || '';
        console.log('Mermaid diagram content:', diagramContent);
        
        if (!diagramContent.trim()) {
          console.warn('No diagram content provided');
          return;
        }
        
        // Render the diagram
        console.log('Rendering Mermaid diagram...');
  window.mermaid.render(id, diagramContent).then(({ svg }: { svg: string }) => {
          console.log('Mermaid diagram rendered successfully');
          if (diagramRef.current) {
            diagramRef.current.innerHTML = svg;
          }
  }).catch((error: unknown) => {
          console.error('Error rendering Mermaid diagram:', error);
          if (diagramRef.current) {
            // Show a more readable fallback
            const diagramContent = children?.toString() || '';
            diagramRef.current.innerHTML = `
              <div class="text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Mermaid Diagram</div>
                <pre class="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">${diagramContent}</pre>
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-2">Unable to render diagram. Showing raw content.</div>
              </div>
            `;
          }
        });
      } catch (error) {
        console.error('Error in initializeAndRender:', error);
        if (diagramRef.current) {
          const diagramContent = children?.toString() || '';
          diagramRef.current.innerHTML = `
            <div class="text-center">
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Mermaid Diagram</div>
              <pre class="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">${diagramContent}</pre>
              <div class="text-xs text-gray-400 dark:text-gray-500 mt-2">Unable to render diagram. Showing raw content.</div>
            </div>
          `;
        }
      }
    };

    // Add a small delay to ensure the component is mounted
    const timeoutId = setTimeout(loadMermaid, 100);
    
    return () => clearTimeout(timeoutId);
  }, [children]);

  return (
    <div 
      ref={diagramRef}
      className={`my-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-x-auto ${className || ''}`}
      {...props}
    />
  );
}

// Extend the global window interface for mermaid
declare global {
  interface Window {
    mermaid?: any;
  }
}
