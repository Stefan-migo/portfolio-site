import React from 'react';
import Link from 'next/link'; // Import Link for navigation
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle, // Import the style for links
} from "@/components/ui/navigation-menu"; // Import Shadcn components
import { Cart } from "@/components/Cart"; // Import the Cart component

const Header = () => {
  return (
    // Removed border-b, simplified background/backdrop classes
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <nav className="container h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg mr-6">
          {/* TODO: Replace with actual artist name or logo */}
          Artist Name
        </Link>
         <NavigationMenu>
           <NavigationMenuList>
             <NavigationMenuItem>
               {/* Fixed: Removed legacyBehavior */}
               <Link href="/portfolio">
                 <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                   Portfolio
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
             <NavigationMenuItem>
               {/* Fixed: Removed legacyBehavior */}
               <Link href="/shop">
                 <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                   Shop
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
             <NavigationMenuItem>
               {/* Fixed: Removed legacyBehavior */}
               <Link href="/nft">
                 <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                   NFTs
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
             <NavigationMenuItem>
               {/* Fixed: Removed legacyBehavior */}
               <Link href="/about">
                 <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                   About
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
          </NavigationMenuList>
         </NavigationMenu>
         {/* Right side elements */}
         <div className="flex items-center gap-2">
            {/* Placeholder for theme toggle/wallet connect */}
            <Cart /> {/* Add the Cart component trigger */}
         </div>
       </nav>
    </header>
  );
};

export default Header;
