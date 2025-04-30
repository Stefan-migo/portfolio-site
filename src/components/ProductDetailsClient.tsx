"use client"; // This component handles client-side interactions

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge"; // Import Badge
import { Product, PrintOption } from '@/lib/types'; // Import types

interface ProductDetailsClientProps {
  product: Product; // Receive the fully resolved product data
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  // State for the selected print option, default to the first one
  // Ensure printOptions exists and has items before accessing index 0
  const [selectedOption, setSelectedOption] = useState<PrintOption | undefined>(
    product.printOptions && product.printOptions.length > 0 ? product.printOptions[0] : undefined
  );

  const { addItem } = useCart(); // Get addItem function from context

  // Handler for adding item to cart
  const handleAddToCart = () => {
    if (!selectedOption) return; // Guard against no option selected

    const itemToAdd = {
      productId: product.id,
      title: product.title,
      option: selectedOption,
      quantity: 1, // Add one item at a time
      mockupImageUrl: product.mockupImageUrls?.[0] // Use first mockup image for cart display
    };
    addItem(itemToAdd);
    // Optional: Add user feedback (e.g., toast notification)
    console.log("Added to cart:", itemToAdd);
  };

  // Handle case where product might somehow not have options after fetching
  if (!product.printOptions || product.printOptions.length === 0) {
      return (
          <div className="text-center text-muted-foreground">
              Product details are currently unavailable.
          </div>
      );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Image Gallery/Mockups */}
      {/* Image Gallery/Mockups */}
      <div className="space-y-4">
        {/* Display first mockup image prominently */}
        {product.mockupImageUrls && product.mockupImageUrls.length > 0 && (
          <div className="aspect-square rounded-lg overflow-hidden bg-card"> {/* Removed border, ensure bg */}
            <Image
              src={product.mockupImageUrls[0]}
              alt={product.title}
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {/* Optional: Add thumbnails for other mockups */}
      </div>
      {/* Product Details & Options */}
      <div className="space-y-8"> {/* Increased spacing */}
        <div className="space-y-2"> {/* Group title/description */}
          <h1 className="text-3xl lg:text-4xl font-bold">{product.title}</h1>
          <p className="text-muted-foreground text-lg">{product.description}</p> {/* Slightly larger description */}
        </div>

        {/* Print Options Selection */}
        <RadioGroup
          // Use a stable identifier for the value if possible, e.g., combining type+size
          // Stringifying the whole object might be fragile if order changes.
          // Using index as key for map is okay here as options list is static per product load.
          value={selectedOption ? JSON.stringify(selectedOption) : ""}
          onValueChange={(value) => {
             if (value) {
                setSelectedOption(JSON.parse(value) as PrintOption);
             }
          }}
          className="space-y-2"
        >
          <h3 className="text-lg font-semibold">Options:</h3>
          {product.printOptions.map((option, index) => {
            const optionId = `option-${product.id}-${index}`; // More unique ID
            const optionValue = JSON.stringify(option);
            return (
              <Label
                key={optionId}
                htmlFor={optionId}
                // Simplified styling: remove border, use padding, subtle hover/checked state
                className="flex items-center justify-between p-4 rounded-md cursor-pointer hover:bg-muted/50 has-[input:checked]:bg-muted"
              >
                <div>
                  <p className="font-medium text-foreground"> {/* Ensure foreground color */}
                    {option.type} - {option.size} {option.material ? `(${option.material})` : ''}
                  </p>
                  {/* <p className="text-sm text-muted-foreground">Details if any...</p> */}
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-xl font-bold">${option.price.toFixed(2)}</span>
                   <RadioGroupItem value={optionValue} id={optionId} />
                </div>
              </Label>
            );
          })}
        </RadioGroup>

        {/* Add to Cart Button */}
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={!selectedOption} // Disable if no option selected
          size="lg" // Restore size if desired
        >
           Add to Cart
        </Button>

         {/* Display Tags using Badge */}
         {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <span className="text-sm font-medium text-muted-foreground">Tags:</span>
              {product.tags.map((tag: string) => (
                 <Badge key={tag} variant="outline" className="text-xs font-normal border-muted-foreground/50 text-muted-foreground">{tag}</Badge> // Use outline badge
              ))}
            </div>
         )}
      </div>
    </div>
  );
}
