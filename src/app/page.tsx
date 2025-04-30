import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Import Button

export default function Home() {
  return (
    // Simplified layout, focusing on vertical centering and typography
    <section className="flex flex-col items-center justify-center text-center flex-grow min-h-[calc(100vh-8rem)]"> {/* Adjust min-height based on header/footer */}

      {/* Minimalist Title - Inspired by references */}
      {/* TODO: Replace [Artist Name] */}
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tighter leading-tight">
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
    </section>
  );
}
