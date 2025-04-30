"use client";

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // For quantity input
import { ScrollArea } from "@/components/ui/scroll-area"; // To make cart scrollable
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose, // To close the sheet
} from "@/components/ui/sheet";
import { Trash2, ShoppingCart } from 'lucide-react'; // Icons

export function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    getItemCount,
    getTotalPrice,
     clearCart
   } = useCart();

  // Added type React.ChangeEvent<HTMLInputElement> for the event parameter
  const handleQuantityChange = (item: any, e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value) || 0; // Get value from event
    const newQuantity = Math.max(0, quantity); // Ensure quantity is not negative
    updateQuantity(item.productId, item.option, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Removed variant="outline" size="icon" */}
        <Button className="relative">
          <ShoppingCart className="h-4 w-4" />
          {getItemCount() > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {getItemCount()}
            </span>
          )}
          <span className="sr-only">Open Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            Review items in your cart. Proceed to checkout when ready.
          </SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 my-4 pr-4"> {/* Added padding-right for scrollbar */}
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.productId}-${item.option.size}-${item.option.type}-${index}`} className="flex items-center gap-4 border-b pb-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden border">
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
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.option.type} - {item.option.size} {item.option.material ? `(${item.option.material})` : ''}
                      </p>
                      <p className="text-sm font-semibold">${item.option.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item, e)} // Pass the event object
                           className="h-8 w-16 text-center"
                         />
                        {/* Removed variant="outline" size="icon" */}
                        <Button
                          className="h-8 w-8"
                          onClick={() => removeItem(item.productId, item.option)}
                        >
                         <Trash2 className="h-4 w-4" />
                         <span className="sr-only">Remove item</span>
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto border-t pt-4">
              <div className="flex flex-col w-full gap-4">
                 <div className="flex justify-between font-semibold">
                   <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  {/* Removed variant="outline" size="sm" */}
                  <Button
                    onClick={clearCart}
                    disabled={items.length === 0}
                  >
                   Clear Cart
                  </Button>
                  {/* Checkout Button - Functionality TODO */}
                  {/* Removed size="lg" */}
                  <Button className="w-full" disabled={items.length === 0}>
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
