import React from 'react';
import Link from 'next/link'; // Keep Link
import { Button } from '@/components/ui/button'; // Keep Button
import HomePageSketch from '@/components/HomePageSketch'; // Import the wrapper

export default function Home() {
  const sketchPath = "cursor-particles/sketch.js";

  return (
    // Make section relative to position sketch absolutely inside
    <section className="relative flex-grow flex flex-col items-center justify-center text-center min-h-[calc(100vh-8rem)]"> {/* Adjust min-height based on header/footer */}

      {/* P5 Sketch as Background */}
      <div className="absolute inset-0 z-0"> {/* Positioned behind content */}
        <HomePageSketch sketchPath={sketchPath} /> {/* Use the wrapper */}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10"> {/* Ensure content is above sketch */}
        {/* Minimalist Title - Inspired by references */}
        {/* TODO: Replace [Artist Name] */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tighter leading-tight text-foreground">
          [Artist Name]
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          Digital Art & Code
         </p>
        <div className="flex flex-wrap justify-center gap-4">
          {/* Fixed Link components */}
          <Link href="/portfolio">
            <Button variant="outline">Portfolio</Button> {/* Use outline variant for secondary action */}
          </Link>
          <Link href="/shop">
            <Button>Shop</Button> {/* Default variant for primary action */}
          </Link>
        </div>
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
