"use client"; // This component needs to run on the client

import React, { useState, useEffect } from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/next'; // Import from the new package
import type { Sketch, P5CanvasInstance } from '@p5-wrapper/react'; // Types might still come from the core package (peer dependency)

interface P5RunnerProps {
  sketchPath: string; // e.g., "interactive-particles-sketch/sketch.js" relative to a base path
  // We might need to pass the full project path later depending on how scripts are loaded
}

// Basic placeholder sketch function
const placeholderSketch: Sketch = (p5: P5CanvasInstance) => { // Added type for p5 parameter
  p5.setup = () => {
    p5.createCanvas(400, 400);
    p5.background(200);
  };

  p5.draw = () => {
    p5.fill(255, 0, 0);
    p5.ellipse(p5.width / 2, p5.height / 2, 50, 50);
  };
};

const P5Runner: React.FC<P5RunnerProps> = ({ sketchPath }) => {
  const [sketch, setSketch] = useState<Sketch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSketch(null); // Clear previous sketch

    // Dynamically import the sketch module
    // Note: The path needs to be relative to the `src` directory or configured alias
    // Assuming sketchPath is like "cursor-particles/sketch.js"
    // and p5-projects is directly under src
    import(`@/p5-projects/${sketchPath}`)
      .then((module) => {
        if (module && typeof module.sketch === 'function') {
          setSketch(() => module.sketch); // Set the imported sketch function
        } else {
          throw new Error(`Sketch function not found or not exported correctly in ${sketchPath}`);
        }
      })
      .catch((err) => {
        console.error(`Error loading sketch ${sketchPath}:`, err);
        setError(`Failed to load sketch: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [sketchPath]); // Re-run effect if sketchPath changes

  if (loading) {
    return <div className="aspect-square w-full bg-muted flex items-center justify-center text-muted-foreground">Loading Sketch...</div>;
  }

  if (error) {
    return <div className="aspect-square w-full bg-destructive text-destructive-foreground flex items-center justify-center">{error}</div>;
  }

  if (!sketch) {
     return <div className="aspect-square w-full bg-muted flex items-center justify-center text-muted-foreground">Sketch not available.</div>;
  }

  return (
    // Added a container div for sizing and potential styling
    // Added id for the canvas parent reference in sketch.js setup()
    <div id="p5-canvas-container" className="w-full h-full flex items-center justify-center bg-card">
      {sketch && <ReactP5Wrapper sketch={sketch} />}
    </div>
  );
};

export default P5Runner;
