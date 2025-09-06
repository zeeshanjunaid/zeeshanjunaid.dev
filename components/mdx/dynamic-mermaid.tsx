import dynamic from 'next/dynamic';

const MermaidDiagram = dynamic(() => import('./mermaid').then(mod => ({ default: mod.MermaidDiagram })), {
  ssr: false,
  loading: () => (
    <div className="my-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Loading diagram...
      </p>
    </div>
  ),
});

export { MermaidDiagram };
