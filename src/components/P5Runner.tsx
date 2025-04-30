"use client"; // This component interacts with the DOM and p5.js instance

import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5'; // Import p5 directly

interface P5RunnerProps {
  sketchPath: string; // e.g., "cursor-particles/sketch.js" relative to p5-projects
}

const P5Runner: React.FC<P5RunnerProps> = ({ sketchPath }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container div
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let instance: p5 | null = null; // Variable to hold the p5 instance

    setLoading(true);
    setError(null);

    // Dynamically import the sketch function
    import(`@/p5-projects/${sketchPath}`)
      .then((module) => {
        if (module && typeof module.sketch === 'function') {
          // Ensure the container ref is available
          if (containerRef.current) {
            // Create the p5 instance, passing the sketch function and the container
            instance = new p5(module.sketch, containerRef.current);
            setLoading(false);
          } else {
            throw new Error("Container ref not available for p5 instance.");
          }
        } else {
          throw new Error(`Sketch function not found or not exported correctly in ${sketchPath}`);
        }
      })
      .catch((err) => {
        console.error(`Error loading or initializing sketch ${sketchPath}:`, err);
        setError(`Failed to load sketch: ${err.message}`);
        setLoading(false);
      });

    // Cleanup function to remove the p5 instance when the component unmounts or sketchPath changes
    return () => {
      if (instance) {
        instance.remove();
        instance = null; // Clear the instance variable
        console.log(`p5 instance removed for ${sketchPath}`);
      }
    };
  }, [sketchPath]); // Re-run effect if sketchPath changes

  // Render loading/error states or the container for p5
  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-card relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">Loading Sketch...</div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-destructive text-destructive-foreground p-4 text-center">{error}</div>
      )}
      {/* The p5 canvas will be attached here by the p5 instance */}
    </div>
  );
};

export default P5Runner;
