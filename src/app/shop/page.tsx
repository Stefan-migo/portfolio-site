import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from '@/lib/types';

export default async function ShopPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop</h1>
      {products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => { // Use curly braces for map body
            return ( // Explicit return
              <Link href={`/shop/${product.id}`} key={product.id} className="block group">
                <Card className="overflow-hidden h-full flex flex-col bg-card border-none shadow-none rounded-lg transition-colors duration-200 group-hover:bg-secondary/50"> {/* Minimal card styling */}
                  <CardHeader className="p-0 relative aspect-square">
                    <div className="bg-muted w-full h-full flex items-center justify-center text-muted-foreground">
                      {product.mockupImageUrls && product.mockupImageUrls.length > 0 ? (
                         <Image
                           src={product.mockupImageUrls[0]}
                           alt={product.title}
                           fill
                           style={{ objectFit: 'cover' }}
                           className="transition-transform duration-300 group-hover:scale-105"
                           sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                         />
                      ) : (
                        <span>No Image</span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {product.description}
                    </CardDescription>
                     {product.printOptions && product.printOptions.length > 0 && (
                       <p className="font-semibold mt-2 text-primary">
                         From ${product.printOptions[0].price.toFixed(2)}
                       </p>
                     )}
                  </CardContent>
                   <CardFooter className="p-4 pt-0">
                     {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs font-normal border-muted-foreground/50 text-muted-foreground">{tag}</Badge> // Minimal outline badge
                        ))}
                      </div>
                    )}
                   </CardFooter>
                </Card>
              </Link>
            ); // End explicit return
          })}
        </div>
      )}
    </div>
  );
}
