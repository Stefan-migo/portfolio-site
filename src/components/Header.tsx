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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg mr-6">
          Artist Name
        </Link>
         <NavigationMenu>
           <NavigationMenuList>
             <NavigationMenuItem>
               {/* Corrected: Removed legacyBehavior/passHref from Link, added asChild to NavLink */}
               <Link href="/portfolio" legacyBehavior>
                 <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                   Portfolio {/* Content directly inside NavLink */}
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
             <NavigationMenuItem>
               {/* Corrected: Removed legacyBehavior/passHref from Link, added asChild to NavLink */}
               <Link href="/shop" legacyBehavior>
                 <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                   Shop
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
             <NavigationMenuItem>
               {/* Corrected: Removed legacyBehavior/passHref from Link, added asChild to NavLink */}
               <Link href="/nft" legacyBehavior>
                 <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                   NFTs
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
             <NavigationMenuItem>
               {/* Corrected: Removed legacyBehavior/passHref from Link, added asChild to NavLink */}
               <Link href="/about" legacyBehavior>
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
