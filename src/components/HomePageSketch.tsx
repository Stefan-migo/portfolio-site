"use client"; // This component must be a Client Component

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import P5Runner with SSR disabled
const P5Runner = dynamic(() => import('@/components/P5Runner'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">Loading Sketch...</div>
});

interface HomePageSketchProps {
  sketchPath: string;
}

const HomePageSketch: React.FC<HomePageSketchProps> = ({ sketchPath }) => {
  return (
    // Container for the P5Runner
    <div className="w-full h-full">
      <P5Runner sketchPath={sketchPath} />
    </div>
  );
};

export default HomePageSketch;
