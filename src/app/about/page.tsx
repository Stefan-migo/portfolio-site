import React from 'react';

export default function AboutPage() {
  return (
    // Added container, centering, and text styling
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">About</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Information about the artist, their process, and contact details will be added here soon.
      </p>
    </div>
  );
}
