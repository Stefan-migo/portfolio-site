import React from 'react';

const Footer = () => {
  return (
    // Removed border-t, adjusted padding, kept text styling
    <footer className="mt-12 py-6 text-center text-sm text-muted-foreground">
      <div className="container mx-auto">
         {/* TODO: Replace with actual artist name */}
        © {new Date().getFullYear()} Artist Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
