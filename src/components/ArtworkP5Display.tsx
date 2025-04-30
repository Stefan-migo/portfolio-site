"use client"; // This component must be a Client Component

import React from 'react';
import dynamic from 'next/dynamic';
import CodeViewer from '@/components/CodeViewer'; // Static import is fine as it's already a client component
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

// Dynamically import P5Runner with SSR disabled
const P5Runner = dynamic(() => import('@/components/P5Runner'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">Loading Sketch...</div>
});

interface CodeFile {
  name: string;
  content: string;
  language?: string;
}

interface ArtworkP5DisplayProps {
  p5projectPath: string;
  codeFiles: CodeFile[];
}

const ArtworkP5Display: React.FC<ArtworkP5DisplayProps> = ({ p5projectPath, codeFiles }) => {
  // Construct the sketch path relative to the p5-projects directory
  const sketchPath = `${p5projectPath}/sketch.js`;

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg mb-8 min-h-[400px] max-h-[70vh] bg-card" // Use card bg, increased bottom margin
    >
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-1 bg-muted/50 rounded-l-lg">
          <P5Runner sketchPath={sketchPath} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-border" />
      <ResizablePanel defaultSize={40}>
         <div className="flex h-full items-center justify-center overflow-hidden rounded-r-lg">
           <CodeViewer files={codeFiles} defaultTab="sketch.js" />
         </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ArtworkP5Display;
