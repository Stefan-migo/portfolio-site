"use client"; // This component needs to run on the client

import React, { useState, useEffect } from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react'; // Updated package name
import type { Sketch, P5CanvasInstance } from '@p5-wrapper/react'; // Import Sketch and P5CanvasInstance types

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
    // TODO: Implement dynamic loading of the actual sketch script based on sketchPath.
    // This is complex because scripts need to be loaded and executed in the browser context.
    // For now, we'll just use the placeholder sketch.
    // A potential approach involves dynamically creating a <script> tag or using dynamic import()
    // if the p5 projects are structured as modules.
    console.warn(`P5Runner: Dynamic sketch loading for "${sketchPath}" not yet implemented. Using placeholder.`);
    setSketch(() => placeholderSketch); // Use placeholder for now
    setLoading(false);
    // In a real implementation, handle errors during script loading here.
    // setError("Failed to load sketch script.");
  }, [sketchPath]);

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
    <div className="border rounded-md overflow-hidden">
       {/* Ensure the wrapper takes appropriate space */}
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};

export default P5Runner;
