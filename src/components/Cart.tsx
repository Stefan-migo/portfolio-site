"use client";

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Trash2, ShoppingCart } from 'lucide-react';
import { CartItem } from '@/lib/types'; // Import CartItem type for better type safety

export function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    getItemCount,
    getTotalPrice,
    clearCart
   } = useCart();

  // Type the item parameter explicitly
  const handleQuantityChange = (item: CartItem, e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value) || 0;
    const newQuantity = Math.max(0, quantity); // Prevent negative quantity
    // Ensure item.option exists before calling updateQuantity
    if (item.option) {
        updateQuantity(item.productId, item.option, newQuantity);
    } else {
        console.error("Cart item is missing option details:", item);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {getItemCount() > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px]">
              {getItemCount()}
            </span>
          )}
          <span className="sr-only">Open Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-background">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Review items in your cart. Proceed to checkout when ready.
          </SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 my-4 -mr-6 pr-6">
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={`${item.productId}-${item.option?.size}-${item.option?.type}-${index}`} className="flex items-start gap-4 border-b border-border pb-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {item.mockupImageUrl ? (
                        <Image
                          src={item.mockupImageUrl}
                          alt={item.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      ) : (
                        <div className="bg-muted h-full w-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="font-medium leading-tight">{item.title}</p>
                      {item.option && ( // Check if option exists
                        <p className="text-xs text-muted-foreground">
                          {item.option.type} - {item.option.size} {item.option.material ? `(${item.option.material})` : ''}
                        </p>
                      )}
                      {item.option && ( // Check if option exists
                         <p className="text-sm font-semibold">${item.option.price.toFixed(2)}</p>
                      )}
                       <div className="flex items-center mt-1">
                         <label htmlFor={`quantity-${index}`} className="sr-only">Quantity</label>
                         <Input
                           id={`quantity-${index}`}
                           type="number"
                           min="0"
                           value={item.quantity}
                           onChange={(e) => handleQuantityChange(item, e)}
                           className="h-8 w-16 text-center mr-2"
                         />
                       </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => item.option && removeItem(item.productId, item.option)} // Check option exists
                      disabled={!item.option} // Disable if option somehow missing
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto border-t border-border pt-6">
              <div className="flex flex-col w-full gap-4">
                 <div className="flex justify-between font-semibold text-lg">
                   <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    disabled={items.length === 0}
                  >
                   Clear Cart
                  </Button>
                  <Button size="lg" className="w-full" disabled={items.length === 0}>
                    Proceed to Checkout (TODO)
                  </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
