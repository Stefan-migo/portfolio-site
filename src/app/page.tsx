import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Import Button

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 md:py-32">
      {/* Optional: Add a large background visual/artwork here */}
      <div className="mb-8">
        {/* Example: Placeholder for a featured artwork or logo */}
        {/* <Image src="/path/to/featured-artwork.jpg" alt="Featured Artwork" width={400} height={300} className="rounded-lg shadow-lg" /> */}
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Welcome to [Artist Name]'s Portfolio
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Explore a collection of generative art, interactive projects, and unique digital creations.
       </p>
      <div className="flex flex-wrap justify-center gap-4">
        {/* Removed passHref and legacyBehavior */}
        <Link href="/portfolio" legacyBehavior>
          {/* Removed size="lg" */}
          <Button>Explore Portfolio</Button>
        </Link>
        {/* Removed passHref and legacyBehavior */}
        <Link href="/shop" legacyBehavior>
          {/* Removed size="lg" variant="secondary" */}
          <Button> {/* Use default variant */}
            Visit Shop
         </Button>
      </Link>
    </div>
      {/* Optional: Add a section showcasing recent works or featured categories */}
    </section>
  );
}
