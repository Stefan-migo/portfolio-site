import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t mt-8 p-4 text-center text-sm text-muted-foreground">
      <div className="container mx-auto">
        © {new Date().getFullYear()} Artist Name. All rights reserved.
        {/* Social links can go here */}
      </div>
    </footer>
  );
};

export default Footer;
