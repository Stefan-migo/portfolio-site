import React from 'react';
import P5Runner from '@/components/P5Runner'; // Import P5Runner directly again

export default function Home() {
  // Define the path to the sketch relative to the p5-projects directory
  const sketchPath = "cursor-particles/sketch.js";

  return (
    // Use section to contain the p5 sketch, allow it to grow
    <section className="flex-grow flex items-center justify-center w-full h-[calc(100vh-8rem)]"> {/* Full viewport height minus header/footer approx */}
      {/* Container for the P5Runner */}
      <div className="w-full h-full">
        <P5Runner sketchPath={sketchPath} /> {/* Use P5Runner directly */}
      </div>
      {/*
        Optional: Overlay text or links on top of the sketch if desired
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mix-blend-difference">
            [Artist Name]
          </h1>
        </div>
      */}
    </section>
  );
}
