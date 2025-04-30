import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/data'; // Import product data function
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Assuming Badge component exists and works
import { Product } from '@/lib/types'; // Import Product type

export default async function ShopPage() { // Make component async
  const products: Product[] = await getProducts(); // Await product data

  return (
    <div className="container mx-auto px-4 py-8"> {/* Added container styling */}
      <h1 className="text-3xl font-bold mb-8 text-center">Shop</h1> {/* Centered title */}
      {products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products available yet.</p> {/* Improved styling */}
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => ( // Added explicit type
            <Link href={`/shop/${product.id}`} key={product.id} legacyBehavior passHref>
              <a className="block group">
                <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"> {/* Added hover effect */}
                  <CardHeader className="p-0 relative aspect-square">
                    <div className="bg-muted w-full h-full flex items-center justify-center text-muted-foreground">
                      {product.mockupImageUrls && product.mockupImageUrls.length > 0 ? (
                         <Image
                           src={product.mockupImageUrls[0]}
                           alt={product.title}
                           fill // Use fill
                           style={{ objectFit: 'cover' }} // Use style prop
                           className="transition-transform duration-300 group-hover:scale-105"
                           sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Example sizes
                         />
                      ) : (
                        <span>No Image</span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors"> {/* Added hover effect */}
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {product.description}
                    </CardDescription>
                     {product.printOptions && product.printOptions.length > 0 && (
                       <p className="font-semibold mt-2 text-primary"> {/* Styled price */}
                         From ${product.printOptions[0].price.toFixed(2)} {/* Indicate starting price */}
                       </p>
                     )}
                  </CardContent>
                   <CardFooter className="p-4 pt-0"> {/* Adjusted padding */}
                     {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 3).map((tag: string) => ( // Added explicit type
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge> // Restored variant
                        ))}
                      </div>
                    )}
                   </CardFooter>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
